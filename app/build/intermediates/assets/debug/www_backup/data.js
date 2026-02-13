// ===== StudyX 知识数据库 =====
const studyData = {
    // 视频课程列表 (含简称用于搜索)
    videos: [
        // ===== 导学 =====
        { id: 'v-00-01', shortName: '导学', module: 'intro', chapter: '导学', title: '考试介绍与课程说明', duration: 30, order: 1, date: '2026-02-10', type: 'econ' },
        
        // ===== 社会主义市场经济理论 =====
        { id: 'v-01-01', shortName: '社经-1', module: 'socialism', chapter: '社会主义市场经济理论', title: '社会主义市场经济理论-1', duration: 45, order: 2, date: '2026-02-10', type: 'econ' },
        { id: 'v-01-02', shortName: '社经-2', module: 'socialism', chapter: '社会主义市场经济理论', title: '社会主义市场经济理论-2', duration: 45, order: 3, date: '2026-02-11', type: 'econ' },
        
        // ===== 西方经济学-微观 =====
        { id: 'v-02-01', shortName: '微观-1.1', module: 'western', chapter: '需求供给与均衡价格', title: '需求、供给与均衡价格-1', duration: 45, order: 4, date: '2026-02-12', type: 'econ' },
        { id: 'v-02-02', shortName: '微观-1.2', module: 'western', chapter: '需求供给与均衡价格', title: '需求、供给与均衡价格-2', duration: 45, order: 5, date: '2026-02-12', type: 'econ' },
        { id: 'v-02-03', shortName: '微观-2.1', module: 'western', chapter: '弹性理论', title: '弹性-1', duration: 45, order: 6, date: '2026-02-13', type: 'econ' },
        { id: 'v-02-04', shortName: '微观-2.2', module: 'western', chapter: '弹性理论', title: '弹性-2', duration: 45, order: 7, date: '2026-02-13', type: 'econ' },
        { id: 'v-02-05', shortName: '微观-3.1', module: 'western', chapter: '效用论', title: '效用论-1', duration: 45, order: 8, date: '2026-02-14', type: 'econ' },
        { id: 'v-02-06', shortName: '微观-3.2', module: 'western', chapter: '效用论', title: '效用论-2', duration: 45, order: 9, date: '2026-02-14', type: 'econ' },
        { id: 'v-02-07', shortName: '微观-4', module: 'western', chapter: '生产论', title: '生产论', duration: 45, order: 10, date: '2026-02-15', type: 'econ' },
        { id: 'v-02-08', shortName: '微观-5', module: 'western', chapter: '成本论', title: '成本论', duration: 45, order: 11, date: '2026-02-17', type: 'econ' },
        { id: 'v-02-09', shortName: '微观-6', module: 'western', chapter: '完全竞争市场', title: '完全竞争市场', duration: 45, order: 12, date: '2026-02-18', type: 'econ' },
        { id: 'v-02-10', shortName: '微观-7', module: 'western', chapter: '不完全竞争市场', title: '不完全竞争市场', duration: 45, order: 13, date: '2026-02-19', type: 'econ' },
        { id: 'v-02-11', shortName: '微观-8', module: 'western', chapter: '生产要素市场', title: '生产要素市场', duration: 45, order: 14, date: '2026-02-20', type: 'econ' },
        { id: 'v-02-12', shortName: '微观-9', module: 'western', chapter: '一般均衡与福利经济学', title: '一般均衡与福利经济学', duration: 45, order: 15, date: '2026-02-21', type: 'econ' },
        { id: 'v-02-13', shortName: '微观-10', module: 'western', chapter: '市场失灵', title: '市场失灵', duration: 45, order: 16, date: '2026-02-22', type: 'econ' },
        
        // ===== 西方经济学-宏观 =====
        { id: 'v-03-01', shortName: '宏观-1', module: 'western', chapter: '宏观经济活动', title: '宏观经济活动', duration: 45, order: 17, date: '2026-02-24', type: 'econ' },
        { id: 'v-03-02', shortName: '宏观-2', module: 'western', chapter: '简单国民收入决定理论', title: '简单国民收入决定理论', duration: 45, order: 18, date: '2026-02-25', type: 'econ' },
        { id: 'v-03-03', shortName: '宏观-3', module: 'western', chapter: 'IS-LM模型', title: '产品市场与货币市场均衡', duration: 45, order: 19, date: '2026-02-26', type: 'econ' },
        { id: 'v-03-04', shortName: '宏观-4', module: 'western', chapter: '宏观经济政策', title: '宏观经济政策', duration: 45, order: 20, date: '2026-02-27', type: 'econ' },
        { id: 'v-03-05', shortName: '宏观-5', module: 'western', chapter: '总需求与总供给', title: '总需求与总供给', duration: 45, order: 21, date: '2026-02-28', type: 'econ' },
        { id: 'v-03-06', shortName: '宏观-6', module: 'western', chapter: '经济增长', title: '经济增长', duration: 45, order: 22, date: '2026-03-01', type: 'econ' },
        
        // ===== 国际经济学 =====
        { id: 'v-04-01', shortName: '国经-5.1', module: 'international', chapter: '国际贸易纯理论', title: '国际贸易纯理论', duration: 45, order: 23, date: '2026-03-03', type: 'econ' },
        { id: 'v-04-02', shortName: '国经-5.2', module: 'international', chapter: '国际贸易现代理论', title: '国际贸易现代理论', duration: 45, order: 24, date: '2026-03-04', type: 'econ' },
        { id: 'v-04-03', shortName: '国经-5.3', module: 'international', chapter: '国际贸易政策分析', title: '国际贸易政策分析', duration: 45, order: 25, date: '2026-03-05', type: 'econ' },
        { id: 'v-04-04', shortName: '国经-5.4', module: 'international', chapter: '国际收支分析', title: '国际收支分析', duration: 45, order: 26, date: '2026-03-06', type: 'econ' },
        { id: 'v-04-05', shortName: '国经-5.5', module: 'international', chapter: '汇率决定理论', title: '汇率决定理论', duration: 45, order: 27, date: '2026-03-07', type: 'econ' },
        { id: 'v-04-06', shortName: '国经-5.6', module: 'international', chapter: '要素国际流动', title: '要素国际流动', duration: 45, order: 28, date: '2026-03-08', type: 'econ' },
        { id: 'v-04-07', shortName: '国经-5.7', module: 'international', chapter: '经济全球化趋势', title: '经济全球化趋势', duration: 6, order: 29, date: '2026-03-09', type: 'econ' },
        
        // ===== 财政学 =====
        { id: 'v-05-01', shortName: '财政-6.1', module: 'fiscal', chapter: '财政职能', title: '财政职能', duration: 28, order: 30, date: '2026-03-10', type: 'econ' },
        { id: 'v-05-02', shortName: '财政-6.2', module: 'fiscal', chapter: '财政支出规模与结构', title: '财政支出规模与结构', duration: 27, order: 31, date: '2026-03-11', type: 'econ' },
        { id: 'v-05-03', shortName: '财政-6.3', module: 'fiscal', chapter: '财政投资与社保', title: '财政投资支出和社会保障支出', duration: 17, order: 32, date: '2026-03-12', type: 'econ' },
        { id: 'v-05-04', shortName: '财政-6.4', module: 'fiscal', chapter: '税收原理', title: '税收原理', duration: 25, order: 33, date: '2026-03-13', type: 'econ' },
        { id: 'v-05-05', shortName: '财政-6.5', module: 'fiscal', chapter: '税收制度', title: '税收制度', duration: 25, order: 34, date: '2026-03-14', type: 'econ' },
        { id: 'v-05-06', shortName: '财政-6.6', module: 'fiscal', chapter: '国债理论', title: '国债理论', duration: 25, order: 35, date: '2026-03-15', type: 'econ' },
        { id: 'v-05-07', shortName: '财政-6.7', module: 'fiscal', chapter: '国家预算', title: '国家预算', duration: 25, order: 36, date: '2026-03-17', type: 'econ' },
        { id: 'v-05-08', shortName: '财政-6.8', module: 'fiscal', chapter: '财政平衡', title: '财政平衡', duration: 25, order: 37, date: '2026-03-18', type: 'econ' },
        
        // ===== 货币银行学 =====
        { id: 'v-06-01', shortName: '货币-7.1', module: 'monetary', chapter: '货币供求理论', title: '货币供求理论-1', duration: 30, order: 38, date: '2026-03-19', type: 'econ' },
        { id: 'v-06-02', shortName: '货币-7.2', module: 'monetary', chapter: '货币供求理论', title: '货币供求理论-2', duration: 30, order: 39, date: '2026-03-19', type: 'econ' },
        { id: 'v-06-03', shortName: '货币-7.3', module: 'monetary', chapter: '利率理论', title: '利率理论', duration: 30, order: 40, date: '2026-03-20', type: 'econ' },
        { id: 'v-06-04', shortName: '货币-7.4', module: 'monetary', chapter: '通货膨胀', title: '通货膨胀', duration: 30, order: 41, date: '2026-03-21', type: 'econ' },
        { id: 'v-06-05', shortName: '货币-7.5', module: 'monetary', chapter: '金融中介体系', title: '金融中介体系', duration: 30, order: 42, date: '2026-03-22', type: 'econ' },
        { id: 'v-06-06', shortName: '货币-7.6', module: 'monetary', chapter: '金融市场', title: '金融市场', duration: 30, order: 43, date: '2026-03-24', type: 'econ' },
        { id: 'v-06-07', shortName: '货币-7.7', module: 'monetary', chapter: '货币政策', title: '货币政策', duration: 30, order: 44, date: '2026-03-25', type: 'econ' },
        { id: 'v-06-08', shortName: '货币-7.8', module: 'monetary', chapter: '国际货币体系', title: '国际货币体系', duration: 30, order: 45, date: '2026-03-26', type: 'econ' },
        
        // ===== 英语视频课程 =====
        { id: 'v-eng-01', shortName: '英初-1', module: 'english', chapter: '单词初级', title: '单词初级1-2组', duration: 20, order: 1, date: '2026-02-10', type: 'eng' },
        { id: 'v-eng-02', shortName: '英初-2', module: 'english', chapter: '单词初级', title: '单词初级3-4组', duration: 20, order: 2, date: '2026-02-11', type: 'eng' },
        { id: 'v-eng-03', shortName: '英初-3', module: 'english', chapter: '单词初级', title: '单词初级5-6组', duration: 20, order: 3, date: '2026-02-12', type: 'eng' },
        { id: 'v-eng-04', shortName: '英初-4', module: 'english', chapter: '单词初级', title: '单词初级7-8组', duration: 20, order: 4, date: '2026-02-13', type: 'eng' },
        { id: 'v-eng-05', shortName: '英初-5', module: 'english', chapter: '单词初级', title: '单词初级9-10组', duration: 20, order: 5, date: '2026-02-14', type: 'eng' },
        { id: 'v-eng-06', shortName: '英初-6', module: 'english', chapter: '单词初级', title: '单词初级11-12组', duration: 20, order: 6, date: '2026-02-15', type: 'eng' },
        { id: 'v-eng-07', shortName: '英初-7', module: 'english', chapter: '单词初级', title: '单词初级13-14组', duration: 20, order: 7, date: '2026-02-17', type: 'eng' },
        { id: 'v-eng-08', shortName: '英初-8', module: 'english', chapter: '单词初级', title: '单词初级15-16组', duration: 20, order: 8, date: '2026-02-18', type: 'eng' },
        
        { id: 'v-eng-09', shortName: '英中-1', module: 'english', chapter: '单词中级', title: '单词中级1-2组', duration: 20, order: 9, date: '2026-02-19', type: 'eng' },
        { id: 'v-eng-10', shortName: '英中-2', module: 'english', chapter: '单词中级', title: '单词中级3-4组', duration: 20, order: 10, date: '2026-02-20', type: 'eng' },
        { id: 'v-eng-11', shortName: '英中-3', module: 'english', chapter: '单词中级', title: '单词中级5-6组', duration: 20, order: 11, date: '2026-02-21', type: 'eng' },
        { id: 'v-eng-12', shortName: '英中-4', module: 'english', chapter: '单词中级', title: '单词中级7-8组', duration: 20, order: 12, date: '2026-02-22', type: 'eng' },
        { id: 'v-eng-13', shortName: '英中-5', module: 'english', chapter: '单词中级', title: '单词中级9-10组', duration: 20, order: 13, date: '2026-02-24', type: 'eng' },
        { id: 'v-eng-14', shortName: '英中-6', module: 'english', chapter: '单词中级', title: '单词中级11-12组', duration: 20, order: 14, date: '2026-02-25', type: 'eng' },
        { id: 'v-eng-15', shortName: '英中-7', module: 'english', chapter: '单词中级', title: '单词中级13-14组', duration: 20, order: 15, date: '2026-02-26', type: 'eng' },
        { id: 'v-eng-16', shortName: '英中-8', module: 'english', chapter: '单词中级', title: '单词中级15-16组', duration: 20, order: 16, date: '2026-02-27', type: 'eng' },
        { id: 'v-eng-17', shortName: '英中-9', module: 'english', chapter: '单词中级', title: '单词中级17-18组', duration: 20, order: 17, date: '2026-02-28', type: 'eng' },
        { id: 'v-eng-18', shortName: '英中-10', module: 'english', chapter: '单词中级', title: '单词中级19-20组', duration: 20, order: 18, date: '2026-03-01', type: 'eng' },
        { id: 'v-eng-19', shortName: '英中-11', module: 'english', chapter: '单词中级', title: '单词中级21-22组', duration: 20, order: 19, date: '2026-03-03', type: 'eng' },
        { id: 'v-eng-20', shortName: '英中-12', module: 'english', chapter: '单词中级', title: '单词中级23-24组', duration: 20, order: 20, date: '2026-03-04', type: 'eng' },
        { id: 'v-eng-21', shortName: '英中-13', module: 'english', chapter: '单词中级', title: '单词中级25-26组', duration: 20, order: 21, date: '2026-03-05', type: 'eng' },
        
        { id: 'v-eng-22', shortName: '英高-1', module: 'english', chapter: '高级词汇', title: '高级词汇1-2组', duration: 20, order: 22, date: '2026-03-06', type: 'eng' },
        { id: 'v-eng-23', shortName: '英高-2', module: 'english', chapter: '高级词汇', title: '高级词汇3-4组', duration: 20, order: 23, date: '2026-03-07', type: 'eng' },
        { id: 'v-eng-24', shortName: '英高-3', module: 'english', chapter: '高级词汇', title: '高级词汇5-6组', duration: 20, order: 24, date: '2026-03-08', type: 'eng' },
        { id: 'v-eng-25', shortName: '英高-4', module: 'english', chapter: '高级词汇', title: '高级词汇7-8组', duration: 20, order: 25, date: '2026-03-10', type: 'eng' },
        { id: 'v-eng-26', shortName: '英高-5', module: 'english', chapter: '高级词汇', title: '高级词汇9-10组', duration: 20, order: 26, date: '2026-03-11', type: 'eng' },
        { id: 'v-eng-27', shortName: '英高-6', module: 'english', chapter: '高级词汇', title: '高级词汇11-12组', duration: 20, order: 27, date: '2026-03-12', type: 'eng' },
        { id: 'v-eng-28', shortName: '英高-7', module: 'english', chapter: '高级词汇', title: '高级词汇13-14组', duration: 20, order: 28, date: '2026-03-13', type: 'eng' },
        { id: 'v-eng-29', shortName: '英高-8', module: 'english', chapter: '高级词汇', title: '高级词汇15-16组', duration: 20, order: 29, date: '2026-03-14', type: 'eng' },
        { id: 'v-eng-30', shortName: '英高-9', module: 'english', chapter: '高级词汇', title: '高级词汇17-18组', duration: 20, order: 30, date: '2026-03-15', type: 'eng' },
        { id: 'v-eng-31', shortName: '英高-10', module: 'english', chapter: '高级词汇', title: '高级词汇19-20组', duration: 20, order: 31, date: '2026-03-17', type: 'eng' },
        { id: 'v-eng-32', shortName: '英高-11', module: 'english', chapter: '高级词汇', title: '高级词汇21-22组', duration: 20, order: 32, date: '2026-03-18', type: 'eng' },
        { id: 'v-eng-33', shortName: '英高-12', module: 'english', chapter: '高级词汇', title: '高级词汇23-24组', duration: 20, order: 33, date: '2026-03-19', type: 'eng' },
        { id: 'v-eng-34', shortName: '英高-13', module: 'english', chapter: '高级词汇', title: '高级词汇25-26组', duration: 20, order: 34, date: '2026-03-20', type: 'eng' },
        { id: 'v-eng-35', shortName: '英高-14', module: 'english', chapter: '高级词汇', title: '高级词汇27-28组', duration: 20, order: 35, date: '2026-03-21', type: 'eng' },
        { id: 'v-eng-36', shortName: '英高-15', module: 'english', chapter: '高级词汇', title: '高级词汇29-30组', duration: 20, order: 36, date: '2026-03-22', type: 'eng' },
        { id: 'v-eng-37', shortName: '英高-16', module: 'english', chapter: '高级词汇', title: '高级词汇31-32组', duration: 20, order: 37, date: '2026-03-24', type: 'eng' },
        { id: 'v-eng-38', shortName: '英高-17', module: 'english', chapter: '高级词汇', title: '高级词汇33-34组', duration: 20, order: 38, date: '2026-03-25', type: 'eng' },
        { id: 'v-eng-39', shortName: '英高-18', module: 'english', chapter: '高级词汇', title: '高级词汇35-36组', duration: 20, order: 39, date: '2026-03-26', type: 'eng' },
        { id: 'v-eng-40', shortName: '英高-19', module: 'english', chapter: '高级词汇', title: '高级词汇37-38组', duration: 20, order: 40, date: '2026-03-27', type: 'eng' },
        { id: 'v-eng-41', shortName: '英高-20', module: 'english', chapter: '高级词汇', title: '高级词汇39-40组', duration: 20, order: 41, date: '2026-03-28', type: 'eng' },
        { id: 'v-eng-42', shortName: '英高-21', module: 'english', chapter: '高级词汇', title: '高级词汇41-42组', duration: 20, order: 42, date: '2026-03-29', type: 'eng' },
        { id: 'v-eng-43', shortName: '英高-22', module: 'english', chapter: '高级词汇', title: '高级词汇43-44组', duration: 20, order: 43, date: '2026-03-30', type: 'eng' },
        { id: 'v-eng-44', shortName: '英高-23', module: 'english', chapter: '高级词汇', title: '高级词汇45-46组', duration: 20, order: 44, date: '2026-03-31', type: 'eng' }
    ],
    // 知识模块
    modules: {
        socialism: { name: '社会主义市场经济', color: '#6366f1' },
        fiscal: { name: '财政学', color: '#8b5cf6' },
        international: { name: '国际经济学', color: '#06b6d4' },
        monetary: { name: '货币银行学', color: '#f59e0b' },
        western: { name: '西方经济学', color: '#10b981' }
    },

    // 知识点列表
    knowledge: [
        // ===== 财政学 =====
        {
            id: 'fiscal-001',
            module: 'fiscal',
            type: 'term',
            title: '免费搭车行为',
            content: '是指不承担任何成本而消费或使用公共物品的行为。有这种行为的人具有让别人付钱而自己享用的动机。',
            tip: '记忆：想"搭车"但不想"买票" = 只享受不付出',
            examYears: ['14', '19'],
            difficulty: 2
        },
        {
            id: 'fiscal-002',
            module: 'fiscal',
            type: 'term',
            title: '寻租行为',
            content: '是指人们凭借政府保护进行的为追求自身经济利益的活动。其特点是把那些本应当用于价值生产活动的资源用于为了决定分配结果的竞争。寻租行为是一种非生产性活动。',
            tip: '记忆："寻"找"租"金/特权 = 寻求政府保护获利',
            examYears: ['17', '21'],
            difficulty: 3
        },
        {
            id: 'fiscal-003',
            module: 'fiscal',
            type: 'term',
            title: '政府失灵',
            content: '是指政府的活动或干预措施缺乏效率，或者说政府做出了降低经济效率的决策或不能实施改善经济效率的决策。',
            tip: '记忆：与市场失灵相对，政府干预反而降低效率',
            examYears: ['20'],
            difficulty: 2
        },
        {
            id: 'fiscal-004',
            module: 'fiscal',
            type: 'term',
            title: '购买性支出',
            content: '是指政府购买商品和服务的支出，包括购买进行日常政务活动所需的或用于国家投资所需的商品和服务的支出。',
            tip: '记忆：一手交钱一手交货，有实际商品交换',
            examYears: ['15', '22'],
            difficulty: 2
        },
        {
            id: 'fiscal-005',
            module: 'fiscal',
            type: 'term',
            title: '拉弗曲线',
            content: '描绘了税收收入与税率之间的关系。曲线表明：当税率在一定限度以下时，提高税率能增加税收收入；但超过一定限度时，再提高税率反而会导致税收收入减少。',
            tip: '记忆：税率像弹簧，压太紧反而弹不回来',
            examYears: ['16', '23'],
            difficulty: 3
        },
        {
            id: 'fiscal-006',
            module: 'fiscal',
            type: 'term',
            title: '财政赤字',
            content: '是指在某一财政年度，计划的财政支出超过财政收入，导致财政收支出现差额的现象。',
            tip: '记忆：支出 > 收入 = 赤字（红字）',
            examYears: ['18', '24'],
            difficulty: 1
        },
        {
            id: 'fiscal-007',
            module: 'fiscal',
            type: 'short',
            title: '财政职能',
            content: [
                '① 资源配置职能：矫正资源配置结构，实现资源优化配置',
                '② 收入分配职能：调节收入差距，实现社会公平',
                '③ 经济稳定职能：调节经济运行，保持经济稳定',
                '④ 经济发展职能：促进经济增长和经济结构优化'
            ],
            tip: '记忆口诀："资收稳发" = 资源配置、收入分配、经济稳定、经济发展',
            examYears: ['14', '24'],
            difficulty: 3
        },
        {
            id: 'fiscal-008',
            module: 'fiscal',
            type: 'short',
            title: '财政支出增长理论',
            content: [
                '① 瓦格纳法则：工业化进程中，公共支出不断增长',
                '② 梯度渐进增长理论：支出增长呈阶梯式上升',
                '③ 经济发展阶段论：不同阶段支出结构不同',
                '④ 非均衡增长模型：公共部门生产率偏低导致支出增长'
            ],
            tip: '记忆：瓦格纳（德国）→ 梯度（渐进）→ 发展阶段 → 非均衡',
            examYears: ['20'],
            difficulty: 4
        },

        // ===== 国际经济学 =====
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

        // ===== 货币银行学 =====
        {
            id: 'mon-001',
            module: 'monetary',
            type: 'term',
            title: '基础货币',
            content: '又称高能货币，是指流通中的现金加上商业银行的存款准备金。基础货币 = 流通中现金 + 法定准备金 + 超额准备金。基础货币是货币创造的基础。',
            tip: '记忆：基础 = 现金 + 准备金 → 货币创造的"种子"',
            examYears: ['15', '19', '23'],
            difficulty: 3
        },
        {
            id: 'mon-002',
            module: 'monetary',
            type: 'term',
            title: 'IS曲线',
            content: '描述产品市场均衡时，利率与国民收入之间关系的曲线。IS曲线表示投资等于储蓄时的各种利率与收入组合。曲线向右下方倾斜。',
            tip: '记忆：I(投资)=S(储蓄) → 产品市场均衡 → 利率↓收入↑',
            examYears: ['16', '20'],
            difficulty: 3
        },
        {
            id: 'mon-003',
            module: 'monetary',
            type: 'term',
            title: 'LM曲线',
            content: '描述货币市场均衡时，利率与国民收入之间关系的曲线。LM曲线表示货币需求等于货币供给时的各种利率与收入组合。曲线向右上方倾斜。',
            tip: '记忆：L(货币需求)=M(货币供给) → 货币市场均衡 → 收入↑利率↑',
            examYears: ['17', '21'],
            difficulty: 3
        },
        {
            id: 'mon-004',
            module: 'monetary',
            type: 'term',
            title: '流动偏好陷阱',
            content: '又称凯恩斯陷阱，是指当利率降到极低水平时，人们预期利率不会再下降，债券价格不会再上升，因此宁愿持有现金而不愿购买债券，导致货币需求无限增加的现象。此时货币政策失效。',
            tip: '记忆：利率极低 → 人人持币待购 → 货币政策无效',
            examYears: ['18', '22'],
            difficulty: 4
        },
        {
            id: 'mon-005',
            module: 'monetary',
            type: 'term',
            title: '货币政策',
            content: '是指中央银行为实现特定经济目标而采取的控制和调节货币供给量、信用量的方针、政策和措施的总称。主要目标：物价稳定、充分就业、经济增长、国际收支平衡。',
            tip: '记忆：央行控制"钱袋子"→影响经济',
            examYears: ['14', '19', '24'],
            difficulty: 2
        },
        {
            id: 'mon-006',
            module: 'monetary',
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
            id: 'mon-007',
            module: 'monetary',
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

        // ===== 西方经济学 =====
        {
            id: 'west-001',
            module: 'western',
            type: 'term',
            title: '需求',
            content: '是指在一定时期内，在各种可能的价格水平下，消费者愿意并且能够购买的商品数量。需求需要同时具备购买欲望和购买能力两个条件。',
            tip: '记忆：需求 = 想买 + 能买',
            examYears: ['14', '18'],
            difficulty: 1
        },
        {
            id: 'west-002',
            module: 'western',
            type: 'term',
            title: '供给',
            content: '是指在一定时期内，在各种可能的价格水平下，生产者愿意并且能够提供的商品数量。影响供给的因素包括价格、成本、技术等。',
            tip: '记忆：供给 = 想卖 + 能卖',
            examYears: ['15', '19'],
            difficulty: 1
        },
        {
            id: 'west-003',
            module: 'western',
            type: 'term',
            title: '均衡价格',
            content: '是指市场需求量等于市场供给量时的价格。在均衡价格水平上，消费者愿意购买的数量等于生产者愿意供给的数量，市场出清。',
            tip: '记忆：供需相等 → 均衡 → 市场出清',
            examYears: ['16', '20'],
            difficulty: 2
        },
        {
            id: 'west-004',
            module: 'western',
            type: 'term',
            title: '边际效用',
            content: '是指消费者在一定时期内增加一单位商品的消费所得到的效用量的增量。边际效用递减规律：在一定时间内，其他商品消费量不变的情况下，随着某种商品消费量的增加，消费者从该商品连续增加的每一消费单位中得到的效用增量是递减的。',
            tip: '记忆：吃第一个包子很香，吃到第十个就腻了',
            examYears: ['17', '21', '24'],
            difficulty: 3
        },
        {
            id: 'west-005',
            module: 'western',
            type: 'term',
            title: '消费者剩余',
            content: '是指消费者愿意支付的最高总价格与实际支付的总价格之间的差额。它衡量了消费者从购买商品中获得的净福利。',
            tip: '记忆：心理价位 - 实际支付 = "赚到的感觉"',
            examYears: ['18', '22'],
            difficulty: 2
        },
        {
            id: 'west-006',
            module: 'western',
            type: 'term',
            title: '菲利普斯曲线',
            content: '描述了失业率与通货膨胀率之间的负相关关系。短期菲利普斯曲线向右下方倾斜，表明失业与通胀存在替代关系；长期菲利普斯曲线是垂直的，表明失业率处于自然失业率水平。',
            tip: '记忆：短期此消彼长，长期回归自然率',
            examYears: ['19', '23'],
            difficulty: 4
        },
        {
            id: 'west-007',
            module: 'western',
            type: 'term',
            title: 'GDP',
            content: '国内生产总值(Gross Domestic Product)，是指一个国家(或地区)所有常住单位在一定时期内生产的全部最终产品和服务的市场价值总和。是衡量一国经济活动的核心指标。',
            tip: '记忆：国内+一定时期+最终产品+市场价值',
            examYears: ['14', '17', '20'],
            difficulty: 2
        },

        // ===== 社会主义市场经济 =====
        {
            id: 'soc-001',
            module: 'socialism',
            type: 'choice',
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
            content: '是指发展中国家经济中同时存在的现代工业部门和传统农业部门并存的经济结构特征。两个部门在生产方式、劳动生产率、收入水平等方面存在显著差异。',
            tip: '记忆：现代工业 + 传统农业 = 二元并存',
            examYears: ['17', '20'],
            difficulty: 2
        },
        {
            id: 'soc-004',
            module: 'socialism',
            type: 'choice',
            title: '市场经济特征',
            content: '包括：①资源配置市场化；②企业行为自主化；③宏观调控间接化；④市场管理法制化；⑤社会保障制度化。核心是通过市场机制实现资源的有效配置。',
            tip: '记忆：市场化、自主化、间接化、法制化、制度化',
            examYears: ['18', '23'],
            difficulty: 3
        }
    ],

    // 学习计划 (2-3月)
    schedule: {
        '2026-02-10': { econ: '社会主义市场经济理论-1', eng: '单词初级1-2组', type: 'new' },
        '2026-02-11': { econ: '社会主义市场经济理论-2', eng: '单词初级3-4组', type: 'new' },
        '2026-02-12': { econ: '需求供给与均衡价格', eng: '单词初级5-6组', type: 'new' },
        '2026-02-13': { econ: '弹性理论', eng: '单词初级7-8组', type: 'new' },
        '2026-02-14': { econ: '效用论', eng: '单词初级9-10组', type: 'new' },
        '2026-02-15': { econ: '生产论', eng: '单词初级11-12组', type: 'new' },
        '2026-02-16': { econ: '周复习', eng: '复习单词1-12组', type: 'review' },
        '2026-02-17': { econ: '成本论', eng: '单词初级13-14组', type: 'new' },
        '2026-02-18': { econ: '完全竞争市场', eng: '单词初级15-16组', type: 'new' },
        '2026-02-19': { econ: '不完全竞争市场', eng: '单词中级1-2组', type: 'new' },
        '2026-02-20': { econ: '生产要素市场', eng: '单词中级3-4组', type: 'new' },
        '2026-02-21': { econ: '一般均衡与福利经济学', eng: '单词中级5-6组', type: 'new' },
        '2026-02-22': { econ: '市场失灵', eng: '单词中级7-8组', type: 'new' },
        '2026-02-23': { econ: '周复习', eng: '复习单词13-16+中级', type: 'review' },
        '2026-02-24': { econ: '宏观经济活动', eng: '单词中级9-10组', type: 'new' },
        '2026-02-25': { econ: '简单国民收入决定', eng: '单词中级11-12组', type: 'new' },
        '2026-02-26': { econ: 'IS-LM模型', eng: '单词中级13-14组', type: 'new' },
        '2026-02-27': { econ: '宏观经济政策', eng: '单词中级15-16组', type: 'new' },
        '2026-02-28': { econ: '总需求总供给', eng: '单词中级17-18组', type: 'new' },
        '2026-03-01': { econ: '经济增长', eng: '单词中级19-20组', type: 'new' },
        '2026-03-02': { econ: '周复习', eng: '复习中级', type: 'review' },
        '2026-03-03': { econ: '国际贸易纯理论', eng: '单词中级21-22组', type: 'new' },
        '2026-03-04': { econ: '国际贸易现代理论', eng: '单词中级23-24组', type: 'new' },
        '2026-03-05': { econ: '国际贸易政策', eng: '单词中级25-26组', type: 'new' },
        '2026-03-06': { econ: '国际收支分析', eng: '高级词汇1-2组', type: 'new' },
        '2026-03-07': { econ: '汇率决定理论', eng: '高级词汇3-4组', type: 'new' },
        '2026-03-08': { econ: '要素国际流动', eng: '高级词汇5-6组', type: 'new' },
        '2026-03-09': { econ: '周复习', eng: '复习高级', type: 'review' },
        '2026-03-10': { econ: '财政职能', eng: '高级词汇7-8组', type: 'new' },
        '2026-03-11': { econ: '财政支出', eng: '高级词汇9-10组', type: 'new' },
        '2026-03-12': { econ: '财政投资与社保', eng: '高级词汇11-12组', type: 'new' },
        '2026-03-13': { econ: '税收原理', eng: '高级词汇13-14组', type: 'new' },
        '2026-03-14': { econ: '税收制度', eng: '高级词汇15-16组', type: 'new' },
        '2026-03-15': { econ: '国债理论', eng: '高级词汇17-18组', type: 'new' },
        '2026-03-16': { econ: '周复习', eng: '复习高级', type: 'review' },
        '2026-03-17': { econ: '国家预算', eng: '高级词汇19-20组', type: 'new' },
        '2026-03-18': { econ: '财政平衡', eng: '高级词汇21-22组', type: 'new' },
        '2026-03-19': { econ: '货币供求理论', eng: '高级词汇23-24组', type: 'new' },
        '2026-03-20': { econ: '利率理论', eng: '高级词汇25-26组', type: 'new' },
        '2026-03-21': { econ: '通货膨胀', eng: '高级词汇27-28组', type: 'new' },
        '2026-03-22': { econ: '金融中介体系', eng: '高级词汇29-30组', type: 'new' },
        '2026-03-23': { econ: '周复习', eng: '复习高级', type: 'review' },
        '2026-03-24': { econ: '金融市场', eng: '高级词汇31-32组', type: 'new' },
        '2026-03-25': { econ: '货币政策', eng: '高级词汇33-34组', type: 'new' },
        '2026-03-26': { econ: '国际货币体系', eng: '高级词汇35-36组', type: 'new' },
        '2026-03-27': { econ: '名词解释复习', eng: '高级词汇37-38组', type: 'review' },
        '2026-03-28': { econ: '简答题复习', eng: '高级词汇39-40组', type: 'review' },
        '2026-03-29': { econ: '论述题复习', eng: '高级词汇41-42组', type: 'review' },
        '2026-03-30': { econ: '综合复习', eng: '高级词汇43-44组', type: 'review' },
        '2026-03-31': { econ: '阶段测试', eng: '高级词汇45-46组', type: 'test' }
    },

    // 激励话术
    encouragements: [
        "🔥 又消灭一个知识点！火箭正在升空！",
        "🧠 你的大脑正在建立新的神经连接，保持下去！",
        "⏰ 距离考试还有一段时间，今天的努力让明天更轻松！",
        "💪 马斯克说：'坚持非常重要，除非被迫放弃，否则不要放弃'",
        "📈 你的记忆留存率正在上升，击败68%的考生！",
        "🎯 每一个知识点都是通往成功的一块砖！",
        "✨ 今天的你比昨天更强大，继续前进！",
        "🏆 备考是一场马拉松，你正在正确的赛道上！",
        "🌟 星光不问赶路人，时光不负有心人！",
        "📚 学习如逆水行舟，不进则退，你正在前进！"
    ]
};

// 用户数据存储
const userData = {
    // 学习记录
    studyRecords: {},
    
    // 记忆强度 (0-100)
    memoryStrength: {},
    
    // 下次复习时间
    nextReview: {},
    
    // 连续学习天数
    streakDays: 0,
    
    // 今日学习时间(分钟)
    todayStudyTime: 0,
    
    // 已完成任务
    completedTasks: [],
    
    // 成就
    achievements: [],
    
    // ===== 视频学习跟踪 =====
    // 视频观看状态: { videoId: { status: 'watched'|'skipped'|'reviewed', watchDate: '2026-02-10', watchCount: 1, note: '' } }
    videoProgress: {},
    
    // ===== 日报数据 =====
    // 日报: { '2026-02-10': { content: '今日学习内容...', summary: 'AI总结', createdAt: '2026-02-10 22:00' } }
    dailyReports: {},
    
    // ===== 周报月报缓存 =====
    weeklyReports: {},
    monthlyReports: {}
};

// 从localStorage加载用户数据
function loadUserData() {
    const saved = localStorage.getItem('studyx_user_data');
    if (saved) {
        const data = JSON.parse(saved);
        Object.assign(userData, data);
    }
}

// 保存用户数据到localStorage
function saveUserData() {
    localStorage.setItem('studyx_user_data', JSON.stringify(userData));
}

// 初始化
loadUserData();
