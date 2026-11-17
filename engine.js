/* =====================================================================
   MOTOR DO SITE: tema, texturas, logos e conversão de dados.
   Não precisa mexer aqui.
   ===================================================================== */
(function () {
  const D = window.SITE_DEFAULT;
  D.version = 3;
  Object.assign(D.brand, { logo: '', logoWidth: 200, logoX: 0, logoY: 0, logoShadow: 0, logoOpacity: 100, logoRadius: 0, showPhotoWithLogo: false, showNameWithLogo: false, logoInFooter: true });
  D.theme = { bg: '#0e0c0a', fg: '#e9e2ce', deep: '#02100c', texture: 'papel', textureColor: '#e9e2ce', textureOpacity: 35, textureIntensity: 60, textureSize: 50 };
})();

window.SITE_TEXTURES = [
  ['nenhuma', 'Nenhuma'], ['papel', 'Papel'], ['granulado', 'Granulado de filme'], ['fibras', 'Papel kraft (fibras)'],
  ['riscos', 'Riscos vintage'], ['pontilhado', 'Pontilhado (halftone)'], ['linho', 'Linho'], ['hachura', 'Hachura diagonal'],
  ['losangos', 'Losangos'], ['listras', 'Listras finas'], ['ondas', 'Ondas']
];

