const CFG = window.SITE_CONFIG || {};
const $ = id => document.getElementById(id);

if (!CFG.supabaseUrl || CFG.supabaseUrl.includes('SEU-PROJETO')) {
  document.body.innerHTML = '<p style="padding:24px">Preencha a URL e a chave do Supabase no arquivo <b>site-config.js</b>.</p>';
  throw new Error('Supabase não configurado');
}
if (!window.supabase) {
  document.body.innerHTML = '<p style="padding:24px">Não foi possível carregar o Supabase. Se estiver no Brave, desligue os Shields para este site e recarregue.</p>';
  throw new Error('Supabase não carregou');
}
const sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey);

let S = null, isDirty = false, tab = 'topo', previews = [];
const openItems = new WeakSet();

/* ========== UTILITÁRIOS ========== */
function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (k === 'class') e.className = v;
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null && v !== false) e.setAttribute(k, v === true ? '' : v);
  }
  kids.flat().forEach(c => { if (c === null || c === undefined || c === false) return; e.append(c.nodeType ? c : document.createTextNode(c)); });
  return e;
}
function toast(msg, err) { const t = $('toast'); t.textContent = msg; t.className = err ? 'err' : ''; t.hidden = false; clearTimeout(window._tt); window._tt = setTimeout(() => { t.hidden = true; }, 4200); }
function dirty() { isDirty = true; $('status').textContent = 'Alterações não salvas'; $('status').className = 'status dirty'; previews.forEach(f => f()); }
function setClean() { isDirty = false; $('status').textContent = 'Tudo salvo'; $('status').className = 'status'; }
window.addEventListener('beforeunload', e => { if (isDirty) { e.preventDefault(); e.returnValue = ''; } });
function rerender() { const y = window.scrollY; renderTab(); window.scrollTo(0, y); }
const swap = (a, i, j) => { [a[i], a[j]] = [a[j], a[i]]; };
function shiftHex(hex, d) { const n = parseInt(hex.slice(1), 16), f = x => Math.min(255, Math.max(0, x + d)); return '#' + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map(x => x.toString(16).padStart(2, '0')).join(''); }
function ytId(u) { const m = String(u || '').match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]{11})/i); return m ? m[1] : ''; }
const uid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const cssUrl = u => `url("${String(u).replace(/"/g, '%22')}")`;

