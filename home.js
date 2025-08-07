const hero = document.getElementById('hero');
const firstSlide = document.getElementById('firstSlide');
let heroHidden = false;

// Lock scroll on home page initially
if (hero) document.body.style.overflow = 'hidden';

// Hide hero
function hideHero() {
  if (!hero) return;
  hero.classList.remove('revealed');
  hero.classList.add('hidden');
  heroHidden = true;

  setTimeout(() => {
    hero.style.display = 'none';
    document.body.style.overflow = '';
    window.scrollTo({ top: firstSlide.offsetTop, behavior: 'smooth' });
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 1200);
  }, 1000);
}

// Reveal hero
function revealHero() {
  if (!hero) return;
  hero.style.display = 'flex';
  setTimeout(() => {
    hero.classList.remove('hidden');
    hero.classList.add('revealed');
    heroHidden = false;
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
}

// Scroll events for hero
if (hero) {
  window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0 && !heroHidden) {
      e.preventDefault(); hideHero();
    } else if (e.deltaY < 0 && window.scrollY === 0 && heroHidden) {
      e.preventDefault(); revealHero();
    }
  }, { passive: false });

  let startY = 0;
  window.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; });
  window.addEventListener('touchmove', (e) => {
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;
    if (deltaY < -50 && !heroHidden) { e.preventDefault(); hideHero(); }
    if (deltaY > 50 && window.scrollY === 0 && heroHidden) { e.preventDefault(); revealHero(); }
  }, { passive: false });
}
