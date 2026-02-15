// ===== 阅读辅助功能模块 =====
// 帮助降低英语阅读难度，提供即点即查、翻译、朗读等功能

const readingAssistant = {
    // 当前状态
    isEnabled: false,
    selectedText: '',
    
    // 初始化阅读辅助
    init() {
        // 检查是否有阅读内容（支持多种可能的class和id）
        const readingContent = document.querySelector('.reading-content, .article-content, .passage-content, #reading-detail-content, .reading-detail-content');
        if (!readingContent) {
            console.log('未找到阅读内容区域');
            return;
        }
        
        console.log('阅读辅助初始化成功');
        this.addToolbar();
        this.enableClickToTranslate();
    },
    
    // 添加阅读辅助工具栏
    addToolbar() {
        // 如果工具栏已存在，跳过
        if (document.getElementById('reading-toolbar')) return;
        
        const toolbar = document.createElement('div');
        toolbar.id = 'reading-toolbar';
        toolbar.className = 'reading-toolbar';
        toolbar.innerHTML = `
            <div class="toolbar-left">
                <span class="toolbar-title">📖 阅读辅助</span>
            </div>
            <div class="toolbar-actions">
                <button class="tool-btn" id="btn-highlighter" onclick="readingAssistant.toggleHighlighter()" title="高亮已学词汇">
                    <span class="tool-icon">🖍️</span>
                    <span class="tool-text">高亮</span>
                </button>
                <button class="tool-btn" id="btn-translate" onclick="readingAssistant.translateSelection()" title="翻译选中文本">
                    <span class="tool-icon">🌐</span>
                    <span class="tool-text">翻译</span>
                </button>
                <button class="tool-btn" id="btn-speak" onclick="readingAssistant.speakSelection()" title="朗读选中文本">
                    <span class="tool-icon">🔊</span>
                    <span class="tool-text">朗读</span>
                </button>
                <button class="tool-btn" id="btn-break" onclick="readingAssistant.toggleSentenceBreak()" title="分句阅读">
                    <span class="tool-icon">✂️</span>
                    <span class="tool-text">分句</span>
                </button>
            </div>
        `;
        
        // 插入到阅读内容之前
        const readingContent = document.querySelector('.reading-content, .article-content, .passage-content, #reading-detail-content, .reading-detail-content');
        if (readingContent) {
            readingContent.parentNode.insertBefore(toolbar, readingContent);
        }
    },
    
    // 启用点击查词功能
    enableClickToTranslate() {
        const readingContent = document.querySelector('.reading-content, .article-content, .passage-content, #reading-detail-content, .reading-detail-content');
        if (!readingContent) return;
        
        readingContent.addEventListener('click', (e) => {
            // 获取点击的单词
            const word = this.getClickedWord(e);
            if (word && word.length > 1 && /^[a-zA-Z]+$/.test(word)) {
                this.showWordPopup(word, e.clientX, e.clientY);
            }
        });
        
        // 监听选中文本
        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            this.selectedText = selection.toString().trim();
            this.updateToolbarButtons();
        });
    },
    
    // 获取点击的单词或词组
    getClickedWord(event) {
        const range = document.caretRangeFromPoint(event.clientX, event.clientY);
        if (!range) return null;
        
        const textNode = range.startContainer;
        if (textNode.nodeType !== Node.TEXT_NODE) return null;
        
        const text = textNode.textContent;
        const offset = range.startOffset;
        
        // 扩展识别范围，支持词组（最多3个单词）
        // 先找到当前单词
        let wordStart = offset;
        let wordEnd = offset;
        
        while (wordStart > 0 && /[a-zA-Z]/.test(text[wordStart - 1])) {
            wordStart--;
        }
        while (wordEnd < text.length && /[a-zA-Z]/.test(text[wordEnd])) {
            wordEnd++;
        }
        
        const currentWord = text.substring(wordStart, wordEnd).toLowerCase();
        
        // 尝试向前扩展，看看是否有词组
        // 查找 "单词1单词2" 或 "单词1 单词2" 的模式
        let extendedStart = wordStart;
        
        // 向前查找空格和更多单词（最多再往前找2个单词）
        for (let i = 0; i < 2; i++) {
            // 跳过空格和标点
            let pos = extendedStart - 1;
            while (pos > 0 && /[\s,;:!?]/.test(text[pos])) {
                pos--;
            }
            
            // 查找前一个单词
            let prevEnd = pos + 1;
            while (pos > 0 && /[a-zA-Z]/.test(text[pos - 1])) {
                pos--;
            }
            
            if (pos < prevEnd - 1) {
                const prevWord = text.substring(pos, prevEnd).trim().toLowerCase();
                if (prevWord) {
                    // 检查组合是否在词库中
                    const combined = prevWord + ' ' + text.substring(extendedStart, wordEnd).toLowerCase();
                    if (this.findWordInfo(combined)) {
                        extendedStart = pos;
                        break;
                    }
                }
            }
        }
        
        // 尝试向后扩展
        let extendedEnd = wordEnd;
        for (let i = 0; i < 2; i++) {
            // 跳过空格和标点
            let pos = extendedEnd;
            while (pos < text.length && /[\s,;:!?]/.test(text[pos])) {
                pos++;
            }
            
            // 查找后一个单词
            let nextStart = pos;
            while (pos < text.length && /[a-zA-Z]/.test(text[pos])) {
                pos++;
            }
            
            if (pos > nextStart) {
                const nextWord = text.substring(nextStart, pos).toLowerCase();
                if (nextWord) {
                    // 检查组合是否在词库中
                    const combined = text.substring(extendedStart, extendedEnd).toLowerCase() + ' ' + nextWord;
                    if (this.findWordInfo(combined)) {
                        extendedEnd = pos;
                        break;
                    }
                }
            }
        }
        
        // 返回扩展后的词组，或单个单词
        const result = text.substring(extendedStart, extendedEnd).trim().toLowerCase();
        return result || currentWord;
    },
    
    // 显示单词弹窗（支持智能混合查词）
    async showWordPopup(word, x, y) {
        // 移除已存在的弹窗
        this.closeWordPopup();
        
        const popup = document.createElement('div');
        popup.id = 'word-popup';
        popup.className = 'word-popup';
        
        // 计算位置，确保不超出屏幕
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        let popupX = x + 10;
        let popupY = y + 10;
        
        // 边界检查
        if (popupX + 280 > viewportWidth) popupX = x - 290;
        if (popupY + 200 > viewportHeight) popupY = y - 210;
        
        popup.style.left = `${popupX}px`;
        popup.style.top = `${popupY}px`;
        
        // 先显示加载中
        popup.innerHTML = this.renderPopupLoading(word);
        document.body.appendChild(popup);
        
        // 点击外部关闭
        setTimeout(() => {
            document.addEventListener('click', this.closePopupOnClickOutside);
        }, 100);
        
        // 使用智能字典查词
        let wordInfo = null;
        
        if (typeof smartDictionary !== 'undefined') {
            // 智能查词（本地+AI）
            wordInfo = await smartDictionary.lookup(word);
        } else {
            // 降级：只用本地字典
            wordInfo = this.findWordInfo(word);
            if (wordInfo) {
                wordInfo.source = 'local';
            }
        }
        
        // 更新弹窗内容
        if (wordInfo && !wordInfo.notFound && !wordInfo.error) {
            popup.innerHTML = this.renderPopupContent(word, wordInfo);
        } else if (wordInfo && wordInfo.error) {
            // AI 查询出错
            popup.innerHTML = this.renderPopupError(word, wordInfo);
        } else {
            // 未找到
            popup.innerHTML = this.renderPopupNotFound(word);
        }
    },
    
    // 渲染加载中状态
    renderPopupLoading(word) {
        return `
            <div class="popup-header">
                <span class="popup-word">${word}</span>
                <button class="popup-close" onclick="readingAssistant.closeWordPopup()">×</button>
            </div>
            <div class="popup-body">
                <div class="popup-loading">
                    <span class="loading-spinner">⏳</span>
                    <p>正在查词...</p>
                    <p class="loading-hint">先查本地字典，再查AI翻译</p>
                </div>
            </div>
            <div class="popup-actions">
                <button class="popup-btn" onclick="readingAssistant.speakWord('${word.replace(/'/g, "\\'")}')">🔊 发音</button>
                <button class="popup-btn" onclick="readingAssistant.addToVocab('${word.replace(/'/g, "\\'")}')">➕ 加入生词本</button>
            </div>
        `;
    },
    
    // 渲染正常结果
    renderPopupContent(word, wordInfo) {
        const isMastered = this.isWordMastered(wordInfo.originalForm || wordInfo.word || word);
        const isPhrase = word.includes(' ');
        const isInflected = wordInfo.isInflected;
        const displayWord = wordInfo.word || word;
        
        // 来源标签
        let sourceBadge = '';
        if (wordInfo.source === 'ai' || wordInfo.source === 'ai-cache') {
            sourceBadge = '<span class="popup-source ai">🤖 AI</span>';
        } else if (wordInfo.source === 'local') {
            sourceBadge = '<span class="popup-source local">📚 本地</span>';
        }
        
        return `
            <div class="popup-header ${isMastered ? 'mastered' : ''}">
                <span class="popup-word">${displayWord}</span>
                ${!isPhrase ? `<span class="popup-phonetic">${wordInfo.phonetic || ''}</span>` : '<span class="popup-type">词组</span>'}
                ${isInflected ? '<span class="popup-type inflected">变形</span>' : ''}
                ${isMastered ? '<span class="mastered-badge">✓ 已掌握</span>' : ''}
                ${sourceBadge}
                <button class="popup-close" onclick="readingAssistant.closeWordPopup()">×</button>
            </div>
            <div class="popup-body">
                ${isInflected ? `<div class="inflected-notice">💡 这是 "${displayWord}" 的变形形式：${wordInfo.originalForm}</div>` : ''}
                <div class="popup-meaning">${wordInfo.meaning || '暂无释义'}</div>
                ${wordInfo.example ? `<div class="popup-example">${wordInfo.example}</div>` : ''}
                ${wordInfo.tip ? `<div class="popup-tip">${wordInfo.tip}</div>` : ''}
            </div>
            <div class="popup-actions">
                <button class="popup-btn" onclick="readingAssistant.speakWord('${displayWord.replace(/'/g, "\\'")}')">🔊 发音</button>
                <button class="popup-btn ${isMastered ? 'active' : ''}" onclick="readingAssistant.toggleWordMastery('${displayWord.replace(/'/g, "\\'")}')">
                    ${isMastered ? '✓ 已掌握' : '⭐ 标记掌握'}
                </button>
                <button class="popup-btn" onclick="readingAssistant.addToVocab('${displayWord.replace(/'/g, "\\'")}')">➕ 加入生词本</button>
            </div>
        `;
    },
    
    // 渲染错误状态
    renderPopupError(word, wordInfo) {
        return `
            <div class="popup-header">
                <span class="popup-word">${word}</span>
                <button class="popup-close" onclick="readingAssistant.closeWordPopup()">×</button>
            </div>
            <div class="popup-body">
                <div class="popup-not-found">
                    <p>⚠️ 查询失败</p>
                    <p class="popup-suggest">${wordInfo.error || '网络异常，请检查网络连接'}</p>
                </div>
            </div>
            <div class="popup-actions">
                <button class="popup-btn" onclick="readingAssistant.speakWord('${word.replace(/'/g, "\\'")}')">🔊 发音</button>
                <button class="popup-btn" onclick="readingAssistant.addToVocab('${word.replace(/'/g, "\\'")}')">➕ 加入生词本</button>
            </div>
        `;
    },
    
    // 渲染未找到状态
    renderPopupNotFound(word) {
        return `
            <div class="popup-header">
                <span class="popup-word">${word}</span>
                <button class="popup-close" onclick="readingAssistant.closeWordPopup()">×</button>
            </div>
            <div class="popup-body">
                <div class="popup-not-found">
                    <p>未找到该单词的释义</p>
                    <p class="popup-suggest">建议添加到生词本，手动完善信息</p>
                </div>
            </div>
            <div class="popup-actions">
                <button class="popup-btn" onclick="readingAssistant.speakWord('${word.replace(/'/g, "\\'")}')">🔊 发音</button>
                <button class="popup-btn" onclick="readingAssistant.addToVocab('${word.replace(/'/g, "\\'")}')">➕ 加入生词本</button>
            </div>
        `;
    },
    
    // 点击外部关闭弹窗
    closePopupOnClickOutside(e) {
        const popup = document.getElementById('word-popup');
        if (popup && !popup.contains(e.target)) {
            readingAssistant.closeWordPopup();
        }
    },
    
    // 关闭单词弹窗
    closeWordPopup() {
        const popup = document.getElementById('word-popup');
        const translatePopup = document.getElementById('translate-popup');
        if (popup) {
            popup.remove();
        }
        if (translatePopup) {
            translatePopup.remove();
        }
        document.removeEventListener('click', this.closePopupOnClickOutside);
    },
    
    // 查找单词或词组信息（支持单词变形）
    findWordInfo(word) {
        const searchWord = word.toLowerCase().trim();
        
        // 0. 先从短语/词组库查找（词组优先）
        if (vocabularyData.phrases) {
            for (const group of Object.values(vocabularyData.phrases)) {
                if (Array.isArray(group)) {
                    const found = group.find(w => 
                        (w.phrase || w.word || '').toLowerCase() === searchWord
                    );
                    if (found) return found;
                }
            }
        }
        
        // 1. 精确匹配查找
        const exactMatch = this.findExactWord(searchWord);
        if (exactMatch) return exactMatch;
        
        // 2. 尝试查找单词原型（处理变形）
        const baseForm = this.getBaseForm(searchWord);
        if (baseForm && baseForm !== searchWord) {
            const baseMatch = this.findExactWord(baseForm);
            if (baseMatch) {
                // 返回原型单词的信息，但标记为变形
                return {
                    ...baseMatch,
                    originalForm: searchWord,  // 原始输入的变形
                    isInflected: true
                };
            }
        }
        
        // 3. 尝试将词组拆分成单词分别查找
        if (searchWord.includes(' ')) {
            return this.findPhraseByParts(searchWord);
        }
        
        return null;
    },
    
    // 精确匹配查找单词
    findExactWord(searchWord) {
        // 0. 优先从核心内置字典查找（2000+常用词）
        if (typeof findInCoreDictionary === 'function') {
            const coreResult = findInCoreDictionary(searchWord);
            if (coreResult) return coreResult;
        }
        
        // 1. 从内置词汇库查找
        if (vocabularyData.basicVocabulary) {
            for (const group of Object.values(vocabularyData.basicVocabulary)) {
                if (Array.isArray(group)) {
                    const found = group.find(w => w.word.toLowerCase() === searchWord);
                    if (found) return found;
                }
            }
        }
        
        if (vocabularyData.intermediateVocabulary) {
            for (const group of Object.values(vocabularyData.intermediateVocabulary)) {
                if (Array.isArray(group)) {
                    const found = group.find(w => w.word.toLowerCase() === searchWord);
                    if (found) return found;
                }
            }
        }
        
        if (vocabularyData.advancedVocabulary) {
            for (const group of Object.values(vocabularyData.advancedVocabulary)) {
                if (Array.isArray(group)) {
                    const found = group.find(w => w.word.toLowerCase() === searchWord);
                    if (found) return found;
                }
            }
        }
        
        // 2. 从自定义词汇库查找
        if (window.customVocabularies) {
            for (const vocabList of Object.values(customVocabularies)) {
                if (Array.isArray(vocabList)) {
                    const found = vocabList.find(w => 
                        (w.word || w.phrase || '').toLowerCase() === searchWord
                    );
                    if (found) return found;
                }
            }
        }
        
        return null;
    },
    
    // 获取单词原型（处理变形）
    getBaseForm(word) {
        // 规则1: 复数/第三人称单数 -> 原型
        // -s, -es, -ies
        if (word.endsWith('ies')) {
            return word.slice(0, -3) + 'y';  // cities -> city
        }
        if (word.endsWith('es')) {
            // 检查是否是 -es 结尾（如 boxes, watches）
            return word.slice(0, -2);  // boxes -> box
        }
        if (word.endsWith('s') && !word.endsWith('ss')) {
            return word.slice(0, -1);  // books -> book, temperatures -> temperature
        }
        
        // 规则2: 过去式/过去分词 -> 原型
        // -ed
        if (word.endsWith('ied')) {
            return word.slice(0, -3) + 'y';  // carried -> carry
        }
        if (word.endsWith('ed')) {
            const base = word.slice(0, -2);
            // 检查双写辅音（stopped -> stop）
            if (/[^aeiou][^aeiou]$/.test(base)) {
                return base.slice(0, -1);  // stopped -> stop
            }
            // 检查不发音的e（liked -> like）
            if (base.endsWith('e')) {
                return base;  // liked -> like
            }
            return base;  // walked -> walk
        }
        
        // 规则3: 进行时/动名词 -> 原型
        // -ing
        if (word.endsWith('ing')) {
            const base = word.slice(0, -3);
            // 双写辅音（running -> run）
            if (/[^aeiou][^aeiou]$/.test(base)) {
                return base.slice(0, -1);
            }
            // 去e（making -> make）
            if (base.endsWith('e')) {
                return base;  // making -> make
            }
            return base;
        }
        
        // 规则4: 形容词比较级/最高级
        if (word.endsWith('er')) {
            return word.slice(0, -2);  // bigger -> big
        }
        if (word.endsWith('est')) {
            return word.slice(0, -3);  // biggest -> big
        }
        
        return null;
    },
    
    // 拆分词组查找
    findPhraseByParts(searchWord) {
        const words = searchWord.split(' ');
        const meanings = [];
        let allFound = true;
        
        for (const w of words) {
            // 先尝试精确匹配
            let info = this.findExactWord(w);
            
            // 再尝试查找原型
            if (!info) {
                const baseForm = this.getBaseForm(w);
                if (baseForm) {
                    info = this.findExactWord(baseForm);
                }
            }
            
            if (info && info.meaning) {
                meanings.push(info.meaning);
            } else {
                allFound = false;
            }
        }
        
        // 如果所有单词都找到了，组合成词组释义
        if (allFound && meanings.length > 0) {
            return {
                word: searchWord,
                phonetic: '',
                meaning: meanings.join('；'),
                example: '',
                tip: `💡 这是由多个单词组成的词组，分别理解每个单词的意思即可`
            };
        }
        
        return null;
    },
    
    // 检查单词是否已掌握
    isWordMastered(word) {
        // 从用户词汇进度中查找
        if (typeof userVocabularyProgress !== 'undefined') {
            const progress = userVocabularyProgress[word.toLowerCase()];
            return progress && progress.status === 'mastered';
        }
        return false;
    },
    
    // 切换单词掌握状态
    toggleWordMastery(word) {
        word = word.toLowerCase();
        
        if (!window.userVocabularyProgress) {
            userVocabularyProgress = {};
        }
        
        const current = userVocabularyProgress[word];
        if (current && current.status === 'mastered') {
            // 取消掌握
            current.status = 'learning';
        } else {
            // 标记掌握
            userVocabularyProgress[word] = {
                status: 'mastered',
                reviewCount: (current?.reviewCount || 0) + 1,
                lastReview: new Date().toISOString()
            };
        }
        
        // 保存
        if (typeof saveVocabularyData === 'function') {
            saveVocabularyData();
        }
        
        // 刷新弹窗
        const popup = document.getElementById('word-popup');
        if (popup) {
            const rect = popup.getBoundingClientRect();
            this.closeWordPopup();
            setTimeout(() => this.showWordPopup(word, rect.left + 10, rect.top + 10), 50);
        }
    },
    
    // 添加到生词本
    addToVocab(word) {
        // 触发智能导入，预填入该单词
        if (typeof smartVocabImport !== 'undefined') {
            smartVocabImport.showSmartImportModal();
            setTimeout(() => {
                const textarea = document.getElementById('word-input');
                if (textarea) {
                    textarea.value = word;
                    textarea.dispatchEvent(new Event('input'));
                }
            }, 300);
        }
        this.closeWordPopup();
    },
    
    // 朗读单词
    speakWord(word) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    },
    
    // 朗读选中文本
    speakSelection() {
        if (!this.selectedText) {
            alert('请先选中要朗读的文本');
            return;
        }
        
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(this.selectedText);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    },
    
    // 翻译选中文本
    translateSelection() {
        if (!this.selectedText) {
            alert('请先选中要翻译的文本');
            return;
        }
        
        // 显示翻译弹窗
        this.showTranslatePopup(this.selectedText);
    },
    
    // 显示翻译弹窗
    showTranslatePopup(text) {
        this.closeWordPopup();
        
        const popup = document.createElement('div');
        popup.id = 'translate-popup';
        popup.className = 'translate-popup';
        popup.innerHTML = `
            <div class="translate-header">
                <span>🌐 翻译</span>
                <button class="popup-close" onclick="event.stopPropagation(); readingAssistant.closeWordPopup(); return false;">×</button>
            </div>
            <div class="translate-body">
                <div class="translate-source">
                    <div class="translate-label">原文</div>
                    <div class="translate-text">${text}</div>
                </div>
                <div class="translate-result">
                    <div class="translate-label">译文</div>
                    <div class="translate-text translate-loading">翻译中...</div>
                </div>
            </div>
            <div class="translate-actions">
                <button class="popup-btn" onclick="readingAssistant.speakWord('${text.replace(/'/g, "\\'")}')">🔊 朗读</button>
                <button class="popup-btn" onclick="readingAssistant.copyText('${text.replace(/'/g, "\\'")}')">📋 复制</button>
            </div>
        `;
        
        // 居中显示
        popup.style.position = 'fixed';
        popup.style.left = '50%';
        popup.style.top = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.zIndex = '10001';
        
        document.body.appendChild(popup);
        
        // 点击外部关闭
        setTimeout(() => {
            document.addEventListener('click', function closeOnClick(e) {
                if (!popup.contains(e.target)) {
                    readingAssistant.closeWordPopup();
                    document.removeEventListener('click', closeOnClick);
                }
            });
        }, 100);
        
        // 模拟翻译（实际可以调用翻译API）
        setTimeout(() => {
            const resultDiv = popup.querySelector('.translate-text.translate-loading');
            if (resultDiv) {
                resultDiv.classList.remove('translate-loading');
                resultDiv.textContent = '【翻译结果】\n（建议接入有道/百度翻译API获取准确翻译）\n\n' + 
                    '这是一个示例翻译。实际使用时可以调用在线翻译API。';
            }
        }, 500);
    },
    
    // 复制文本
    copyText(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('已复制到剪贴板');
        });
    },
    
    // 更新工具栏按钮状态
    updateToolbarButtons() {
        const hasSelection = this.selectedText.length > 0;
        const translateBtn = document.getElementById('btn-translate');
        const speakBtn = document.getElementById('btn-speak');
        
        if (translateBtn) {
            translateBtn.disabled = !hasSelection;
            translateBtn.style.opacity = hasSelection ? '1' : '0.5';
        }
        if (speakBtn) {
            speakBtn.disabled = !hasSelection;
            speakBtn.style.opacity = hasSelection ? '1' : '0.5';
        }
    },
    
    // 高亮已学词汇
    toggleHighlighter() {
        const btn = document.getElementById('btn-highlighter');
        const isActive = btn.classList.toggle('active');
        
        const readingContent = document.querySelector('.reading-content, .article-content, .passage-content, #reading-detail-content, .reading-detail-content');
        if (!readingContent) return;
        
        if (isActive) {
            // 高亮已学词汇
            this.highlightKnownWords(readingContent);
            btn.querySelector('.tool-text').textContent = '取消高亮';
        } else {
            // 移除高亮
            this.removeHighlight(readingContent);
            btn.querySelector('.tool-text').textContent = '高亮词汇';
        }
    },
    
    // 高亮已学词汇
    highlightKnownWords(container) {
        // 获取所有已学词汇
        const knownWords = new Set();
        
        if (typeof userVocabularyProgress !== 'undefined') {
            Object.entries(userVocabularyProgress).forEach(([word, data]) => {
                if (data.status === 'mastered' || data.status === 'learning') {
                    knownWords.add(word.toLowerCase());
                }
            });
        }
        
        // 遍历文本节点并高亮
        const walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            const words = text.match(/\b[a-zA-Z]+\b/g);
            
            if (words && words.some(w => knownWords.has(w.toLowerCase()))) {
                let newHtml = text;
                words.forEach(word => {
                    if (knownWords.has(word.toLowerCase())) {
                        const isMastered = userVocabularyProgress[word.toLowerCase()]?.status === 'mastered';
                        newHtml = newHtml.replace(
                            new RegExp(`\\b${word}\\b`, 'g'),
                            `<span class="highlight-word ${isMastered ? 'mastered' : 'learning'}">${word}</span>`
                        );
                    }
                });
                
                const wrapper = document.createElement('span');
                wrapper.innerHTML = newHtml;
                textNode.parentNode.replaceChild(wrapper, textNode);
            }
        });
    },
    
    // 移除高亮
    removeHighlight(container) {
        const highlights = container.querySelectorAll('.highlight-word');
        highlights.forEach(span => {
            const parent = span.parentNode;
            parent.replaceChild(document.createTextNode(span.textContent), span);
            parent.normalize(); // 合并相邻文本节点
        });
    },
    
    // 分句阅读模式
    toggleSentenceBreak() {
        const btn = document.getElementById('btn-break');
        const isActive = btn.classList.toggle('active');
        
        const readingContent = document.querySelector('.reading-content, .article-content, .passage-content, #reading-detail-content, .reading-detail-content');
        if (!readingContent) return;
        
        if (isActive) {
            // 启用分句模式
            this.enableSentenceBreak(readingContent);
            btn.querySelector('.tool-text').textContent = '取消分句';
            readingContent.classList.add('sentence-break-mode');
        } else {
            // 取消分句模式
            this.disableSentenceBreak(readingContent);
            btn.querySelector('.tool-text').textContent = '分句阅读';
            readingContent.classList.remove('sentence-break-mode');
        }
    },
    
    // 启用分句模式
    enableSentenceBreak(container) {
        // 将文章按句子分割
        const sentences = container.innerHTML.split(/([.!?。！？]+\s*)/);
        let newHtml = '';
        let currentSentence = '';
        
        sentences.forEach((part, index) => {
            currentSentence += part;
            if (/[.!?。！？]+\s*$/.test(part) || index === sentences.length - 1) {
                if (currentSentence.trim()) {
                    newHtml += `<div class="sentence-block">${currentSentence.trim()}</div>`;
                    currentSentence = '';
                }
            }
        });
        
        this.originalContent = container.innerHTML;
        container.innerHTML = newHtml;
        
        // 添加句子导航
        this.addSentenceNav(container);
    },
    
    // 添加句子导航
    addSentenceNav(container) {
        const sentences = container.querySelectorAll('.sentence-block');
        if (sentences.length === 0) return;
        
        // 给每个句子添加序号和朗读按钮
        sentences.forEach((sent, idx) => {
            sent.innerHTML = `
                <span class="sentence-num">${idx + 1}</span>
                ${sent.innerHTML}
                <button class="sentence-speak" onclick="readingAssistant.speakWord(this.parentElement.textContent.replace(/^\\d+/, '').trim())">🔊</button>
            `;
            
            // 点击句子高亮
            sent.addEventListener('click', () => {
                sentences.forEach(s => s.classList.remove('active'));
                sent.classList.add('active');
            });
        });
        
        // 默认高亮第一句
        sentences[0].classList.add('active');
    },
    
    // 取消分句模式
    disableSentenceBreak(container) {
        if (this.originalContent) {
            container.innerHTML = this.originalContent;
        }
    }
};

// 挂载到全局
window.readingAssistant = readingAssistant;

// 页面加载完成后自动初始化
document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化，确保阅读内容已加载
    setTimeout(() => {
        readingAssistant.init();
    }, 500);
});
