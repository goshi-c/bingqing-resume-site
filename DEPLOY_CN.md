# 国内免 VPN 部署说明

## 推荐平台

推荐使用腾讯云 EdgeOne Makers/Pages 部署国内可访问版本。

原因：

- 支持导入 Git 仓库创建项目。
- 支持静态站点和 Serverless 应用。
- 支持环境变量，DeepSeek Key 不需要写进前端。
- 代码推送到 main 分支后，可触发自动部署。

## 当前仓库兼容情况

本项目已经同时保留两套函数入口：

- `api/chat.js`：Vercel Serverless Function。
- `functions/api/chat.js`：EdgeOne Makers/Pages Functions。

前端统一请求：

```text
/api/chat
```

因此国内部署成功后，数字分身无需改前端代码。

## EdgeOne Makers 部署步骤

1. 打开腾讯云 EdgeOne 控制台，进入 Makers/Pages。
2. 选择创建项目。
3. 选择导入 Git 仓库。
4. 选择仓库：

```text
goshi-c/bingqing-resume-site
```

5. 构建配置：

```text
Build Command: 留空
Output Directory: .
Install Command: 留空或默认
```

6. 环境变量：

```text
DEEPSEEK_API_KEY=新的 DeepSeek Key
DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions
DEEPSEEK_MODEL=deepseek-v4-flash
```

7. 开始部署。
8. 部署完成后，访问 EdgeOne 分配的默认域名。
9. 打开数字分身板块，测试一个问题。

## 注意事项

- 如果使用自定义国内域名，通常需要按平台要求完成备案；默认平台域名一般可先用于投递测试。
- 不建议把 DeepSeek Key 写进前端或 GitHub 仓库。
- Vercel 版本可继续保留，国内投递优先发 EdgeOne 版本链接。
