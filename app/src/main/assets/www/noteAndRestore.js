// ===== StudyX 数据备份与恢复模块 =====

const backupRestore = window.backupRestore = {
    // 备份数据版本号，用于兼容性检查
    BACKUP_VERSION: '1.0',
    
    // 备份文件名前缀
    BACKUP_FILE_PREFIX: 'studyx_backup',
    
    /**
     * 导出备份数据
     * @param {Object} options - 备份选项
     * @param {boolean} options.includeMetadata - 是否包含元数据（版本、时间等）
     * @param {string[]} options.dataTypes - 要备份的数据类型，默认为全部
     * @returns {Object} 备份数据对象
     */
    exportData(options = {}) {
        const {
            includeMetadata = true,
            dataTypes = null // null 表示备份全部
        } = options;
        
        // 获取所有用户数据
        const allData = this._getAllUserData();
        
        // 构建备份数据
        const backupData = {
            version: this.BACKUP_VERSION,
            backupTime: new Date().toISOString(),
            device: this._getDeviceInfo(),
            data: {}
        };
        
        // 过滤需要备份的数据类型
        const dataKeys = dataTypes || Object.keys(allData);
        dataKeys.forEach(key => {
            if (allData.hasOwnProperty(key)) {
                backupData.data[key] = allData[key];
            }
        });
        
        // 计算数据摘要
        backupData.summary = this._generateSummary(backupData.data);
        
        if (!includeMetadata) {
            return backupData.data;
        }
        
        return backupData;
    },
    
    /**
     * 生成备份文件并触发下载
     * @param {Object} options - 备份选项
     */
    downloadBackup(options = {}) {
        const backupData = this.exportData(options);
        const jsonStr = JSON.stringify(backupData, null, 2);
        
        // 生成文件名
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0];
        const timeStr = date.toTimeString().slice(0, 5).replace(':', '');
        const filename = `${this.BACKUP_FILE_PREFIX}_${dateStr}_${timeStr}.json`;
        
        // 创建下载
        this._downloadFile(jsonStr, filename, 'application/json');
        
        return {
            success: true,
            filename,
            size: jsonStr.length,
            timestamp: date.toISOString()
        };
    },
    
    /**
     * 从文件导入备份数据
     * @param {File} file - 选择的文件对象
     * @param {Object} options - 导入选项
     * @param {boolean} options.verifyBeforeImport - 导入前是否验证数据
     * @param {boolean} options.mergeWithExisting - 是否与现有数据合并（false则覆盖）
     * @returns {Promise<Object>} 导入结果
     */
    async importFromFile(file, options = {}) {
        const {
            verifyBeforeImport = true,
            mergeWithExisting = false
        } = options;
        
        try {
            const content = await this._readFile(file);
            const data = JSON.parse(content);
            
            return this.importData(data, { verifyBeforeImport, mergeWithExisting });
        } catch (error) {
            return {
                success: false,
                error: '文件读取失败: ' + error.message
            };
        }
    },
    
    /**
     * 导入备份数据
     * @param {Object} data - 备份数据对象
     * @param {Object} options - 导入选项
     * @returns {Object} 导入结果
     */
    importData(data, options = {}) {
        const {
            verifyBeforeImport = true,
            mergeWithExisting = false
        } = options;
        
        // 验证数据
        if (verifyBeforeImport) {
            const validation = this._validateBackupData(data);
            if (!validation.valid) {
                return {
                    success: false,
                    error: validation.error
                };
            }
        }
        
        // 提取实际数据
        const importData = data.data || data;
        
        // 获取现有数据
        const existingData = this._getAllUserData();
        
        // 合并或覆盖数据
        let finalData;
        if (mergeWithExisting) {
            finalData = this._mergeData(existingData, importData);
        } else {
            finalData = importData;
        }
        
        // 保存数据
        this._saveAllUserData(finalData);
        
        return {
            success: true,
            merged: mergeWithExisting,
            summary: this._generateSummary(finalData),
            importedSummary: this._generateSummary(importData)
        };
    },
    
    /**
     * 验证备份数据
     * @param {Object} data - 要验证的数据
     * @returns {Object} 验证结果
     */
    validateBackup(data) {
        return this._validateBackupData(data);
    },
    
    /**
     * 获取备份数据预览
     * @param {File} file - 备份文件
     * @returns {Promise<Object>} 数据预览信息
     */
    async previewBackup(file) {
        try {
            const content = await this._readFile(file);
            const data = JSON.parse(content);
            
            const validation = this._validateBackupData(data);
            if (!validation.valid) {
                return {
                    valid: false,
                    error: validation.error
                };
            }
            
            const actualData = data.data || data;
            
            return {
                valid: true,
                version: data.version || 'unknown',
                backupTime: data.backupTime || 'unknown',
                device: data.device || {},
                summary: this._generateSummary(actualData),
                dataTypes: Object.keys(actualData)
            };
        } catch (error) {
            return {
                valid: false,
                error: '无法解析备份文件: ' + error.message
            };
        }
    },
    
    /**
     * 生成数据摘要
     * @private
     */
    _generateSummary(data) {
        const summary = {
            totalItems: 0,
            details: {}
        };
        
        if (data.videoProgress) {
            const count = Object.keys(data.videoProgress).length;
            summary.details.videoProgress = count;
            summary.totalItems += count;
        }
        
        if (data.studyRecords) {
            const count = Object.keys(data.studyRecords).length;
            summary.details.studyRecords = count;
            summary.totalItems += count;
        }
        
        if (data.memoryStrength) {
            const count = Object.keys(data.memoryStrength).length;
            summary.details.memoryStrength = count;
            summary.totalItems += count;
        }
        
        if (data.nextReview) {
            const count = Object.keys(data.nextReview).length;
            summary.details.nextReview = count;
            summary.totalItems += count;
        }
        
        if (data.completedTasks) {
            summary.details.completedTasks = data.completedTasks.length;
            summary.totalItems += data.completedTasks.length;
        }
        
        if (data.dailyReports) {
            const count = Object.keys(data.dailyReports).length;
            summary.details.dailyReports = count;
            summary.totalItems += count;
        }
        
        if (data.streakDays !== undefined) {
            summary.details.streakDays = data.streakDays;
        }
        
        if (data.todayStudyTime !== undefined) {
            summary.details.todayStudyTime = data.todayStudyTime + '分钟';
        }
        
        return summary;
    },
    
    /**
     * 验证备份数据格式
     * @private
     */
    _validateBackupData(data) {
        if (!data || typeof data !== 'object') {
            return { valid: false, error: '无效的数据格式' };
        }
        
        // 检查是否有数据内容
        const actualData = data.data || data;
        
        // 检查必需的字段是否存在（至少有一个有效的用户数据字段）
        const validFields = [
            'studyRecords', 'memoryStrength', 'nextReview', 'streakDays',
            'todayStudyTime', 'completedTasks', 'achievements',
            'videoProgress', 'dailyReports', 'weeklyReports', 'monthlyReports'
        ];
        
        const hasValidField = validFields.some(field => actualData.hasOwnProperty(field));
        
        if (!hasValidField) {
            return { valid: false, error: '备份数据不包含有效的学习数据' };
        }
        
        // 版本检查（如果有版本信息）
        if (data.version && data.version !== this.BACKUP_VERSION) {
            console.warn(`备份版本 ${data.version} 与当前版本 ${this.BACKUP_VERSION} 不同，可能存在兼容性问题`);
        }
        
        return { valid: true };
    },
    
    /**
     * 合并数据
     * @private
     */
    _mergeData(existing, imported) {
        const merged = { ...existing };
        
        // 合并对象类型数据（取并集，以较新的为准）
        ['studyRecords', 'memoryStrength', 'nextReview', 'videoProgress'].forEach(key => {
            if (imported[key]) {
                merged[key] = { ...merged[key], ...imported[key] };
            }
        });
        
        // 合并数组类型数据（去重）
        ['completedTasks', 'achievements'].forEach(key => {
            if (imported[key] && Array.isArray(imported[key])) {
                const combined = [...(merged[key] || []), ...imported[key]];
                merged[key] = [...new Set(combined)];
            }
        });
        
        // 合并报告类数据（按日期合并）
        ['dailyReports', 'weeklyReports', 'monthlyReports'].forEach(key => {
            if (imported[key]) {
                merged[key] = { ...merged[key], ...imported[key] };
            }
        });
        
        // 数值类型取较大值
        if (imported.streakDays !== undefined) {
            merged.streakDays = Math.max(merged.streakDays || 0, imported.streakDays);
        }
        if (imported.todayStudyTime !== undefined) {
            merged.todayStudyTime = Math.max(merged.todayStudyTime || 0, imported.todayStudyTime);
        }
        
        return merged;
    },
    
    /**
     * 获取所有用户数据
     * @private
     */
    _getAllUserData() {
        return { ...userData };
    },
    
    /**
     * 保存所有用户数据
     * @private
     */
    _saveAllUserData(data) {
        Object.keys(data).forEach(key => {
            userData[key] = data[key];
        });
        saveUserData();
    },
    
    /**
     * 获取设备信息
     * @private
     */
    _getDeviceInfo() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenSize: `${window.screen.width}x${window.screen.height}`
        };
    },
    
    /**
     * 读取文件内容
     * @private
     */
    _readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('文件读取失败'));
            reader.readAsText(file);
        });
    },
    
    /**
     * 触发文件下载
     * @private
     */
    _downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }
};

