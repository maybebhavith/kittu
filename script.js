// ========================================
// Valentine's Day Romantic Website
// Interactive JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initFloatingHearts();
    initSparkles();
    initPostbox();
    initRSVPButtons();
    initScrollAnimations();
});

// ========================================
// Floating Hearts Background
// ========================================
function initFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '💘', '💞'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        heart.style.opacity = Math.random() * 0.4 + 0.3;
        
        container.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 12000);
    }
    
    // Create initial hearts
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createHeart(), i * 500);
    }
    
    // Continuously create hearts
    setInterval(createHeart, 1500);
}

// ========================================
// Sparkles Effect
// ========================================
function initSparkles() {
    const container = document.getElementById('sparklesContainer');
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        
        container.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }
    
    // Create sparkles periodically
    setInterval(createSparkle, 300);
}

// ========================================
// Postbox Interaction
// ========================================
function initPostbox() {
    const postbox = document.getElementById('postbox');
    const postboxWrapper = document.querySelector('.postbox-wrapper');
    const tapHint = document.getElementById('tapHint');
    const notification = document.getElementById('notification');
    const letterSection = document.getElementById('letterSection');
    const postboxSection = document.getElementById('postboxSection');
    
    let isOpened = false;
    
    postboxWrapper.addEventListener('click', () => {
        if (isOpened) return;
        isOpened = true;
        
        // Open the postbox lid
        postbox.classList.add('opened');
        
        // Hide the tap hint
        if (tapHint) {
            tapHint.classList.add('hidden');
        }
        
        // Animate notification out
        if (notification) {
            notification.style.animation = 'fadeOut 0.5s ease-out forwards';
        }
        
        // After letter animation, show the letter section
        setTimeout(() => {
            showLetterSection();
        }, 2000);
    });
}

function showLetterSection() {
    const letterSection = document.getElementById('letterSection');
    const postboxSection = document.getElementById('postboxSection');
    const confettiContainer = document.getElementById('confettiContainer');
    
    // Hide postbox section
    postboxSection.style.display = 'none';
    
    // Show letter section
    letterSection.classList.remove('hidden');
    
    // Scroll to letter section
    letterSection.scrollIntoView({ behavior: 'smooth' });
    
    // Trigger confetti
    setTimeout(() => {
        createConfetti(confettiContainer);
    }, 500);
    
    // Create more hearts
    burstHearts();
}

// ========================================
// Confetti Effect
// ========================================
function createConfetti(container) {
    const colors = ['#ff6b9d', '#ff4081', '#9b4dca', '#ffd700', '#ff69b4', '#da70d6'];
    const shapes = ['square', 'circle'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = shape === 'circle' ? '50%' : '2px';
            confetti.style.width = (Math.random() * 8 + 5) + 'px';
            confetti.style.height = (Math.random() * 8 + 5) + 'px';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 30);
    }
}

// ========================================
// Burst Hearts Effect
// ========================================
function burstHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '💘'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = (40 + Math.random() * 20) + '%';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            heart.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
            heart.style.opacity = 0.8;
            
            container.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 8000);
        }, i * 100);
    }
}

// ========================================
// RSVP Buttons
// ========================================
function initRSVPButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const maybeBtn = document.getElementById('maybeBtn');
    
    function handleYes() {
        // Create massive celebration
        celebrateYes();
    }
    
    yesBtn.addEventListener('click', handleYes);
    maybeBtn.addEventListener('click', handleYes); // Both are yes! 💕
}

function celebrateYes() {
    const letterSection = document.getElementById('letterSection');
    const successSection = document.getElementById('successSection');
    const confettiContainer = document.getElementById('confettiContainer');
    
    // Massive confetti burst
    for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
            createConfetti(confettiContainer);
        }, wave * 500);
    }
    
    // Burst more hearts
    burstHearts();
    burstHearts();
    
    // Transition to success section
    setTimeout(() => {
        letterSection.classList.add('hidden');
        successSection.classList.remove('hidden');
        successSection.scrollIntoView({ behavior: 'smooth' });
        
        // Final celebration
        setTimeout(() => {
            createConfetti(confettiContainer);
            burstHearts();
        }, 500);
    }, 1500);
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger section-specific animations
                if (entry.target.id === 'rewardSection') {
                    triggerRewardAnimation();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

function triggerRewardAnimation() {
    const sparkleBurst = document.getElementById('sparkleBurst');
    if (!sparkleBurst) return;
    
    // Create burst of sparkles around reward
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.position = 'absolute';
            sparkle.style.left = (40 + Math.random() * 20) + '%';
            sparkle.style.top = (40 + Math.random() * 20) + '%';
            sparkleBurst.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 2000);
        }, i * 100);
    }
}

// ========================================
// Add fadeOut animation
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Touch Haptic Feedback (if supported)
// ========================================
function vibrate(pattern) {
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
}

document.querySelectorAll('button, .postbox-wrapper').forEach(el => {
    el.addEventListener('click', () => vibrate(50));
});

// ========================================
// Prevent scroll during postbox animation
// ========================================
let isAnimating = false;

document.querySelector('.postbox-wrapper')?.addEventListener('click', () => {
    if (!isAnimating) {
        isAnimating = true;
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            document.body.style.overflow = '';
            isAnimating = false;
        }, 2500);
    }
});
