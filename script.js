// ========================================
// Valentine's Day Website - Enhanced Edition
// Modern Animations & Particle Systems
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
    initFloatingHearts();
    initPostbox();
    initRSVPButtons();
    initScrollAnimations();
    initCursorTrail();
});

// ========================================
// Canvas Particle System
// ========================================
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.hue = Math.random() * 60 + 320; // Pink to purple range
            this.pulse = Math.random() * Math.PI * 2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulse += 0.02;
            this.opacity = 0.3 + Math.sin(this.pulse) * 0.2;

            // Wrap around screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
            ctx.shadowBlur = 15;
            ctx.shadowColor = `hsla(${this.hue}, 80%, 70%, 0.8)`;
            ctx.fill();
            ctx.restore();
        }
    }

    // Create particles
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Draw connections between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(244, 114, 182, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();

        animationId = requestAnimationFrame(animate);
    }

    animate();
}

// ========================================
// Floating Hearts
// ========================================
function initFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;

    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '💘', '💞', '🌹', '✨'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const startX = Math.random() * 100;
        const size = Math.random() * 1.5 + 0.8;
        const duration = Math.random() * 5 + 8;

        heart.style.cssText = `
            left: ${startX}%;
            font-size: ${size}rem;
            animation-duration: ${duration}s;
            animation-delay: ${Math.random() * 2}s;
        `;

        container.appendChild(heart);

        setTimeout(() => heart.remove(), duration * 1000 + 2000);
    }

    // Initial burst
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 300);
    }

    // Continuous creation
    setInterval(createHeart, 2000);
}

// ========================================
// Postbox Interaction
// ========================================
function initPostbox() {
    const postboxWrapper = document.getElementById('postboxWrapper');
    const postbox = document.getElementById('postbox');
    const tapHint = document.getElementById('tapHint');
    const notification = document.getElementById('notification');

    if (!postboxWrapper || !postbox) return;

    let isOpened = false;
    let touchHandled = false;

    // Use pointer events for unified handling (works on both mobile and desktop)
    postboxWrapper.addEventListener('pointerup', (e) => {
        e.stopPropagation();
        handlePostboxClick();
    });

    // Fallback for older browsers - touchend
    postboxWrapper.addEventListener('touchend', (e) => {
        if (!touchHandled) {
            touchHandled = true;
            handlePostboxClick();
            // Reset after a short delay
            setTimeout(() => { touchHandled = false; }, 300);
        }
    }, { passive: true });

    // Click fallback for desktop
    postboxWrapper.addEventListener('click', (e) => {
        // Prevent double-firing with pointer events
        if (!touchHandled) {
            handlePostboxClick();
        }
    });

    function handlePostboxClick() {
        if (isOpened) return;
        isOpened = true;

        // Add haptic feedback on mobile
        if ('vibrate' in navigator) {
            navigator.vibrate([50, 50, 100]);
        }

        // Open postbox
        postbox.classList.add('opened');

        // Hide tap hint
        if (tapHint) {
            tapHint.style.opacity = '0';
            tapHint.style.transform = 'translateY(20px)';
        }

        // Animate notification out
        if (notification) {
            notification.style.transition = 'all 0.5s ease-out';
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-30px) scale(0.8)';
        }

        // Create burst of sparkles
        createSparklesBurst(postbox);

        // Transition to letter after animation
        setTimeout(showLetterSection, 2500);
    }
}

