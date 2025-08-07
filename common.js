// Common scroll animations and progress bar
const sections = document.querySelectorAll('.slide-section');
const progressBar = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.75;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const text = section.querySelector('.slide-text');
    const image = section.querySelector('.slide-image');

    if (rect.top < triggerBottom && rect.bottom > 100) {
      section.classList.add('show'); section.classList.remove('hide');
      if (text) { text.classList.add('show'); text.classList.remove('hide'); }
      if (image) { image.classList.add('show'); }
      if (image) {
        const offset = rect.top / window.innerHeight * 30;
        image.style.transform = `translateY(${offset}px) scale(1.05)`;
      }
    } else if (rect.top <= 0) {
      section.classList.add('hide'); section.classList.remove('show');
      if (text) { text.classList.add('hide'); text.classList.remove('show'); }
      if (image) { image.classList.remove('show'); }
    } else {
      section.classList.remove('show', 'hide');
      if (text) text.classList.remove('show', 'hide');
      if (image) image.classList.remove('show');
    }
  });

  // Scroll progress bar
  const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  if (progressBar) progressBar.style.width = scrollPercent + "%";
});
