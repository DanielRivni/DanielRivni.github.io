// ============================================
// Navigation
// ============================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.about-content, .skill-category, .project-card, .contact-content, .highlight-item'
);

animateElements.forEach(el => {
    observer.observe(el);
});

// ============================================
// Typing Animation for Hero Title
// ============================================

const titleText = document.querySelector('.title-text');
if (titleText) {
    const text = titleText.textContent;
    titleText.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            titleText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
}

// ============================================
// Contact Form
// ============================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Create mailto link (since GitHub Pages doesn't support server-side processing)
        const subject = encodeURIComponent(`Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:drivni123@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #27c93f 0%, #20b83a 100%)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// ============================================
// Active Navigation Link Highlighting
// ============================================

const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// Skill Items Animation
// ============================================

const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.05}s`;
});

// ============================================
// Project Cards Parallax Effect
// ============================================

const projectCards = document.querySelectorAll('.project-card');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    projectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + window.pageYOffset;
        const cardHeight = rect.height;
        
        if (scrolled + window.innerHeight > cardTop && scrolled < cardTop + cardHeight) {
            const yPos = -(scrolled - cardTop) * 0.1;
            card.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// ============================================
// Smooth Scroll for Scroll Indicator
// ============================================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// ============================================
// Code Window Animation
// ============================================

const codeWindow = document.querySelector('.code-window');

if (codeWindow) {
    // Add typing effect to terminal commands
    const codeContent = codeWindow.querySelector('code');
    if (codeContent) {
        const originalCode = codeContent.innerHTML;
        codeContent.innerHTML = '';
        
        setTimeout(() => {
            let charIndex = 0;
            const codeText = originalCode;
            
            function typeCode() {
                if (charIndex < codeText.length) {
                    const char = codeText.charAt(charIndex);
                    codeContent.innerHTML += char;
                    charIndex++;
                    // Faster typing for terminal effect
                    const delay = char === '\n' ? 200 : 50;
                    setTimeout(typeCode, delay);
                }
            }
            
            typeCode();
        }, 1500);
    }
}

// ============================================
// Performance Optimization
// ============================================

// Throttle function for scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    highlightNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ============================================
// Console Message
// ============================================

console.log('%c👋 Hello!', 'font-size: 20px; font-weight: bold; color: #0ea5e9;');
console.log('%cInterested in working together?', 'font-size: 14px; color: #475569;');
console.log('%cGet in touch: drivni123@gmail.com', 'font-size: 12px; color: #64748b;');
