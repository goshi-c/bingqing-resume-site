const chatLog = document.querySelector("#chatLog");
const chatForm = document.querySelector("#chatForm");
const questionInput = document.querySelector("#userQuestion");

function addMessage(content, type = "assistant") {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = content;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
  return message;
}

function localPreviewAnswer(question) {
  const normalized = question.toLowerCase();

  if (question.includes("90") || question.includes("介绍") || normalized.includes("introduce")) {
    return "董冰清是山东大学数学与应用数学硕士在读，目标岗位是 AI 产品经理、数据产品或 AI 应用产品。她的特点是既有数学和模型评测基础，也做过 ToB AI 场景的产品方案，并且能用 Vibe Coding 工具把想法推进成可访问的 Web MVP。简历中最能代表她的两段经历是帆软实习中的 NLP baseline 和模型能力评测，以及 Paper Pilot 中从研究生开题痛点出发设计 8 步论文助手链路。";
  }

  if (question.includes("Paper") || question.includes("论文")) {
    return "Paper Pilot 体现的是她把个人真实研究痛点产品化的能力：先识别开题流程中选题、文献、创新点和实验方案断裂的问题，再拆成 8 步流程，让前序选择和真实文献能支撑后续模块。她使用 Cursor、Claude Code、Codex 辅助完成 Web MVP、产品说明、竞品分析、PRD/SDD 摘要和迭代路线图。需要谨慎说明的是，简历表述是 Demo/MVP 和自用 AI 模型调用能力，不应夸大成大规模上线产品。";
  }

  if (question.includes("数字人") || question.includes("名片")) {
    return "数字人 AI 名片项目的核心链路是：模板选择、照片和信息上传、视频生成、任务状态、作品预览、下载交付。她负责的是产品方案设计与作品管理模块梳理，定义任务 ID、状态、上传下载、故障导表、删除等操作，并输出 Axure 原型、需求文档、产品方案和报价参考材料。这个项目更适合表达 ToB AI 场景包装、任务流设计和交付链路理解。";
  }

  if (question.includes("边界") || question.includes("风险") || question.includes("谨慎")) {
    return "需要谨慎说明的边界主要有三点：第一，帆软经历在 1.3 版简历中定位为算法工程师实习，重点是模型评测和 NLP baseline 复现，不要包装成完整产品负责人。第二，Paper Pilot 是个人 Web MVP 和作品集项目，可以强调设计、实现和文档沉淀，但不要夸大为商业上线或真实用户规模验证。第三，数字人 AI 名片是产品方案设计与交付支撑材料，适合讲链路和方案，不宜说成独立负责完整商业产品。";
  }

  return "基于简历，董冰清适合从 AI 产品实习、数据产品或 AI 应用产品切入。她的优势是数学背景、模型评测经验、ToB AI 场景理解，以及能用 Vibe Coding 工具做出 Web MVP。你可以继续追问 Paper Pilot、数字人 AI 名片、帆软实习、模型评测或面试表达边界。当前回答是本地预览，填写 API Key 后可以调用大模型生成更细的回答。";
}

async function callModel(question) {
  if (window.location.protocol === "file:") {
    return localPreviewAnswer(question);
  }

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    if ([404, 405, 501].includes(response.status) && ["localhost", "127.0.0.1"].includes(window.location.hostname)) {
      return localPreviewAnswer(question);
    }
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `数字分身服务暂时不可用：${response.status}`);
  }

  const data = await response.json();
  const content = data?.answer;
  if (!content) {
    throw new Error("数字分身返回格式无法解析。");
  }
  return content;
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = questionInput.value.trim();
  if (!question) return;

  addMessage(question, "user");
  questionInput.value = "";
  const pending = addMessage("正在整理回答...", "assistant");

  try {
    pending.textContent = await callModel(question);
  } catch (error) {
    pending.className = "message error";
    pending.textContent = `${error.message}。如果是在本地静态预览，请部署到 Vercel 后再测试真实模型。`;
  }
});

document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => {
    questionInput.value = button.dataset.question;
    questionInput.focus();
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((section) => navObserver.observe(section));
