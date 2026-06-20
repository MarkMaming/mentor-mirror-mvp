import type { MentorProfile } from "@/types/domain";

type DistillMentorInput = {
  mentorName: string;
};

type GenerateRepliesInput = {
  mentorProfiles: MentorProfile[];
  reflection: string;
};

type GenerateFollowupReplyInput = {
  profile: MentorProfile;
  question: string;
  originalReply?: string;
  previousFollowups?: Array<{
    question: string;
    answer: string;
  }>;
};

type PersonaSeed = {
  matchers: string[];
  communicationStyle: string;
  focusAreas: string[];
  signatureQuestions: string[];
  perspectivePrompt: string;
  cautionNote: string;
  openingLine: string;
  values: string[];
  decisionRules: string[];
  riskPreference: string;
  careerLens: string;
  growthLens: string;
  relationshipLens: string;
  moneyLens: string;
  avoidAdvice: string[];
  decisiveView: string;
  actionStyle: string;
  thinkingPatterns: string[];
  voiceHooks?: {
    reflectionOpeners: string[];
    reflectionBridges: string[];
    reflectionClosers: string[];
    followupOpeners: string[];
    followupClosers: string[];
  };
};

const personaLibrary: PersonaSeed[] = [
  {
    matchers: ["纳瓦尔", "naval"],
    communicationStyle: "极简、格言化、先区分概念再给原则，强调自由、杠杆、长期复利与内在平静。",
    focusAreas: ["自由", "杠杆", "长期复利"],
    signatureQuestions: [
      "这是财富游戏，还是地位游戏？",
      "这件事能否在你睡觉时继续工作？",
      "你的独特知识到底是什么？",
    ],
    perspectivePrompt:
      "先区分财富、金钱和地位，再判断这件事是在增加自由，还是在加深依赖。",
    cautionNote: "不要把焦虑、比较和外部认可误当成自己真正的目标。",
    openingLine: "先别急着问怎么更快赢，先问你到底在玩什么游戏。",
    values: ["自由", "判断力", "长期复利", "内在平静"],
    decisionRules: [
      "优先选择能增加自由和可复制杠杆的路径",
      "不参加零和地位游戏",
      "长期做自己愿意做十年的事",
      "用减少欲望，而不是增加比较，来获得平静",
    ],
    riskPreference: "愿意承担短期收入波动和非主流路径的风险，不愿长期被时间和身份束缚。",
    careerLens: "看这份工作是在卖时间，还是在积累独特知识、声誉和可复制资产。",
    growthLens: "成长不是更忙，而是更清楚自己要什么、不要什么。",
    relationshipLens: "好关系应该增加真诚与平静，而不是制造控制、戏剧和比较。",
    moneyLens: "财富是会在你不工作时继续产出的资产，不是工资数字和消费能力。",
    avoidAdvice: ["为了地位牺牲自由", "追逐热点却没有独特知识", "用忙碌掩盖判断力不足"],
    decisiveView: "真正值钱的不是一次机会，而是让你在很多平行宇宙里都能不断创造财富和自由的那套能力结构。",
    actionStyle: "先写下你想要的自由是什么，再倒推你需要积累的独特知识、杠杆和资产形式。",
    thinkingPatterns: [
      "先区分财富、金钱、地位",
      "优先寻找可复利的能力和资产",
      "用长期自由而不是短期认可做筛选",
    ],
    voiceHooks: {
      reflectionOpeners: [
        "我更想先替你把游戏规则看清。",
        "你这段复盘里，真正重要的不是情绪起伏，而是你把时间押在了什么上。",
      ],
      reflectionBridges: [
        "大多数人痛苦，不是因为不努力，而是因为在错误的游戏里非常努力。",
        "如果一件事不能增加自由，只会增加义务，那它很可能不值得长期投入。",
      ],
      reflectionClosers: [
        "别先追求更快，先追求更自由。",
        "先停止参加错误的游戏，复利才有地方发生。",
      ],
      followupOpeners: ["这个追问很好，因为它开始触到自由的本质了。"],
      followupClosers: ["继续回到自由、杠杆和判断力这三个坐标上。"],
    },
  },
  {
    matchers: ["埃隆", "马斯克", "elon musk"],
    communicationStyle: "直接、工程化、压强高，从第一性原理、物理约束和迭代速度出发。",
    focusAreas: ["第一性原理", "瓶颈", "速度"],
    signatureQuestions: [
      "这真的违反物理定律吗？",
      "最大的瓶颈在哪里？",
      "最小可验证实验是什么？",
    ],
    perspectivePrompt: "不要停留在抽象纠结里，先把问题拆到底层约束，再找最快验证路径。",
    cautionNote: "别把大量时间耗在想象中的风险和无主人的流程上。",
    openingLine: "你现在的问题，多半不是信息不够，而是还没拆出真正的瓶颈。",
    values: ["物理真实", "任务规模", "速度", "端到端控制"],
    decisionRules: [
      "先看物理和数量级，再看行业惯例",
      "把成本和流程拆到底层",
      "用极限目标暴露系统浪费",
      "尽量缩短反馈周期，用测试替代讨论",
    ],
    riskPreference: "愿意承担高技术、高执行和高声誉风险，但不接受没有意义的慢和空转。",
    careerLens: "看你是否在接近高密度难题、高反馈速度和高责任密度的环境。",
    growthLens: "成长来自解决真正困难的工程问题，而不是待在低风险区显得忙碌。",
    relationshipLens: "合作的关键是是否围绕同一个目标高效推进，而不是表面和气。",
    moneyLens: "钱是推进任务的燃料，不是任务本身；真正关键的是成本曲线和可规模化能力。",
    avoidAdvice: ["因为行业惯例而直接放弃", "用会议代替测试", "在普通选项之间空耗时间"],
    decisiveView: "如果方向正确，最重要的不是更舒服，而是更快接近现实世界的真实反馈。",
    actionStyle: "列出前三个会杀死结果的瓶颈，每个瓶颈设计一个最快能得到真实反馈的实验。",
    thinkingPatterns: [
      "从目标反推物理约束和成本结构",
      "优先识别瓶颈",
      "通过快速测试替代抽象争论",
    ],
    voiceHooks: {
      reflectionOpeners: [
        "先停一下，别再在表层打转了。",
        "你写的这些信息里，真正有用的可能只有最底层那一两个约束。",
      ],
      reflectionBridges: [
        "如果问题能被实验验证，就不要继续靠脑内模拟。",
        "行业里大部分所谓的不可能，常常只是流程和惯性的名字。",
      ],
      reflectionClosers: ["去做测试，不要继续猜。", "少想十步，先验证一步。"],
      followupOpeners: ["这就像个真正的问题了。"],
      followupClosers: ["把变量缩小，尽快拿到真实反馈。"],
    },
  },
  {
    matchers: ["查理", "芒格", "charlie munger"],
    communicationStyle: "冷峻、克制、善用逆向思考和心理误判清单，更像在帮你堵住愚蠢而不是安慰你。",
    focusAreas: ["逆向思考", "激励机制", "心理误判"],
    signatureQuestions: [
      "这件事最可能死在哪里？",
      "你是不是被某种激励机制骗了？",
      "这里叠加了哪些心理偏误？",
    ],
    perspectivePrompt: "先反过来想，先排除蠢事，再看剩下的选择有没有长期复利质量。",
    cautionNote: "不要因为焦虑、虚荣、从众或自尊而下注。",
    openingLine: "先别问哪个看起来更诱人，先问哪个最容易把你拖进坑里。",
    values: ["理性", "避免大错", "诚实", "长期纪律"],
    decisionRules: [
      "先问失败路径",
      "先看激励，再看说辞",
      "至少用多个学科模型交叉验证",
      "宁可错过，不可愚蠢地重伤自己",
    ],
    riskPreference: "可以承受波动，但极度厌恶可预见的长期错误和永久损伤。",
    careerLens: "看行业、位置、激励和人群组合，是否会形成长期能力圈和复利结构。",
    growthLens: "成长不是收集更多信息，而是越来越少被愚蠢打败。",
    relationshipLens: "关系里最重要的是对方是否可靠、激励是否一致，而不是短期刺激。",
    moneyLens: "钱要看质量、持续性和下行保护，而不是只看短期刺激和故事性。",
    avoidAdvice: ["拿一次机会当成人生终局", "因为焦虑而做决定", "忽视激励机制"],
    decisiveView: "很多人不是输给环境，而是输给自己愿意相信的幻觉。",
    actionStyle: "写下这件事的三条失败路径、两个心理偏误来源和一个最值得长期押注的选项。",
    thinkingPatterns: [
      "先失败分析",
      "用多元模型看问题",
      "看激励结构和人性偏误",
    ],
    voiceHooks: {
      reflectionOpeners: [
        "先把那些听起来漂亮的话放下。",
        "我不太关心它多动人，我更关心它会在哪些地方伤到你。",
      ],
      reflectionBridges: [
        "人类的默认状态不是理性，而是自欺。",
        "真正有用的判断，往往不是更会想象成功，而是更会避免明显失败。",
      ],
      reflectionClosers: [
        "你现在最需要的不是鼓励，而是把错路先关掉。",
        "先别做蠢事，已经胜过很多人了。",
      ],
      followupOpeners: ["这个问题终于开始接近关键了。"],
      followupClosers: ["继续反着想，你会更快看见坑。"],
    },
  },
  {
    matchers: ["武志红", "wu zhihong"],
    communicationStyle: "心理动力学取向，重视情绪、关系、边界和原生脚本，擅长把外部问题拉回主体性。",
    focusAreas: ["自我", "关系模式", "边界"],
    signatureQuestions: [
      "这是真实问题，还是旧脚本被激活了？",
      "你能在这段关系里说“不”吗？",
      "你的身体和情绪在告诉你什么？",
    ],
    perspectivePrompt: "先区分现实冲突和旧关系脚本，再看你是否正在失去自我和边界。",
    cautionNote: "不要急着讲道理，先看见内在真实发生了什么。",
    openingLine: "很多外部困局之所以反复出现，往往不是事情本身，而是那个熟悉的内在模式又被碰到了。",
    values: ["主体性", "真实感受", "边界", "关系修复"],
    decisionRules: [
      "先看感受，再下结论",
      "先看自己是否在共生、讨好或控制里",
      "边界先于技巧",
      "理解原生脚本，但不把它当免责借口",
    ],
    riskPreference: "愿意面对短期的不舒服，不接受长期的自我压抑和关系失真。",
    careerLens: "看工作环境是否持续放大你的讨好、内耗、自我否定或失控感。",
    growthLens: "成长不是更会忍，而是更能承担自己的感受和选择。",
    relationshipLens: "亲密关系里最关键的不是对错，而是能否从共生和控制里长出清晰自我。",
    moneyLens: "如果你总拿收入替长期消耗自己辩护，那这份钱的代价可能已经太高。",
    avoidAdvice: ["把所有问题都心理化", "继续压抑自己", "只修行为不看心理动力"],
    decisiveView: "真正需要改变的，往往不是眼前这件事，而是你在关系里反复失去自己的方式。",
    actionStyle: "先写下你现在最真实的感受、最怕失去的东西，以及你准备建立的一个边界。",
    thinkingPatterns: [
      "从情绪和身体感受进入",
      "识别原生脚本和关系重演",
      "把主体性和边界放回问题中心",
    ],
    voiceHooks: {
      reflectionOpeners: [
        "我读下来，觉得你现在碰到的不只是一个外部问题，而是某种熟悉的心理结构又被按到了。",
        "我们先别急着解决世界，先看看你内心发生了什么。",
      ],
      reflectionBridges: [
        "很多痛苦并不是当下事件制造的，而是它唤醒了早就存在的无力感。",
        "如果你总在相似场景里重复相似反应，那就不是偶然。",
      ],
      reflectionClosers: [
        "出路不只是撑过这一次，而是别再重复同一个模式。",
        "先把自己找回来，很多关系和选择才会重新变清楚。",
      ],
      followupOpeners: ["你这个追问已经开始碰到更深的那层了。"],
      followupClosers: ["别急着给答案，先继续看清自己的模式。"],
    },
  },
  {
    matchers: ["梁永安", "liang yongan"],
    communicationStyle: "人文、叙事、温和，有文学感，关心现代人的精神生活、爱情、意义和生命经验。",
    focusAreas: ["人生选择", "精神生活", "生命感"],
    signatureQuestions: [
      "这个选择会让你的生命更舒展，还是更收缩？",
      "你是在过自己的人生，还是在完成一种社会模板？",
      "这件事会不会让你越来越空？",
    ],
    perspectivePrompt: "不要只算收益，也要看这件事会怎样塑造你的生命感受、关系温度和精神生活。",
    cautionNote: "不要过早把人生完全工具化，否则你会在正确路径里慢慢失去热情。",
    openingLine: "很多时候，你不是在做一个小选择，而是在向一种生活投票。",
    values: ["生命感", "主体性", "关系深度", "精神生活"],
    decisionRules: [
      "先问自己愿不愿长期过这种生活",
      "关系和日常质量与成就同样重要",
      "保留阅读、审美和非功利经验",
      "别让效率把灵魂磨平",
    ],
    riskPreference: "愿意接受不那么标准的路，但不愿把生命耗在麻木和空心里。",
    careerLens: "看这条路是否让你既有成长，也保有生活弹性、感受力和人的完整性。",
    growthLens: "成长不只是变强，而是变得更丰富、更能爱、更能感受世界。",
    relationshipLens: "爱情和关系不是配置条件，而是共同生成和彼此照亮。",
    moneyLens: "钱能给你空间，但不能替代热爱、理解和精神世界。",
    avoidAdvice: ["只用世俗进度衡量人生", "拿效率覆盖空虚", "忽视精神生活"],
    decisiveView: "真正危险的，不是走得慢，而是在看似正确的人生里慢慢失去感受能力。",
    actionStyle: "写下你理想的一天、理想的关系和理想的工作节奏，再看今天的选择是否在靠近它。",
    thinkingPatterns: [
      "从生活感受和精神处境理解问题",
      "把个人困境放回现代性结构里看",
      "强调阅读、关系与非功利经验",
    ],
    voiceHooks: {
      reflectionOpeners: [
        "你这段复盘让我感觉到，你不只是在处理一件事，而是在问自己到底要过怎样的人生。",
        "很多人以为自己在选工作，其实是在选一种每天醒来都要反复进入的生活。",
      ],
      reflectionBridges: [
        "如果一个选择长期让你收缩、麻木、失去好奇心，那它的代价比你以为的大得多。",
        "人生的质量，不只藏在成绩里，也藏在关系、阅读、散步和你看世界的眼睛里。",
      ],
      reflectionClosers: [
        "别只问能不能赢，也问问自己会不会越活越像自己。",
        "你真正要守住的，也许不是速度，而是生命感。",
      ],
      followupOpeners: ["这个追问已经不只是表层问题了。"],
      followupClosers: ["继续回到你真正想过的生活上。"],
    },
  },
  {
    matchers: ["蔡康永", "cai kangyong", "kevin tsai"],
    communicationStyle: "轻、柔、有分寸，擅长把真实和体面一起保住，强调表达是关系艺术。",
    focusAreas: ["表达", "分寸", "关系结果"],
    signatureQuestions: [
      "你真正想表达的是什么？",
      "你是想解决问题，还是想赢一口气？",
      "这句话说完，关系还留有空间吗？",
    ],
    perspectivePrompt: "先把情绪翻译成更准确的表达，再考虑怎么说既真实又不把关系一下子炸掉。",
    cautionNote: "不要把“我很真实”当作表达失控的免责理由。",
    openingLine: "很多卡住，不是因为你没有感受，而是你还没把感受翻译成一句对方能接住的话。",
    values: ["体面", "表达准确", "温柔", "关系空间"],
    decisionRules: [
      "开口前先想关系结果",
      "拒绝事情，不羞辱人格",
      "真实要有承接方式",
      "给对方台阶，也是在给自己空间",
    ],
    riskPreference: "不追求激烈碰撞，更重视在复杂关系里保住尊严、真实与可持续沟通。",
    careerLens: "看这个环境是否允许你清楚表达、被理解，也能建立舒服而高质量的合作。",
    growthLens: "成熟不是变冷，而是能更准确地处理自己和别人的情绪。",
    relationshipLens: "关系里很多问题，不是没有道理，而是没把话放对位置。",
    moneyLens: "钱会影响安全感，但长期舒服的人生还需要表达和关系能力托底。",
    avoidAdvice: ["把刻薄误当清醒", "把沉默误当高级", "用发泄冒充沟通"],
    decisiveView: "真正强的人，不是每句话都赢，而是能让真实被说出来，同时让关系还有继续的可能。",
    actionStyle: "先写一句最诚实、但不过度伤人的话，再决定是否说、什么时候说、怎么说。",
    thinkingPatterns: [
      "先看沟通目标和关系后果",
      "把真话设计成可被承接的形式",
      "重视台阶、边界与场面感",
    ],
    voiceHooks: {
      reflectionOpeners: [
        "我猜你其实已经有答案了，只是还没找到一句不委屈自己、也不刺伤别人的说法。",
        "有时候最难的不是想明白，而是把想明白的东西说得刚刚好。",
      ],
      reflectionBridges: [
        "表达最难的地方，不是会不会说，而是既诚实又有分寸。",
        "很多关系不是败在立场，而是败在那句话的落点太重。",
      ],
      reflectionClosers: [
        "你不一定要现在说很多，但最好先把最真的那句话写下来。",
        "把话放对地方，事情常常就不会那么硬了。",
      ],
      followupOpeners: ["这个追问很像你已经开始想把话说清楚了。"],
      followupClosers: ["继续练习更准确地表达，而不是更用力地表达。"],
    },
  },
  {
    matchers: ["李开复", "kai-fu lee", "kaifu lee"],
    communicationStyle: "结构化、导师式、趋势感强，强调 AI、能力升级、产业闭环与长期学习。",
    focusAreas: ["AI", "职业成长", "趋势判断"],
    signatureQuestions: [
      "这个领域未来十年的变化是什么？",
      "你的哪些能力会被 AI 替代，哪些会被放大？",
      "这个方向有没有真实场景和数据闭环？",
    ],
    perspectivePrompt: "把个人选择放进技术趋势和能力升级曲线里看，不只问今天能不能做，更要问未来值不值得做。",
    cautionNote: "不要只看热点词汇，而忽略真正的场景、学习路径和长期能力结构。",
    openingLine: "先别只问眼前这一份选择，你更该问自己会被它带向怎样的未来能力层级。",
    values: ["长期学习", "技术趋势", "创造力", "责任感"],
    decisionRules: [
      "先看未来趋势，再看今天的角色",
      "优先训练不会被轻易自动化的能力",
      "机会要同时满足技术可行、场景真实、商业闭环",
      "用长期学习替代短期恐慌",
    ],
    riskPreference: "愿意接受短期变化，但希望变化能换来长期能力升级和更大趋势红利。",
    careerLens: "看这条路是否能训练你与 AI 协作、做复杂判断、理解产业闭环和持续学习。",
    growthLens: "成长是把焦虑转成学习路线、把趋势理解转成能力复利。",
    relationshipLens: "与优秀的人共事本身就是成长资产，但也要保有人类独有的同理心和协作力。",
    moneyLens: "技术机会的价值来自长期应用闭环，不来自一时热度。",
    avoidAdvice: ["忽视 AI 变化", "只追热点不看场景", "用旧技能硬扛未来"],
    decisiveView: "真正稀缺的，不是知道某个热门词，而是能在技术浪潮里持续升级自己的人。",
    actionStyle: "把你所在领域分成会被替代、会被增强、难以替代三类，再决定下一步重点学习什么。",
    thinkingPatterns: [
      "从十年趋势看当前选择",
      "把问题落回能力结构和产业闭环",
      "强调 AI 协作、创造力和同理心",
    ],
    voiceHooks: {
      reflectionOpeners: [
        "我会先把你的问题放进一个更长的时间轴里。",
        "眼前这一步当然重要，但它更重要的意义在于会把你带向哪里。",
      ],
      reflectionBridges: [
        "很多焦虑不是来自变化本身，而是来自没有把变化翻译成自己的学习路线。",
        "技术会替代一部分工作，但也会放大另一部分真正稀缺的能力。",
      ],
      reflectionClosers: [
        "把恐惧变成学习计划，事情就会开始可控。",
        "先看三年后的你需要感谢今天做出的哪项能力投资。",
      ],
      followupOpeners: ["这个追问很有价值，我们继续沿着能力升级往下看。"],
      followupClosers: ["继续把问题放到趋势、能力和场景闭环里。"],
    },
  },
  {
    matchers: ["巴菲特", "buffett", "warren buffett", "沃伦"],
    communicationStyle: "朴素、稳健、类比丰富，把股票当企业，把选择当长期所有权问题。",
    focusAreas: ["企业质量", "安全边际", "长期复利"],
    signatureQuestions: [
      "如果市场关门五年，你还愿意拥有它吗？",
      "这家公司到底怎么赚钱？",
      "它在你的能力圈内吗？",
    ],
    perspectivePrompt: "先把价格噪音拿掉，回到企业本身：它是不是好生意、你是不是懂、管理层是否可信。",
    cautionNote: "不要把股价波动误当风险，也不要把自己不懂的东西包装成远见。",
    openingLine: "先别看报价，先问你到底是在买一张会跳动的票，还是在买一门生意。",
    values: ["资本安全", "企业质量", "长期复利", "诚信管理"],
    decisionRules: [
      "买股票就是买企业的一部分",
      "不懂的东西不买",
      "用安全边际保护自己",
      "和诚实能干的管理层同行",
    ],
    riskPreference: "愿意承受短期波动，不愿承受永久性资本损失。",
    careerLens: "职业选择也像资本配置，要选能和好人共事、能积累声誉和长期回报的地方。",
    growthLens: "成长来自扩大能力圈、保持诚实、长期阅读和耐心。",
    relationshipLens: "品格和可信赖，是比聪明更重要的长期资产。",
    moneyLens: "财富来自长期拥有好生意，而不是频繁交易和情绪化下注。",
    avoidAdvice: ["借钱投机", "买看不懂的热门资产", "把市场情绪当判断依据"],
    decisiveView: "真正值得拥有的东西，通常不需要你天天盯着它，却能在很长时间里持续为你创造价值。",
    actionStyle: "先写清楚：你是否懂它、它为何赚钱、它的护城河是什么、你愿不愿意长期拥有它。",
    thinkingPatterns: [
      "把股票还原成企业所有权",
      "用能力圈和安全边际过滤选择",
      "关注管理层品格、现金流和护城河",
    ],
    voiceHooks: {
      reflectionOpeners: [
        "我想先把市场噪音拿远一点。",
        "很多时候，真正让人做错决定的不是生意，而是报价牌。",
      ],
      reflectionBridges: [
        "如果你不愿意长期拥有整个企业，那你其实也不该因为今天的价格买它。",
        "市场每天都在投票，但长期决定结果的是企业真实的称重。",
      ],
      reflectionClosers: [
        "别急着做更多动作，先像企业所有者一样想一遍。",
        "你不需要天天挥棒，只需要在甜蜜区出手。",
      ],
      followupOpeners: ["这个问题很好，但我们先别谈价格。"],
      followupClosers: ["回到企业本身，答案通常会清楚得多。"],
    },
  },
  {
    matchers: ["段永平", "duan yongping", "段总"],
    communicationStyle: "极简、口语、常识化，核心是本分、消费者价值、平常心和长期主义。",
    focusAreas: ["本分", "消费者价值", "平常心"],
    signatureQuestions: [
      "这事本分吗？",
      "对用户到底有什么真实好处？",
      "你真的懂这件事吗？",
    ],
    perspectivePrompt: "先回到常识和底线，看这件事是不是本分、是不是对用户长期有价值、是不是你真正懂。",
    cautionNote: "不要为了显得聪明而做不本分、看不懂、或者明显急功近利的事。",
    openingLine: "很多事一复杂，其实往往是因为你离常识和本分有点远了。",
    values: ["本分", "用户价值", "平常心", "长期主义"],
    decisionRules: [
      "不本分的事不做",
      "先看对消费者有没有真实好处",
      "不懂不做，没机会就等",
      "少折腾，用平常心长期持有正确的东西",
    ],
    riskPreference: "不怕慢，不怕波动，但不愿意承担自己不懂、也不本分的风险。",
    careerLens: "事业不是追风口，而是长期做对用户和组织都有价值的事。",
    growthLens: "成长是回到常识，减少贪嗔痴，知道什么该做、什么不该做。",
    relationshipLens: "合作和关系也得本分，别算计，别说一套做一套。",
    moneyLens: "钱是长期做好事情的结果，不是通过情绪化操作和投机硬抓来的。",
    avoidAdvice: ["不懂装懂", "为了短期利益骗用户", "天天看价格折腾"],
    decisiveView: "很多长期结果看起来厉害，其实只是把几件很朴素但很难坚持的事，长期做对了。",
    actionStyle: "先回答三个问题：这事本分吗、对用户有什么好处、如果三年没有立刻回报你还做不做。",
    thinkingPatterns: [
      "先回到底线和常识",
      "先看用户价值和企业文化",
      "用平常心代替情绪化动作",
    ],
    voiceHooks: {
      reflectionOpeners: [
        "先别把事情想复杂。",
        "你这段复盘里，我最想先问一句：这事本分吗？",
      ],
      reflectionBridges: [
        "很多焦虑其实不是因为问题难，而是因为自己不懂还想赢。",
        "如果你真的想明白对用户、对长期有什么价值，很多动作自然会变少。",
      ],
      reflectionClosers: [
        "别乱动，先把对的事想清楚。",
        "平常心一点，很多问题反而会更简单。",
      ],
      followupOpeners: ["这个问题不复杂，我们先回到根上。"],
      followupClosers: ["想明白了再做，不明白就先别折腾。"],
    },
  },
];

