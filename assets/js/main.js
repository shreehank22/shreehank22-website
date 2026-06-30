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

  // Trajectory rail: position waypoint dots, fill the path with scroll progress,
  // and highlight whichever section is currently in view.
  const rail = document.querySelector('.traj-rail');
  if (rail) {
    const fill = document.getElementById('traj-fill');
    const dotsWrap = document.getElementById('traj-dots');
    const dots = Array.from(dotsWrap.querySelectorAll('.traj-dot'));
    const sections = dots
      .map(dot => document.getElementById(dot.dataset.target))
      .filter(Boolean);

    function layoutDots() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      sections.forEach((section, i) => {
        const pct = (section.offsetTop / document.documentElement.scrollHeight) * 100;
        dots[i].style.top = pct + '%';
      });
    }

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      fill.style.height = (progress * (rail.clientHeight - 96)) + 'px';

      let activeIndex = 0;
      const probe = scrollTop + window.innerHeight * 0.35;
      sections.forEach((section, i) => {
        if (probe >= section.offsetTop) activeIndex = i;
      });
      dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
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

