/* ------------------------------------------------------------------
   Main Marks — the sign-in page.

   It does four things and no more: take a work email and a password,
   say ONE clear thing when they do not match, answer "forgot password?"
   honestly, and go where the person was heading. Anyone already signed
   in never sees it.
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  var MM = window.MM, el = MM.el, t = MM.t;
  MM.applyBrand();

  /* ---- the entrance ---------------------------------------------------
     One class, set immediately. Every animation it starts carries
     fill-mode `both`, so it holds its own start state and cannot leave
     anything stranded — including in a background tab, where an earlier
     requestAnimationFrame version left the form invisible.

     The form is usable from the first frame: the sequence moves opacity
     and transform only, and no input is ever disabled. If this script
     fails, the class is never set and everything is simply visible. */
  document.body.classList.add('seq');

  /* Where to go after signing in. Only a page inside this app: a `next`
     that points anywhere else is ignored rather than followed. */
  function nextPage() {
    var raw = new URLSearchParams(location.search).get('next') || '';
    /* build 116: a sales manager chooses between his team and the sales app */
    var me = MM.auth.current();
    /* build 120: only where the manager view is set up (CONFIG.salesTeam). A copy published without it
       has no start.html, and a manager must land on the projects, not on a missing page. */
    if (!raw) return me && me.role === 'sales_manager' && CONFIG.salesTeam ? 'start.html' : 'projects.html';
    if (/^[a-z0-9\-]+\.html(\?[^#]*)?$/i.test(raw)) return raw;
    return 'projects.html';
  }

  /* Already signed in? Then this page has nothing to ask. */
  if (MM.auth.current()) { location.replace(nextPage()); return; }

  var form = document.getElementById('signin');
  var who = document.getElementById('who');
  var code = document.getElementById('code');
  var why = document.getElementById('why');
  var go = document.getElementById('go');

  /* ---- forgot password ------------------------------------------------
     There is no back end yet, so it must not pretend to send an email.
     It says who can actually reset it. */
  var forgot = document.getElementById('forgot');
  var forgotNote = document.getElementById('forgotnote');
  forgot.addEventListener('click', function () {
    forgotNote.textContent = t('Your sales manager resets it. Nothing is emailed from this app.');
    forgotNote.hidden = false;
  });

  /* ---- the demo accounts ---------------------------------------------
     Only while the team list in config is the placeholder one. It
     disappears on its own the moment the real list replaces it. */
  var note = document.getElementById('demonote');
  if (note && CONFIG.usersDemo) {
    note.hidden = false;
    var list = el('div', 'demo-accounts');
    (CONFIG.users || []).forEach(function (u) {
      var row = el('button', 'demo-acct');
      row.type = 'button';
      row.appendChild(el('span', 'da-n', u.email || u.name));
      row.appendChild(el('span', 'da-r', t((CONFIG.roles[u.role] || {}).label || u.role)));
      row.addEventListener('click', function () {
        who.value = u.email || u.name;
        code.value = u.code;
        why.hidden = true;
        go.focus();
      });
      list.appendChild(row);
    });
    note.appendChild(list);
  }

  function fail(msg) {
    why.textContent = msg;
    why.hidden = false;
    why.setAttribute('role', 'alert');    /* said once, out loud, for a screen reader too */
  }

  var sweep = document.querySelector('.gate-sweep');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    why.hidden = true;

    /* The sign-in runs FIRST. A refusal must be instant — animating a
       rejection would make a wrong password feel like a slow network. */
    var r = MM.auth.signIn({ who: who.value, code: code.value });
    if (!r.ok) { fail(t(r.why)); code.select(); return; }

    var next = nextPage();
    /* the crossing's second line names where it lands */
    var line = document.querySelector('.xf-select');
    if (line && /^start.html/.test(next)) line.textContent = t('Choose where to go');
    /* Reduced motion still gets the hand-over, just none of the
       theatre: a plain 250ms cross-fade, no lines and no message.
       MM.xfade.cross reads the preference itself. */
    if (reduced) { MM.xfade.cross(function () { location.replace(next); }, next); return; }

    /* Accepted. About 1.2 seconds, in four beats:

         0.0-0.1  the press (CSS :active — 2%, not a bounce)
         0.1-0.8  VERIFYING: the label goes, the spinner turns, one
                  orange sweep crosses the button, the path lights once
                  toward the figure
         0.8-1.0  CONFIRMED: the tick draws and holds
         1.0-1.2  the form steps back and the veil rises; the page is
                  handed over while the screen is fully black

       Every step is a TIMER, so a throttled or unsupported animation
       cannot strand anybody: the timers run and the page changes.

       The 700ms of "verifying" is a floor, not a fake wait. Today the
       check is instant; when the real back end is stood up this is where
       its answer lands, and the floor keeps the spinner from flickering
       on a fast connection. */
    go.classList.add('is-loading');
    go.disabled = true;
    form.classList.add('is-busy');
    if (sweep) {
      sweep.classList.remove('is-lit');
      void sweep.offsetWidth;          /* restart it */
      sweep.classList.add('is-lit');
    }

    setTimeout(function () {
      go.classList.remove('is-loading');
      go.classList.add('is-done');               /* the tick */

      setTimeout(function () {
        form.classList.add('is-dimmed');
        /* The tick has landed. From here the crossing takes over from
           the old black veil: the page goes under a 90% scrim, four
           architectural lines are drawn, ACCESS GRANTED settles, and
           only then is the document handed over — with the overlay
           fully formed and completely still, which is what projects.html
           repaints in its own first frame. */
        MM.xfade.cross(function () { location.replace(next); }, next);
      }, 150);
    }, 700);
  });

  who.focus({ preventScroll: true });
}());
