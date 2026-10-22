'use client';

import { useEffect } from 'react';
import EditorialHeader from '../components/EditorialHeader';
import MotionController from '../components/MotionController';

export default function HomePage() {
  useEffect(() => {
    // 1. Essence Section - Discipline Cards Interactive Click
    const disciplineCards = document.querySelectorAll('.discipline-card');
    disciplineCards.forEach((card) => {
      card.addEventListener('click', () => {
        disciplineCards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
      });
    });

    // 2. Animated Counter Observer
    const counterElements = document.querySelectorAll('.counter-val');
    const metricsBar = document.querySelector('.metrics-proof-bar');

    if (counterElements.length > 0 && metricsBar && 'IntersectionObserver' in window) {
      let hasCounted = false;

      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasCounted) {
              hasCounted = true;
              counterElements.forEach((counter) => {
                const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
                animateCounter(counter, target, 1600);
              });
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25 }
      );

      counterObserver.observe(metricsBar);
    }

    function animateCounter(element, target, duration = 1500) {
      let startTimestamp = null;
      const startValue = 0;

      function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
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

    // 3. 3D Card Tilt Physics
    const tiltableCards = document.querySelectorAll('.portrait-card, .browser-mock-window, .leader-card');
    if (window.matchMedia('(pointer: fine)').matches) {
      tiltableCards.forEach((card) => {
        const onMouseMove = (e) => {
          if (document.body.classList.contains('reduced-motion')) return;

          const rect = card.getBoundingClientRect();
          const cardX = e.clientX - rect.left;
          const cardY = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((cardY - centerY) / centerY) * -6;
          const rotateY = ((cardX - centerX) / centerX) * 6;

          card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        };

        const onMouseLeave = () => {
          card.style.transform = '';
        };

        card.addEventListener('mousemove', onMouseMove);
        card.addEventListener('mouseleave', onMouseLeave);
      });
    }

    // 4. Contact Form Dispatch
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

        const originalBtnContent = contactSubmitBtn.innerHTML;
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = '<span>Sending...</span>';

        setTimeout(() => {
          contactForm.reset();
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.innerHTML = originalBtnContent;
          showToast(`Thank you, ${name}! Your direct note regarding "${subject || 'your inquiry'}" has been dispatched. I'll get back to you shortly at ${email}.`, true);
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

    // 5. Back to top button
    const editorialBackTop = document.getElementById('editorialBackTop');
    if (editorialBackTop) {
      editorialBackTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }
  }, []);

  return (
    <>
      {/* Floating Editorial Navigation Header */}
      <EditorialHeader />

      <main id="mainContent">


    
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        
        
        <div className="hero-rail-left">
          <div className="meta-indicator">
            <span className="meta-dot"></span>
            <span className="meta-text">ENGINEER. EDUCATOR. FOUNDER. ENTREPRENEUR.</span>
          </div>

          <div className="chapter-indicator">
            <span className="chapter-code">01 / PRESENCE</span>
          </div>

          <div className="meta-disciplines">
            <span className="plus-icon">+</span>
            <span className="discipline-tag">FRONTEND ARCHITECTURE</span>
            <span className="discipline-tag">MERN STACK SYSTEMS</span>
            <span className="discipline-tag">FOUNDER @ KURUKSHETRA</span>
            <span className="discipline-tag">TECH ENTREPRENEURSHIP</span>
          </div>
        </div>

        
        <div className="hero-center-stage">
          
          <div className="hero-portrait-wrap">
            <div className="portrait-card">
              <img 
                src="/images/alok-editorial-halftone.png" 
                alt="Alok Singh Rathod - Frontend & MERN Developer, Founder" 
                className="portrait-img"
                loading="eager"
                fetchPriority="high"
                width="380"
                height="460"
               />
              <div className="portrait-gradient-overlay"></div>
              <div className="portrait-rim-glow"></div>
            </div>
            <div className="portrait-kicker">
              <span>A HUMAN PERSPECTIVE ON WEB ARCHITECTURE & EDUCATION</span>
            </div>
          </div>

          
          <h1 className="hero-display-name">
            Alok <em>Rathod</em>
          </h1>

          <p className="hero-statement">
            I architect high-performance web applications, mentor emerging engineers, and build Kurukshetra Coding School into a premier developer hub.
          </p>

          <div className="hero-actions-row">
            <a href="#work" className="btn-pill-primary" id="heroExploreWork">
              <span>Explore my work</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-down"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
            </a>
            <a href="#contact" className="link-underlined" id="heroStartConversation">
              <span>Start a conversation</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </a>
          </div>

        </div>

        
        <div className="hero-rail-right">
          <div className="meta-location">
            <span>BASED IN BHOPAL · BUILDING FOR THE WEB</span>
          </div>
          <div className="meta-availability-badge">
            <span className="live-dot-pulse"></span>
            <span>OPEN FOR HIGH-IMPACT ROLES & PROJECTS</span>
          </div>
        </div>

      </div>

      
      <div className="hero-proof-strip">
        <div className="container strip-container">
          <div className="strip-item strip-left">
            <a href="#about" className="strip-link">
              <span>SCROLL TO DISCOVER</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
            </a>
          </div>
          <div className="strip-item strip-center">
            <span>BUILDING & TEACHING · 150+ STUDENTS MENTORED · 10+ PLATFORMS ARCHITECTED</span>
          </div>
          <div className="strip-item strip-right">
            <span className="strip-exploration">AN ONGOING EXPLORATION</span>
          </div>
        </div>
      </div>
    </section>

    
    <section className="editorial-section" id="about">
      
      
      <div className="metrics-proof-bar">
        <div className="container proof-grid">
          <div className="metric-block" data-reveal="true">
            <span className="metric-num"><span className="counter-val" data-target="150">0</span><span className="plus">+</span></span>
            <span className="metric-desc">students mentored across modern web engineering</span>
          </div>
          <div className="metric-block" data-reveal="true" data-reveal-delay="1">
            <span className="metric-num"><span className="counter-val" data-target="10">0</span><span className="plus">+</span></span>
            <span className="metric-desc">production platforms & enterprise tools deployed</span>
          </div>
          <div className="metric-block" data-reveal="true" data-reveal-delay="2">
            <span className="metric-num"><span className="counter-val" data-target="95">0</span><span className="plus">%</span></span>
            <span className="metric-desc">practical capstone project completion rate</span>
          </div>
          <div className="metric-block metric-link-block">
            <a href="#academy" className="proof-action-link">
              <span className="mono-meta">THE WORK.</span>
              <span className="action-title">THE REAL-WORLD IMPACT</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="container section-body">
        
        
        <div className="chapter-line">
          <div className="chapter-tag">
            <span className="chapter-sq">■</span>
            <span>01 / THE PERSON BEHIND THE WORK</span>
          </div>
          <div className="chapter-meta">
            <span>A CONNECTED PERSPECTIVE</span>
          </div>
        </div>

        <div className="chapter-subkicker">
          <span>THREE DISCIPLINES. ONE PURPOSE.</span>
          <span className="counter">01 / 03</span>
        </div>

        
        <div className="essence-grid">
          
          
          <div className="essence-visual-col">
            <div className="generative-wave-card architecture-studio-card">
              <div className="studio-img-wrap">
                <img 
                  src="/images/bhopal-architecture-studio.jpg" 
                  alt="Kurukshetra Software Architecture Studio in Bhopal, MP" 
                  className="studio-showcase-img"
                  loading="lazy"
                  width="400"
                  height="260"
                 />
                <div className="studio-img-overlay"></div>
                <div className="studio-badge-pill">
                  <span className="pulse-indicator"></span>
                  <span>ENGINEERING STUDIO · BHOPAL</span>
                </div>
              </div>
              <div className="wave-card-footer">
                <span className="mono-meta">ARCHITECTURAL HARMONY</span>
                <span className="mono-meta">BHOPAL, MP</span>
              </div>
            </div>

            
            <div className="candid-portrait-card">
              <img 
                src="/images/alok-candid-suit.jpg" 
                alt="Alok Singh Rathod - Founder & Lead Instructor" 
                className="candid-img"
                loading="lazy"
                width="340"
                height="240"
               />
              <div className="candid-caption">
                <span className="caption-name">Alok Singh Rathod</span>
                <span className="caption-role">Founder & Lead Instructor · Kurukshetra</span>
              </div>
            </div>
          </div>

          
          <div className="essence-text-col">
            <h2 className="editorial-thesis-quote">
              Technology is<br />the instrument.<br /><em>People are the purpose.</em>
            </h2>

            <div className="narrative-body">
              <p>
                My path as an engineer started with curiosity about how the web functions at scale — from pixel rendering pipelines to distributed backend architectures. But as I built systems, I realized technical depth is only half the equation.
              </p>
              <p>
                Across tier-2 and tier-3 cities in India, thousands of eager minds are held back by theoretical, disconnected college syllabi. That conviction led to founding <strong>Kurukshetra Coding School</strong> in Bhopal. Here, we don't just teach syntax — we train students to think like product architects and build applications that solve immediate regional problems.
              </p>
            </div>

            
            <div className="disciplines-accordion">
              
              <div className="discipline-card active" data-tab="build">
                <div className="discipline-header">
                  <span className="discipline-idx">01</span>
                  <h3 className="discipline-title">BUILD — Full-Stack & Frontend Architecture</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </div>
                <p className="discipline-desc">
                  Building responsive, accessible web architectures using React.js, Next.js, and Node.js. Translating intricate business requirements into smooth, zero-latency user experiences.
                </p>
                <div className="discipline-tags">
                  <span className="d-tag">React.js</span>
                  <span className="d-tag">Node.js</span>
                  <span className="d-tag">MongoDB</span>
                  <span className="d-tag">Tailwind / Vanilla CSS</span>
                  <span className="d-tag">REST APIs</span>
                </div>
              </div>

              <div className="discipline-card" data-tab="teach">
                <div className="discipline-header">
                  <span className="discipline-idx">02</span>
                  <h3 className="discipline-title">TEACH — Practical Software Pedagogy</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </div>
                <p className="discipline-desc">
                  Demystifying complex concepts (asynchronous JS, closures, full-stack state, database schemas) into intuitive mental models with hands-on, live code-alongs and 1-on-1 mentorship.
                </p>
                <div className="discipline-tags">
                  <span className="d-tag">150+ Students</span>
                  <span className="d-tag">Live Coding</span>
                  <span className="d-tag">Code Reviews</span>
                  <span className="d-tag">Hindi & English</span>
                </div>
              </div>

              <div className="discipline-card" data-tab="lead">
                <div className="discipline-header">
                  <span className="discipline-idx">03</span>
                  <h3 className="discipline-title">SCALE — Community Leadership & Production Products</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </div>
                <p className="discipline-desc">
                  Guiding student cohorts through complete project lifecycles from ideation to cloud deployment, while shipping high-impact public tools like SarkareeUpdate, Deployer, and CPCT Examination Portal.
                </p>
                <div className="discipline-tags">
                  <span className="d-tag">Kurukshetra Coding School</span>
                  <span className="d-tag">SarkareeUpdate.com</span>
                  <span className="d-tag">Deployer Cloud</span>
                  <span className="d-tag">CPCT Portal</span>
                  <span className="d-tag">Bhopal Hub</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>

    
    <section className="editorial-section" id="work">
      <div className="container section-body">
        
        
        <div className="chapter-line">
          <div className="chapter-tag">
            <span className="chapter-sq">■</span>
            <span>02 / SELECTED WORK</span>
          </div>
          <div className="chapter-meta">
            <span>BUILT. TAUGHT. PUT INTO THE WORLD.</span>
          </div>
        </div>

        
        <div className="work-header-row">
          <h2 className="editorial-section-title">
            Ideas are a start.<br /><em>This is the work.</em>
          </h2>
          <div className="work-narrative-note">
            <p>
              From the platforms people rely on daily to tools that streamline engineering workflows. A curated selection of production software I've architected and brought to life.
            </p>
          </div>
        </div>

        
        <div className="editorial-projects-list">

          
          <article className="editorial-project-card" data-project="01">
            <div className="project-media-col">
              <div className="browser-mock-window">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div className="browser-url-bar">
                    <span>sarkareeupdate.com</span>
                  </div>
                  <div className="browser-action">
                    <a href="https://sarkareeupdate.com/" target="_blank" rel="noopener noreferrer" className="corner-link" aria-label="Visit sarkareeupdate.com">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                    </a>
                  </div>
                </div>
                <div className="browser-content">
                  <img 
                    src="/images/project-sarkaree.png" 
                    alt="SarkareeUpdate Official Portal - Real-Time Government Career & Sarkari Results Engine" 
                    loading="lazy"
                    width="600"
                    height="360"
                   />
                  <div className="media-hover-overlay">
                    <span className="overlay-badge">Launch Live Site ↗</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="project-info-col">
              <div className="project-meta-line">
                <span className="project-index">01</span>
                <span className="project-discipline">LIVE PRODUCTION · GOVT CAREER &amp; RESULTS ENGINE</span>
              </div>
              <h3 className="project-heading">SarkareeUpdate Official Portal</h3>
              <p className="project-summary">
                Official high-concurrency public portal engineered for instant delivery of government jobs, Sarkari results, admit cards, answer keys, and exam schedules. Built with a PWA-ready architecture, sub-second API responses, category-wise filters (Latest Jobs, Admit Cards, Results), quick search (Ctrl+K), and active status tags (Extended, Active, New) serving career aspirants across India.
              </p>
              <div className="project-tech-tags">
                <span className="p-tag">React.js</span>
                <span className="p-tag">Vite</span>
                <span className="p-tag">Node.js</span>
                <span className="p-tag">REST API</span>
                <span className="p-tag">PWA &amp; Service Worker</span>
                <span className="p-tag">Google AdSense</span>
              </div>
              <div className="project-links">
                <a href="https://sarkareeupdate.com/" target="_blank" rel="noopener noreferrer" className="link-underlined">
                  <span>Visit Live Platform</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </a>
                <a href="https://github.com/KurukshetraCodingSchool" target="_blank" rel="noopener noreferrer" className="project-github-pill" title="View Source on GitHub">
                  <i className="fa-brands fa-github"></i>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </article>

          
          <article className="editorial-project-card reverse-layout" data-project="02">
            <div className="project-media-col">
              <div className="browser-mock-window">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div className="browser-url-bar">
                    <span>deployer-frontend-n8xn.onrender.com</span>
                  </div>
                  <div className="browser-action">
                    <a href="https://deployer-frontend-n8xn.onrender.com/" target="_blank" rel="noopener noreferrer" className="corner-link" aria-label="Visit Deployer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                    </a>
                  </div>
                </div>
                <div className="browser-content">
                  <img 
                    src="/images/project-deployer.png" 
                    alt="Deployer - Deploy Frontend &amp; APIs Straight From GitHub" 
                    loading="lazy"
                    width="600"
                    height="360"
                   />
                  <div className="media-hover-overlay">
                    <span className="overlay-badge">Launch Live Site ↗</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="project-info-col">
              <div className="project-meta-line">
                <span className="project-index">02</span>
                <span className="project-discipline">CLOUD INFRASTRUCTURE · CI/CD AUTOMATION PLATFORM</span>
              </div>
              <h3 className="project-heading">Deployer | Global Edge Platform</h3>
              <p className="project-summary">
                Next-generation developer cloud platform engineered to deploy frontend applications and APIs directly from GitHub with zero server configuration. Connect any GitHub repository and push code — Deployer provisions automated SSL, streams live container build logs via WebSockets, and routes traffic through isolated Docker build workers and edge reverse proxies.
              </p>
              <div className="project-tech-tags">
                <span className="p-tag">React.js</span>
                <span className="p-tag">Node.js</span>
                <span className="p-tag">Docker Workers</span>
                <span className="p-tag">WebSockets</span>
                <span className="p-tag">Automated SSL</span>
                <span className="p-tag">Edge DNS Routing</span>
              </div>
              <div className="project-links">
                <a href="https://deployer-frontend-n8xn.onrender.com/" target="_blank" rel="noopener noreferrer" className="link-underlined">
                  <span>Visit Live Platform</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </a>
                <a href="https://github.com/KurukshetraCodingSchool" target="_blank" rel="noopener noreferrer" className="project-github-pill" title="View Source on GitHub">
                  <i className="fa-brands fa-github"></i>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </article>

          
          <article className="editorial-project-card" data-project="03">
            <div className="project-media-col">
              <div className="browser-mock-window">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div className="browser-url-bar">
                    <span>cpct-frontend.onrender.com</span>
                  </div>
                  <div className="browser-action">
                    <a href="https://cpct-frontend.onrender.com/" target="_blank" rel="noopener noreferrer" className="corner-link" aria-label="Visit CPCT Portal">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                    </a>
                  </div>
                </div>
                <div className="browser-content">
                  <img 
                    src="/images/project-cpct.png" 
                    alt="Kurukshetra NextGen Academy - MP CPCT 2026 Examination Portal &amp; Bilingual Typing Engine" 
                    loading="lazy"
                    width="600"
                    height="360"
                   />
                  <div className="media-hover-overlay">
                    <span className="overlay-badge">Launch Live Site ↗</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="project-info-col">
              <div className="project-meta-line">
                <span className="project-index">03</span>
                <span className="project-discipline">EDTECH PLATFORM · BILINGUAL EXAM &amp; TYPING SIMULATOR</span>
              </div>
              <h3 className="project-heading">MP CPCT 2026 Apex Examination Portal</h3>
              <p className="project-summary">
                India's apex virtual learning hub dedicated to MP CPCT computer certification, serving 12,450+ verified aspirants with a 98.4% pass rate. Features 7-chapter bilingual interactive textbook curriculum, 3D motherboard hardware physics labs, a bilingual typing benchmark engine (English 30+ WPM &amp; Hindi Remington GAIL 20+ WPM), and 100-MCQ timed mock tests with instant scorecards.
              </p>
              <div className="project-tech-tags">
                <span className="p-tag">React.js</span>
                <span className="p-tag">Remington GAIL Engine</span>
                <span className="p-tag">3D Physics Labs</span>
                <span className="p-tag">Timed 100-MCQ Engine</span>
                <span className="p-tag">Bilingual UI</span>
                <span className="p-tag">Instant Scorecards</span>
              </div>
              <div className="project-links">
                <a href="https://cpct-frontend.onrender.com/" target="_blank" rel="noopener noreferrer" className="link-underlined">
                  <span>Visit Live Platform</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </a>
                <a href="https://github.com/KurukshetraCodingSchool" target="_blank" rel="noopener noreferrer" className="project-github-pill" title="View Source on GitHub">
                  <i className="fa-brands fa-github"></i>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </article>

          
          <article className="editorial-project-card reverse-layout" data-project="04">
            <div className="project-media-col">
              <div className="browser-mock-window">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div className="browser-url-bar">
                    <span>kurukshetra.edu</span>
                  </div>
                  <div className="browser-action">
                    <a href="courses.html" className="corner-link" aria-label="Visit courses">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                    </a>
                  </div>
                </div>
                <div className="browser-content">
                  <img 
                    src="/images/project-kurukshetra.jpg" 
                    alt="Kurukshetra Coding School Platform &amp; LMS" 
                    loading="lazy"
                    width="600"
                    height="360"
                   />
                  <div className="media-hover-overlay">
                    <span className="overlay-badge">View Curriculum ↗</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="project-info-col">
              <div className="project-meta-line">
                <span className="project-index">04</span>
                <span className="project-discipline">EDTECH PLATFORM &amp; LEARNING MANAGEMENT</span>
              </div>
              <h3 className="project-heading">Kurukshetra Coding School LMS</h3>
              <p className="project-summary">
                Comprehensive educational portal powering the full student journey — course modules, structured code sandboxes, project submission feedback, and an integrated community forum empowering aspiring software developers in Central India.
              </p>
              <div className="project-tech-tags">
                <span className="p-tag">HTML5 / Vanilla CSS</span>
                <span className="p-tag">Modern JavaScript</span>
                <span className="p-tag">Node.js</span>
                <span className="p-tag">MongoDB</span>
                <span className="p-tag">Responsive UI</span>
              </div>
              <div className="project-links">
                <a href="courses.html" className="link-underlined">
                  <span>Explore courses &amp; LMS</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </a>
              </div>
            </div>
          </article>

          
          <article className="editorial-project-card" data-project="05">
            <div className="project-media-col">
              <div className="browser-mock-window">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div className="browser-url-bar">
                    <span>rozgarsetu.in</span>
                  </div>
                  <div className="browser-action">
                    <a href="https://github.com/KurukshetraCodingSchool" target="_blank" rel="noopener noreferrer" className="corner-link" aria-label="Visit project">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                    </a>
                  </div>
                </div>
                <div className="browser-content">
                  <img 
                    src="/images/project-rozgar.jpg" 
                    alt="RozgarSetu - Job recruitment platform for regional seekers" 
                    loading="lazy"
                    width="600"
                    height="360"
                   />
                  <div className="media-hover-overlay">
                    <span className="overlay-badge">View Details ↗</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="project-info-col">
              <div className="project-meta-line">
                <span className="project-index">05</span>
                <span className="project-discipline">COMMUNITY RECRUITMENT &amp; ECOSYSTEM</span>
              </div>
              <h3 className="project-heading">RozgarSetu Employment Bridge</h3>
              <p className="project-summary">
                Direct employment platform connecting skilled youth and job seekers from tier-2 and tier-3 regions with verified regional employers. Features instant WhatsApp alerts, localized category filters, and structured digital resume generator.
              </p>
              <div className="project-tech-tags">
                <span className="p-tag">React.js</span>
                <span className="p-tag">Node.js</span>
                <span className="p-tag">MongoDB</span>
                <span className="p-tag">Express</span>
                <span className="p-tag">Tailwind CSS</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/KurukshetraCodingSchool" target="_blank" rel="noopener noreferrer" className="link-underlined">
                  <span>Explore the platform</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </a>
              </div>
            </div>
          </article>

          
          <article className="editorial-project-card reverse-layout" data-project="06">
            <div className="project-media-col">
              <div className="browser-mock-window">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div className="browser-url-bar">
                    <span>kurugram.community</span>
                  </div>
                  <div className="browser-action">
                    <a href="https://github.com/KurukshetraCodingSchool" target="_blank" rel="noopener noreferrer" className="corner-link" aria-label="Visit project">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                    </a>
                  </div>
                </div>
                <div className="browser-content">
                  <img 
                    src="/images/project-kurugram.jpg" 
                    alt="Kurugram - Developer community social platform" 
                    loading="lazy"
                    width="600"
                    height="360"
                   />
                  <div className="media-hover-overlay">
                    <span className="overlay-badge">View Details ↗</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="project-info-col">
              <div className="project-meta-line">
                <span className="project-index">06</span>
                <span className="project-discipline">SOCIAL HUB & REAL-TIME COLLABORATION</span>
              </div>
              <h3 className="project-heading">Kurugram Developer Network</h3>
              <p className="project-summary">
                A localized developer community and social networking application for student programmers. Allows members to post code snippets with live syntax highlighting, discover pair-programming partners, and join weekend coding hackathons.
              </p>
              <div className="project-tech-tags">
                <span className="p-tag">React.js</span>
                <span className="p-tag">Node.js</span>
                <span className="p-tag">Socket.io</span>
                <span className="p-tag">MongoDB</span>
                <span className="p-tag">Express</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/KurukshetraCodingSchool" target="_blank" rel="noopener noreferrer" className="link-underlined">
                  <span>Explore developer network</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </a>
              </div>
            </div>
          </article>

        </div>

      </div>
    </section>

    
    <section className="editorial-section" id="craft">
      <div className="container section-body">
        
        
        <div className="chapter-line">
          <div className="chapter-tag">
            <span className="chapter-sq">■</span>
            <span>03 / HOW I THINK & WORK</span>
          </div>
          <div className="chapter-meta">
            <span>DEPTH MEETS PERSPECTIVE</span>
          </div>
        </div>

        <div className="craft-header-row">
          <h2 className="editorial-section-title">
            How I build.<br /><em>Depth meets architecture.</em>
          </h2>
          <div className="craft-narrative-note">
            <p>
              Great software isn't just about libraries — it's about disciplined structure, clean mental models, and intuitive user experiences that withstand heavy usage.
            </p>
          </div>
        </div>

        
        <div className="craft-domains-grid">

          
          <div className="craft-card">
            <div className="craft-card-header">
              <span className="craft-idx">01 / FRONTEND ARCHITECTURE</span>
              <span className="craft-status">CORE</span>
            </div>
            <h3 className="craft-title">Interface Engineering & UI Systems</h3>
            <p className="craft-desc">
              Designing fluid, responsive interfaces with strict typography scales, glassmorphism accents, and accessible semantic HTML. Skilled in React component lifecycles, state management, and modern CSS layout engines.
            </p>
            <div className="craft-pill-list">
              <span className="c-pill">React.js</span>
              <span className="c-pill">Next.js</span>
              <span className="c-pill">JavaScript (ES6+)</span>
              <span className="c-pill">HTML5 / Vanilla CSS</span>
              <span className="c-pill">Responsive Design</span>
              <span className="c-pill">UI/UX Systems</span>
            </div>
          </div>

          
          <div className="craft-card">
            <div className="craft-card-header">
              <span className="craft-idx">02 / BACKEND & SERVICES</span>
              <span className="craft-status">CORE</span>
            </div>
            <h3 className="craft-title">API Systems & Server Logic</h3>
            <p className="craft-desc">
              Developing resilient RESTful APIs, session authentication, and WebSocket live connections using Node.js and Express. Ensuring data integrity, sanitization, and structured error handling.
            </p>
            <div className="craft-pill-list">
              <span className="c-pill">Node.js</span>
              <span className="c-pill">Express.js</span>
              <span className="c-pill">RESTful APIs</span>
              <span className="c-pill">JWT & Bcrypt</span>
              <span className="c-pill">WebSockets</span>
              <span className="c-pill">Middleware Design</span>
            </div>
          </div>

          
          <div className="craft-card">
            <div className="craft-card-header">
              <span className="craft-idx">03 / DATA & PERSISTENCE</span>
              <span className="craft-status">DATA</span>
            </div>
            <h3 className="craft-title">Database Modeling & Indexing</h3>
            <p className="craft-desc">
              Schema design, relational mapping in document databases, query optimization, and transaction safety. Proficient in MongoDB and Mongoose ODM for scalable application state.
            </p>
            <div className="craft-pill-list">
              <span className="c-pill">MongoDB</span>
              <span className="c-pill">Mongoose ODM</span>
              <span className="c-pill">Data Modeling</span>
              <span className="c-pill">Aggregation Pipeline</span>
              <span className="c-pill">Query Optimization</span>
            </div>
          </div>

          
          <div className="craft-card">
            <div className="craft-card-header">
              <span className="craft-idx">04 / DEVOPS & WORKFLOW</span>
              <span className="craft-status">OPS</span>
            </div>
            <h3 className="craft-title">Tooling, Git & Deployment</h3>
            <p className="craft-desc">
              Complete software development lifecycle workflows: clean Git branch management, Postman API testing, automated Vercel/Netlify builds, and Linux VPS configuration.
            </p>
            <div className="craft-pill-list">
              <span className="c-pill">Git & GitHub</span>
              <span className="c-pill">Postman</span>
              <span className="c-pill">Vercel / Netlify</span>
              <span className="c-pill">Linux VPS</span>
              <span className="c-pill">Lighthouse Audits</span>
              <span className="c-pill">SEO Best Practices</span>
            </div>
          </div>

          
          <div className="craft-card craft-card-featured">
            <div className="craft-card-header">
              <span className="craft-idx">05 / SOFTWARE PEDAGOGY</span>
              <span className="craft-status">FOUNDER</span>
            </div>
            <h3 className="craft-title">Mentorship, Curriculum & Code Reviews</h3>
            <p className="craft-desc">
              Transforming complex engineering concepts into accessible, hands-on lessons. Trained over 150+ students in Bhopal through live pair programming, architectural breakdowns, and capstone project reviews.
            </p>
            <div className="craft-pill-list">
              <span className="c-pill">Curriculum Engineering</span>
              <span className="c-pill">Live Code Mentoring</span>
              <span className="c-pill">Architecture Reviews</span>
              <span className="c-pill">Career Placement Prep</span>
              <span className="c-pill">Bilingual Teaching</span>
            </div>
          </div>

        </div>

      </div>
    </section>

    
    <section className="editorial-section" id="academy">
      <div className="container section-body">
        
        
        <div className="chapter-line">
          <div className="chapter-tag">
            <span className="chapter-sq">■</span>
            <span>04 / KURUKSHETRA CODING SCHOOL</span>
          </div>
          <div className="chapter-meta">
            <span>PART OF THE BUILDING STORY</span>
          </div>
        </div>

        
        <div className="academy-hero-row">
          <div className="academy-heading-col">
            <h2 className="editorial-section-title">
              From a classroom.<br /><em>To an academy coders trust.</em>
            </h2>
            <p className="academy-narrative">
              Since founding Kurukshetra Coding School alongside co-founder Vikash Rathod, we set out to eliminate the gap between passive tutorial watching and true production engineering in Central India.
            </p>
            <div className="academy-actions">
              <a href="courses.html" className="link-underlined">
                <span>View Academy Courses & Programs</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
              </a>
            </div>
          </div>

          
          <div className="academy-radial-col">
            <div className="radial-stat-card">
              <div className="radial-svg-wrapper">
                <svg className="sunburst-svg" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="150" cy="150" r="140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4"/>
                  <circle cx="150" cy="150" r="105" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5"/>
                  <circle cx="150" cy="150" r="70" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                  <circle cx="150" cy="150" r="35" stroke="rgba(251,191,36,0.3)" strokeWidth="1"/>
                  
                  <line x1="150" y1="10" x2="150" y2="290" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                  <line x1="10" y1="150" x2="290" y2="150" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                  <line x1="51" y1="51" x2="249" y2="249" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                  <line x1="51" y1="249" x2="249" y2="51" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                  <circle cx="150" cy="150" r="8" fill="#fbbf24"/>
                </svg>
              </div>
              <div className="radial-stat-text">
                <span className="stat-highlight">150+ Learners</span>
                <span className="stat-sub">One clear, practical concept at a time.</span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="academy-pillars-grid">
          
          <div className="pillar-card">
            <span className="pillar-idx">01</span>
            <h3 className="pillar-name">Live Project-First Learning</h3>
            <p className="pillar-text">
              Zero rote memorization. Every student ships full-fledged capstones — from authentication engines to database schemas and responsive frontends.
            </p>
          </div>

          <div className="pillar-card">
            <span className="pillar-idx">02</span>
            <h3 className="pillar-name">Hindi & English Accessibility</h3>
            <p className="pillar-text">
              High-caliber engineering without language intimidation. We teach deeply in conversational Hindi and English so logic clicks instantly.
            </p>
          </div>

          <div className="pillar-card">
            <span className="pillar-idx">03</span>
            <h3 className="pillar-name">Industry-Aligned Tech Stack</h3>
            <p className="pillar-text">
              Curriculum centered on today's engineering demands: Modern JavaScript, React, Node.js, Express, MongoDB, and Git collaboration.
            </p>
          </div>

        </div>

        
        <div className="leadership-section" id="leadership">
          
          
          <div className="leadership-header-block">
            <div className="leadership-tagline-wrap">
              <div className="lead-eyebrow">
                <span className="lead-pulse-dot"></span>
                <span className="mono-meta">04.B / LEADERSHIP & FOUNDING MENTORS</span>
              </div>
              <h3 className="leadership-title">
                Guiding minds. <em>Building futures.</em>
              </h3>
              <p className="leadership-lead-desc">
                Kurukshetra Coding School was founded on a singular conviction: ambitious coders in Central India deserve direct access to production-grade engineering principles without gatekeeping or hollow tutorial loops. Every student is guided personally by active builders.
              </p>
            </div>

            
            <div className="leadership-header-stats">
              <div className="lead-stat-card">
                <span className="stat-big">150+</span>
                <span className="stat-label">Students Mentored</span>
                <span className="stat-micro">Direct 1-on-1 Guidance</span>
              </div>
              <div className="lead-stat-card">
                <span className="stat-big">100%</span>
                <span className="stat-label">Production Capstones</span>
                <span className="stat-micro">Real Repos & Deployments</span>
              </div>
              <div className="lead-stat-card">
                <span className="stat-big">0 to 1</span>
                <span className="stat-label">Career Acceleration</span>
                <span className="stat-micro">From Novice to Dev</span>
              </div>
            </div>
          </div>

          
          <div className="leadership-grid">
            
            
            <article className="leader-card" data-leader="alok">
              <div className="leader-card-glow"></div>
              
              
              <div className="leader-top-rail">
                <div className="leader-status-chip">
                  <span className="pulse-indicator"></span>
                  <span>CHIEF INSTRUCTOR &amp; FOUNDER</span>
                </div>
                <span className="leader-serial">01 / ARCHITECTURE</span>
              </div>

              
              <div className="leader-img-wrap">
                <img 
                  src="/images/alok-executive-designed.jpg" 
                  alt="Alok Singh Rathod - Founder & Lead Instructor at Kurukshetra Coding School" 
                  loading="lazy"
                  width="480"
                  height="560"
                 />
                <div className="leader-glow-edge"></div>
                <div className="leader-portrait-overlay">
                  <span className="overlay-tag">MERN · REACT · SYSTEM DESIGN</span>
                </div>
              </div>

              
              <div className="leader-meta">
                <div className="leader-name-row">
                  <div>
                    <h4 className="leader-name">Alok Singh Rathod</h4>
                    <span className="leader-designation">Frontend Specialist &amp; Full-Stack MERN Architect</span>
                  </div>
                </div>

                
                <blockquote className="leader-quote">
                  "Real engineering isn't memorized from tutorial videos — it is forged by wrestling with state trees, architecting schemas, and shipping code that real users depend on."
                </blockquote>

                <p className="leader-bio">
                  Spearheading curriculum design, real-world project mentorship, and core engineering architecture at Kurukshetra. Dedicated to mentoring students from foundational JavaScript to production-ready full-stack applications with clean code standards.
                </p>

                
                <div className="leader-skills-wrap">
                  <span className="skill-pill">Full-Stack MERN</span>
                  <span className="skill-pill">React &amp; Next.js</span>
                  <span className="skill-pill">API Architecture</span>
                  <span className="skill-pill">Code Reviews</span>
                  <span className="skill-pill">System Design</span>
                </div>

                
                <div className="leader-stats-strip">
                  <div className="leader-mini-stat">
                    <span className="num">5+</span>
                    <span className="lbl">Years Coding</span>
                  </div>
                  <div className="leader-mini-stat">
                    <span className="num">150+</span>
                    <span className="lbl">Minds Mentored</span>
                  </div>
                  <div className="leader-mini-stat">
                    <span className="num">30+</span>
                    <span className="lbl">Apps Architected</span>
                  </div>
                </div>

                
                <div className="leader-actions-row">
                  <a href="https://www.linkedin.com/in/alokrathod" target="_blank" rel="noopener noreferrer" className="leader-cta-primary">
                    <span>LinkedIn Dossier</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                  </a>
                  <a href="mailto:eralokrathod@gmail.com" className="leader-cta-secondary" title="Send Direct Email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                    <span>Email Alok</span>
                  </a>
                  <a href="https://github.com/eralokrathod" target="_blank" rel="noopener noreferrer" className="leader-cta-icon" title="Alok's GitHub">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
            </article>

            
            <article className="leader-card" data-leader="vikash">
              <div className="leader-card-glow"></div>
              
              
              <div className="leader-top-rail">
                <div className="leader-status-chip">
                  <span className="pulse-indicator"></span>
                  <span>CO-FOUNDER &amp; HEAD OF OPERATIONS</span>
                </div>
                <span className="leader-serial">02 / OPERATIONS</span>
              </div>

              
              <div className="leader-img-wrap">
                <img 
                  src="/images/vikash-executive-designed.jpg" 
                  alt="Vikash Baghel - Co-Founder & Technical Operations at Kurukshetra Coding School" 
                  loading="lazy"
                  width="480"
                  height="560"
                 />
                <div className="leader-glow-edge"></div>
                <div className="leader-portrait-overlay">
                  <span className="overlay-tag">OPERATIONS · PLACEMENT · LABS</span>
                </div>
              </div>

              
              <div className="leader-meta">
                <div className="leader-name-row">
                  <div>
                    <h4 className="leader-name">Vikash Baghel</h4>
                    <span className="leader-designation">Co-Founder &amp; Student Placement Director</span>
                  </div>
                </div>

                
                <blockquote className="leader-quote">
                  "Every aspiring developer arrives with ambition. Our responsibility is building an uncompromising ecosystem of discipline, daily lab work, and real interview readiness."
                </blockquote>

                <p className="leader-bio">
                  Driving student success pathways, community partnerships, technical labs, and learner placement support. Dedicated to cultivating an inspiring, accessible coding environment where every ambitious student finds their launchpad.
                </p>

                
                <div className="leader-skills-wrap">
                  <span className="skill-pill">Technical Operations</span>
                  <span className="skill-pill">Placement Strategy</span>
                  <span className="skill-pill">Hands-on Labs</span>
                  <span className="skill-pill">Industry Outreach</span>
                  <span className="skill-pill">Mock Interviews</span>
                </div>

                
                <div className="leader-stats-strip">
                  <div className="leader-mini-stat">
                    <span className="num">100%</span>
                    <span className="lbl">Placement Support</span>
                  </div>
                  <div className="leader-mini-stat">
                    <span className="num">24/7</span>
                    <span className="lbl">Lab Support</span>
                  </div>
                  <div className="leader-mini-stat">
                    <span className="num">10+</span>
                    <span className="lbl">Campus Drives</span>
                  </div>
                </div>

                
                <div className="leader-actions-row">
                  <a href="https://wa.me/918959478949" target="_blank" rel="noopener noreferrer" className="leader-cta-primary">
                    <span>Connect on WhatsApp</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                  </a>
                  <a href="tel:+918959478949" className="leader-cta-secondary" title="Call Direct">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span>Direct Call</span>
                  </a>
                  <a href="https://github.com/KurukshetraCodingSchool" target="_blank" rel="noopener noreferrer" className="leader-cta-icon" title="Kurukshetra GitHub">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
            </article>

          </div>
        </div>

      </div>
    </section>

    
    <section className="editorial-section" id="timeline">
      <div className="container section-body">
        
        
        <div className="chapter-line">
          <div className="chapter-tag">
            <span className="chapter-sq">■</span>
            <span>05 / THE TIMELINE</span>
          </div>
          <div className="chapter-meta">
            <span>EVOLUTION & MILESTONES</span>
          </div>
        </div>

        <div className="timeline-header-row">
          <h2 className="editorial-section-title">
            The journey.<br /><em>One milestone at a time.</em>
          </h2>
          <div className="timeline-narrative-note">
            <p>
              From writing my first lines of code to engineering production platforms and building an educational academy in Central India.
            </p>
          </div>
        </div>

        
        <div className="editorial-timeline">

          
          <div className="timeline-row">
            <div className="timeline-year-col">
              <span className="t-year">2025 — Present</span>
              <span className="t-square">□</span>
            </div>
            <div className="timeline-content-col">
              <h3 className="t-title">Founder & Lead Educator at Kurukshetra Coding School</h3>
              <p className="t-desc">
                Scaling student mentorship cohorts in Bhopal. Architected advanced LMS features, introduced full-stack capstone programs, and expanded training to 150+ engineers. Mentoring students into impactful developer careers.
              </p>
            </div>
          </div>

          
          <div className="timeline-row">
            <div className="timeline-year-col">
              <span className="t-year">2024</span>
              <span className="t-square">□</span>
            </div>
            <div className="timeline-content-col">
              <h3 className="t-title">Full-Stack MERN Architecture &amp; Public Platforms</h3>
              <p className="t-desc">
                Architected and shipped flagship web applications: SarkareeUpdate.com government exam portal, Deployer GitHub CI/CD cloud platform, and MP CPCT 2026 Examination &amp; Typing Simulator. Focused on performance, sub-second API responses, and database optimization.
              </p>
              <div className="t-link-wrapper">
                <a href="#work" className="link-underlined">
                  <span>View featured applications</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </a>
              </div>
            </div>
          </div>

          
          <div className="timeline-row">
            <div className="timeline-year-col">
              <span className="t-year">2023</span>
              <span className="t-square">□</span>
            </div>
            <div className="timeline-content-col">
              <h3 className="t-title">Frontend Specialist & Community Mentorship</h3>
              <p className="t-desc">
                Conducted localized workshops in Bhopal teaching responsive design, modern JavaScript (ES6+), and React component architecture. Recognized the lack of practical, hands-on programming bootcamps in Madhya Pradesh.
              </p>
            </div>
          </div>

          
          <div className="timeline-row">
            <div className="timeline-year-col">
              <span className="t-year">2022</span>
              <span className="t-square">□</span>
            </div>
            <div className="timeline-content-col">
              <h3 className="t-title">Engineering Foundation & Computer Science Degree</h3>
              <p className="t-desc">
                Completed B.Tech in Computer Science & Engineering. Deep dive into Data Structures, Algorithms, Computer Networks, and modern web application protocols. Built early experimental applications and contributed to open learning repos.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>

    
    <section className="editorial-contact" id="contact">
      <div className="container contact-container">
        
        
        <div className="contact-chapter-line">
          <div className="chapter-tag">
            <span className="chapter-square">■</span>
            <span>06 / THE NEXT CHAPTER</span>
          </div>
          <span>LET'S MAKE IT MATTER</span>
        </div>

        <div className="contact-inner">
          
          
          <div className="availability">
            <span className="live-dot"></span>
            <span>OPEN TO MEANINGFUL CONVERSATIONS & OPPORTUNITIES</span>
          </div>

          
          <h2 className="contact-editorial-heading">
            Something great<br />starts with <em>a hello.</em>
          </h2>

          
          <div className="contact-cta-wrapper">
            <a className="contact-cta" href="https://www.linkedin.com/in/alokrathod" target="_blank" rel="noopener noreferrer">
              <span>Let's connect</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 7"></path></svg>
            </a>
            <a className="contact-cta" href="mailto:eralokrathod@gmail.com">
              <span>eralokrathod@gmail.com</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </a>
            <a className="contact-cta" href="https://wa.me/918959478949" target="_blank" rel="noopener noreferrer">
              <span>+91 8959478949</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </a>
          </div>

          
          <p className="contact-narrative">
            Web applications, MERN architecture, student mentorship, tech partnerships.<br />
            If our worlds overlap, I'd love to hear from you.
          </p>

          
          <div className="direct-note-container">
            <div className="direct-note-header">
              <span className="direct-note-tag"><i className="fas fa-paper-plane"></i> Quick Message</span>
              <h4>Send a direct note</h4>
            </div>

            <form className="contact-form" id="contactForm">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="userName">Your Full Name *</label>
                  <input type="text" id="userName" name="name" className="form-input" placeholder="e.g. Rahul Sharma" required />
                </div>
                <div className="form-group">
                  <label htmlFor="userEmail">Your Email Address *</label>
                  <input type="email" id="userEmail" name="email" className="form-input" placeholder="e.g. rahul@example.com" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="userPhone">Phone / WhatsApp</label>
                  <input type="tel" id="userPhone" name="phone" className="form-input" placeholder="+91 8959478949" />
                </div>
                <div className="form-group">
                  <label htmlFor="userSubject">Topic / Inquiry *</label>
                  <input type="text" id="userSubject" name="subject" className="form-input" placeholder="e.g. Web Development / Academy Inquiry" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="userMessage">Your Message *</label>
                <textarea id="userMessage" name="message" className="form-textarea" placeholder="Tell me about your project, timeline, or questions..." required></textarea>
              </div>

              <button type="submit" className="btn-submit-note" id="contactSubmitBtn">
                <span>Send Message</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
              </button>
            </form>
          </div>

        </div>

      </div>

      
      <footer className="editorial-footer">
        <div className="container footer-container">
          <div className="footer-top-row">
            <a className="footer-name" href="#hero">
              Alok Singh Rathod<span>.</span>
            </a>

            <div className="socials">
              <a href="https://www.linkedin.com/in/alokrathod" target="_blank" rel="noopener noreferrer">
                <span>LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
              </a>
              <a href="https://www.instagram.com/thealokrathod/" target="_blank" rel="noopener noreferrer">
                <span>Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
              </a>
              <a href="https://github.com/KurukshetraCodingSchool" target="_blank" rel="noopener noreferrer">
                <span>GitHub</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
              </a>
              <a href="mailto:eralokrathod@gmail.com">
                <span>Email</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
              </a>
              <a href="https://wa.me/918959478949" target="_blank" rel="noopener noreferrer">
                <span>WhatsApp</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
              </a>
            </div>

            <a href="#hero" className="back-top" aria-label="Back to top" id="editorialBackTop">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up"><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg>
            </a>
          </div>

          <div className="footer-bottom">
            <span>© 2026 ALOK SINGH RATHOD</span>
            <span>BUILT WITH INTENT. ALWAYS EVOLVING.</span>
            <span>BHOPAL, INDIA ↗ THE WORLD</span>
          </div>
        </div>
      </footer>
    </section>

  
      </main>

      {/* Floating Sarthak Sharma-Style Motion ON/OFF Toggle */}
      <MotionController />

      {/* Editorial Colophon & Footer */}
      <footer className="editorial-footer">

        <div className="container footer-container">
          <div className="footer-top-row">
            <a className="footer-name" href="#hero">
              Alok Singh Rathod<span>.</span>
            </a>

            <div className="socials">
              <a href="https://www.linkedin.com/in/alokrathod" target="_blank" rel="noopener noreferrer">
                <span>LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
              </a>
              <a href="https://www.instagram.com/thealokrathod/" target="_blank" rel="noopener noreferrer">
                <span>Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
              </a>
              <a href="https://github.com/KurukshetraCodingSchool" target="_blank" rel="noopener noreferrer">
                <span>GitHub</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
              </a>
              <a href="mailto:eralokrathod@gmail.com">
                <span>Email</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
              </a>
              <a href="https://wa.me/918959478949" target="_blank" rel="noopener noreferrer">
                <span>WhatsApp</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up-right"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
              </a>
            </div>

            <a href="#hero" className="back-top" aria-label="Back to top" id="editorialBackTop">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-up"><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg>
            </a>
          </div>

          <div className="footer-bottom">
            <span>© 2026 ALOK SINGH RATHOD</span>
            <span>BUILT WITH INTENT. ALWAYS EVOLVING.</span>
            <span>BHOPAL, INDIA ↗ THE WORLD</span>
          </div>
        </div>
      
      </footer>
    </>
  );
}
