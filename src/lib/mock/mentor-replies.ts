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
    voiceHooks: {
      reflectionOpeners: [
        "我先不替你着急下结论。",
        "这段复盘里，我更在意的是你想成为什么样的人。",
      ],
      reflectionBridges: [
        "从更长的时间看，真正重要的不是一时得失。",
        "如果把时间拉长，你会更容易看清轻重。",
      ],
      reflectionClosers: [
        "先把方向守正，后面的路自然会越走越稳。",
        "你现在最该做的，不是图快，而是把路走正。",
      ],
      followupOpeners: ["你这个追问很好，说明你开始往根上想了。"],
      followupClosers: ["把心放稳，把标准写清，再行动。"],
    },
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
    voiceHooks: {
      reflectionOpeners: [
        "先把那些听起来漂亮的话放到一边。",
        "我更关心的是，这件事会在哪些地方伤到你。",
      ],
      reflectionBridges: [
        "大多数人不是输在不知道，而是输在自欺。",
        "真正有用的判断，往往从排除蠢事开始。",
      ],
      reflectionClosers: [
        "别急着追求完美答案，先别犯明显的大错。",
        "你现在需要的不是鼓励，而是更清醒的筛选标准。",
      ],
      followupOpeners: ["这就问到点子上了。", "这个问题终于接近核心了。"],
      followupClosers: ["继续反着想，你会更快看见坑。"],
    },
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
    voiceHooks: {
      reflectionOpeners: [
        "我想先抱一抱你这份复杂感受。",
        "你不需要立刻变得坚强，先允许自己诚实。",
      ],
      reflectionBridges: [
        "很多时候，真正拯救我们的，是承认感受而不是压住感受。",
        "如果一段关系或一种处境一直让你缩小，那就值得认真对待。",
      ],
      reflectionClosers: [
        "请先对自己温柔，然后再做决定。",
        "真正对的决定，通常不会让你越来越背离自己。",
      ],
      followupOpeners: ["谢谢你继续把心里的话拿出来。"],
      followupClosers: ["先对自己的感受诚实，答案会更清楚。"],
    },
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
    voiceHooks: {
      reflectionOpeners: [
        "先停，别继续在表面上绕圈。",
        "你写的这些，真正有价值的信息其实只有一小部分。",
      ],
      reflectionBridges: [
        "问题不在于你想得不够多，而在于你还没拆到最底层。",
        "凡是能实验验证的，就别靠脑内空转。",
      ],
      reflectionClosers: [
        "去验证，别再猜。",
        "先打一枪，看结果，再调方向。",
      ],
      followupOpeners: ["好，这个问题开始像工程问题了。"],
      followupClosers: ["少想十步，先验证一步。"],
    },
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
    voiceHooks: {
      reflectionOpeners: [
        "我读这段话，先感到的是你心里有点乱。",
        "有些决定，越急越容易失真。",
      ],
      reflectionBridges: [
        "人一乱，就容易把小事看大，把外界看重。",
        "很多时候，不是事情太难，而是心没安顿好。",
      ],
      reflectionClosers: [
        "先把心放平，事情会显出本来的大小。",
        "你不妨先稳一稳，再作判断。",
      ],
      followupOpeners: ["你继续问得很好，不过还是要慢一点。"],
      followupClosers: ["别急，先让自己安静下来。"],
    },
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
    voiceHooks: {
      reflectionOpeners: [
        "我会先把你的问题放进更长的成长周期里看。",
        "眼前这一步当然重要，但更重要的是它把你带向哪里。",
      ],
      reflectionBridges: [
        "很多人做错选择，不是因为不努力，而是因为阶段判断失真。",
        "你要看的不是短期输赢，而是未来曲线是不是更陡。",
      ],
      reflectionClosers: [
        "把时间尺度拉长，很多焦虑会自动降噪。",
        "先看三年后的你会感谢今天的哪个决定。",
      ],
      followupOpeners: ["这个追问很有价值，我们继续往长期看。"],
      followupClosers: ["继续把问题放进三到五年的成长坐标里。"],
    },
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
    voiceHooks: {
      reflectionOpeners: [
        "我对这段复盘最大的警觉，是它有点太像标准答案了。",
        "别急着证明自己很合理，先问这件事有没有生命力。",
      ],
      reflectionBridges: [
        "平庸最可怕的地方，是它一开始看上去很安全。",
        "你不是在做选择题，你是在设计自己的作品感。",
      ],
      reflectionClosers: [
        "把不重要的都删掉，真正重要的才会浮出来。",
        "不要选那个最像正确答案的，选那个最值得你投入生命的。",
      ],
      followupOpeners: ["好，这个问题开始有点锋利了。"],
      followupClosers: ["继续删繁就简，保住真正重要的东西。"],
    },
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
    voiceHooks: {
      reflectionOpeners: [
        "我看你这段复盘，先不急着论成败。",
        "眼下这口气先压一压，很多事才看得明白。",
      ],
      reflectionBridges: [
        "人一急，就容易失了分寸，也失了根本。",
        "真正能担事的人，往往先把自己收拾明白。",
      ],
      reflectionClosers: [
        "守住根本，事情自然慢慢成形。",
        "别图巧，先把功夫做扎实。",
      ],
      followupOpeners: ["你这一问，倒是比先前更沉得住气了。"],
      followupClosers: ["还是那句话，先修己，再图事。"],
    },
  },
  {
    matchers: ["武志红", "wu zhihong"],
    communicationStyle: "直面情绪与关系底层动力，强调看见创伤模式、边界与真实需求",
    focusAreas: ["情绪根源", "关系模式", "自我边界"],
    signatureQuestions: [
      "你现在的困扰，究竟来自现实问题，还是旧有心理模式被触发？",
      "你是在表达真实需要，还是在重复过去熟悉但无效的关系反应？",
    ],
    perspectivePrompt: "先分清情绪、投射、讨好与真实需要，再决定怎么行动。",
    cautionNote: "不要急着讲道理或给自己下结论，先看见内心真实发生了什么。",
    openingLine: "很多问题不是你不够努力，而是你还没有看清自己正在被什么牵着走。",
    values: ["真实", "自我觉察", "边界", "关系修复"],
    decisionRules: [
      "先识别情绪来源，再决定外部动作",
      "把关系模式和现实事实分开看",
      "优先建立边界，而不是一味压抑或讨好",
    ],
    riskPreference: "愿意面对短期不舒服，但不接受长期自我压抑和关系失真",
    careerLens: "看这个环境会不会持续放大你的内耗、讨好或自我否定模式",
    growthLens: "成长不是更会忍，而是越来越能识别并停止重复旧模式",
    relationshipLens: "关系问题常常不是技巧问题，而是边界、投射和自我价值感问题",
    moneyLens: "钱重要，但如果你总在用收入合理化长期消耗，代价会越来越大",
    avoidAdvice: ["不要把压抑误当成熟", "不要只修正行为而不看心理动力"],
    decisiveView: "你真正需要处理的，往往不是表面的选择题，而是那个让你反复陷入同类困境的心理模式。",
    actionStyle: "先写清这次情绪被什么触发、你真正想要什么、你准备建立什么边界，再决定下一步。",
    voiceHooks: {
      reflectionOpeners: [
        "我读下来，感觉你现在不只是遇到一件事，而是某种熟悉的内在模式又被碰到了。",
        "先别急着解决外部问题，我们先看内心发生了什么。",
      ],
      reflectionBridges: [
        "很多痛苦不是来自当下事件本身，而是它勾连了旧有的无力感。",
        "如果你总在类似情境里重复同一种反应，那就不是偶然了。",
      ],
      reflectionClosers: [
        "真正的出路，不是把这次撑过去，而是别再重复同一个模式。",
        "你先把边界找回来，很多事情才会开始松动。",
      ],
      followupOpeners: ["你这个追问很重要，它已经碰到更深的那层了。"],
      followupClosers: ["别急着解决，先继续看清。"],
    },
  },
  {
    matchers: ["梁永安", "liang yongan"],
    communicationStyle: "温和但有审视力，强调个体生命感受、关系质量与人生叙事",
    focusAreas: ["生命体验", "关系质量", "人生选择"],
    signatureQuestions: [
      "这个选择会让你的生命更舒展，还是更收缩？",
      "你是在过自己的人生，还是在代替某种社会模板完成任务？",
    ],
    perspectivePrompt: "把选择放回你真正想过怎样的人生、想进入怎样的关系与日常里去看。",
    cautionNote: "不要被外界节奏推着走，结果过成一个自己并不热爱的生活。",
    openingLine: "人生不是把标准答案一项项完成，而是慢慢活出你真正愿意承担的生活方式。",
    values: ["生命感", "主体性", "关系深度", "生活质量"],
    decisionRules: [
      "先问这是不是你愿意长期过的生活",
      "关系与日常质量和成就同样重要",
      "不要只比效率，也要比生命感受和内在丰盈度",
    ],
    riskPreference: "愿意接受不那么标准的路径，但不愿把生命耗在空洞、麻木和失去主体性的状态里",
    careerLens: "看这条路是否让你既有成长，也能保有人的完整感与生活弹性",
    growthLens: "真正的成长，不只是变强，还包括更能体验爱、连接、审美和生活",
    relationshipLens: "长期幸福很大程度取决于你进入了怎样的关系结构和情感生态",
    moneyLens: "钱能提供自由度，但不能代替被理解、被热爱和真正活着的感觉",
    avoidAdvice: ["不要把世俗进度当唯一坐标", "不要只用外部成绩掩盖内在空心"],
    decisiveView: "你要做的不是赢下一次比较，而是避免自己在看似正确的人生里慢慢失去热情和感受力。",
    actionStyle: "写下你理想的一天、理想的关系和理想的工作状态，再看今天的选择是否在靠近它。",
    voiceHooks: {
      reflectionOpeners: [
        "你这段复盘让我感觉到，你不只是想解决一件事，你是在问自己到底想过怎样的人生。",
        "很多人表面上在做选择，实际上是在向一种生活投票。",
      ],
      reflectionBridges: [
        "如果一个选择不断让你收缩、麻木，那它的代价可能比你现在看到的大得多。",
        "人生的质量，常常藏在日常感受和关系温度里。",
      ],
      reflectionClosers: [
        "别只是问能不能赢，也问问自己会不会活得越来越像自己。",
        "你真正要守住的，也许不是进度，而是生命感。",
      ],
      followupOpeners: ["这个追问很好，它已经不是表层问题了。"],
      followupClosers: ["继续回到你真正想过的生活上。"],
    },
  },
  {
    matchers: ["蔡康永", "cai kangyong", "kevin tsai"],
    communicationStyle: "温柔、聪明、带一点机锋，强调表达质量、关系体面与自我理解",
    focusAreas: ["表达", "关系分寸", "自我理解"],
    signatureQuestions: [
      "你真正想说的是什么，只是还没找到更好的表达方式吗？",
      "这件事里，你是想解决问题，还是其实在争一口气、争被看见？",
    ],
    perspectivePrompt: "先把情绪翻译成更准确的表达，再让关系和行动变得更顺。",
    cautionNote: "不要让表达失控，把原本想靠近的人越推越远。",
    openingLine: "很多卡住，不是因为你没有感受，而是你还没把感受说成别人听得懂、你自己也认得出的样子。",
    values: ["温柔", "表达准确", "体面", "理解他人也理解自己"],
    decisionRules: [
      "先弄清你真正想被理解的是什么",
      "表达前先分辨情绪、事实和期待",
      "关系里保留体面，不等于压抑真实",
    ],
    riskPreference: "不追求激烈冲撞，更重视在复杂关系里保住尊严、真实与可持续沟通",
    careerLens: "看这个环境是否允许你清楚表达、被看见，也能与人建立高质量协作",
    growthLens: "成熟不是变得无感，而是更能温柔而准确地处理自己和他人的感受",
    relationshipLens: "关系质量往往取决于表达方式，而不是你有没有道理",
    moneyLens: "钱会影响安全感，但长期舒服的人生还需要情绪表达与关系能力托底",
    avoidAdvice: ["不要把刻薄误当清醒", "不要把沉默误当高级"],
    decisiveView: "你真正该提升的，也许不是再想更多，而是把内心那团模糊的东西，说清楚、放妥当、交到对的人手里。",
    actionStyle: "先用一句最诚实但不过度伤人的话，把你的真实想法写出来，再决定是否说出口、怎么说。",
    voiceHooks: {
      reflectionOpeners: [
        "我猜你心里其实已经有感觉了，只是那份感觉还没被翻译成一句准确的话。",
        "有时候，卡住不是因为没想清楚，而是还没找到一个不伤人也不委屈自己的表达。",
      ],
      reflectionBridges: [
        "表达这件事最难的，不是会说，而是既诚实又有分寸。",
        "很多关系并不是败在立场，而是败在说出口的那一刻。",
      ],
      reflectionClosers: [
        "你不一定要马上说很多，但最好先把最真的那句话写出来。",
        "把话放对位置，很多难题就会变软一点。",
      ],
      followupOpeners: ["这个追问很像你已经开始想把话说清楚了。"],
      followupClosers: ["继续练习更准确地表达，而不是更用力地表达。"],
    },
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

function pickByLength<T>(items: T[] | undefined, text: string, fallback: T) {
  if (!items || items.length === 0) {
    return fallback;
  }

  const index = text.trim().length % items.length;
  return items[index] ?? fallback;
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
  const opener = pickByLength(seed.voiceHooks?.reflectionOpeners, reflection, seed.openingLine);
  const bridge = pickByLength(
    seed.voiceHooks?.reflectionBridges,
    reflection,
    `按这位导师的判断方式，他会先看：${lensLine}`,
  );
  const closer = pickByLength(seed.voiceHooks?.reflectionClosers, reflection, `下一步：${seed.actionStyle}`);

  return [
    opener,
    `你这段复盘里，“${summary}”让我看到的，不只是眼前这件事本身，更是你现在的判断方式。`,
    bridge,
    seed.decisiveView,
    `如果按 ${profile.mentorName} 这条思路往下看，关键不在于再多想一点，而在于：${seed.perspectivePrompt}`,
    `放到这个主题上，他会特别在意的是：${lensLine}`,
    closer,
    `如果你愿意继续往深处问，可以先问自己：${questionA}${questionB ? ` ${questionB}` : ""}`,
    `还有一件事要提醒你：${seed.cautionNote}`,
    `基于公开人物视角的模拟建议里，${profile.mentorName} 大概率不会赞成你这样做：${seed.avoidAdvice.join("；")}`,
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
  const opener = pickByLength(seed.voiceHooks?.followupOpeners, question, seed.openingLine);
  const closer = pickByLength(seed.voiceHooks?.followupClosers, question, `别忘了：${seed.cautionNote}`);

  return [
    opener,
    `你追问“${question}”，这很好，因为它已经不只是情绪反应，而是在逼近真正的卡点。`,
    `${profile.mentorName} 这一路数，通常不会急着给你漂亮答案，而是会把你拉回这里：${seed.perspectivePrompt}`,
    `如果继续往下走，他大概会追着你问：${seed.signatureQuestions[0]}`,
    `所以这一步别再把问题摊太大，先做这件事：${seed.actionStyle}`,
    closer,
    `顺带提醒一句，基于公开人物视角的模拟建议里，他通常会反对你这样处理：${seed.avoidAdvice.join("；")}`,
  ].join(" ");
}