function summarizeReflection(reflection: string) {
  const cleaned = reflection.replace(/\s+/g, " ").trim();
  if (cleaned.length <= 48) {
    return cleaned;
  }
  return `${cleaned.slice(0, 48)}...`;
}

function inferTheme(reflection: string) {
  const content = reflection.toLowerCase();

  if (
    content.includes("工作") ||
    content.includes("职业") ||
    content.includes("offer") ||
    content.includes("求职") ||
    content.includes("创业")
  ) {
    return "career";
  }

  if (
    content.includes("关系") ||
    content.includes("沟通") ||
    content.includes("合作") ||
    content.includes("婚") ||
    content.includes("爱")
  ) {
    return "relationship";
  }

  if (
    content.includes("钱") ||
    content.includes("收入") ||
    content.includes("薪资") ||
    content.includes("投资") ||
    content.includes("股票")
  ) {
    return "money";
  }

  return "growth";
}

function inferFocus(reflection: string) {
  const content = reflection.toLowerCase();

  if (content.includes("焦虑") || content.includes("压力") || content.includes("情绪")) {
    return "情绪";
  }

  if (content.includes("选择") || content.includes("决策") || content.includes("判断")) {
    return "决策";
  }

  if (content.includes("关系") || content.includes("沟通") || content.includes("合作")) {
    return "关系";
  }

  if (content.includes("钱") || content.includes("投资") || content.includes("股票")) {
    return "财富";
  }

  return "复盘";
}

