# 🎄 Christmas Tree Gesture

一款由 **Gemini 3** 生成创意、结合前端实时渲染与 AI 手势识别的 **3D 粒子圣诞树交互项目**。  
通过摄像头识别你的手势，在浏览器中实时控制粒子圣诞树的旋转、还原和聚焦特效，带来沉浸式的节日互动体验。

---

## ✨ 项目简介

- 这是一个基于 **手势控制** 的 **3D 粒子 + 照片云** 互动圣诞树项目  
- 使用摄像头捕捉你的手势，驱动 Three.js 粒子圣诞树在不同状态之间切换  
- 支持 **PC 端直接使用摄像头**，以及 **手机 + PC 协同控制模式**  
- 视觉风格以 **哑光绿 + 金属金 + 圣诞红** 为主色，搭配辉光、光晕等效果，整体偏电影感与高级质感

---

## ✨ 版本介绍

- V1版本为*最基础*版本，不包含手机+PC协同模式、图片圣诞树分享功能
- V2版本为*功能进阶*版本，包含含手机+PC协同模式、图片圣诞树分享功能

- V2版本需要公网服务器以及HTTPS，现在开源计划进行中，敬请期待！

---

## 🎮 交互玩法（手势说明）

请确保摄像头权限已开启，在摄像头前进行以下手势操作：

| 手势 | 描述 | 功能 |
|------|------|------|
| ✊ 握拳 (Fist) | 手指收拢成拳头 | 回到「合拢态」，圣诞树恢复为圆锥体形态 |
| 🖐️ 打开五指 (Open Palm) | 手掌张开、手指分开 | 进入「散开态」，粒子漂浮在空间中 |
| 👋 手掌移动 / 旋转 | 在散开态下移动手 | 根据手的移动调整相机角度 / 旋转画面 |
| 🤏 指尖捏合 (Pinch) | 拇指与食指靠近 | 抓住一张照片，进入「照片放大态」 |

当前项目还扩展了 **手机 + PC 协同模式**：

- 📱 手机端：打开专用页面，使用手机摄像头进行手势识别  
- 💻 PC 端：渲染 3D 粒子圣诞树，通过网络接收手机端的手势数据  
- 通过 WebRTC + Socket.IO 实现 **手势数据的实时同步**

---

## ✨ 功能特性

- 🖐 **手势控制 3D 粒子圣诞树**
  - 张开手掌：旋转视角、让粒子树散开悬浮
  - 握紧拳头：还原为圣诞树合拢形态
  - 捏合手势：选中并放大某个照片粒子

- 🖼 **图片分享圣诞树**
  - 支持将当前状态下的 3D 粒子圣诞树生成图片
  - 一键保存到本地，或复制分享链接
  - 把自己定制的「照片云圣诞树」发给朋友查看 🎁

- 📱💻 **双端协同交互**
  - 手机端负责摄像头与 AI 手势识别
  - PC 端负责 Three.js 3D 渲染与交互展示
  - WebRTC + Socket.IO 保证两端之间低延迟数据同步

- 🌟 **实时 3D 粒子特效**
  - 粒子化圣诞树、灯光闪烁、景深与辉光效果
  - 树形态 / 散开态 / 聚焦态 多种状态切换

- 🧠 **AI 手势识别（浏览器端）**
  - 使用 Google MediaPipe Hand Landmarker（WASM 版本）
  - 实时检测手部关键点并解析自定义手势逻辑
  - 包含简单防抖与连续帧判断，降低误判

- 🧩 **照片云与照片放大**
  - 支持上传多张照片，构建「照片云」
  - 在散开态中，照片以粒子形式漂浮
  - 捏合选中后进入照片放大态，突出展示单张照片

- 🧊 **沉浸式视觉体验**
  - 圣诞主题配色（哑光绿 / 金属金 / 圣诞红）
  - 辉光、光晕、柔和运动，营造梦幻电影感氛围

---

## 🧩 功能模块

- 🎄 **3D 粒子圣诞树渲染模块**
  - 基于 Three.js 搭建粒子圣诞树主体、装饰球、方块、糖果棍等元素
  - 支持树形态、散开态、聚焦态的平滑过渡与动画控制

- ✋ **手势识别与状态判定模块**
  - 使用 MediaPipe Hand Landmarker 进行手部关键点检测
  - 解析握拳、张手、捏合等手势，映射为 `TREE` / `SCATTER` / `FOCUS` 等模式
  - 内置简单防抖与连续帧判断逻辑，减少误触发

- 🧭 **手势 → 场景交互映射模块**
  - 将手势识别结果转换为相机旋转、状态切换、焦点选中等操作
  - 支持基于手部移动的视角旋转、粒子散开/合拢、照片聚焦放大

- 📱💻 **手机–PC 协同控制模块**
  - 手机端负责摄像头采集与手势识别
  - 通过 WebRTC + Socket.IO 将手势数据实时发送到 PC 端
  - PC 端根据远程手势数据驱动 Three.js 场景交互

- 🖼️ **照片上传与照片云模块**
  - 支持用户上传本地照片，生成照片粒子
  - 在散开态中以「照片云」形式分布在场景中
  - 捏合手势选中单张照片并放大展示

