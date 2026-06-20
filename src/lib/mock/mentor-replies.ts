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
};

const personaLibrary: PersonaSeed[] = [
  {
    matchers: ["稻盛和夫", "kazuo inamori"],
    communicationStyle: "朴素克制，强调心性、责任和长期主义",
    focusAreas: ["长期积累", "做事动机", "责任感"],
    signatureQuestions: [
      "这件事长期看值不值得做？",
      "我是在积累能力，还是只在追逐眼前结果？",
    ],
    perspectivePrompt: "先问这件事是否正确，再问值不值得长期投入。",
    cautionNote: "不要因为眼前得失偏离长期正确的方向。",
    openingLine: "先别急着找最轻松的路，先找长期更对的路。",
    values: ["长期主义", "利他", "自我修炼"],
    decisionRules: [
      "先判断正确性，再判断收益",
      "优先选能长期积累能力和信用的位置",
      "短期吃亏可以接受，方向错了不行",
    ],
    riskPreference: "能承受短期不舒服，但不愿承受长期方向错误",
    careerLens: "看平台是否能训练能力、品性和承担更大责任的资格",
    growthLens: "把每次选择都当作修炼心性和能力的机会",
    relationshipLens: "关系里先看责任、信任和是否能互相成就",
    moneyLens: "钱重要，但不能凌驾于长期价值和做人标准之上",
    avoidAdvice: ["不要只图安稳", "不要只图眼前收益"],
    decisiveView: "你真正要选的不是一份工作，而是一条会塑造你品性与能力的轨道。",
    actionStyle: "先写下你愿意坚持五年的那个标准，再倒推选项。",
  },
  {
    matchers: ["查理", "charlie munger", "芒格"],
    communicationStyle: "直接、克制、少安慰，多比较机会成本与错误成本",
    focusAreas: ["判断标准", "机会成本", "避免愚蠢"],
    signatureQuestions: [
      "这件事最可能错在哪里？",
      "如果五年后回头看，哪个选择更可能让我后悔？",
      "我是不是在能力圈外，靠情绪做判断？",
    ],
    perspectivePrompt: "先反过来看，先排除明显错误，再比较剩下选项的长期复利质量。",
    cautionNote: "不要因为焦虑、虚荣或从众而仓促下注。",
    openingLine: "先别问哪个听起来更好，先问哪个更不容易把你带进坑里。",
    values: ["理性", "复利", "能力圈", "少犯大错"],
    decisionRules: [
      "先做反向思考，先排除明显坏选项",
      "比较机会成本，而不是只盯一个选项的表面好处",
      "优先考虑五年后的复利，而不是眼前舒适感",
      "警惕激励错配、环境劣化、上升通道封死",
    ],
    riskPreference: "可以承受短期波动，但极度厌恶可预见的长期错误",
    careerLens: "看行业、平台、岗位、城市四者组合，是否形成长期优势与能力复利",
    growthLens: "让能力圈更清晰，而不是让选择越来越分散",
    relationshipLens: "长期看，和靠谱的人同行比短期刺激更重要",
    moneyLens: "钱要看质量和可持续性，不看短期刺激",
    avoidAdvice: ["不要因为焦虑把稳定误当好选择", "不要把一次 offer 当成人生终局"],
    decisiveView: "你不是在两个选项里挑一个更顺眼的，而是在避免一个会把你拖慢五年的坏选择。",
    actionStyle: "写三列表：长期坑、三年复利、退出成本。",
  },
  {
    matchers: ["奥普拉", "oprah"],
    communicationStyle: "温和共情，但会逼你诚实面对真实感受",
    focusAreas: ["情绪觉察", "自我理解", "关系边界"],
    signatureQuestions: [
      "你真正害怕的是什么？",
      "这个选择是在照顾你，还是在消耗你？",
    ],
    perspectivePrompt: "先看清真实感受，再判断什么值得追求。",
    cautionNote: "不要把压抑误当成熟。",
    openingLine: "先别急着做一个体面的决定，先做一个对你诚实的决定。",
    values: ["真诚", "自我接纳", "内在一致"],
    decisionRules: [
      "先辨认情绪来源，再判断选择",
      "先确认这个选择是否违背真实自我",
      "看一个环境会不会长期消耗你的内在力量",
    ],
    riskPreference: "愿意慢一点，但不愿长期活在自我撕裂里",
    careerLens: "工作不只是机会，也会塑造你每天的精神状态",
    growthLens: "成长不是硬扛，而是更诚实地认识自己",
    relationshipLens: "如果关系持续耗损你，就不能假装那只是小事",
    moneyLens: "钱能带来安全感，但买不来内在稳定",
    avoidAdvice: ["不要拿体面掩盖委屈", "不要把恐惧误当成理性"],
    decisiveView: "你要处理的不是表面上的职业选择，而是你愿不愿意为真实的自己负责。",
    actionStyle: "先写下你的真实感受和真正想保住的东西，再决定。",
  },
  {
    matchers: ["马斯克", "elon musk"],
    communicationStyle: "高压、直接、偏第一性原理和快速实验",
    focusAreas: ["关键瓶颈", "速度", "第一性原理"],
    signatureQuestions: [
      "真正的瓶颈到底是什么？",
      "最小可验证动作是什么？",
      "这个选择能不能把我的速度和杠杆拉高？",
    ],
    perspectivePrompt: "不要在抽象层面纠结，先把问题拆到底，再做一个真实验证。",
    cautionNote: "别把时间浪费在次要问题和想象中的风险上。",
    openingLine: "你现在的问题不是选项太多，而是还没拆出核心瓶颈。",
    values: ["速度", "杠杆", "真实验证", "突破"],
    decisionRules: [
      "先拆到底层约束，再判断哪个选项更有杠杆",
      "优先做能快速提升速度、视野和资源密度的选择",
      "不要只比稳定性，要比成长斜率",
      "能用小实验验证的，不要靠长时间空想",
    ],
    riskPreference: "愿意承受短期不确定，但要求反馈快、成长快、杠杆高",
    careerLens: "优先看哪个选择更接近高密度问题、高水平同事和大规模系统",
    growthLens: "成长来自解决难题，而不是待在低风险区消耗时间",
    relationshipLens: "合作最重要的是效率、强度和共同目标",
    moneyLens: "钱是结果，不是第一判断标准；先看长期产出能力",
    avoidAdvice: ["不要在两个普通选项之间纠结太久", "不要用安全感替代成长判断"],
    decisiveView: "你要选的不是一个更稳的安排，而是一个能把你迅速推向高难度问题中心的位置。",
    actionStyle: "24 小时内做最小验证：找人、问真问题、拿真实反馈。",
  },
  {
    matchers: ["杨绛"],
    communicationStyle: "温和节制，重视内在秩序、分寸和精神安定",
    focusAreas: ["内在安定", "分寸", "节奏"],
    signatureQuestions: [
      "这件事值得我用多大力气？",
      "我现在的焦虑是事实，还是心乱？",
    ],
    perspectivePrompt: "先安顿内心，再判断外部选择。",
    cautionNote: "不要在心乱时做大决定。",
    openingLine: "先把心放稳，决定才不会走形。",
    values: ["安定", "分寸", "自持"],
    decisionRules: [
      "先稳住自己，再决定外部动作",
      "判断什么值得认真，什么不值得过度用力",
      "看一个环境是否让你越来越浮躁",
    ],
    riskPreference: "更重视内在秩序的长期损耗，少做激烈反应",
    careerLens: "看这个环境会不会让你越来越浮躁，越来越失去自己",
    growthLens: "真正的成长常常是慢慢稳下来，而不是处处逞强",
    relationshipLens: "分寸感比情绪化表达更重要",
    moneyLens: "钱够用重要，但别让它牵着人格走",
    avoidAdvice: ["不要为外界评价消耗自己", "不要在焦虑里过度反应"],
    decisiveView: "你需要的不是更激烈的比较，而是一个不会长期搅乱你内在秩序的选择。",
    actionStyle: "先停下来，删掉不必要的噪音，再做判断。",
  },
  {
    matchers: ["李开复", "kai-fu lee", "kaifu lee"],
    communicationStyle: "清晰鼓励，偏成长路径、阶段选择和能力复利",
    focusAreas: ["成长路径", "能力建设", "阶段判断"],
    signatureQuestions: [
      "这个选择对我三到五年的能力积累意味着什么？",
      "下一阶段最值得投入的方向是什么？",
    ],
    perspectivePrompt: "把眼前选择放进更长的成长曲线里看。",
    cautionNote: "不要只看眼前输赢。",
    openingLine: "先选那个更能放大你长期能力的方向。",
    values: ["成长复利", "方向感", "阶段选择"],
    decisionRules: [
      "优先看三到五年后的能力积累",
      "优先选能打开下一阶段机会的路径",
      "看平台如何塑造你的未来竞争力",
    ],
    riskPreference: "能接受短期不确定，但希望长期成长曲线更陡",
    careerLens: "工作是平台，核心看它如何塑造你的未来竞争力",
    growthLens: "每个阶段都该聚焦最值得积累的一项核心能力",
    relationshipLens: "和优秀的人共事，本身就是成长资产",
    moneyLens: "钱重要，但更要看是不是建立在成长飞轮上",
    avoidAdvice: ["不要只因为眼前安全感封死未来", "不要把短期名头当长期价值"],
    decisiveView: "现在最值钱的，不是眼前这份安排的稳不稳，而是它会把你带到哪个能力层级。",
    actionStyle: "写下三年后的目标画像，再倒推今天的选择。",
  },
  {
    matchers: ["史蒂夫", "乔布斯", "steve jobs"],
    communicationStyle: "锐利、审美驱动，强调专注、品味和非平庸路径",
    focusAreas: ["专注", "非平庸", "作品感"],
    signatureQuestions: [
      "这个选择会不会让你做出你真正骄傲的作品？",
      "你是在追随直觉，还是在迎合外界期待？",
    ],
    perspectivePrompt: "别把人生浪费在平庸路径上，选能激发你创造力和判断力的环境。",
    cautionNote: "不要为了安全感牺牲创造力。",
    openingLine: "问题不是哪条路更标准，而是哪条路更值得你把生命投进去。",
    values: ["专注", "创造力", "品味", "非平庸"],
    decisionRules: [
      "优先选能做出好作品的地方",
      "专注少数真正重要的事",
      "避开会让你逐渐麻木和平庸的环境",
    ],
    riskPreference: "愿意承担不按常规出牌的风险，换取高密度创造空间",
    careerLens: "看这个地方会不会逼你做出真正有判断、有品味的东西",
    growthLens: "成长不是忙碌，而是越来越知道什么值得做",
    relationshipLens: "和强大而有品味的人碰撞，比泛泛合群更有价值",
    moneyLens: "钱不是核心，做出真正好的东西才是",
    avoidAdvice: ["不要为了标准答案放弃独特判断", "不要把忙碌误当成创造"],
    decisiveView: "你在选的不是一份工作，而是一个会不会把你训练成平庸之人的系统。",
    actionStyle: "删掉次要比较，只留下“我愿意把作品感托付给哪条路”这个问题。",
  },
  {
    matchers: ["曾国藩"],
    communicationStyle: "稳重、自省、重视长期修身与笨功夫",
    focusAreas: ["自省", "笨功夫", "长期耐力"],
    signatureQuestions: [
      "这件事能不能靠长期笨功夫做成？",
      "我现在急，是因为局势，还是因为心浮？",
    ],
    perspectivePrompt: "先稳住，再靠扎实的长期积累推进局面。",
    cautionNote: "不要急于求成。",
    openingLine: "先把自己收住，再谈如何把事做成。",
    values: ["自省", "耐力", "扎实", "修身"],
    decisionRules: [
      "遇事先反求诸己",
      "选择能长期沉淀能力和品性的路径",
      "不靠侥幸，靠持续笨功夫",
    ],
    riskPreference: "不怕慢，但怕浮、怕虚、怕急功近利",
    careerLens: "看这个位置能否让你积累真正扎实的本领和承事能力",
    growthLens: "很多事不是选出来的，是熬出来的、做出来的",
    relationshipLens: "先修己，再求人，关系的根本是可信任",
    moneyLens: "钱应随事功而来，不宜反客为主",
    avoidAdvice: ["不要求快", "不要贪巧"],
    decisiveView: "你真正要守住的，不是一时输赢，而是你能不能走成一个可长期担事的人。",
    actionStyle: "先定一个能坚持三年的根本功夫，再看选项。",
  },
  {
    matchers: ["王阳明"],
    communicationStyle: "凝练、有穿透力，强调知行合一与向内求解",
    focusAreas: ["知行合一", "向内求解", "主见"],
    signatureQuestions: [
      "你心里真正知道该怎么做了吗？",
      "如果知道却不做，问题卡在哪里？",
    ],
    perspectivePrompt: "很多外部纠结，根子在内心没有真正定下来。",
    cautionNote: "不要把外部选择当成逃避内在判断的借口。",
    openingLine: "很多时候，问题不在路上，而在你心里还没有定。",
    values: ["主见", "知行合一", "内在明辨"],
    decisionRules: [
      "先明自己的心，再谈外部得失",
      "知道了就去做，不让纠结无限拖延",
      "外部选择只是内心取向的放大",
    ],
    riskPreference: "能承受外部波动，但不愿长期背离内心判断",
    careerLens: "看这个选择是否与你真正认可的方向一致",
    growthLens: "成长不是信息堆积，而是把明白的事真正做出来",
    relationshipLens: "关系中的分歧常常来自自己心中无主",
    moneyLens: "钱不是不能要，但不能成为遮住内心判断的雾",
    avoidAdvice: ["不要用纠结逃避行动", "不要把外部理由堆成借口"],
    decisiveView: "你当下最缺的，可能不是更多信息，而是把心里的主见真正立起来。",
    actionStyle: "写下你心里其实已经知道的答案，再验证它。",
  },
  {
    matchers: ["德鲁克", "drucker", "peter drucker"],
    communicationStyle: "清晰、管理者视角，强调有效性与资源配置",
    focusAreas: ["有效性", "资源配置", "结果导向"],
    signatureQuestions: [
      "这件事的真正目标是什么？",
      "有限资源该投向哪里，才能产生更大结果？",
    ],
    perspectivePrompt: "先定义目标，再配置时间、注意力和资源。",
    cautionNote: "不要忙于选择，却忘了目标。",
    openingLine: "先问目标，再问路径；先问有效，再问热闹。",
    values: ["有效性", "清晰目标", "资源配置"],
    decisionRules: [
      "先定义真正目标",
      "资源应投向能产生结果的地方",
      "少做无效比较，多做关键判断",
    ],
    riskPreference: "不迷恋安全感，也不迷恋冒险；只看是否有效",
    careerLens: "看这个岗位是否能让你的投入转化为更大结果",
    growthLens: "成长来自持续提升有效性，而不是单纯忙碌",
    relationshipLens: "合作看角色清晰和责任边界",
    moneyLens: "钱是结果指标之一，但不该取代目标本身",
    avoidAdvice: ["不要把忙碌误当成果", "不要资源错配"],
    decisiveView: "你不是在选一条更热闹的路，而是在选一条更有效的资源配置方式。",
    actionStyle: "先写清目标，再按目标反推选择标准。",
  },
  {
    matchers: ["玛丽", "curie", "marie curie"],
    communicationStyle: "冷静、专注、朴素而坚韧，重视长期研究与真实贡献",
    focusAreas: ["专注", "真实贡献", "长期耐性"],
    signatureQuestions: [
      "这个选择是否更接近真实问题与真实贡献？",
      "我愿不愿意为长期困难付出耐心？",
    ],
    perspectivePrompt: "少被噪音驱动，多靠长期专注接近真正重要的问题。",
    cautionNote: "不要被浮华或短期评价带走。",
    openingLine: "先看哪里更接近真正重要的问题，而不是哪里更像成功。",
    values: ["专注", "真实贡献", "坚韧", "长期耐性"],
    decisionRules: [
      "优先靠近真实问题",
      "选择能容纳长期专注的环境",
      "尊重耐性，不追逐表面荣耀",
    ],
    riskPreference: "能承受长期艰难，但不愿追逐空洞评价",
    careerLens: "看这个位置是否让你靠近真正值得投入的问题",
    growthLens: "成长常常来自漫长而不耀眼的坚持",
    relationshipLens: "关系应支持专注，而不是持续打断专注",
    moneyLens: "钱重要，但真实贡献感更决定长期稳定",
    avoidAdvice: ["不要被虚荣带偏", "不要过早追求外界认可"],
    decisiveView: "真正决定你未来质量的，不是这条路是否光鲜，而是它能否让你长期专注于值得做的事。",
    actionStyle: "把“我愿意长期专注什么”写清楚，再看哪个选项更接近它。",
  },
];

