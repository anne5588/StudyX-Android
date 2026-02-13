# ProGuard rules
# 保留 WebView JavaScript 接口
-keepclassmembers class com.studyx.app.WebAppInterface {
    @android.webkit.JavascriptInterface <methods>;
}

# 保留 UpdateManager
-keep class com.studyx.app.UpdateManager { *; }