async function uploadImage(file) {
  let blob = file, ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  if (/^image\/(jpeg|png|webp)$/.test(file.type)) {
    const bmp = await createImageBitmap(file), s = Math.min(1, 1800 / Math.max(bmp.width, bmp.height));
    const cv = document.createElement('canvas'); cv.width = Math.round(bmp.width * s); cv.height = Math.round(bmp.height * s);
    cv.getContext('2d').drawImage(bmp, 0, 0, cv.width, cv.height);
    blob = await new Promise(r => cv.toBlob(r, 'image/webp', 0.86)); ext = 'webp';
  }
  const name = `img/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const { error } = await sb.storage.from(CFG.bucket).upload(name, blob, { contentType: blob.type || file.type, cacheControl: '31536000' });
  if (error) throw error;
  return sb.storage.from(CFG.bucket).getPublicUrl(name).data.publicUrl;
}

/* ========== CAMPOS ========== */
const field = (label, help, ...c) => h('div', {}, label ? h('label', { class: 'f-label' }, label) : null, ...c, help ? h('div', { class: 'f-help' }, help) : null);
const panel = (title, help, ...k) => h('section', { class: 'panel' }, h('h2', {}, title), help ? h('p', { class: 'help' }, help) : null, h('div', { class: 'fields' }, ...k));
const sub = (title, help, ...k) => h('div', { class: 'sub' }, h('div', { class: 'sub-title' }, title), help ? h('p', { class: 'sub-help' }, help) : h('div', { style: 'height:10px' }), h('div', { class: 'fields' }, ...k));
const two = (...k) => h('div', { class: 'two' }, ...k);
function ctrl(txt, fn, disabled, extra) {
  const b = h('button', { type: 'button', class: 'ctrl ' + (extra || ''), title: { '↑': 'Subir', '↓': 'Descer', '✕': 'Remover' }[txt] || '' }, txt);
  b.disabled = !!disabled; b.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); fn(); }); return b;
}
function tText(o, k, label, help, ph) { const i = h('input', { type: 'text', placeholder: ph || '' }); i.value = o[k] ?? ''; i.addEventListener('input', () => { o[k] = i.value; dirty(); }); return field(label, help, i); }
function tArea(o, k, label, help, rows) { const t = h('textarea', { rows: rows || 3 }); t.value = o[k] ?? ''; t.addEventListener('input', () => { o[k] = t.value; dirty(); }); return field(label, help, t); }
function tColor(o, k, label, help, after) {
  const c = h('input', { type: 'color' }), t = h('input', { type: 'text', class: 'mono' });
  const sync = v => { c.value = /^#[0-9a-f]{6}$/i.test(v) ? v : '#000000'; t.value = v || ''; }; sync(o[k]);
  const apply = v => { if (!/^#[0-9a-f]{6}$/i.test(v)) return; o[k] = v; sync(v); if (after) after(v); dirty(); };
  c.addEventListener('input', () => apply(c.value)); t.addEventListener('change', () => apply(t.value.trim()));
  return field(label, help, h('div', { class: 'color-row' }, c, t));
}
function tRange(o, k, label, help, min, max, fmt) {
  const r = h('input', { type: 'range', min, max, step: 1 }); r.value = o[k] ?? min;
  const out = h('span', { class: 'rv' }), upd = () => { out.textContent = fmt ? fmt(+r.value) : `${r.value}%`; }; upd();
  r.addEventListener('input', () => { o[k] = +r.value; upd(); dirty(); });
  return field(label, help, h('div', { class: 'range' }, r, out));
}
function tToggle(o, k, label, help, after) {
  const i = h('input', { type: 'checkbox' }); i.checked = !!o[k];
  i.addEventListener('change', () => { o[k] = i.checked; dirty(); if (after) after(); });
  return h('label', { class: 'switch' }, i, h('span', { class: 'knob' }), h('span', {}, h('span', { class: 'f-label', style: 'margin:0' }, label), help ? h('span', { class: 'f-help', style: 'display:block;margin-top:2px' }, help) : null));
}
function tSelect(o, k, label, help, opts, after) {
  const s = h('select', {}, ...opts.map(([v, n]) => h('option', { value: v }, n))); s.value = o[k];
  s.addEventListener('change', () => { o[k] = s.value; dirty(); if (after) after(); });
  return field(label, help, s);
}
function tImage(o, k, label, help) {
  const thumb = h('div', { class: 'thumb' });
  const inp = h('input', { type: 'text', placeholder: 'Cole um link ou clique em Enviar' }); inp.value = o[k] || '';
  const setT = () => { thumb.style.backgroundImage = o[k] ? cssUrl(o[k]) : 'none'; }; setT();
  inp.addEventListener('input', () => { o[k] = inp.value.trim(); setT(); dirty(); });
  const file = h('input', { type: 'file', accept: 'image/*', hidden: true });
  const up = h('button', { type: 'button', class: 'b primary sm' }, '⬆ Enviar imagem');
  up.addEventListener('click', () => file.click());
  file.addEventListener('change', async () => {
    const f = file.files && file.files[0]; if (!f) return;
    up.textContent = 'Enviando…'; up.disabled = true;
    try { const url = await uploadImage(f); o[k] = url; inp.value = url; setT(); dirty(); toast('Imagem enviada. Clique em Salvar para publicar.'); }
    catch (err) { toast('Falha no envio: ' + (err.message || err), true); }
    up.textContent = '⬆ Enviar imagem'; up.disabled = false; file.value = '';
  });
  const rm = h('button', { type: 'button', class: 'b ghost sm' }, 'Remover');
  rm.addEventListener('click', () => { o[k] = ''; inp.value = ''; setT(); dirty(); });
  return field(label, help, h('div', { class: 'img-field' }, thumb, h('div', { class: 'col' }, inp, h('div', { class: 'row' }, up, rm, file))));
}
function tVideo(o, k, label, help) {
  const thumb = h('div', { class: 'thumb', style: 'width:96px;height:72px;background-size:cover' });
  const inp = h('input', { type: 'text', placeholder: 'Cole o link do YouTube, Shorts ou .mp4' }); inp.value = o[k] || '';
  const msg = h('div', { class: 'vid-ok' });
  const upd = () => {
    const v = o[k] || '', id = ytId(v), mp4 = /\.mp4(\?|$)/i.test(v);
    thumb.style.backgroundImage = id ? `url(https://img.youtube.com/vi/${id}/hqdefault.jpg)` : 'none';
    msg.className = 'vid-ok ' + (id || mp4 ? 'ok' : v ? 'bad' : '');
    msg.textContent = id ? '✓ Vídeo do YouTube reconhecido' : mp4 ? '✓ Arquivo .mp4' : v ? '⚠ Link não reconhecido. Use YouTube ou .mp4' : 'Sem vídeo: este item não aparece no site';
  }; upd();
  inp.addEventListener('input', () => { o[k] = inp.value.trim(); upd(); dirty(); });
  return field(label, help, h('div', { class: 'img-field' }, thumb, h('div', { class: 'col' }, inp, msg)));
}
function tList(arr, label, help, ph, addLabel) {
  const box = h('div', { class: 'list' });
  const draw = () => {
    box.innerHTML = '';
    arr.forEach((v, i) => {
      const inp = h('input', { type: 'text', placeholder: ph || '' }); inp.value = v;
      inp.addEventListener('input', () => { arr[i] = inp.value; dirty(); });
      box.append(h('div', { class: 'row' }, inp,
        ctrl('↑', () => { swap(arr, i, i - 1); dirty(); draw(); }, i === 0),
        ctrl('↓', () => { swap(arr, i, i + 1); dirty(); draw(); }, i === arr.length - 1),
        ctrl('✕', () => { arr.splice(i, 1); dirty(); draw(); }, false, 'del')));
    });
    box.append(h('button', { type: 'button', class: 'b add', onclick: () => { arr.push(''); dirty(); draw(); const all = box.querySelectorAll('input'); if (all.length) all[all.length - 1].focus(); } }, '+ ' + (addLabel || 'Adicionar item')));
  };
  draw(); return field(label, help, box);
}
function repeater(arr, { label, help, title, template, body, addLabel, onAdd, onRemove }) {
  const box = h('div', { class: 'list' });
  arr.forEach((it, i) => {
    const d = h('details', { class: 'item' }); d.open = openItems.has(it);
    d.addEventListener('toggle', () => { d.open ? openItems.add(it) : openItems.delete(it); });
    const ttl = h('span', { class: 'item-title' }, title(it, i));
    d.append(h('summary', {}, ttl,
      ctrl('↑', () => { swap(arr, i, i - 1); dirty(); rerender(); }, i === 0),
      ctrl('↓', () => { swap(arr, i, i + 1); dirty(); rerender(); }, i === arr.length - 1),
      ctrl('✕', () => { if (!confirm(`Remover "${title(it, i)}"?`)) return; arr.splice(i, 1); if (onRemove) onRemove(it); dirty(); rerender(); }, false, 'del'),
      h('span', { class: 'chev' }, '▾')),
      h('div', { class: 'item-body' }, ...[].concat(body(it, i)).filter(Boolean)));
    d.addEventListener('input', () => { ttl.textContent = title(it, i); });
    box.append(d);
  });
  box.append(h('button', { type: 'button', class: 'b add', onclick: () => {
    const n = typeof template === 'function' ? template() : JSON.parse(JSON.stringify(template));
    arr.push(n); openItems.add(n); if (onAdd) onAdd(n); dirty(); rerender();
  } }, '+ ' + (addLabel || 'Adicionar')));
  return field(label, help, box);
}
function group(obj, title, help, ...kids) {
  const d = h('details', { class: 'item' }); d.open = openItems.has(obj);
  d.addEventListener('toggle', () => { d.open ? openItems.add(obj) : openItems.delete(obj); });
  d.append(h('summary', {}, h('span', { class: 'item-title' }, title), h('span', { class: 'chev' }, '▾')),
    h('div', { class: 'item-body' }, help ? h('div', { class: 'f-help', style: 'margin:0' }, help) : null, ...kids));
  return d;
}

