/* ------------------------------------------------------------------
   Main Marks — where a sales manager lands after signing in (start.html).

   Two cards: his team's analysis (manager.html) and the sales app
   (projects.html). He is a seller as well as a manager, so the sign-in does
   not choose for him. Everyone else has one place to go and never sees
   this page.
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var MM = window.MM, t = MM.t;
  MM.applyBrand();

  var session = MM.auth.require('start.html');
  if (!session) return;
  if (session.role !== 'sales_manager') { location.replace('projects.html'); return; }

  document.body.classList.add('seq');

  var first = String(session.name || '').trim().split(/\s+/)[0] || '';
  document.getElementById('hello').textContent = t('Welcome, {name}', { name: first });

  MM.whoMenu(document.getElementById('who'), session, {
    noMode: true,            /* this page IS the choice */
    role: t((CONFIG.roles[session.role] || {}).label || session.role),
    onOut: function () { MM.auth.signOut(); MM.leave('login.html', { replace: true }); }
  });
  MM.stamp();
}());
