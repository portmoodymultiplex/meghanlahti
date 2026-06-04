/* ============================================================
   LAHTI 2026 SHARED JS
   Nav toggle + scroll-reveal observer.
   Loaded on every page right before password-gate.js.
   ============================================================ */

(function () {
  // Mobile menu toggle
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      navMobile.style.display = navMobile.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Scroll-reveal: anything with class .reveal fades up when entering viewport
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: just show everything
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
