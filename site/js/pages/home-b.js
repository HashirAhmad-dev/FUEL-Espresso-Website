// Home, Variant B ("scroll theatre"): pour loader, pinned scroll-driven scenes, scrubbed hero video.
(function () {
  var P = 'assets/';
  var W = [
    { name: 'Roast', dark: true, c: { bg: '#270402', ink: '#FBF6EE' }, hero: 'worlds/01-roast/HERO_f040_cups-latte-art.jpg' },
    { name: 'Matcha', dark: true, c: { bg: '#1F3A2B', ink: '#F2F5E4' }, hero: 'worlds/02-matcha/HERO_f097_torn-paper-matcha.jpg' },
    { name: 'Bakery', dark: false, c: { bg: '#D99B57', ink: '#270402' }, hero: 'worlds/03-bakery/HERO_f033_croissant-terracotta-plate.jpg' },
    { name: 'Shakes', dark: false, c: { bg: '#F3DAD6', ink: '#4A1E14' }, hero: 'worlds/04-shakes/HERO_f092_shake-splash-storefront.jpg' },
    { name: 'Coolers', dark: false, c: { bg: '#FFF1DC', ink: '#3A0F10' }, hero: 'worlds/05-coolers/HERO_f100_strawberry-chiller-hand.jpg' },
    { name: 'Desserts', dark: true, c: { bg: '#592D14', ink: '#F3E6D6' }, hero: 'worlds/06-desserts/HERO_f111_brownie-fork.jpg' }
  ];
  var DAY = [[0, '#FBF6EE'], [0.33, '#F3E6D6'], [0.55, '#E29A64'], [0.72, '#592D14'], [1, '#270402']];
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  var timers = [];
  var later = function (fn, ms) { timers.push(setTimeout(fn, ms)); };

  var s = { loader: 'load', pct: 0, skip: false };
  var page = FuelParts.page({ nav: { page: 'home', homeHref: '/' }, footer: { homeHref: '/' }, visit: { draw: true } });
  var loopVideo = function () { return page.w < 768; };
  var fmtTime = function (x) { var h = Math.floor(x) % 24, m = Math.floor((x % 1) * 60); return (h % 12 === 0 ? 12 : h % 12) + ':' + String(m).padStart(2, '0') + ' ' + (h < 12 ? 'AM' : 'PM'); };

  // ---- Static layout that depends on breakpoint / reduced motion -----------------------------------
  var tpl = $('template[data-video]'), video = null;
  if (!saveData && !reduce) { video = tpl.content.firstElementChild; tpl.replaceWith(video); } else tpl.remove();
  var pill = $('[data-counter-pill]'), pillParent = pill.parentNode, pillNext = pill.nextSibling;
  var dots = $('[data-w-dots]'), dotsParent = dots.parentNode;
  if (reduce) {
    var H = { hero: '100dvh', words: '100dvh', day: '100dvh', worlds: '100dvh', best: 'auto', room: '100dvh' };
    Object.keys(H).forEach(function (k) { $('[data-scene="' + k + '"]').style.height = H[k]; });
    $('[data-room-sticky]').style.overflow = 'auto';
    $$('[data-word]').forEach(function (el) { el.style.opacity = 1; });
    $('[data-banner]').style.clipPath = 'none';
    $('[data-banner-img]').style.transform = 'none';
  }
  function layout() {
    var bp = page.bp(), side = bp === 'desktop' || (bp === 'tablet' && page.w > page.h), r0 = heroRect();
    if (bp !== 'phone' && !pill.isConnected) pillParent.insertBefore(pill, pillNext);
    if (bp === 'phone' && pill.isConnected) pill.remove();
    if (video) {
      video.loop = bp === 'phone';
      if (bp === 'phone') video.setAttribute('autoplay', ''); else video.removeAttribute('autoplay');
      video.setAttribute('preload', bp === 'phone' ? 'auto' : 'none');
    }
    $('[data-hero-media]').style.clipPath = 'inset(' + r0.t + 'px ' + r0.r + 'px ' + r0.b + 'px ' + r0.l + 'px round ' + r0.rad + 'px ' + r0.rad + 'px 20px 20px)';
    $('[data-hero-text]').style.justifyContent = bp === 'phone' ? 'flex-start' : 'center';
    $('[data-hero-text] h1').style.maxWidth = bp === 'phone' ? '100%' : '50%';
    $('[data-clock-box]').style.maxWidth = bp === 'phone' ? '300px' : '460px';
    $('[data-w-grid]').style.gridTemplateColumns = bp === 'desktop' ? 'minmax(0,1.1fr) minmax(0,1fr) auto' : side ? 'minmax(0,1.1fr) minmax(0,1fr)' : 'minmax(0,1fr)';
    $('[data-w-textcol]').style.order = side ? 1 : 2;
    var box = $('[data-w-imgbox]');
    box.style.order = side ? 2 : 1;
    box.style.maxWidth = bp === 'phone' ? '260px' : '480px';
    box.style.maxHeight = side ? 'min(72vh, calc(100dvh - 150px))' : 'min(40vh, calc(100dvh - 460px))';
    if (bp === 'desktop' && !dots.isConnected) dotsParent.appendChild(dots);
    if (bp !== 'desktop' && dots.isConnected) dots.remove();
    $('[data-social]').style.gridTemplateColumns = bp === 'desktop' ? 'repeat(6, minmax(0,1fr))' : bp === 'tablet' ? 'repeat(3, minmax(0,1fr))' : 'repeat(2, minmax(0,1fr))';
  }

  // ---- Pour loader ----------------------------------------------------------------------------------
  var loader = $('[data-loader]');
  function renderLoader() {
    if (s.loader === 'none') { if (loader.isConnected) loader.remove(); return; }
    loader.style.transform = s.loader === 'lift' ? 'translateY(-100%)' : 'none';
    $('[data-pct]').textContent = String(s.pct).padStart(3, '0');
    $('[data-pct-bar]').style.width = s.pct + '%';
    $('[data-pour]').style.clipPath = 'inset(' + (100 - s.pct) + '% 0 0 0)';
    $('[data-skip]').style.opacity = s.skip ? 1 : 0;
  }
  function set(n) { Object.assign(s, n); renderLoader(); }
  var finished = false;
  function lift() { if (s.loader !== 'load') return; set({ loader: 'lift' }); later(function () { set({ loader: 'none' }); }, 1050); }
  // Counts real asset loads (poster, world heroes, room shots, first video data). Min 1.2 s, cap 3.5 s.
  function preload(videoPromise) {
    if (s.loader === 'none') return;
    try { sessionStorage.setItem('fuel-pour', '1'); } catch (e) {}
    var list = ['hero/hero-poster-1280x720.webp'].concat(W.map(function (w) { return w.hero; }), ['space/f088_interior-lattes-window.jpg', 'space/f055_interior-wall-sign.jpg', 'worlds/01-roast/f087_two-iced-lattes.jpg', 'worlds/03-bakery/f047_croissant-paper-bag.jpg', 'worlds/02-matcha/f056_stacked-matcha-cups.jpg', 'brand-moments/f036_cups-upright.jpg']);
    var total = list.length + 1, done = 0, t0 = performance.now();
    var finish = function () { if (finished) return; finished = true; var wait = Math.max(0, 1200 - (performance.now() - t0)); later(lift, wait + 250); };
    var bump = function () { done++; set({ pct: Math.round((done / total) * 100) }); if (done >= total) finish(); };
    list.forEach(function (p) { var i = new Image(); i.onload = i.onerror = bump; i.src = P + p; });
    videoPromise.then(bump, bump);
    later(function () { set({ skip: true }); }, 2000);
    later(function () { set({ pct: 100 }); finish(); }, 3500);
  }

  // ---- Hero video: scrubbed on desktop/tablet, looped on phones --------------------------------------
  var scrubReady = false, scrubFail = false, seekAt = 0;
  function toLoop() {
    scrubFail = true; if (!video) return;
    video.loop = true; var p = video.play(); if (p && p.catch) p.catch(function () {});
  }
  // Scrubbing needs a fully seekable file, so the clip is pulled into memory as a Blob first.
  function loadScrub() {
    var v = video; if (!v || loopVideo()) return Promise.resolve();
    return fetch(new URL(P + 'hero/hero-loop-1280x720.mp4', location.href).href)
      .then(function (r) { if (!r.ok) throw new Error('video'); return r.blob(); })
      .then(function (b) {
        return new Promise(function (res) {
          var done = function () { v.removeEventListener('loadeddata', done); scrubReady = v.readyState >= 2; v.pause(); res(); };
          v.addEventListener('loadeddata', done);
          v.src = URL.createObjectURL(b); v.load();
          setTimeout(done, 4000);
        });
      })
      .catch(toLoop);
  }

  // ---- Scenes ---------------------------------------------------------------------------------------
  var E = {
    hero: $('[data-scene="hero"]'), heroMedia: $('[data-hero-media]'), heroText: $('[data-hero-text]'),
    words: $('[data-scene="words"]'), wordEls: $$('[data-word]'),
    day: $('[data-scene="day"]'), dayStage: $('[data-day-stage]'), dayTime: $('[data-day-time]'), dayMoment: $('[data-day-moment]'), hH: $('[data-hand="h"]'), hM: $('[data-hand="m"]'), ring: $('[data-day-ring]'),
    worlds: $('[data-scene="worlds"]'), wStage: $('[data-w-stage]'), wText: $$('[data-w-text]'), wImg: $$('[data-w-img]'),
    best: $('[data-scene="best"]'), bestTrack: $('[data-best-track]'),
    room: $('[data-scene="room"]'), roomTrack: $('[data-room-track]'), roomItems: $$('[data-speed]'),
    banner: $('[data-banner]'), bannerImg: $('[data-banner-img]'),
    counter: $('[data-counter]'), counterName: $('[data-counter-name]'), scenes: $$('[data-n]'), settle: $('[data-settle]')
  };
  var lastWorld = -1, wT;
  function prog(el) { if (!el) return 0; var r = el.getBoundingClientRect(), d = r.height - innerHeight; return d <= 0 ? (r.top <= 0 ? 1 : 0) : Math.min(1, Math.max(0, -r.top / d)); }
  function heroRect() {
    var w = innerWidth, h = innerHeight;
    if (w < 768) { var L0 = w * 0.06, R0 = w * 0.94, T0 = h * 0.5, B0 = h * 0.93; return { t: T0, r: w - R0, b: h - B0, l: L0, rad: (R0 - L0) / 2 }; }
    var aw = Math.min(w * 0.36, (h * 0.78) * 0.8), L = w * 0.58 - aw * 0.1, T = h * 0.14, R = L + aw, B = T + Math.min(h * 0.78, aw * 1.25);
    return { t: T, r: Math.max(0, w - R), b: Math.max(0, h - B), l: L, rad: aw / 2 };
  }
  function lerpHex(a, b, t) { var pa = [1, 3, 5].map(function (i) { return parseInt(a.slice(i, i + 2), 16); }), pb = [1, 3, 5].map(function (i) { return parseInt(b.slice(i, i + 2), 16); }); return pa.map(function (v, i) { return Math.round(v + (pb[i] - v) * t); }); }
  function dayColor(p) { var i = 0; while (i < DAY.length - 2 && p > DAY[i + 1][0]) i++; return lerpHex(DAY[i][1], DAY[i + 1][1], Math.min(1, Math.max(0, (p - DAY[i][0]) / (DAY[i + 1][0] - DAY[i][0])))); }
  function moment(hr) { return hr < 12 ? 'Morning flat whites.' : hr < 18 ? 'Afternoon coolers.' : hr < 21 ? 'Golden hour on the swings.' : hr < 24 ? 'Late-night lattes.' : 'Dessert after midnight.'; }
  function setWorld(i) {
    var w = W[i];
    // Background cross-fades; outgoing text/image leave first, ink + incoming swap at the 50% mark.
    var first = lastWorld < 0;
    E.wStage.style.backgroundColor = w.c.bg;
    clearTimeout(wT);
    E.wText.forEach(function (n, k) { if (k !== i) { n.style.opacity = '0'; n.style.transform = 'translateY(' + (k < i ? -24 : 24) + 'px)'; n.style.pointerEvents = 'none'; } });
    E.wImg.forEach(function (n, k) { if (k !== i) n.style.opacity = '0'; });
    var swap = function () {
      E.wStage.style.color = w.c.ink;
      var t = E.wText[i]; if (t) { t.style.opacity = '1'; t.style.transform = 'none'; t.style.pointerEvents = 'auto'; }
      var im = E.wImg[i]; if (im) im.style.opacity = '1';
    };
    if (first) swap(); else wT = setTimeout(swap, 300);
    $$('[data-w-dot]').forEach(function (n, k) { n.style.opacity = k === i ? '1' : '.45'; });
    lastWorld = i;
  }
  function goWorld(i) {
    if (reduce) { setWorld(i); return; }
    var el = E.worlds;
    scrollTo({ top: el.getBoundingClientRect().top + scrollY + ((i + 0.5) / 6) * (el.offsetHeight - innerHeight), behavior: 'smooth' });
  }
  function staticState() {
    var r = heroRect(); E.heroMedia.style.clipPath = 'inset(' + r.t + 'px ' + r.r + 'px ' + r.b + 'px ' + r.l + 'px round ' + r.rad + 'px ' + r.rad + 'px 20px 20px)';
    E.wordEls.forEach(function (n) { n.style.opacity = '1'; });
    setWorld(0);
  }
  function frame() {
    var vh = innerHeight, vw = innerWidth;
    // 01 hero: arch window grows to full bleed, text lifts away, video scrubs (desktop/tablet).
    var p1 = prog(E.hero), e1 = p1 * p1 * (3 - 2 * p1), r = heroRect(), k = 1 - e1;
    E.heroMedia.style.clipPath = 'inset(' + (r.t * k).toFixed(1) + 'px ' + (r.r * k).toFixed(1) + 'px ' + (r.b * k).toFixed(1) + 'px ' + (r.l * k).toFixed(1) + 'px round ' + (r.rad * k).toFixed(1) + 'px ' + (r.rad * k).toFixed(1) + 'px ' + (20 * k).toFixed(1) + 'px ' + (20 * k).toFixed(1) + 'px)';
    E.heroText.style.opacity = Math.max(0, 1 - p1 * 2.4).toFixed(3);
    E.heroText.style.transform = 'translateY(' + (-p1 * 140).toFixed(1) + 'px)';
    var v = video;
    if (v && scrubReady && !scrubFail && v.duration) {
      if (v.seeking) { if (performance.now() - seekAt > 600) toLoop(); }
      else { var target = p1 * (v.duration - 0.1); if (Math.abs(v.currentTime - target) > 0.04) { seekAt = performance.now(); v.currentTime = target; } }
    }
    // 02 words light up in reading order.
    var p2 = prog(E.words), lit = p2 * (E.wordEls.length + 6) - 3;
    E.wordEls.forEach(function (el, i) { el.style.opacity = (0.16 + 0.84 * Math.min(1, Math.max(0, lit - i))).toFixed(3); });
    // 03 the 18-hour day: hands run 8 AM to 2 AM, page tints day to night.
    var p3 = prog(E.day), hr = 8 + 18 * p3;
    var rgb = dayColor(p3), lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255, darkDay = lum < 0.5;
    E.dayStage.style.backgroundColor = 'rgb(' + rgb.join(',') + ')'; E.dayStage.style.color = darkDay ? '#FBF6EE' : '#270402';
    E.hH.style.transform = 'rotate(' + ((hr % 12) * 30).toFixed(2) + 'deg)'; E.hM.style.transform = 'rotate(' + (((hr % 1) * 60) * 6).toFixed(2) + 'deg)';
    E.ring.setAttribute('stroke-dashoffset', (1105.84 * (1 - p3)).toFixed(1));
    var tl = fmtTime(hr % 24); if (E.dayTime.textContent !== tl) E.dayTime.textContent = tl;
    var ml = moment(hr); if (E.dayMoment.textContent !== ml) E.dayMoment.textContent = ml;
    // 04 worlds: page colour morphs per world, the arch actor turns slightly with scroll.
    var p4 = prog(E.worlds), wi = Math.min(5, Math.floor(p4 * 6)), local = p4 * 6 - wi;
    if (wi !== lastWorld) setWorld(wi);
    var img = E.wImg[wi]; if (img) img.style.transform = 'scale(' + (1.04 + local * 0.05).toFixed(3) + ') rotate(' + ((local - 0.5) * 4).toFixed(2) + 'deg)';
    // 05 best sellers slide past the fixed cup.
    var p5 = prog(E.best), tw = E.bestTrack.scrollWidth;
    E.bestTrack.style.transform = 'translate(' + (vw - p5 * (vw + tw)).toFixed(1) + 'px, -50%)';
    // 06 horizontal tour of the room with drifting arches.
    var p6 = prog(E.room), dist = Math.max(0, E.roomTrack.scrollWidth - vw);
    E.roomTrack.style.transform = 'translateX(' + (-p6 * dist).toFixed(1) + 'px)';
    E.roomItems.forEach(function (el) { el.style.transform = 'translateY(' + ((p6 - 0.5) * +el.dataset.speed * 90).toFixed(1) + 'px)'; });
    // 07 banner wipe.
    var br = E.banner.getBoundingClientRect(), pb = Math.min(1, Math.max(0, (vh - br.top) / (vh * 0.75)));
    E.banner.style.clipPath = 'inset(0 ' + ((1 - pb) * 100).toFixed(2) + '% 0 0 round 18px)';
    E.bannerImg.style.transform = 'scale(' + (1.15 - 0.15 * pb).toFixed(3) + ')';
    // Section counter + nav tone.
    var cur = E.scenes[0];
    E.scenes.forEach(function (sc) { if (sc.getBoundingClientRect().top <= vh * 0.5) cur = sc; });
    if (cur && E.counter.textContent !== cur.dataset.n) { E.counter.textContent = cur.dataset.n; E.counterName.textContent = cur.dataset.name; }
    var at = function (el) { if (!el) return false; var q = el.getBoundingClientRect(); return q.top <= 40 && q.bottom > 40; };
    var settleTop = E.settle ? E.settle.getBoundingClientRect().top : 1e9;
    var navDark = (at(E.day) && darkDay) || (at(E.worlds) && W[wi].dark) || settleTop <= 40;
    if (navDark !== page.navDark) page.set({ navDark: navDark });
  }

  // ---- Social wall tag -------------------------------------------------------------------------------
  var wall = $('[data-ref="wallRef"]'), tag = $('[data-ref="tagRef"]');
  var dotButtons = $$('[data-w-dot]');
  FuelParts.hooks(document.body, {
    skipLoader: lift,
    addItem: function (e) { var d = e.currentTarget.dataset; dispatchEvent(new CustomEvent('fuel-add', { detail: { add: d.add, world: d.world } })); },
    'x.go': function (e) { goWorld(dotButtons.indexOf(e.currentTarget)); },
    wallEnter: function () { tag.style.opacity = '1'; },
    wallLeave: function () { tag.style.opacity = '0'; },
    wallMove: function (e) {
      if (e.pointerType !== 'mouse') return;
      var b = wall.getBoundingClientRect();
      tag.style.transform = 'translate(' + (e.clientX - b.left + 16).toFixed(0) + 'px, ' + (e.clientY - b.top + 16).toFixed(0) + 'px)';
    }
  });

  page.on(layout);
  layout();
  renderLoader();
  var realNow = $('[data-real-now] span');
  var st = function () {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    var h = +parts.find(function (p) { return p.type === 'hour'; }).value % 24, mi = +parts.find(function (p) { return p.type === 'minute'; }).value;
    var open = h >= 8 || h < 2;
    page.set({ open: open });
    realNow.textContent = 'Right now in Lahore: ' + fmtTime(h + mi / 60) + ' · ' + (open ? 'Open' : 'Closed');
  };
  st(); setInterval(st, 20000);
  preload(loadScrub());
  if (!reduce) { var loop = function () { frame(); requestAnimationFrame(loop); }; loop(); }
  else staticState();
  if (video) { video.muted = true; if (loopVideo()) { var pl = video.play(); if (pl && pl.catch) pl.catch(function () {}); } else video.pause(); }
})();
