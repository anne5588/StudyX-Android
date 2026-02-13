// ===== 经济学综合知识点数据库（匹配紫依经济学背诵讲义） =====
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
        },

        // ===== 财政学 =====
        {
            id: 'fis-001',
            module: 'fiscal',
            type: 'term',
            title: '免费搭车行为',
            content: '是指不承担任何成本而消费或使用公共物品的行为。有这种行为的人具有让别人付钱而自己享用的动机。',
            tip: '记忆：想"搭车"但不想"买票" = 只享受不付出',
            examYears: ['14', '19'],
            difficulty: 2
        },
        {
            id: 'fis-002',
            module: 'fiscal',
            type: 'term',
            title: '寻租行为',
            content: '是指人们凭借政府保护进行的为追求自身经济利益的活动。其特点是把那些本应当用于价值生产活动的资源用于为了决定分配结果的竞争。寻租行为是一种非生产性活动。',
            tip: '记忆："寻"找"租"金/特权 = 寻求政府保护获利',
            examYears: ['17', '21'],
            difficulty: 3
        },
        {
            id: 'fis-003',
            module: 'fiscal',
            type: 'term',
            title: '政府失灵',
            content: '是指政府的活动或干预措施缺乏效率，或者说政府做出了降低经济效率的决策或不能实施改善经济效率的决策。',
            tip: '记忆：与市场失灵相对，政府干预反而降低效率',
            examYears: ['20'],
            difficulty: 2
        },
        {
            id: 'fis-004',
            module: 'fiscal',
            type: 'term',
            title: '购买性支出',
            content: '是指政府购买商品和服务的支出，包括购买进行日常政务活动所需的或用于国家投资所需的商品和服务的支出。',
            tip: '记忆：一手交钱一手交货，有实际商品交换',
            examYears: ['15', '22'],
            difficulty: 2
        },
        {
            id: 'fis-005',
            module: 'fiscal',
            type: 'term',
            title: '拉弗曲线',
            content: '描绘了税收收入与税率之间的关系。曲线表明：当税率在一定限度以下时，提高税率能增加税收收入；但超过一定限度时，再提高税率反而会导致税收收入减少。',
            tip: '记忆：税率像弹簧，压太紧反而弹不回来',
            examYears: ['16', '23'],
            difficulty: 3
        },
        {
            id: 'fis-006',
            module: 'fiscal',
            type: 'term',
            title: '财政赤字',
            content: '是指在某一财政年度，计划的财政支出超过财政收入，导致财政收支出现差额的现象。',
            tip: '记忆：支出 > 收入 = 赤字（红字）',
            examYears: ['18', '24'],
            difficulty: 1
        },
        {
            id: 'fis-007',
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
            id: 'fis-008',
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
            content: '是指中央银行为实现特定经济目标而采取的控制和调节货币供给量、信用量的方针、政策和措施的总称。主要目标：物价稳定、充分就业、经济增长、国际收支平衡。',
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
        const titleMatch = line.match(/^(\d+)[\.、]\s*(.+)/);
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
            const typeStr = line.replace(/.*题型[：:]\s*/, '').trim();
            if (typeStr.includes('选择')) currentItem.type = 'choice';
            else if (typeStr.includes('简答')) currentItem.type = 'short';
            else currentItem.type = 'term';
            continue;
        }
        
        // 检测记忆技巧
        if (line.includes('记忆技巧') || line.includes('记忆：') || line.includes('💡')) {
            currentItem.tip = line.replace(/.*记忆技巧[：:]?\s*/, '').replace(/.*记忆[：:]?\s*/, '').replace('💡', '').trim();
            continue;
        }
        
        // 检测真题年份
        if (line.includes('真题') || line.includes('📝')) {
            const yearsMatch = line.match(/(\d{2})[、,，年\s]+/g);
            if (yearsMatch) {
                currentItem.examYears = yearsMatch.map(y => y.replace(/[^\d]/g, ''));
            }
            continue;
        }
        
        // 其他内容
        if (currentItem && line && !line.startsWith('==') && !line.startsWith('【')) {
            currentContent.push(line.replace(/^\d+[\.、]\s*/, ''));
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
