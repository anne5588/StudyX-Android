# StudyX 记忆引擎 - Android APP 打包指南

## 📱 方案选择：Capacitor (推荐)

使用 Capacitor 将现有 Web 项目封装为 Android APK，优点：
- ✅ 现有代码无需修改或少量修改
- ✅ 支持离线运行
- ✅ 支持本地文件导入（词汇导入功能）
- ✅ 可访问设备原生功能（TTS语音等）
- ✅ 生成的 APK 体积小

---

## 🚀 快速打包步骤

### 第一步：安装依赖

```bash
# 安装 Node.js (如未安装，从 https://nodejs.org 下载)

# 全局安装 Capacitor CLI
npm install -g @capacitor/cli

# 进入项目目录
cd StudyX小程序

# 初始化 package.json (如没有)
npm init -y

# 安装 Capacitor 核心
npm install @capacitor/core @capacitor/android
```

### 第二步：初始化 Capacitor

```bash
# 初始化项目
npx cap init StudyX com.studyx.app --web-dir .

# 添加 Android 平台
npx cap add android
```

### 第三步：配置应用

编辑 `capacitor.config.json`：

```json
{
  "appId": "com.studyx.app",
  "appName": "StudyX记忆引擎",
  "webDir": ".",
  "bundledWebRuntime": false,
  "server": {
    "androidScheme": "https"
  },
  "plugins": {
    "LocalNotifications": {
      "smallIcon": "ic_stat_icon_config_sample",
      "iconColor": "#488AFF",
      "sound": "beep.wav"
    }
  }
}
```

### 第四步：同步资源

```bash
# 每次修改 Web 代码后执行
npx cap sync
```

### 第五步：打开 Android Studio

```bash
npx cap open android
```

### 第六步：生成 APK

在 Android Studio 中：

1. 等待 Gradle 同步完成
2. 点击菜单 `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
3. 生成的 APK 位于：`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📦 发布版本（正式APK）

### 生成签名密钥

```bash
keytool -genkey -v -keystore studyx.keystore -alias studyx -keyalg RSA -keysize 2048 -validity 10000
```

### 配置签名（android/app/build.gradle）

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file("studyx.keystore")
            storePassword "你的密码"
            keyAlias "studyx"
            keyPassword "你的密码"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 构建发布版本

```bash
# 在 Android Studio 中
Build → Generate Signed Bundle / APK
```

---

## 🔧 功能优化（APP化改进）

### 1. 添加返回键处理

在 `econLawApp.js` 中添加：

```javascript
// 处理安卓返回键
document.addEventListener('backbutton', (e) => {
    e.preventDefault();
    // 如果在弹窗中，关闭弹窗
    const modals = document.querySelectorAll('.modal');
    for (const modal of modals) {
        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
            return;
        }
    }
    // 否则返回首页
    app.switchPage('today');
});
```

### 2. 添加本地通知（复习提醒）

```javascript
// 安装插件
npm install @capacitor/local-notifications

// 使用
import { LocalNotifications } from '@capacitor/local-notifications';

// 设置复习提醒
LocalNotifications.schedule({
    notifications: [
        {
            title: "StudyX 提醒",
            body: "该复习单词了！",
            id: 1,
            schedule: { at: new Date(Date.now() + 1000 * 60 * 60 * 24) }
        }
    ]
});
```

### 3. 文件导入优化（Android）

```javascript
// 使用 Capacitor Filesystem API
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// 读取导入的词汇文件
async function readVocabFile(path) {
    const contents = await Filesystem.readFile({
        path: path,
        directory: Directory.External,
        encoding: Encoding.UTF8
    });
    return contents.data;
}
```

---

## 📱 设备测试

### 连接真机调试

1. 开启手机开发者选项和 USB 调试
2. 连接 USB 线
3. 在 Android Studio 中选择设备运行

### 常见分辨率适配

在 `styles.css` 中添加：

```css
/* 小屏幕手机 */
@media (max-width: 360px) {
    .vocab-word {
        font-size: 32px;
    }
}

/* 全面屏适配 */
@supports (padding-top: env(safe-area-inset-top)) {
    .sidebar {
        padding-top: env(safe-area-inset-top);
    }
}
```

---

## 🔄 后续更新流程

当 Web 代码更新后：

```bash
# 1. 同步资源
npx cap sync

# 2. 打开 Android Studio
npx cap open android

# 3. 重新构建 APK
# Build → Build APK(s)
```

---

## 🎯 替代方案对比

| 方案 | 工作量 | 性能 | 维护 | 推荐度 |
|------|--------|------|------|--------|
| **Capacitor** | 1天 | 良好 | 简单 | ⭐⭐⭐⭐⭐ |
| Cordova | 1天 | 一般 | 一般 | ⭐⭐⭐ |
| React Native | 2-3周 | 优秀 | 复杂 | ⭐⭐⭐⭐ |
| Flutter | 3-4周 | 优秀 | 复杂 | ⭐⭐⭐ |
| 原生开发 | 1-2月 | 最优 | 最复杂 | ⭐⭐ |

---

## 📋 检查清单

发布前确认：

- [ ] 所有页面能正常切换
- [ ] 数据能正确保存到本地
- [ ] 词汇导入功能正常
- [ ] 语音播放功能正常（如使用TTS）
- [ ] 返回键行为正常
- [ ] 横竖屏切换正常
- [ ] 离线功能正常（断网测试）
- [ ] APK 体积小于 20MB

---

## 🆘 常见问题

### Q1: 生成的 APK 无法安装？
- 检查 `minSdkVersion` 是否过低（建议 21+）
- 确保开启了"允许安装未知来源应用"

### Q2: localStorage 数据丢失？
- 使用 Capacitor Preferences API 替代 localStorage
- 或配置 `server.androidScheme` 为 `https`

### Q3: 文件导入在安卓上失败？
- 检查文件权限：`android.permission.READ_EXTERNAL_STORAGE`
- 使用 Capacitor Filesystem API 替代原生文件操作

---

## 📞 需要帮助？

Capacitor 官方文档：https://capacitorjs.com/docs

预计完整打包时间：**1-2天**（含测试）