/* ========== PRÉVIAS ========== */
function cardPreview(c) {
  const card = h('div', { class: 'pv-card' });
  const draw = () => {
    const o = (c.heroOverlay ?? 55) / 100, z = +c.heroImgZoom || 0;
    card.style.background = `linear-gradient(155deg, ${c.light}, ${c.c} 54%, ${c.deep})`; card.innerHTML = '';
    if (c.heroImg) {
      card.append(h('div', { class: 'pi', style: `background-image:${cssUrl(c.heroImg)};background-repeat:no-repeat;background-size:${z ? z + '% auto' : 'cover'};background-position:${c.heroImgX ?? 50}% ${c.heroImgY ?? 50}%` }));
      if (o > 0) card.append(h('div', { class: 'ps', style: `background:linear-gradient(to top, rgba(0,0,0,${(o * .85).toFixed(2)}), rgba(0,0,0,${(o * .3).toFixed(2)}) 55%, rgba(0,0,0,${(o * .12).toFixed(2)}))` }));
    }
    card.append(h('span', { class: 'pk' }, c.kicker || 'Nicho'));
    card.append(h('div', { class: 'pt', style: 'font-style:italic;font-weight:500;' + (c.showTitle === false ? 'visibility:hidden' : '') }, c.title || ''));
  };
  draw(); previews.push(draw);
  return h('div', { class: 'pv-wrap' }, card, h('div', { class: 'pv-note' }, '👀 Prévia do card. Muda na hora enquanto você mexe nos controles.'));
}
function bandPreview(c) {
  const box = h('div', { style: 'position:relative;border-radius:16px;overflow:hidden;padding:26px;min-height:200px;color:#fff;display:flex;flex-direction:column;justify-content:center' });
  const draw = () => {
    box.innerHTML = ''; box.style.background = c.c;
    if (c.bgImg) box.append(h('div', { style: `position:absolute;inset:0;background:${cssUrl(c.bgImg)} center/cover;opacity:${(c.bgOpacity ?? 20) / 100}` }));
    const inner = h('div', { style: 'position:relative' });
    inner.append(h('div', { style: 'font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.9' }, c.kicker || 'Nicho'));
    if (c.bandLogo) {
      const L = window.SITE_LOGO_STYLE(c);
      inner.append(h('div', { style: 'margin:16px 0 6px;' + L.wrap }, h('img', { src: c.bandLogo, alt: '', style: 'width:100%;height:auto;display:block;' + L.img })));
    }
    if (c.title && (!c.bandLogo || c.bandShowName !== false)) inner.append(h('div', { style: 'font-family:Fraunces,Georgia,serif;font-weight:500;font-size:40px;line-height:1;margin:10px 0' }, c.title));
    if (c.sub) inner.append(h('div', { style: 'font-family:Fraunces,Georgia,serif;font-style:italic;font-size:17px;opacity:.92;max-width:44ch' }, c.sub));
    box.append(inner);
  };
  draw(); previews.push(draw);
  return h('div', {}, box, h('div', { class: 'f-help' }, '👀 Prévia da faixa (sem textura). Muda na hora.'));
}

