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
})();
