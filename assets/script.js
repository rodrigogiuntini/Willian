// ====================================
// SISTEMA DE SCRIPT SIMPLIFICADO
// ====================================

// Configuração global
const CONFIG = {
    animations: {
        duration: 0.8,
        delay: 0.2,
        easing: 'ease'
    },
    observer: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    },
    performance: {
        throttleLimit: 16,
        debounceLimit: 250
    }
};

// ====================================
// UTILITIES
// ====================================

// Throttle function para performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Adicionar múltiplas classes
function addClasses(element, classes) {
    if (typeof classes === 'string') {
        element.classList.add(classes);
    } else if (Array.isArray(classes)) {
        classes.forEach(cls => element.classList.add(cls));
    }
}

// Remover múltiplas classes
function removeClasses(element, classes) {
    if (typeof classes === 'string') {
        element.classList.remove(classes);
    } else if (Array.isArray(classes)) {
        classes.forEach(cls => element.classList.remove(cls));
    }
}

// ====================================
// ANIMATION SYSTEM
// ====================================

class AnimationController {
    constructor() {
        this.observer = null;
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            CONFIG.observer
        );
        
        this.setupAnimations();
    }

    setupAnimations() {
        // Elementos que devem ser animados
        const animatedSelectors = [
            '.card',
            '.btn',
            '.badge',
            '.section',
            '.connecting-line'
        ];

        animatedSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.observer.observe(element);
            });
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                this.animateElement(entry.target);
                this.animatedElements.add(entry.target);
            }
        });
    }

    animateElement(element) {
        // Animações específicas baseadas na classe
        if (element.classList.contains('card--process')) {
            this.animateProcessCard(element);
        } else if (element.classList.contains('connecting-line')) {
            this.animateConnectingLine(element);
        } else if (element.classList.contains('card')) {
            this.animateCard(element);
        } else {
            this.animateGeneric(element);
        }
    }

    animateProcessCard(element) {
        const delay = Array.from(element.parentNode.children).indexOf(element) * 200;
        
        setTimeout(() => {
            if (element.classList.contains('card-1')) {
                addClasses(element, 'animate-slideInLeft');
            } else if (element.classList.contains('card-2')) {
                addClasses(element, 'animate-slideInUp');
            } else if (element.classList.contains('card-3')) {
                addClasses(element, 'animate-slideInRight');
            }
        }, delay);
    }

    animateConnectingLine(element) {
        setTimeout(() => {
            addClasses(element, 'animate-draw');
        }, 800);
    }

    animateCard(element) {
        const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
        
        setTimeout(() => {
            addClasses(element, 'animate-fadeInUp');
        }, delay);
    }

    animateGeneric(element) {
        addClasses(element, 'animate-fadeInUp');
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.animatedElements.clear();
    }
}

// ====================================
// NAVIGATION SYSTEM
// ====================================

class NavigationController {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.lastScrollTop = 0;
        this.init();
    }

    init() {
        if (!this.nav) return;

        const handleScroll = throttle(() => {
            this.handleScroll();
        }, CONFIG.performance.throttleLimit);

        window.addEventListener('scroll', handleScroll);
        this.initSmoothScroll();
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Auto-hide navigation
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
            this.nav.style.transform = 'translateY(-100%)';
        } else {
            this.nav.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = scrollTop;
        
        // Scrolled state
        if (scrollTop > 50) {
            addClasses(this.nav, 'scrolled');
        } else {
            removeClasses(this.nav, 'scrolled');
        }
    }

    initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Adicionar feedback visual no botão
                    if (link.classList.contains('scroll-to-section')) {
                        this.addScrollButtonFeedback(link);
                    }
                    
                    // Scroll suave com offset para navegação
                    const headerHeight = this.nav ? this.nav.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    addScrollButtonFeedback(button) {
        // Adicionar efeito de pulsação no botão
        button.style.transform = 'scale(0.95)';
        button.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
        
        // Adicionar ícone de scroll temporário
        const scrollIcon = document.createElement('span');
        scrollIcon.innerHTML = ' ↓';
        scrollIcon.style.cssText = `
            opacity: 0;
            animation: scrollHint 0.6s ease forwards;
            margin-left: 8px;
        `;
        
        button.appendChild(scrollIcon);
        
        setTimeout(() => {
            if (scrollIcon.parentNode) {
                scrollIcon.parentNode.removeChild(scrollIcon);
            }
        }, 600);
    }
}

// ====================================
// INTERACTION SYSTEM
// ====================================

class InteractionController {
    constructor() {
        this.init();
    }

    init() {
        this.initButtons();
        this.initCards();
        this.initFAQ();
        this.initForms();
        this.initDemos();
    }

    initButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            this.addButtonEffects(button);
        });
    }

    addButtonEffects(button) {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-2px) scale(1.05)';
        });
    }

    initCards() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            this.addCardEffects(card);
        });
    }

    addCardEffects(card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.zIndex = '1';
        });
        
        // Parallax effect para cards específicos
        if (card.classList.contains('card--skill')) {
            this.addParallaxEffect(card);
        }
    }

    addParallaxEffect(card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        });
    }

    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Fechar outros FAQs
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            removeClasses(otherItem, 'active');
                        }
                    });
                    
                    // Toggle do FAQ atual
                    if (isActive) {
                        removeClasses(item, 'active');
                    } else {
                        addClasses(item, 'active');
                    }
                });
            }
        });
    }

    initForms() {
        const forms = document.querySelectorAll('form');
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                addClasses(input, 'focused');
            });
            
            input.addEventListener('blur', () => {
                removeClasses(input, 'focused');
            });
        });
    }

    initDemos() {
        // Interações específicas para demos
        this.initPortfolioDemo();
        this.initServicesDemo();
        this.initCTADemo();
    }

    initPortfolioDemo() {
        const portfolioWorks = document.querySelectorAll('.portfolio-work');
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        portfolioWorks.forEach(work => {
            work.addEventListener('click', () => {
                const playButton = work.querySelector('.work-play');
                if (playButton) {
                    playButton.style.animation = 'pulse 0.3s ease';
                    setTimeout(() => {
                        playButton.style.animation = '';
                    }, 300);
                }
            });
        });
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active de todos
                filterButtons.forEach(b => removeClasses(b, 'active'));
                // Adiciona active ao clicado
                addClasses(btn, 'active');
                
                // Animação nos works
                portfolioWorks.forEach(work => {
                    work.style.opacity = '0.5';
                    work.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        work.style.opacity = '1';
                        work.style.transform = 'scale(1)';
                    }, 100);
                });
            });
        });
    }

    initServicesDemo() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const glow = card.querySelector('.service-glow');
                if (glow) {
                    glow.style.opacity = '1';
                    glow.style.transform = 'translate(-50%, -50%) scale(1.2)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const glow = card.querySelector('.service-glow');
                if (glow) {
                    glow.style.opacity = '0';
                    glow.style.transform = 'translate(-50%, -50%) scale(1)';
                }
            });
        });
    }

    initCTADemo() {
        const ctaButtons = document.querySelectorAll('.cta-submit');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Efeito ripple
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                button.appendChild(ripple);
                
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// ====================================
// EFFECTS SYSTEM
// ====================================

class EffectsController {
    constructor() {
        this.init();
    }

    init() {
        this.initParallax();
        this.initCounters();
        this.initParticles();
        this.addDynamicStyles();
    }

    initParallax() {
        const parallaxElements = document.querySelectorAll('.card, .badge');
        
        const handleScroll = throttle(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index % 3) * 0.2;
                const yPos = -(scrolled * speed * 0.1);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, CONFIG.performance.throttleLimit);
        
        window.addEventListener('scroll', handleScroll);
    }

    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const text = counter.textContent;
                    const target = parseInt(text.replace(/[^\d]/g, '')) || 0;
                    
                    if (target > 0) {
                        this.animateCounter(counter, target, text);
                        observer.unobserve(counter);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element, target, originalText) {
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            const value = Math.floor(current);
            
            // Manter formato original
            element.textContent = originalText.replace(/\d+/, value);
            
            if (current >= target) {
                element.textContent = originalText;
                clearInterval(timer);
            }
        }, 16);
    }

    initParticles() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
            opacity: 0.3;
        `;
        
        document.body.appendChild(particlesContainer);
        
        // Criar partículas
        for (let i = 0; i < 15; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 15;
        const opacity = Math.random() * 0.2 + 0.05;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(59, 130, 246, ${opacity});
            border-radius: 50%;
            left: ${left}%;
            top: 100%;
            animation: float ${animationDuration}s linear infinite;
        `;
        
        container.appendChild(particle);
        
        // Remover e recriar partícula
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            this.createParticle(container);
        }, animationDuration * 1000);
    }

    addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Animações dinâmicas */
            @keyframes float {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            .animate-fadeInUp {
                animation: fadeInUp ${CONFIG.animations.duration}s ${CONFIG.animations.easing} forwards;
            }
            
            .animate-slideInLeft {
                animation: slideInLeft ${CONFIG.animations.duration}s ${CONFIG.animations.easing} forwards;
            }
            
            .animate-slideInRight {
                animation: slideInRight ${CONFIG.animations.duration}s ${CONFIG.animations.easing} forwards;
            }
            
            .animate-slideInUp {
                animation: slideInUp ${CONFIG.animations.duration}s ${CONFIG.animations.easing} forwards;
            }
            
            .animate-draw {
                opacity: 1;
                transition: opacity 1s ease;
            }
            
            .animate-draw .process-svg path {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: drawLine 2s ease forwards;
            }
            
            @keyframes drawLine {
                to {
                    stroke-dashoffset: 0;
                }
            }
            
            /* Ripple effect */
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes scrollHint {
                0% {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                50% {
                    opacity: 1;
                    transform: translateY(0);
                }
                100% {
                    opacity: 0;
                    transform: translateY(10px);
                }
            }
            
            /* Focus states */
            .focused {
                transform: translateY(-2px) !important;
                box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3) !important;
            }
            
            /* Reduced motion */
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ====================================
// MAIN APP CONTROLLER
// ====================================

class App {
    constructor() {
        this.controllers = {};
        this.init();
    }

    init() {
        // Aguardar DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initControllers();
            });
        } else {
            this.initControllers();
        }
    }

    initControllers() {
        try {
            this.controllers.animation = new AnimationController();
            this.controllers.navigation = new NavigationController();
            this.controllers.interaction = new InteractionController();
            this.controllers.effects = new EffectsController();
            
            // Adicionar classe loaded
            document.body.classList.add('loaded');
            
            console.log('✅ Sistema inicializado com sucesso');
        } catch (error) {
            console.error('❌ Erro ao inicializar sistema:', error);
        }
    }

    destroy() {
        // Cleanup
        Object.values(this.controllers).forEach(controller => {
            if (controller.destroy) {
                controller.destroy();
            }
        });
        
        this.controllers = {};
    }
}

// ====================================
// INICIALIZAÇÃO
// ====================================

// Inicializar aplicação
const app = new App();

// Cleanup na saída
window.addEventListener('beforeunload', () => {
    app.destroy();
});

// Error handling global
window.addEventListener('error', (e) => {
    console.warn('Script error:', e.message);
});

// Exportar para uso externo
window.RodrigoPortfolio = {
    app,
    CONFIG,
    utilities: {
        throttle,
        debounce,
        addClasses,
        removeClasses
    }
}; 