// FashionDogos - Website Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Particles effect in hero section
    createParticles();
    
    // Animate elements when they come into view
    setupScrollAnimations();
    
    // Add interactivity to elements
    setupInteractivity();
    
    // Easter egg
    setupEasterEgg();
});

// Create confetti particles in the hero section
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const colors = [
        '#ff61d2', // accent1
        '#fe9090', // accent2
        '#00f2fe', // accent3
        '#43e97b', // accent4
        '#fff200'  // accent5
    ];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position, size, and color
        const size = Math.floor(Math.random() * 15) + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Add some animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random shape (circle or square)
        if (Math.random() > 0.5) {
            particle.style.borderRadius = '50%';
        }
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for the particles
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            opacity: 0;
            animation: float 15s linear infinite;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
        
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Setup animations triggered by scrolling
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections and animated elements
    document.querySelectorAll('section, .token-detail, .step, .frog-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for the scroll animations
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.in-view {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Add interactive elements
function setupInteractivity() {
    // Add hover sound effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            playSound('pop', 0.2);
        });
    });
    
    // Make images "react" on click
    const images = document.querySelectorAll('.about-img, .frog-img, .advisor-img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            img.style.animation = 'frogPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            playSound('boing', 0.3);
            setTimeout(() => {
                img.style.animation = '';
            }, 500);
        });
    });
    
    // Make story cards expandable
    const storyCards = document.querySelectorAll('.frog-card');
    storyCards.forEach(card => {
        const story = card.querySelector('p');
        const fullText = story.textContent;
        
        // If story is long, truncate it
        if (fullText.length > 150) {
            const shortText = fullText.substring(0, 150) + '...';
            const readMoreLink = document.createElement('span');
            readMoreLink.className = 'read-more';
            readMoreLink.textContent = 'Read More';
            
            story.textContent = shortText;
            story.appendChild(readMoreLink);
            
            // Toggle between short and full text
            let expanded = false;
            card.addEventListener('click', () => {
                if (!expanded) {
                    story.textContent = fullText;
                    expanded = true;
                    card.classList.add('expanded');
                    playSound('tada', 0.3);
                } else {
                    story.textContent = shortText;
                    story.appendChild(readMoreLink);
                    expanded = false;
                    card.classList.remove('expanded');
                    playSound('pop', 0.2);
                }
            });
        }
    });
    
    // Add CSS for interactivity
    const style = document.createElement('style');
    style.textContent = `
        .read-more {
            display: inline-block;
            margin-left: 5px;
            color: var(--accent5);
            font-weight: bold;
            cursor: pointer;
        }
        
        .frog-card.expanded {
            transform: scale(1.05);
            z-index: 10;
        }
    `;
    document.head.appendChild(style);
}

// Setup a hidden easter egg
function setupEasterEgg() {
    const hiddenFrog = document.querySelector('.hidden-frog');
    let clickCount = 0;
    
    if (hiddenFrog) {
        hiddenFrog.addEventListener('click', () => {
            clickCount++;
            playSound('pop', 0.2);
            
            if (clickCount >= 5) {
                // Trigger the easter egg
                activateEasterEgg();
                clickCount = 0;
            }
        });
    }
}

function activateEasterEgg() {
    // Create a special floating dog that follows the cursor
    const specialDog = document.createElement('div');
    specialDog.className = 'special-dog';
    specialDog.innerHTML = `<img src="logo.jpg" alt="Special Dog">`;
    document.body.appendChild(specialDog);
    
    playSound('tada', 0.5);
    
    // Add CSS for the special dog
    const style = document.createElement('style');
    style.textContent = `
        .special-dog {
            position: fixed;
            width: 100px;
            height: 100px;
            z-index: 9999;
            pointer-events: none;
            transition: all 0.1s ease;
        }
        
        .special-dog img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 3px solid var(--accent5);
            box-shadow: 0 0 20px var(--accent1);
            animation: rotate 3s linear infinite;
        }
        
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Make it follow the cursor
    document.addEventListener('mousemove', moveSpecialDog);
    
    // Remove after 15 seconds
    setTimeout(() => {
        document.removeEventListener('mousemove', moveSpecialDog);
        document.body.removeChild(specialDog);
    }, 15000);
}

function moveSpecialDog(e) {
    const specialDog = document.querySelector('.special-dog');
    if (specialDog) {
        specialDog.style.left = `${e.clientX - 50}px`;
        specialDog.style.top = `${e.clientY - 50}px`;
    }
}

// Sound effects for interactivity
function playSound(sound, volume) {
    const sounds = {
        pop: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAkJCQkJCQkJCQkJCQkJCQkJDT09PT09PT09PT09PT09PT0/X19fX19fX19fX19fX19fX1//////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAYHAAAAAAAAsNAizOrlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAAJcAKwdQAAAMiP+KT/1i5J22b/zRkk0NUO4XMnZHhEm+t0FMt5DUoB0QgkIIAEFggAgkIEAz5yGxkYRhE/5wzjAgkQcA+A+BgQ+YE4MhDPE8JJHhJCEOAMAwIAjAHhPjPHx5Gf/+MYxBUNUAK0PQFAAH8Oc8i8yNMTBXkYCQIZ/5QESJP///5gQIMv/y5hCCfLf/+mBCB9NplU4AANJ9OTAVyT1Kswh///gQgQf//qmImG///6JhwTEXiOJJH/1YsREcSTEXf/4xiEYRW7/+MYxCMNQrq8PSlAANJ//tUIrCMxMTFIbv///xYEAj////wsCAT//6f//1wQBP////FYTf///4LAkAQLC////gwI////kQVA4D0Fgf//+Uxd///wYEGQOu5//////////////+MYxCkAAANIAAAAAP///////+VnOrRVY0VsAoEhqtxLU9WlttYxAkGa1atGAQFCCgLkCZJAiQIiRsii9i9i9aNzAogQIhCZJEiIJkhaSRJDRCiRsXsXsXr///////ywDf///////+MYxK4AAANIAAAAAMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=',
        boing: 'data:audio/mp3;base64,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',
        tada: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAVAAQEBAQEBAQEBAQEBAQEBAQEBnZ2dnZ2dnZ2dnZ2dnZ2dnZ2eOjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo61tbW1tbW1tbW1tbW1tbW1tbW1tf/////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAUiAAAAAAAAUEAK/qQqAAAAAAD/4zjAAAAAAAAAAAAASW5mbwAAAA8AAAADAAABUABAQEBAQEBAQEBAQEBAQEBAQGdnZ2dnZ2dnZ2dnZ2dnZ2dnZ46Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OtbW1tbW1tbW1tbW1tbW1tbW1tbX/////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAJAUiAAAAAAAAUEAK/qQqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxDsAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxLkAAAN4AQAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxNkAAAN4AAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxLkAAAN4AAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxOMAAAN4AAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxLkAAAN4AAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxOMAAAN4AAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxLkAAAN4AAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxOkAAAN4AAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxLkAAAN4AAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxOkAAAN4AAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxLkAAAN4AAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxOkAAAN4AAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxLkAAAN4AAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxOoFQJY0AZmIAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
    };
    
    if (sounds[sound]) {
        const audio = new Audio(sounds[sound]);
        audio.volume = volume || 0.5;
        audio.play();
    }
} 