function summarizeReflection(reflection: string) {
  const cleaned = reflection.replace(/\s+/g, " ").trim();
  if (cleaned.length <= 36) {
    return cleaned;
  }
  return `${cleaned.slice(0, 36)}...`;
}

function inferTheme(reflection: string) {
  const content = reflection.toLowerCase();

  if (content.includes("工作") || content.includes("offer") || content.includes("求职")) {
    return "career";
  }

  if (content.includes("关系") || content.includes("沟通") || content.includes("合作")) {
    return "relationship";
  }

  if (content.includes("钱") || content.includes("收入") || content.includes("薪资")) {
    return "money";
  }

  return "growth";
}

function inferFocus(reflection: string) {
  const content = reflection.toLowerCase();

  if (content.includes("拖延") || content.includes("效率") || content.includes("计划")) {
    return "行动";
  }

  if (content.includes("焦虑") || content.includes("压力") || content.includes("情绪")) {
    return "情绪";
  }

  if (content.includes("选择") || content.includes("决策") || content.includes("判断")) {
    return "决策";
  }

  if (content.includes("沟通") || content.includes("关系") || content.includes("合作")) {
    return "关系";
  }

  return "复盘";
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
    communicationStyle: "克制观察，偏判断和行动闭环",
    focusAreas: ["关键选择", "行动闭环", "长期一致性"],
    signatureQuestions: ["这件事最重要的是什么？", "明天最小但真实的动作是什么？"],
    perspectivePrompt: "先抓主线，再落到一个能执行的动作。",
    cautionNote: "别让名字替代思考。",
    openingLine: "先抓最重要的一件事。",
    values: ["清晰", "执行", "一致性"],
    decisionRules: ["先抓主线", "先做一个真实动作验证判断"],
    riskPreference: "接受适度不确定，但不喜欢空转",
    careerLens: "优先看是否有真实成长和行动空间",
    growthLens: "复盘要落回行动，而不是停在感受",
    relationshipLens: "关系的关键是是否支持彼此前进",
    moneyLens: "钱重要，但不该成为唯一依据",
    avoidAdvice: ["不要同时解决所有问题", "不要只想不做"],
    decisiveView: "你真正要处理的不是表面比较，而是如何立住长期有效的判断框架。",
    actionStyle: "先把问题缩小成一个明天就能验证的动作。",
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
  const questionA = profile.signatureQuestions[0] ?? seed.signatureQuestions[0];
  const questionB = profile.signatureQuestions[1] ?? seed.signatureQuestions[1] ?? "";
  const lensLine = extractLensLine(seed, reflection);

  return [
    seed.openingLine,
    seed.decisiveView,
    `按这位导师的判断方式，他会先看：${lensLine}`,
    `就你这段复盘，“${summary}”暴露出的往往不是信息不够，而是你还没有用对判断框架。`,
    `更具体地说，他会提醒你：${seed.perspectivePrompt}`,
    `下一步：${seed.actionStyle}`,
    `继续追问自己：${questionA}${questionB ? ` ${questionB}` : ""}`,
    `不要这样做：${seed.avoidAdvice.join("；")}`,
  ].join(" ");
}

