@echo off
chcp 65001 >nul
echo ==========================================
echo    StudyX 快速预览工具
echo ==========================================
echo.
echo 选择预览方式:
echo.
echo 1. 浏览器直接预览 (推荐，最快)
echo    - 适用于界面样式测试
echo    - 支持开发者工具调试
echo.
echo 2. 本地HTTP服务器
echo    - 适用于手机真机测试
echo    - 手机和电脑需在同一WiFi
echo.
echo 3. 使用说明
echo.
choice /c 123 /n /m "请选择 [1/2/3]: "

if %ERRORLEVEL% EQU 1 goto browser
if %ERRORLEVEL% EQU 2 goto server
if %ERRORLEVEL% EQU 3 goto help

:browser
echo.
echo [1/2] 正在启动浏览器预览...
echo.
start "" "电脑端预览.html"
echo ✅ 已打开电脑端预览页面
echo.
echo 提示: 按 F12 打开开发者工具，点击手机图标切换设备模式
echo.
pause
exit

:server
echo.
echo [2/2] 正在启动HTTP服务器...
echo.
call start_server.bat
exit

:help
echo.
echo ==========================================
echo    使用说明
echo ==========================================
echo.
echo 【方案一：浏览器预览】
echo 1. 双击运行"快速预览.bat"，选择1
echo 2. 浏览器会自动打开预览页面
echo 3. 选择设备型号（如iPhone 14 Pro）
echo 4. 修改代码后点击刷新按钮查看效果
echo.
echo 【方案二：Android Studio模拟器】
echo 1. 打开Android Studio
echo 2. Tools → Device Manager → Create Device
echo 3. 选择Pixel 6，下载Android 11系统
echo 4. 点击运行按钮启动模拟器
echo 5. 将APK拖到模拟器窗口安装
echo.
echo 【方案三：第三方模拟器】
echo 推荐: 雷电模拟器、夜神模拟器
echo 直接拖拽APK到模拟器即可安装
echo.
echo 【热更新开发流程】
echo 1. 用浏览器预览修改界面
echo 2. 满意后运行 make_update.bat 生成更新包
echo 3. 上传更新包到服务器
echo 4. 手机APP自动检测更新
echo.
pause
exit
