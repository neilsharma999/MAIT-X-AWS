// AWS Academy × MAIT Website JavaScript - Enhanced Version with Fixed Visibility

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAnimatedCounters();
    initScrollEffects();
    initMobileMenu();
    initSmoothScrolling();
    initMapInteractions();
    initEnhancedAnimations();
    initVisibilityEnhancements();
});

// Enhanced navigation functionality with improved visibility
function initNavigation() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');

    // Enhanced header scroll effect with better visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(37, 47, 62, 0.98)';
            header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            header.style.borderBottom = '2px solid #FF9900';
        } else {
            header.style.background = 'rgba(37, 47, 62, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            header.style.borderBottom = '1px solid #FF9900';
        }
    });

    // Enhanced active navigation link detection with visual feedback
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav__link--active');
                // Enhanced visual feedback with glow effect
                link.style.boxShadow = '0 0 20px rgba(255, 153, 0, 0.6)';
                link.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                    link.style.boxShadow = '';
                }, 300);
            }
        });
    });
}

// Enhanced mobile menu functionality with improved animations
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Enhanced body scroll prevention
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            
            // Add enhanced visual feedback with pulse effect
            if (navMenu.classList.contains('active')) {
                navMenu.style.animation = 'slideInDown 0.4s ease-out';
                // Add backdrop blur effect
                const backdrop = document.createElement('div');
                backdrop.className = 'nav-backdrop';
                backdrop.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(5px);
                    z-index: 999;
                `;
                document.body.appendChild(backdrop);
                
                backdrop.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    backdrop.remove();
                });
            } else {
                const backdrop = document.querySelector('.nav-backdrop');
                if (backdrop) backdrop.remove();
            }
        });

        // Enhanced link click animations
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add enhanced click animation with ripple effect
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 153, 0, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = link.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                
                link.style.position = 'relative';
                link.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    const backdrop = document.querySelector('.nav-backdrop');
                    if (backdrop) backdrop.remove();
                }, 400);
            });
        });
    }
}

// Enhanced smooth scrolling with progress indication
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // Enhanced visual feedback with loading indicator
                this.style.opacity = '0.7';
                this.style.transform = 'scale(0.95)';
                
                // Add progress indicator
                const progressBar = document.createElement('div');
                progressBar.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 4px;
                    background: linear-gradient(to right, #FF9900, #252F3E);
                    z-index: 10000;
                    transition: width 0.3s ease;
                    width: 0%;
                `;
                document.body.appendChild(progressBar);
                
                setTimeout(() => {
                    progressBar.style.width = '100%';
                }, 50);
                
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1)';
                    progressBar.remove();
                }, 400);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Enhanced focus management for accessibility
                setTimeout(() => {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                    targetElement.style.outline = '3px solid #FF9900';
                    setTimeout(() => {
                        targetElement.style.outline = '';
                        targetElement.removeAttribute('tabindex');
                    }, 2000);
                }, 600);
            }
        });
    });
}

// Enhanced animated counters with staggered effects
function initAnimatedCounters() {
    const counters = document.querySelectorAll('[data-target]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                // Staggered animation start
                setTimeout(() => {
                    animateCounter(counter, target);
                    
                    // Enhanced parent animation with glow effect
                    const statCard = counter.closest('.stat');
                    if (statCard) {
                        statCard.style.transform = 'scale(1.1)';
                        statCard.style.boxShadow = '0 15px 50px rgba(255, 153, 0, 0.4)';
                        statCard.style.borderColor = '#FF9900';
                        setTimeout(() => {
                            statCard.style.transform = 'scale(1)';
                            statCard.style.boxShadow = '';
                        }, 2500);
                    }
                }, index * 200);
                
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));
}

// Enhanced counter animation with sophisticated easing and visual effects
function animateCounter(element, target) {
    let current = 0;
    const duration = 3000; // Longer for more dramatic effect
    const startTime = performance.now();
    
    // Advanced easing function for smoother animation
    function easeOutElastic(t) {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    }

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = progress < 0.8 ? progress / 0.8 : easeOutElastic((progress - 0.8) / 0.2);
        
        current = Math.floor(target * easedProgress);
        element.textContent = current;
        
        // Add dynamic color changes during animation
        const intensity = Math.sin(progress * Math.PI);
        element.style.textShadow = `0 0 ${10 + intensity * 10}px rgba(255, 153, 0, ${0.5 + intensity * 0.5})`;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
            // Enhanced completion effect with celebration
            element.style.color = '#FF9900';
            element.style.transform = 'scale(1.2)';
            element.style.textShadow = '0 0 20px rgba(255, 153, 0, 0.8)';
            
            // Confetti-like effect
            createCelebrationEffect(element);
            
            setTimeout(() => {
                element.style.color = '';
                element.style.transform = 'scale(1)';
                element.style.textShadow = '';
            }, 1000);
        }
    }

    requestAnimationFrame(updateCounter);
}

