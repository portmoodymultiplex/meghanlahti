// ============================================================
// Zada Group — live listings renderer (interim REW feed)
// Reads assets/data/listings.json (refreshed weekly) and paints
// the active-listings grids and the recently-sold wall.
// If the JSON fails to load, the hardcoded cards stay in place.
// Swap this file for the MyRealPage embed once reciprocity is live.
// ============================================================
(function () {
  var root = document.body.getAttribute('data-root') || '';

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function href(u) {
    return /^https?:/.test(u) ? u : root + u;
  }

  function activeCard(l, i) {
    var external = /^https?:/.test(l.url);
    return el(
      '<a href="' + esc(href(l.url)) + '"' + (external ? ' target="_blank" rel="noopener"' : '') +
      ' class="listing-card reveal' + (i % 3 === 1 ? ' delay-1' : i % 3 === 2 ? ' delay-2' : '') + '">' +
        '<div class="media">' +
          '<span class="badge">' + esc(l.badge) + '</span>' +
          '<img src="' + esc(l.photo) + '" alt="' + esc(l.address + ', ' + l.city) + '" loading="lazy" />' +
        '</div>' +
        '<div class="body">' +
          '<div class="specs">' + esc(l.specs) + '</div>' +
          '<div class="price">' + esc(l.price) + '</div>' +
          '<div class="address">' + esc(l.address) + ' · ' + esc(l.city) + '</div>' +
        '</div>' +
      '</a>'
    );
  }

  // Sold card: brand SOLD treatment, no prices (board rules). Cards without a
  // photo get the deep-green typographic tile.
  function soldCard(s) {
    var media = s.photo
      ? '<img src="' + esc(s.photo) + '" alt="' + esc(s.address + ', ' + s.city) + '" loading="lazy" />'
      : '<div class="sold-tile"><span class="serif">' + esc(s.address) + '</span><span>' + esc(s.city) + '</span></div>';
    return el(
      '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" class="listing-card sold-card reveal">' +
        '<div class="media">' +
          '<span class="badge badge-sold">Sold</span>' + media +
        '</div>' +
        '<div class="body">' +
          '<div class="specs">' + esc(s.specs) + '</div>' +
          '<div class="price sold-when">' + esc(s.date) + '</div>' +
          '<div class="address">' + esc(s.address) + ' · ' + esc(s.city) + '</div>' +
        '</div>' +
      '</a>'
    );
  }

  function paint(grid, cards) {
    grid.innerHTML = '';
    cards.forEach(function (c) { grid.appendChild(c); });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      grid.querySelectorAll('.reveal').forEach(function (n) { io.observe(n); });
    } else {
      grid.querySelectorAll('.reveal').forEach(function (n) { n.classList.add('is-visible'); });
    }
  }

  fetch(root + 'assets/data/listings.json')
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      var featured = document.getElementById('idx-featured');
      if (featured && data.active && data.active.length) {
        paint(featured, data.active.slice(0, 3).map(activeCard));
      }
      // sales page listings + solds are MyRealPage embeds now; this file only feeds the homepage featured trio.
    })
    .catch(function () { /* static fallback cards remain */ });
})();