/* ========== ABAS ========== */
const NAMES = { audience: '👥 Para quem é', clients: '🎬 Clientes e vídeos', testimonials: '💬 Depoimentos', plans: '💰 Orçamento', services: '🧰 Serviços', compare: '⚖️ Comparativo', process: '🔁 Processo', about: '🙋 Quem faz', cta: '📣 Chamada final' };
const newClient = () => ({ id: uid('c'), kicker: '', title: 'Novo cliente', sub: '', meta: 'Meta Ads · Reels', concept: false, c: '#1a3f2d', light: '#467060', deep: '#0f2a1d',
  heroImg: '', heroImgZoom: 0, heroImgX: 50, heroImgY: 50, heroOverlay: 55, showTitle: true, bgImg: '', bgOpacity: 20, gradientOpacity: 60,
  bandLogo: '', bandShowName: true, bandLogoWidth: 280, bandLogoX: 0, bandLogoY: 0, bandLogoShadow: 40, bandLogoOpacity: 100, bandLogoFade: 0, bandLogoFadeDir: 'baixo',
  groups: [{ name: '', clips: [] }] });
const px = v => v + ' px';

function tabTopo(p) {
  p.append(
    panel('Marca', 'Nome e foto do canto superior esquerdo do site.',
      two(tText(S.brand, 'name', 'Nome da marca'), tText(S.brand, 'tagline', 'Frase abaixo do nome')),
      tImage(S.brand, 'profileImg', 'Foto de perfil', 'Aparece em círculo. Use uma foto quadrada.')),
    panel('Título principal', 'O primeiro texto que o visitante lê.', tArea(S.hero, 'headline', 'Título grande', null, 2), tArea(S.hero, 'subheadline', 'Texto abaixo dos cards dos clientes', null, 3)),
    panel('Selos e botões', null,
      two(tToggle(S.hero, 'showInstaBadge', 'Mostrar selo do Instagram'), tText(S.hero, 'badgeRight', 'Texto do selo da direita', 'Vazio = escondido.')),
      two(tText(S.hero, 'ctaPrimary', 'Botão principal', 'Leva até a seção de orçamento.'), tText(S.hero, 'ctaSecondary', 'Botão secundário', 'Leva até os vídeos.')),
      tText(S.hero, 'deckHint', 'Texto abaixo dos cards dos clientes'))
  );
}

