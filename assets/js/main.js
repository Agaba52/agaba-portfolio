// Starter script — expand freely. index.html depends on these hooks:
// #menu-btn, #mobile-menu, .mobile-link, .nav-link, .reveal, #typed, #progress
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    const toggle = (open) => {
      menu.classList.toggle('hidden', !open);
      btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', () => toggle(menu.classList.contains('hidden')));
    document.querySelectorAll('.mobile-link').forEach(a => a.addEventListener('click', () => toggle(false)));
    window.addEventListener('resize', () => { if (window.innerWidth >= 768) toggle(false); });
  }

  // Scroll reveal
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('visible'));
  }

  // Typing effect
  const typed = document.getElementById('typed');
  if (typed) {
    const words = ['SOC Analyst in training', 'Wazuh SIEM builder', 'CTF player', 'Python automation', 'IT support technician'];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { typed.textContent = words[0]; }
    else {
      let w = 0, c = 0, del = false;
      const tick = () => {
        const word = words[w];
        typed.textContent = word.slice(0, c);
        if (!del && c < word.length) { c++; setTimeout(tick, 70); }
        else if (!del) { del = true; setTimeout(tick, 1400); }
        else if (c > 0) { c--; setTimeout(tick, 35); }
        else { del = false; w = (w + 1) % words.length; setTimeout(tick, 300); }
      };
      tick();
    }
  }

  // Scroll progress bar
  const bar = document.getElementById('progress');
  const onScroll = () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (bar) bar.style.width = pct + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active nav link on scroll
  const links = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = [...links].map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }
});
