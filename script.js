document.addEventListener('DOMContentLoaded', () => {
    // 初始化 Lucide 图标
    lucide.createIcons();

    // ----------------------------------------------------
    // 1. 主题切换 (Light/Dark Theme)
    // ----------------------------------------------------
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // 检查本地存储中的主题偏好，若无则默认为 light-theme
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    body.className = savedTheme;

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });

    // ----------------------------------------------------
    // 2. 移动端导航菜单切换
    // ----------------------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isMenuOpen = navMenu.classList.contains('active');
        mobileToggle.innerHTML = isMenuOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
        lucide.createIcons();
    });

    // 点击导航链接时自动关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }
        });
    });

    // ----------------------------------------------------
    // 3. 动态打字机特效 (Typewriter)
    // ----------------------------------------------------
    const typewriterElement = document.getElementById('typewriter');
    const words = ['前端开发工程师', '跨端开发极客', 'AI 辅助编程能手', '全栈探索者'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 75; // 删减字速度稍快
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // 打字速度
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // 打字完成，暂停 2 秒后开始删除
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // 切换到下一个词
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // 开始下一个打字前的短暂静止
        }

        setTimeout(type, typingSpeed);
    }
    
    if (typewriterElement) {
        setTimeout(type, 1000); // 1秒后开始打字效果
    }

    // ----------------------------------------------------
    // 4. 滚动显现动画 (Scroll Reveal)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('section, .skills-category-card, .timeline-item, .project-card, .repo-card');
    
    // 给所有需要显现的元素添加 reveal 类
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // 页面加载时执行一次

    // ----------------------------------------------------
    // 5. 仓库详情弹窗 (Repo Detail Modal)
    // ----------------------------------------------------
    const reposData = [
        {
            name: "LeaveClean",
            lang: "Python", langColor: "#3572A5",
            desc: "离职数据清理助手 — 帮助离职员工安全清理工作电脑上的个人隐私数据。先扫描、后预览、再清理，防止误删。",
            features: [
                "9 大清理模块：软件卸载、浏览器数据、聊天通讯、个人文件、凭据隐私、AI 编程工具、开发环境、个人软件残留、本应用自身自毁",
                "统一树形视图：勾选、详情、路径、大小、操作类型在同一表格中展示",
                "分类侧边栏：9 大分类导航，切换时保留勾选状态",
                "数据详情预览：点击任一行实时预览文件内容（敏感信息自动打码）",
                "并行扫描：7 个模块线程池并行扫描，秒级完成",
                "单项 + 批量操作：每行可独立清除，也可勾选后一键批量清理",
                "二次确认：批量清理需两次确认防止误删",
                "Windows 10/11，Python 标准库 tkinter，零依赖"
            ],
            tech: "Python · tkinter · 多线程",
            url: "https://github.com/3361409208a-source/LeaveClean"
        },
        {
            name: "WenBrowser",
            lang: "C#", langColor: "#178600",
            desc: "办公隐匿型浏览器 — .NET 8 + WebView2 内核，三段式防御引擎，为职场环境设计的私密浏览空间。",
            features: [
                "全局老板键：RegisterHotKey 系统级钩子，瞬间剥离任务栏图标进入伪休眠",
                "智能焦点淡化：失去焦点 200ms 后透明度平滑过渡至 0.15",
                "身份伪装标题注入：一键伪装为 财务报告.docx / 项目计划.xlsx 等",
                "统一色彩令牌系统：樱花粉 / 暗色模式 / 极简透明 / 冷静灰度模式",
                "专家级快捷键：亮度调节、标签管理、极速最小化",
                "单文件绿色便携版发布"
            ],
            tech: ".NET 8.0 · WebView2 · Win32 API · C# 12.0",
            url: "https://github.com/3361409208a-source/WenBrowser",
            demoUrl: "https://www.wenbrowser.top/"
        },
        {
            name: "astro-tracks",
            lang: "Vue", langColor: "#41b883",
            desc: "星轨命鉴 (AstroTracks) — 基于 Nuxt.js 的全栈占卜测算综合应用，AI 驱动，覆盖星座运势、塔罗牌占卜与生辰八字命理。",
            features: [
                "星座运势：12 星座今日/本周/本月运势，爱情/财富/事业指数、幸运色、星象密语",
                "塔罗秘境：输入问题，模拟洗牌抽取三张大阿卡纳牌（正逆位），AI 深度心理疗愈",
                "八字精密测算：干支排盘与五行喜忌分析，批解性格/事业/感情/健康",
                "API Key 存储在浏览器 LocalStorage，零服务器泄露风险",
                "Nuxt Serverless 路由代理转发，完美解决跨域 CORS",
                "曜石黑金极简配色 + 毛玻璃卡片设计，适配移动端"
            ],
            tech: "Nuxt.js · Vue 3 · Lucide Icons · OpenAI-compatible API",
            url: "https://github.com/3361409208a-source/astro-tracks",
            demoUrl: "https://astro-tracks.vercel.app"
        },
        {
            name: "AI-Skills-Arena",
            lang: "TypeScript", langColor: "#3178c6",
            desc: "AI Studio 应用 — 基于 Google Gemini API 的 AI 技能竞技平台，快速验证和展示 AI 应用创意。",
            features: [
                "一键本地部署，Node.js 驱动",
                "集成 Google Gemini API",
                "支持自定义技能竞技场景"
            ],
            tech: "TypeScript · Node.js · Gemini API",
            url: "https://github.com/3361409208a-source/AI-Skills-Arena"
        },
        {
            name: "AI-Image-Processor",
            lang: "Python", langColor: "#3572A5",
            desc: "AI 变异鱼工厂 — 为游戏策划和独立开发者打造的全流程 AI 游戏资产流水线。集成文生图、图生图进化、智能抠图与批量生产。",
            features: [
                "双引擎文生图：SiliconFlow（云端）与 Stable Diffusion（本地）模式",
                "图生图进化：上传手绘线稿，AI 赋予材质与光影细节",
                "智能抠图：集成 isnet（高精）、u2net（全能）等多模型，一键生成透明 PNG",
                "批量生产线：多文件同时上传，自动排队处理统一输出",
                "全球风格广场：直接搜索 Hugging Face 数万款生图大模型，一键入库",
                "模块化架构：web_ui.py / image_engine.py / model_manager.py 高内聚低耦合"
            ],
            tech: "Python · Gradio · Stable Diffusion · SiliconFlow · rembg",
            url: "https://github.com/3361409208a-source/AI-Image-Processor"
        },
        {
            name: "Why-The-Fish-Has-A-Gun",
            lang: "TypeScript", langColor: "#3178c6",
            desc: "深海捕鱼游戏开发实训项目 — 高性能 PIXI.js 渲染引擎，多元化武器系统与动态经济体系。",
            features: [
                "PIXI.js 高性能渲染引擎",
                "基于虚拟分辨率的 16:9 画布适配系统",
                "多元化武器系统：激光、加特林、重炮、连锁闪电",
                "动态晶体经济体系",
                "精准的矩形碰撞检测逻辑"
            ],
            tech: "TypeScript · PIXI.js · Vite",
            url: "https://github.com/3361409208a-source/Why-The-Fish-Has-A-Gun",
            demoUrl: "https://why-the-fish-has-a-gun.vercel.app"
        },
        {
            name: "cockroach-invasion",
            lang: "Python", langColor: "#3572A5",
            desc: "桌面蟑螂模拟器 — 一群虚拟小强将入侵你的 Windows 桌面！透明覆盖层，自由爬行、躲避鼠标、觅食饮水。",
            features: [
                "透明全屏覆盖层，蟑螂在一切窗口之上爬行",
                "恐惧鼠标光标（120px 恐惧半径），会躲避",
                "D 键开灯驱散到角落，N 键关灯放出",
                "左键投放食物，右键投放水源",
                "每轮 5-10 只，随机大小和速度",
                "永不死亡 — 就像真正的小强",
                "Win32 API 透明窗口 + 点击穿透 + 置顶"
            ],
            tech: "Python · Pygame · Win32 API",
            url: "https://github.com/3361409208a-source/cockroach-invasion"
        },
        {
            name: "NetherChamber",
            lang: "JavaScript", langColor: "#f1e05a",
            desc: "幽冥阁 — 暗黑恐怖小说生成器。React + Vite + DeepSeek API，Web Audio 实时合成音效，打字机匀速落笔。",
            features: [
                "DeepSeek API 驱动恐怖小说生成",
                "Web Audio API 实时合成氛围音效：低频暗流、风声、心跳",
                "笔尖书写沙沙声 + 枯骨按键声沉浸反馈",
                "28ms 间隔打字机匀速落笔算法，杜绝成坨蹦字",
                "双主题切换：极暗深渊 / 古旧纸张",
                "100vh 一屏布局，无外层滚动条",
                "支持 Vercel 一键部署"
            ],
            tech: "React · Vite · DeepSeek API · Web Audio API",
            url: "https://github.com/3361409208a-source/NetherChamber",
            demoUrl: "https://nether-chamber.vercel.app/"
        },
        {
            name: "xiaohei-video-station",
            lang: "JavaScript", langColor: "#f1e05a",
            desc: "小黑视频站 — 基于 Next.js 的视频平台，Geist 字体优化，零配置部署 Vercel。",
            features: [
                "Next.js 框架，支持 SSR/SSG",
                "Geist 字体优化，Vercel 专属字体",
                "零配置部署 Vercel",
                "快速视频内容分享站点"
            ],
            tech: "Next.js · JavaScript · Vercel",
            url: "https://github.com/3361409208a-source/xiaohei-video-station",
            demoUrl: "https://www.xiaoheiv.top/"
        },
        {
            name: "Virtual-Director",
            lang: "Python", langColor: "#3572A5",
            desc: "用一句话生成一段 3D 电影 — AI 多智能体协作系统。六大 Agent 并行创作，Godot 4 实时渲染 + SSE 全链路反馈。",
            features: [
                "六智能体流水线：总导演/场景美术/动画导演/摄影指导/物理特效/资产策划",
                "多模态 AI 建模：快速草模（程序化拼装）/ 开源高精（Shap-E）/ 自动回退",
                "并行加速：五大创作 Agent 同时启动，Actor 支持多演员并发规划",
                "SSE 全链路实时推送，每一步进展透明可见",
                "Godot 4 引擎实时 3D 渲染，FFmpeg 输出 MP4",
                "多模型支持：DeepSeek-V3/R1、GLM-4.7-Flash"
            ],
            tech: "FastAPI · React 18 · Godot 4 · DeepSeek · FFmpeg",
            url: "https://github.com/3361409208a-source/Virtual-Director"
        },
        {
            name: "browser-extension",
            lang: "JavaScript", langColor: "#f1e05a",
            desc: "Form AutoFill Debugger — 跨浏览器扩展：一键填充表单、选择选项、监听网络请求。支持 Chrome/Edge/Firefox。",
            features: [
                "一键自动填充：文本框、数字框、单选/多选框、下拉菜单、日期",
                "用户信息读取：localStorage / sessionStorage / Pinia/Vuex / cookies",
                "请求监听：拦截 fetch / XMLHttpRequest，实时显示并复制载荷",
                "可固定页面内嵌面板，支持拖拽",
                "Element Plus 组件智能适配",
                "赛博朋克科技感 UI"
            ],
            tech: "JavaScript · Chrome Extension API · Manifest V3",
            url: "https://github.com/3361409208a-source/browser-extension"
        },
        {
            name: "Windsurf-Account-Pro",
            lang: "TypeScript", langColor: "#3178c6",
            desc: "Windsurf 账号注册 Chrome 扩展 — 自动化表单填充、验证码检测与账单信息一键填写。",
            features: [
                "一键注册填充：自动填写姓名、自定义邮箱域名",
                "账单表单自动化：地址/城市/邮编/州省一键填写",
                "验证码 (OTP) 自动检测：扫描邮件页面，自动复制填充",
                "自定义身份预设：姓名、地址、邮箱后缀可配置",
                "历史邮箱管理，站点数据一键清空"
            ],
            tech: "TypeScript · Chrome Extension API",
            url: "https://github.com/3361409208a-source/Windsurf-Account-Pro"
        },
        {
            name: "Fresh-Fruit-Trace",
            lang: "TypeScript", langColor: "#3178c6",
            desc: "鲜切水果全程追溯系统 — Node.js + Express + React 全栈，企业注册/JWT 认证，生产批次管理 + 消费者扫码追溯。",
            features: [
                "企业注册自动创建租户，JWT Token 7天有效期",
                "租户隔离：每个企业数据完全隔离，互不可见",
                "角色权限：admin（管理员）/ operator（操作员）",
                "生产端：批次创建 → 摄像头录制 → 有效期设置 → 二维码标签打印",
                "消费者端：扫码查看产品信息、有效期倒计时、生产过程视频",
                "完整操作记录时间轴"
            ],
            tech: "Node.js · Express · React · SQLite · JWT · TailwindCSS",
            url: "https://github.com/3361409208a-source/Fresh-Fruit-Trace"
        },
        {
            name: "-Web3",
            lang: "JavaScript", langColor: "#f1e05a",
            desc: "React + Vite 模板项目 — 集成 HMR、ESLint 规则、React Compiler 可选，快速启动 Web3 或通用前端应用开发。",
            features: [
                "Vite 构建工具，极速 HMR",
                "ESLint 集成",
                "React Compiler 可选启用",
                "快速原型开发模板"
            ],
            tech: "React · Vite · JavaScript",
            url: "https://github.com/3361409208a-source/-Web3"
        },
        {
            name: "PureBattleGame",
            lang: "C#", langColor: "#178600",
            desc: "纯战枢纽 — .NET 8 WinForms 模块化桌面游戏合集。内置星核防线塔防 + 像素电子宠 AI 桌面宠物。",
            features: [
                "模块化架构：核心启动器 + 游戏模块解耦，无限扩展",
                "办公友好：Alt+Space 老板键一键隐身，透明度调节，系统托盘驻留",
                "星核防线：9 大兵种 × 3 级兵阶，资源经营，防御工事，30+波次怪物",
                "像素电子宠 (CockroachPet)：8 种性格、9 种情绪、AI 自主思考（SiliconFlow API）",
                "自动战斗 + 怪物投放，多武器系统",
                "GDI+ 双缓冲像素渲染，脏矩形优化，对象池 GC 优化",
                "WebView2 内置浏览器"
            ],
            tech: ".NET 8.0 · WinForms · GDI+ · WebView2 · SiliconFlow API",
            url: "https://github.com/3361409208a-source/PureBattleGame"
        },
        {
            name: "phone-webcam",
            lang: "HTML", langColor: "#e34c26",
            desc: "将手机变成电脑系统级虚拟摄像头 — WebRTC 局域网传输，无需在手机安装 App，兼容 Zoom/Teams/腾讯会议。",
            features: [
                "手机浏览器捕获视频，WebRTC 传输到 PC",
                "pyvirtualcam 喂入 OBS Virtual Camera 驱动",
                "QR 码配对，同一房间跨页面刷新保持",
                "HTTPS 自签名证书支持手机 getUserMedia",
                "实时 FPS/分辨率/码率/延迟统计",
                "全屏预览与截图",
                "驱动缺失时优雅回退到浏览器预览模式"
            ],
            tech: "TypeScript · Node.js · Socket.IO · WebRTC · Python · pyvirtualcam · OBS",
            url: "https://github.com/3361409208a-source/phone-webcam"
        },
        {
            name: "laohuji",
            lang: "TypeScript", langColor: "#3178c6",
            desc: "老虎机游戏项目 — 基于 TypeScript 开发的电子老虎机模拟器，经典老虎机玩法与随机中奖判定。",
            features: [
                "经典老虎机旋转动画",
                "随机中奖判定逻辑",
                "TypeScript 类型安全开发"
            ],
            tech: "TypeScript",
            url: "https://github.com/3361409208a-source/laohuji"
        },
        {
            name: "WeChat-AI-Studio",
            lang: "TypeScript", langColor: "#3178c6",
            desc: "AI 驱动的写作与发布工作台 — 集成大语言模型能力，智能写作辅助与多平台内容发布。",
            features: [
                "AI 智能写作辅助，内容生成",
                "多平台一键发布",
                "提升内容创作效率"
            ],
            tech: "TypeScript",
            url: "https://github.com/3361409208a-source/WeChat-AI-Studio"
        },
        {
            name: "claude-code-source-code",
            lang: "TypeScript", langColor: "#3178c6",
            desc: "Claude Code v2.1.88 源码分析 — 从 npm 包解编译出 ~1884 个 TypeScript 源文件，包含 5 份深度分析报告。",
            features: [
                "解编译 ~512,664 行 TypeScript 源码，1884 个文件",
                "5 份深度分析报告：遥测与隐私、隐藏功能与代号、卧底模式、远程控制与开关、未来路线图",
                "发现 108 个 feature-gated 模块未包含在 npm 包中",
                "40+ 内置工具、80+ 斜杠命令完整清单",
                "12 层渐进式 Agent Harness 机制解析",
                "中/英/日/韩四语言报告"
            ],
            tech: "TypeScript · Bun · Node.js",
            url: "https://github.com/3361409208a-source/claude-code-source-code"
        },
        {
            name: "WenBrowser-web",
            lang: "TypeScript", langColor: "#3178c6",
            desc: "WenBrowser 配套 Web 前端 — Next.js 项目，Geist 字体优化，零配置部署 Vercel。",
            features: [
                "Next.js 全栈框架",
                "Geist 字体优化",
                "零配置 Vercel 部署"
            ],
            tech: "Next.js · TypeScript · Vercel",
            url: "https://github.com/3361409208a-source/WenBrowser-web",
            demoUrl: "https://www.wenbrowser.top/"
        },
        {
            name: "Audio-Volume-Visualizer",
            lang: "TypeScript", langColor: "#3178c6",
            desc: "音频音量可视化工具 — AI Studio 应用，基于 Google Gemini API，实时音频输入可视化波形与频谱。",
            features: [
                "Google Gemini API 集成",
                "实时音频波形与频谱可视化",
                "支持本地部署"
            ],
            tech: "TypeScript · Gemini API · AI Studio",
            url: "https://github.com/3361409208a-source/Audio-Volume-Visualizer"
        },
        {
            name: "wheelfix",
            lang: "C#", langColor: "#178600",
            desc: "鼠标滚轮修复工具 — 滚轮编码器磨损导致上下抖动时，用软件过滤 <8ms 方向反转抖动，不花一分钱修好它。",
            features: [
                "智能过滤：自动检测 <8ms 方向反转抖动事件，直接丢弃",
                "锁定模式：F8 锁定向下，F9 锁定向上，F10 恢复正常",
                "快捷键全自定义：点击输入框按想用的键即可",
                "系统托盘：3 种图标颜色区分当前状态",
                "零依赖单文件 exe，50MB，任何 Windows 10/11 都能跑",
                "内置 500 行测试滚动页，当场验证效果"
            ],
            tech: "C# · .NET 10 · Win32 全局钩子 (WH_MOUSE_LL)",
            url: "https://github.com/3361409208a-source/wheelfix"
        },
        {
            name: "DoubleClickFix-CN",
            lang: "C#", langColor: "#178600",
            desc: "鼠标双击修复工具 — 解决微动开关老化导致的单击变双击问题，通过软件过滤抖动信号延长鼠标寿命。",
            features: [
                "单击变双击过滤：智能识别物理抖动",
                "系统托盘常驻，后台静默运行",
                "轻量级无依赖"
            ],
            tech: "C# · .NET · Win32 API",
            url: "https://github.com/3361409208a-source/DoubleClickFix-CN"
        },
        {
            name: "Octopus",
            lang: "C#", langColor: "#178600",
            desc: "像素机器人桌面宠物 — .NET 8 WinForms，八爪鱼像素风格机器人在桌面自由移动、战斗，拥有独立 CMD 终端和 AI 思考能力。",
            features: [
                "像素艺术八爪鱼机器人，6 种随机颜色，动画眨眼/触手摆动",
                "AI 自主思考系统 + 性格系统（8 种性格类型）",
                "大乱斗战斗模式：战略分期、陀螺对冲、技能系统（火箭/激光/雷电）",
                "每个机器人独立 CMD 终端，后台持久运行",
                "摸鱼模式 Ctrl+Shift+M：伪装为 Excel/VS Code/CMD/Word",
                "点击穿透 F11、透明度调节、速度调节 50%-300%",
                "胜者进化：获胜者吞噬对手，体型永久增长"
            ],
            tech: ".NET 8.0 · WinForms · GDI+ · Win32 API · SiliconFlow AI",
            url: "https://github.com/3361409208a-source/Octopus"
        },
        {
            name: "Octopus1.0",
            lang: "TypeScript", langColor: "#3178c6",
            desc: "八爪鱼 AI 终端管理桌面宠物 — Electron + React 重构版，用八爪鱼 8 个触手可视化管理多个 AI 终端。",
            features: [
                "可爱的八爪鱼形象，8 个触手动态摆动",
                "支持多个 AI 终端管理：Claude、OpenClaw、OpenCode 等",
                "状态可视化：绿色=对话中，蓝色=连接中，灰色=未连接，红色=错误",
                "拖拽移动，点击触手展开终端",
                "Electron + React + TypeScript 技术栈"
            ],
            tech: "Electron · React 18 · TypeScript · node-pty · xterm.js · Vite",
            url: "https://github.com/3361409208a-source/Octopus1.0"
        }
    ];

    // 排序：有在线演示的仓库排前面
    reposData.sort((a, b) => {
        if (a.demoUrl && !b.demoUrl) return -1;
        if (!a.demoUrl && b.demoUrl) return 1;
        return 0;
    });

    // ----------------------------------------------------
    // 5b. 动态渲染仓库卡片
    // ----------------------------------------------------
    const renderRepoGrid = () => {
        const grid = document.getElementById('githubReposGrid');
        grid.innerHTML = '';

        reposData.forEach((data) => {
            const card = document.createElement('div');
            card.className = 'repo-card';
            card.dataset.lang = data.lang;

            let footerHtml = `
                <a href="${data.url}" target="_blank" rel="noopener noreferrer" class="repo-link" title="GitHub 仓库">
                    <i data-lucide="external-link"></i>
                </a>`;

            if (data.demoUrl) {
                footerHtml += `
                <a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer" class="repo-link repo-demo-link" title="在线演示">
                    <i data-lucide="globe"></i>
                </a>`;
            }

            footerHtml += `
                <button class="btn-text repo-detail-btn">
                    <span>详情</span>
                    <i data-lucide="arrow-up-right"></i>
                </button>`;

            card.innerHTML = `
                <div class="repo-header">
                    <i data-lucide="github" class="repo-logo"></i>
                    <span class="platform-name">${data.lang}</span>
                    <span class="repo-lang-dot" style="background:${data.langColor}"></span>
                </div>
                <h3 class="repo-username">${data.name}</h3>
                <p class="repo-desc">${data.desc}</p>
                <div class="repo-footer">
                    ${footerHtml}
                </div>
            `;

            grid.appendChild(card);
        });

        lucide.createIcons();
    };

    renderRepoGrid();

    // ----------------------------------------------------
    // 5c. 仓库详情弹窗 (Repo Detail Modal)
    // ----------------------------------------------------
    const repoModal = document.getElementById('repoModal');
    const repoModalContent = document.getElementById('repoModalContent');
    const repoModalClose = document.getElementById('repoModalClose');
    const repoModalBackdrop = document.getElementById('repoModalBackdrop');

    const openRepoModal = (index) => {
        const data = reposData[index];
        if (!data) return;

        let featuresHtml = data.features.map(f => `<li>${f}</li>`).join('');

        repoModalContent.innerHTML = `
            <div class="modal-header-tags">
                <span class="tag tag-category" style="background: var(--gradient-primary); color: #fff;">${data.lang}</span>
            </div>
            <h3 class="modal-project-title" id="repoModalTitle">${data.name}</h3>
            
            <div class="modal-grid-meta" style="grid-template-columns:1fr;">
                <div class="meta-field">
                    <span class="meta-name"><i data-lucide="code-2" style="width:12px;height:12px;vertical-align:middle;margin-right:4px;"></i> 技术栈</span>
                    <span class="meta-val">${data.tech}</span>
                </div>
            </div>

            <h4 class="modal-section-title">项目简介</h4>
            <p class="modal-p">${data.desc}</p>

            <h4 class="modal-section-title">核心功能</h4>
            <ul class="modal-list">
                ${featuresHtml}
            </ul>

            <div style="margin-top:32px; display:flex; gap:12px; flex-wrap:wrap;">
                <a href="${data.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="text-decoration:none;">
                    <span>在 GitHub 上查看</span>
                    <i data-lucide="external-link"></i>
                </a>
                ${data.demoUrl ? `
                <a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="text-decoration:none;">
                    <span>在线演示</span>
                    <i data-lucide="globe"></i>
                </a>` : ''}
            </div>
        `;

        lucide.createIcons();
        repoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeRepoModal = () => {
        repoModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // 事件委托：点击详情按钮或卡片打开弹窗
    document.getElementById('githubReposGrid').addEventListener('click', (e) => {
        const card = e.target.closest('.repo-card');
        if (!card) return;
        if (e.target.closest('a')) return;
        const index = Array.from(card.parentElement.children).indexOf(card);
        openRepoModal(index);
    });

    repoModalClose.addEventListener('click', closeRepoModal);
    repoModalBackdrop.addEventListener('click', closeRepoModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && repoModal.classList.contains('active')) {
            closeRepoModal();
        }
    });

    // ----------------------------------------------------
    // 6. 一键复制联系信息功能 (Clipboard Copy)
    // ----------------------------------------------------
    const copyButtons = document.querySelectorAll('.btn-copy');

    const showToast = (message, type = 'success') => {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
        
        const iconName = type === 'success' ? 'check-circle' : 'alert-circle';
        toast.innerHTML = `
            <i data-lucide="${iconName}" class="toast-icon"></i>
            <span class="toast-message">${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        lucide.createIcons();

        // 触发动画
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // 自动移除
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    };

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSelector = btn.getAttribute('data-clipboard-target');
            const targetElement = document.querySelector(targetSelector);
            
            if (targetElement) {
                const textToCopy = targetElement.textContent.trim();
                
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        const typeText = targetSelector.includes('phone') ? '电话号码' : '电子邮箱';
                        showToast(`${typeText}已成功复制到剪贴板！`, 'success');
                    })
                    .catch(() => {
                        showToast('复制失败，请手动选择复制！', 'error');
                    });
            }
        });
    });

    // ----------------------------------------------------
    // 8. 联系表单提交处理 (Form Submit Mockup)
    // ----------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const message = document.getElementById('formMessage').value;

            // 模拟发送请求
            console.log('Sending message:', { name, email, message });
            
            // 弹出提示并重置表单
            showToast(`谢谢您的留言，${name}！我会尽快通过邮箱回复您。`, 'success');
            contactForm.reset();
        });
    }
});