function tabClientes(p) {
  p.append(panel('Clientes e vídeos', 'Cada cliente vira um card no topo e uma faixa colorida com os vídeos. Clique no nome para abrir. Use ↑ ↓ para mudar a ordem.',
    repeater(S.clients, {
      title: c => c.title || 'Cliente sem nome', template: newClient, addLabel: 'Adicionar cliente',
      body: c => [
        sub('📋 Informações', 'O nome é usado em vários lugares. Não apague: para escondê-lo, use as chaves de cada bloco.',
          two(tText(c, 'title', 'Nome do cliente'), tText(c, 'kicker', 'Nicho', 'Ex.: Nutrição Equina')),
          tArea(c, 'sub', 'Descrição curta', null, 2),
          two(tText(c, 'meta', 'Plataformas', 'Ex.: Meta Ads · Reels'), tToggle(c, 'concept', 'Marcar como "Projeto conceito"'))),
        sub('🃏 Card no topo do site', 'O cartão inclinado logo abaixo do título principal.',
          cardPreview(c),
          tImage(c, 'heroImg', 'Logo ou imagem do card', 'PNG com fundo transparente fica melhor. Ideal: 600 px de largura.'),
          tRange(c, 'heroImgZoom', 'Tamanho da imagem', '0 = preenche o card inteiro.', 0, 300, v => v ? v + '%' : 'Automático'),
          two(tRange(c, 'heroImgX', 'Posição horizontal', '0 = esquerda · 100 = direita', 0, 100), tRange(c, 'heroImgY', 'Posição vertical', '0 = topo · 100 = base', 0, 100)),
          tRange(c, 'heroOverlay', 'Sombra escura sobre a imagem', '0 = sem sombra.', 0, 100, v => v ? v + '%' : 'Sem sombra'),
          tToggle(c, 'showTitle', 'Mostrar o nome do cliente no card', 'Só afeta o card. A faixa tem a própria chave.')),
        sub('🏷️ Logo na faixa dos vídeos', 'Aparece no lugar do nome em texto, na faixa colorida.',
          bandPreview(c),
          tImage(c, 'bandLogo', 'Logo da empresa', 'PNG com fundo transparente, de preferência em branco ou claro.'),
          h('div', {}, h('button', { type: 'button', class: 'b ghost sm', onclick: () => { c.bandLogo = c.heroImg; dirty(); rerender(); } }, '↺ Usar a mesma imagem do card')),
          tRange(c, 'bandLogoWidth', 'Tamanho da logo', null, 60, 600, px),
          two(tRange(c, 'bandLogoX', 'Mover para os lados', 'Negativo = esquerda · positivo = direita', -200, 200, px),
              tRange(c, 'bandLogoY', 'Mover para cima ou para baixo', 'Negativo = sobe · positivo = desce', -120, 120, px)),
          two(tRange(c, 'bandLogoShadow', 'Sombra da logo', '0 = sem sombra', 0, 100), tRange(c, 'bandLogoOpacity', 'Opacidade da logo', '100 = totalmente visível', 10, 100)),
          two(tRange(c, 'bandLogoFade', 'Degradê (esmaecer a logo)', '0 = sem degradê', 0, 100),
              tSelect(c, 'bandLogoFadeDir', 'Direção do degradê', null, [['baixo', '↓ Some para baixo'], ['cima', '↑ Some para cima'], ['esquerda', '← Some para a esquerda'], ['direita', '→ Some para a direita']])),
          tToggle(c, 'bandShowName', 'Mostrar também o nome em texto na faixa', 'Desligue para mostrar só a logo.')),
        sub('🎞️ Cores e fundo da faixa', null,
          tColor(c, 'c', 'Cor da faixa', 'Os tons claro e escuro são calculados sozinhos.', v => { c.light = shiftHex(v, 44); c.deep = shiftHex(v, -44); }),
          tImage(c, 'bgImg', 'Foto de fundo da faixa', 'Opcional.'),
          two(tRange(c, 'bgOpacity', 'Visibilidade da foto de fundo', '0 = invisível', 0, 100), tRange(c, 'gradientOpacity', 'Brilho colorido (degradê da faixa)', '0 = cor lisa', 0, 100))),
        sub('▶️ Vídeos', 'Grupos separam, por exemplo, "Anúncios" e "Reels". Se não precisar, deixe um grupo só, sem nome.',
          repeater(c.groups, {
            title: g => '📁 ' + (g.name || 'Grupo sem nome'), template: { name: '', clips: [] }, addLabel: 'Adicionar grupo',
            body: g => [tText(g, 'name', 'Nome do grupo (opcional)'),
              repeater(g.clips, { label: 'Vídeos deste grupo', title: v => (v.src ? '🎬 ' : '⚪ ') + (v.label || 'Vídeo'), template: { label: 'Ad 01', dur: '', src: '', poster: '' }, addLabel: 'Adicionar vídeo',
                body: v => [two(tText(v, 'label', 'Rótulo', 'Ex.: Ad 01'), tText(v, 'dur', 'Duração (opcional)', 'Ex.: 0:25')), tVideo(v, 'src', 'Link do vídeo')] })]
          }))
      ]
    })));
}

function tabOrcamento(p) {
  p.append(panel('Seção de orçamento', 'O botão "Solicitar orçamento" rola até aqui e mostra o aviso. Cada opção abre o WhatsApp com uma mensagem pronta.',
    two(tText(S.plans, 'eyebrow', 'Texto pequeno acima do título'), tText(S.plans, 'title', 'Título')),
    tArea(S.plans, 'text', 'Texto de apoio (opcional)', null, 2),
    tText(S.plans, 'attention', 'Aviso que aparece ao chegar', 'Ex.: Selecione o que você precisa'),
    repeater(S.plans.items, {
      label: 'Opções', title: x => (x.highlight ? '⭐ ' : '') + (x.title || 'Opção'), addLabel: 'Adicionar opção',
      template: { title: 'Nova opção', tag: '', desc: '', bullets: [], button: 'Quero este', message: 'Olá! Vim pelo site e quero um orçamento.', highlight: false },
      body: x => [two(tText(x, 'title', 'Nome da opção'), tText(x, 'tag', 'Etiqueta')), tArea(x, 'desc', 'Descrição', null, 2),
        tList(x.bullets, 'Tópicos', null, '', 'Adicionar tópico'), tText(x, 'button', 'Texto do botão'),
        tArea(x, 'message', 'Mensagem que vai pronta no WhatsApp', '*Asteriscos* deixam em negrito no WhatsApp.', 2),
        tToggle(x, 'highlight', 'Destacar esta opção', 'Fica com as cores invertidas, chamando mais atenção.')]
    })));
}

