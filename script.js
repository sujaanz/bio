/**
 * ============================================================
 * Link-in-Bio Interactive Scripts
 * Professional Deployment Version
 * ============================================================
 */

// ------------------------------------------------------------
// 1. Theme Configuration & Persistence Logic
// ------------------------------------------------------------
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Retrieve stored theme preference
const savedTheme = localStorage.getItem('bio-theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('bio-theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('bio-theme', 'dark');
        }
    });
}

// ------------------------------------------------------------
// 2. Typewriter Effect Generator
// ------------------------------------------------------------
const texts = [
    "Hello 👋 ! I am SuJaan",
    "Computer Science Student 💻",
    "Building things for the web 🚀",
    "Exploring Code & Tech ✨",
    "Welcome to my digital space 🌐"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typedTextSpan = document.getElementById("typed-text");
    if (!typedTextSpan) return;
    
    const currentText = texts[textIndex];
    
    // Typing logic mapping
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    // Dynamic typing speeds
    let typeSpeed = isDeleting ? 40 : 80;
    
    // Pause state execution
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2500; // Hold full text for 2.5s
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before new line for 0.5s
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// ------------------------------------------------------------
// 3. Web Share API Handler
// ------------------------------------------------------------
function shareProfile() {
    if (navigator.share) {
        navigator.share({
            title: 'SuJaan - Link Bio',
            text: 'Check out my official link bio page!',
            url: window.location.href,
        }).catch((error) => console.log('Error sharing sequence:', error));
    } else {
        // Fallback for browsers without native share support
        navigator.clipboard.writeText(window.location.href);
        alert('Profile link securely copied to clipboard!');
    }
}

// ------------------------------------------------------------
// 4. Mathematical Counter Animation
// ------------------------------------------------------------
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ------------------------------------------------------------
// 5. Preloader Sequence Initiation
// ------------------------------------------------------------
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Delays removal to ensure splash screen is visible momentarily
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1200); 
    }
});

// ------------------------------------------------------------
// 6. Primary DOM Content Loaded Sequences
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize primary typewriter sequence
    setTimeout(typeEffect, 500);

    // Sequence for staggered card entrance animation
    const cards = document.querySelectorAll('.link-card, .music-widget-wrapper, .visitor-counter-box');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        // Generates structural delay coefficient per node
        card.style.transition = `all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.12}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
        }, 100);
    });

    // ------------------------------------------------------------
    // Real-Time Visitor Counter & Fail-safe Initialization
    // ------------------------------------------------------------
    const namespace = "sujaanz-link-bio";
    const key = "visits";
    
    fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
        .then(response => {
            // Validate response header to enforce fallback protocol on failure
            if (!response.ok) {
                throw new Error("API architecture currently unreachable");
            }
            return response.json();
        })
        .then(data => {
            const visitElement = document.getElementById("visit-count");
            // Executes live data sequence if dataset validates correctly
            if (visitElement && data && typeof data.count === 'number') {
                animateValue(visitElement, 0, data.count, 2000); 
            } else {
                throw new Error("Structural count data missing in response");
            }
        })
        .catch(error => {
            // Triggers automatic fallback numerical rendering
            console.log('Initiating fallback sequence for visitor telemetry due to API unresponsiveness.');
            const visitElement = document.getElementById("visit-count");
            if (visitElement) {
                animateValue(visitElement, 0, 1240, 2000);
            }
        });

    // ------------------------------------------------------------
    // 7. Interactive 3D Card Tilt Engine
    // ------------------------------------------------------------
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculates mouse position relative to the element bounds
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Computes degree angles for tilt depth 
            const rotateX = ((y - centerY) / centerY) * -8; 
            const rotateY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `perspective(1000px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Normalizes parameters on pointer exit
        card.addEventListener('pointerleave', () => {
            card.style.transform = `perspective(1000px) scale(1) rotateX(0) rotateY(0)`;
        });
    });
});