// Menu page: six product worlds with a fixed pill bar, ?world= deep links and add-to-bag.
(function () {
  var P = 'assets/';
  var W = [
    { key: 'roast', name: 'Roast', title: 'Pulled', italic: 'slow.', tagline: 'Pulled slow. Poured pretty.',
      c: { bg: '#270402', surface: '#3A1A0F', ink: '#FBF6EE', ink2: '#B28F71', accent: '#E29A64', accentInk: '#270402', hl: '#E29A64', line: 'rgba(251,246,238,.16)' },
      sup: ['worlds/01-roast/f067_latte-art-topdown.jpg', 'worlds/01-roast/f087_two-iced-lattes.jpg'], items: ['Espresso', 'Flat White', 'Cappuccino', 'Iced Latte'] },
    { key: 'matcha', name: 'Matcha', title: 'Whisked', italic: 'green.', tagline: 'Whisked green, poured over ice.',
      c: { bg: '#1F3A2B', surface: '#2C473C', ink: '#F2F5E4', ink2: '#C9D6B0', accent: '#B9CC94', accentInk: '#1F3A2B', hl: '#DDE6A8', line: 'rgba(242,245,228,.18)' },
      sup: ['worlds/02-matcha/f068_tray-matcha-croissant.jpg', 'worlds/02-matcha/f071_hands-matcha-green-knit.jpg'], items: ['Iced Matcha Latte', 'Hot Matcha Latte', 'Matcha Cup', 'Matcha and Croissant'] },
    { key: 'bakery', name: 'Bakery', title: 'Flaky outside,', italic: 'soft inside.', tagline: 'Baked fresh to fuel every moment.',
      c: { bg: '#D99B57', surface: '#E6B677', ink: '#270402', ink2: '#4A2410', accent: '#270402', accentInk: '#FBF6EE', hl: '#592D14', line: 'rgba(39,4,2,.2)' },
      sup: ['worlds/03-bakery/f028_pain-au-chocolat-stack.jpg', 'worlds/03-bakery/f031_baker-tray.jpg'], items: ['Butter Croissant', 'Pain au Chocolat', 'Almond Croissant', 'Glazed Croissant'] },
    { key: 'shakes', name: 'Shakes', title: 'Thick enough', italic: 'for a spoon.', tagline: 'Blended thick. Best with a straw and a friend.',
      c: { bg: '#F3DAD6', surface: '#FBE9E5', ink: '#4A1E14', ink2: '#6B3A32', accent: '#8A4B45', accentInk: '#FBF6EE', hl: '#8A4B45', line: 'rgba(74,30,20,.18)' },
      sup: ['brand-moments/f014_iced-drink-paper-bag.jpg', 'brand-moments/f036_cups-upright.jpg'], items: ['Caramel Blast Shake', 'Cookies and Cream Shake', 'Chocolate Shake', 'Vanilla Shake'] },
    { key: 'coolers', name: 'Coolers', title: 'Cold fruit,', italic: 'warm days.', tagline: 'Cold fruit for warm Lahore afternoons.',
      c: { bg: '#FFF1DC', surface: '#FFE4BE', ink: '#3A0F10', ink2: '#6B2A24', accent: '#B02A38', accentInk: '#FFF1DC', hl: '#B02A38', line: 'rgba(58,15,16,.16)' },
      sup: ['worlds/05-coolers/f102_mango-cooler-dark.jpg', 'worlds/05-coolers/f077_cooler-car-window.jpg'], items: ['Strawberry Chiller', 'Mango Cooler', 'Watermelon Cooler', 'Matcha Berry Layer'] },
    { key: 'desserts', name: 'Desserts', title: 'One plate,', italic: 'four forks.', tagline: 'Made with love. Shared, mostly.',
      c: { bg: '#592D14', surface: '#6B3A22', ink: '#F3E6D6', ink2: '#E3CBB3', accent: '#F1B88D', accentInk: '#270402', hl: '#F1B88D', line: 'rgba(243,230,214,.18)' },
      sup: ['worlds/06-desserts/f070_tiramisu-four-forks.jpg', 'worlds/06-desserts/f035_cheesecake-terracotta.jpg'], items: ['Fudge Brownie', 'Tiramisu', 'Baked Cheesecake', 'Chocolate Chip Cookie'] }
  ];
  var HEROES = ['worlds/01-roast/HERO_f040_cups-latte-art.jpg', 'worlds/02-matcha/HERO_f097_torn-paper-matcha.jpg', 'worlds/03-bakery/HERO_f033_croissant-terracotta-plate.jpg',
    'worlds/04-shakes/HERO_f092_shake-splash-storefront.jpg', 'worlds/05-coolers/HERO_f100_strawberry-chiller-hand.jpg', 'worlds/06-desserts/HERO_f111_brownie-fork.jpg'];

  var initIdx = (function () { try { var k = new URLSearchParams(location.search).get('world'); var i = W.findIndex(function (w) { return w.key === k; }); return i < 0 ? 0 : i; } catch (e) { return 0; } })();
  var s = { idx: initIdx, shown: initIdx, fade: false, barTop: 0, barHide: false, loaded: {} };
  var page = FuelParts.page({ nav: { page: 'menu' } });

  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  var bar = $('[data-bar]'), tabs = $$('[role="tab"]'), stage = $('#stage'), inner = $('[data-stage-inner]');
  var items = $$('[data-item]'), adds = $$('[data-line-border]'), heroes = $$('[data-hero]'), sups = $$('[data-sup]');
  var text = function (sel, v) { var el = $(sel); if (el.textContent !== v) el.textContent = v; };

  function render() {
    var cur = W[s.shown], c = cur.c, bp = page.bp();
    bar.style.top = s.barTop ? s.barTop + 'px' : (bp === 'phone' ? '76px' : '90px');
    bar.style.transform = s.barHide ? 'translateY(-14px)' : 'none';
    bar.style.opacity = s.barHide ? 0 : 1;
    bar.style.visibility = s.barHide ? 'hidden' : 'visible';
    tabs.forEach(function (t, i) {
      var on = i === s.idx;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.style.border = '1px solid ' + (on ? 'var(--ink)' : 'var(--line)');
      t.style.background = on ? 'var(--ink)' : 'transparent';
      t.style.color = on ? 'var(--bg)' : 'var(--ink)';
    });
    stage.setAttribute('aria-label', cur.name);
    stage.style.background = W[s.idx].c.bg;
    stage.style.color = c.ink;
    inner.style.opacity = s.fade ? 0 : 1;
    text('[data-num]', String(s.shown + 1).padStart(2, '0'));
    text('[data-name]', cur.name);
    text('[data-title]', cur.title);
    text('[data-italic]', cur.italic);
    text('[data-tagline]', cur.tagline);
    text('[data-next]', W[(s.shown + 1) % W.length].name);
    $('[data-hl]').style.color = c.hl;
    $$('[data-ink2]').forEach(function (el) { el.style.color = c.ink2; });
    $('[data-line-top]').style.borderTop = '1px solid ' + c.line;
    $$('[data-line-bottom]').forEach(function (el) { el.style.borderBottom = '1px solid ' + c.line; });
    items.forEach(function (el, i) { if (el.textContent !== cur.items[i]) el.textContent = cur.items[i]; });
    adds.forEach(function (el, i) { el.setAttribute('aria-label', 'Add ' + cur.items[i] + ' to bag'); el.style.border = '1px solid ' + c.line; });
    var a = $('[data-accent]'); a.style.background = c.accent; a.style.color = c.accentInk;
    $$('[data-surface]').forEach(function (el) { el.style.background = c.surface; });
    heroes.forEach(function (el, i) { el.style.opacity = s.shown === i ? 1 : 0; });
    sups.forEach(function (el, i) {
      var src = P + cur.sup[i];
      if (el.getAttribute('src') !== src) el.setAttribute('src', src);
      el.style.opacity = s.loaded[src] ? 1 : 0;
    });
  }
  function set(n) { Object.assign(s, n); render(); }

  var ft;
  function pick(i) {
    if (i === s.idx) return;
    set({ idx: i, fade: true });
    clearTimeout(ft); ft = setTimeout(function () { set({ shown: i, fade: false }); }, 300);
    if (stage.getBoundingClientRect().top < 0) scrollTo({ top: stage.getBoundingClientRect().top + scrollY - 170, behavior: 'smooth' });
    try { var u = new URL(location.href); u.searchParams.set('world', W[i].key); history.replaceState(null, '', u); } catch (e) {}
  }

  var onImg = function (e) { var k = e.currentTarget.getAttribute('src'); if (!s.loaded[k]) { s.loaded[k] = true; render(); } };
  FuelParts.hooks(document.body, {
    'x.pick': function (e) { pick(tabs.indexOf(e.currentTarget)); },
    'it.add': function (e) { var n = W[s.shown].items[adds.indexOf(e.currentTarget)]; dispatchEvent(new CustomEvent('fuel-add', { detail: { add: n, world: W[s.shown].name } })); },
    nextWorld: function () { pick((s.idx + 1) % W.length); },
    onImg: onImg
  });
  // Images already decoded before this script ran will not fire load again.
  sups.forEach(function (el) { if (el.complete && el.naturalWidth) s.loaded[el.getAttribute('src')] = true; });

  var sr;
  var onScroll = function () {
    cancelAnimationFrame(sr);
    sr = requestAnimationFrame(function () {
      var nav = $('[data-fuel-nav]'), nb = nav ? nav.getBoundingClientRect().bottom : 80;
      var sb = stage.getBoundingClientRect().bottom;
      var top = Math.round(nb + 10), hide = sb < top + 160;
      if (top !== s.barTop || hide !== s.barHide) set({ barTop: top, barHide: hide });
    });
  };
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); setTimeout(onScroll, 300);
  page.on(render);

  var st = function () { var h = +new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', hour12: false }).format(new Date()) % 24; page.set({ open: h >= 8 || h < 2 }); };
  st(); setInterval(st, 30000);
  W.forEach(function (w, i) { [HEROES[i]].concat(w.sup).forEach(function (p) { var im = new Image(); im.src = P + p; }); });
  render();
})();
