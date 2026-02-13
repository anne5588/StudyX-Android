// ===== 英语词汇数据库 =====
const vocabularyData = {
    // 词汇等级 - 按照基础词汇分组_1-3级.pdf文件结构
    levels: {
        // 基础词汇：共84组，每组10个单词
        basic: { name: '基础词汇', groups: 84, wordsPerGroup: 10, audioFiles: 0, groupsPerAudio: 0 },
        // 中级词汇（暂时为空）
        intermediate: { name: '中级词汇', groups: 0, wordsPerGroup: 0, audioFiles: 0, groupsPerAudio: 0 },
        // 高级词汇（暂时为空）
        advanced: { name: '高级词汇', groups: 0, wordsPerGroup: 0, audioFiles: 0, groupsPerAudio: 0 },
        // 词组搭配（暂时为空）
        phrase: { name: '词组搭配', groups: 0, wordsPerGroup: 0, audioFiles: 0, groupsPerAudio: 0 }
    },

    // 基础词汇（第1-130组，每组5个单词）
    basicVocabulary: {
        // 第1组
        1: [
            { word: "act", phonetic: "/ækt/", meaning: "①行动②表演③充当④行为⑤法案", example: "The government must act quickly to address the environmental issue.", group: 1 },
            { word: "action", phonetic: "/ˈækʃən/", meaning: "①行为②作用③剧情④诉讼", example: "Her practical action won widespread support from colleagues.", group: 1 },
            { word: "activity", phonetic: "/ækˈtɪvəti/", meaning: "①活跃②活动", example: "After-school activities help students develop social skills.", group: 1 },
            { word: "react", phonetic: "/riˈækt/", meaning: "①反应②回应", example: "Most people react calmly when facing unexpected challenges.", group: 1 },
            { word: "import", phonetic: "/ˈɪmpɔːt/", meaning: "①进口②进口品③重要性", example: "This country imports large quantities of high-tech products every year.", group: 1 },
            { word: "export", phonetic: "/ˈekspɔːt/", meaning: "①出口②输出品", example: "Their company plans to export agricultural products to Southeast Asia.", group: 1 },
            { word: "transport", phonetic: "/ˌtrænsˈpɔːt/", meaning: "①运输②交通③运输工具", example: "Public transport in big cities is becoming more convenient.", group: 1 },
            { word: "support", phonetic: "/səˈpɔːt/", meaning: "①支持②支撑③供养④赞助", example: "Family and friends\' support is crucial for postgraduate exam preparation.", group: 1 },
            { word: "tend", phonetic: "/tend/", meaning: "①倾向②照料③护理", example: "People tend to pay more attention to practical skills in the workplace.", group: 1 },
            { word: "tendency", phonetic: "/ˈtendənsi/", meaning: "①趋势②倾向③意向", example: "There is a clear tendency for young people to pursue personalized careers.", group: 1 },
        ],
        // 第2组
        2: [
            { word: "extend", phonetic: "/ɪkˈstend/", meaning: "①延伸②扩展③延长④伸出", example: "The deadline for thesis submission will be extended by one week.", group: 2 },
            { word: "intend", phonetic: "/ɪnˈtend/", meaning: "①打算②想要③计划④意指", example: "I intend to focus on English reading comprehension in the next month.", group: 2 },
            { word: "progress", phonetic: "/ˈprəʊgres/", meaning: "①进步②进展③发展④前进", example: "He has made remarkable progress in English writing through daily practice.", group: 2 },
            { word: "aggressive", phonetic: "/əˈgresɪv/", meaning: "①侵略性的②积极的③有进取心的④好斗的", example: "An aggressive learning attitude helps achieve goals faster.", group: 2 },
            { word: "congress", phonetic: "/ˈkɒŋgres/", meaning: "①国会②代表大会③学术会议", example: "The academic congress will gather experts from all over the country.", group: 2 },
            { word: "convert", phonetic: "/kənˈvɜːt/", meaning: "①转换②转变③皈依④兑换", example: "She converted her part-time experience into a competitive advantage.", group: 2 },
            { word: "reverse", phonetic: "/rɪˈvɜːs/", meaning: "①反转②相反③颠倒④撤销", example: "The wrong decision was reversed after in-depth discussion.", group: 2 },
            { word: "diverse", phonetic: "/daɪˈvɜːs/", meaning: "①多样的②不同的③形形色色的", example: "The team\'s diverse backgrounds bring rich ideas for the project.", group: 2 },
            { word: "expose", phonetic: "/ɪkˈspəʊz/", meaning: "①暴露②揭露③使接触④曝光", example: "Long-term exposure to digital screens may damage eyesight.", group: 2 },
            { word: "oppose", phonetic: "/əˈpəʊz/", meaning: "①反对②反抗③对抗④抵制", example: "Many experts oppose the impractical policy proposal.", group: 2 },
        ],
        // 第3组
        3: [
            { word: "propose", phonetic: "/prəˈpəʊz/", meaning: "①提议②建议③求婚④提出", example: "He proposed a new method to improve learning efficiency.", group: 3 },
            { word: "include", phonetic: "/ɪnˈkluːd/", meaning: "①包括②包含③计入④使成为一部分", example: "The exam syllabus includes all key points we reviewed.", group: 3 },
            { word: "exclude", phonetic: "/ɪkˈskluːd/", meaning: "①排除②排斥③不包括④拒绝进入", example: "No one should be excluded from the team collaboration.", group: 3 },
            { word: "conclude", phonetic: "/kənˈkluːd/", meaning: "①得出结论②结束③推断④缔结", example: "We can conclude from the data that the method is effective.", group: 3 },
            { word: "press", phonetic: "/pres/", meaning: "①按压②熨烫③催促④媒体⑤压机", example: "The media press the government to release more detailed information.", group: 3 },
            { word: "express", phonetic: "/ɪkˈspres/", meaning: "①表达②表示③快递④明确的", example: "She expressed her opinions clearly in the academic seminar.", group: 3 },
            { word: "impress", phonetic: "/ɪmˈpres/", meaning: "①给…留下印象②使钦佩③铭刻④压印", example: "His professional knowledge impressed the interviewers deeply.", group: 3 },
            { word: "study", phonetic: "/ˈstʌdi/", meaning: "①学习②研究③书房④攻读", example: "She spends two hours every morning studying English vocabulary.", group: 3 },
            { word: "learn", phonetic: "/lɜːn/", meaning: "①学习②学会③得知④认识到", example: "It\'s never too late to learn new theories and methods.", group: 3 },
            { word: "exam", phonetic: "/ɪgˈzæm/", meaning: "①考试②测验③检查④审查", example: "Adequate rest is essential before the final exam.", group: 3 },
        ],
        // 第4组
        4: [
            { word: "test", phonetic: "/test/", meaning: "①测试②检验③考验④化验", example: "This mock test helps assess our current English level.", group: 4 },
            { word: "knowledge", phonetic: "/ˈnɒlɪdʒ/", meaning: "①知识②学问③知晓④了解", example: "Systematic review can consolidate professional knowledge.", group: 4 },
            { word: "book", phonetic: "/bʊk/", meaning: "①书②书籍③预订④账簿", example: "I borrowed three reference books from the university library.", group: 4 },
            { word: "paper", phonetic: "/ˈpeɪpə/", meaning: "①纸②论文③文件④报纸", example: "Writing a research paper requires extensive literature review.", group: 4 },
            { word: "thesis", phonetic: "/ˈθiːsɪs/", meaning: "①论文②论点③论题④命题", example: "Completing a master\'s thesis needs patience and rigor.", group: 4 },
            { word: "library", phonetic: "/ˈlaɪbrəri/", meaning: "①图书馆②藏书室③藏书④文库", example: "Many students choose the library as their daily study place.", group: 4 },
            { word: "article", phonetic: "/ˈɑːtɪkl/", meaning: "①文章②物品③冠词④条款", example: "This academic article analyzes the latest industry trends.", group: 4 },
            { word: "professor", phonetic: "/prəˈfesə/", meaning: "①教授②研究员③教师④学者", example: "The professor\'s guidance helped me clarify my research direction.", group: 4 },
            { word: "curriculum", phonetic: "/kəˈrɪkjələm/", meaning: "①课程②课程体系③教学大纲", example: "The curriculum covers all core knowledge of the major.", group: 4 },
            { word: "campus", phonetic: "/ˈkæmpəs/", meaning: "①校园②校区③园区", example: "Beautiful campus environment provides a good learning atmosphere.", group: 4 },
        ],
        // 第5组
        5: [
            { word: "undergraduate", phonetic: "/ˌʌndəˈgrædʒuət/", meaning: "①本科生②本科的③大学生", example: "He was an outstanding undergraduate before pursuing a master\'s degree.", group: 5 },
            { word: "chapter", phonetic: "/ˈtʃæptə/", meaning: "①章节②篇章③部分④章", example: "The third chapter of this book focuses on practical applications.", group: 5 },
            { word: "literature", phonetic: "/ˈlɪtrətʃə/", meaning: "①文学②文献③著作④文学作品", example: "We need to read a lot of related literature for the thesis.", group: 5 },
            { word: "memorize", phonetic: "/ˈmeməraɪz/", meaning: "①记忆②记住③熟记④背诵", example: "Using associative methods can help memorize words faster.", group: 5 },
            { word: "discussion", phonetic: "/dɪˈskʌʃn/", meaning: "①讨论②商议③探讨④议论", example: "Group discussion is beneficial for solving difficult problems.", group: 5 },
            { word: "communicate", phonetic: "/kəˈmjuːnɪkeɪt/", meaning: "①交流②沟通③通讯④传达", example: "Effective communication promotes academic exchanges.", group: 5 },
            { word: "explain", phonetic: "/ɪkˈspleɪn/", meaning: "①解释②说明③阐明④讲解", example: "The teacher explained the grammatical points in detail.", group: 5 },
            { word: "medicine", phonetic: "/ˈmedsn/", meaning: "①药物②医学③药剂④医术", example: "The doctor prescribed medicine to relieve the symptoms.", group: 5 },
            { word: "surgery", phonetic: "/ˈsɜːdʒəri/", meaning: "①手术②外科③外科手术④开刀", example: "The patient recovered well after the minor surgery.", group: 5 },
            { word: "infection", phonetic: "/ɪnˈfekʃn/", meaning: "①感染②传染③侵染④病原体", example: "Proper hygiene can prevent bacterial infection.", group: 5 },
        ],
        // 第6组
        6: [
            { word: "pain", phonetic: "/peɪn/", meaning: "①疼痛②痛苦③苦恼④使痛苦", example: "She felt slight pain in her shoulder after long hours of study.", group: 6 },
            { word: "disease", phonetic: "/dɪˈziːz/", meaning: "①疾病②病害③弊病④患病", example: "Regular exercise helps prevent chronic diseases.", group: 6 },
            { word: "heal", phonetic: "/hiːl/", meaning: "①治愈②愈合③康复④使复原", example: "Time and proper care can heal physical and mental wounds.", group: 6 },
            { word: "treat", phonetic: "/triːt/", meaning: "①对待②治疗③请客④处理⑤看待", example: "The hospital provides high-quality treatment for all patients.", group: 6 },
            { word: "patient", phonetic: "/ˈpeɪʃnt/", meaning: "①病人②患者③有耐心的④能忍受的", example: "The patient followed the doctor\'s advice strictly.", group: 6 },
            { word: "injury", phonetic: "/ˈɪndʒəri/", meaning: "①伤害②损伤③受伤④损害", example: "He suffered a minor injury while doing sports.", group: 6 },
            { word: "cure", phonetic: "/kjʊə/", meaning: "①治愈②疗法③解药④矫正", example: "There is no simple cure for some chronic illnesses.", group: 6 },
            { word: "lung", phonetic: "/lʌŋ/", meaning: "①肺②肺部③肺脏", example: "Smoking is harmful to the lungs and overall health.", group: 6 },
            { word: "skin", phonetic: "/skɪn/", meaning: "①皮肤②表皮③皮毛④剥皮", example: "Protecting the skin from sun exposure is important in summer.", group: 6 },
            { word: "bone", phonetic: "/bəʊn/", meaning: "①骨头②骨质③骨骼④骨制的", example: "Drinking milk helps strengthen bones and teeth.", group: 6 },
        ],
        // 第7组
        7: [
            { word: "medication", phonetic: "/ˌmedɪˈkeɪʃn/", meaning: "①药物②用药③药剂④治疗", example: "Correct use of medication is crucial for recovery.", group: 7 },
            { word: "obesity", phonetic: "/əʊˈbiːsəti/", meaning: "①肥胖②肥胖症③臃肿", example: "Unhealthy diet and lack of exercise may lead to obesity.", group: 7 },
            { word: "flu", phonetic: "/fluː/", meaning: "①流感②流行性感冒③流感病毒", example: "Getting a flu vaccine can reduce the risk of infection.", group: 7 },
            { word: "sore", phonetic: "/sɔː/", meaning: "①疼痛的②痛处③酸痛的④恼火的", example: "She had a sore throat after catching a cold.", group: 7 },
            { word: "pulse", phonetic: "/pʌls/", meaning: "①脉搏②脉动③脉冲④跳动", example: "The nurse checked the patient\'s pulse regularly.", group: 7 },
            { word: "dental", phonetic: "/ˈdentl/", meaning: "①牙科的②牙齿的③牙质的", example: "Regular dental check-ups help maintain oral health.", group: 7 },
            { word: "facial", phonetic: "/ˈfeɪʃl/", meaning: "①面部的②面部护理③脸部的", example: "Proper facial care can improve skin condition.", group: 7 },
            { word: "travel", phonetic: "/ˈtrævl/", meaning: "①旅行②出行③游历④传播", example: "They plan to travel to Europe during the summer vacation.", group: 7 },
            { word: "trip", phonetic: "/trɪp/", meaning: "①旅程②旅行③绊倒④失足", example: "The business trip to Beijing was fruitful and efficient.", group: 7 },
            { word: "transport", phonetic: "/ˌtrænsˈpɔːt/", meaning: "①运输②交通③运输工具④运送", example: "Air transport is the fastest way for long-distance travel.", group: 7 },
        ],
        // 第8组
        8: [
            { word: "train", phonetic: "/treɪn/", meaning: "①火车②训练③培养④瞄准⑤列车", example: "Taking the high-speed train is convenient and comfortable.", group: 8 },
            { word: "plane", phonetic: "/pleɪn/", meaning: "①飞机②平面③水平④刨子", example: "The plane will take off on time if the weather is good.", group: 8 },
            { word: "car", phonetic: "/kɑː/", meaning: "①汽车②轿车③车厢④小汽车", example: "He bought a new car to commute to work more easily.", group: 8 },
            { word: "road", phonetic: "/rəʊd/", meaning: "①道路②公路③路途④方法", example: "The new road has shortened the travel time between cities.", group: 8 },
            { word: "street", phonetic: "/striːt/", meaning: "①街道②街头③马路④街区", example: "There are many shops and cafes on this busy street.", group: 8 },
            { word: "airport", phonetic: "/ˈeəpɔːt/", meaning: "①机场②航空港③飞机场", example: "We arrived at the airport two hours before boarding.", group: 8 },
            { word: "station", phonetic: "/ˈsteɪʃn/", meaning: "①车站②站台③局④站", example: "The subway station is within walking distance from my home.", group: 8 },
            { word: "route", phonetic: "/ruːt/", meaning: "①路线②路径③航线④途径", example: "We chose the shortest route to avoid traffic jams.", group: 8 },
            { word: "transportation", phonetic: "/ˌtrænspɔːˈteɪʃn/", meaning: "①运输②交通③运输系统④客运", example: "Urban transportation development promotes economic growth.", group: 8 },
            { word: "traffic", phonetic: "/ˈtræfɪk/", meaning: "①交通②交通量③贩卖④车流", example: "Heavy traffic is a common problem in big cities during rush hour.", group: 8 },
        ],
        // 第9组
        9: [
            { word: "journey", phonetic: "/ˈdʒɜːni/", meaning: "①旅程②旅途③行程④历程", example: "The long journey tested their patience and perseverance.", group: 9 },
            { word: "destination", phonetic: "/ˌdestɪˈneɪʃn/", meaning: "①目的地②终点③目标④归宿", example: "Their final destination is a small town by the sea.", group: 9 },
            { word: "commute", phonetic: "/kəˈmjuːt/", meaning: "①通勤②往返③通勤路程④交换", example: "Many office workers commute by subway every day.", group: 9 },
            { word: "driver", phonetic: "/ˈdraɪvə/", meaning: "①司机②驾驶员③驱动器④操盘手", example: "The driver maintained a steady speed on the highway.", group: 9 },
            { word: "motorist", phonetic: "/ˈməʊtərɪst/", meaning: "①驾车者②机动车驾驶员", example: "Motorists should obey traffic rules to ensure safety.", group: 9 },
            { word: "bicycle", phonetic: "/ˈbaɪsɪkl/", meaning: "①自行车②单车③骑自行", example: "Riding a bicycle is environmentally friendly and healthy.", group: 9 },
            { word: "footpath", phonetic: "/ˈfʊtpɑːθ/", meaning: "①人行道②小径③步道④小路", example: "We walked along the footpath in the park after dinner.", group: 9 },
            { word: "work", phonetic: "/wɜːk/", meaning: "①工作②干活③作品④工作成果", example: "She works in a multinational company as a human resource specialist.", group: 9 },
            { word: "job", phonetic: "/dʒɒb/", meaning: "①工作②职位③差事④职业", example: "Finding a suitable job requires both ability and opportunity.", group: 9 },
            { word: "office", phonetic: "/ˈɒfɪs/", meaning: "①办公室②办事处③局④公职", example: "The new office is spacious and well-equipped.", group: 9 },
        ],
        // 第10组
        10: [
            { word: "meeting", phonetic: "/ˈmiːtɪŋ/", meaning: "①会议②会面③集会④碰面", example: "The weekly team meeting is held every Monday morning.", group: 10 },
            { word: "project", phonetic: "/ˈprɒdʒekt/", meaning: "①项目②工程③计划④方案", example: "The team successfully completed the key project ahead of schedule.", group: 10 },
            { word: "manager", phonetic: "/ˈmænɪdʒə/", meaning: "①经理②管理者③经营者④负责人", example: "The department manager is responsible for overall work arrangement.", group: 10 },
            { word: "colleague", phonetic: "/ˈkɒliːg/", meaning: "①同事②同僚③同行④共事者", example: "She gets along well with her colleagues and often helps each other.", group: 10 },
            { word: "task", phonetic: "/tɑːsk/", meaning: "①任务②工作③差事④作业", example: "Each team member is assigned specific tasks according to their strengths.", group: 10 },
            { word: "career", phonetic: "/kəˈrɪə/", meaning: "①职业②事业③生涯④职业生涯", example: "Planning a career path is important for long-term development.", group: 10 },
            { word: "company", phonetic: "/ˈkʌmpəni/", meaning: "①公司②陪伴③同伴④商号", example: "The company has a good corporate culture and development prospects.", group: 10 },
            { word: "client", phonetic: "/ˈklaɪənt/", meaning: "①客户②顾客③委托人④当事人", example: "Satisfying clients\' needs is the core of service work.", group: 10 },
            { word: "employee", phonetic: "/ˌemplɔɪˈiː/", meaning: "①雇员②员工③受雇者", example: "The company provides training opportunities for new employees.", group: 10 },
            { word: "employer", phonetic: "/ɪmˈplɔɪə/", meaning: "①雇主②老板③雇佣者④用人单位", example: "Employers value employees\' sense of responsibility and teamwork.", group: 10 },
        ],
        // 第11组
        11: [
            { word: "director", phonetic: "/dəˈrektə/", meaning: "①导演②董事③主任④主管", example: "The director put forward valuable suggestions for the project.", group: 11 },
            { word: "secretary", phonetic: "/ˈsekrətri/", meaning: "①秘书②书记③干事④书记员", example: "The secretary arranged the meeting schedule and prepared materials.", group: 11 },
            { word: "consultant", phonetic: "/kənˈsʌltənt/", meaning: "①顾问②咨询顾问③咨询师④参谋", example: "The professional consultant provided practical solutions.", group: 11 },
            { word: "analyst", phonetic: "/ˈænəlɪst/", meaning: "①分析师②分析员③解析者", example: "The data analyst sorted out and analyzed the relevant data.", group: 11 },
            { word: "developer", phonetic: "/dɪˈveləpə/", meaning: "①开发者②开发商③开发者④培育者", example: "Software developers need to keep learning new technologies.", group: 11 },
            { word: "assistant", phonetic: "/əˈsɪstənt/", meaning: "①助手②助理③助教④辅助的", example: "The manager\'s assistant helps handle daily administrative work.", group: 11 },
            { word: "receptionist", phonetic: "/rɪˈsepʃənɪst/", meaning: "①接待员②前台③接待生", example: "The receptionist greeted every visitor politely.", group: 11 },
            { word: "shop", phonetic: "/ʃɒp/", meaning: "①购物②商店③店铺④选购", example: "She likes to shop in the mall with friends on weekends.", group: 11 },
            { word: "buy", phonetic: "/baɪ/", meaning: "①买②购买③收买④获得", example: "I need to buy some daily necessities after work.", group: 11 },
            { word: "sell", phonetic: "/sel/", meaning: "①卖②销售③出售④推销", example: "This store sells fresh fruits and vegetables from local farms.", group: 11 },
        ],
        // 第12组
        12: [
            { word: "price", phonetic: "/praɪs/", meaning: "①价格②价钱③定价④代价", example: "The price of this product is reasonable and affordable.", group: 12 },
            { word: "money", phonetic: "/ˈmʌni/", meaning: "①钱②货币③资金④财富", example: "Rational management of money is essential for a stable life.", group: 12 },
            { word: "market", phonetic: "/ˈmɑːkɪt/", meaning: "①市场②集市③商场④市面", example: "The local market is bustling with people in the morning.", group: 12 },
            { word: "product", phonetic: "/ˈprɒdʌkt/", meaning: "①产品②产物③乘积④成果", example: "The company\'s new product has won wide recognition from consumers.", group: 12 },
            { word: "service", phonetic: "/ˈsɜːvɪs/", meaning: "①服务②效劳③服务质量④公共服务", example: "Good after-sales service enhances customer loyalty.", group: 12 },
            { word: "payment", phonetic: "/ˈpeɪmənt/", meaning: "①支付②付款③报酬④支付方式", example: "Online payment has become a common way of consumption.", group: 12 },
            { word: "cost", phonetic: "/kɒst/", meaning: "①成本②费用③花费④代价", example: "The cost of living in this city is relatively moderate.", group: 12 },
            { word: "budget", phonetic: "/ˈbʌdʒɪt/", meaning: "①预算②预算案③安排④规划", example: "Making a monthly budget helps control unnecessary expenses.", group: 12 },
            { word: "sale", phonetic: "/seɪl/", meaning: "①销售②出售③促销④拍卖", example: "Many stores hold big sales during festivals to attract customers.", group: 12 },
            { word: "discount", phonetic: "/ˈdɪskaʊnt/", meaning: "①折扣②打折③贴现④减价", example: "Members can enjoy a 20% discount in this shop.", group: 12 },
        ],
        // 第13组
        13: [
            { word: "brand", phonetic: "/brænd/", meaning: "①品牌②商标③打烙印④定性", example: "This brand is famous for its high quality and good reputation.", group: 13 },
            { word: "store", phonetic: "/stɔː/", meaning: "①商店②储存③储备④店铺", example: "There is a convenience store near my neighborhood.", group: 13 },
            { word: "retail", phonetic: "/ˈriːteɪl/", meaning: "①零售②零售业务③以零售方式", example: "Retail sales have increased significantly during the holiday season.", group: 13 },
            { word: "marketplace", phonetic: "/ˈmɑːkɪtpleɪs/", meaning: "①市场②集市③交易平台④商场", example: "The online marketplace provides a platform for small businesses.", group: 13 },
            { word: "bill", phonetic: "/bɪl/", meaning: "①账单②钞票③法案④开账单", example: "Please check the bill carefully before paying.", group: 13 },
            { word: "cash", phonetic: "/kæʃ/", meaning: "①现金②现款③兑现④现金的", example: "Some small shops only accept cash payment.", group: 13 },
            { word: "receipt", phonetic: "/rɪˈsiːt/", meaning: "①收据②收条③接收④收到", example: "Keep the receipt in case you need to return the product.", group: 13 },
            { word: "talk", phonetic: "/tɔːk/", meaning: "①谈话②谈论③讲话④交谈", example: "We had a detailed talk about the project plan yesterday.", group: 13 },
            { word: "speak", phonetic: "/spiːk/", meaning: "①说②讲③发言④演讲⑤说话", example: "She can speak three languages fluently, which is a great advantage.", group: 13 },
            { word: "listen", phonetic: "/ˈlɪsn/", meaning: "①听②倾听③听从④留心听", example: "Listening carefully is the basis of effective communication.", group: 13 },
        ],
        // 第14组
        14: [
            { word: "say", phonetic: "/seɪ/", meaning: "①说②讲③表明④声称⑤说过", example: "He said he would help me review English grammar.", group: 14 },
            { word: "tell", phonetic: "/tel/", meaning: "①告诉②讲述③分辨④吩咐⑤说明", example: "My teacher told me some useful exam skills.", group: 14 },
            { word: "communicate", phonetic: "/kəˈmjuːnɪkeɪt/", meaning: "①交流②沟通③通讯④传达⑤互通信息", example: "People use various ways to communicate with each other.", group: 14 },
            { word: "discuss", phonetic: "/dɪˈskʌs/", meaning: "①讨论②商议③探讨④议论⑤商讨", example: "The group will discuss the problem and find a solution.", group: 14 },
            { word: "describe", phonetic: "/dɪˈskraɪb/", meaning: "①描述②形容③描绘④刻画", example: "Can you describe the main content of the article briefly?", group: 14 },
            { word: "explain", phonetic: "/ɪkˈspleɪn/", meaning: "①解释②说明③阐明④讲解⑤说明原因", example: "The professor explained the complex theory in simple terms.", group: 14 },
            { word: "introduce", phonetic: "/ˌɪntrəˈdjuːs/", meaning: "①介绍②引入③引进④提出⑤引荐", example: "He introduced his research results at the academic conference.", group: 14 },
            { word: "reply", phonetic: "/rɪˈplaɪ/", meaning: "①回复②答复③回应④回答", example: "Please reply to the email as soon as possible.", group: 14 },
            { word: "answer", phonetic: "/ˈɑːnsə/", meaning: "①回答②答复③答案④回应⑤解答", example: "She answered all the interview questions confidently.", group: 14 },
            { word: "ask", phonetic: "/ɑːsk/", meaning: "①问②询问③要求④请求⑤邀请", example: "Don\'t hesitate to ask for help when you encounter difficulties.", group: 14 },
        ],
        // 第15组
        15: [
            { word: "chat", phonetic: "/tʃæt/", meaning: "①聊天②闲谈③闲聊④交谈", example: "They often chat online to share study experience.", group: 15 },
            { word: "negotiate", phonetic: "/nɪˈgəʊʃieɪt/", meaning: "①谈判②协商③交涉④商议", example: "Both parties need to negotiate to reach an agreement.", group: 15 },
            { word: "argue", phonetic: "/ˈɑːgjuː/", meaning: "①争论②争辩③主张④论证⑤争吵", example: "It\'s useless to argue about trivial matters.", group: 15 },
            { word: "persuade", phonetic: "/pəˈsweɪd/", meaning: "①说服②劝说③劝导④使信服", example: "She tried to persuade her parents to support her study plan.", group: 15 },
            { word: "remind", phonetic: "/rɪˈmaɪnd/", meaning: "①提醒②使想起③提示④告诫", example: "Please remind me to submit the assignment on time.", group: 15 },
            { word: "inform", phonetic: "/ɪnˈfɔːm/", meaning: "①通知②告知③报告④使了解", example: "The company informed employees of the new rules in advance.", group: 15 },
            { word: "complain", phonetic: "/kəmˈpleɪn/", meaning: "①抱怨②投诉③诉苦④发牢骚", example: "Some customers complained about the poor service.", group: 15 },
            { word: "go", phonetic: "/gəʊ/", meaning: "①去②走③前往④变成⑤离开", example: "We will go to the library to study this weekend.", group: 15 },
            { word: "come", phonetic: "/kʌm/", meaning: "①来②来到③出现④变成⑤抵达", example: "Please come to my office if you have any questions.", group: 15 },
            { word: "walk", phonetic: "/wɔːk/", meaning: "①走②步行③散步④行走⑤遛", example: "Walking for 30 minutes every day is good for health.", group: 15 },
        ],
        // 第16组
        16: [
            { word: "run", phonetic: "/rʌn/", meaning: "①跑②奔跑③运行④经营⑤跑步", example: "He runs fast and won the first prize in the school sports meeting.", group: 16 },
            { word: "jump", phonetic: "/dʒʌmp/", meaning: "①跳②跳跃③跳起④猛增⑤跳过", example: "The children were jumping happily on the grass.", group: 16 },
            { word: "climb", phonetic: "/klaɪm/", meaning: "①爬②攀登③攀爬④上升⑤登山", example: "We plan to climb the mountain this Sunday if the weather permits.", group: 16 },
            { word: "fly", phonetic: "/flaɪ/", meaning: "①飞②飞行③乘飞机④飘扬⑤飞逝", example: "The plane flies from Beijing to Shanghai in two hours.", group: 16 },
            { word: "drive", phonetic: "/draɪv/", meaning: "①驾驶②开车③驱使④推动⑤驾车", example: "He drives carefully and has never had a traffic accident.", group: 16 },
            { word: "ride", phonetic: "/raɪd/", meaning: "①骑②乘坐③搭乘④骑车⑤骑马", example: "She rides a bicycle to work every day to save time.", group: 16 },
            { word: "move", phonetic: "/muːv/", meaning: "①移动②搬动③搬家④行动⑤感动", example: "They moved to a new apartment near the company.", group: 16 },
            { word: "travel", phonetic: "/ˈtrævl/", meaning: "①旅行②游历③出行④传播⑤移动", example: "Traveling can broaden our horizons and enrich experience.", group: 16 },
            { word: "arrive", phonetic: "/əˈraɪv/", meaning: "①到达②抵达③来临④达到", example: "We arrived at the meeting room five minutes early.", group: 16 },
            { word: "leave", phonetic: "/liːv/", meaning: "①离开②出发③留下④丢下⑤舍弃", example: "Please leave your phone number so that we can contact you.", group: 16 },
        ],
        // 第17组
        17: [
            { word: "return", phonetic: "/rɪˈtɜːn/", meaning: "①返回②归还③回来④恢复⑤退回", example: "He returned home after finishing his studies abroad.", group: 17 },
            { word: "follow", phonetic: "/ˈfɒləʊ/", meaning: "①跟随②遵循③理解④接着⑤跟随者", example: "Follow the guide and you won\'t get lost in the scenic area.", group: 17 },
            { word: "lead", phonetic: "/liːd/", meaning: "①领导②导致③领先④线索⑤带领", example: "She led the team to complete the difficult task successfully.", group: 17 },
            { word: "cross", phonetic: "/krɒs/", meaning: "①横穿②交叉③十字架④生气的⑤越过", example: "Please cross the road at the zebra crossing.", group: 17 },
            { word: "pass", phonetic: "/pɑːs/", meaning: "①通过②经过③传递④及格⑤度过", example: "The bus passed through the city center and headed for the suburbs.", group: 17 },
            { word: "enter", phonetic: "/ˈentə/", meaning: "①进入②加入③参加④录入⑤进入者", example: "All visitors must show their ID cards to enter the building.", group: 17 },
            { word: "exit", phonetic: "/ˈeksɪt/", meaning: "①退出②出口③离去④退场⑤离开", example: "Please find the emergency exit before the meeting starts.", group: 17 },
            { word: "eat", phonetic: "/iːt/", meaning: "①吃②进食③用餐④吞噬⑤吃饭", example: "We usually eat dinner with family at 7 o\'clock in the evening.", group: 17 },
            { word: "drink", phonetic: "/drɪŋk/", meaning: "①喝②饮用③喝酒④饮品⑤喝下去", example: "It\'s important to drink enough water every day.", group: 17 },
            { word: "cook", phonetic: "/kʊk/", meaning: "①烹饪②做饭③煮④烧⑤厨师", example: "My mother likes to cook delicious food for us on weekends.", group: 17 },
        ],
        // 第18组
        18: [
            { word: "taste", phonetic: "/teɪst/", meaning: "①品尝②有味道③味道④品味⑤尝起来", example: "This dish tastes delicious and is popular among guests.", group: 18 },
            { word: "chew", phonetic: "/tʃuː/", meaning: "①咀嚼②嚼碎③深思④嚼", example: "Chew your food slowly to aid digestion.", group: 18 },
            { word: "swallow", phonetic: "/ˈswɒləʊ/", meaning: "①吞咽②咽下③忍受④吞没", example: "It\'s hard to swallow dry bread without drinking water.", group: 18 },
            { word: "bite", phonetic: "/baɪt/", meaning: "①咬②叮咬③咬住④刺痛⑤咬痕", example: "Be careful not to bite your tongue when eating.", group: 18 },
            { word: "sip", phonetic: "/sɪp/", meaning: "①小口喝②抿③呷④小口啜饮", example: "She sipped the coffee and enjoyed the quiet afternoon.", group: 18 },
            { word: "feast", phonetic: "/fiːst/", meaning: "①盛宴②享用③宴请④节日", example: "They feasted on delicious food at the family reunion.", group: 18 },
            { word: "hunger", phonetic: "/ˈhʌŋgə/", meaning: "①饥饿②渴望③饥荒④渴求", example: "After a long day\'s work, he felt very hungry.", group: 18 },
            { word: "thirsty", phonetic: "/ˈθɜːsti/", meaning: "①口渴的②渴望的③干渴的", example: "Drinking water can relieve thirst quickly.", group: 18 },
            { word: "feed", phonetic: "/fiːd/", meaning: "①喂养②供给③助长④喂食⑤养活", example: "She feeds her pet dog twice a day regularly.", group: 18 },
            { word: "dining", phonetic: "/ˈdaɪnɪŋ/", meaning: "①进餐②用餐③就餐④餐饮的", example: "The dining hall provides a variety of nutritious meals.", group: 18 },
        ],
        // 第19组
        19: [
            { word: "breakfast", phonetic: "/ˈbrekfəst/", meaning: "①早餐②早饭③吃早餐", example: "Having a healthy breakfast is good for physical health.", group: 19 },
            { word: "lunch", phonetic: "/lʌntʃ/", meaning: "①午餐②午饭③吃午餐", example: "We usually have lunch in the company cafeteria.", group: 19 },
            { word: "dinner", phonetic: "/ˈdɪnə/", meaning: "①晚餐②晚宴③正餐④吃晚餐", example: "They invited friends to dinner to celebrate their achievement.", group: 19 },
            { word: "snack", phonetic: "/snæk/", meaning: "①小吃②零食③点心④吃零食", example: "Eating too many snacks is not good for dinner appetite.", group: 19 },
            { word: "picnic", phonetic: "/ˈpɪknɪk/", meaning: "①野餐②郊游③去野餐④野餐的", example: "We had a wonderful picnic in the park last Saturday.", group: 19 },
            { word: "barbecue", phonetic: "/ˈbɑːbɪkjuː/", meaning: "①烧烤②烤肉③烧烤聚会④烤", example: "They held a barbecue party with friends on the weekend.", group: 19 },
            { word: "diet", phonetic: "/ˈdaɪət/", meaning: "①饮食②节食③食谱④规定饮食", example: "She keeps a balanced diet to maintain a healthy figure.", group: 19 },
            { word: "think", phonetic: "/θɪŋk/", meaning: "①想②认为③思考④考虑⑤思索", example: "I need to think carefully before making an important decision.", group: 19 },
            { word: "know", phonetic: "/nəʊ/", meaning: "①知道②了解③认识④懂得⑤知晓", example: "He knows a lot about history and culture.", group: 19 },
            { word: "understand", phonetic: "/ˌʌndəˈstænd/", meaning: "①理解②明白③懂得④了解⑤领会", example: "It takes time to understand different perspectives.", group: 19 },
        ],
        // 第20组
        20: [
            { word: "remember", phonetic: "/rɪˈmembə/", meaning: "①记得②记住③想起④牢记⑤纪念", example: "I can\'t remember his phone number clearly.", group: 20 },
            { word: "forget", phonetic: "/fəˈget/", meaning: "①忘记②遗忘③忽略④忘掉⑤不记得", example: "Don\'t forget to bring your ID card to the exam.", group: 20 },
            { word: "believe", phonetic: "/bɪˈliːv/", meaning: "①相信②认为③信任④信奉⑤觉得", example: "I believe that hard work will pay off in the end.", group: 20 },
            { word: "doubt", phonetic: "/daʊt/", meaning: "①怀疑②疑惑③质疑④不信④疑虑", example: "He doubted whether the plan was feasible.", group: 20 },
            { word: "guess", phonetic: "/ges/", meaning: "①猜测②猜想③推测④猜中⑤估计", example: "Can you guess the meaning of this new word?", group: 20 },
            { word: "consider", phonetic: "/kənˈsɪdə/", meaning: "①考虑②认为③顾及④思量⑤研究", example: "We need to consider all possible risks before starting the project.", group: 20 },
            { word: "decide", phonetic: "/dɪˈsaɪd/", meaning: "①决定②裁决③判定④选定⑤下决心", example: "She decided to pursue a master\'s degree after graduation.", group: 20 },
            { word: "plan", phonetic: "/plæn/", meaning: "①计划②打算③规划④策划⑤方案", example: "They are planning a trip to the countryside next month.", group: 20 },
            { word: "hope", phonetic: "/həʊp/", meaning: "①希望②期望③盼望④奢望⑤希望做", example: "We hope to complete the task ahead of schedule.", group: 20 },
            { word: "expect", phonetic: "/ɪkˈspekt/", meaning: "①期待②预期③盼望④预料⑤指望", example: "The company expects employees to work efficiently.", group: 20 },
        ],
        // 第21组
        21: [
            { word: "imagine", phonetic: "/ɪˈmædʒɪn/", meaning: "①想象②设想③猜想④假想⑤设想", example: "It\'s hard to imagine life without modern technology.", group: 21 },
            { word: "realize", phonetic: "/ˈriːəlaɪz/", meaning: "①意识到②实现③认识到④领会⑤明白", example: "He finally realized his mistake and apologized.", group: 21 },
            { word: "recognize", phonetic: "/ˈrekəgnaɪz/", meaning: "①认出②识别③承认④认可⑤意识到", example: "She recognized her old classmate in the crowd.", group: 21 },
            { word: "conclude", phonetic: "/kənˈkluːd/", meaning: "①得出结论②结束③推断④缔结⑤断定", example: "We can conclude the meeting with a positive result.", group: 21 },
            { word: "analyze", phonetic: "/ˈænəlaɪz/", meaning: "①分析②解析③剖析④研究⑤分解", example: "The expert analyzed the problem from multiple angles.", group: 21 },
            { word: "judge", phonetic: "/dʒʌdʒ/", meaning: "①判断②评判③法官④裁判⑤断定", example: "It\'s not fair to judge a person by their appearance.", group: 21 },
            { word: "happy", phonetic: "/ˈhæpi/", meaning: "①快乐的②幸福的③开心的④愉快的", example: "She felt happy when she received the admission notice.", group: 21 },
            { word: "glad", phonetic: "/glæd/", meaning: "①高兴的②乐意的③开心的④欣喜的", example: "I\'m glad to help you with your English study.", group: 21 },
            { word: "excited", phonetic: "/ɪkˈsaɪtɪd/", meaning: "①兴奋的②激动的③激昂的④亢奋的", example: "They are excited about the upcoming academic exchange.", group: 21 },
            { word: "proud", phonetic: "/praʊd/", meaning: "①骄傲的②自豪的③得意的④高傲的", example: "Parents are proud of their children\'s achievements.", group: 21 },
        ],
        // 第22组
        22: [
            { word: "grateful", phonetic: "/ˈgreɪtfəl/", meaning: "①感激的②感谢的③感恩的④领情的", example: "I\'m grateful to my teachers for their guidance over the years.", group: 22 },
            { word: "satisfied", phonetic: "/ˈsætɪsfaɪd/", meaning: "①满意的②满足的③称心的④如愿的", example: "He is satisfied with his performance in the exam.", group: 22 },
            { word: "joyful", phonetic: "/ˈdʒɔɪfl/", meaning: "①快乐的②愉悦的③欢欣的④喜气洋洋的", example: "The joyful atmosphere infected everyone at the party.", group: 22 },
            { word: "cheerful", phonetic: "/ˈtʃɪəfl/", meaning: "①愉快的②开朗的③欢快的④兴高采烈的", example: "She is always cheerful and brings positive energy to others.", group: 22 },
            { word: "hopeful", phonetic: "/ˈhəʊpfl/", meaning: "①有希望的②充满希望的③乐观的④抱有希望的", example: "We are hopeful about the future development of the project.", group: 22 },
            { word: "delighted", phonetic: "/dɪˈlaɪtɪd/", meaning: "①高兴的②愉快的③欣喜的④快乐的", example: "He was delighted to hear the good news.", group: 22 },
            { word: "enthusiastic", phonetic: "/ɪnˌθjuːziˈæstɪk/", meaning: "①热情的②热心的③热忱的④热衷的", example: "She is enthusiastic about volunteer work.", group: 22 },
            { word: "optimistic", phonetic: "/ˌɒptɪˈmɪstɪk/", meaning: "①乐观的②乐观主义的③积极的", example: "Being optimistic helps overcome difficulties easily.", group: 22 },
            { word: "positive", phonetic: "/ˈpɒzətɪv/", meaning: "①积极的②确定的③阳性的④正数的⑤肯定的", example: "Maintain a positive attitude towards life and work.", group: 22 },
            { word: "confident", phonetic: "/ˈkɒnfɪdənt/", meaning: "①自信的②有信心的③确信的④有把握的", example: "She is confident in passing the postgraduate exam.", group: 22 },
        ],
        // 第23组
        23: [
            { word: "pleasant", phonetic: "/ˈpleznt/", meaning: "①愉快的②舒适的③宜人的④讨人喜欢的", example: "We had a pleasant conversation with the professor.", group: 23 },
            { word: "sad", phonetic: "/sæd/", meaning: "①悲伤的②难过的③悲哀的④令人伤心的", example: "She was sad when she heard the bad news.", group: 23 },
            { word: "angry", phonetic: "/ˈæŋgri/", meaning: "①生气的②愤怒的③恼火的④发怒的", example: "Many people are angry about the unfair treatment.", group: 23 },
            { word: "worried", phonetic: "/ˈwʌrɪd/", meaning: "①担心的②担忧的③发愁的④焦虑的", example: "My parents are worried about my safety when I travel alone.", group: 23 },
            { word: "afraid", phonetic: "/əˈfreɪd/", meaning: "①害怕的②畏惧的③担心的④恐怕", example: "Some children are afraid of the dark.", group: 23 },
            { word: "disappointed", phonetic: "/ˌdɪsəˈpɔɪntɪd/", meaning: "①失望的②沮丧的③失意的④受挫的", example: "He was disappointed when he didn\'t get the expected result.", group: 23 },
            { word: "tired", phonetic: "/ˈtaɪəd/", meaning: "①疲惫的②厌倦的③累的④疲劳的", example: "I feel tired after a whole day\'s study.", group: 23 },
            { word: "anxious", phonetic: "/ˈæŋkʃəs/", meaning: "①焦虑的②担忧的③急切的④渴望的", example: "She is anxious about the exam results.", group: 23 },
            { word: "depressed", phonetic: "/dɪˈprest/", meaning: "①沮丧的②抑郁的③消沉的④郁闷的", example: "Long-term pressure may make people depressed.", group: 23 },
            { word: "frustrated", phonetic: "/frʌˈstreɪtɪd/", meaning: "①沮丧的②受挫的③失意的④懊恼的", example: "He felt frustrated when he failed the experiment.", group: 23 },
        ],
        // 第24组
        24: [
            { word: "annoyed", phonetic: "/əˈnɔɪd/", meaning: "①恼怒的②厌烦的③恼火的④生气的", example: "She was annoyed by the noise from the next room.", group: 24 },
            { word: "bored", phonetic: "/bɔːd/", meaning: "①无聊的②厌烦的③乏味的④无趣的", example: "He felt bored during the long meeting.", group: 24 },
            { word: "upset", phonetic: "/ʌpˈset/", meaning: "①心烦的②沮丧的③难过的④弄翻的", example: "The bad weather upset their travel plan.", group: 24 },
            { word: "nervous", phonetic: "/ˈnɜːvəs/", meaning: "①紧张的②焦虑的③神经质的④不安的", example: "She felt nervous before the important interview.", group: 24 },
            { word: "ashamed", phonetic: "/əˈʃeɪmd/", meaning: "①羞愧的②惭愧的③难为情的④内疚的", example: "He felt ashamed of his mistake in the work.", group: 24 },
            { word: "guilty", phonetic: "/ˈgɪlti/", meaning: "①有罪的②愧疚的③内疚的④有罪责的", example: "She felt guilty for not keeping her promise.", group: 24 },
            { word: "calm", phonetic: "/kɑːm/", meaning: "①平静的②冷静的③安抚④宁静⑤沉着的", example: "She tried to stay calm in the face of emergencies.", group: 24 },
            { word: "patient", phonetic: "/ˈpeɪʃnt/", meaning: "①有耐心的②病人③能忍受的④耐心的", example: "Being patient is important when learning a new language.", group: 24 },
            { word: "careful", phonetic: "/ˈkeəfl/", meaning: "①小心的②仔细的③谨慎的④周密的", example: "Please be careful when handling important documents.", group: 24 },
            { word: "brave", phonetic: "/breɪv/", meaning: "①勇敢的②英勇的③无畏的④大胆的", example: "It\'s brave of her to speak up for the truth.", group: 24 },
        ],
        // 第25组
        25: [
            { word: "honest", phonetic: "/ˈɒnɪst/", meaning: "①诚实的②正直的③坦诚的④老实的", example: "An honest person is always trusted by others.", group: 25 },
            { word: "polite", phonetic: "/pəˈlaɪt/", meaning: "①礼貌的②客气的③文雅的④彬彬有礼的", example: "Being polite is a basic social etiquette.", group: 25 },
            { word: "modest", phonetic: "/ˈmɒdɪst/", meaning: "①谦虚的②谦逊的③适度的④适中的", example: "He is modest about his achievements.", group: 25 },
            { word: "sincere", phonetic: "/sɪnˈsɪə/", meaning: "①真诚的②诚挚的③诚恳的④真挚的", example: "She expressed her sincere thanks to the helpers.", group: 25 },
            { word: "cautious", phonetic: "/ˈkɔːʃəs/", meaning: "①谨慎的②小心的③慎重的④审慎的", example: "We need to be cautious when making important decisions.", group: 25 },
            { word: "reasonable", phonetic: "/ˈriːznəbl/", meaning: "①合理的②有理的③公道的④明智的", example: "His request is reasonable and acceptable.", group: 25 },
            { word: "practical", phonetic: "/ˈpræktɪkl/", meaning: "①实际的②实用的③务实的④可行的", example: "This method is practical and easy to operate.", group: 25 },
            { word: "realistic", phonetic: "/ˌrɪəˈlɪstɪk/", meaning: "①现实的②实际的③实事求是的④逼真的", example: "We should set realistic goals for ourselves.", group: 25 },
            { word: "flexible", phonetic: "/ˈfleksəbl/", meaning: "①灵活的②柔韧的③易变通的④弹性的", example: "Being flexible helps adapt to different environments.", group: 25 },
            { word: "independent", phonetic: "/ˌɪndɪˈpendənt/", meaning: "①独立的②自主的③自立的④不相关的", example: "She is independent and can handle problems alone.", group: 25 },
        ],
        // 第26组
        26: [
            { word: "responsible", phonetic: "/rɪˈspɒnsəbl/", meaning: "①负责任的②有责任的③尽责的④承担责任的", example: "A responsible person takes his work seriously.", group: 26 },
            { word: "kind", phonetic: "/kaɪnd/", meaning: "①友善的②种类③亲切的④仁慈的", example: "She is a kind person who always helps those in need.", group: 26 },
            { word: "friendly", phonetic: "/ˈfrendli/", meaning: "①友好的②友善的③亲切的④友谊的", example: "The new neighbor is friendly and easy to get along with.", group: 26 },
            { word: "smart", phonetic: "/smɑːt/", meaning: "①聪明的②得体的③智能的④机灵的", example: "He is a smart student who solves problems quickly.", group: 26 },
            { word: "honest", phonetic: "/ˈɒnɪst/", meaning: "①诚实的②正直的③坦诚的④老实的", example: "Honest people are respected in any society.", group: 26 },
            { word: "brave", phonetic: "/breɪv/", meaning: "①勇敢的②英勇的③无畏的④大胆的", example: "It\'s brave of him to save the child from danger.", group: 26 },
            { word: "patient", phonetic: "/ˈpeɪʃnt/", meaning: "①有耐心的②病人③能忍受的④耐心的", example: "Patient teachers are popular among students.", group: 26 },
            { word: "careful", phonetic: "/ˈkeəfl/", meaning: "①小心的②仔细的③谨慎的④周密的", example: "Careful people make fewer mistakes in work.", group: 26 },
            { word: "confident", phonetic: "/ˈkɒnfɪdənt/", meaning: "①自信的②有信心的③确信的④有把握的", example: "Confident people can show their strengths better.", group: 26 },
            { word: "outgoing", phonetic: "/ˈaʊtgəʊɪŋ/", meaning: "①外向的②开朗的③外出的④即将离职的", example: "Outgoing people are good at making friends.", group: 26 },
        ],
        // 第27组
        27: [
            { word: "quiet", phonetic: "/ˈkwaɪət/", meaning: "①安静的②平静的③寂静④使安静⑤沉默的", example: "She is a quiet girl who likes reading in her spare time.", group: 27 },
            { word: "hardworking", phonetic: "/ˈhɑːdˌwɜːkɪŋ/", meaning: "①勤奋的②努力的③勤劳的④苦干的", example: "Hardworking people are more likely to succeed.", group: 27 },
            { word: "intelligent", phonetic: "/ɪnˈtelɪdʒənt/", meaning: "①聪明的②智能的③有才智的④悟性高的", example: "Intelligent people learn new things quickly.", group: 27 },
            { word: "creative", phonetic: "/kriˈeɪtɪv/", meaning: "①有创造力的②创造性的③创意的④独创的", example: "Creative thinking is needed in design work.", group: 27 },
            { word: "reliable", phonetic: "/rɪˈlaɪəbl/", meaning: "①可靠的②可信赖的③稳妥的④可靠的人", example: "He is a reliable colleague who can be trusted.", group: 27 },
            { word: "humorous", phonetic: "/ˈhjuːmərəs/", meaning: "①幽默的②风趣的③诙谐的④有幽默感的", example: "Humorous people can make the atmosphere lively.", group: 27 },
            { word: "generous", phonetic: "/ˈdʒenərəs/", meaning: "①慷慨的②大方的③丰盛的④宽宏大量的", example: "She is generous and likes to share with others.", group: 27 },
            { word: "modest", phonetic: "/ˈmɒdɪst/", meaning: "①谦虚的②谦逊的③适度的④适中的", example: "Modest people are always willing to learn from others.", group: 27 },
            { word: "sincere", phonetic: "/sɪnˈsɪə/", meaning: "①真诚的②诚挚的③诚恳的④真挚的", example: "Sincere communication helps build good relationships.", group: 27 },
            { word: "independent", phonetic: "/ˌɪndɪˈpendənt/", meaning: "①独立的②自主的③自立的④不相关的", example: "Independent individuals can take care of themselves.", group: 27 },
        ],
        // 第28组
        28: [
            { word: "responsible", phonetic: "/rɪˈspɒnsəbl/", meaning: "①负责任的②有责任的③尽责的④承担责任的", example: "Responsible employees are valued by employers.", group: 28 },
            { word: "big", phonetic: "/bɪg/", meaning: "①大的②巨大的③重要的④年龄大的", example: "There is a big garden behind the building.", group: 28 },
            { word: "small", phonetic: "/smɔːl/", meaning: "①小的②微小的③少的④不重要的", example: "She bought a small gift for her friend\'s birthday.", group: 28 },
            { word: "new", phonetic: "/njuː/", meaning: "①新的②崭新的③陌生的④新近的", example: "The company launched a new product this year.", group: 28 },
            { word: "old", phonetic: "/əʊld/", meaning: "①老的②旧的③年长的④古老的", example: "This old building has a history of over 100 years.", group: 28 },
            { word: "good", phonetic: "/gʊd/", meaning: "①好的②优良的③有益的④擅长的", example: "This book provides good advice on English learning.", group: 28 },
            { word: "bad", phonetic: "/bæd/", meaning: "①坏的②糟糕的③有害的④严重的", example: "Bad weather may affect the outdoor activity.", group: 28 },
            { word: "great", phonetic: "/greɪt/", meaning: "①伟大的②极好的③巨大的④重要的", example: "He made great progress in his professional skills.", group: 28 },
            { word: "wonderful", phonetic: "/ˈwʌndəfl/", meaning: "①极好的②精彩的③绝妙的④令人惊叹的", example: "We had a wonderful time at the party.", group: 28 },
            { word: "beautiful", phonetic: "/ˈbjuːtɪfl/", meaning: "①美丽的②漂亮的③出色的④美好的", example: "The beautiful scenery attracted many tourists.", group: 28 },
        ],
        // 第29组
        29: [
            { word: "ugly", phonetic: "/ˈʌgli/", meaning: "①丑陋的②难看的③令人不快的④险恶的", example: "No one likes ugly and rude behavior.", group: 29 },
            { word: "clean", phonetic: "/kliːn/", meaning: "①干净的②清洁的③打扫④清白的", example: "Keeping the study environment clean helps improve efficiency.", group: 29 },
            { word: "dirty", phonetic: "/ˈdɜːti/", meaning: "①脏的②肮脏的③卑鄙的④弄脏", example: "The dirty water is harmful to the environment.", group: 29 },
            { word: "bright", phonetic: "/braɪt/", meaning: "①明亮的②聪明的③鲜艳的④光明的", example: "The bright room makes people feel comfortable.", group: 29 },
            { word: "dark", phonetic: "/dɑːk/", meaning: "①黑暗的②深色的③阴沉的④模糊的", example: "It\'s too dark to read without turning on the light.", group: 29 },
            { word: "heavy", phonetic: "/ˈhevi/", meaning: "①重的②沉重的③大量的④繁重的", example: "Carrying heavy bags for a long time is tiring.", group: 29 },
            { word: "light", phonetic: "/laɪt/", meaning: "①轻的②明亮的③光④点燃⑤浅的", example: "Light clothing is suitable for summer wear.", group: 29 },
            { word: "long", phonetic: "/lɒŋ/", meaning: "①长的②长久的③漫长的④渴望", example: "The long holiday gives us time to relax and study.", group: 29 },
            { word: "short", phonetic: "/ʃɔːt/", meaning: "①短的②矮的③短缺的④短期的", example: "The short break helps relieve study pressure.", group: 29 },
            { word: "tall", phonetic: "/tɔːl/", meaning: "①高的②高大的③修长的④", example: "Tall buildings are common in big cities.", group: 29 },
        ],
        // 第30组
        30: [
            { word: "short", phonetic: "/ʃɔːt/", meaning: "①矮的②短的③短缺的④短期的", example: "He is short but very energetic.", group: 30 },
            { word: "wide", phonetic: "/waɪd/", meaning: "①宽的②广泛的③广阔的④睁大的", example: "The wide road reduces traffic congestion.", group: 30 },
            { word: "narrow", phonetic: "/ˈnærəʊ/", meaning: "①窄的②狭窄的③有限的④狭隘的", example: "The narrow street is full of local characteristics.", group: 30 },
            { word: "high", phonetic: "/haɪ/", meaning: "①高的②高级的③高度的④高音的", example: "The high temperature makes people feel uncomfortable.", group: 30 },
            { word: "low", phonetic: "/ləʊ/", meaning: "①低的②矮的③低落的④低声的", example: "The low price of this book makes it popular among students.", group: 30 },
            { word: "thick", phonetic: "/θɪk/", meaning: "①厚的②浓的③密的④粗的", example: "The thick book contains a lot of useful knowledge.", group: 30 },
            { word: "thin", phonetic: "/θɪn/", meaning: "①薄的②瘦的③细的④稀疏的", example: "Thin air at high altitudes is not good for health.", group: 30 },
            { word: "hot", phonetic: "/hɒt/", meaning: "①热的②辣的③热门的④激动的", example: "Hot weather may affect people\'s learning efficiency.", group: 30 },
            { word: "cold", phonetic: "/kəʊld/", meaning: "①冷的②寒冷的③冷淡的④感冒", example: "Wearing warm clothes can prevent catching a cold.", group: 30 },
            { word: "warm", phonetic: "/wɔːm/", meaning: "①温暖的②暖和的③热情的④变暖", example: "The warm sunshine makes people feel relaxed.", group: 30 },
        ],
        // 第31组
        31: [
            { word: "cool", phonetic: "/kuːl/", meaning: "①凉爽的②冷静的③酷的④降温", example: "Cool weather is suitable for outdoor study activities.", group: 31 },
            { word: "wet", phonetic: "/wet/", meaning: "①湿的②潮湿的③下雨的④弄湿", example: "The wet ground is easy to slip on, so be careful.", group: 31 },
            { word: "dry", phonetic: "/draɪ/", meaning: "①干的②干燥的③干旱的④擦干", example: "Dry weather may cause skin problems.", group: 31 },
            { word: "soft", phonetic: "/sɒft/", meaning: "①软的②柔软的③温和的④柔和的", example: "The soft chair is comfortable for reading.", group: 31 },
            { word: "hard", phonetic: "/hɑːd/", meaning: "①硬的②坚硬的③困难的④努力的", example: "Hard work is the key to passing the exam.", group: 31 },
            { word: "smooth", phonetic: "/smuːð/", meaning: "①光滑的②顺利的③平稳的④流畅的", example: "The smooth communication promotes cooperation.", group: 31 },
            { word: "rough", phonetic: "/rʌf/", meaning: "①粗糙的②粗略的③粗暴的④崎岖的", example: "The rough paper is not suitable for writing.", group: 31 },
            { word: "sweet", phonetic: "/swiːt/", meaning: "①甜的②甜蜜的③可爱的④悦耳的", example: "Sweet fruits are good for health.", group: 31 },
            { word: "sour", phonetic: "/ˈsaʊə/", meaning: "①酸的②酸味的③尖酸的④酸痛的", example: "Sour taste can stimulate appetite.", group: 31 },
            { word: "bitter", phonetic: "/ˈbɪtə/", meaning: "①苦的②痛苦的③苦涩的④严寒的", example: "Bitter medicine is good for the illness.", group: 31 },
        ],
        // 第32组
        32: [
            { word: "salty", phonetic: "/ˈsɔːlti/", meaning: "①咸的②含盐的③咸涩的", example: "Eating too much salty food is bad for health.", group: 32 },
            { word: "spicy", phonetic: "/ˈspaɪsi/", meaning: "①辣的②辛辣的③刺激的", example: "Spicy food is popular in some regions.", group: 32 },
            { word: "fresh", phonetic: "/freʃ/", meaning: "①新鲜的②清新的③新颖的④鲜活的", example: "Fresh air is good for physical and mental health.", group: 32 },
            { word: "stale", phonetic: "/steɪl/", meaning: "①不新鲜的②陈旧的③乏味的④失效的", example: "Stale food is harmful to the body.", group: 32 },
            { word: "strong", phonetic: "/strɒŋ/", meaning: "①强壮的②强烈的③坚固的④有力的", example: "Strong willpower helps overcome difficulties in learning.", group: 32 },
            { word: "weak", phonetic: "/wiːk/", meaning: "①虚弱的②软弱的③薄弱的④差的", example: "Weak memory can be improved by regular practice.", group: 32 },
            { word: "fast", phonetic: "/fɑːst/", meaning: "①快的②迅速的③快速的④禁食", example: "Fast reading is an important skill in the exam.", group: 32 },
            { word: "slow", phonetic: "/sləʊ/", meaning: "①慢的②缓慢的③迟钝的④放慢", example: "Slow reading helps understand the article more deeply.", group: 32 },
            { word: "easy", phonetic: "/ˈiːzi/", meaning: "①容易的②轻松的③简单的④安逸的", example: "This English exercise is easy for most students.", group: 32 },
            { word: "difficult", phonetic: "/ˈdɪfɪkəlt/", meaning: "①困难的②艰难的③难懂的④不易相处的", example: "It\'s difficult to master a foreign language in a short time.", group: 32 },
        ],
        // 第33组
        33: [
            { word: "simple", phonetic: "/ˈsɪmpl/", meaning: "①简单的②单纯的③朴素的④简易的", example: "The teacher explained the rule in simple words.", group: 33 },
            { word: "complex", phonetic: "/ˈkɒmpleks/", meaning: "①复杂的②综合的③复合的④错综复杂的", example: "The complex problem requires in-depth discussion.", group: 33 },
            { word: "clear", phonetic: "/klɪə/", meaning: "①清晰的②清楚的③晴朗的④清除⑤明白的", example: "You need to express your opinions in a clear way.", group: 33 },
            { word: "unclear", phonetic: "/ˌʌnˈklɪə/", meaning: "①不清楚的②模糊的③不明朗的④难以理解的", example: "The reason for the delay is still unclear to us.", group: 33 },
            { word: "loud", phonetic: "/laʊd/", meaning: "①大声的②响亮的③喧闹的④高声地", example: "Please don\'t speak too loud in the library.", group: 33 },
            { word: "quiet", phonetic: "/ˈkwaɪət/", meaning: "①安静的②寂静的③平静的④使安静", example: "The quiet study environment helps concentrate.", group: 33 },
            { word: "noisy", phonetic: "/ˈnɔɪzi/", meaning: "①吵闹的②嘈杂的③喧闹的④充满噪音的", example: "The noisy street outside affects my study.", group: 33 },
            { word: "empty", phonetic: "/ˈempti/", meaning: "①空的②空洞的③空虚的④倒空⑤无意义的", example: "The empty classroom is available for group discussion.", group: 33 },
            { word: "full", phonetic: "/fʊl/", meaning: "①满的②完整的③充分的④充满的⑤饱的", example: "The library is full of students during the exam period.", group: 33 },
            { word: "busy", phonetic: "/ˈbɪzi/", meaning: "①忙碌的②繁忙的③热闹的④使忙碌", example: "She is busy preparing for the postgraduate entrance exam.", group: 33 },
        ],
        // 第34组
        34: [
            { word: "free", phonetic: "/friː/", meaning: "①自由的②免费的③空闲的④释放⑤无拘无束的", example: "I have some free time on weekends to review English.", group: 34 },
            { word: "expensive", phonetic: "/ɪkˈspensɪv/", meaning: "①昂贵的②花钱多的③高价的", example: "The reference book is a little expensive but very useful.", group: 34 },
            { word: "cheap", phonetic: "/tʃiːp/", meaning: "①便宜的②廉价的③劣质的④小气的", example: "This stationery is cheap and of good quality.", group: 34 },
            { word: "valuable", phonetic: "/ˈvæljuəbl/", meaning: "①有价值的②宝贵的③珍贵的④有用的", example: "The professor\'s advice is very valuable for my thesis.", group: 34 },
            { word: "worthless", phonetic: "/ˈwɜːθləs/", meaning: "①无价值的②没用的③不值钱的④无益的", example: "This broken tool is worthless and can be thrown away.", group: 34 },
            { word: "useful", phonetic: "/ˈjuːsfl/", meaning: "①有用的②有益的③实用的④有帮助的", example: "This app is useful for memorizing English words.", group: 34 },
            { word: "useless", phonetic: "/ˈjuːsləs/", meaning: "①无用的②无效的③没出息的④无益的", example: "It\'s useless to cram for the exam at the last minute.", group: 34 },
            { word: "important", phonetic: "/ɪmˈpɔːtnt/", meaning: "①重要的②重大的③有地位的④关键的", example: "It\'s important to review words every day.", group: 34 },
            { word: "unimportant", phonetic: "/ˌʌnɪmˈpɔːtnt/", meaning: "①不重要的②无足轻重的③次要的", example: "Don\'t waste time on unimportant things.", group: 34 },
            { word: "necessary", phonetic: "/ˈnesəsəri/", meaning: "①必要的②必需的③必然的④不可缺少的", example: "It is necessary to do more reading for English learning.", group: 34 },
        ],
        // 第35组
        35: [
            { word: "unnecessary", phonetic: "/ʌnˈnesəsəri/", meaning: "①不必要的②多余的③无用的④无需的", example: "Unnecessary complaints will only affect your mood.", group: 35 },
            { word: "possible", phonetic: "/ˈpɒsəbl/", meaning: "①可能的②潜在的③合理的④可实现的", example: "It is possible to pass the exam with persistent efforts.", group: 35 },
            { word: "impossible", phonetic: "/ɪmˈpɒsəbl/", meaning: "①不可能的②办不到的③难以忍受的④不真实的", example: "Nothing is impossible if you put your heart into it.", group: 35 },
            { word: "common", phonetic: "/ˈkɒmən/", meaning: "①普通的②常见的③共同的④公共的", example: "Spelling mistakes are common in English writing.", group: 35 },
            { word: "rare", phonetic: "/reə/", meaning: "①稀有的②罕见的③珍贵的④稀薄的", example: "This kind of rare plant can only be found in the mountain area.", group: 35 },
            { word: "ordinary", phonetic: "/ˈɔːdnri/", meaning: "①普通的②平常的③平凡的④一般的", example: "He is an ordinary student but studies very hard.", group: 35 },
            { word: "special", phonetic: "/ˈspeʃl/", meaning: "①特别的②特殊的③专门的④特色的⑤特别地", example: "We have a special training for the oral English exam.", group: 35 },
            { word: "normal", phonetic: "/ˈnɔːml/", meaning: "①正常的②标准的③普通的④常态⑤正规的", example: "It\'s normal to feel nervous before the exam.", group: 35 },
            { word: "abnormal", phonetic: "/æbˈnɔːml/", meaning: "①反常的②异常的③不规则的④变态的", example: "Abnormal weather may disrupt the exam schedule.", group: 35 },
            { word: "regular", phonetic: "/ˈregjələ/", meaning: "①定期的②有规律的③常规的④整齐的", example: "Regular review is the key to remembering words.", group: 35 },
        ],
        // 第36组
        36: [
            { word: "irregular", phonetic: "/ɪˈregjələ/", meaning: "①不规则的②无规律的③非正规的④不整齐的", example: "Irregular verbs are a difficult point in English grammar.", group: 36 },
            { word: "permanent", phonetic: "/ˈpɜːmənənt/", meaning: "①永久的②永恒的③持久的④固定的", example: "This job offers a permanent position with good benefits.", group: 36 },
            { word: "temporary", phonetic: "/ˈtemprəri/", meaning: "①暂时的②临时的③短暂的④临时雇员", example: "He took a temporary job to earn money for his studies.", group: 36 },
            { word: "stable", phonetic: "/ˈsteɪbl/", meaning: "①稳定的②稳固的③坚定的④稳重的⑤马厩", example: "A stable learning environment is good for study efficiency.", group: 36 },
            { word: "unstable", phonetic: "/ʌnˈsteɪbl/", meaning: "①不稳定的②不稳固的③易变的④动摇的", example: "The unstable internet connection affects online learning.", group: 36 },
            { word: "safe", phonetic: "/seɪf/", meaning: "①安全的②平安的③保险的④保险箱⑤稳妥的", example: "It\'s safe to go to the library during the day.", group: 36 },
            { word: "dangerous", phonetic: "/ˈdeɪndʒərəs/", meaning: "①危险的②凶险的③冒险的④危及的", example: "It\'s dangerous to study late at night alone outside.", group: 36 },
            { word: "popular", phonetic: "/ˈpɒpjələ/", meaning: "①流行的②受欢迎的③普及的④大众的", example: "This English learning method is very popular among students.", group: 36 },
            { word: "unpopular", phonetic: "/ˌʌnˈpɒpjələ/", meaning: "①不受欢迎的②不流行的③不得人心的", example: "His unpopular opinion led to a heated discussion.", group: 36 },
            { word: "famous", phonetic: "/ˈfeɪməs/", meaning: "①著名的②出名的③闻名的④极好的", example: "This university is famous for its English major.", group: 36 },
        ],
        // 第37组
        37: [
            { word: "unknown", phonetic: "/ˌʌnˈnəʊn/", meaning: "①未知的②不知名的③陌生的④未知数", example: "There are still some unknown words in the passage.", group: 37 },
            { word: "familiar", phonetic: "/fəˈmɪliə/", meaning: "①熟悉的②通晓的③亲近的④常见的", example: "I am familiar with this kind of English exam question.", group: 37 },
            { word: "unfamiliar", phonetic: "/ˌʌnfəˈmɪliə/", meaning: "①不熟悉的②陌生的③未通晓的", example: "Unfamiliar vocabulary will affect reading comprehension.", group: 37 },
            { word: "lucky", phonetic: "/ˈlʌki/", meaning: "①幸运的②侥幸的③吉利的④好运的", example: "He was lucky to pass the exam with a high score.", group: 37 },
            { word: "unlucky", phonetic: "/ʌnˈlʌki/", meaning: "①不幸的②倒霉的③不吉利的④运气差的", example: "She was unlucky to miss the exam due to illness.", group: 37 },
            { word: "early", phonetic: "/ˈɜːli/", meaning: "①早的②早期的③提早的④早早地", example: "It\'s good to get up early to recite English words.", group: 37 },
            { word: "late", phonetic: "/leɪt/", meaning: "①晚的②迟到的③晚期的④最近的⑤迟地", example: "Don\'t be late for the exam or you will be refused entry.", group: 37 },
            { word: "quick", phonetic: "/kwɪk/", meaning: "①快的②迅速的③敏捷的④仓促的⑤快速地", example: "He has a quick mind and answers questions fast.", group: 37 },
            { word: "slow", phonetic: "/sləʊ/", meaning: "①迟钝的②慢的③缓慢的④放慢⑤慢吞吞地", example: "He is a little slow in understanding English grammar.", group: 37 },
            { word: "accurate", phonetic: "/ˈækjərət/", meaning: "①准确的②精确的③正确的④精准的", example: "Accurate spelling is very important in English writing.", group: 37 },
        ],
        // 第38组
        38: [
            { word: "inaccurate", phonetic: "/ɪnˈækjərət/", meaning: "①不准确的②不精确的③错误的④失实的", example: "Inaccurate translation will lead to misunderstanding.", group: 38 },
            { word: "complete", phonetic: "/kəmˈpliːt/", meaning: "①完整的②完全的③完成的④使完整⑤彻底的", example: "You need to write a complete essay for the exam.", group: 38 },
            { word: "incomplete", phonetic: "/ˌɪnkəmˈpliːt/", meaning: "①不完整的②未完成的③残缺的④不完善的", example: "The incomplete answer will not get full marks.", group: 38 },
            { word: "perfect", phonetic: "/ˈpɜːfɪkt/", meaning: "①完美的②极好的③无瑕的④使完美⑤精通的", example: "Her English pronunciation is almost perfect.", group: 38 },
            { word: "imperfect", phonetic: "/ɪmˈpɜːfɪkt/", meaning: "①不完美的②有缺陷的③未完成的④不完善的", example: "No one is perfect, so don\'t be afraid of making mistakes.", group: 38 },
            { word: "whole", phonetic: "/həʊl/", meaning: "①整个的②全部的③完整的④整体⑤全部", example: "You need to review the whole textbook before the exam.", group: 38 },
            { word: "partial", phonetic: "/ˈpɑːʃl/", meaning: "①部分的②局部的③偏袒的④偏爱的⑤不完全的", example: "Partial review is not enough for the comprehensive exam.", group: 38 },
            { word: "enough", phonetic: "/ɪˈnʌf/", meaning: "①足够的②充足的③充分的④足够地⑤充分地", example: "You need to spend enough time on English listening practice.", group: 38 },
            { word: "insufficient", phonetic: "/ˌɪnsəˈfɪʃnt/", meaning: "①不足的②不够的③不充分的④缺乏的", example: "Insufficient preparation will lead to failure in the exam.", group: 38 },
            { word: "abundant", phonetic: "/əˈbʌndənt/", meaning: "①大量的②丰富的③充裕的④盛产的", example: "The library has abundant English reference books.", group: 38 },
        ],
        // 第39组
        39: [
            { word: "scarce", phonetic: "/skeəs/", meaning: "①缺乏的②稀少的③罕见的④珍贵的", example: "Time is scarce during the exam period, so use it wisely.", group: 39 },
            { word: "basic", phonetic: "/ˈbeɪsɪk/", meaning: "①基本的②基础的③根本的④基础⑤要素", example: "Basic English vocabulary is the foundation of learning.", group: 39 },
            { word: "advanced", phonetic: "/ədˈvɑːnst/", meaning: "①高级的②先进的③晚期的④高深的⑤进阶的", example: "He is learning advanced English writing skills now.", group: 39 },
            { word: "primary", phonetic: "/ˈpraɪməri/", meaning: "①主要的②初级的③基本的④首要的⑤小学的", example: "The primary task now is to memorize core words.", group: 39 },
            { word: "secondary", phonetic: "/ˈsekəndəri/", meaning: "①次要的②中级的③第二的④辅助的⑤中学的", example: "This point is secondary, the key is to master the main content.", group: 39 },
            { word: "main", phonetic: "/meɪn/", meaning: "①主要的②最重要的③总管道④主要部分", example: "The main difficulty in the exam is reading comprehension.", group: 39 },
            { word: "minor", phonetic: "/ˈmaɪnə/", meaning: "①较小的②次要的③轻微的④未成年人⑤辅修的", example: "There are only minor mistakes in his English composition.", group: 39 },
            { word: "major", phonetic: "/ˈmeɪdʒə/", meaning: "①主要的②重大的③主修的④专业⑤主修生", example: "His major is English literature in the university.", group: 39 },
            { word: "minor", phonetic: "/ˈmaɪnə/", meaning: "①辅修的②较小的③次要的④辅修专业⑤未成年人", example: "He decided to minor in business English besides his major.", group: 39 },
            { word: "final", phonetic: "/ˈfaɪnl/", meaning: "①最终的②最后的③决赛的④期末考试⑤最终地", example: "The final exam is coming, so we need to review hard.", group: 39 },
        ],
        // 第40组
        40: [
            { word: "initial", phonetic: "/ɪˈnɪʃl/", meaning: "①最初的②字首的③初始的④首字母⑤[复数]姓名首字母", example: "My initial impression of English grammar is that it\'s difficult.", group: 40 },
            { word: "former", phonetic: "/ˈfɔːmə/", meaning: "①以前的②从前的③前者的④前任的", example: "My former English teacher taught me a lot of useful methods.", group: 40 },
            { word: "latter", phonetic: "/ˈlæ tə/", meaning: "①后者的②后半的③后期的④后者", example: "The latter part of the article is more difficult to understand.", group: 40 },
            { word: "inner", phonetic: "/ˈɪnə/", meaning: "①内部的②内心的③内在的④核心的⑤内心", example: "The inner meaning of the sentence needs to be carefully understood.", group: 40 },
            { word: "outer", phonetic: "/ˈaʊtə/", meaning: "①外部的②外面的③外表的④外层的⑤外部", example: "The outer cover of the book is very beautiful.", group: 40 },
            { word: "inner", phonetic: "/ˈɪnə/", meaning: "①内心的②内部的③内在的④核心的⑤私下的", example: "We need to calm our inner anxiety before the exam.", group: 40 },
            { word: "outer", phonetic: "/ˈaʊtə/", meaning: "①外表的②外部的③外面的④外层的⑤表面的", example: "Don\'t judge a person by their outer appearance.", group: 40 },
            { word: "direct", phonetic: "/dəˈrekt/", meaning: "①直接的②坦率的③直系的④指导⑤直接地", example: "There is no direct flight from this city to Beijing.", group: 40 },
            { word: "indirect", phonetic: "/ˌɪndəˈrekt/", meaning: "①间接的②迂回的③不坦率的④婉转的", example: "His indirect expression made it hard for us to understand.", group: 40 },
            { word: "effective", phonetic: "/ɪˈfektɪv/", meaning: "①有效的②实际的③生效的④有力的⑤给人深刻印象的", example: "This is an effective method for memorizing English words.", group: 40 },
        ],
        // 第41组
        41: [
            { word: "ineffective", phonetic: "/ˌɪnɪˈfektɪv/", meaning: "①无效的②不起作用的③效果不佳的④无能的", example: "Rote memorization is ineffective for long-term word retention.", group: 41 },
            { word: "efficient", phonetic: "/ɪˈfɪʃnt/", meaning: "①效率高的②有能力的③高效的④节省的", example: "She is an efficient learner who can finish tasks quickly.", group: 41 },
            { word: "inefficient", phonetic: "/ˌɪnɪˈfɪʃnt/", meaning: "①效率低的②无能的③浪费的④效果差的", example: "Inefficient study methods will waste a lot of time.", group: 41 },
            { word: "active", phonetic: "/ˈæktɪv/", meaning: "①积极的②活跃的③主动的④有效的⑤活动的", example: "Be active in participating in English corner activities.", group: 41 },
            { word: "passive", phonetic: "/ˈpæsɪv/", meaning: "①被动的②消极的③被动语态的④无源的", example: "Don\'t take a passive attitude towards English learning.", group: 41 },
            { word: "positive", phonetic: "/ˈpɒzətɪv/", meaning: "①肯定的②积极的③阳性的④正数的⑤确定的", example: "Give yourself positive psychological hints before the exam.", group: 41 },
            { word: "negative", phonetic: "/ˈnegətɪv/", meaning: "①消极的②否定的③负面的④阴性的⑤负数的", example: "Don\'t be affected by negative emotions during study.", group: 41 },
            { word: "formal", phonetic: "/ˈfɔːml/", meaning: "①正式的②正规的③形式的④拘谨的⑤正式场合的", example: "You need to use formal English in academic writing.", group: 41 },
            { word: "informal", phonetic: "/ɪnˈfɔːml/", meaning: "①非正式的②非正规的③随意的④日常的", example: "Informal English is used in daily conversations.", group: 41 },
            { word: "strict", phonetic: "/strɪkt/", meaning: "①严格的②严厉的③严密的④精确的", example: "The teacher is strict with us in English pronunciation.", group: 41 },
        ],
        // 第42组
        42: [
            { word: "loose", phonetic: "/luːs/", meaning: "①松的②松散的③宽松的④释放⑤散漫的", example: "He wears loose clothes when studying for comfort.", group: 42 },
            { word: "tight", phonetic: "/taɪt/", meaning: "①紧的②紧密的③严格的④拮据的⑤紧紧地", example: "The time schedule for review is very tight recently.", group: 42 },
            { word: "loose", phonetic: "/luːs/", meaning: "①散漫的②松的③松散的④不严谨的⑤松开", example: "His loose study attitude leads to poor grades.", group: 42 },
            { word: "solid", phonetic: "/ˈsɒlɪd/", meaning: "①固体的②坚固的③坚实的④可靠的⑤纯的", example: "He has a solid foundation in English grammar.", group: 42 },
            { word: "liquid", phonetic: "/ˈlɪkwɪd/", meaning: "①液体的②液态的③流动的④清澈的⑤液体", example: "You can bring some liquid water into the exam room.", group: 42 },
            { word: "gaseous", phonetic: "/ˈɡæsiəs/", meaning: "①气体的②气态的③充气的④无实质的", example: "Gaseous substances are invisible but exist in the air.", group: 42 },
            { word: "solid", phonetic: "/ˈsɒlɪd/", meaning: "①纯的②固体的③坚固的④扎实的⑤实心的", example: "We need to have solid word memory for the exam.", group: 42 },
            { word: "hollow", phonetic: "/ˈhɒləʊ/", meaning: "①空的②中空的③虚伪的④空洞的⑤山谷", example: "The hollow ball is very light and easy to carry.", group: 42 },
            { word: "true", phonetic: "/truː/", meaning: "①真实的②正确的③真正的④忠实的⑤真诚地", example: "It\'s true that practice makes perfect in English learning.", group: 42 },
            { word: "false", phonetic: "/fɔːls/", meaning: "①假的②错误的③虚伪的④伪造的⑤不真实的", example: "Don\'t make false answers in the exam; be honest.", group: 42 },
        ],
        // 第43组
        43: [
            { word: "real", phonetic: "/riːəl/", meaning: "①真实的②实际的③真正的④现实的⑤实在地", example: "His real goal is to pass the equal-study postgraduate exam.", group: 43 },
            { word: "virtual", phonetic: "/ˈvɜːtʃuəl/", meaning: "①虚拟的②实质上的③模拟的④虚拟世界的", example: "We can take virtual English courses online at home.", group: 43 },
            { word: "actual", phonetic: "/ˈæktʃuəl/", meaning: "①实际的②真实的③现实的④事实上的⑤实际地", example: "The actual difficulty of the exam is higher than expected.", group: 43 },
            { word: "artificial", phonetic: "/ˌɑːtɪˈfɪʃl/", meaning: "①人造的②人工的③虚假的④人为的⑤仿真的", example: "Artificial intelligence can help with English learning.", group: 43 },
            { word: "natural", phonetic: "/ˈnætʃrəl/", meaning: "①自然的②天然的③天生的④自然状态的⑤理所当然的", example: "Her natural English pronunciation sounds very authentic.", group: 43 },
            { word: "pure", phonetic: "/pjʊə/", meaning: "①纯的②纯净的③纯粹的④纯洁的⑤仅仅", example: "Pure water is good for our health after long hours of study.", group: 43 },
            { word: "mixed", phonetic: "/mɪkst/", meaning: "①混合的②混杂的③综合的④混合人种的⑤弄混的", example: "This is a mixed class of English beginners and advanced learners.", group: 43 },
            { word: "single", phonetic: "/ˈsɪŋɡl/", meaning: "①单一的②单个的③单身的④单程的⑤单独地", example: "You need to master single word meanings first, then collocations.", group: 43 },
            { word: "double", phonetic: "/ˈdʌbl/", meaning: "①双倍的②双重的③成双的④加倍⑤双的", example: "The number of English words to memorize is double this week.", group: 43 },
            { word: "triple", phonetic: "/ˈtrɪpl/", meaning: "①三倍的②三重的③三方的④使成三倍⑤三倍地", example: "The difficulty of this part is triple that of the previous one.", group: 43 },
        ],
        // 第44组
        44: [
            { word: "unique", phonetic: "/juːˈniːk/", meaning: "①独特的②唯一的③稀罕的④独一无二的", example: "Each person has a unique way of learning English words.", group: 44 },
            { word: "common", phonetic: "/ˈkɒmən/", meaning: "①共同的②普通的③常见的④公共的⑤共通的", example: "This word has a common meaning in daily English.", group: 44 },
            { word: "same", phonetic: "/seɪm/", meaning: "①相同的②同样的③同一的④同样的人/物⑤同样地", example: "We have the same goal of passing the English exam.", group: 44 },
            { word: "different", phonetic: "/ˈdɪfrənt/", meaning: "①不同的②各异的③有差异的④分别的", example: "Different words have different collocations and usages.", group: 44 },
            { word: "similar", phonetic: "/ˈsɪmɪlə/", meaning: "①相似的②类似的③相像的④相似物⑤类似地", example: "These two English words have similar spellings but different meanings.", group: 44 },
            { word: "opposite", phonetic: "/ˈɒpəzɪt/", meaning: "①相反的②对面的③对立的④对立面⑤在对面", example: "This word has the opposite meaning to the one we learned yesterday.", group: 44 },
            { word: "equal", phonetic: "/ˈiːkwəl/", meaning: "①相等的②平等的③均等的④等于⑤平等的人", example: "Everyone has equal opportunities to pass the exam with efforts.", group: 44 },
            { word: "unequal", phonetic: "/ʌnˈiːkwəl/", meaning: "①不平等的②不相等的③不均衡的④不相称的", example: "The distribution of study time is unequal, leading to unbalanced progress.", group: 44 },
            { word: "more", phonetic: "/mɔː/", meaning: "①更多的②较多的③额外的④更⑤更多", example: "We need to spend more time on English listening.", group: 44 },
            { word: "less", phonetic: "/les/", meaning: "①较少的②更少的③较小的④更少地⑤较少", example: "Spend less time on playing mobile phones and more on studying.", group: 44 },
        ],
        // 第45组
        45: [
            { word: "many", phonetic: "/ˈmeni/", meaning: "①许多的②大量的③众多的④许多人/物", example: "There are many new words in this chapter.", group: 45 },
            { word: "few", phonetic: "/fjuː/", meaning: "①很少的②少数的③几乎没有的④少数人/物", example: "There are few mistakes in his English homework this time.", group: 45 },
            { word: "much", phonetic: "/mʌtʃ/", meaning: "①许多的②大量的③很④非常⑤多", example: "He knows much about English culture and customs.", group: 45 },
            { word: "little", phonetic: "/ˈlɪtl/", meaning: "①小的②很少的③几乎没有的④少许⑤一点", example: "He has little time to review English on workdays.", group: 45 },
            { word: "numerous", phonetic: "/ˈnjuːmərəs/", meaning: "①众多的②许多的③大量的④无数的", example: "Numerous English words need to be memorized for the exam.", group: 45 },
            { word: "rare", phonetic: "/reə/", meaning: "①罕见的②稀有的③珍贵的④难得的", example: "This rare word is not likely to appear in the exam.", group: 45 },
            { word: "several", phonetic: "/ˈsevrəl/", meaning: "①几个的②数个的③一些的④几个⑤数个", example: "I have several English reference books to read this week.", group: 45 },
            { word: "some", phonetic: "/sʌm/", meaning: "①一些的②某些的③若干的④一些⑤有些", example: "Some words are easy to memorize, while others are not.", group: 45 },
            { word: "any", phonetic: "/ˈeni/", meaning: "①任何的②任一的③一些的④任何⑤任一", example: "You can ask me any questions about English learning at any time.", group: 45 },
            { word: "all", phonetic: "/ɔːl/", meaning: "①所有的②全部的③一切的④全部⑤都", example: "We need to review all the core words before the exam.", group: 45 },
        ],
        // 第46组
        46: [
            { word: "none", phonetic: "/nʌn/", meaning: "①没有一个②毫无③没有人④无物", example: "None of the words in this passage are unfamiliar to me.", group: 46 },
            { word: "each", phonetic: "/iːtʃ/", meaning: "①每个的②各自的③每④各自⑤每个", example: "Each word has its own specific usage in a sentence.", group: 46 },
            { word: "every", phonetic: "/ˈevri/", meaning: "①每个的②每一的③所有的④每⑤每逢", example: "Review every new word you learn on the same day.", group: 46 },
            { word: "either", phonetic: "/ˈaɪðə/", meaning: "①两者任一的②要么…要么…③也(不)④两者中任一", example: "You can choose either of the two English learning methods.", group: 46 },
            { word: "neither", phonetic: "/ˈnaɪðə/", meaning: "①两者都不的②既不…也不…③两者中无一个", example: "Neither of the two words is easy to memorize.", group: 46 },
            { word: "whole", phonetic: "/həʊl/", meaning: "①全部的②整个的③完整的④整体⑤完全地", example: "The whole process of learning English needs persistence.", group: 46 },
            { word: "part", phonetic: "/pɑːt/", meaning: "①部分的②局部的③一部分④角色⑤参与", example: "This is only a part of the core words, not all.", group: 46 },
            { word: "entire", phonetic: "/ɪnˈtaɪə/", meaning: "①整个的②全部的③完整的④全然的", example: "You need to read the entire article to understand its meaning.", group: 46 },
            { word: "partial", phonetic: "/ˈpɑːʃl/", meaning: "①偏袒的②部分的③局部的④偏爱的⑤不完全地", example: "Don\'t be partial to a single English learning method.", group: 46 },
            { word: "total", phonetic: "/ˈtəʊtl/", meaning: "①总的②全部的③整个的④总数⑤总计", example: "The total number of core words is 882.", group: 46 },
        ],
        // 第47组
        47: [
            { word: "specific", phonetic: "/spəˈsɪfɪk/", meaning: "①具体的②特定的③明确的④详细的⑤特效药", example: "You need to master the specific usage of each word.", group: 47 },
            { word: "general", phonetic: "/ˈdʒenrəl/", meaning: "①一般的②普遍的③总的④大体的⑤将军", example: "This is a general rule for English word collocation.", group: 47 },
            { word: "specific", phonetic: "/spəˈsɪfɪk/", meaning: "①特定的②具体的③明确的④特殊的⑤具体细节", example: "The exam will focus on specific core words and their usages.", group: 47 },
            { word: "broad", phonetic: "/brɔːd/", meaning: "①广阔的②广泛的③宽的④概括的⑤大体的", example: "We need to have a broad understanding of English culture.", group: 47 },
            { word: "narrow", phonetic: "/ˈnærəʊ/", meaning: "①狭隘的②窄的③有限的④缩小⑤变窄", example: "Don\'t have a narrow view of English learning; practice all skills.", group: 47 },
            { word: "deep", phonetic: "/diːp/", meaning: "①深的②深刻的③深奥的④深入地⑤深度", example: "We need to have a deep understanding of word meanings.", group: 47 },
            { word: "shallow", phonetic: "/ˈʃæləʊ/", meaning: "①浅的②肤浅的③浅薄的④浅滩⑤肤浅地", example: "Shallow understanding of words will lead to wrong usage.", group: 47 },
            { word: "wide", phonetic: "/waɪd/", meaning: "①广泛的②宽的③广阔的④睁大⑤充分地", example: "He has a wide vocabulary in English.", group: 47 },
            { word: "narrow", phonetic: "/ˈnærəʊ/", meaning: "①有限的②窄的③狭隘的④缩小⑤变窄", example: "The narrow scope of review will affect the exam result.", group: 47 },
            { word: "far", phonetic: "/fɑː/", meaning: "①远的②遥远的③久远的④很⑤极", example: "His English level is far higher than mine.", group: 47 },
        ],
        // 第48组
        48: [
            { word: "near", phonetic: "/nɪə/", meaning: "①近的②接近的③亲近的④几乎⑤在附近", example: "The exam is drawing near, so we need to speed up review.", group: 48 },
            { word: "close", phonetic: "/kləʊz/", meaning: "①近的②亲密的③紧密的④关闭⑤接近地", example: "We are close to finishing the word memorization task.", group: 48 },
            { word: "distant", phonetic: "/ˈdɪstənt/", meaning: "①遥远的②疏远的③久远的④冷淡的⑤遥远地", example: "The distant goal of learning English is to communicate fluently.", group: 48 },
            { word: "immediate", phonetic: "/ɪˈmiːdiət/", meaning: "①立即的②直接的③紧迫的④眼前的⑤即时的", example: "The immediate task is to memorize 20 words every day.", group: 48 },
            { word: "remote", phonetic: "/rɪˈməʊt/", meaning: "①遥远的②偏远的③远程的④微小的⑤遥控的", example: "We can take remote English courses through the internet.", group: 48 },
            { word: "fast", phonetic: "/fɑːst/", meaning: "①快速的②迅速的③紧的④快地⑤禁食", example: "Fast reading is a necessary skill for the English exam.", group: 48 },
            { word: "slow", phonetic: "/sləʊ/", meaning: "①缓慢的②慢的③迟钝的④放慢⑤缓慢地", example: "Slow down when you encounter unfamiliar words in reading.", group: 48 },
            { word: "quick", phonetic: "/kwɪk/", meaning: "①迅速的②快的③敏捷的④快速地⑤仓促的", example: "He has a quick response to English listening questions.", group: 48 },
            { word: "slow", phonetic: "/sləʊ/", meaning: "①迟钝的②慢的③缓慢的④变慢⑤慢吞吞地", example: "Don\'t be slow in writing English answers during the exam.", group: 48 },
            { word: "rapid", phonetic: "/ˈræpɪd/", meaning: "①迅速的②快速的③急促的④ Rapids⑤迅速地", example: "He made rapid progress in English after hard practice.", group: 48 },
        ],
        // 第49组
        49: [
            { word: "gradual", phonetic: "/ˈgrædʒuəl/", meaning: "①逐渐的②逐步的③平缓的④渐次地", example: "Word memory is a gradual process, not overnight.", group: 49 },
            { word: "sudden", phonetic: "/ˈsʌdn/", meaning: "①突然的②意外的③仓促的④突然⑤忽然", example: "A sudden power outage interrupted our online English class.", group: 49 },
            { word: "gradual", phonetic: "/ˈgrædʒuəl/", meaning: "①平缓的②逐渐的③逐步的④渐进地", example: "The gradual increase in vocabulary helps improve reading ability.", group: 49 },
            { word: "constant", phonetic: "/ˈkɒnstənt/", meaning: "①恒定的②不变的③持续的④常数⑤不断地", example: "Constant review is essential for remembering words.", group: 49 },
            { word: "changeable", phonetic: "/ˈtʃeɪndʒəbl/", meaning: "①易变的②可变的③多变的④变化无常的", example: "The weather is changeable, so take an umbrella when going to the library.", group: 49 },
            { word: "fixed", phonetic: "/fɪkst/", meaning: "①固定的②确定的③不变的④修理⑤固定", example: "We have a fixed time for English corner every week.", group: 49 },
            { word: "flexible", phonetic: "/ˈfleksəbl/", meaning: "①灵活的②柔韧的③易变通的④弹性的⑤灵活地", example: "Be flexible in using different word memorization methods.", group: 49 },
            { word: "steady", phonetic: "/ˈstedi/", meaning: "①稳定的②平稳的③坚定的④稳步地⑤使稳定", example: "Keep a steady pace of learning English every day.", group: 49 },
            { word: "unsteady", phonetic: "/ʌnˈstedi/", meaning: "①不稳定的②不平稳的③动摇的④颤抖的⑤不稳定地", example: "An unsteady study schedule is not good for long-term learning.", group: 49 },
            { word: "continuous", phonetic: "/kənˈtɪnjuəs/", meaning: "①连续的②持续的③不断的④连绵的", example: "Continuous English listening practice can improve your hearing.", group: 49 },
        ],
        // 第50组
        50: [
            { word: "discontinuous", phonetic: "/ˌdɪskənˈtɪnjuəs/", meaning: "①不连续的②间断的③中断的④非连续的", example: "Discontinuous review will make you forget words quickly.", group: 50 },
            { word: "permanent", phonetic: "/ˈpɜːmənənt/", meaning: "①永久的②永恒的③持久的④固定的⑤永久地", example: "We need to form a permanent habit of reviewing words.", group: 50 },
            { word: "temporary", phonetic: "/ˈtemprəri/", meaning: "①暂时的②临时的③短暂的④临时地", example: "This is only a temporary difficulty in English learning.", group: 50 },
            { word: "brief", phonetic: "/briːf/", meaning: "①简短的②简洁的③短暂的④摘要⑤简要地", example: "Please make a brief summary of the English passage.", group: 50 },
            { word: "long", phonetic: "/lɒŋ/", meaning: "①长久的②长的③漫长的④渴望⑤长期地", example: "It takes a long time to master English well.", group: 50 },
            { word: "short", phonetic: "/ʃɔːt/", meaning: "①短的②短暂的③矮的④短缺的⑤简短地", example: "Write a short English composition for the practice exam.", group: 50 },
            { word: "lengthy", phonetic: "/ˈleŋθi/", meaning: "①漫长的②冗长的③篇幅长的④持久的", example: "The lengthy article needs to be read carefully for key points.", group: 50 },
            { word: "simple", phonetic: "/ˈsɪmpl/", meaning: "①简易的②简单的③单纯的④朴素的⑤简单地", example: "Use simple English words to write the composition if possible.", group: 50 },
            { word: "complicated", phonetic: "/ˈkɒmplɪkeɪtɪd/", meaning: "①复杂的②难懂的③错综的④复杂化的", example: "This complicated English sentence needs to be analyzed word by word.", group: 50 },
            { word: "easy", phonetic: "/ˈiːzi/", meaning: "①轻松的②容易的③简单的④安逸的⑤容易地", example: "This English exercise is easy to finish in ten minutes.", group: 50 },
        ],
        // 第51组
        51: [
            { word: "hard", phonetic: "/hɑːd/", meaning: "①困难的②硬的③努力的④严厉的⑤努力地", example: "It\'s hard to understand this English article without a dictionary.", group: 51 },
            { word: "difficult", phonetic: "/ˈdɪfɪkəlt/", meaning: "①艰难的②困难的③难懂的④不易相处的⑤困难地", example: "It\'s difficult to keep practicing English every day.", group: 51 },
            { word: "simple", phonetic: "/ˈsɪmpl/", meaning: "①单纯的②简单的③简易的④朴素的⑤简单来说", example: "The simple truth is that practice makes perfect.", group: 51 },
            { word: "rough", phonetic: "/rʌf/", meaning: "①粗略的②粗糙的③粗暴的④崎岖的⑤粗略地", example: "Make a rough plan for your English review this month.", group: 51 },
            { word: "smooth", phonetic: "/smuːð/", meaning: "①顺利的②光滑的③平稳的④流畅的⑤顺利地", example: "The smooth reading of the passage depends on sufficient vocabulary.", group: 51 },
            { word: "flat", phonetic: "/flæt/", meaning: "①平坦的②扁平的③平淡的④公寓⑤平坦地", example: "The flat terrain makes it easy to walk to the library.", group: 51 },
            { word: "rough", phonetic: "/rʌf/", meaning: "①崎岖的②粗糙的③粗略的④粗暴的⑤粗暴地", example: "The rough road makes it hard to go to the study area.", group: 51 },
            { word: "straight", phonetic: "/streɪt/", meaning: "①直的②笔直的③正直的④直接地⑤直走", example: "Go straight along this road and you will find the English corner.", group: 51 },
            { word: "curved", phonetic: "/kɜːvd/", meaning: "①弯曲的②曲线的③弧形的④使弯曲", example: "The curved road leads to the campus library.", group: 51 },
            { word: "bent", phonetic: "/bent/", meaning: "①弯曲的②弯腰的③决心的④弯曲⑤弯腰", example: "The bent tree is a landmark near the study building.", group: 51 },
        ],
        // 第52组
        52: [
            { word: "straight", phonetic: "/streɪt/", meaning: "①正直的②直的③笔直的④坦率的⑤直接", example: "He has a straight way of expressing his opinions in English.", group: 52 },
            { word: "round", phonetic: "/raʊnd/", meaning: "①圆的②球形的③围绕的④回合⑤在周围", example: "The round table is suitable for group English discussion.", group: 52 },
            { word: "square", phonetic: "/skweə/", meaning: "①正方形的②平方的③正直的④广场⑤平方", example: "There is a square in the center of the campus with a study pavilion.", group: 52 },
            { word: "rectangular", phonetic: "/rekˈtæŋɡjələ/", meaning: "①长方形的②矩形的", example: "The rectangular desk is perfect for placing English books and dictionaries.", group: 52 },
            { word: "circular", phonetic: "/ˈsɜːkjələ/", meaning: "①圆形的②循环的③环形的④通知⑤循环地", example: "The circular table in the reading room can seat six people.", group: 52 },
            { word: "oval", phonetic: "/ˈəʊvl/", meaning: "①椭圆形的②卵形的③椭圆④卵形", example: "The oval mirror in the study room is very beautiful.", group: 52 },
            { word: "triangular", phonetic: "/traɪˈæŋɡjələ/", meaning: "①三角形的②三角的", example: "The triangular sign near the library indicates the direction of the English corner.", group: 52 },
            { word: "cylindrical", phonetic: "/səˈlɪndrɪkl/", meaning: "①圆柱形的②圆筒形的", example: "The cylindrical water bottle is easy to carry to the library.", group: 52 },
            { word: "spherical", phonetic: "/ˈsferɪkl/", meaning: "①球形的②球面的③球体的", example: "The spherical decoration in the reading room is very eye-catching.", group: 52 },
            { word: "flat", phonetic: "/flæt/", meaning: "①平淡的②平坦的③扁平的④乏味的⑤平淡地", example: "The plot of this English novel is a little flat.", group: 52 },
        ],
        // 第53组
        53: [
            { word: "steep", phonetic: "/stiːp/", meaning: "①陡峭的②急剧的③险峻的④陡坡⑤陡峭地", example: "The steep stairs to the top floor of the library are tiring to climb.", group: 53 },
            { word: "shallow", phonetic: "/ˈʃæləʊ/", meaning: "①浅的②肤浅的③浅薄的④浅滩⑤浅地", example: "The shallow river near the campus is a good place to relax after study.", group: 53 },
            { word: "deep", phonetic: "/diːp/", meaning: "①深奥的②深的③深刻的④深度⑤深入地", example: "This English poem has a deep meaning that needs careful appreciation.", group: 53 },
            { word: "light", phonetic: "/laɪt/", meaning: "①轻的②浅的③明亮的④光⑤轻轻地", example: "The light backpack is convenient for carrying English books.", group: 53 },
            { word: "heavy", phonetic: "/ˈhevi/", meaning: "①沉重的②重的③大量的④繁重的⑤沉重地", example: "The heavy schoolbag is full of English reference books.", group: 53 },
            { word: "thin", phonetic: "/θɪn/", meaning: "①薄的②细的③瘦的④稀疏的⑤稀薄地", example: "This thin English dictionary is easy to carry around.", group: 53 },
            { word: "thick", phonetic: "/θɪk/", meaning: "①厚的②浓的③密的④粗的⑤厚厚地", example: "The thick Oxford English Dictionary is a necessary reference book.", group: 53 },
            { word: "soft", phonetic: "/sɒft/", meaning: "①柔软的②软的③温和的④柔和的⑤柔软地", example: "The soft cushion in the reading room is comfortable for reading.", group: 53 },
            { word: "hard", phonetic: "/hɑːd/", meaning: "①坚硬的②硬的③困难的④努力的⑤坚硬地", example: "The hard desk in the library is durable for long-term study.", group: 53 },
            { word: "firm", phonetic: "/fɜːm/", meaning: "①坚固的②坚定的③牢固的④公司⑤坚定地", example: "He has a firm belief in passing the English exam.", group: 53 },
        ],
        // 第54组
        54: [
            { word: "weak", phonetic: "/wiːk/", meaning: "①虚弱的②软弱的③薄弱的④差的⑤虚弱地", example: "My English listening is my weak point and needs more practice.", group: 54 },
            { word: "stiff", phonetic: "/stɪf/", meaning: "①僵硬的②生硬的③严厉的④拘谨的⑤僵硬地", example: "His English expression is a little stiff and needs more practice.", group: 54 },
            { word: "flexible", phonetic: "/ˈfleksəbl/", meaning: "①柔韧的②灵活的③易变通的④弹性的⑤灵活地", example: "The flexible plastic notebook is not easy to break when studying outside.", group: 54 },
            { word: "brittle", phonetic: "/ˈbrɪtl/", meaning: "①脆的②易碎的③脆弱的④易逝的", example: "The brittle glass cup is not suitable for carrying to the library.", group: 54 },
            { word: "tough", phonetic: "/tʌf/", meaning: "①坚韧的②坚硬的③困难的④顽强的⑤粗暴的", example: "The tough cover of the book can protect it from damage.", group: 54 },
            { word: "elastic", phonetic: "/ɪˈlæstɪk/", meaning: "①有弹性的②弹性的③灵活的④橡皮圈⑤弹性", example: "The elastic bookmark is convenient for marking English book pages.", group: 54 },
            { word: "inelastic", phonetic: "/ˌɪnɪˈlæstɪk/", meaning: "①无弹性的②非弹性的③僵硬的④无伸缩性的", example: "The inelastic paper clip is easy to break when used forcefully.", group: 54 },
            { word: "transparent", phonetic: "/trænsˈpærənt/", meaning: "①透明的②清澈的③坦率的④易懂的", example: "The transparent plastic folder is good for storing English test papers.", group: 54 },
            { word: "opaque", phonetic: "/əʊˈpeɪk/", meaning: "①不透明的②难懂的③模糊的④无光泽的", example: "The opaque box is used to store English learning supplies.", group: 54 },
            { word: "translucent", phonetic: "/trænsˈluːsnt/", meaning: "①半透明的②半透亮的③透光的", example: "The translucent curtain in the reading room lets in soft light.", group: 54 },
        ],
        // 第55组
        55: [
            { word: "clear", phonetic: "/klɪə/", meaning: "①清澈的②清晰的③清楚的④晴朗的⑤清楚地", example: "The clear window in the library has a good view of the campus.", group: 55 },
            { word: "faint", phonetic: "/feɪnt/", meaning: "①微弱的②模糊的③头晕的④昏厥⑤微弱地", example: "I heard a faint voice reading English words outside the window.", group: 55 },
            { word: "bright", phonetic: "/braɪt/", meaning: "①明亮的②聪明的③鲜艳的④光明的⑤明亮地", example: "The bright light in the reading room is good for eye protection.", group: 55 },
            { word: "dim", phonetic: "/dɪm/", meaning: "①昏暗的②模糊的③暗淡的④使暗淡⑤昏暗地", example: "The dim light in the corner is not suitable for reading English.", group: 55 },
            { word: "loud", phonetic: "/laʊd/", meaning: "①响亮的②大声的③喧闹的④高声地⑤响亮地", example: "His loud reading of English words disturbed other students.", group: 55 },
            { word: "soft", phonetic: "/sɒft/", meaning: "①柔和的②软的③温和的④轻柔的⑤柔和地", example: "The soft music in the reading room helps relax while studying English.", group: 55 },
            { word: "noisy", phonetic: "/ˈnɔɪzi/", meaning: "①嘈杂的②吵闹的③喧闹的④充满噪音的⑤吵闹地", example: "The noisy cafeteria is not a good place to recite English words.", group: 55 },
            { word: "quiet", phonetic: "/ˈkwaɪət/", meaning: "①安静的②寂静的③平静的④轻声地⑤使安静", example: "The quiet corner of the library is perfect for memorizing words.", group: 55 },
            { word: "sharp", phonetic: "/ʃɑːp/", meaning: "①锋利的②尖锐的③清晰的④敏捷的⑤急剧地", example: "The sharp pencil is good for writing English words neatly.", group: 55 },
            { word: "dull", phonetic: "/dʌl/", meaning: "①迟钝的②钝的③枯燥的④暗淡的⑤迟钝地", example: "The dull knife can\'t cut the paper for English notes.", group: 55 },
        ],
        // 第56组
        56: [
            { word: "blunt", phonetic: "/blʌnt/", meaning: "①钝的②生硬的③直率的④迟钝的⑤钝地", example: "The blunt pencil needs to be sharpened for writing English.", group: 56 },
            { word: "sharp", phonetic: "/ʃɑːp/", meaning: "①敏锐的②锋利的③清晰的④尖锐的⑤清楚地", example: "He has a sharp mind for understanding English grammar rules.", group: 56 },
            { word: "smooth", phonetic: "/smuːð/", meaning: "①光滑的②顺利的③平稳的④流畅的⑤光滑地", example: "The smooth paper is good for writing English compositions.", group: 56 },
            { word: "rough", phonetic: "/rʌf/", meaning: "①粗糙的②粗略的③粗暴的④崎岖的⑤粗糙地", example: "The rough paper is not suitable for writing neat English words.", group: 56 },
            { word: "slippery", phonetic: "/ˈslɪpəri/", meaning: "①滑的②滑溜的③狡猾的④易滑脱的", example: "The slippery floor in the library needs to be careful when walking.", group: 56 },
            { word: "sticky", phonetic: "/ˈstɪki/", meaning: "①粘的②粘性的③棘手的④粘人的", example: "The sticky tape is used to stick English notes on the desk.", group: 56 },
            { word: "dry", phonetic: "/draɪ/", meaning: "①干的②干燥的③干旱的④擦干⑤干燥地", example: "Keep the English test papers dry to avoid damage.", group: 56 },
            { word: "wet", phonetic: "/wet/", meaning: "①湿的②潮湿的③下雨的④弄湿⑤湿的", example: "The wet book pages need to be dried in time to prevent mildew.", group: 56 },
            { word: "humid", phonetic: "/ˈhjuːmɪd/", meaning: "①潮湿的②湿润的③多湿气的", example: "The humid weather in summer makes it easy for English books to get moldy.", group: 56 },
            { word: "arid", phonetic: "/ˈærɪd/", meaning: "①干旱的②干燥的③贫瘠的④枯燥的", example: "The arid climate in winter makes the skin dry when studying for a long time.", group: 56 },
        ],
        // 第57组
        57: [
            { word: "hot", phonetic: "/hɒt/", meaning: "①热的②辣的③热门的④激动的⑤热地", example: "The hot summer weather makes it hard to concentrate on English study.", group: 57 },
            { word: "cold", phonetic: "/kəʊld/", meaning: "①冷的②寒冷的③冷淡的④感冒⑤冷地", example: "The cold winter needs to keep warm when studying in the library.", group: 57 },
            { word: "warm", phonetic: "/wɔːm/", meaning: "①温暖的②暖和的③热情的④变暖⑤温暖地", example: "The warm sunshine in the library makes study more comfortable.", group: 57 },
            { word: "cool", phonetic: "/kuːl/", meaning: "①凉爽的②冷静的③酷的④降温⑤凉爽地", example: "The cool autumn weather is the best for English study.", group: 57 },
            { word: "mild", phonetic: "/maɪld/", meaning: "①温和的②轻微的③淡的④和善的⑤温和地", example: "The mild spring weather is suitable for studying English outdoors.", group: 57 },
            { word: "severe", phonetic: "/sɪˈvɪə/", meaning: "①严重的②严厉的③剧烈的④严峻的⑤严重地", example: "The severe cold in winter may cause a cold and affect study.", group: 57 },
            { word: "gentle", phonetic: "/ˈdʒentl/", meaning: "①温和的②轻柔的③文雅的④绅士的⑤温和地", example: "The gentle breeze in the park is good for reciting English words.", group: 57 },
            { word: "violent", phonetic: "/ˈvaɪələnt/", meaning: "①暴力的②猛烈的③剧烈的④凶暴的⑤猛烈地", example: "The violent storm outside interrupted our English online class.", group: 57 },
            { word: "calm", phonetic: "/kɑːm/", meaning: "①平静的②冷静的③沉着的④使平静⑤平静地", example: "Keep calm when you encounter difficult English questions in the exam.", group: 57 },
            { word: "stormy", phonetic: "/ˈstɔːmi/", meaning: "①暴风雨的②激烈的③暴躁的④多风暴的", example: "The stormy weather made many students late for the English class.", group: 57 },
        ],
        // 第58组
        58: [
            { word: "windy", phonetic: "/ˈwɪndi/", meaning: "①有风的②多风的③刮风的④空谈的", example: "The windy day is not suitable for studying English outdoors.", group: 58 },
            { word: "calm", phonetic: "/kɑːm/", meaning: "①无风的②平静的③冷静的④沉着的⑤平静地", example: "The calm night is perfect for memorizing English words at home.", group: 58 },
            { word: "sunny", phonetic: "/ˈsʌni/", meaning: "①晴朗的②阳光充足的③快乐的④向阳的", example: "The sunny day is good for reading English books in the park.", group: 58 },
            { word: "cloudy", phonetic: "/ˈklaʊdi/", meaning: "①多云的②阴天的③模糊的④浑浊的", example: "The cloudy weather makes the library a little dark for study.", group: 58 },
            { word: "rainy", phonetic: "/ˈreɪni/", meaning: "①下雨的②多雨的③阴雨的", example: "The rainy day makes it inconvenient to go to the library.", group: 58 },
            { word: "snowy", phonetic: "/ˈsnəʊi/", meaning: "①下雪的②多雪的③被雪覆盖的", example: "The snowy day is beautiful but cold for studying outside.", group: 58 },
            { word: "foggy", phonetic: "/ˈfɒɡi/", meaning: "①有雾的②模糊的③朦胧的④多雾的", example: "The foggy morning reduces visibility and makes it hard to go to school.", group: 58 },
            { word: "misty", phonetic: "/ˈmɪsti/", meaning: "①有雾的②朦胧的③模糊的④薄雾笼罩的", example: "The misty scenery in the morning is beautiful but not good for outdoor study.", group: 58 },
            { word: "clear", phonetic: "/klɪə/", meaning: "①晴朗的②清晰的③清楚的④清澈的⑤清楚地", example: "The clear sky after rain is good for studying English outdoors.", group: 58 },
            { word: "hazy", phonetic: "/ˈheɪzi/", meaning: "①朦胧的②模糊的③有薄雾的④头脑昏沉的", example: "The hazy vision due to eye fatigue affects English reading.", group: 58 },
        ],
        // 第59组
        59: [
            { word: "clean", phonetic: "/kliːn/", meaning: "①干净的②清洁的③清白的④打扫⑤干净地", example: "The clean study environment is good for concentration.", group: 59 },
            { word: "dirty", phonetic: "/ˈdɜːti/", meaning: "①脏的②肮脏的③卑鄙的④弄脏⑤脏地", example: "The dirty desk needs to be cleaned before studying English.", group: 59 },
            { word: "pure", phonetic: "/pjʊə/", meaning: "①纯净的②纯的③纯洁的④纯粹的⑤纯粹地", example: "The pure air in the countryside is good for studying English.", group: 59 },
            { word: "polluted", phonetic: "/pəˈluːtɪd/", meaning: "①被污染的②受污染的③玷污的", example: "The polluted air in the city is not good for long-term study.", group: 59 },
            { word: "fresh", phonetic: "/freʃ/", meaning: "①新鲜的②清新的③新颖的④鲜活的⑤新鲜地", example: "The fresh air in the morning is good for reciting English words.", group: 59 },
            { word: "stale", phonetic: "/steɪl/", meaning: "①不新鲜的②陈旧的③乏味的④失效的⑤陈旧地", example: "The stale air in the closed room affects English study efficiency.", group: 59 },
            { word: "sweet", phonetic: "/swiːt/", meaning: "①甜的②甜蜜的③可爱的④悦耳的⑤甜美地", example: "The sweet taste of candy can relieve tiredness when studying English.", group: 59 },
            { word: "bitter", phonetic: "/ˈbɪtə/", meaning: "①苦的②痛苦的③苦涩的④严寒的⑤苦涩地", example: "The bitter taste of coffee can keep you awake when studying late.", group: 59 },
            { word: "sour", phonetic: "/ˈsaʊə/", meaning: "①酸的②酸味的③尖酸的④酸痛的⑤酸地", example: "The sour taste of lemon can refresh you when you are sleepy in study.", group: 59 },
            { word: "salty", phonetic: "/ˈsɔːlti/", meaning: "①咸的②含盐的③咸涩的④辛辣的", example: "Eating too much salty food will make you thirsty when studying.", group: 59 },
        ],
        // 第60组
        60: [
            { word: "spicy", phonetic: "/ˈspaɪsi/", meaning: "①辣的②辛辣的③刺激的④香辛料的", example: "Eating spicy food may make your throat uncomfortable when reading English aloud.", group: 60 },
            { word: "tasteless", phonetic: "/ˈteɪstləs/", meaning: "①无味的②乏味的③无鉴赏力的④平淡的", example: "The tasteless food makes it hard to keep energy for English study.", group: 60 },
            { word: "delicious", phonetic: "/dɪˈlɪʃəs/", meaning: "①美味的②可口的③美妙的④令人愉快的", example: "Delicious food can replenish energy after a long time of English study.", group: 60 },
            { word: "nasty", phonetic: "/ˈnɑːsti/", meaning: "①令人讨厌的②恶劣的③肮脏的④令人不快的", example: "The nasty smell in the room affects English study concentration.", group: 60 },
            { word: "yummy", phonetic: "/ˈjʌmi/", meaning: "①美味的②可口的③令人喜爱的", example: "The yummy snack can relieve hunger when studying English for a long time.", group: 60 },
            { word: "awful", phonetic: "/ˈɔːfl/", meaning: "①糟糕的②可怕的③极坏的④令人厌恶的", example: "The awful weather ruins the plan of studying English outdoors.", group: 60 },
            { word: "fragrant", phonetic: "/ˈfreɪɡrənt/", meaning: "①芳香的②香的③芬芳的④令人愉快的", example: "The fragrant osmanthus in the campus makes study more pleasant.", group: 60 },
            { word: "smelly", phonetic: "/ˈsmeli/", meaning: "①有臭味的②难闻的③发臭的", example: "The smelly garbage near the study area needs to be cleaned in time.", group: 60 },
            { word: "scented", phonetic: "/ˈsentɪd/", meaning: "①有香味的②芳香的③洒了香水的④带气味的", example: "The scented notebook makes writing English notes a pleasant experience.", group: 60 },
            { word: "odorous", phonetic: "/ˈəʊdərəs/", meaning: "①有气味的②芳香的③臭的④有味道的", example: "The odorous flowers in the reading room make the air fresh.", group: 60 },
        ],
        // 第61组
        61: [
            { word: "colorful", phonetic: "/ˈkʌləfl/", meaning: "①色彩鲜艳的②五彩缤纷的③丰富多彩的④生动的", example: "The colorful English posters on the wall make the study room lively.", group: 61 },
            { word: "colorless", phonetic: "/ˈkʌlələs/", meaning: "①无色的②苍白的③乏味的④无生气的", example: "The colorless wall in the reading room is a little boring.", group: 61 },
            { word: "bright", phonetic: "/braɪt/", meaning: "①鲜艳的②明亮的③聪明的④光明的⑤鲜艳地", example: "The bright color of the notebook makes it easy to find in the schoolbag.", group: 61 },
            { word: "pale", phonetic: "/peɪl/", meaning: "①苍白的②淡的③无力的④变苍白⑤苍白地", example: "The pale light in the room is not good for reading English for a long time.", group: 61 },
            { word: "dark", phonetic: "/dɑːk/", meaning: "①深色的②黑暗的③阴沉的④模糊的⑤深色地", example: "The dark cover of the book is not easy to get dirty.", group: 61 },
            { word: "light", phonetic: "/laɪt/", meaning: "①浅色的②轻的③明亮的④光⑤浅色地", example: "The light color of the desk makes the study room look bright.", group: 61 },
            { word: "vivid", phonetic: "/ˈvɪvɪd/", meaning: "①生动的②鲜明的③逼真的④活泼的⑤生动地", example: "The vivid pictures in the English textbook help understand the content.", group: 61 },
            { word: "dull", phonetic: "/dʌl/", meaning: "①暗淡的②迟钝的③枯燥的④钝的⑤暗淡地", example: "The dull color of the wall makes the study room a little depressing.", group: 61 },
            { word: "plain", phonetic: "/pleɪn/", meaning: "①朴素的②简单的③平坦的④平原⑤朴素地", example: "The plain cover of the English book is simple and elegant.", group: 61 },
            { word: "fancy", phonetic: "/ˈfænsi/", meaning: "①精致的②花哨的③想象的④设想⑤喜欢", example: "The fancy English notebook is beautiful but a little expensive.", group: 61 },
        ],
        // 第62组
        62: [
            { word: "simple", phonetic: "/ˈsɪmpl/", meaning: "①简易的②朴素的③单纯的④简单地", example: "Use a simple notebook for daily English word recitation.", group: 62 },
            { word: "ornate", phonetic: "/ɔːˈneɪt/", meaning: "①华丽的②装饰华丽的③繁复的④雕琢的", example: "The ornate English textbook cover is very eye-catching but not practical.", group: 62 },
            { word: "plain", phonetic: "/pleɪn/", meaning: "①无装饰的②朴素的③清楚的④平原⑤直白地", example: "The plain paper is the most suitable for writing English notes.", group: 62 },
            { word: "decorated", phonetic: "/ˈdekəreɪtɪd/", meaning: "①装饰的②有装饰的③修饰的", example: "The decorated study wall is covered with English vocabulary cards.", group: 62 },
            { word: "bare", phonetic: "/beə/", meaning: "①赤裸的②光秃的③空的④无装饰的⑤仅仅", example: "The bare wall in the classroom is perfect for pasting English learning posters.", group: 62 },
            { word: "covered", phonetic: "/ˈkʌvəd/", meaning: "①被覆盖的②有遮盖的③隐蔽的④包含的", example: "The desk is covered with English reference books and exercise papers.", group: 62 },
            { word: "empty", phonetic: "/ˈempti/", meaning: "①空洞的②空的③空虚的④倒空⑤无内容的", example: "The empty notebook is ready for recording new English words.", group: 62 },
            { word: "full", phonetic: "/fʊl/", meaning: "①满的②充满的③完整的④充分的⑤装满", example: "The bookshelf is full of English learning materials of all kinds.", group: 62 },
            { word: "hollow", phonetic: "/ˈhɒləʊ/", meaning: "①中空的②空洞的③虚伪的④山谷⑤空空地", example: "The hollow pen holder is both beautiful and practical for English study.", group: 62 },
            { word: "solid", phonetic: "/ˈsɒlɪd/", meaning: "①实心的②坚固的③扎实的④纯的⑤完全地", example: "The solid wooden desk is durable for long-term English study.", group: 62 },
        ],
        // 第63组
        63: [
            { word: "light", phonetic: "/laɪt/", meaning: "①明亮的②轻的③光④点燃⑤浅色的", example: "The light lighting in the study protects eyes when reading English for a long time.", group: 63 },
            { word: "dark", phonetic: "/dɑːk/", meaning: "①黑暗的②深色的③阴沉的④模糊的⑤黑暗地", example: "The dark night is a quiet time for memorizing English words at home.", group: 63 },
            { word: "day", phonetic: "/deɪ/", meaning: "①天②白天③日子④时期⑤每日", example: "Every day we need to review at least 30 English core words.", group: 63 },
            { word: "night", phonetic: "/naɪt/", meaning: "①夜晚②晚上③黑夜④夜色⑤在夜里", example: "I usually spend one hour on English listening at night.", group: 63 },
            { word: "morning", phonetic: "/ˈmɔːnɪŋ/", meaning: "①早晨②上午③黎明④初期", example: "The morning is the best time for reciting English words.", group: 63 },
            { word: "afternoon", phonetic: "/ˌɑːftəˈnuːn/", meaning: "①下午②午后", example: "I plan to do English reading comprehension exercises this afternoon.", group: 63 },
            { word: "evening", phonetic: "/ˈiːvnɪŋ/", meaning: "①晚上②傍晚③晚会④后期", example: "We have an English corner activity every Friday evening.", group: 63 },
            { word: "noon", phonetic: "/nuːn/", meaning: "①中午②正午③晌午", example: "I take a short rest at noon and then review English phrases.", group: 63 },
            { word: "midnight", phonetic: "/ˈmɪdnaɪt/", meaning: "①午夜②子夜③夜半", example: "It\'s not good for health to study English until midnight every day.", group: 63 },
            { word: "dawn", phonetic: "/dɔːn/", meaning: "①黎明②拂晓③开端④醒悟", example: "The dawn is quiet and suitable for quiet English word memory.", group: 63 },
        ],
        // 第64组
        64: [
            { word: "dusk", phonetic: "/dʌsk/", meaning: "①黄昏②薄暮③傍晚", example: "I often walk in the park at dusk and recite English sentences aloud.", group: 64 },
            { word: "sunrise", phonetic: "/ˈsʌnraɪz/", meaning: "①日出②黎明③晨曦", example: "Watching the sunrise while reciting English words is a pleasant experience.", group: 64 },
            { word: "sunset", phonetic: "/ˈsʌnset/", meaning: "①日落②黄昏③晚霞", example: "The beautiful sunset makes people forget the tiredness of English study for a while.", group: 64 },
            { word: "spring", phonetic: "/sprɪŋ/", meaning: "①春天②春季③泉水④跳跃⑤发芽", example: "We plan to hold an English outdoor reading activity in spring.", group: 64 },
            { word: "summer", phonetic: "/ˈsʌmə/", meaning: "①夏天②夏季③暑天④壮年", example: "The long summer vacation is a good time to consolidate English knowledge.", group: 64 },
            { word: "autumn", phonetic: "/ˈɔːtəm/", meaning: "①秋天②秋季③成熟期④衰落期", example: "The cool autumn is the most comfortable season for English study.", group: 64 },
            { word: "winter", phonetic: "/ˈwɪntə/", meaning: "①冬天②冬季③寒冬④晚年", example: "We can take online English courses at home on cold winter days.", group: 64 },
            { word: "season", phonetic: "/ˈsiːzn/", meaning: "①季节②时节③时期④赛季", example: "Each season has its own suitable way of English learning.", group: 64 },
            { word: "climate", phonetic: "/ˈklaɪmət/", meaning: "①气候②风气③氛围④地带", example: "The mild climate of this city is good for long-term study and English learning.", group: 64 },
            { word: "weather", phonetic: "/ˈweðə/", meaning: "①天气②气象③境遇④处境", example: "Bad weather can\'t stop us from persisting in English learning.", group: 64 },
        ],
        // 第65组
        65: [
            { word: "temperature", phonetic: "/ˈtemprətʃə/", meaning: "①温度②气温③体温④热度", example: "The proper room temperature helps improve the efficiency of English study.", group: 65 },
            { word: "humidity", phonetic: "/hjuːˈmɪdəti/", meaning: "①湿度②湿气③含水量", example: "High humidity in summer is easy to make people sleepy when studying English.", group: 65 },
            { word: "pressure", phonetic: "/ˈpreʃə/", meaning: "①气压②压力③压强④压迫", example: "The change of atmospheric pressure has little effect on our English study plan.", group: 65 },
            { word: "wind", phonetic: "/wɪnd/", meaning: "①风②风力③气息④弯曲", example: "The gentle wind makes outdoor English recitation more comfortable.", group: 65 },
            { word: "rain", phonetic: "/reɪn/", meaning: "①雨②下雨③雨水④雨季", example: "We have to switch to indoor English learning when it rains heavily.", group: 65 },
            { word: "snow", phonetic: "/snəʊ/", meaning: "①雪②下雪③雪花④积雪", example: "The heavy snow blocked the road, so we studied English online at home.", group: 65 },
            { word: "ice", phonetic: "/aɪs/", meaning: "①冰②冰块③结冰④冰冷", example: "The ice on the road makes it inconvenient to go to the library for English study.", group: 65 },
            { word: "fog", phonetic: "/fɒg/", meaning: "①雾②烟雾③迷茫④困惑", example: "The thick fog reduces visibility and delays the English class.", group: 65 },
            { word: "cloud", phonetic: "/klaʊd/", meaning: "①云②云朵③阴云④阴影", example: "The white cloud floats in the sky, making outdoor English reading more pleasant.", group: 65 },
            { word: "sun", phonetic: "/sʌn/", meaning: "①太阳②阳光③恒星④晒", example: "The warm sun is shining, and we read English articles in the park.", group: 65 },
        ],
        // 第66组
        66: [
            { word: "moon", phonetic: "/muːn/", meaning: "①月亮②月球③月光④卫星", example: "The bright moon at night accompanies me to memorize English words.", group: 66 },
            { word: "star", phonetic: "/stɑː/", meaning: "①星星②恒星③明星④星状物", example: "Counting the stars while reciting English words makes the study time more interesting.", group: 66 },
            { word: "sky", phonetic: "/skaɪ/", meaning: "①天空②太空③天国④天色", example: "The blue sky and white clouds create a good mood for English learning.", group: 66 },
            { word: "earth", phonetic: "/ɜːθ/", meaning: "①地球②大地③泥土④世间", example: "English is one of the most widely used languages on the earth.", group: 66 },
            { word: "land", phonetic: "/lænd/", meaning: "①陆地②土地③国土④着陆⑤陆地的", example: "We can see a lot of English signs on the land of many countries.", group: 66 },
            { word: "sea", phonetic: "/siː/", meaning: "①海②海洋③海面④大量", example: "There are many English words related to the sea in the exam syllabus.", group: 66 },
            { word: "ocean", phonetic: "/ˈəʊʃn/", meaning: "①海洋②大洋③海量④广阔", example: "English is the common language of the world\'s major oceans and countries.", group: 66 },
            { word: "river", phonetic: "/ˈrɪvə/", meaning: "①河②河流③江水④巨流", example: "There is a beautiful river near the campus, where we can recite English aloud.", group: 66 },
            { word: "lake", phonetic: "/leɪk/", meaning: "①湖②湖泊③湖水④一池", example: "The quiet lake beside the library is a good place for English corner.", group: 66 },
            { word: "pond", phonetic: "/pɒnd/", meaning: "①池塘②水塘③池沼", example: "The small pond in the campus is a lovely spot for casual English conversation.", group: 66 },
        ],
        // 第67组
        67: [
            { word: "stream", phonetic: "/striːm/", meaning: "①小溪②溪流③流动④潮流", example: "The clear stream flows through the park, with many students reading English by the bank.", group: 67 },
            { word: "canal", phonetic: "/kəˈnæl/", meaning: "①运河②沟渠③水道④航道", example: "Many English words about transportation are related to the canal.", group: 67 },
            { word: "valley", phonetic: "/ˈvæli/", meaning: "①山谷②溪谷③流域④低谷", example: "The quiet valley is a good place for immersive English learning in the wild.", group: 67 },
            { word: "mountain", phonetic: "/ˈmaʊntən/", meaning: "①山②山脉③高山④山岳", example: "Climbing the mountain while reciting English words is a good combination of exercise and study.", group: 67 },
            { word: "hill", phonetic: "/hɪl/", meaning: "①小山②丘陵③土坡④斜坡", example: "There is a small hill in the campus, where we can watch the sunset and read English.", group: 67 },
            { word: "island", phonetic: "/ˈaɪlənd/", meaning: "①岛②岛屿③孤岛④岛国", example: "Many island countries use English as their official language.", group: 67 },
            { word: "peninsula", phonetic: "/pəˈnɪnsjələ/", meaning: "①半岛②半島", example: "English is widely used in the coastal cities of the peninsula.", group: 67 },
            { word: "desert", phonetic: "/ˈdezət/", meaning: "①沙漠②荒漠③荒原④荒凉的", example: "There are few people in the desert, but it\'s a good place for quiet English study for adventurers.", group: 67 },
            { word: "forest", phonetic: "/ˈfɒrɪst/", meaning: "①森林②树林③林区④丛林", example: "The fresh air in the forest makes outdoor English reading a pleasant experience.", group: 67 },
            { word: "jungle", phonetic: "/ˈdʒʌŋɡl/", meaning: "①丛林②密林③莽林④危险地带", example: "Some English adventure novels are set in the tropical jungle.", group: 67 },
        ],
        // 第68组
        68: [
            { word: "grassland", phonetic: "/ˈɡrɑːslænd/", meaning: "①草原②草地③草场", example: "The vast grassland is a good place for English outdoor activities and learning.", group: 68 },
            { word: "prairie", phonetic: "/ˈpreəri/", meaning: "①大草原②草甸③普雷里", example: "English words describing the prairie are often used in reading comprehension.", group: 68 },
            { word: "wetland", phonetic: "/ˈwetlənd/", meaning: "①湿地②沼泽地③滩涂", example: "The protection of wetland is a common topic in English reading materials.", group: 68 },
            { word: "swamp", phonetic: "/swɒmp/", meaning: "①沼泽②湿地③泥潭④陷入", example: "The swamp is a dangerous area, and related English words need to be memorized.", group: 68 },
            { word: "marsh", phonetic: "/mɑːʃ/", meaning: "①沼泽②湿地③草甸沼泽④陷进", example: "The marsh area has a unique ecosystem, which is a common theme in English articles.", group: 68 },
            { word: "beach", phonetic: "/biːtʃ/", meaning: "①海滩②沙滩③海滨④湖滨", example: "Many students like to recite English words on the beach in their spare time.", group: 68 },
            { word: "coast", phonetic: "/kəʊst/", meaning: "①海岸②海滨③沿海地区④滑行", example: "The coastal cities have a lot of English signs and bilingual announcements.", group: 68 },
            { word: "shore", phonetic: "/ʃɔː/", meaning: "①岸②海岸③湖滨④河岸", example: "We walked along the shore and practiced English oral communication with each other.", group: 68 },
            { word: "bank", phonetic: "/bæŋk/", meaning: "①岸②堤③银行④河岸⑤库", example: "There is a small bench on the bank of the river for reading English.", group: 68 },
            { word: "cliff", phonetic: "/klɪf/", meaning: "①悬崖②峭壁③绝壁④岩崖", example: "The steep cliff is a common scene in English landscape descriptions.", group: 68 },
        ],
        // 第69组
        69: [
            { word: "plateau", phonetic: "/ˈplætəʊ/", meaning: "①高原②台地③高地④平稳期", example: "The English words describing the plateau are often tested in vocabulary questions.", group: 69 },
            { word: "plain", phonetic: "/pleɪn/", meaning: "①平原②旷野③朴素的④清楚的", example: "The vast plain has a unique scenery, which is described in many English essays.", group: 69 },
            { word: "basin", phonetic: "/ˈbeɪsn/", meaning: "①盆地②流域③盆④水盆", example: "The basin has a special climate, and related English knowledge needs to be understood.", group: 69 },
            { word: "peak", phonetic: "/piːk/", meaning: "①山峰②顶峰③顶点④峰值", example: "Reaching the peak of the mountain and shouting English sentences is a good way to practice oral English.", group: 69 },
            { word: "top", phonetic: "/tɒp/", meaning: "①顶部②顶端③最高处④首位⑤上面的", example: "The top of the teaching building is a good place to overlook the campus and recite English.", group: 69 },
            { word: "bottom", phonetic: "/ˈbɒtəm/", meaning: "①底部②底端③尽头④基础⑤最下的", example: "Write the English words you don\'t master at the bottom of the notebook for review.", group: 69 },
            { word: "left", phonetic: "/left/", meaning: "①左边②左侧③左方④剩下的⑤向左", example: "There is an English reading room on the left of the library entrance.", group: 69 },
            { word: "right", phonetic: "/raɪt/", meaning: "①右边②右侧③正确的④权利⑤向右", example: "The English corner is on the right side of the campus square.", group: 69 },
            { word: "front", phonetic: "/frʌnt/", meaning: "①前面②前部③正面④前线⑤前面的", example: "There is a big English poster on the front wall of the classroom.", group: 69 },
            { word: "back", phonetic: "/bæk/", meaning: "①后面②背部③背面④回来⑤向后", example: "Write the English word roots on the back of the vocabulary cards for memory.", group: 69 },
        ],
        // 第70组
        70: [
            { word: "up", phonetic: "/ʌp/", meaning: "①向上②在上③起来④上涨⑤向上的", example: "Look up the unfamiliar English words in the dictionary in time.", group: 70 },
            { word: "down", phonetic: "/daʊn/", meaning: "①向下②在下③下降④倒下⑤向下的", example: "Write down the core English words in a notebook and review them every day.", group: 70 },
            { word: "in", phonetic: "/ɪn/", meaning: "①在…里②在内③进入④穿着⑤里面的", example: "There are many English reference books in the school library.", group: 70 },
            { word: "out", phonetic: "/aʊt/", meaning: "①在…外②向外③出去④熄灭⑤外面的", example: "Go out of the classroom and practice English oral communication with classmates.", group: 70 },
            { word: "inside", phonetic: "/ˌɪnˈsaɪd/", meaning: "①在里面②内部③里面的④内心", example: "Inside the reading room, everyone is quietly reading English materials.", group: 70 },
            { word: "outside", phonetic: "/ˌaʊtˈsaɪd/", meaning: "①在外面②外部③外面的④外表", example: "Outside the library, there are many benches for reciting English words.", group: 70 },
            { word: "above", phonetic: "/əˈbʌv/", meaning: "①在…上方②高于③以上④在上文", example: "The English sentences above need to be recited and mastered by heart.", group: 70 },
            { word: "below", phonetic: "/bɪˈləʊ/", meaning: "①在…下方②低于③以下④在下文", example: "The English words below are the key points of this unit and need more review.", group: 70 },
            { word: "over", phonetic: "/ˈəʊvə/", meaning: "①在…上方②越过③超过④结束⑤遍及", example: "There is an English clock over the blackboard in the classroom.", group: 70 },
            { word: "under", phonetic: "/ˈʌndə/", meaning: "①在…下方②低于③在…之下④少于", example: "Put the English exercise books under the textbook for easy taking.", group: 70 },
        ],
        // 第71组
        71: [
            { word: "beside", phonetic: "/bɪˈsaɪd/", meaning: "①在…旁边②除…之外③邻近", example: "My deskmate beside me is good at English listening and speaking.", group: 71 },
            { word: "besides", phonetic: "/bɪˈsaɪdz/", meaning: "①除…之外还有②此外③而且", example: "Besides memorizing words, we also need to practice English writing every day.", group: 71 },
            { word: "near", phonetic: "/nɪə/", meaning: "①在…附近②靠近③临近④近乎", example: "There is a convenience store near the English learning center.", group: 71 },
            { word: "far", phonetic: "/fɑː/", meaning: "①远的②遥远的③久远的④很⑤远离", example: "My home is not far from the library, so I go there to study English every day.", group: 71 },
            { word: "close", phonetic: "/kləʊz/", meaning: "①靠近②接近③亲密的④关闭⑤紧紧地", example: "The study room is close to the playground, but it\'s very quiet inside.", group: 71 },
            { word: "distant", phonetic: "/ˈdɪstənt/", meaning: "①遥远的②疏远的③久远的④冷淡的", example: "The distant country uses English as its official language, so we need to master it well.", group: 71 },
            { word: "between", phonetic: "/bɪˈtwiːn/", meaning: "①在…之间②介于…之间③私下", example: "We need to practice English conversations between classmates every day.", group: 71 },
            { word: "among", phonetic: "/əˈmʌŋ/", meaning: "①在…之中②在…中间③被…围绕", example: "Among all the subjects, I like English the most.", group: 71 },
            { word: "amongst", phonetic: "/əˈmʌŋst/", meaning: "①在…之中②在…中间③于…其中", example: "Amongst the many English learning methods, finding the right one is the most important.", group: 71 },
            { word: "beyond", phonetic: "/bɪˈjɒnd/", meaning: "①超出②越过③在…之外④除…以外", example: "The difficulty of this English article is beyond my current level.", group: 71 },
        ],
        // 第72组
        72: [
            { word: "within", phonetic: "/wɪˈðɪn/", meaning: "①在…之内②在…里面③在…期间④不超过", example: "We need to finish the English word review within one hour every morning.", group: 72 },
            { word: "without", phonetic: "/wɪˈðaʊt/", meaning: "①没有②无③不④在…外面", example: "It\'s impossible to master English well without persistent practice.", group: 72 },
            { word: "across", phonetic: "/əˈkrɒs/", meaning: "①穿过②横过③越过④在对面", example: "Walk across the campus square and you will see the English reading room.", group: 72 },
            { word: "through", phonetic: "/θruː/", meaning: "①通过②穿过③经过④凭借⑤从头到尾", example: "We can master English well through constant learning and practice.", group: 72 },
            { word: "along", phonetic: "/əˈlɒŋ/", meaning: "①沿着②顺着③一起④向前", example: "Walk along the path and you will hear students reciting English aloud.", group: 72 },
            { word: "past", phonetic: "/pɑːst/", meaning: "①经过②越过③过去的④昔日⑤往", example: "I walk past the English corner every day and hear interesting conversations.", group: 72 },
            { word: "by", phonetic: "/baɪ/", meaning: "①在…旁边②通过③由④被⑤用", example: "We can learn English by watching English movies and listening to English songs.", group: 72 },
            { word: "via", phonetic: "/ˈvaɪə/", meaning: "①经由②通过③凭借④经过", example: "I learn English via online courses and offline reading.", group: 72 },
            { word: "throughout", phonetic: "/θruːˈaʊt/", meaning: "①遍及②贯穿③从头到尾④在整个…期间", example: "Throughout the whole learning process, persistence is the key to mastering English.", group: 72 },
            { word: "during", phonetic: "/ˈdjʊərɪŋ/", meaning: "①在…期间②在…过程中", example: "During the summer vacation, I plan to finish learning all 882 core English words.", group: 72 },
        ],
        // 第73组
        73: [
            { word: "before", phonetic: "/bɪˈfɔː/", meaning: "①在…之前②以前③先前④宁可", example: "We need to preview the new English words before class.", group: 73 },
            { word: "after", phonetic: "/ˈɑːftə/", meaning: "①在…之后②后来③以后④跟随", example: "Review the learned English words after class to deepen memory.", group: 73 },
            { word: "since", phonetic: "/sɪns/", meaning: "①自从②既然③因为④自…以后", example: "I have kept learning English since I decided to take the postgraduate exam.", group: 73 },
            { word: "until", phonetic: "/ənˈtɪl/", meaning: "①直到…为止②直到…才③在…以前", example: "I will keep memorizing English words until I master all of them.", group: 73 },
            { word: "till", phonetic: "/tɪl/", meaning: "①直到…为止②直到…才③迄", example: "We study English till 9 o\'clock in the evening every day except weekends.", group: 73 },
            { word: "when", phonetic: "/wen/", meaning: "①当…时②什么时候③既然④那时", example: "When I have free time, I will read English articles to expand my vocabulary.", group: 73 },
            { word: "while", phonetic: "/waɪl/", meaning: "①当…时②然而③虽然④一会儿", example: "I listen to English news while I am on my way to school.", group: 73 },
            { word: "as", phonetic: "/æz/", meaning: "①当…时②因为③作为④像⑤随着", example: "As time goes by, my English vocabulary is getting larger and larger.", group: 73 },
            { word: "once", phonetic: "/wʌns/", meaning: "①一旦②曾经③一次④一度", example: "Once you form a good habit of learning English, you will make progress quickly.", group: 73 },
            { word: "twice", phonetic: "/twaɪs/", meaning: "①两次②两倍③两遍", example: "I review each English word twice a day to avoid forgetting.", group: 73 },
        ],
        // 第74组
        74: [
            { word: "again", phonetic: "/əˈɡen/", meaning: "①再一次②又③重新④此外", example: "If you can\'t remember the English word, read it again and again.", group: 74 },
            { word: "yet", phonetic: "/jet/", meaning: "①还②仍然③然而④尚未", example: "I have not yet mastered all the English collocations, so I need to practice more.", group: 74 },
            { word: "already", phonetic: "/ɔːlˈredi/", meaning: "①已经②早已③先前", example: "He has already memorized all 882 core English words for the exam.", group: 74 },
            { word: "still", phonetic: "/stɪl/", meaning: "①仍然②还③依旧④静止的⑤仍然", example: "I still need to practice more English writing to improve my level.", group: 74 },
            { word: "just", phonetic: "/dʒʌst/", meaning: "①刚刚②只是③仅仅④正好⑤刚才", example: "I just finished reciting the English words of this unit and need to review them.", group: 74 },
            { word: "only", phonetic: "/ˈəʊnli/", meaning: "①仅仅②只有③唯一的④只不过", example: "Only by persistent practice can we master English well.", group: 74 },
            { word: "even", phonetic: "/ˈiːvn/", meaning: "①甚至②即使③连④平坦的⑤甚至", example: "Even if it\'s very late, I still insist on reviewing English words for a while.", group: 74 },
            { word: "also", phonetic: "/ˈɔːlsəʊ/", meaning: "①也②同样③并且④此外", example: "In addition to memorizing words, we also need to practice English listening and speaking.", group: 74 },
            { word: "too", phonetic: "/tuː/", meaning: "①也②太③过于④很", example: "I like English, and my deskmate likes it too.", group: 74 },
            { word: "either", phonetic: "/ˈaɪðə/", meaning: "①也(不)②两者任一的③要么…要么", example: "He doesn\'t like English listening, and I don\'t either.", group: 74 },
        ],
        // 第75组
        75: [
            { word: "neither", phonetic: "/ˈnaɪðə/", meaning: "①既不…也不…②两者都不③也不", example: "Neither he nor I am good at English writing, so we need to practice together.", group: 75 },
            { word: "nor", phonetic: "/nɔː/", meaning: "①也不②既不③和…都不", example: "He can\'t speak English fluently, nor can he write a good English composition.", group: 75 },
            { word: "or", phonetic: "/ɔː/", meaning: "①或者②还是③否则④要么…要么", example: "You can either recite English words in the morning or in the evening.", group: 75 },
            { word: "and", phonetic: "/ænd/", meaning: "①和②与③并且④又⑤然后", example: "Memorize English words and do exercise papers to consolidate knowledge.", group: 75 },
            { word: "but", phonetic: "/bʌt/", meaning: "①但是②然而③除了④只", example: "He works very hard, but his English level is still not high enough.", group: 75 },
            { word: "however", phonetic: "/haʊˈevə/", meaning: "①然而②可是③无论如何④不管怎样", example: "Learning English is not easy, however, we can make progress with persistence.", group: 75 },
            { word: "though", phonetic: "/ðəʊ/", meaning: "①虽然②尽管③不过④然而", example: "Though English grammar is difficult, we can master it with more practice.", group: 75 },
            { word: "although", phonetic: "/ɔːlˈðəʊ/", meaning: "①虽然②尽管③即使", example: "Although he has a busy schedule, he still spares one hour to learn English every day.", group: 75 },
            { word: "if", phonetic: "/ɪf/", meaning: "①如果②假如③是否④要是", example: "If you keep learning English every day, you will definitely pass the exam.", group: 75 },
            { word: "unless", phonetic: "/ənˈles/", meaning: "①除非②如果不③若非", example: "You can\'t master English well unless you form a good learning habit.", group: 75 },
        ],
        // 第76组
        76: [
            { word: "provided", phonetic: "/prəˈvaɪdɪd/", meaning: "①假如②倘若③在…条件下", example: "You can make rapid progress in English provided that you practice every day.", group: 76 },
            { word: "providing", phonetic: "/prəˈvaɪdɪŋ/", meaning: "①假如②倘若③在…条件下", example: "Providing you stick to the plan, you will finish memorizing the words on time.", group: 76 },
            { word: "since", phonetic: "/sɪns/", meaning: "①因为②既然③自从④由于", example: "Since English is very important for the exam, we must learn it well.", group: 76 },
            { word: "as", phonetic: "/æz/", meaning: "①因为②由于③当…时④作为", example: "As he is weak in English listening, he practices it for one hour every day.", group: 76 },
            { word: "because", phonetic: "/bɪˈkɒz/", meaning: "①因为②由于③因为…的缘故", example: "I like learning English because it is very useful for future work.", group: 76 },
            { word: "for", phonetic: "/fɔː/", meaning: "①因为②为了③对于④给⑤持续", example: "He studies hard for he wants to pass the English exam with a high score.", group: 76 },
            { word: "so", phonetic: "/səʊ/", meaning: "①所以②因此③如此④那么⑤这样", example: "He practices English every day, so his level is improving rapidly.", group: 76 },
            { word: "thus", phonetic: "/ðʌs/", meaning: "①因此②从而③这样④于是⑤因而", example: "He keeps reviewing English words, thus he can remember them firmly.", group: 76 },
            { word: "therefore", phonetic: "/ˈðeəfɔː/", meaning: "①因此②所以③因而④由此", example: "English vocabulary is the foundation, therefore we must memorize the core words first.", group: 76 },
            { word: "hence", phonetic: "/hens/", meaning: "①因此②所以③从此④由此", example: "Hence, we can see that persistence is the key to learning English well.", group: 76 },
        ],
        // 第77组
        77: [
            { word: "accordingly", phonetic: "/əˈkɔːdɪŋli/", meaning: "①因此②于是③相应地④照着", example: "He is not good at English, accordingly, he needs to spend more time on it.", group: 77 },
            { word: "consequently", phonetic: "/ˈkɒnsɪkwəntli/", meaning: "①因此②结果③所以④因而", example: "He ignored the review of English words, consequently he forgot most of them.", group: 77 },
            { word: "besides", phonetic: "/bɪˈsaɪdz/", meaning: "①此外②而且③除…之外还有", example: "Besides memorizing words, we also need to practice reading and writing.", group: 77 },
            { word: "except", phonetic: "/ɪkˈsept/", meaning: "①除…之外②不包括③把…除外", example: "I have learned all the English words except these difficult ones.", group: 77 },
            { word: "additionally", phonetic: "/əˈdɪʃənəli/", meaning: "①此外②另外③附加地④加之", example: "Additionally, listening to English news can improve our listening ability.", group: 77 },
            { word: "furthermore", phonetic: "/ˈfɜːðəmɔː/", meaning: "①此外②而且③进一步地④再者", example: "Furthermore, we can communicate with foreign teachers to improve our oral English.", group: 77 },
            { word: "moreover", phonetic: "/mɔːˈrəʊvə/", meaning: "①此外②而且③再者④加之", example: "Moreover, reading English novels can expand our vocabulary and improve our comprehension.", group: 77 },
            { word: "meanwhile", phonetic: "/ˈmiːnwaɪl/", meaning: "①同时②与此同时③在此期间", example: "I am memorizing English words, meanwhile my deskmate is doing reading exercises.", group: 77 },
            { word: "meantime", phonetic: "/ˈmiːntaɪm/", meaning: "①同时②在此期间③与此同时", example: "In the meantime, we can listen to English light music to relax when we are tired.", group: 77 },
            { word: "instead", phonetic: "/ɪnˈsted/", meaning: "①代替②反而③相反④却", example: "Don\'t just memorize English words, instead, learn to use them in sentences.", group: 77 },
        ],
        // 第78组
        78: [
            { word: "rather", phonetic: "/ˈrɑːðə/", meaning: "①宁可②相当③反而④更确切地", example: "I would rather spend one hour learning English than watch TV.", group: 78 },
            { word: "otherwise", phonetic: "/ˈʌðəwaɪz/", meaning: "①否则②不然③另外④在其他方面", example: "You must review English words every day, otherwise you will forget them quickly.", group: 78 },
            { word: "nevertheless", phonetic: "/ˌnevəðəˈles/", meaning: "①然而②尽管如此③不过④仍然", example: "The English exam is very difficult, nevertheless, we will try our best to pass it.", group: 78 },
            { word: "nonetheless", phonetic: "/ˌnʌnðəˈles/", meaning: "①尽管如此②然而③不过④仍然", example: "He has little time to learn English, nonetheless, he still makes steady progress.", group: 78 },
            { word: "despite", phonetic: "/dɪˈspaɪt/", meaning: "①尽管②不管③不顾", example: "Despite the heavy workload, he still insists on learning English every day.", group: 78 },
            { word: "similarly", phonetic: "/ˈsɪmɪləli/", meaning: "①同样地②类似地③相仿地", example: "Similarly, learning English grammar is as important as memorizing words.", group: 78 },
            { word: "likewise", phonetic: "/ˈlaɪkwaɪz/", meaning: "①同样地②也③照样地④类似地", example: "Likewise, we need to practice English writing as often as listening.", group: 78 },
            { word: "like", phonetic: "/laɪk/", meaning: "①像②比如③喜欢④如同⑤像…一样", example: "Some English prepositions, like in, on and at, are often tested in the exam.", group: 78 },
            { word: "namely", phonetic: "/ˈneɪmli/", meaning: "①即②也就是③换句话说④亦即", example: "There are three key points to learn English, namely, words, grammar and practice.", group: 78 },
            { word: "finally", phonetic: "/ˈfaɪnəli/", meaning: "①最后②终于③最终④总算", example: "Finally, we need to do more mock exams to adapt to the English test format.", group: 78 },
        ],
        // 第79组
        79: [
            { word: "regarding", phonetic: "/rɪˈɡɑːdɪŋ/", meaning: "①关于②至于③就…而论④有关", example: "Regarding the review of English core words, we have made a detailed plan.", group: 79 },
            { word: "concerning", phonetic: "/kənˈsɜːnɪŋ/", meaning: "①关于②涉及③就…而言④有关", example: "Concerning the English exam, the teacher gave us a lot of useful suggestions.", group: 79 },
            { word: "about", phonetic: "/əˈbaʊt/", meaning: "①关于②大约③周围④到处⑤对于", example: "We learned a lot of English words about daily life today.", group: 79 },
            { word: "on", phonetic: "/ɒn/", meaning: "①在…上②关于③在…时候④通过⑤穿着", example: "There is an English newspaper on the desk for us to read.", group: 79 },
            { word: "in", phonetic: "/ɪn/", meaning: "①在…里②用③在…期间④穿着⑤从事", example: "We need to write the composition in English in the exam.", group: 79 },
            { word: "at", phonetic: "/æt/", meaning: "①在…处②在…时刻③向④以⑤因为", example: "We have English class at 8 o\'clock every Monday morning.", group: 79 },
            { word: "by", phonetic: "/baɪ/", meaning: "①用②通过③由④在…旁边⑤被", example: "We can improve our English by reading more articles.", group: 79 },
            { word: "with", phonetic: "/wɪð/", meaning: "①和…一起②用③带有④随着⑤关于", example: "I study English with my deskmate every afternoon.", group: 79 },
            { word: "for", phonetic: "/fɔː/", meaning: "①为了②对于③给④持续⑤因为", example: "This English dictionary is prepared for the postgraduate exam.", group: 79 },
            { word: "to", phonetic: "/tuː/", meaning: "①到②向③给④对⑤为了", example: "I write English words from the textbook to the notebook.", group: 79 },
        ],
        // 第80组
        80: [
            { word: "from", phonetic: "/frəm/", meaning: "①从…②来自③由于④离⑤避免", example: "I learn English from the teacher and online courses.", group: 80 },
            { word: "of", phonetic: "/ɒv/", meaning: "①…的②属于③关于④由…组成⑤助动词", example: "This is a list of the 882 core English words for the exam.", group: 80 },
            { word: "off", phonetic: "/ɒf/", meaning: "①离开②脱落③关闭④下班⑤离开…的", example: "Take off the English vocabulary cards and recite them one by one.", group: 80 },
            { word: "up", phonetic: "/ʌp/", meaning: "①向上②沿着③起来④完成⑤提高", example: "We need to give up playing mobile phones and focus on English learning.", group: 80 },
            { word: "down", phonetic: "/daʊn/", meaning: "①向下②沿着…而下③写下④降低⑤倒下", example: "Write down the English words you can\'t remember for key review.", group: 80 },
            { word: "into", phonetic: "/ˈɪntuː/", meaning: "①进入②到…里③变成④融入", example: "Translate the Chinese sentences into English to practice writing.", group: 80 },
            { word: "onto", phonetic: "/ˈɒntuː/", meaning: "①到…之上②向…之上③登上", example: "Stick the English vocabulary cards onto the wall for easy review.", group: 80 },
            { word: "out", phonetic: "/aʊt/", meaning: "①出去②离开③出来④熄灭⑤出版", example: "Take out your English notebooks and start to review the words.", group: 80 },
            { word: "outside", phonetic: "/ˌaʊtˈsaɪd/", meaning: "①在外面②向外面③在…之外④外面的", example: "We read English articles outside the classroom to practice oral English.", group: 80 },
            { word: "over", phonetic: "/ˈəʊvə/", meaning: "①在…上方②越过③超过④结束⑤通过", example: "We went over all the English core words before the exam.", group: 80 },
        ],
        // 第81组
        81: [
            { word: "past", phonetic: "/pɑːst/", meaning: "①经过②越过③超过④过去的⑤往", example: "Don\'t look back at the past, just keep learning English hard now.", group: 81 },
            { word: "round", phonetic: "/raʊnd/", meaning: "①围绕②在…周围③绕过④大约⑤圆的", example: "We sit round the table and practice English oral communication together.", group: 81 },
            { word: "toward", phonetic: "/təˈwɔːd/", meaning: "①向②朝③对于④接近⑤有助于", example: "We are working hard toward mastering all the English core words.", group: 81 },
            { word: "towards", phonetic: "/təˈwɔːdz/", meaning: "①向②朝③对于④接近⑤关于", example: "His attitude towards English learning is very positive.", group: 81 },
            { word: "under", phonetic: "/ˈʌndə/", meaning: "①在…之下②低于③在…领导下④根据", example: "We need to learn English under the guidance of the teacher.", group: 81 },
            { word: "underneath", phonetic: "/ˌʌndəˈniːθ/", meaning: "①在…下面②在…底下③底部④在下方", example: "Put the English exercise books underneath the dictionary for storage.", group: 81 },
            { word: "until", phonetic: "/ənˈtɪl/", meaning: "①直到…为止②在…之前③直到…才", example: "We will keep learning English until the day of the exam.", group: 81 },
            { word: "upon", phonetic: "/əˈpɒn/", meaning: "①在…之上②一…就③登上④依靠", example: "Upon seeing the English words, I can remember their meanings immediately.", group: 81 },
            { word: "here", phonetic: "/hɪə/", meaning: "①这里②在这里③向这里④此时", example: "Here is the key point of English word memory that we need to master.", group: 81 },
            { word: "there", phonetic: "/ðeə/", meaning: "①那里②在那里③向那里④那", example: "There are a lot of English learning resources in the school library.", group: 81 },
        ],
        // 第82组
        82: [
            { word: "everywhere", phonetic: "/ˈevriweə/", meaning: "①到处②处处③无论何处④各个地方", example: "You can see English signs and bilingual notices everywhere in the campus.", group: 82 },
            { word: "nowhere", phonetic: "/ˈnəʊweə/", meaning: "①无处②任何地方都不③毫无结果", example: "Nowhere can you find a better place to learn English than the library.", group: 82 },
            { word: "somewhere", phonetic: "/ˈsʌmweə/", meaning: "①在某处②到某处③某个地方④大约", example: "I left my English notebook somewhere in the classroom, I need to find it.", group: 82 },
            { word: "anywhere", phonetic: "/ˈeniweə/", meaning: "①任何地方②无论何处③随便哪里", example: "You can review English words anywhere as long as you have a mobile phone.", group: 82 },
            { word: "home", phonetic: "/həʊm/", meaning: "①家②在家③向家④本国⑤家庭的", example: "I study English at home every night after work.", group: 82 },
            { word: "abroad", phonetic: "/əˈbrɔːd/", meaning: "①在国外②到国外③海外④广泛地", example: "Many students go abroad to study English for a better foundation.", group: 82 },
            { word: "indoors", phonetic: "/ˌɪnˈdɔːz/", meaning: "①在室内②在屋里③向内", example: "We study English indoors when the weather is bad.", group: 82 },
            { word: "outdoors", phonetic: "/ˌaʊtˈdɔːz/", meaning: "①在户外②在野外③向外", example: "We practice English oral communication outdoors when the weather is fine.", group: 82 },
            { word: "upstairs", phonetic: "/ˌʌpˈsteəz/", meaning: "①在楼上②到楼上③楼上的", example: "The English reading room is upstairs on the second floor of the library.", group: 82 },
            { word: "downstairs", phonetic: "/ˌdaʊnˈsteəz/", meaning: "①在楼下②到楼下③楼下的", example: "There is an English corner downstairs in the teaching building every Friday.", group: 82 },
        ],
        // 第83组
        83: [
            { word: "forward", phonetic: "/ˈfɔːwəd/", meaning: "①向前②前进③今后④提前⑤向前的", example: "We look forward to making greater progress in English learning.", group: 83 },
            { word: "backward", phonetic: "/ˈbækwəd/", meaning: "①向后②倒着③退步④过去的⑤向后的", example: "Don\'t look backward, keep moving forward in English learning.", group: 83 },
            { word: "forwards", phonetic: "/ˈfɔːwədz/", meaning: "①向前②前进③今后④往前", example: "We move forwards step by step in mastering English core words.", group: 83 },
            { word: "backwards", phonetic: "/ˈbækwədz/", meaning: "①向后②倒着③退步④往回", example: "It\'s a good way to recite English words backwards to deepen memory.", group: 83 },
            { word: "ahead", phonetic: "/əˈhed/", meaning: "①在前面②向前③提前④未来", example: "There are still many English words to learn ahead, so we can\'t relax.", group: 83 },
            { word: "behind", phonetic: "/bɪˈhaɪnd/", meaning: "①在后面②落后③支持④隐藏", example: "Don\'t fall behind other students in English learning.", group: 83 },
            { word: "aside", phonetic: "/əˈsaɪd/", meaning: "①在旁边②到一边③撇开④此外", example: "Put the unimportant things aside and focus on English learning.", group: 83 },
            { word: "away", phonetic: "/əˈweɪ/", meaning: "①离开②远离③消失④去掉⑤不断地", example: "Put away your mobile phone and concentrate on memorizing English words.", group: 83 },
            { word: "nearby", phonetic: "/ˌnɪəˈbaɪ/", meaning: "①在附近②附近的③就近④在旁边", example: "There is a coffee shop nearby where we can read English books.", group: 83 },
            { word: "faraway", phonetic: "/ˈfɑːrəweɪ/", meaning: "①遥远的②久远的③远处的④偏远的", example: "The faraway country uses English as its official language.", group: 83 },
        ],
        // 第84组
        84: [
            { word: "close", phonetic: "/kləʊz/", meaning: "①靠近②接近③紧密地④亲密地", example: "Study English close to the teacher to get more guidance.", group: 84 },
            { word: "apart", phonetic: "/əˈpɑːt/", meaning: "①分开②相距③单独地④分离", example: "Take the English vocabulary cards apart and recite them one by one.", group: 84 },
            { word: "alone", phonetic: "/əˈləʊn/", meaning: "①独自地②单独③只有④孤独的", example: "I like to learn English alone in the quiet reading room.", group: 84 },
            { word: "together", phonetic: "/təˈɡeðə/", meaning: "①一起②共同③总共④同时", example: "We learn English together and make progress together.", group: 84 },
        ],},

    // 相似词组示例
    similarWords: {
        "abandon": ["desert", "forsake", "quit"],
        "ability": ["capability", "capacity", "competence"],
        "accept": ["receive", "admit", "acknowledge"],
        "accurate": ["precise", "exact", "correct"],
        "achieve": ["accomplish", "attain", "fulfill"]
    },

    // 高级词汇（暂时为空）
    advancedVocabulary: {},
    
    // 中级词汇（暂时为空）
    intermediateVocabulary: {},

    // 词组搭配（暂时为空）
    phrases: {}
};