function layoutList() {
  const box = h('div', { class: 'list' });
  S.layout.forEach((l, i) => {
    const cs = l.key.startsWith('custom:') ? S.custom.find(x => 'custom:' + x.id === l.key) : null;
    const sw = h('input', { type: 'checkbox' }); sw.checked = l.on !== false;
    const row = h('div', { class: 'layout-row' + (l.on === false ? ' off' : '') },
      h('span', { class: 'n' }, String(i + 1).padStart(2, '0')), h('span', { class: 'nm' }, cs ? '✨ ' + (cs.title || 'Seção personalizada') : (NAMES[l.key] || l.key)),
      h('label', { class: 'switch', title: 'Mostrar ou esconder' }, sw, h('span', { class: 'knob' })),
      ctrl('↑', () => { swap(S.layout, i, i - 1); dirty(); rerender(); }, i === 0),
      ctrl('↓', () => { swap(S.layout, i, i + 1); dirty(); rerender(); }, i === S.layout.length - 1));
    sw.addEventListener('change', () => { l.on = sw.checked; row.classList.toggle('off', !l.on); dirty(); });
    box.append(row);
  });
  return box;
}

function tabSecoes(p) {
  p.append(
    panel('Ordem e visibilidade', 'Use ↑ ↓ para mudar a ordem. A chave liga e desliga: seção desligada some do site, mas nada é apagado.', layoutList()),
    panel('Seções personalizadas', 'Crie seções com texto, imagens e vídeos. Elas entram na lista acima.',
      repeater(S.custom, {
        title: s => '✨ ' + (s.title || 'Seção sem título'), addLabel: 'Criar nova seção',
        template: () => ({ id: uid('s'), eyebrow: '', title: 'Nova seção', text: '', bg: 'auto', media: [] }),
        onAdd: s => { const i = S.layout.findIndex(l => l.key === 'cta'), e = { key: 'custom:' + s.id, on: true }; i >= 0 ? S.layout.splice(i, 0, e) : S.layout.push(e); },
        onRemove: s => { S.layout = S.layout.filter(l => l.key !== 'custom:' + s.id); },
        body: s => [
          two(tText(s, 'eyebrow', 'Texto pequeno acima do título'), tText(s, 'title', 'Título')),
          tArea(s, 'text', 'Texto', null, 5),
          tSelect(s, 'bg', 'Fundo', null, [['auto', 'Automático (alterna)'], ['escuro', 'Escuro principal'], ['profundo', 'Escuro profundo'], ['creme', 'Creme (invertido)']]),
          repeater(s.media, {
            label: 'Imagens e vídeos', title: m => (m.type === 'video' ? '🎬 ' : '🖼️ ') + (m.caption || (m.type === 'video' ? 'Vídeo' : 'Imagem')),
            template: { type: 'image', src: '', format: 'horizontal', caption: '' }, addLabel: 'Adicionar imagem ou vídeo',
            body: m => [two(tSelect(m, 'type', 'Tipo', null, [['image', '🖼️ Imagem'], ['video', '🎬 Vídeo']], rerender),
                tSelect(m, 'format', 'Formato', null, [['horizontal', 'Horizontal (16:9)'], ['vertical', 'Vertical (9:16)'], ['quadrado', 'Quadrado (1:1)']])),
              m.type === 'video' ? tVideo(m, 'src', 'Vídeo') : tImage(m, 'src', 'Imagem'), tText(m, 'caption', 'Legenda (opcional)')]
          })
        ]
      }))
  );
}

