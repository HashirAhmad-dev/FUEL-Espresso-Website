// Our Space page: shared parts, open status, reserve button and the ?page=visit jump.
(function () {
  var isVisit = (function () { try { return new URLSearchParams(location.search).get('page') === 'visit'; } catch (e) { return false; } })();
  var page = FuelParts.page({ nav: { page: isVisit ? 'visit' : 'space' } });

  var st = function () { var h = +new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', hour12: false }).format(new Date()) % 24; page.set({ open: h >= 8 || h < 2 }); };
  st(); setInterval(st, 30000);

  FuelParts.hooks(document.body, {
    reserve: function () { dispatchEvent(new CustomEvent('fuel-reserve')); }
  });

  if (isVisit) {
    var go = function (n) { var el = document.getElementById('visit'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY, behavior: 'auto' }); else if (n < 20) setTimeout(function () { go(n + 1); }, 100); };
    setTimeout(function () { go(0); }, 60);
  }
})();
