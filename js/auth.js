/* ------------------------------------------------------------------
   Main Marks — who is signed in.

   WHY THIS EXISTS AT ALL. Not to keep anybody out: the reason is that
   every offer and every WhatsApp post this app produces is stamped with
   the salesperson who made it. That stamp is what gives the sales
   manager the picture nobody has today — who is working which brokerage,
   who has gone quiet. Without a sign-in we would be asking people to
   type their own name, and they would type it differently every time.

   WHAT IT IS TODAY. The list of people lives in js/config.js and the
   session lives on the device. That is honest attribution, and it is not
   security. When the back end is stood up, signIn() talks to it and
   nothing else in the app changes, because every screen reads the
   SESSION, never the list.

   THE RULES IT KEEPS
   - It never blocks the app from LOADING. The page boots behind the gate
     so that the moment a session is valid the projects are already there.
   - It survives no signal. The session is read from the device; a
     salesperson standing in a brokerage with no bars can still open a
     unit and make an offer.
   - A role the app does not recognise gets NOTHING. Fail closed.
   - It records nothing about a customer, here or anywhere else.
   ------------------------------------------------------------------ */

(function (root) {
  'use strict';

  var MM = root.MM || (root.MM = {});
  var KEY = 'mm.session.v1';

  function cfg() { return typeof CONFIG !== 'undefined' ? CONFIG : {}; }

  /* ---- the session --------------------------------------------------
     Kept in localStorage, not sessionStorage: a salesperson signs in once
     on their phone and should not be asked again tomorrow. */
  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || !s.id || !s.role) return null;
      /* A role that is no longer configured is not a session. */
      if (!(cfg().roles || {})[s.role]) return null;
      return s;
    } catch (e) {
      return null;            /* private mode, or a store we cannot read */
    }
  }

  function write(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); return true; }
    catch (e) { return false; }   /* the sign-in still works for this visit */
  }

  var live = null;              /* the session for this page, once resolved */

  function current() {
    if (live) return live;
    live = read();
    return live;
  }

  /* ---- signing in ---------------------------------------------------
     o: { who, code }  ->  { ok: true, session } | { ok: false, why }

     `who` is the WORK EMAIL — what the team already has and already
     remembers. The name and the id are accepted too, because a
     salesperson handed a phone types their name. Matching ignores case
     and stray spaces. Nothing is matched against a phone number: Main
     Marks has not sent the team, and guessing a format we would have to
     change later is how you end up supporting two. */
  function signIn(o) {
    var users = cfg().users || [];
    var who = String((o && o.who) || '').trim().toLowerCase().replace(/\s+/g, ' ');
    var code = String((o && o.code) || '').trim();
    if (!who) return { ok: false, why: 'Enter your work email.' };
    if (!code) return { ok: false, why: 'Enter your password.' };

    var found = null;
    for (var i = 0; i < users.length; i++) {
      var u = users[i];
      if (who === String(u.email || '').toLowerCase() ||
          who === String(u.name || '').toLowerCase() ||
          who === String(u.id || '').toLowerCase()) { found = u; break; }
    }
    /* ONE message for a wrong email and a wrong password. Two messages
       tell a stranger which half they got right. */
    if (!found || String(found.code) !== code) {
      return { ok: false, why: 'That email and password do not match.' };
    }
    if (!(cfg().roles || {})[found.role]) {
      return { ok: false, why: 'This account has no role set. Ask for it to be fixed before using the app.' };
    }

    var s = {
      id: found.id,
      name: found.name,
      email: found.email || '',
      role: found.role,
      phone: found.phone || '',
      staff: found.staff || '',
      projects: Array.isArray(found.projects) ? found.projects.slice() : [],
      demo: !!cfg().usersDemo,
      at: new Date().toISOString()
    };
    write(s);
    live = s;
    return { ok: true, session: s };
  }

  function signOut() {
    try { localStorage.removeItem(KEY); } catch (e) { /* nothing to clear */ }
    live = null;
  }

  /* ---- the guard ----------------------------------------------------
     Called at the top of every page that needs a person. Returns the
     session, or sends the browser to the sign-in page and returns null.
     Carries where we were going, so signing in lands on the page that was
     asked for rather than dumping everyone on the project list. */
  function require(returnTo) {
    var s = current();
    if (s) return s;
    var here = returnTo || (location.pathname.split('/').pop() + location.search);
    location.replace('login.html?next=' + encodeURIComponent(here));
    return null;
  }

  /* What this person may do. A role the config does not know returns a
     permission set with everything off. */
  function can(what) {
    var s = current();
    if (!s) return false;
    var r = (cfg().roles || {})[s.role];
    return !!(r && r[what]);
  }

  /* The projects this person may sell, in config order, plus the ones
     that are not released — those are shown to everybody, because they
     are part of the story, and opened by nobody. */
  function visibleProjects() {
    var s = current();
    var all = cfg().projects || [];
    if (!s) return [];
    var mine = s.projects || [];
    return all.filter(function (p) {
      return p.ready !== true || mine.indexOf(p.id) !== -1;
    });
  }

  function maySell(id) {
    var s = current();
    if (!s) return false;
    return (s.projects || []).indexOf(id) !== -1 && !!MM.sellableProject(id);
  }

  /* WHICH MEMBER OF THE SALES TEAM IS SIGNED IN (build 121): the place of
     this salesperson in CONFIG.salesTeam.members, found by staff code, or -1.
     -1 is the answer for a manager, for an account with no staff code, and
     on a copy published without the team: there the salesperson has no
     "My activity", and nothing links to it. A session saved before build 121
     carries no staff code, so the account is looked up by its id. */
  function member() {
    var s = current(), team = cfg().salesTeam, staff = '', i;
    if (!s || s.role !== 'sales' || !team || !Array.isArray(team.members)) return -1;
    staff = s.staff || '';
    if (!staff) (cfg().users || []).forEach(function (u) { if (u.id === s.id) staff = u.staff || ''; });
    if (!staff) return -1;
    for (i = 0; i < team.members.length; i++) if (team.members[i].code === staff) return i;
    return -1;
  }

  MM.auth = {
    member: member,
    current: current,
    signIn: signIn,
    signOut: signOut,
    require: require,
    can: can,
    visibleProjects: visibleProjects,
    maySell: maySell
  };

  if (typeof module === 'object' && module.exports) module.exports = MM.auth;
}(typeof window !== 'undefined' ? window : globalThis));
