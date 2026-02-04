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
    
    // ===== 7. 下载 PDF 功能 =====
    const downloadBtn = document.getElementById('download-pdf');
    
    downloadBtn.addEventListener('click', function() {
        // 这里可以使用 jsPDF 库来生成 PDF
        // 但为了简化，我们先创建一个提示
        showToast('PDF生成功能需要引入jsPDF库');
        
        // 如果你的简历已经是PDF格式，可以直接链接到文件
        // window.open('path/to/your-resume.pdf', '_blank');
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
});