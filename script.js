// ============================================
// Theme Toggle
// ============================================

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

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
// Code Editor Animation
// ============================================

const codeSnippets = [
    {
        code: `<span class="code-keyword">const</span> <span class="code-variable">Portfolio</span> = () => {
  <span class="code-keyword">return</span> (
    <span class="code-tag">&lt;div</span> <span class="code-property">className</span>=<span class="code-string">"portfolio"</span><span class="code-tag">&gt;</span>
      <span class="code-tag">&lt;Hero</span> <span class="code-property">name</span>=<span class="code-string">"Daniel Rivni"</span> <span class="code-tag">/&gt;</span>
      <span class="code-tag">&lt;Projects</span> <span class="code-property">projects</span>={<span class="code-variable">featuredProjects</span>} <span class="code-tag">/&gt;</span>
      <span class="code-tag">&lt;Skills</span> <span class="code-property">tech</span>={<span class="code-variable">techStack</span>} <span class="code-tag">/&gt;</span>
    <span class="code-tag">&lt;/div&gt;</span>
  );
};`,
        title: 'portfolio.tsx'
    },
    {
        code: `<span class="code-keyword">async</span> <span class="code-keyword">function</span> <span class="code-variable">deployProject</span>() {
  <span class="code-keyword">const</span> <span class="code-variable">build</span> = <span class="code-keyword">await</span> <span class="code-variable">docker</span>.<span class="code-property">build</span>(<span class="code-string">'./app'</span>);
  <span class="code-keyword">await</span> <span class="code-variable">kubernetes</span>.<span class="code-property">deploy</span>(<span class="code-variable">build</span>);
  <span class="code-keyword">return</span> <span class="code-string">'Deployed!'</span>;
}`,
        title: 'deploy.ts'
    },
    {
        code: `<span class="code-keyword">const</span> <span class="code-variable">techStack</span> = {
  <span class="code-property">frontend</span>: [<span class="code-string">'React'</span>, <span class="code-string">'TypeScript'</span>],
  <span class="code-property">backend</span>: [<span class="code-string">'Node.js'</span>, <span class="code-string">'Python'</span>],
  <span class="code-property">cloud</span>: [<span class="code-string">'Docker'</span>, <span class="code-string">'K8s'</span>]
};`,
        title: 'stack.js'
    }
];

let currentSnippetIndex = 0;
const codeWindow = document.querySelector('.code-window');
const codeContent = document.getElementById('code-content');
const codeTitle = document.querySelector('.code-title');

function animateCodeSnippet() {
    if (!codeContent || !codeTitle) return;
    
    const snippet = codeSnippets[currentSnippetIndex];
    codeTitle.textContent = snippet.title;
    
    const codeElement = codeContent.querySelector('code');
    if (!codeElement) return;
    
    codeElement.innerHTML = '';
    let charIndex = 0;
    const codeText = snippet.code;
    
    function typeCode() {
        if (charIndex < codeText.length) {
            const char = codeText.charAt(charIndex);
            codeElement.innerHTML += char;
            charIndex++;
            const delay = char === '\n' ? 150 : 30;
            setTimeout(typeCode, delay);
        } else {
            // Wait before switching to next snippet
            setTimeout(() => {
                currentSnippetIndex = (currentSnippetIndex + 1) % codeSnippets.length;
                animateCodeSnippet();
            }, 3000);
        }
    }
    
    typeCode();
}

// Start animation after page load
if (codeWindow) {
    setTimeout(() => {
        animateCodeSnippet();
    }, 1500);
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
