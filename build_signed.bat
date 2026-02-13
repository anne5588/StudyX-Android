@echo off
chcp 65001 >nul
echo ==========================================
echo    StudyX 签名 APK 构建脚本
echo ==========================================
echo.

:: 检查 keystore
set KEYSTORE_FILE=studyx.keystore
set KEY_ALIAS=studyx
set STORE_PASS=studyx123
set KEY_PASS=studyx123

if not exist %KEYSTORE_FILE% (
    echo [1/4] 创建签名密钥库...
    keytool -genkey -v -keystore %KEYSTORE_FILE% -alias %KEY_ALIAS% -keyalg RSA -keysize 2048 -validity 10000 -storepass %STORE_PASS% -keypass %KEY_PASS% -dname "CN=StudyX, OU=StudyX, O=StudyX, L=Beijing, ST=Beijing, C=CN"
    if %ERRORLEVEL% NEQ 0 (
        echo [错误] 创建密钥库失败
        pause
        exit /b 1
    )
) else (
    echo [1/4] 使用现有密钥库: %KEYSTORE_FILE%
)

echo.
echo [2/4] 正在构建 APK...
call gradlew assembleRelease

if %ERRORLEVEL% NEQ 0 (
    echo [错误] 构建失败！
    pause
    exit /b 1
)

echo.
echo [3/4] 正在签名 APK...
set UNSIGNED_APK=app\build\outputs\apk\release\app-release-unsigned.apk
set SIGNED_APK=app\build\outputs\apk\release\StudyX-v1.0.0.apk

if exist %SIGNED_APK% del %SIGNED_APK%

jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore %KEYSTORE_FILE% -storepass %STORE_PASS% -keypass %KEY_PASS% %UNSIGNED_APK% %KEY_ALIAS%

if %ERRORLEVEL% NEQ 0 (
    echo [错误] 签名失败！
    pause
    exit /b 1
)

echo.
echo [4/4] 优化 APK...
zipalign -v 4 %UNSIGNED_APK% %SIGNED_APK%

echo.
echo ==========================================
echo    构建成功！
echo ==========================================
echo.
echo 签名 APK: %SIGNED_APK%
echo.
echo 安装到设备:
echo   adb install -r %SIGNED_APK%
echo.
pause
