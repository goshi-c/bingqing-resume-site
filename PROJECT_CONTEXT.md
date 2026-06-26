# 简历个人网站 PROJECT_CONTEXT

## CTX-001 MVP 创建与验证

- 时间：2026-06-26
- 范围：基于当前简历材料创建一个独立静态个人网站。
- 读取材料：
  - `../过往简历/董冰清_AI产品经理_一页简历_1.3版.md`
  - `../过往简历/董冰清_产品经理_原始版本.md`
  - `../简历照片/董冰清_蓝底证件照_简历头像.png`
- 关键实现：
  - 新建 `index.html`、`styles.css`、`app.js`。
  - 复制彩色头像到 `assets/avatar.png`。
  - 页面包含顶部导航、锚链接、首屏头像、基本信息、岗位理解、教育、优势、实习、项目、技能、数字分身和底部信息。
  - 数字分身为页面独立板块，不使用弹窗；未填 API Key 时走本地预览回答，填入 OpenAI-compatible 接口配置后可调用大模型。
- 验证：
  - 本地静态服务：`http://127.0.0.1:5179/`
  - 桌面宽度检查：导航、锚点目标、头像、数字分身板块存在，无横向溢出。
  - 数字分身本地对话验证：问题 `Paper Pilot 项目体现了哪些 AI 产品能力？` 能返回基于简历的回答。
  - 手机宽度 390px 检查：无横向溢出，数字分身切换为单栏。
  - 浏览器控制台错误：无。
- 风险与边界：
  - 当前是前端直连模型接口方案，适合本地预览和个人自用；公开部署时建议增加后端代理保护 API Key。
  - 简历内容基于 1.3 版材料整理，未额外编造经历或新增指标。

## CTX-002 DeepSeek 接入与公开部署结构调整

- 时间：2026-06-26
- 范围：把数字分身从前端配置模式改成公开部署可用的后端函数调用模式。
- 用户提供信息：
  - 模型：`deepseek-v4-flash`
  - 接口采用 DeepSeek chat completions 默认地址。
- 关键实现：
  - 移除页面上的接口、模型和 API Key 输入区。
  - 前端 `app.js` 改为请求 `/api/chat`。
  - 新增 `api/chat.js`，在服务端读取 `DEEPSEEK_API_KEY`、`DEEPSEEK_API_URL`、`DEEPSEEK_MODEL`。
  - 新增 `.env.example`、`.gitignore`、`package.json`，准备 Vercel 部署。
- 安全边界：
  - API Key 不写入前端代码，不进入仓库文件。
  - 公开部署时应在 Vercel 环境变量中配置真实 Key。
  - `file://` 或普通静态服务器预览时仍使用本地预览回答；正式域名部署后才走真实 DeepSeek 调用。

## CTX-003 国内免 VPN 部署准备

- 时间：2026-06-26
- 背景：Vercel 版本已可访问，但国内用户可能需要 VPN 或访问不稳定；需要准备一版国内平台可部署版本。
- 推荐方案：腾讯云 EdgeOne Makers/Pages。
- 依据：
  - 支持导入 Git 仓库创建项目。
  - 支持静态站点和 Serverless 应用。
  - 支持环境变量。
- 关键实现：
  - 新增 `functions/api/chat.js`，按 EdgeOne Makers Functions 的 `onRequestPost(context)` 形式实现 `/api/chat`。
  - 保留 Vercel 的 `api/chat.js`，同一仓库可同时部署 Vercel 和 EdgeOne。
  - 新增 `DEPLOY_CN.md`，记录 no-code 控制台导入、构建配置和环境变量。
- 边界：
  - 纯静态 no-code 部署无法安全隐藏 DeepSeek Key；保留数字分身时必须使用平台函数或后端代理。
