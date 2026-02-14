package com.studyx.app;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import java.io.File;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private ProgressBar progressBar;
    private TextView loadingText;
    private SwipeRefreshLayout swipeRefresh;
    private UpdateManager updateManager;
    private WebAppInterface webAppInterface;
    
    // 更新服务器地址（可以替换为你自己的服务器）
    private static final String UPDATE_URL = "https://your-server.com/studyx/update.json";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // 隐藏ActionBar
        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }
        
        initViews();
        initWebView();
    }
    
    private void initViews() {
        progressBar = findViewById(R.id.progressBar);
        loadingText = findViewById(R.id.loadingText);
        webView = findViewById(R.id.webView);
        swipeRefresh = findViewById(R.id.swipeRefresh);
        
        // 初始化更新管理器
        updateManager = new UpdateManager(this, UPDATE_URL);
    }
    
    @SuppressLint("SetJavaScriptEnabled")
    private void initWebView() {
        WebSettings settings = webView.getSettings();
        
        // 启用JavaScript
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        
        // 缓存设置
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        
        // 移动端适配设置
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        
        // 禁用缩放，让CSS控制布局（适配手机/平板）
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setTextZoom(100);
        
        // 混合内容模式
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        
        // 添加JavaScript接口
        webAppInterface = new WebAppInterface(this);
        webView.addJavascriptInterface(webAppInterface, "Android");
        
        // 设置WebViewClient
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                progressBar.setVisibility(View.GONE);
                loadingText.setVisibility(View.GONE);
                webView.setVisibility(View.VISIBLE);
            }
            
            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                super.onReceivedError(view, request, error);
            }
            
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                // 处理外部链接
                if (url.startsWith("http://") || url.startsWith("https://")) {
                    if (url.contains("your-server.com") || url.contains("localhost") || url.contains("127.0.0.1")) {
                        return false; // 在WebView中打开
                    } else {
                        // 外部链接使用系统浏览器打开
                        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                        startActivity(intent);
                        return true;
                    }
                }
                return false;
            }
        });
        
        // 设置WebChromeClient
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                // 可以在这里更新进度条
            }
            
            @Override
            public void onPermissionRequest(PermissionRequest request) {
                // 处理WebView权限请求（录音等）
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    String[] resources = request.getResources();
                    for (String resource : resources) {
                        if (resource.equals(PermissionRequest.RESOURCE_AUDIO_CAPTURE)) {
                            // 检查录音权限
                            if (ContextCompat.checkSelfPermission(MainActivity.this, 
                                    android.Manifest.permission.RECORD_AUDIO) 
                                    == PackageManager.PERMISSION_GRANTED) {
                                request.grant(new String[]{PermissionRequest.RESOURCE_AUDIO_CAPTURE});
                            } else {
                                // 申请录音权限
                                ActivityCompat.requestPermissions(MainActivity.this,
                                        new String[]{android.Manifest.permission.RECORD_AUDIO}, 100);
                                request.deny();
                            }
                            return;
                        }
                    }
                    request.grant(resources);
                }
            }
        });
        
        // 下拉刷新
        swipeRefresh.setOnRefreshListener(() -> {
            webView.reload();
            swipeRefresh.setRefreshing(false);
        });
        
        // 加载Web应用
        loadWebApp();
        
        // 检查更新（在需要时请求权限）
        checkForUpdate();
    }
    
    private void loadWebApp() {
        // 首先尝试加载热更新后的版本
        File updatedIndex = new File(getExternalFilesDir(null), "studyx_update/index.html");
        if (updatedIndex.exists()) {
            webView.loadUrl("file://" + updatedIndex.getAbsolutePath());
        } else {
            // 加载内置版本
            webView.loadUrl("file:///android_asset/www/index.html");
        }
    }
    
    private void checkForUpdate() {
        updateManager.checkForUpdate(new UpdateManager.UpdateCallback() {
            @Override
            public void onUpdateAvailable(UpdateManager.UpdateInfo info) {
                showUpdateDialog(info);
            }
            
            @Override
            public void onNoUpdate() {
                // 没有更新
            }
            
            @Override
            public void onError(String error) {
                // 检查更新失败，静默处理
            }
        });
    }
    
    private void showUpdateDialog(UpdateManager.UpdateInfo info) {
        new AlertDialog.Builder(this)
            .setTitle(R.string.update_title)
            .setMessage(info.getDescription() + "\n\n版本: " + info.getVersionName())
            .setPositiveButton(R.string.update_now, (dialog, which) -> {
                downloadUpdate(info.getDownloadUrl());
            })
            .setNegativeButton(R.string.update_later, null)
            .setCancelable(!info.isForce())
            .show();
    }
    
    private void downloadUpdate(String url) {
        progressBar.setVisibility(View.VISIBLE);
        loadingText.setText(R.string.downloading);
        loadingText.setVisibility(View.VISIBLE);
        
        updateManager.downloadUpdate(url, new UpdateManager.DownloadCallback() {
            @Override
            public void onSuccess() {
                runOnUiThread(() -> {
                    progressBar.setVisibility(View.GONE);
                    loadingText.setVisibility(View.GONE);
                    Toast.makeText(MainActivity.this, R.string.download_complete, Toast.LENGTH_SHORT).show();
                    // 重新加载应用
                    loadWebApp();
                    webView.reload();
                });
            }
            
            @Override
            public void onProgress(int progress) {
                // 可以更新进度条
            }
            
            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    progressBar.setVisibility(View.GONE);
                    loadingText.setVisibility(View.GONE);
                    Toast.makeText(MainActivity.this, R.string.download_failed, Toast.LENGTH_LONG).show();
                });
            }
        });
    }
    
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
    
    @Override
    protected void onDestroy() {
        // 释放TTS资源
        if (webAppInterface != null) {
            webAppInterface.shutdownTts();
            webAppInterface.shutdownTranslator();
        }
        
        if (webView != null) {
            webView.stopLoading();
            webView.loadUrl("about:blank");
            webView.removeAllViews();
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }
    
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, 
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == 100) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(this, "录音权限已授权，请重新点击录音按钮", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(this, "需要录音权限才能使用录音功能", Toast.LENGTH_LONG).show();
            }
        }
    }
    
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        // 将结果传递给 WebAppInterface 处理文件选择
        if (webAppInterface != null) {
            webAppInterface.handleFilePickerResult(requestCode, resultCode, data);
        }
    }
    
    /**
     * 执行JavaScript代码
     * @param script 要执行的JS代码
     */
    public void runJavaScript(String script) {
        if (webView != null) {
            runOnUiThread(() -> {
                webView.evaluateJavascript(script, null);
            });
        }
    }
}
