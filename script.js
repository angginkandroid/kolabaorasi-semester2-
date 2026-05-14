// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ===========================
// HAMBURGER MENU (MOBILE)
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===========================
// ACTIVE NAV HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
}

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .about-content, .about-image-wrap, .contact-item, .section-title'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Stagger cards
document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach((el, i) => {
  el.dataset.delay = i;
});

revealEls.forEach(el => observer.observe(el));

// ===========================
// SKILL BAR ANIMATION ON SCROLL
// ===========================
const skillBars = document.querySelectorAll('.skill-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => {
  bar.style.animationPlayState = 'paused';
  barObserver.observe(bar);
});

// ===========================
// CONTACT FORM - SEND MESSAGE
// ===========================
const sendBtn = document.querySelector('.btn-send');
const textarea = document.querySelector('.contact-right textarea');

if (sendBtn && textarea) {
  sendBtn.addEventListener('click', () => {
    const msg = textarea.value.trim();
    if (!msg) {
      showToast('Please write a message first!', 'warn');
      return;
    }
    showToast('Message sent successfully! ✓', 'success');
    textarea.value = '';
  });
}

function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem; right: 2rem;
    padding: 0.9rem 1.6rem;
    background: ${type === 'success' ? '#00e5ff' : '#ffb300'};
    color: #0a0f2c;
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    border-radius: 8px;
    z-index: 9999;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s ease;
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===========================
// SMOOTH SCROLL FOR NAV LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===========================
// TYPING EFFECT HERO TAGLINE
// ===========================
const typingTarget = document.querySelector('.highlight-text');
if (typingTarget) {
  const text = typingTarget.textContent;
  typingTarget.textContent = '';
  typingTarget.style.borderRight = '2px solid #00e5ff';

  let i = 0;
  const typeInterval = setInterval(() => {
    typingTarget.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(typeInterval);
      setTimeout(() => { typingTarget.style.borderRight = 'none'; }, 600);
    }
  }, 55);
}