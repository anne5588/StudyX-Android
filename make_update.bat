@echo off
chcp 65001 >nul
echo ==========================================
echo    StudyX 热更新包制作工具
echo ==========================================
echo.

set /p VERSION="请输入新版本号 (例如 1.1.0): "
set /p VERSION_CODE="请输入版本代码 (数字，必须大于当前): "
set /p DESC="请输入更新描述: "

set ZIP_NAME=studyx_v%VERSION%.zip
set OUTPUT_DIR=updates

echo.
echo [1/3] 准备更新目录...
if not exist %OUTPUT_DIR% mkdir %OUTPUT_DIR%

set SOURCE_DIR=app\src\main\assets\www

if not exist %SOURCE_DIR% (
    echo [错误] 源目录不存在: %SOURCE_DIR%
    pause
    exit /b 1
)

echo.
echo [2/3] 打包 Web 资源...
cd %SOURCE_DIR%
tar -acf ..\..\..\..\..\%OUTPUT_DIR%\%ZIP_NAME% *
cd ..\..\..\..\..

echo.
echo [3/3] 生成 update.json...
(
echo {
echo   "versionCode": %VERSION_CODE%,
echo   "versionName": "%VERSION%",
echo   "minVersionCode": 1,
echo   "downloadUrl": "https://your-server.com/updates/%ZIP_NAME%",
echo   "description": "%DESC%",
echo   "force": false
echo }
) > %OUTPUT_DIR%\update.json

echo.
echo ==========================================
echo    更新包制作完成！
echo ==========================================
echo.
echo 输出文件:
echo   - %OUTPUT_DIR%\%ZIP_NAME%
echo   - %OUTPUT_DIR%\update.json
echo.
echo 下一步:
echo   1. 将 %ZIP_NAME% 上传到服务器
echo   2. 修改 update.json 中的 downloadUrl
echo   3. 将 update.json 上传到服务器
echo   4. 修改 MainActivity.java 中的 UPDATE_URL
echo.
pause
