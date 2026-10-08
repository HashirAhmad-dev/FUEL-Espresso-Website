// THE FUEL boot: applies the saved theme before first paint, enables cross-page view transitions,
// and plays the arrival half of the Hairline loader after a route change.
(function () {
  if (window.__fuelBoot) return; window.__fuelBoot = 1;
  var T = {
    latte: { bg: '#FBF6EE', surface: '#F3E6D6', ink: '#270402', ink2: '#592D14', accent: '#814D35', accentInk: '#FBF6EE', caramel: '#E29A64', line: 'rgba(39,4,2,.16)', glass: 'rgba(251,246,238,.82)' },
    espresso: { bg: '#270402', surface: '#3A1A0F', ink: '#FBF6EE', ink2: '#E3CBB3', accent: '#E29A64', accentInk: '#270402', caramel: '#E29A64', line: 'rgba(251,246,238,.16)', glass: 'rgba(39,4,2,.78)' }
  };
  var t;
  try { var q = new URLSearchParams(location.search).get('theme'); t = (q === 'latte' || q === 'espresso') ? q : localStorage.getItem('fuel-theme'); } catch (e) {}
  if (t !== 'latte' && t !== 'espresso') {
    var h = 12;
    try { h = +new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', hour12: false }).format(new Date()) % 24; } catch (e) {}
    t = h >= 7 && h < 19 ? 'latte' : 'espresso';
  }
  var r = document.documentElement, v = T[t];
  Object.keys(v).forEach(function (k) { r.style.setProperty('--' + k, v[k]); });
  r.style.setProperty('--fuel-vt-bg', v.bg);
  r.style.backgroundColor = v.bg;
  r.style.colorScheme = t === 'latte' ? 'light' : 'dark';
  var s = document.createElement('style');
  s.textContent = '@view-transition{navigation:auto}' +
    'html::view-transition{background:var(--fuel-vt-bg)}' +
    '::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}' +
    '::view-transition-group(fuel-nav),::view-transition-group(fuel-dock){animation:none;z-index:100}' +
    '::view-transition-old(fuel-nav),::view-transition-old(fuel-dock){display:none}' +
    '::view-transition-new(fuel-nav),::view-transition-new(fuel-dock){animation:none}';
  (document.head || r).appendChild(s);
  var quiet = function (e) { var v = e.viewTransition; if (!v) return; var n = function () {}; v.ready && v.ready.catch(n); v.finished && v.finished.catch(n); v.updateCallbackDone && v.updateCallbackDone.catch(n); };
  addEventListener('pagereveal', quiet); addEventListener('pageswap', quiet);

  var arrive = null;
  try { arrive = sessionStorage.getItem('fuel-route'); sessionStorage.removeItem('fuel-route'); } catch (e) {}
  if (!arrive) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Cover sits under the navbar (z 50) so the nav never disappears.
  var o = document.createElement('div');
  o.setAttribute('aria-hidden', 'true');
  o.style.cssText = 'position:fixed;inset:0;z-index:49;pointer-events:none;background:' + v.bg;
  var b = document.createElement('div');
  b.setAttribute('aria-hidden', 'true');
  b.style.cssText = 'position:fixed;left:0;top:0;height:2px;width:100%;z-index:9999;pointer-events:none;transform-origin:0 50%;background:#E29A64;transform:scaleX(.7)';
  var host = document.body || r;
  host.appendChild(o); host.appendChild(b);
  var crawl = reduce ? null : b.animate([{ transform: 'scaleX(.7)' }, { transform: 'scaleX(.94)' }], { duration: 1600, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' });
  var done = false;
  function finish() {
    if (done) return; done = true;
    if (crawl) crawl.pause();
    if (reduce) { o.remove(); b.remove(); return; }
    b.animate([{ transform: getComputedStyle(b).transform, opacity: 1 }, { transform: 'scaleX(1)', opacity: 1, offset: .6 }, { transform: 'scaleX(1)', opacity: 0 }], { duration: 520, easing: 'ease-out', fill: 'forwards' }).finished.then(function () { b.remove(); });
    o.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, delay: 140, easing: 'ease-out', fill: 'forwards' }).finished.then(function () { o.remove(); });
  }
  if (document.readyState === 'complete') setTimeout(finish, 200);
  else addEventListener('load', function () { setTimeout(finish, 120); });
  setTimeout(finish, 1800);
})();
