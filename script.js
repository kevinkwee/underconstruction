// Dynamic Particle System
class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
        this.handleResize();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        const particlesContainer = document.getElementById('particles');
        particlesContainer.appendChild(this.canvas);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(100, Math.max(30, Math.floor(window.innerWidth / 20)));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor(),
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    getRandomColor() {
        const colors = ['#00ffff', '#ff006e', '#8b5cf6', '#00ff41', '#ffff00'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Update pulse
            particle.pulse += particle.pulseSpeed;
            const pulseFactor = Math.sin(particle.pulse) * 0.3 + 0.7;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * pulseFactor, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity * pulseFactor;
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.particles = [];
            this.createParticles();
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Enhanced Interactive Elements
class InteractiveElements {
    constructor() {
        this.init();
    }

    init() {
        this.addMouseTracker();
        this.addScrollEffects();
        this.addButtonAnimations();
        this.addRobotInteraction();
    }

    addMouseTracker() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Create trailing effect
            this.createTrailParticle(mouseX, mouseY);
        });
    }

    createTrailParticle(x, y) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.background = '#00ffff';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '1000';
        trail.style.boxShadow = '0 0 10px #00ffff';
        trail.style.animation = 'trailFade 0.5s ease-out forwards';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 500);
    }

    addScrollEffects() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const gridOverlay = document.querySelector('.grid-overlay');
            if (gridOverlay) {
                gridOverlay.style.transform = `translateY(${rate}px)`;
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }

    addButtonAnimations() {
        const buttons = document.querySelectorAll('.social-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createButtonRipple(e.target);
            });
            
            button.addEventListener('click', (e) => {
                this.createClickEffect(e);
            });
        });
    }

    createButtonRipple(button) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    createClickEffect(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        for (let i = 0; i < 8; i++) {
            const spark = document.createElement('div');
            spark.style.position = 'fixed';
            spark.style.left = x + 'px';
            spark.style.top = y + 'px';
            spark.style.width = '4px';
            spark.style.height = '4px';
            spark.style.background = '#00ffff';
            spark.style.borderRadius = '50%';
            spark.style.pointerEvents = 'none';
            spark.style.zIndex = '1000';
            spark.style.boxShadow = '0 0 10px #00ffff';
            
            const angle = (Math.PI * 2 * i) / 8;
            const velocity = 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            spark.style.animation = `sparkFly 0.8s ease-out forwards`;
            spark.style.setProperty('--vx', vx + 'px');
            spark.style.setProperty('--vy', vy + 'px');
            
            document.body.appendChild(spark);
            
            setTimeout(() => {
                if (spark.parentNode) {
                    spark.parentNode.removeChild(spark);
                }
            }, 800);
        }
    }

    addRobotInteraction() {
        const robot = document.querySelector('.robot-dog');
        if (!robot) return;
        
        let interactionCount = 0;
        
        robot.addEventListener('click', () => {
            interactionCount++;
            
            // Add special animation on click
            robot.style.animation = 'none';
            robot.offsetHeight; // Trigger reflow
            robot.style.animation = 'robotExcitement 1s ease-in-out';
            
            // Create excitement particles
            this.createExcitementEffect(robot);
            
            // Change eye color temporarily
            const eyes = robot.querySelectorAll('.robot-eye');
            eyes.forEach(eye => {
                eye.style.background = '#ff006e';
                eye.style.boxShadow = '0 0 15px #ff006e';
            });
            
            setTimeout(() => {
                eyes.forEach(eye => {
                    eye.style.background = '#00ff41';
                    eye.style.boxShadow = '0 0 10px #00ff41';
                });
                robot.style.animation = 'robotFloat 4s ease-in-out infinite';
            }, 1000);
            
            // Easter egg for multiple clicks
            if (interactionCount >= 5) {
                this.triggerEasterEgg();
                interactionCount = 0;
            }
        });
    }

    createExcitementEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = '#ffff00';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            particle.style.boxShadow = '0 0 15px #ffff00';
            particle.style.animation = 'excitementParticle 1.5s ease-out forwards';
            
            const angle = (Math.PI * 2 * i) / 12;
            particle.style.setProperty('--angle', angle + 'rad');
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1500);
        }
    }

    triggerEasterEgg() {
        // Change the subheadline temporarily
        const subheadline = document.querySelector('.subheadline');
        const originalText = subheadline.textContent;
        
        subheadline.textContent = "OK fine, you can virtual pet it. *Happy robot noises*";
        subheadline.style.color = '#ff006e';
        subheadline.style.textShadow = '0 0 10px #ff006e';
        
        // Create rainbow effect
        document.body.style.animation = 'rainbowGlow 2s ease-in-out';
        
        setTimeout(() => {
            subheadline.textContent = originalText;
            subheadline.style.color = '#cccccc';
            subheadline.style.textShadow = 'none';
            document.body.style.animation = 'none';
        }, 3000);
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Reduce animations on low-end devices
        this.checkPerformance();
        
        // Handle visibility changes to pause animations
        this.handleVisibilityChange();
    }

    checkPerformance() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection && connection.effectiveType) {
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                this.reducedMode();
            }
        }
        
        // Check device memory if available
        if (navigator.deviceMemory && navigator.deviceMemory < 4) {
            this.reducedMode();
        }
    }

    reducedMode() {
        document.body.classList.add('reduced-motion');
        
        // Reduce particle count
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.5s !important;
            }
            .reduced-motion #particles::before {
                display: none;
            }
        `;
        document.head.appendChild(style);
    }

    handleVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            const animations = document.querySelectorAll('*');
            
            if (document.hidden) {
                animations.forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
            } else {
                animations.forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }
        });
    }
}

// Mobile Viewport Height Fix
class MobileViewportFix {
    constructor() {
        this.init();
    }

    init() {
        this.setViewportHeight();
        this.handleResize();
        this.handleOrientationChange();
    }

    setViewportHeight() {
        // Get the actual viewport height
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Also set a CSS custom property for the full height
        document.documentElement.style.setProperty('--full-height', `${window.innerHeight}px`);
    }

    handleResize() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.setViewportHeight();
            }, 100);
        });
    }

    handleOrientationChange() {
        window.addEventListener('orientationchange', () => {
            // Delay to ensure the viewport has updated
            setTimeout(() => {
                this.setViewportHeight();
            }, 500);
        });
    }
}

// Add required CSS animations via JavaScript
const additionalStyles = `
@keyframes trailFade {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0); }
}

