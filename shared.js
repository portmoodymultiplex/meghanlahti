/* ============================================================
   LAHTI 2026 SHARED JS
   Mobile menu toggle only. No scroll animation. The site is
   designed to be complete as a static page.
   Loaded on every page right before password-gate.js.
   ============================================================ */

(function () {
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var open = navMobile.style.display === 'block';
      navMobile.style.display = open ? 'none' : 'block';
      navToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }
})();
