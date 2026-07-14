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

// Reveal-on-scroll con stagger per card, timeline, servizi
const revealTargets = document.querySelectorAll('.project-card, .timeline-item, .skill-group, .service-group, .step, .faq details');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    // stagger: gli elementi che entrano insieme si rivelano in sequenza
    entries.filter(e => e.isIntersecting).forEach((entry, i) => {
      const el = entry.target;
      el.style.transitionDelay = (i * 70) + 'ms';
      el.classList.add('in');
      el.addEventListener('transitionend', () => {
        el.style.transitionDelay = '';
        el.classList.remove('pre', 'in');
      }, { once: true });
      io.unobserve(el);
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((el) => {
    el.classList.add('pre');
    io.observe(el);
  });
}
