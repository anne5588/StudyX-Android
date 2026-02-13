@echo off
chcp 65001 >nul
echo ==========================================
echo    StudyX 本地测试服务器
echo ==========================================
echo.

:: 获取本机IP地址
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set IP=%%a
    goto :found_ip
)
:found_ip
set IP=%IP: =%

echo [1/3] 启动HTTP服务器...
cd app\src\main\assets\www

echo [2/3] 服务器信息:
echo   - 本地访问: http://localhost:8080
echo   - 局域网访问: http://%IP%:8080
echo.
echo [3/3] 使用方法:
echo   1. 电脑浏览器访问: http://localhost:8080
echo   2. 手机浏览器访问: http://%IP%:8080
echo      (需手机和电脑在同一WiFi)
echo.
echo 按 Ctrl+C 停止服务器
echo ==========================================
echo.

:: 尝试使用Python启动服务器
python -m http.server 8080 2>nul
if %ERRORLEVEL% EQU 0 goto :end

:: 如果Python失败，尝试Python3
python3 -m http.server 8080 2>nul
if %ERRORLEVEL% EQU 0 goto :end

:: 如果都失败，提示安装Python
echo [错误] 未找到Python，请安装Python 3.6+
echo 下载地址: https://www.python.org/downloads/
echo.
pause

:end