// Create celebration effect for counter completion
function createCelebrationEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: #FF9900;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                left: ${centerX}px;
                top: ${centerY}px;
                box-shadow: 0 0 10px rgba(255, 153, 0, 0.8);
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / 10) * 2 * Math.PI;
            const velocity = 100 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let x = centerX;
            let y = centerY;
            let opacity = 1;
            
            function animateParticle() {
                x += vx * 0.02;
                y += vy * 0.02;
                opacity -= 0.02;
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animateParticle);
                } else {
                    particle.remove();
                }
            }
            
            animateParticle();
        }, i * 50);
    }
}

// Enhanced scroll-triggered animations with improved visibility effects
function initScrollEffects() {
    const animatedElements = document.querySelectorAll(
        '.benefit-card, .stat-card, .program-card, .contact-card, .mait-card, .highlight'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Enhanced staggered animation delay
                const delay = index * 150;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Enhanced special effects for different element types
                    if (entry.target.classList.contains('benefit-card')) {
                        entry.target.style.borderColor = '#FF9900';
                        entry.target.style.boxShadow = '0 15px 50px rgba(255, 153, 0, 0.3)';
                        setTimeout(() => {
                            entry.target.style.borderColor = '';
                            entry.target.style.boxShadow = '';
                        }, 1500);
                    }
                    
                    if (entry.target.classList.contains('highlight')) {
                        entry.target.style.transform = 'translateY(0) scale(1.02)';
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, 300);
                    }
                }, delay);
                
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Enhanced initial styles for dramatic animation
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(60px) scale(0.9)';
        element.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        scrollObserver.observe(element);
    });
}

// Enhanced map interactions for improved contact section
function initMapInteractions() {
    const mapContainer = document.querySelector('.map-container');
    const mapOverlay = document.querySelector('.map-overlay');
    
    if (mapContainer && mapOverlay) {
        // Enhanced hover effects with glow
        mapContainer.addEventListener('mouseenter', () => {
            mapOverlay.style.transform = 'scale(1.05)';
            mapOverlay.style.boxShadow = '0 20px 60px rgba(255, 153, 0, 0.4)';
            mapOverlay.style.borderColor = '#FF9900';
        });
        
        mapContainer.addEventListener('mouseleave', () => {
            mapOverlay.style.transform = 'scale(1)';
            mapOverlay.style.boxShadow = '';
            mapOverlay.style.borderColor = '';
        });
        
        // Enhanced click interaction with feedback
        mapOverlay.addEventListener('click', () => {
            // Visual feedback before opening map
            mapOverlay.style.transform = 'scale(0.95)';
            setTimeout(() => {
                mapOverlay.style.transform = 'scale(1)';
                const mapsUrl = 'https://www.google.com/maps/place/Maharaja+Agrasen+Institute+of+Technology/@28.7262762,77.1169663,17z/data=!3m1!4b1!4m6!3m5!1s0x390d01b74f0c7d31:0x6e58a5e4d7b9c7d9!8m2!3d28.7262762!4d77.1195412!16s%2Fm%2F0h3qp7g';
                window.open(mapsUrl, '_blank');
            }, 150);
        });
    }
    
    // Enhanced location pulse animation
    createEnhancedLocationPulse();
}

// Create enhanced pulsing location indicator
function createEnhancedLocationPulse() {
    const mapInfo = document.querySelector('.map-info');
    if (mapInfo) {
        const pulse = document.createElement('div');
        pulse.className = 'location-pulse';
        pulse.style.cssText = `
            position: absolute;
            top: -8px;
            left: -8px;
            width: 20px;
            height: 20px;
            background: #FF9900;
            border-radius: 50%;
            animation: enhancedPulse 2.5s infinite;
            box-shadow: 0 0 0 0 rgba(255, 153, 0, 0.7);
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes enhancedPulse {
                0% { 
                    transform: scale(0.95); 
                    box-shadow: 0 0 0 0 rgba(255, 153, 0, 0.7); 
                }
                50% { 
                    transform: scale(1.1); 
                    box-shadow: 0 0 0 15px rgba(255, 153, 0, 0.2); 
                }
                100% { 
                    transform: scale(0.95); 
                    box-shadow: 0 0 0 0 rgba(255, 153, 0, 0); 
                }
            }
        `;
        document.head.appendChild(style);
        
        mapInfo.style.position = 'relative';
        mapInfo.appendChild(pulse);
    }
}

