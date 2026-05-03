/* ─── CUSTOM CURSOR — dot + lagging ring ─── */
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

// Ring lerp loop — lags behind like the main site
(function lerp() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(lerp);
})();

// Grow on interactive elements
document.querySelectorAll('a, button, .day-card, .badge, .project-row, input').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width = '14px'; cur.style.height = '14px';
    cur.style.background = '#fff';
    ring.style.width = '44px'; ring.style.height = '44px';
    ring.style.borderColor = 'rgba(229,9,20,0.9)';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width = '8px'; cur.style.height = '8px';
    cur.style.background = 'var(--red)';
    ring.style.width = '32px'; ring.style.height = '32px';
    ring.style.borderColor = 'rgba(229,9,20,0.6)';
  });
});

document.addEventListener('mousedown', () => {
  cur.style.transform  = 'translate(-50%,-50%) scale(0.65)';
  ring.style.transform = 'translate(-50%,-50%) scale(0.82)';
});
document.addEventListener('mouseup', () => {
  cur.style.transform  = 'translate(-50%,-50%) scale(1)';
  ring.style.transform = 'translate(-50%,-50%) scale(1)';
});

/* ─── NAV SHRINK ─── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ─── SCROLL REVEAL ─── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.rv').forEach(el => observer.observe(el));

/* ─── BACK BUTTON ─── */
function goBack(e) {
  e.preventDefault();
  sessionStorage.setItem('scrollTo', 'fablab');
  window.location.href = 'index.html';
}

/* ─── DAY CARDS staggered fade-up ─── */
document.querySelectorAll('.day-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(28px)';
  card.style.transition = `opacity 0.5s ease ${i * 0.09}s, transform 0.5s ease ${i * 0.09}s`;
});
const cardObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      cardObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.day-card').forEach(c => cardObs.observe(c));

/* ─── CARD IMAGE ZOOM on hover ─── */
document.querySelectorAll('.day-card').forEach(card => {
  const img = card.querySelector('img.bg-img');
  if (!img) return;
  card.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.08)'; });
  card.addEventListener('mouseleave', () => { img.style.transform = ''; });
});

/* ─── PROJECT ROWS slide in ─── */
const rowObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => { e.target.style.opacity = '1'; e.target.style.transform = 'translateX(0)'; }, i * 110);
      rowObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.project-row').forEach(r => {
  r.style.opacity = '0';
  r.style.transform = 'translateX(-30px)';
  r.style.transition = 'opacity .5s ease, transform .5s ease';
  rowObs.observe(r);
});

/* ─── BADGES stagger pop ─── */
const badgeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.badge').forEach((b, i) => {
        setTimeout(() => { b.style.opacity = '1'; b.style.transform = 'translateY(0) scale(1)'; }, i * 55);
      });
      badgeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.badge-wrap').forEach(w => {
  w.querySelectorAll('.badge').forEach(b => {
    b.style.opacity = '0';
    b.style.transform = 'translateY(10px) scale(0.9)';
    b.style.transition = 'opacity .35s ease, transform .35s ease';
  });
  badgeObs.observe(w);
});

/* ─── IMAGE UPLOAD ─── */
function handleUpload(input, wrapId, imgId) {
  const file = input.files[0];
  if (!file) return;
  const wrap = document.getElementById(wrapId);
  const img  = document.getElementById(imgId);
  const reader = new FileReader();
  reader.onload = ev => { img.src = ev.target.result; wrap.classList.add('has-upload'); };
  reader.readAsDataURL(file);
}
function triggerFile(event, wrapId) {
  event.preventDefault();
  event.stopPropagation();
  document.querySelector('#' + wrapId + ' input[type="file"]').click();
}