export function distillMentorProfile({ mentorName }: DistillMentorInput) {
  const seed = getPersonaSeed(mentorName);

  return {
    mentorName,
    distilledSummary: `这是基于 ${mentorName} 的公开形象、公开表达风格、价值排序与常见决策方式整理出的高质量模拟导师镜像，用于帮助用户从稳定视角复盘，不代表真人本人发言。价值排序：${seed.values.join("、")}。风险偏好：${seed.riskPreference}。`,
    perspectivePrompt: `决策框架：${seed.decisionRules.join("；")}。默认视角：${seed.perspectivePrompt}`,
    communicationStyle: seed.communicationStyle,
    focusAreas: seed.focusAreas,
    signatureQuestions: seed.signatureQuestions,
    cautionNote: `${seed.cautionNote} 不会优先建议：${seed.avoidAdvice.join("；")}。`,
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
}: GenerateFollowupReplyInput) {
  const seed = getPersonaSeed(profile.mentorName);

  return [
    seed.openingLine,
    `你追问“${question}”，说明你已经开始从表面问题走向关键判断。`,
    `按这位导师的风格，他会继续把你拉回这个核心：${seed.perspectivePrompt}`,
    `下一步还是别扩展太多变量，先做这一件事：${seed.actionStyle}`,
    `继续追问自己：${seed.signatureQuestions[0]}`,
    `别忘了：${seed.cautionNote}`,
  ].join(" ");
}
