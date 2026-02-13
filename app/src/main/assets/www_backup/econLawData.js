// ===== 经济学综合知识点数据库（匹配紫依经济学背诵讲义-26年完整版） =====
// 扩充版：共113个知识点
const econLawData = {
    // 模块定义 - 按照实际资料结构调整
    modules: {
        socialism: { name: '社会主义市场经济', color: '#6366f1', icon: '📊' },
        fiscal: { name: '财政学', color: '#8b5cf6', icon: '💰' },
        international: { name: '国际经济学', color: '#06b6d4', icon: '🌍' },
        banking: { name: '货币银行学', color: '#f59e0b', icon: '🏦' },
        western: { name: '西方经济学', color: '#10b981', icon: '📈' }
    },

    // 知识点列表
    knowledge: [
        // ===== 社会主义市场经济理论 =====
        {
            id: 'soc-001',
            module: 'socialism',
            type: 'term',
            title: '产权明晰化',
            content: '是指明确产权主体和边界，使产权关系清晰化。产权明晰化是市场经济有效运行的前提条件，包括：产权主体明确、产权边界清晰、产权可交易等。',
            tip: '记忆："产权"要"明晰" → 谁的东西、范围多大',
            examYears: ['16', '21', '24'],
            difficulty: 3
        },
        {
            id: 'soc-002',
            module: 'socialism',
            type: 'choice',
            title: '经济政策基本目标',
            content: '包括：①经济增长；②充分就业；③物价稳定；④国际收支平衡；⑤收入公平分配；⑥资源优化配置。这些目标之间可能存在冲突，需要政策权衡。',
            tip: '记忆口诀："增长就业物价衡，公平配置要兼顾"',
            examYears: ['15', '19', '22'],
            difficulty: 3
        },
        {
            id: 'soc-003',
            module: 'socialism',
            type: 'choice',
            title: '二元经济结构',
            content: '是指以城市工业为主的现代部门与以农村为主的传统部门并存。两个部门在生产方式、劳动生产率、收入水平等方面存在显著差异。',
            tip: '记忆：现代工业 + 传统农业 = 二元并存',
            examYears: ['17', '20'],
            difficulty: 2
        },
        {
            id: 'soc-004',
            module: 'socialism',
            type: 'choice',
            title: '市场经济的基本特征',
            content: '①资源配置遵循产权规则；②决策分散化；③自由和平等竞争；④价格协调微观决策。核心是通过市场机制实现资源的有效配置。',
            tip: '记忆：产权规则、分散决策、自由竞争、价格协调',
            examYears: ['18', '23'],
            difficulty: 3
        },
        {
            id: 'soc-005',
            module: 'socialism',
            type: 'short',
            title: '所有权权能',
            content: [
                '① 占有权能：对财产实际控制的权利',
                '② 使用权能：对财产加以利用的权利',
                '③ 收益权能：从财产中获得收益的权利',
                '④ 处分权能：决定财产命运的权利'
            ],
            tip: '记忆口诀："占使收处" = 占有、使用、收益、处分',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'soc-006',
            module: 'socialism',
            type: 'short',
            title: '公共产权的特征',
            content: [
                '① 不可分性：产权无法分割到个人',
                '② 使用的非排他性：无法排除他人使用',
                '③ 外部性：使用会影响他人',
                '④ 剩余索取权的不可转让性'
            ],
            tip: '记忆：公共 = 不可分 + 不排他 + 有外部性',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'soc-007',
            module: 'socialism',
            type: 'short',
            title: '可持续发展的三个原则',
            content: [
                '① 持续性原则：发展要在资源环境承载范围内',
                '② 公平性原则：代际公平和代内公平',
                '③ 共同性原则：全球共同应对环境问题'
            ],
            tip: '记忆：持续 + 公平 + 共同',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'soc-008',
            module: 'socialism',
            type: 'short',
            title: '宏观调控的手段',
            content: [
                '① 财政政策手段：税收政策、财政支出政策、财政补贴政策',
                '② 货币政策手段：法定存款准备金、再贴现、公开市场业务',
                '③ 行政控制手段：价格管制、投资审批等',
                '④ 制度约束：国有资产制度、税制、金融制度、社会保障制度'
            ],
            tip: '记忆：财政 + 货币 + 行政 + 制度',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'soc-009',
            module: 'socialism',
            type: 'short',
            title: '市场失灵的表现',
            content: [
                '① 市场垄断：市场被少数企业控制',
                '② 信息不充分：买卖双方信息不对称',
                '③ 外部效应：经济活动对第三方产生影响',
                '④ 收入分配不公：市场导致贫富差距',
                '⑤ 经济波动：市场自发调节导致周期性波动'
            ],
            tip: '记忆：垄断 + 信息 + 外部性 + 分配 + 波动',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'soc-010',
            module: 'socialism',
            type: 'short',
            title: '政府失灵的原因',
            content: [
                '① 政府决策失误：信息不足或判断错误',
                '② 寻租行为：利益集团游说导致资源浪费',
                '③ 政府提供信息不及时或失真',
                '④ 政府职能的"越位"和"缺位"',
                '⑤ 缺乏市场激励、政府政策的频繁变化'
            ],
            tip: '记忆：与市场失灵相对，政府干预反而降低效率',
            examYears: ['25'],
            difficulty: 3
        },
        {
            id: 'soc-011',
            module: 'socialism',
            type: 'choice',
            title: '马克思主义经济学的研究对象',
            content: '马克思主义经济学认为：经济学的研究对象是特定生产方式之下的生产关系。生产关系是人们在物质资料生产过程中所结成的社会关系，包括生产资料所有制形式、人们在生产中的地位及其相互关系、产品分配方式等。',
            tip: '记忆：马克思主义 → 生产关系（不是一般资源配置）',
            examYears: ['19'],
            difficulty: 2
        },
        {
            id: 'soc-012',
            module: 'socialism',
            type: 'choice',
            title: '整体主义分析方法',
            content: '在社会人假设的基础上，马克思主义经济学形成了整体主义分析方法。这种方法强调从社会整体、生产关系的总和来研究经济现象，关注阶级关系和社会结构的分析。',
            tip: '记忆：社会人假设 → 整体主义（区别于个体主义）',
            examYears: ['16', '20'],
            difficulty: 3
        },
        {
            id: 'soc-013',
            module: 'socialism',
            type: 'choice',
            title: '二元经济结构的含义',
            content: '二元经济结构是指以城市工业为主的现代部门与以农村为主的传统部门并存。两个部门在生产方式、劳动生产率、收入水平等方面存在显著差异，是一种过渡性的经济结构形态。',
            tip: '记忆：现代工业 + 传统农业 = 二元并存（补充版）',
            examYears: ['13', '15'],
            difficulty: 2
        },
        {
            id: 'soc-014',
            module: 'socialism',
            type: 'choice',
            title: '经济增长与经济发展的区别',
            content: '经济增长一般指更多的产出，它通常用人均GNP或人均GDP的增长速度来表示；而经济发展既包括更多的产出，同时也包括产品生产和分配所依赖的技术和体制安排上的变革。发展比增长内涵更丰富。',
            tip: '记忆：增长 = 产出增加；发展 = 增长 + 制度变革',
            examYears: ['09'],
            difficulty: 3
        },
        {
            id: 'soc-015',
            module: 'socialism',
            type: 'choice',
            title: '产权明晰化的含义',
            content: '产权明晰化的含义包括：①产权的排他性：明确产权主体对财产的独占权；②产权的可分割性和可分离性：产权可以分解为不同权能；③产权的可转让性：产权可以在市场上交易；④产权的有效保护：法律对产权的保护。',
            tip: '记忆：排他 + 分割 + 转让 + 保护 = 明晰化四要素',
            examYears: ['14'],
            difficulty: 3
        },
        {
            id: 'soc-016',
            module: 'socialism',
            type: 'choice',
            title: '占有权能的含义',
            content: '占有权能是指人对财产直接加以控制的可能性，是所有者与他人之间因对财产进行实际控制而产生的权利义务关系。它是所有权的一项基本权能，是行使其他权能的前提。',
            tip: '记忆：占有 = 实际控制（区别于所有、使用、收益、处分）',
            examYears: ['18'],
            difficulty: 3
        },
        {
            id: 'soc-017',
            module: 'socialism',
            type: 'choice',
            title: '地方政府在制度变迁中的作用',
            content: '地方政府在我国的中间扩散型制度变迁方式中扮演着重要的角色。作为中央与微观主体之间的中介，地方政府既是制度变迁的推动者，也是改革试验的先行者，在制度创新中发挥重要作用。',
            tip: '记忆：中间扩散型 → 地方政府是关键中介',
            examYears: ['17'],
            difficulty: 4
        },
        {
            id: 'soc-018',
            module: 'socialism',
            type: 'choice',
            title: '经济政策的具体目标',
            content: '经济政策的具体目标包括：①经济增长；②物价稳定；③充分就业；④产业结构高级化；⑤国际收支平衡。这些目标共同构成了宏观经济调控的核心内容。',
            tip: '记忆口诀："长物价业衡" = 增长、物价、就业、产业、收支',
            examYears: ['12'],
            difficulty: 3
        },
        {
            id: 'soc-019',
            module: 'socialism',
            type: 'choice',
            title: '"华盛顿共识"的思想基础',
            content: '"华盛顿共识"秉承了亚当·斯密的自由竞争经济思想，主张市场化、私有化、自由化改革。其核心是减少政府干预，发挥市场在资源配置中的基础性作用，实现贸易自由化和资本流动自由化。',
            tip: '记忆：华盛顿共识 → 亚当·斯密 → 自由竞争',
            examYears: ['11'],
            difficulty: 3
        },

        // ===== 财政学 =====
        {
            id: 'fis-001',
            module: 'fiscal',
            type: 'term',
            title: '免费搭车行为',
            content: '是指不承担任何成本而消费或使用公共物品的行为。公共物品具有消费的非排他性和非竞争性，免费搭车行为往往导致公共物品供应不足。',
            tip: '记忆：想"搭车"但不想"买票" = 只享受不付出',
            examYears: ['14', '19'],
            difficulty: 2
        },
        {
            id: 'fis-002',
            module: 'fiscal',
            type: 'term',
            title: '寻租行为',
            content: '是指人们凭借政府保护进行的为追求自身经济利益的活动。其特点是把那些本应当用于价值生产活动的资源用于为了决定分配结果的竞争。又称为"院外活动"。',
            tip: '记忆："寻"找"租"金/特权 = 寻求政府保护获利',
            examYears: ['04', '17', '21'],
            difficulty: 3
        },
        {
            id: 'fis-003',
            module: 'fiscal',
            type: 'term',
            title: '政府失灵',
            content: '是指政府的活动或干预措施缺乏效率，或者说政府做出了降低经济效率的决策或不能实施改善经济效率的政策。',
            tip: '记忆：与市场失灵相对，政府干预反而降低效率',
            examYears: ['20', '25'],
            difficulty: 2
        },
        {
            id: 'fis-004',
            module: 'fiscal',
            type: 'term',
            title: '购买性支出',
            content: '是指政府购买商品和服务的支出，包括购买进行日常政务活动所需的或用于国家投资所需的商品和服务的支出。体现的是政府的市场性再分配活动。',
            tip: '记忆：一手交钱一手交货，有实际商品交换',
            examYears: ['11', '15', '22'],
            difficulty: 2
        },
        {
            id: 'fis-005',
            module: 'fiscal',
            type: 'term',
            title: '转移性支出',
            content: '是指政府单方面把一部分收入无偿地转移出去而发生的支出，包括补助支出、捐赠支出和债务利息支出等。体现的是政府的非市场性再分配活动。',
            tip: '记忆：与购买性支出相对，无偿转移、无商品交换',
            examYears: ['11'],
            difficulty: 2
        },
        {
            id: 'fis-006',
            module: 'fiscal',
            type: 'term',
            title: '拉弗曲线',
            content: '描绘了税收收入与税率之间的关系。当税率在一定限度以下时，提高税率能增加税收收入；但超过一定限度时，再提高税率反而会导致税收收入减少。',
            tip: '记忆：税率像弹簧，压太紧反而弹不回来',
            examYears: ['16', '23'],
            difficulty: 3
        },
        {
            id: 'fis-007',
            module: 'fiscal',
            type: 'term',
            title: '财政赤字',
            content: '是指在某一财政年度，计划的财政支出超过财政收入，导致财政收支出现差额的现象。',
            tip: '记忆：支出 > 收入 = 赤字（红字）',
            examYears: ['18', '24'],
            difficulty: 1
        },
        {
            id: 'fis-008',
            module: 'fiscal',
            type: 'term',
            title: '政府采购制度',
            content: '是指以公开招标、投标为主要方式选择供应商，从国内外市场上为政府部门购买商品或服务的一种制度。具有公开性、公正性、竞争性的特征。',
            tip: '记忆：公开 + 公正 + 竞争 = 政府采购',
            examYears: ['21'],
            difficulty: 2
        },
        {
            id: 'fis-009',
            module: 'fiscal',
            type: 'term',
            title: '成本—效益分析法',
            content: '是指针对政府确定的建设目标，提出若干实现建设目标的方案，计算各方案的全部预期成本和全部预期效益，通过比较选择出最优的投资项目。',
            tip: '记忆：成本÷效益，比值越小越好',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-010',
            module: 'fiscal',
            type: 'term',
            title: '最低费用选择法',
            content: '是指一般不用货币单位来计量备选的财政支出项目的社会效益，只计算每项备选项目的有形成本，并以成本最低为择优的标准。',
            tip: '记忆：不算效益只算成本，选最便宜的',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-011',
            module: 'fiscal',
            type: 'term',
            title: '公共定价法',
            content: '是指政府相关管理部门通过一定程序和规则制定提供公共物品的价格和收费标准。包括纯公共定价和管制定价。',
            tip: '记忆：政府给公共物品"定价"',
            examYears: ['10'],
            difficulty: 3
        },
        {
            id: 'fis-012',
            module: 'fiscal',
            type: 'term',
            title: '就业创造标准',
            content: '是指政府应当选择单位投资额能够动员最大数量劳动力的项目。包括外延增加就业机会和内涵增加就业机会。',
            tip: '记忆：单位投资 → 最多就业',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'fis-013',
            module: 'fiscal',
            type: 'term',
            title: '财政投融资',
            content: '是指政府为实现一定的产业政策和其他政策目标，通过国家信用方式筹集资金，以出资或融资方式将资金投向急需发展的部门。具有有偿性、公共性、非营利性、统筹性和灵活性等特点。',
            tip: '记忆：政府"投资"+"融资"，有偿使用',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-014',
            module: 'fiscal',
            type: 'term',
            title: '建设-经营-转让投资方式（BOT）',
            content: '是指政府将基础设施建设项目通过招商转让给某一财团或公司，由其建设经营，通过项目经营收益偿还债务，协议期满项目产权转让给政府。',
            tip: '记忆：B(建设)O(经营)T(转让)',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-015',
            module: 'fiscal',
            type: 'term',
            title: '社会保障',
            content: '是指政府通过专款专用税筹措资金，向老年人、无工作能力的人、失去工作机会的人、病人等提供基本生活保障的计划。',
            tip: '记忆：为弱势群体提供基本生活保障',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'fis-016',
            module: 'fiscal',
            type: 'term',
            title: '累进税率',
            content: '是指税率随课税对象数额的增加而提高的税率。分为超额累进税率和全额累进税率。',
            tip: '记忆：收入越高，税率越高',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'fis-017',
            module: 'fiscal',
            type: 'term',
            title: '价内税与价外税',
            content: '根据税收与价格的关系分类。税金构成价格组成部分的称为价内税（如消费税）；税金作为价格之外附加的称为价外税（如增值税）。',
            tip: '记忆：价内 = 税金在价格里；价外 = 税金在价格外',
            examYears: ['09'],
            difficulty: 3
        },
        {
            id: 'fis-018',
            module: 'fiscal',
            type: 'term',
            title: '税收中性',
            content: '是指政府课税不扭曲市场机制的正常运行，不影响私人部门原有的资源配置状况。政府征税使社会所付出的代价应以税款为限。',
            tip: '记忆：征税不干扰市场正常运转',
            examYears: ['03', '08', '19'],
            difficulty: 3
        },
        {
            id: 'fis-019',
            module: 'fiscal',
            type: 'term',
            title: '税负转嫁',
            content: '是指纳税人通过提高销售价格或压低购进价格的方法，将税负转移给购买者或供应者的经济现象。方式包括前转、后转、消转、税收资本化。',
            tip: '记忆：纳税人把税"转"给别人承担',
            examYears: ['02', '05', '22'],
            difficulty: 3
        },
        {
            id: 'fis-020',
            module: 'fiscal',
            type: 'term',
            title: '税制类型',
            content: '是指一国征收一种税还是多种税的税制。只征收一种税的称为单一税制；征收两种以上税种的称为复合税制。世界各国普遍实行复合税制。',
            tip: '记忆：单一税制 vs 复合税制（主流）',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'fis-021',
            module: 'fiscal',
            type: 'term',
            title: '税制结构与税制模式',
            content: '税制结构是指一国各税种的总体安排。税制模式是指在一国的税制结构中以哪类税作为主体税种，如所得税为主体、流转税为主体或双主体模式。',
            tip: '记忆：结构 = 各税种安排；模式 = 主体税种选择',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-022',
            module: 'fiscal',
            type: 'term',
            title: '分类所得税',
            content: '是指对纳税人的各种应纳税所得分为若干类别，不同类别所得按不同的税率分别课征所得税。优点是征管简便，缺点是不能体现纳税人整体负担能力。',
            tip: '记忆：不同收入分开算，各自征税',
            examYears: ['04'],
            difficulty: 3
        },
        {
            id: 'fis-023',
            module: 'fiscal',
            type: 'term',
            title: '综合所得税',
            content: '是指对纳税人全年的各种所得，不论其来源，综合计算征收所得税。优点是能体现纳税人的整体负担能力，符合量能课税原则。',
            tip: '记忆：所有收入加起来一起算税',
            examYears: ['07', '12', '20'],
            difficulty: 3
        },
        {
            id: 'fis-024',
            module: 'fiscal',
            type: 'term',
            title: '税制改革',
            content: '是指通过税制设计和税制结构的边际改变来增进福利的过程。不仅仅是新税种的建立和旧税种的废弃，还有税种搭配组合的变化。',
            tip: '记忆：税制改革 = 税种增减 + 结构调整',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'fis-025',
            module: 'fiscal',
            type: 'term',
            title: '国债限度',
            content: '是指国家举债规模的最高额度。可用国债依存度、国债负担率、偿债率等指标来衡量。',
            tip: '记忆：国债不能无限发，有限度',
            examYears: ['13'],
            difficulty: 3
        },
        {
            id: 'fis-026',
            module: 'fiscal',
            type: 'term',
            title: '国债发行市场',
            content: '是指国债发行场所，又称国债一级市场。发行方式包括固定收益出售、公募拍卖、连续经销、直接推销等。',
            tip: '记忆：国债"出生"的地方',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-027',
            module: 'fiscal',
            type: 'term',
            title: '国债流通市场',
            content: '是指已发行国债的买卖、转让场所，又称国债二级市场。包括证券交易所交易和场外交易。',
            tip: '记忆：国债"流通"的地方',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'fis-028',
            module: 'fiscal',
            type: 'term',
            title: '国家预算',
            content: '是指政府的基本财政收支计划，是国家的重要财政工具。包括多种预算形式和预算方法，一般由中央预算和地方预算组成。具有公开性、可靠性、完整性、统一性、年度性等原则。',
            tip: '记忆：政府的"收支账本"',
            examYears: ['01'],
            difficulty: 2
        },
        {
            id: 'fis-029',
            module: 'fiscal',
            type: 'term',
            title: '收支两条线管理',
            content: '是指具有收费和罚款没收职能的部门和单位，其收入按规定全额上缴国库或财政专户，支出由财政部门按规定统筹安排的管理制度。',
            tip: '记忆：收钱和花钱分开管',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-030',
            module: 'fiscal',
            type: 'short',
            title: '财政职能',
            content: [
                '① 资源配置职能：矫正资源配置结构，实现资源优化配置',
                '② 收入分配职能：调节收入差距，实现社会公平',
                '③ 经济稳定职能：调节经济运行，保持经济稳定',
                '④ 经济发展职能：促进经济增长和经济结构优化'
            ],
            tip: '记忆口诀："资收稳发"',
            examYears: ['14', '24'],
            difficulty: 3
        },
        {
            id: 'fis-031',
            module: 'fiscal',
            type: 'short',
            title: '财政支出增长理论',
            content: [
                '① 瓦格纳法则：工业化进程中，公共支出不断增长',
                '② 梯度渐进增长理论：支出增长呈阶梯式上升',
                '③ 经济发展阶段论：不同阶段支出结构不同',
                '④ 非均衡增长模型：公共部门生产率偏低导致支出增长'
            ],
            tip: '记忆：瓦格纳 → 梯度 → 发展阶段 → 非均衡',
            examYears: ['20'],
            difficulty: 4
        },
        {
            id: 'fis-032',
            module: 'fiscal',
            type: 'short',
            title: '税收的基本特征',
            content: [
                '① 强制性：国家凭借政治权力强制征收',
                '② 无偿性：国家征税不需要直接偿还',
                '③ 固定性：征税标准事先规定，相对稳定'
            ],
            tip: '记忆口诀："强无固" = 强制、无偿、固定',
            examYears: ['21'],
            difficulty: 2
        },
        {
            id: 'fis-033',
            module: 'fiscal',
            type: 'short',
            title: '税负转嫁方式',
            content: [
                '① 前转：提高售价，将税负转嫁给购买者',
                '② 后转：压低进价，将税负转嫁给供应者',
                '③ 消转：降低成本，自行消化税负',
                '④ 税收资本化：压低资产价格，将税负转嫁给卖方'
            ],
            tip: '记忆：前转（向前给消费者）+ 后转（向后给供应商）',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-034',
            module: 'fiscal',
            type: 'short',
            title: '国债的负担',
            content: [
                '① 债权人负担：购买国债者的资金占用',
                '② 债务人负担：政府还本付息的财政压力',
                '③ 纳税人负担：还债最终来源于税收',
                '④ 代际负担：债务可能转嫁给后代承担'
            ],
            tip: '记忆：债权、债务、纳税、后代四方负担',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'fis-035',
            module: 'fiscal',
            type: 'short',
            title: '国家预算的原则',
            content: [
                '① 公开性：预算收支内容要公开透明',
                '② 可靠性：收支数字要真实可靠',
                '③ 完整性：所有收支都要列入预算',
                '④ 统一性：预算科目统一，口径一致',
                '⑤ 年度性：按年度编制和执行'
            ],
            tip: '记忆口诀："公可完统年"',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'fis-036',
            module: 'fiscal',
            type: 'short',
            title: '公共定价的三种方法',
            content: [
                '① 平均成本定价法：价格 = 平均成本',
                '② 二部定价法：固定费用 + 使用费',
                '③ 负荷定价法：不同时段不同价格'
            ],
            tip: '记忆：平均成本、二部、负荷',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-037',
            module: 'fiscal',
            type: 'short',
            title: '财政投融资的特点',
            content: [
                '① 有偿性：资金需要偿还',
                '② 公共性：服务于公共目标',
                '③ 非营利性：不以盈利为目的',
                '④ 统筹性：统一规划安排',
                '⑤ 灵活性：运作方式灵活'
            ],
            tip: '记忆口诀："有公非统灵"',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-038',
            module: 'fiscal',
            type: 'short',
            title: '税收分类',
            content: [
                '① 按课税对象：流转税、所得税、财产税',
                '② 按课税标准：从量税、从价税',
                '③ 按税收与价格关系：价内税、价外税',
                '④ 按税种隶属关系：中央税、地方税'
            ],
            tip: '记忆：对象、标准、价格、隶属',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-039',
            module: 'fiscal',
            type: 'choice',
            title: '市场失灵和市场缺陷的主要表现',
            content: '市场失灵和市场缺陷主要表现在以下六个方面：①自然垄断：市场被少数企业控制；②外部效应：经济活动对第三方产生影响；③公共物品：非排他性和非竞争性导致供给不足；④信息不充分：买卖双方信息不对称；⑤收入分配不公：市场机制导致贫富差距扩大；⑥经济波动：市场自发调节导致周期性波动。',
            tip: '记忆口诀："垄外公信分波"=垄断、外部性、公共物品、信息、分配、波动',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-040',
            module: 'fiscal',
            type: 'choice',
            title: '财政职能',
            content: '财政职能主要包括四个方面：①资源配置职能：矫正资源配置结构，实现资源优化配置；②收入分配职能：调节收入差距，实现社会公平；③经济稳定职能：调节经济运行，保持经济稳定；④经济发展职能：促进经济增长和经济结构优化。',
            tip: '记忆口诀："资收稳发"=资源配置、收入分配、经济稳定、经济发展',
            examYears: ['14', '24'],
            difficulty: 3
        },
        {
            id: 'fis-041',
            module: 'fiscal',
            type: 'choice',
            title: '政府失灵或政府干预的缺陷',
            content: '政府失灵或政府干预的缺陷主要表现在：①短缺和过剩：政府干预可能导致商品短缺或过剩；②信息不足：政府难以获取全面准确的市场信息；③官僚主义：行政效率低下，决策缓慢；④缺乏市场激励：政府行为缺乏利润动机和竞争压力；⑤政府政策的频繁变化：政策不稳定影响经济主体预期。',
            tip: '记忆：短缺过剩、信息不足、官僚、无激励、政策多变',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-042',
            module: 'fiscal',
            type: 'choice',
            title: '财政支出按国家职能划分',
            content: '依据国家职能划分，财政支出分为五类：①经济建设费：用于经济建设和发展的支出；②社会文教费：用于教育、科学、文化、卫生等社会事业的支出；③国防费：用于国防建设和军队建设的支出；④行政管理费：用于国家政权机关和行政管理机构运转的支出；⑤其他支出：不属于以上各类的支出。',
            tip: '记忆口诀："经文防管他"=经济建设、社会文教、国防、行政管理、其他',
            examYears: ['08', '12'],
            difficulty: 3
        },
        {
            id: 'fis-043',
            module: 'fiscal',
            type: 'choice',
            title: '解释财政支出增长的理论',
            content: '解释财政支出增长的主要理论包括：①政府活动扩张论（瓦格纳法则）：工业化进程中，公共支出不断增长；②梯度渐进增长论：支出增长呈阶梯式上升，危机时期跳跃式增长；③经济发展阶段论：不同发展阶段支出结构不同；④官僚行为增长论：官僚追求预算最大化导致支出增长。',
            tip: '记忆：瓦格纳扩张、梯度渐进、发展阶段、官僚行为',
            examYears: ['11', '17', '21'],
            difficulty: 4
        },
        {
            id: 'fis-044',
            module: 'fiscal',
            type: 'choice',
            title: '财政支出结构的经济效应',
            content: '财政支出结构的经济效应主要包括：①增长效应：合理的支出结构促进经济增长；②排挤效应：政府支出排挤私人投资和消费；③储蓄效应：政府支出影响国民储蓄水平。',
            tip: '记忆：增长、排挤、储蓄三大效应',
            examYears: ['11', '25'],
            difficulty: 3
        },
        {
            id: 'fis-045',
            module: 'fiscal',
            type: 'choice',
            title: '公共定价的三种方法',
            content: '公共定价的三种方法是：①平均成本定价法：价格等于平均成本，企业收支平衡；②二部定价法：由固定费用（基本费）和使用费（从量费）两部分组成；③负荷定价法：根据不同时段的需求负荷制定不同价格，高峰时段价格高，低谷时段价格低。',
            tip: '记忆：平均成本、二部、负荷',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-046',
            module: 'fiscal',
            type: 'choice',
            title: '财政投融资的特点',
            content: '财政投融资的特点包括：①有偿性：资金需要偿还，不同于无偿拨款；②公共性：服务于公共目标和政策需要；③非营利性：不以盈利为主要目的；④统筹性：由政府统一规划安排；⑤灵活性：运作方式灵活多样。',
            tip: '记忆口诀："有公非统灵"=有偿、公共、非营利、统筹、灵活',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-047',
            module: 'fiscal',
            type: 'choice',
            title: '我国社会保障制度的内容',
            content: '我国社会保障制度的内容包括：①社会保险：养老、医疗、失业、工伤、生育等保险；②社会救济：对贫困家庭和个人的救助；③社会福利：为全体社会成员提供的福利设施和服务；④社会优抚：对军人及其家属的优待和抚恤。',
            tip: '记忆口诀："保险救济福利优抚"',
            examYears: ['10', '15'],
            difficulty: 2
        },
        {
            id: 'fis-048',
            module: 'fiscal',
            type: 'choice',
            title: '税收按课税对象分类',
            content: '税收按课税对象分为三类：①所得税：以纳税人的所得额为课税对象，如个人所得税、企业所得税；②商品税：以商品流转额为课税对象，如增值税、消费税；③财产税：以纳税人拥有或支配的财产为课税对象，如房产税、遗产税。',
            tip: '记忆：所得、商品、财产',
            examYears: ['14'],
            difficulty: 2
        },
        {
            id: 'fis-049',
            module: 'fiscal',
            type: 'choice',
            title: '税收按税负能否转嫁分类',
            content: '按税负能否转嫁分为：①直接税：税负不能转嫁，由纳税人直接承担，如所得税、财产税；②间接税：税负可以转嫁给他人的税种，如增值税、消费税、关税等商品税。',
            tip: '记忆：直接税不能转嫁，间接税可以转嫁',
            examYears: ['17'],
            difficulty: 2
        },
        {
            id: 'fis-050',
            module: 'fiscal',
            type: 'choice',
            title: '税收按课税标准分类',
            content: '按课税标准分为：①从量税：按课税对象的数量、重量、体积等实物量标准计征的税收，如资源税、车船税；②从价税：按课税对象的价格为标准计征的税收，如增值税、关税。',
            tip: '记忆：从量=按数量，从价=按价格',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'fis-051',
            module: 'fiscal',
            type: 'choice',
            title: '税收按与价格的关系分类',
            content: '按税收和价格的关系分为：①价内税：税金构成商品价格组成部分的税收，如消费税；②价外税：税金作为价格之外附加的税收，如增值税。',
            tip: '记忆：价内=税金在价格里，价外=税金在价格外',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'fis-052',
            module: 'fiscal',
            type: 'choice',
            title: '税收按税种隶属关系分类',
            content: '按税种的隶属关系分为：①中央税：收入归中央政府所有的税收，如关税、消费税；②地方税：收入归地方政府所有的税收，如房产税、契税；③共享税：中央和地方按比例分成的税收，如增值税、企业所得税。',
            tip: '记忆：中央税、地方税、共享税',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'fis-053',
            module: 'fiscal',
            type: 'choice',
            title: '最适所得税率的形状',
            content: '按最适课税理论，最适所得税率应当呈倒"U"形。这是因为从社会公平与效率的总体角度来看，中等收入者的边际税率可适当高些，而低收入者和高收入者应适用相对较低的税率。',
            tip: '记忆：倒U形，中间高两边低',
            examYears: ['08', '12'],
            difficulty: 4
        },
        {
            id: 'fis-054',
            module: 'fiscal',
            type: 'choice',
            title: '税收负担的能力原则',
            content: '税收负担的能力原则是指按照纳税人的负担能力分配税收，包括三个标准：①所得标准：以纳税人的收入为依据；②支出标准：以纳税人的消费支出为依据；③财富标准：以纳税人的财产存量为依据。',
            tip: '记忆：所得、支出、财富',
            examYears: ['10', '20'],
            difficulty: 3
        },
        {
            id: 'fis-055',
            module: 'fiscal',
            type: 'choice',
            title: '国债的功能',
            content: '国债的功能主要包括：①弥补财政赤字：通过发行国债弥补财政收入不足；②筹集建设资金：为重大建设项目筹集资金；③调节经济：通过国债发行和回购调节货币供应量和利率水平，实现宏观调控目标。',
            tip: '记忆：弥补赤字、筹集资金、调节经济',
            examYears: ['09', '15', '20'],
            difficulty: 2
        },
        {
            id: 'fis-s01',
            module: 'fiscal',
            type: 'short',
            title: '财政支出规模增长的趋势及其原因',
            content: [
                '① 瓦格纳法则（政府活动扩张论）：工业化进程中，公共支出不断增长',
                '② 梯度渐进增长理论：支出增长呈阶梯式上升，危机时期跳跃式增长',
                '③ 经济发展阶段论：不同发展阶段支出结构不同',
                '④ 非均衡增长模型：公共部门生产率偏低导致支出增长'
            ],
            tip: '记忆：瓦格纳扩张、梯度渐进、发展阶段、非均衡',
            examYears: ['11', '17', '21'],
            difficulty: 4
        },
        {
            id: 'fis-s02',
            module: 'fiscal',
            type: 'short',
            title: '公共物品的特征及提供方式',
            content: [
                '特征：①非排他性：无法排除他人使用；②非竞争性：一个人使用不影响他人使用',
                '提供方式：①纯公共物品：由政府提供，如国防、外交；②准公共物品：可由政府或市场提供，如教育、医疗'
            ],
            tip: '记忆：非排他+非竞争=公共物品；纯公共政府供，准公共可混合',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-s03',
            module: 'fiscal',
            type: 'short',
            title: '混合物品的特征及提供方式',
            content: [
                '特征：①具有一定程度的非竞争性或非排他性；②具有外部性；③可以部分由市场提供',
                '提供方式：①政府与市场共同提供；②政府提供一部分，市场提供一部分；③通过价格机制调节'
            ],
            tip: '记忆：介于公共物品和私人物品之间，可政府市场共同提供',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-s04',
            module: 'fiscal',
            type: 'short',
            title: '影响财政支出规模的因素',
            content: [
                '① 经济因素：经济发展水平、经济体制、政府经济政策',
                '② 政治因素：政治体制、政府职能、国际环境',
                '③ 社会因素：人口结构、社会福利需求',
                '④ 技术因素：技术进步、管理效率'
            ],
            tip: '记忆：经济+政治+社会+技术',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-s05',
            module: 'fiscal',
            type: 'short',
            title: '财政投融资的基本内容',
            content: [
                '① 定义：政府为实现产业政策等目标，通过信用方式筹集资金并投向特定部门',
                '② 特点：有偿性、公共性、非营利性、统筹性、灵活性',
                '③ 范围：基础设施建设、基础产业、高新技术产业等',
                '④ 方式：财政拨款、财政贷款、政策性金融等'
            ],
            tip: '记忆口诀："有公非统灵"=有偿、公共、非营利、统筹、灵活',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-s06',
            module: 'fiscal',
            type: 'short',
            title: '政府投资的特点',
            content: [
                '① 追求社会收益最大化而非私人收益最大化',
                '② 资金来源于税收等无偿取得的财政收入',
                '③ 投资决策依据政策目标而非单纯利润',
                '④ 投资标准：资本-产出比率最小化、资本-劳动力比率最大化、就业创造标准'
            ],
            tip: '记忆：社会收益+税收来源+政策目标+三大标准',
            examYears: ['21'],
            difficulty: 3
        },
        {
            id: 'fis-s07',
            module: 'fiscal',
            type: 'short',
            title: '财政补贴的性质和内容',
            content: [
                '性质：①是政府无偿转移支出；②是调节经济的重要杠杆；③具有时效性和针对性',
                '内容：①价格补贴：为稳定物价而给予的补贴；②企业亏损补贴：对政策性亏损企业的补贴；③财政贴息：对贷款利息的补贴；④税收补贴：通过税收优惠实现的补贴'
            ],
            tip: '记忆：无偿转移+经济杠杆；价格+亏损+贴息+税收',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-s08',
            module: 'fiscal',
            type: 'short',
            title: '税收原则',
            content: [
                '① 财政原则：税收应保证财政收入稳定充足',
                '② 公平原则：横向公平（同等能力同等税负）和纵向公平（不同能力不同税负）',
                '③ 效率原则：税收应尽量减少对经济效率的扭曲',
                '④ 简便原则：税制应简便易行，降低征纳成本'
            ],
            tip: '记忆：财政+公平+效率+简便',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'fis-s09',
            module: 'fiscal',
            type: 'short',
            title: '税负转嫁的条件',
            content: [
                '① 供求弹性的大小：供给弹性大、需求弹性小的商品易转嫁',
                '② 税种的性质：商品课税较易转嫁，所得课税一般不能转嫁',
                '③ 课税范围的宽窄：课税范围宽的商品较易转嫁',
                '④ 经营者的目标：利润或市场份额目标影响转嫁决策'
            ],
            tip: '记忆：弹性+税种+范围+目标',
            examYears: ['11', '15'],
            difficulty: 3
        },
        {
            id: 'fis-s10',
            module: 'fiscal',
            type: 'short',
            title: '国际税收的概念及其特点',
            content: [
                '概念：国际税收是指两个或两个以上国家对跨国纳税人的跨国所得进行征税所形成的税收分配关系',
                '特点：①涉及两个以上国家；②以跨国所得为征税对象；③反映国家间的税收分配关系；④没有独立的征税主体和客体'
            ],
            tip: '记忆：多国+跨国所得+分配关系+无独立主体',
            examYears: [],
            difficulty: 4
        },
        {
            id: 'fis-s11',
            module: 'fiscal',
            type: 'short',
            title: '国际重复征税及其减除方法',
            content: [
                '概念：两个或两个以上国家对同一纳税人的同一征税对象同时征税',
                '减除方法：①免税法：一国放弃征税权；②抵免法：允许用已纳税款抵减应纳税额；③扣除法：将已纳税款作为费用扣除；④低税法：对国外所得适用较低税率'
            ],
            tip: '记忆：免税、抵免、扣除、低税',
            examYears: [],
            difficulty: 4
        },
        {
            id: 'fis-s12',
            module: 'fiscal',
            type: 'short',
            title: '分级分税预算管理体制的基本内容',
            content: [
                '① 一级政权，一级预算主体，各级预算相对独立，自求平衡',
                '② 划分各级政府职责（事权）和预算支出职责（财权）范围',
                '③ 收入划分实行分税制：中央预算居主导地位',
                '④ 预算调节制度：转移支付制度，包括纵向和横向调节',
                '⑤ 分级预算体制相对稳定，集权与分权关系可调整'
            ],
            tip: '记忆：一级政权一级预算+划分事权财权+分税制+转移支付',
            examYears: ['19'],
            difficulty: 4
        },
        {
            id: 'fis-s13',
            module: 'fiscal',
            type: 'short',
            title: '如何理解财政平衡',
            content: [
                '① 财政平衡是指国家预算收支在量上的对比关系（收大于支、支大于收或收支相等）',
                '② 略有结余或略有赤字都应视为基本平衡，目标是基本平衡或大体平衡',
                '③ 研究财政平衡要有动态平衡的观点，不能局限于静态平衡',
                '④ 要有全局观点，不能就财政平衡论财政平衡',
                '⑤ 可以从中央预算平衡和地方预算平衡分别考察'
            ],
            tip: '记忆：收支对比+基本平衡+动态+全局+分别考察',
            examYears: ['13'],
            difficulty: 3
        },
        {
            id: 'fis-s14',
            module: 'fiscal',
            type: 'short',
            title: '财政平衡与总量平衡的关系',
            content: [
                '① 财政平衡是社会总供求平衡中的一个组成部分，必须从国民经济整体平衡研究财政平衡',
                '② 财政平衡是实现社会总供求平衡的一种手段，本身不是目的',
                '③ 财政平衡可以直接调节社会总需求，间接调节社会总供给',
                '④ 财政收支属于政府行为，是政府掌握的宏观调控手段'
            ],
            tip: '记忆：组成部分+手段+调节需求+宏观调控',
            examYears: [],
            difficulty: 4
        },
        {
            id: 'int-001',
            module: 'international',
            type: 'term',
            title: '绝对优势',
            content: '是指一国生产某种产品的绝对成本低于另一国，或生产效率高于另一国。由亚当·斯密提出，是国际贸易的基础之一。',
            tip: '记忆：亚当·斯密 → 绝对优势 → 谁生产便宜谁生产',
            examYears: ['15', '19'],
            difficulty: 2
        },
        {
            id: 'int-002',
            module: 'international',
            type: 'term',
            title: '比较优势',
            content: '是指一国生产某种产品的机会成本低于另一国。由大卫·李嘉图提出，是国际贸易理论的核心。即使一国在所有产品生产上都没有绝对优势，仍可通过专业化生产比较优势产品获益。',
            tip: '记忆：李嘉图 → 比较（机会成本）→ 两利相权取其重，两害相权取其轻',
            examYears: ['16', '20', '23'],
            difficulty: 3
        },
        {
            id: 'int-003',
            module: 'international',
            type: 'term',
            title: '贸易乘数',
            content: '是指开放经济中，出口增加引起的国民收入增加的倍数。贸易乘数 = 1 / (1 - 边际消费倾向 + 边际进口倾向)',
            tip: '记忆：出口↑→收入↑→消费↑→进口↑→收入↑...循环放大',
            examYears: ['18'],
            difficulty: 3
        },
        {
            id: 'int-004',
            module: 'international',
            type: 'term',
            title: '一价定律',
            content: '是指在没有运输成本和贸易壁垒的条件下，同一种商品在不同国家用同一货币表示的价格应该相同。是购买力平价理论的基础。',
            tip: '记忆：同一商品 → 同一价格 → 否则就有套利',
            examYears: ['17', '22'],
            difficulty: 2
        },
        {
            id: 'int-005',
            module: 'international',
            type: 'term',
            title: '贸易创造',
            content: '是指关税同盟建立后，由于成员国之间取消关税，导致原来由本国高成本生产的产品转向由成员国低成本生产，从而产生的贸易增加效应。',
            tip: '记忆：同盟内 → 高成本转向低成本 → 创造新贸易',
            examYears: ['19', '24'],
            difficulty: 3
        },
        {
            id: 'int-006',
            module: 'international',
            type: 'term',
            title: '贸易转移',
            content: '是指关税同盟建立后，由于对外统一关税，导致原来从非成员国低成本进口转向从成员国高成本进口，从而产生的贸易转移效应。',
            tip: '记忆：同盟内 → 低成本转向高成本 → 福利损失',
            examYears: ['21'],
            difficulty: 3
        },
        {
            id: 'int-007',
            module: 'international',
            type: 'term',
            title: '倾销',
            content: '是指一国企业以低于国内市场价格或低于成本的价格向国外市场销售产品的行为。判断标准：① 价格低于正常价值；② 对进口国产业造成损害；③ 倾销与损害之间存在因果关系。',
            tip: '记忆：低价出口 + 造成损害 + 因果关系 = 倾销',
            examYears: ['16', '20'],
            difficulty: 2
        },
        {
            id: 'int-008',
            module: 'international',
            type: 'term',
            title: '产业内贸易理论',
            content: '是指解释同一产业内同类产品之间贸易现象的理论。产品差异化是产业内贸易的基础，规模经济是重要成因。',
            tip: '记忆：同类产品之间的贸易',
            examYears: [],
            difficulty: 4
        },
        {
            id: 'int-009',
            module: 'international',
            type: 'term',
            title: '战略政策贸易理论',
            content: '是指在不完全竞争和规模经济条件下，政府通过关税、补贴等贸易政策干预市场，帮助本国企业在国际竞争中获得优势的理论。',
            tip: '记忆：政府干预帮助本国企业',
            examYears: [],
            difficulty: 4
        },
        {
            id: 'int-010',
            module: 'international',
            type: 'term',
            title: '贸易扭曲理论',
            content: '是指由于市场不完全竞争、外部性、信息不对称等因素，导致国际贸易不能达到帕累托最优状态的现象。',
            tip: '记忆：市场不完美导致贸易扭曲',
            examYears: [],
            difficulty: 4
        },
        {
            id: 'int-011',
            module: 'international',
            type: 'short',
            title: '汇率决定理论',
            content: [
                '① 购买力平价理论：汇率由两国物价水平决定',
                '② 利率平价理论：汇率由两国利率差异决定',
                '③ 国际收支说：汇率由国际收支状况决定',
                '④ 资产市场说：汇率由资产市场供求决定'
            ],
            tip: '记忆：物价（购买力）→ 利率 → 收支 → 资产',
            examYears: ['17', '22'],
            difficulty: 3
        },
        {
            id: 'int-012',
            module: 'international',
            type: 'short',
            title: '国际收支表的构成',
            content: [
                '① 经常账户：货物贸易、服务贸易、收入、经常转移',
                '② 资本和金融账户：资本转移、直接投资、证券投资、其他投资',
                '③ 国际头寸：对外金融资产和负债存量'
            ],
            tip: '记忆：经常 + 资本金融 + 国际头寸',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'int-013',
            module: 'international',
            type: 'short',
            title: '传统的（古典）汇率决定理论',
            content: [
                '① 铸币平价说：金本位制下汇率由含金量决定',
                '② 国际借贷说：汇率由国际收支引起的外汇供求决定',
                '③ 传统购买力平价说：汇率由两国物价水平之比决定'
            ],
            tip: '记忆：铸币 + 借贷 + 购买力',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'int-014',
            module: 'international',
            type: 'short',
            title: '二战后的汇率决定理论',
            content: [
                '① 流动资产选择说：汇率由资产市场供求决定',
                '② 目标汇率说：政府干预维持目标汇率',
                '③ 货币主义的汇率理论：汇率由货币供给和需求决定'
            ],
            tip: '记忆：资产选择 + 目标汇率 + 货币主义',
            examYears: [],
            difficulty: 4
        },
        {
            id: 'int-015',
            module: 'international',
            type: 'choice',
            title: '利息率与远期汇率的关系',
            content: '利息率较高的货币远期汇率大多为贴水（远期汇率低于即期汇率），利息率较低的货币远期汇率大多为升水（远期汇率高于即期汇率）。',
            tip: '记忆：高利率货币远期贴水，低利率货币远期升水',
            examYears: [],
            difficulty: 4
        },
        {
            id: 'int-016',
            module: 'international',
            type: 'term',
            title: '联系汇率',
            content: '钉住汇率制的一种。将本国货币与另一国货币保持固定比价，本国货币对外汇率随该国汇率对外变动而变动。',
            tip: '记忆：盯住一国货币，随其汇率变动而变动',
            examYears: ['02'],
            difficulty: 3
        },
        {
            id: 'int-017',
            module: 'international',
            type: 'term',
            title: '里昂惕夫反论',
            content: '里昂惕夫利用投入产出模型对美国20世纪40年代和50年代的对外贸易进行了分析，发现美国参与国际分工是建立在劳动密集型专业分工之上的（即出口产品中的资本一劳动比率低于进口替代产品），而不是建立在资本密集型专业分工基础之上的，即美国是通过对外贸易安排剩余劳动力和节约资本的。这一结论与主流的H-O模型相悖，被称为里昂惕夫反论。',
            tip: '记忆：美国出口劳动密集型产品（与H-O理论预测的相反）',
            examYears: ['05', '10'],
            difficulty: 4
        },
        {
            id: 'int-018',
            module: 'international',
            type: 'term',
            title: '战略政策贸易理论',
            content: '该理论是各国在国际贸易实行贸易干涉与干预的基础上，一国可以通过各种政策的干预，在对本国至关重要的生产领域中创造出比较优势，而这些生产领域具有很强的各种前后向的联系，不仅可以带动经济发展，而且具有广泛的外部经济效益。该理论常常与产业政策之间存在着密切联系，是在不完全竞争市场中，通过贸易获取利益，促进经济的增长与发展。',
            tip: '记忆：政府干预创造比较优势，带动产业发展',
            examYears: ['06'],
            difficulty: 4
        },
        {
            id: 'int-019',
            module: 'international',
            type: 'term',
            title: '外汇管制',
            content: '外汇管制是一国政府通过法令对本国对外的国际结算和外汇买卖实行管制，用以实现国际收支平衡与本国货币汇率稳定的一种制度。',
            tip: '记忆：政府管制外汇买卖和结算',
            examYears: ['07'],
            difficulty: 2
        },
        {
            id: 'int-020',
            module: 'international',
            type: 'term',
            title: '进口配额',
            content: '是指一国政府在一定时期内，对某些商品的进口数量或金额加以直接限制的措施，它对进口的阻碍作用是十分明晰的。',
            tip: '记忆：直接限制进口数量或金额',
            examYears: ['08'],
            difficulty: 2
        },
        {
            id: 'int-021',
            module: 'international',
            type: 'term',
            title: '国际收支失衡',
            content: '是指经常账户、金融与资本账户的余额出现问题，经常账户出现的余额，靠资本和金融账户的余额无法平衡掉，不得不动用储备资产进行调整的现象，即对外经济出现了必须进行调整的情况。',
            tip: '记忆：经常账户失衡，资本账户无法平衡，需动用储备',
            examYears: ['13', '22'],
            difficulty: 3
        },
        {
            id: 'int-022',
            module: 'international',
            type: 'term',
            title: '产品的同质性与异质性',
            content: '产品的同质性是指产品间可以完全相互替代，即产品需求的交叉弹性极高，消费者对这类产品的消费偏好完全一样。产品的异质性是指产品相似但又不完全一样，存在着一定的差异，产品彼此之间不能完全替代但尚可进行一定程度的替代，交叉弹性小于同质性产品，在生产中要素投入具有个似性。',
            tip: '记忆：同质=完全替代；异质=相似但有差异',
            examYears: ['16'],
            difficulty: 3
        },
        {
            id: 'int-023',
            module: 'international',
            type: 'term',
            title: '汇兑心理理论',
            content: '汇兑心理理论认为，人们需要外汇是因为要购买商品与服务以满足人们的欲望(具有效用)，效用是外汇的价值基础，真正的价值在于其边际效用，而这又是人们主观心理决定的。人们主观上对外汇的评价不同，造成了外汇供求的变化，导致汇率变动。',
            tip: '记忆：主观心理评价 → 外汇供求变化 → 汇率变动',
            examYears: ['21'],
            difficulty: 3
        },
        {
            id: 'int-024',
            module: 'international',
            type: 'term',
            title: '两缺口模型',
            content: '该模型主要考虑的是储蓄与外汇缺口。设C为消费，S为储蓄，T为税收，M为进口，X为出口，I为投资。从国民经济的基本恒等式总收入等于总供给可以得出：总供给Y=C+S+T+M，总需求Y=C+I+G+X。若税收等于政府支出：T=G，则有：S+M=I+X，或I-S=M-X。',
            tip: '记忆：储蓄缺口(I-S)与外汇缺口(M-X)的关系',
            examYears: ['24'],
            difficulty: 4
        },

        // ===== 国际经济学简答题补充 =====
        {
            id: 'int-s01',
            module: 'international',
            type: 'short',
            title: '用图形说明两国贸易价格的可能区域及利益分配',
            content: [
                '① 两国贸易价格的可能区域：实际交换比率将处于由两国国内交换比率界定的两国贸易区内，超出该区域必然有一个国家会退出交易',
                '② A国国内交换比率为10X:15Y，B国国内交换比率为20Y:10X（或10X:20Y）',
                '③ 若A国在国际市场上能用10X换回多于15单位的Y，A国则会进入国际市场',
                '④ 若B国能以少于20单位的Y换取10单位的X，B国愿意进入国际市场',
                '⑤ 国内交换比率便是A、B两国进入国际市场的上、下限',
                '⑥ 具体的交换比率究竟应该在哪条线上，即国际价格的斜率为多少，需由相互需求方程式才能说明'
            ],
            tip: '记忆：两国交换比率之间是贸易区，超出则有一国退出',
            examYears: [],
            difficulty: 4
        },
        {
            id: 'int-s02',
            module: 'international',
            type: 'short',
            title: '简述贸易乘数的基本内容',
            content: [
                '① 贸易乘数研究了对外贸易与国民收入和就业之间的关系，描述了开放经济体系内部出口促进经济增长的动态过程',
                '② 从总需求角度有：Y=C+I+G+X；从总供给角度有：Y=C+S+T+M',
                '③ 令T=G，变换得：C+I+X=C+S+M，即I+X=S+M',
                '④ 贸易乘数公式：dY=dX×[1/(dS/dY+dM/dY)]',
                '⑤ 贸易乘数表明出口增加会引起国民收入成倍增加，进口增加会引起国民收入成倍减少',
                '⑥ 贸易乘数的大小取决于边际储蓄倾向和边际进口倾向'
            ],
            tip: '记忆：贸易乘数=1/(边际储蓄倾向+边际进口倾向)',
            examYears: ['11', '18'],
            difficulty: 4
        },
        {
            id: 'int-s03',
            module: 'international',
            type: 'short',
            title: '简述购买力平价理论的基本内容',
            content: [
                '① 基本思想：汇率由两国物价水平决定，两国货币的汇率取决于两国货币的购买力之比',
                '② 一价定律：在没有运输成本和贸易壁垒的条件下，同一种商品在不同国家用同一货币表示的价格应该相同',
                '③ 绝对购买力平价：汇率等于两国物价水平之比，即E=Pa/Pb',
                '④ 相对购买力平价：汇率的变动率等于两国通货膨胀率之差',
                '⑤ 理论基础：货币数量论，认为货币的价值在于其购买力',
                '⑥ 局限性：忽略资本流动、贸易壁垒、非贸易品等因素对汇率的影响'
            ],
            tip: '记忆：物价水平→购买力→汇率，一价定律是基础',
            examYears: ['13', '21'],
            difficulty: 3
        },
        {
            id: 'int-s04',
            module: 'international',
            type: 'short',
            title: '简述利率平价理论的基本内容',
            content: [
                '① 基本思想：汇率由两国利率差异决定，利率差异影响资本流动，进而影响汇率',
                '② 抛补利率平价：远期汇率与即期汇率的差异等于两国利率之差',
                '③ 非抛补利率平价：预期汇率变动率等于两国利率之差',
                '④ 公式表达：远期升贴水≈利率差，高利率货币远期贴水，低利率货币远期升水',
                '⑤ 理论意义：揭示了利率与汇率之间的密切联系，为远期汇率的决定提供了理论基础',
                '⑥ 前提条件：资本自由流动、无交易成本、套利资金充足'
            ],
            tip: '记忆：高利率货币远期贴水，低利率货币远期升水',
            examYears: ['15'],
            difficulty: 4
        },
        {
            id: 'int-s05',
            module: 'international',
            type: 'short',
            title: '简述国际费雪效应',
            content: [
                '① 基本思想：利率差异等于预期通货膨胀率差异，汇率变动反映两国通货膨胀率差异',
                '② 费雪方程式：名义利率=实际利率+预期通货膨胀率',
                '③ 国际费雪效应：两国名义利率之差等于两国预期通货膨胀率之差',
                '④ 汇率预期：高利率国家的货币未来会贬值，低利率国家的货币未来会升值',
                '⑤ 与购买力平价的关系：国际费雪效应将利率、通货膨胀率和汇率联系起来',
                '⑥ 实际应用：可用于预测汇率变动趋势，指导国际投资决策'
            ],
            tip: '记忆：名义利率差=通胀率差，高利率货币未来贬值',
            examYears: ['08', '13', '16', '22'],
            difficulty: 4
        },
        {
            id: 'int-s06',
            module: 'international',
            type: 'short',
            title: '简述J曲线效应的基本内容',
            content: [
                '① 含义：当一国货币贬值后，最初会使贸易收支状况进一步恶化而不是改善，只有经过一段时间以后，贸易收支状况才会得到改善',
                '② 图形特征：贸易收支变动轨迹呈"J"字形，先下降后上升',
                '③ 三个阶段：货币合同阶段（价格不变）、传导阶段（价格开始变化）、数量调整阶段（数量变化大于价格变化）',
                '④ 产生原因：短期内进出口需求弹性小于1，本币贬值恶化贸易收支；中长期大于1，本币贬值改善国际收支',
                '⑤ 时滞效应：贬值对国际收支状况的影响存在时间滞后',
                '⑥ 政策含义：贬值国要有一定的外汇储备预防J曲线效应的影响'
            ],
            tip: '记忆：贬值→先恶化(J字左边)→后改善(J字右边)',
            examYears: ['23'],
            difficulty: 3
        },
        {
            id: 'int-s07',
            module: 'international',
            type: 'short',
            title: '简述倾销的界定及倾销对出口国和进口国的影响',
            content: [
                '① 倾销界定：以低于正常价值的价格向进口国销售产品，并因此给进口国产业造成损害的行为',
                '② 对出口国的影响：①挤占出口国其他企业的海外市场份额；②损害出口国消费者的利益；③扰乱出口国市场秩序',
                '③ 对进口国的影响：①阻碍进口国相应产业的发展；②扭曲进口国市场秩序；③威胁和抑制进口国产业结构调整和新兴产业的建立',
                '④ 对第三国的影响：在进口国市场上存在第三国出口产品竞争的情况下，倾销产品也会对第三国产生损害',
                '⑤ 倾销的构成要件：低价销售、造成损害、因果关系',
                '⑥ 法律依据：《1994年关税及贸易总协定》第六条'
            ],
            tip: '记忆：出口国(挤占、损害、扰乱)；进口国(阻碍、扭曲、威胁)',
            examYears: ['09', '14', '19'],
            difficulty: 3
        },
        {
            id: 'int-s08',
            module: 'international',
            type: 'short',
            title: '简述最佳货币区理论的要点',
            content: [
                '① 最佳货币区是指采用单一货币或固定汇率制度对经济发展最有利的区域',
                '② 蒙代尔标准（生产要素流动性标准）：生产要素流动性高的地区适合建立货币区',
                '③ 麦金农标准（经济开放度标准）：经济开放度高、贸易联系紧密的地区适合建立货币区',
                '④ 凯南标准（产品多样化标准）：产品多样化的国家更能承受外部冲击，适合加入货币区',
                '⑤ 伊格拉姆标准（金融一体化标准）：金融市场一体化的地区适合建立货币区',
                '⑥ 政策含义：货币区成员需要放弃独立的货币政策，因此需要满足一定条件'
            ],
            tip: '记忆：蒙代尔(要素流动)+麦金农(开放度)+凯南(多样化)',
            examYears: ['10', '15', '21'],
            difficulty: 4
        },
        {
            id: 'int-s09',
            module: 'international',
            type: 'short',
            title: '简述国际生产折中理论的基本内容',
            content: [
                '① 理论提出者：英国经济学家邓宁提出的解释跨国公司对外直接投资的理论',
                '② 所有权特定优势：企业具有的组织管理能力、金融融资优势、技术特点、规模与垄断地位等',
                '③ 内部化优势：将企业所有权特定优势内部化的能力，克服外部市场不完全带来的交易成本',
                '④ 区位特定优势：东道国的劳动力成本、市场条件、关税与非关税壁垒、政府政策等投资环境优势',
                '⑤ 三种优势结合：三种优势的不同组合决定企业选择出口、直接投资还是技术转移',
                '⑥ 企业对外直接投资需要同时具备所有权优势、内部化优势和区位优势'
            ],
            tip: '记忆口诀："所有内区"=所有权+内部化+区位优势',
            examYears: ['03', '14'],
            difficulty: 3
        },
        {
            id: 'int-s10',
            module: 'international',
            type: 'short',
            title: '简述汇率变动对国际收支的影响',
            content: [
                '① 本币贬值对进出口的影响机制：可以调整出口货物的外币价格和进口货物的本币价格，达到促进出口、限制进口的目的',
                '② 当对外贸易出现逆差时，通过本币对外贬值，使出口产品的外币价格下降，进口的本币价格上升',
                '③ 实现条件：对方不报复；本币对外贬值要快于对内贬值（通货膨胀）',
                '④ 马歇尔-勒纳条件：本国出口的价格需求弹性与本国进口的价格需求弹性之和的绝对值大于1',
                '⑤ J曲线效应：本币贬值到对外贸易逆差的调整需要一定的时间滞后',
                '⑥ 本币贬值可能造成该国贸易条件的恶化，只有在需求弹性大于供给弹性时才会改善'
            ],
            tip: '记忆：贬值→出口↑进口↓，但需满足马歇尔-勒纳条件',
            examYears: ['05', '12'],
            difficulty: 3
        },
        {
            id: 'int-s11',
            module: 'international',
            type: 'short',
            title: '简述汇率变动对宏观经济的影响',
            content: [
                '① 对贸易收支的影响：本币贬值促进出口、抑制进口，改善贸易收支（需满足相关条件）',
                '② 对物价水平的影响：本币贬值导致进口商品价格上涨，可能引发通货膨胀',
                '③ 对就业和收入的影响：本币贬值刺激出口部门扩张，增加就业和收入',
                '④ 对产业结构的影响：本币贬值有利于出口产业和进口替代产业的发展',
                '⑤ 对资本流动的影响：本币贬值可能引发资本外流，影响金融稳定',
                '⑥ 对国际储备的影响：汇率变动影响国际收支，进而影响外汇储备规模'
            ],
            tip: '记忆：贸易、物价、就业、产业、资本、储备六方面影响',
            examYears: ['17'],
            difficulty: 3
        },
        {
            id: 'int-s12',
            module: 'international',
            type: 'short',
            title: '简述蒙代尔-克鲁格曼三元悖论（不可能三角）的主要内容',
            content: [
                '① 三元悖论指出：在开放经济条件下，货币政策独立性、汇率稳定性和资本自由流动三者不可兼得',
                '② 三角的每一边都表示一种政策选择：独立的货币政策、汇率的稳定性（固定汇率）以及完全的金融一体化',
                '③ 组合结果：三角的任何两边可以进行组合，分别由三角形的三个顶点表示',
                '④ 三种选择：①货币政策独立+资本自由流动→浮动汇率；②货币政策独立+固定汇率→资本管制；③固定汇率+资本自由流动→放弃货币政策独立',
                '⑤ 政策含义：一国必须根据自身经济条件和发展目标进行权衡选择',
                '⑥ 现实应用：各国汇率制度的选择都受到三元悖论的约束'
            ],
            tip: '记忆：三角只能取其二，货币政策、固定汇率、资本流动三选二',
            examYears: ['16'],
            difficulty: 4
        },
        {
            id: 'int-s13',
            module: 'international',
            type: 'short',
            title: '简述经济全球化的概念和动因',
            content: [
                '① 概念：经济全球化是世界各国在经济上跨国界联系和相互依存日益加强的过程',
                '② IMF定义：跨国商品、服务贸易及国际资本流动规模和形式的增加，以及技术广泛迅速传播使世界各国经济的相互依赖性增强',
                '③ 动因一：各国经济发展的客观要求是经济全球化的根本推动力',
                '④ 动因二：科学技术进步为经济全球化提供了最深厚的物质基础（运输、通信和信息技术进步）',
                '⑤ 动因三：市场化改革为经济全球化提供了制度基础',
                '⑥ 本质特征：生产要素在全球范围内自由流动和优化配置'
            ],
            tip: '记忆：动因=经济需求(根本)+科技进步(物质)+市场化改革(制度)',
            examYears: ['20'],
            difficulty: 2
        },
        {
            id: 'int-s14',
            module: 'international',
            type: 'short',
            title: '简述经济全球化的主要特点和具体表现',
            content: [
                '① 特点：世界经济的"你中有我，我中有你"，各国经济联系加强和相互依赖程度日益提高',
                '② 表现一（国际贸易发展迅猛）：国际贸易高速增长，规模日益膨胀，作用越来越重要',
                '③ 表现二（生产全球化和跨国公司大发展）：大规模跨国直接投资导致全球性生产分工体系的形成',
                '④ 表现三（金融全球化迅速推进）：跨国贷款、证券发行和并购等跨国金融业务大幅度增长',
                '⑤ 表现四（科技全球化与全球科技资源大流动）：各国科技资源在全球范围内的优化配置',
                '⑥ 表现五（国际经济协调机制不断强化）：WTO等国际经济组织的作用日益增强'
            ],
            tip: '记忆：贸易+生产+金融+科技+协调五大表现',
            examYears: ['17'],
            difficulty: 3
        },
        {
            id: 'int-s15',
            module: 'international',
            type: 'short',
            title: '简述最惠国待遇与国民待遇的区别',
            content: [
                '① 最惠国待遇：一国给予另一国的待遇不低于给予任何第三国的待遇，即"外外平等"',
                '② 国民待遇：一国给予外国公民、企业和商品的待遇不低于给予本国公民、企业和商品的待遇，即"内外平等"',
                '③ 适用范围不同：最惠国待遇主要适用于关税和贸易领域；国民待遇适用于更广泛的领域',
                '④ 实施目的不同：最惠国待遇防止贸易歧视；国民待遇防止国内保护',
                '⑤ 在法律上的区别：最惠国待遇是国际贸易条约的基础条款；国民待遇是对最惠国待遇的补充',
                '⑥ 两者关系：最惠国待遇和国民待遇共同构成世界贸易组织的非歧视原则'
            ],
            tip: '记忆：最惠国=外外平等(不低于第三国)，国民待遇=内外平等(不低于本国)',
            examYears: [],
            difficulty: 3
        },

        // ===== 货币银行学 =====
        {
            id: 'bnk-001',
            module: 'banking',
            type: 'term',
            title: '基础货币',
            content: '又称高能货币，是指流通中的现金加上商业银行的存款准备金。基础货币 = 流通中现金 + 法定准备金 + 超额准备金。基础货币是货币创造的基础。',
            tip: '记忆：基础 = 现金 + 准备金 → 货币创造的"种子"',
            examYears: ['15', '19', '23'],
            difficulty: 3
        },
        {
            id: 'bnk-002',
            module: 'banking',
            type: 'term',
            title: 'IS曲线',
            content: '描述产品市场均衡时，利率与国民收入之间关系的曲线。IS曲线表示投资等于储蓄时的各种利率与收入组合。曲线向右下方倾斜。',
            tip: '记忆：I(投资)=S(储蓄) → 产品市场均衡 → 利率↓收入↑',
            examYears: ['16', '20'],
            difficulty: 3
        },
        {
            id: 'bnk-003',
            module: 'banking',
            type: 'term',
            title: 'LM曲线',
            content: '描述货币市场均衡时，利率与国民收入之间关系的曲线。LM曲线表示货币需求等于货币供给时的各种利率与收入组合。曲线向右上方倾斜。',
            tip: '记忆：L(货币需求)=M(货币供给) → 货币市场均衡 → 收入↑利率↑',
            examYears: ['17', '21'],
            difficulty: 3
        },
        {
            id: 'bnk-004',
            module: 'banking',
            type: 'term',
            title: '流动偏好陷阱',
            content: '又称凯恩斯陷阱，是指当利率降到极低水平时，人们预期利率不会再下降，债券价格不会再上升，因此宁愿持有现金而不愿购买债券，导致货币需求无限增加的现象。此时货币政策失效。',
            tip: '记忆：利率极低 → 人人持币待购 → 货币政策无效',
            examYears: ['18', '22'],
            difficulty: 4
        },
        {
            id: 'bnk-005',
            module: 'banking',
            type: 'term',
            title: '货币政策',
            content: '是指中央银行为实现特定经济目标而采取的控制和调节货币供给量、信用量的方针、政策和措施的总称。主要目标：经济增长、充分就业、物价稳定、国际收支平衡。',
            tip: '记忆：央行控制"钱袋子"→影响经济',
            examYears: ['14', '19', '24'],
            difficulty: 2
        },
        {
            id: 'bnk-006',
            module: 'banking',
            type: 'short',
            title: '货币政策工具',
            content: [
                '① 法定存款准备金率：调整商业银行必须持有的准备金比例',
                '② 再贴现率：调整商业银行向央行借款的利率',
                '③ 公开市场业务：央行买卖政府债券调节货币供给',
                '④ 选择性工具：消费者信用控制、证券市场信用控制等'
            ],
            tip: '记忆口诀："三率一公开" = 准备金率、再贴现率、公开市场',
            examYears: ['15', '20', '23'],
            difficulty: 3
        },
        {
            id: 'bnk-007',
            module: 'banking',
            type: 'short',
            title: '商业银行职能',
            content: [
                '① 信用中介职能：吸收存款，发放贷款',
                '② 支付中介职能：为客户办理货币结算和收付',
                '③ 信用创造职能：通过存款派生创造信用流通工具',
                '④ 金融服务职能：提供信托、租赁、咨询等服务'
            ],
            tip: '记忆口诀："两中介一创造一服务"',
            examYears: ['16', '21'],
            difficulty: 3
        },
        {
            id: 'bnk-008',
            module: 'banking',
            type: 'short',
            title: '金融工具的特征',
            content: [
                '① 流动性：变现为现金的能力',
                '② 风险性：遭受损失的可能性',
                '③ 收益率：带来收益的能力'
            ],
            tip: '记忆：流动 + 风险 + 收益',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'bnk-009',
            module: 'banking',
            type: 'short',
            title: '货币市场工具',
            content: [
                '① 短期国债：政府发行的短期债券',
                '② 商业票据：企业发行的短期融资工具',
                '③ 回购协议：以证券为抵押的短期借贷',
                '④ 银行承兑汇票：银行承诺兑付的汇票'
            ],
            tip: '记忆：短期（1年内）金融工具',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-010',
            module: 'banking',
            type: 'short',
            title: '资本市场工具',
            content: [
                '① 股票：所有权凭证',
                '② 债券：债权债务凭证',
                '③ 抵押贷款：以不动产为抵押的长期贷款'
            ],
            tip: '记忆：长期（1年以上）金融工具',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'bnk-011',
            module: 'banking',
            type: 'short',
            title: '衍生金融工具',
            content: [
                '① 远期：约定未来交易的合约',
                '② 期货：标准化的远期合约',
                '③ 期权：买卖权利的选择权',
                '④ 互换：交换现金流的合约'
            ],
            tip: '记忆口诀："远期货换" = 远期、期货、期权、互换',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-012',
            module: 'banking',
            type: 'short',
            title: '资产证券化的作用',
            content: [
                '① 风险转移创新：转移信用风险',
                '② 提高流动性创新：盘活存量资产',
                '③ 信用创造创新：创造新的融资工具'
            ],
            tip: '记忆：风险转移 + 流动性 + 信用创造',
            examYears: [],
            difficulty: 4
        },
        {
            id: 'bnk-013',
            module: 'banking',
            type: 'short',
            title: '金融创新',
            content: [
                '① 规避风险的创新：如利率期货、期权',
                '② 技术进步推动的创新：如电子支付、网上银行',
                '③ 规避行政管理的创新：如欧洲美元、NOW账户'
            ],
            tip: '记忆：避险 + 技术 + 规避管制',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-014',
            module: 'banking',
            type: 'short',
            title: '金融风险的分类',
            content: [
                '① 信用风险：交易对手违约的风险',
                '② 利率风险：利率变动带来的风险',
                '③ 汇率风险：汇率变动带来的风险',
                '④ 国家风险：国家层面的事件带来的风险'
            ],
            tip: '记忆：信用 + 利率 + 汇率 + 国家',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'bnk-015',
            module: 'banking',
            type: 'short',
            title: '牙买加体系的运行',
            content: [
                '① 储备多元化：美元、欧元、日元等多种储备货币',
                '② 汇率安排多元化：固定汇率、浮动汇率等多种安排',
                '③ 多种渠道调节国际收支：汇率、利率、国际援助等'
            ],
            tip: '记忆：储备多元 + 汇率多元 + 调节渠道多元',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-016',
            module: 'banking',
            type: 'short',
            title: '巴塞尔协议三大支柱',
            content: [
                '① 最低资本要求：规定银行最低资本充足率',
                '② 监管审查：监管部门对银行的监督检查',
                '③ 市场纪律：信息披露和市场约束'
            ],
            tip: '记忆：资本要求 + 监管审查 + 市场纪律',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-017',
            module: 'banking',
            type: 'choice',
            title: '基础货币与货币供应量',
            content: '基础货币 = 现金 + 商业银行在中央银行的存款准备；货币供应量 = 现金 + 存款货币。基础货币又称高能货币，是货币创造的基础；货币供应量则反映经济中实际流通的货币总量。',
            tip: '记忆：基础货币=现金+准备金；货币供应=现金+存款',
            examYears: ['14'],
            difficulty: 3
        },
        {
            id: 'bnk-018',
            module: 'banking',
            type: 'choice',
            title: '名义利率与实际利率的关系',
            content: '名义利率 = 实际利率 + 通货膨胀率（或物价变动率）。名义利率是银行挂牌的利率，实际利率是扣除通货膨胀后的真实利率，反映资金的实际购买力变化。',
            tip: '记忆：名义=实际+通胀 → 名义利率看着高，实际可能为负',
            examYears: ['17'],
            difficulty: 2
        },
        {
            id: 'bnk-019',
            module: 'banking',
            type: 'choice',
            title: '货币政策的目标',
            content: '货币政策的目标包括：①经济增长：促进国民经济稳定增长；②充分就业：降低失业率，实现劳动力充分就业；③物价稳定：控制通货膨胀，保持币值稳定；④国际收支平衡：维持合理的国际收支状况。',
            tip: '记忆口诀："长就物价衡"=增长、就业、物价、收支平衡',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'bnk-020',
            module: 'banking',
            type: 'choice',
            title: '中央银行的职能',
            content: '中央银行的职能包括：①发行的银行：垄断货币发行权，统一发行货币；②银行的银行：为商业银行提供存贷款、清算等服务；③国家的银行：代理国库、制定货币政策、管理外汇储备等。',
            tip: '记忆口诀："发银国"=发行、银行、国家',
            examYears: ['13', '24'],
            difficulty: 2
        },
        {
            id: 'bnk-021',
            module: 'banking',
            type: 'choice',
            title: '商业银行的表外业务',
            content: '商业银行的表外业务是指未列入银行资产负债表内且不影响资产负债总额的业务。广义的表外业务既包括传统的中间业务，又包括金融创新中产生的一些有风险的业务；狭义的表外业务专指后一类有风险的业务。',
            tip: '记忆：表外=不在资产负债表内，不影响资产负债总额',
            examYears: ['11', '19'],
            difficulty: 3
        },
        {
            id: 'bnk-022',
            module: 'banking',
            type: 'choice',
            title: '金本位体系的特点',
            content: '金本位体系的特点包括：①黄金充当国际货币：各国货币与黄金挂钩；②严格的固定汇率制：各国货币汇率由含金量决定，波动幅度极小；③国际收支的自动调节机制：通过黄金流动自动调节国际收支失衡。',
            tip: '记忆：黄金货币+固定汇率+自动调节',
            examYears: ['08'],
            difficulty: 3
        },
        {
            id: 'bnk-023',
            module: 'banking',
            type: 'choice',
            title: '布雷顿森林体系的主要内容',
            content: '布雷顿森林体系的主要内容包括：①美元充当国际货币：美元与黄金挂钩，各国货币与美元挂钩；②建立以美元为中心的汇率平价体系；③建立国际货币基金组织（IMF）；④多渠道调节国际收支不平衡。',
            tip: '记忆：美元中心+汇率体系+IMF+调节收支',
            examYears: ['13', '18'],
            difficulty: 3
        },
        {
            id: 'bnk-024',
            module: 'banking',
            type: 'choice',
            title: '牙买加体系的主要内容',
            content: '牙买加体系的主要内容包括：①浮动汇率合法化：承认浮动汇率制度的合法性；②黄金非货币化：取消黄金作为国际货币的功能；③增强SDRs（特别提款权）的作用，提高IMF的清偿力；④扩大融资：增加对发展中国家的资金援助。',
            tip: '记忆：浮动合法+黄金非货币+SDR增强+扩大融资',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-025',
            module: 'banking',
            type: 'choice',
            title: '牙买加体系的运行特点',
            content: '牙买加体系的运行特点包括：①储备多元化：美元、欧元、日元等多种储备货币并存；②汇率安排多元化：固定汇率、浮动汇率等多种汇率制度并存；③多种渠道调节国际收支：汇率、利率、国际援助等多种手段。',
            tip: '记忆：储备多元+汇率多元+调节多元',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-026',
            module: 'banking',
            type: 'choice',
            title: '资本国际流动的动因',
            content: '资本国际流动的动因包括：①不同国家间收益率的差异：追求更高投资回报；②汇率变动：利用汇率波动获取收益；③各种风险因素：如汇率风险和市场风险，资本流动以规避风险或寻求安全资产。',
            tip: '记忆：收益率差异+汇率变动+风险因素',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-s01',
            module: 'banking',
            type: 'short',
            title: '简述中央银行的职能（07、18）',
            content: [
                '① 发行的银行：垄断银行券的发行权，成为全国唯一的现钞发行机构',
                '② 银行的银行：集中存款准备；最终贷款人；组织全国的清算',
                '③ 国家的银行：代理国库；代理国家债券的发行；对国家财政给予信贷支持；保管外汇和黄金储备；制定和实施货币政策；制定并监督执行有关金融管理法规'
            ],
            tip: '记忆口诀："发银国" = 发行、银行、国家',
            examYears: ['07', '18'],
            difficulty: 2
        },
        {
            id: 'bnk-s02',
            module: 'banking',
            type: 'short',
            title: '简述商业银行的职能',
            content: [
                '① 充当企业之间的信用中介：通过吸收存款、发放贷款，成为货币资本的贷出者与借入者之间的中介人',
                '② 充当企业之间的支付中介：为企业开立账户，充当企业之间货币结算与货币收付的中间人',
                '③ 变社会各阶层的积蓄和收入为资本：将储蓄和消费收入汇集起来，提供给企业家作为资本运用',
                '④ 创造信用流通工具：商业银行成为银行券和存款货币的创造者'
            ],
            tip: '记忆：信用中介、支付中介、积蓄转资本、创造信用工具',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-s03',
            module: 'banking',
            type: 'short',
            title: '简述商业银行的主要业务',
            content: [
                '① 资产业务：将聚集的货币资金加以运用以取得收益的业务，包括贴现、贷款和证券投资等',
                '② 负债业务：形成资金来源的业务，包括自有资本和吸收的外来资金两部分',
                '③ 中间业务：为客户提供各种金融服务，如结算、代理、咨询等'
            ],
            tip: '记忆：资产（运用资金）+ 负债（资金来源）+ 中间业务',
            examYears: ['14'],
            difficulty: 3
        },
        {
            id: 'bnk-s04',
            module: 'banking',
            type: 'short',
            title: '简述商业银行经营的基本原则',
            content: [
                '① 盈利性原则：商业银行作为企业，追求利润最大化',
                '② 流动性原则：银行能够随时满足客户提取存款和正常贷款需求',
                '③ 安全性原则：避免经营风险，保证资金安全',
                '④ 三原则的协调：流动性与安全性呈正相关，二者与盈利性呈负相关，需要平衡'
            ],
            tip: '记忆口诀："安流盈" = 安全、流动、盈利',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-s05',
            module: 'banking',
            type: 'short',
            title: '简述中央银行的货币政策目标及其关系',
            content: [
                '① 经济增长：促进国民经济稳定增长',
                '② 充分就业：降低失业率，实现劳动力充分就业',
                '③ 物价稳定：控制通货膨胀，保持币值稳定',
                '④ 国际收支平衡：维持合理的国际收支状况',
                '⑤ 目标间关系：各目标之间存在矛盾和冲突，如经济增长与物价稳定、充分就业与国际收支平衡等，需要根据经济形势权衡取舍'
            ],
            tip: '记忆口诀："长就物价衡" = 增长、就业、物价、收支平衡',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-s06',
            module: 'banking',
            type: 'short',
            title: '简述一般性货币政策工具（10、16、22）',
            content: [
                '① 法定存款准备金政策：规定存款准备金比率，调整商业银行必须持有的准备金比例',
                '② 再贴现政策：调整商业银行向央行借款的利率，影响商业银行融资成本',
                '③ 公开市场业务：中央银行在金融市场上公开买卖有价证券，以控制货币供应量',
                '④ 特点：公开市场业务具有主动性强、灵活性高、调控效果平缓、影响范围广等优点'
            ],
            tip: '记忆口诀："三率一公开" = 准备金率、再贴现率、公开市场',
            examYears: ['10', '16', '22'],
            difficulty: 3
        },
        {
            id: 'bnk-s07',
            module: 'banking',
            type: 'short',
            title: '简述货币政策传导机制',
            content: [
                '① 利率传导机制：货币政策 → 利率 → 投资 → 总需求 → 产出和就业',
                '② 信贷传导机制：货币政策 → 银行信贷可得性 → 投资 → 产出',
                '③ 资产价格传导机制：货币政策 → 资产价格 → 财富效应 → 消费 → 产出',
                '④ 汇率传导机制：货币政策 → 利率 → 汇率 → 净出口 → 产出'
            ],
            tip: '记忆：利率、信贷、资产价格、汇率四大渠道',
            examYears: [],
            difficulty: 4
        },
        {
            id: 'bnk-s08',
            module: 'banking',
            type: 'short',
            title: '简述凯恩斯的货币需求理论（14）',
            content: [
                '① 交易动机：为日常交易而持有货币，货币需求是收入的递增函数，记为 M₁=L₁(Y)',
                '② 预防动机：为应付意外支出而持有货币，也是收入的递增函数',
                '③ 投机动机：为抓住有利的投资机会而持有货币，是利率的递减函数，记为 M₂=L₂(r)',
                '④ 货币总需求：Md = L₁(Y) + L₂(r)，由收入和利率共同决定'
            ],
            tip: '记忆：交易+预防+投机 = 收入增函数+利率减函数',
            examYears: ['14'],
            difficulty: 3
        },
        {
            id: 'bnk-s09',
            module: 'banking',
            type: 'short',
            title: '简述弗里德曼的货币需求理论（20）',
            content: [
                '① 货币需求是稳定的函数，影响因素包括总财富、人力财富与非人力财富比例、货币与其他资产的预期收益率等',
                '② 强调恒久收入（长期平均收入）对货币需求的主导作用',
                '③ 认为货币需求对利率变动不敏感，利率影响很小',
                '④ 认为货币流通速度相对稳定，货币供给变动主要影响名义收入',
                '⑤ 政策含义：货币政策应遵循单一规则，保持货币供给稳定增长'
            ],
            tip: '记忆：恒久收入是主导，货币需求稳定，反对相机抉择',
            examYears: ['20'],
            difficulty: 4
        },
        {
            id: 'bnk-s10',
            module: 'banking',
            type: 'short',
            title: '简述货币政策与财政政策的配合模式',
            content: [
                '① 双松政策：扩张性货币政策+扩张性财政政策，适用于经济严重萧条时期',
                '② 双紧政策：紧缩性货币政策+紧缩性财政政策，适用于经济严重过热时期',
                '③ 松货币紧财政：适用于经济萧条但财政赤字较大的情况',
                '④ 紧货币松财政：适用于经济过热但需保持一定增长速度的情况',
                '⑤ 配合原则：根据经济形势选择合适组合，实现宏观调控目标'
            ],
            tip: '记忆：双松、双紧、一松一紧四种组合',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-s11',
            module: 'banking',
            type: 'short',
            title: '简述金融监管的必要性',
            content: [
                '① 社会利益论：市场缺陷的存在需要政府介入，通过管制纠正或消除市场缺陷，提高社会资源配置效率',
                '② 金融风险论：银行业资本占比小、风险集聚，金融危机具有连锁效应，必须实施监管以确保金融体系安全稳定',
                '③ 投资者保护论：保护存款人和投资者利益，防止信息不对称导致的欺诈行为',
                '④ 管制供求论：金融监管是供给与需求相互作用的结果'
            ],
            tip: '记忆：社会利益+金融风险+投资者保护+管制供求',
            examYears: ['19'],
            difficulty: 3
        },
        {
            id: 'bnk-s12',
            module: 'banking',
            type: 'short',
            title: '简述巴塞尔协议的主要内容',
            content: [
                '① 最低资本要求：规定银行资本充足率不低于8%，核心资本充足率不低于4%',
                '② 监管审查：监管部门对银行的监督检查，确保银行建立有效的风险管理体系',
                '③ 市场纪律：要求银行进行信息披露，接受市场约束',
                '④ 风险权重资产：根据资产风险程度赋予不同权重，计算风险加权资产',
                '⑤ 目标：维护银行业稳健运行，防范金融风险'
            ],
            tip: '记忆：三大支柱 = 最低资本要求 + 监管审查 + 市场纪律',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-s13',
            module: 'banking',
            type: 'short',
            title: '简述利率的决定因素',
            content: [
                '① 平均利润率：利率上限取决于平均利润率',
                '② 借贷资金供求：供大于求利率下降，供不应求利率上升',
                '③ 物价水平：通货膨胀影响名义利率',
                '④ 国家经济政策：货币政策和财政政策影响利率',
                '⑤ 国际利率水平：资本流动使国内利率受国际利率影响',
                '⑥ 风险因素：风险越大，利率越高'
            ],
            tip: '记忆：利润率、供求、物价、政策、国际利率、风险',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-s14',
            module: 'banking',
            type: 'short',
            title: '简述利率的作用',
            content: [
                '① 调节储蓄和投资：利率影响居民储蓄意愿和企业投资决策',
                '② 调节资金供求：利率变动引导资金流向，优化资源配置',
                '③ 调节宏观经济：利率是货币政策的重要传导渠道',
                '④ 调节国际收支：利率影响汇率和资本流动',
                '⑤ 调节收入分配：利率变动影响债权人和债务人的利益分配'
            ],
            tip: '记忆：储蓄投资、资金供求、宏观经济、国际收支、收入分配',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'bnk-s15',
            module: 'banking',
            type: 'short',
            title: '简述金融市场的功能',
            content: [
                '① 帮助实现资金在盈余部门和短缺部门之间的调剂，实现资源优化配置',
                '② 实现风险分散和风险转移，通过金融资产交易分散和转移风险',
                '③ 确定价格，通过市场交易中买卖双方相互作用发现金融资产价格',
                '④ 提供流动性，使金融资产能够迅速变现',
                '⑤ 降低交易成本，提高金融市场效率'
            ],
            tip: '记忆：资金调剂、风险分散、定价、流动性、降低成本',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'bnk-s16',
            module: 'banking',
            type: 'short',
            title: '简述影响货币乘数的因素',
            content: [
                '① 法定存款准备金率：由中央银行决定，与货币乘数成反比',
                '② 超额准备金率：商业银行持有的超额准备金与存款总额之比，与货币乘数成反比',
                '③ 现金漏损率（通货比率）：公众持有的现金与存款之比，与货币乘数成反比',
                '④ 定期存款比率：定期存款与活期存款之比，影响货币乘数大小',
                '⑤ 货币乘数公式：m = (1+c) / (r+e+c+t·rt)，其中c为现金比率，r为法定准备金率，e为超额准备金率，t为定期存款比率，rt为定期存款准备金率'
            ],
            tip: '记忆：法定准备金、超额准备金、现金漏损、定期存款比率',
            examYears: [],
            difficulty: 4
        },

        // ===== 西方经济学 =====
        {
            id: 'wst-001',
            module: 'western',
            type: 'term',
            title: '需求',
            content: '是指在一定时期内，在各种可能的价格水平下，消费者愿意并且能够购买的商品数量。需求需要同时具备购买欲望和购买能力两个条件。',
            tip: '记忆：需求 = 想买 + 能买',
            examYears: ['14', '18'],
            difficulty: 1
        },
        {
            id: 'wst-002',
            module: 'western',
            type: 'term',
            title: '供给',
            content: '是指在一定时期内，在各种可能的价格水平下，生产者愿意并且能够提供的商品数量。影响供给的因素包括价格、成本、技术等。',
            tip: '记忆：供给 = 想卖 + 能卖',
            examYears: ['15', '19'],
            difficulty: 1
        },
        {
            id: 'wst-003',
            module: 'western',
            type: 'term',
            title: '均衡价格',
            content: '是指市场需求量等于市场供给量时的价格。在均衡价格水平上，消费者愿意购买的数量等于生产者愿意供给的数量，市场出清。',
            tip: '记忆：供需相等 → 均衡 → 市场出清',
            examYears: ['16', '20'],
            difficulty: 2
        },
        {
            id: 'wst-004',
            module: 'western',
            type: 'term',
            title: '边际效用',
            content: '是指消费者在一定时期内增加一单位商品的消费所得到的效用量的增量。边际效用递减规律：在一定时间内，其他商品消费量不变的情况下，随着某种商品消费量的增加，消费者从该商品连续增加的每一消费单位中得到的效用增量是递减的。',
            tip: '记忆：吃第一个包子很香，吃到第十个就腻了',
            examYears: ['17', '21', '24'],
            difficulty: 3
        },
        {
            id: 'wst-005',
            module: 'western',
            type: 'term',
            title: '消费者剩余',
            content: '是指消费者愿意支付的最高总价格与实际支付的总价格之间的差额。它衡量了消费者从购买商品中获得的净福利。',
            tip: '记忆：心理价位 - 实际支付 = "赚到的感觉"',
            examYears: ['18', '22'],
            difficulty: 2
        },
        {
            id: 'wst-006',
            module: 'western',
            type: 'term',
            title: '菲利普斯曲线',
            content: '描述了失业率与通货膨胀率之间的负相关关系。短期菲利普斯曲线向右下方倾斜，表明失业与通胀存在替代关系；长期菲利普斯曲线是垂直的，表明失业率处于自然失业率水平。',
            tip: '记忆：短期此消彼长，长期回归自然率',
            examYears: ['19', '23'],
            difficulty: 4
        },
        {
            id: 'wst-007',
            module: 'western',
            type: 'term',
            title: 'GDP',
            content: '国内生产总值(Gross Domestic Product)，是指一个国家(或地区)所有常住单位在一定时期内生产的全部最终产品和服务的市场价值总和。是衡量一国经济活动的核心指标。',
            tip: '记忆：国内+一定时期+最终产品+市场价值',
            examYears: ['14', '17', '20'],
            difficulty: 2
        },
        {
            id: 'wst-008',
            module: 'western',
            type: 'term',
            title: '有保证的增长率',
            content: '资本意愿的增长率，它由社会的储蓄率与资本家愿意的资本一产出比所决定。',
            tip: '记忆：资本家愿意的增长率 = 储蓄率 ÷ 资本产出比',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'wst-009',
            module: 'western',
            type: 'term',
            title: '新古典增长模型',
            content: '20世纪50年代由索洛等人提出的一个增长模型。这一模型假定：①全社会使用劳动和资本两种生产要素只生产一种产品；②生产要素之间可以相互代替；③生产的规模收益不变；④储蓄率不变；⑤不存在技术进步和资本折旧；⑥人口增长率不变。',
            tip: '记忆：索洛模型六假设，要素可替、规模不变',
            examYears: [],
            difficulty: 4
        },
        {
            id: 'wst-010',
            module: 'western',
            type: 'term',
            title: '消费物价指数',
            content: '衡量通货膨胀率的一种指标，它是从消费者购买商品的角度衡量的一般价格总水平的上涨幅度。',
            tip: '记忆：CPI = 消费者角度 + 物价上涨幅度',
            examYears: [],
            difficulty: 2
        },
        {
            id: 'wst-011',
            module: 'western',
            type: 'term',
            title: '需求拉动的通货膨胀',
            content: '是指总需求增加所引起的一般价格总水平的持续显著的上涨。由于总需求表现为货币数量，因而需求拉动的通货膨胀又被解释为"过多的货币追求过少的商品"。',
            tip: '记忆：总需求↑ → 物价↑ → "钱太多、货太少"',
            examYears: ['20'],
            difficulty: 3
        },
        {
            id: 'wst-012',
            module: 'western',
            type: 'term',
            title: '成本推动的通货膨胀',
            content: '是指在没有超额需求的情况下由于供给方面成本的提高所引起的一般价格水平持续和显著的上涨。',
            tip: '记忆：供给侧成本↑ → 物价↑（非需求引起）',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'wst-013',
            module: 'western',
            type: 'term',
            title: '收入指数化',
            content: '政府对付成本推动的通货膨胀时采取的一项措施。所谓收入指数化是指以条文规定的形式把工资和某种物价指数联系起来，当物价上升时，工资也随之上升。',
            tip: '记忆：工资与物价指数挂钩，物价涨工资涨',
            examYears: ['06', '18'],
            difficulty: 3
        },
        {
            id: 'wst-014',
            module: 'western',
            type: 'term',
            title: '自然率假说',
            content: '自然率是指，在没有货币因素干扰的情况下，当劳动市场在竞争条件下达到均衡时所决定的就业率。由于这一就业率与经济中的市场结构、社会制度、生活习惯等因素有关，因而被冠以"自然率"的名称。',
            tip: '记忆：无货币干扰 + 劳动市场均衡 = 自然率',
            examYears: ['12'],
            difficulty: 4
        },
        {
            id: 'wst-015',
            module: 'western',
            type: 'term',
            title: '自然失业率',
            content: '失业分为摩擦性失业、结构性失业和周期性失业。宏观经济学中把只有摩擦性失业和结构性失业的就业状态称为充分就业，将经济处于充分就业情况下的失业率称为自然失业率。',
            tip: '记忆：摩擦失业 + 结构性失业 = 自然失业率',
            examYears: ['10'],
            difficulty: 3
        },
        {
            id: 'wst-016',
            module: 'western',
            type: 'term',
            title: '菲利普斯曲线',
            content: '由新西兰经济学家菲利普斯提出，它描述了通货膨胀率与失业率之间存在的交替关系。短期菲利普斯曲线向右下方倾斜，表明失业与通胀存在替代关系；长期菲利普斯曲线是垂直的，表明失业率处于自然失业率水平。',
            tip: '记忆：菲利普斯 → 通胀与失业此消彼长',
            examYears: ['19', '23'],
            difficulty: 3
        },
        {
            id: 'wst-017',
            module: 'western',
            type: 'term',
            title: '理性预期假设',
            content: '经济当事人对价格、利率、利润或收入等经济变量未来的变动可以作出符合理性的估计。',
            tip: '记忆：经济人理性 + 准确预期未来',
            examYears: ['08'],
            difficulty: 3
        },
        {
            id: 'wst-018',
            module: 'western',
            type: 'term',
            title: '市场出清',
            content: '是说无论劳动市场上的工资还是产品市场上的商品价格都具有充分的灵活性，可以根据供求情况迅速进行调整，以达到供求相等的均衡状态。',
            tip: '记忆：价格灵活调整 → 供求相等 → 市场出清',
            examYears: [],
            difficulty: 3
        },
        {
            id: 'wst-019',
            module: 'western',
            type: 'term',
            title: '新古典宏观经济学',
            content: '是货币主义和理性预期学派经济理论的发展和引申，是对凯恩斯主义理论进行的尖锐批判。该理论的基本假设仍是个体利益最大化、理性预期、市场出清和自然率假说。',
            tip: '记忆：新古典 = 个体利益 + 理性预期 + 市场出清 + 自然率',
            examYears: ['16'],
            difficulty: 4
        }
    ]
};

