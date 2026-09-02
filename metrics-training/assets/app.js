/* ============================================================
   PB Courses — Tutor Training engine
   Shared by every language build. All copy lives in
   assets/content-<lang>.js as window.CONTENT.
   ============================================================ */
(function () {
  'use strict';

  var C = window.CONTENT;
  var T = C.ui;
  var LANG = C.lang;
  var NS = 'kl-mx-' + LANG;
  var LEGACY_PROG_KEY = NS + '-progress';   // pre-2026-08 shared key, cleaned up on load
  var AUTH_KEY = 'kl-pb-user';
  var PASS_MARK = 70;

  /* ---------- server sync (progress backup, e-mail-based) ----------
     PROGRESS_API is the Apps Script Web App URL. Progress still lives
     primarily in localStorage (fast, offline-friendly) — this just
     backs it up so a tutor who changes browser/device or clears the
     cache doesn't lose anything. All calls are best-effort: if the
     network fails, the tutor keeps working from localStorage exactly
     as before. Nothing here is required for the app to function. */
  var PROGRESS_API = 'https://script.google.com/macros/s/AKfycbzlwm3U-oC1JVjYFF-EOHcz7csN__Cug_ClEiSH5XlT1o7yhaAldcMZRCU1p-V_VpVd/exec';

  /* Apps Script Web Apps run into a well-known browser limitation: a
     plain fetch() GET can be blocked by CORS even though the server
     side works fine (confirmed via curl). JSONP sidesteps this
     entirely by loading the response through a <script> tag instead
     of fetch() — script tags were never subject to CORS in the first
     place. Only used for reads; writes (POST) don't need this since
     the browser is allowed to *send* a simple POST even when it would
     be blocked from *reading* the response. */
  var jsonpCounter_ = 0;
  function fetchServerProgress_(email, cb) {
    if (!PROGRESS_API || PROGRESS_API.indexOf('PASTE_') === 0) { cb(null); return; }
    var cbName = 'klPbJsonp_' + (jsonpCounter_++) + '_' + Date.now();
    var script = document.createElement('script');
    var done = false;

    function cleanup() {
      delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[cbName] = function (data) {
      if (done) return;
      done = true;
      cleanup();
      cb(data && data.progress ? data.progress : null);
    };

    script.onerror = function () {
      if (done) return;
      done = true;
      cleanup();
      cb(null);
    };
    /* Safety net in case the callback never fires for any reason
       (e.g. the Apps Script response is malformed) — don't leave the
       tutor waiting forever. */
    setTimeout(function () {
      if (done) return;
      done = true;
      cleanup();
      cb(null);
    }, 8000);

    script.src = PROGRESS_API + '?email=' + encodeURIComponent(email) + '&callback=' + cbName;
    document.head.appendChild(script);
  }

  function pushServerProgress_(email, progress) {
    if (!PROGRESS_API || PROGRESS_API.indexOf('PASTE_') === 0) return;
    fetch(PROGRESS_API, {
      method: 'POST',
      body: JSON.stringify({ email: email, progress: progress })
    }).catch(function () { /* best-effort — local copy is safe regardless */ });
  }

  /* combine two progress objects, never letting a pass/score go backwards */
  function mergeProgressObjects_(a, b) {
    var out = {}, k;
    for (k in a) out[k] = a[k];
    for (k in b) {
      var pa = out[k] || {};
      var pb = b[k] || {};
      out[k] = {
        passed: pa.passed === true || pb.passed === true,
        score: Math.max(pa.score || 0, pb.score || 0) || null
      };
    }
    return out;
  }

  /* ---------- tiny helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function hash(s) {
    var x = 5381;
    for (var i = 0; i < s.length; i++) { x = ((x << 5) + x + s.charCodeAt(i)) | 0; }
    return (x >>> 0).toString(16);
  }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- theme ---------- */
  function setIcons(t) {
    var b = document.querySelectorAll('.tbtn');
    for (var i = 0; i < b.length; i++) b[i].textContent = t === 'dark' ? '☀️' : '🌙';
  }
  window.toggleTheme = function () {
    var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    var nxt = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nxt);
    try { localStorage.setItem('kl-theme', nxt); } catch (e) {}
    setIcons(nxt);
  };

  /* ---------- progress ----------
     Progress is stored per e-mail as well as per language. It used to live under
     one shared key per language, which meant signing in as a second tutor in the
     same browser showed the first tutor's progress — confusing when someone is
     testing with several accounts. */
  function progKey() {
    return NS + '-p-' + (session ? hash(session.email) : 'anon');
  }
  function getProgress() {
    try { return JSON.parse(localStorage.getItem(progKey())) || {}; } catch (e) { return {}; }
  }
  function saveProgress(p) {
    try { localStorage.setItem(progKey(), JSON.stringify(p)); } catch (e) {}
  }
  function clearProgress() {
    try { localStorage.removeItem(progKey()); } catch (e) {}
  }

  /* Anyone can wipe their own progress and start the training again. */
  window.resetProgress = function () {
    if (!confirm(T.resetConfirm)) return;
    clearProgress();
    goHome();
  };

  /* Force this browser to match the server exactly — no merge. Unlike
     the passive login sync (which only ever adds, never removes, to
     protect real progress from network hiccups), this is an explicit,
     tutor-initiated action for one specific situation: their browser
     is showing something wrong (e.g. a course marked "Reviewed" that
     shouldn't be) because of stale/incorrect data cached from before
     a fix was made server-side. Replacing local with server here is
     safe precisely because the tutor asked for it and confirmed it. */
  window.syncFromServer = function () {
    if (!session) return;
    if (!confirm(T.syncConfirm)) return;
    fetchServerProgress_(session.email, function (serverProgress) {
      if (!serverProgress) {
        alert(T.syncEmpty);
        return;
      }
      saveProgress(serverProgress);
      goHome();
    });
  };
  function isPassed(id) { var p = getProgress(); return !!(p[id] && p[id].passed); }
  function getScore(id) { var p = getProgress(); return (p[id] && p[id].score) || 0; }
  function setResult(id, pct, passed) {
    var p = getProgress();
    var prev = p[id] || {};
    p[id] = { passed: prev.passed === true || passed, score: Math.max(pct, prev.score || 0) };
    saveProgress(p);
    if (session) pushServerProgress_(session.email, p);
  }

  /* ---------- session ---------- */
  var session = null; // {email, mask}

  function loadSession() {
    try {
      var raw = localStorage.getItem(AUTH_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (s && s.email && typeof s.mask === 'number') return s;
    } catch (e) {}
    return null;
  }
  function saveSession(s) {
    try { localStorage.setItem(AUTH_KEY, JSON.stringify(s)); } catch (e) {}
  }
  window.logout = function () {
    if (!confirm(T.logoutConfirm)) return;
    try { localStorage.removeItem(AUTH_KEY); } catch (e) {}
    session = null;
    showScreen('screen-login');
  };

  /* ---------- module sets ---------- */
  var GENERAL = C.general;              // always visible, sequential
  var COURSES = C.courses;              // gated by e-mail

  function myCourses() {
    if (!session) return [];
    var out = [];
    for (var i = 0; i < COURSES.length; i++) {
      if (session.mask & COURSES[i].bit) out.push(COURSES[i]);
    }
    return out;
  }
  function generalDone() {
    for (var i = 0; i < GENERAL.length; i++) if (!isPassed(GENERAL[i].id)) return false;
    return true;
  }
  function moduleById(id) {
    var all = GENERAL.concat(COURSES);
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }
  function isUnlocked(m) {
    if (m.kind === 'general') {
      var idx = GENERAL.indexOf(m);
      return idx === 0 ? true : isPassed(GENERAL[idx - 1].id);
    }
    return generalDone();
  }

  /* ============================================================
     LOGIN
     ============================================================ */
  window.tryLogin = function () {
    var inp = $('email-input');
    var err = $('login-err');
    var email = (inp.value || '').trim().toLowerCase();
    err.style.display = 'none';

    if (!email) { err.textContent = T.errEmpty; err.style.display = 'block'; return; }
    if (email.indexOf('@') < 1) { err.textContent = T.errFormat; err.style.display = 'block'; return; }

    var mask = window.TUTORS[hash(email)];
    if (!mask) {
      err.innerHTML = T.errNotFound;
      err.style.display = 'block';
      return;
    }
    session = { email: email, mask: mask };
    saveSession(session);
    inp.value = '';

    /* Pull any server-side progress (from another browser, a previous
       device, or the DST backfill) and merge it into what's stored
       locally before painting the dashboard. Local progress is never
       lost — this can only add to it. */
    fetchServerProgress_(email, function (serverProgress) {
      if (serverProgress) {
        var merged = mergeProgressObjects_(getProgress(), serverProgress);
        saveProgress(merged);
        /* Read-only sync: we do NOT push this merge back to the server.
           Pushing here would let a browser with stale/incorrect local
           progress (e.g. from before a server-side correction) silently
           re-contaminate the server the moment its tutor logs back in.
           The server is only ever updated by setResult(), i.e. a real
           quiz pass or course review happening right now. */
      }
      goHome();
    });
  };

  /* ============================================================
     DASHBOARD
     ============================================================ */
  function initials(email) {
    var n = email.split('@')[0].replace(/[._-]+/g, ' ').trim().split(/\s+/);
    return ((n[0] || '?')[0] + (n[1] ? n[1][0] : '')).toUpperCase();
  }

  function renderUserChips() {
    if (!session) return;
    var els = document.querySelectorAll('.nav-user');
    for (var i = 0; i < els.length; i++) {
      els[i].innerHTML = '<div class="avatar">' + esc(initials(session.email)) + '</div><span>' + esc(session.email) + '</span>';
    }
  }

  function moduleCard(m, locked, lockNote) {
    var done = isPassed(m.id);
    var badge = done
      ? '<span class="badge bd">' + T.badgeDone + '</span>'
      : (locked ? '<span class="badge bl">' + T.badgeLocked + '</span>'
                : '<span class="badge bs">' + T.badgeStart + '</span>');
    var sc = getScore(m.id);
    var tag;
    if (done && sc) {
      tag = '<span class="stag">' + T.score + ' <b>' + sc + '%</b></span>';
    } else if (done) {
      /* course modules carry no score — they are read and confirmed, not graded */
      tag = '<span class="stag"><b>' + T.reviewed + '</b></span>';
    } else {
      tag = '<span class="stag">' + esc(m.meta || '') + '</span>';
    }

    var chips = '';
    if (m.chips && m.chips.length) {
      chips = '<div class="mc-meta">';
      for (var i = 0; i < m.chips.length; i++) chips += '<span class="chip">' + m.chips[i] + '</span>';
      chips += '</div>';
    }
    var note = locked && lockNote ? '<div class="mc-lock-note">🔒 ' + lockNote + '</div>' : '';

    return '<div class="mc' + (locked ? ' locked' : '') + (done ? ' done' : '') + '"' +
      (locked ? '' : ' onclick="openModule(\'' + m.id + '\')"') + '>' +
      '<div class="mc-stripe" style="background:' + m.color + '"></div>' +
      '<div class="mc-body">' +
        '<div class="mc-top"><span class="mc-num">' + esc(m.num) + '</span><span class="mc-em">' + m.emoji + '</span></div>' +
        '<div class="mc-title">' + esc(m.title) + '</div>' +
        '<div class="mc-desc">' + esc(m.desc) + '</div>' +
        chips + note +
        '<div class="mc-foot">' + badge + tag + '</div>' +
      '</div></div>';
  }

  function renderHome() {
    renderUserChips();

    var mine = myCourses();
    var doneG = 0, i;
    for (i = 0; i < GENERAL.length; i++) if (isPassed(GENERAL[i].id)) doneG++;
    var doneC = 0;
    for (i = 0; i < mine.length; i++) if (isPassed(mine[i].id)) doneC++;
    var total = GENERAL.length + mine.length;
    var done = doneG + doneC;

    $('pnum').textContent = done + '/' + total;
    $('pfill').style.width = total ? (done / total * 100) + '%' : '0%';
    $('plbl').textContent = done === total ? T.allDone : T.modulesLabel;
    var ntag = $('ntag');
    if (ntag) ntag.textContent = done === total ? T.allDoneShort : (done + '/' + total + ' ' + T.completeWord);

    /* general — solo si este entrenamiento define modulos core */
    var h = '';
    if (GENERAL.length) {
      h += '<div class="sec-head"><div class="sec-ic">🧭</div><div class="sec-txt">' +
        '<h2>' + T.generalTitle + '</h2><p>' + T.generalSub + '</p></div>' +
        '<div class="sec-count">' + doneG + '/' + GENERAL.length + '</div></div>';
      h += '<div class="grid">';
      for (i = 0; i < GENERAL.length; i++) {
        var locked = !isUnlocked(GENERAL[i]);
        h += moduleCard(GENERAL[i], locked, locked ? T.lockPrev : '');
      }
      h += '</div>';
    }

    /* metricas asignadas a este correo */
    h += '<div class="sec-head"><div class="sec-ic">🎯</div><div class="sec-txt">' +
      '<h2>' + T.courseTitle + '</h2><p>' + T.courseSub + '</p></div>' +
      '<div class="sec-count">' + doneC + '/' + mine.length + '</div></div>';

    if (!mine.length) {
      h += '<div class="empty-note">' + T.noCourses + '</div>';
    } else {
      h += '<div class="grid">';
      for (i = 0; i < mine.length; i++) {
        var lk = !isUnlocked(mine[i]);
        h += moduleCard(mine[i], lk, lk ? T.lockGeneral : '');
      }
      h += '</div>';
    }
    if (done) {
      h += '<div class="reset-row">' +
        '<button class="reset-btn" onclick="syncFromServer()">' + T.syncButton + '</button>' +
        ' · ' +
        '<button class="reset-btn" onclick="resetProgress()">' + T.resetProgress + '</button>' +
        '</div>';
    }
    $('mgrid').innerHTML = h;
    markOrphans();
  }

  /* Measure each grid's real column count and flag the ones whose last row
     holds a single card, so CSS can widen it. Re-runs on resize. */
  function markOrphans() {
    var grids = document.querySelectorAll('#mgrid .grid');
    for (var i = 0; i < grids.length; i++) {
      var g = grids[i];
      var tpl = getComputedStyle(g).gridTemplateColumns;
      /* While the screen is still display:none the browser hands back the
         specified value ("repeat(auto-fill, minmax(...))") instead of the
         resolved track list. Measuring then would be meaningless. */
      if (tpl.indexOf('repeat') > -1 || tpl.indexOf('minmax') > -1) continue;
      var cols = tpl.split(' ').filter(Boolean).length;
      var n = g.children.length;
      g.classList.toggle('orphan', cols > 1 && n > 1 && n % cols === 1);
    }
  }
  var orphanTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(orphanTimer);
    orphanTimer = setTimeout(markOrphans, 120);
  });

  /* ============================================================
     CARD RENDERER
     ============================================================ */
  function li(items, ordered) {
    var tag = ordered ? 'ol' : 'ul';
    var h = '<' + tag + '>';
    for (var i = 0; i < items.length; i++) h += '<li>' + items[i] + '</li>';
    return h + '</' + tag + '>';
  }

  function rc(c) {
    switch (c.type) {
      case 'h':
        return '<div class="sch">' + (c.ic ? c.ic + ' ' : '') + c.t + '</div>';

      case 'text':
        return '<div class="card">' + (c.h ? '<h4>' + (c.ic ? '<span class="h4-ic">' + c.ic + '</span>' : '') + c.h + '</h4>' : '') +
          '<p>' + c.p + '</p></div>';

      case 'list':
        return '<div class="card">' + (c.h ? '<h4>' + (c.ic ? '<span class="h4-ic">' + c.ic + '</span>' : '') + c.h + '</h4>' : '') +
          (c.p ? '<p style="margin-bottom:8px">' + c.p + '</p>' : '') +
          li(c.items, c.ordered) +
          (c.after ? '<p style="margin-top:8px">' + c.after + '</p>' : '') + '</div>';

      case 'iclist':
        var s = '<div class="card">' + (c.h ? '<h4>' + (c.ic ? '<span class="h4-ic">' + c.ic + '</span>' : '') + c.h + '</h4>' : '') +
          (c.p ? '<p style="margin-bottom:11px">' + c.p + '</p>' : '') + '<ul class="ic-list">';
        for (var i = 0; i < c.items.length; i++) {
          s += '<li><span class="li-ic">' + c.items[i].ic + '</span><span>' + c.items[i].t + '</span></li>';
        }
        return s + '</ul></div>';

      case 'tip':  return '<div class="callout ct"><span class="ci">💡</span><div>' + c.t + '</div></div>';
      case 'warn': return '<div class="callout cw"><span class="ci">⚠️</span><div>' + c.t + '</div></div>';
      case 'good': return '<div class="callout cg"><span class="ci">✅</span><div>' + c.t + '</div></div>';
      case 'hi':
        return '<div class="card hi">' + (c.h ? '<h4>' + (c.ic ? '<span class="h4-ic">' + c.ic + '</span>' : '') + c.h + '</h4>' : '') +
          '<p>' + c.p + '</p></div>';

      case 'quote':
        return '<div class="quote">' + c.t + (c.src ? '<span class="q-src">' + c.src + '</span>' : '') + '</div>';

      case 'twocol':
        return '<div class="two-col">' +
          '<div class="card"><h4>' + (c.left.ic || '✅') + ' ' + c.left.h + '</h4>' + li(c.left.items) + '</div>' +
          '<div class="card hi"><h4>' + (c.right.ic || '🚫') + ' ' + c.right.h + '</h4>' + li(c.right.items) + '</div>' +
          '</div>';

      case 'ba':
        return '<div class="ba">' +
          '<div class="ba-col before"><div class="ba-lbl">⏪ ' + c.beforeLbl + '</div><p>' + c.before + '</p></div>' +
          '<div class="ba-col after"><div class="ba-lbl">✨ ' + c.afterLbl + '</div><p>' + c.after + '</p></div>' +
          '</div>';

      case 'flow':
        var f = '<div class="flow">';
        for (var j = 0; j < c.steps.length; j++) {
          if (j) f += '<span class="flow-sep">→</span>';
          f += '<span class="flow-step"><span class="fs-ic">' + c.steps[j].ic + '</span>' + c.steps[j].t + '</span>';
        }
        return f + '</div>';

      case 'steps':
        var st = '<div class="steps">';
        for (var k = 0; k < c.items.length; k++) {
          st += '<div class="step"><div class="step-n">' + (k + 1) + '</div><div class="step-b">' +
            '<h4>' + c.items[k].h + '</h4><p>' + c.items[k].p + '</p></div></div>';
        }
        return st + '</div>';

      case 'facts':
        var fa = '<div class="facts">';
        for (var n = 0; n < c.items.length; n++) {
          fa += '<div class="fact"><div class="fact-ic">' + c.items[n].ic + '</div><div class="fact-t">' + c.items[n].t + '</div></div>';
        }
        return fa + '</div>';

      case 'metabar':
        var mb = '<div class="metabar">';
        for (var q = 0; q < c.items.length; q++) {
          mb += '<div class="meta-it"><span class="meta-ic">' + c.items[q].ic + '</span>' +
            '<span class="meta-tx"><b>' + c.items[q].v + '</b>' + c.items[q].k + '</span></div>';
        }
        return mb + '</div>';

      case 'table':
        var t = '<div class="card">' + (c.h ? '<h4>' + (c.ic ? '<span class="h4-ic">' + c.ic + '</span>' : '') + c.h + '</h4>' : '') +
          '<div class="tbl-wrap"><table><thead><tr>';
        for (var a = 0; a < c.head.length; a++) t += '<th>' + c.head[a] + '</th>';
        t += '</tr></thead><tbody>';
        for (var b = 0; b < c.rows.length; b++) {
          t += '<tr>';
          for (var d = 0; d < c.rows[b].length; d++) t += '<td>' + c.rows[b][d] + '</td>';
          t += '</tr>';
        }
        return t + '</tbody></table></div></div>';

      case 'img':
        return '<div class="figure"><img class="mod-img" src="' + c.src + '" alt="' + esc(c.alt || '') + '" loading="lazy">' +
          (c.cap ? '<div class="cap">' + c.cap + '</div>' : '') + '</div>';

      case 'video':
        /* If `yt` (a YouTube video id) is set, use a lightweight thumbnail that
           opens YouTube — same pattern as the Graphic Design training.
           Otherwise play a local MP4 from `src`. */
        if (c.yt) {
          return '<div class="card video-card"><h4><span class="h4-ic">🎬</span>' + c.h + '</h4>' +
            (c.p ? '<p>' + c.p + '</p>' : '') +
            '<a class="yt-lite" href="https://www.youtube.com/watch?v=' + c.yt + '" target="_blank" rel="noopener"' +
            ' style="background-image:url(https://i.ytimg.com/vi/' + c.yt + '/hqdefault.jpg)">' +
            '<span class="yt-play"></span></a>' +
            '<a class="video-link" href="https://www.youtube.com/watch?v=' + c.yt + '" target="_blank" rel="noopener">' +
            T.watchOnYouTube + '</a></div>';
        }
        return '<div class="card"><h4><span class="h4-ic">🎬</span>' + c.h + '</h4>' +
          (c.p ? '<p>' + c.p + '</p>' : '') +
          '<video class="vid" controls preload="metadata"' + (c.poster ? ' poster="' + c.poster + '"' : '') + '>' +
          '<source src="' + c.src + '" type="video/mp4" onerror="videoMissing(this)">' +
          T.videoFallback + '</video></div>';

      case 'link':
        return '<a class="linkcard" href="' + c.href + '" target="_blank" rel="noopener">' +
          '<div class="lc-ic">' + (c.ic || '🔗') + '</div>' +
          '<div class="lc-b"><div class="lc-t">' + c.t + '</div><div class="lc-d">' + c.d + '</div></div>' +
          '<div class="lc-go">→</div></a>';

      case 'check':
        var ch = '<div class="check"><h4>' + (c.ic || '☑️') + ' ' + c.h + '</h4>';
        for (var e = 0; e < c.items.length; e++) {
          ch += '<div class="check-it" onclick="this.classList.toggle(\'on\')">' +
            '<div class="check-box">✓</div><span>' + c.items[e] + '</span></div>';
        }
        return ch + '</div>';

      case 'acc':
        var ac = '';
        for (var g = 0; g < c.items.length; g++) {
          ac += '<div class="acc' + (c.items[g].open ? ' open' : '') + '">' +
            '<button class="acc-h" onclick="this.parentNode.classList.toggle(\'open\')">' +
            '<span class="acc-ic">' + c.items[g].ic + '</span>' + c.items[g].h +
            '<span class="acc-arrow">▶</span></button>' +
            '<div class="acc-c">' + c.items[g].body + '</div></div>';
        }
        return ac;

      case 'tabs':
        var uid = 'tb' + Math.random().toString(36).slice(2, 8);
        var head = '<div class="tabs">', panes = '';
        for (var p = 0; p < c.tabs.length; p++) {
          head += '<button class="tab' + (p === 0 ? ' on' : '') + '" data-g="' + uid + '" data-i="' + p +
            '" onclick="switchTab(this)">' + c.tabs[p].label + '</button>';
          panes += '<div class="tabpane' + (p === 0 ? ' on' : '') + '" data-g="' + uid + '" data-i="' + p + '">' +
            renderCards(c.tabs[p].cards) + '</div>';
        }
        return head + '</div>' + panes;

      case 'divider':
        return '<hr class="divider">';

      default:
        return '';
    }
  }

  window.videoMissing = function (src) {
    var v = src.parentNode;
    if (!v || !v.parentNode) return;
    var d = document.createElement('div');
    d.className = 'vid-missing';
    d.innerHTML = '<span class="vm-ic">🎬</span>' + T.videoMissing;
    v.parentNode.replaceChild(d, v);
  };

  window.switchTab = function (btn) {
    var g = btn.getAttribute('data-g'), i = btn.getAttribute('data-i');
    var els = document.querySelectorAll('[data-g="' + g + '"]');
    for (var n = 0; n < els.length; n++) {
      var on = els[n].getAttribute('data-i') === i;
      els[n].classList.toggle('on', on);
    }
    var pane = document.querySelector('.tabpane[data-g="' + g + '"].on');
    if (pane) pane.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  function renderCards(cards) {
    var h = '';
    for (var i = 0; i < cards.length; i++) h += rc(cards[i]);
    return h;
  }

  /* ============================================================
     MODULE VIEW
     ============================================================ */
  var currentModule = null;

  window.openModule = function (id) {
    var m = moduleById(id);
    if (!m) return;
    currentModule = id;

    var h = '<div class="meyebrow">' + esc(m.num) + '</div>' +
      '<h1 class="mh1">' + m.emoji + ' ' + esc(m.title) + '</h1>' +
      '<div class="mobj" style="--acc:' + m.color + '"><strong>' + T.goal + ':</strong> ' + m.objective + '</div>';

    h += renderCards(m.cards);

    /* final DST card — the single assessment for a course module */
    if (m.finalDst) {
      var reviewed = isPassed(m.id);
      h += '<hr class="divider">';
      h += '<div class="finaldst"><div class="fd-ic">🏁</div>' +
        '<h3>' + T.finalDstTitle + '</h3>' +
        '<p>' + m.finalDst.desc + '</p>';
      if (m.finalDst.url) {
        h += '<a class="fd-btn" href="' + m.finalDst.url + '" target="_blank" rel="noopener"' +
          ' onclick="markReviewedSilently(\'' + m.id + '\')">' + T.finalDstGo + ' →</a>';
      } else {
        h += '<button class="fd-btn soon" disabled>⏳ ' + T.finalDstSoon + '</button>' +
          '<div class="fd-note">' + T.finalDstSoonNote + '</div>';
      }
      if (reviewed) {
        h += '<div class="fd-done">✓ ' + T.moduleReviewed + '</div>';
      } else {
        h += '<button class="fd-mark" onclick="markReviewed(\'' + m.id + '\')">' + T.markReviewed + '</button>';
      }
      h += '</div>';
    }

    if (m.quiz && m.quiz.length) {
      h += '<button class="ctabtn" onclick="startQuiz(\'' + m.id + '\')">' +
        (isPassed(m.id) ? T.retakeQuiz : T.takeQuiz) + '</button>';
    }

    $('cbody').innerHTML = h;
    showScreen('screen-content');
  };

  /* mark a course module (no in-app quiz) as reviewed */
  window.markReviewed = function (id) {
    var p = getProgress();
    p[id] = { passed: true, score: null };
    saveProgress(p);
    openModule(id);
  };
  window.openDst = function (id, url) {
    window.markReviewedSilently(id);
    window.open(url, '_blank', 'noopener');
    openModule(id);
  };
  window.markReviewedSilently = function (id) {
    var p = getProgress();
    if (!p[id] || !p[id].passed) { p[id] = { passed: true, score: null }; saveProgress(p); }
  };

  /* ============================================================
     QUIZ ENGINE — supports 4 question types:
       mcq   single correct option
       multi several correct options (select all that apply)
       match pair each item on the left with the right answer
       open  written answer, compared against a model answer
     ============================================================ */
  var qList = [], qIdx = 0, qScore = 0, qState = null;

  function prepQ(q) {
    var t = q.type || 'mcq';
    if (t === 'mcq') {
      var o = shuffle(q.opts.map(function (_, i) { return i; }));
      return { type: t, q: q.q, ctx: q.ctx, opts: o.map(function (i) { return q.opts[i]; }),
               c: o.indexOf(q.c), fb: q.fb };
    }
    if (t === 'multi') {
      var o2 = shuffle(q.opts.map(function (_, i) { return i; }));
      return { type: t, q: q.q, ctx: q.ctx, opts: o2.map(function (i) { return q.opts[i]; }),
               c: q.c.map(function (i) { return o2.indexOf(i); }).sort(function (a, b) { return a - b; }),
               fb: q.fb };
    }
    if (t === 'match') {
      var rows = shuffle(q.pairs.slice());
      var choices = shuffle(q.pairs.map(function (p) { return p.r; }));
      return { type: t, q: q.q, ctx: q.ctx, rows: rows, choices: choices, fb: q.fb };
    }
    return { type: 'open', q: q.q, ctx: q.ctx, min: q.min || 100, model: q.model, fb: q.fb };
  }

  window.startQuiz = function (id) {
    var m = moduleById(id);
    if (!m || !m.quiz || !m.quiz.length) return;
    currentModule = id;
    qList = shuffle(m.quiz.slice()).map(prepQ);
    qIdx = 0; qScore = 0;
    renderQ();
    showScreen('screen-quiz');
  };

  function renderQ() {
    var q = qList[qIdx];
    qState = { answered: false, sel: [], pick: [] };
    $('qpf').style.width = (qIdx / qList.length * 100) + '%';
    $('qctr').innerHTML = T.question + ' ' + (qIdx + 1) + ' / ' + qList.length +
      ' <span class="qtype">' + T.qType[q.type] + '</span>';
    $('qtxt').innerHTML = (q.ctx ? '<div class="qctx">' + q.ctx + '</div>' : '') + q.q;

    var h = '', i;
    if (q.type === 'mcq') {
      for (i = 0; i < q.opts.length; i++) h += '<button class="qopt" onclick="answerQ(' + i + ')">' + q.opts[i] + '</button>';
    } else if (q.type === 'multi') {
      h += '<div class="qhint">' + T.multiHint + '</div>';
      for (i = 0; i < q.opts.length; i++) {
        h += '<button class="qopt qcheck" data-i="' + i + '" onclick="toggleMulti(this)">' +
          '<span class="qbox">✓</span><span>' + q.opts[i] + '</span></button>';
      }
      h += '<button class="qcheckbtn" id="qcheckbtn" onclick="submitMulti()">' + T.checkAnswer + '</button>';
    } else if (q.type === 'match') {
      h += '<div class="qhint">' + T.matchHint + '</div><div class="qmatch">';
      for (i = 0; i < q.rows.length; i++) {
        h += '<div class="qm-row"><div class="qm-l">' + q.rows[i].l + '</div><select class="qm-s" data-i="' + i + '">' +
          '<option value="-1">' + T.choose + '…</option>';
        for (var j = 0; j < q.choices.length; j++) h += '<option value="' + j + '">' + esc(q.choices[j]) + '</option>';
        h += '</select></div>';
      }
      h += '</div><button class="qcheckbtn" id="qcheckbtn" onclick="submitMatch()">' + T.checkAnswer + '</button>';
    } else {
      h += '<div class="qhint">' + T.openHint.replace('{n}', q.min) + '</div>' +
        '<textarea class="qta" id="qta" rows="6" placeholder="' + esc(T.openPlaceholder) + '" oninput="openCount()"></textarea>' +
        '<div class="qcount" id="qcount">0 / ' + q.min + '</div>' +
        '<button class="qcheckbtn" id="qcheckbtn" onclick="submitOpen()">' + T.submitAnswer + '</button>';
    }
    $('qopts').innerHTML = h;
    $('qfb').className = 'qfb';
    $('qnxt').className = 'qnxt';
    window.scrollTo(0, 0);
  }

  function finishQ(ok, extra) {
    qState.answered = true;
    if (ok) qScore++;
    var lead = q_isOpen() ? '📝 ' + T.recorded + ' ' : (ok ? '✓ ' + T.correct + ' ' : '✗ ' + T.incorrect + ' ');
    $('qfb').innerHTML = lead + qList[qIdx].fb + (extra || '');
    $('qfb').className = 'qfb show ' + (q_isOpen() ? 'ok' : (ok ? 'ok' : 'bad'));
    var cb = $('qcheckbtn'); if (cb) cb.style.display = 'none';
    $('qnxt').textContent = qIdx < qList.length - 1 ? T.nextQ : T.seeResults;
    $('qnxt').className = 'qnxt show';
  }
  function q_isOpen() { return qList[qIdx].type === 'open'; }

  window.answerQ = function (idx) {
    if (qState.answered) return;
    var q = qList[qIdx];
    var btns = $('qopts').children;
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.add('answered');
      btns[i].onclick = null;
      if (i === q.c) btns[i].classList.add('correct');
      else if (i === idx) btns[i].classList.add('wrong');
    }
    finishQ(idx === q.c);
  };

  window.toggleMulti = function (btn) {
    if (qState.answered) return;
    btn.classList.toggle('sel');
  };

  window.submitMulti = function () {
    if (qState.answered) return;
    var q = qList[qIdx];
    var btns = $('qopts').querySelectorAll('.qcheck');
    var picked = [];
    for (var i = 0; i < btns.length; i++) if (btns[i].classList.contains('sel')) picked.push(i);
    if (!picked.length) { flash($('qcheckbtn')); return; }
    var ok = picked.length === q.c.length && picked.every(function (v, n) { return v === q.c[n]; });
    for (i = 0; i < btns.length; i++) {
      btns[i].classList.add('answered');
      var isC = q.c.indexOf(i) > -1, isP = picked.indexOf(i) > -1;
      if (isC) btns[i].classList.add('correct');
      else if (isP) btns[i].classList.add('wrong');
    }
    finishQ(ok);
  };

  window.submitMatch = function () {
    if (qState.answered) return;
    var q = qList[qIdx];
    var sels = $('qopts').querySelectorAll('.qm-s');
    var allSet = true, right = 0;
    for (var i = 0; i < sels.length; i++) if (sels[i].value === '-1') allSet = false;
    if (!allSet) { flash($('qcheckbtn')); return; }
    for (i = 0; i < sels.length; i++) {
      var chosen = q.choices[parseInt(sels[i].value, 10)];
      var correct = q.rows[i].r;
      var row = sels[i].parentNode;
      sels[i].disabled = true;
      if (chosen === correct) { row.classList.add('ok'); right++; }
      else {
        row.classList.add('bad');
        row.insertAdjacentHTML('beforeend', '<div class="qm-fix">→ ' + esc(correct) + '</div>');
      }
    }
    finishQ(right === sels.length, '<div class="qm-score">' + right + ' / ' + sels.length + '</div>');
  };

  window.openCount = function () {
    var q = qList[qIdx];
    var n = $('qta').value.trim().length;
    var el = $('qcount');
    el.textContent = n + ' / ' + q.min;
    el.classList.toggle('ok', n >= q.min);
  };

  window.submitOpen = function () {
    if (qState.answered) return;
    var q = qList[qIdx];
    var ta = $('qta');
    if (ta.value.trim().length < q.min) { flash($('qcheckbtn')); ta.focus(); return; }
    ta.disabled = true;
    finishQ(true, '<div class="qmodel"><div class="qmodel-t">' + T.modelAnswer + '</div>' + q.model + '</div>');
  };

  function flash(el) {
    if (!el) return;
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
  }

  window.nextQ = function () {
    qIdx++;
    if (qIdx < qList.length) { renderQ(); return; }
    var pct = Math.round(qScore / qList.length * 100);
    var passed = pct >= PASS_MARK;
    setResult(currentModule, pct, passed);
    showResults(pct, passed);
  };

  function showResults(pct, passed) {
    var m = moduleById(currentModule);
    var mine = myCourses();
    var all = GENERAL.concat(mine);
    var idx = all.indexOf(m);
    /* The next module is simply the one after this in the list, whether or not
       it has already been passed. Skipping over passed modules used to leave
       `next` null on a retake, which dumped the tutor onto the certificate
       instead of moving them along. */
    var next = (idx > -1 && idx + 1 < all.length) ? all[idx + 1] : null;

    var h = '<div class="remi">' + (passed ? '🎉' : '💪') + '</div>' +
      '<div class="rtitle">' + (passed ? T.passTitle : T.failTitle) + '</div>' +
      '<div class="rpct ' + (passed ? 'pass' : 'fail') + '">' + pct + '%</div>' +
      '<div class="rsub">' + (passed
        ? T.passSub.replace('{n}', qScore).replace('{t}', qList.length)
        : T.failSub.replace('{n}', qScore).replace('{t}', qList.length).replace('{p}', PASS_MARK)) + '</div>';

    if (passed) {
      var allDone = true;
      for (var j = 0; j < all.length; j++) if (!isPassed(all[j].id)) allDone = false;
      /* Moving on comes first; the certificate is only ever an extra button,
         never a replacement for the next module. */
      if (next) {
        h += '<button class="bdark" onclick="openModule(\'' + next.id + '\')">' + T.nextModule + ': ' + esc(next.title) + ' →</button>';
      }
      if (allDone) {
        h += '<button class="' + (next ? 'bline' : 'bdark') + '" onclick="showComplete()">🏆 ' + T.seeCert + '</button>';
      }
      h += '<button class="bline" onclick="goHome()">' + T.backModules + '</button>';
    } else {
      h += '<button class="bdark" onclick="startQuiz(\'' + m.id + '\')">🔁 ' + T.tryAgain + '</button>' +
        '<button class="bline" onclick="openModule(\'' + m.id + '\')">' + T.reviewModule + '</button>' +
        '<button class="bline" onclick="goHome()">' + T.backModules + '</button>';
    }
    $('rbody').innerHTML = h;
    showScreen('screen-results');
  }

  window.showComplete = function () {
    var all = GENERAL.concat(myCourses());
    var sum = 0, n = 0;
    for (var i = 0; i < all.length; i++) {
      var sc = getScore(all[i].id);
      if (sc) { sum += sc; n++; }
    }
    var avg = n ? Math.round(sum / n) : 100;
    var chips = '';
    for (var j = 0; j < all.length; j++) {
      chips += '<div class="cmod" style="background:' + all[j].color + '20" title="' + esc(all[j].title) + '">' + all[j].emoji + '</div>';
    }
    $('compbody').innerHTML =
      '<div class="remi">🏆</div>' +
      '<div class="cert"><div class="clbl2">' + T.certLabel + '</div>' +
      '<h2>' + T.certTitle + '</h2>' +
      '<p>' + T.certSub.replace('{n}', all.length).replace('{avg}', avg) + '</p>' +
      '<p style="margin-top:10px;font-weight:700;color:var(--text)">' + esc(session ? session.email : '') + '</p>' +
      '<div class="cmods">' + chips + '</div></div>' +
      '<div class="rsub">' + T.certNote + '</div>' +
      '<button class="bline" onclick="goHome()">' + T.backModules + '</button>';
    showScreen('screen-complete');
  };

  window.exitQuiz = function () {
    if (currentModule) openModule(currentModule); else goHome();
  };
  window.goHome = function () {
    renderHome();
    showScreen('screen-home');
    markOrphans();          // now that the grid actually has a layout box
    window.scrollTo(0, 0);
  };
  function showScreen(id) {
    var s = document.querySelectorAll('.screen');
    for (var i = 0; i < s.length; i++) s[i].classList.remove('active');
    $(id).classList.add('active');
    window.scrollTo(0, 0);
  }
  window.showScreen = showScreen;


  /* ============================================================
     DEV MODE — press Shift+D three times within 1.2 s.
     Signs you in with all four courses and marks every module
     passed, so you can inspect any screen without doing the
     checks. Press it three times again to switch it off, which
     also clears the progress it created.
     ============================================================ */
  var DEV_KEY = NS + '-devmode';

  function devBadge(on) {
    var el = $('dev-badge');
    if (on && !el) {
      el = document.createElement('div');
      el.id = 'dev-badge';
      el.innerHTML = '🛠 ' + T.devOn;
      el.title = T.devHint;
      document.body.appendChild(el);
    } else if (!on && el) {
      el.parentNode.removeChild(el);
    }
  }

  function devApply() {
    session = { email: T.devEmail, mask: 15 };
    saveSession(session);
    var p = {};
    GENERAL.forEach(function (m) { p[m.id] = { passed: true, score: 100 }; });
    COURSES.forEach(function (m) { p[m.id] = { passed: true, score: null }; });
    saveProgress(p);
  }

  function toggleDevMode() {
    var on = localStorage.getItem(DEV_KEY) === '1';
    if (on) {
      clearProgress();
      try { localStorage.removeItem(DEV_KEY); localStorage.removeItem(AUTH_KEY); } catch (e) {}
      session = null;
      devBadge(false);
      showScreen('screen-login');
    } else {
      try { localStorage.setItem(DEV_KEY, '1'); } catch (e) {}
      devApply();
      devBadge(true);
      goHome();
    }
  }

  (function () {
    var hits = [], LIMIT = 1200;
    document.addEventListener('keydown', function (e) {
      if (!e.shiftKey) return;
      if ((e.key || '').toLowerCase() !== 'd') return;
      var t = e.timeStamp || 0;
      hits.push(t);
      hits = hits.filter(function (x) { return t - x < LIMIT; });
      if (hits.length >= 3) { hits = []; toggleDevMode(); }
    });
  })();

  /* ============================================================
     BOOT
     ============================================================ */
  function paintStatic() {
    var map = {
      'lg-title': T.loginTitle, 'lg-sub': T.loginSub, 'lg-btn': T.loginBtn, 'lg-hint': T.loginHint,
      'h-eyebrow': T.heroEyebrow, 'h-title': T.heroTitle, 'h-sub': T.heroSub, 'h-note': T.homeNote,
      'nb-logout': '⎋ ' + T.logout, 'nb-back': '← ' + T.modules, 'nb-back2': '← ' + T.modules,
      'nb-back3': '← ' + T.modules, 'nb-exit': '← ' + T.exitQuiz,
      'ft': T.footer, 'ft2': T.footer
    };
    for (var k in map) { var el = $(k); if (el) el.innerHTML = map[k]; }
    var inp = $('email-input');
    if (inp) inp.placeholder = T.emailPlaceholder;
  }

  document.addEventListener('DOMContentLoaded', function () {
    setIcons(document.documentElement.getAttribute('data-theme'));
    paintStatic();

    var inp = $('email-input');
    if (inp) {
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') window.tryLogin(); });
    }

    /* one-time cleanup of the old shared progress key */
    try { localStorage.removeItem(LEGACY_PROG_KEY); } catch (e) {}

    var dev = false;
    try { dev = localStorage.getItem(DEV_KEY) === '1'; } catch (e) {}
    if (dev) devBadge(true);

    session = loadSession();
    if (session) {
      goHome(); // paint immediately from local data, don't make the tutor wait
      fetchServerProgress_(session.email, function (serverProgress) {
        if (serverProgress) {
          var merged = mergeProgressObjects_(getProgress(), serverProgress);
          saveProgress(merged);
          /* Read-only sync — see the comment in tryLogin(). We never
             write this merged result back to the server on a passive
             page load/login; only a real quiz pass or course review
             (setResult) is allowed to update the server. */
          renderHome(); // re-paint in case the server had newer info
        }
      });
    } else {
      showScreen('screen-login');
    }
  });
})();
