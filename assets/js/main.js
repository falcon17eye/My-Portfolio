/* ============================================
   MAIN.JS — Navigation & Smooth Scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation ---
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');
  const overlay = document.querySelector('.nav__mobile-overlay');
  const mobileLinks = document.querySelectorAll('.nav__mobile-menu .nav__link');

  function openMobileMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    overlay.style.display = 'block';
    // Force reflow for transition
    requestAnimationFrame(() => {
      overlay.classList.add('visible');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 500);
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- Active Nav Link (scroll-based for home page) ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Only run scroll-based active nav on home page
  if (navLinks.length > 0 && sections.length > 0) {
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  // --- Nav background on scroll ---
  const nav = document.querySelector('.nav');
  
  function updateNavBackground() {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(20, 21, 21, 0.95)';
    } else {
      nav.style.background = 'rgba(20, 21, 21, 0.85)';
    }
  }

  if (nav) {
    window.addEventListener('scroll', updateNavBackground, { passive: true });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
