/* ── CAROUSEL ── */
const carouselCards = [
{
  img: "workimgs/WA0006.jpg",
  description: "We provided the essential Clothing to the Patients.",
  date: "June 4, 2025"
},
{
  img: "workimgs/WA0007.jpg",
  description: "We distributed clothes among the villager.",
  date: "Jan 14, 2025"
},
{
  img: "workimgs/WA0008.jpg",
  description: "We held a Free Health Examine Camp.",
  date: "Dec 7, 2025"
},
{
  img: "workimgs/WA0009.jpg",
  description: "Our Work caught sight of Reporters",
  date: "Dec 7, 2025"
}];

(function() {
  const track = document.getElementById('carousel-track');
  const dotsWrap = document.getElementById('carousel-dots');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');
  let current = 0,
    autoTimer;
  const INTERVAL = 8500;
  
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
  
  carouselCards.forEach((c, i) => {
    const slide = document.createElement('div');
    slide.className = 'min-w-full';
    slide.innerHTML = `
      <div class="relative w-full h-[65vh] sm:h-[420px] overflow-hidden">
        <img src="${c.img}" alt="${c.title}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105">
        <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 px-6 py-5 text-center">
          <p class="text-gray-200 text-sm leading-relaxed mb-3 drop-shadow">${c.description}</p>
          <span class="inline-block text-xs font-medium text-white bg-accent/80 rounded-full px-3 py-1 backdrop-blur-sm">${c.date}</span>
        </div>
      </div>`;
    track.appendChild(slide);
    
    const dot = document.createElement('button');
    dot.style.height = '8px';
    dot.style.borderRadius = '9999px';
    dot.style.transition = 'all 0.3s';
    dot.style.outline = 'none';
    dot.style.backgroundColor = i === 0 ? accent : '#90959E';
    dot.style.width = i === 0 ? '24px' : '10px';
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  
  function goTo(idx) {
    current = (idx + carouselCards.length) % carouselCards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll('button').forEach((d, i) => {
      d.style.backgroundColor = i === current ? accent : '#90959E';
      d.style.width = i === current ? '24px' : '10px';
    });
    resetAuto();
  }
  
  function next() { goTo(current + 1); }
  
  function prev() { goTo(current - 1); }
  
  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, INTERVAL);
  }
  
  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);
  document.getElementById('carousel-root').addEventListener('mouseenter', () => clearInterval(autoTimer));
  document.getElementById('carousel-root').addEventListener('mouseleave', resetAuto);
  
  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
  });
  
  resetAuto();
})();