/* Injects a hamburger toggle into every .site-nav and wires the mobile menu.
   One script shared by every page; the button is hidden on desktop via CSS. */
(function () {
  document.querySelectorAll('.site-nav').forEach(function (nav) {
    if (nav.querySelector('.nav-toggle')) return;
    var btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML =
      '<svg viewBox="0 0 26 26" width="26" height="26" aria-hidden="true">' +
      '<g class="ic-open"><line x1="3" y1="8" x2="23" y2="8"/><line x1="3" y1="13" x2="23" y2="13"/><line x1="3" y1="18" x2="23" y2="18"/></g>' +
      '<g class="ic-close"><line x1="5" y1="5" x2="21" y2="21"/><line x1="21" y1="5" x2="5" y2="21"/></g>' +
      '</svg>';
    var brand = nav.querySelector('.brand');
    if (brand) brand.insertAdjacentElement('afterend', btn);
    else nav.insertBefore(btn, nav.firstChild);

    function setOpen(open) {
      nav.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function () {
      setOpen(!nav.classList.contains('nav-open'));
    });
    // close the menu after tapping a link
    nav.querySelectorAll('.menu a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
  });

  /* ---- social icon bar ---- */
  var SOCIAL = [
    { name: 'Instagram', href: 'https://www.instagram.com/kysca2026',
      svg: '<rect x="2.2" y="2.2" width="19.6" height="19.6" rx="5.4" fill="none" stroke="currentColor" stroke-width="1.9"/>' +
           '<circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="1.9"/>' +
           '<circle cx="17.4" cy="6.6" r="1.3" fill="currentColor"/>' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@kady.youth.sheep',
      svg: '<path fill="currentColor" d="M16.5 3c.3 1.9 1.4 3.4 3.2 3.8.5.1 1 .2 1.5.2v3.1c-1.6 0-3.1-.5-4.4-1.4v6.1c0 3.1-2.5 5.6-5.6 5.6S5.6 17.9 5.6 14.8s2.5-5.6 5.6-5.6c.3 0 .6 0 .9.1v3.2c-.3-.1-.6-.2-.9-.2-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5V3h3.3z"/>' },
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61583898641618',
      svg: '<path fill="currentColor" d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/>' }
  ];
  function buildSocial(extraClass) {
    var bar = document.createElement('div');
    bar.className = 'social' + (extraClass ? ' ' + extraClass : '');
    SOCIAL.forEach(function (s) {
      var a = document.createElement('a');
      a.href = s.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('aria-label', s.name);
      a.title = s.name;
      a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + s.svg + '</svg>';
      bar.appendChild(a);
    });
    return bar;
  }

  // Footers: drop the old "Facebook" text link, add the icon bar under the wordmark.
  document.querySelectorAll('.site-footer').forEach(function (footer) {
    if (footer.querySelector('.social')) return;
    var links = footer.querySelector('.foot-links');
    if (links) links.querySelectorAll('a').forEach(function (a) {
      if (/facebook\.com/.test(a.href)) a.remove();
    });
    var col = footer.querySelector('div');
    if (col) col.appendChild(buildSocial());
    else footer.insertBefore(buildSocial(), footer.firstChild);
  });

  // Any explicit placeholder on a page (e.g. the contact page).
  document.querySelectorAll('[data-social]').forEach(function (slot) {
    if (slot.querySelector('.social')) return;
    slot.appendChild(buildSocial(slot.getAttribute('data-social') || ''));
  });
})();
