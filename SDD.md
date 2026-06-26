# 简历个人网站 SDD

## 系统结构

本项目是静态页面 + Vercel Serverless API：

- `index.html`：页面结构、导航锚点、简历内容与数字分身容器。
- `styles.css`：米色/橄榄视觉系统、响应式布局、动效与状态样式。
- `app.js`：导航高亮、滚动入场、数字分身对话、调用 `/api/chat`。
- `api/chat.js`：后端函数，读取 DeepSeek 环境变量并调用模型接口。
- `assets/avatar.png`：彩色头像资源，来自简历照片目录副本。

## 核心流程

### 页面浏览

用户打开 `index.html` -> 浏览器加载头像、样式和脚本 -> 顶部导航固定显示 -> 用户点击导航 -> 页面平滑滚动到对应锚点 -> 当前板块导航高亮。

### 数字分身对话

用户进入 `#avatar` -> 输入问题或点击快捷问题 -> 前端请求 `/api/chat` -> 后端函数把简历摘要与用户问题组成上下文 -> 调用 DeepSeek `chat/completions` 接口 -> 将回答返回前端并追加到对话记录。

## 数据边界

- 简历知识库写在 `api/chat.js` 的 `resumeKnowledge` 中，内容来自简历 1.3 版。
- API Key 不进入前端页面，通过部署平台环境变量 `DEEPSEEK_API_KEY` 注入。
- 调用模型时会向 DeepSeek 发送简历摘要与访问者提问内容。

## 接口设计

后端默认接口：

```text
POST https://api.deepseek.com/chat/completions
Authorization: Bearer <DEEPSEEK_API_KEY>
Content-Type: application/json
```

请求体：

```json
{
  "model": "deepseek-v4-flash",
  "messages": [
    {"role": "system", "content": "数字分身系统提示词与简历摘要"},
    {"role": "user", "content": "用户问题"}
  ],
  "temperature": 0.5
}
```

## 异常处理

- 未配置 API Key：后端返回配置错误，不在前端暴露密钥。
- 请求失败：展示温和错误信息，保留用户输入。
- 返回格式异常：提示接口返回无法解析。
- 使用 `file://` 或普通本地静态服务器预览时，前端会使用本地预览回答，避免误以为已接通真实模型。

## 验证策略

- 文件存在性检查：确认 `index.html`、`styles.css`、`app.js`、头像资源存在。
- 静态打开验证：用浏览器打开本地文件，确认本地预览可用。
- 部署验证：Vercel 设置环境变量后，访问正式域名测试 `/api/chat`。
- 响应式验证：检查桌面宽度与手机宽度布局。
- 交互验证：导航锚点、快捷问题、输入发送、本地预览回答。