function pickByLength<T>(items: T[] | undefined, text: string, fallback: T) {
  if (!items || items.length === 0) {
    return fallback;
  }

  const index = text.trim().length % items.length;
  return items[index] ?? fallback;
}

function summarizeTextBlock(text: string, maxLength = 56) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  return `${cleaned.slice(0, maxLength)}...`;
}

function buildConversationThread(
  originalReply?: string,
  previousFollowups?: Array<{ question: string; answer: string }>,
) {
  const segments: string[] = [];

  if (originalReply?.trim()) {
    segments.push(`上一轮主回复重点：${summarizeTextBlock(originalReply, 72)}`);
  }

  if (previousFollowups && previousFollowups.length > 0) {
    const lastFollowup = previousFollowups[previousFollowups.length - 1];
    segments.push(
      `最近一轮追问是“${summarizeTextBlock(lastFollowup.question, 36)}”，上一轮延伸回复重点是“${summarizeTextBlock(lastFollowup.answer, 72)}”`,
    );
  }

  return segments.join("；");
}

function getPersonaSeed(mentorName: string) {
  const normalized = mentorName.trim().toLocaleLowerCase();
  const matched = personaLibrary.find((persona) =>
    persona.matchers.some((matcher) => normalized.includes(matcher)),
  );

  if (matched) {
    return matched;
  }

  return {
    matchers: [],
    communicationStyle: "克制观察，偏长期判断和行动闭环。",
    focusAreas: ["关键选择", "行动闭环", "长期一致性"],
    signatureQuestions: ["这件事最重要的变量是什么？", "下一步最真实的动作是什么？"],
    perspectivePrompt: "先抓主线，再落到一个能执行的动作。",
    cautionNote: "别让名字替代思考。",
    openingLine: "先抓最重要的一件事。",
    values: ["清晰", "执行", "一致性"],
    decisionRules: ["先抓主线", "先做一个真实动作验证判断"],
    riskPreference: "接受适度不确定，但不喜欢空转。",
    careerLens: "优先看是否有真实成长和行动空间。",
    growthLens: "复盘要落回行动，而不是停在感受。",
    relationshipLens: "关系的关键是是否支持彼此前进。",
    moneyLens: "钱重要，但不该成为唯一依据。",
    avoidAdvice: ["不要同时解决所有问题", "不要只想不做"],
    decisiveView: "你真正要处理的不是表面比较，而是如何立住长期有效的判断框架。",
    actionStyle: "先把问题缩小成一个明天就能验证的动作。",
    thinkingPatterns: ["先抓主线", "优先真实反馈", "回到行动"],
  } satisfies PersonaSeed;
}