// Enhanced animations and interactions
function initEnhancedAnimations() {
    // Enhanced floating animation for hero image
    const heroImg = document.querySelector('.hero__img');
    if (heroImg) {
        heroImg.style.animation = 'enhancedFloat 8s ease-in-out infinite';
        
        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            @keyframes enhancedFloat {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-15px) rotate(1deg); }
                50% { transform: translateY(-25px) rotate(0deg); }
                75% { transform: translateY(-15px) rotate(-1deg); }
            }
        `;
        document.head.appendChild(floatStyle);
    }
    
    // Enhanced typing effect
    initEnhancedTypingEffect();
    
    // Enhanced particle background
    createEnhancedParticleBackground();
    
    // Enhanced benefit card interactions
    enhanceBenefitCardInteractions();
    
    // Enhanced statistics progress visualization
    addEnhancedStatisticsEffects();
}

// Enhanced typing effect for hero title
function initEnhancedTypingEffect() {
    const titleHighlight = document.querySelector('.hero__title--highlight');
    if (titleHighlight) {
        const text = titleHighlight.textContent;
        titleHighlight.textContent = '';
        titleHighlight.style.borderRight = '3px solid #FF9900';
        titleHighlight.style.animation = 'blink 1s infinite';
        
        const blinkStyle = document.createElement('style');
        blinkStyle.textContent = `
            @keyframes blink {
                0%, 50% { border-color: #FF9900; }
                51%, 100% { border-color: transparent; }
            }
        `;
        document.head.appendChild(blinkStyle);
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                titleHighlight.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 120);
            } else {
                setTimeout(() => {
                    titleHighlight.style.borderRight = 'none';
                    titleHighlight.style.animation = 'none';
                }, 1500);
            }
        };
        
        setTimeout(typeWriter, 1500);
    }
}

// Enhanced particle background with AWS-themed particles
function createEnhancedParticleBackground() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: 0.4;
        `;
        heroSection.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
        
        const particles = [];
        const particleCount = 40;
        const colors = ['#FF9900', '#252F3E', '#1E3A8A', '#ffffff'];
        
        // Create enhanced particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 0.8,
                speedY: (Math.random() - 0.5) * 0.8,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.6 + 0.2,
                angle: Math.random() * Math.PI * 2,
                angleSpeed: (Math.random() - 0.5) * 0.02
            });
        }
        
        function animateEnhancedParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.angle += particle.angleSpeed;
                
                // Enhanced boundary wrapping
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;
                
                // Draw particle with glow effect
                ctx.save();
                ctx.globalAlpha = particle.opacity;
                ctx.shadowBlur = 10;
                ctx.shadowColor = particle.color;
                
                ctx.beginPath();
                ctx.arc(
                    particle.x + Math.sin(particle.angle) * 2,
                    particle.y + Math.cos(particle.angle) * 2,
                    particle.size,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = particle.color;
                ctx.fill();
                
                ctx.restore();
                
                // Connect nearby particles
                particles.slice(index + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.save();
                        ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                        ctx.strokeStyle = '#FF9900';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                });
            });
            
            requestAnimationFrame(animateEnhancedParticles);
        }
        
        animateEnhancedParticles();
        
        // Enhanced resize handling
        window.addEventListener('resize', () => {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        });
    }
}

// Enhanced benefit card interactions
function enhanceBenefitCardInteractions() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
        const icon = card.querySelector('.benefit-card__icon');
        const visual = card.querySelector('.benefit-card__visual');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 25px 80px rgba(255, 153, 0, 0.4)';
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(15deg)';
                icon.style.filter = 'drop-shadow(0 0 15px rgba(255, 153, 0, 0.8))';
            }
            if (visual) {
                visual.style.background = 'linear-gradient(135deg, #FF9900, #252F3E)';
                visual.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = '';
            }
            if (visual) {
                visual.style.background = '';
                visual.style.transform = 'scale(1)';
            }
        });
        
        // Enhanced click feedback
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-15px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1.03)';
            }, 150);
        });
    });
}

