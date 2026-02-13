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
        // 导航切换
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                this.switchPage(page);
            });
        });

        // 模块筛选
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderKnowledgeGrid(btn.dataset.module);
            });
        });

        // 搜索
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.renderKnowledgeGrid('all', e.target.value);
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
        // 更新导航
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });

        // 更新页面内容
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const pageEl = document.getElementById(`page-${page}`);
        if (pageEl) {
            pageEl.classList.add('active');
        } else {
            console.error(`Page element not found: page-${page}`);
            return;
        }

        // 更新标题
        const titles = {
            today: '今日任务',
            econlaw: '经济法学习',
            'study-detail': '知识点学习',
            vocabulary: '英语单词',
            quiz: '记忆抽测',
            review: '复习中心',
            stats: '学习数据',
            schedule: '学习计划',
            videos: '视频课程',
            daily: '学习日报',
            reports: '周报月报'
        };
        document.getElementById('page-title').textContent = titles[page];

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
    renderKnowledgeGrid(module = 'all', search = '') {
        const container = document.getElementById('knowledge-grid');
        let knowledge = studyData.knowledge;

        if (module !== 'all') {
            knowledge = knowledge.filter(k => k.module === module);
        }

        if (search) {
            knowledge = knowledge.filter(k => 
                k.title.includes(search) || 
                (Array.isArray(k.content) ? k.content.join('').includes(search) : k.content.includes(search))
            );
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
        const names = { term: '名词解释', choice: '选择题', short: '简答题', all: '全部' };
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
            <div class="modal-header">
                <span class="modal-type" style="background: ${moduleInfo.color}">${this.getTypeName(item.type)}</span>
                <h3 class="modal-title">${item.title}</h3>
                <p class="modal-meta">${moduleInfo.name} ${item.examYears ? `| 真题：${item.examYears.join('、')}年` : ''}</p>
            </div>
            <div class="modal-section">
                <h4>📝 标准答案</h4>
                ${content}
            </div>
            ${item.tip ? `
                <div class="modal-section">
                    <h4>💡 记忆技巧</h4>
                    <p>${item.tip}</p>
                </div>
            ` : ''}
            <div class="modal-section">
                <h4>🎯 学习操作</h4>
                <div class="feedback-buttons" style="justify-content: flex-start;">
                    <button class="feedback-btn fuzzy" onclick="app.studyKnowledge('${id}', 'fuzzy'); app.closeModal()">
                        <span>😵</span> 没记住
                    </button>
                    <button class="feedback-btn normal" onclick="app.studyKnowledge('${id}', 'normal'); app.closeModal()">
                        <span>😐</span> 一般
                    </button>
                    <button class="feedback-btn mastered" onclick="app.studyKnowledge('${id}', 'mastered'); app.closeModal()">
                        <span>😎</span> 已掌握
                    </button>
                </div>
            </div>
        `;

        document.getElementById('knowledge-modal').style.display = 'flex';
    },

    // 关闭弹窗
    closeModal() {
        document.getElementById('knowledge-modal').style.display = 'none';
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

    // 快速开始 - 进入经济法学习页面
    startStudy() {
        this.switchPage('econlaw');
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
        document.getElementById('exam-countdown').textContent = daysLeft;
        
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
        const detail = document.getElementById(`daily-detail-${date}`);
        const item = detail.closest('.daily-item');
        
        if (detail.style.display === 'none') {
            // 关闭其他展开项
            document.querySelectorAll('.daily-detail').forEach(d => d.style.display = 'none');
            document.querySelectorAll('.daily-item').forEach(i => i.classList.remove('active'));
            
            detail.style.display = 'block';
            item.classList.add('active');
        } else {
            detail.style.display = 'none';
            item.classList.remove('active');
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
    },

    // 切换词汇等级
    switchVocabularyLevel(level) {
        if (!['basic', 'advanced', 'phrase'].includes(level)) {
            console.warn('无效的词汇等级:', level);
            return;
        }
        
        // 设置当前等级
        this.currentVocabLevel = level;
        
        // 重置为第一组
        this.currentVocabGroup = 1;
        this.currentWordIndex = 0;
        
        // 更新等级标签显示
        const levelNames = { basic: '基础词汇', advanced: '高级词汇', phrase: '词组搭配' };
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
        const container = document.getElementById('vocab-card-container');
        if (!container) return;
        
        // 获取当前组的单词
        let words = [];
        if (this.currentVocabLevel === 'basic') {
            words = vocabularyData.basicVocabulary[this.currentVocabGroup] || [];
        } else if (this.currentVocabLevel === 'advanced') {
            // 高级词汇数据待扩展，使用基础词汇作为示例
            words = vocabularyData.basicVocabulary[this.currentVocabGroup % 6 + 1] || [];
        } else if (this.currentVocabLevel === 'phrase') {
            words = vocabularyData.phrases[this.currentVocabGroup] || [];
        }
        
        this.currentGroupWords = words;
        
        if (words.length === 0) {
            container.innerHTML = `
                <div class="vocab-card">
                    <div class="vocab-empty">
                        <span class="empty-icon">📚</span>
                        <p>暂无词汇数据</p>
                    </div>
                </div>
            `;
            return;
        }
        
        const currentWord = words[this.currentWordIndex];
        if (!currentWord) {
            this.currentWordIndex = 0;
            return this.renderCurrentWord();
        }
        
        // 更新单词显示
        const wordEl = document.getElementById('current-word');
        const phoneticEl = document.getElementById('current-phonetic');
        const meaningEl = document.getElementById('current-meaning');
        const progressEl = document.getElementById('vocab-progress-text');
        
        if (wordEl) wordEl.textContent = currentWord.word || currentWord.phrase || '';
        if (phoneticEl) phoneticEl.textContent = currentWord.phonetic || '';
        if (meaningEl) meaningEl.textContent = currentWord.meaning || '';
        if (progressEl) progressEl.textContent = `${this.currentWordIndex + 1} / ${words.length}`;
        
        // 更新相似词显示
        const similarEl = document.getElementById('similar-words');
        if (similarEl && currentWord.word) {
            const similarWords = vocabularyData.similarWords[currentWord.word];
            if (similarWords) {
                similarEl.innerHTML = `
                    <span class="similar-label">相似词：</span>
                    <span class="similar-list">${similarWords.join(', ')}</span>
                `;
                similarEl.style.display = 'block';
            } else {
                similarEl.style.display = 'none';
            }
        }
        
        // 重置显示状态
        const meaningSection = document.getElementById('meaning-section');
        const showMeaningBtn = document.getElementById('show-meaning-btn');
        const feedbackBtns = document.getElementById('feedback-btns');
        
        if (meaningSection) meaningSection.style.display = 'none';
        if (showMeaningBtn) showMeaningBtn.style.display = 'inline-block';
        if (feedbackBtns) feedbackBtns.style.display = 'none';
    },

    // 显示单词释义
    showWordMeaning() {
        const meaningSection = document.getElementById('meaning-section');
        const showMeaningBtn = document.getElementById('show-meaning-btn');
        const feedbackBtns = document.getElementById('feedback-btns');
        
        if (meaningSection) meaningSection.style.display = 'block';
        if (showMeaningBtn) showMeaningBtn.style.display = 'none';
        if (feedbackBtns) feedbackBtns.style.display = 'flex';
    },

    // 标记单词学习状态
    markWord(status) {
        const currentWord = this.currentGroupWords[this.currentWordIndex];
        if (!currentWord) return;
        
        const wordKey = currentWord.word || currentWord.phrase;
        
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
        saveVocabularyData();
        
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
            const maxGroups = vocabularyData.levels[this.currentVocabLevel]?.groups || 130;
            if (this.currentVocabGroup < maxGroups) {
                this.currentVocabGroup++;
                this.initGroupSelector();
            }
        }
        
        // 更新统计并渲染下一个单词
        this.updateVocabStats();
        this.renderCurrentWord();
    },

    // 播放单词发音
    playWordSound() {
        const currentWord = this.currentGroupWords[this.currentWordIndex];
        if (!currentWord) return;
        
        const word = currentWord.word || currentWord.phrase;
        if (!word) return;
        
        // 使用 Web Speech API 播放发音
        if ('speechSynthesis' in window) {
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
        const totalWords = Object.keys(userVocabularyProgress).length;
        const newWords = Object.values(userVocabularyProgress).filter(p => p.status === 'new').length;
        const learningWords = Object.values(userVocabularyProgress).filter(p => p.status === 'learning').length;
        const masteredWords = Object.values(userVocabularyProgress).filter(p => p.status === 'mastered').length;
        
        // 更新统计显示
        const totalEl = document.getElementById('vocab-total');
        const newEl = document.getElementById('vocab-new');
        const learningEl = document.getElementById('vocab-learning');
        const masteredEl = document.getElementById('vocab-mastered');
        
        if (totalEl) totalEl.textContent = totalWords;
        if (newEl) newEl.textContent = newWords;
        if (learningEl) learningEl.textContent = learningWords;
        if (masteredEl) masteredEl.textContent = masteredWords;
    },

    // 初始化组选择器
    initGroupSelector() {
        const selector = document.getElementById('group-selector');
        if (!selector) return;
        
        const levelConfig = vocabularyData.levels[this.currentVocabLevel];
        if (!levelConfig) return;
        
        const totalGroups = levelConfig.groups;
        const options = [];
        
        // 生成组选项（每10组一个选项，避免过多）
        const batchSize = 10;
        for (let i = 1; i <= totalGroups; i += batchSize) {
            const end = Math.min(i + batchSize - 1, totalGroups);
            if (i === end) {
                options.push(`<option value="${i}">第${i}组</option>`);
            } else {
                options.push(`<option value="${i}">第${i}-${end}组</option>`);
            }
        }
        
        selector.innerHTML = options.join('');
        selector.value = this.currentVocabGroup;
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
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    app.init();
    
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
});
