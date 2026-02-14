// ===== StudyX 记忆引擎 - 应用逻辑 =====

const app = {
    // 当前状态
    currentPage: 'today',
    currentQuiz: null,
    currentQuestionIndex: 0,
    quizResults: [],
    
    // 视频筛选状态
    currentVideoFilter: 'all',
    currentVideoTab: 'all',
    videoSearchKeyword: '',
    
    // 日报数据
    todaySubjects: [],
    
    // 日历状态
    calendarDate: new Date(),
    
    // 初始化
    init() {
        this.bindEvents();
        this.updateTodayInfo();
        this.renderTodayTasks();
        this.renderKnowledgeGrid();
        this.renderReviewSchedule();
        this.renderStats();
        this.renderCalendar();
        this.updateBadges();
        this.renderVideosList();
        this.renderDailyList();
        this.initReportSelectors();
        
        // 设置日报日期选择器
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('daily-date-input');
        if (dateInput) {
            dateInput.value = today;
            dateInput.max = today;
            dateInput.addEventListener('change', (e) => {
                app.generateTodayLearning(e.target.value);
                document.getElementById('daily-editor-date').textContent = new Date(e.target.value).toLocaleDateString('zh-CN');
            });
        }
        document.getElementById('daily-editor-date').textContent = new Date().toLocaleDateString('zh-CN');
        
        // 开始计时
        this.startStudyTimer();
    },

    // 绑定事件
    bindEvents() {
        // 导航切换（桌面端侧边栏）
        document.querySelectorAll('.sidebar .nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                this.switchPage(page);
            });
        });
        
        // 手机端底部导航切换
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                if (page === 'more') {
                    this.showMoreMenu();
                } else {
                    this.switchPage(page);
                }
            });
        });

        // 模块筛选（无"全部"按钮，点击已选中的取消筛选）
        this.currentModule = 'all';
        document.querySelectorAll('.module-filter .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const module = btn.dataset.module;
                // 如果点击已选中的，则取消筛选
                if (this.currentModule === module) {
                    this.currentModule = 'all';
                    document.querySelectorAll('.module-filter .filter-btn').forEach(b => b.classList.remove('active'));
                } else {
                    this.currentModule = module;
                    document.querySelectorAll('.module-filter .filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
                this.renderKnowledgeGrid(this.currentModule, '', this.currentType, this.currentMastery);
            });
        });
        
        // 题型筛选（无"全部"按钮，点击已选中的取消筛选）
        this.currentType = 'all';
        document.querySelectorAll('.type-filter .type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                // 如果点击已选中的，则取消筛选
                if (this.currentType === type) {
                    this.currentType = 'all';
                    document.querySelectorAll('.type-filter .type-btn').forEach(b => b.classList.remove('active'));
                } else {
                    this.currentType = type;
                    document.querySelectorAll('.type-filter .type-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
                this.renderKnowledgeGrid(this.currentModule, '', this.currentType, this.currentMastery);
            });
        });
        
        // 掌握程度筛选
        this.currentMastery = 'all';
        document.querySelectorAll('.mastery-filter .mastery-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const mastery = btn.dataset.mastery;
                if (this.currentMastery === mastery) {
                    this.currentMastery = 'all';
                    document.querySelectorAll('.mastery-filter .mastery-btn').forEach(b => b.classList.remove('active'));
                    document.querySelector('.mastery-filter .mastery-btn[data-mastery="all"]').classList.add('active');
                } else {
                    this.currentMastery = mastery;
                    document.querySelectorAll('.mastery-filter .mastery-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
                this.renderKnowledgeGrid(this.currentModule, '', this.currentType, this.currentMastery);
            });
        });

        // 搜索
        const searchInput = document.getElementById('econlaw-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.renderKnowledgeGrid(this.currentModule, e.target.value, this.currentType, this.currentMastery);
            });
        }

        // 视频筛选
        document.querySelectorAll('.videos-filter .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.videos-filter .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentVideoFilter = btn.dataset.filter;
                this.renderVideosList();
            });
        });

        // 视频分类标签
        document.querySelectorAll('.videos-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.videos-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentVideoTab = btn.dataset.tab;
                this.renderVideosList();
            });
        });

        // 视频搜索回车
        const videoSearchInput = document.getElementById('video-search-input');
        if (videoSearchInput) {
            videoSearchInput.addEventListener('input', (e) => {
                this.videoSearchKeyword = e.target.value.toLowerCase();
                this.renderVideosList();
            });
        }
    },

    // 切换页面
    switchPage(page) {
        // 更新桌面端导航
        document.querySelectorAll('.sidebar .nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });
        
        // 更新手机端导航
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });

        // 更新页面内容
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`page-${page}`).classList.add('active');

        // 更新标题
        const titles = {
            today: '今日任务',
            econlaw: '经济法学习',
            vocabulary: '英语单词',
            quiz: '记忆抽测',
            review: '复习中心',
            stats: '学习数据',
            schedule: '学习计划',
            videos: '视频课程',
            daily: '学习日报',
            reports: '周报月报',
            calculator: '学习计算器',
            reading: '学习阅读'
        };
        document.getElementById('page-title').textContent = titles[page] || '学习';

        this.currentPage = page;

        // 刷新数据
        if (page === 'stats') this.renderStats();
        if (page === 'review') this.renderReviewSchedule();
        if (page === 'videos') this.renderVideosList();
        if (page === 'daily') {
            this.renderDailyList();
            this.generateTodayLearning();
        }
        if (page === 'econlaw') this.renderEconLawGrid();
        if (page === 'vocabulary') {
            this.initVocabulary();
            this.renderImportedList();
        }
        if (page === 'calculator') this.initCalculator();
        if (page === 'reading') this.initReading();
    },

    // 显示更多菜单（手机端）
    showMoreMenu() {
        const menuItems = [
            { page: 'stats', icon: '📊', name: '学习数据' },
            { page: 'quiz', icon: '🎲', name: '记忆抽测' },
            { page: 'schedule', icon: '📋', name: '学习计划' },
            { page: 'videos', icon: '🎬', name: '视频课程' },
            { page: 'daily', icon: '📝', name: '学习日报' },
            { page: 'reports', icon: '📈', name: '周报月报' },
            { action: 'backup', icon: '💾', name: '数据备份' }
        ];
        
        const menuHtml = menuItems.map(item => {
            if (item.action) {
                return `
                    <div class="mobile-menu-item" onclick="app.handleMoreMenuAction('${item.action}')">
                        <span class="mobile-menu-icon">${item.icon}</span>
                        <span class="mobile-menu-text">${item.name}</span>
                    </div>
                `;
            }
            return `
                <div class="mobile-menu-item" onclick="app.switchPage('${item.page}'); app.closeMobileMenu();">
                    <span class="mobile-menu-icon">${item.icon}</span>
                    <span class="mobile-menu-text">${item.name}</span>
                </div>
            `;
        }).join('');
        
        const modal = document.createElement('div');
        modal.className = 'mobile-menu-modal';
        modal.innerHTML = `
            <div class="mobile-menu-overlay" onclick="app.closeMobileMenu()"></div>
            <div class="mobile-menu-content">
                <div class="mobile-menu-header">
                    <h3>更多功能</h3>
                    <button onclick="app.closeMobileMenu()">✕</button>
                </div>
                <div class="mobile-menu-list">
                    ${menuHtml}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    // 关闭更多菜单
    closeMobileMenu() {
        const modal = document.querySelector('.mobile-menu-modal');
        if (modal) modal.remove();
    },

    // 处理更多菜单的动作
    handleMoreMenuAction(action) {
        this.closeMobileMenu();
        
        if (action === 'backup') {
            // 显示备份恢复界面
            if (window.backupRestoreUI) {
                backupRestoreUI.showModal();
            } else {
                this.showToast('备份模块未加载，请刷新页面');
            }
        }
    },

    // 更新今日信息
    updateTodayInfo() {
        const today = new Date();
        const dateStr = today.toLocaleDateString('zh-CN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        });
        document.getElementById('today-date').textContent = dateStr;

        // 考试倒计时
        this.updateExamCountdown();

        // 统计数据
        const totalKnowledge = studyData.knowledge.length;
        const learnedCount = Object.keys(userData.memoryStrength).length;
        const masteredCount = Object.values(userData.memoryStrength).filter(s => s >= 70).length;
        const reviewCount = this.getTodayReviewCount();

        document.getElementById('today-new').textContent = 3; // 默认新学3个
        document.getElementById('today-review').textContent = reviewCount;
        document.getElementById('today-completed').textContent = userData.completedTasks.length;
        document.getElementById('streak-days').textContent = userData.streakDays;
        document.getElementById('today-review-count').textContent = reviewCount;
        document.getElementById('today-time').textContent = userData.todayStudyTime;
        // 更新手机端时间显示
        const mobileTimeEl = document.getElementById('today-time-mobile');
        if (mobileTimeEl) mobileTimeEl.textContent = userData.todayStudyTime;
    },

    // 获取今日需要复习的知识点数量
    getTodayReviewCount() {
        const today = new Date().toDateString();
        let count = 0;
        for (const [id, nextReview] of Object.entries(userData.nextReview)) {
            if (new Date(nextReview) <= new Date()) {
                count++;
            }
        }
        return count;
    },

    // 渲染今日任务
    renderTodayTasks() {
        const today = new Date().toISOString().split('T')[0];
        const schedule = studyData.schedule[today];
        const container = document.getElementById('today-task-list');
        
        if (!schedule) {
            container.innerHTML = '<p class="no-tasks">今日暂无安排，休息一下吧！</p>';
            return;
        }

        const tasks = [];
        if (schedule.econ) {
            tasks.push({
                id: `econ-${today}`,
                title: schedule.econ,
                subject: '经济学',
                duration: '1.5小时',
                completed: userData.completedTasks.includes(`econ-${today}`)
            });
        }
        if (schedule.eng) {
            tasks.push({
                id: `eng-${today}`,
                title: schedule.eng,
                subject: '英语',
                duration: '1小时',
                completed: userData.completedTasks.includes(`eng-${today}`)
            });
        }

        container.innerHTML = tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" onclick="app.toggleTask('${task.id}')">
                <div class="task-checkbox">${task.completed ? '✓' : ''}</div>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-meta">${task.subject}</div>
                </div>
                <span class="task-duration">${task.duration}</span>
            </div>
        `).join('');
    },

    // 切换任务完成状态
    toggleTask(taskId) {
        const index = userData.completedTasks.indexOf(taskId);
        if (index > -1) {
            userData.completedTasks.splice(index, 1);
        } else {
            userData.completedTasks.push(taskId);
            this.showToast('任务完成！' + this.getRandomEncouragement());
        }
        saveUserData();
        this.renderTodayTasks();
        this.updateTodayInfo();
    },

    // 渲染知识点网格
    renderKnowledgeGrid(module = 'all', search = '', type = 'all', mastery = 'all') {
        const container = document.getElementById('econlaw-grid');
        let knowledge = studyData.knowledge;

        if (module !== 'all') {
            knowledge = knowledge.filter(k => k.module === module);
        }
        
        if (type !== 'all') {
            knowledge = knowledge.filter(k => k.type === type);
        }
        
        // 掌握程度筛选
        if (mastery !== 'all') {
            knowledge = knowledge.filter(k => {
                const strength = userData.memoryStrength[k.id] || 0;
                if (mastery === 'fuzzy') return strength < 30;
                if (mastery === 'normal') return strength >= 30 && strength < 70;
                if (mastery === 'mastered') return strength >= 70;
                return true;
            });
        }

        if (search) {
            knowledge = knowledge.filter(k => 
                k.title.includes(search) || 
                (Array.isArray(k.content) ? k.content.join('').includes(search) : k.content.includes(search))
            );
        }
        
        // 更新统计
        const countEl = document.getElementById('knowledge-count');
        if (countEl) {
            countEl.textContent = `共 ${knowledge.length} 个`;
        }

        container.innerHTML = knowledge.map(item => {
            const moduleInfo = studyData.modules[item.module];
            const strength = userData.memoryStrength[item.id] || 0;
            const nextReview = userData.nextReview[item.id];
            
            return `
                <div class="knowledge-card" onclick="app.showKnowledgeDetail('${item.id}')">
                    <div class="knowledge-header">
                        <span class="knowledge-type ${item.type}">${this.getTypeName(item.type)}</span>
                        <span class="knowledge-module">${moduleInfo.name}</span>
                    </div>
                    <h4 class="knowledge-title">${item.title}</h4>
                    <p class="knowledge-preview">
                        ${Array.isArray(item.content) ? item.content[0] : item.content.substring(0, 60) + '...'}
                    </p>
                    <div class="knowledge-footer">
                        <div class="memory-strength">
                            ${[1,2,3,4,5].map(i => `<span class="strength-dot ${i <= strength/20 ? 'active' : ''}"></span>`).join('')}
                        </div>
                        <span class="next-review">${nextReview ? this.formatDate(nextReview) : '未学习'}</span>
                    </div>
                </div>
            `;
        }).join('');
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
    },

    // 显示知识点详情
    showKnowledgeDetail(id) {
        const item = studyData.knowledge.find(k => k.id === id);
        if (!item) return;

        const moduleInfo = studyData.modules[item.module];
        const content = Array.isArray(item.content) 
            ? `<ul>${item.content.map(c => `<li>${c}</li>`).join('')}</ul>`
            : `<p>${item.content}</p>`;

        document.getElementById('modal-body').innerHTML = `
            <div class="knowledge-detail-compact">
                <div class="detail-header">
                    <span class="detail-type" style="background: ${moduleInfo.color}">${this.getTypeName(item.type)}</span>
                    <h3 class="detail-title">${item.title}</h3>
                    <p class="detail-meta">${moduleInfo.name} ${item.examYears ? `| 真题：${item.examYears.join('、')}年` : ''}</p>
                </div>
                <div class="detail-content">
                    <h4>📝 答案</h4>
                    ${content}
                </div>
                ${item.tip ? `
                    <div class="detail-tip">
                        <h4>💡 记忆技巧</h4>
                        <p>${item.tip}</p>
                    </div>
                ` : ''}
                <div class="detail-record">
                    <h4>🎤 伴读录音</h4>
                    <div class="record-controls">
                        <button class="record-btn" id="record-btn-${id}" onclick="app.toggleRecord('${id}')">
                            <span id="record-icon-${id}">🔴</span> 开始录音
                        </button>
                        <button class="record-btn play-btn" id="play-btn-${id}" onclick="app.playRecord('${id}')" disabled>
                            <span>▶️</span> 播放录音
                        </button>
                    </div>
                    <div class="record-status" id="record-status-${id}">点击录音，用声音加深记忆</div>
                </div>
                <div class="detail-feedback">
                    <h4>🎯 掌握程度</h4>
                    <div class="feedback-row">
                        <button class="feedback-btn-compact fuzzy" onclick="app.studyKnowledge('${id}', 'fuzzy'); app.closeModal()">
                            <span>😵</span>
                            <small>没记住</small>
                        </button>
                        <button class="feedback-btn-compact normal" onclick="app.studyKnowledge('${id}', 'normal'); app.closeModal()">
                            <span>😐</span>
                            <small>一般</small>
                        </button>
                        <button class="feedback-btn-compact mastered" onclick="app.studyKnowledge('${id}', 'mastered'); app.closeModal()">
                            <span>😎</span>
                            <small>已掌握</small>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('knowledge-modal').style.display = 'flex';
    },

    // 关闭弹窗
    closeModal() {
        // 停止录音（如果在录音中）
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
        }
        document.getElementById('knowledge-modal').style.display = 'none';
    },

    // 录音相关
    mediaRecorder: null,
    audioChunks: [],
    audioBlob: null,
    audioUrl: null,
    isRecording: false,
    
    // 开始/停止录音
    async toggleRecord(id) {
        const recordBtn = document.getElementById(`record-btn-${id}`);
        const playBtn = document.getElementById(`play-btn-${id}`);
        const statusEl = document.getElementById(`record-status-${id}`);
        const iconEl = document.getElementById(`record-icon-${id}`);
        
        if (!this.isRecording) {
            // 开始录音
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.mediaRecorder = new MediaRecorder(stream);
                this.audioChunks = [];
                
                this.mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        this.audioChunks.push(e.data);
                    }
                };
                
                this.mediaRecorder.onstop = () => {
                    this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                    this.audioUrl = URL.createObjectURL(this.audioBlob);
                    playBtn.disabled = false;
                    statusEl.textContent = '录音完成！可以播放或重新录制';
                    
                    // 保存到本地存储
                    this.saveAudioToStorage(id, this.audioBlob);
                };
                
                this.mediaRecorder.start();
                this.isRecording = true;
                iconEl.textContent = '⏹️';
                recordBtn.innerHTML = '<span>⏹️</span> 停止录音';
                statusEl.textContent = '正在录音...';
                statusEl.style.color = '#ef4444';
            } catch (err) {
                console.error('录音失败:', err);
                statusEl.textContent = '录音失败，请检查麦克风权限';
                statusEl.style.color = '#ef4444';
            }
        } else {
            // 停止录音
            this.mediaRecorder.stop();
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
            this.isRecording = false;
            iconEl.textContent = '🔴';
            recordBtn.innerHTML = '<span>🔴</span> 重新录音';
            statusEl.style.color = '';
        }
    },
    
    // 播放录音
    playRecord(id) {
        if (!this.audioUrl) {
            // 尝试从本地存储加载
            const savedAudio = localStorage.getItem(`audio_${id}`);
            if (savedAudio) {
                this.audioUrl = savedAudio;
            } else {
                const statusEl = document.getElementById(`record-status-${id}`);
                statusEl.textContent = '暂无录音';
                return;
            }
        }
        
        const audio = new Audio(this.audioUrl);
        audio.play();
        
        const statusEl = document.getElementById(`record-status-${id}`);
        statusEl.textContent = '正在播放...';
        audio.onended = () => {
            statusEl.textContent = '播放完成';
        };
    },
    
    // 保存音频到本地存储（使用base64）
    saveAudioToStorage(id, blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
            localStorage.setItem(`audio_${id}`, reader.result);
        };
        reader.readAsDataURL(blob);
    },

    // 学习知识点（记录状态）
    studyKnowledge(id, status) {
        const now = new Date();
        let strength = userData.memoryStrength[id] || 0;
        let days = 1;

        // 根据艾宾浩斯曲线计算下次复习时间
        switch(status) {
            case 'fuzzy':
                strength = Math.max(0, strength - 20);
                days = 1;
                break;
            case 'normal':
                strength = Math.min(100, strength + 10);
                days = 3;
                break;
            case 'mastered':
                strength = Math.min(100, strength + 20);
                days = 7;
                break;
        }

        userData.memoryStrength[id] = strength;
        
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + days);
        userData.nextReview[id] = nextReview.toISOString();

        userData.studyRecords[id] = {
            lastStudy: now.toISOString(),
            status: status
        };

        saveUserData();
        this.showToast('学习记录已保存！' + this.getRandomEncouragement());
        this.updateBadges();
    },

    // 生成抽测
    generateQuiz() {
        const module = document.getElementById('quiz-module').value;
        const type = document.getElementById('quiz-type').value;
        const count = parseInt(document.getElementById('quiz-count').value);

        let questions = studyData.knowledge;

        if (module !== 'all') {
            questions = questions.filter(q => q.module === module);
        }
        if (type !== 'all') {
            questions = questions.filter(q => q.type === type);
        }

        // 随机抽取
        questions = questions.sort(() => Math.random() - 0.5).slice(0, count);

        if (questions.length === 0) {
            alert('该条件下没有可用题目，请调整选项');
            return;
        }

        this.currentQuiz = questions;
        this.currentQuestionIndex = 0;
        this.quizResults = new Array(questions.length).fill(null);

        document.getElementById('quiz-setup').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        document.getElementById('quiz-result').style.display = 'none';

        this.renderQuestion();
    },

    // 渲染题目
    renderQuestion() {
        const question = this.currentQuiz[this.currentQuestionIndex];
        const total = this.currentQuiz.length;

        // 更新进度
        const progress = ((this.currentQuestionIndex + 1) / total) * 100;
        document.getElementById('quiz-progress-fill').style.width = `${progress}%`;
        document.getElementById('quiz-progress-text').textContent = `${this.currentQuestionIndex + 1}/${total}`;

        // 更新题目
        document.getElementById('question-type').textContent = this.getTypeName(question.type);
        document.getElementById('question-type').style.background = studyData.modules[question.module].color;
        document.getElementById('question-text').textContent = question.type === 'term' 
            ? `什么是"${question.title}"？`
            : question.title;

        // 重置答案显示
        document.getElementById('quiz-answer').style.display = 'none';
        document.getElementById('quiz-feedback').style.display = 'none';
        document.querySelector('.show-answer-btn').style.display = 'inline-block';

        // 更新导航按钮
        document.getElementById('prev-btn').disabled = this.currentQuestionIndex === 0;
        document.getElementById('next-btn').textContent = 
            this.currentQuestionIndex === total - 1 ? '完成' : '下一题';
    },

    // 显示答案
    showAnswer() {
        const question = this.currentQuiz[this.currentQuestionIndex];
        const content = Array.isArray(question.content)
            ? question.content.map(c => `<p>${c}</p>`).join('')
            : `<p>${question.content}</p>`;

        document.getElementById('answer-content').innerHTML = content;
        document.getElementById('memory-tip').textContent = question.tip || '';
        document.getElementById('quiz-answer').style.display = 'block';
        document.getElementById('quiz-feedback').style.display = 'block';
        document.querySelector('.show-answer-btn').style.display = 'none';
    },

    // 记录反馈
    recordFeedback(status) {
        this.quizResults[this.currentQuestionIndex] = status;
        
        // 保存学习状态
        const question = this.currentQuiz[this.currentQuestionIndex];
        this.studyKnowledge(question.id, status);

        // 视觉反馈
        document.querySelectorAll('.feedback-btn').forEach(btn => btn.classList.remove('selected'));
        document.querySelector(`.feedback-btn.${status}`).classList.add('selected');

        // 自动下一题
        setTimeout(() => this.nextQuestion(), 500);
    },

    // 上一题
    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
        }
    },

    // 下一题
    nextQuestion() {
        if (this.currentQuestionIndex < this.currentQuiz.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
        } else {
            this.showResult();
        }
    },

    // 显示结果
    showResult() {
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('quiz-result').style.display = 'block';

        const mastered = this.quizResults.filter(r => r === 'mastered').length;
        const normal = this.quizResults.filter(r => r === 'normal').length;
        const fuzzy = this.quizResults.filter(r => r === 'fuzzy').length;
        const total = this.currentQuiz.length;

        document.getElementById('result-total').textContent = total;
        document.getElementById('result-mastered').textContent = mastered;
        document.getElementById('result-normal').textContent = normal;
        document.getElementById('result-fuzzy').textContent = fuzzy;

        // 结果评语
        const rate = (mastered / total) * 100;
        let message = '';
        if (rate >= 80) {
            message = '🎉 太棒了！掌握率超过80%，继续保持！';
        } else if (rate >= 60) {
            message = '👍 不错！还有提升空间，再接再厉！';
        } else {
            message = '💪 继续加油！重点复习模糊的知识点！';
        }
        document.getElementById('result-message').textContent = message;
    },

    // 重新开始抽测
    restartQuiz() {
        document.getElementById('quiz-result').style.display = 'none';
        document.getElementById('quiz-setup').style.display = 'block';
    },

    // 去复习
    goToReview() {
        this.switchPage('review');
    },

    // 渲染复习计划
    renderReviewSchedule() {
        // 更新优先级卡片
        const now = new Date();
        let urgent = 0, normal = 0, mastered = 0;

        for (const [id, strength] of Object.entries(userData.memoryStrength)) {
            if (strength < 30) urgent++;
            else if (strength < 70) normal++;
            else mastered++;
        }

        document.getElementById('urgent-count').textContent = urgent;
        document.getElementById('normal-count').textContent = normal;
        document.getElementById('mastered-count').textContent = mastered;

        // 渲染今日复习列表
        const reviewList = [];
        for (const [id, nextReview] of Object.entries(userData.nextReview)) {
            if (new Date(nextReview) <= new Date()) {
                const item = studyData.knowledge.find(k => k.id === id);
                if (item) {
                    reviewList.push({
                        id,
                        title: item.title,
                        module: studyData.modules[item.module].name,
                        strength: userData.memoryStrength[id] || 0
                    });
                }
            }
        }

        const container = document.getElementById('review-schedule-list');
        if (reviewList.length === 0) {
            container.innerHTML = '<p class="no-tasks">今天没有需要复习的知识点，去学习新的内容吧！</p>';
        } else {
            container.innerHTML = reviewList.map(item => `
                <div class="schedule-item">
                    <div class="schedule-content">
                        <div class="schedule-title">${item.title}</div>
                        <div class="schedule-meta">${item.module} | 记忆强度: ${item.strength}%</div>
                    </div>
                    <button class="priority-btn" onclick="app.showKnowledgeDetail('${item.id}')">复习</button>
                </div>
            `).join('');
        }
    },

    // 按优先级开始复习
    startPriorityReview(priority) {
        let filtered = studyData.knowledge.filter(k => userData.memoryStrength[k.id]);
        
        if (priority === 'urgent') {
            filtered = filtered.filter(k => (userData.memoryStrength[k.id] || 0) < 30);
        } else if (priority === 'normal') {
            filtered = filtered.filter(k => {
                const s = userData.memoryStrength[k.id] || 0;
                return s >= 30 && s < 70;
            });
        } else {
            filtered = filtered.filter(k => (userData.memoryStrength[k.id] || 0) >= 70);
        }

        if (filtered.length === 0) {
            this.showToast('该优先级下没有知识点');
            return;
        }

        this.currentQuiz = filtered.sort(() => Math.random() - 0.5).slice(0, 10);
        this.currentQuestionIndex = 0;
        this.quizResults = new Array(this.currentQuiz.length).fill(null);

        this.switchPage('quiz');
        document.getElementById('quiz-setup').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        document.getElementById('quiz-result').style.display = 'none';
        this.renderQuestion();
    },

    // 渲染统计数据
    renderStats() {
        const total = studyData.knowledge.length;
        const learned = Object.keys(userData.memoryStrength).length;
        const mastered = Object.values(userData.memoryStrength).filter(s => s >= 70).length;
        const rate = learned > 0 ? Math.round((mastered / learned) * 100) : 0;

        document.getElementById('total-knowledge').textContent = total;
        document.getElementById('learned-knowledge').textContent = learned;
        document.getElementById('mastered-rate').textContent = `${rate}%`;
        document.getElementById('total-study-time').textContent = (userData.todayStudyTime / 60).toFixed(1);

        // 模块掌握度
        const moduleProgress = {};
        for (const item of studyData.knowledge) {
            if (!moduleProgress[item.module]) {
                moduleProgress[item.module] = { total: 0, mastered: 0 };
            }
            moduleProgress[item.module].total++;
            if ((userData.memoryStrength[item.id] || 0) >= 70) {
                moduleProgress[item.module].mastered++;
            }
        }

        const progressContainer = document.getElementById('module-progress');
        progressContainer.innerHTML = Object.entries(moduleProgress).map(([key, data]) => {
            const percent = Math.round((data.mastered / data.total) * 100);
            return `
                <div class="module-item">
                    <span class="module-name">${studyData.modules[key].name}</span>
                    <div class="module-bar">
                        <div class="module-fill" style="width: ${percent}%; background: ${studyData.modules[key].color}"></div>
                    </div>
                    <span class="module-percent">${percent}%</span>
                </div>
            `;
        }).join('');

        // 近7天趋势（模拟数据）
        const trendContainer = document.getElementById('trend-chart');
        const days = ['一', '二', '三', '四', '五', '六', '日'];
        trendContainer.innerHTML = days.map((day, i) => {
            const height = 30 + Math.random() * 70;
            return `
                <div class="trend-bar">
                    <span class="trend-value">${Math.round(height)}</span>
                    <div class="trend-column" style="height: ${height}px"></div>
                    <span class="trend-label">周${day}</span>
                </div>
            `;
        }).join('');

        // 成就
        const achievements = [
            { id: 'first', icon: '🌟', name: '初次学习', desc: '完成第一个知识点', unlocked: learned >= 1 },
            { id: 'ten', icon: '📚', name: '初学乍练', desc: '学习10个知识点', unlocked: learned >= 10 },
            { id: 'master', icon: '🏆', name: '初窥门径', desc: '掌握10个知识点', unlocked: mastered >= 10 },
            { id: 'quiz', icon: '🎲', name: '小试牛刀', desc: '完成一次抽测', unlocked: Object.keys(userData.studyRecords).length > 0 },
            { id: 'streak', icon: '🔥', name: '持之以恒', desc: '连续学习3天', unlocked: userData.streakDays >= 3 },
            { id: 'review', icon: '🔄', name: '温故知新', desc: '完成10次复习', unlocked: Object.keys(userData.nextReview).length >= 10 }
        ];

        document.getElementById('achievements-grid').innerHTML = achievements.map(a => `
            <div class="achievement-item ${a.unlocked ? 'unlocked' : ''}">
                <div class="achievement-icon">${a.icon}</div>
                <div class="achievement-name">${a.name}</div>
                <div class="achievement-desc">${a.desc}</div>
            </div>
        `).join('');
    },

    // 渲染日历
    renderCalendar() {
        const today = new Date();
        const year = this.calendarDate.getFullYear();
        const month = this.calendarDate.getMonth();

        document.getElementById('calendar-month').textContent = `${year}年${month + 1}月`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        let html = weekdays.map(d => `<div class="cal-header">${d}</div>`).join('');

        // 上个月的日期
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            html += `<div class="cal-day other-month"><span class="cal-day-number">${day}</span></div>`;
        }

        // 当月日期
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const schedule = studyData.schedule[dateStr];
            const isToday = (day === today.getDate() && month === today.getMonth() && year === today.getFullYear());

            let dots = '';
            if (schedule) {
                if (schedule.econ) dots += '<span class="cal-dot econ"></span>';
                if (schedule.eng) dots += '<span class="cal-dot eng"></span>';
                if (schedule.type === 'review') dots += '<span class="cal-dot rev"></span>';
            }

            html += `
                <div class="cal-day ${isToday ? 'today' : ''}" onclick="app.showScheduleDetail('${dateStr}')">
                    <span class="cal-day-number">${day}</span>
                    <div class="cal-day-dots">${dots}</div>
                </div>
            `;
        }

        document.getElementById('calendar-grid').innerHTML = html;
    },

    // 显示日程详情
    showScheduleDetail(dateStr) {
        const schedule = studyData.schedule[dateStr];
        if (!schedule) {
            document.getElementById('schedule-detail-content').innerHTML = '<p>该日暂无安排</p>';
            return;
        }

        const date = new Date(dateStr);
        document.getElementById('schedule-detail').querySelector('h3').textContent = 
            `${date.getMonth() + 1}月${date.getDate()}日学习安排`;

        document.getElementById('schedule-detail-content').innerHTML = `
            <div class="detail-section">
                <h4>📚 经济学 (${schedule.econ})</h4>
                <p>建议时长：1.5小时</p>
            </div>
            <div class="detail-section">
                <h4>🔤 英语 (${schedule.eng})</h4>
                <p>建议时长：1小时</p>
            </div>
        `;
    },

    // 更新徽章
    updateBadges() {
        const reviewCount = this.getTodayReviewCount();
        document.getElementById('review-badge').textContent = reviewCount;
        document.getElementById('review-badge').style.display = reviewCount > 0 ? 'block' : 'none';
    },

    // 快速开始
    startStudy() {
        // 切换到学习页面并打开第一个知识点
        this.switchPage('econlaw');
        // 如果有知识点，自动打开第一个
        if (studyData.knowledge && studyData.knowledge.length > 0) {
            setTimeout(() => {
                this.showKnowledgeDetail(studyData.knowledge[0].id);
            }, 100);
        }
    },

    startQuiz() {
        this.switchPage('quiz');
    },

    startReview() {
        this.switchPage('review');
    },

    // 获取随机激励语
    getRandomEncouragement() {
        return studyData.encouragements[Math.floor(Math.random() * studyData.encouragements.length)];
    },

    // 显示提示
    showToast(message) {
        const toast = document.getElementById('toast');
        document.getElementById('toast-message').textContent = message;
        toast.style.display = 'flex';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    },

    // 格式化日期
    formatDate(dateStr) {
        const date = new Date(dateStr);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    },

    // 更新考试倒计时
    updateExamCountdown() {
        // 从 localStorage 获取用户设置的考试日期，默认使用 2026-05-01
        let examDateStr = localStorage.getItem('studyx_exam_date');
        if (!examDateStr) {
            // 默认考试日期：5月1日（当年）
            const currentYear = new Date().getFullYear();
            examDateStr = `${currentYear}-05-01`;
            localStorage.setItem('studyx_exam_date', examDateStr);
        }
        
        const examDate = new Date(examDateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        examDate.setHours(0, 0, 0, 0);
        
        const daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
        const countdownEl = document.getElementById('exam-countdown');
        const countdownMobileEl = document.getElementById('exam-countdown-mobile');
        
        if (countdownEl) countdownEl.textContent = daysLeft;
        if (countdownMobileEl) countdownMobileEl.textContent = daysLeft;
        
        // 保存当前考试日期供后续使用
        this.currentExamDate = examDateStr;
    },

    // 显示考试日期设置弹窗
    showExamDateModal() {
        // 如果弹窗不存在则创建
        let modal = document.getElementById('exam-date-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'exam-date-modal';
            modal.className = 'modal';
            modal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; justify-content: center; align-items: center;';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 360px;">
                    <div class="modal-header">
                        <h3>📅 设置考试日期</h3>
                        <button class="close-btn" onclick="app.closeExamDateModal()">×</button>
                    </div>
                    <div class="modal-body" style="padding: 20px;">
                        <p style="margin-bottom: 16px; color: var(--text-secondary); font-size: 14px;">
                            设置考试目标日期，系统会自动计算剩余天数。
                        </p>
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; color: var(--text-secondary);">考试日期</label>
                            <input type="date" id="exam-date-input" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px;">
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <button onclick="app.resetExamDate()" style="flex: 1; padding: 10px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-card); color: var(--text-secondary); cursor: pointer;">恢复默认</button>
                            <button onclick="app.saveExamDate()" style="flex: 1; padding: 10px; border-radius: 8px; border: none; background: var(--primary); color: white; cursor: pointer;">保存设置</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // 点击外部关闭
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeExamDateModal();
                }
            });
        }
        
        // 设置当前值
        const dateInput = document.getElementById('exam-date-input');
        dateInput.value = this.currentExamDate || localStorage.getItem('studyx_exam_date') || '';
        dateInput.min = new Date().toISOString().split('T')[0];
        
        modal.style.display = 'flex';
    },

    // 关闭考试日期设置弹窗
    closeExamDateModal() {
        const modal = document.getElementById('exam-date-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    // 保存考试日期
    saveExamDate() {
        const dateInput = document.getElementById('exam-date-input');
        const selectedDate = dateInput.value;
        
        if (!selectedDate) {
            alert('请选择考试日期');
            return;
        }
        
        const examDate = new Date(selectedDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (examDate < today) {
            alert('考试日期不能早于今天');
            return;
        }
        
        localStorage.setItem('studyx_exam_date', selectedDate);
        this.currentExamDate = selectedDate;
        this.updateExamCountdown();
        this.closeExamDateModal();
        this.showToast('✅ 考试日期已设置！');
    },

    // 恢复默认考试日期
    resetExamDate() {
        const currentYear = new Date().getFullYear();
        const defaultDate = `${currentYear}-05-01`;
        document.getElementById('exam-date-input').value = defaultDate;
    },

    // 学习计时器
    startStudyTimer() {
        setInterval(() => {
            userData.todayStudyTime++;
            document.getElementById('today-time').textContent = userData.todayStudyTime;
            
            // 每5分钟保存一次
            if (userData.todayStudyTime % 5 === 0) {
                saveUserData();
            }
        }, 60000); // 每分钟
    },

    // 日历导航
    prevMonth() {
        this.calendarDate.setMonth(this.calendarDate.getMonth() - 1);
        this.renderCalendar();
    },

    nextMonth() {
        this.calendarDate.setMonth(this.calendarDate.getMonth() + 1);
        this.renderCalendar();
    },

    // ===== 视频课程功能 =====
    renderVideosList() {
        const filter = this.currentVideoFilter || 'all';
        const tab = this.currentVideoTab || 'all';
        const keyword = this.videoSearchKeyword || '';
        
        let videos = studyData.videos;
        const container = document.getElementById('videos-list');
        
        // 按分类筛选（经济学/英语）
        if (tab !== 'all') {
            videos = videos.filter(v => v.type === tab);
        }

        // 按关键词搜索（支持简称、标题、章节）
        if (keyword) {
            videos = videos.filter(v => 
                (v.shortName && v.shortName.toLowerCase().includes(keyword)) ||
                v.title.toLowerCase().includes(keyword) ||
                v.chapter.toLowerCase().includes(keyword) ||
                (v.module && studyData.modules[v.module] && 
                 studyData.modules[v.module].name.toLowerCase().includes(keyword))
            );
        }

        // 统计数据
        let watched = 0, skipped = 0, reviewed = 0, missed = 0;
        videos.forEach(v => {
            const progress = userData.videoProgress[v.id];
            if (progress) {
                if (progress.status === 'watched') watched++;
                else if (progress.status === 'skipped') skipped++;
                else if (progress.status === 'reviewed') reviewed++;
            } else if (new Date(v.date) < new Date()) {
                missed++;
            }
        });

        document.getElementById('video-total').textContent = videos.length;
        document.getElementById('video-watched').textContent = watched;
        document.getElementById('video-skipped').textContent = skipped;
        document.getElementById('video-review').textContent = reviewed;
        document.getElementById('video-progress').textContent = 
            videos.length > 0 ? Math.round((watched + reviewed) / videos.length * 100) + '%' : '0%';
        document.getElementById('video-badge').textContent = missed;

        // 过滤视频状态
        let filtered = videos;
        if (filter === 'watched') {
            filtered = videos.filter(v => userData.videoProgress[v.id]?.status === 'watched');
        } else if (filter === 'skipped') {
            filtered = videos.filter(v => userData.videoProgress[v.id]?.status === 'skipped');
        } else if (filter === 'reviewed') {
            filtered = videos.filter(v => userData.videoProgress[v.id]?.status === 'reviewed');
        } else if (filter === 'missed') {
            filtered = videos.filter(v => {
                const progress = userData.videoProgress[v.id];
                return !progress && new Date(v.date) < new Date();
            });
        } else if (filter === 'planned') {
            filtered = videos.filter(v => !userData.videoProgress[v.id]);
        }

        container.innerHTML = filtered.map(video => {
            const progress = userData.videoProgress[video.id];
            const status = progress?.status || 'planned';
            const statusClass = status;
            const statusText = {
                planned: '计划中',
                watched: '已观看',
                skipped: '已跳过',
                reviewed: '已复习'
            }[status];

            return `
                <div class="video-item ${statusClass}" onclick="app.showVideoDetail('${video.id}')">
                    <div class="video-checkbox ${status !== 'planned' ? 'checked' : ''}">
                        ${status !== 'planned' ? '✓' : ''}
                    </div>
                    <div class="video-info">
                        <div class="video-title">
                            <span class="video-short-name">${video.shortName}</span>
                            ${video.title}
                        </div>
                        <div class="video-meta">
                            <span>${video.chapter}</span>
                            <span>⏱️ ${video.duration}分钟</span>
                            <span>📅 ${video.date}</span>
                            ${progress?.watchCount > 1 ? `<span>🔁 已看${progress.watchCount}次</span>` : ''}
                        </div>
                    </div>
                    <span class="video-status ${status}">${statusText}</span>
                </div>
            `;
        }).join('');
    },

    showVideoDetail(videoId) {
        const video = studyData.videos.find(v => v.id === videoId);
        if (!video) return;

        const progress = userData.videoProgress[videoId] || {};
        const status = progress.status || 'planned';

        document.getElementById('video-modal-body').innerHTML = `
            <div class="video-detail">
                <h3>${video.title}</h3>
                <div class="video-detail-meta">
                    <span>${video.chapter}</span>
                    <span>⏱️ ${video.duration}分钟</span>
                    <span>📅 计划日期: ${video.date}</span>
                </div>
                
                <div class="modal-section">
                    <h4>📊 观看状态</h4>
                    <div class="video-status-selector">
                        <div class="status-option ${status === 'watched' ? 'selected' : ''}" onclick="app.setVideoStatus('${videoId}', 'watched')">
                            <span class="status-icon">✅</span>
                            <span class="status-label">已观看</span>
                        </div>
                        <div class="status-option ${status === 'skipped' ? 'selected' : ''}" onclick="app.setVideoStatus('${videoId}', 'skipped')">
                            <span class="status-icon">⏭️</span>
                            <span class="status-label">跳过</span>
                        </div>
                        <div class="status-option ${status === 'reviewed' ? 'selected' : ''}" onclick="app.setVideoStatus('${videoId}', 'reviewed')">
                            <span class="status-icon">🔁</span>
                            <span class="status-label">复习</span>
                        </div>
                    </div>
                </div>

                <div class="modal-section">
                    <h4>📝 学习笔记</h4>
                    <textarea class="video-note-input" id="video-note" rows="3" placeholder="记录这节课的要点、疑惑...">${progress.note || ''}</textarea>
                </div>

                <button class="save-daily-btn" onclick="app.saveVideoProgress('${videoId}')">💾 保存进度</button>
            </div>
        `;

        document.getElementById('video-modal').style.display = 'flex';
    },

    setVideoStatus(videoId, status) {
        document.querySelectorAll('.status-option').forEach(el => el.classList.remove('selected'));
        event.currentTarget.classList.add('selected');
        this._pendingVideoStatus = status;
    },

    saveVideoProgress(videoId) {
        const note = document.getElementById('video-note').value;
        const status = this._pendingVideoStatus || userData.videoProgress[videoId]?.status || 'watched';
        
        if (!userData.videoProgress[videoId]) {
            userData.videoProgress[videoId] = {
                status: status,
                watchDate: new Date().toISOString().split('T')[0],
                watchCount: 1,
                note: note
            };
        } else {
            userData.videoProgress[videoId].status = status;
            userData.videoProgress[videoId].note = note;
            if (status === 'watched' || status === 'reviewed') {
                userData.videoProgress[videoId].watchCount = 
                    (userData.videoProgress[videoId].watchCount || 0) + 1;
            }
        }

        saveUserData();
        this.closeVideoModal();
        this.renderVideosList();
        this.showToast('视频进度已保存！' + this.getRandomEncouragement());
    },

    closeVideoModal() {
        document.getElementById('video-modal').style.display = 'none';
        this._pendingVideoStatus = null;
    },

    searchVideos() {
        const keyword = document.getElementById('video-search-input').value.toLowerCase();
        this.videoSearchKeyword = keyword;
        this.renderVideosList();
    },

    // ===== 日报功能 =====
    generateTodayLearning(dateStr) {
        const today = dateStr || new Date().toISOString().split('T')[0];
        const container = document.getElementById('daily-auto-content');
        
        // 获取今日已完成的视频
        const todayVideos = studyData.videos.filter(v => {
            const progress = userData.videoProgress[v.id];
            return progress && progress.watchDate === today && 
                   (progress.status === 'watched' || progress.status === 'reviewed');
        });
        
        // 获取今日学习的知识点
        const todayKnowledge = Object.entries(userData.studyRecords)
            .filter(([id, record]) => record.lastStudy && record.lastStudy.startsWith(today))
            .map(([id]) => studyData.knowledge.find(k => k.id === id))
            .filter(k => k);
        
        // 获取今日学习的单词
        const todayWords = Object.entries(userVocabularyProgress)
            .filter(([word, record]) => record.lastReview && record.lastReview.startsWith(today))
            .map(([word]) => word);
        
        // 统计科目
        const hasEcon = todayVideos.some(v => v.type === 'econ');
        const hasEng = todayVideos.some(v => v.type === 'eng');
        const hasReview = todayKnowledge.length > 0;
        const hasWords = todayWords.length > 0;
        
        if (todayVideos.length === 0 && todayKnowledge.length === 0 && todayWords.length === 0) {
            container.innerHTML = `
                <div class="empty-text">
                    <p>📝 今天还没有学习记录</p>
                    <p style="font-size: 12px; margin-top: 8px;">先去视频课程或单词学习页面学习吧！</p>
                </div>
            `;
            this.todaySubjects = [];
            this.todayLearningData = { videos: [], knowledge: [], words: [] };
            return;
        }
        
        // 生成详细内容
        let html = '<div class="today-video-list">';
        
        // 视频学习详情
        if (todayVideos.length > 0) {
            html += '<h4 style="margin: 12px 0 8px; font-size: 13px; color: var(--text-secondary);">🎬 视频学习</h4>';
            todayVideos.forEach(v => {
                html += `
                    <div class="video-detail-item">
                        <span class="video-name">${v.shortName} - ${v.title}</span>
                        <span class="video-type ${v.type}">${v.type === 'econ' ? '经济' : '英语'}</span>
                    </div>
                `;
            });
        }
        
        // 知识点复习详情
        if (todayKnowledge.length > 0) {
            html += '<h4 style="margin: 16px 0 8px; font-size: 13px; color: var(--text-secondary);">🧠 知识点复习</h4>';
            html += '<div class="knowledge-detail-list">';
            todayKnowledge.slice(0, 5).forEach(k => {
                html += `
                    <div class="knowledge-detail-item">
                        ${k.title}
                    </div>
                `;
            });
            if (todayKnowledge.length > 5) {
                html += `<div style="font-size: 12px; color: var(--text-muted); padding: 8px;">...还有${todayKnowledge.length - 5}个知识点</div>`;
            }
            html += '</div>';
        }
        
        // 单词学习
        if (todayWords.length > 0) {
            html += '<h4 style="margin: 16px 0 8px; font-size: 13px; color: var(--text-secondary);">🔤 单词学习</h4>';
            html += `<div style="font-size: 13px; padding: 8px 12px; background: var(--bg-secondary); border-radius: 6px;">
                学习了 ${todayWords.length} 个单词：${todayWords.slice(0, 8).join('、')}${todayWords.length > 8 ? '...' : ''}
            </div>`;
        }
        
        html += '</div>';
        
        // 统计行
        html += `
            <div class="today-stats-row">
                <div class="today-stat">
                    <span class="stat-icon">🎬</span>
                    <span>视频${todayVideos.length}节</span>
                </div>
                <div class="today-stat">
                    <span class="stat-icon">📖</span>
                    <span>知识点${todayKnowledge.length}个</span>
                </div>
                <div class="today-stat">
                    <span class="stat-icon">🔤</span>
                    <span>单词${todayWords.length}个</span>
                </div>
                <div class="today-stat">
                    <span class="stat-icon">⏱️</span>
                    <span>约${Math.round(todayVideos.reduce((sum, v) => sum + v.duration, 0) / 60 * 10) / 10}小时</span>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        // 保存科目信息和详细数据供后续使用
        this.todaySubjects = [];
        if (hasEcon) this.todaySubjects.push('economics');
        if (hasEng) this.todaySubjects.push('english');
        if (hasReview) this.todaySubjects.push('review');
        if (hasWords) this.todaySubjects.push('words');
        
        this.todayLearningData = {
            videos: todayVideos,
            knowledge: todayKnowledge,
            words: todayWords
        };
    },

    saveDailyReport() {
        const dateInput = document.getElementById('daily-date-input');
        const reportDate = dateInput.value || new Date().toISOString().split('T')[0];
        
        const subjects = this.todaySubjects || [];
        const feeling = document.getElementById('daily-feeling').value;
        const plan = document.getElementById('daily-plan').value;
        
        // 获取学习数据
        const data = this.todayLearningData || { videos: [], knowledge: [], words: [] };
        
        // 自动生成详细的学习内容描述
        let content = '';
        
        if (data.videos.length > 0) {
            const econVideos = data.videos.filter(v => v.type === 'econ');
            const engVideos = data.videos.filter(v => v.type === 'eng');
            
            if (econVideos.length > 0) {
                content += `完成经济学视频：${econVideos.map(v => v.shortName).join('、')}；`;
            }
            if (engVideos.length > 0) {
                content += `完成英语视频：${engVideos.map(v => v.shortName).join('、')}；`;
            }
        }
        
        if (data.knowledge.length > 0) {
            content += `复习知识点：${data.knowledge.map(k => k.title).slice(0, 3).join('、')}`;
            if (data.knowledge.length > 3) content += `等${data.knowledge.length}个；`;
            else content += '；';
        }
        
        if (data.words.length > 0) {
            content += `学习单词：${data.words.slice(0, 5).join('、')}${data.words.length > 5 ? '等' + data.words.length + '个' : ''}；`;
        }
        
        if (!content) {
            content = '今日暂无学习记录';
        }

        // AI总结 - 根据学习内容和感受智能生成
        const summary = this.generateDailySummary({ subjects, content, feeling, plan, data });

        userData.dailyReports[reportDate] = {
            subjects,
            content,
            feeling,
            plan,
            summary,
            createdAt: new Date().toLocaleString('zh-CN')
        };

        saveUserData();
        this.renderDailyList();
        
        // 清空手动填写区域
        document.getElementById('daily-feeling').value = '';
        document.getElementById('daily-plan').value = '';

        this.showToast('日报保存成功！');
    },

    generateDailySummary(report) {
        const summaries = [];
        const data = report.data || { videos: [], knowledge: [], words: [] };
        const totalLearned = data.videos.length + data.knowledge.length + data.words.length;
        
        // 根据实际学习内容生成总结
        if (totalLearned === 0) {
            summaries.push('今日暂无学习记录');
        } else {
            const parts = [];
            if (data.videos.length > 0) parts.push(`完成${data.videos.length}节视频课程`);
            if (data.knowledge.length > 0) parts.push(`复习${data.knowledge.length}个知识点`);
            if (data.words.length > 0) parts.push(`学习${data.words.length}个单词`);
            summaries.push(`今日${parts.join('，')}，学习投入${totalLearned > 5 ? '较高' : '适中'}`);
        }

        // 根据学习感受生成状态评价
        if (report.feeling) {
            const feeling = report.feeling.toLowerCase();
            if (feeling.includes('难') || feeling.includes('不懂') || feeling.includes('不会') || feeling.includes('没学好')) {
                summaries.push('部分内容理解有困难，建议利用明天的时间重点复习难点');
            } else if (feeling.includes('累') || feeling.includes('疲劳') || feeling.includes('困')) {
                summaries.push('学习较为疲劳，建议适当休息，保持良好状态');
            } else if (feeling.includes('好') || feeling.includes('顺利') || feeling.includes('轻松')) {
                summaries.push('学习状态良好，知识点掌握较为扎实');
            } else {
                summaries.push('今日学习有新的收获，继续保持');
            }
        } else {
            summaries.push(totalLearned > 0 ? '今日按计划完成学习任务' : '今日暂无学习记录，建议尽快补上');
        }

        // 明日计划建议
        if (report.plan) {
            summaries.push(`明日计划：${report.plan}`);
        } else {
            // 根据今天的学习情况给出建议
            if (data.videos.length === 0) {
                summaries.push('明日建议：优先完成视频课程学习');
            } else if (data.words.length === 0) {
                summaries.push('明日建议：记得安排英语单词学习');
            } else {
                summaries.push('明日建议：继续按计划推进，保持学习节奏');
            }
        }
        
        return summaries.join('；');
    },

    renderDailyList() {
        const container = document.getElementById('daily-items');
        const reports = Object.entries(userData.dailyReports)
            .sort((a, b) => new Date(b[0]) - new Date(a[0]));

        if (reports.length === 0) {
            container.innerHTML = '<p class="no-tasks">还没有写过日报，开始记录第一天吧！</p>';
            return;
        }

        container.innerHTML = reports.map(([date, report]) => {
            const subjectTags = report.subjects.map(s => {
                const names = { economics: '经济学', english: '英语', review: '复习' };
                return `<span class="daily-subject-tag">${names[s]}</span>`;
            }).join('');

            return `
                <div class="daily-item" onclick="app.toggleDailyDetail('${date}')">
                    <div class="daily-item-header">
                        <span class="daily-item-date">${date}</span>
                        <div class="daily-item-subjects">${subjectTags}</div>
                    </div>
                    <div class="daily-item-preview">${report.feeling ? report.feeling.substring(0, 50) + '...' : '今日学习已完成'}</div>
                    <div class="daily-detail" id="daily-detail-${date}" style="display: none;">
                        <div class="daily-detail-content">
                            <h4>📝 学习内容（自动生成）</h4>
                            <div class="daily-detail-content">${report.content}</div>
                            ${report.feeling ? `
                                <div class="daily-summary">
                                    <h4>💭 学习感受</h4>
                                    <div class="daily-summary-content">${report.feeling}</div>
                                </div>
                            ` : ''}
                            ${report.plan ? `
                                <div class="daily-summary">
                                    <h4>📅 明日计划</h4>
                                    <div class="daily-summary-content">${report.plan}</div>
                                </div>
                            ` : ''}
                            <div class="daily-summary">
                                <h4>🤖 AI总结</h4>
                                <div class="daily-summary-content">${report.summary}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    toggleDailyDetail(date) {
        const report = userData.dailyReports[date];
        if (!report) return;

        // 设置日期标题
        document.getElementById('daily-modal-date').textContent = `📅 ${date} 学习日报`;

        // 生成详情内容
        const subjectTags = report.subjects.map(s => {
            const names = { economics: '经济学', english: '英语', review: '复习' };
            const icons = { economics: '📊', english: '🔤', review: '🔄' };
            return `<span class="daily-modal-tag">${icons[s]} ${names[s]}</span>`;
        }).join('');

        document.getElementById('daily-modal-body').innerHTML = `
            <div class="daily-modal-subjects">${subjectTags}</div>
            
            <div class="daily-modal-section">
                <h4>📝 学习内容</h4>
                <div class="daily-modal-text">${report.content || '暂无记录'}</div>
            </div>
            
            ${report.feeling ? `
                <div class="daily-modal-section">
                    <h4>💭 学习感受</h4>
                    <div class="daily-modal-text">${report.feeling}</div>
                </div>
            ` : ''}
            
            ${report.plan ? `
                <div class="daily-modal-section">
                    <h4>📅 明日计划</h4>
                    <div class="daily-modal-text">${report.plan}</div>
                </div>
            ` : ''}
            
            <div class="daily-modal-section">
                <h4>🤖 AI总结</h4>
                <div class="daily-modal-text ai-summary">${report.summary || '暂无总结'}</div>
            </div>
            
            <div class="daily-modal-actions">
                <button class="modal-btn secondary" onclick="app.editDailyReport('${date}')">✏️ 编辑</button>
                <button class="modal-btn danger" onclick="app.deleteDailyReport('${date}')">🗑️ 删除</button>
            </div>
        `;

        // 显示模态窗口
        document.getElementById('daily-detail-modal').style.display = 'flex';
    },

    closeDailyModal() {
        document.getElementById('daily-detail-modal').style.display = 'none';
    },

    editDailyReport(date) {
        this.closeDailyModal();
        // 切换到日报页面并填充数据
        this.switchPage('daily');
        document.getElementById('daily-date-input').value = date;
        document.getElementById('daily-editor-date').textContent = date;
        
        const report = userData.dailyReports[date];
        if (report) {
            document.getElementById('daily-feeling').value = report.feeling || '';
            document.getElementById('daily-plan').value = report.plan || '';
        }
    },

    deleteDailyReport(date) {
        if (confirm(`确定要删除 ${date} 的日报吗？`)) {
            delete userData.dailyReports[date];
            saveUserData();
            this.closeDailyModal();
            this.renderDailyList();
            this.showToast('日报已删除');
        }
    },

    // ===== 周报月报功能 =====
    initReportSelectors() {
        // 生成周选择器
        const weekSelector = document.getElementById('week-selector');
        const weeks = [
            { value: '2026-W07', label: '2月第1周 (2.10-2.16)' },
            { value: '2026-W08', label: '2月第2周 (2.17-2.23)' },
            { value: '2026-W09', label: '2月第3周 (2.24-2.28)' },
            { value: '2026-W10', label: '3月第1周 (3.1-3.9)' },
            { value: '2026-W11', label: '3月第2周 (3.10-3.16)' },
            { value: '2026-W12', label: '3月第3周 (3.17-3.23)' },
            { value: '2026-W13', label: '3月第4周 (3.24-3.31)' }
        ];
        weekSelector.innerHTML = '<option value="">选择周次...</option>' + 
            weeks.map(w => `<option value="${w.value}">${w.label}</option>`).join('');
    },

    switchReportTab(type) {
        document.querySelectorAll('.report-tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
        
        if (type === 'weekly') {
            document.getElementById('weekly-report').style.display = 'block';
            document.getElementById('monthly-report').style.display = 'none';
        } else {
            document.getElementById('weekly-report').style.display = 'none';
            document.getElementById('monthly-report').style.display = 'block';
        }
    },

    generateWeeklyReport() {
        // 获取本周日期范围
        const today = new Date();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay() + 1);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        const weekKey = weekStart.toISOString().split('T')[0];
        
        // 统计本周数据
        let videoCount = 0, knowledgeCount = 0, studyDays = 0;
        const dailyReports = [];

        for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            if (userData.dailyReports[dateStr]) {
                studyDays++;
                dailyReports.push(userData.dailyReports[dateStr]);
            }
        }

        // 统计视频
        videoCount = Object.values(userData.videoProgress).filter(
            p => new Date(p.watchDate) >= weekStart && new Date(p.watchDate) <= weekEnd
        ).length;

        // 统计知识点
        knowledgeCount = Object.values(userData.studyRecords).filter(
            r => new Date(r.lastStudy) >= weekStart && new Date(r.lastStudy) <= weekEnd
        ).length;

        const report = {
            period: `${weekStart.toLocaleDateString('zh-CN')} ~ ${weekEnd.toLocaleDateString('zh-CN')}`,
            videoCount,
            knowledgeCount,
            studyDays,
            totalStudyTime: userData.todayStudyTime * studyDays,
            summary: this.generateWeeklySummary(dailyReports, videoCount, knowledgeCount)
        };

        userData.weeklyReports[weekKey] = report;
        saveUserData();
        this.loadWeeklyReport(weekKey);
    },

    generateWeeklySummary(reports, videoCount, knowledgeCount) {
        const summaries = [];
        
        if (reports.length === 0) {
            return '本周尚未记录学习情况，建议坚持每日学习并记录日报。';
        }

        summaries.push(`本周共学习 ${reports.length} 天，观看视频 ${videoCount} 节，学习知识点 ${knowledgeCount} 个。`);
        
        const hasEcon = reports.some(r => r.subjects.includes('economics'));
        const hasEng = reports.some(r => r.subjects.includes('english'));
        
        if (hasEcon && hasEng) {
            summaries.push('经济学和英语学习兼顾良好。');
        } else if (hasEcon) {
            summaries.push('本周侧重经济学学习，别忘了英语单词。');
        } else if (hasEng) {
            summaries.push('本周侧重英语学习，别忘了经济学视频。');
        }

        const hasDifficulty = reports.some(r => r.feeling && (r.feeling.includes('难') || r.feeling.includes('不懂')));
        if (hasDifficulty) {
            summaries.push('部分内容理解有困难，建议利用周末时间重点复习。');
        } else {
            summaries.push('本周学习状态良好，继续保持！');
        }

        return summaries.join('');
    },

    loadWeeklyReport(weekKey) {
        if (!weekKey) return;
        
        const report = userData.weeklyReports[weekKey];
        if (!report) {
            document.getElementById('weekly-content').innerHTML = `
                <div class="report-empty">
                    <span class="empty-icon">📝</span>
                    <p>该周暂无报告，点击"生成本周周报"创建</p>
                </div>
            `;
            return;
        }

        document.getElementById('weekly-content').innerHTML = `
            <div class="report-section">
                <h4>📅 统计周期</h4>
                <p>${report.period}</p>
            </div>
            <div class="report-stats-grid">
                <div class="report-stat-box">
                    <span class="report-stat-value">${report.studyDays}</span>
                    <span class="report-stat-label">学习天数</span>
                </div>
                <div class="report-stat-box">
                    <span class="report-stat-value">${report.videoCount}</span>
                    <span class="report-stat-label">观看视频</span>
                </div>
                <div class="report-stat-box">
                    <span class="report-stat-value">${report.knowledgeCount}</span>
                    <span class="report-stat-label">学习知识点</span>
                </div>
                <div class="report-stat-box">
                    <span class="report-stat-value">${Math.round(report.totalStudyTime / 60)}</span>
                    <span class="report-stat-label">学习时长(小时)</span>
                </div>
            </div>
            <div class="report-section">
                <h4>📝 本周总结</h4>
                <div class="report-highlight">
                    ${report.summary}
                </div>
            </div>
            <div class="report-section">
                <h4>💡 下周建议</h4>
                <ul>
                    <li>继续按计划完成视频课程学习</li>
                    <li>利用艾宾浩斯曲线进行知识点复习</li>
                    <li>坚持每天写日报，记录学习收获</li>
                    <li>对本周疑难知识点进行针对性复习</li>
                </ul>
            </div>
        `;
    },

    generateMonthlyReport() {
        const monthKey = new Date().toISOString().slice(0, 7);
        
        // 统计月度数据
        const videoTotal = Object.keys(userData.videoProgress).length;
        const knowledgeTotal = Object.keys(userData.memoryStrength).length;
        const masteredCount = Object.values(userData.memoryStrength).filter(s => s >= 70).length;
        const reportCount = Object.keys(userData.dailyReports).length;

        const report = {
            period: `${monthKey}月`,
            videoTotal,
            knowledgeTotal,
            masteredCount,
            reportCount,
            masteryRate: knowledgeTotal > 0 ? Math.round(masteredCount / knowledgeTotal * 100) : 0
        };

        userData.monthlyReports[monthKey] = report;
        saveUserData();
        this.loadMonthlyReport(monthKey);
    },

    loadMonthlyReport(monthKey) {
        if (!monthKey) return;
        
        const report = userData.monthlyReports[monthKey];
        if (!report) {
            document.getElementById('monthly-content').innerHTML = `
                <div class="report-empty">
                    <span class="empty-icon">📝</span>
                    <p>该月暂无报告，点击"生成本月月报"创建</p>
                </div>
            `;
            return;
        }

        document.getElementById('monthly-content').innerHTML = `
            <div class="report-section">
                <h4>📅 统计月份</h4>
                <p>${report.period}</p>
            </div>
            <div class="report-stats-grid">
                <div class="report-stat-box">
                    <span class="report-stat-value">${report.reportCount}</span>
                    <span class="report-stat-label">打卡天数</span>
                </div>
                <div class="report-stat-box">
                    <span class="report-stat-value">${report.videoTotal}</span>
                    <span class="report-stat-label">完成视频</span>
                </div>
                <div class="report-stat-box">
                    <span class="report-stat-value">${report.knowledgeTotal}</span>
                    <span class="report-stat-label">学习知识点</span>
                </div>
                <div class="report-stat-box">
                    <span class="report-stat-value">${report.masteryRate}%</span>
                    <span class="report-stat-label">掌握率</span>
                </div>
            </div>
            <div class="report-section">
                <h4>📝 月度总结</h4>
                <div class="report-highlight">
                    本月共学习 ${report.reportCount} 天，完成 ${report.videoTotal} 节视频课程，
                    学习 ${report.knowledgeTotal} 个知识点，整体掌握率达到 ${report.masteryRate}%。
                    ${report.masteryRate >= 60 ? '掌握情况良好，继续保持！' : '还需加强复习，巩固记忆。'}
                </div>
            </div>
            <div class="report-section">
                <h4>📈 下月计划</h4>
                <ul>
                    <li>完成剩余视频课程学习</li>
                    <li>重点复习掌握率低于60%的模块</li>
                    <li>坚持每天3小时学习计划</li>
                    <li>利用周末进行阶段性测试</li>
                </ul>
            </div>
        `;
    },

    // ===== 词汇学习功能 =====
    // 词汇学习状态
    currentVocabLevel: 'basic',
    currentVocabGroup: 1,
    currentWordIndex: 0,
    currentGroupWords: [],

    // 初始化词汇学习
    initVocabulary() {
        // 设置默认等级和组
        this.currentVocabLevel = 'basic';
        this.currentVocabGroup = 1;
        this.currentWordIndex = 0;
        
        // 更新词汇统计
        this.updateVocabStats();
        
        // 渲染当前组的单词
        this.renderCurrentWord();
        
        // 更新词汇等级列表的显示
        this.updateVocabLevelList();
        
        // 初始化组选择器
        this.initGroupSelector();
        
        // 更新各等级统计显示
        this.updateLevelStats();
    },

    // 切换词汇等级
    switchVocabularyLevel(level) {
        if (!['basic', 'intermediate', 'advanced', 'phrase'].includes(level)) {
            console.warn('无效的词汇等级:', level);
            return;
        }
        
        // 设置当前等级
        this.currentVocabLevel = level;
        
        // 重置为第一组
        this.currentVocabGroup = 1;
        this.currentWordIndex = 0;
        
        // 更新等级标签显示
        const levelNames = { basic: '基础词汇', intermediate: '中级词汇', advanced: '高级词汇', phrase: '词组搭配' };
        const levelTag = document.getElementById('current-level-tag');
        if (levelTag) {
            levelTag.textContent = levelNames[level];
        }
        
        // 更新组选择器
        this.initGroupSelector();
        
        // 重新渲染词汇列表
        this.renderCurrentWord();
        this.updateVocabStats();
    },

    // 切换词汇组
    switchGroup(groupNum) {
        groupNum = parseInt(groupNum);
        if (isNaN(groupNum) || groupNum < 1) return;
        
        const maxGroups = vocabularyData.levels[this.currentVocabLevel]?.groups || 130;
        if (groupNum > maxGroups) {
            this.showToast('已经是最后一组了');
            return;
        }
        
        this.currentVocabGroup = groupNum;
        this.currentWordIndex = 0;
        
        // 渲染该组的单词
        this.renderCurrentWord();
    },

    // 渲染当前单词
    renderCurrentWord() {
        // 获取当前组的单词
        let words = [];
        if (this.currentVocabLevel === 'basic') {
            words = vocabularyData.basicVocabulary[this.currentVocabGroup] || [];
        } else if (this.currentVocabLevel === 'intermediate') {
            words = vocabularyData.intermediateVocabulary[this.currentVocabGroup] || [];
        } else if (this.currentVocabLevel === 'advanced') {
            words = vocabularyData.advancedVocabulary[this.currentVocabGroup] || [];
        } else if (this.currentVocabLevel === 'phrase') {
            words = vocabularyData.phrases[this.currentVocabGroup] || [];
        }
        
        this.currentGroupWords = words;
        
        if (words.length === 0) {
            // 清空单词显示区域
            const wordEl = document.getElementById('current-word');
            const phoneticEl = document.getElementById('current-phonetic');
            if (wordEl) wordEl.textContent = '';
            if (phoneticEl) phoneticEl.textContent = '';
            
            // 显示空数据提示
            const meaningSection = document.getElementById('meaning-section');
            if (meaningSection) {
                meaningSection.style.display = 'block';
                meaningSection.innerHTML = `
                    <div class="vocab-empty">
                        <span class="empty-icon">📚</span>
                        <p>暂无词汇数据</p>
                        <p style="font-size: 13px; margin-top: 8px; color: var(--text-secondary);">请先导入词汇或选择其他等级</p>
                    </div>
                `;
            }
            
            // 隐藏按钮
            const showMeaningBtn = document.getElementById('show-meaning-btn');
            const feedbackBtns = document.getElementById('feedback-btns');
            if (showMeaningBtn) showMeaningBtn.style.display = 'none';
            if (feedbackBtns) feedbackBtns.style.display = 'none';
            return;
        }
        
        const currentWord = words[this.currentWordIndex];
        if (!currentWord) {
            this.currentWordIndex = 0;
            return this.renderCurrentWord();
        }
        
        // 更新进度
        const progressEl = document.getElementById('vocab-progress-text');
        const progressFillEl = document.getElementById('vocab-progress-fill');
        if (progressEl) progressEl.textContent = `${this.currentWordIndex + 1} / ${words.length}`;
        if (progressFillEl) {
            const progress = ((this.currentWordIndex + 1) / words.length) * 100;
            progressFillEl.style.width = `${progress}%`;
        }
        
        // 先显示例句（单词挖空），隐藏单词信息
        this.showExampleFirst(currentWord);
    },
    
    // 先显示单词和例句，隐藏中文释义（让用户回忆中文意思）
    showExampleFirst(wordData) {
        const wordEl = document.getElementById('current-word');
        const phoneticEl = document.getElementById('current-phonetic');
        const showMeaningBtn = document.getElementById('show-meaning-btn');
        const feedbackBtns = document.getElementById('feedback-btns');
        const meaningSection = document.getElementById('meaning-section');
        
        // 显示英文单词和音标
        if (wordEl) wordEl.textContent = wordData.word || wordData.phrase || '';
        if (phoneticEl) phoneticEl.textContent = wordData.phonetic || '';
        
        // 显示完整例句（不挖空），隐藏中文释义
        let exampleText = wordData.example || '';
        if (meaningSection) {
            meaningSection.style.display = 'block';
            meaningSection.innerHTML = `
                <div class="study-example-first">
                    <div class="example-label">💡 请回忆中文释义：</div>
                    ${exampleText ? `<div class="example-sentence">${exampleText}</div>` : ''}
                </div>
            `;
        }
        
        // 显示"显示答案"按钮，隐藏反馈按钮
        if (showMeaningBtn) {
            showMeaningBtn.textContent = '显示答案';
            showMeaningBtn.style.display = 'inline-block';
            // 修复：不使用闭包，而是在点击时动态获取当前单词
            showMeaningBtn.onclick = () => this.showWordMeaning();
        }
        if (feedbackBtns) feedbackBtns.style.display = 'none';
    },
    
    // 显示单词答案
    // 显示单词答案（中文释义）
    showWordAnswer(wordData) {
        const meaningSection = document.getElementById('meaning-section');
        const showMeaningBtn = document.getElementById('show-meaning-btn');
        const feedbackBtns = document.getElementById('feedback-btns');
        
        // 显示完整信息（释义+例句+相似词）
        if (meaningSection) {
            meaningSection.style.display = 'block';
            let html = `
                <div class="study-meaning" id="current-meaning" style="font-size: 20px; color: var(--text-primary); margin-bottom: 12px;">${wordData.meaning || ''}</div>
            `;
            
            // 添加例句
            if (wordData.example) {
                html += `<div class="study-example"><span class="example-label">📝 例句：</span>${wordData.example}</div>`;
            }
            
            // 添加相似词
            if (wordData.word && vocabularyData.similarWords[wordData.word]) {
                const similarWords = vocabularyData.similarWords[wordData.word];
                html += `<div class="study-similar"><span class="similar-label">相似词：</span>${similarWords.join(', ')}</div>`;
            }
            
            meaningSection.innerHTML = html;
        }
        
        // 隐藏"显示答案"按钮，显示反馈按钮
        if (showMeaningBtn) showMeaningBtn.style.display = 'none';
        if (feedbackBtns) feedbackBtns.style.display = 'flex';
    },

    // 显示单词释义（兼容旧代码）
    showWordMeaning() {
        const currentWord = this.currentGroupWords[this.currentWordIndex];
        if (currentWord) {
            this.showWordAnswer(currentWord);
        }
    },

    // 标记单词学习状态
    markWord(status) {
        console.log('markWord called:', status, 'currentGroupWords length:', this.currentGroupWords.length, 'currentWordIndex:', this.currentWordIndex);
        try {
            const currentWord = this.currentGroupWords[this.currentWordIndex];
            if (!currentWord) {
                console.error('markWord: currentWord is null');
                return;
            }
            
            const wordKey = currentWord.word || currentWord.phrase;
            if (!wordKey) {
                console.error('markWord: wordKey is empty');
                return;
            }
            
            // 更新用户词汇进度
            if (!userVocabularyProgress[wordKey]) {
                userVocabularyProgress[wordKey] = {
                    status: 'new',
                    reviewCount: 0,
                    wrongCount: 0,
                    nextReview: null,
                    lastReview: null
                };
            }
            
            const progress = userVocabularyProgress[wordKey];
            progress.lastReview = new Date().toISOString();
            progress.reviewCount++;
            
            // 根据状态更新
            switch(status) {
                case 'correct':
                    progress.status = 'mastered';
                    break;
                case 'vague':
                    progress.status = 'learning';
                    progress.wrongCount++;
                    break;
                case 'wrong':
                    progress.status = 'learning';
                    progress.wrongCount++;
                    break;
            }
            
            // 计算下次复习时间（使用艾宾浩斯曲线）
            const reviewIntervals = [1, 3, 7, 14, 30]; // 复习间隔天数
            const interval = reviewIntervals[Math.min(progress.reviewCount - 1, reviewIntervals.length - 1)];
            const nextReview = new Date();
            nextReview.setDate(nextReview.getDate() + interval);
            progress.nextReview = nextReview.toISOString();
            
            // 保存进度
            if (typeof saveVocabularyData === 'function') {
                saveVocabularyData();
            }
            
            // 显示反馈
            const messages = {
                correct: '👍 已掌握！继续保持！',
                vague: '🤔 需要加强记忆',
                wrong: '💪 多多复习，下次一定能记住！'
            };
            this.showToast(messages[status]);
            
            // 切换到下一个单词
            this.currentWordIndex++;
            
            if (this.currentWordIndex >= this.currentGroupWords.length) {
                // 本组完成
                this.showToast('🎉 本组单词学习完成！');
                this.currentWordIndex = 0;
                
                // 自动切换到下一组
                let vocabKey;
                switch(this.currentVocabLevel) {
                    case 'basic': vocabKey = 'basicVocabulary'; break;
                    case 'intermediate': vocabKey = 'intermediateVocabulary'; break;
                    case 'advanced': vocabKey = 'advancedVocabulary'; break;
                    case 'phrase': vocabKey = 'phrases'; break;
                    default: vocabKey = 'basicVocabulary';
                }
                const maxGroups = Object.keys(vocabularyData[vocabKey] || {}).length;
                if (this.currentVocabGroup < maxGroups) {
                    this.currentVocabGroup++;
                    this.initGroupSelector();
                }
            }
            
            // 更新统计并渲染下一个单词
            this.updateVocabStats();
            this.renderCurrentWord();
            
        } catch (error) {
            console.error('markWord error:', error);
            this.showToast('操作失败，请重试');
        }
    },
    
    // 上一个单词
    prevWord() {
        if (this.currentWordIndex > 0) {
            this.currentWordIndex--;
            this.renderCurrentWord();
        } else if (this.currentVocabGroup > 1) {
            // 切换到上一组
            this.currentVocabGroup--;
            // 修复：根据当前等级获取词汇数据
            let vocabKey;
            switch(this.currentVocabLevel) {
                case 'basic': vocabKey = 'basicVocabulary'; break;
                case 'intermediate': vocabKey = 'intermediateVocabulary'; break;
                case 'advanced': vocabKey = 'advancedVocabulary'; break;
                case 'phrase': vocabKey = 'phrases'; break;
                default: vocabKey = 'basicVocabulary';
            }
            const words = vocabularyData[vocabKey][this.currentVocabGroup] || [];
            this.currentWordIndex = words.length - 1;
            this.initGroupSelector();
            this.renderCurrentWord();
        }
    },
    
    // 下一个单词
    nextWord() {
        const words = this.currentGroupWords;
        if (this.currentWordIndex < words.length - 1) {
            this.currentWordIndex++;
            this.renderCurrentWord();
        } else {
            // 切换到下一组
            // 修复：根据当前等级获取最大组数
            let vocabKey;
            switch(this.currentVocabLevel) {
                case 'basic': vocabKey = 'basicVocabulary'; break;
                case 'intermediate': vocabKey = 'intermediateVocabulary'; break;
                case 'advanced': vocabKey = 'advancedVocabulary'; break;
                case 'phrase': vocabKey = 'phrases'; break;
                default: vocabKey = 'basicVocabulary';
            }
            const maxGroups = Object.keys(vocabularyData[vocabKey] || {}).length;
            if (this.currentVocabGroup < maxGroups) {
                this.currentVocabGroup++;
                this.currentWordIndex = 0;
                this.initGroupSelector();
                this.renderCurrentWord();
            } else {
                this.showToast('已经是最后一组了');
            }
        }
    },

    // 开始单词学习（全屏模式）
    startVocabStudy(level) {
        this.currentVocabLevel = level;
        this.currentVocabGroup = 1;
        this.currentWordIndex = 0;
        
        // 设置标题
        const levelNames = {
            basic: '基础词汇',
            intermediate: '中级词汇',
            advanced: '高级词汇',
            phrase: '词组搭配'
        };
        document.getElementById('vocab-study-title').textContent = levelNames[level] || '词汇学习';
        
        // 显示全屏界面
        document.getElementById('vocab-study-modal').style.display = 'flex';
        
        // 初始化组选择器
        this.initGroupSelector();
        
        // 渲染单词（先显示例句模式）
        this.renderCurrentWord();
        
        // 更新统计
        this.updateVocabStats();
    },
    
    // 关闭单词学习界面
    closeVocabStudy() {
        document.getElementById('vocab-study-modal').style.display = 'none';
        // 停止语音播放
        if (typeof Android !== 'undefined' && Android.stopSpeaking) {
            Android.stopSpeaking();
        } else if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    },

    // 播放单词发音
    playWordSound() {
        const currentWord = this.currentGroupWords[this.currentWordIndex];
        if (!currentWord) return;
        
        const word = currentWord.word || currentWord.phrase;
        if (!word) return;
        
        // 优先使用 Android 原生 TTS
        if (typeof Android !== 'undefined' && Android.isTtsAvailable && Android.isTtsAvailable()) {
            Android.speakEnglish(word);
        } else if ('speechSynthesis' in window) {
            // 降级使用 Web Speech API
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        } else {
            console.log('播放单词发音:', word);
            this.showToast(`🔊 ${word}`);
        }
    },

    // 更新词汇统计
    updateVocabStats() {
        // 更新各等级统计显示（包含总统计更新）
        this.updateLevelStats();
    },
    
    // 更新各等级词汇统计显示
    updateLevelStats() {
        const levels = [
            { key: 'basic', name: 'basicVocabulary', elId: 'basic-count', title: '基础词汇' },
            { key: 'intermediate', name: 'intermediateVocabulary', elId: 'intermediate-count', title: '中级词汇' },
            { key: 'advanced', name: 'advancedVocabulary', elId: 'advanced-count', title: '高级词汇' },
            { key: 'phrase', name: 'phrases', elId: 'phrase-count', title: '词组搭配' }
        ];
        
        let totalWords = 0;
        let totalLearning = 0;
        let totalMastered = 0;
        
        levels.forEach(level => {
            const el = document.getElementById(level.elId);
            const data = vocabularyData[level.name] || {};
            const groupCount = Object.keys(data).length;
            let wordCount = 0;
            Object.values(data).forEach(group => {
                wordCount += group.length;
            });
            
            // 统计各等级学习进度
            let learningCount = 0;
            let masteredCount = 0;
            Object.values(data).forEach(group => {
                group.forEach(word => {
                    const wordKey = word.word || word.phrase;
                    const progress = userVocabularyProgress[wordKey];
                    if (progress) {
                        if (progress.status === 'learning') learningCount++;
                        else if (progress.status === 'mastered') masteredCount++;
                    }
                });
            });
            
            totalWords += wordCount;
            totalLearning += learningCount;
            totalMastered += masteredCount;
            
            if (el) {
                if (groupCount > 0) {
                    el.textContent = `${groupCount}组 · ${wordCount}词`;
                } else {
                    el.textContent = '暂无数据';
                }
            }
            
            // 更新明细列表 - 分别更新三个数字
            const totalSpan = document.getElementById(`${level.key}-total`);
            const learningSpan = document.getElementById(`${level.key}-learning`);
            const masteredSpan = document.getElementById(`${level.key}-mastered`);
            
            if (totalSpan) totalSpan.textContent = wordCount || '-';
            if (learningSpan) learningSpan.textContent = learningCount || '-';
            if (masteredSpan) masteredSpan.textContent = masteredCount || '-';
        });
        
        // 更新总统计
        const totalEl = document.getElementById('vocab-total');
        const learningEl = document.getElementById('vocab-learning');
        const masteredEl = document.getElementById('vocab-mastered');
        
        if (totalEl) totalEl.textContent = totalWords;
        if (learningEl) learningEl.textContent = totalLearning;
        if (masteredEl) masteredEl.textContent = totalMastered;
    },

    // 初始化组选择器
    initGroupSelector() {
        const selector = document.getElementById('group-selector');
        if (!selector) return;
        
        // 获取实际有数据的组
        const availableGroups = this.getAvailableGroups();
        if (availableGroups.length === 0) {
            selector.innerHTML = '<option value="1">第1组</option>';
            return;
        }
        
        const options = availableGroups.map(group => 
            `<option value="${group}">第${group}组</option>`
        );
        
        selector.innerHTML = options.join('');
        
        // 如果当前组没有数据，选择第一个可用组
        if (!availableGroups.includes(this.currentVocabGroup)) {
            this.currentVocabGroup = availableGroups[0];
        }
        selector.value = this.currentVocabGroup;
    },
    
    // 获取当前等级下有数据的组列表
    getAvailableGroups() {
        const groups = [];
        let data = {};
        
        if (this.currentVocabLevel === 'basic') {
            data = vocabularyData.basicVocabulary || {};
        } else if (this.currentVocabLevel === 'intermediate') {
            data = vocabularyData.intermediateVocabulary || {};
        } else if (this.currentVocabLevel === 'advanced') {
            data = vocabularyData.advancedVocabulary || {};
        } else if (this.currentVocabLevel === 'phrase') {
            data = vocabularyData.phrases || {};
        }
        
        // 获取所有有数据的组号
        Object.keys(data).forEach(key => {
            const groupNum = parseInt(key);
            if (!isNaN(groupNum) && data[key] && data[key].length > 0) {
                groups.push(groupNum);
            }
        });
        
        return groups.sort((a, b) => a - b);
    },

    // 更新词汇等级列表显示
    updateVocabLevelList() {
        const container = document.getElementById('vocab-level-list');
        if (!container) return;
        
        const levels = [
            { key: 'basic', name: '基础词汇', desc: '130组，650词', icon: '📘' },
            { key: 'advanced', name: '高级词汇', desc: '460组，2300词', icon: '📗' },
            { key: 'phrase', name: '词组搭配', desc: '70组，700个', icon: '📙' }
        ];
        
        container.innerHTML = levels.map(level => `
            <div class="vocab-level-item ${this.currentVocabLevel === level.key ? 'active' : ''}" 
                 onclick="app.switchVocabularyLevel('${level.key}')">
                <span class="level-icon">${level.icon}</span>
                <div class="level-info">
                    <span class="level-name">${level.name}</span>
                    <span class="level-desc">${level.desc}</span>
                </div>
            </div>
        `).join('');
    },

    // 渲染已导入的词汇列表
    renderImportedList() {
        const container = document.getElementById('imported-list');
        if (!container) return;
        
        const customVocabNames = Object.keys(customVocabularies);
        
        if (customVocabNames.length === 0) {
            container.innerHTML = '<p class="no-imported">暂无导入的词汇库</p>';
            return;
        }
        
        container.innerHTML = customVocabNames.map(name => {
            const vocab = customVocabularies[name];
            return `
                <div class="imported-item">
                    <span class="imported-name">${name}</span>
                    <span class="imported-count">${vocab.length}词</span>
                    <button class="delete-imported" onclick="app.deleteImportedVocab('${name}')">×</button>
                </div>
            `;
        }).join('');
    },

    // 删除导入的词汇库
    deleteImportedVocab(name) {
        if (confirm(`确定要删除词汇库"${name}"吗？`)) {
            delete customVocabularies[name];
            saveVocabularyData();
            this.renderImportedList();
            this.showToast('词汇库已删除');
        }
    },

    // 显示导入弹窗
    showImportModal() {
        // 创建导入弹窗
        let modal = document.getElementById('vocab-import-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'vocab-import-modal';
            modal.className = 'modal';
            modal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; justify-content: center; align-items: center;';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 480px; max-height: 80vh; overflow-y: auto;">
                    <div class="modal-header">
                        <h3>📥 导入自定义词汇</h3>
                        <button class="close-btn" onclick="app.closeImportModal()">×</button>
                    </div>
                    <div class="modal-body" style="padding: 20px;">
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; color: var(--text-secondary);">词汇库名称</label>
                            <input type="text" id="vocab-import-name" placeholder="例如：考研核心词汇" 
                                   style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px;">
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; color: var(--text-secondary);">文件格式</label>
                            <select id="vocab-import-format" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px;">
                                <option value="txt">TXT (单词|音标|释义)</option>
                                <option value="csv">CSV (逗号分隔)</option>
                                <option value="json">JSON</option>
                            </select>
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; color: var(--text-secondary);">词汇内容</label>
                            <textarea id="vocab-import-content" rows="8" placeholder="每行一个单词，格式：单词|音标|释义&#10;例如：abandon|/əˈbændən/|v. 放弃，遗弃" 
                                      style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary); font-size: 14px; resize: vertical;"></textarea>
                        </div>
                        <div id="vocab-import-preview" style="margin-bottom: 16px; display: none;">
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; color: var(--text-secondary);">预览 (前5个)</label>
                            <div id="vocab-preview-content" style="padding: 12px; background: var(--bg-secondary); border-radius: 8px; font-size: 13px;"></div>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <button onclick="app.previewVocabularyFile()" style="flex: 1; padding: 10px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-card); color: var(--text-secondary); cursor: pointer;">预览</button>
                            <button onclick="app.importVocabulary()" style="flex: 1; padding: 10px; border-radius: 8px; border: none; background: var(--primary); color: white; cursor: pointer;">导入</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // 点击外部关闭
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeImportModal();
                }
            });
        }
        
        // 重置表单
        document.getElementById('vocab-import-name').value = '';
        document.getElementById('vocab-import-content').value = '';
        document.getElementById('vocab-import-preview').style.display = 'none';
        
        modal.style.display = 'flex';
    },

    // 关闭导入弹窗
    closeImportModal() {
        const modal = document.getElementById('vocab-import-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    // 显示词汇数据管理弹窗（导入/导出）
    showVocabDataModal() {
        let modal = document.getElementById('vocab-data-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'vocab-data-modal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 480px;">
                    <div class="modal-header">
                        <h3>💾 词汇数据管理</h3>
                        <button class="close-btn" onclick="app.closeVocabDataModal()">×</button>
                    </div>
                    <div class="modal-body" style="padding: 20px;">
                        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
                            <button onclick="app.showImportModal()" style="flex: 1; padding: 16px; border-radius: 12px; border: none; background: var(--primary); color: white; cursor: pointer; font-size: 15px;">
                                📥 导入词汇
                            </button>
                            <button onclick="app.exportVocabulary()" style="flex: 1; padding: 16px; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-primary); cursor: pointer; font-size: 15px;">
                                📤 导出词汇
                            </button>
                        </div>
                        <div style="padding: 16px; background: var(--bg-secondary); border-radius: 12px; font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
                            <p style="margin-bottom: 8px;"><strong>导入格式：</strong></p>
                            <p style="margin-bottom: 4px;">• TXT: 单词 | 音标 | 释义</p>
                            <p style="margin-bottom: 4px;">• JSON: 标准JSON格式</p>
                            <p>• 支持自定义词汇库</p>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeVocabDataModal();
                }
            });
        }
        modal.style.display = 'flex';
    },

    // 关闭词汇数据管理弹窗
    closeVocabDataModal() {
        const modal = document.getElementById('vocab-data-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    // 导出词汇
    exportVocabulary() {
        const data = {
            basicVocabulary: vocabularyData.basicVocabulary,
            intermediateVocabulary: vocabularyData.intermediateVocabulary,
            advancedVocabulary: vocabularyData.advancedVocabulary,
            phrases: vocabularyData.phrases,
            exportTime: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vocabulary_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('词汇数据已导出');
        this.closeVocabDataModal();
    },

    // 预览词汇文件
    previewVocabularyFile() {
        // 首先尝试从文件输入框读取
        const fileInput = document.getElementById('vocab-file-input');
        const textarea = document.getElementById('vocab-import-content');
        
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            // 从文件读取
            const file = fileInput.files[0];
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const content = e.target.result;
                const format = this._getFileFormat(file.name);
                this._processVocabularyContent(content, format);
            };
            
            reader.readAsText(file, 'UTF-8');
            return;
        }
        
        // 否则从textarea读取
        if (!textarea) {
            alert('请先选择文件');
            return;
        }
        
        const content = textarea.value;
        const format = document.getElementById('vocab-import-format')?.value || 'txt';
        
        if (!content.trim()) {
            alert('请输入词汇内容');
            return;
        }
        
        this._processVocabularyContent(content, format);
    },
    
    // 获取文件格式
    _getFileFormat(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        if (ext === 'csv') return 'csv';
        if (ext === 'json') return 'json';
        return 'txt';
    },
    
    // 处理词汇内容
    _processVocabularyContent(content, format) {
        const words = parseVocabularyFile(content, format);
        
        if (words.length === 0) {
            alert('未能解析出任何词汇，请检查格式');
            return;
        }
        
        // 尝试获取预览容器（支持两种弹窗）
        let previewContainer = document.getElementById('import-preview');
        let previewContent = document.getElementById('preview-list');
        let previewStats = document.getElementById('preview-stats');
        
        if (!previewContainer) {
            // 使用旧版弹窗元素
            previewContainer = document.getElementById('vocab-import-preview');
            previewContent = document.getElementById('vocab-preview-content');
        }
        
        if (previewContent) {
            previewContent.innerHTML = words.slice(0, 5).map(w => `
                <div style="margin-bottom: 4px; padding: 4px 0; border-bottom: 1px solid var(--border);">
                    <strong>${w.word || w.phrase}</strong> ${w.phonetic || ''} - ${w.meaning || ''}
                </div>
            `).join('') + (words.length > 5 ? `<div style="margin-top: 8px; color: var(--text-muted);">...还有 ${words.length - 5} 个单词</div>` : '');
        }
        
        if (previewStats) {
            previewStats.textContent = `共 ${words.length} 个单词`;
        }
        
        if (previewContainer) {
            previewContainer.style.display = 'block';
        }
        
        // 保存解析结果供导入使用
        this._pendingVocabImport = words;
    },

    // 导入词汇
    importVocabulary() {
        const nameInput = document.getElementById('vocab-import-name');
        const name = nameInput ? nameInput.value.trim() : '';
        const level = document.getElementById('import-level').value;
        
        // 自定义词汇需要名称
        if (level === 'custom' && !name) {
            alert('请输入词汇库名称');
            return;
        }
        
        if (!this._pendingVocabImport || this._pendingVocabImport.length === 0) {
            // 先尝试解析
            this.previewVocabularyFile();
            if (!this._pendingVocabImport || this._pendingVocabImport.length === 0) {
                return;
            }
        }
        
        // 根据选择的等级导入到对应词汇库
        if (level === 'basic' || level === 'intermediate' || level === 'advanced') {
            // 导入到内置词汇库 - 使用正确的键名
            const vocabKey = level;
            
            if (!vocabularyData[vocabKey]) {
                vocabularyData[vocabKey] = {};
            }
            
            // 获取用户指定的分组编号（如果有）
            const groupInput = document.getElementById('import-group');
            const specifiedGroup = groupInput ? parseInt(groupInput.value) || 1 : 1;
            
            // 按组导入单词
            const words = this._pendingVocabImport;
            const groups = {};
            
            words.forEach(word => {
                // 优先使用用户指定的分组，否则使用单词自带的分组，默认为1
                const groupNum = groupInput && groupInput.value ? specifiedGroup : (word.group || 1);
                if (!groups[groupNum]) {
                    groups[groupNum] = [];
                }
                groups[groupNum].push(word);
            });
            
            // 合并到现有词汇库
            Object.keys(groups).forEach(groupNum => {
                if (!vocabularyData[vocabKey][groupNum]) {
                    vocabularyData[vocabKey][groupNum] = [];
                }
                vocabularyData[vocabKey][groupNum].push(...groups[groupNum]);
            });
            
            // 保存到localStorage
            localStorage.setItem('studyx_builtin_vocab_' + level, JSON.stringify(vocabularyData[vocabKey]));
            
            this.showToast(`✅ 成功导入到${level === 'basic' ? '基础' : level === 'intermediate' ? '中级' : '高级'}词汇，共 ${words.length} 个单词`);
            
            // 刷新词汇显示
            if (this.currentVocabLevel === level) {
                this.renderCurrentWord();
            }
        } else if (level === 'phrase') {
            // 导入到词组搭配
            if (!vocabularyData.phrases) {
                vocabularyData.phrases = {};
            }
            
            const words = this._pendingVocabImport;
            const groups = {};
            
            words.forEach(word => {
                const groupNum = word.group || 1;
                if (!groups[groupNum]) {
                    groups[groupNum] = [];
                }
                groups[groupNum].push(word);
            });
            
            Object.keys(groups).forEach(groupNum => {
                if (!vocabularyData.phrases[groupNum]) {
                    vocabularyData.phrases[groupNum] = [];
                }
                vocabularyData.phrases[groupNum].push(...groups[groupNum]);
            });
            
            localStorage.setItem('studyx_builtin_vocab_phrase', JSON.stringify(vocabularyData.phrases));
            this.showToast(`✅ 成功导入到词组搭配，共 ${words.length} 个短语`);
        } else {
            // 保存到自定义词汇库
            customVocabularies[name] = this._pendingVocabImport;
            saveVocabularyData();
            this.renderImportedList();
            this.showToast(`✅ 成功导入自定义词汇库 "${name}"，共 ${this._pendingVocabImport.length} 个单词`);
        }
        
        this.closeImportModal();
        this._pendingVocabImport = null;
    },

    // ========== 经济计算题库页面 ==========
    calcQuestions: [],
    currentCalcFilter: 'all',

    initCalculator() {
        this.loadCalcQuestions();
        this.renderCalcQuestions();
        this.initCalcModalEvents();
    },

    setCalcFilter(type) {
        this.currentCalcFilter = type;
        // 更新按钮样式
        document.querySelectorAll('.calc-filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('onclick').includes(`'${type}'`)) {
                btn.classList.add('active');
            }
        });
        this.renderCalcQuestions();
    },

    loadCalcQuestions() {
        // 从localStorage加载计算题
        const saved = localStorage.getItem('studyx_calc_questions');
        if (saved) {
            this.calcQuestions = JSON.parse(saved);
        } else {
            // 首次加载时从JSON文件导入默认题库
            this.loadDefaultCalcQuestions();
        }
    },

    loadDefaultCalcQuestions() {
        // 内嵌经济学计算题真题库（08-24年）
        const defaultQuestions = [
            {
                "type": "micro",
                "title": "08年真题：生产函数与成本最小化",
                "content": "已知某厂商的生产函数为Q=L^(2/5)K^(3/5)，劳动的价格为PL=2，资本的价格为PK=3。\n\n试求：\n（1）产量为10时，最低成本支出的大小和L与K的使用数量。\n（2）总成本为60元时，厂商的均衡产量和L与K的使用数量。\n（3）什么是边际收益递减规律？该生产函数的要素报酬是否受该规律支配？为什么？",
                "answer": "（1）根据成本最小化条件：MPL/MPK = PL/PK\nMPL = (2/5)L^(-3/5)K^(3/5)，MPK = (3/5)L^(2/5)K^(-2/5)\nMPL/MPK = (2K)/(3L) = 2/3\n所以 K = L\n当Q=10时：10 = L^(2/5)L^(3/5) = L，所以L=10，K=10\n最低成本 = 2×10 + 3×10 = 50元\n\n（2）当成本为60元时：2L + 3K = 60，且K=L\n所以 5L = 60，L=12，K=12\n均衡产量 Q = 12^(2/5)×12^(3/5) = 12\n\n（3）边际收益递减规律：在技术水平和其它要素投入不变的情况下，连续增加某一可变要素的投入，其边际产量最终会递减。\n该生产函数受该规律支配，因为当K固定时，随着L增加，MPL最终会递减。",
                "analysis": "本题考查生产理论和成本理论的结合，关键是掌握成本最小化条件MPL/MPK=PL/PK。",
                "year": "2008",
                "id": 200801,
                "date": "2026-02-14"
            },
            {
                "type": "micro",
                "title": "09年真题：垄断厂商的利润最大化与价格管制",
                "content": "已知某垄断厂商的成本函数为TC = 5Q² + 100Q，产品的需求函数为P = 900 - 5Q。\n\n请计算：\n（1）利润最大化时的产量、价格和利润。\n（2）假设国内市场的售价超过600，国外同质产品就会进入。计算P=600时垄断厂商提供的产量和赚得的利润。\n（3）如果政府进行限价，规定最高售价为500。计算垄断厂商提供的产量和赚得的利润。此时国内需求状况会发生什么变化？\n（4）基于以上结论，说明政府制定反垄断法规的经济意义。",
                "answer": "（1）MR = 900 - 10Q，MC = 10Q + 100\n利润最大化条件MR=MC：900-10Q = 10Q+100，得Q=40，P=700\n利润 = TR-TC = 700×40 - (5×40²+100×40) = 28000 - 12000 = 16000\n\n（2）当P=600时：600 = 900-5Q，得Q=60\n利润 = 600×60 - (5×60²+100×60) = 36000 - 24000 = 12000\n\n（3）当P=500时：500 = 900-5Q，得Q=80\n利润 = 500×80 - (5×80²+100×80) = 40000 - 40000 = 0\n此时垄断厂商超额利润为0，国内需求增加，消费者福利提高。\n\n（4）反垄断法规的经济意义：限制垄断厂商的市场势力，防止价格过高、产量过低；保护消费者利益，促进市场竞争，提高资源配置效率。",
                "analysis": "本题综合考查垄断市场均衡和政府对垄断的管制，关键是理解MR=MC的利润最大化条件和价格管制的影响。",
                "year": "2009",
                "id": 200901,
                "date": "2026-02-14"
            },
            {
                "type": "micro",
                "title": "13年真题：垄断厂商与税收效应",
                "content": "已知某垄断厂商面临的需求曲线为Q=20-P，成本函数为C=Q²+4Q。\n\n试问：\n（1）厂商实现利润最大化的价格和产量为多少？\n（2）当政府对该厂商一共征收4单位产品税时，厂商的价格和产量是多少？当政府对该厂商每单位产品征收4单位产品税时，厂商的价格和产量又为多少？\n（3）政府改用价格管制以实现消费者剩余和生产者剩余总和最大化，则该厂商的价格和产量又为多少？\n（4）结合以上结论，说明政府制定反垄断政策的意义。",
                "answer": "（1）P = 20-Q，TR = 20Q-Q²，MR = 20-2Q\nMC = 2Q+4\nMR=MC：20-2Q = 2Q+4，得Q=4，P=16\n\n（2）征收4单位总额税：不影响MC，产量仍为Q=4，价格P=16\n每单位征收4单位税：MC' = 2Q+4+4 = 2Q+8\nMR=MC'：20-2Q = 2Q+8，得Q=3，P=17\n\n（3）消费者剩余和生产者剩余总和最大化即社会福利最大化，此时P=MC\n20-Q = 2Q+4，得Q=16/3≈5.33，P=44/3≈14.67\n\n（4）反垄断政策意义：纠正垄断导致的市场失灵；提高资源配置效率；保护消费者利益；促进公平竞争。",
                "analysis": "本题考查垄断均衡和税收效应，注意总额税和从量税对厂商决策的不同影响。",
                "year": "2013",
                "id": 201301,
                "date": "2026-02-14"
            },
            {
                "type": "micro",
                "title": "16年真题：垄断均衡与需求价格弹性",
                "content": "垄断市场条件下，成本函数C=Q²，需求曲线为P=100-Q。\n\n（1）求均衡条件下的Q，P。\n（2）求均衡条件下的需求价格弹性。\n（3）当需求函数变为P=60-Q时，求利润最大化均衡条件下需求的价格弹性。\n（4）当需求函数变为P=100-3Q时，求利润最大化均衡条件下需求的价格弹性。\n（5）根据上述结果说明需求的价格弹性和需求曲线斜率的关系。",
                "answer": "（1）MR = 100-2Q，MC = 2Q\nMR=MC：100-2Q = 2Q，得Q=25，P=75\n\n（2）需求价格弹性 Ed = -(dQ/dP)×(P/Q) = 1×(75/25) = 3\n\n（3）P=60-Q时，MR=60-2Q，MC=2Q\nMR=MC：60-2Q=2Q，得Q=15，P=45\nEd = 1×(45/15) = 3\n\n（4）P=100-3Q时，MR=100-6Q，MC=2Q\nMR=MC：100-6Q=2Q，得Q=12.5，P=62.5\nEd = (1/3)×(62.5/12.5) = 5/3 ≈ 1.67\n\n（5）结论：需求价格弹性与需求曲线斜率相关但不相同。斜率绝对值越大（曲线越陡峭），弹性通常越小。垄断定价时，P>MC，弹性越大，垄断势力越小。",
                "analysis": "本题重点考查垄断均衡计算和需求价格弹性，以及弹性与斜率的区别。",
                "year": "2016",
                "id": 201601,
                "date": "2026-02-14"
            },
            {
                "type": "micro",
                "title": "18年真题：垄断厂商与征税分析",
                "content": "垄断厂商市场需求曲线为P=10-2Q。长期总成本为LTC=Q³-5Q²+10Q。\n\n（1）求边际收益函数。\n（2）求利润最大化时的产量和价格。\n（3）对垄断厂商征收一定量的固定税额，当征收多少税时，其没有超额利润。\n（4）对单位产品征收3单位比例税，求新的产量和价格。\n（5）简述上述两种征税方式对消费者的影响。",
                "answer": "（1）TR = PQ = 10Q-2Q²，MR = 10-4Q\n\n（2）LMC = 3Q²-10Q+10\nMR=LMC：10-4Q = 3Q²-10Q+10\n3Q²-6Q = 0，Q(3Q-6)=0，得Q=2（Q=0舍去）\nP = 10-4 = 6\n\n（3）原利润 = TR-LTC = 12-(8-20+20) = 4\n征收固定税4单位时，超额利润为0\n\n（4）征收3单位从量税：LMC' = 3Q²-10Q+13\nMR=LMC'：10-4Q = 3Q²-10Q+13\n3Q²-6Q+3=0，Q=1，P=8\n\n（5）固定税不影响产量和价格，对消费者无影响；从量税提高价格、减少产量，损害消费者利益。",
                "analysis": "本题考查垄断均衡和税收分析，关键是区分固定税和从量税的不同影响。",
                "year": "2018",
                "id": 201801,
                "date": "2026-02-14"
            },
            {
                "type": "micro",
                "title": "20年真题：需求价格弹性与总收益",
                "content": "什么是需求的价格弹性，如何衡量？影响需求的价格弹性的因素有哪些？若某厂商面对的市场需求曲线为Q=20-3P，当P=4时，求需求的价格点弹性和厂商获得的收益是多少？该厂商如何调整价格才能使得总收益增加？",
                "answer": "（1）需求的价格弹性衡量需求量对价格变动的敏感程度，公式为：\nEd = -(ΔQ/Q)/(ΔP/P) = -(dQ/dP)×(P/Q)\n\n（2）影响因素：商品必需程度、替代品 availability、消费支出占收入比重、时间跨度、商品用途广泛性等。\n\n（3）Q = 20-3×4 = 8\ndQ/dP = -3\nEd = -(-3)×(4/8) = 1.5\n总收益 TR = P×Q = 4×8 = 32\n\n（4）由于Ed=1.5>1，需求富有弹性。降价会增加总收益。\n验证：当P=3时，Q=11，TR=33>32\n因此厂商应适当降价以增加总收益。",
                "analysis": "本题考查需求价格弹性的概念、计算和应用，关键是理解弹性与总收益的关系。",
                "year": "2020",
                "id": 202001,
                "date": "2026-02-14"
            },
            {
                "type": "micro",
                "title": "22年真题：垄断厂商与价格歧视",
                "content": "已知垄断厂商的需求函数为Q=50-P\n\n（1）求厂商的边际收益函数；\n（2）当厂商的边际成本等于20时，求厂商利润最大化时的产量和价格；\n（3）阐述垄断厂商的价格歧视。",
                "answer": "（1）P = 50-Q，TR = 50Q-Q²，MR = 50-2Q\n\n（2）MC = 20\nMR=MC：50-2Q = 20，得Q=15，P=35\n\n（3）价格歧视是指垄断厂商对同一商品向不同消费者或在不同市场收取不同价格。\n\n一级价格歧视（完全价格歧视）：对每单位商品按消费者愿意支付的最高价格出售，榨取全部消费者剩余。\n\n二级价格歧视：根据购买数量不同收取不同价格，如批量折扣。\n\n三级价格歧视：将市场分割，对各子市场分别定价，需求弹性小的市场价格高。实施条件：市场可分割、不同市场需求弹性不同、市场间不能套利。\n\n价格歧视可增加厂商利润，但通常降低社会福利。",
                "analysis": "本题考查垄断均衡和价格歧视理论，需要理解三种价格歧视的区别。",
                "year": "2022",
                "id": 202201,
                "date": "2026-02-14"
            },
            {
                "type": "micro",
                "title": "24年真题：最优要素组合与成本函数",
                "content": "假定某厂商的生产函数是 Q = (KL)^(1/2)，资本K的租金价格为r=1元，L的工资率为w=4元。\n\n求：\n（1）厂商的最优要素组合。\n（2）厂商的长期总成本函数。\n（3）当K=100时，厂商短期总成本函数。",
                "answer": "（1）MPL = (1/2)(K/L)^(1/2)，MPK = (1/2)(L/K)^(1/2)\n最优条件：MPL/MPK = w/r\n(K/L)/(L/K) = 4，即 K/L = 4，K = 4L\n\n（2）由 Q = (KL)^(1/2) = (4L²)^(1/2) = 2L\n得 L = Q/2，K = 2Q\nLTC = wL + rK = 4×(Q/2) + 1×2Q = 2Q + 2Q = 4Q\n\n（3）当K=100时，Q = (100L)^(1/2) = 10L^(1/2)\nL = Q²/100\nSTC = wL + rK = 4×(Q²/100) + 1×100 = Q²/25 + 100",
                "analysis": "本题考查最优要素组合和成本函数的推导，关键是掌握成本最小化条件。",
                "year": "2024",
                "id": 202401,
                "date": "2026-02-14"
            },
            {
                "type": "macro",
                "title": "12年真题：IS-LM模型与总需求",
                "content": "已知某封闭经济中：消费需求函数为C=1000+0.5Y，投资需求函数为I=2500-240r，实际货币需求函数为M/P=0.5Y-260r，货币供给为M=1000，充分就业产出为Ȳ=4600。\n\n试求：\n（1）IS曲线、LM曲线和总需求函数。\n（2）经济实现充分就业产出时的价格P和利率r。\n（3）如果政府将货币供给M增加到1200，总产出Y和利率r的短期均衡值是多少？长期均衡值是多少？\n（4）根据以上结论，简述长期总需求与总供给的均衡及其政策含义。",
                "answer": "（1）IS曲线：Y = C+I = 1000+0.5Y+2500-240r\n0.5Y = 3500-240r，即 Y = 7000-480r\n\nLM曲线：1000/P = 0.5Y-260r\n\n总需求：联立IS-LM消去r\n由IS得r=(7000-Y)/480，代入LM\n1000/P = 0.5Y - 260×(7000-Y)/480\n解得：Y = 3640 + 960/P\n\n（2）充分就业时Y=4600\n4600 = 3640 + 960/P，得P=1\nr = (7000-4600)/480 = 5\n\n（3）M=1200时，短期：LM变为1200/P=0.5Y-260r\n当P=1时，联立IS得Y=4840，r=4.5\n长期：Y回到4600，由IS得r=5，由LM得P=1.2\n\n（4）长期均衡中，货币政策只影响价格水平，不影响实际产出。政策含义：长期中货币政策是中性的，财政政策同样只影响利率和价格。",
                "analysis": "本题综合考查IS-LM模型和总需求曲线，关键是联立方程求解。",
                "year": "2012",
                "id": 201201,
                "date": "2026-02-14"
            },
            {
                "type": "macro",
                "title": "14年真题：IS-LM模型与需求管理政策",
                "content": "已知某经济中，IS曲线为Y=200-5r+5G，LM曲线为Y=1.25r+5Ms，总供给为Y=210。\n\n试求：\n（1）当G=5，Ms=40时，商品市场和货币市场的一般均衡收入是多少？\n（2）该一般均衡收入是否达到充分就业水平？\n（3）如果不是，如何用财政政策来实现充分就业？如何用货币政策来实现充分就业？\n（4）结合以上结论简要说明什么是需求管理政策。",
                "answer": "（1）G=5，Ms=40时：\nIS：Y = 200-5r+25 = 225-5r\nLM：Y = 1.25r+200\n联立：225-5r = 1.25r+200，得r=4，Y=205\n\n（2）Y=205 < 210，未达到充分就业。\n\n（3）财政政策：使IS右移至Y=210\n210 = 200-5r+5G，且Y=1.25r+200，得r=8\n210 = 200-40+5G，G=10，需增加政府支出5\n\n货币政策：使LM右移至Y=210\n210 = 1.25r+5Ms，且Y=225-5r，得r=3\n210 = 3.75+5Ms，Ms=41.25，需增加货币供给1.25\n\n（4）需求管理政策：政府通过调节财政政策和货币政策来影响总需求，实现充分就业和稳定物价的目标。",
                "analysis": "本题考查IS-LM模型和财政货币政策的运用，理解需求管理政策的含义。",
                "year": "2014",
                "id": 201401,
                "date": "2026-02-14"
            },
            {
                "type": "macro",
                "title": "15年真题：IS-LM模型与挤出效应",
                "content": "考虑某封闭经济满足以下条件：消费C=40+0.8(Y-T)；投资I=140-10r；政府税收T=50；政府支出G=50；实际货币需求L=0.2Y-5r；名义货币供给M=100；价格水平P。\n\n（1）求IS曲线。\n（2）求LM曲线。\n（3）求总需求曲线和价格水平P=1时的总产出。\n（4）在第（3）问的条件下，如果政府支出G从50增加到80，政府支出的增加挤占了多少私人投资？\n（5）解释什么叫挤出效应，并说明产生这一效应的原因。",
                "answer": "（1）IS：Y = C+I+G = 40+0.8(Y-50)+140-10r+50\nY = 230+0.8Y-40-10r\n0.2Y = 190-10r，即 Y = 950-50r\n\n（2）LM：M/P = L，100/P = 0.2Y-5r\n\n（3）由IS得r=(950-Y)/50，代入LM\n100/P = 0.2Y - 5×(950-Y)/50 = 0.2Y - 95 + 0.1Y = 0.3Y - 95\n总需求：Y = (100/P + 95)/0.3\n当P=1时，Y = 650\n\n（4）G=80时，新IS：Y = 40+0.8(Y-50)+140-10r+80 = 1100-50r\n联立原LM（P=1）：100 = 0.2Y-5r，Y=500+25r\n1100-50r = 500+25r，r=8，Y=700\n原投资I=140-10×3=110，新投资I=140-10×8=60\n挤出投资 = 110-60 = 50\n\n（5）挤出效应：政府支出增加导致利率上升，从而减少私人投资的现象。原因是政府支出增加→总需求增加→货币需求增加→利率上升→投资减少。",
                "analysis": "本题重点考查挤出效应的计算和分析，需要理解其产生机制。",
                "year": "2015",
                "id": 201501,
                "date": "2026-02-14"
            },
            {
                "type": "macro",
                "title": "17年真题：IS-LM模型与投资函数变动",
                "content": "假定某封闭经济满足以下条件：消费函数C=300+0.5(Y-100)，投资函数I=200-1000r，政府购买G=100，实际货币需求函数L=0.5Y-1000r，名义货币供给Ms=450，价格水平P=1。\n\n（1）求IS曲线和LM曲线。\n（2）求均衡产出和利率水平。\n（3）其他条件不变，投资函数由I=200-1000r变为I=200-1500r，求均衡产出和利率水平。\n（4）结合以上计算结果，简要说明投资函数变动导致产出和利率水平变动的机理。",
                "answer": "（1）IS：Y = 300+0.5(Y-100)+200-1000r+100 = 550+0.5Y-1000r\n0.5Y = 550-1000r，即 Y = 1100-2000r\n\nLM：450/1 = 0.5Y-1000r，即 Y = 900+2000r\n\n（2）联立：1100-2000r = 900+2000r\n4000r = 200，r=0.05=5%，Y=1000\n\n（3）新投资函数：I=200-1500r\n新IS：Y = 300+0.5(Y-100)+200-1500r+100 = 550+0.5Y-1500r\n0.5Y = 550-1500r，Y = 1100-3000r\n\n联立LM：1100-3000r = 900+2000r\n5000r = 200，r=0.04=4%，Y=980\n\n（4）投资对利率更敏感（系数从1000增至1500），使IS曲线变得更平坦。在相同货币政策下，利率下降（5%→4%），但产出也下降（1000→980）。原因是投资需求更敏感时，任何利率变化都会引起更大的投资变动，在IS-LM框架下达到新的均衡。",
                "analysis": "本题考查IS曲线斜率变化对均衡的影响，理解投资敏感性的作用。",
                "year": "2017",
                "id": 201701,
                "date": "2026-02-14"
            },
            {
                "type": "macro",
                "title": "19年真题：IS-LM模型与税收政策",
                "content": "假设某经济体满足以下条件：消费C=60+0.8Yd，税收T=100，投资I=100-2r，政府购买G=80，实际货币需求为L=0.2Y-8r，名义货币供给为M=120，价格水平为P。\n\n试求：\n（1）IS曲线和LM曲线。\n（2）总需求曲线。\n（3）P=1时的总产出和利率水平。\n（4）其他条件不变，政府将税收调整为T=50，总需求曲线会发生什么变化？如果充分就业的产出水平Yf=900，通过减税能否实现该充分就业产出水平？\n（5）根据以上计算，简要分析减税对总产出、价格和利率水平的影响。",
                "answer": "（1）IS：Y = 60+0.8(Y-100)+100-2r+80 = 160+0.8Y-2r\n0.2Y = 160-2r，Y = 800-10r\n\nLM：120/P = 0.2Y-8r\n\n（2）由IS得r=(800-Y)/10=80-0.1Y，代入LM\n120/P = 0.2Y - 8(80-0.1Y) = 0.2Y - 640 + 0.8Y = Y - 640\n总需求：Y = 640 + 120/P\n\n（3）P=1时，Y=760，r=4\n\n（4）T=50时，新IS：Y=60+0.8(Y-50)+100-2r+80=200+0.8Y-2r\nY=1000-10r\n新总需求：Y=760+120/P\n总需求曲线右移。当P=1时，Y=880<900，不能实现充分就业。\n\n（5）减税增加可支配收入，刺激消费，使IS右移；在短期价格不变时，产出和利率都上升；长期中价格会上升，实际货币供给减少，LM左移，最终产出回到自然率水平，价格和利率上升。",
                "analysis": "本题考查税收政策和总需求曲线的移动，理解财政政策的作用机制。",
                "year": "2019",
                "id": 201901,
                "date": "2026-02-14"
            },
            {
                "type": "macro",
                "title": "21年真题：IS-LM模型与货币政策",
                "content": "什么是货币市场的均衡条件？已知消费函数C=100+0.8Y，投资函数为I=200-6r。货币需求为L=0.2Y-4r，货币供给为M=200，价格水平P=1，写出IS-LM模型的具体方程，并求解均衡的国民收入（Y）与均衡的利率（r）；如果货币供给由200增加到240，均衡的国民收入（Y）会如何变动？请简要说明引起这种变化的机制？",
                "answer": "（1）货币市场均衡条件：实际货币供给=实际货币需求，即M/P=L(Y,r)\n\n（2）IS：Y = 100+0.8Y+200-6r\n0.2Y = 300-6r，Y = 1500-30r\n\nLM（M=200，P=1）：200 = 0.2Y-4r，Y = 1000+20r\n\n联立：1500-30r = 1000+20r\n500 = 50r，r=10%，Y=1200\n\n（3）M=240时，新LM：240=0.2Y-4r，Y=1200+20r\n联立IS：1500-30r = 1200+20r\n300 = 50r，r=6%，Y=1320\n\n国民收入从1200增加到1320，增加120。\n\n（4）机制：货币供给增加→利率下降（10%→6%）→投资增加→通过乘数效应→总产出增加。",
                "analysis": "本题考查货币政策传导机制，理解货币供给变化如何通过利率影响投资和产出。",
                "year": "2021",
                "id": 202101,
                "date": "2026-02-14"
            },
            {
                "type": "macro",
                "title": "23年真题：新古典增长模型",
                "content": "基于新古典增长模型，假设生产函数为：Y=K^0.5L^0.5，其中Y代表总产出，K代表总资本存量，L代表人口或劳动数量，假设人口或劳动数量L以n=0.07的速度增长，资本K以δ=0.03的速度折旧。\n\n试求：\n（1）资本与劳动的收入份额各占多少？\n（2）写出新古典增长模型的基本方程。\n（3）如果储蓄率s=0.2，稳定状态下人均资本和人均产出的值各是多少？\n（4）稳定状态下人均产出和总产出的增长率各是多少？",
                "answer": "（1）柯布-道格拉斯生产函数Y=K^αL^(1-α)中，要素收入份额等于其产出弹性。\n资本收入份额=α=0.5，劳动收入份额=1-α=0.5\n\n（2）新古典增长模型基本方程（人均形式）：\nΔk = sf(k) - (n+δ)k\n其中k=K/L为人均资本，f(k)=y=Y/L=k^0.5\n即 Δk = sk^0.5 - (n+δ)k\n\n（3）稳态时Δk=0：sk^0.5 = (n+δ)k\n0.2k^0.5 = (0.07+0.03)k = 0.1k\nk^0.5 = 2，k*=4\ny* = k*^0.5 = 2\n\n（4）稳态时：\n人均产出增长率 = 0（稳态定义）\n总产出增长率 = 人口增长率n = 0.07 = 7%",
                "analysis": "本题考查新古典增长模型（索洛模型），关键是理解稳态条件和增长率的决定。",
                "year": "2023",
                "id": 202301,
                "date": "2026-02-14"
            }
        ];
        
        this.calcQuestions = defaultQuestions;
        this.saveCalcQuestions();
        this.renderCalcQuestions();
        console.log('✅ 已加载经济学计算题真题库（' + defaultQuestions.length + '道）');
    },

    saveCalcQuestions() {
        localStorage.setItem('studyx_calc_questions', JSON.stringify(this.calcQuestions));
    },

    renderCalcQuestions() {
        const container = document.getElementById('calc-question-list');
        if (!container) return;

        let questions = this.calcQuestions;
        if (this.currentCalcFilter !== 'all') {
            questions = questions.filter(q => q.type === this.currentCalcFilter);
        }

        if (questions.length === 0) {
            container.innerHTML = `
                <div class="calc-empty">
                    <span class="empty-icon">📚</span>
                    <p>暂无计算题</p>
                    <p class="empty-tip">支持导入经济学计算题（含题目、答案、解析）</p>
                    <button onclick="app.showAddCalcModal()">添加第一道试题</button>
                </div>
            `;
            return;
        }

        container.innerHTML = questions.map((q, index) => {
            const masteryIcons = { none: '', fuzzy: '🤔', mastered: '✅' };
            const masteryClass = q.mastery || 'none';
            return `
            <div class="calc-question-item" onclick="app.openCalcQuestion(${index})">
                <div class="calc-question-header">
                    <span class="calc-question-type">${this.getCalcTypeName(q.type)}</span>
                    <div class="calc-question-badges">
                        <span class="calc-mastery-badge ${masteryClass}">${masteryIcons[masteryClass]}</span>
                        <span style="font-size:12px;color:var(--text-muted)">${q.year || ''}年</span>
                    </div>
                </div>
                <div class="calc-question-title">${q.title}</div>
                <div class="calc-question-preview">${q.content}</div>
                <div class="calc-question-meta">
                    <span>📝 ${q.answer ? '已有答案' : '暂无答案'}</span>
                    <span>📖 ${q.analysis ? '已有解析' : '暂无解析'}</span>
                </div>
            </div>
        `}).join('');
    },

    getCalcTypeName(type) {
        const names = {
            micro: '微观经济学',
            macro: '宏观经济学',
            fiscal: '财政学',
            monetary: '货币银行'
        };
        return names[type] || type;
    },

    showAddCalcModal() {
        // 创建添加计算题弹窗
        let modal = document.getElementById('calc-add-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'calc-add-modal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content" style="max-width:600px;max-height:85vh;overflow-y:auto;">
                    <div class="modal-header">
                        <h3>➕ 新建计算题</h3>
                        <button class="close-btn" onclick="app.closeCalcModal()">×</button>
                    </div>
                    <div class="modal-body" style="padding:20px;">
                        <div style="margin-bottom:16px;">
                            <label style="display:block;margin-bottom:6px;font-size:13px;color:var(--text-secondary);">题目类型</label>
                            <select id="calc-type-input" style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--bg-secondary);color:var(--text-primary);">
                                <option value="micro">微观经济学</option>
                                <option value="macro">宏观经济学</option>
                                <option value="fiscal">财政学</option>
                                <option value="monetary">货币银行</option>
                            </select>
                        </div>
                        <div style="margin-bottom:16px;">
                            <label style="display:block;margin-bottom:6px;font-size:13px;color:var(--text-secondary);">题目标题</label>
                            <input type="text" id="calc-title-input" placeholder="输入题目标题..." style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--bg-secondary);color:var(--text-primary);">
                        </div>
                        <div style="margin-bottom:16px;">
                            <label style="display:block;margin-bottom:6px;font-size:13px;color:var(--text-secondary);">题目内容</label>
                            <textarea id="calc-content-input" rows="5" placeholder="输入题目内容..." style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--bg-secondary);color:var(--text-primary);resize:vertical;"></textarea>
                        </div>
                        <div style="margin-bottom:16px;">
                            <label style="display:block;margin-bottom:6px;font-size:13px;color:var(--text-secondary);">答案</label>
                            <input type="text" id="calc-answer-input" placeholder="输入答案..." style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--bg-secondary);color:var(--text-primary);">
                        </div>
                        <div style="margin-bottom:20px;">
                            <label style="display:block;margin-bottom:6px;font-size:13px;color:var(--text-secondary);">解析</label>
                            <textarea id="calc-analysis-input" rows="3" placeholder="输入解析..." style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--bg-secondary);color:var(--text-primary);resize:vertical;"></textarea>
                        </div>
                        <button onclick="app.saveCalcQuestion()" style="width:100%;padding:12px;border:none;border-radius:8px;background:var(--primary);color:white;font-size:15px;cursor:pointer;">保存试题</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        modal.style.display = 'flex';
    },

    closeCalcModal() {
        const modal = document.getElementById('calc-add-modal');
        if (modal) modal.style.display = 'none';
    },

    saveCalcQuestion() {
        const type = document.getElementById('calc-type-input').value;
        const title = document.getElementById('calc-title-input').value.trim();
        const content = document.getElementById('calc-content-input').value.trim();
        const answer = document.getElementById('calc-answer-input').value.trim();
        const analysis = document.getElementById('calc-analysis-input').value.trim();

        if (!title || !content) {
            alert('请填写题目标题和内容');
            return;
        }

        this.calcQuestions.push({
            type,
            title,
            content,
            answer,
            analysis,
            date: new Date().toLocaleDateString('zh-CN'),
            id: Date.now()
        });

        this.saveCalcQuestions();
        this.renderCalcQuestions();
        this.closeCalcModal();
        this.showToast('✅ 试题已保存');
    },

    openCalcQuestion(index) {
        this.currentCalcIndex = index;
        const q = this.calcQuestions[index];
        const modal = document.getElementById('calc-detail-modal');
        const body = document.getElementById('calc-detail-body');
        const title = document.getElementById('calc-detail-title');
        
        if (!modal || !body) return;
        
        const mastery = q.mastery || 'none';
        const masteryOptions = [
            { key: 'none', label: '未掌握', icon: '❌', color: '#ef4444' },
            { key: 'fuzzy', label: '模糊', icon: '🤔', color: '#f59e0b' },
            { key: 'mastered', label: '已掌握', icon: '✅', color: '#10b981' }
        ];
        
        title.textContent = q.title;
        body.innerHTML = `
            <div class="calc-detail-section question-section">
                <div class="calc-detail-header-row">
                    <div class="calc-detail-type">${this.getCalcTypeName(q.type)} · ${q.year || ''}年真题</div>
                    <div class="calc-mastery-selector">
                        ${masteryOptions.map(opt => `
                            <button class="calc-mastery-btn ${mastery === opt.key ? 'active' : ''}" 
                                    onclick="app.setCalcMastery(${index}, '${opt.key}')"
                                    style="--mastery-color: ${opt.color}"
                                    title="${opt.label}">
                                <span>${opt.icon}</span>
                                <span>${opt.label}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="calc-detail-content">${this.formatCalcContent(q.content)}</div>
            </div>
            
            <div class="calc-answer-toggle" onclick="app.toggleCalcAnswer(this)">
                <span class="toggle-icon">👁️</span>
                <span class="toggle-text">点击查看参考答案</span>
            </div>
            
            <div class="calc-answer-content" id="calc-answer-content" style="display: none;">
                <div class="calc-detail-section answer-section">
                    <div class="calc-section-title">📝 参考答案</div>
                    <div class="calc-detail-content">${this.formatCalcContent(q.answer || '暂无答案')}</div>
                </div>
                
                <div class="calc-detail-section analysis-section">
                    <div class="calc-section-title">💡 解析点评</div>
                    <div class="calc-detail-content">${this.formatCalcContent(q.analysis || '暂无解析')}</div>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },

    setCalcMastery(index, level) {
        if (this.calcQuestions[index]) {
            this.calcQuestions[index].mastery = level;
            this.saveCalcQuestions();
            // 重新渲染弹窗中的状态按钮
            this.openCalcQuestion(index);
            // 刷新列表
            this.renderCalcQuestions();
        }
    },

    toggleCalcAnswer(btn) {
        const content = document.getElementById('calc-answer-content');
        const text = btn.querySelector('.toggle-text');
        const icon = btn.querySelector('.toggle-icon');
        
        if (content.style.display === 'none') {
            content.style.display = 'block';
            text.textContent = '点击隐藏参考答案';
            icon.textContent = '🙈';
            btn.classList.add('active');
            // 滚动到答案区域
            setTimeout(() => {
                content.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            content.style.display = 'none';
            text.textContent = '点击查看参考答案';
            icon.textContent = '👁️';
            btn.classList.remove('active');
        }
    },

    closeCalcDetailModal() {
        const modal = document.getElementById('calc-detail-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    },

    initCalcModalEvents() {
        // 点击遮罩关闭弹窗
        const modal = document.getElementById('calc-detail-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeCalcDetailModal();
                }
            });
            // ESC键关闭
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.style.display === 'flex') {
                    this.closeCalcDetailModal();
                }
            });
        }
    },

    formatCalcContent(content) {
        // 将换行符转换为HTML，合并多个换行符，保留公式格式
        return content
            .replace(/\n{3,}/g, '\n\n')  // 3个及以上换行符合并为2个
            .replace(/\n/g, '<br>')
            .replace(/（(\d+)）/g, '<strong>（$1）</strong>')
            .replace(/\^(\d+)/g, '<sup>$1</sup>')
            .replace(/_([^_]+)_/g, '<sub>$1</sub>');
    },

    showImportCalcModal() {
        // 导入计算题
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const questions = JSON.parse(event.target.result);
                        if (Array.isArray(questions)) {
                            this.calcQuestions = [...this.calcQuestions, ...questions];
                            this.saveCalcQuestions();
                            this.renderCalcQuestions();
                            this.showToast(`✅ 成功导入 ${questions.length} 道试题`);
                        }
                    } catch (err) {
                        alert('导入失败，请检查文件格式');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    },

    exportCalcQuestions() {
        // 导出计算题
        const data = JSON.stringify(this.calcQuestions, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `经济计算题_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('✅ 试题已导出');
    },

    // ========== 英语阅读理解页面 ==========
    readingPapers: [],
    currentReadingFilter: 'all',

    initReading() {
        this.loadReadingPapers();
        this.renderReadingPapers();
    },

    loadReadingPapers() {
        // 从localStorage加载英语试卷
        const saved = localStorage.getItem('studyx_reading_papers');
        if (saved) {
            this.readingPapers = JSON.parse(saved);
        }
    },

    saveReadingPapers() {
        localStorage.setItem('studyx_reading_papers', JSON.stringify(this.readingPapers));
    },

    renderReadingPapers() {
        const container = document.getElementById('reading-paper-list');
        if (!container) return;

        let papers = this.readingPapers;
        if (this.currentReadingFilter !== 'all') {
            if (this.currentReadingFilter === 'older') {
                papers = papers.filter(p => parseInt(p.year) < 2022);
            } else {
                papers = papers.filter(p => p.year === this.currentReadingFilter);
            }
        }

        if (papers.length === 0) {
            container.innerHTML = `
                <div class="reading-empty">
                    <span class="empty-icon">📖</span>
                    <p>暂无英语试卷</p>
                    <p class="empty-tip">支持导入13-25年申硕英语真题（含阅读理解、答案、解析）</p>
                    <button onclick="app.showImportReadingModal()">导入试卷</button>
                </div>
            `;
            return;
        }

        container.innerHTML = papers.map((p, index) => `
            <div class="reading-paper-item" onclick="app.openReadingPaper(${index})">
                <div class="reading-paper-header">
                    <span class="reading-paper-year">${p.year}年</span>
                    <span class="reading-paper-status ${p.completed ? 'done' : 'unread'}">${p.completed ? '✓ 已做' : '未做'}</span>
                </div>
                <div class="reading-paper-title">${p.title}</div>
                <div class="reading-paper-desc">${p.desc || '申硕英语阅读理解真题'}</div>
                <div class="reading-paper-meta">
                    <span>📌 ${p.articles || 4}篇阅读</span>
                    <span>🕐 约${p.time || 60}分钟</span>
                    <span>📝 ${p.questions || 20}道题</span>
                </div>
            </div>
        `).join('');
    },

    showAddReadingModal() {
        // 新建英语试卷
        const year = prompt('请输入年份（如2025）:');
        if (year && year.trim()) {
            const title = prompt('请输入试卷标题:');
            if (title && title.trim()) {
                this.readingPapers.push({
                    year: year.trim(),
                    title: title.trim(),
                    desc: '申硕英语阅读理解',
                    articles: 4,
                    questions: 20,
                    time: 60,
                    completed: false,
                    date: new Date().toLocaleDateString('zh-CN'),
                    id: Date.now()
                });
                this.saveReadingPapers();
                this.renderReadingPapers();
                this.showToast('✅ 试卷已添加');
            }
        }
    },

    openReadingPaper(index) {
        const p = this.readingPapers[index];
        // 打开试卷详情（简化版）
        const doIt = confirm(`试卷：${p.title}\n\n是否开始练习？`);
        if (doIt) {
            p.completed = true;
            this.saveReadingPapers();
            this.renderReadingPapers();
            this.showToast('📖 开始练习！');
        }
    },

    showImportReadingModal() {
        // 导入英语试卷
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const papers = JSON.parse(event.target.result);
                        if (Array.isArray(papers)) {
                            this.readingPapers = [...this.readingPapers, ...papers];
                            this.saveReadingPapers();
                            this.renderReadingPapers();
                            this.showToast(`✅ 成功导入 ${papers.length} 套试卷`);
                        }
                    } catch (err) {
                        alert('导入失败，请检查文件格式');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    },

    exportReadingPapers() {
        // 导出英语试卷
        const data = JSON.stringify(this.readingPapers, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `英语阅读真题_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('✅ 试卷已导出');
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// 点击弹窗外部关闭
const knowledgeModal = document.getElementById('knowledge-modal');
if (knowledgeModal) {
    knowledgeModal.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            app.closeModal();
        }
    });
}

// 视频弹窗外部关闭
const videoModal = document.getElementById('video-modal');
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            app.closeVideoModal();
        }
    });
}