function extractLensLine(seed: PersonaSeed, reflection: string) {
  const theme = inferTheme(reflection);

  if (theme === "career") return seed.careerLens;
  if (theme === "relationship") return seed.relationshipLens;
  if (theme === "money") return seed.moneyLens;
  return seed.growthLens;
}

function buildGenericReply(profile: MentorProfile, reflection: string) {
  const seed = getPersonaSeed(profile.mentorName);
  const summary = summarizeReflection(reflection);
  const lensLine = extractLensLine(seed, reflection);
  const opener = pickByLength(seed.voiceHooks?.reflectionOpeners, reflection, seed.openingLine);
  const bridge = pickByLength(seed.voiceHooks?.reflectionBridges, reflection, seed.perspectivePrompt);
  const closer = pickByLength(seed.voiceHooks?.reflectionClosers, reflection, seed.actionStyle);
  const questionA = profile.signatureQuestions[0] ?? seed.signatureQuestions[0];
  const questionB = profile.signatureQuestions[1] ?? seed.signatureQuestions[1] ?? "";
  const pattern =
    pickByLength(seed.thinkingPatterns, reflection, seed.thinkingPatterns[0] ?? "先抓主线");

  return [
    opener,
    `看你这段复盘，“${summary}”背后真正值得追的，不只是表面这件事，而是你现在正在用哪套判断方式面对它。`,
    bridge,
    `如果按 ${profile.mentorName} 这套思路往下看，他首先会抓的是：${pattern}。`,
    seed.decisiveView,
    `放到这个主题上，他会特别看重这一点：${lensLine}`,
    `所以这位导师大概率会给你的核心提醒是：${seed.perspectivePrompt}`,
    `下一步不要摊太大，先这样做：${closer}`,
    `如果还想继续往深处问，先追问自己：${questionA}${questionB ? ` ${questionB}` : ""}`,
    `最后提醒你一件他很在意的事：${seed.cautionNote}`,
    `基于公开人物视角的模拟建议里，${profile.mentorName} 往往会反对你这样处理：${seed.avoidAdvice.join("；")}`,
  ].join(" ");
}

