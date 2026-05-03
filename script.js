const loader = document.getElementById('loader');
const barFill = document.getElementById('loader-bar-fill');
const barPercent = document.getElementById('loader-percent');
let progress = 0;
 
const loadTimer = setInterval(() => {
  progress += Math.random() * 18 + 4;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadTimer);
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(() => {
        loader.style.display = 'none';
        startHero();
      }, 500);
    }, 300);
  }
  barFill.style.width = progress + '%';
  barPercent.textContent = Math.floor(progress) + '%';
}, 80);
 
/* ── HERO ENTRANCE ANIMATION ── */
// Hide hero elements initially
['.hero-badge', '.hero-name', '.hero-role', '.hero-desc', '.hero-buttons', '.hero-stats'].forEach(s => {
  const el = document.querySelector(s);
  if (el) el.style.opacity = '0';
});
 
function startHero() {
  ['.hero-badge', '.hero-name', '.hero-role', '.hero-desc', '.hero-buttons', '.hero-stats'].forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    setTimeout(() => {
      el.style.transition = 'opacity .7s ease, transform .7s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 130);
  });
}
 
/* ── TYPEWRITER EFFECT ── */
const words = ['Web Developer'];
let wIdx = 0, lIdx = 0, del = false;
const twEl = document.getElementById('typewriter');
 
function typeLoop() {
  const w = words[wIdx];
  twEl.textContent = del ? w.slice(0, lIdx - 1) : w.slice(0, lIdx + 1);
  del ? lIdx-- : lIdx++;
  let spd = del ? 55 : 100;
  if (!del && lIdx === w.length) { spd = 1800; del = true; }
  else if (del && lIdx === 0) { del = false; wIdx = (wIdx + 1) % words.length; spd = 350; }
  setTimeout(typeLoop, spd);
}
typeLoop();
 
/* ── CUSTOM CURSOR ── */
const cRing = document.getElementById('cursor');
const cDot  = document.getElementById('cursor-dot');
let mx = 0, my = 0, rx = 0, ry = 0;
 
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cDot.style.left = mx + 'px';
  cDot.style.top  = my + 'px';
});
 
(function moveCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cRing.style.left = rx + 'px';
  cRing.style.top  = ry + 'px';
  requestAnimationFrame(moveCursor);
})();
 
document.querySelectorAll('a, button, .module-card, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cRing.classList.add('big'));
  el.addEventListener('mouseleave', () => cRing.classList.remove('big'));
});
 
/* ── NAVBAR SCROLL EFFECT ── */
const navbar = document.getElementById('navbar');
 
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  // Active nav link highlighting
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  document.querySelectorAll('.nav-menu a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});
 
/* ── SMOOTH SCROLL FOR ANCHOR LINKS ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#' || href === '') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
 
/* ── REVEAL ON SCROLL (hide-left / hide-right / hide-bottom) ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
 
document.querySelectorAll('.hide-left, .hide-right, .hide-bottom').forEach(el => revObs.observe(el));
 
/* ── FADE SECTIONS ── */
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
 
document.querySelectorAll('.fade-section').forEach(el => fadeObs.observe(el));
 
/* ── RED LINE ANIMATION ── */
const lObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = '40px';
      lObs.unobserve(e.target);
    }
  });
}, { threshold: 1 });
 
document.querySelectorAll('.red-line').forEach(l => lObs.observe(l));
 
/* ── COUNTER ANIMATION ── */
function countUp(el, target, dur = 1400) {
  let s = null;
  (function step(ts) {
    if (!s) s = ts;
    const p = Math.min((ts - s) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  })(performance.now());
}
 
const sObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(el => countUp(el, +el.dataset.count));
      sObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
 
const sEl = document.querySelector('.hero-stats');
if (sEl) sObs.observe(sEl);
 
/* ── TIMELINE ANIMATION ── */
const tObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.timeline-item').forEach((item, i) => {
        setTimeout(() => item.classList.add('show-item'), i * 160);
      });
      tObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
 
document.querySelectorAll('.timeline').forEach(t => tObs.observe(t));
 
