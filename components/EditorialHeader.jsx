'use client';

import { useState, useEffect } from 'react';

export default function EditorialHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      const sections = ['about', 'work', 'craft', 'academy', 'timeline', 'contact'];
      const scrollTrigger = scrollY + 280;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el && scrollTrigger >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      const offset = 90;
      const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: pos,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`editorial-header ${isScrolled ? 'scrolled' : ''}`}
        id="editorialHeader"
      >
        <div className="nav-pill-container">
          <a
            href="#hero"
            className="brand-link"
            id="brandLogo"
            onClick={(e) => handleNavClick(e, 'hero')}
          >
            <span className="brand-name">Alok Singh Rathod</span>
            <span className="brand-dot"></span>
          </a>

          <nav className="nav-menu" id="navMenu" aria-label="Main Navigation">
            <ul className="nav-list">
              {[
                { id: 'about', num: '01', label: 'About' },
                { id: 'work', num: '02', label: 'Work' },
                { id: 'craft', num: '03', label: 'Craft' },
                { id: 'academy', num: '04', label: 'Academy' },
                { id: 'timeline', num: '05', label: 'Story' },
                { id: 'contact', num: '06', label: 'Contact' },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`nav-anchor ${activeSection === item.id ? 'active' : ''}`}
                    data-section={item.id}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    <span className="chapter-num">{item.num}</span> {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <a
              href="#contact"
              className="btn-talk"
              id="headerTalkBtn"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              <span>Let&apos;s talk</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="arrow-up-right"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
            <button
              className="mobile-toggle-btn"
              id="mobileToggleBtn"
              aria-label="Toggle menu"
              aria-expanded={isDrawerOpen}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`}
        id="mobileDrawer"
        aria-hidden={!isDrawerOpen}
        onClick={(e) => {
          if (e.target.id === 'mobileDrawer') setIsDrawerOpen(false);
        }}
      >
        <div className="drawer-inner">
          <div className="drawer-header">
            <span className="drawer-title">Navigation</span>
            <button
              className="drawer-close"
              id="drawerCloseBtn"
              aria-label="Close menu"
              onClick={() => setIsDrawerOpen(false)}
            >
              &times;
            </button>
          </div>
          <ul className="drawer-nav-list">
            {[
              { id: 'about', num: '01', label: 'About / Essence' },
              { id: 'work', num: '02', label: 'Selected Work' },
              { id: 'craft', num: '03', label: 'Craft & Stack' },
              { id: 'academy', num: '04', label: 'Kurukshetra Academy' },
              { id: 'timeline', num: '05', label: 'Timeline & Milestones' },
              { id: 'contact', num: '06', label: 'Contact & Dispatch' },
            ].map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="drawer-link"
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  <span className="chapter-num">{item.num}</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="drawer-footer">
            <a href="mailto:eralokrathod@gmail.com" className="drawer-email">
              eralokrathod@gmail.com
            </a>
            <div className="drawer-socials">
              <a href="https://www.linkedin.com/in/alokrathod" target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
              <a href="https://github.com/KurukshetraCodingSchool" target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
              <a href="https://wa.me/918959478949" target="_blank" rel="noopener noreferrer">
                WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
