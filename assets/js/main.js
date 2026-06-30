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
});