// 用户自定义知识点存储
let customEconKnowledge = [];

// 从localStorage加载自定义知识点
function loadCustomEconKnowledge() {
    const saved = localStorage.getItem('studyx_econ_knowledge_custom');
    if (saved) {
        customEconKnowledge = JSON.parse(saved);
        // 合并到主数据中
        econLawData.knowledge = [...econLawData.knowledge, ...customEconKnowledge];
    }
}

// 保存自定义知识点
function saveCustomEconKnowledge() {
    localStorage.setItem('studyx_econ_knowledge_custom', JSON.stringify(customEconKnowledge));
}

// 添加自定义知识点
function addCustomEconKnowledge(knowledge) {
    knowledge.id = 'custom-' + Date.now();
    customEconKnowledge.push(knowledge);
    econLawData.knowledge.push(knowledge);
    saveCustomEconKnowledge();
    return knowledge.id;
}

// 更新知识点
function updateEconKnowledge(id, updates) {
    const index = econLawData.knowledge.findIndex(k => k.id === id);
    if (index > -1) {
        Object.assign(econLawData.knowledge[index], updates);
        
        // 如果是自定义知识点，同时更新customEconKnowledge
        const customIndex = customEconKnowledge.findIndex(k => k.id === id);
        if (customIndex > -1) {
            Object.assign(customEconKnowledge[customIndex], updates);
            saveCustomEconKnowledge();
        }
        return true;
    }
    return false;
}

