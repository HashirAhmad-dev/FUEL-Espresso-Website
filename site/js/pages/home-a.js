// Home, Variant A ("cinematic"): intro curtain, hero video, live Lahore clock, product rail, reveals.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  var timers = [];
  var later = function (fn, ms) { timers.push(setTimeout(fn, ms)); };

  var intro = (function () { try { return sessionStorage.getItem('fuel-intro') ? 'none' : 'start'; } catch (e) { return 'none'; } })();
  var s = { now: null, hover: null, intro: intro };
  var page = FuelParts.page({ nav: { page: 'home' }, footer: { homeHref: '/' } });

  // Live Asia/Karachi wall-clock time, independent of the visitor's own timezone.
  function clock() {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).formatToParts(new Date());
    var g = function (t) { return +parts.find(function (p) { return p.type === t; }).value; };
    var h = g('hour') % 24, m = g('minute'), sec = g('second');
    var open = h >= 8 || h < 2, h12 = h % 12 === 0 ? 12 : h % 12;
    return { h: h, m: m, s: sec, open: open, label: h12 + ':' + String(m).padStart(2, '0') + ' ' + (h < 12 ? 'AM' : 'PM') };
  }

  // ---- Hero media ---------------------------------------------------------------------------------
  var hero = $('[data-ref="heroRef"]'), poster = $('[data-poster]'), tpl = $('template[data-video]'), video = null;
  if (!saveData && !reduce) { video = tpl.content.firstElementChild; tpl.replaceWith(video); } else tpl.remove();
  var heroRow = $('[data-hero="4"]'), heroRowParent = heroRow.parentNode;

  function layout() {
    var bp = page.bp();
    [video, poster].forEach(function (el) {
      if (!el) return;
      var mask = bp === 'phone' ? 'linear-gradient(to bottom, transparent 0%, #000 24%)' : 'linear-gradient(to right, transparent 0%, #000 ' + (bp === 'desktop' ? 24 : 16) + '%)';
      el.style.top = bp === 'phone' ? '42%' : '0';
      el.style.height = bp === 'phone' ? '58%' : '100%';
      el.style.transform = bp === 'desktop' ? 'translateX(16%)' : bp === 'tablet' ? 'translateX(8%)' : 'none';
      el.style.webkitMaskImage = mask; el.style.maskImage = mask;
    });
    if (bp !== 'phone' && !heroRow.isConnected) heroRowParent.appendChild(heroRow);
    if (bp === 'phone' && heroRow.isConnected) heroRow.remove();
    $('[data-mid]').style.marginTop = bp === 'desktop' ? '72px' : '0';
    $('[data-social]').style.gridTemplateColumns = bp === 'desktop' ? 'repeat(6, minmax(0,1fr))' : bp === 'tablet' ? 'repeat(3, minmax(0,1fr))' : 'repeat(2, minmax(0,1fr))';
  }

  function setupVideo() {
    if (!video) return;
    video.muted = true;
    var play = function () { var p = video.play(); if (p && p.catch) p.catch(function () {}); };
    play();
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es[0].isIntersecting && !document.hidden ? play() : video.pause(); }).observe(hero);
    document.addEventListener('visibilitychange', function () { document.hidden ? video.pause() : play(); });
  }

  // ---- Intro curtain ------------------------------------------------------------------------------
  var curtain = $('[data-intro]');
  function renderIntro() {
    if (s.intro === 'none') { if (curtain.isConnected) curtain.remove(); return; }
    curtain.style.transform = s.intro === 'lift' ? 'translateY(-100%)' : 'none';
    curtain.style.opacity = s.intro === 'fade' ? 0 : 1;
    $('[data-intro-inner]').style.opacity = s.intro === 'lift' ? 0 : 1;
    $('[data-intro-fill]').style.clipPath = s.intro === 'start' ? 'inset(100% 0 0 0)' : 'inset(0 0 0 0)';
  }
  function setIntro(v) { s.intro = v; renderIntro(); }
  function lift() {
    if (s.intro === 'lift' || s.intro === 'none') return;
    setIntro('lift');
    $$('[data-hero]').forEach(function (el, i) {
      el.style.transition = 'opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1)';
      el.style.transitionDelay = (380 + i * 90) + 'ms';
      requestAnimationFrame(function () { el.style.opacity = '1'; el.style.transform = 'none'; });
    });
    later(function () { setIntro('none'); }, 1000);
  }
  function runIntro() {
    if (s.intro === 'none' || reduce) {
      if (s.intro !== 'none') {
        setIntro('pour');
        later(function () { setIntro('fade'); }, 900);
        later(function () { setIntro('none'); }, 1400);
      }
      return;
    }
    try { sessionStorage.setItem('fuel-intro', '1'); } catch (e) {}
    $$('[data-hero]').forEach(function (el) { el.style.opacity = '0'; el.style.transform = 'translateY(32px)'; });
    requestAnimationFrame(function () { requestAnimationFrame(function () { setIntro('pour'); }); });
    later(lift, 1700);
  }

  // ---- 18-hour clock ------------------------------------------------------------------------------
  // 12-hour analog face. Outer ring shows the open stretch of the current half-day (AM: 12-2 and 8-12, PM: all).
  var Q = function (x, r) { var a = (x / 12) * Math.PI * 2 - Math.PI / 2; return [+(200 + r * Math.cos(a)).toFixed(2), +(200 + r * Math.sin(a)).toFixed(2)]; };
  var arc = function (x0, x1) { var p0 = Q(x0, 176), p1 = Q(x1, 176); return 'M ' + p0[0] + ' ' + p0[1] + ' A 176 176 0 ' + (x1 - x0 > 6 ? 1 : 0) + ' 1 ' + p1[0] + ' ' + p1[1]; };
  var openAt = function (h) { return h >= 8 || h < 2; };
  var dial = $('[data-clock]'), segEls = $$('[data-seg]'), numEls = $$('[data-num]'), sec = $('[data-ref="secRef"]');
  var caption = $('[data-caption]'), hits = $$('[data-on-mouseenter="n.enter"]');
  function renderClock() {
    var now = s.now || { h: 12, m: 0, s: 0, open: true, label: '' };
    var am = now.h < 12;
    var to24 = function (n) { return (n % 12) + (am ? 0 : 12); };
    (am ? [[0, 2], [8, 12]] : [[0, 6], [6, 12]]).forEach(function (r, i) { segEls[i].setAttribute('d', arc(r[0], r[1])); });
    numEls.forEach(function (el, i) { el.setAttribute('opacity', openAt(to24(i === 0 ? 12 : i)) ? 1 : 0.32); });
    $('[data-hand="h"]').style.transform = 'rotate(' + ((now.h % 12) + now.m / 60) * 30 + 'deg)';
    $('[data-hand="m"]').style.transform = 'rotate(' + (now.m + now.s / 60) * 6 + 'deg)';
    sec.style.transform = 'rotate(' + now.s * 6 + 'deg)';
    dial.setAttribute('aria-label', now.label ? 'Clock showing ' + now.label + ' in Lahore. THE FUEL is open 8 AM to 2 AM.' : 'Clock showing the time in Lahore');
    caption.firstElementChild.style.background = now.open ? '#5E9E4B' : '#C0603A';
    var hv = s.hover;
    caption.lastElementChild.textContent = hv != null
      ? hv + ' ' + (am ? 'AM' : 'PM') + ' · ' + (openAt(to24(hv)) ? 'Open' : 'Closed')
      : now.label + ' in Lahore · ' + (now.open ? 'Open, closes 2 AM' : 'Closed, opens 8 AM');
  }
  function setNow(c) { s.now = c; page.set({ open: c.open }); renderClock(); }

  // ---- Reveals and rail ---------------------------------------------------------------------------
  function setupReveal() {
    if (reduce || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.opacity = '1'; e.target.style.transform = 'none';
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    $$('[data-reveal]').forEach(function (el) {
      if (el.getBoundingClientRect().top < innerHeight * 0.9) return;
      el.style.opacity = '0'; el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1)';
      el.style.transitionDelay = (+el.dataset.delay || 0) + 'ms';
      io.observe(el);
    });
  }
  var rail = $('[data-ref="railRef"]'), dragged = false;
  function setupRail() {
    var down = false, sx = 0, sl = 0;
    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; dragged = false; sx = e.clientX; sl = rail.scrollLeft;
      rail.style.scrollSnapType = 'none'; rail.style.cursor = 'grabbing';
    });
    rail.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx;
      if (Math.abs(dx) > 5) dragged = true;
      rail.scrollLeft = sl - dx;
    });
    var up = function () {
      if (!down) return; down = false;
      rail.style.cursor = 'grab';
      var card = rail.firstElementChild, step = card ? card.offsetWidth + parseFloat(getComputedStyle(rail).columnGap || 0) : 1;
      rail.scrollTo({ left: Math.round(rail.scrollLeft / step) * step, behavior: reduce ? 'auto' : 'smooth' });
      later(function () { rail.style.scrollSnapType = 'x mandatory'; }, 450);
    };
    rail.addEventListener('pointerup', up);
    rail.addEventListener('pointerleave', up);
  }
  function railBy(dir) {
    var card = rail.firstElementChild;
    var step = card ? card.offsetWidth + parseFloat(getComputedStyle(rail).columnGap || 0) : 300;
    rail.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' });
  }

  FuelParts.hooks(document.body, {
    skipIntro: function () { reduce ? setIntro('none') : lift(); },
    addItem: function (e) { var d = e.currentTarget.dataset; dispatchEvent(new CustomEvent('fuel-add', { detail: { add: d.add, world: d.world } })); },
    railPrev: function () { railBy(-1); },
    railNext: function () { railBy(1); },
    cardClick: function (e) { if (dragged) { e.preventDefault(); dragged = false; } },
    'n.enter': function (e) { var i = hits.indexOf(e.currentTarget); s.hover = i === 0 ? 12 : i; renderClock(); },
    dialLeave: function () { s.hover = null; renderClock(); }
  });

  page.on(layout);
  layout();
  renderIntro();
  renderClock();
  setNow(clock());
  setInterval(function () {
    var c = clock();
    sec.style.transform = 'rotate(' + c.s * 6 + 'deg)';
    if (!s.now || c.m !== s.now.m) setNow(c);
  }, 1000);
  setupReveal();
  setupRail();
  setupVideo();
  runIntro();
})();