// ===== 界面交互功能 =====

const backupRestoreUI = window.backupRestoreUI = {
    /**
     * 初始化备份恢复界面
     */
    init() {
        this._createBackupModal();
        this._bindEvents();
    },
    
    /**
     * 显示备份/恢复弹窗
     */
    showModal() {
        console.log('[Backup] 尝试打开弹窗...');
        
        // 确保弹窗已创建
        if (!document.getElementById('backup-modal')) {
            console.log('[Backup] 创建弹窗...');
            this._createBackupModal();
        }
        
        const modal = document.getElementById('backup-modal');
        if (modal) {
            console.log('[Backup] 显示弹窗');
            modal.style.display = 'flex';
            this._updateCurrentDataInfo();
        } else {
            console.error('[Backup] 弹窗创建失败');
            alert('备份功能初始化失败，请刷新页面重试');
        }
    },
    
    /**
     * 关闭弹窗
     */
    closeModal() {
        const modal = document.getElementById('backup-modal');
        if (modal) {
            modal.style.display = 'none';
            this._clearFileInput();
        }
    },
    
    /**
     * 创建备份弹窗HTML
     * @private
     */
    _createBackupModal() {
        if (document.getElementById('backup-modal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'backup-modal';
        modal.className = 'modal';
        modal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; justify-content: center; align-items: center;';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>💾 数据备份与恢复</h3>
                    <button class="close-btn" onclick="backupRestoreUI.closeModal()">×</button>
                </div>
                
                <div class="modal-body">
                    <!-- 当前数据概览 -->
                    <div class="current-data-info">
                        <h4>📊 当前学习数据</h4>
                        <div id="current-data-summary" class="current-data-summary">
                            加载中...
                        </div>
                    </div>
                    
                    <!-- 备份区域 -->
                    <div class="backup-section">
                        <h4>📥 备份数据</h4>
                        <p>将当前所有学习数据导出为文件，可用于数据迁移或备份。</p>
                        <button class="backup-btn-action" onclick="backupRestoreUI.exportBackup()">
                            ⬇️ 导出备份文件
                        </button>
                    </div>
                    
                    <!-- 恢复区域 -->
                    <div class="restore-section">
                        <h4>📤 恢复数据</h4>
                        <p>从备份文件恢复数据，可以选择覆盖现有数据或与现有数据合并。</p>
                        
                        <div class="file-input-wrapper">
                            <input type="file" id="backup-file-input" accept=".json" style="display: none;" onchange="backupRestoreUI.handleFileSelect(event)">
                            <button class="file-select-btn" onclick="document.getElementById('backup-file-input').click()">
                                📁 选择备份文件
                            </button>
                        </div>
                        
                        <div id="backup-preview" style="display: none;">
                            <!-- 动态显示文件预览 -->
                        </div>
                        
                        <div class="restore-options" id="restore-options" style="display: none;">
                            <label>
                                <input type="radio" name="restore-mode" value="replace" checked>
                                覆盖现有数据（使用备份数据替换当前所有数据）
                            </label>
                            <label>
                                <input type="radio" name="restore-mode" value="merge">
                                与现有数据合并（合并两份数据，保留最新记录）
                            </label>
                        </div>
                        
                        <button class="restore-btn-action" id="restore-btn" onclick="backupRestoreUI.importBackup()" disabled>
                            ⬆️ 恢复数据
                        </button>
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
    },
    
    /**
     * 绑定事件
     * @private
     */
    _bindEvents() {
        // 如果在设置页面，绑定打开按钮
        const openBtn = document.getElementById('backup-restore-btn');
        if (openBtn) {
            openBtn.addEventListener('click', () => this.showModal());
        }
    },
    
    /**
     * 更新当前数据信息
     * @private
     */
    _updateCurrentDataInfo() {
        // 确保 userData 已定义
        if (typeof userData === 'undefined') {
            const container = document.getElementById('current-data-summary');
            if (container) {
                container.innerHTML = '<div style="color: #999;">暂无数据</div>';
            }
            return;
        }
        
        try {
            const summary = backupRestore._generateSummary(userData);
            const container = document.getElementById('current-data-summary');
            if (container) {
                container.innerHTML = `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                        <div>🎬 视频进度: <strong>${summary.details.videoProgress || 0}</strong> 条</div>
                        <div>📚 学习记录: <strong>${summary.details.studyRecords || 0}</strong> 条</div>
                        <div>🧠 记忆强度: <strong>${summary.details.memoryStrength || 0}</strong> 条</div>
                        <div>📝 日报数量: <strong>${summary.details.dailyReports || 0}</strong> 篇</div>
                        <div>✅ 完成任务: <strong>${summary.details.completedTasks || 0}</strong> 个</div>
                        <div>🔥 连续天数: <strong>${userData.streakDays || 0}</strong> 天</div>
                    </div>
                `;
            }
        } catch (error) {
            console.error('更新数据信息失败:', error);
            const container = document.getElementById('current-data-summary');
            if (container) {
                container.innerHTML = '<div style="color: #999;">加载数据失败</div>';
            }
        }
    },
    
    /**
     * 导出备份
     */
    exportBackup() {
        const result = backupRestore.downloadBackup();
        if (result.success) {
            if (typeof app !== 'undefined' && app.showToast) {
                app.showToast(`✅ 备份文件已下载: ${result.filename}`);
            } else {
                alert('备份文件已下载: ' + result.filename);
            }
        }
    },
    
    /**
     * 处理文件选择
     */
    async handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const previewDiv = document.getElementById('backup-preview');
        const optionsDiv = document.getElementById('restore-options');
        const restoreBtn = document.getElementById('restore-btn');
        
        // 显示预览
        const preview = await backupRestore.previewBackup(file);
        
        if (preview.valid) {
            previewDiv.style.display = 'block';
            previewDiv.className = 'valid';
            optionsDiv.style.display = 'block';
            restoreBtn.disabled = false;
            restoreBtn.style.opacity = '1';
            restoreBtn.style.cursor = 'pointer';
            
            previewDiv.innerHTML = `
                <div style="font-size: 13px; color: var(--secondary);">
                    <div style="margin-bottom: 8px;"><strong>✅ 有效的备份文件</strong></div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 12px; color: var(--text-primary);">
                        <div>备份时间: ${preview.backupTime ? new Date(preview.backupTime).toLocaleString('zh-CN') : '未知'}</div>
                        <div>数据项: ${preview.summary.totalItems} 条</div>
                        ${Object.entries(preview.summary.details).map(([key, value]) => 
                            `<div>${this._getFieldLabel(key)}: ${value}</div>`
                        ).join('')}
                    </div>
                </div>
            `;
            
            // 保存文件引用
            this._selectedFile = file;
        } else {
            previewDiv.style.display = 'block';
            previewDiv.className = 'invalid';
            optionsDiv.style.display = 'none';
            restoreBtn.disabled = true;
            restoreBtn.style.opacity = '0.5';
            restoreBtn.style.cursor = 'not-allowed';
            
            previewDiv.innerHTML = `
                <div style="font-size: 13px; color: var(--danger);">
                    <div style="margin-bottom: 8px;"><strong>❌ 无效的备份文件</strong></div>
                    <div style="font-size: 12px; color: var(--text-secondary);">${preview.error}</div>
                </div>
            `;
            this._selectedFile = null;
        }
    },
    
    /**
     * 导入备份
     */
    async importBackup() {
        if (!this._selectedFile) {
            alert('请先选择备份文件');
            return;
        }
        
        const mergeWithExisting = document.querySelector('input[name="restore-mode"]:checked').value === 'merge';
        
        // 确认对话框
        const confirmMsg = mergeWithExisting 
            ? '确定要将备份数据与现有数据合并吗？'
            : '⚠️ 警告：恢复数据将覆盖现有所有学习数据！\n\n确定要继续吗？';
        
        if (!confirm(confirmMsg)) {
            return;
        }
        
        const result = await backupRestore.importFromFile(this._selectedFile, {
            verifyBeforeImport: true,
            mergeWithExisting
        });
        
        if (result.success) {
            const successMsg = `✅ 数据恢复成功！\n\n共导入 ${result.importedSummary.totalItems} 条数据。\n建议刷新页面以更新显示。`;
            alert(successMsg);
            this.closeModal();
            // 刷新页面以加载新数据
            if (confirm('是否立即刷新页面？')) {
                location.reload();
            }
        } else {
            alert('❌ 恢复失败: ' + result.error);
        }
    },
    
    /**
     * 清空文件输入
     * @private
     */
    _clearFileInput() {
        const fileInput = document.getElementById('backup-file-input');
        if (fileInput) fileInput.value = '';
        
        const previewDiv = document.getElementById('backup-preview');
        if (previewDiv) {
            previewDiv.style.display = 'none';
            previewDiv.className = '';
        }
        
        const optionsDiv = document.getElementById('restore-options');
        if (optionsDiv) optionsDiv.style.display = 'none';
        
        const restoreBtn = document.getElementById('restore-btn');
        if (restoreBtn) {
            restoreBtn.disabled = true;
            restoreBtn.style.opacity = '0.5';
            restoreBtn.style.cursor = 'not-allowed';
        }
        
        this._selectedFile = null;
    },
    
    /**
     * 获取字段显示标签
     * @private
     */
    _getFieldLabel(key) {
        const labels = {
            videoProgress: '🎬 视频',
            studyRecords: '📚 记录',
            memoryStrength: '🧠 记忆',
            nextReview: '🔄 复习',
            completedTasks: '✅ 任务',
            dailyReports: '📝 日报',
            streakDays: '🔥 连续',
            todayStudyTime: '⏱️ 时长'
        };
        return labels[key] || key;
    }
};

// 页面加载完成后初始化
function initBackupRestoreUI() {
    if (backupRestoreUI) {
        backupRestoreUI.init();
    }
}

// 如果页面已经加载完成，立即初始化
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initBackupRestoreUI, 100);
} else {
    document.addEventListener('DOMContentLoaded', initBackupRestoreUI);
}

// 同时导出到全局作用域，确保 onclick 可以调用
window.backupRestore = backupRestore;
window.backupRestoreUI = backupRestoreUI;

// 导出模块（如果支持模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { backupRestore, backupRestoreUI };
}