// 删除自定义知识点
function deleteCustomEconKnowledge(id) {
    const customIndex = customEconKnowledge.findIndex(k => k.id === id);
    if (customIndex > -1) {
        customEconKnowledge.splice(customIndex, 1);
        saveCustomEconKnowledge();
    }
    
    const index = econLawData.knowledge.findIndex(k => k.id === id);
    if (index > -1) {
        econLawData.knowledge.splice(index, 1);
    }
}

// 导出经济学知识点数据为 TXT 格式
function exportEconKnowledgeToTxt(includeBuiltin = true) {
    // 决定要导出的数据
    const knowledgeToExport = includeBuiltin ? econLawData.knowledge : customEconKnowledge;
    
    let content = '========================================\n';
    content += '      StudyX 经济学知识点导出\n';
    content += '========================================\n';
    content += `导出时间：${new Date().toLocaleString('zh-CN')}\n`;
    content += `知识点数量：${knowledgeToExport.length} 个\n`;
    if (includeBuiltin) {
        content += `（包含 ${econLawData.knowledge.length - customEconKnowledge.length} 个内置知识点 + ${customEconKnowledge.length} 个自定义知识点）\n`;
    }
    content += '========================================\n\n';
    
    // 按模块分组
    const grouped = {};
    knowledgeToExport.forEach(item => {
        if (!grouped[item.module]) {
            grouped[item.module] = [];
        }
        grouped[item.module].push(item);
    });
    
    // 模块名称映射
    const moduleNames = {
        socialism: '社会主义市场经济',
        fiscal: '财政学',
        international: '国际经济学',
        banking: '货币银行学',
        western: '西方经济学'
    };
    
    // 生成内容
    for (const [module, items] of Object.entries(grouped)) {
        content += `\n【${moduleNames[module] || module}】\n`;
        content += '----------------------------------------\n\n';
        
        items.forEach((item, index) => {
            content += `${index + 1}. ${item.title}\n`;
            content += `   题型：${item.type === 'term' ? '名词解释' : item.type === 'choice' ? '选择题' : '简答题'}\n`;
            
            // 内容处理
            if (Array.isArray(item.content)) {
                item.content.forEach(line => {
                    content += `   ${line}\n`;
                });
            } else {
                content += `   ${item.content}\n`;
            }
            
            if (item.tip) {
                content += `   💡 记忆技巧：${item.tip}\n`;
            }
            
            if (item.examYears && item.examYears.length > 0) {
                content += `   📝 真题年份：${item.examYears.join('、')}\n`;
            }
            
            content += '\n';
        });
    }
    
    content += '========================================\n';
    content += '导出完成，感谢使用 StudyX！\n';
    content += '========================================\n';
    
    return content;
}