// 用户词汇进度存储
let userVocabularyProgress = {
    // word: { status: 'new'|'learning'|'mastered', reviewCount: 0, wrongCount: 0, nextReview: null }
};

// 导入的自定义词汇库
let customVocabularies = {};

// 从localStorage加载
function loadVocabularyData() {
    const saved = localStorage.getItem('studyx_vocab_progress');
    if (saved) {
        userVocabularyProgress = JSON.parse(saved);
    }
    const custom = localStorage.getItem('studyx_custom_vocab');
    if (custom) {
        customVocabularies = JSON.parse(custom);
    }
    
    // 注意：不再从localStorage加载内置词汇数据，使用JS文件中的硬编码数据
    // 这样可以确保数据一致性和性能
}

// 保存到localStorage
function saveVocabularyData() {
    localStorage.setItem('studyx_vocab_progress', JSON.stringify(userVocabularyProgress));
    localStorage.setItem('studyx_custom_vocab', JSON.stringify(customVocabularies));
}

// 解析导入的词汇文件
function parseVocabularyFile(content, format) {
    const words = [];
    
    if (format === 'json') {
        try {
            const data = JSON.parse(content);
            return Array.isArray(data) ? data : data.words || [];
        } catch (e) {
            console.error('JSON解析失败:', e);
            return [];
        }
    }
    
    if (format === 'csv') {
        // CSV格式: word,phonetic,meaning,level,group
        const lines = content.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const word = {};
            headers.forEach((header, index) => {
                word[header] = values[index] || '';
            });
            if (word.word) words.push(word);
        }
        return words;
    }
    
    if (format === 'txt') {
        // TXT格式: 每行一个单词，格式: word | phonetic | meaning
        const lines = content.split('\n').filter(line => line.trim());
        lines.forEach(line => {
            const parts = line.split('|').map(p => p.trim());
            if (parts.length >= 2) {
                words.push({
                    word: parts[0],
                    phonetic: parts[1] || '',
                    meaning: parts[2] || parts[1] || '',
                    level: 1,
                    group: 1
                });
            }
        });
        return words;
    }
    
    return words;
}

