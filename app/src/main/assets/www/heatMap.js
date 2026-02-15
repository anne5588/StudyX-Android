// ===== 学习热力图模块 =====
// 可视化展示学习活跃度，类似 GitHub Contributions

const heatMap = {
    // 配置
    config: {
        weeks: 20,          // 显示多少周
        cellSize: 14,       // 格子大小
        cellGap: 3,         // 格子间距
        colors: {
            0: '#1e293b',   // 无学习
            1: '#0e4429',   // 轻度学习
            2: '#006d32',   // 中度学习
            3: '#26a641',   // 积极学习
            4: '#39d353'    // 高度学习
        }
    },
    
    // 初始化
    init() {
        console.log('[HeatMap] 初始化');
        // 在统计页面添加热力图
        this.addHeatMapToStatsPage();
    },
    
    // 在统计页面添加热力图
    addHeatMapToStatsPage() {
        // 等待页面加载完成
        const checkInterval = setInterval(() => {
            const statsPage = document.getElementById('page-stats');
            if (statsPage) {
                clearInterval(checkInterval);
                this.createHeatMapSection(statsPage);
            }
        }, 1000);
    },
    
    // 创建热力图区域
    createHeatMapSection(statsPage) {
        // 检查是否已存在
        if (document.getElementById('heatmap-section')) {
            return;
        }
        
        const section = document.createElement('div');
        section.id = 'heatmap-section';
        section.className = 'heatmap-section';
        section.innerHTML = `
            <div class="heatmap-header">
                <h4>📅 学习热力图</h4>
                <div class="heatmap-legend">
                    <span>少</span>
                    <div class="legend-item" style="background: #1e293b;"></div>
                    <div class="legend-item" style="background: #0e4429;"></div>
                    <div class="legend-item" style="background: #006d32;"></div>
                    <div class="legend-item" style="background: #26a641;"></div>
                    <div class="legend-item" style="background: #39d353;"></div>
                    <span>多</span>
                </div>
            </div>
            <div class="heatmap-container" id="heatmap-container"></div>
            <div class="heatmap-stats" id="heatmap-stats"></div>
        `;
        
        // 插入到统计页面（在成就之前）
        const achievementsSection = statsPage.querySelector('.stats-achievements');
        if (achievementsSection) {
            statsPage.insertBefore(section, achievementsSection);
        } else {
            statsPage.appendChild(section);
        }
        
        // 渲染热力图
        this.renderHeatMap();
    },
    
    // 获取学习数据
    getStudyData() {
        const data = {};
        
        // 从 dailyReports 获取
        let dailyReports = null;
        try {
            const saved = localStorage.getItem('dailyReports');
            if (saved) {
                dailyReports = JSON.parse(saved);
            }
        } catch (e) {
            console.error('[HeatMap] 读取 dailyReports 失败:', e);
        }
        
        // 从 userData.dailyReports 获取
        if (!dailyReports) {
            try {
                const userData = localStorage.getItem('userData');
                if (userData) {
                    const parsed = JSON.parse(userData);
                    dailyReports = parsed.dailyReports;
                }
            } catch (e) {
                console.error('[HeatMap] 读取 userData 失败:', e);
            }
        }
        
        // 转换数据格式
        if (dailyReports) {
            Object.keys(dailyReports).forEach(date => {
                const report = dailyReports[date];
                let intensity = 0;
                
                // 计算学习强度
                if (report.studyTime) {
                    const minutes = parseInt(report.studyTime) || 0;
                    if (minutes >= 120) intensity = 4;
                    else if (minutes >= 60) intensity = 3;
                    else if (minutes >= 30) intensity = 2;
                    else if (minutes > 0) intensity = 1;
                }
                
                // 如果有学习记录但没时长，至少标记为1
                if (intensity === 0 && (report.knowledgeLearned || report.vocabLearned)) {
                    intensity = 1;
                }
                
                data[date] = {
                    intensity,
                    ...report
                };
            });
        }
        
        // 补充今天和近期的数据
        const today = new Date().toISOString().split('T')[0];
        if (!data[today] && typeof userData !== 'undefined') {
            // 检查今天是否有学习
            const todayTime = userData.todayStudyTime || 0;
            if (todayTime > 0) {
                data[today] = {
                    intensity: todayTime >= 60 ? 2 : 1,
                    studyTime: todayTime
                };
            }
        }
        
        return data;
    },
    
    // 渲染热力图
    renderHeatMap() {
        const container = document.getElementById('heatmap-container');
        const statsContainer = document.getElementById('heatmap-stats');
        if (!container) return;
        
        const studyData = this.getStudyData();
        const weeks = this.config.weeks;
        const cellSize = this.config.cellSize;
        const cellGap = this.config.cellGap;
        
        // 计算日期范围
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - (weeks * 7));
        
        // 找到开始日期所在的周日
        while (startDate.getDay() !== 0) {
            startDate.setDate(startDate.getDate() - 1);
        }
        
        // 生成热力图 HTML
        let html = '<div class="heatmap-wrapper">';
        
        // 月份标签
        html += '<div class="heatmap-months">';
        let currentMonth = -1;
        for (let i = 0; i < weeks; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + (i * 7));
            const month = date.getMonth();
            if (month !== currentMonth) {
                currentMonth = month;
                const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
                html += `<span class="month-label">${monthNames[month]}</span>`;
            } else {
                html += '<span></span>';
            }
        }
        html += '</div>';
        
        // 星期标签和格子
        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        const shortWeekdays = ['', '一', '', '三', '', '五', '']; // 只显示部分，节省空间
        
        html += '<div class="heatmap-grid-wrapper">';
        
        // 星期标签列
        html += '<div class="heatmap-weekdays">';
        for (let i = 0; i < 7; i++) {
            html += `<div class="weekday-label">${shortWeekdays[i]}</div>`;
        }
        html += '</div>';
        
        // 热力图格子
        html += '<div class="heatmap-grid">';
        
        const today = new Date().toISOString().split('T')[0];
        let totalDays = 0;
        let studyDays = 0;
        let totalIntensity = 0;
        let streak = 0;
        let maxStreak = 0;
        let currentStreak = 0;
        
        // 按周和星期遍历
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            for (let week = 0; week < weeks; week++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + (week * 7) + dayOfWeek);
                const dateStr = date.toISOString().split('T')[0];
                
                const dayData = studyData[dateStr];
                const intensity = dayData ? dayData.intensity : 0;
                const color = this.config.colors[intensity];
                
                // 统计
                if (dateStr <= today) {
                    totalDays++;
                    if (intensity > 0) {
                        studyDays++;
                        totalIntensity += intensity;
                        currentStreak++;
                        maxStreak = Math.max(maxStreak, currentStreak);
                    } else {
                        currentStreak = 0;
                    }
                }
                
                // 生成提示信息
                const tooltipText = this.generateTooltip(dateStr, dayData);
                
                html += `
                    <div class="heatmap-cell" 
                         style="background-color: ${color};"
                         data-date="${dateStr}"
                         data-intensity="${intensity}"
                         title="${tooltipText}">
                    </div>
                `;
            }
        }
        
        html += '</div></div></div>';
        
        container.innerHTML = html;
        
        // 渲染统计信息
        const studyRate = totalDays > 0 ? Math.round((studyDays / totalDays) * 100) : 0;
        const avgIntensity = studyDays > 0 ? (totalIntensity / studyDays).toFixed(1) : 0;
        
        statsContainer.innerHTML = `
            <div class="heatmap-stat-grid">
                <div class="heatmap-stat-item">
                    <span class="stat-value">${studyDays}</span>
                    <span class="stat-label">学习天数</span>
                </div>
                <div class="heatmap-stat-item">
                    <span class="stat-value">${studyRate}%</span>
                    <span class="stat-label">覆盖率</span>
                </div>
                <div class="heatmap-stat-item">
                    <span class="stat-value">${maxStreak}</span>
                    <span class="stat-label">最长连续</span>
                </div>
                <div class="heatmap-stat-item">
                    <span class="stat-value">${avgIntensity}</span>
                    <span class="stat-label">平均强度</span>
                </div>
            </div>
        `;
        
        // 添加点击事件
        container.querySelectorAll('.heatmap-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const date = e.target.dataset.date;
                const intensity = parseInt(e.target.dataset.intensity);
                if (intensity > 0) {
                    this.showDayDetail(date, studyData[date]);
                }
            });
        });
    },
    
    // 生成提示信息
    generateTooltip(dateStr, dayData) {
        const date = new Date(dateStr);
        const dateText = date.toLocaleDateString('zh-CN', { 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        });
        
        if (!dayData || dayData.intensity === 0) {
            return `${dateText}: 无学习记录`;
        }
        
        let text = `${dateText}\\n`;
        
        if (dayData.studyTime) {
            text += `学习时长: ${dayData.studyTime}分钟\\n`;
        }
        
        if (dayData.knowledgeCount) {
            text += `知识点: ${dayData.knowledgeCount}个\\n`;
        }
        
        if (dayData.vocabCount) {
            text += `单词: ${dayData.vocabCount}个\\n`;
        }
        
        const levels = ['', '轻度学习', '中度学习', '积极学习', '高度学习'];
        text += `强度: ${levels[dayData.intensity]}`;
        
        return text;
    },
    
    // 显示某天详情
    showDayDetail(date, dayData) {
        const dateText = new Date(date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
        
        let content = `<h4>${dateText}</h4>`;
        
        if (dayData) {
            content += '<div class="day-detail-content">';
            
            if (dayData.studyTime) {
                content += `<p>⏱️ 学习时长: <strong>${dayData.studyTime} 分钟</strong></p>`;
            }
            
            if (dayData.knowledgeLearned && dayData.knowledgeLearned.length > 0) {
                content += `<p>📚 学习知识点: ${dayData.knowledgeLearned.length} 个</p>`;
            }
            
            if (dayData.vocabLearned && dayData.vocabLearned.length > 0) {
                content += `<p>🔤 学习单词: ${dayData.vocabLearned.length} 个</p>`;
            }
            
            if (dayData.feeling) {
                content += `<p>💭 学习感受: ${dayData.feeling}</p>`;
            }
            
            content += '</div>';
        } else {
            content += '<p>暂无详细记录</p>';
        }
        
        // 使用 app 的弹窗或自己创建
        if (typeof app !== 'undefined' && app.showModal) {
            app.showModal('学习详情', content);
        } else {
            alert(content.replace(/<[^>]*>/g, ''));
        }
    },
    
    // 刷新热力图（切换页面时调用）
    refresh() {
        this.renderHeatMap();
    }
};

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => heatMap.init(), 1500); // 延迟初始化，等待其他模块加载
});

// 导出到全局
window.heatMap = heatMap;
