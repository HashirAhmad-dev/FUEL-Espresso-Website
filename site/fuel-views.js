// Markup templates for the shared parts (nav, visit, footer), used by fuel-parts.js.
// Converted 1:1 from the prototype templates; values come from each part's renderVals().
window.FuelViews = {
  nav: (v, H) => `${v.notPhone ? `<header data-fuel-nav="" style="view-transition-name:fuel-nav; position:${H.esc(v.pos ?? '')}; top:16px; left:0; right:0; z-index:50; display:flex; justify-content:center; padding:0 clamp(16px,5vw,72px); pointer-events:none" data-k="if1">
  <nav aria-label="Main" style="pointer-events:auto; position:relative; width:100%; max-width:1296px; height:64px; box-sizing:border-box; display:flex; align-items:center; gap:10px; padding:0 10px; border-radius:999px; background:${H.esc(v.navBg ?? '')}; color:${H.esc(v.navInk ?? '')}; border:1px solid ${H.esc(v.navBorder ?? '')}; backdrop-filter:blur(18px) saturate(140%); -webkit-backdrop-filter:blur(18px) saturate(140%); box-shadow:${H.esc(v.navShadow ?? '')}; transition:background-color .6s, color .6s, box-shadow .4s, border-color .6s; font-family:Jost, sans-serif">
    <a${H.attr("href", v.homeHref)}${H.on("click", v.go, "go")}${H.attr("data-href", v.homeHref)} aria-label="THE FUEL home" style="display:flex; align-items:center; gap:12px; text-decoration:none; color:inherit; min-height:44px; padding-right:8px; border-radius:999px">
      <span style="position:relative; width:44px; height:44px; display:grid; place-items:center; flex:none">
        <svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true" style="position:absolute; inset:0; transform:rotate(-90deg)"><circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="1.5"></circle><circle cx="22" cy="22" r="20" fill="none" stroke="#E29A64" stroke-width="2" stroke-linecap="round" stroke-dasharray="125.7" stroke-dashoffset="125.7" style="animation:fuel-ring linear both; animation-timeline:scroll(root)"></circle></svg>
        <span style="width:19px; height:27px; background:currentColor; -webkit-mask:url('assets/brand/logo/emblem-mono-currentColor.svg') center/contain no-repeat; mask:url('assets/brand/logo/emblem-mono-currentColor.svg') center/contain no-repeat"></span>
      </span>
      <span style="font-family:'Bodoni Moda', serif; font-weight:600; font-size:17px; letter-spacing:.16em; white-space:nowrap">THE FUEL</span>
    </a>
    ${v.isDesktop ? `
      <div style="display:flex; gap:2px; margin-left:auto" data-k="if2">
        ${(v.links || []).map((l, $i) => `
          <a class="ps1"${H.attr("href", l.href)}${H.attr("data-href", l.href)}${H.on("click", v.go, "go")}${H.attr("aria-current", l.current)} style="display:flex; align-items:center; min-height:44px; padding:0 16px; border-radius:999px; text-decoration:none; color:${H.esc(l.ink ?? '')}; background:${H.esc(l.bg ?? '')}; font-size:15px; font-weight:500; letter-spacing:.01em; white-space:nowrap; transition:background-color .25s">${H.text(l.label)}</a>
        `).join('')}
      </div>
    ` : ''}
    ${v.showChip ? `
      <span role="status" style="display:flex; align-items:center; gap:8px; min-height:32px; padding:0 14px; border-radius:999px; border:1px solid ${H.esc(v.navBorder ?? '')}; font-family:'DM Mono', monospace; font-size:12px; letter-spacing:.06em; text-transform:uppercase; white-space:nowrap; margin-left:${H.esc(v.chipMargin ?? '')}" data-k="if3">
        <span aria-hidden="true" style="width:7px; height:7px; border-radius:50%; background:${H.esc(v.dot ?? '')}"></span>${H.text(v.chip)}
      </span>
    ` : ''}
    <button class="ps1 ps2" type="button"${H.on("click", v.onToggle, "onToggle")}${H.attr("aria-label", v.toggleLabel)}${H.attr("title", v.toggleLabel)} style="width:44px; height:44px; flex:none; margin-left:${H.esc(v.toggleMargin ?? '')}; border-radius:50%; border:1px solid ${H.esc(v.navBorder ?? '')}; background:transparent; color:inherit; display:grid; place-items:center; cursor:pointer; font-size:20px"><i${H.attr("class", v.toggleIcon)}></i></button>
    ${v.isDesktop ? `
      <button class="ps3 ps4" type="button"${H.on("click", v.openRes, "openRes")} style="height:44px; flex:none; padding:0 18px; border-radius:999px; border:none; background:${H.esc(v.resBg ?? '')}; color:${H.esc(v.resInk ?? '')}; display:flex; align-items:center; gap:8px; cursor:pointer; font:500 15px Jost, sans-serif; white-space:nowrap; transition:transform .24s cubic-bezier(.16,1,.3,1)" data-k="if4"><i class="ph ph-calendar-check" style="font-size:18px"></i>Reserve</button>
    ` : ''}
    <button class="ps1 ps2" type="button"${H.on("click", v.openBag, "openBag")}${H.attr("aria-label", v.bagLabel)} style="position:relative; width:44px; height:44px; flex:none; border-radius:50%; border:1px solid ${H.esc(v.navBorder ?? '')}; background:transparent; color:inherit; display:grid; place-items:center; cursor:pointer; font-size:20px">
      <i class="ph ph-handbag"></i>
      ${v.hasBag ? `<span aria-hidden="true" style="position:absolute; top:-3px; right:-3px; min-width:20px; height:20px; padding:0 5px; box-sizing:border-box; border-radius:999px; background:#E29A64; color:#270402; font:500 11px/20px 'DM Mono', monospace; text-align:center" data-k="if5">${H.text(v.bagCount)}</span>` : ''}
    </button>
    ${v.isTablet ? `
      <button type="button"${H.on("click", v.toggleMenu, "toggleMenu")}${H.attr("aria-expanded", v.menuOpen)} aria-label="Menu" style="height:44px; padding:0 18px; flex:none; border-radius:999px; border:none; background:${H.esc(v.resBg ?? '')}; color:${H.esc(v.resInk ?? '')}; display:flex; align-items:center; gap:8px; cursor:pointer; font:500 15px Jost, sans-serif" data-k="if6"><i${H.attr("class", v.menuIcon)} style="font-size:18px"></i>Menu</button>
    ` : ''}
    ${v.showSheet ? `
      <div style="position:absolute; top:76px; right:0; width:min(340px, 100%); padding:12px; border-radius:32px; background:var(--glass); color:var(--ink); border:1px solid var(--line); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); box-shadow:0 24px 60px rgba(39,4,2,.22); display:flex; flex-direction:column; gap:2px" data-k="if7">
        ${(v.links || []).map((l, $i) => `
          <a class="ps5"${H.attr("href", l.href)}${H.attr("data-href", l.href)}${H.on("click", v.go, "go")} style="display:flex; align-items:center; justify-content:space-between; min-height:56px; padding:0 18px; border-radius:24px; text-decoration:none; color:var(--ink); font-family:'Bodoni Moda', serif; font-size:26px">${H.text(l.label)}<i class="ph ph-arrow-up-right" style="font-size:18px; color:var(--accent)"></i></a>
        `).join('')}
        <button type="button"${H.on("click", v.openRes, "openRes")} style="margin-top:8px; min-height:52px; border-radius:999px; border:none; background:var(--accent); color:var(--accentInk); display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; font:500 16px Jost, sans-serif"><i class="ph ph-calendar-check" style="font-size:18px"></i>Reserve a table</button>
        <a href="https://instagram.com/thefuelespresso" style="min-height:48px; display:flex; align-items:center; gap:8px; padding:0 18px; color:var(--ink2); font:400 13px 'DM Mono', monospace; text-decoration:none"><i class="ph ph-instagram-logo" style="font-size:18px"></i>@thefuelespresso</a>
      </div>
    ` : ''}
  </nav></header>` : ''}${v.isPhone ? `
  <header data-fuel-nav="" style="view-transition-name:fuel-nav; position:${H.esc(v.pos ?? '')}; top:12px; left:12px; right:12px; z-index:50; height:56px; box-sizing:border-box; display:flex; align-items:center; gap:8px; padding:0 6px 0 6px; border-radius:999px; background:${H.esc(v.navBg ?? '')}; color:${H.esc(v.navInk ?? '')}; border:1px solid ${H.esc(v.navBorder ?? '')}; backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); box-shadow:${H.esc(v.navShadow ?? '')}; transition:background-color .6s, color .6s; font-family:Jost, sans-serif" data-k="if8">
    <a${H.attr("href", v.homeHref)}${H.attr("data-href", v.homeHref)}${H.on("click", v.go, "go")} aria-label="THE FUEL home" style="display:flex; align-items:center; gap:8px; text-decoration:none; color:inherit; min-height:44px">
      <span style="position:relative; width:44px; height:44px; display:grid; place-items:center"><svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true" style="position:absolute; inset:0; transform:rotate(-90deg)"><circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="1.5"></circle><circle cx="22" cy="22" r="20" fill="none" stroke="#E29A64" stroke-width="2" stroke-linecap="round" stroke-dasharray="125.7" stroke-dashoffset="125.7" style="animation:fuel-ring linear both; animation-timeline:scroll(root)"></circle></svg><span style="width:17px; height:24px; background:currentColor; -webkit-mask:url('assets/brand/logo/emblem-mono-currentColor.svg') center/contain no-repeat; mask:url('assets/brand/logo/emblem-mono-currentColor.svg') center/contain no-repeat"></span></span>
      <span style="font-family:'Bodoni Moda', serif; font-weight:600; font-size:15px; letter-spacing:.14em">THE FUEL</span>
    </a>
    <button type="button"${H.on("click", v.openRes, "openRes")} style="margin-left:auto; height:44px; padding:0 14px; border-radius:999px; border:none; background:${H.esc(v.resBg ?? '')}; color:${H.esc(v.resInk ?? '')}; display:flex; align-items:center; gap:6px; cursor:pointer; font:500 14px Jost, sans-serif"><i class="ph ph-calendar-check" style="font-size:17px"></i>Reserve</button>
    <button type="button"${H.on("click", v.openBag, "openBag")}${H.attr("aria-label", v.bagLabel)} style="position:relative; width:44px; height:44px; flex:none; border-radius:50%; border:1px solid ${H.esc(v.navBorder ?? '')}; background:transparent; color:inherit; display:grid; place-items:center; cursor:pointer; font-size:20px">
      <i class="ph ph-handbag"></i>
      ${v.hasBag ? `<span aria-hidden="true" style="position:absolute; top:-3px; right:-3px; min-width:20px; height:20px; padding:0 5px; box-sizing:border-box; border-radius:999px; background:#E29A64; color:#270402; font:500 11px/20px 'DM Mono', monospace; text-align:center" data-k="if9">${H.text(v.bagCount)}</span>` : ''}
    </button>
  </header>
  <nav aria-label="Main" style="view-transition-name:fuel-dock; position:${H.esc(v.pos ?? '')}; bottom:12px; left:12px; right:12px; z-index:50; height:68px; display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); align-items:center; padding:0 6px; border-radius:999px; background:var(--glass); color:var(--ink); border:1px solid var(--line); backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); box-shadow:0 12px 40px rgba(39,4,2,.22); margin-top:${H.esc(v.dockGap ?? '')}; font-family:Jost, sans-serif" data-k="if8">
    ${(v.links || []).map((l, $i) => `
      <a${H.attr("href", l.href)}${H.attr("data-href", l.href)}${H.on("click", v.go, "go")}${H.attr("aria-current", l.current)} style="height:56px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; border-radius:999px; text-decoration:none; color:${H.esc(l.dockInk ?? '')}; background:${H.esc(l.dockBg ?? '')}; font-size:11px; font-weight:500"><i${H.attr("class", l.icon)} style="font-size:21px"></i>${H.text(l.short)}</a>
    `).join('')}
    <button type="button"${H.on("click", v.onToggle, "onToggle")}${H.attr("aria-label", v.toggleLabel)} style="height:56px; border:none; background:transparent; color:var(--ink); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; font:500 11px Jost, sans-serif; cursor:pointer; border-radius:999px"><i${H.attr("class", v.toggleIcon)} style="font-size:21px"></i>${H.text(v.toggleShort)}</button>
  </nav>` : ''}${v.toast ? `
  <div role="status" style="position:fixed; z-index:60; top:${H.esc(v.toastTop ?? '')}; right:clamp(12px,5vw,72px); display:flex; align-items:center; gap:14px; padding:8px 8px 8px 18px; border-radius:999px; background:var(--ink); color:var(--bg); box-shadow:0 18px 40px -12px rgba(39,4,2,.4); font:500 14px Jost, sans-serif" data-k="if10">
    <i class="ph-fill ph-check-circle" style="font-size:18px; color:#E29A64"></i><span>${H.text(v.toastText)}</span>
    <button type="button"${H.on("click", v.openBag, "openBag")} style="min-height:40px; padding:0 16px; border-radius:999px; border:none; background:#E29A64; color:#270402; font:500 14px Jost, sans-serif; cursor:pointer">View bag</button>
  </div>` : ''}${v.bagOpen ? `
  <div style="position:fixed; inset:0; z-index:120; font-family:Jost, sans-serif" data-k="if11">
    <div${H.on("click", v.closeAll, "closeAll")} style="position:absolute; inset:0; background:rgba(39,4,2,.45); backdrop-filter:blur(3px); -webkit-backdrop-filter:blur(3px)"></div>
    <aside role="dialog" aria-modal="true" aria-label="Your bag" style="position:absolute; top:0; right:0; bottom:0; width:min(460px,100vw); box-sizing:border-box; background:var(--bg); color:var(--ink); display:flex; flex-direction:column; box-shadow:-30px 0 80px -30px rgba(39,4,2,.5)">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:16px; padding:20px 20px 16px 28px; border-bottom:1px solid var(--line)">
        <h2 style="margin:0; font-family:'Bodoni Moda', serif; font-weight:500; font-size:30px">Your bag</h2>
        <button class="ps5" type="button"${H.on("click", v.closeAll, "closeAll")} aria-label="Close bag" style="width:44px; height:44px; border-radius:50%; border:1px solid var(--line); background:transparent; color:var(--ink); display:grid; place-items:center; cursor:pointer; font-size:20px"><i class="ph ph-x"></i></button>
      </div>
      ${v.orderDone ? `
        <div style="flex:1; display:flex; flex-direction:column; justify-content:center; gap:18px; padding:28px" data-k="if12">
          <i class="ph-fill ph-check-circle" style="font-size:44px; color:var(--accent)"></i>
          <h3 style="margin:0; font-family:'Bodoni Moda', serif; font-weight:500; font-size:clamp(32px,4vw,44px); line-height:1.05">Order received.</h3>
          <p style="margin:0; font-size:17px; line-height:1.6; color:var(--ink2)">${H.text(v.orderMsg)}</p>
          <button type="button"${H.on("click", v.closeAll, "closeAll")} style="align-self:flex-start; min-height:52px; padding:0 26px; border-radius:999px; border:none; background:var(--accent); color:var(--accentInk); font:500 16px Jost, sans-serif; cursor:pointer">Done</button>
        </div>
      ` : ''}
      ${v.bagEmpty ? `
        <div style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:flex-start; gap:18px; padding:28px" data-k="if13">
          <span style="width:64px; height:80px; border-radius:999px 999px 12px 12px; background:var(--surface); display:grid; place-items:center; font-size:28px; color:var(--accent)"><i class="ph ph-handbag"></i></span>
          <h3 style="margin:0; font-family:'Bodoni Moda', serif; font-weight:500; font-size:32px">Your bag is empty.</h3>
          <p style="margin:0; max-width:30ch; font-size:16px; line-height:1.6; color:var(--ink2)">Add a flat white, a croissant or a shake from the menu and it will wait here.</p>
          <a href="/menu" data-href="/menu"${H.on("click", v.go, "go")} style="min-height:52px; display:inline-flex; align-items:center; gap:10px; padding:0 26px; border-radius:999px; background:var(--accent); color:var(--accentInk); text-decoration:none; font-size:16px; font-weight:500">Browse the menu<i class="ph ph-arrow-right"></i></a>
        </div>
      ` : ''}
      ${v.bagFull ? `
        <div style="flex:1; overflow:auto; padding:8px 28px 24px; display:flex; flex-direction:column; gap:24px" data-k="if14">
          <ul style="list-style:none; margin:0; padding:0; display:flex; flex-direction:column">
            ${(v.bag || []).map((b, $i) => `
              <li style="display:grid; grid-template-columns:minmax(0,1fr) auto; gap:8px 16px; align-items:center; padding:16px 0; border-bottom:1px solid var(--line)">
                <span style="display:flex; flex-direction:column; gap:4px"><span style="font-family:'Bodoni Moda', serif; font-size:22px">${H.text(b.name)}</span><span style="font:400 11px 'DM Mono', monospace; letter-spacing:.08em; text-transform:uppercase; color:var(--ink2)">${H.text(b.world)} · [PRICE]</span></span>
                <span style="display:flex; align-items:center; gap:4px; border:1px solid var(--line); border-radius:999px; padding:2px">
                  <button class="ps5" type="button"${H.on("click", b.dec, "b.dec")}${H.attr("aria-label", b.decLabel)} style="width:40px; height:40px; border-radius:50%; border:none; background:transparent; color:var(--ink); display:grid; place-items:center; cursor:pointer; font-size:16px"><i${H.attr("class", b.decIcon)}></i></button>
                  <span style="min-width:22px; text-align:center; font:500 14px 'DM Mono', monospace">${H.text(b.qty)}</span>
                  <button class="ps5" type="button"${H.on("click", b.inc, "b.inc")}${H.attr("aria-label", b.incLabel)} style="width:40px; height:40px; border-radius:50%; border:none; background:transparent; color:var(--ink); display:grid; place-items:center; cursor:pointer; font-size:16px"><i class="ph ph-plus"></i></button>
                </span>
              </li>
            `).join('')}
          </ul>
          <div style="display:flex; flex-direction:column; gap:10px">
            <span style="font-size:14px; font-weight:500">How would you like it?</span>
            <div role="radiogroup" aria-label="Order type" style="display:grid; grid-template-columns:1fr 1fr; gap:6px; padding:4px; border-radius:999px; background:var(--surface)">
              ${(v.modes || []).map((m, $i) => `
                <button type="button" role="radio"${H.attr("aria-checked", m.on)}${H.on("click", m.pick, "m.pick")} style="min-height:44px; border-radius:999px; border:none; background:${H.esc(m.bg ?? '')}; color:${H.esc(m.ink ?? '')}; font:500 15px Jost, sans-serif; cursor:pointer; box-shadow:${H.esc(m.shadow ?? '')}; transition:background-color .2s">${H.text(m.label)}</button>
              `).join('')}
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:10px">
            <span style="font-size:14px; font-weight:500">${H.text(v.whenLabel)}</span>
            <div style="display:flex; flex-wrap:wrap; gap:8px">
              ${(v.whens || []).map((x, $i) => `
                <button type="button"${H.attr("aria-pressed", x.on)}${H.on("click", x.pick, "x.pick")} style="min-height:44px; padding:0 18px; border-radius:999px; border:1px solid ${H.esc(x.border ?? '')}; background:${H.esc(x.bg ?? '')}; color:${H.esc(x.ink ?? '')}; font:500 14px Jost, sans-serif; cursor:pointer">${H.text(x.label)}</button>
              `).join('')}
            </div>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px,1fr)); gap:14px">
            <label style="display:flex; flex-direction:column; gap:8px; font-size:14px; font-weight:500">Name
              <input class="ps6" type="text"${H.attr("value", v.oName)}${H.on("input", v.setOName, "setOName")} autocomplete="name" style="min-height:48px; padding:0 16px; border-radius:14px; border:1px solid ${H.esc(v.oNameBorder ?? '')}; background:var(--bg); color:var(--ink); font:400 16px Jost, sans-serif; outline:none">
              <span style="min-height:16px; font-size:13px; font-weight:400; color:#B3261E">${H.text(v.oNameErr)}</span>
            </label>
            <label style="display:flex; flex-direction:column; gap:8px; font-size:14px; font-weight:500">Phone
              <input class="ps6" type="tel"${H.attr("value", v.oPhone)}${H.on("input", v.setOPhone, "setOPhone")} autocomplete="tel" inputmode="tel" style="min-height:48px; padding:0 16px; border-radius:14px; border:1px solid ${H.esc(v.oPhoneBorder ?? '')}; background:var(--bg); color:var(--ink); font:400 16px Jost, sans-serif; outline:none">
              <span style="min-height:16px; font-size:13px; font-weight:400; color:#B3261E">${H.text(v.oPhoneErr)}</span>
            </label>
          </div>
          <a href="[LINK]" style="align-self:flex-start; display:inline-flex; align-items:center; gap:6px; min-height:44px; color:var(--accent); font-size:15px; font-weight:500; text-decoration:none; border-bottom:1px solid currentColor">Prefer delivery? Order on foodpanda<i class="ph ph-arrow-up-right"></i></a>
        </div>
        <div style="padding:18px 28px 24px; border-top:1px solid var(--line); display:flex; flex-direction:column; gap:14px; background:var(--surface)" data-k="if14">
          <div style="display:flex; justify-content:space-between; align-items:baseline"><span style="font-size:16px">Subtotal · ${H.text(v.bagCount)} ${H.text(v.itemWord)}</span><span style="font:500 15px 'DM Mono', monospace">[PRICE]</span></div>
          <button class="ps7" type="button"${H.on("click", v.placeOrder, "placeOrder")} style="min-height:56px; border-radius:999px; border:none; background:var(--ink); color:var(--bg); display:flex; align-items:center; justify-content:center; gap:10px; font:500 16px Jost, sans-serif; cursor:pointer; transition:transform .2s">Place order<i class="ph ph-arrow-right"></i></button>
        </div>
      ` : ''}
    </aside>
  </div>` : ''}${v.resOpen ? `
  <div style="position:fixed; inset:0; z-index:120; display:flex; align-items:${H.esc(v.dlgAlign ?? '')}; justify-content:center; padding:${H.esc(v.dlgPad ?? '')}; box-sizing:border-box; font-family:Jost, sans-serif" data-k="if15">
    <div${H.on("click", v.closeAll, "closeAll")} style="position:absolute; inset:0; background:rgba(39,4,2,.45); backdrop-filter:blur(3px); -webkit-backdrop-filter:blur(3px)"></div>
    <div role="dialog" aria-modal="true" aria-label="Reserve a table" style="position:relative; width:min(600px,100%); max-height:${H.esc(v.dlgMaxH ?? '')}; overflow:auto; box-sizing:border-box; border-radius:${H.esc(v.dlgRadius ?? '')}; background:var(--bg); color:var(--ink); box-shadow:0 40px 100px -30px rgba(39,4,2,.6)">
      <div style="position:sticky; top:0; z-index:2; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:20px 20px 16px 28px; background:var(--bg); border-bottom:1px solid var(--line)">
        <h2 style="margin:0; font-family:'Bodoni Moda', serif; font-weight:500; font-size:30px">Reserve a <em style="font-weight:400">table</em></h2>
        <button class="ps5" type="button"${H.on("click", v.closeAll, "closeAll")} aria-label="Close" style="width:44px; height:44px; border-radius:50%; border:1px solid var(--line); background:transparent; color:var(--ink); display:grid; place-items:center; cursor:pointer; font-size:20px"><i class="ph ph-x"></i></button>
      </div>
      ${v.resDone ? `
        <div style="padding:32px 28px 32px; display:flex; flex-direction:column; gap:22px" data-k="if16">
          <i class="ph-fill ph-calendar-check" style="font-size:44px; color:var(--accent)"></i>
          <h3 style="margin:0; font-family:'Bodoni Moda', serif; font-weight:500; font-size:clamp(32px,4vw,44px); line-height:1.05">Table requested.</h3>
          <dl style="margin:0; display:grid; grid-template-columns:auto 1fr; gap:12px 24px; padding:20px; border-radius:18px; background:var(--surface); font-size:16px">
            <dt style="font:400 12px 'DM Mono', monospace; letter-spacing:.08em; text-transform:uppercase; color:var(--ink2); align-self:center">Date</dt><dd style="margin:0">${H.text(v.sumDate)}</dd>
            <dt style="font:400 12px 'DM Mono', monospace; letter-spacing:.08em; text-transform:uppercase; color:var(--ink2); align-self:center">Time</dt><dd style="margin:0">${H.text(v.sumTime)}</dd>
            <dt style="font:400 12px 'DM Mono', monospace; letter-spacing:.08em; text-transform:uppercase; color:var(--ink2); align-self:center">Guests</dt><dd style="margin:0">${H.text(v.sumSeats)}</dd>
            <dt style="font:400 12px 'DM Mono', monospace; letter-spacing:.08em; text-transform:uppercase; color:var(--ink2); align-self:center">Seating</dt><dd style="margin:0">${H.text(v.sumSeat)}</dd>
          </dl>
          <p style="margin:0; font-size:16px; line-height:1.6; color:var(--ink2)">We’ll confirm on WhatsApp at ${H.text(v.sumPhone)}. Al-Ghani Plaza, 4th Floor, DHA Phase 6.</p>
          <button type="button"${H.on("click", v.closeAll, "closeAll")} style="align-self:flex-start; min-height:52px; padding:0 26px; border-radius:999px; border:none; background:var(--accent); color:var(--accentInk); font:500 16px Jost, sans-serif; cursor:pointer">Done</button>
        </div>
      ` : ''}
      ${v.resForm ? `
        <div style="padding:20px 28px 28px; display:flex; flex-direction:column; gap:26px" data-k="if17">
          <fieldset style="margin:0; padding:0; border:none; display:flex; flex-direction:column; gap:10px; min-width:0">
            <legend style="padding:0; margin-bottom:10px; font-size:14px; font-weight:500">Date</legend>
            <div style="display:flex; gap:8px; overflow-x:auto; padding-bottom:4px; scrollbar-width:thin">
              ${(v.days || []).map((d, $i) => `
                <button type="button"${H.attr("aria-pressed", d.on)}${H.on("click", d.pick, "d.pick")} style="flex:none; width:64px; height:76px; border-radius:999px 999px 14px 14px; border:1px solid ${H.esc(d.border ?? '')}; background:${H.esc(d.bg ?? '')}; color:${H.esc(d.ink ?? '')}; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; cursor:pointer; transition:background-color .2s">
                  <span style="font:400 10px 'DM Mono', monospace; letter-spacing:.08em; text-transform:uppercase">${H.text(d.wd)}</span>
                  <span style="font-family:'Bodoni Moda', serif; font-size:24px; line-height:1">${H.text(d.n)}</span>
                  <span style="font:400 10px 'DM Mono', monospace; letter-spacing:.06em; text-transform:uppercase; opacity:.8">${H.text(d.mo)}</span>
                </button>
              `).join('')}
            </div>
          </fieldset>
          <fieldset style="margin:0; padding:0; border:none; display:flex; flex-direction:column; gap:12px; min-width:0">
            <legend style="padding:0; margin-bottom:10px; font-size:14px; font-weight:500">Time</legend>
            <div role="tablist" aria-label="Time of day" style="display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:4px; padding:4px; border-radius:999px; background:var(--surface)">
              ${(v.parts || []).map((p, $i) => `
                <button type="button" role="tab"${H.attr("aria-selected", p.on)}${H.on("click", p.pick, "p.pick")} style="min-height:40px; padding:0 6px; border-radius:999px; border:none; background:${H.esc(p.bg ?? '')}; color:${H.esc(p.ink ?? '')}; font:500 13px Jost, sans-serif; cursor:pointer; white-space:nowrap; box-shadow:${H.esc(p.shadow ?? '')}">${H.text(p.label)}</button>
              `).join('')}
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(96px,1fr)); gap:8px">
              ${(v.slots || []).map((t, $i) => `
                <button type="button"${H.attr("aria-pressed", t.on)}${H.attr("disabled", t.off)}${H.on("click", t.pick, "t.pick")} style="min-height:44px; border-radius:999px; border:1px solid ${H.esc(t.border ?? '')}; background:${H.esc(t.bg ?? '')}; color:${H.esc(t.ink ?? '')}; font:500 14px 'DM Mono', monospace; cursor:${H.esc(t.cursor ?? '')}; opacity:${H.esc(t.op ?? '')}; text-decoration:${H.esc(t.strike ?? '')}">${H.text(t.label)}</button>
              `).join('')}
            </div>
            <span style="min-height:16px; font-size:13px; color:#B3261E">${H.text(v.timeErr)}</span>
          </fieldset>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px,1fr)); gap:24px">
            <div style="display:flex; flex-direction:column; gap:10px">
              <span style="font-size:14px; font-weight:500">Guests</span>
              <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; padding:6px; border-radius:999px; border:1px solid var(--line)">
                <button type="button"${H.on("click", v.seatDec, "seatDec")} aria-label="Fewer guests" style="width:44px; height:44px; border-radius:50%; border:none; background:var(--surface); color:var(--ink); display:grid; place-items:center; cursor:pointer; font-size:18px"><i class="ph ph-minus"></i></button>
                <span aria-live="polite" style="display:flex; align-items:baseline; gap:8px"><span style="font-family:'Bodoni Moda', serif; font-size:32px; line-height:1">${H.text(v.seats)}</span><span style="font:400 12px 'DM Mono', monospace; letter-spacing:.06em; text-transform:uppercase; color:var(--ink2)">${H.text(v.seatWord)}</span></span>
                <button type="button"${H.on("click", v.seatInc, "seatInc")} aria-label="More guests" style="width:44px; height:44px; border-radius:50%; border:none; background:var(--surface); color:var(--ink); display:grid; place-items:center; cursor:pointer; font-size:18px"><i class="ph ph-plus"></i></button>
              </div>
              <span style="font-size:13px; line-height:1.5; color:var(--ink2)">${H.text(v.seatNote)}</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:10px">
              <span style="font-size:14px; font-weight:500">Seating</span>
              <div style="display:flex; flex-wrap:wrap; gap:8px">
                ${(v.seatPrefs || []).map((s, $i) => `
                  <button type="button"${H.attr("aria-pressed", s.on)}${H.on("click", s.pick, "s.pick")} style="min-height:40px; padding:0 14px; border-radius:999px; border:1px solid ${H.esc(s.border ?? '')}; background:${H.esc(s.bg ?? '')}; color:${H.esc(s.ink ?? '')}; font:500 14px Jost, sans-serif; cursor:pointer">${H.text(s.label)}</button>
                `).join('')}
              </div>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:14px">
            <label style="display:flex; flex-direction:column; gap:8px; font-size:14px; font-weight:500">Name
              <input class="ps6" type="text"${H.attr("value", v.rName)}${H.on("input", v.setRName, "setRName")} autocomplete="name" style="min-height:48px; padding:0 16px; border-radius:14px; border:1px solid ${H.esc(v.rNameBorder ?? '')}; background:var(--bg); color:var(--ink); font:400 16px Jost, sans-serif; outline:none">
              <span style="min-height:16px; font-size:13px; font-weight:400; color:#B3261E">${H.text(v.rNameErr)}</span>
            </label>
            <label style="display:flex; flex-direction:column; gap:8px; font-size:14px; font-weight:500">Phone (WhatsApp)
              <input class="ps6" type="tel"${H.attr("value", v.rPhone)}${H.on("input", v.setRPhone, "setRPhone")} autocomplete="tel" inputmode="tel" style="min-height:48px; padding:0 16px; border-radius:14px; border:1px solid ${H.esc(v.rPhoneBorder ?? '')}; background:var(--bg); color:var(--ink); font:400 16px Jost, sans-serif; outline:none">
              <span style="min-height:16px; font-size:13px; font-weight:400; color:#B3261E">${H.text(v.rPhoneErr)}</span>
            </label>
          </div>
          <label style="display:flex; flex-direction:column; gap:8px; font-size:14px; font-weight:500">Note <span style="font-weight:400; color:var(--ink2)">Optional. Birthdays, allergies, a high chair.</span>
            <textarea class="ps6" rows="2"${H.attr("value", v.rNote)}${H.on("input", v.setRNote, "setRNote")} style="padding:12px 16px; border-radius:14px; border:1px solid var(--line); background:var(--bg); color:var(--ink); font:400 16px Jost, sans-serif; resize:vertical; outline:none"></textarea>
          </label>
        </div>
        <div style="position:sticky; bottom:0; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; padding:16px 28px 22px; background:var(--surface); border-top:1px solid var(--line)" data-k="if17">
          <span style="font:400 12px 'DM Mono', monospace; letter-spacing:.06em; text-transform:uppercase; color:var(--ink2)">${H.text(v.resSummary)}</span>
          <button class="ps7" type="button"${H.on("click", v.submitRes, "submitRes")} style="min-height:52px; padding:0 28px; border-radius:999px; border:none; background:var(--ink); color:var(--bg); display:flex; align-items:center; gap:10px; font:500 16px Jost, sans-serif; cursor:pointer">Reserve table<i class="ph ph-arrow-right"></i></button>
        </div>
      ` : ''}
    </div>
  </div>` : ''}`,

  visit: (v, H) => `<section id="visit" data-ref="rootRef" data-spy="visit" data-screen-label="Visit" style="background:#E29A64; color:#270402; padding:clamp(80px,10vw,144px) clamp(16px,5vw,72px); font-family:Jost, sans-serif; scroll-margin-top:0">
  <div style="max-width:1296px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%,400px),1fr)); gap:clamp(48px,6vw,96px); align-items:center">
    <div style="display:flex; flex-direction:column; gap:28px">
      ${v.draw ? `
        <span aria-hidden="true" style="position:relative; width:46px; height:65px; display:block" data-k="if1">
          <span style="position:absolute; inset:0; background:#270402; clip-path:${H.esc(v.fillClip ?? '')}; transition:clip-path 1.4s cubic-bezier(.16,1,.3,1) .2s; -webkit-mask:url('assets/brand/logo/emblem-fill-only-traced.svg') center/contain no-repeat; mask:url('assets/brand/logo/emblem-fill-only-traced.svg') center/contain no-repeat; opacity:.9"></span>
          <span style="position:absolute; inset:0; background:#270402; -webkit-mask:url('assets/brand/logo/emblem-line-only-traced.svg') center/contain no-repeat; mask:url('assets/brand/logo/emblem-line-only-traced.svg') center/contain no-repeat"></span>
        </span>
      ` : ''}
      <div style="display:flex; flex-direction:column; gap:14px">
        <h2 style="margin:0; font-family:'Bodoni Moda', serif; font-weight:500; font-size:clamp(44px,6.2vw,92px); line-height:1; letter-spacing:-.025em; text-wrap:balance">Al-Ghani Plaza, <em style="font-weight:400"><span style="font-weight:600; font-style:normal; font-variant-numeric:lining-nums">4</span>th Floor</em></h2>
        <p style="margin:0; font-size:clamp(18px,1.5vw,22px); line-height:1.5">Sector-C, DHA Phase 6, Lahore</p>
      </div>
      <p role="status" style="margin:0; display:flex; flex-wrap:wrap; align-items:center; gap:10px 18px; font:400 13px 'DM Mono', monospace; letter-spacing:.06em; text-transform:uppercase">
        <span style="display:flex; align-items:center; gap:10px"><span aria-hidden="true" style="width:8px; height:8px; border-radius:50%; background:${H.esc(v.dot ?? '')}"></span>${H.text(v.line)}</span>
        <span>8 AM to 2 AM, every day</span>
      </p>
      <button class="ps8 ps7" type="button"${H.on("click", v.reserve, "reserve")} style="max-width:560px; display:flex; align-items:center; justify-content:space-between; gap:16px; min-height:72px; padding:0 10px 0 28px; border-radius:999px; border:none; background:#270402; color:#FBF6EE; cursor:pointer; text-align:left; transition:transform .24s cubic-bezier(.16,1,.3,1)">
        <span style="display:flex; flex-direction:column; gap:2px"><span style="font:500 18px Jost, sans-serif">Reserve a table</span><span style="font:400 11px 'DM Mono', monospace; letter-spacing:.06em; text-transform:uppercase; color:#E3CBB3">Pick a date, time and seats</span></span>
        <span aria-hidden="true" style="width:52px; height:52px; border-radius:50%; background:#E29A64; color:#270402; display:grid; place-items:center; font-size:22px"><i class="ph ph-calendar-check"></i></span>
      </button>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px,1fr)); gap:10px; max-width:560px">
        <a class="ps9 ps7" href="[LINK]" style="display:flex; flex-direction:column; justify-content:center; gap:2px; min-height:64px; padding:0 22px; border-radius:999px; border:1.5px solid #270402; color:#270402; text-decoration:none; transition:background-color .24s"><span style="font-size:16px; font-weight:500">foodpanda</span><span style="font:400 11px 'DM Mono', monospace; letter-spacing:.06em">DELIVERY · [LINK]</span></a>
        <a class="ps9 ps7" href="[NUMBER]" style="display:flex; flex-direction:column; justify-content:center; gap:2px; min-height:64px; padding:0 22px; border-radius:999px; border:1.5px solid #270402; color:#270402; text-decoration:none; transition:background-color .24s"><span style="font-size:16px; font-weight:500">WhatsApp</span><span style="font:400 11px 'DM Mono', monospace; letter-spacing:.06em">[NUMBER]</span></a>
        <a class="ps9 ps7" href="[NUMBER]" style="display:flex; flex-direction:column; justify-content:center; gap:2px; min-height:64px; padding:0 22px; border-radius:999px; border:1.5px solid #270402; color:#270402; text-decoration:none; transition:background-color .24s"><span style="font-size:16px; font-weight:500">Call</span><span style="font:400 11px 'DM Mono', monospace; letter-spacing:.06em">[NUMBER]</span></a>
      </div>
      <a href="https://www.google.com/maps/search/?api=1&amp;query=Al-Ghani+Plaza+DHA+Phase+6+Lahore" target="_blank" rel="noopener" style="align-self:flex-start; display:inline-flex; align-items:center; gap:8px; min-height:44px; color:#270402; font-size:16px; font-weight:500; text-decoration:none; border-bottom:1px solid currentColor">Get directions<i class="ph ph-arrow-up-right"></i></a>
    </div>
    <div data-ref="mapRef" style="position:relative; justify-self:center; width:100%; max-width:480px; aspect-ratio:4/5; border-radius:999px 999px 18px 18px; overflow:hidden; background:#F1B88D; box-shadow:0 0 0 1.5px #270402">
      <div aria-hidden="true" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px; background:radial-gradient(circle at 50% 46%, #F6CBA6 0%, #F1B88D 46%, #E8A574 100%)">
        <span style="width:64px; height:64px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); background:#270402; display:grid; place-items:center; box-shadow:0 14px 30px -10px rgba(39,4,2,.5)"><span style="transform:rotate(45deg); width:20px; height:28px; background:#E29A64; -webkit-mask:url('assets/brand/logo/emblem-mono-currentColor.svg') center/contain no-repeat; mask:url('assets/brand/logo/emblem-mono-currentColor.svg') center/contain no-repeat"></span></span>
        <span style="display:flex; flex-direction:column; align-items:center; gap:4px; font:400 12px 'DM Mono', monospace; letter-spacing:.08em; text-transform:uppercase; text-align:center"><span>THE FUEL · 4th Floor</span><span>Al-Ghani Plaza, DHA Phase 6</span></span>
        <span style="font:400 11px 'DM Mono', monospace; letter-spacing:.08em; text-transform:uppercase; opacity:${H.esc(v.loadingOp ?? '')}; transition:opacity .4s">Loading map…</span>
      </div>
      ${v.mapOn ? `
        <iframe title="Map of Al-Ghani Plaza, DHA Phase 6, Lahore" src="https://maps.google.com/maps?q=Al-Ghani%20Plaza%20DHA%20Phase%206%20Lahore&amp;z=16&amp;output=embed"${H.on("load", v.onMapLoad, "onMapLoad")} referrerpolicy="no-referrer-when-downgrade" style="position:absolute; inset:0; width:100%; height:100%; border:0; display:block; opacity:${H.esc(v.mapOp ?? '')}; transition:opacity .7s ease; filter:sepia(.35) saturate(.85) contrast(.96)" data-k="if2"></iframe>
      ` : ''}
    </div>
  </div></section>`,

  footer: (v, H) => `<footer data-screen-label="Footer" style="background:#270402; color:#FBF6EE; padding:clamp(72px,9vw,128px) clamp(16px,5vw,72px) ${H.esc(v.pad ?? '')}; font-family:Jost, sans-serif">
  <div style="max-width:1456px; margin:0 auto; display:flex; flex-direction:column; gap:clamp(40px,5vw,72px)">
    <div aria-hidden="true" style="display:flex; align-items:center; gap:20px">
      <span style="flex:1; height:1px; background:rgba(251,246,238,.22)"></span>
      <span style="width:28px; height:40px; background:#E29A64; -webkit-mask:url('assets/brand/logo/emblem-mono-currentColor.svg') center/contain no-repeat; mask:url('assets/brand/logo/emblem-mono-currentColor.svg') center/contain no-repeat"></span>
      <span style="flex:1; height:1px; background:rgba(251,246,238,.22)"></span>
    </div>
    <p style="margin:0; text-align:center; font-family:'Bodoni Moda', serif; font-weight:500; font-size:clamp(60px,14.5vw,236px); line-height:.9; letter-spacing:.04em; white-space:nowrap">THE FUEL</p>
    <nav aria-label="Footer" style="display:flex; flex-wrap:wrap; justify-content:center; gap:4px 8px">
      <a class="ps5"${H.attr("href", v.homeHref)} style="min-height:44px; display:flex; align-items:center; padding:0 16px; border-radius:999px; color:#FBF6EE; text-decoration:none; font-size:16px">Home</a>
      <a class="ps5" href="/menu" style="min-height:44px; display:flex; align-items:center; padding:0 16px; border-radius:999px; color:#FBF6EE; text-decoration:none; font-size:16px">Menu</a>
      <a class="ps5" href="/space" style="min-height:44px; display:flex; align-items:center; padding:0 16px; border-radius:999px; color:#FBF6EE; text-decoration:none; font-size:16px">Our Space</a>
      <a class="ps5" href="/space?page=visit" style="min-height:44px; display:flex; align-items:center; padding:0 16px; border-radius:999px; color:#FBF6EE; text-decoration:none; font-size:16px">Visit</a>
      <a class="ps5" href="https://instagram.com/thefuelespresso" style="min-height:44px; display:flex; align-items:center; gap:8px; padding:0 16px; border-radius:999px; color:#FBF6EE; text-decoration:none; font-size:16px"><i class="ph ph-instagram-logo" style="font-size:18px"></i>Instagram</a>
    </nav>
    <div style="display:flex; flex-wrap:wrap; justify-content:space-between; gap:12px 24px; padding-top:24px; border-top:1px solid rgba(251,246,238,.16); font:400 12px 'DM Mono', monospace; letter-spacing:.08em; text-transform:uppercase; color:#E3CBB3">
      <span>Espresso Yourself!</span>
      <span>8 AM to 2 AM · DHA Phase 6, Lahore</span>
    </div>
  </div></footer>`
};
