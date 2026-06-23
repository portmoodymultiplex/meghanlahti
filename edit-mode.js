/* ============================================================
   LAHTI 2026 — EDIT MODE
   Click-to-edit words & photos, admin sticky notes, publish-to-live.
   Drop-in: needs supabase-js loaded before it, and the two config
   values below. Works on any page that has data-edit / data-img tags.

   HOW MEGHAN LOGS IN:
     Add  #admin  to any page URL  (e.g. lahti2026.com/about.html#admin)
     ...or press  Ctrl/Cmd + Shift + E
   Then the editor bar appears. To the public, none of this exists.
   ============================================================ */
(function () {
  'use strict';

  // ---- CONFIG (fill these in from Supabase → Project Settings → API) ----
  var SUPABASE_URL  = 'https://yzonfgdofcbglupwdrpg.supabase.co';
  var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6b25mZ2RvZmNiZ2x1cHdkcnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMjk1NzQsImV4cCI6MjA5NzgwNTU3NH0.5O_EAqoBzlHjKOoOK7Afommzs6I0GFqSFo2t8jrnF0M';
  // -----------------------------------------------------------------------

  // Bail out quietly if not configured yet — the site keeps working normally.
  if (SUPABASE_URL.indexOf('PASTE_') === 0 || !window.supabase) return;

  // Which page is this? -> "about", "index", etc. (used as the DB row key)
  var PAGE_ID = (location.pathname.split('/').pop() || 'index').replace(/\.html?$/i, '') || 'index';

  var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
  var editMode = false, placingNote = false, session = null;

  // ---------- styles (injected so we never touch shared.css) ----------
  var css = document.createElement('style');
  css.textContent = [
    '#lahti-adminbar{position:fixed;top:0;left:0;right:0;z-index:99990;background:#1b2238;color:#fff;display:flex;align-items:center;gap:14px;padding:10px 18px;font-family:Inter,system-ui,sans-serif;font-size:14px;box-shadow:0 2px 18px rgba(0,0,0,.25)}',
    '#lahti-adminbar .who{display:flex;align-items:center;gap:8px;font-weight:600}',
    '#lahti-adminbar .who .dot{width:8px;height:8px;border-radius:50%;background:#4ade80}',
    '#lahti-adminbar .spacer{flex:1}',
    '#lahti-adminbar button{font-family:inherit;font-size:13px;font-weight:600;border:0;border-radius:7px;padding:8px 14px;cursor:pointer}',
    '.lab-toggle{background:#2f3a5e;color:#fff}.lab-toggle.on{background:#A8527A}',
    '.lab-note{background:#2f3a5e;color:#fff}',
    '.lab-publish{background:#4ade80;color:#06351c}',
    '.lab-logout{background:transparent;color:#cbd5e1;text-decoration:underline}',
    '.lab-hint{font-size:12px;color:#9aa6c4}',
    'body.lahti-has-bar{padding-top:54px}',
    'body.lahti-edit [data-edit]{outline:1px dashed transparent;outline-offset:3px;border-radius:3px;transition:outline-color .12s,background .12s;cursor:text}',
    'body.lahti-edit [data-edit]:hover{outline-color:#C77DA1;background:rgba(199,125,161,.08)}',
    'body.lahti-edit [data-edit]:focus{outline:2px solid #A8527A;background:rgba(199,125,161,.10)}',
    '.lahti-imgwrap{position:relative}',
    'body.lahti-edit .lahti-imgwrap:hover .lahti-swap{opacity:1}',
    '.lahti-swap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;background:rgba(27,34,56,.55);color:#fff;font-weight:600;font-size:14px;cursor:pointer;transition:opacity .15s;border:2px dashed rgba(255,255,255,.7)}',
    '.lahti-swap span{background:#A8527A;padding:9px 16px;border-radius:999px}',
    'body:not(.lahti-edit) .lahti-swap{display:none}',
    '.lahti-sticky{position:absolute;z-index:99980;width:190px;background:#FFF4B8;color:#3a3000;box-shadow:0 6px 20px rgba(0,0,0,.22);border-radius:3px;font-family:Inter,system-ui,sans-serif;font-size:13px;line-height:1.45;transform:rotate(-1.4deg)}',
    '.lahti-sticky .sh{display:flex;justify-content:space-between;align-items:center;background:#FCE671;padding:5px 8px;cursor:grab;border-radius:3px 3px 0 0}',
    '.lahti-sticky .sh .tag{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7a6a00}',
    '.lahti-sticky .sh .x{cursor:pointer;font-weight:700;color:#7a6a00;padding:0 4px}',
    '.lahti-sticky .sb{padding:8px 10px 12px;min-height:54px;outline:none}',
    'body:not(.lahti-edit) .lahti-sticky{display:none}',
    'body.lahti-placing,body.lahti-placing *{cursor:crosshair !important}',
    '#lahti-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);z-index:99999;background:#1b2238;color:#fff;padding:14px 22px;border-radius:10px;font-size:14px;opacity:0;pointer-events:none;transition:all .25s;box-shadow:0 8px 30px rgba(0,0,0,.3)}',
    '#lahti-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}#lahti-toast b{color:#4ade80}',
    '#lahti-login{position:fixed;inset:0;z-index:99995;background:rgba(20,26,44,.6);display:flex;align-items:center;justify-content:center;font-family:Inter,system-ui,sans-serif}',
    '#lahti-login .box{background:#fff;border-radius:14px;padding:30px;width:330px;box-shadow:0 20px 60px rgba(0,0,0,.3)}',
    '#lahti-login h3{font-family:"Playfair Display",serif;color:#2D3A5C;margin:0 0 4px;font-size:22px}',
    '#lahti-login p{color:#5E6B82;font-size:13px;margin:0 0 18px}',
    '#lahti-login input{width:100%;box-sizing:border-box;padding:11px 12px;margin-bottom:10px;border:1px solid #d8d8e0;border-radius:8px;font-size:14px}',
    '#lahti-login button{width:100%;padding:12px;border:0;border-radius:8px;background:#A8527A;color:#fff;font-weight:600;font-size:14px;cursor:pointer}',
    '#lahti-login .err{color:#c0392b;font-size:12px;min-height:16px;margin-bottom:6px}',
    '#lahti-login .cancel{background:none;color:#5E6B82;text-decoration:underline;margin-top:8px;font-weight:500}'
  ].join('');
  document.head.appendChild(css);

  // ---------- toast helper ----------
  var toastTimer;
  function toast(html) {
    var t = document.getElementById('lahti-toast');
    if (!t) { t = document.createElement('div'); t.id = 'lahti-toast'; document.body.appendChild(t); }
    t.innerHTML = html; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 3600);
  }

  // ---------- 1. PUBLIC LOAD: pull saved content & overlay it ----------
  function applyContent(content) {
    if (!content) return;
    document.querySelectorAll('[data-edit]').forEach(function (el) {
      var k = el.getAttribute('data-edit');
      if (content[k] !== undefined) el.innerHTML = content[k];
    });
    document.querySelectorAll('[data-img]').forEach(function (img) {
      var k = 'img:' + img.getAttribute('data-img');
      if (content[k]) img.src = content[k];
    });
  }
  function loadContent() {
    return sb.from('page_content').select('content').eq('page', PAGE_ID).maybeSingle()
      .then(function (r) { if (r.data && r.data.content) applyContent(r.data.content); });
  }

  // ---------- wrap images so we can overlay a "Change photo" button ----------
  function prepImages() {
    document.querySelectorAll('[data-img]').forEach(function (img) {
      if (img.parentNode.classList.contains('lahti-imgwrap')) return;
      var wrap = document.createElement('div');
      wrap.className = 'lahti-imgwrap';
      var cs = getComputedStyle(img);
      if (cs.display !== 'inline') wrap.style.display = cs.display;
      wrap.style.width = '100%'; wrap.style.height = '100%';
      img.parentNode.insertBefore(wrap, img);
      wrap.appendChild(img);
      var label = document.createElement('label');
      label.className = 'lahti-swap';
      label.innerHTML = '<span>Change photo</span>';
      var input = document.createElement('input');
      input.type = 'file'; input.accept = 'image/*'; input.hidden = true;
      input.addEventListener('change', function (e) { handleImage(e, img); });
      label.appendChild(input);
      wrap.appendChild(label);
    });
  }

  // ---------- 2. ADMIN BAR ----------
  function buildBar() {
    if (document.getElementById('lahti-adminbar')) return;
    document.body.classList.add('lahti-has-bar');
    var bar = document.createElement('div');
    bar.id = 'lahti-adminbar';
    bar.innerHTML =
      '<div class="who"><span class="dot"></span> Editing: ' + PAGE_ID + '</div>' +
      '<button class="lab-toggle" id="lab-toggle">✏️ Edit page</button>' +
      '<button class="lab-note" id="lab-note" style="display:none">📌 Add note</button>' +
      '<span class="lab-hint" id="lab-hint">Click “Edit page” to start.</span>' +
      '<div class="spacer"></div>' +
      '<button class="lab-publish" id="lab-publish" style="display:none">Publish — go live</button>' +
      '<button class="lab-logout" id="lab-logout">Log out</button>';
    document.body.appendChild(bar);

    document.getElementById('lab-toggle').addEventListener('click', toggleEdit);
    document.getElementById('lab-note').addEventListener('click', startNote);
    document.getElementById('lab-publish').addEventListener('click', publish);
    document.getElementById('lab-logout').addEventListener('click', function () {
      sb.auth.signOut().then(function () { location.hash = ''; location.reload(); });
    });

    // plain-text paste so formatting can't leak in and break the design
    document.querySelectorAll('[data-edit]').forEach(function (el) {
      el.addEventListener('paste', function (e) {
        e.preventDefault();
        var text = (e.clipboardData || window.clipboardData).getData('text/plain');
        document.execCommand('insertText', false, text);
      });
    });
    prepImages();
    loadNotes();
  }

  function toggleEdit() {
    editMode = !editMode;
    document.body.classList.toggle('lahti-edit', editMode);
    document.getElementById('lab-toggle').classList.toggle('on', editMode);
    document.getElementById('lab-toggle').textContent = editMode ? '👁 Preview' : '✏️ Edit page';
    document.getElementById('lab-note').style.display = editMode ? '' : 'none';
    document.getElementById('lab-publish').style.display = editMode ? '' : 'none';
    document.getElementById('lab-hint').textContent = editMode
      ? 'Click any word to type over it. Hover a photo to swap it. Layout is locked.'
      : 'Click “Edit page” to start.';
    document.querySelectorAll('[data-edit]').forEach(function (el) {
      el.setAttribute('contenteditable', editMode);
    });
  }

  // ---------- 3. IMAGE upload (resize first, then store) ----------
  function handleImage(e, img) {
    var file = e.target.files[0]; if (!file) return;
    toast('Uploading photo…');
    var reader = new FileReader();
    reader.onload = function (ev) {
      var tmp = new Image();
      tmp.onload = function () {
        // resize down to max 1600px wide to keep the site fast & storage small
        var max = 1600, w = tmp.width, h = tmp.height;
        if (w > max) { h = Math.round(h * max / w); w = max; }
        var c = document.createElement('canvas'); c.width = w; c.height = h;
        c.getContext('2d').drawImage(tmp, 0, 0, w, h);
        c.toBlob(function (blob) {
          var path = PAGE_ID + '/' + img.getAttribute('data-img') + '-' + Date.now() + '.jpg';
          sb.storage.from('site-images').upload(path, blob, { contentType: 'image/jpeg', upsert: true })
            .then(function (res) {
              if (res.error) { toast('Upload failed: ' + res.error.message); return; }
              var url = sb.storage.from('site-images').getPublicUrl(path).data.publicUrl;
              img.src = url;
              toast('Photo updated. Hit <b>Publish</b> to make it live.');
            });
        }, 'image/jpeg', 0.85);
      };
      tmp.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  // ---------- 4. STICKY NOTES (admin-only) ----------
  function startNote() {
    placingNote = true;
    document.body.classList.add('lahti-placing');
    toast('Click anywhere to drop your note.');
  }
  document.addEventListener('click', function (e) {
    if (!placingNote) return;
    if (e.target.closest('#lahti-adminbar')) return;
    placingNote = false;
    document.body.classList.remove('lahti-placing');
    var note = { page: PAGE_ID, x: e.pageX, y: e.pageY, text: '' };
    sb.from('notes').insert(note).select().single().then(function (r) {
      if (r.data) renderNote(r.data);
    });
  }, true);

  function loadNotes() {
    sb.from('notes').select('*').eq('page', PAGE_ID).then(function (r) {
      (r.data || []).forEach(renderNote);
    });
  }
  function renderNote(note) {
    var el = document.createElement('div');
    el.className = 'lahti-sticky';
    el.style.left = note.x + 'px'; el.style.top = note.y + 'px';
    el.dataset.id = note.id;
    el.innerHTML = '<div class="sh"><span class="tag">Note</span><span class="x">✕</span></div><div class="sb" contenteditable="true"></div>';
    el.querySelector('.sb').textContent = note.text || '';
    document.body.appendChild(el);

    var saveTimer;
    el.querySelector('.sb').addEventListener('input', function () {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function () {
        sb.from('notes').update({ text: el.querySelector('.sb').textContent }).eq('id', note.id);
      }, 500);
    });
    el.querySelector('.x').addEventListener('click', function () {
      sb.from('notes').delete().eq('id', note.id).then(function () { el.remove(); });
    });
    var head = el.querySelector('.sh');
    head.addEventListener('mousedown', function (ev) {
      if (ev.target.classList.contains('x')) return;
      ev.preventDefault();
      var ox = ev.clientX - el.offsetLeft, oy = ev.clientY - el.offsetTop;
      function move(m) { el.style.left = (m.clientX - ox) + 'px'; el.style.top = (m.clientY - oy) + 'px'; }
      function up() {
        document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up);
        sb.from('notes').update({ x: parseInt(el.style.left), y: parseInt(el.style.top) }).eq('id', note.id);
      }
      document.addEventListener('mousemove', move); document.addEventListener('mouseup', up);
    });
  }

  // ---------- 5. PUBLISH ----------
  function publish() {
    var content = {};
    document.querySelectorAll('[data-edit]').forEach(function (el) {
      content[el.getAttribute('data-edit')] = el.innerHTML;
    });
    document.querySelectorAll('[data-img]').forEach(function (img) {
      content['img:' + img.getAttribute('data-img')] = img.src;
    });
    sb.from('page_content').upsert({ page: PAGE_ID, content: content, updated_at: new Date().toISOString() })
      .then(function (r) {
        if (r.error) { toast('Publish failed: ' + r.error.message); return; }
        toast('✅ <b>Published.</b> Your changes are now live for everyone.');
      });
  }

  // ---------- 6. LOGIN ----------
  function showLogin() {
    if (document.getElementById('lahti-login')) return;
    var ov = document.createElement('div');
    ov.id = 'lahti-login';
    ov.innerHTML =
      '<div class="box"><h3>Edit this site</h3><p>Sign in to make changes.</p>' +
      '<div class="err" id="ll-err"></div>' +
      '<input id="ll-email" type="email" placeholder="Email" autocomplete="username">' +
      '<input id="ll-pass" type="password" placeholder="Password" autocomplete="current-password">' +
      '<button id="ll-go">Sign in</button>' +
      '<button class="cancel" id="ll-cancel">Cancel</button></div>';
    document.body.appendChild(ov);
    document.getElementById('ll-cancel').addEventListener('click', function () { ov.remove(); location.hash = ''; });
    function go() {
      var email = document.getElementById('ll-email').value.trim();
      var pass = document.getElementById('ll-pass').value;
      sb.auth.signInWithPassword({ email: email, password: pass }).then(function (r) {
        if (r.error) { document.getElementById('ll-err').textContent = r.error.message; return; }
        ov.remove(); location.hash = ''; session = r.data.session; buildBar();
      });
    }
    document.getElementById('ll-go').addEventListener('click', go);
    document.getElementById('ll-pass').addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
  }

  // ---------- 7. BOOT ----------
  loadContent(); // every visitor gets the latest published content

  sb.auth.getSession().then(function (r) {
    session = r.data.session;
    if (session) { buildBar(); return; }            // already logged in -> show editor
    if (location.hash === '#admin') showLogin();    // explicit request to edit
  });

  // hidden shortcut: Ctrl/Cmd + Shift + E
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
      e.preventDefault();
      if (session) buildBar(); else showLogin();
    }
  });
})();
