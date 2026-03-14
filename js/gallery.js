const images = [

  { src: "workimgs/WA0006.jpg", caption: "" },
  { src: "workimgs/WA0007.jpg", caption: "" },
  { src: "workimgs/WA0008.jpg", caption: "" },
  { src: "workimgs/WA0009.jpg", caption: "" },

  /* ── LOCAL IMAGES — add yours here ──
  { src: "img/gallery/1.jpg", caption: "Event name" },
  { src: "img/gallery/2.jpg", caption: "Event name" },
  ── */

].reverse(); // latest (last added) shows first


/* ═══════════════════════════════════════════
   GRID BUILD
═══════════════════════════════════════════ */
const grid = document.getElementById('gallery-grid');

images.forEach((img, i) => {
  const item = document.createElement('div');
  item.className = 'gallery-item break-inside-avoid overflow-hidden rounded-xl shadow-md';
  item.innerHTML = `<img src="${img.src}" alt="${img.caption}" class="w-full h-auto block" loading="lazy">`;
  item.addEventListener('click', () => openLightbox(i));
  grid.appendChild(item);
});


/* ═══════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════ */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbCounter = document.getElementById('lb-counter');
let current = 0;

/* ── Pinch zoom + pan state ── */
let scale = 1, lastScale = 1;
let panX = 0, panY = 0, lastPanX = 0, lastPanY = 0;
let panStartX = 0, panStartY = 0;
let isPanning = false;

function openLightbox(idx) {
  current = idx;
  lb.classList.add('lb-show');
  requestAnimationFrame(() => lb.classList.add('lb-visible'));
  document.body.style.overflow = 'hidden';
  renderLightbox();
}

function closeLightbox() {
  lb.classList.remove('lb-visible');
  setTimeout(() => {
    lb.classList.remove('lb-show');
    document.body.style.overflow = '';
    resetZoom();
  }, 300);
}

function renderLightbox() {
  lbImg.src = images[current].src;
  lbImg.alt = images[current].caption;
  lbCaption.textContent = images[current].caption;
  lbCounter.textContent = `${current + 1} / ${images.length}`;
  resetZoom();
}

function resetZoom() {
  scale = 1; lastScale = 1;
  panX = 0; panY = 0; lastPanX = 0; lastPanY = 0;
  lbImg.style.transform = 'scale(1) translate(0px, 0px)';
  lbImg.style.transformOrigin = 'center center';
}

function applyTransform() {
  lbImg.style.transform = `scale(${scale}) translate(${panX / scale}px, ${panY / scale}px)`;
}

function getDist(t1, t2) {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

let initDist = 0, initMidX = 0, initMidY = 0;

lbImg.addEventListener('touchstart', e => {
  if (e.touches.length === 2) {
    e.preventDefault();
    isPanning = false;
    initDist = getDist(e.touches[0], e.touches[1]);
    initMidX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    initMidY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    lastScale = scale;
    lastPanX = panX;
    lastPanY = panY;
  } else if (e.touches.length === 1 && scale > 1) {
    e.preventDefault();
    isPanning = true;
    panStartX = e.touches[0].clientX - lastPanX;
    panStartY = e.touches[0].clientY - lastPanY;
  }
}, { passive: false });

lbImg.addEventListener('touchmove', e => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const dist = getDist(e.touches[0], e.touches[1]);
    scale = Math.min(Math.max(lastScale * (dist / initDist), 1), 4);
    const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    panX = lastPanX + (midX - initMidX);
    panY = lastPanY + (midY - initMidY);
    applyTransform();
  } else if (e.touches.length === 1 && isPanning) {
    e.preventDefault();
    panX = e.touches[0].clientX - panStartX;
    panY = e.touches[0].clientY - panStartY;
    applyTransform();
  }
}, { passive: false });

lbImg.addEventListener('touchend', e => {
  if (e.touches.length < 2) {
    lastScale = scale;
    lastPanX = panX;
    lastPanY = panY;
    if (scale <= 1.05) resetZoom();
    isPanning = false;
  }
});

/* Double-tap to reset zoom */
let lastTap = 0;
lbImg.addEventListener('touchend', e => {
  if (e.touches.length > 0) return;
  const now = Date.now();
  if (now - lastTap < 300) resetZoom();
  lastTap = now;
});

/* Prev / Next — buttons and keyboard only */
document.getElementById('lb-prev').addEventListener('click', () => {
  current = (current - 1 + images.length) % images.length;
  renderLightbox();
});
document.getElementById('lb-next').addEventListener('click', () => {
  current = (current + 1) % images.length;
  renderLightbox();
});

document.getElementById('lb-back').addEventListener('click', closeLightbox);
document.getElementById('lb-close').addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
  if (!lb.classList.contains('lb-show')) return;
  if (e.key === 'ArrowRight') { current = (current + 1) % images.length; renderLightbox(); }
  if (e.key === 'ArrowLeft')  { current = (current - 1 + images.length) % images.length; renderLightbox(); }
  if (e.key === 'Escape') closeLightbox();
});