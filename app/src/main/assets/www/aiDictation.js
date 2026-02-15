// ===== AI 听写功能模块 =====
// 通过语音识别 + 语义相似度计算，实现"说出大概意思即可通过"的智能听写

const aiDictation = {
    // 当前状态
    isListening: false,
    recognition: null,
    currentItem: null,
    similarityScore: 0,
    hasEvaluated: false,  // 防止重复评分
    
    // 初始化语音识别
    initSpeechRecognition() {
        // 优先使用 Android 原生语音识别（WebView中更可靠）
        if (typeof Android !== 'undefined' && Android.startSpeechRecognition) {
            console.log('使用 Android 原生语音识别');
            this.useAndroidSpeech = true;
            return true;
        }
        
        // 备用：使用 Web Speech API
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'zh-CN';
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.useAndroidSpeech = false;
            
            this.recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';
                
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }
                
                console.log('识别中... interim:', interimTranscript, 'final:', finalTranscript);
                
                // 实时显示识别的文字
                if (interimTranscript) {
                    this.updateTranscriptDisplay(interimTranscript, true);
                }
                
                // 最终结果
                if (finalTranscript) {
                    console.log('识别完成:', finalTranscript);
                    this.updateTranscriptDisplay(finalTranscript, false);
                    this.evaluateAnswer(finalTranscript);
                }
            };
            
            this.recognition.onerror = (event) => {
                console.error('语音识别错误:', event.error);
                let errorMsg = '识别失败，请重试';
                if (event.error === 'no-speech') {
                    errorMsg = '没有检测到语音，请再说一次';
                } else if (event.error === 'audio-capture') {
                    errorMsg = '无法访问麦克风';
                } else if (event.error === 'not-allowed') {
                    errorMsg = '请允许使用麦克风权限';
                }
                this.showError(errorMsg);
                this.stopListening();
            };
            
            this.recognition.onend = () => {
                console.log('语音识别结束');
                this.isListening = false;
                this.updateUIState();
            };
            
            return true;
        }
        
        return false;
    },
    
    // 开始听写
    startDictation(item) {
        this.currentItem = item;
        this.similarityScore = 0;
        this.hasEvaluated = false;
        
        // 初始化并显示听写界面
        this.showDictationModal(item);
        
        // 初始化语音识别
        const speechSupported = this.initSpeechRecognition();
        
        // 延迟检查权限和兼容性
        setTimeout(() => {
            const micStatus = document.getElementById('mic-status');
            const micHint = document.getElementById('mic-hint');
            
            if (!speechSupported) {
                // 不支持语音识别，直接显示手动输入
                if (micStatus) {
                    micStatus.textContent = '当前设备不支持语音';
                    micStatus.style.color = '#f59e0b';
                }
                if (micHint) {
                    micHint.innerHTML = '请使用下方的<span style="color: #6366f1;">「手动输入」</span>功能';
                }
                console.log('设备不支持语音识别');
            } else {
                console.log('语音识别已就绪，等待用户点击麦克风');
            }
        }, 100);
    },
    
    // 显示听写弹窗
    showDictationModal(item) {
        // 如果弹窗已存在，先移除
        const existingModal = document.getElementById('ai-dictation-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.id = 'ai-dictation-modal';
        modal.className = 'modal dictation-modal';
        modal.style.cssText = 'display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; justify-content: center; align-items: center;';
        
        const typeName = this.getTypeName(item.type);
        const moduleInfo = studyData.modules[item.module];
        
        // 获取标准答案（用于后续对比）
        const standardAnswer = Array.isArray(item.content) 
            ? item.content.join('\n') 
            : item.content;
        
        modal.innerHTML = `
            <div class="dictation-content">
                <div class="dictation-header">
                    <div class="dictation-badges">
                        <span class="dictation-type" style="background: ${moduleInfo.color}">${typeName}</span>
                        <span class="dictation-module">${moduleInfo.name}</span>
                    </div>
                    <button class="dictation-close" onclick="aiDictation.closeModal()">×</button>
                </div>
                
                <div class="dictation-question">
                    <h3>${item.type === 'term' ? `什么是"${item.title}"？` : item.title}</h3>
                </div>
                
                <div class="dictation-hint">
                    <span>💡</span> 用自己的话描述大概意思即可，不需要一字不差
                </div>
                
                <!-- 输入区域（带语音按钮） -->
                <div class="dictation-input-area" id="input-area">
                    <div class="input-label">📝 请输入你的答案：</div>
                    <div class="input-wrapper">
                        <textarea id="manual-answer" rows="4" 
                            placeholder="在此输入答案，或点击右侧麦克风使用语音输入..."
                            autocomplete="off" 
                            autocorrect="off" 
                            autocapitalize="off" 
                            spellcheck="false"></textarea>
                        <button class="input-mic-btn" id="input-mic-btn" onclick="aiDictation.startVoiceInput()" title="语音输入（需要网络）">
                            🎤
                        </button>
                    </div>
                    <div class="input-status" id="input-status">
                        <span style="color: #64748b;">💡 提示：语音输入需要联网，网络不佳时请直接手动输入</span>
                    </div>
                    <div class="char-count" id="char-count">0 字</div>
                    <button class="dictation-btn primary" onclick="aiDictation.submitManualAnswer()">提交答案</button>
                </div>
                
                <div class="dictation-transcript" id="transcript-area" style="display: none;">
                    <div class="transcript-label">📝 识别结果：</div>
                    <div class="transcript-text" id="transcript-text"></div>
                </div>
                
                <div class="dictation-result" id="result-area" style="display: none;">
                    <div class="result-score" id="result-score"></div>
                    <div class="result-message" id="result-message"></div>
                    <div class="result-details" id="result-details"></div>
                </div>
                
                <div class="dictation-actions" id="action-area" style="display: none;">
                    <button class="dictation-btn secondary" onclick="aiDictation.retry()">🔄 再试一次</button>
                    <button class="dictation-btn primary" onclick="aiDictation.showAnswer()">👀 看答案</button>
                    <button class="dictation-btn success" id="pass-btn" style="display: none;" onclick="aiDictation.markPassed()">✅ 标记通过</button>
                </div>
                
                <div class="dictation-answer" id="answer-area" style="display: none;">
                    <div class="answer-title">📖 标准答案：</div>
                    <div class="answer-content">${standardAnswer.replace(/\n/g, '<br>')}</div>
                    <div class="dictation-actions" style="margin-top: 16px;">
                        <button class="dictation-btn secondary" onclick="aiDictation.retry()">🔄 再试一次</button>
                        <button class="dictation-btn fuzzy" onclick="aiDictation.markStatus('fuzzy')">😵 没记住</button>
                        <button class="dictation-btn normal" onclick="aiDictation.markStatus('normal')">😐 一般</button>
                        <button class="dictation-btn mastered" onclick="aiDictation.markStatus('mastered')">😎 已掌握</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 点击外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // 保存标准答案用于后续对比
        this.standardAnswer = standardAnswer;
    },
    
    // 关闭弹窗
    closeModal() {
        this.stopListening();
        const modal = document.getElementById('ai-dictation-modal');
        if (modal) {
            modal.remove();
        }
    },
    
    // 切换监听状态
    toggleListening() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    },
    
    // 开始监听
    startListening() {
        console.log('开始监听...');
        
        // 重置状态
        this.hasEvaluated = false;
        
        // 重置显示
        const transcriptArea = document.getElementById('transcript-area');
        const resultArea = document.getElementById('result-area');
        const actionArea = document.getElementById('action-area');
        const answerArea = document.getElementById('answer-area');
        
        if (transcriptArea) transcriptArea.style.display = 'none';
        if (resultArea) resultArea.style.display = 'none';
        if (actionArea) actionArea.style.display = 'none';
        if (answerArea) answerArea.style.display = 'none';
        
        // 使用 Android 原生语音识别
        if (this.useAndroidSpeech && typeof Android !== 'undefined' && Android.startSpeechRecognition) {
            console.log('启动 Android 原生语音识别');
            Android.startSpeechRecognition('aiDictation.onAndroidSpeechResult');
            this.isListening = true;
            this.updateUIState();
            return;
        }
        
        // 使用 Web Speech API
        if (!this.recognition) {
            console.log('初始化 Web 语音识别...');
            this.initSpeechRecognition();
        }
        
        try {
            this.recognition.start();
            this.isListening = true;
            this.updateUIState();
            console.log('Web 语音识别已启动');
        } catch (err) {
            console.error('启动语音识别失败:', err);
            this.showError('启动语音识别失败: ' + err.message);
            this.isListening = false;
            this.updateUIState();
        }
    },
    
    // 停止监听（Android 原生语音识别不需要手动停止，系统对话框会自动处理）
    stopListening() {
        console.log('停止监听...');
        
        // Android 原生语音识别由系统对话框控制，不需要手动停止
        if (this.useAndroidSpeech) {
            this.isListening = false;
            this.updateUIState();
            return;
        }
        
        // 先获取当前已识别的文本（包括 interim 结果）
        const transcriptText = document.getElementById('transcript-text');
        let currentText = '';
        if (transcriptText) {
            currentText = transcriptText.textContent || '';
        }
        
        if (this.recognition) {
            try {
                this.recognition.stop();
                console.log('recognition.stop() 已调用');
            } catch (e) {
                console.log('recognition.stop() 出错:', e);
            }
        }
        this.isListening = false;
        this.updateUIState();
        
        // 延迟检查是否有识别结果，使用 interim 或 final 结果进行评分
        setTimeout(() => {
            // 如果已经评分过了，直接返回
            if (this.hasEvaluated) {
                console.log('已经评分过了，跳过延迟检查');
                return;
            }
            
            const transcriptEl = document.getElementById('transcript-text');
            const resultArea = document.getElementById('result-area');
            
            // 获取最新的文本（可能是 interim 或 final）
            let textToEvaluate = currentText;
            if (transcriptEl && transcriptEl.textContent) {
                textToEvaluate = transcriptEl.textContent;
            }
            
            // 如果还没有评分且有识别文本，进行评分
            if (textToEvaluate && textToEvaluate.trim().length > 0) {
                console.log('使用识别文本进行评分:', textToEvaluate);
                // 移除 interim 标记
                if (transcriptEl) transcriptEl.classList.remove('interim');
                this.evaluateAnswer(textToEvaluate);
            } else {
                console.log('没有识别到文本，切换到手动输入');
                // 没有识别到语音，切换到手动输入
                this.showManualInput();
                // 显示提示
                const micStatus = document.getElementById('mic-status');
                if (micStatus) {
                    micStatus.textContent = '语音识别失败，请手动输入';
                    micStatus.style.color = '#f59e0b';
                }
            }
        }, 800);
    },
    
    // Android 原生语音识别结果回调
    onAndroidSpeechResult(resultJson) {
        console.log('Android 语音识别结果:', resultJson);
        
        this.isListening = false;
        this.updateUIState();
        
        try {
            const result = JSON.parse(resultJson);
            if (result.success && result.text) {
                console.log('识别成功:', result.text);
                this.updateTranscriptDisplay(result.text, false);
                this.evaluateAnswer(result.text);
            } else {
                console.log('识别失败:', result.error || '未知错误');
                // 不自动切换到手动输入，让用户自己选择
                const micStatus = document.getElementById('mic-status');
                if (micStatus) {
                    micStatus.textContent = '未识别到语音，请重试或使用手动输入';
                    micStatus.style.color = '#f59e0b';
                }
            }
        } catch (e) {
            console.error('解析语音识别结果失败:', e);
        }
    },
    
    // 更新 UI 状态
    updateUIState() {
        const micBtn = document.getElementById('mic-btn');
        const micIcon = document.getElementById('mic-icon');
        const micWaves = document.getElementById('mic-waves');
        const micStatus = document.getElementById('mic-status');
        const micHint = document.getElementById('mic-hint');
        
        if (!micBtn) return;
        
        if (this.isListening) {
            micBtn.classList.add('listening');
            if (micWaves) micWaves.style.display = 'flex';
            if (micIcon) micIcon.style.display = 'none';
            if (micStatus) {
                micStatus.textContent = '正在录音，点击停止';
                micStatus.style.color = '#ef4444';
            }
            if (micHint) micHint.textContent = '说出答案，说完后点击停止';
        } else {
            micBtn.classList.remove('listening');
            if (micWaves) micWaves.style.display = 'none';
            if (micIcon) micIcon.style.display = 'block';
            if (micStatus) {
                micStatus.textContent = '点击麦克风开始录音';
                micStatus.style.color = '';
            }
            if (micHint) micHint.textContent = '说出大概意思即可，不需要一字不差';
        }
    },
    
    // 更新转录显示
    updateTranscriptDisplay(text, isInterim) {
        const transcriptArea = document.getElementById('transcript-area');
        const transcriptText = document.getElementById('transcript-text');
        
        transcriptArea.style.display = 'block';
        transcriptText.textContent = text;
        
        if (isInterim) {
            transcriptText.classList.add('interim');
        } else {
            transcriptText.classList.remove('interim');
        }
    },
    
    // 评估答案
    evaluateAnswer(userAnswer) {
        // 防止重复评分
        if (this.hasEvaluated) {
            console.log('已经评分过了，跳过');
            return;
        }
        this.hasEvaluated = true;
        
        console.log('开始评估答案:', userAnswer);
        console.log('标准答案:', this.standardAnswer);
        
        if (!this.standardAnswer) {
            console.error('标准答案为空！');
            this.showError('评分失败：未找到标准答案');
            return;
        }
        
        if (!userAnswer || userAnswer.trim().length === 0) {
            console.error('用户答案为空！');
            this.showError('没有识别到语音内容');
            return;
        }
        
        try {
            const similarity = this.calculateSimilarity(userAnswer, this.standardAnswer);
            this.similarityScore = similarity;
            console.log('相似度得分:', similarity);
            
            this.showResult(similarity, userAnswer);
        } catch (err) {
            console.error('评分出错:', err);
            this.showError('评分出错，请重试');
        }
    },
    
    // 计算语义相似度（核心算法）
    calculateSimilarity(userText, standardText) {
        // 文本预处理
        const preprocess = (text) => {
            return text
                .toLowerCase()
                .replace(/[，。！？、；：""''（）【】《》]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        };
        
        const user = preprocess(userText);
        const standard = preprocess(standardText);
        
        // 1. 关键词匹配得分（权重 60%）
        const keywordScore = this.calculateKeywordScore(user, standard);
        
        // 2. 语义相似度得分（权重 40%）
        const semanticScore = this.calculateSemanticScore(user, standard);
        
        // 综合得分
        const finalScore = keywordScore * 0.6 + semanticScore * 0.4;
        
        return Math.round(finalScore * 100);
    },
    
    // 关键词匹配得分
    calculateKeywordScore(user, standard) {
        // 提取关键词（长度大于 1 的名词、动词等实词）
        const extractKeywords = (text) => {
            const words = text.split(/\s+/);
            // 过滤停用词和短词
            const stopWords = new Set(['的', '了', '是', '在', '有', '和', '与', '或', '这', '那', '就', '都', '而', '及', '等', '对', '个', '之', '为', '吗', '呢', '吧', '啊', '哦', '嗯']);
            return words.filter(w => w.length >= 2 && !stopWords.has(w));
        };
        
        const userKeywords = extractKeywords(user);
        const standardKeywords = extractKeywords(standard);
        
        if (standardKeywords.length === 0) return 0;
        
        // 计算匹配的关键词数量
        let matchedCount = 0;
        const matchedKeywords = [];
        
        for (const stdWord of standardKeywords) {
            // 精确匹配
            if (userKeywords.includes(stdWord)) {
                matchedCount++;
                matchedKeywords.push(stdWord);
                continue;
            }
            
            // 包含匹配（用户说了包含该关键词的话）
            for (const userWord of userKeywords) {
                if (userWord.includes(stdWord) || stdWord.includes(userWord)) {
                    matchedCount += 0.8; // 部分匹配得 0.8 分
                    matchedKeywords.push(`${userWord}≈${stdWord}`);
                    break;
                }
            }
        }
        
        this.matchedKeywords = matchedKeywords;
        this.missedKeywords = standardKeywords.filter(w => !matchedKeywords.some(m => m.includes(w) || w.includes(m)));
        
        return matchedCount / standardKeywords.length;
    },
    
    // 语义相似度得分（基于字符级别的相似度）
    calculateSemanticScore(user, standard) {
        // 使用改进的 Jaccard 相似度
        const userChars = new Set(user.split(''));
        const standardChars = new Set(standard.split(''));
        
        const intersection = new Set([...userChars].filter(x => standardChars.has(x)));
        const union = new Set([...userChars, ...standardChars]);
        
        const charSimilarity = intersection.size / union.size;
        
        // 使用序列相似度（LCS - 最长公共子序列）
        const sequenceSimilarity = this.lcsSimilarity(user, standard);
        
        // 综合
        return charSimilarity * 0.3 + sequenceSimilarity * 0.7;
    },
    
    // 最长公共子序列相似度
    lcsSimilarity(str1, str2) {
        const m = str1.length;
        const n = str2.length;
        
        if (m === 0 || n === 0) return 0;
        
        // 动态规划计算 LCS 长度
        const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
        
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        const lcsLength = dp[m][n];
        return (2 * lcsLength) / (m + n);
    },
    
    // 显示结果
    showResult(score, userAnswer) {
        const resultArea = document.getElementById('result-area');
        const resultScore = document.getElementById('result-score');
        const resultMessage = document.getElementById('result-message');
        const resultDetails = document.getElementById('result-details');
        const actionArea = document.getElementById('action-area');
        const passBtn = document.getElementById('pass-btn');
        
        resultArea.style.display = 'block';
        actionArea.style.display = 'flex';
        
        // 根据得分显示不同的结果
        let scoreClass = '';
        let message = '';
        let details = '';
        
        if (score >= 80) {
            scoreClass = 'excellent';
            message = '🎉 太棒了！意思完全正确！';
            details = '你的回答抓住了核心要点，继续保持！';
            passBtn.style.display = 'inline-block';
        } else if (score >= 60) {
            scoreClass = 'good';
            message = '👍 还不错，意思基本正确';
            details = '虽然表述有所不同，但核心意思是对的。';
            passBtn.style.display = 'inline-block';
        } else if (score >= 40) {
            scoreClass = 'fair';
            message = '🤔 部分正确，还需要加强';
            details = '你的回答包含了部分正确信息，但遗漏了一些关键点。';
            passBtn.style.display = 'none';
        } else {
            scoreClass = 'poor';
            message = '💪 再接再厉，再看看答案吧';
            details = '建议查看标准答案，理解核心概念后再试一次。';
            passBtn.style.display = 'none';
        }
        
        resultScore.className = `result-score ${scoreClass}`;
        resultScore.textContent = `${score}%`;
        resultMessage.textContent = message;
        
        // 显示匹配详情
        let detailsHtml = `<div class="result-highlight">${details}</div>`;
        
        if (this.matchedKeywords && this.matchedKeywords.length > 0) {
            detailsHtml += `
                <div class="result-keywords">
                    <div class="keywords-section">
                        <span class="keywords-label">✅ 匹配到的关键词：</span>
                        <span class="keywords-list matched">${this.matchedKeywords.slice(0, 5).join('、')}</span>
                    </div>
                </div>
            `;
        }
        
        resultDetails.innerHTML = detailsHtml;
    },
    
    // 显示错误
    showError(message) {
        const micStatus = document.getElementById('mic-status');
        if (micStatus) {
            micStatus.textContent = message;
            micStatus.style.color = '#ef4444';
            setTimeout(() => {
                micStatus.style.color = '';
                if (!this.isListening) {
                    micStatus.textContent = '按住说话';
                }
            }, 3000);
        }
    },
    
    // 再试一次
    retry() {
        // 重置所有显示区域
        document.getElementById('transcript-area').style.display = 'none';
        document.getElementById('result-area').style.display = 'none';
        document.getElementById('action-area').style.display = 'none';
        document.getElementById('answer-area').style.display = 'none';
        
        // 显示输入区域
        const inputArea = document.getElementById('input-area');
        if (inputArea) {
            inputArea.style.display = 'block';
        }
        
        // 清空输入框
        const textarea = document.getElementById('manual-answer');
        if (textarea) {
            textarea.value = '';
        }
        
        // 重置字数统计
        const charCount = document.getElementById('char-count');
        if (charCount) {
            charCount.textContent = '0 字';
        }
        
        // 重置状态
        this.hasEvaluated = false;
    },
    
    // 开始语音输入（在输入框中）
    startVoiceInput() {
        console.log('开始语音输入...');
        
        const statusEl = document.getElementById('input-status');
        const micBtn = document.getElementById('input-mic-btn');
        
        // 使用 Android 原生语音识别
        if (typeof Android !== 'undefined' && Android.startSpeechRecognition) {
            if (statusEl) {
                statusEl.textContent = '正在录音，请说话...';
                statusEl.style.color = '#ef4444';
            }
            if (micBtn) {
                micBtn.classList.add('recording');
                micBtn.textContent = '⏹️';
            }
            
            Android.startSpeechRecognition('aiDictation.onVoiceInputResult');
        } else {
            this.showError('当前设备不支持语音输入');
        }
    },
    
    // 语音输入结果回调
    onVoiceInputResult(resultJson) {
        console.log('语音输入结果:', resultJson);
        
        const statusEl = document.getElementById('input-status');
        const micBtn = document.getElementById('input-mic-btn');
        const textarea = document.getElementById('manual-answer');
        const charCount = document.getElementById('char-count');
        
        // 恢复按钮状态
        if (micBtn) {
            micBtn.classList.remove('recording');
            micBtn.textContent = '🎤';
        }
        
        try {
            const result = JSON.parse(resultJson);
            
            // 检查是否网络错误
            if (!result.success && result.error) {
                let errorMsg = result.error;
                let helpText = '';
                
                // 根据错误类型显示不同提示
                if (result.error.includes('网络') || result.error.includes('连接')) {
                    errorMsg = '语音识别需要网络连接';
                    helpText = '请检查网络设置，或直接在输入框中手动输入答案';
                } else if (result.error.includes('取消')) {
                    errorMsg = '已取消语音输入';
                    helpText = '点击麦克风可重新录音';
                } else if (result.error.includes('未识别')) {
                    errorMsg = '未能识别语音';
                    helpText = '请说普通话，或手动输入答案';
                }
                
                if (statusEl) {
                    statusEl.innerHTML = `<span style="color: #f59e0b;">${errorMsg}</span><br><span style="font-size: 11px; color: #64748b;">${helpText}</span>`;
                }
                return;
            }
            
            if (result.success && result.text) {
                // 在光标位置插入文本
                if (textarea) {
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const currentValue = textarea.value;
                    const newValue = currentValue.substring(0, start) + result.text + currentValue.substring(end);
                    
                    textarea.value = newValue;
                    
                    // 更新字数
                    if (charCount) {
                        charCount.textContent = newValue.length + ' 字';
                    }
                    
                    // 移动光标到插入文本后
                    textarea.selectionStart = textarea.selectionEnd = start + result.text.length;
                    textarea.focus();
                }
                
                if (statusEl) {
                    statusEl.textContent = '语音输入成功 ✓';
                    statusEl.style.color = '#10b981';
                    // 3秒后恢复提示
                    setTimeout(() => {
                        statusEl.textContent = '点击麦克风图标开始录音';
                        statusEl.style.color = '';
                    }, 3000);
                }
            } else {
                if (statusEl) {
                    statusEl.textContent = '未识别到语音，请重试';
                    statusEl.style.color = '#f59e0b';
                }
            }
        } catch (e) {
            console.error('解析语音结果失败:', e);
            if (statusEl) {
                statusEl.textContent = '识别失败，请重试';
                statusEl.style.color = '#ef4444';
            }
        }
    },
    
    // 显示手动输入（兼容旧版本）
    showManualInput() {
        console.log('显示手动输入区域');
        this.stopListening();
        // 新版本中输入区域一直显示，不需要切换
    },
    
    // 初始化输入框
    initInputArea() {
        const textarea = document.getElementById('manual-answer');
        const charCount = document.getElementById('char-count');
        
        if (textarea) {
            // 添加输入监听器
            textarea.oninput = function() {
                const val = this.value;
                if (charCount) charCount.textContent = val.length + ' 字';
                if (inputDebug) inputDebug.textContent = '内容: ' + val;
                console.log('输入:', val);
            };
            
            // 初始化显示
            if (charCount) charCount.textContent = currentValue.length + ' 字';
            if (inputDebug) inputDebug.textContent = '内容: ' + currentValue;
            
            // 延迟 focus，避免移动端键盘问题
            setTimeout(() => {
                textarea.focus();
                // 将光标移到末尾
                textarea.setSelectionRange(currentValue.length, currentValue.length);
                console.log('textarea 已 focus，内容长度:', textarea.value.length);
            }, 100);
        }
    },
    
    // 提交手动输入的答案
    submitManualAnswer() {
        console.log('提交手动答案...');
        const textarea = document.getElementById('manual-answer');
        if (!textarea) {
            console.error('找不到 textarea');
            return;
        }
        
        const answer = textarea.value.trim();
        console.log('输入的答案:', answer, '长度:', answer.length);
        
        if (!answer) {
            this.showError('请输入答案');
            return;
        }
        
        // 隐藏输入区域，显示评分
        document.getElementById('input-area').style.display = 'none';
        
        // 显示识别结果（使用用户输入的内容）
        const transcriptArea = document.getElementById('transcript-area');
        const transcriptText = document.getElementById('transcript-text');
        transcriptArea.style.display = 'block';
        transcriptText.textContent = answer;
        transcriptText.classList.remove('interim');
        
        // 评分
        this.evaluateAnswer(answer);
    },
    
    // 显示答案
    showAnswer() {
        document.getElementById('answer-area').style.display = 'block';
        document.getElementById('action-area').style.display = 'none';
        // 滚动到答案区域
        document.getElementById('answer-area').scrollIntoView({ behavior: 'smooth' });
    },
    
    // 标记通过（>= 60%）
    markPassed() {
        this.markStatus(this.similarityScore >= 80 ? 'mastered' : 'normal');
    },
    
    // 标记学习状态
    markStatus(status) {
        if (this.currentItem) {
            app.studyKnowledge(this.currentItem.id, status);
        }
        this.closeModal();
        app.showToast('学习记录已保存！' + app.getRandomEncouragement());
    },
    
    // 获取题型名称
    getTypeName(type) {
        const names = { 
            term: '名词解释', 
            choice: '选择题', 
            short: '简答题', 
            translation: '名词翻译',
            all: '全部' 
        };
        return names[type] || type;
    }
};

// 挂载到全局
window.aiDictation = aiDictation;

// 兼容性处理：如果浏览器不支持语音识别，显示提示
if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    console.log('当前浏览器不支持 Web Speech API，AI 听写功能可能需要使用 Android 原生语音识别');
}
