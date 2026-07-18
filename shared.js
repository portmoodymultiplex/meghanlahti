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

/* ============================================================
   CAMPAIGN FORM SUBMIT
   Submissions go straight to a Google Sheet through a Google
   Apps Script web app (no Zapier, no third-party relay). Each
   submission is tagged with its form-name so the script drops
   it on the right tab: volunteer / info-request /
   commit-to-vote / endorsement.
   Netlify Forms also captures a copy on the campaign's own
   host as a silent backup + spam filter.
   -----------------------------------------------------------
   ONE-TIME SETUP: after deploying the Apps Script web app,
   paste its URL between the quotes below. Until it is set,
   submissions still save to Netlify as a backup.
   ============================================================ */
window.CAMPAIGN_SHEET_ENDPOINT = '';  // e.g. 'https://script.google.com/macros/s/AKfy.../exec'

window.submitCampaignForm = function (opts) {
  var form = opts.form;
  var btn = opts.button;

  function showSuccess() {
    form.style.display = 'none';
    var s = document.getElementById(opts.successId);
    if (s) { s.style.display = 'block'; }
  }

  // Honeypot: if a bot filled the hidden field, quietly stop. No data sent.
  var hp = form.querySelector('[name="bot-field"]');
  if (hp && hp.value) { showSuccess(); return; }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Url-encoded body incl. form-name. Skip _control fields (unused now).
  var params = new URLSearchParams();
  params.append('form-name', opts.formName);
  Object.keys(opts.data).forEach(function (k) {
    if (k.charAt(0) !== '_') { params.append(k, opts.data[k]); }
  });
  var body = params.toString();

  var posts = [
    // Backup capture on the campaign's own Netlify host. No third party.
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    })
  ];

  // Primary: straight into the Google Sheet via the Apps Script web app.
  // no-cors keeps it a simple request so Apps Script accepts it without a preflight.
  if (window.CAMPAIGN_SHEET_ENDPOINT) {
    posts.push(fetch(window.CAMPAIGN_SHEET_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    }));
  }

  Promise.allSettled(posts).then(function (results) {
    var ok = results.some(function (r) { return r.status === 'fulfilled'; });
    if (ok) {
      showSuccess();
    } else {
      btn.textContent = opts.resetLabel;
      btn.disabled = false;
      alert(opts.errorMsg);
    }
  });
};
