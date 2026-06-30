// Lightweight scroll-reveal — no dependencies.
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll(
    '.t-row, .pub, .project-card, .skill-group, .hero-text, .hero-photo, .edu-card'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => io.observe(el));

  // Dark mode toggle. Initial theme is already set inline in <head> to avoid flash.
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const root = document.documentElement;
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // Mobile hamburger menu
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Trajectory rail: position waypoint dots, fill the path with scroll progress,
  // and highlight whichever section is currently in view. Drives both the
  // desktop vertical rail and the mobile horizontal progress bar.
  const rail = document.querySelector('.traj-rail');
  const fillMobile = document.getElementById('traj-fill-h');
  if (rail || fillMobile) {
    const fill = document.getElementById('traj-fill');
    const dotsWrap = document.getElementById('traj-dots');
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.traj-dot')) : [];
    const sections = dots.length
      ? dots.map(dot => document.getElementById(dot.dataset.target)).filter(Boolean)
      : Array.from(document.querySelectorAll('.section, .hero')).filter(el => el.id);

    function layoutDots() {
      if (!dots.length) return;
      sections.forEach((section, i) => {
        const pct = (section.offsetTop / document.documentElement.scrollHeight) * 100;
        dots[i].style.top = pct + '%';
      });
    }

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      if (fill && rail) fill.style.height = (progress * (rail.clientHeight - 96)) + 'px';
      if (fillMobile) fillMobile.style.width = (progress * 100) + '%';

      if (dots.length) {
        let activeIndex = 0;
        const probe = scrollTop + window.innerHeight * 0.35;
        sections.forEach((section, i) => {
          if (probe >= section.offsetTop) activeIndex = i;
        });
        dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
      }
    }

    layoutDots();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { layoutDots(); onScroll(); });
  }

  // Subtle parallax on the hero photo for a touch of depth.
  const heroPhoto = document.querySelector('.hero-photo');
  if (heroPhoto && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const offset = Math.min(window.scrollY * 0.06, 40);
      heroPhoto.style.transform = `translateY(${offset}px)`;
    }, { passive: true });
  }
});

