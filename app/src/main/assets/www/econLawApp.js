// ===== 经济学学习 & 英语单词学习功能 =====

// 保存app.js中的原始方法（在被覆盖之前）
const originalAppMethods = {
    markWord: app.markWord,
    showWordMeaning: app.showWordMeaning,
    prevWord: app.prevWord,
    nextWord: app.nextWord,
    renderCurrentWord: app.renderCurrentWord,
    updateVocabStats: app.updateVocabStats
};

// 扩展app对象
Object.assign(app, {
    // 当前学习状态
    currentEconLawModule: 'all',
    currentVocabLevel: 'basic',
    currentVocabGroup: 1,
    currentWordIndex: 0,
    currentVocabWords: [],
    editingKnowledgeId: null,
    
    // ========== 经济法学习 ==========
    renderEconLawGrid(module = 'all', search = '') {
        const container = document.getElementById('econlaw-grid');
        if (!container) return;
        
        let knowledge = econLawData.knowledge;
        
        if (module !== 'all') {
            knowledge = knowledge.filter(k => k.module === module);
        }
        
        if (search) {
            knowledge = knowledge.filter(k => {
                const contentStr = Array.isArray(k.content) ? k.content.join('') : k.content;
                return k.title.includes(search) || contentStr.includes(search);
            });
        }
        
        container.innerHTML = knowledge.map(item => {
            const moduleInfo = econLawData.modules[item.module];
            // 处理 content 可能是字符串或数组的情况
            const contentPreview = Array.isArray(item.content) 
                ? item.content[0] 
                : item.content;
            
            // 获取学习状态
            const lastRecord = userData.studyRecords[item.id];
            let statusBadge = '';
            if (lastRecord) {
                const statusMap = {
                    fuzzy: { text: '没记住', class: 'status-fuzzy', emoji: '😵' },
                    normal: { text: '一般', class: 'status-normal', emoji: '😐' },
                    mastered: { text: '已掌握', class: 'status-mastered', emoji: '😎' }
                };
                const status = statusMap[lastRecord.status];
                statusBadge = `<span class="card-status ${status.class}">${status.emoji} ${status.text}</span>`;
            } else {
                statusBadge = `<span class="card-status status-none">未学习</span>`;
            }
            
            return `
                <div class="knowledge-card" onclick="app.showEconLawDetail('${item.id}')">
                    <div class="knowledge-header">
                        <span class="knowledge-type" style="background: ${moduleInfo.color}">${this.getTypeName(item.type)}</span>
                        ${statusBadge}
                    </div>
                    <h4 class="knowledge-title">${item.title}</h4>
                    <p class="knowledge-content">${contentPreview ? contentPreview.substring(0, 80) : ''}...</p>
                    <div class="knowledge-footer">
                        <span class="knowledge-module">${moduleInfo.name}</span>
                        ${item.examYears ? `<span class="knowledge-years">真题 ${item.examYears.join('、')}</span>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    },
    
    showEconLawDetail(id) {
        const item = econLawData.knowledge.find(k => k.id === id);
        if (!item) return;

        const moduleInfo = econLawData.modules[item.module];
        // 处理 content 可能是字符串或数组的情况
        const content = Array.isArray(item.content) 
            ? item.content.map(c => `<p>${c}</p>`).join('')
            : `<p>${item.content}</p>`;
        
        // 判断是否为自定义知识点
        const isCustom = id.startsWith('custom-');
        
        // 保存当前学习的知识点ID
        this.currentEconLawId = id;

        // 更新模块标题
        document.getElementById('econlaw-study-module').textContent = moduleInfo.name;

        // 获取上次学习状态
        const lastRecord = userData.studyRecords[id];
        let lastStatusHtml = '';
        if (lastRecord) {
            const statusMap = {
                fuzzy: { text: '没记住', class: 'last-status-fuzzy', emoji: '😵' },
                normal: { text: '一般', class: 'last-status-normal', emoji: '😐' },
                mastered: { text: '已掌握', class: 'last-status-mastered', emoji: '😎' }
            };
            const status = statusMap[lastRecord.status];
            lastStatusHtml = `<span class="last-study-status ${status.class}">${status.emoji} ${status.text}</span>`;
        }
        
        // 填充全屏内容
        document.getElementById('econlaw-study-content').innerHTML = `
            <div class="study-detail-card">
                <div class="study-detail-header">
                    <span class="study-type-badge" style="background: ${moduleInfo.color}">${this.getTypeName(item.type)}</span>
                    <div class="study-title-row">
                        <h2 class="study-detail-title">${item.title}</h2>
                        ${lastStatusHtml}
                    </div>
                    ${item.examYears ? `<p class="study-detail-meta">真题：${item.examYears.join('、')}年</p>` : ''}
                </div>
                
                <div class="study-detail-content">
                    <div class="content-section">
                        <h4>📝 标准答案</h4>
                        <div class="content-text">${content}</div>
                    </div>
                    
                    <!-- 极简伴读组件 -->
                    <div class="audio-companion">
                        <div class="companion-header">
                            <span class="companion-icon">🎤</span>
                            <span class="companion-title">语音伴读</span>
                            <span class="companion-status" id="companion-status-${id}">点击录音</span>
                        </div>
                        <div class="companion-body">
                            <!-- 进度条 -->
                            <div class="progress-container">
                                <div class="progress-bar-bg">
                                    <div class="progress-bar-fill" id="companion-progress-${id}"></div>
                                </div>
                                <span class="progress-time" id="companion-time-${id}">00:00 / 00:00</span>
                            </div>
                            <!-- 控制按钮 -->
                            <div class="companion-controls" id="companion-controls-${id}">
                                <button class="companion-btn record" id="btn-record-${id}" onclick="app.toggleCompanionRecord('${id}')" title="录音">
                                    <span class="btn-icon">🎤</span>
                                    <span class="btn-text">录音</span>
                                </button>
                                <button class="companion-btn play" id="btn-play-${id}" onclick="app.playCompanionAudio('${id}')" title="播放" style="display:none;">
                                    <span class="btn-icon">▶</span>
                                    <span class="btn-text">播放</span>
                                </button>
                                <button class="companion-btn pause" id="btn-pause-${id}" onclick="app.pauseCompanionAudio('${id}')" title="暂停" style="display:none;">
                                    <span class="btn-icon">⏸</span>
                                    <span class="btn-text">暂停</span>
                                </button>
                                <button class="companion-btn stop" id="btn-stop-${id}" onclick="app.stopCompanionAudio('${id}')" title="停止" disabled>
                                    <span class="btn-icon">⏹</span>
                                    <span class="btn-text">停止</span>
                                </button>
                            </div>
                            <!-- 音波动画 -->
                            <div class="audio-waves" id="companion-waves-${id}" style="display:none;">
                                <span></span><span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                    
                    ${item.tip ? `
                        <div class="content-section tip-section">
                            <h4>💡 记忆技巧</h4>
                            <p>${item.tip}</p>
                        </div>
                    ` : ''}
                </div>
                
                <div class="study-detail-actions">
                    <h4>🎯 掌握程度</h4>
                    <div class="study-feedback-btns">
                        <button class="study-fb-btn fuzzy" onclick="app.studyEconLaw('${id}', 'fuzzy')">
                            <span>😵</span>
                            <span>没记住</span>
                        </button>
                        <button class="study-fb-btn normal" onclick="app.studyEconLaw('${id}', 'normal')">
                            <span>😐</span>
                            <span>一般</span>
                        </button>
                        <button class="study-fb-btn mastered" onclick="app.studyEconLaw('${id}', 'mastered')">
                            <span>😎</span>
                            <span>已掌握</span>
                        </button>
                    </div>
                </div>
                
                ${isCustom ? `
                    <div class="study-detail-manage">
                        <button class="manage-btn" onclick="app.showEditKnowledgeModal('${id}')">✏️ 编辑</button>
                        <button class="manage-btn delete" onclick="app.deleteKnowledge('${id}')">🗑️ 删除</button>
                    </div>
                ` : ''}
            </div>
        `;

        // 显示全屏界面
        document.getElementById('econlaw-study-modal').style.display = 'flex';
    },
    
    // 关闭经济法学习界面
    closeEconLawStudy() {
        // 停止伴读音频
        if (this.companionAudio) {
            this.companionAudio.pause();
            this.companionAudio = null;
        }
        if (this.companionRecorder && this.companionRecorder.state === 'recording') {
            this.companionRecorder.stop();
        }
        document.getElementById('econlaw-study-modal').style.display = 'none';
        this.currentEconLawId = null;
    },
    
    // ========== 极简伴读组件 ==========
    companionRecorder: null,
    companionAudio: null,
    companionAudioChunks: [],
    companionRecordingId: null,
    
    // 切换录音状态
    async toggleCompanionRecord(id) {
        const btnRecord = document.getElementById(`btn-record-${id}`);
        const btnPlay = document.getElementById(`btn-play-${id}`);
        const btnStop = document.getElementById(`btn-stop-${id}`);
        const statusEl = document.getElementById(`companion-status-${id}`);
        const wavesEl = document.getElementById(`companion-waves-${id}`);
        
        if (!this.companionRecorder || this.companionRecorder.state === 'inactive') {
            // 开始录音
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.companionRecorder = new MediaRecorder(stream);
                this.companionAudioChunks = [];
                this.companionRecordingId = id;
                
                this.companionRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        this.companionAudioChunks.push(e.data);
                    }
                };
                
                this.companionRecorder.onstop = () => {
                    const audioBlob = new Blob(this.companionAudioChunks, { type: 'audio/webm' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    
                    // 保存到 localStorage
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        localStorage.setItem(`companion_audio_${id}`, reader.result);
                        this.updateCompanionUI(id, 'recorded');
                    };
                    reader.readAsDataURL(audioBlob);
                    
                    // 停止所有音频轨道
                    stream.getTracks().forEach(track => track.stop());
                };
                
                this.companionRecorder.start();
                
                // 更新UI
                btnRecord.innerHTML = '<span class="btn-icon">⏹</span><span class="btn-text">停止</span>';
                btnRecord.classList.add('recording');
                statusEl.textContent = '正在录音...';
                statusEl.classList.add('recording');
                wavesEl.style.display = 'flex';
                
            } catch (err) {
                console.error('录音失败:', err);
                alert('录音失败，请检查麦克风权限');
            }
        } else {
            // 停止录音
            this.companionRecorder.stop();
            btnRecord.innerHTML = '<span class="btn-icon">🎤</span><span class="btn-text">录音</span>';
            btnRecord.classList.remove('recording');
            statusEl.textContent = '录音完成';
            statusEl.classList.remove('recording');
            wavesEl.style.display = 'none';
        }
    },
    
    // 播放伴读音频
    playCompanionAudio(id) {
        const savedAudio = localStorage.getItem(`companion_audio_${id}`);
        if (!savedAudio) {
            alert('暂无录音，请先录制伴读');
            return;
        }
        
        // 如果正在播放其他音频，先停止
        if (this.companionAudio) {
            this.companionAudio.pause();
        }
        
        this.companionAudio = new Audio(savedAudio);
        
        // 更新UI
        this.updateCompanionUI(id, 'playing');
        
        // 监听进度
        this.companionAudio.ontimeupdate = () => {
            this.updateCompanionProgress(id);
        };
        
        this.companionAudio.onended = () => {
            this.updateCompanionUI(id, 'stopped');
        };
        
        this.companionAudio.play();
    },
    
    // 暂停伴读音频
    pauseCompanionAudio(id) {
        if (this.companionAudio) {
            this.companionAudio.pause();
            this.updateCompanionUI(id, 'paused');
        }
    },
    
    // 停止伴读音频
    stopCompanionAudio(id) {
        if (this.companionAudio) {
            this.companionAudio.pause();
            this.companionAudio.currentTime = 0;
            this.updateCompanionUI(id, 'stopped');
        }
    },
    
    // 更新伴读UI状态
    updateCompanionUI(id, state) {
        const btnRecord = document.getElementById(`btn-record-${id}`);
        const btnPlay = document.getElementById(`btn-play-${id}`);
        const btnPause = document.getElementById(`btn-pause-${id}`);
        const btnStop = document.getElementById(`btn-stop-${id}`);
        const statusEl = document.getElementById(`companion-status-${id}`);
        const wavesEl = document.getElementById(`companion-waves-${id}`);
        const savedAudio = localStorage.getItem(`companion_audio_${id}`);
        
        switch(state) {
            case 'recorded':
                btnRecord.style.display = 'inline-flex';
                btnRecord.innerHTML = '<span class="btn-icon">🎤</span><span class="btn-text">重录</span>';
                btnPlay.style.display = 'inline-flex';
                btnPause.style.display = 'none';
                btnStop.disabled = true;
                statusEl.textContent = '已保存，可播放';
                wavesEl.style.display = 'none';
                break;
            case 'playing':
                btnRecord.style.display = 'none';
                btnPlay.style.display = 'none';
                btnPause.style.display = 'inline-flex';
                btnStop.disabled = false;
                statusEl.textContent = '正在播放...';
                wavesEl.style.display = 'flex';
                break;
            case 'paused':
                btnRecord.style.display = 'none';
                btnPlay.style.display = 'inline-flex';
                btnPause.style.display = 'none';
                btnStop.disabled = false;
                statusEl.textContent = '已暂停';
                wavesEl.style.display = 'none';
                break;
            case 'stopped':
                btnRecord.style.display = 'inline-flex';
                btnRecord.innerHTML = savedAudio ? '<span class="btn-icon">🎤</span><span class="btn-text">重录</span>' : '<span class="btn-icon">🎤</span><span class="btn-text">录音</span>';
                btnPlay.style.display = savedAudio ? 'inline-flex' : 'none';
                btnPause.style.display = 'none';
                btnStop.disabled = true;
                statusEl.textContent = savedAudio ? '已保存，可播放' : '点击录音';
                wavesEl.style.display = 'none';
                document.getElementById(`companion-progress-${id}`).style.width = '0%';
                break;
        }
    },
    
    // 更新进度条
    updateCompanionProgress(id) {
        if (!this.companionAudio) return;
        
        const progress = (this.companionAudio.currentTime / this.companionAudio.duration) * 100;
        document.getElementById(`companion-progress-${id}`).style.width = `${progress}%`;
        
        // 更新时间显示
        const current = this.formatTime(this.companionAudio.currentTime);
        const total = this.formatTime(this.companionAudio.duration || 0);
        document.getElementById(`companion-time-${id}`).textContent = `${current} / ${total}`;
    },
    
    // 格式化时间
    formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },
    
    studyEconLaw(id, status) {
        // 记录学习状态
        this.studyKnowledge(id, status);
        // 关闭弹窗
        this.closeEconLawStudy();
        // 刷新卡片状态显示
        this.renderEconLawGrid();
    },

    // ========== 英语单词学习 ==========
    initVocabulary() {
        this.loadVocabularyGroup('basic', 1);
        this.updateVocabStats();
    },
    
    // 生成组别选项 HTML
    _generateGroupOptions() {
        const levelInfo = vocabularyData.levels[this.currentVocabLevel];
        if (!levelInfo) return '';
        
        const totalGroups = levelInfo.groups;
        let options = '';
        for (let i = 1; i <= totalGroups; i++) {
            const hasData = this._hasGroupData(this.currentVocabLevel, i);
            const label = hasData ? `第${i}组` : `第${i}组(待导入)`;
            const selected = i === this.currentVocabGroup ? 'selected' : '';
            options += `<option value="${i}" ${selected}>${label}</option>`;
        }
        return options;
    },
    
    // 初始化组别选择器
    _initGroupSelector() {
        const selector = document.getElementById('group-selector');
        const levelTag = document.getElementById('current-level-tag');
        if (!selector || !levelTag) return;
        
        const levelInfo = vocabularyData.levels[this.currentVocabLevel];
        if (!levelInfo) return;
        
        // 更新等级标签
        levelTag.textContent = levelInfo.name;
        
        // 生成组别选项
        const totalGroups = levelInfo.groups;
        let options = '';
        for (let i = 1; i <= totalGroups; i++) {
            // 检查该组是否有数据
            const hasData = this._hasGroupData(this.currentVocabLevel, i);
            const label = hasData ? `第${i}组` : `第${i}组(待导入)`;
            const selected = i === this.currentVocabGroup ? 'selected' : '';
            options += `<option value="${i}" ${selected}>${label}</option>`;
        }
        selector.innerHTML = options;
    },
    
    // 检查组别是否有数据
    _hasGroupData(level, group) {
        if (level === 'basic') {
            return !!vocabularyData.basicVocabulary[group];
        }
        return !!customVocabularies[`${level}-${group}`];
    },
    
    // 切换组别
    switchGroup(group) {
        group = parseInt(group);
        if (group === this.currentVocabGroup) return;
        
        this.loadVocabularyGroup(this.currentVocabLevel, group);
        
        // 更新侧边栏选中状态
        this._updateLevelItem();
    },
    
    // 更新侧边栏等级选中状态
    _updateLevelItem() {
        document.querySelectorAll('.vocab-level-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.level === this.currentVocabLevel) {
                item.classList.add('active');
                // 更新进度显示
                const progress = item.querySelector('.level-progress');
                if (progress) {
                    const totalGroups = vocabularyData.levels[this.currentVocabLevel]?.groups || 0;
                    progress.textContent = `第${this.currentVocabGroup}组/${totalGroups}组`;
                }
            }
        });
    },
    
    loadVocabularyGroup(level, group) {
        this.currentVocabLevel = level;
        this.currentVocabGroup = group;
        this.currentWordIndex = 0;
        
        // 获取词汇
        if (level === 'basic' && vocabularyData.basicVocabulary[group]) {
            this.currentVocabWords = vocabularyData.basicVocabulary[group];
        } else if (customVocabularies[`${level}-${group}`]) {
            this.currentVocabWords = customVocabularies[`${level}-${group}`];
        } else {
            this.currentVocabWords = [];
        }
        
        // 更新组别选择器
        this._initGroupSelector();
        
        this.renderWordCard();
        this.updateVocabStats();
    },
    
    renderWordCard() {
        // 修复：检查是否在使用econLawApp的词汇界面（vocab-card-container是该界面的特有元素）
        const vocabCardContainer = document.getElementById('vocab-card-container');
        if (!vocabCardContainer) {
            // 如果不存在，说明正在使用app.js的词汇学习界面，不执行渲染
            return;
        }
        
        const levelNames = {
            basic: '基础词汇',
            intermediate: '中级词汇',
            advanced: '高级词汇',
            phrase: '词组搭配'
        };
        
        if (!this.currentVocabWords || this.currentVocabWords.length === 0) {
            // 无词汇时仍保留组别选择器，让用户可以切换
            document.getElementById('vocab-card-container').innerHTML = `
                <div class="vocab-card empty">
                    <div class="vocab-card-header">
                        <div class="vocab-header-left">
                            <span class="vocab-level-tag" id="current-level-tag">${levelNames[this.currentVocabLevel]}</span>
                            <select class="group-selector" id="group-selector" onchange="app.switchGroup(this.value)">
                                ${this._generateGroupOptions()}
                            </select>
                        </div>
                    </div>
                    <div class="empty-icon">📚</div>
                    <p>该组暂无词汇</p>
                    <p style="font-size: 13px; margin-top: 8px;">请先导入词汇或选择其他组</p>
                </div>
            `;
            return;
        }
        
        const word = this.currentVocabWords[this.currentWordIndex];
        const progress = userVocabularyProgress[word.word] || { status: 'new' };
        
        document.getElementById('current-word').textContent = word.word;
        document.getElementById('current-phonetic').textContent = word.phonetic || '';
        document.getElementById('current-meaning').textContent = word.meaning || '';
        
        // 相似词
        const similar = vocabularyData.similarWords[word.word];
        if (similar) {
            document.getElementById('similar-words').style.display = 'block';
            document.querySelector('.similar-list').textContent = similar.join(', ');
        } else {
            document.getElementById('similar-words').style.display = 'none';
        }
        
        // 重置显示状态
        document.getElementById('meaning-section').style.display = 'none';
        document.getElementById('show-meaning-btn').style.display = 'inline-block';
        document.getElementById('feedback-btns').style.display = 'none';
        
        // 更新进度（带左右切换按钮）
        const progressText = document.getElementById('vocab-progress-text');
        if (progressText) {
            const canPrev = this.currentWordIndex > 0;
            const canNext = this.currentWordIndex < this.currentVocabWords.length - 1;
            progressText.innerHTML = `
                <button class="word-nav-btn prev" onclick="app.prevWord()" ${canPrev ? '' : 'disabled'}>◀</button>
                <span class="word-progress">${this.currentWordIndex + 1} / ${this.currentVocabWords.length}</span>
                <button class="word-nav-btn next" onclick="app.nextWord()" ${canNext ? '' : 'disabled'}>▶</button>
            `;
        }
        
        // 更新等级标签（不显示组别，组别由下拉框显示）
        const levelTag = document.getElementById('current-level-tag');
        if (levelTag) {
            levelTag.textContent = levelNames[this.currentVocabLevel];
        }
    },
    
    // 上一个单词
    prevWord() {
        // 修复：检查是否在使用app.js的界面
        const vocabCardContainer = document.getElementById('vocab-card-container');
        if (!vocabCardContainer) {
            // 如果vocab-card-container不存在，说明正在使用app.js的界面
            if (originalAppMethods.prevWord) {
                return originalAppMethods.prevWord.call(this);
            }
            return;
        }
        if (this.currentWordIndex > 0) {
            this.currentWordIndex--;
            this.renderWordCard();
        }
    },
    
    // 下一个单词
    nextWord() {
        // 修复：检查是否在使用app.js的界面
        const vocabCardContainer = document.getElementById('vocab-card-container');
        if (!vocabCardContainer) {
            // 如果vocab-card-container不存在，说明正在使用app.js的界面
            if (originalAppMethods.nextWord) {
                return originalAppMethods.nextWord.call(this);
            }
            return;
        }
        if (this.currentWordIndex < this.currentVocabWords.length - 1) {
            this.currentWordIndex++;
            this.renderWordCard();
        }
    },
    
    showWordMeaning() {
        // 修复：检查是否在使用app.js的界面
        const vocabCardContainer = document.getElementById('vocab-card-container');
        if (!vocabCardContainer) {
            // 如果vocab-card-container不存在，说明正在使用app.js的界面
            if (originalAppMethods.showWordMeaning) {
                return originalAppMethods.showWordMeaning.call(this);
            }
            return;
        }
        
        // 修复：添加空值检查，避免元素不存在时报错
        const meaningSection = document.getElementById('meaning-section');
        const showMeaningBtn = document.getElementById('show-meaning-btn');
        const feedbackBtns = document.getElementById('feedback-btns');
        
        if (meaningSection) meaningSection.style.display = 'block';
        if (showMeaningBtn) showMeaningBtn.style.display = 'none';
        if (feedbackBtns) feedbackBtns.style.display = 'flex';
    },
    
    markWord(result) {
        // 修复：检查是否在使用app.js的界面
        const vocabCardContainer = document.getElementById('vocab-card-container');
        if (!vocabCardContainer) {
            // 如果vocab-card-container不存在，说明正在使用app.js的界面
            if (originalAppMethods.markWord) {
                return originalAppMethods.markWord.call(this, result);
            }
            return;
        }
        
        const word = this.currentVocabWords[this.currentWordIndex];
        if (!word || !word.word) {
            return;
        }
        
        const now = new Date();
        
        if (!userVocabularyProgress[word.word]) {
            userVocabularyProgress[word.word] = {
                status: 'learning',
                reviewCount: 0,
                wrongCount: 0,
                lastReview: null,
                nextReview: null
            };
        }
        
        const progress = userVocabularyProgress[word.word];
        progress.reviewCount++;
        progress.lastReview = now.toISOString(); // 记录本次学习时间
        
        if (result === 'wrong') {
            progress.wrongCount++;
            progress.status = 'learning';
            const next = new Date();
            next.setMinutes(next.getMinutes() + 5); // 5分钟后复习
            progress.nextReview = next.toISOString();
        } else if (result === 'vague') {
            progress.status = 'learning';
            const next = new Date();
            next.setDate(next.getDate() + 1);
            progress.nextReview = next.toISOString();
        } else if (result === 'correct') {
            if (progress.reviewCount >= 3 && progress.wrongCount === 0) {
                progress.status = 'mastered';
            }
            const next = new Date();
            next.setDate(next.getDate() + 3);
            progress.nextReview = next.toISOString();
        }
        
        saveVocabularyData();
        this.updateVocabStats();
        
        // 下一个单词
        this.currentWordIndex++;
        if (this.currentWordIndex >= this.currentVocabWords.length) {
            this.currentWordIndex = 0;
            this.showToast('🎉 本组学习完成！');
        }
        this.renderWordCard();
    },
    
    playWordSound() {
        const word = this.currentVocabWords[this.currentWordIndex];
        if (!word) return;
        
        // 优先使用 Android 原生 TTS
        if (typeof Android !== 'undefined' && Android.isTtsAvailable && Android.isTtsAvailable()) {
            Android.speakEnglish(word.word);
        } else if ('speechSynthesis' in window) {
            // 降级使用 Web Speech API
            const utterance = new SpeechSynthesisUtterance(word.word);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        } else {
            this.showToast('您的浏览器不支持语音播放');
        }
    },
    
    updateVocabStats() {
        // 修复：检查是否在使用app.js的界面
        // 通过检查vocab-card-container元素是否存在来判断（这是econLawApp界面的特有元素）
        const vocabCardContainer = document.getElementById('vocab-card-container');
        if (!vocabCardContainer) {
            // 如果vocab-card-container不存在，说明正在使用app.js的界面
            if (originalAppMethods.updateVocabStats) {
                return originalAppMethods.updateVocabStats.call(this);
            }
            return;
        }
        
        // 以下是econLawApp的统计逻辑（只统计当前学习的词汇）
        const total = Object.keys(userVocabularyProgress).length;
        const newWords = Object.values(userVocabularyProgress).filter(p => p.status === 'new').length;
        const learning = Object.values(userVocabularyProgress).filter(p => p.status === 'learning').length;
        const mastered = Object.values(userVocabularyProgress).filter(p => p.status === 'mastered').length;
        
        // 修复：添加空值检查，避免元素不存在时报错
        const vocabTotal = document.getElementById('vocab-total');
        const vocabNew = document.getElementById('vocab-new');
        const vocabLearning = document.getElementById('vocab-learning');
        const vocabMastered = document.getElementById('vocab-mastered');
        const vocabBadge = document.getElementById('vocab-badge');
        
        if (vocabTotal) vocabTotal.textContent = total;
        if (vocabNew) vocabNew.textContent = newWords;
        if (vocabLearning) vocabLearning.textContent = learning;
        if (vocabMastered) vocabMastered.textContent = mastered;
        if (vocabBadge) vocabBadge.textContent = learning;
    },
    
    // ========== 词汇导入 ==========
    showImportModal() {
        document.getElementById('import-modal').style.display = 'flex';
        document.getElementById('import-preview').style.display = 'none';
    },
    
    closeImportModal() {
        document.getElementById('import-modal').style.display = 'none';
    },
    
    previewVocabularyFile() {
        const fileInput = document.getElementById('vocab-file-input');
        const file = fileInput.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const format = file.name.split('.').pop().toLowerCase();
            
            this._pendingVocabData = parseVocabularyFile(content, format);
            
            // 显示预览
            document.getElementById('import-preview').style.display = 'block';
            document.getElementById('preview-stats').textContent = 
                `共 ${this._pendingVocabData.length} 个单词`;
            
            document.getElementById('preview-list').innerHTML = 
                this._pendingVocabData.slice(0, 5).map(w => `
                    <div class="preview-item">
                        <strong>${w.word}</strong> ${w.phonetic || ''} - ${w.meaning || ''}
                    </div>
                `).join('') + 
                (this._pendingVocabData.length > 5 ? '<div class="preview-item">...</div>' : '');
        };
        reader.readAsText(file);
    },
    
    importVocabulary() {
        if (!this._pendingVocabData || this._pendingVocabData.length === 0) {
            alert('请先选择文件');
            return;
        }
        
        const level = document.getElementById('import-level').value;
        const group = document.getElementById('import-group').value;
        const key = `${level}-${group}`;
        
        customVocabularies[key] = this._pendingVocabData;
        saveVocabularyData();
        
        this.closeImportModal();
        this.showToast(`✅ 成功导入 ${this._pendingVocabData.length} 个单词！`);
        
        // 刷新显示
        this.loadVocabularyGroup(level, group);
        this.renderImportedList();
    },
    
    renderImportedList() {
        const container = document.getElementById('imported-list');
        if (!container) return;
        
        const imports = Object.keys(customVocabularies);
        if (imports.length === 0) {
            container.innerHTML = '<p class="no-imports">暂无导入的词汇库</p>';
            return;
        }
        
        const levelNames = {
            intermediate: '中级',
            advanced: '高级',
            phrase: '词组',
            custom: '自定义'
        };
        
        container.innerHTML = imports.map(key => {
            const [level, group] = key.split('-');
            const count = customVocabularies[key].length;
            return `
                <div class="imported-item" onclick="app.loadVocabularyGroup('${level}', ${group})">
                    <span>${levelNames[level] || level} - 第${group}组</span>
                    <span class="word-count">${count}词</span>
                </div>
            `;
        }).join('');
    }
});