// 导出为 Word 格式（HTML 格式）
function exportEconKnowledgeToWord(includeBuiltin = true) {
    const moduleNames = {
        socialism: '社会主义市场经济',
        fiscal: '财政学',
        international: '国际经济学',
        banking: '货币银行学',
        western: '西方经济学'
    };
    
    // 决定要导出的数据
    const knowledgeToExport = includeBuiltin ? econLawData.knowledge : customEconKnowledge;
    const builtinCount = econLawData.knowledge.length - customEconKnowledge.length;
    
    let html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>StudyX 经济学知识点</title>
    <style>
        body { font-family: "Microsoft YaHei", SimSun, sans-serif; line-height: 1.8; padding: 40px; }
        h1 { text-align: center; color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
        .meta { text-align: center; color: #666; margin: 20px 0; }
        h2 { color: #6366f1; margin-top: 30px; border-left: 4px solid #6366f1; padding-left: 10px; }
        .item { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; }
        .title { font-size: 16px; font-weight: bold; color: #333; margin-bottom: 8px; }
        .type { display: inline-block; padding: 2px 8px; background: #6366f1; color: white; border-radius: 4px; font-size: 12px; margin-left: 10px; }
        .content { color: #555; margin: 8px 0; }
        .tip { color: #10b981; margin-top: 8px; font-style: italic; }
        .years { color: #f59e0b; margin-top: 5px; font-size: 13px; }
    </style>
</head>
<body>
    <h1>📚 StudyX 经济学知识点</h1>
    <div class="meta">
        <p>导出时间：${new Date().toLocaleString('zh-CN')}</p>
        <p>知识点数量：${knowledgeToExport.length} 个</p>
        ${includeBuiltin ? `<p>（包含 ${builtinCount} 个内置知识点 + ${customEconKnowledge.length} 个自定义知识点）</p>` : ''}
    </div>`;
    
    // 按模块分组
    const grouped = {};
    knowledgeToExport.forEach(item => {
        if (!grouped[item.module]) {
            grouped[item.module] = [];
        }
        grouped[item.module].push(item);
    });
    
    // 生成内容
    for (const [module, items] of Object.entries(grouped)) {
        html += `\n    <h2>${moduleNames[module] || module}</h2>\n`;
        
        items.forEach(item => {
            const typeName = item.type === 'term' ? '名词解释' : item.type === 'choice' ? '选择题' : '简答题';
            
            html += `    <div class="item">\n`;
            html += `        <div class="title">${item.title}<span class="type">${typeName}</span></div>\n`;
            
            // 内容处理
            if (Array.isArray(item.content)) {
                item.content.forEach(line => {
                    html += `        <div class="content">${line}</div>\n`;
                });
            } else {
                html += `        <div class="content">${item.content}</div>\n`;
            }
            
            if (item.tip) {
                html += `        <div class="tip">💡 记忆技巧：${item.tip}</div>\n`;
            }
            
            if (item.examYears && item.examYears.length > 0) {
                html += `        <div class="years">📝 真题年份：${item.examYears.join('、')}</div>\n`;
            }
            
            html += `    </div>\n`;
        });
    }
    
    html += `</body>\n</html>`;
    
    return html;
}

// 导出为 CSV 格式
function exportEconKnowledgeToCsv(includeBuiltin = true) {
    // 决定要导出的数据
    const knowledgeToExport = includeBuiltin ? econLawData.knowledge : customEconKnowledge;
    
    // CSV 头部
    let csv = '\uFEFF标题,模块,题型,内容,记忆技巧,真题年份\n';
    
    const moduleNames = {
        socialism: '社会主义市场经济',
        fiscal: '财政学',
        international: '国际经济学',
        banking: '货币银行学',
        western: '西方经济学'
    };
    
    knowledgeToExport.forEach(item => {
        const title = item.title || '';
        const module = moduleNames[item.module] || item.module || '';
        const type = item.type === 'term' ? '名词解释' : item.type === 'choice' ? '选择题' : '简答题';
        
        // 内容处理（数组转字符串，换行符替换为 |）
        let content = '';
        if (Array.isArray(item.content)) {
            content = item.content.join('|').replace(/"/g, '""');
        } else {
            content = (item.content || '').replace(/"/g, '""');
        }
        
        const tip = (item.tip || '').replace(/"/g, '""');
        const years = item.examYears ? item.examYears.join('、') : '';
        
        // CSV 行（用引号包裹包含逗号的字段）
        csv += `"${title}","${module}","${type}","${content}","${tip}","${years}"\n`;
    });
    
    return csv;
}

// 解析导入的 TXT 文件
function parseTxtImport(content) {
    const items = [];
    const lines = content.split('\n').map(l => l.trim()).filter(l => l);
    
    let currentItem = null;
    let currentContent = [];
    
    const moduleKeywords = {
        '社会主义市场经济': 'socialism',
        '财政学': 'fiscal',
        '国际经济学': 'international',
        '货币银行学': 'banking',
        '西方经济学': 'western'
    };
    
    let currentModule = 'fiscal'; // 默认模块
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // 检测模块标题
        let isModuleLine = false;
        for (const [keyword, module] of Object.entries(moduleKeywords)) {
            if (line.includes(keyword)) {
                currentModule = module;
                isModuleLine = true;
                break;
            }
        }
        if (isModuleLine) continue;
        
        // 检测知识点标题（数字开头 + 点号）
        const titleMatch = line.match(/^(\\d+)[\\.、]\\s*(.+)/);
        if (titleMatch) {
            // 保存上一个知识点
            if (currentItem) {
                currentItem.content = currentContent.length === 1 ? currentContent[0] : currentContent;
                items.push(currentItem);
            }
            
            // 创建新知识点
            currentItem = {
                module: currentModule,
                type: 'term',
                title: titleMatch[2],
                content: [],
                examYears: []
            };
            currentContent = [];
            continue;
        }
        
        // 检测题型
        if (line.includes('题型：') || line.includes('题型:')) {
            const typeStr = line.replace(/.*题型[：:]\\s*/, '').trim();
            if (typeStr.includes('选择')) currentItem.type = 'choice';
            else if (typeStr.includes('简答')) currentItem.type = 'short';
            else currentItem.type = 'term';
            continue;
        }
        
        // 检测记忆技巧
        if (line.includes('记忆技巧') || line.includes('记忆：') || line.includes('💡')) {
            currentItem.tip = line.replace(/.*记忆技巧[：:]?\\s*/, '').replace(/.*记忆[：:]?\\s*/, '').replace('💡', '').trim();
            continue;
        }
        
        // 检测真题年份
        if (line.includes('真题') || line.includes('📝')) {
            const yearsMatch = line.match(/(\\d{2})[、,，年\\s]+/g);
            if (yearsMatch) {
                currentItem.examYears = yearsMatch.map(y => y.replace(/[^\\d]/g, ''));
            }
            continue;
        }
        
        // 其他内容
        if (currentItem && line && !line.startsWith('==') && !line.startsWith('【')) {
            currentContent.push(line.replace(/^\\d+[\\.、]\\s*/, ''));
        }
    }
    
    // 保存最后一个知识点
    if (currentItem) {
        currentItem.content = currentContent.length === 1 ? currentContent[0] : currentContent;
        items.push(currentItem);
    }
    
    return items;
}

// 解析导入的 CSV 文件
function parseCsvImport(content) {
    const items = [];
    const lines = content.split('\n').filter(l => l.trim());
    
    // 跳过标题行
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        
        // 简单 CSV 解析（处理引号包裹的字段）
        const fields = [];
        let current = '';
        let inQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            
            if (char === '"') {
                if (inQuotes && line[j + 1] === '"') {
                    current += '"';
                    j++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                fields.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        fields.push(current.trim());
        
        if (fields.length >= 4) {
            const moduleMap = {
                '社会主义市场经济': 'socialism',
                '财政学': 'fiscal',
                '国际经济学': 'international',
                '货币银行学': 'banking',
                '西方经济学': 'western'
            };
            
            const typeMap = {
                '名词解释': 'term',
                '选择题': 'choice',
                '简答题': 'short'
            };
            
            const content = fields[3];
            const contentArray = content.includes('|') ? content.split('|') : content;
            
            const years = fields[5] ? fields[5].split(/[、,，]/).map(y => y.trim()).filter(y => y) : [];
            
            items.push({
                module: moduleMap[fields[1]] || 'fiscal',
                type: typeMap[fields[2]] || 'term',
                title: fields[0],
                content: contentArray,
                tip: fields[4] || undefined,
                examYears: years.length > 0 ? years : undefined,
                difficulty: 2
            });
        }
    }
    
    return items;
}

// 导入经济学知识点数据（支持多种格式）
function importEconKnowledge(items, format = 'txt') {
    if (!Array.isArray(items) || items.length === 0) {
        return { success: false, error: '无效的数据格式' };
    }
    
    // 添加导入的知识点
    let added = 0;
    let updated = 0;
    
    items.forEach(item => {
        // 检查是否已存在（根据标题和模块判断）
        const existing = econLawData.knowledge.find(k => 
            k.title === item.title && k.module === item.module
        );
        
        if (existing) {
            // 更新现有
            Object.assign(existing, item);
            const customIndex = customEconKnowledge.findIndex(k => k.id === existing.id);
            if (customIndex > -1) {
                Object.assign(customEconKnowledge[customIndex], item);
            } else {
                item.id = existing.id;
                customEconKnowledge.push(item);
            }
            updated++;
        } else {
            // 添加新知识点
            const id = addCustomEconKnowledge(item);
            added++;
        }
    });
    
    return { success: true, added, updated };
}

// 初始化
loadCustomEconKnowledge();