// 获取音频文件对应的分组范围
function getAudioFileGroups(level, audioFileNumber) {
    const levelConfig = vocabularyData.levels[level];
    if (!levelConfig) return null;
    
    const startGroup = (audioFileNumber - 1) * levelConfig.groupsPerAudio + 1;
    const endGroup = Math.min(audioFileNumber * levelConfig.groupsPerAudio, levelConfig.groups);
    
    return {
        audioFile: audioFileNumber,
        startGroup: startGroup,
        endGroup: endGroup,
        totalGroups: endGroup - startGroup + 1
    };
}

// 获取单词所属的音频文件
function getWordAudioFile(level, groupNumber) {
    const levelConfig = vocabularyData.levels[level];
    if (!levelConfig) return null;
    
    return Math.ceil(groupNumber / levelConfig.groupsPerAudio);
}

// 获取所有音频文件列表
function getAudioFilesList(level) {
    const levelConfig = vocabularyData.levels[level];
    if (!levelConfig) return [];
    
    const files = [];
    for (let i = 1; i <= levelConfig.audioFiles; i++) {
        files.push(getAudioFileGroups(level, i));
    }
    return files;
}

// 保存各等级词汇到localStorage
function saveLevelVocabulary(level, data) {
    const keyMap = {
        basic: 'studyx_builtin_vocab_basic',
        intermediate: 'studyx_builtin_vocab_intermediate',
        advanced: 'studyx_builtin_vocab_advanced',
        phrase: 'studyx_builtin_vocab_phrase'
    };
    const key = keyMap[level];
    if (key) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

// 初始化
loadVocabularyData();