/* ── SKILL CARDS ANIMATION ── */
const skObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-card').forEach((c, i) => {
        setTimeout(() => c.classList.add('show-card'), i * 80);
      });
      skObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
 
const skGrid = document.querySelector('.skills-grid');
if (skGrid) skObs.observe(skGrid);
 
/* ── MODULE CARDS ANIMATION ── */
const mObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.module-card').forEach((c, i) => {
        setTimeout(() => c.classList.add('show-card'), i * 70);
      });
      mObs.unobserve(e.target);
    }
  });
}, { threshold: 0.05 });
 
const mGrid = document.querySelector('.module-grid');
if (mGrid) mObs.observe(mGrid);
 
/* ── PROJECT CARDS ANIMATION ── */
const pObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.project-card').forEach((c, i) => {
        setTimeout(() => c.classList.add('show-card'), i * 150);
      });
      pObs.unobserve(e.target);
    }
  });
}, { threshold: 0.05 });
 
const pList = document.querySelector('.project-list');
if (pList) pObs.observe(pList);
 
/* ── 3D CARD TILT EFFECT ── */
document.querySelectorAll('.module-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * 8;
    const ry = -((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) * 8;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.03)`;
    card.style.transition = 'transform .05s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .4s ease';
  });
});
 
/* ── MODULE FILTER TABS ── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const f = btn.dataset.filter;
    document.querySelectorAll('.module-card').forEach(card => {
      const show = f === 'all' || card.dataset.cat === f;
      if (show) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => { card.style.display = 'none'; }, 350);
      }
    });
  });
});
 
/* ── HERO PARALLAX ── */
const heroBg = document.getElementById('hero-bg');
window.addEventListener('scroll', () => {
  if (heroBg && window.scrollY < window.innerHeight) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
  }
}, { passive: true });
 
/* ── ABOUT PHOTO FLOAT ANIMATION ── */
const aPhoto = document.querySelector('.about-photo');
if (aPhoto) {
  let t = 0;
  setInterval(() => {
    t += 0.015;
    aPhoto.style.transform = `translateY(${Math.sin(t) * 8}px)`;
  }, 16);
}
 
/* ── CONTACT FORM (MAILTO) ── */
function sendMail() {
  const name    = document.getElementById('form-name').value.trim();
  const email   = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim();
  const message = document.getElementById('form-message').value.trim();
 
  if (!name || !email || !subject || !message) {
    alert('Please fill in all required fields.');
    return;
  }
  window.location.href =
    'mailto:palgandhi168@gmail.com' +
    '?subject=' + encodeURIComponent(subject) +
    '&body='    + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
}
 
/* ── PARTICLE CANVAS ── */
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');
let dots = [], pmx = 9999, pmy = 9999;
 
function resizeCanvas() {
  canvas.width  = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
document.addEventListener('mousemove', e => { pmx = e.clientX; pmy = e.clientY; });
 
// Create dots
for (let i = 0; i < 70; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.8 + 0.4,
    o: Math.random() * 0.35 + 0.08
  });
}
 
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
 
  // Move & draw dots
  dots.forEach(d => {
    const dx   = d.x - pmx;
    const dy   = d.y - pmy;
    const dist = Math.hypot(dx, dy);
    if (dist < 100) {
      d.vx += dx / dist * 0.06;
      d.vy += dy / dist * 0.06;
    }
    d.vx *= 0.995;
    d.vy *= 0.995;
    d.x  += d.vx;
    d.y  += d.vy;
    if (d.x < 0 || d.x > canvas.width)  d.vx *= -1;
    if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
 
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(229,9,20,${d.o})`;
    ctx.fill();
  });
 
  // Draw connecting lines
  dots.forEach((d, i) => {
    for (let j = i + 1; j < dots.length; j++) {
      const dx2   = d.x - dots[j].x;
      const dy2   = d.y - dots[j].y;
      const dist2 = Math.hypot(dx2, dy2);
      if (dist2 < 120) {
        ctx.strokeStyle = `rgba(229,9,20,${0.12 * (1 - dist2 / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  });
 
  requestAnimationFrame(drawCanvas);
}
drawCanvas();
 