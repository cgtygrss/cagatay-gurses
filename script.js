const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const navbar = document.getElementById('navbar');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

window.addEventListener('scroll', () => {
    if (!navbar) {
        return;
    }

    navbar.style.borderBottomColor = window.scrollY > 18 ? 'rgba(148, 163, 184, 0.3)' : 'transparent';

    let currentSection = '';
    sections.forEach((section) => {
        const top = section.offsetTop - 110;
        if (window.scrollY >= top) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${currentSection}`;
        link.classList.toggle('active', isActive);
    });
});

// Smooth scroll for anchors
const allAnchors = document.querySelectorAll('a[href^="#"]');
allAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') {
            return;
        }

        const target = document.querySelector(href);
        if (!target) {
            return;
        }

        event.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 76;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

// Typing effect
const typedTextElement = document.querySelector('.typed-text');
const words = [
    'Application Developer',
    '.NET Developer',
    'C# Specialist',
    'Full Stack Developer'
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function runTypingEffect() {
    if (!typedTextElement) {
        return;
    }

    const currentWord = words[wordIndex];

    if (!deleting) {
        charIndex += 1;
        typedTextElement.textContent = currentWord.slice(0, charIndex);

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(runTypingEffect, 1500);
            return;
        }

        setTimeout(runTypingEffect, 90);
        return;
    }

    charIndex -= 1;
    typedTextElement.textContent = currentWord.slice(0, charIndex);

    if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(runTypingEffect, 360);
        return;
    }

    setTimeout(runTypingEffect, 55);
}

// Wait for all resources (images, etc.) before starting typing effect
if (document.readyState === 'complete') {
    setTimeout(runTypingEffect, 700);
} else {
    window.onload = () => setTimeout(runTypingEffect, 700);
}

// Reveal animations on scroll
const revealElements = document.querySelectorAll(
    '.about-content, .skill-category, .timeline-item, .education-card, .project-card, .contact-content'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

// Delay reveal animations until all resources are loaded
function startRevealAnimations() {
    revealElements.forEach((element) => revealObserver.observe(element));
}

if (document.readyState === 'complete') {
    startRevealAnimations();
} else {
    window.onload = startRevealAnimations;
}

// Contact form mailto fallback
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const subject = document.getElementById('subject')?.value.trim() || 'Portfolio Contact';
        const message = document.getElementById('message')?.value.trim() || '';

        const body = `Hello Çağatay,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}`;
        const link = `mailto:cgtygrss@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = link;
        contactForm.reset();
    });
}

// Chatbot
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMinimize = document.getElementById('chatbotMinimize');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotBadge = document.getElementById('chatbotBadge');

function chatbotIsReady() {
    return chatbotToggle && chatbotContainer && chatbotInput && chatbotSend && chatbotMessages;
}

function setChatbotOpen(open) {
    if (!chatbotIsReady()) {
        return;
    }

    chatbotContainer.classList.toggle('active', open);
    chatbotToggle.classList.toggle('active', open);

    if (open) {
        chatbotBadge.style.display = 'none';
        chatbotInput.focus();
    }
}

if (chatbotIsReady()) {
    chatbotToggle.addEventListener('click', () => {
        const shouldOpen = !chatbotContainer.classList.contains('active');
        setChatbotOpen(shouldOpen);
    });

    chatbotClose?.addEventListener('click', () => setChatbotOpen(false));
    chatbotMinimize?.addEventListener('click', () => setChatbotOpen(false));

    chatbotInput.addEventListener('input', () => {
        chatbotSend.disabled = !chatbotInput.value.trim();
    });
}

function nowTime() {
    return new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function addMessage(text, type = 'bot') {
    if (!chatbotMessages) {
        return;
    }

    const message = document.createElement('div');
    message.className = `chatbot-message ${type}-message`;

    const avatarEmoji = type === 'user' ? '👤' : '🤖';
    const avatarClass = type === 'user' ? 'user-avatar' : 'bot-avatar';

    message.innerHTML = `
        <div class="message-avatar ${avatarClass}">
            <span>${avatarEmoji}</span>
        </div>
        <div class="message-bubble-wrapper">
            <div class="message-content"><p>${text}</p></div>
            <span class="message-time">${nowTime()}</span>
        </div>
    `;

    chatbotMessages.appendChild(message);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotReply(userText) {
    const text = userText.toLowerCase();

    if (text.includes('about') || text.includes('who')) {
        return 'Çağatay is an Application Developer focused on .NET and full-stack development, with experience delivering enterprise solutions that improve efficiency and scalability.';
    }
    if (text.includes('project')) {
        return 'You can explore the Projects section to see selected work across web, mobile, and machine learning.';
    }
    if (text.includes('skill') || text.includes('tech')) {
        return 'His core stack includes C#, .NET/.NET Core, React, JavaScript/TypeScript, SQL, and API integrations.';
    }
    if (text.includes('experience') || text.includes('work') || text.includes('job')) {
        return 'He currently works as an Application Developer at PwC Turkey and previously worked as a Software Developer at MUDO.';
    }
    if (text.includes('hire') || text.includes('available') || text.includes('availability')) {
        return 'For current availability and opportunities, please reach out through the Contact section or LinkedIn for a direct response.';
    }
    if (text.includes('contact') || text.includes('email') || text.includes('linkedin')) {
        return 'You can contact him at cgtygrss@gmail.com or connect on LinkedIn through the Contact section.';
    }

    return 'I can help with experience, skills, projects, and contact information. What would you like to know?';
}

function sendChatMessage(messageText) {
    const trimmed = messageText.trim();
    if (!trimmed) {
        return;
    }

    addMessage(trimmed, 'user');
    chatbotInput.value = '';
    chatbotSend.disabled = true;

    const typing = document.createElement('div');
    typing.className = 'chatbot-message bot-message';
    typing.id = 'typingIndicator';
    typing.innerHTML = `
        <div class="message-avatar bot-avatar"><span>🤖</span></div>
        <div class="message-bubble-wrapper">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;

    chatbotMessages.appendChild(typing);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    setTimeout(() => {
        typing.remove();
        addMessage(getBotReply(trimmed), 'bot');
    }, 650);
}

if (chatbotIsReady()) {
    chatbotSend.addEventListener('click', () => sendChatMessage(chatbotInput.value));

    chatbotInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !chatbotSend.disabled) {
            sendChatMessage(chatbotInput.value);
        }
    });

    document.addEventListener('click', (event) => {
        const quickReply = event.target.closest('.quick-reply, .suggestion-chip');
        if (!quickReply) {
            return;
        }

        const msg = quickReply.getAttribute('data-message');
        if (msg) {
            sendChatMessage(msg);
        }

        if (quickReply.classList.contains('quick-reply')) {
            quickReply.parentElement?.remove();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && chatbotContainer.classList.contains('active')) {
            setChatbotOpen(false);
        }
    });
}
