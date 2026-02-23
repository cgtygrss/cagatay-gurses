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

    // Frosted glass on scroll
    navbar.classList.toggle('scrolled', window.scrollY > 30);

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
    threshold: 0.10,
    rootMargin: '0px 0px -30px 0px'
});

// Single load handler — prevents double window.onload assignment overwriting each other
function onPageReady() {
    // Start typing effect
    setTimeout(runTypingEffect, 600);

    // Staggered reveal animations
    revealElements.forEach((element, index) => {
        // Apply stagger delay for grid items
        const gridParents = [
            '.skills-grid', '.education-grid', '.projects-grid'
        ];
        let isGrid = false;
        for (const sel of gridParents) {
            const parent = document.querySelector(sel);
            if (parent && parent.contains(element)) {
                isGrid = true;
                break;
            }
        }

        if (isGrid) {
            // Find sibling index for stagger
            const siblings = Array.from(element.parentElement?.children || []);
            const sibIdx = siblings.indexOf(element);
            element.style.animationDelay = `${sibIdx * 0.08}s`;
        }

        revealObserver.observe(element);
    });

    // Subtle mouse-tilt on project cards (CSS transform)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-6px) rotateX(${(-y * 6).toFixed(1)}deg) rotateY(${(x * 6).toFixed(1)}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

if (document.readyState === 'complete') {
    onPageReady();
} else {
    window.addEventListener('load', onPageReady);
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
        // Delay focus slightly on mobile so the keyboard doesn't jump the layout
        setTimeout(() => chatbotInput.focus(), 150);
    } else {
        chatbotInput.blur();
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

// ==========================================
// 3D Background with Three.js & GSAP
// ==========================================

function init3DBackground() {
    const canvas = document.querySelector('#webgl-canvas');
    if (!canvas) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // PARTICLES (Stars/Dust)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        // Spread particles across a wide area
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.08,
        color: 0xa855f7, // var(--primary-light)
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // ABSTRACT SHAPE (Wireframe Icosahedron)
    const shapeGeometry = new THREE.IcosahedronGeometry(14, 2);
    const shapeMaterial = new THREE.MeshBasicMaterial({
        color: 0x38bdf8, // Light cyan
        wireframe: true,
        transparent: true,
        opacity: 0.08
    });
    const abstractShape = new THREE.Mesh(shapeGeometry, shapeMaterial);
    scene.add(abstractShape);
    
    // Add another smaller shape inside
    const innerShapeGeometry = new THREE.IcosahedronGeometry(8, 1);
    const innerShapeMaterial = new THREE.MeshBasicMaterial({
        color: 0x7c3aed, // var(--primary)
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const innerShape = new THREE.Mesh(innerShapeGeometry, innerShapeMaterial);
    abstractShape.add(innerShape);

    // MOUSE PARALLAX
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // RESIZE
    window.addEventListener('resize', () => {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ANIMATION LOOP
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Rotate particles slowly
        particlesMesh.rotation.y = elapsedTime * 0.03;
        particlesMesh.rotation.x = elapsedTime * 0.015;

        // Rotate abstract shapes
        abstractShape.rotation.x = elapsedTime * 0.05;
        abstractShape.rotation.y = elapsedTime * 0.08;
        
        innerShape.rotation.x = -elapsedTime * 0.1;
        innerShape.rotation.y = -elapsedTime * 0.12;

        // Easing for mouse parallax
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        // Apply parallax to main shape group
        abstractShape.rotation.y += 0.05 * (targetX - abstractShape.rotation.y);
        abstractShape.rotation.x += 0.05 * (targetY - abstractShape.rotation.x);

        // Apply slight parallax to camera for extra depth
        camera.position.x += (mouseX * 0.005 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.005 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Gentle float for shape
        abstractShape.position.y = Math.sin(elapsedTime * 0.5) * 1.5;

        renderer.render(scene, camera);
    }
    
    animate();

    // GSAP SCROLL ANIMATION
    // Ensure GSAP and ScrollTrigger are loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Move abstract shape across the screen / zoom out as we scroll
        gsap.to(abstractShape.position, {
            z: -20, // push back
            y: -10,
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1 // smooth scrubbing
            }
        });

        // Rotate faster based on scroll
        gsap.to(abstractShape.rotation, {
            z: Math.PI,
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5
            }
        });
        
        // Move particles slightly up
        gsap.to(particlesMesh.position, {
            y: 15,
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 2
            }
        });
    }
}

// Initialize 3D on load
window.addEventListener('DOMContentLoaded', init3DBackground);
