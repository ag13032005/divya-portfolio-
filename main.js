/* =============================================
   DIVYANSH SHAW — PORTFOLIO
   JavaScript Interactions & Animations
   ============================================= */

'use strict';

/* ---- UTILITY ---- */
const select = (s) => document.querySelector(s);
const selectAll = (s) => document.querySelectorAll(s);

/* =============================================
   LOADING SCREEN
   ============================================= */
(function initLoader() {
  const loader = select('#loader');
  if (!loader) return;

  // Simulate loading duration matching CSS animation
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initHeroAnimations();
  }, 2600);

  // Prevent scroll during load
  document.body.style.overflow = 'hidden';
})();

/* =============================================
   HERO ANIMATIONS — TYPED ROLES
   ============================================= */
function initHeroAnimations() {
  const rolesEl = select('#heroRoles');
  if (!rolesEl) return;

  const roles = ['Cinematographer', 'Creative Director', 'Video Editor', 'YouTube Strategist'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeDelay = 130;

  function typeRole() {
    const current = roles[roleIndex];

    if (isDeleting) {
      rolesEl.querySelector('.role-text').textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeDelay = 60;
    } else {
      rolesEl.querySelector('.role-text').textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeDelay = 120;
    }

    if (!isDeleting && charIndex === current.length) {
      typeDelay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeDelay = 400;
    }

    setTimeout(typeRole, typeDelay);
  }

  // Start typing after hero reveals
  setTimeout(typeRole, 800);
}

/* =============================================
   CUSTOM CURSOR
   ============================================= */
(function initCursor() {
  const cursor = select('#cursor');
  const follower = select('#cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }

  animateFollower();

  // Hover effects on interactive elements
  const hoverTargets = selectAll('a, button, .skill-card, .camera-card, .service-card, .project-card, .software-card, .youtube-embed');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
})();

/* =============================================
   SCROLL PROGRESS BAR
   ============================================= */
(function initScrollProgress() {
  const bar = select('#scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });
})();

/* =============================================
   STICKY NAVIGATION
   ============================================= */
(function initNav() {
  const nav = select('#nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
})();

/* =============================================
   MOBILE HAMBURGER MENU
   ============================================= */
(function initMobileMenu() {
  const hamburger = select('#hamburger');
  const mobileMenu = select('#mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  selectAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* =============================================
   SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ============================================= */
(function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0');

        setTimeout(() => {
          el.classList.add('visible');
        }, delay);

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  selectAll('.reveal-fade, .reveal-card, .reveal-word').forEach(el => {
    observer.observe(el);
  });
})();

/* =============================================
   PARALLAX HERO IMAGE
   ============================================= */
(function initParallax() {
  const heroParallax = select('#heroParallax');
  if (!heroParallax) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const speed = 0.3;
        heroParallax.style.transform = `translateY(${scrollY * speed}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* =============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================= */
(function initSmoothScroll() {
  selectAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = select(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* =============================================
   CONTACT FORM
   ============================================= */
(function initContactForm() {
  const form = select('#contactForm');
  const submitBtn = select('#submitBtn');
  const successMsg = select('#formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      // Shake animation
      form.style.animation = 'shake 0.4s ease';
      setTimeout(() => form.style.animation = '', 400);
      return;
    }

    // Simulate sending
    const btnText = submitBtn.querySelector('.btn-text');
    const btnArrow = submitBtn.querySelector('.btn-arrow');
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      submitBtn.style.display = 'none';
      successMsg.classList.add('show');
      form.reset();
    }, 1800);
  });
})();

/* =============================================
   IMAGE LAZY LOADING
   ============================================= */
(function initLazyLoad() {
  const lazyImages = selectAll('img[loading="lazy"]');
  if (!lazyImages.length) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.onload = () => {
          img.style.opacity = '1';
        };
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
})();

/* =============================================
   HERO NUMBER COUNTER ANIMATION
   ============================================= */
(function initCounters() {
  const statNums = selectAll('.stat-num');
  if (!statNums.length) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text);
        if (isNaN(num)) return; // skip non-numeric like "WWI"

        let start = 0;
        const duration = 1500;
        const startTime = performance.now();
        const suffix = text.replace(/[0-9]/g, '');

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
          el.textContent = Math.floor(eased * num) + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));
})();

/* =============================================
   SKILLS / SERVICE CARD TILT EFFECT
   ============================================= */
(function initTiltEffect() {
  const cards = selectAll('.skill-card, .camera-card, .software-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -5;
      const rotateY = (x - centerX) / centerX * 5;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* =============================================
   FILM GRAIN CANVAS EFFECT (additional)
   ============================================= */
(function initCinematicEffects() {
  // Add horizontal scanline effect on hero hover
  const hero = select('#hero');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const heroContent = select('#heroContent');
    if (heroContent) {
      heroContent.style.transform = `translate(${(x - 0.5) * -8}px, ${(y - 0.5) * -8}px)`;
    }
  });

  hero.addEventListener('mouseleave', () => {
    const heroContent = select('#heroContent');
    if (heroContent) {
      heroContent.style.transform = '';
    }
  });
})();

/* =============================================
   ACTIVE NAV LINK BASED ON SCROLL
   ============================================= */
(function initActiveNav() {
  const sections = selectAll('section[id]');
  const navLinks = selectAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
})();

/* =============================================
   PROJECT CARD REVEAL — STAGGERED
   ============================================= */
(function initProjectCards() {
  const projectCards = selectAll('.project-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  projectCards.forEach(card => observer.observe(card));
})();

/* =============================================
   CSS KEYFRAME FOR FORM SHAKE
   ============================================= */
(function addShakeKeyframe() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(style);
})();

/* =============================================
   INSTAGRAM EMBEDS — reload if needed
   ============================================= */
window.addEventListener('load', () => {
  if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process();
  }
});

console.log('%cDIVYANSH SHAW — Portfolio', 'color:#D4AF37;font-size:20px;font-weight:800;letter-spacing:2px;');
console.log('%cCinematographer · Creative Director · Mumbai', 'color:rgba(255,255,255,0.6);font-size:12px;');
