package com.studyx.app;

import android.app.Activity;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * 热更新管理器
 * 
 * 更新流程：
 * 1. 检查服务器上的 version.json
 * 2. 对比本地版本号
 * 3. 如果有新版本，下载 zip 包
 * 4. 解压到外部存储目录
 * 5. 下次启动时加载更新后的版本
 */
public class UpdateManager {
    
    private static final String TAG = "UpdateManager";
    private static final String PREFS_NAME = "StudyXUpdate";
    private static final String KEY_VERSION_CODE = "version_code";
    private static final String KEY_VERSION_NAME = "version_name";
    private static final String UPDATE_DIR = "studyx_update";
    
    private final Activity activity;
    private final String updateUrl;
    private final OkHttpClient httpClient;
    private final ExecutorService executorService;
    private final SharedPreferences prefs;
    
    public UpdateManager(Activity activity, String updateUrl) {
        this.activity = activity;
        this.updateUrl = updateUrl;
        this.httpClient = new OkHttpClient();
        this.executorService = Executors.newSingleThreadExecutor();
        this.prefs = activity.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }
    
    /**
     * 检查更新
     */
    public void checkForUpdate(final UpdateCallback callback) {
        executorService.execute(() -> {
            try {
                Request request = new Request.Builder()
                    .url(updateUrl)
                    .build();
                
                Response response = httpClient.newCall(request).execute();
                
                if (!response.isSuccessful()) {
                    callback.onError("Server error: " + response.code());
                    return;
                }
                
                String jsonString = response.body().string();
                JSONObject json = new JSONObject(jsonString);
                
                int remoteVersionCode = json.getInt("versionCode");
                String remoteVersionName = json.getString("versionName");
                String downloadUrl = json.getString("downloadUrl");
                String description = json.getString("description");
                boolean force = json.optBoolean("force", false);
                int minVersionCode = json.optInt("minVersionCode", 1);
                
                int localVersionCode = getLocalWebVersionCode();
                int appVersionCode = getAppVersionCode();
                
                // 检查最低版本要求
                if (appVersionCode < minVersionCode) {
                    // 需要更新原生APK
                    callback.onError("App update required");
                    return;
                }
                
                // 检查热更新版本
                if (remoteVersionCode > localVersionCode) {
                    UpdateInfo info = new UpdateInfo();
                    info.setVersionCode(remoteVersionCode);
                    info.setVersionName(remoteVersionName);
                    info.setDownloadUrl(downloadUrl);
                    info.setDescription(description);
                    info.setForce(force);
                    
                    activity.runOnUiThread(() -> callback.onUpdateAvailable(info));
                } else {
                    activity.runOnUiThread(callback::onNoUpdate);
                }
                
            } catch (Exception e) {
                Log.e(TAG, "Check update failed", e);
                activity.runOnUiThread(() -> callback.onError(e.getMessage()));
            }
        });
    }
    
    /**
     * 下载并安装更新
     */
    public void downloadUpdate(String downloadUrl, final DownloadCallback callback) {
        executorService.execute(() -> {
            File zipFile = null;
            try {
                // 创建更新目录
                File updateDir = new File(activity.getExternalFilesDir(null), UPDATE_DIR);
                if (!updateDir.exists()) {
                    updateDir.mkdirs();
                }
                
                // 下载ZIP文件
                zipFile = new File(updateDir, "update.zip");
                downloadFile(downloadUrl, zipFile, callback);
                
                // 解压ZIP文件
                unzip(zipFile, updateDir);
                
                // 删除ZIP文件
                zipFile.delete();
                
                // 更新本地版本号
                // 注意：这里应该从解压后的version.json读取
                
                activity.runOnUiThread(callback::onSuccess);
                
            } catch (Exception e) {
                Log.e(TAG, "Download update failed", e);
                if (zipFile != null && zipFile.exists()) {
                    zipFile.delete();
                }
                activity.runOnUiThread(() -> callback.onError(e.getMessage()));
            }
        });
    }
    
