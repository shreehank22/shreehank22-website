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

  // Mobile slide-in menu
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBackdrop = document.getElementById('mobile-menu-backdrop');
  const menuClose = document.getElementById('mobile-menu-close');

  function openMenu() {
    mobileMenu.classList.add('open');
    menuBackdrop.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuBackdrop.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle && mobileMenu && menuBackdrop) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    menuBackdrop.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
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

      if (fill && rail) {
        const track = rail.querySelector('.traj-track');
        const usableHeight = track ? track.getBoundingClientRect().height : rail.clientHeight - 96;
        fill.style.height = (progress * usableHeight) + 'px';
      }
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

