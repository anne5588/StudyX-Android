// ===== 智能混合字典 =====
// 1. 优先查本地字典（快、离线可用）
// 2. 本地没有则调用 AI 翻译（准、支持生僻词）
// 3. 自动缓存 AI 结果到本地

const smartDictionary = {
    // 配置
    config: {
        // AI 翻译 API 配置（用户可自行切换）
        // 选项: 'mymemory'(免费), 'openai', 'claude', 'custom'
        aiProvider: 'mymemory', 
        openaiKey: '', // 用户填写
        openaiModel: 'gpt-3.5-turbo',
        customApiUrl: '',
        // 缓存设置
        cacheEnabled: true,
        cacheMaxSize: 1000 // 最多缓存1000个AI查词结果
    },
    
    // AI 缓存（存储在内存，页面刷新后清空，可扩展存 localStorage）
    aiCache: new Map(),
    
    // 初始化
    init() {
        // 从 localStorage 加载缓存
        this.loadCacheFromStorage();
        console.log('[SmartDict] 智能字典初始化完成');
    },
    
    // ===== 核心查词函数 =====
    async lookup(word, options = {}) {
        const { forceAI = false, showLoading = null } = options;
        
        if (!word || word.trim().length < 1) {
            return null;
        }
        
        const searchWord = word.toLowerCase().trim();
        
        // 第1步：强制使用AI（如果用户选择）
        if (forceAI && navigator.onLine) {
            return await this.queryAI(searchWord, showLoading);
        }
        
        // 第2步：查本地字典
        const localResult = this.lookupLocal(searchWord);
        if (localResult) {
            console.log('[SmartDict] 本地命中:', searchWord);
            return {
                ...localResult,
                source: 'local',
                cached: false
            };
        }
        
        // 第3步：查 AI 缓存
        if (this.aiCache.has(searchWord)) {
            console.log('[SmartDict] 缓存命中:', searchWord);
            return {
                ...this.aiCache.get(searchWord),
                source: 'ai-cache',
                cached: true
            };
        }
        
        // 第4步：调用 AI 翻译（如果在线）
        if (navigator.onLine) {
            return await this.queryAI(searchWord, showLoading);
        }
        
        // 第5步：离线且无结果
        return {
            word: searchWord,
            meaning: '（离线模式）未找到该单词释义',
            phonetic: '',
            example: '',
            source: 'offline',
            notFound: true
        };
    },
    
    // ===== 本地查词 =====
    lookupLocal(word) {
        // 使用 readingAssistant 的 findWordInfo 逻辑
        if (typeof readingAssistant !== 'undefined' && readingAssistant.findWordInfo) {
            return readingAssistant.findWordInfo(word);
        }
        
        // 备用：直接查 coreDictionary
        if (typeof findInCoreDictionary === 'function') {
            return findInCoreDictionary(word);
        }
        
        return null;
    },
    
    // ===== AI 查词 =====
    async queryAI(word, showLoadingCallback) {
        console.log('[SmartDict] AI 查词:', word);
        
        // 显示加载中
        if (showLoadingCallback) showLoadingCallback(true);
        
        try {
            let result = null;
            
            switch (this.config.aiProvider) {
                case 'mymemory':
                    result = await this.queryMyMemory(word);
                    break;
                case 'openai':
                    result = await this.queryOpenAI(word);
                    break;
                case 'custom':
                    result = await this.queryCustom(word);
                    break;
                default:
                    result = await this.queryMyMemory(word);
            }
            
            // 缓存结果
            if (result && this.config.cacheEnabled) {
                this.cacheResult(word, result);
            }
            
            return {
                ...result,
                source: 'ai',
                cached: false
            };
            
        } catch (error) {
            console.error('[SmartDict] AI 查词失败:', error);
            return {
                word: word,
                meaning: '查询失败，请检查网络',
                phonetic: '',
                example: '',
                source: 'error',
                error: error.message
            };
        } finally {
            if (showLoadingCallback) showLoadingCallback(false);
        }
    },
    
    // ===== MyMemory API（免费，无需Key）=====
    async queryMyMemory(word) {
        // MyMemory 是免费的翻译 API
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|zh`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.responseStatus === 200) {
            return {
                word: word,
                meaning: data.responseData.translatedText,
                phonetic: '',
                example: '',
                tip: '🤖 AI 翻译结果'
            };
        }
        
        throw new Error(data.responseDetails || '翻译失败');
    },
    
    // ===== OpenAI API（需要Key，质量更高）=====
    async queryOpenAI(word) {
        if (!this.config.openaiKey) {
            throw new Error('未配置 OpenAI API Key');
        }
        
        const prompt = `请解释英文单词 "${word}"，格式如下：
音标：/xxx/
释义：中文释义
例句：一句英文例句（含中文翻译）`;
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.openaiKey}`
            },
            body: JSON.stringify({
                model: this.config.openaiModel,
                messages: [
                    { role: 'system', content: '你是一个专业的英语词典助手。' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.3
            })
        });
        
        const data = await response.json();
        const content = data.choices[0].message.content;
        
        // 解析返回的内容
        return this.parseAIResponse(word, content);
    },
    
    // ===== 自定义 API =====
    async queryCustom(word) {
        if (!this.config.customApiUrl) {
            throw new Error('未配置自定义 API URL');
        }
        
        const response = await fetch(this.config.customApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ word: word, from: 'en', to: 'zh' })
        });
        
        return await response.json();
    },
    
    // 解析 AI 返回的文本
    parseAIResponse(word, content) {
        const lines = content.split('\n');
        let phonetic = '';
        let meaning = '';
        let example = '';
        
        for (const line of lines) {
            if (line.includes('音标：')) {
                phonetic = line.replace('音标：', '').trim();
            } else if (line.includes('释义：')) {
                meaning = line.replace('释义：', '').trim();
            } else if (line.includes('例句：')) {
                example = line.replace('例句：', '').trim();
            }
        }
        
        // 如果没解析到，把整段当释义
        if (!meaning) {
            meaning = content;
        }
        
        return {
            word: word,
            meaning: meaning,
            phonetic: phonetic,
            example: example,
            tip: '🤖 AI 翻译结果'
        };
    },
    
    // ===== 缓存管理 =====
    cacheResult(word, result) {
        // 限制缓存大小
        if (this.aiCache.size >= this.config.cacheMaxSize) {
            const firstKey = this.aiCache.keys().next().value;
            this.aiCache.delete(firstKey);
        }
        
        this.aiCache.set(word.toLowerCase(), result);
        
        // 保存到 localStorage（异步，不阻塞）
        this.saveCacheToStorage();
    },
    
    saveCacheToStorage() {
        try {
            const cacheObj = Object.fromEntries(this.aiCache);
            localStorage.setItem('smartDict_cache', JSON.stringify(cacheObj));
        } catch (e) {
            console.warn('[SmartDict] 缓存保存失败:', e);
        }
    },
    
    loadCacheFromStorage() {
        try {
            const saved = localStorage.getItem('smartDict_cache');
            if (saved) {
                const cacheObj = JSON.parse(saved);
                this.aiCache = new Map(Object.entries(cacheObj));
                console.log('[SmartDict] 已加载缓存:', this.aiCache.size, '个单词');
            }
        } catch (e) {
            console.warn('[SmartDict] 缓存加载失败:', e);
        }
    },
    
    clearCache() {
        this.aiCache.clear();
        localStorage.removeItem('smartDict_cache');
        console.log('[SmartDict] 缓存已清空');
    },
    
    // ===== 配置管理 =====
    setProvider(provider) {
        this.config.aiProvider = provider;
        console.log('[SmartDict] 切换 AI 提供商:', provider);
    },
    
    setOpenAIKey(key) {
        this.config.openaiKey = key;
    },
    
    // 获取统计信息
    getStats() {
        return {
            cacheSize: this.aiCache.size,
            provider: this.config.aiProvider,
            cacheEnabled: this.config.cacheEnabled
        };
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    smartDictionary.init();
});

// 导出到全局
window.smartDictionary = smartDictionary;