// Enhanced statistics effects
function addEnhancedStatisticsEffects() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        // Enhanced progress bar with gradient
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            height: 6px;
            background: linear-gradient(45deg, #FF9900, #252F3E, #FF9900);
            background-size: 200% 200%;
            width: 0%;
            transition: width 2.5s ease-out;
            border-radius: 0 0 12px 12px;
            animation: gradientShift 3s ease-in-out infinite;
        `;
        
        const gradientStyle = document.createElement('style');
        gradientStyle.textContent = `
            @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
        `;
        document.head.appendChild(gradientStyle);
        
        card.style.position = 'relative';
        card.appendChild(progressBar);
        
        // Enhanced intersection observer with staggered effects
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progressBar.style.width = '100%';
                        card.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            card.style.transform = 'scale(1)';
                        }, 500);
                    }, index * 300);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(card);
    });
}

// New: Enhanced visibility features
function initVisibilityEnhancements() {
    // Enhance text contrast on scroll
    enhanceTextContrast();
    
    // Add dynamic theme adjustments
    addDynamicThemeAdjustments();
    
    // Enhanced focus management
    enhanceFocusManagement();
    
    // Add visual accessibility helpers
    addAccessibilityHelpers();
}

// Enhance text contrast dynamically
function enhanceTextContrast() {
    const elements = document.querySelectorAll('.stat__number, .stat__label, .hero__title, .hero__subtitle');
    
    elements.forEach(element => {
        element.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
        element.style.fontWeight = 'bold';
    });
}

// Add dynamic theme adjustments based on time or user preference
function addDynamicThemeAdjustments() {
    // Enhance contrast for better visibility
    const style = document.createElement('style');
    style.textContent = `
        .nav__link:not(:hover):not(.nav__link--active) {
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .stat__number, .stat__suffix {
            filter: drop-shadow(0 0 8px rgba(255, 153, 0, 0.8));
        }
        
        .highlight__value {
            font-weight: 900 !important;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }
        
        .benefit-card__title {
            font-weight: 800 !important;
        }
        
        .contact-card__text {
            font-weight: 700 !important;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced focus management for accessibility
function enhanceFocusManagement() {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '4px solid #FF9900';
            this.style.outlineOffset = '3px';
            this.style.boxShadow = '0 0 0 2px rgba(255, 153, 0, 0.5)';
            this.style.transform = 'scale(1.02)';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });
}

// Add visual accessibility helpers
function addAccessibilityHelpers() {
    // Add skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -50px;
        left: 10px;
        background: #252F3E;
        color: #FF9900;
        padding: 12px 16px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 8px;
        font-weight: bold;
        font-size: 16px;
        border: 2px solid #FF9900;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '10px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-50px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhanced ARIA labels
    addEnhancedARIALabels();
}

// Add enhanced ARIA labels
function addEnhancedARIALabels() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        const text = link.textContent.trim();
        link.setAttribute('aria-label', `Navigate to ${text} section`);
        link.setAttribute('role', 'button');
    });
    
    // Statistics
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        const number = stat.querySelector('.stat__number')?.textContent;
        const suffix = stat.querySelector('.stat__suffix')?.textContent;
        const label = stat.querySelector('.stat__label')?.textContent;
        if (number && label) {
            stat.setAttribute('aria-label', `${number}${suffix || ''} ${label}`);
            stat.setAttribute('role', 'img');
        }
    });
    
    // Benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        const title = card.querySelector('.benefit-card__title')?.textContent;
        const description = card.querySelector('.benefit-card__description')?.textContent;
        if (title) {
            card.setAttribute('aria-label', `${title}: ${description}`);
            card.setAttribute('role', 'article');
        }
    });
}

// Performance optimization with debounced scroll handling
const debouncedScrollHandler = debounce(() => {
    updateScrollProgress();
    updateVisibilityEnhancements();
}, 16); // ~60fps

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(to right, #FF9900, #252F3E);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = `${scrollPercent}%`;
}

function updateVisibilityEnhancements() {
    // Dynamic contrast adjustments based on scroll position
    const scrollPercent = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
    const contrastElements = document.querySelectorAll('.stat__number, .hero__title--highlight');
    
    contrastElements.forEach(element => {
        const intensity = 0.5 + scrollPercent * 0.5;
        element.style.filter = `drop-shadow(0 0 ${10 * intensity}px rgba(255, 153, 0, ${intensity}))`;
    });
}

window.addEventListener('scroll', debouncedScrollHandler);

// Enhanced error handling and fallbacks
function handleMissingElements() {
    const requiredElements = ['header', 'nav-toggle', 'nav-menu', 'main'];
    const missingElements = [];
    
    requiredElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (!element) {
            missingElements.push(elementId);
            console.warn(`Required element with id '${elementId}' not found`);
        }
    });
    
    if (missingElements.length > 0) {
        // Provide fallback functionality
        console.log('Implementing fallback navigation...');
        implementFallbackNavigation();
    }
}

