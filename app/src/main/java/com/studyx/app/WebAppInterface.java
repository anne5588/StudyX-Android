package com.studyx.app;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.provider.OpenableColumns;
import android.speech.tts.TextToSpeech;
import android.speech.tts.TextToSpeech.OnInitListener;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import androidx.annotation.Nullable;

// ML Kit 翻译
import com.google.mlkit.common.model.DownloadConditions;
import com.google.mlkit.nl.translate.TranslateLanguage;
import com.google.mlkit.nl.translate.Translation;
import com.google.mlkit.nl.translate.Translator;
import com.google.mlkit.nl.translate.TranslatorOptions;

import androidx.core.content.FileProvider;

import java.util.Locale;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

/**
 * JavaScript 与 Android 原生代码的桥接类
 * 
 * 在 JavaScript 中通过 Android.xxx() 调用以下方法
 */
public class WebAppInterface implements OnInitListener {
    
    private final Activity activity;
    private final Context context;
    private TextToSpeech textToSpeech;
    private boolean ttsInitialized = false;
    
    // ML Kit 翻译器（英语 -> 中文）
    private Translator englishToChineseTranslator;
    private boolean translatorInitialized = false;
    private boolean translatorDownloading = false;
    
    // 文件选择回调
    private String filePickerCallback = null;
    private static final int FILE_PICKER_REQUEST_CODE = 1001;
    
    public WebAppInterface(Activity activity) {
        this.activity = activity;
        this.context = activity.getApplicationContext();
        // 初始化TTS
        textToSpeech = new TextToSpeech(context, this);
        // 初始化翻译器
        initTranslator();
    }
    
    /**
     * 初始化 ML Kit 翻译器
     */
    private void initTranslator() {
        try {
            TranslatorOptions options = new TranslatorOptions.Builder()
                    .setSourceLanguage(TranslateLanguage.ENGLISH)
                    .setTargetLanguage(TranslateLanguage.CHINESE)
                    .build();
            englishToChineseTranslator = Translation.getClient(options);
            translatorInitialized = true;
        } catch (Exception e) {
            e.printStackTrace();
            translatorInitialized = false;
        }
    }
    
    @Override
    public void onInit(int status) {
        if (status == TextToSpeech.SUCCESS) {
            int result = textToSpeech.setLanguage(Locale.US);
            ttsInitialized = (result != TextToSpeech.LANG_MISSING_DATA && 
                            result != TextToSpeech.LANG_NOT_SUPPORTED);
        }
    }
    
    /**
     * 显示 Toast 消息
     */
    @JavascriptInterface
    public void showToast(String message) {
        activity.runOnUiThread(() -> Toast.makeText(context, message, Toast.LENGTH_SHORT).show());
    }
    
    /**
     * 显示长 Toast 消息
     */
    @JavascriptInterface
    public void showLongToast(String message) {
        activity.runOnUiThread(() -> Toast.makeText(context, message, Toast.LENGTH_LONG).show());
    }
    
    /**
     * 获取 App 版本信息
     * @return JSON 字符串 {"versionCode": 1, "versionName": "1.0.0"}
     */
    @JavascriptInterface
    public String getAppVersion() {
        try {
            JSONObject json = new JSONObject();
            json.put("versionCode", getVersionCode());
            json.put("versionName", getVersionName());
            return json.toString();
        } catch (JSONException e) {
            return "{}";
        }
    }
    
    /**
     * 获取 App 版本号
     */
    private int getVersionCode() {
        try {
            return context.getPackageManager()
                .getPackageInfo(context.getPackageName(), 0)
                .versionCode;
        } catch (Exception e) {
            return 1;
        }
    }
    
    /**
     * 获取 App 版本名
     */
    private String getVersionName() {
        try {
            return context.getPackageManager()
                .getPackageInfo(context.getPackageName(), 0)
                .versionName;
        } catch (Exception e) {
            return "1.0.0";
        }
    }
    