- 🧊 **视觉效果与氛围渲染模块**
  - 粒子辉光、光晕与动态灯光
  - 圣诞主题配色与相机缓动，增强沉浸感

- 🧱 **UI 与引导模块**
  - 手势操作引导面板、状态提示栏、加载动画与错误提示
  - 支持隐藏/显示辅助信息，实现沉浸式观赏模式

- 🌐 **服务与通信基础模块**
  - 使用 Node.js + Express 提供静态资源与页面服务
  - 使用 Socket.IO 管理房间、连接状态与手势数据转发

---

## 🧠 技术栈

- 🎨 渲染引擎：`Three.js`
- ✋ 手势识别：`MediaPipe Hand Landmarker`（WASM）
- 🔌 实时通信：`WebRTC`、`Socket.IO`
- 🌐 服务端：`Node.js` + `Express`
- 📦 项目管理：`npm`

`package.json` 关键字段示例：

```json
{
  "name": "christmas-tree-gesture",
  "version": "1.0.0",
  "description": "圣诞树手势控制系统",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "generate-cert": "node generate-cert.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.6.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "keywords": ["christmas", "gesture", "webrtc", "mediapipe"],
  "license": "MIT"
}
```

---

## 🚀 快速开始

### 1.本地使用
```bash
Live Server 插件：
![ScreenShot_2025-12-16_202857_536](https://img.lenyiin.com/app/hide.php?key=dkZRNmMxeksxSDJhaVFYQm5PZEVYYlFvY0ZZOFVZK1VGcWl0bGw0PQ==)

- 直接打开 index.html ，用 VS Code 的 Live Server 启动。
- 但是：它只提供静态文件服务，不会跑项目里的 WebSocket 信令、分享 API 等 Node 后端逻辑。
```
```bash
1.安装依赖（只需一次）：
npm install

2.正常启动服务器
npm start
- 默认监听端口 8000 ，控制台会打印：
 本地访问： http://localhost:8000 或 https://localhost:8000
- 如果配置了证书，会自动用 HTTPS，摄像头功能才可用。
```


### 2. 克隆项目

```bash
git clone [<your-repo-url>](https://github.com/liutingfenga/gemini3-gesture-3d-particle-tree.git).git
cd christmas-tree-gesture
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动本地服务

开发模式（自动重启）：

```bash
npm run dev
```

或普通启动：

```bash
npm start
```

默认情况下服务器会在类似 `http://localhost:3000` 端口运行（具体端口以 `server.js` 中配置为准）。

---

## 🎮 使用说明

### 模式一：单机（PC 摄像头）

1. 在 PC 浏览器中访问本地服务地址，例如：  
   `http://localhost:3000`
2. 允许浏览器访问摄像头权限
3. 在摄像头前做出以下手势：
   - 🖐 张开手掌：散开粒子、旋转视角
   - ✊ 握拳：还原为圣诞树
   - 🤏 捏合：选中并放大照片粒子
4. 通过页面状态栏查看当前手势与模型状态

### 模式二：手机 + PC 协同控制

1. 在 PC 浏览器中打开项目主页面（用于展示 3D 粒子圣诞树）
2. 使用手机扫描页面上的二维码 / 打开专用手机端链接
3. 在手机端授予摄像头权限，开始手势识别
4. 等待手机与 PC 通过 WebRTC / Socket.IO 建立连接
5. 在手机端做手势，PC 端的粒子圣诞树将会实时响应手势变化

---

## 📁 项目结构（示例）

```bash
.
├── assets/                     # 模型 / 纹理 / hand_landmarker.task 等资源
├── js/
│   ├── three/                  # Three.js 库及扩展模块
│   ├── mediapipe/              # MediaPipe WASM 相关文件
│   └── socket.io.min.js        # Socket.IO 客户端
├── index.html                  # 主页面（包含手势逻辑与 Three.js 场景）
├── server.js                   # Node.js + Express 服务端
├── package.json
└── README.md                   # 项目说明（本文件）
```

---

## 📝 声明与致谢

### 基础代码来源

本项目的最基础代码基于：

- 原始项目仓库：[`echoezy9527/christmas-tree-generated-by-gemini-3`](https://github.com/echoezy9527/christmas-tree-generated-by-gemini-3)

该仓库为「**Gemini 3 生成的基于手势控制 3D 粒子圣诞树**」的原始实现。  
本仓库在此基础上，增加/调整了包括但不限于：

- 音乐管理
- 图片上传
- 图片上传
- 分享功能
- 标题设置
- 背景设置
- 粒子设置
- 链接手机摄像头操控PC页面
- 手机 + PC 协同控制逻辑（WebRTC + Socket.IO）
- 更细化的手势状态管理与 UI 引导
- Node服务（Node.js + Express）等

在此向原作者及其创意致以诚挚的感谢与致敬。🙏

### 开源组件致谢

- [Three.js](https://threejs.org/)
- [MediaPipe](https://developers.google.com/mediapipe)
- [Socket.IO](https://socket.io/)
- 以及所有为 Web 实时图形和 AI 交互生态做出贡献的开源项目 🙌

---

## 📜 License

- 本项目基于原始仓库的授权方式进行分享  
- 允许个人学习、二创、分享  
- 如用于商业场景或公开发布，请注明原始仓库及本项目来源
