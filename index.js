/**
 * ALOK SINGH RATHOD - PORTFOLIO INTERACTIVITY & ANIMATION SUITE
 * Signature Editorial Experience (Inspired by Sarthak Sharma)
 * Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. FLOATING HEADER SCROLL EFFECTS & ACTIVE SPY
  // ==========================================================================
  const header = document.getElementById('editorialHeader');
  const navLinks = document.querySelectorAll('.nav-anchor');
  const sections = document.querySelectorAll('section[id], .editorial-section[id]');

  function onScroll() {
    const scrollY = window.scrollY;

    // Header elevation on scroll
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll spy for navigation pill
    let currentSectionId = '';
    const scrollTrigger = scrollY + 280;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollTrigger >= top && scrollTrigger < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSectionId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initial run

  // ==========================================================================
  // 2. SMOOTH SCROLL WITH FLOATING PILL OFFSET
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile drawer if open
        closeMobileDrawer();
      }
    });
  });

  // Back to top button
  const editorialBackTop = document.getElementById('editorialBackTop');
  if (editorialBackTop) {
    editorialBackTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 3. MOBILE DRAWER NAVIGATION
  // ==========================================================================
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');

  function openMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      if (mobileToggleBtn) mobileToggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer && mobileDrawer.classList.contains('open')) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      if (mobileToggleBtn) mobileToggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', openMobileDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMobileDrawer);
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeMobileDrawer();
      }
    });
  }

  // ==========================================================================
  // 4. ESSENCE SECTION - DISCIPLINE CARDS INTERACTION & PHOTO SYNC
  // ==========================================================================
  const disciplineCards = document.querySelectorAll('.discipline-card');
  const photoPills = document.querySelectorAll('.photo-pill-btn');
  const execImg = document.getElementById('essenceExecutiveImg');
  const imgBadge = document.getElementById('essenceImgBadge');

  function switchPhoto(src, badgeText, activeKey) {
    if (execImg && src) {
      execImg.style.opacity = '0';
      setTimeout(() => {
        execImg.src = src;
        execImg.style.opacity = '1';
      }, 150);
    }
    if (imgBadge && badgeText) {
      imgBadge.textContent = badgeText;
    }
    if (photoPills.length > 0) {
      photoPills.forEach(p => {
        if (p.getAttribute('data-key') === activeKey || p.getAttribute('data-src') === src) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    }
  }

  disciplineCards.forEach(card => {
    card.addEventListener('click', () => {
      disciplineCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const tab = card.getAttribute('data-tab');
      if (tab === 'build') {
        switchPhoto('./images/alok-executive-designed.jpg', 'TECH FOUNDER & ARCHITECT', 'exec');
      } else if (tab === 'teach') {
        switchPhoto('./images/alok-candid-suit.jpg', 'LEADERSHIP & PEDAGOGY', 'suit');
      } else if (tab === 'lead') {
        switchPhoto('./images/alok-outdoor-candid.jpg', 'CIVIC ENTERPRISE & MP ONLINE', 'candid');
      }
    });
  });

  if (photoPills.length > 0) {
    photoPills.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const src = btn.getAttribute('data-src');
        const badge = btn.getAttribute('data-badge');
        const key = btn.getAttribute('data-key');
        switchPhoto(src, badge, key);
      });
    });
  }

  // ==========================================================================
  // 5. MOTION TOGGLE PILL (Sarthak Sharma Feature)
  // ==========================================================================
  const motionToggleBtn = document.getElementById('motionToggleBtn');
  const motionToggleText = document.getElementById('motionToggleText');
  const motionIcon = document.getElementById('motionIcon');

  // Check saved preference
  const isReducedMotion = localStorage.getItem('alok_reduced_motion') === 'true';
  if (isReducedMotion) {
    applyMotionState(true);
  }

  function applyMotionState(reduce) {
    if (reduce) {
      document.body.classList.add('reduced-motion');
      if (motionToggleBtn) motionToggleBtn.classList.add('motion-off');
      if (motionToggleText) motionToggleText.textContent = 'MOTION OFF';
      if (motionIcon) {
        motionIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
      }
    } else {
      document.body.classList.remove('reduced-motion');
      if (motionToggleBtn) motionToggleBtn.classList.remove('motion-off');
      if (motionToggleText) motionToggleText.textContent = 'MOTION ON';
      if (motionIcon) {
        motionIcon.innerHTML = '<rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect>';
      }
    }
    localStorage.setItem('alok_reduced_motion', reduce);
  }

  if (motionToggleBtn) {
    motionToggleBtn.addEventListener('click', () => {
      const currentlyReduced = document.body.classList.contains('reduced-motion');
      applyMotionState(!currentlyReduced);
    });
  }

  // ==========================================================================
  // 6. AMBIENT CURSOR SPOTLIGHT TRACKER
  // ==========================================================================
  const cursorSpotlight = document.getElementById('cursorSpotlight');
  if (cursorSpotlight && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(updateCursorPosition);
      }
    }, { passive: true });

    function updateCursorPosition() {
      // Smooth lerp interpolation
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      cursorSpotlight.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

      const dist = Math.hypot(mouseX - currentX, mouseY - currentY);
      if (dist > 0.5) {
        requestAnimationFrame(updateCursorPosition);
      } else {
        isMoving = false;
      }
    }
  }

  // ==========================================================================
  // 7. SCROLL-DRIVEN REVEAL SYSTEM (Intersection Observer)
  // ==========================================================================
  // Automatically select all primary content modules
  const autoRevealSelectors = [
    '.editorial-section-title',
    '.work-narrative-note',
    '.editorial-project-card',
    '.craft-card',
    '.pillar-card',
    '.leader-card',
    '.timeline-row',
    '.direct-note-container',
    '.contact-editorial-heading',
    '.contact-cta-wrapper',
    '.generative-wave-card',
    '.candid-portrait-card',
    '.discipline-card',
    '.radial-stat-card'
  ];

  document.querySelectorAll(autoRevealSelectors.join(',')).forEach((el, index) => {
    if (!el.hasAttribute('data-reveal')) {
      el.setAttribute('data-reveal', 'true');
    }
  });

  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !document.body.classList.contains('reduced-motion')) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: reveal immediately
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ==========================================================================
  // 8. ANIMATED NUMBERS COUNTER (Proof Strip)
  // ==========================================================================
  const counterElements = document.querySelectorAll('.counter-val');
  const metricsBar = document.querySelector('.metrics-proof-bar');

  if (counterElements.length > 0 && metricsBar && 'IntersectionObserver' in window) {
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
            animateCounter(counter, target, 1600);
          });
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    counterObserver.observe(metricsBar);
  }

  function animateCounter(element, target, duration = 1500) {
    let startTimestamp = null;
    const startValue = 0;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeProgress * (target - startValue) + startValue);

      element.textContent = currentValue;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = target;
      }
    }

    window.requestAnimationFrame(step);
  }

  // ==========================================================================
  // 9. 3D MAGNETIC CARD TILT PHYSICS (Portrait, Browser Mockups & Leader Cards)
  // ==========================================================================
  const tiltableCards = document.querySelectorAll('.portrait-card, .browser-mock-window, .leader-card');
  if (window.matchMedia('(pointer: fine)').matches) {
    tiltableCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (document.body.classList.contains('reduced-motion')) return;

        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left; // x position within element
        const cardY = e.clientY - rect.top;  // y position within element

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((cardY - centerY) / centerY) * -6; // max tilt 6deg
        const rotateY = ((cardX - centerX) / centerX) * 6;

        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ==========================================================================
  // 10. DIRECT NOTE DISPATCH FORM HANDLING
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formToast');
  const toastMessage = document.getElementById('toastMessage');
  const contactSubmitBtn = document.getElementById('contactSubmitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const subjectInput = document.getElementById('userSubject');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';

      if (!name || !email) {
        showToast('Please fill out all required fields.', false);
        return;
      }

      // Button feedback state
      const originalBtnContent = contactSubmitBtn.innerHTML;
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.innerHTML = `
        <span>Sending...</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
      `;

      // Simulate sending note
      setTimeout(() => {
        contactForm.reset();
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.innerHTML = originalBtnContent;

        showToast(`Thank you, ${name}! Your direct message regarding "${subject || 'your inquiry'}" has been dispatched. I'll get back to you shortly at ${email}.`, true);
      }, 900);
    });
  }

  function showToast(message, isSuccess = true) {
    if (!formToast || !toastMessage) return;

    toastMessage.textContent = message;
    formToast.classList.add('active');

    setTimeout(() => {
      formToast.classList.remove('active');
    }, 5500);
  }

  // ==========================================================================
  // 11. CONSOLE SIGNATURE
  // ==========================================================================
  console.log(
    '%c Alok Singh Rathod %c Frontend & MERN Developer · Founder & Entrepreneur @ Kurukshetra Coding School ',
    'background: #fbbf24; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;',
    'background: #111218; color: #f5f4ef; padding: 4px 8px; border-radius: 0 4px 4px 0;'
  );
});