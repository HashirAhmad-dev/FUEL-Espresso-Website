// THE FUEL cursor: arch ring (lerp 0.18) + coffee-bean dot. Fine pointers only, off under reduced motion.
(function () {
  if (window.__fuelCursor) return; window.__fuelCursor = 1;
  var fine = matchMedia('(hover: hover) and (pointer: fine)'), rm = matchMedia('(prefers-reduced-motion: reduce)');
  if (!fine.matches || rm.matches) return;
  var BEAN = '<svg viewBox="0 0 10 13" width="10" height="13" style="display:block;overflow:visible"><ellipse cx="5" cy="6.5" rx="4.4" ry="6" fill="#3A1A0F" stroke="#FBF6EE" stroke-width=".8"/><path d="M5 1.3C3.4 4.2 6.6 8.8 5 11.7" fill="none" stroke="#E29A64" stroke-width="1.1" stroke-linecap="round"/></svg>';
  function start() {
    var d = document, root = d.documentElement;
    var st = d.createElement('style');
    st.textContent = 'html.fuel-cur,html.fuel-cur *{cursor:none!important}' +
      'html.fuel-cur input,html.fuel-cur textarea,html.fuel-cur select,html.fuel-cur [contenteditable],html.fuel-cur iframe{cursor:auto!important}';
    d.head.appendChild(st);
    var ring = d.createElement('div'), bean = d.createElement('div');
    ring.setAttribute('aria-hidden', 'true'); bean.setAttribute('aria-hidden', 'true');
    ring.style.cssText = 'position:fixed;left:0;top:0;z-index:10000;pointer-events:none;box-sizing:border-box;width:34px;height:34px;border:1.5px solid #E29A64;border-radius:50%;display:flex;align-items:center;justify-content:center;opacity:0;' +
      'transition:width .3s cubic-bezier(.16,1,.3,1),height .3s cubic-bezier(.16,1,.3,1),opacity .2s;will-change:transform';
    bean.style.cssText = 'position:fixed;left:0;top:0;z-index:10001;pointer-events:none;opacity:0;transition:opacity .2s;will-change:transform';
    bean.innerHTML = BEAN;
    d.body.appendChild(ring); d.body.appendChild(bean);
    var mx = -100, my = -100, rx = -100, ry = -100, lx = 0, ly = 0, ang = 0, on = false, hidden = false, raf = 0, alive = true;
    function show(v) { ring.style.opacity = v ? '1' : '0'; bean.style.opacity = v ? '1' : '0'; }
    function setHover(on) { var z = on ? '48px' : '34px'; ring.style.width = z; ring.style.height = z; }
    function hot(t) {
      var el = t.closest && t.closest('a,button,[role="button"],[role="tab"],article,summary,[data-cursor]');
      return !!el && !el.disabled && el.getAttribute('aria-disabled') !== 'true';
    }
    function loop() {
      if (!alive) return;
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = 'translate(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px) translate(-50%,-50%)';
      bean.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%) rotate(' + ang.toFixed(1) + 'deg)';
      raf = requestAnimationFrame(loop);
    }
    function move(e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY;
      var dx = mx - lx, dy = my - ly;
      if (dx * dx + dy * dy > 4) { ang = Math.atan2(dy, dx) * 180 / Math.PI + 90; lx = mx; ly = my; }
      if (!on) { on = true; rx = mx; ry = my; root.classList.add('fuel-cur'); }
      if (!hidden) show(true);
    }
    function over(e) {
      var t = e.target;
      if (t.closest && t.closest('input,textarea,select,[contenteditable],iframe')) { hidden = true; show(false); return; }
      if (hidden) { hidden = false; if (on) show(true); }
      setHover(hot(t));
    }
    function burst(e) {
      if (e.button !== 0 || hidden) return;
      for (var i = 0; i < 6; i++) {
        var p = d.createElement('div'), a = (i / 6) * Math.PI * 2 + Math.random() * 0.6, dist = 26 + Math.random() * 18, rot = Math.random() * 360;
        p.setAttribute('aria-hidden', 'true');
        p.style.cssText = 'position:fixed;left:0;top:0;z-index:10001;pointer-events:none;width:7px';
        p.innerHTML = BEAN.replace('width="10" height="13"', 'width="7" height="9"');
        d.body.appendChild(p);
        var x0 = mx - 3.5, y0 = my - 4.5;
        p.animate([
          { transform: 'translate(' + x0 + 'px,' + y0 + 'px) rotate(' + rot + 'deg) scale(1)', opacity: 1 },
          { transform: 'translate(' + (x0 + Math.cos(a) * dist) + 'px,' + (y0 + Math.sin(a) * dist + 10) + 'px) rotate(' + (rot + 180) + 'deg) scale(.6)', opacity: 0 }
        ], { duration: 620, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' }).finished.then((function (n) { return function () { n.remove(); }; })(p));
      }
    }
    function leave(e) { if (!e.relatedTarget) show(false); }
    function teardown() {
      alive = false; cancelAnimationFrame(raf);
      removeEventListener('pointermove', move); d.removeEventListener('pointerover', over); removeEventListener('pointerdown', burst); d.removeEventListener('pointerout', leave);
      root.classList.remove('fuel-cur'); ring.remove(); bean.remove(); st.remove();
    }
    addEventListener('pointermove', move, { passive: true });
    d.addEventListener('pointerover', over, { passive: true });
    addEventListener('pointerdown', burst, { passive: true });
    d.addEventListener('pointerout', leave, { passive: true });
    var off = function () { if (rm.matches || !fine.matches) teardown(); };
    rm.addEventListener ? rm.addEventListener('change', off) : rm.addListener(off);
    fine.addEventListener ? fine.addEventListener('change', off) : fine.addListener(off);
    loop();
  }
  if (document.body) start(); else addEventListener('DOMContentLoaded', start);
})();
