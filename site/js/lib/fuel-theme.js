// THE FUEL shared logic: themes, product worlds, Lahore time, theme transitions.
const P = 'assets/';
export const IMG = (p) => P + p;

export const THEMES = {
  latte: { bg: '#FBF6EE', surface: '#F3E6D6', ink: '#270402', ink2: '#592D14', accent: '#814D35', accentInk: '#FBF6EE', caramel: '#E29A64', line: 'rgba(39,4,2,.16)', glass: 'rgba(251,246,238,.82)' },
  espresso: { bg: '#270402', surface: '#3A1A0F', ink: '#FBF6EE', ink2: '#E3CBB3', accent: '#E29A64', accentInk: '#270402', caramel: '#E29A64', line: 'rgba(251,246,238,.16)', glass: 'rgba(39,4,2,.78)' }
};

export const WORLDS = [
  { key: 'roast', name: 'Roast', italic: 'slow.', title: 'Pulled', tagline: 'Pulled slow. Poured pretty.',
    c: { bg: '#270402', surface: '#3A1A0F', ink: '#FBF6EE', ink2: '#B28F71', accent: '#E29A64', accentInk: '#270402', highlight: '#E29732' },
    hero: 'worlds/01-roast/HERO_f040_cups-latte-art.jpg', sup: ['worlds/01-roast/f067_latte-art-topdown.jpg', 'worlds/01-roast/f087_two-iced-lattes.jpg'],
    items: ['Espresso', 'Flat White', 'Cappuccino', 'Iced Latte'] },
  { key: 'matcha', name: 'Matcha', title: 'Whisked', italic: 'green.', tagline: 'Whisked green, poured over ice.',
    c: { bg: '#1F3A2B', surface: '#2C473C', ink: '#F2F5E4', ink2: '#C9D6B0', accent: '#B9CC94', accentInk: '#1F3A2B', highlight: '#DDE6A8' },
    hero: 'worlds/02-matcha/HERO_f097_torn-paper-matcha.jpg', sup: ['worlds/02-matcha/f068_tray-matcha-croissant.jpg', 'worlds/02-matcha/f071_hands-matcha-green-knit.jpg'],
    items: ['Iced Matcha Latte', 'Hot Matcha Latte', 'Matcha Cup', 'Matcha and Croissant'] },
  { key: 'bakery', name: 'Bakery', title: 'Flaky outside,', italic: 'soft inside.', tagline: 'Baked fresh to fuel every moment.',
    c: { bg: '#D99B57', surface: '#E6B677', ink: '#270402', ink2: '#592D14', accent: '#592D14', accentInk: '#FBF6EE', highlight: '#FBF6EE' },
    hero: 'worlds/03-bakery/HERO_f033_croissant-terracotta-plate.jpg', sup: ['worlds/03-bakery/f028_pain-au-chocolat-stack.jpg', 'worlds/03-bakery/f031_baker-tray.jpg'],
    items: ['Butter Croissant', 'Pain au Chocolat', 'Almond Croissant', 'Glazed Croissant'] },
  { key: 'shakes', name: 'Shakes', title: 'Thick enough', italic: 'for a spoon.', tagline: 'Blended thick. Best with a straw and a friend.',
    c: { bg: '#F3DAD6', surface: '#FBE9E5', ink: '#4A1E14', ink2: '#6B3A32', accent: '#8A4B45', accentInk: '#FBF6EE', highlight: '#B68F8A' },
    hero: 'worlds/04-shakes/HERO_f092_shake-splash-storefront.jpg', sup: ['brand-moments/f014_iced-drink-paper-bag.jpg', 'brand-moments/f036_cups-upright.jpg'],
    items: ['Caramel Blast Shake', 'Cookies and Cream Shake', 'Chocolate Shake', 'Vanilla Shake'] },
  { key: 'coolers', name: 'Coolers', title: 'Cold fruit,', italic: 'warm days.', tagline: 'Cold fruit for warm Lahore afternoons.',
    c: { bg: '#FFF1DC', surface: '#FFE4BE', ink: '#3A0F10', ink2: '#6B2A24', accent: '#CB3544', accentInk: '#FFF1DC', highlight: '#F9BD30' },
    hero: 'worlds/05-coolers/HERO_f100_strawberry-chiller-hand.jpg', sup: ['worlds/05-coolers/f102_mango-cooler-dark.jpg', 'worlds/05-coolers/f077_cooler-car-window.jpg'],
    items: ['Strawberry Chiller', 'Mango Cooler', 'Watermelon Cooler', 'Matcha Berry Layer'] },
  { key: 'desserts', name: 'Desserts', title: 'One plate,', italic: 'four forks.', tagline: 'Made with love. Shared, mostly.',
    c: { bg: '#592D14', surface: '#6B3A22', ink: '#F3E6D6', ink2: '#E3CBB3', accent: '#F1B88D', accentInk: '#270402', highlight: '#E29A64' },
    hero: 'worlds/06-desserts/HERO_f111_brownie-fork.jpg', sup: ['worlds/06-desserts/f070_tiramisu-four-forks.jpg', 'worlds/06-desserts/f035_cheesecake-terracotta.jpg'],
    items: ['Fudge Brownie', 'Tiramisu', 'Baked Cheesecake', 'Chocolate Chip Cookie'] }
];