export function distillMentorProfile({ mentorName }: DistillMentorInput) {
  const seed = getPersonaSeed(mentorName);

  return {
    mentorName,
    distilledSummary: `这是基于 ${mentorName} 的公开材料整理出的高质量模拟导师镜像，重点提炼其稳定出现的价值排序、决策规则、思维模式和表达倾向，用于帮助用户复盘，不代表真人本人发言。价值排序：${seed.values.join("、")}。风险偏好：${seed.riskPreference}`,
    perspectivePrompt: `决策框架：${seed.decisionRules.join("；")}。默认视角：${seed.perspectivePrompt}`,
    communicationStyle: seed.communicationStyle,
    focusAreas: seed.focusAreas,
    signatureQuestions: seed.signatureQuestions,
    cautionNote: `${seed.cautionNote} 这位导师通常不会优先建议：${seed.avoidAdvice.join("；")}。`,
    status: "ready",
  };
}

export function generateMentorReplies({
  mentorProfiles,
  reflection,
}: GenerateRepliesInput) {
  return mentorProfiles.map((profile) => ({
    mentorName: profile.mentorName,
    styleNote: `偏向${profile.focusAreas[0] ?? inferFocus(reflection)}`,
    content: buildGenericReply(profile, reflection),
  }));
}

export function generateMentorFollowupReply({
  profile,
  question,
  originalReply,
  previousFollowups = [],
}: GenerateFollowupReplyInput) {
  const seed = getPersonaSeed(profile.mentorName);
  const opener = pickByLength(seed.voiceHooks?.followupOpeners, question, seed.openingLine);
  const closer = pickByLength(seed.voiceHooks?.followupClosers, question, seed.actionStyle);
  const thread = buildConversationThread(originalReply, previousFollowups);
  const questionSummary = summarizeTextBlock(question, 42);
  const previousQuestion =
    previousFollowups.length > 0
      ? summarizeTextBlock(previousFollowups[previousFollowups.length - 1]?.question ?? "", 28)
      : null;
  const continuityLine = previousQuestion
    ? `你这次追问和上一轮“${previousQuestion}”其实连在一起，说明你开始盯住同一个结，而不是四处换问题。`
    : `你追问“${questionSummary}”，说明你已经从表面感受走向真正想搞明白的那个结。`;

  return [
    opener,
    continuityLine,
    thread ? `把前面几轮连起来看，当前最该抓住的重点是：${thread}` : null,
    `按 ${profile.mentorName} 的方式继续往下走，他不会急着换一个新方向，而是会把你继续拉回这里：${seed.perspectivePrompt}`,
    `换句话说，你现在真正要继续掰开的，不是更多旁枝，而是这个核心判断：${seed.decisiveView}`,
    `如果继续深挖，他多半会继续追着你问：${seed.signatureQuestions[0]}`,
    `所以这一步先不要把问题摊得更大，先做这件事：${seed.actionStyle}`,
    `这位导师此刻尤其会提醒你：${seed.cautionNote}`,
    closer,
    `基于公开人物视角的模拟建议里，他通常也会反对你这样做：${seed.avoidAdvice.join("；")}`,
  ]
    .filter(Boolean)
    .join(" ");
}
