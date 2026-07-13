// Aggiorna la linea verticale "thread" in base allo scroll (percentuale di lettura pagina)
function updateThread() {
  const line = document.getElementById('thread-line');
  if (!line) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;
  const h = window.innerHeight * (0.15 + progress * 0.7);
  line.setAttribute('x1', 40);
  line.setAttribute('x2', 40);
  line.setAttribute('y1', 0);
  line.setAttribute('y2', h);
}

window.addEventListener('scroll', updateThread, { passive: true });
window.addEventListener('resize', updateThread);
window.addEventListener('DOMContentLoaded', updateThread);

// Reveal-on-scroll leggero per le card progetto e la timeline
const revealTargets = document.querySelectorAll('.project-card, .timeline-item, .skill-group');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    io.observe(el);
  });
}
