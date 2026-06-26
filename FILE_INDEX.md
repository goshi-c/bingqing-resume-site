# 简历个人网站 FILE_INDEX

## 项目入口

- `index.html`：单页网站入口，包含导航、简历内容、数字分身板块和底部信息。
- `styles.css`：视觉风格、响应式布局、动效和聊天区域样式。
- `app.js`：滚动动效、导航高亮、数字分身本地预览回答与 `/api/chat` 调用。
- `api/chat.js`：Vercel Serverless API，读取 DeepSeek 环境变量并调用模型。
- `package.json`：Vercel 本地开发脚本。
- `.env.example`：DeepSeek 环境变量示例，不包含真实密钥。
- `.gitignore`：忽略 `.env.local`、`.vercel`、`node_modules`。

## 资源

- `assets/avatar.png`：页面头像与数字分身头像，来自 `../简历照片/董冰清_蓝底证件照_简历头像.png`。

## 项目文档

- `PRD.md`：MVP 产品范围与验收标准。
- `SDD.md`：静态网站结构、对话调用流程和数据边界。
- `TODO.md`：当前任务状态与下一阶段建议。
- `PROJECT_CONTEXT.md`：历史上下文、验证结果和风险边界。

## 运行方式

静态预览可在 `D:\obsidian\MyVault\03_实习相关\简历\简历网站` 中运行：

```powershell
python -m http.server 5179
```

然后打开：

```text
http://127.0.0.1:5179/
```

真实模型调用需要 Vercel 部署并配置环境变量：

```text
DEEPSEEK_API_KEY
DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions
DEEPSEEK_MODEL=deepseek-v4-flash
```