// 页面切换时初始化
const originalSwitchPage = app.switchPage;
app.switchPage = function(page) {
    originalSwitchPage.call(this, page);
    
    // 只处理经济法页面，词汇页面由app.js处理
    if (page === 'econlaw') {
        this.renderEconLawGrid();
    }
    // 移除vocabulary的处理，避免覆盖app.js的功能
    // else if (page === 'vocabulary') {
    //     this.initVocabulary();
    //     this.renderImportedList();
    // }
};

// 初始化经济法筛选事件
document.addEventListener('DOMContentLoaded', () => {
    // 经济法模块筛选
    document.querySelectorAll('#page-econlaw .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#page-econlaw .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            app.currentEconLawModule = btn.dataset.module;
            app.renderEconLawGrid(btn.dataset.module);
        });
    });
    
    // 经济法搜索
    const econSearch = document.getElementById('econlaw-search-input');
    if (econSearch) {
        econSearch.addEventListener('input', (e) => {
            app.renderEconLawGrid(app.currentEconLawModule, e.target.value);
        });
    }
    
    // 词汇等级选择
    document.querySelectorAll('.vocab-level-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.vocab-level-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            // 切换等级时默认加载第1组
            const level = item.dataset.level;
            app.loadVocabularyGroup(level, 1);
        });
    });
    
    // 学习模式切换
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const mode = btn.dataset.mode;
            app.switchVocabMode(mode);
        });
    });
});

