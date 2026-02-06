// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. 主题切换功能 =====
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // 设置初始主题
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // 主题切换按钮点击事件
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // 更新主题图标
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // ===== 2. 导航栏滚动效果 =====
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // 深色主题下的导航栏样式
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            } else {
                navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            }
        }
    });
    
    // 汉堡菜单点击事件
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // 点击导航链接后关闭汉堡菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // ===== 3. 平滑滚动 =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 更新 URL（可选）
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // ===== 4. 复制联系方式功能 =====
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // 显示复制成功提示
                showToast('✓ 已复制到剪贴板');
            }).catch(err => {
                console.error('复制失败:', err);
                showToast('复制失败，请手动复制');
            });
        });
    });
    
    // ===== 5. 显示 Toast 提示 =====
    function showToast(message) {
        // 创建 Toast 元素
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // 添加样式
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        `;
        
        // 添加到页面
        document.body.appendChild(toast);
        
        // 3秒后移除
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }
    
    // 添加 CSS 动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===== 6. 技能进度条动画 =====
    const skillBars = document.querySelectorAll('.skill-level');
    
    // 创建 Intersection Observer 来检测技能区域是否可见
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 技能区域进入视口时，执行动画
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target); // 动画执行一次后取消观察
            }
        });
    }, {
        threshold: 0.5 // 当50%的元素可见时触发
    });
    
    // 观察技能区域
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // ===== 7. 下载 PDF 功能增强 =====
const downloadBtn = document.getElementById('download-pdf');

if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        // 显示下载提示
        showToast('正在下载简历...');
        
        // 可以添加下载统计（可选）
        console.log('简历下载点击');
        
        // 设置一个延时，确保Toast显示
        setTimeout(() => {
            console.log('下载开始');
        }, 500);
    });
    
    // 检查PDF文件是否存在（可选功能）
    checkPdfExists();
}
// 检查PDF文件是否存在
function checkPdfExists() {
    const pdfUrl = 'assets/resume.pdf';
    
    fetch(pdfUrl, { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                console.warn('PDF文件不存在或路径错误');
                // 可以给用户一个提示
                const downloadBtn = document.getElementById('download-pdf');
                if (downloadBtn) {
                    downloadBtn.style.opacity = '0.7';
                    downloadBtn.title = 'PDF文件可能不存在，请检查';
                }
            }
        })
        .catch(error => {
            console.warn('无法检查PDF文件:', error);
        });
}
// 添加下载进度条效果
function addDownloadProgress() {
    // 创建进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'download-progress';
    document.body.appendChild(progressBar);
    
    // 监听所有下载链接
    document.querySelectorAll('a[download]').forEach(link => {
        link.addEventListener('click', function() {
            // 显示进度条
            progressBar.style.width = '30%';
            
            // 模拟下载进度
            setTimeout(() => {
                progressBar.style.width = '70%';
            }, 300);
            
            setTimeout(() => {
                progressBar.style.width = '100%';
                
                // 完成后隐藏
                setTimeout(() => {
                    progressBar.style.width = '0';
                }, 500);
            }, 600);
        });
    });
}

// 在DOM加载完成后调用
document.addEventListener('DOMContentLoaded', function() {
    addDownloadProgress();
});
// ===== PDF预览功能 =====
function initPdfPreview() {
    const previewBtn = document.getElementById('preview-pdf');
    const previewModal = document.getElementById('pdf-preview-modal');
    const pdfViewer = document.getElementById('pdf-viewer');
    const modalClose = document.querySelector('.modal-close');
    const previewDownload = document.getElementById('preview-download');
    const previewPrint = document.getElementById('preview-print');
    
    if (!previewBtn || !previewModal) return;
    
    // 打开预览
    previewBtn.addEventListener('click', function() {
        // 设置PDF查看器源
        pdfViewer.src = 'assets/resume.pdf';
        
        // 显示模态框
        previewModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });
    
    // 关闭预览
    modalClose.addEventListener('click', function() {
        previewModal.classList.remove('active');
        pdfViewer.src = ''; // 清空iframe
        document.body.style.overflow = 'auto';
    });
    
    // 点击模态框背景关闭
    previewModal.addEventListener('click', function(e) {
        if (e.target === previewModal) {
            previewModal.classList.remove('active');
            pdfViewer.src = '';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 预览中的下载按钮
    previewDownload.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = 'assets/resume.pdf';
        link.download = '你的姓名_个人简历.pdf';
        link.click();
        showToast('开始下载简历...');
    });
    
    // 预览中的打印按钮
    previewPrint.addEventListener('click', function() {
        const printWindow = window.open('assets/resume.pdf', '_blank');
        if (printWindow) {
            printWindow.onload = function() {
                printWindow.print();
            };
        }
    });
}

// 在DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initPdfPreview();
});
// 下载统计功能
function trackDownload() {
    const downloadBtn = document.getElementById('download-pdf');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // 获取当前日期
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            
            // 从localStorage获取下载次数
            let downloadStats = localStorage.getItem('downloadStats');
            downloadStats = downloadStats ? JSON.parse(downloadStats) : {};
            
            // 更新统计
            if (downloadStats[dateStr]) {
                downloadStats[dateStr]++;
            } else {
                downloadStats[dateStr] = 1;
            }
            
            // 保存回localStorage
            localStorage.setItem('downloadStats', JSON.stringify(downloadStats));
            
            // 显示总下载次数
            const totalDownloads = Object.values(downloadStats).reduce((a, b) => a + b, 0);
            console.log(`总下载次数: ${totalDownloads}`);
            
            // 你也可以发送到服务器（需要后端支持）
            // sendDownloadAnalytics(dateStr);
        });
    }
}

// 在页面加载时显示总下载次数（可选）
function showDownloadCount() {
    let downloadStats = localStorage.getItem('downloadStats');
    if (downloadStats) {
        downloadStats = JSON.parse(downloadStats);
        const totalDownloads = Object.values(downloadStats).reduce((a, b) => a + b, 0);
        
        // 在页脚显示（可选）
        const footer = document.querySelector('footer .container');
        if (footer) {
            const countElement = document.createElement('p');
            countElement.innerHTML = `<small>简历已被下载 ${totalDownloads} 次</small>`;
            footer.appendChild(countElement);
        }
    }
}

// 在DOM加载完成后调用
document.addEventListener('DOMContentLoaded', function() {
    trackDownload();
    showDownloadCount();
});
    
    // ===== 8. 联系表单处理 =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里应该发送到服务器
            // 但作为示例，我们只显示成功消息
            showToast('消息已发送！我会尽快回复您。');
            contactForm.reset();
        });
    }
    
    // ===== 9. 更新当前日期 =====
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('zh-CN', options);
    }
    
    // ===== 10. 响应式导航栏点击外部关闭 =====
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // ===== 11. 添加键盘快捷键 =====
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + / 切换主题
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            themeToggle.click();
        }
        
        // Escape 键关闭导航菜单
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
// ===== 地址地图功能（优化版）=====
(function initAddressMap() {
    console.log('📍 初始化地址地图功能');
    
    // 确保页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        console.log('✅ 绑定地址点击事件');
        
        // 使用事件委托，处理所有地址点击
        document.addEventListener('click', function(e) {
            // 点击地址项
            const addressItem = e.target.closest('.address-item');
            if (addressItem && !e.target.closest('.location-btn')) {
                e.preventDefault();
                e.stopPropagation();
                
                const addressSpan = addressItem.querySelector('.address-text');
                if (addressSpan) {
                    openAddressInMap(addressSpan.textContent.trim());
                }
                return;
            }
            
            // 点击定位按钮
            const locationBtn = e.target.closest('.location-btn');
            if (locationBtn) {
                e.preventDefault();
                e.stopPropagation();
                
                const addressItem = locationBtn.closest('.address-item');
                if (addressItem) {
                    const addressSpan = addressItem.querySelector('.address-text');
                    if (addressSpan) {
                        openAddressInMap(addressSpan.textContent.trim());
                    }
                }
            }
        });
        
        // 添加视觉反馈
        const style = document.createElement('style');
        style.textContent = `
            .address-item { cursor: pointer !important; }
            .address-item:hover { opacity: 0.8; }
            .location-btn { cursor: pointer !important; }
        `;
        document.head.appendChild(style);
    }
    
    // 打开地址地图（简洁版）
    function openAddressInMap(address) {
        if (!address || address.trim() === '') return;
        
        console.log(`🗺️ 打开地图: ${address}`);
        
        // 构建地图URL
        const isChineseUser = navigator.language.includes('zh') || /China|CN/i.test(navigator.userAgent);
        const service = isChineseUser ? 'baidu' : 'google';
        const encodedAddress = encodeURIComponent(address);
        const mapUrl = service === 'baidu' 
            ? `https://map.baidu.com/search/${encodedAddress}`
            : `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        
        // 直接打开，用户已经允许了弹出窗口
        window.open(mapUrl, '_blank');
    }
    
    // 暴露函数到全局，方便调试
    window.openAddressInMap = openAddressInMap;
})();



});