    /**
     * 振动反馈
     * @param duration 振动时长（毫秒）
     */
    @JavascriptInterface
    public void vibrate(long duration) {
        Vibrator vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
        if (vibrator != null && vibrator.hasVibrator()) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createOneShot(duration, VibrationEffect.DEFAULT_AMPLITUDE));
            } else {
                vibrator.vibrate(duration);
            }
        }
    }
    
    /**
     * 复制文本到剪贴板
     */
    @JavascriptInterface
    public void copyToClipboard(String text) {
        ClipboardManager clipboard = (ClipboardManager) context.getSystemService(Context.CLIPBOARD_SERVICE);
        ClipData clip = ClipData.newPlainText("StudyX", text);
        clipboard.setPrimaryClip(clip);
        showToast("已复制到剪贴板");
    }
    
    /**
     * 从剪贴板粘贴文本
     */
    @JavascriptInterface
    public String pasteFromClipboard() {
        ClipboardManager clipboard = (ClipboardManager) context.getSystemService(Context.CLIPBOARD_SERVICE);
        if (clipboard.hasPrimaryClip()) {
            ClipData clip = clipboard.getPrimaryClip();
            if (clip != null && clip.getItemCount() > 0) {
                CharSequence text = clip.getItemAt(0).getText();
                return text != null ? text.toString() : "";
            }
        }
        return "";
    }
    
    /**
     * 打开外部链接
     */
    @JavascriptInterface
    public void openUrl(String url) {
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        activity.startActivity(intent);
    }
    
    /**
     * 分享文本
     */
    @JavascriptInterface
    public void shareText(String text, String title) {
        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.setType("text/plain");
        intent.putExtra(Intent.EXTRA_TEXT, text);
        intent.putExtra(Intent.EXTRA_SUBJECT, title);
        activity.startActivity(Intent.createChooser(intent, title));
    }
    
    /**
     * 分享文件
     */
    @JavascriptInterface
    public void shareFile(String filePath, String mimeType) {
        File file = new File(filePath);
        if (!file.exists()) {
            showToast("文件不存在");
            return;
        }
        
        Uri uri = FileProvider.getUriForFile(context, context.getPackageName() + ".fileprovider", file);
        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.setType(mimeType);
        intent.putExtra(Intent.EXTRA_STREAM, uri);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        activity.startActivity(Intent.createChooser(intent, "分享文件"));
    }
    
    // ===== 本地存储扩展 =====
    
    /**
     * 保存数据到本地文件
     */
    @JavascriptInterface
    public boolean saveToFile(String filename, String content) {
        try {
            File file = new File(context.getFilesDir(), filename);
            FileWriter writer = new FileWriter(file);
            writer.write(content);
            writer.close();
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * 从本地文件读取数据
     */
    @JavascriptInterface
    public String readFromFile(String filename) {
        try {
            File file = new File(context.getFilesDir(), filename);
            if (!file.exists()) {
                return null;
            }
            
            StringBuilder content = new StringBuilder();
            BufferedReader reader = new BufferedReader(new FileReader(file));
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
            reader.close();
            return content.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * 文件是否存在
     */
    @JavascriptInterface
    public boolean fileExists(String filename) {
        File file = new File(context.getFilesDir(), filename);
        return file.exists();
    }
    
    /**
     * 删除文件
     */
    @JavascriptInterface
    public boolean deleteFile(String filename) {
        File file = new File(context.getFilesDir(), filename);
        return file.delete();
    }
    
    /**
     * 导出文件到下载目录
     */
    @JavascriptInterface
    public boolean exportToDownloads(String filename, String content) {
        try {
            File downloadsDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
            File file = new File(downloadsDir, filename);
            FileWriter writer = new FileWriter(file);
            writer.write(content);
            writer.close();
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * 导入下载目录中的文件
     */
    @JavascriptInterface
    public String importFromDownloads(String filename) {
        try {
            File downloadsDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
            File file = new File(downloadsDir, filename);
            if (!file.exists()) {
                return null;
            }
            
            StringBuilder content = new StringBuilder();
            BufferedReader reader = new BufferedReader(new FileReader(file));
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
            reader.close();
            return content.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    // ===== 数据备份恢复 =====
    
    /**
     * 导出应用数据（备份）
     * @return 备份文件路径
     */
    @JavascriptInterface
    public String exportData(String backupName) {
        try {
            File backupDir = new File(context.getExternalFilesDir(null), "backups");
            if (!backupDir.exists()) {
                backupDir.mkdirs();
            }
            
            File backupFile = new File(backupDir, backupName + ".json");
            
            // 收集所有应用数据
            JSONObject backupData = new JSONObject();
            backupData.put("backupTime", System.currentTimeMillis());
            backupData.put("appVersion", getVersionName());
            
            // 读取 localStorage 数据
            // 注意：这部分需要配合 JS 代码，将 localStorage 数据传递给 Android
            
            FileWriter writer = new FileWriter(backupFile);
            writer.write(backupData.toString());
            writer.close();
            
            return backupFile.getAbsolutePath();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * 获取所有备份文件列表
     */
    @JavascriptInterface
    public String getBackupList() {
        try {
            File backupDir = new File(context.getExternalFilesDir(null), "backups");
            if (!backupDir.exists() || !backupDir.isDirectory()) {
                return "[]";
            }
            
            File[] files = backupDir.listFiles();
            if (files == null) {
                return "[]";
            }
            
            org.json.JSONArray array = new org.json.JSONArray();
            for (File file : files) {
                if (file.getName().endsWith(".json")) {
                    JSONObject obj = new JSONObject();
                    obj.put("name", file.getName());
                    obj.put("size", file.length());
                    obj.put("time", file.lastModified());
                    array.put(obj);
                }
            }
            return array.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "[]";
        }
    }
    
    // ===== 检查更新 =====
    
    /**
     * 手动检查更新
     */
    @JavascriptInterface
    public void checkUpdate() {
        activity.runOnUiThread(() -> {
            if (activity instanceof MainActivity) {
                // 调用 MainActivity 的检查更新方法
                Toast.makeText(context, "正在检查更新...", Toast.LENGTH_SHORT).show();
            }
        });
    }
    
    /**
     * 获取设备信息
     */
    @JavascriptInterface
    public String getDeviceInfo() {
        try {
            JSONObject json = new JSONObject();
            json.put("brand", Build.BRAND);
            json.put("model", Build.MODEL);
            json.put("androidVersion", Build.VERSION.RELEASE);
            json.put("sdkVersion", Build.VERSION.SDK_INT);
            json.put("packageName", context.getPackageName());
            return json.toString();
        } catch (JSONException e) {
            return "{}";
        }
    }
    
    /**
     * 退出应用
     */
    @JavascriptInterface
    public void exitApp() {
        activity.finish();
    }
    
    // ===== 语音播放 (TTS) =====
    
    /**
     * 播放英文文本语音
     * @param text 要播放的英文文本
     * @return 是否成功开始播放
     */
    @JavascriptInterface
    public boolean speakEnglish(String text) {
        if (!ttsInitialized) {
            return false;
        }
        
        activity.runOnUiThread(() -> {
            textToSpeech.setLanguage(Locale.US);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null, null);
            } else {
                textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null);
            }
        });
        return true;
    }
    
    /**
     * 播放中文文本语音
     * @param text 要播放的中文文本
     * @return 是否成功开始播放
     */
    @JavascriptInterface
    public boolean speakChinese(String text) {
        if (!ttsInitialized) {
            return false;
        }
        
        activity.runOnUiThread(() -> {
            textToSpeech.setLanguage(Locale.CHINESE);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null, null);
            } else {
                textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null);
            }
        });
        return true;
    }
    
    /**
     * 检查语音播放是否可用
     * @return 是否可用
     */
    @JavascriptInterface
    public boolean isTtsAvailable() {
        return ttsInitialized;
    }
    
    /**
     * 停止语音播放
     */
    @JavascriptInterface
    public void stopSpeaking() {
        if (textToSpeech != null) {
            textToSpeech.stop();
        }
    }
    
    /**
     * 释放TTS资源（在Activity销毁时调用）
     */
    public void shutdownTts() {
        if (textToSpeech != null) {
            textToSpeech.stop();
            textToSpeech.shutdown();
        }
    }
    
    // ===== 读取 Assets 文件 =====
    
    /**
     * 从 assets 目录读取文本文件
     * @param filePath assets 中的文件路径，如 "www/data/english_reading_35_passages.json"
     * @param callback JS回调函数名
     */
    @JavascriptInterface
    public void readAssetFile(String filePath, String callback) {
        try {
            InputStream is = context.getAssets().open(filePath);
            int size = is.available();
            byte[] buffer = new byte[size];
            is.read(buffer);
            is.close();
            String content = new String(buffer, StandardCharsets.UTF_8);
            
            // 转义后返回
            String jsonResult = "{\"success\":true,\"content\":\"" + escapeJson(content) + "\"}";
            runJsCallback(callback, jsonResult);
        } catch (IOException e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : "读取文件失败";
            runJsCallback(callback, "{\"success\":false,\"error\":\"" + escapeJson(errorMsg) + "\"}");
        }
    }
    
    // ===== ML Kit 本地翻译 =====
    
    /**
     * 检查翻译模型是否已下载
     * @return 是否已下载
     */
    @JavascriptInterface
    public boolean isTranslationModelDownloaded() {
        return translatorInitialized && englishToChineseTranslator != null;
    }
    
    /**
     * 下载翻译模型
     * @param callback JS回调函数名
     */
    @JavascriptInterface
    public void downloadTranslationModel(String callback) {
        if (!translatorInitialized || englishToChineseTranslator == null) {
            runJsCallback(callback, "{\"success\":false,\"error\":\"翻译器未初始化\"}");
            return;
        }
        
        if (translatorDownloading) {
            runJsCallback(callback, "{\"success\":false,\"error\":\"模型下载中，请稍候\"}");
            return;
        }
        
        translatorDownloading = true;
        
        DownloadConditions conditions = new DownloadConditions.Builder()
                .requireWifi()
                .build();
        
        englishToChineseTranslator.downloadModelIfNeeded(conditions)
                .addOnSuccessListener(unused -> {
                    translatorDownloading = false;
                    runJsCallback(callback, "{\"success\":true,\"message\":\"模型下载完成\"}");
                })
                .addOnFailureListener(e -> {
                    translatorDownloading = false;
                    String errorMsg = e.getMessage() != null ? e.getMessage() : "未知错误";
                    runJsCallback(callback, "{\"success\":false,\"error\":\"" + escapeJson(errorMsg) + "\"}");
                });
    }
    
    /**
     * 翻译英文文本为中文（本地离线翻译）
     * @param text 要翻译的英文
     * @param callback JS回调函数名
     */
    @JavascriptInterface
    public void translateEnglishToChinese(String text, String callback) {
        if (!translatorInitialized || englishToChineseTranslator == null) {
            runJsCallback(callback, "{\"success\":false,\"error\":\"翻译器未初始化\"}");
            return;
        }
        
        if (text == null || text.trim().isEmpty()) {
            runJsCallback(callback, "{\"success\":false,\"error\":\"文本为空\"}");
            return;
        }
        
        englishToChineseTranslator.translate(text)
                .addOnSuccessListener(translatedText -> {
                    String result = "{\"success\":true,\"original\":\"" + escapeJson(text) + "\",\"translated\":\"" + escapeJson(translatedText) + "\"}";
                    runJsCallback(callback, result);
                })
                .addOnFailureListener(e -> {
                    String errorMsg = e.getMessage() != null ? e.getMessage() : "翻译失败";
                    // 检查是否是模型未下载的错误
                    if (errorMsg.toLowerCase().contains("model")) {
                        errorMsg = "翻译模型未下载，请先调用 downloadTranslationModel()";
                    }
                    runJsCallback(callback, "{\"success\":false,\"error\":\"" + escapeJson(errorMsg) + "\"}");
                });
    }
    
    /**
     * 批量翻译多个句子
     * @param jsonArray JSON数组字符串，包含要翻译的文本列表
     * @param callback JS回调函数名
     */
    @JavascriptInterface
    public void translateBatch(String jsonArray, String callback) {
        if (!translatorInitialized || englishToChineseTranslator == null) {
            runJsCallback(callback, "{\"success\":false,\"error\":\"翻译器未初始化\"}");
            return;
        }
        
        try {
            org.json.JSONArray inputArray = new org.json.JSONArray(jsonArray);
            org.json.JSONArray resultArray = new org.json.JSONArray();
            final int[] completedCount = {0};
            final int total = inputArray.length();
            
            if (total == 0) {
                runJsCallback(callback, "{\"success\":true,\"results\":[]}");
                return;
            }
            
            for (int i = 0; i < total; i++) {
                final int index = i;
                final String text = inputArray.getString(i);
                
                englishToChineseTranslator.translate(text)
                        .addOnSuccessListener(translatedText -> {
                            JSONObject item = new JSONObject();
                            try {
                                item.put("index", index);
                                item.put("original", text);
                                item.put("translated", translatedText);
                                item.put("success", true);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            resultArray.put(item);
                            
                            completedCount[0]++;
                            if (completedCount[0] >= total) {
                                // 所有翻译完成，按顺序排序
                                runJsCallback(callback, "{\"success\":true,\"results\":" + sortJsonArray(resultArray).toString() + "}");
                            }
                        })
                        .addOnFailureListener(e -> {
                            JSONObject item = new JSONObject();
                            try {
                                item.put("index", index);
                                item.put("original", text);
                                item.put("translated", "");
                                item.put("success", false);
                                item.put("error", e.getMessage());
                            } catch (JSONException ex) {
                                ex.printStackTrace();
                            }
                            resultArray.put(item);
                            
                            completedCount[0]++;
                            if (completedCount[0] >= total) {
                                runJsCallback(callback, "{\"success\":true,\"results\":" + sortJsonArray(resultArray).toString() + "}");
                            }
                        });
            }
        } catch (Exception e) {
            runJsCallback(callback, "{\"success\":false,\"error\":\"\"" + escapeJson(e.getMessage()) + "\"\"}");
        }
    }
    
    /**
     * 释放翻译器资源
     */
    public void shutdownTranslator() {
        if (englishToChineseTranslator != null) {
            englishToChineseTranslator.close();
            englishToChineseTranslator = null;
        }
    }
    
    // ===== 文件选择器 =====
    
    /**
     * 打开文件选择器（用于导入JSON文件）
     * @param callback JS回调函数名
     */
    @JavascriptInterface
    public void openFilePicker(String callback) {
        this.filePickerCallback = callback;
        
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("application/json");
        intent.putExtra(Intent.EXTRA_MIME_TYPES, new String[]{"application/json", "text/plain", "*/*"});
        
        activity.runOnUiThread(() -> {
            try {
                activity.startActivityForResult(intent, FILE_PICKER_REQUEST_CODE);
            } catch (Exception e) {
                showToast("无法打开文件选择器");
                runJsCallback(callback, "{\"success\":false,\"error\":\"" + escapeJson(e.getMessage()) + "\"}");
            }
        });
    }
    
    /**
     * 处理文件选择结果（由MainActivity调用）
     */
    public void handleFilePickerResult(int requestCode, int resultCode, @Nullable Intent data) {
        if (requestCode != FILE_PICKER_REQUEST_CODE || filePickerCallback == null) {
            return;
        }
        
        if (resultCode != Activity.RESULT_OK || data == null || data.getData() == null) {
            runJsCallback(filePickerCallback, "{\"success\":false,\"error\":\"用户取消选择\"}");
            filePickerCallback = null;
            return;
        }
        
        Uri uri = data.getData();
        try {
            // 读取文件内容
            String content = readFileFromUri(uri);
            String fileName = getFileNameFromUri(uri);
            
            // 返回文件内容和文件名
            String result = "{\"success\":true,\"fileName\":\"" + escapeJson(fileName) + "\",\"content\":\"" + escapeJson(content) + "\"}";
            runJsCallback(filePickerCallback, result);
        } catch (Exception e) {
            runJsCallback(filePickerCallback, "{\"success\":false,\"error\":\"" + escapeJson(e.getMessage()) + "\"}");
        }
        
        filePickerCallback = null;
    }
    
    /**
     * 从Uri读取文件内容
     */
    private String readFileFromUri(Uri uri) throws IOException {
        StringBuilder content = new StringBuilder();
        try (InputStream inputStream = context.getContentResolver().openInputStream(uri);
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
        }
        return content.toString();
    }
    
    /**
     * 从Uri获取文件名
     */
    private String getFileNameFromUri(Uri uri) {
        String result = null;
        if (uri.getScheme().equals("content")) {
            try (android.database.Cursor cursor = context.getContentResolver().query(uri, null, null, null, null)) {
                if (cursor != null && cursor.moveToFirst()) {
                    int index = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME);
                    if (index >= 0) {
                        result = cursor.getString(index);
                    }
                }
            }
        }
        if (result == null) {
            result = uri.getLastPathSegment();
        }
        return result != null ? result : "unknown";
    }
    
    // ===== 辅助方法 =====
    
    /**
     * 运行JS回调
     */
    private void runJsCallback(String callback, String jsonData) {
        activity.runOnUiThread(() -> {
            if (activity instanceof MainActivity) {
                MainActivity mainActivity = (MainActivity) activity;
                mainActivity.runJavaScript(callback + "(" + jsonData + ")");
            }
        });
    }
    
    /**
     * 转义JSON字符串
     */
    private String escapeJson(String str) {
        if (str == null) return "";
        return str.replace("\\", "\\\\")
                  .replace("\"", "\\\"")
                  .replace("\n", "\\n")
                  .replace("\r", "\\r")
                  .replace("\t", "\\t");
    }
    
    /**
     * 按index排序JSON数组
     */
    private org.json.JSONArray sortJsonArray(org.json.JSONArray array) {
        try {
            java.util.List<JSONObject> list = new java.util.ArrayList<>();
            for (int i = 0; i < array.length(); i++) {
                list.add(array.getJSONObject(i));
            }
            list.sort((a, b) -> {
                try {
                    return Integer.compare(a.getInt("index"), b.getInt("index"));
                } catch (JSONException e) {
                    return 0;
                }
            });
            org.json.JSONArray sorted = new org.json.JSONArray();
            for (JSONObject obj : list) {
                sorted.put(obj);
            }
            return sorted;
        } catch (Exception e) {
            return array;
        }
    }
}