function implementFallbackNavigation() {
    // Create fallback navigation if main navigation fails
    const fallbackNav = document.createElement('div');
    fallbackNav.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(37, 47, 62, 0.95);
        padding: 15px;
        border-radius: 12px;
        z-index: 10000;
        display: flex;
        gap: 10px;
        border: 2px solid #FF9900;
    `;
    
    const sections = ['home', 'aws', 'mait', 'contact'];
    sections.forEach(section => {
        const link = document.createElement('a');
        link.href = `#${section}`;
        link.textContent = section.charAt(0).toUpperCase() + section.slice(1);
        link.style.cssText = `
            color: #FF9900;
            text-decoration: none;
            padding: 8px 12px;
            border-radius: 6px;
            font-weight: bold;
            background: rgba(255, 153, 0, 0.1);
            transition: all 0.3s ease;
        `;
        
        link.addEventListener('mouseenter', () => {
            link.style.background = '#FF9900';
            link.style.color = '#252F3E';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.background = 'rgba(255, 153, 0, 0.1)';
            link.style.color = '#FF9900';
        });
        
        fallbackNav.appendChild(link);
    });
    
    document.body.appendChild(fallbackNav);
}

// Initialize error handling
handleMissingElements();

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const backdrop = document.querySelector('.nav-backdrop');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            if (backdrop) backdrop.remove();
        }
    }
    
    // Enhanced arrow key navigation
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        scrollToNextSection();
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        scrollToPrevSection();
    }
    
    // Quick navigation shortcuts
    if (e.altKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '2':
                e.preventDefault();
                document.getElementById('aws')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '3':
                e.preventDefault();
                document.getElementById('mait')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '4':
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }
});

// Helper functions for section navigation
function scrollToNextSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentSection = getCurrentSection();
    const currentIndex = Array.from(sections).findIndex(section => 
        section.id === currentSection
    );
    
    if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        nextSection.scrollIntoView({ behavior: 'smooth' });
        announceSection(nextSection.id);
    }
}

function scrollToPrevSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentSection = getCurrentSection();
    const currentIndex = Array.from(sections).findIndex(section => 
        section.id === currentSection
    );
    
    if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        prevSection.scrollIntoView({ behavior: 'smooth' });
        announceSection(prevSection.id);
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    return current || 'home';
}

function announceSection(sectionId) {
    // Screen reader announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Navigated to ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} section`;
    
    document.body.appendChild(announcement);
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// Initialize scroll-to-top button with enhanced features
function createEnhancedScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top of page');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 25px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #252F3E, #FF9900);
        color: white;
        border: 3px solid #FF9900;
        border-radius: 50%;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s ease;
        z-index: 1000;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Enhanced show/hide logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
            scrollBtn.style.transform = 'scale(1)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
            scrollBtn.style.transform = 'scale(0.8)';
        }
    });
    
    // Enhanced scroll functionality with progress
    scrollBtn.addEventListener('click', () => {
        const scrollDuration = 800;
        const scrollStep = -window.scrollY / (scrollDuration / 15);
        
        function scrollAnimation() {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
                setTimeout(scrollAnimation, 15);
            }
        }
        
        scrollAnimation();
    });
    
    // Enhanced hover effects
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.15)';
        scrollBtn.style.boxShadow = '0 12px 35px rgba(255, 153, 0, 0.5)';
        scrollBtn.style.background = 'linear-gradient(135deg, #FF9900, #252F3E)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
        scrollBtn.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        scrollBtn.style.background = 'linear-gradient(135deg, #252F3E, #FF9900)';
    });
}

// Initialize enhanced features on load
window.addEventListener('load', function() {
    // Add loading completion class
    document.body.classList.add('loaded');
    
    // Initialize enhanced scroll-to-top button
    createEnhancedScrollToTopButton();
    
    // Start performance monitoring
    monitorPerformance();
    
    // Log initialization success
    console.log('AWS Academy × MAIT website fully loaded with enhanced visibility features');
});

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        // Monitor frame rate
        let frameCount = 0;
        let lastTime = performance.now();
        
        function checkFrameRate() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                if (fps < 30) {
                    console.warn(`Low frame rate detected: ${fps} FPS`);
                }
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkFrameRate);
        }
        
        checkFrameRate();
    }
}

// Export enhanced functions for external use
window.MAITWebsite = {
    initNavigation,
    initAnimatedCounters,
    initScrollEffects,
    initMobileMenu,
    initSmoothScrolling,
    animateCounter,
    initMapInteractions,
    initEnhancedAnimations,
    initVisibilityEnhancements,
    enhanceTextContrast,
    addDynamicThemeAdjustments,
    enhanceFocusManagement,
    addAccessibilityHelpers
};