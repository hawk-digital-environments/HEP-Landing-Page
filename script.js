(() => {
  const body = document.body;

  // ---------- Hamburger menu ----------
  const btn = document.querySelector('.hamburger');
  const nav = document.getElementById('primary-nav');

  const setMenu = (open) => {
    if (open) body.setAttribute('data-menu-open', '');
    else body.removeAttribute('data-menu-open');
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  };

  btn?.addEventListener('click', () => {
    setMenu(!body.hasAttribute('data-menu-open'));
  });

  nav?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.hasAttribute('data-menu-open')) setMenu(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && body.hasAttribute('data-menu-open')) setMenu(false);
  });

  // ---------- Active nav highlight ----------
  const navLinks = Array.from(nav?.querySelectorAll('a[href^="#"]') ?? []);
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((a) =>
            a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`)
          );
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
  }

  // ---------- Sliders ----------
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const track = slider.querySelector('.slider__track');
    if (!track) return;
    const slides = Array.from(track.children);
    if (slides.length < 2) return;

    const dots = document.createElement('ul');
    dots.className = 'slider__dots';
    slides.forEach((_, i) => {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Folie ${i + 1} anzeigen`);
      if (i === 0) b.setAttribute('aria-current', 'true');
      b.addEventListener('click', () => {
        const target = slides[i];
        track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' });
      });
      li.appendChild(b);
      dots.appendChild(li);
    });
    slider.appendChild(dots);

    let raf = 0;
    const updateActive = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((s, i) => {
        const mid = s.offsetLeft - track.offsetLeft + s.clientWidth / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      dots.querySelectorAll('button').forEach((b, i) => {
        if (i === best) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
      });
    };

    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    });
  });
})();
