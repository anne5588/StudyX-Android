// ===== 英语词汇数据库 =====
const vocabularyData = {
    // 词汇等级 - 按照基础词汇分组_1-3级.pdf文件结构
    levels: {
        // 基础词汇：共130组，分26个音频文件，每文件5组
        basic: { name: '基础词汇', groups: 130, wordsPerGroup: 5, audioFiles: 26, groupsPerAudio: 5 },
        // 高级词汇：共460组，分46个音频文件，每文件10组
        advanced: { name: '高级词汇', groups: 460, wordsPerGroup: 5, audioFiles: 46, groupsPerAudio: 10 },
        // 词组搭配：共700个，分70个音频文件，每文件10个
        phrase: { name: '词组搭配', groups: 70, wordsPerGroup: 10, audioFiles: 70, groupsPerAudio: 10 }
    },

    // 基础词汇（第1-130组，每组5个单词）
    basicVocabulary: {
        // 第1音频文件（第1-5组）
        1: [
            { word: "abandon", phonetic: "/əˈbændən/", meaning: "v. 放弃，遗弃", level: 1, group: 1 },
            { word: "ability", phonetic: "/əˈbɪləti/", meaning: "n. 能力，才能", level: 1, group: 1 },
            { word: "abroad", phonetic: "/əˈbrɔːd/", meaning: "adv. 在国外，到国外", level: 1, group: 1 },
            { word: "absence", phonetic: "/ˈæbsəns/", meaning: "n. 缺席，缺乏", level: 1, group: 1 },
            { word: "absolute", phonetic: "/ˈæbsəluːt/", meaning: "a. 绝对的，完全的", level: 1, group: 1 }
        ],
        2: [
            { word: "absorb", phonetic: "/əbˈsɔːrb/", meaning: "v. 吸收，吸引", level: 1, group: 2 },
            { word: "abstract", phonetic: "/ˈæbstrækt/", meaning: "a. 抽象的 n. 摘要", level: 1, group: 2 },
            { word: "abundant", phonetic: "/əˈbʌndənt/", meaning: "a. 丰富的，充裕的", level: 1, group: 2 },
            { word: "academic", phonetic: "/ˌækəˈdemɪk/", meaning: "a. 学术的，学院的", level: 1, group: 2 },
            { word: "academy", phonetic: "/əˈkædəmi/", meaning: "n. 学院，研究院", level: 1, group: 2 }
        ],
        3: [
            { word: "accelerate", phonetic: "/əkˈseləreɪt/", meaning: "v. 加速，促进", level: 1, group: 3 },
            { word: "accent", phonetic: "/ˈæksent/", meaning: "n. 口音，重音", level: 1, group: 3 },
            { word: "accept", phonetic: "/əkˈsept/", meaning: "v. 接受，认可", level: 1, group: 3 },
            { word: "access", phonetic: "/ˈækses/", meaning: "n. 入口，通道 v. 存取", level: 1, group: 3 },
            { word: "accident", phonetic: "/ˈæksɪdənt/", meaning: "n. 事故，意外", level: 1, group: 3 }
        ],
        4: [
            { word: "accompany", phonetic: "/əˈkʌmpəni/", meaning: "v. 陪伴，伴随", level: 1, group: 4 },
            { word: "accomplish", phonetic: "/əˈkʌmplɪʃ/", meaning: "v. 完成，实现", level: 1, group: 4 },
            { word: "accord", phonetic: "/əˈkɔːrd/", meaning: "v. 一致，符合 n. 协议", level: 1, group: 4 },
            { word: "account", phonetic: "/əˈkaʊnt/", meaning: "n. 账户，解释 v. 说明", level: 1, group: 4 },
            { word: "accumulate", phonetic: "/əˈkjuːmjəleɪt/", meaning: "v. 积累，积聚", level: 1, group: 4 }
        ],
        5: [
            { word: "accurate", phonetic: "/ˈækjərət/", meaning: "a. 精确的，准确的", level: 1, group: 5 },
            { word: "accuse", phonetic: "/əˈkjuːz/", meaning: "v. 控告，指责", level: 1, group: 5 },
            { word: "achieve", phonetic: "/əˈtʃiːv/", meaning: "v. 达到，实现", level: 1, group: 5 },
            { word: "achievement", phonetic: "/əˈtʃiːvmənt/", meaning: "n. 成就，成绩", level: 1, group: 5 },
            { word: "acknowledge", phonetic: "/əkˈnɒlɪdʒ/", meaning: "v. 承认，致谢", level: 1, group: 5 }
        ],
        // 第2音频文件（第6-10组）示例
        6: [
            { word: "acquire", phonetic: "/əˈkwaɪər/", meaning: "v. 获得，学到", level: 1, group: 6 },
            { word: "acquisition", phonetic: "/ˌækwɪˈzɪʃn/", meaning: "n. 获得，收购", level: 1, group: 6 },
            { word: "adapt", phonetic: "/əˈdæpt/", meaning: "v. 适应，改编", level: 1, group: 6 },
            { word: "adequate", phonetic: "/ˈædɪkwət/", meaning: "a. 足够的，适当的", level: 1, group: 6 },
            { word: "adjust", phonetic: "/əˈdʒʌst/", meaning: "v. 调整，适应", level: 1, group: 6 }
        ]
    },

    // 相似词组示例
    similarWords: {
        "abandon": ["desert", "forsake", "quit"],
        "ability": ["capability", "capacity", "competence"],
        "accept": ["receive", "admit", "acknowledge"],
        "accurate": ["precise", "exact", "correct"],
        "achieve": ["accomplish", "attain", "fulfill"]
    },

    // 高级词汇（第1-460组，每组5个单词）
    advancedVocabulary: {
        // 第1音频文件（第1-10组）示例
        1: [
            { word: "abbreviate", phonetic: "/əˈbriːvieɪt/", meaning: "v. 缩写，缩短", level: 2, group: 1 },
            { word: "abnormal", phonetic: "/æbˈnɔːrml/", meaning: "a. 异常的，反常的", level: 2, group: 1 },
            { word: "abolish", phonetic: "/əˈbɒlɪʃ/", meaning: "v. 废除，取消", level: 2, group: 1 },
            { word: "abrasion", phonetic: "/əˈbreɪʒn/", meaning: "n. 磨损，擦伤", level: 2, group: 1 },
            { word: "abrupt", phonetic: "/əˈbrʌpt/", meaning: "a. 突然的，陡峭的", level: 2, group: 1 }
        ],
        2: [
            { word: "absurd", phonetic: "/əbˈsɜːrd/", meaning: "a. 荒谬的，可笑的", level: 2, group: 2 },
            { word: "abundance", phonetic: "/əˈbʌndəns/", meaning: "n. 丰富，充裕", level: 2, group: 2 },
            { word: "academic", phonetic: "/ˌækəˈdemɪk/", meaning: "a. 学术的，学院的", level: 2, group: 2 },
            { word: "acceleration", phonetic: "/əkˌseləˈreɪʃn/", meaning: "n. 加速，促进", level: 2, group: 2 },
            { word: "accentuate", phonetic: "/əkˈsentʃueɪt/", meaning: "v. 强调，重读", level: 2, group: 2 }
        ]
    },

    // 词组搭配（第1-70组，每组10个短语）
    phrases: {
        1: [
            { phrase: "abide by", meaning: "遵守，服从" },
            { phrase: "account for", meaning: "解释，说明；占...比例" },
            { phrase: "adapt to", meaning: "适应" },
            { phrase: "add up to", meaning: "总计达" },
            { phrase: "allow for", meaning: "考虑到，顾及" },
            { phrase: "answer for", meaning: "对...负责" },
            { phrase: "apply for", meaning: "申请" },
            { phrase: "attend to", meaning: "处理，照料" },
            { phrase: "back up", meaning: "支持，备份" },
            { phrase: "base on", meaning: "以...为基础" }
        ],
        2: [
            { phrase: "be aware of", meaning: "意识到" },
            { phrase: "be capable of", meaning: "能够" },
            { phrase: "be composed of", meaning: "由...组成" },
            { phrase: "be concerned about", meaning: "关心，担忧" },
            { phrase: "be consistent with", meaning: "与...一致" },
            { phrase: "be content with", meaning: "满足于" },
            { phrase: "be dedicated to", meaning: "致力于" },
            { phrase: "be derived from", meaning: "源自" },
            { phrase: "be entitled to", meaning: "有权" },
            { phrase: "be exposed to", meaning: "暴露于" }
        ]
    }
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
    
    // 加载导入的各等级词汇
    const importedBasic = localStorage.getItem('studyx_builtin_vocab_basic');
    if (importedBasic) {
        Object.assign(vocabularyData.basic, JSON.parse(importedBasic));
    }
    const importedIntermediate = localStorage.getItem('studyx_builtin_vocab_intermediate');
    if (importedIntermediate) {
        Object.assign(vocabularyData.intermediate, JSON.parse(importedIntermediate));
    }
    const importedAdvanced = localStorage.getItem('studyx_builtin_vocab_advanced');
    if (importedAdvanced) {
        Object.assign(vocabularyData.advanced, JSON.parse(importedAdvanced));
    }
    const importedPhrase = localStorage.getItem('studyx_builtin_vocab_phrase');
    if (importedPhrase) {
        Object.assign(vocabularyData.phrases, JSON.parse(importedPhrase));
    }
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