@keyframes rippleEffect {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
}

@keyframes sparkFly {
    0% { 
        transform: translate(0, 0) scale(1); 
        opacity: 1; 
    }
    100% { 
        transform: translate(var(--vx), var(--vy)) scale(0); 
        opacity: 0; 
    }
}

@keyframes excitementParticle {
    0% { 
        transform: translate(0, 0) scale(1); 
        opacity: 1; 
    }
    100% { 
        transform: translate(
            calc(cos(var(--angle)) * 80px), 
            calc(sin(var(--angle)) * 80px)
        ) scale(0); 
        opacity: 0; 
    }
}

@keyframes robotExcitement {
    0%, 100% { transform: translateY(0px) rotateY(0deg); }
    25% { transform: translateY(-20px) rotateY(-10deg); }
    50% { transform: translateY(-15px) rotateY(10deg); }
    75% { transform: translateY(-25px) rotateY(-5deg); }
}

@keyframes rainbowGlow {
    0% { filter: hue-rotate(0deg); }
    25% { filter: hue-rotate(90deg); }
    50% { filter: hue-rotate(180deg); }
    75% { filter: hue-rotate(270deg); }
    100% { filter: hue-rotate(360deg); }
}
`;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add additional styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
    
    // Initialize systems
    new MobileViewportFix(); // Fix mobile viewport issues first
    new ParticleSystem();
    new InteractiveElements();
    new PerformanceMonitor();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    // Clean up any remaining elements
    document.querySelectorAll('[style*="position: fixed"]').forEach(el => {
        if (el.parentNode && !el.classList.contains('permanent')) {
            el.parentNode.removeChild(el);
        }
    });
});
