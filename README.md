# StudyX Android APP

StudyX 学习助手的 Android 原生应用，基于 WebView 打包，支持热更新。

## 特性

- 🚀 **原生 WebView** - 轻量快速，无需额外运行时
- 🔄 **热更新支持** - 支持 Web 资源热更新，无需重新安装 APK
- 💾 **本地存储增强** - 更大的存储空间，支持文件导入导出
- 📤 **分享功能** - 支持系统级分享文本和文件
- 🔒 **数据备份** - 支持数据备份到本地文件

## 项目结构

```
StudyX-Android/
├── app/
│   ├── src/main/
│   │   ├── java/com/studyx/app/
│   │   │   ├── MainActivity.java      # 主活动
│   │   │   ├── UpdateManager.java     # 热更新管理器
│   │   │   └── WebAppInterface.java   # JS 桥接类
│   │   ├── res/                        # 资源文件
│   │   └── assets/www/                 # Web 应用文件
│   └── build.gradle                    # App 构建配置
├── build.gradle                        # 项目构建配置
└── README.md                           # 本文件
```

## 构建要求

- Android Studio Arctic Fox (2020.3.1) 或更高版本
- Android SDK 34
- JDK 11 或更高版本

## 快速开始

### 方法 1：使用 Android Studio（推荐）

1. 打开 Android Studio
2. 选择 "Open an Existing Project"
3. 选择 `StudyX-Android` 目录
4. 等待 Gradle 同步完成
5. 点击菜单栏的 `Build > Generate Signed Bundle / APK`
6. 选择 APK，按照向导创建密钥并构建

### 方法 2：使用命令行

```bash
# Windows
build_apk.bat

# Mac/Linux
./gradlew assembleRelease
```

### 方法 3：生成签名 APK

```bash
build_signed.bat
```

这将自动创建密钥库并生成签名的 APK。

## 热更新配置

### 1. 准备更新服务器

在服务器上托管一个 `update.json` 文件：

```json
{
  "versionCode": 2,
  "versionName": "1.1.0",
  "minVersionCode": 1,
  "downloadUrl": "https://your-server.com/updates/studyx_v1.1.0.zip",
  "description": "修复了一些问题，优化了性能",
  "force": false
}
```

### 2. 修改更新服务器地址

编辑 `MainActivity.java`：

```java
// 修改为你的更新服务器地址
private static final String UPDATE_URL = "https://your-server.com/studyx/update.json";
```

### 3. 打包 Web 资源

将更新后的 Web 文件打包为 ZIP：

```bash
cd StudyX-Android/app/src/main/assets/www
zip -r studyx_v1.1.0.zip .
```

上传到服务器对应的位置。

### 4. 更新规则

| 字段 | 说明 |
|------|------|
| `versionCode` | Web 资源版本号，递增 |
| `versionName` | 显示版本名 |
| `minVersionCode` | 最低支持的 App 版本号 |
| `downloadUrl` | ZIP 包下载地址 |
| `description` | 更新说明 |
| `force` | 是否强制更新 |

## JavaScript 接口

在 Web 应用中可以通过 `Android` 对象调用原生功能：

```javascript
// 显示 Toast
Android.showToast("Hello from Web!");

// 获取 App 版本
const version = JSON.parse(Android.getAppVersion());
console.log(version.versionName);

// 振动反馈
Android.vibrate(100);

// 复制到剪贴板
Android.copyToClipboard("要复制的文本");

// 从剪贴板粘贴
const text = Android.pasteFromClipboard();

// 分享文本
Android.shareText("分享内容", "分享标题");

// 打开浏览器
Android.openUrl("https://example.com");

// 获取设备信息
const device = JSON.parse(Android.getDeviceInfo());

// 退出 App
Android.exitApp();
```

## 本地存储

相比浏览器 localStorage 的 5MB 限制，Android 版提供更大的存储空间：

```javascript
// 保存到文件
Android.saveToFile("mydata.json", JSON.stringify(data));

// 从文件读取
const data = Android.readFromFile("mydata.json");

// 导出到下载目录
Android.exportToDownloads("backup.json", JSON.stringify(data));

// 从下载目录导入
const data = Android.importFromDownloads("backup.json");
```

## 自定义图标

替换以下目录中的图标文件：

- `app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192x192)
- `app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144x144)
- `app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96x96)
- `app/src/main/res/mipmap-hdpi/ic_launcher.png` (72x72)
- `app/src/main/res/mipmap-mdpi/ic_launcher.png` (48x48)

## 常见问题

### Q: 如何修改应用名称？
编辑 `app/src/main/res/values/strings.xml`：
```xml
<string name="app_name">你的应用名</string>
```

### Q: 如何修改包名？
1. 修改 `app/build.gradle` 中的 `applicationId`
2. 重命名 `java/com/studyx/app` 目录
3. 修改所有 Java 文件的 `package` 声明

### Q: 热更新不工作？
- 检查 `UPDATE_URL` 是否正确
- 检查 ZIP 包是否正确打包
- 检查网络权限
- 查看 Logcat 日志

### Q: WebView 白屏？
- 确保 assets/www/index.html 存在
- 检查 WebView 是否启用了 JavaScript
- 查看 Logcat 错误日志

## 发布到应用商店

1. 修改版本号：`app/build.gradle` 中的 `versionCode` 和 `versionName`
2. 生成签名 APK
3. 测试所有功能
4. 准备应用截图和描述
5. 上传到应用商店

## 许可证

本项目仅供学习使用。