function tabTextos(p) {
  const A = S.audience, T = S.testimonials, SV = S.services, C = S.compare, PR = S.process, AB = S.about, CT = S.cta;
  const head = o => two(tText(o, 'eyebrow', 'Texto pequeno acima do título'), tText(o, 'title', 'Título'));
  p.append(panel('Textos das seções', 'Clique em uma seção para editar. Para ligar, desligar ou reordenar, use a aba "Seções do site".',
    group(A, '👥 Para quem é', null, head(A), repeater(A.items, { label: 'Cartões', title: x => x.title || 'Cartão', template: { title: '', text: '' }, addLabel: 'Adicionar cartão', body: x => [tText(x, 'title', 'Título'), tArea(x, 'text', 'Texto')] })),
    group(T, '💬 Depoimentos', 'Só aparece quando houver pelo menos um depoimento.', head(T),
      repeater(T.items, { label: 'Depoimentos', title: x => x.name || 'Depoimento', template: { name: '', role: '', text: '', video: '' }, addLabel: 'Adicionar depoimento',
        body: x => [two(tText(x, 'name', 'Nome'), tText(x, 'role', 'Cargo / empresa')), tArea(x, 'text', 'O que a pessoa disse'), tVideo(x, 'video', 'Vídeo (opcional)')] })),
    group(SV, '🧰 Serviços', null, head(SV),
      repeater(SV.items, { label: 'Serviços', title: x => x.title || 'Serviço', template: { badge: '', tag: '', title: '', text: '', bullets: [] }, addLabel: 'Adicionar serviço',
        body: x => [two(tText(x, 'badge', 'Selo'), tText(x, 'tag', 'Etiqueta')), tText(x, 'title', 'Título'), tArea(x, 'text', 'Texto', null, 2), tList(x.bullets, 'Tópicos', null, '', 'Adicionar tópico')] })),
    group(C, '⚖️ Comparativo', null, head(C), two(tText(C, 'theirsLabel', 'Nome do lado "comum"'), tText(C, 'oursLabel', 'Nome do seu lado')),
      two(tList(C.theirs, 'Itens do lado comum', null, '', 'Adicionar item'), tList(C.ours, 'Seus itens', null, '', 'Adicionar item')), tText(C, 'button', 'Texto do botão', 'Vazio = sem botão.')),
    group(PR, '🔁 Processo', null, head(PR), repeater(PR.steps, { label: 'Etapas', title: (x, i) => `${String(i + 1).padStart(2, '0')} · ${x.title || 'Etapa'}`, template: { title: '', text: '' }, addLabel: 'Adicionar etapa', body: x => [tText(x, 'title', 'Nome da etapa'), tArea(x, 'text', 'Texto', null, 2)] })),
    group(AB, '🙋 Quem faz', null, head(AB), tImage(AB, 'photo', 'Sua foto', 'Vertical fica melhor. Vazio = usa a foto de perfil.'),
      two(tText(AB, 'name', 'Nome'), tText(AB, 'role', 'Cargo')), tText(AB, 'origin', 'De onde você é', 'Ex.: Manaus, AM'), tArea(AB, 'text', 'Sobre você', null, 5),
      tList(AB.markets, 'Mercados em que já atuou', null, '', 'Adicionar mercado'), tText(AB, 'companyTitle', 'Título do bloco da empresa'), tArea(AB, 'companyText', 'Sobre a ACEFER', null, 4)),
    group(CT, '📣 Chamada final', 'A faixa creme no fim da página.', tText(CT, 'eyebrow', 'Texto pequeno acima do título'), tArea(CT, 'title', 'Título', null, 2), tText(CT, 'button', 'Texto do botão'))
  ));
}

function tabContato(p) {
  p.append(panel('Contato', 'Usados nos botões e links do site inteiro.',
    tText(S.contact, 'whatsapp', 'Link do WhatsApp', 'Formato: https://wa.me/5592988288211'), tText(S.contact, 'email', 'E-mail'), tText(S.contact, 'instagram', 'Instagram', 'Ex.: @oalexeditor')));
}

function tabAparencia(p) {
  const t = S.theme;
  const sample = (k, name) => {
    const b = h('div', { style: 'position:relative;height:130px;border-radius:14px;overflow:hidden;display:grid;place-items:center;border:1px solid var(--line)' });
    const g = h('div', { style: 'position:absolute;inset:0' });
    const tx = h('div', { style: 'position:relative;font-family:Fraunces,Georgia,serif;font-weight:500;font-size:28px;text-align:center' }, 'Aa', h('div', { style: 'font-family:var(--sans);font-size:12px;opacity:.7' }, name));
    b.append(g, tx);
    const draw = () => {
      const T = window.SITE_TEXTURE(t.texture, t.textureColor, t.textureIntensity, t.textureSize);
      const inv = k === 'fg';
      b.style.background = t[k]; tx.style.color = inv ? t.bg : t.fg;
      g.style.backgroundImage = T.img; g.style.backgroundSize = T.size;
      g.style.opacity = (t.textureOpacity ?? 35) / 100; g.style.filter = inv ? 'invert(1)' : 'none';
    };
    draw(); previews.push(draw); return b;
  };
  p.append(
    panel('Cores do tema', 'Tema noturno: fundo escuro, textos e detalhes em creme. As cores de cada cliente ficam na aba "Clientes e vídeos".',
      h('div', { style: 'display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(160px,1fr))' }, sample('bg', 'Fundo principal'), sample('deep', 'Fundo profundo'), sample('fg', 'Seção creme')),
      tColor(t, 'bg', 'Cor principal (fundo)', 'A cor predominante do site.'),
      tColor(t, 'fg', 'Cor secundária (textos e detalhes)', 'Textos, botões, selos e a seção final.'),
      tColor(t, 'deep', 'Tom mais escuro', 'Seções alternadas e rodapé.'),
      h('div', {}, h('button', { type: 'button', class: 'b ghost sm', onclick: () => { Object.assign(t, { bg: '#0e0c0a', fg: '#e9e2ce', deep: '#02100c' }); dirty(); rerender(); } }, '↺ Voltar às cores originais'))),
    panel('Textura e padrões vintage', 'Fica por cima dos fundos e das fotos, e por baixo dos textos e vídeos. A prévia acima mostra o resultado na hora.',
      tSelect(t, 'texture', 'Tipo', null, window.SITE_TEXTURES),
      tColor(t, 'textureColor', 'Cor da textura', 'Creme fica elegante no tema noturno. Teste também tons dourados ou verdes.'),
      tRange(t, 'textureOpacity', 'Opacidade', '0 = invisível', 0, 100),
      tRange(t, 'textureIntensity', 'Volume (intensidade)', 'Quanto mais alto, mais marcada a textura.', 5, 100),
      tRange(t, 'textureSize', 'Tamanho do grão ou do padrão', null, 10, 100),
      h('div', {}, h('button', { type: 'button', class: 'b ghost sm', onclick: () => { Object.assign(t, { texture: 'papel', textureColor: '#e9e2ce', textureOpacity: 35, textureIntensity: 60, textureSize: 50 }); dirty(); rerender(); } }, '↺ Textura padrão')))
  );
}

