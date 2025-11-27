// ===== MOBILE MENU TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    let current = '';
    
    // Add shadow to navbar on scroll
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    // Highlight active section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== TYPING EFFECT =====
const typedTextElement = document.querySelector('.typed-text');
const texts = [
    'Application Developer',
    '.NET Developer',
    'C# Specialist',
    'Full Stack Developer',
    'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;
let deletingDelay = 100;
let newTextDelay = 2000;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = deletingDelay;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500;
    }
    
    setTimeout(type, typingDelay);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(type, 1000);
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.skill-category, .education-card, .project-card, .timeline-item, .about-content'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Your email address
    const recipientEmail = 'cgtygrss@gmail.com';
    
    // Create email body with sender info
    const emailBody = `Hello Çağatay,

${formData.message}

---
From: ${formData.name}
Email: ${formData.email}`;
    
    // Create mailto link with encoded values
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open the default email client
    window.location.href = mailtoLink;
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        font-weight: 500;
    `;
    successMessage.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-envelope-open" style="font-size: 1.5rem;"></i>
            <span>Opening your email client...</span>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        successMessage.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            if (document.body.contains(successMessage)) {
                document.body.removeChild(successMessage);
            }
        }, 500);
    }, 3000);
    
    // Reset form after a short delay
    setTimeout(() => {
        contactForm.reset();
    }, 1000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// ===== SKILL TAG HOVER EFFECT =====
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ===== PROJECT CARD 3D TILT EFFECT =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopButton.style.display = 'flex';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopButton.addEventListener('mouseenter', () => {
    scrollTopButton.style.transform = 'scale(1.1) translateY(-5px)';
});

scrollTopButton.addEventListener('mouseleave', () => {
    scrollTopButton.style.transform = 'scale(1) translateY(0)';
});

// ===== ANIMATED COUNTERS (if you want to add statistics) =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== LAZY LOAD IMAGES =====
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== EASTER EGG - KONAMI CODE =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Trigger confetti or special animation
        document.body.style.animation = 'rainbow 2s ease infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ===== PRELOADER (Optional) =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// ===== THEME TOGGLE (Dark/Light Mode - Optional) =====
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: white;
        color: #1e3a8a;
        border: 2px solid #e5e7eb;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 998;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// Uncomment to enable theme toggle
// initThemeToggle();

// ===== CHATBOT FUNCTIONALITY =====
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMinimize = document.getElementById('chatbotMinimize');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotBadge = document.getElementById('chatbotBadge');
const chatbotSuggestions = document.getElementById('chatbotSuggestions');

// Conversation context
let conversationContext = {
    lastTopic: null,
    messageCount: 0,
    userName: null,
    interests: []
};

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
    const isActive = chatbotContainer.classList.toggle('active');
    chatbotToggle.classList.toggle('active');
    if (isActive) {
        chatbotBadge.style.display = 'none';
        chatbotInput.focus();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
    chatbotToggle.classList.remove('active');
});

chatbotMinimize.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
    chatbotToggle.classList.remove('active');
});

// Enable/disable send button based on input
chatbotInput.addEventListener('input', () => {
    chatbotSend.disabled = !chatbotInput.value.trim();
});

// Format time
function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Send message function
function sendMessage(message) {
    if (!message.trim()) return;
    
    conversationContext.messageCount++;
    
    // Add user message
    const userMessage = createMessageElement(message, 'user');
    chatbotMessages.appendChild(userMessage);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Clear input and disable send button
    chatbotInput.value = '';
    chatbotSend.disabled = true;
    
    // Hide suggestions after first interaction
    if (chatbotSuggestions && conversationContext.messageCount === 1) {
        chatbotSuggestions.style.display = 'none';
    }
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chatbot-message bot-message';
    typingIndicator.id = 'typingIndicator';
    typingIndicator.innerHTML = `
        <div class="message-avatar bot-avatar">
            <span>🤖</span>
        </div>
        <div class="message-bubble-wrapper">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatbotMessages.appendChild(typingIndicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Calculate dynamic response time (feels more natural)
    const responseTime = 800 + Math.random() * 1200;
    
    // Simulate bot response
    setTimeout(() => {
        typingIndicator.remove();
        const response = getBotResponse(message);
        const botMessage = createMessageElement(response.text, 'bot', response.quickReplies);
        chatbotMessages.appendChild(botMessage);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, responseTime);
}

// Create message element
function createMessageElement(text, sender, quickReplies = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;
    
    const avatarEmoji = sender === 'bot' ? '🤖' : '👤';
    const avatarClass = sender === 'bot' ? 'bot-avatar' : 'user-avatar';
    
    let quickRepliesHTML = '';
    if (quickReplies && quickReplies.length > 0) {
        quickRepliesHTML = `
            <div class="quick-replies">
                ${quickReplies.map(qr => `
                    <button class="quick-reply" data-message="${qr.message}">
                        <i class="${qr.icon}"></i> ${qr.label}
                    </button>
                `).join('')}
            </div>
        `;
    }
    
    messageDiv.innerHTML = `
        <div class="message-avatar ${avatarClass}">
            <span>${avatarEmoji}</span>
        </div>
        <div class="message-bubble-wrapper">
            <div class="message-content">
                <p>${text}</p>
            </div>
            <span class="message-time">
                ${formatTime()}
                ${sender === 'user' ? '<i class="fas fa-check-double message-status"></i>' : ''}
            </span>
            ${quickRepliesHTML}
        </div>
    `;
    
    return messageDiv;
}

// Smart response system with context awareness
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase().trim();
    const words = lowerMessage.split(/\s+/);
    
    // Check for name
    const nameMatch = message.match(/(?:my name is|i'm|i am|call me)\s+(\w+)/i);
    if (nameMatch) {
        conversationContext.userName = nameMatch[1];
        return {
            text: `Nice to meet you, ${nameMatch[1]}! 😊 How can I help you learn more about Çağatay today?`,
            quickReplies: [
                { label: 'His background', message: 'Tell me about Çağatay', icon: 'fas fa-user' },
                { label: 'Technical skills', message: 'What technologies does he know?', icon: 'fas fa-code' }
            ]
        };
    }
    
    // Greetings
    if (/^(hi|hello|hey|greetings|howdy|hola|merhaba)/i.test(lowerMessage)) {
        const greetings = [
            "Hello there! 👋 Great to see you! What would you like to know about Çağatay?",
            "Hey! 😊 Welcome! I'd love to help you learn about Çağatay's work and experience.",
            "Hi! 🌟 Thanks for stopping by! Feel free to ask me anything about Çağatay."
        ];
        return {
            text: greetings[Math.floor(Math.random() * greetings.length)],
            quickReplies: [
                { label: 'About him', message: 'Who is Çağatay?', icon: 'fas fa-user' },
                { label: 'His work', message: 'Where does he work?', icon: 'fas fa-briefcase' }
            ]
        };
    }
    
    // About Çağatay
    if (/who is|about (çağatay|cagatay|him)|tell me about|yourself/i.test(lowerMessage)) {
        conversationContext.lastTopic = 'about';
        return {
            text: "Çağatay Gürses is an <strong>Application Developer</strong> based in Istanbul, Turkey 🇹🇷<br><br>He's passionate about building innovative solutions with modern technologies. Currently at <strong>PwC Turkey</strong> since March 2025, previously worked as a Software Developer at <strong>MUDO</strong> for nearly 3 years.<br><br>He graduated from <strong>Maltepe University</strong> with a degree in Software Engineering (2015-2019). 🎓",
            quickReplies: [
                { label: 'His skills', message: 'What are his technical skills?', icon: 'fas fa-code' },
                { label: 'Experience', message: 'Tell me about his work experience', icon: 'fas fa-briefcase' },
                { label: 'Projects', message: 'What projects has he built?', icon: 'fas fa-folder-open' }
            ]
        };
    }
    
    // MUDO specific
    if (/mudo|previous job|before pwc|past experience/i.test(lowerMessage)) {
        conversationContext.lastTopic = 'mudo';
        return {
            text: "🏢 <strong>MUDO - Software Developer</strong><br>July 2022 - March 2025<br><br>Key achievements at MUDO:<br><br>• Developed a <strong>store furniture sales program</strong> using .NET technologies (C#, MVC, ASP.NET Web API, MSSQL, Oracle DB)<br><br>• Built an <strong>Outlook email/calendar sync tool</strong> with EWS and Power Automate, saving <strong>$1,600/month</strong><br><br>• Created <strong>REST APIs for international stores</strong> with JWT security & Oracle DB, resulting in <strong>10% sales increase</strong>",
            quickReplies: [
                { label: 'Current job at PwC', message: 'What does he do at PwC?', icon: 'fas fa-briefcase' },
                { label: 'His skills', message: 'What technologies does he know?', icon: 'fas fa-code' }
            ]
        };
    }
    
    // PwC specific
    if (/pwc|current job|current role|application developer/i.test(lowerMessage)) {
        conversationContext.lastTopic = 'pwc';
        return {
            text: "🏢 <strong>PwC Turkey - Application Developer</strong><br>March 2025 - Present<br><br>Key responsibilities at PwC:<br><br>• Developing <strong>reporting applications</strong> using DevExpress for advanced data visualization<br><br>• Automating data processes, improving efficiency by <strong>50%</strong><br><br>• Leading migration from <strong>ASP.NET to React</strong> for a modern, scalable interface",
            quickReplies: [
                { label: 'Previous job at MUDO', message: 'What did he do at MUDO?', icon: 'fas fa-history' },
                { label: 'His skills', message: 'What technologies does he use?', icon: 'fas fa-code' }
            ]
        };
    }
    
    // Experience / Work
    if (/experience|work|job|career|company|employer|position/i.test(lowerMessage)) {
        conversationContext.lastTopic = 'experience';
        conversationContext.interests.push('career');
        return {
            text: "💼 <strong>Work Experience:</strong><br><br><strong>1. PwC Turkey</strong> (March 2025 - Present)<br>Application Developer<br>• DevExpress reporting apps<br>• 50% efficiency improvement via automation<br>• ASP.NET to React migration<br><br><strong>2. MUDO</strong> (July 2022 - March 2025)<br>Software Developer<br>• Store furniture sales program (.NET/MVC)<br>• Outlook sync tool ($1,600/month savings)<br>• REST APIs for international expansion (10% sales increase)",
            quickReplies: [
                { label: 'More about PwC', message: 'What does he do at PwC?', icon: 'fas fa-building' },
                { label: 'More about MUDO', message: 'What did he do at MUDO?', icon: 'fas fa-store' },
                { label: 'Tech stack', message: 'What technologies does he use?', icon: 'fas fa-cogs' }
            ]
        };
    }
    
    // Skills / Technologies
    if (/skill|tech|programming|code|know|stack|framework/i.test(lowerMessage)) {
        conversationContext.lastTopic = 'skills';
        conversationContext.interests.push('technical');
        return {
            text: "🛠️ <strong>Çağatay's Tech Arsenal:</strong><br><br><strong>Languages:</strong><br>• C • C# • TypeScript • JavaScript • Python<br><br><strong>Backend:</strong><br>• .NET / .NET Core • MVC • ASP.NET Web API<br>• SOAP & REST API Development<br><br><strong>Frontend:</strong><br>• MERN Stack (MongoDB, Express, React, Node.js)<br><br><strong>Databases:</strong><br>• MSSQL • Oracle DB • MongoDB<br><br><strong>Tools & Methods:</strong><br>• Git • TFS • Agile/Scrum<br><br>He's always learning new technologies! 📚",
            quickReplies: [
                { label: '.NET details', message: 'Tell me more about his .NET experience', icon: 'fas fa-server' },
                { label: 'See projects', message: 'Show me his projects', icon: 'fas fa-folder-open' }
            ]
        };
    }
    
    // .NET specific
    if (/\.net|dotnet|csharp|c#|asp\.net/i.test(lowerMessage)) {
        conversationContext.lastTopic = 'dotnet';
        return {
            text: "⚙️ <strong>.NET Expertise:</strong><br><br>Çağatay is highly skilled in the .NET ecosystem:<br><br>• <strong>.NET / .NET Core</strong> - Enterprise application development<br>• <strong>ASP.NET MVC</strong> - Web application architecture<br>• <strong>ASP.NET Web API</strong> - RESTful service development<br>• <strong>Entity Framework</strong> - Database operations & ORM<br><br>He's used .NET extensively at both PwC and MUDO for building enterprise solutions! 🏢",
            quickReplies: [
                { label: 'Other skills', message: 'What other technologies does he know?', icon: 'fas fa-plus' },
                { label: 'Contact him', message: 'How can I reach him?', icon: 'fas fa-envelope' }
            ]
        };
    }
    
    // Projects
    if (/project|portfolio|built|created|made|developed/i.test(lowerMessage)) {
        conversationContext.lastTopic = 'projects';
        return {
            text: "🚀 <strong>Featured Projects:</strong><br><br><strong>1. E-Commerce Platform</strong><br>Full-featured online store with user auth, product management, and checkout<br>Tech: React, Node.js, Express, MongoDB<br><br><strong>2. Appointment Prediction (ML)</strong><br>Machine learning model predicting no-shows with 87% accuracy<br>Tech: Python, Scikit-Learn, Pandas, Matplotlib<br><br><strong>3. Neo Glide</strong><br>Hyper-casual mobile game with neon aesthetics<br>Tech: React Native, Expo, React Native Game Engine<br><br>Check out the <a href='#projects'>Projects Section</a> for more details! ✨",
            quickReplies: [
                { label: 'View projects', message: 'Take me to projects section', icon: 'fas fa-external-link-alt' },
                { label: 'His skills', message: 'What technologies does he know?', icon: 'fas fa-code' }
            ]
        };
    }
    
    // E-commerce project specific
    if (/e-?commerce|online store|shopping/i.test(lowerMessage)) {
        return {
            text: "🛒 <strong>E-Commerce Platform Project:</strong><br><br>A full-featured online shopping platform including:<br>• User authentication<br>• Product management<br>• Shopping cart<br>• Secure checkout<br><br><strong>Technologies:</strong> React, Node.js, Express.js, MongoDB<br><br>This project showcases Çağatay's full-stack development skills with the MERN stack!",
            quickReplies: [
                { label: 'Other projects', message: 'What other projects has he built?', icon: 'fas fa-folder-open' },
                { label: 'View all projects', message: 'Take me to projects section', icon: 'fas fa-external-link-alt' }
            ]
        };
    }
    
    // ML/Appointment Prediction project
    if (/machine learning|ml|appointment|prediction|no-?show/i.test(lowerMessage)) {
        return {
            text: "🤖 <strong>Appointment Prediction Project:</strong><br><br>A machine learning model that predicts patient no-shows with <strong>87% accuracy</strong>.<br><br>Features:<br>• Data analysis and preprocessing<br>• Feature engineering<br>• Model training and evaluation<br><br><strong>Technologies:</strong> Python, Scikit-Learn, Pandas, Matplotlib<br><br>Çağatay also has certifications in Neural Networks and Machine Learning! 🎓",
            quickReplies: [
                { label: 'His certifications', message: 'What certifications does he have?', icon: 'fas fa-certificate' },
                { label: 'Other projects', message: 'Show me other projects', icon: 'fas fa-folder-open' }
            ]
        };
    }
    
    // Neo Glide game project
    if (/neo glide|game|mobile|react native/i.test(lowerMessage)) {
        return {
            text: "🎮 <strong>Neo Glide Project:</strong><br><br>A hyper-casual mobile game with stunning neon aesthetics!<br><br>Features:<br>• Smooth gameplay mechanics<br>• Vibrant neon visual design<br>• Cross-platform mobile support<br><br><strong>Technologies:</strong> React Native, Expo, React Native Game Engine<br><br>This showcases Çağatay's mobile development and game design skills! 📱",
            quickReplies: [
                { label: 'Other projects', message: 'What other projects has he built?', icon: 'fas fa-folder-open' },
                { label: 'His skills', message: 'What technologies does he know?', icon: 'fas fa-code' }
            ]
        };
    }
    
    // Certifications
    if (/certification|certificate|certified|course/i.test(lowerMessage)) {
        conversationContext.lastTopic = 'certifications';
        return {
            text: "📜 <strong>Certifications:</strong><br><br><strong>SQL Server Database Programming:</strong><br>• Basic, Intermediate, and Professional levels<br><br><strong>Neural Networks & Deep Learning:</strong><br>• Coursera certification<br><br><strong>Machine Learning:</strong><br>• Coursera certification<br><br>Çağatay is committed to continuous learning and professional development! 🎯",
            quickReplies: [
                { label: 'His education', message: 'Where did he study?', icon: 'fas fa-graduation-cap' },
                { label: 'His projects', message: 'Show me his projects', icon: 'fas fa-folder-open' }
            ]
        };
    }
    
    // Contact
    if (/contact|email|reach|phone|linkedin|github|connect/i.test(lowerMessage)) {
        conversationContext.lastTopic = 'contact';
        return {
            text: "📬 <strong>Let's Connect!</strong><br><br>You can reach Çağatay through:<br><br>📧 <strong>Email:</strong> <a href='mailto:cgtygrss@gmail.com'>cgtygrss@gmail.com</a><br><br>💼 <strong>LinkedIn:</strong> <a href='https://linkedin.com/in/cagataygurses' target='_blank'>linkedin.com/in/cagataygurses</a><br><br>💻 <strong>GitHub:</strong> <a href='https://github.com/cagataygurses' target='_blank'>github.com/cagataygurses</a><br><br>📱 <strong>Phone:</strong> 0539 674 1334<br><br>He's open to new opportunities and collaborations! 🤝",
            quickReplies: [
                { label: 'Go to contact form', message: 'Open contact form', icon: 'fas fa-paper-plane' }
            ]
        };
    }
    
    // Education
    if (/education|degree|university|college|study|graduate|school|maltepe/i.test(lowerMessage)) {
        conversationContext.lastTopic = 'education';
        return {
            text: "🎓 <strong>Education:</strong><br><br><strong>Maltepe University</strong><br>Bachelor's Degree in Software Engineering<br>2015 - 2019 | Istanbul, Turkey<br><br>During his studies, Çağatay developed a strong foundation in:<br>• Software Development Principles<br>• Data Structures & Algorithms<br>• Database Management<br>• Web Technologies<br><br>He also holds certifications in SQL Server, Neural Networks, and Machine Learning! 📚",
            quickReplies: [
                { label: 'Certifications', message: 'What certifications does he have?', icon: 'fas fa-certificate' },
                { label: 'Skills gained', message: 'What skills does he have?', icon: 'fas fa-graduation-cap' }
            ]
        };
    }
    
    // Location
    if (/location|where|based|live|city|country|istanbul|turkey/i.test(lowerMessage)) {
        return {
            text: "📍 <strong>Location:</strong><br><br>Çağatay is based in <strong>Istanbul, Turkey</strong> 🇹🇷<br><br>He's open to:<br>• Local opportunities in Istanbul<br>• Remote work worldwide<br>• Hybrid arrangements<br><br>Feel free to reach out regardless of location! 🌍",
            quickReplies: [
                { label: 'Contact him', message: 'How do I contact him?', icon: 'fas fa-envelope' },
                { label: 'Availability', message: 'Is he available for work?', icon: 'fas fa-clock' }
            ]
        };
    }
    
    // Availability / Hiring
    if (/available|hire|hiring|freelance|opportunity|open to/i.test(lowerMessage)) {
        return {
            text: "✅ <strong>Availability:</strong><br><br>Çağatay is currently working at PwC Turkey but is open to discussing new opportunities!<br><br>He's interested in:<br>• Full-time positions<br>• Contract work<br>• Freelance projects<br>• Collaborations<br><br>The best way to reach him is via <a href='mailto:cgtygrss@gmail.com'>email</a> or <a href='https://linkedin.com/in/cagataygurses' target='_blank'>LinkedIn</a>. ⚡",
            quickReplies: [
                { label: 'Send email', message: 'How can I contact him?', icon: 'fas fa-envelope' },
                { label: 'His experience', message: 'Tell me about his experience', icon: 'fas fa-briefcase' }
            ]
        };
    }
    
    // Thank you
    if (/thank|thanks|appreciate|helpful/i.test(lowerMessage)) {
        const responses = [
            "You're very welcome! 😊 Is there anything else you'd like to know?",
            "Happy to help! 🌟 Feel free to ask more questions anytime!",
            "My pleasure! 💫 Don't hesitate to reach out if you need more info!"
        ];
        return {
            text: responses[Math.floor(Math.random() * responses.length)],
            quickReplies: [
                { label: 'Contact Çağatay', message: 'How can I contact him?', icon: 'fas fa-envelope' }
            ]
        };
    }
    
    // Goodbye
    if (/bye|goodbye|see you|take care|cya/i.test(lowerMessage)) {
        return {
            text: `Goodbye${conversationContext.userName ? `, ${conversationContext.userName}` : ''}! 👋 Thanks for visiting Çağatay's portfolio. Feel free to come back anytime, and don't forget to check out the <a href='#contact' onclick='document.getElementById(\"chatbotClose\").click()'>Contact Section</a> if you'd like to connect! 🌟`,
            quickReplies: []
        };
    }
    
    // Navigate to section
    if (/take me|go to|show me|open.*section|scroll to/i.test(lowerMessage)) {
        if (/project/i.test(lowerMessage)) {
            setTimeout(() => {
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
            return { text: "Taking you to the Projects section! 🚀", quickReplies: [] };
        }
        if (/contact/i.test(lowerMessage)) {
            setTimeout(() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
            return { text: "Opening the Contact section for you! 📬", quickReplies: [] };
        }
        if (/about/i.test(lowerMessage)) {
            setTimeout(() => {
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
            return { text: "Here's the About section! 👤", quickReplies: [] };
        }
        if (/skill/i.test(lowerMessage)) {
            setTimeout(() => {
                document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
            return { text: "Check out the Skills section! 🛠️", quickReplies: [] };
        }
        if (/experience/i.test(lowerMessage)) {
            setTimeout(() => {
                document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
            return { text: "Here's the Experience section! 💼", quickReplies: [] };
        }
        if (/education/i.test(lowerMessage)) {
            setTimeout(() => {
                document.querySelector('#education')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
            return { text: "Check out the Education section! 🎓", quickReplies: [] };
        }
    }
    
    // Languages (spoken)
    if (/speak|language|english|turkish/i.test(lowerMessage) && !/programming/i.test(lowerMessage)) {
        return {
            text: "�️ <strong>Languages:</strong><br><br>• <strong>Turkish:</strong> Native<br>• <strong>English:</strong> Professional proficiency<br><br>Çağatay can communicate effectively in both languages in professional settings! 🌍",
            quickReplies: []
        };
    }
    
    // Fun / Easter eggs
    if (/joke|funny|laugh/i.test(lowerMessage)) {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😄",
            "Why did the developer go broke? Because he used up all his cache! 💸",
            "There are only 10 types of people: those who understand binary and those who don't! 🤓"
        ];
        return {
            text: jokes[Math.floor(Math.random() * jokes.length)],
            quickReplies: [
                { label: 'Another joke', message: 'Tell me another joke', icon: 'fas fa-laugh' },
                { label: 'Back to business', message: 'Tell me about Çağatay', icon: 'fas fa-user' }
            ]
        };
    }
    
    // Favorite / Hobbies
    if (/hobby|hobbies|free time|fun|interest|like to do/i.test(lowerMessage)) {
        return {
            text: "🎯 <strong>Beyond Coding:</strong><br><br>While Çağatay loves building software, he also enjoys:<br>• Exploring new technologies and frameworks<br>• Building mobile games (like Neo Glide!)<br>• Learning about Machine Learning and AI<br>• Continuous professional development<br><br>He believes in continuous learning and growth! 📈",
            quickReplies: [
                { label: 'His projects', message: 'Show me his projects', icon: 'fas fa-folder-open' }
            ]
        };
    }
    
    // Database specific
    if (/database|sql|mssql|oracle|mongodb/i.test(lowerMessage)) {
        return {
            text: "🗄️ <strong>Database Experience:</strong><br><br>Çağatay works with multiple database systems:<br><br>• <strong>MSSQL</strong> - Enterprise SQL Server<br>• <strong>Oracle DB</strong> - Used for REST APIs at MUDO<br>• <strong>MongoDB</strong> - NoSQL for MERN stack projects<br><br>He also holds SQL Server Database Programming certifications (Basic, Intermediate, and Professional levels)! 📊",
            quickReplies: [
                { label: 'His certifications', message: 'What certifications does he have?', icon: 'fas fa-certificate' },
                { label: 'Other skills', message: 'What other technologies does he know?', icon: 'fas fa-code' }
            ]
        };
    }
    
    // API specific
    if (/api|rest|soap|web service/i.test(lowerMessage)) {
        return {
            text: "🔌 <strong>API Development:</strong><br><br>Çağatay has extensive experience with API development:<br><br>• <strong>REST APIs</strong> - Built secure APIs with JWT authentication at MUDO<br>• <strong>SOAP APIs</strong> - Enterprise service integration<br>• <strong>ASP.NET Web API</strong> - .NET-based service development<br><br>His API work for international stores at MUDO contributed to a 10% sales increase! 📈",
            quickReplies: [
                { label: 'His experience', message: 'Tell me about his work experience', icon: 'fas fa-briefcase' },
                { label: 'His skills', message: 'What technologies does he know?', icon: 'fas fa-code' }
            ]
        };
    }
    
    // Default / Fallback with context awareness
    let fallbackResponse = `I'm not quite sure about that, but I'd love to help! ${conversationContext.userName ? `${conversationContext.userName}, ` : ''}Here's what I can tell you about Çağatay:<br><br>`;
    
    fallbackResponse += "• 👤 Who he is and his background<br>";
    fallbackResponse += "• 💼 Work experience at PwC & MUDO<br>";
    fallbackResponse += "• 🛠️ Technical skills (C#, .NET, MERN Stack, etc.)<br>";
    fallbackResponse += "• 🚀 Projects (E-Commerce, ML Prediction, Neo Glide)<br>";
    fallbackResponse += "• 🎓 Education & Certifications<br>";
    fallbackResponse += "• 📬 How to contact him<br><br>";
    fallbackResponse += "What interests you the most?";
    
    return {
        text: fallbackResponse,
        quickReplies: [
            { label: 'About', message: 'Who is Çağatay?', icon: 'fas fa-user' },
            { label: 'Experience', message: 'Where has he worked?', icon: 'fas fa-briefcase' },
            { label: 'Skills', message: 'What are his skills?', icon: 'fas fa-code' },
            { label: 'Contact', message: 'How can I reach him?', icon: 'fas fa-envelope' }
        ]
    };
}

// Send message on button click
chatbotSend.addEventListener('click', () => {
    sendMessage(chatbotInput.value);
});

// Send message on Enter key
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !chatbotSend.disabled) {
        sendMessage(chatbotInput.value);
    }
});

// Quick reply buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-reply') || e.target.closest('.quick-reply')) {
        e.stopPropagation();
        const button = e.target.classList.contains('quick-reply') ? e.target : e.target.closest('.quick-reply');
        const message = button.getAttribute('data-message');
        sendMessage(message);
        
        // Remove the quick replies container
        const quickRepliesContainer = button.closest('.quick-replies');
        if (quickRepliesContainer) {
            quickRepliesContainer.remove();
        }
        return;
    }
    
    // Suggestion chips
    if (e.target.classList.contains('suggestion-chip')) {
        e.stopPropagation();
        const message = e.target.getAttribute('data-message');
        sendMessage(message);
        return;
    }
});

// Escape key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatbotContainer.classList.contains('active')) {
        chatbotContainer.classList.remove('active');
        chatbotToggle.classList.remove('active');
    }
});

console.log('%c👋 Welcome to Çağatay Gürses Portfolio!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cFeel free to explore the code and reach out if you have any questions!', 'font-size: 14px; color: #8b5cf6;');