    /**
     * 下载文件
     */
    private void downloadFile(String fileUrl, File outputFile, DownloadCallback callback) throws IOException {
        URL url = new URL(fileUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setConnectTimeout(30000);
        connection.setReadTimeout(30000);
        connection.setDoInput(true);
        connection.connect();
        
        if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
            throw new IOException("HTTP error: " + connection.getResponseCode());
        }
        
        int fileLength = connection.getContentLength();
        InputStream input = new BufferedInputStream(connection.getInputStream());
        FileOutputStream output = new FileOutputStream(outputFile);
        
        byte[] buffer = new byte[8192];
        int read;
        long total = 0;
        
        while ((read = input.read(buffer)) != -1) {
            total += read;
            output.write(buffer, 0, read);
            
            if (fileLength > 0) {
                final int progress = (int) (total * 100 / fileLength);
                activity.runOnUiThread(() -> callback.onProgress(progress));
            }
        }
        
        output.flush();
        output.close();
        input.close();
        connection.disconnect();
    }
    
    /**
     * 解压ZIP文件
     */
    private void unzip(File zipFile, File targetDir) throws IOException {
        ZipInputStream zipIn = new ZipInputStream(new FileInputStream(zipFile));
        ZipEntry entry;
        
        while ((entry = zipIn.getNextEntry()) != null) {
            File file = new File(targetDir, entry.getName());
            
            if (entry.isDirectory()) {
                file.mkdirs();
            } else {
                File parent = file.getParentFile();
                if (parent != null && !parent.exists()) {
                    parent.mkdirs();
                }
                
                FileOutputStream fos = new FileOutputStream(file);
                byte[] buffer = new byte[8192];
                int read;
                while ((read = zipIn.read(buffer)) != -1) {
                    fos.write(buffer, 0, read);
                }
                fos.close();
            }
            zipIn.closeEntry();
        }
        zipIn.close();
    }
    
    /**
     * 获取本地Web版本号
     */
    private int getLocalWebVersionCode() {
        return prefs.getInt(KEY_VERSION_CODE, 1);
    }
    
    /**
     * 保存本地Web版本号
     */
    private void saveLocalWebVersionCode(int versionCode, String versionName) {
        SharedPreferences.Editor editor = prefs.edit();
        editor.putInt(KEY_VERSION_CODE, versionCode);
        editor.putString(KEY_VERSION_NAME, versionName);
        editor.apply();
    }
    
    /**
     * 获取App版本号
     */
    private int getAppVersionCode() {
        try {
            return activity.getPackageManager()
                .getPackageInfo(activity.getPackageName(), 0)
                .versionCode;
        } catch (PackageManager.NameNotFoundException e) {
            return 1;
        }
    }
    
    /**
     * 清理更新文件（用于回滚或重置）
     */
    public void clearUpdate() {
        executorService.execute(() -> {
            File updateDir = new File(activity.getExternalFilesDir(null), UPDATE_DIR);
            if (updateDir.exists()) {
                deleteRecursive(updateDir);
            }
            SharedPreferences.Editor editor = prefs.edit();
            editor.remove(KEY_VERSION_CODE);
            editor.remove(KEY_VERSION_NAME);
            editor.apply();
        });
    }
    
    private void deleteRecursive(File file) {
        if (file.isDirectory()) {
            File[] children = file.listFiles();
            if (children != null) {
                for (File child : children) {
                    deleteRecursive(child);
                }
            }
        }
        file.delete();
    }
    
    /**
     * 关闭线程池
     */
    public void shutdown() {
        executorService.shutdown();
    }
    
    // ===== 回调接口 =====
    
    public interface UpdateCallback {
        void onUpdateAvailable(UpdateInfo info);
        void onNoUpdate();
        void onError(String error);
    }
    
    public interface DownloadCallback {
        void onSuccess();
        void onProgress(int progress);
        void onError(String error);
    }
    
    // ===== 更新信息类 =====
    
    public static class UpdateInfo {
        private int versionCode;
        private String versionName;
        private String downloadUrl;
        private String description;
        private boolean force;
        
        public int getVersionCode() { return versionCode; }
        public void setVersionCode(int versionCode) { this.versionCode = versionCode; }
        
        public String getVersionName() { return versionName; }
        public void setVersionName(String versionName) { this.versionName = versionName; }
        
        public String getDownloadUrl() { return downloadUrl; }
        public void setDownloadUrl(String downloadUrl) { this.downloadUrl = downloadUrl; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public boolean isForce() { return force; }
        public void setForce(boolean force) { this.force = force; }
    }
}
