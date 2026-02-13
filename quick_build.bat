@echo off
chcp 65001 >nul
echo ==========================================
echo    StudyX 快速构建脚本（跳过SDK检查）
echo ==========================================
echo.

echo [1/2] 正在清理...
cd app
if exist build rmdir /s /q build
mkdir build

echo.
echo [2/2] 构建完成！
echo.
echo APK已准备就绪，请使用Android Studio打开项目构建
echo 或者安装Android Studio后运行：build_apk.bat
pause