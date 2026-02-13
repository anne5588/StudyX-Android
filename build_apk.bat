@echo off
chcp 65001 >nul
echo ==========================================
echo    StudyX Android APP 构建脚本
echo ==========================================
echo.

:: 检查是否安装了 Android SDK
if "%ANDROID_SDK_ROOT%"=="" (
    if "%ANDROID_HOME%"=="" (
        echo [错误] 未找到 Android SDK
        echo 请设置 ANDROID_SDK_ROOT 或 ANDROID_HOME 环境变量
        pause
        exit /b 1
    )
)

:: 设置 Gradle 路径
set GRADLEW=gradlew.bat

:: 检查 gradlew 是否存在
if not exist %GRADLEW% (
    echo [信息] 未找到 gradlew，尝试使用系统 Gradle...
    where gradle >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo [错误] 未找到 Gradle
        echo 请安装 Gradle 或下载包含 gradlew 的完整项目
        pause
        exit /b 1
    )
    set GRADLEW=gradle
)

echo [1/3] 正在清理构建...
%GRADLEW% clean

echo.
echo [2/3] 正在构建 APK...
%GRADLEW% assembleRelease

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [错误] 构建失败！
    pause
    exit /b 1
)

echo.
echo [3/3] 构建完成！
echo.
echo APK 输出路径:
echo   - 未签名测试版: app\build\outputs\apk\release\app-release-unsigned.apk
echo.
echo 下一步:
echo   1. 使用 Android Studio 打开此项目
echo   2. 或使用 build_signed.bat 生成签名 APK
echo.
pause
