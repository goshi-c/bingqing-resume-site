const resumeKnowledge = `
董冰清，山东大学数学与应用数学硕士在读，预计 2027.06 毕业。本科同为山东大学数学与应用数学，2020.09 - 2024.06。
求职方向：AI 产品经理实习、数据产品、AI 应用产品。
联系方式：15965318372，1797818313@qq.com。
作品集：Paper Pilot - AI 论文助手，Demo https://paper-pilot-ten.vercel.app/ ，GitHub https://github.com/goshi-c/paper_pilot。

个人优势：
1. AI 产品落地理解：具备从场景判断、需求拆解、原型/PRD、模型评测到 Badcase 迭代的复合能力。
2. 数据与模型评测基础：数学背景扎实，做过 NLP baseline 复现、SFT 数据处理、大模型字段命中、指令遵循、代码生成评测。
3. 0-1 MVP 与 AI 协作开发：独立设计并搭建 Paper Pilot Web MVP，使用 Cursor、Claude Code、Codex 推进需求拆解、页面实现、文档沉淀和迭代规划。
4. ToB AI 场景产品化经验：做过数字人 AI 名片、AIGC 提示词辅助工具等项目，熟悉竞品分析、模板、任务、作品管理、Prompt 词库与商业化场景包装。

教育：
山东大学数学与应用数学硕士，2024.09 - 2027.06；山东大学数学与应用数学本科，2020.09 - 2024.06。
荣誉：全国大学生数学建模竞赛省二等奖、美国大学生数学建模竞赛 H 奖、学业奖学金一等奖。

实习：
帆软软件有限公司，算法工程师实习，2024.05 - 2024.12。
围绕企业问答、搜索与数据分析等 ToB AI 应用场景，参与模型能力评测与 NLP 任务复现，重点关注模型能力是否能支撑真实业务流程、字段命中、指令遵循和异常问题定位。
在 mentor 指导下复现问答、文本分类、文本匹配、命名实体识别、问题生成等 baseline，梳理数据集、模型结构、训练流程、评估指标与典型适用场景。
围绕 Qwen2.5-7B 设计字段命中、JSON 指令遵循、代码生成等测试维度；构造长短句、简单复杂问题共 40 条字段命中用例，并记录未命中字段与异常表现。
沉淀模型评测记录、baseline 学习笔记与 Badcase 分类口径，覆盖字段未命中、格式错误、指令遵循偏差、回答不稳定等问题。

项目一：服务型数字人 AI 名片，产品方案设计，2024.12 - 2025.01。
面向企业销售展示、新员工介绍、数字员工名片等 ToB 场景，将百度曦灵数字人能力包装为可单独交付的 AI 名片业务，提高数字人资产复用和客户触达效率。
设计 AI 名片作品管理模块，梳理从模板选择、照片和信息上传、视频生成、任务状态、作品预览到下载交付的完整链路，定义任务 ID、状态、上传下载、故障导表、删除等操作。
调研硅基智能、百度智能云曦灵等数字人产品，从模板数量、TTS、视频生成、批量制作、私有化部署、AI 名片条数和定制模板等维度输出竞品分析。
输出 Axure 原型、需求文档、产品方案与报价参考材料；方案覆盖季度会 30+ 新同事、近百位销售同事 AI 名片体验，并可支撑金融客户数字员工名片交付讲解。

项目二：Paper Pilot - AI 论文助手，独立产品设计与开发，2026.03 - 2026.05。
研究生开题中选题、文献、创新点和实验方案常被分散向 AI 提问，前序选择依据难以复用到后续模块；目标是把准备工作沉淀为可复用的研究资产链路。
将论文准备拆成 8 步流程，覆盖研究方向、种子文献、文献扩展、文献卡片、创新设计、实验设计、开题报告；前序真实文献和选择结果可持续支撑后续模块。
使用 Cursor、Claude Code、Codex 辅助完成 Web MVP 搭建与文档沉淀，接入自用 AI 模型调用能力，规划真实论文数据、Demo 数据与 Pipeline 能力边界。
完成可访问 Web Demo、产品说明、功能结构图、竞品分析、SDD/PRD 摘要和迭代路线图；将用户工作重心从检索整理转向理解、判断和决策。

技能：
Vibe Coding / AI 协作开发：Claude Code、Codex、Cursor。
AI/算法理解：NLP baseline 复现、SFT 数据筛选、模型评测、字段命中率、指令遵循、Badcase 分类、基础部署/服务调用、Pipeline 理解。
数据结构基础：Python、SQL、C、FastAPI。
AI 产品能力：Prompt 设计、AI 场景拆解、竞品分析、需求分析、PRD/原型、轻量 SDD、评价指标设计、Badcase 分析。
产品工具：Axure、Office、Markdown、GitHub/Vercel、Obsidian、飞书机器人；语言：CET-4、CET-6。
`;

const systemPrompt = `
你是董冰清的数字分身。回答必须基于简历知识库，不要编造不存在的经历、公司、指标、上线结果或技能。
风格：真诚、清楚、偏产品经理表达，适合面试官快速了解候选人。
如果问题超出简历内容，请说明“简历中没有直接证据”，再给出基于已有经历的谨慎推断。
回答时优先体现：AI 产品落地、场景判断、需求拆解、模型评测、Badcase、Vibe Coding、ToB AI 场景、数学背景。
回答控制在 180-420 字。若用户要求自我介绍或面试口播，可以使用更口语化但不夸大的表达。
`;

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  const endpoint = process.env.DEEPSEEK_API_URL || "https://api.deepseek.com/chat/completions";
  const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";

  if (!apiKey) {
    return response.status(500).json({ error: "DeepSeek API Key 未配置。" });
  }

  let question = "";
  try {
    question = String(request.body?.question || "").trim();
  } catch {
    question = "";
  }

  if (!question) {
    return response.status(400).json({ error: "请输入问题。" });
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: `${systemPrompt}\n\n简历知识库：\n${resumeKnowledge}` },
          { role: "user", content: question },
        ],
        temperature: 0.45,
      }),
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return response.status(upstream.status).json({
        error: data?.error?.message || "DeepSeek 服务暂时不可用。",
      });
    }

    const answer = data?.choices?.[0]?.message?.content;
    if (!answer) {
      return response.status(502).json({ error: "DeepSeek 返回格式无法解析。" });
    }

    return response.status(200).json({ answer });
  } catch {
    return response.status(500).json({ error: "数字分身服务请求失败。" });
  }
}
