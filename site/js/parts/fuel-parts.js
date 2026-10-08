// THE FUEL shared parts: nav (with bag drawer, reservation dialog and toast), visit section and footer.
// Each part keeps its state in a small class, renders its markup with a template from fuel-views.js,
// and patches the live DOM in place, so focus, input values and CSS transitions survive re-renders.
// Pages ship the first render as static markup; mounting adopts it and only patches what changed.
(function () {
  var V = window.FuelViews;

  var escT = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;'); };
  var escA = function (s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;'); };

  // Template helpers. Attribute rules match React: null/undefined/false drop the attribute (aria-*/data-* keep "false").
  function makeH(handlers) {
    return {
      esc: escA,
      text: function (x) { return x == null || typeof x === 'boolean' ? '' : '<span>' + escT(x) + '</span>'; },
      attr: function (n, x) {
        if (x == null || typeof x === 'function' || typeof x === 'object') return '';
        if (typeof x === 'boolean') {
          if (n.indexOf('aria-') === 0 || n.indexOf('data-') === 0) return ' ' + n + '="' + x + '"';
          return x ? ' ' + n : '';
        }
        return ' ' + n + '="' + escA(x) + '"';
      },
      on: function (evt, fn) {
        if (typeof fn !== 'function') return '';
        handlers.push(fn);
        return ' data-h-' + evt + '="' + (handlers.length - 1) + '"';
      }
    };
  }

  // ---- DOM patching -------------------------------------------------------------------------------
  function same(a, b) {
    return a.nodeType === b.nodeType && a.nodeName === b.nodeName &&
      (a.nodeType !== 1 || a.getAttribute('data-k') === b.getAttribute('data-k'));
  }
  function patch(x, y) {
    if (x.nodeType !== 1) { if (x.data !== y.data) x.data = y.data; return; }
    var i, a;
    for (i = x.attributes.length - 1; i >= 0; i--) { a = x.attributes[i].name; if (!y.hasAttribute(a)) x.removeAttribute(a); }
    for (i = 0; i < y.attributes.length; i++) { a = y.attributes[i]; if (x.getAttribute(a.name) !== a.value) x.setAttribute(a.name, a.value); }
    if (x.nodeName === 'INPUT' || x.nodeName === 'TEXTAREA') {
      var val = y.getAttribute('value') || '';
      if (x.value !== val) x.value = val;
      if (x.nodeName === 'TEXTAREA') return;
    }
    morphChildren(x, y);
  }
  function morphChildren(from, to) {
    var b = Array.prototype.slice.call(to.childNodes), x = from.firstChild, y, nx;
    for (var i = 0; i < b.length; i++) {
      y = b[i];
      if (!x) { from.appendChild(y); continue; }
      if (same(x, y)) { patch(x, y); x = x.nextSibling; continue; }
      if (b[i + 1] && same(x, b[i + 1])) { from.insertBefore(y, x); continue; }
      nx = x.nextSibling;
      if (nx && same(nx, y)) { from.removeChild(x); patch(nx, y); x = nx.nextSibling; continue; }
      from.replaceChild(y, x); x = y.nextSibling;
    }
    while (x) { nx = x.nextSibling; from.removeChild(x); x = nx; }
  }
  function morph(root, html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    morphChildren(root, t.content);
  }

  // ---- Events: delegated per root, with React-like currentTarget ------------------------------------
  function wrap(e, el) {
    return {
      nativeEvent: e, type: e.type, target: e.target, currentTarget: el, key: e.key,
      clientX: e.clientX, clientY: e.clientY, pointerType: e.pointerType,
      preventDefault: function () { e.preventDefault(); },
      stopPropagation: function () { this.stopped = true; e.stopPropagation(); }
    };
  }
  function delegate(root, handlers, attr) {
    var bubble = function (e) {
      for (var el = e.target; el && el !== root.parentNode; el = el.parentNode) {
        if (el.nodeType !== 1) continue;
        var i = el.getAttribute(attr + e.type);
        if (i == null) continue;
        var fn = handlers(i), w = wrap(e, el);
        if (fn) fn(w);
        if (w.stopped) return;
      }
    };
    var direct = function (e) {
      var el = e.target;
      if (!el || el.nodeType !== 1 || !root.contains(el)) return;
      var i = el.getAttribute(attr + e.type);
      if (i == null) return;
      var fn = handlers(i);
      if (fn) fn(wrap(e, el));
    };
    ['click', 'input'].forEach(function (t) { root.addEventListener(t, bubble); });
    ['load', 'mouseenter', 'mouseleave', 'pointerenter', 'pointerleave'].forEach(function (t) { root.addEventListener(t, direct, true); });
    root.addEventListener('pointermove', bubble);
  }

  // ---- Part base ------------------------------------------------------------------------------------
  function createRef() { return { current: null }; }
  function Part() {}
  Part.prototype.init = function (props) { this.props = props || {}; this.handlers = []; return this; };
  Part.prototype.html = function () {
    var hs = [], out = this.view(this.renderVals(), makeH(hs));
    this.handlers = hs;
    return out;
  };
  Part.prototype.mount = function (root) {
    var self = this;
    this.root = root;
    delegate(root, function (i) { return self.handlers[+i]; }, 'data-h-');
    this.update();
    if (this.componentDidMount) this.componentDidMount();
    return this;
  };
  Part.prototype.update = function () {
    if (!this.root) return;
    morph(this.root, this.html());
    var self = this;
    this.root.querySelectorAll('[data-ref]').forEach(function (el) { var r = self[el.getAttribute('data-ref')]; if (r) r.current = el; });
  };
  Part.prototype.schedule = function () {
    var self = this;
    if (this.queued) return;
    this.queued = true;
    queueMicrotask(function () { self.queued = false; self.update(); });
  };
  Part.prototype.setState = function (s) {
    var n = typeof s === 'function' ? s(this.state) : s;
    this.state = Object.assign({}, this.state, n);
    this.schedule();
  };
  Part.prototype.setProps = function (p) {
    var prev = this.props, changed = false;
    for (var k in p) if (p[k] !== prev[k]) changed = true;
    if (!changed) return;
    this.props = Object.assign({}, prev, p);
    this.schedule();
  };
  function define(view, setup) {
    function C(props) {
      this.init(props);
      setup.call(this);
    }
    C.prototype = Object.create(Part.prototype);
    C.prototype.view = view;
    return C;
  }

  // ---- Nav: links, theme toggle, bag drawer, reservation dialog, toast ------------------------------
  var Nav = define(V.nav, function () {
    var self = this;
    this.state = {
      menuOpen: false, bagOpen: false, resOpen: false, bag: [], toast: null, w: innerWidth,
      mode: 'Pickup', when: 'As soon as possible', oName: '', oPhone: '', oErr: {}, orderDone: false, orderMsg: '',
      day: 0, part: 0, time: null, seats: 2, seat: 'Any', rName: '', rPhone: '', rNote: '', rErr: {}, resDone: false
    };
    this.openBag = function () { clearTimeout(self.tt); self.lock(true); self.setState({ bagOpen: true, resOpen: false, menuOpen: false, toast: null }); };
    this.openRes = function () { self.lock(true); self.setState({ resOpen: true, bagOpen: false, menuOpen: false, resDone: false, rErr: {} }); };
    this.closeAll = function () { self.lock(false); self.setState({ bagOpen: false, resOpen: false, orderDone: false }); };
    this.go = function (e) {
      var href = e.currentTarget.getAttribute('data-href');
      if (!href || self.props.inline) { if (self.props.inline) e.preventDefault(); return; }
      e.preventDefault();
      self.lock(false);
      self.setState({ menuOpen: false, bagOpen: false });
      var u = new URL(href, location.href);
      if (u.pathname === location.pathname) {
        var t = u.searchParams.get('page') === 'visit' ? document.getElementById('visit') : null;
        scrollTo({ top: t ? t.getBoundingClientRect().top + scrollY : 0, behavior: 'smooth' });
        return;
      }
      try { sessionStorage.setItem('fuel-route', '1'); } catch (err) {}
      import(new URL('js/lib/fuel-theme.js', location.href).href).then(function (m) { return m.hairline(); }).then(function () { location.href = href; }, function () { location.href = href; });
    };
    this.placeOrder = function () {
      var s = self.state, err = {};
      if (!s.oName.trim()) err.name = 'Add a name for the order.';
      if (s.oPhone.replace(/\D/g, '').length < 10) err.phone = 'Enter a phone number we can message.';
      if (Object.keys(err).length) { self.setState({ oErr: err }); return; }
      var msg = (s.mode === 'Pickup' ? 'Pickup' : 'Dine in') + ', ' + s.when.toLowerCase() + '. We’ll message ' + s.oPhone + ' on WhatsApp when it’s ready at the 4th floor counter.';
      self.write([]);
      self.setState({ orderDone: true, orderMsg: msg, oErr: {} });
    };
    this.submitRes = function () {
      var s = self.state, err = {};
      if (s.time == null) err.time = 'Pick a time.';
      if (!s.rName.trim()) err.name = 'Add a name for the booking.';
      if (s.rPhone.replace(/\D/g, '').length < 10) err.phone = 'Enter a WhatsApp number.';
      if (Object.keys(err).length) { self.setState({ rErr: err }); return; }
      self.setState({ resDone: true, rErr: {} });
    };
  });
  Nav.prototype.componentDidMount = function () {
    var self = this;
    this.load();
    this.onSpy = function () {
      cancelAnimationFrame(self.spR);
      self.spR = requestAnimationFrame(function () {
        var y = innerHeight * 0.45, hit = null;
        document.querySelectorAll('[data-spy]').forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top <= y && r.bottom > y) hit = el.getAttribute('data-spy'); });
        if (hit !== self.state.spy) self.setState({ spy: hit });
      });
    };
    if (!this.props.inline) { addEventListener('scroll', this.onSpy, { passive: true }); addEventListener('resize', this.onSpy); setTimeout(this.onSpy, 400); }
    addEventListener('fuel-add', function (e) {
      var d = e.detail || {};
      if (!d.add) return;
      var bag = self.read(), f = bag.find(function (x) { return x.name === d.add; });
      if (f) f.qty++; else bag.push({ name: d.add, world: d.world || 'Menu', qty: 1 });
      self.write(bag);
      clearTimeout(self.tt);
      self.setState({ toast: d.add + ' added', orderDone: false });
      self.tt = setTimeout(function () { self.setState({ toast: null }); }, 2800);
    });
    addEventListener('fuel-reserve', function () { self.openRes(); });
    addEventListener('storage', function (e) { if (e.key === 'fuel-bag') self.load(); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') self.closeAll(); });
    addEventListener('resize', function () { self.setState({ w: innerWidth }); });
  };
  Nav.prototype.read = function () { try { return JSON.parse(localStorage.getItem('fuel-bag') || '[]'); } catch (e) { return []; } };
  Nav.prototype.write = function (bag) { try { localStorage.setItem('fuel-bag', JSON.stringify(bag)); } catch (e) {} this.setState({ bag: bag }); };
  Nav.prototype.load = function () { this.setState({ bag: this.read() }); };
  Nav.prototype.lock = function (on) { document.documentElement.style.overflow = on ? 'hidden' : ''; };
  Nav.prototype.lahoreNow = function () {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    var get = function (t) { return +parts.find(function (p) { return p.type === t; }).value; };
    return get('hour') % 24 + get('minute') / 60;
  };
  Nav.prototype.fmt = function (x) { var h = Math.floor(x) % 24, m = Math.round((x % 1) * 60); return (h % 12 === 0 ? 12 : h % 12) + ':' + String(m).padStart(2, '0') + ' ' + (h < 12 ? 'AM' : 'PM'); };
  Nav.prototype.days = function () {
    var out = [];
    for (var i = 0; i < 14; i++) {
      var d = new Date(Date.now() + i * 864e5), f = (function (d) { return function (o) { return new Intl.DateTimeFormat('en-GB', Object.assign({ timeZone: 'Asia/Karachi' }, o)).format(d); }; })(d);
      out.push({ wd: i === 0 ? 'Today' : f({ weekday: 'short' }), n: f({ day: 'numeric' }), mo: f({ month: 'short' }), long: f({ weekday: 'long', day: 'numeric', month: 'long' }) });
    }
    return out;
  };
  Nav.prototype.renderVals = function () {
    var self = this, p = this.props, s = this.state;
    var bp = p.bp != null ? p.bp : 'desktop';
    var demo = p.demo != null ? p.demo : 'none';
    var dark = (p.overDark != null ? p.overDark : false) && demo !== 'scrolled';
    var theme = p.theme != null ? p.theme : 'latte';
    var menuOpen = s.menuOpen || demo === 'menu';
    var page = p.page != null ? p.page : 'home';
    var homeHref = p.homeHref != null ? p.homeHref : '/';
    var active = (!p.inline && s.spy) || page;
    var raw = [
      { k: 'home', label: 'Home', short: 'Home', href: homeHref, icon: 'ph ph-house' },
      { k: 'menu', label: 'Menu', short: 'Menu', href: '/menu', icon: 'ph ph-coffee' },
      { k: 'space', label: 'Our Space', short: 'Space', href: '/space', icon: 'ph ph-armchair' },
      { k: 'visit', label: 'Visit', short: 'Visit', href: '/space?page=visit', icon: 'ph ph-map-pin' }
    ];
    var links = raw.map(function (l, i) {
      var on = l.k === active, hov = demo === 'hover' && i === 2;
      return Object.assign({}, l, {
        current: on ? 'page' : undefined,
        bg: on ? (dark ? '#E29A64' : 'var(--accent)') : hov ? 'rgba(226,154,100,.24)' : 'transparent',
        ink: on ? (dark ? '#270402' : 'var(--accentInk)') : 'inherit',
        dockBg: on ? 'var(--accent)' : 'transparent', dockInk: on ? 'var(--accentInk)' : 'var(--ink)'
      });
    });
    var count = s.bag.reduce(function (a, b) { return a + b.qty; }, 0);
    var chip = function (on) { return { bg: on ? 'var(--ink)' : 'transparent', ink: on ? 'var(--bg)' : 'var(--ink)', border: on ? 'var(--ink)' : 'var(--line)', on: on ? 'true' : 'false' }; };
    var seg = function (on) { return { bg: on ? 'var(--bg)' : 'transparent', ink: 'var(--ink)', shadow: on ? '0 2px 8px rgba(39,4,2,.12)' : 'none', on: on ? 'true' : 'false' }; };
    // Reservation slots: last seating 1:00 AM; today hides slots less than 30 minutes away.
    var PARTS = [['Morning', 8, 12], ['Afternoon', 12, 17], ['Evening', 17, 21], ['Late night', 21, 25.01]];
    var now = this.lahoreNow(), nowAdj = now < 2 ? now + 24 : now;
    var a0 = PARTS[s.part][1], a1 = PARTS[s.part][2];
    var slots = [];
    for (var t = a0; t < a1; t += 0.5) {
      (function (t) {
        var past = s.day === 0 && t < nowAdj + 0.5, on = s.time === t;
        slots.push({ label: self.fmt(t), on: on ? 'true' : 'false', off: past, op: past ? 0.35 : 1, cursor: past ? 'not-allowed' : 'pointer', strike: past ? 'line-through' : 'none',
          bg: on ? 'var(--ink)' : 'transparent', ink: on ? 'var(--bg)' : 'var(--ink)', border: on ? 'var(--ink)' : 'var(--line)',
          pick: function () { self.setState({ time: t, rErr: Object.assign({}, self.state.rErr, { time: null }) }); } });
      })(t);
    }
    var days = this.days();
    var dayList = days.map(function (d, i) { return Object.assign({}, d, chip(i === s.day), { pick: function () { self.setState({ day: i, time: null }); } }); });
    var err = s.rErr, oe = s.oErr;
    var phone = bp === 'phone';
    var guests = function (n) { return n + ' ' + (n === 1 ? 'guest' : 'guests'); };
    var day = days[s.day];
    return {
      notPhone: !phone, isPhone: phone, isDesktop: bp === 'desktop', isTablet: bp === 'tablet',
      pos: p.inline ? 'relative' : 'fixed', dockGap: p.inline ? '12px' : '0',
      navBg: dark ? 'rgba(39,4,2,.30)' : 'var(--glass)', navInk: dark ? '#FBF6EE' : 'var(--ink)',
      navBorder: dark ? 'rgba(251,246,238,.28)' : 'var(--line)', navShadow: !dark ? '0 10px 40px rgba(39,4,2,.14)' : 'none',
      resBg: dark ? '#E29A64' : 'var(--accent)', resInk: dark ? '#270402' : 'var(--accentInk)',
      chip: p.chip != null ? p.chip : 'Open now', dot: (p.isOpen != null ? p.isOpen : true) ? '#7FBF6A' : '#E29A64',
      showChip: bp === 'tablet' || (bp === 'desktop' && s.w >= 1200),
      chipMargin: bp === 'desktop' ? '0' : 'auto', toggleMargin: '0',
      links: links, menuOpen: menuOpen, showSheet: bp === 'tablet' && menuOpen,
      menuIcon: menuOpen ? 'ph ph-x' : 'ph ph-list',
      toggleMenu: function () { self.setState(function (st) { return { menuOpen: !st.menuOpen }; }); },
      onToggle: p.onToggle || function () {},
      toggleIcon: theme === 'latte' ? 'ph ph-moon' : 'ph ph-sun',
      toggleLabel: theme === 'latte' ? 'Switch to Espresso (night) theme' : 'Switch to Latte (day) theme',
      toggleShort: theme === 'latte' ? 'Night' : 'Day',
      go: this.go, homeHref: homeHref,
      // bag
      openBag: this.openBag, openRes: this.openRes, closeAll: this.closeAll,
      bagOpen: s.bagOpen, hasBag: count > 0, bagCount: count, itemWord: count === 1 ? 'item' : 'items', bagLabel: count ? 'Bag, ' + count + ' ' + (count === 1 ? 'item' : 'items') : 'Bag, empty',
      toast: !!s.toast && !s.bagOpen, toastText: s.toast || '', toastTop: phone ? '80px' : '92px',
      orderDone: s.orderDone, orderMsg: s.orderMsg, bagEmpty: !s.orderDone && count === 0, bagFull: !s.orderDone && count > 0,
      bag: s.bag.map(function (b, i) {
        return Object.assign({}, b, {
          inc: function () { var bag = self.read(); bag[i].qty++; self.write(bag); },
          dec: function () { var bag = self.read(); if (bag[i].qty > 1) bag[i].qty--; else bag.splice(i, 1); self.write(bag); },
          decIcon: b.qty > 1 ? 'ph ph-minus' : 'ph ph-trash', decLabel: b.qty > 1 ? 'One less ' + b.name : 'Remove ' + b.name, incLabel: 'One more ' + b.name
        });
      }),
      modes: ['Pickup', 'Dine in'].map(function (m) { return Object.assign({ label: m }, seg(s.mode === m), { pick: function () { self.setState({ mode: m }); } }); }),
      whenLabel: s.mode === 'Pickup' ? 'Pickup time' : 'Serve it',
      whens: ['As soon as possible', 'In 15 minutes', 'In 30 minutes'].map(function (x) { return Object.assign({ label: x }, chip(s.when === x), { pick: function () { self.setState({ when: x }); } }); }),
      oName: s.oName, oPhone: s.oPhone,
      setOName: function (e) { self.setState({ oName: e.target.value, oErr: Object.assign({}, self.state.oErr, { name: null }) }); },
      setOPhone: function (e) { self.setState({ oPhone: e.target.value, oErr: Object.assign({}, self.state.oErr, { phone: null }) }); },
      oNameErr: oe.name || '', oPhoneErr: oe.phone || '',
      oNameBorder: oe.name ? '#B3261E' : 'var(--line)', oPhoneBorder: oe.phone ? '#B3261E' : 'var(--line)',
      placeOrder: this.placeOrder,
      // reserve
      resOpen: s.resOpen, resDone: s.resDone, resForm: !s.resDone,
      dlgAlign: phone ? 'flex-end' : 'center', dlgPad: phone ? '0' : '24px', dlgMaxH: phone ? '92dvh' : 'calc(100dvh - 48px)', dlgRadius: phone ? '24px 24px 0 0' : '24px',
      days: dayList,
      parts: PARTS.map(function (x, i) { return Object.assign({ label: x[0] }, seg(s.part === i), { pick: function () { self.setState({ part: i, time: null }); } }); }),
      slots: slots, timeErr: err.time || '',
      seats: s.seats, seatWord: s.seats === 1 ? 'guest' : 'guests',
      seatDec: function () { self.setState(function (st) { return { seats: Math.max(1, st.seats - 1) }; }); },
      seatInc: function () { self.setState(function (st) { return { seats: Math.min(12, st.seats + 1) }; }); },
      seatNote: s.seats > 8 ? 'For groups over 8 we call to confirm the swing room.' : 'Up to 12 guests online.',
      seatPrefs: ['Any', 'Swing seats', 'Window', 'Counter'].map(function (x) { return Object.assign({ label: x }, chip(s.seat === x), { pick: function () { self.setState({ seat: x }); } }); }),
      rName: s.rName, rPhone: s.rPhone, rNote: s.rNote,
      setRName: function (e) { self.setState({ rName: e.target.value, rErr: Object.assign({}, self.state.rErr, { name: null }) }); },
      setRPhone: function (e) { self.setState({ rPhone: e.target.value, rErr: Object.assign({}, self.state.rErr, { phone: null }) }); },
      setRNote: function (e) { self.setState({ rNote: e.target.value }); },
      rNameErr: err.name || '', rPhoneErr: err.phone || '',
      rNameBorder: err.name ? '#B3261E' : 'var(--line)', rPhoneBorder: err.phone ? '#B3261E' : 'var(--line)',
      resSummary: (day.wd === 'Today' ? 'Today' : day.wd + ' ' + day.n) + ' · ' + (s.time == null ? 'Pick a time' : this.fmt(s.time)) + ' · ' + guests(s.seats),
      submitRes: this.submitRes,
      sumDate: day.long, sumTime: s.time == null ? '' : this.fmt(s.time), sumSeats: guests(s.seats), sumSeat: s.seat === 'Any' ? 'Any table' : s.seat, sumPhone: s.rPhone
    };
  };

  // ---- Visit: address, live open status, reserve button, lazy map ----------------------------------
  var Visit = define(V.visit, function () {
    var self = this;
    this.state = { now: null, mapOn: false, mapLoaded: false, seen: false };
    this.rootRef = createRef(); this.mapRef = createRef();
    this.onMapLoad = function () { self.setState({ mapLoaded: true }); };
    this.reserve = function () { dispatchEvent(new CustomEvent('fuel-reserve')); };
  });
  Visit.prototype.componentDidMount = function () {
    var self = this;
    var tick = function () { self.setState({ now: self.status() }); };
    tick(); setInterval(tick, 20000);
    var on = function () { self.setState({ mapOn: true }); };
    if (!('IntersectionObserver' in window)) { on(); return; }
    // Start the heavy map request far ahead of the viewport so it is ready on arrival.
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { on(); io.disconnect(); } }, { rootMargin: '2400px 0px' });
    if (this.mapRef.current) io.observe(this.mapRef.current);
    var io2 = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { self.setState({ seen: true }); io2.disconnect(); } }, { threshold: 0.35 });
    if (this.rootRef.current) io2.observe(this.rootRef.current);
  };
  Visit.prototype.status = function () {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    var h = +parts.find(function (p) { return p.type === 'hour'; }).value % 24;
    var open = h >= 8 || h < 2;
    return { open: open, line: open ? 'Open now. Closes at 2 AM.' : 'Closed now. Opens at 8 AM.' };
  };
  Visit.prototype.renderVals = function () {
    var n = this.state.now || { open: true, line: 'Open now. Closes at 2 AM.' };
    return {
      rootRef: this.rootRef, mapRef: this.mapRef,
      draw: !!this.props.draw, fillClip: this.state.seen ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
      dot: n.open ? '#2F6B22' : '#7A1E0E', line: n.line,
      mapOn: this.state.mapOn, mapOp: this.state.mapLoaded ? 1 : 0, loadingOp: this.state.mapLoaded ? 0 : 1,
      onMapLoad: this.onMapLoad, reserve: this.reserve
    };
  };

  // ---- Footer -----------------------------------------------------------------------------------------
  var Footer = define(V.footer, function () { this.state = {}; });
  Footer.prototype.renderVals = function () {
    return { pad: this.props.phone ? '120px' : '40px', homeHref: this.props.homeHref != null ? this.props.homeHref : '/' };
  };

  var PARTS = { nav: Nav, visit: Visit, footer: Footer };

  // ---- Page shell: theme, breakpoint, open status and the three parts ---------------------------------
  // opts: { nav: {page, homeHref}, footer: {homeHref}, visit: {draw} }
  function page(opts) {
    opts = opts || {};
    var api = { theme: 'latte', w: innerWidth, h: innerHeight, open: true, navDark: false, parts: {} };
    api.bp = function () { return api.w < 768 ? 'phone' : api.w < 1024 ? 'tablet' : 'desktop'; };
    var listeners = [];
    api.on = function (fn) { listeners.push(fn); };
    function navProps() {
      return Object.assign({}, opts.nav, { bp: api.bp(), theme: api.theme, overDark: api.navDark, chip: api.open ? 'Open now' : 'Opens at 8 AM', isOpen: api.open, onToggle: onToggle });
    }
    function sync() {
      var P = api.parts;
      if (P.nav) P.nav.setProps(navProps());
      if (P.footer) P.footer.setProps({ phone: api.bp() === 'phone' });
    }
    api.set = function (s) {
      var prevBp = api.bp();
      Object.assign(api, s);
      sync();
      if (api.bp() !== prevBp || 'w' in s || 'h' in s) listeners.forEach(function (fn) { fn(api); });
    };
    function applyTheme(t) {
      api.m.applyVars(api.m.THEMES[t]);
      document.documentElement.style.colorScheme = t === 'latte' ? 'light' : 'dark';
      api.set({ theme: t });
    }
    function onToggle(e) {
      if (!api.m) return;
      var r = e.currentTarget.getBoundingClientRect(), next = api.theme === 'latte' ? 'espresso' : 'latte';
      var apply = function () { applyTheme(next); };
      apply.nextBg = api.m.THEMES[next].bg;
      api.m.saveTheme(next);
      api.m.transition('radial', r.left + r.width / 2, r.top + r.height / 2, apply);
    }
    document.querySelectorAll('[data-part]').forEach(function (el) {
      var name = el.getAttribute('data-part');
      var props = name === 'nav' ? navProps() : name === 'footer' ? Object.assign({ phone: api.bp() === 'phone' }, opts.footer) : Object.assign({}, opts.visit);
      api.parts[name] = new PARTS[name](props).mount(el);
    });
    addEventListener('resize', function () { api.set({ w: innerWidth, h: innerHeight }); });
    import(new URL('js/lib/fuel-theme.js', location.href).href).then(function (m) { api.m = m; applyTheme(m.initialTheme()); });
    return api;
  }

  // Wire data-on-<event>="name" hooks in page markup to a handler table.
  function hooks(root, table) {
    delegate(root, function (name) { return table[name]; }, 'data-on-');
  }

  window.FuelParts = { page: page, hooks: hooks, PARTS: PARTS, makeH: makeH };
})();
