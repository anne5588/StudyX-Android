// ===== 数据导出到邮箱功能 =====
// 支持导出学习数据到邮箱备份

const emailBackup = {
    // 配置
    config: {
        // 使用 mailto 协议（最简单，不依赖第三方服务）
        // 或使用 Formspree/EmailJS 等服务（需要配置）
        service: 'mailto', // 'mailto' | 'file'
    },
    
    // 显示导出弹窗
    showExportModal() {
        // 创建弹窗
        const modal = document.createElement('div');
        modal.id = 'email-backup-modal';
        modal.className = 'modal';
        modal.style.cssText = 'display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 3000; justify-content: center; align-items: center;';
        
        // 准备数据
        const exportData = this.prepareExportData();
        const dataSize = JSON.stringify(exportData).length;
        const dataSizeFormatted = this.formatBytes(dataSize);
        
        // 统计信息
        const stats = this.getDataStats(exportData);
        
        modal.innerHTML = `
            <div class="modal-content email-backup-content" style="max-width: 400px; width: 90%; background: #1e293b; border-radius: 16px; padding: 24px; max-height: 80vh; overflow-y: auto;">
                <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="margin: 0; color: #f8fafc; font-size: 18px;">📧 导出到邮箱</h3>
                    <button onclick="emailBackup.closeModal()" style="background: none; border: none; color: #64748b; font-size: 24px; cursor: pointer;">×</button>
                </div>
                
                <div class="backup-stats" style="background: rgba(99, 102, 241, 0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                    <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">备份内容概览</div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                        <div style="text-align: center;">
                            <div style="font-size: 20px; font-weight: bold; color: #6366f1;">${stats.studyDays}</div>
                            <div style="font-size: 12px; color: #64748b;">学习天数</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 20px; font-weight: bold; color: #6366f1;">${stats.knowledgeCount}</div>
                            <div style="font-size: 12px; color: #64748b;">知识点</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 20px; font-weight: bold; color: #6366f1;">${stats.videoCount}</div>
                            <div style="font-size: 12px; color: #64748b;">视频进度</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 20px; font-weight: bold; color: #6366f1;">${dataSizeFormatted}</div>
                            <div style="font-size: 12px; color: #64748b;">数据大小</div>
                        </div>
                    </div>
                </div>
                
                <div class="export-options" style="margin-bottom: 20px;">
                    <div style="font-size: 14px; color: #94a3b8; margin-bottom: 12px;">选择导出方式：</div>
                    
                    <button onclick="emailBackup.exportByMailto()" class="export-btn" style="width: 100%; padding: 14px; margin-bottom: 10px; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); border: none; border-radius: 10px; color: white; font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        📧 发送到邮箱（推荐）
                    </button>
                    
                    <button onclick="emailBackup.exportToFile()" class="export-btn" style="width: 100%; padding: 14px; margin-bottom: 10px; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 10px; color: #6366f1; font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        💾 保存为文件
                    </button>
                    
                    <button onclick="emailBackup.copyToClipboard()" class="export-btn" style="width: 100%; padding: 14px; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(100, 116, 139, 0.3); border-radius: 10px; color: #94a3b8; font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        📋 复制到剪贴板
                    </button>
                </div>
                
                <div class="export-tips" style="background: rgba(245, 158, 11, 0.1); border-left: 3px solid #f59e0b; padding: 12px; border-radius: 0 8px 8px 0;">
                    <div style="font-size: 12px; color: #f59e0b; line-height: 1.5;">
                        💡 <strong>提示：</strong>建议每周备份一次，防止数据丢失。备份文件包含所有学习记录和进度。
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
    
    // 准备导出数据
    prepareExportData() {
        const exportData = {
            version: '1.0.0',
            exportTime: new Date().toISOString(),
            device: navigator.userAgent,
            data: {}
        };
        
        // 收集所有 localStorage 数据
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.startsWith('studyx_') || key === 'userData' || key === 'vocabularyData' || key === 'dailyReports' || key === 'smartDict_cache')) {
                try {
                    const value = localStorage.getItem(key);
                    exportData.data[key] = JSON.parse(value);
                } catch (e) {
                    exportData.data[key] = localStorage.getItem(key);
                }
            }
        }
        
        return exportData;
    },
    
    // 获取数据统计
    getDataStats(exportData) {
        const data = exportData.data || {};
        
        // 学习天数
        let studyDays = 0;
        if (data.dailyReports) {
            studyDays = Object.keys(data.dailyReports).length;
        } else if (data.userData && data.userData.dailyReports) {
            studyDays = Object.keys(data.userData.dailyReports).length;
        }
        
        // 知识点数量
        let knowledgeCount = 0;
        if (data.userData && data.userData.studyRecords) {
            knowledgeCount = Object.keys(data.userData.studyRecords).length;
        }
        
        // 视频进度
        let videoCount = 0;
        if (data.userData && data.userData.videoProgress) {
            videoCount = Object.keys(data.userData.videoProgress).length;
        }
        
        return { studyDays, knowledgeCount, videoCount };
    },
    
    // 格式化字节大小
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    },
    
    // 方式1：使用 mailto 协议发送到邮箱
    exportByMailto() {
        const exportData = this.prepareExportData();
        const jsonStr = JSON.stringify(exportData, null, 2);
        const timestamp = new Date().toLocaleDateString('zh-CN').replace(/\//g, '-');
        
        // 压缩数据（Base64）
        let compressed;
        try {
            compressed = btoa(unescape(encodeURIComponent(jsonStr)));
        } catch (e) {
            // 如果数据太大，使用简化版
            compressed = this.createSimplifiedBackup(exportData);
        }
        
        // 创建邮件内容
        const subject = `StudyX 学习数据备份 - ${timestamp}`;
        const body = `您好！\n\n这是您的 StudyX 学习数据备份。\n\n备份时间：${new Date().toLocaleString('zh-CN')}\n数据版本：${exportData.version}\n\n请将下面的备份代码保存到安全的地方，或作为邮件附件保存：\n\n--- 备份数据开始 ---\n${compressed.substring(0, 500)}...\n（数据已压缩，完整数据请查看附件或导出为文件）\n--- 备份数据结束 ---\n\n恢复方法：\n1. 打开 StudyX APP\n2. 进入"数据备份"功能\n3. 选择"导入数据"\n4. 粘贴备份代码\n\n祝您学习进步！\nStudyX 团队`;
        
        // 创建 Blob 作为附件（如果数据不太大）
        if (jsonStr.length < 100000) { // 小于100KB
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            // 使用 download 属性下载
            const a = document.createElement('a');
            a.href = url;
            a.download = `studyx-backup-${timestamp}.json`;
            a.click();
            
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            
            // 提示用户
            if (typeof app !== 'undefined' && app.showToast) {
                app.showToast('备份文件已下载，请作为附件添加到邮件发送');
            } else {
                alert('备份文件已下载，请作为附件添加到邮件发送');
            }
        } else {
            // 数据太大，打开邮件客户端
            const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(mailtoUrl, '_blank');
        }
        
        this.closeModal();
    },
    
    // 创建简化版备份
    createSimplifiedBackup(exportData) {
        const simplified = {
            version: exportData.version,
            exportTime: exportData.exportTime,
            summary: this.getDataStats(exportData)
        };
        return btoa(JSON.stringify(simplified));
    },
    
    // 方式2：导出为文件
    exportToFile() {
        const exportData = this.prepareExportData();
        const jsonStr = JSON.stringify(exportData, null, 2);
        const timestamp = new Date().toLocaleDateString('zh-CN').replace(/\//g, '-');
        
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `studyx-backup-${timestamp}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        
        this.closeModal();
        
        if (typeof app !== 'undefined' && app.showToast) {
            app.showToast('备份文件已下载');
        }
    },
    
    // 方式3：复制到剪贴板
    async copyToClipboard() {
        const exportData = this.prepareExportData();
        const jsonStr = JSON.stringify(exportData);
        
        try {
            await navigator.clipboard.writeText(jsonStr);
            this.closeModal();
            if (typeof app !== 'undefined' && app.showToast) {
                app.showToast('备份数据已复制到剪贴板');
            } else {
                alert('备份数据已复制到剪贴板');
            }
        } catch (err) {
            console.error('复制失败:', err);
            // 降级方案
            const textarea = document.createElement('textarea');
            textarea.value = jsonStr;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            this.closeModal();
            if (typeof app !== 'undefined' && app.showToast) {
                app.showToast('备份数据已复制到剪贴板');
            }
        }
    },
    
    // 关闭弹窗
    closeModal() {
        const modal = document.getElementById('email-backup-modal');
        if (modal) {
            modal.remove();
        }
    }
};

// 导出到全局
window.emailBackup = emailBackup;