function lum(hex) {
  const n = hex.replace('#', '');
  const ch = [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}
export function contrast(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return ((x + 0.05) / (y + 0.05)).toFixed(1);
}

export function lahore() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const h = +parts.find(p => p.type === 'hour').value % 24, m = +parts.find(p => p.type === 'minute').value;
  return { h, m, label: String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') };
}
export function openState() {
  const t = lahore();
  const open = t.h >= 8 || t.h < 2;
  return { open, chip: open ? 'Open now' : 'Opens at 8 AM', line: open ? 'Open now. Closes at 2 AM.' : 'Closed now. Opens at 8 AM.', time: t.label, h: t.h, m: t.m };
}
export const autoTheme = () => { const { h } = lahore(); return h >= 7 && h < 19 ? 'latte' : 'espresso'; };

export function prefs() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  return { reduce, saveData };
}
export function params() { return new URLSearchParams(location.search); }

export function initialTheme() {
  const q = params().get('theme');
  if (q === 'latte' || q === 'espresso') return q;
  try { const s = localStorage.getItem('fuel-theme'); if (s === 'latte' || s === 'espresso') return s; } catch (e) {}
  return autoTheme();
}
export function saveTheme(t) { try { localStorage.setItem('fuel-theme', t); } catch (e) {} }

export function applyVars(vars) {
  const r = document.documentElement.style;
  Object.entries(vars).forEach(([k, v]) => r.setProperty('--' + k, v));
}

// Theme change with radial reveal (default), pour or fade. View Transitions first, clip-path overlay fallback.
export function transition(mode, x, y, apply) {
  const { reduce } = prefs();
  if (reduce) { apply(); return; }
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const clip = mode === 'pour'
    ? ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']
    : [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`];
  if (apply.nextBg) document.documentElement.style.setProperty('--fuel-vt-bg', apply.nextBg);
  if (document.startViewTransition && mode !== 'fade') {
    const vt = document.startViewTransition(() => apply());
    vt.ready.then(() => document.documentElement.animate({ clipPath: clip }, { duration: mode === 'pour' ? 900 : 700, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' })).catch(() => {});
    vt.finished.catch(() => {}); vt.updateCallbackDone && vt.updateCallbackDone.catch(() => {});
    return;
  }
  if (mode === 'fade') {
    document.documentElement.animate({ opacity: [1, 0.35, 1] }, { duration: 500, easing: 'ease-in-out' });
    setTimeout(apply, 250);
    return;
  }
  // Fallback: a solid overlay in the new bg colour grows, then the page swaps under it.
  const o = document.createElement('div');
  o.style.cssText = 'position:fixed;inset:0;z-index:49;pointer-events:none;background:' + (apply.nextBg || '#270402');
  document.body.appendChild(o);
  o.animate({ clipPath: clip }, { duration: 600, easing: 'cubic-bezier(.7,0,.2,1)' }).finished.then(() => {
    apply();
    o.animate({ opacity: [1, 0] }, { duration: 250 }).finished.then(() => o.remove());
  });
}

export function hairline() {
  const b = document.createElement('div');
  b.style.cssText = 'position:fixed;left:0;top:0;height:2px;width:100%;z-index:9999;pointer-events:none;transform-origin:0 50%;background:#E29A64';
  document.body.appendChild(b);
  return b.animate({ transform: ['scaleX(0)', 'scaleX(.7)'] }, { duration: 380, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' }).finished;
}