window.SITE_TEXTURE = function (type, color, intensity, size) {
  if (!type || type === 'nenhuma') return { img: 'none', size: 'auto' };
  const hex = /^#[0-9a-f]{6}$/i.test(color || '') ? color : '#e9e2ce';
  const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
  const k = Math.max(0.1, (intensity ?? 60) / 50);
  const sc = Math.max(0.3, (size ?? 50) / 50);
  const f = n => n.toFixed(3);
  let svg, tile;
  const noise = (freq, oct, slope, icpt) => {
    tile = 300;
    return `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n' x='0' y='0'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='${oct}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 ${f(r)} 0 0 0 0 ${f(g)} 0 0 0 0 ${f(b)} 0 0 0 ${f(slope)} ${f(icpt)}'/></filter><rect width='300' height='300' filter='url(#n)'/></svg>`;
  };
  const sw = (0.5 * k).toFixed(2);
  switch (type) {
    case 'papel':     svg = noise('0.8', 3, 1.1 * k, -0.35 * k); break;
    case 'granulado': svg = noise('1.4', 1, 3 * k, -1.6 * k); break;
    case 'fibras':    svg = noise('0.012 0.6', 3, 2.2 * k, -1.1 * k); break;
    case 'riscos':    svg = noise('0.0015 0.9', 2, 6 * k, -3.9 * k); break;
    case 'pontilhado': tile = 12; svg = `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><g fill='${hex}'><circle cx='3' cy='3' r='${(0.5 + 0.45 * k).toFixed(2)}'/><circle cx='9' cy='9' r='${(0.5 + 0.45 * k).toFixed(2)}'/></g></svg>`; break;
    case 'linho':     tile = 6; svg = `<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'><g stroke='${hex}' stroke-width='${sw}' stroke-opacity='.8'><path d='M0 .5H6M.5 0V6'/></g></svg>`; break;
    case 'hachura':   tile = 10; svg = `<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><path d='M-2 2L2 -2M0 10L10 0M8 12L12 8' stroke='${hex}' stroke-width='${(0.6 * k).toFixed(2)}'/></svg>`; break;
    case 'losangos':  tile = 24; svg = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><path d='M12 1L23 12L12 23L1 12Z' fill='none' stroke='${hex}' stroke-width='${(0.7 * k).toFixed(2)}'/></svg>`; break;
    case 'listras':   tile = 8; svg = `<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><rect width='${(0.7 * k).toFixed(2)}' height='8' fill='${hex}'/></svg>`; break;
    case 'ondas':     tile = 40; svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='16'><path d='M0 8Q10 0 20 8T40 8' fill='none' stroke='${hex}' stroke-width='${(0.8 * k).toFixed(2)}'/></svg>`; break;
    default: return { img: 'none', size: 'auto' };
  }
  return { img: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`, size: `${Math.round(tile * sc)}px` };
};

window.SITE_LOGO_STYLE = function (c) {
  const s = (c.bandLogoShadow ?? 40) / 100, fd = +c.bandLogoFade || 0, rad = +c.bandLogoRadius || 0;
  const dir = { baixo: 'to bottom', cima: 'to top', esquerda: 'to left', direita: 'to right' }[c.bandLogoFadeDir] || 'to bottom';
  const filter = s > 0 ? `drop-shadow(0 ${Math.round(s * 12)}px ${Math.round(s * 28)}px rgba(0,0,0,${(s * .65).toFixed(2)}))` : 'none';
  const grad = `linear-gradient(${dir},#000 ${100 - fd}%,transparent 100%)`;
  return {
    wrap: `width:min(${c.bandLogoWidth ?? 280}px,100%);transform:translate(${c.bandLogoX ?? 0}px,${c.bandLogoY ?? 0}px);opacity:${(c.bandLogoOpacity ?? 100) / 100};filter:${filter};` +
          (rad > 0 ? `border-radius:${rad}px;overflow:hidden;` : ''),
    img: fd > 0 ? `-webkit-mask-image:${grad};mask-image:${grad};` : ''
  };
};

/* Estilo da logo do topo (mesmas regras, campos próprios) */
window.SITE_BRAND_STYLE = function (b) {
  return window.SITE_LOGO_STYLE({ bandLogoWidth: b.logoWidth, bandLogoX: b.logoX, bandLogoY: b.logoY, bandLogoShadow: b.logoShadow ?? 0, bandLogoOpacity: b.logoOpacity, bandLogoRadius: b.logoRadius });
};

window.SITE_MIGRATE = function (saved) {
  const D = JSON.parse(JSON.stringify(window.SITE_DEFAULT));
  const isObj = v => v && typeof v === 'object' && !Array.isArray(v);
  const clean = o => { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; };
  let v = isObj(saved) ? saved : {};
  const ver = isObj(saved) ? (saved.version || 1) : 3;

  if (!v.version && (v.brandTitle !== undefined || v.headline !== undefined)) {
    v = clean({
      brand: clean({ name: v.brandTitle, tagline: v.tagline, profileImg: v.profileImg }),
      contact: clean({ whatsapp: v.whatsappUrl, email: v.email, instagram: v.instagram }),
      hero: clean({ headline: v.headline, subheadline: v.subheadline }),
      audience: v.audience, clients: v.clients, testimonials: v.testimonials,
      services: Array.isArray(v.services) ? { items: v.services } : v.services,
      compare: v.compare, process: v.process, about: v.about, cta: v.cta
    });
  }
  if (ver < 3) { v = { ...v }; delete v.theme; }

  const out = D;
  for (const k in v) {
    if (v[k] === undefined) continue;
    out[k] = isObj(D[k]) && isObj(v[k]) ? { ...D[k], ...clean(v[k]) } : v[k];
  }

  const CD = { id: '', kicker: '', title: 'Novo cliente', sub: '', meta: 'Meta Ads · Reels', concept: false,
    c: '#1a3f2d', light: '#467060', deep: '#0f2a1d', heroImg: '', heroImgZoom: 0, heroImgX: 50, heroImgY: 50, heroOverlay: 55, showTitle: true,
    bgImg: '', bgOpacity: 20, gradientOpacity: 60,
    bandLogo: '', bandShowName: true, bandLogoWidth: 280, bandLogoX: 0, bandLogoY: 0, bandLogoShadow: 40, bandLogoOpacity: 100, bandLogoRadius: 0, bandLogoFade: 0, bandLogoFadeDir: 'baixo',
    groups: [] };
  out.clients = (Array.isArray(out.clients) ? out.clients : []).map(c => {
    const n = { ...CD, ...clean(c) };
    n.groups = (n.groups || []).map(g => ({ name: g.name || '', clips: (g.clips || []).map(x => ({ label: '', dur: '', src: '', poster: '', ...x })) }));
    return n;
  });

  const bgMap = { branco: 'escuro', verde: 'profundo' };
  out.custom = (Array.isArray(out.custom) ? out.custom : []).map(s => ({
    eyebrow: '', title: '', text: '', bg: 'auto', media: [], ...s,
    bg: bgMap[s.bg] || s.bg || 'auto',
    id: s.id || ('s' + Math.random().toString(36).slice(2, 8))
  }));

  ['plans', 'services', 'audience', 'testimonials'].forEach(k => { if (!Array.isArray(out[k].items)) out[k].items = []; });
  out.plans.items.forEach(p => { if (!Array.isArray(p.bullets)) p.bullets = []; });
  out.services.items.forEach(p => { if (!Array.isArray(p.bullets)) p.bullets = []; });
  if (!Array.isArray(out.process.steps)) out.process.steps = [];
  ['theirs', 'ours'].forEach(k => { if (!Array.isArray(out.compare[k])) out.compare[k] = []; });
  if (!Array.isArray(out.about.markets)) out.about.markets = [];

  const base = window.SITE_DEFAULT.layout;
  const valid = new Set(base.map(l => l.key).concat(out.custom.map(s => 'custom:' + s.id)));
  const seen = new Set();
  const lay = (Array.isArray(out.layout) ? out.layout : [])
    .filter(l => l && valid.has(l.key) && !seen.has(l.key) && seen.add(l.key))
    .map(l => ({ key: l.key, on: l.on !== false }));
  base.concat(out.custom.map(s => ({ key: 'custom:' + s.id, on: true }))).forEach(l => {
    if (seen.has(l.key)) return;
    const i = lay.findIndex(x => x.key === 'cta');
    i >= 0 ? lay.splice(i, 0, { ...l }) : lay.push({ ...l });
    seen.add(l.key);
  });
  out.layout = lay;
  out.version = 3;
  return out;
};