const TABS = [
  { id: 'topo', name: '🏠 Topo', render: tabTopo }, { id: 'clientes', name: '🎬 Clientes e vídeos', render: tabClientes },
  { id: 'orcamento', name: '💰 Orçamento', render: tabOrcamento }, { id: 'secoes', name: '🧩 Seções do site', render: tabSecoes },
  { id: 'textos', name: '📝 Textos das seções', render: tabTextos }, { id: 'contato', name: '📞 Contato', render: tabContato },
  { id: 'aparencia', name: '🎨 Aparência', render: tabAparencia }
];
function renderTab() {
  previews = [];
  const nav = $('tabs'); nav.innerHTML = '';
  TABS.forEach(t => nav.append(h('button', { class: 'tab' + (t.id === tab ? ' on' : ''), onclick: () => { tab = t.id; renderTab(); window.scrollTo(0, 0); } }, t.name)));
  const p = $('panel'); p.innerHTML = '';
  TABS.find(t => t.id === tab).render(p);
}

/* ========== DADOS ========== */
async function load() {
  const { data, error } = await sb.from('site_content').select('data').eq('id', 1).maybeSingle();
  if (error) toast('Erro ao carregar: ' + error.message, true);
  const raw = data && data.data, empty = !raw || !Object.keys(raw).length;
  S = window.SITE_MIGRATE(empty ? null : raw);
  renderTab();
  if (empty) { dirty(); toast('Primeiro acesso: clique em Salvar para publicar.'); }
  else if (raw.version !== 3) { dirty(); toast('Atualizei seus dados para o formato novo. Clique em Salvar.'); }
  else setClean();
}
async function save() {
  const b = $('btnSave'); b.disabled = true; b.textContent = 'Salvando…';
  const { data, error } = await sb.from('site_content').update({ data: S, updated_at: new Date().toISOString() }).eq('id', 1).select('id');
  b.disabled = false; b.textContent = 'Salvar';
  if (error) return toast('Erro ao salvar: ' + error.message, true);
  if (!data || !data.length) return toast('Sem permissão para salvar. Confira o e-mail da política no Supabase.', true);
  setClean(); toast('Salvo! O site já está atualizado.');
}
$('btnSave').addEventListener('click', save);
document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && !$('app').hidden) { e.preventDefault(); save(); } });
$('btnBackup').addEventListener('click', () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' })); a.download = `site-backup-${new Date().toISOString().slice(0, 10)}.json`; a.click(); });
$('btnRestore').addEventListener('click', () => $('restoreFile').click());
$('restoreFile').addEventListener('change', async e => {
  const f = e.target.files[0]; if (!f) return;
  try { const json = JSON.parse(await f.text()); if (confirm('Substituir tudo pelo backup? Depois clique em Salvar.')) { S = window.SITE_MIGRATE(json); dirty(); renderTab(); } }
  catch { toast('Arquivo de backup inválido.', true); }
  e.target.value = '';
});

/* ========== LOGIN ========== */
function showLogin() { $('app').hidden = true; $('login').hidden = false; }
async function showApp() { $('login').hidden = true; $('app').hidden = false; await load(); }
$('login-form').addEventListener('submit', async e => {
  e.preventDefault(); $('login-error').hidden = true; $('login-btn').textContent = 'Entrando…';
  const { error } = await sb.auth.signInWithPassword({ email: $('email').value.trim(), password: $('password').value });
  $('login-btn').textContent = 'Entrar';
  if (error) { $('login-error').textContent = 'E-mail ou senha incorretos.'; $('login-error').hidden = false; return; }
  $('password').value = ''; showApp();
});
$('btnLogout').addEventListener('click', async () => { if (isDirty && !confirm('Há alterações não salvas. Sair mesmo assim?')) return; await sb.auth.signOut(); setClean(); showLogin(); });

/* Carrega o engine.js e só então libera o painel */
(function start() {
  const s = document.createElement('script');
  s.src = 'engine.js?v=3';
  s.onload = () => {
    showLogin();
    Promise.race([sb.auth.getSession(), new Promise(r => setTimeout(() => r({ data: { session: null } }), 4000))])
      .then(({ data: { session } }) => { if (session) showApp(); }).catch(() => {});
  };
  s.onerror = () => { document.body.innerHTML = '<p style="padding:24px">Não encontrei o arquivo <b>engine.js</b>. Suba ele no GitHub, na mesma pasta do admin.html.</p>'; };
  document.head.append(s);
})();