// 添加学习模式切换功能到app对象
Object.assign(app, {
    currentVocabMode: 'flashcard',
    
    switchVocabMode(mode) {
        this.currentVocabMode = mode;
        this.currentWordIndex = 0;
        
        if (mode === 'flashcard') {
            this.renderWordCard();
        } else if (mode === 'choice') {
            this.renderChoiceMode();
        } else if (mode === 'spelling') {
            this.renderSpellingMode();
        } else if (mode === 'similar') {
            this.renderSimilarMode();
        }
    },
    
    // 选择词意模式
    renderChoiceMode() {
        if (this.currentVocabWords.length === 0) {
            this.showEmptyCard();
            return;
        }
        
        const currentWord = this.currentVocabWords[this.currentWordIndex];
        
        // 生成4个选项（1个正确，3个干扰）
        const options = [currentWord];
        const otherWords = this.currentVocabWords.filter(w => w.word !== currentWord.word);
        
        // 随机选择3个干扰项
        for (let i = 0; i < 3 && i < otherWords.length; i++) {
            const randomIndex = Math.floor(Math.random() * otherWords.length);
            const word = otherWords.splice(randomIndex, 1)[0];
            options.push(word);
        }
        
        // 打乱顺序
        options.sort(() => Math.random() - 0.5);
        
        const levelNames = {
            basic: '基础词汇', intermediate: '中级词汇', 
            advanced: '高级词汇', phrase: '词组搭配'
        };
        
        document.getElementById('vocab-card-container').innerHTML = `
            <div class="vocab-card">
                <div class="vocab-card-header">
                    <div class="vocab-header-left">
                        <span class="vocab-level-tag">${levelNames[this.currentVocabLevel]}</span>
                        <select class="group-selector" onchange="app.switchGroup(this.value)">
                            ${this._generateGroupOptions()}
                        </select>
                    </div>
                    <span class="vocab-progress">${this.currentWordIndex + 1} / ${this.currentVocabWords.length}</span>
                </div>
                <div class="vocab-word-section">
                    <h1 class="vocab-word">${currentWord.word}</h1>
                    <p class="vocab-phonetic">${currentWord.phonetic || ''}</p>
                </div>
                <div class="choice-options">
                    ${options.map((opt, idx) => `
                        <button class="choice-btn" onclick="app.checkChoiceAnswer('${opt.word}', '${currentWord.word}')">
                            <span class="choice-label">${String.fromCharCode(65 + idx)}.</span>
                            <span class="choice-text">${opt.meaning}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    checkChoiceAnswer(selected, correct) {
        const isCorrect = selected === correct;
        const buttons = document.querySelectorAll('.choice-btn');
        
        buttons.forEach(btn => {
            const text = btn.querySelector('.choice-text').textContent;
            const word = this.currentVocabWords.find(w => w.meaning === text);
            
            if (word.word === correct) {
                btn.classList.add('correct');
                btn.innerHTML += ' ✅';
            } else if (word.word === selected && !isCorrect) {
                btn.classList.add('wrong');
                btn.innerHTML += ' ❌';
            }
            btn.disabled = true;
        });
        
        setTimeout(() => {
            if (isCorrect) {
                this.markWord('correct');
            } else {
                this.markWord('wrong');
            }
            this.renderChoiceMode();
        }, 1500);
    },
    
    // 拼写练习模式
    renderSpellingMode() {
        if (this.currentVocabWords.length === 0) {
            this.showEmptyCard();
            return;
        }
        
        const currentWord = this.currentVocabWords[this.currentWordIndex];
        const levelNames = {
            basic: '基础词汇', intermediate: '中级词汇', 
            advanced: '高级词汇', phrase: '词组搭配'
        };
        
        document.getElementById('vocab-card-container').innerHTML = `
            <div class="vocab-card">
                <div class="vocab-card-header">
                    <div class="vocab-header-left">
                        <span class="vocab-level-tag">${levelNames[this.currentVocabLevel]}</span>
                        <select class="group-selector" onchange="app.switchGroup(this.value)">
                            ${this._generateGroupOptions()}
                        </select>
                    </div>
                    <span class="vocab-progress">${this.currentWordIndex + 1} / ${this.currentVocabWords.length}</span>
                </div>
                <div class="vocab-word-section">
                    <p class="vocab-phonetic">${currentWord.phonetic || ''}</p>
                    <div class="vocab-meaning" style="font-size: 20px; margin: 20px 0;">${currentWord.meaning}</div>
                </div>
                <div class="spelling-input-section">
                    <input type="text" class="spelling-input" id="spelling-input" 
                           placeholder="请输入单词..." autocomplete="off">
                    <div class="spelling-hint" id="spelling-hint"></div>
                </div>
                <div class="vocab-actions">
                    <button class="vocab-btn show-meaning" onclick="app.checkSpelling()">检查</button>
                    <button class="vocab-btn" onclick="app.showSpellingHint()">提示</button>
                </div>
            </div>
        `;
        
        // 添加回车键监听
        const input = document.getElementById('spelling-input');
        if (input) {
            input.focus();
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.checkSpelling();
            });
        }
    },
    
    checkSpelling() {
        const input = document.getElementById('spelling-input');
        const userAnswer = input.value.trim().toLowerCase();
        const correct = this.currentVocabWords[this.currentWordIndex].word.toLowerCase();
        
        if (userAnswer === correct) {
            input.style.borderColor = 'var(--secondary)';
            this.showToast('✅ 拼写正确！');
            setTimeout(() => {
                this.markWord('correct');
                this.renderSpellingMode();
            }, 1000);
        } else {
            input.style.borderColor = 'var(--danger)';
            document.getElementById('spelling-hint').textContent = `正确答案: ${this.currentVocabWords[this.currentWordIndex].word}`;
            setTimeout(() => {
                this.markWord('wrong');
                this.renderSpellingMode();
            }, 2000);
        }
    },
    
    showSpellingHint() {
        const word = this.currentVocabWords[this.currentWordIndex].word;
        const hint = word.substring(0, Math.ceil(word.length / 2)) + '...';
        document.getElementById('spelling-hint').textContent = `提示: ${hint}`;
    },
    
    // 相似词组模式
    renderSimilarMode() {
        if (this.currentVocabWords.length === 0) {
            this.showEmptyCard();
            return;
        }
        
        const currentWord = this.currentVocabWords[this.currentWordIndex];
        const similar = vocabularyData.similarWords[currentWord.word];
        const levelNames = {
            basic: '基础词汇', intermediate: '中级词汇', 
            advanced: '高级词汇', phrase: '词组搭配'
        };
        
        let similarHtml = '';
        if (similar && similar.length > 0) {
            similarHtml = `
                <div class="similar-words-section">
                    <h4>相似词 / 近义词</h4>
                    <div class="similar-tags">
                        ${similar.map(w => `<span class="similar-tag">${w}</span>`).join('')}
                    </div>
                </div>
            `;
        }
        
        document.getElementById('vocab-card-container').innerHTML = `
            <div class="vocab-card">
                <div class="vocab-card-header">
                    <div class="vocab-header-left">
                        <span class="vocab-level-tag">${levelNames[this.currentVocabLevel]}</span>
                        <select class="group-selector" onchange="app.switchGroup(this.value)">
                            ${this._generateGroupOptions()}
                        </select>
                    </div>
                    <span class="vocab-progress">${this.currentWordIndex + 1} / ${this.currentVocabWords.length}</span>
                </div>
                <div class="vocab-word-section">
                    <h1 class="vocab-word">${currentWord.word}</h1>
                    <p class="vocab-phonetic">${currentWord.phonetic || ''}</p>
                </div>
                <div class="vocab-meaning-section" style="display: block;">
                    <div class="vocab-meaning">${currentWord.meaning}</div>
                    ${similarHtml}
                </div>
                <div class="vocab-actions">
                    <button class="vocab-btn wrong" onclick="app.markAndNext('wrong')">🤔 不认识</button>
                    <button class="vocab-btn correct" onclick="app.markAndNext('correct')">😊 认识</button>
                </div>
            </div>
        `;
    },
    
    markAndNext(result) {
        this.markWord(result);
        this.renderSimilarMode();
    },
    
    showEmptyCard() {
        document.getElementById('vocab-card-container').innerHTML = `
            <div class="vocab-card empty">
                <div class="empty-icon">📚</div>
                <p>该组暂无词汇</p>
                <p style="font-size: 13px; margin-top: 8px;">请先导入词汇或选择其他组</p>
            </div>
        `;
    },

    // ========== 经济学知识点导入/导出功能 ==========
    
    // 显示导入/导出弹窗
    showEconDataModal() {
        let modal = document.getElementById('econ-data-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'econ-data-modal';
            modal.className = 'modal';
            modal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; justify-content: center; align-items: center;';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 480px; max-height: 80vh; overflow-y: auto;">
                    <div class="modal-header">
                        <h3>📚 经济学数据管理</h3>
                        <button class="close-btn" onclick="app.closeEconDataModal()">×</button>
                    </div>
                    <div class="modal-body" style="padding: 20px;">
                        <!-- 导出区域 -->
                        <div class="data-section" style="margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--border);">
                            <h4 style="margin-bottom: 12px; color: var(--text-primary);">📤 导出数据</h4>
                            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">
                                将自定义知识点导出为常用格式文件，可用 Excel、Word 打开。
                            </p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
                                <button class="vocab-btn" onclick="app.exportEconDataToCsv()" style="padding: 10px; font-size: 12px;">
                                    📊 Excel
                                </button>
                                <button class="vocab-btn" onclick="app.exportEconDataToWord()" style="padding: 10px; font-size: 12px;">
                                    📝 Word
                                </button>
                                <button class="vocab-btn" onclick="app.exportEconDataToTxt()" style="padding: 10px; font-size: 12px;">
                                    📄 TXT
                                </button>
                            </div>
                        </div>
                        
                        <!-- 导入区域 -->
                        <div class="data-section" style="margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--border);">
                            <h4 style="margin-bottom: 12px; color: var(--text-primary);">📥 导入数据</h4>
                            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">
                                支持导入 TXT、CSV(Excel)、Word 格式的文件。
                            </p>
                            <input type="file" id="econ-import-file" accept=".txt,.csv,.doc,.docx" style="display: none;" onchange="app.handleEconFileImport(event)">
                            <button class="vocab-btn" onclick="document.getElementById('econ-import-file').click()" style="width: 100%;">
                                📁 选择文件导入
                            </button>
                            <div id="econ-import-preview" style="display: none; margin-top: 12px; padding: 12px; background: var(--bg-secondary); border-radius: 8px; font-size: 13px;"></div>
                        </div>
                        
                        <!-- 统计信息 -->
                        <div class="data-section">
                            <h4 style="margin-bottom: 12px; color: var(--text-primary);">📊 数据统计</h4>
                            <div id="econ-data-stats" style="font-size: 13px; color: var(--text-secondary);">
                                加载中...
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeEconDataModal();
                }
            });
        }
        
        this.updateEconDataStats();
        modal.style.display = 'flex';
    },
    
    closeEconDataModal() {
        const modal = document.getElementById('econ-data-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },
    
    updateEconDataStats() {
        const builtinCount = econLawData.knowledge.length - customEconKnowledge.length;
        const customCount = customEconKnowledge.length;
        
        const statsDiv = document.getElementById('econ-data-stats');
        if (statsDiv) {
            statsDiv.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div style="padding: 10px; background: var(--bg-secondary); border-radius: 8px; text-align: center;">
                        <div style="font-size: 20px; font-weight: bold; color: var(--primary);">${builtinCount}</div>
                        <div style="font-size: 12px;">内置知识点</div>
                    </div>
                    <div style="padding: 10px; background: var(--bg-secondary); border-radius: 8px; text-align: center;">
                        <div style="font-size: 20px; font-weight: bold; color: var(--secondary);">${customCount}</div>
                        <div style="font-size: 12px;">自定义知识点</div>
                    </div>
                </div>
            `;
        }
    },
    
    // 导出经济学数据为 TXT
    exportEconDataToTxt() {
        const content = exportEconKnowledgeToTxt(true); // true 表示包含内置知识点
        
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0];
        const filename = `studyx_economics_${dateStr}.txt`;
        
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showToast(`✅ 已导出为 TXT 文件`);
    },
    
    // 导出经济学数据为 Word
    exportEconDataToWord() {
        const html = exportEconKnowledgeToWord(true); // true 表示包含内置知识点
        
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0];
        const filename = `studyx_economics_${dateStr}.doc`;
        
        const blob = new Blob([html], { type: 'application/msword;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showToast(`✅ 已导出为 Word 文件`);
    },
    
    // 导出经济学数据为 CSV (Excel)
    exportEconDataToCsv() {
        const csv = exportEconKnowledgeToCsv(true); // true 表示包含内置知识点
        
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0];
        const filename = `studyx_economics_${dateStr}.csv`;
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showToast(`✅ 已导出为 CSV 文件（可用 Excel 打开）`);
    },
    
    // 处理文件导入
    handleEconFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const fileName = file.name.toLowerCase();
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const content = e.target.result;
                let items = [];
                let format = '';
                
                // 根据文件扩展名判断格式
                if (fileName.endsWith('.csv')) {
                    items = parseCsvImport(content);
                    format = 'CSV';
                } else if (fileName.endsWith('.txt') || fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
                    items = parseTxtImport(content);
                    format = 'TXT/Word';
                } else {
                    // 默认尝试 TXT 解析
                    items = parseTxtImport(content);
                    format = '文本';
                }
                
                if (items.length === 0) {
                    throw new Error('未能从文件中解析出有效数据');
                }
                
                const result = importEconKnowledge(items);
                
                const previewDiv = document.getElementById('econ-import-preview');
                if (result.success) {
                    previewDiv.style.display = 'block';
                    previewDiv.innerHTML = `
                        <div style="color: var(--success);">✅ ${format} 文件导入成功！</div>
                        <div style="margin-top: 8px;">新增: ${result.added} 个 | 更新: ${result.updated} 个</div>
                    `;
                    this.updateEconDataStats();
                    this.renderEconLawGrid();
                    this.showToast('数据导入成功！');
                } else {
                    previewDiv.style.display = 'block';
                    previewDiv.innerHTML = `<div style="color: var(--danger);">❌ ${result.error}</div>`;
                }
            } catch (error) {
                const previewDiv = document.getElementById('econ-import-preview');
                previewDiv.style.display = 'block';
                previewDiv.innerHTML = `<div style="color: var(--danger);">❌ 文件解析失败: ${error.message}</div>`;
            }
        };
        reader.readAsText(file);
        
        // 清空文件输入
        event.target.value = '';
    },

    // ========== 知识点编辑功能 ==========
    
    // 显示添加新知识点弹窗
    showAddKnowledgeModal() {
        let modal = document.getElementById('add-knowledge-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'add-knowledge-modal';
            modal.className = 'modal';
            modal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; justify-content: center; align-items: center;';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 560px; max-height: 85vh; overflow-y: auto;">
                    <div class="modal-header">
                        <h3>➕ 添加新知识点</h3>
                        <button class="close-btn" onclick="app.closeAddKnowledgeModal()">×</button>
                    </div>
                    <div class="modal-body" style="padding: 20px;">
                        <form id="add-knowledge-form" onsubmit="app.saveNewKnowledge(event)">
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 6px; font-size: 13px; color: var(--text-secondary);">标题 *</label>
                                <input type="text" id="add-title" required style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px;">
                            </div>
                            
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 6px; font-size: 13px; color: var(--text-secondary);">所属模块 *</label>
                                <select id="add-module" required style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px;">
                                    <option value="socialism">社会主义市场经济</option>
                                    <option value="fiscal">财政学</option>
                                    <option value="international">国际经济学</option>
                                    <option value="banking">货币银行学</option>
                                    <option value="western">西方经济学</option>
                                </select>
                            </div>
                            
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 6px; font-size: 13px; color: var(--text-secondary);">题型</label>
                                <select id="add-type" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px;">
                                    <option value="term">名词解释</option>
                                    <option value="choice">选择题</option>
                                    <option value="short">简答题</option>
                                </select>
                            </div>
                            
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 6px; font-size: 13px; color: var(--text-secondary);">内容 *</label>
                                <textarea id="add-content" required rows="6" placeholder="请输入知识点内容，多行可用换行分隔" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px; resize: vertical;"></textarea>
                                <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">每行一个要点，系统将自动处理格式</p>
                            </div>
                            
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 6px; font-size: 13px; color: var(--text-secondary);">记忆技巧</label>
                                <input type="text" id="add-tip" placeholder="可选：输入记忆口诀或技巧" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px;">
                            </div>
                            
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 6px; font-size: 13px; color: var(--text-secondary);">真题年份（用逗号分隔）</label>
                                <input type="text" id="add-years" placeholder="例如：18,19,20,22" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px;">
                            </div>
                            
                            <div style="display: flex; gap: 10px;">
                                <button type="button" onclick="app.closeAddKnowledgeModal()" style="flex: 1; padding: 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-card); color: var(--text-secondary); cursor: pointer;">取消</button>
                                <button type="submit" style="flex: 2; padding: 12px; border-radius: 8px; border: none; background: var(--secondary); color: white; cursor: pointer;">添加知识点</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAddKnowledgeModal();
                }
            });
        }
        
        // 清空表单
        document.getElementById('add-title').value = '';
        document.getElementById('add-module').value = 'fiscal';
        document.getElementById('add-type').value = 'term';
        document.getElementById('add-content').value = '';
        document.getElementById('add-tip').value = '';
        document.getElementById('add-years').value = '';
        
        modal.style.display = 'flex';
    },
    
    closeAddKnowledgeModal() {
        const modal = document.getElementById('add-knowledge-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },
    
    saveNewKnowledge(event) {
        event.preventDefault();
        
        const title = document.getElementById('add-title').value.trim();
        const module = document.getElementById('add-module').value;
        const type = document.getElementById('add-type').value;
        const contentStr = document.getElementById('add-content').value.trim();
        const tip = document.getElementById('add-tip').value.trim();
        const yearsStr = document.getElementById('add-years').value.trim();
        
        // 处理内容（多行转数组）
        const content = contentStr.split('\n').filter(line => line.trim());
        
        // 处理年份
        const examYears = yearsStr 
            ? yearsStr.split(/[,，]/).map(y => y.trim()).filter(y => y)
            : [];
        
        const newKnowledge = {
            module,
            type,
            title,
            content: content.length === 1 ? content[0] : content,
            tip: tip || undefined,
            examYears: examYears.length > 0 ? examYears : undefined,
            difficulty: 2
        };
        
        const id = addCustomEconKnowledge(newKnowledge);
        
        this.showToast('✅ 知识点添加成功！');
        this.closeAddKnowledgeModal();
        this.renderEconLawGrid();
        
        // 自动打开新添加的知识点
        setTimeout(() => {
            this.showEconLawDetail(id);
        }, 300);
    },
    
    // 显示编辑弹窗
    showEditKnowledgeModal(id) {
        const item = econLawData.knowledge.find(k => k.id === id);
        if (!item) return;
        
        this.editingKnowledgeId = id;
        
        let modal = document.getElementById('edit-knowledge-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'edit-knowledge-modal';
            modal.className = 'modal';
            modal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; justify-content: center; align-items: center;';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 560px; max-height: 85vh; overflow-y: auto;">
                    <div class="modal-header">
                        <h3>📝 编辑知识点</h3>
                        <button class="close-btn" onclick="app.closeEditKnowledgeModal()">×</button>
                    </div>
                    <div class="modal-body" style="padding: 20px;">
                        <form id="edit-knowledge-form" onsubmit="app.saveKnowledgeEdit(event)">
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 6px; font-size: 13px; color: var(--text-secondary);">标题 *</label>
                                <input type="text" id="edit-title" required style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px;">
                            </div>
                            
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 6px; font-size: 13px; color: var(--text-secondary);">所属模块 *</label>
                                <select id="edit-module" required style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px;">
                                    <option value="socialism">社会主义市场经济</option>
                                    <option value="fiscal">财政学</option>
                                    <option value="international">国际经济学</option>
                                    <option value="banking">货币银行学</option>
                                    <option value="western">西方经济学</option>
                                </select>
                            </div>
                            
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 6px; font-size: 13px; color: var(--text-secondary);">题型</label>
                                <select id="edit-type" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px;">
                                    <option value="term">名词解释</option>
                                    <option value="choice">选择题</option>
                                    <option value="short">简答题</option>
                                </select>
                            </div>
                            
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 6px; font-size: 13px; color: var(--text-secondary);">内容 *</label>
                                <textarea id="edit-content" required rows="6" placeholder="请输入知识点内容，多行可用换行分隔" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px; resize: vertical;"></textarea>
                                <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">每行一个要点，系统将自动处理格式</p>
                            </div>
                            
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; margin-bottom: 6px; font-size: 13px; color: var(--text-secondary);">记忆技巧</label>
                                <input type="text" id="edit-tip" placeholder="可选：输入记忆口诀或技巧" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px;">
                            </div>
                            
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 6px; font-size: 13px; color: var(--text-secondary);">真题年份（用逗号分隔）</label>
                                <input type="text" id="edit-years" placeholder="例如：18,19,20,22" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px;">
                            </div>
                            
                            <div style="display: flex; gap: 10px;">
                                <button type="button" onclick="app.closeEditKnowledgeModal()" style="flex: 1; padding: 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-card); color: var(--text-secondary); cursor: pointer;">取消</button>
                                <button type="submit" style="flex: 2; padding: 12px; border-radius: 8px; border: none; background: var(--primary); color: white; cursor: pointer;">保存修改</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeEditKnowledgeModal();
                }
            });
        }
        
        // 填充当前数据
        document.getElementById('edit-title').value = item.title || '';
        document.getElementById('edit-module').value = item.module || 'fiscal';
        document.getElementById('edit-type').value = item.type || 'term';
        document.getElementById('edit-tip').value = item.tip || '';
        document.getElementById('edit-years').value = item.examYears ? item.examYears.join(',') : '';
        
        // 处理内容（数组转字符串）
        const content = Array.isArray(item.content) 
            ? item.content.join('\n') 
            : item.content || '';
        document.getElementById('edit-content').value = content;
        
        modal.style.display = 'flex';
    },
    
    closeEditKnowledgeModal() {
        const modal = document.getElementById('edit-knowledge-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.editingKnowledgeId = null;
    },
    
    saveKnowledgeEdit(event) {
        event.preventDefault();
        
        if (!this.editingKnowledgeId) return;
        
        const title = document.getElementById('edit-title').value.trim();
        const module = document.getElementById('edit-module').value;
        const type = document.getElementById('edit-type').value;
        const contentStr = document.getElementById('edit-content').value.trim();
        const tip = document.getElementById('edit-tip').value.trim();
        const yearsStr = document.getElementById('edit-years').value.trim();
        
        // 处理内容（多行转数组）
        const content = contentStr.split('\n').filter(line => line.trim());
        
        // 处理年份
        const examYears = yearsStr 
            ? yearsStr.split(/[,，]/).map(y => y.trim()).filter(y => y)
            : [];
        
        const updates = {
            title,
            module,
            type,
            content: content.length === 1 ? content[0] : content,
            tip: tip || undefined,
            examYears: examYears.length > 0 ? examYears : undefined
        };
        
        const success = updateEconKnowledge(this.editingKnowledgeId, updates);
        
        if (success) {
            this.showToast('✅ 知识点已更新！');
            this.closeEditKnowledgeModal();
            this.renderEconLawGrid();
        } else {
            alert('保存失败，请重试');
        }
    },
    
    // 删除知识点
    deleteKnowledge(id) {
        const item = econLawData.knowledge.find(k => k.id === id);
        if (!item) return;
        
        // 内置知识点不能删除
        if (!id.startsWith('custom-')) {
            alert('内置知识点不能删除，只能删除您自己添加的知识点');
            return;
        }
        
        if (!confirm(`确定要删除知识点"${item.title}"吗？`)) {
            return;
        }
        
        deleteCustomEconKnowledge(id);
        this.showToast('✅ 知识点已删除');
        this.renderEconLawGrid();
        this.closeModal();
    }
});