// ========================================
// Sparkles Burst Effect
// ========================================
function createSparklesBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            const angle = (i / 30) * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;

            sparkle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: ${6 + Math.random() * 6}px;
                height: ${6 + Math.random() * 6}px;
                z-index: 1000;
                pointer-events: none;
            `;

            document.body.appendChild(sparkle);

            // Animate outward
            requestAnimationFrame(() => {
                sparkle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                sparkle.style.left = `${endX}px`;
                sparkle.style.top = `${endY}px`;
                sparkle.style.opacity = '0';
                sparkle.style.transform = 'scale(0)';
            });

            setTimeout(() => sparkle.remove(), 1000);
        }, i * 20);
    }
}

// ========================================
// Show Letter Section
// ========================================
function showLetterSection() {
    const postboxSection = document.getElementById('postboxSection');
    const letterSection = document.getElementById('letterSection');
    const confettiContainer = document.getElementById('confettiContainer');

    if (!postboxSection || !letterSection) return;

    // Fade out postbox section
    postboxSection.style.transition = 'opacity 0.5s ease';
    postboxSection.style.opacity = '0';

    setTimeout(() => {
        postboxSection.style.display = 'none';
        letterSection.classList.remove('hidden');
        letterSection.scrollIntoView({ behavior: 'smooth' });

        // Launch confetti celebration!
        setTimeout(() => {
            createConfettiBurst(confettiContainer);
            burstHearts();
        }, 300);
    }, 500);
}

// ========================================
// Confetti Celebration
// ========================================
function createConfettiBurst(container) {
    if (!container) return;

    const colors = [
        '#f43f5e', // rose
        '#ec4899', // pink
        '#8b5cf6', // violet
        '#a855f7', // purple
        '#fbbf24', // amber
        '#f472b6', // light pink
        '#c084fc', // light purple
    ];

    const shapes = ['square', 'circle', 'heart'];

    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 12 + 6;
            const startX = Math.random() * 100;
            const duration = Math.random() * 2 + 2;
            const rotation = Math.random() * 1440 - 720;

            confetti.className = `confetti confetti-${shape}`;

            if (shape === 'heart') {
                confetti.innerHTML = '❤️';
                confetti.style.cssText = `
                    left: ${startX}%;
                    top: -20px;
                    font-size: ${size}px;
                    --duration: ${duration}s;
                    --rotation: ${rotation}deg;
                `;
            } else {
                confetti.style.cssText = `
                    left: ${startX}%;
                    top: -20px;
                    width: ${size}px;
                    height: ${size}px;
                    background-color: ${color};
                    --duration: ${duration}s;
                    --rotation: ${rotation}deg;
                `;
            }

            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), duration * 1000 + 500);
        }, i * 20);
    }
}

// ========================================
// Burst Hearts
// ========================================
function burstHearts() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;

    const hearts = ['💕', '💖', '💗', '💝', '❤️', '💘'];

    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

            heart.style.cssText = `
                left: ${30 + Math.random() * 40}%;
                font-size: ${1.5 + Math.random() * 1.5}rem;
                animation-duration: ${4 + Math.random() * 3}s;
            `;

            container.appendChild(heart);

            setTimeout(() => heart.remove(), 8000);
        }, i * 80);
    }
}

// ========================================
// RSVP Buttons
// ========================================
function initRSVPButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const maybeBtn = document.getElementById('maybeBtn');

    if (yesBtn) {
        yesBtn.addEventListener('click', handleYesClick);
    }

    if (maybeBtn) {
        maybeBtn.addEventListener('click', handleYesClick);
    }
}

function handleYesClick(e) {
    // Ripple effect
    createRipple(e);

    // Haptic feedback
    if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 200]);
    }

    const letterSection = document.getElementById('letterSection');
    const successSection = document.getElementById('successSection');
    const confettiContainer = document.getElementById('confettiContainer');

    // Multiple waves of confetti!
    for (let wave = 0; wave < 4; wave++) {
        setTimeout(() => {
            createConfettiBurst(confettiContainer);
        }, wave * 400);
    }

    // Burst hearts multiple times
    burstHearts();
    setTimeout(burstHearts, 500);
    setTimeout(burstHearts, 1000);

    // Transition to success section
    setTimeout(() => {
        if (letterSection) {
            letterSection.style.transition = 'opacity 0.5s ease';
            letterSection.style.opacity = '0';
        }

        setTimeout(() => {
            if (letterSection) letterSection.classList.add('hidden');
            if (successSection) {
                successSection.classList.remove('hidden');
                successSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Final celebration burst
            setTimeout(() => {
                createConfettiBurst(confettiContainer);
                burstHearts();
            }, 500);
        }, 500);
    }, 1500);
}

// ========================================
// Ripple Effect
// ========================================
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
    `;

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// ========================================
// Scroll Animations with Intersection Observer
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                entry.target.classList.remove('section-hidden');

                // Trigger section-specific effects
                if (entry.target.id === 'rewardSection') {
                    triggerRewardSparkles();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

function triggerRewardSparkles() {
    const rewardBox = document.querySelector('#rewardSection .relative.group');
    if (!rewardBox) return;

    const rect = rewardBox.getBoundingClientRect();

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                z-index: 100;
            `;

            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1500);
        }, i * 100);
    }
}

// ========================================
// Cursor Trail Effect (Desktop)
// ========================================
function initCursorTrail() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch devices

    const trail = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            pointer-events: none;
            width: ${8 - i * 0.5}px;
            height: ${8 - i * 0.5}px;
            background: linear-gradient(135deg, #f43f5e, #8b5cf6);
            border-radius: 50%;
            z-index: 9999;
            opacity: ${1 - i * 0.1};
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px rgba(244, 63, 94, 0.5);
        `;
        document.body.appendChild(dot);
        trail.push({ element: dot, x: 0, y: 0 });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let x = mouseX;
        let y = mouseY;

        trail.forEach((dot, index) => {
            const nextX = x;
            const nextY = y;

            dot.x += (nextX - dot.x) * (0.3 - index * 0.02);
            dot.y += (nextY - dot.y) * (0.3 - index * 0.02);

            dot.element.style.left = `${dot.x}px`;
            dot.element.style.top = `${dot.y}px`;

            x = dot.x;
            y = dot.y;
        });

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}

// ========================================
// Performance: Pause animations when not visible
// ========================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});
