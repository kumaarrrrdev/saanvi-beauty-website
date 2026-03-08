/* ----------------------------------------------------------
   GALLERY DATA
   Uses your original image paths. Add/remove as needed.
---------------------------------------------------------- */
const IMAGES = [
  { src:'imgs/pic5.webp',     alt:'Salon Work 1'   },
  { src:'imgs/pics6.webp',    alt:'Salon Work 2'   },
  { src:'imgs/pics2.webp',    alt:'Salon Work 3'   },
  { src:'imgs/pics3.webp',    alt:'Salon Work 4'   },
  { src:'imgs/pics4.webp',    alt:'Salon Work 5'   },
  { src:'imgs/pic7.png',      alt:'Salon Work 6'   },
  { src:'imgs/saloon_in1.png',alt:'Salon Interior' },
  { src:'imgs/saloon_n1.png', alt:'Salon Exterior' },
  { src:'imgs/pic5.webp',     alt:'Salon Work 9'   },
  { src:'imgs/pics6.webp',    alt:'Salon Work 10'  },
  { src:'imgs/pics2.webp',    alt:'Salon Work 11'  },
  { src:'imgs/pics3.webp',    alt:'Salon Work 12'  },
];

/* ----------------------------------------------------------
   GALLERY MODULE
---------------------------------------------------------- */
const Gal = (() => {
  const INIT = 9;
  let shown = INIT;
  let cur   = 0;
  let lbOpen = false;

  function makeItem(img, i) {
    const d = document.createElement('div');
    d.className = 'gal-item';
    d.innerHTML = `
      <img src="${img.src}" alt="${img.alt}" loading="lazy" />
      <div class="gal-overlay"><i class="fas fa-search-plus"></i></div>
    `;
    const open = () => Gal.open(i);
    d.addEventListener('click', open);
    d.addEventListener('touchend', e => { e.preventDefault(); open(); });
    return d;
  }
  function render() {
    const grid   = document.getElementById('galGrid');
    const scroll = document.getElementById('galScroll');
    if (!grid || !scroll) return;
    grid.innerHTML = '';
    scroll.innerHTML = '';

    IMAGES.slice(0, shown).forEach((img, i) => {
      grid.appendChild(makeItem(img, i));
      scroll.appendChild(makeItem(img, i));
    });

    const more = document.getElementById('galMore');
    if (more) more.style.display = shown >= IMAGES.length ? 'none' : 'block';

    Scroll.check();
  }

  function loadMore() {
    shown = Math.min(shown + 6, IMAGES.length);
    render();
  }

  function open(i) {
    cur = i;
    const lb  = document.getElementById('lightbox');
    const img = document.getElementById('lb-img');
    if (!lb || !img) return;
    img.src = IMAGES[i].src;
    img.alt = IMAGES[i].alt;
    tick();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbOpen = true;
  }

  function close() {
    document.getElementById('lightbox')?.classList.remove('open');
    document.body.style.overflow = '';
    lbOpen = false;
  }

  function next() { cur = (cur + 1) % IMAGES.length; swap(); }
  function prev() { cur = (cur - 1 + IMAGES.length) % IMAGES.length; swap(); }

  function swap() {
    const img = document.getElementById('lb-img');
    if (!img) return;
    img.style.opacity = '.35';
    setTimeout(() => {
      img.src = IMAGES[cur].src;
      img.alt = IMAGES[cur].alt;
      img.style.opacity = '1';
      tick();
    }, 130);
  }

  function tick() {
    const c = document.getElementById('lbCount');
    if (c) c.textContent = `${cur + 1} / ${IMAGES.length}`;
  }

  function init() {
    render();
    document.addEventListener('keydown', e => {
      if (!lbOpen) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    });
    document.getElementById('lightbox')?.addEventListener('click', e => {
      if (e.target.id === 'lightbox') close();
    });
  }

  return { init, open, close, next, prev, loadMore };
})();

/* ----------------------------------------------------------
   SCROLL REVEAL
---------------------------------------------------------- */
const Scroll = (() => {
  function check() {
    const h = window.innerHeight;
    document.querySelectorAll('.reveal:not(.active)').forEach(el => {
      if (el.getBoundingClientRect().top < h - 90)
        el.classList.add('active');
    });
  }
  function init() {
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    check();
  }
  return { init, check };
})();

/* ----------------------------------------------------------
   MOBILE NAV
---------------------------------------------------------- */
const MobileNav = (() => {
  let isOpen = false;

  function toggle() { isOpen ? close() : open(); }

  function open() {
    isOpen = true;
    document.getElementById('mSidebar').classList.add('open');
    document.getElementById('mOverlay').classList.add('open');
    document.getElementById('mSidebar').setAttribute('aria-hidden','false');
    document.getElementById('mMenuBtn').setAttribute('aria-expanded','true');
    const ic = document.querySelector('#mMenuBtn i');
    if (ic) { ic.classList.replace('fa-bars','fa-times'); }
    document.body.style.overflow = 'hidden';
  }

  function close() {
    isOpen = false;
    document.getElementById('mSidebar').classList.remove('open');
    document.getElementById('mOverlay').classList.remove('open');
    document.getElementById('mSidebar').setAttribute('aria-hidden','true');
    document.getElementById('mMenuBtn').setAttribute('aria-expanded','false');
    const ic = document.querySelector('#mMenuBtn i');
    if (ic) { ic.classList.replace('fa-times','fa-bars'); }
    document.body.style.overflow = '';
  }

  return { toggle, open, close };
})();

/* ----------------------------------------------------------
   BACK TO TOP
---------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ----------------------------------------------------------
   NAVBAR SHADOW ON SCROLL
---------------------------------------------------------- */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (!nav) return;
    nav.style.boxShadow = window.scrollY > 80
      ? '0 2px 26px rgba(0,0,0,.14)'
      : '0 2px 18px rgba(0,0,0,.07)';
  }, { passive: true });
}

/* ----------------------------------------------------------
   BOOT
---------------------------------------------------------- */
function boot() {
  Gal.init();
  Scroll.init();
  initBackToTop();
  initNavbar();
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', boot)
  : boot();