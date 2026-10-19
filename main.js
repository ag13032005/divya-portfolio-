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
   CONTACT FORM (NETLIFY POSTGRESQL & FORMS INTEGRATION)
   ============================================= */
(function initContactForm() {
  const form = select('#contactForm');
  const submitBtn = select('#submitBtn');
  const successMsg = select('#formSuccess');
  if (!form || !submitBtn || !successMsg) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');
    const projectTypeInput = form.querySelector('#project-type');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';
    const projectType = projectTypeInput ? projectTypeInput.value : '';

    if (!name || !email || !message) {
      form.style.animation = 'shake 0.4s ease';
      setTimeout(() => form.style.animation = '', 400);
      return;
    }

    const btnText = submitBtn.querySelector('.btn-text');
    if (btnText) btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // 1. Send to Netlify Function -> PostgreSQL Database
    try {
      const dbResp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, projectType, message })
      });
      if (dbResp.ok) {
        console.log('Successfully saved to Netlify PostgreSQL Database!');
      }
    } catch (err) {
      console.warn('PostgreSQL API note:', err);
    }

    // 2. Also send to Netlify Forms for built-in dashboard alerts
    try {
      const formData = new FormData(form);
      const encodedBody = new URLSearchParams(formData).toString();
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedBody
      });
    } catch (err) {
      console.warn('Netlify form submission note:', err);
    }

    // Show success confirmation
    submitBtn.style.display = 'none';
    successMsg.classList.add('show');
    form.reset();
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
   VISUAL DIARY CAROUSEL & CINEMATIC LIGHTBOX
   ============================================= */
(function initVisualDiaryAndLightbox() {
  const diaryCards = document.querySelectorAll('.diary-card');
  const lightbox = document.getElementById('diary-lightbox');
  if (!lightbox) return;

  const lbBackdrop = lightbox.querySelector('.lightbox-backdrop');
  const lbClose = document.getElementById('lightbox-close');
  const lbBadge = document.getElementById('lightbox-badge');
  const lbTitle = document.getElementById('lightbox-title');
  const lbCounter = document.getElementById('lightbox-counter');
  const lbImg = document.getElementById('lightbox-img');
  const lbPrev = document.getElementById('lightbox-prev');
  const lbNext = document.getElementById('lightbox-next');
  const lbThumbnails = document.getElementById('lightbox-thumbnails');

  let currentGallery = [];
  let currentGalleryIndex = 0;

  // 1. Initialize in-card carousel sliders
  diaryCards.forEach(card => {
    const slidesWrap = card.querySelector('.diary-slides');
    const slides = card.querySelectorAll('.diary-slide');
    const dots = card.querySelectorAll('.diary-dot');
    const indicator = card.querySelector('.slide-indicator');
    const prevBtn = card.querySelector('.diary-prev');
    const nextBtn = card.querySelector('.diary-next');
    const total = slides.length;

    let activeIdx = 0;

    function goToSlide(idx) {
      if (total <= 1) return;
      activeIdx = (idx + total) % total;
      slidesWrap.setAttribute('data-active', activeIdx);

      slides.forEach((s, i) => {
        s.classList.toggle('active', i === activeIdx);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === activeIdx);
      });
      if (indicator) {
        indicator.textContent = `${activeIdx + 1}/${total}`;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(activeIdx - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(activeIdx + 1);
      });
    }

    dots.forEach((dot, dIdx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(dIdx);
      });
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    card.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 45 && total > 1) {
        if (diff > 0) goToSlide(activeIdx + 1);
        else goToSlide(activeIdx - 1);
      }
    }, { passive: true });

    // Open lightbox on card click (NO redirect to Instagram!)
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(card, activeIdx);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(card, activeIdx);
      }
    });
  });

  // 2. Lightbox logic
  function openLightbox(card, startIndex = 0) {
    const slides = Array.from(card.querySelectorAll('.diary-slide'));
    const title = card.getAttribute('data-title') || 'Cinematic Still';
    const badge = card.getAttribute('data-badge') || 'Visual Diary';

    currentGallery = slides.map(img => ({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt') || title
    }));
    currentGalleryIndex = startIndex;

    if (lbTitle) lbTitle.textContent = title;
    if (lbBadge) lbBadge.textContent = badge;

    // Render thumbnails
    if (lbThumbnails) {
      lbThumbnails.innerHTML = '';
      if (currentGallery.length > 1) {
        currentGallery.forEach((item, idx) => {
          const thumb = document.createElement('div');
          thumb.className = `lightbox-thumb ${idx === currentGalleryIndex ? 'active' : ''}`;
          thumb.innerHTML = `<img src="${item.src}" alt="Thumb ${idx + 1}" />`;
          thumb.addEventListener('click', () => setLightboxIndex(idx));
          lbThumbnails.appendChild(thumb);
        });
        lbThumbnails.style.display = 'flex';
      } else {
        lbThumbnails.style.display = 'none';
      }
    }

    // Toggle navigation arrows if only 1 photo
    if (lbPrev && lbNext) {
      const showNav = currentGallery.length > 1 ? 'flex' : 'none';
      lbPrev.style.display = showNav;
      lbNext.style.display = showNav;
    }

    setLightboxIndex(currentGalleryIndex);

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function setLightboxIndex(idx) {
    if (!currentGallery.length) return;
    currentGalleryIndex = (idx + currentGallery.length) % currentGallery.length;
    const item = currentGallery[currentGalleryIndex];

    if (lbImg) {
      lbImg.style.opacity = '0.3';
      lbImg.src = item.src;
      lbImg.alt = item.alt;
      lbImg.onload = () => { lbImg.style.opacity = '1'; };
    }

    if (lbCounter) {
      lbCounter.textContent = `${currentGalleryIndex + 1} / ${currentGallery.length}`;
    }

    if (lbThumbnails) {
      const thumbs = lbThumbnails.querySelectorAll('.lightbox-thumb');
      thumbs.forEach((t, i) => {
        t.classList.toggle('active', i === currentGalleryIndex);
      });
      // Scroll active thumbnail into view
      const activeThumb = thumbs[currentGalleryIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lbImg) lbImg.src = '';
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);

  if (lbPrev) {
    lbPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      setLightboxIndex(currentGalleryIndex - 1);
    });
  }

  if (lbNext) {
    lbNext.addEventListener('click', (e) => {
      e.stopPropagation();
      setLightboxIndex(currentGalleryIndex + 1);
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      setLightboxIndex(currentGalleryIndex - 1);
    } else if (e.key === 'ArrowRight') {
      setLightboxIndex(currentGalleryIndex + 1);
    }
  });
})();

console.log('%cDIVYANSH SHAW — Portfolio', 'color:#D4AF37;font-size:20px;font-weight:800;letter-spacing:2px;');
console.log('%cCinematographer · Creative Director · Mumbai', 'color:rgba(255,255,255,0.6);font-size:12px;');
