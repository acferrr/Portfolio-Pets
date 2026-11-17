/* =====================================================================
   CONFIGURAÇÃO DO SUPABASE
   ===================================================================== */
window.SITE_CONFIG = {
  supabaseUrl: 'https://crqcphafhnqvbennfpax.supabase.co',
  supabaseAnonKey: 'sb_publishable_9Kr2fbJZR-VZS7NTQWf2dw_seL1wbnX',
  bucket: 'portfolio'
};

/* =====================================================================
   CONTEÚDO PADRÃO (usado no primeiro acesso e se o Supabase cair)
   ===================================================================== */
window.SITE_DEFAULT = {
  version: 2,

  theme: { primary: '#1a3f2d', cream: '#e9e2ce', paper: '#ffffff', texture: true, textureStrength: 50 },

  brand: {
    name: 'ACEFER',
    tagline: 'Anúncios em vídeo para o mercado animal',
    profileImg: 'https://cdn.myportfolio.com/43dfedde-5847-4bca-b10d-b4857cc8e5b5/62f4da30-6af2-4993-a1dd-c8079eb9cda1_rw_1920.png?h=6c8354a38e28c6fff18fc671e87418bb'
  },

  contact: {
    whatsapp: 'https://wa.me/5592988288211',
    email: 'Alexferreirajobs@gmail.com',
    instagram: '@oalexeditor'
  },

  hero: {
    headline: 'Anúncios em vídeo para empresas do mundo animal.',
    subheadline: 'Cavalo, boi ou pet: eu transformo o que você grava em anúncio que faz o cliente parar de rolar a tela, assistir até o fim e chamar no WhatsApp. Você não precisa entender de edição nem de tráfego. Essa parte é comigo.',
    showInstaBadge: true,
    badgeRight: 'Especialista no mercado animal',
    ctaPrimary: 'Solicitar orçamento',
    ctaSecondary: 'Ver cases em vídeo',
    deckHint: 'Toque em um cliente para ver os vídeos ↓'
  },

  audience: {
    eyebrow: 'Para quem é',
    title: 'Feito para quem vive do mercado animal',
    items: [
      { title: 'Cavalos', text: 'Suplementos, rações, haras, centros de treinamento e leilões. Sei mostrar o que o criador e o treinador querem ver: o animal em forma, com desempenho e resultado na pista.' },
      { title: 'Gado de corte e de leite', text: 'Implantes, sal mineral, nutrição e manejo. Anúncio direto, na língua do produtor, sem enrolação e sem termo de agência que ninguém entende.' },
      { title: 'Cães e gatos', text: 'Suplementos, rações, petshops e clínicas veterinárias. Vídeo que fala com o coração do tutor e mostra por que o seu produto cuida melhor do bicho dele.' },
      { title: 'Comércio e serviços do setor', text: 'Agropecuárias, distribuidoras e laboratórios veterinários. Se a sua empresa vende para quem cuida de animal, o seu anúncio é a minha especialidade.' }
    ]
  },

  clients: [
    {
      id: 'equinutri', kicker: 'Nutrição Equina', title: 'Equinutri Complete',
      sub: 'Suplemento alimentar em pó para equinos, formulado com creatina, lisina, vitaminas, minerais e probióticos.',
      meta: 'Meta Ads · Reels', concept: false,
      c: '#ff6600', light: '#ff922c', deep: '#d33a00',
      heroImg: '', heroImgZoom: 0, heroImgX: 50, heroImgY: 50, heroOverlay: 55, showTitle: true,
      bgImg: 'https://images.squarespace-cdn.com/content/v1/6411e067b9dca209f3ee7939/02b5cf12-e3da-491e-9d46-2f1987a2a4ed/Saxon+Warrior+Coolmore+Stud+June+2022-263.jpg',
      bgOpacity: 20, gradientOpacity: 100,
      groups: [
        { name: 'Ads', clips: [
          { label: 'Ad 01', dur: '', src: 'https://youtu.be/3UYEPhYp3Qw', poster: '' },
          { label: 'Ad 02', dur: '0:25', src: '', poster: '' }
        ]},
        { name: 'Reels', clips: [
          { label: 'Reel 01', dur: '0:24', src: '', poster: '' },
          { label: 'Reel 02', dur: '0:19', src: '', poster: '' }
        ]}
      ]
    },
    {
      id: 'horseup', kicker: 'Nutrição Equina', title: 'HorseUp (Litho Equus)',
      sub: 'Fortificante mineral à base de algas para cavalos atletas.',
      meta: 'Meta Ads · Reels', concept: false,
      c: '#0049db', light: '#2c75ff', deep: '#001daf',
      heroImg: '', heroImgZoom: 0, heroImgX: 50, heroImgY: 50, heroOverlay: 55, showTitle: true,
      bgImg: 'https://media.newyorker.com/photos/62a0e6e025b995d6cbae6b55/16:9/w_1280,c_limit/220620_r40567.jpg',
      bgOpacity: 20, gradientOpacity: 100,
      groups: [
        { name: '', clips: [
          { label: 'Ad 01', dur: '', src: 'https://youtu.be/cCNrad7EnEU', poster: '' },
          { label: 'Ad 02', dur: '', src: 'https://youtu.be/xFgmyfydPEI', poster: '' },
          { label: 'Ad 03', dur: '', src: 'https://youtu.be/eURhnCSF9JM', poster: '' },
          { label: 'Ad 04', dur: '', src: 'https://youtu.be/vyebr7jnpiM', poster: '' }
        ]}
      ]
    },
    {
      id: 'hausther', kicker: 'Pecuária de Corte', title: 'Hausther Implants',
      sub: 'Implante para bovinos de corte, usado na fase de engorda.',
      meta: 'Meta Ads · Reels', concept: false,
      c: '#ffc800', light: '#fff42c', deep: '#d39c00',
      heroImg: '', heroImgZoom: 0, heroImgX: 50, heroImgY: 50, heroOverlay: 55, showTitle: true,
      bgImg: 'https://a-z-animals.com/media/2022/10/Nelore-Cattle.jpg',
      bgOpacity: 20, gradientOpacity: 100,
      groups: [
        { name: '', clips: [
          { label: 'Ad 01', dur: '', src: 'https://youtu.be/S4DEl5iVU4Q', poster: '' },
          { label: 'Ad 02', dur: '', src: 'https://youtu.be/yqwsfKn8Afc', poster: '' },
          { label: 'Ad 03', dur: '', src: 'https://youtu.be/i0HMqgC1tsw', poster: '' }
        ]}
      ]
    },
    {
      id: 'petvi', kicker: 'Suplementos Pet', title: 'Petvi',
      sub: 'Marca brasileira de suplementos para cães e gatos, desenvolvida com veterinários e zootecnistas e vendida em todo o país.',
      meta: 'Meta Ads', concept: false,
      c: '#204951', light: '#4c757d', deep: '#001d25',
      heroImg: '', heroImgZoom: 0, heroImgX: 50, heroImgY: 50, heroOverlay: 55, showTitle: true,
      bgImg: '', bgOpacity: 20, gradientOpacity: 96,
      groups: [
        { name: '', clips: [
          { label: 'Ad 01', dur: '', src: 'https://youtu.be/Z9y2_FLBmUY', poster: '' },
          { label: 'Ad 02', dur: '', src: 'https://youtu.be/nz3PiUGa6Fw', poster: '' },
          { label: 'Ad 03', dur: '0:20', src: '', poster: '' }
        ]}
      ]
    }
  ],

  testimonials: { eyebrow: 'Depoimentos', title: 'Quem já anunciou comigo', items: [] },

  plans: {
    eyebrow: 'Orçamento',
    title: 'Como posso te ajudar?',
    text: '',
    attention: 'Selecione o que você precisa',
    items: [
      {
        title: 'Só edição', tag: 'Você grava, eu edito',
        desc: 'Você me manda as gravações e recebe o anúncio pronto para rodar no Instagram e no Facebook.',
        bullets: [
          'Começo forte, para a pessoa parar de rolar a tela',
          'Legenda na tela, porque muita gente assiste sem som',
          'Várias versões do mesmo anúncio, para descobrir qual vende mais'
        ],
        button: 'Quero só a edição',
        message: 'Olá, Alex! Vim pelo site e quero um orçamento de *edição de anúncios*.',
        highlight: false
      },
      {
        title: 'Edição + roteiro', tag: 'Mais completo',
        desc: 'Eu escrevo o roteiro, você só lê e grava, e eu edito. Ideal para quem não sabe o que falar na câmera.',
        bullets: [
          'Roteiro simples, do jeito que o seu cliente fala',
          'Indicação do que filmar em cada parte',
          'Edição completa, com versões para teste'
        ],
        button: 'Quero edição + roteiro',
        message: 'Olá, Alex! Vim pelo site e quero um orçamento de *edição + roteiro*.',
        highlight: true
      }
    ]
  },

  services: {
    eyebrow: 'Serviços',
    title: 'O que eu entrego',
    items: [
      { badge: 'Principal', tag: 'Instagram e Facebook', title: 'Edição de anúncios em vídeo',
        text: 'Você grava do seu jeito, até no celular, no haras, no curral ou na loja. Eu transformo isso em anúncio pronto para rodar.',
        bullets: ['Começo forte, para a pessoa parar de rolar a tela', 'Legenda na tela, porque muita gente assiste sem som', 'Várias versões do mesmo anúncio, para descobrir qual vende mais'] },
      { badge: 'Opcional', tag: 'Para quem não sabe o que falar', title: 'Roteiro pronto para gravar',
        text: 'Não sabe o que dizer na frente da câmera? Eu escrevo o roteiro antes. Você só lê e grava.',
        bullets: ['Texto simples, do jeito que o seu cliente fala', 'Indicação do que filmar em cada parte', 'Final que chama o cliente para o WhatsApp ou para a compra'] }
    ]
  },

  compare: {
    eyebrow: 'A diferença',
    title: 'Por que um especialista e não um editor qualquer',
    theirsLabel: 'Editor que faz de tudo',
    oursLabel: 'Especialista no mercado animal',
    theirs: [
      'Edita casamento, igreja, academia e, no meio, o seu produto',
      'Não sabe a diferença entre potro e cavalo atleta, nem entre boi de engorda e vaca leiteira',
      'Entrega um vídeo bonito, mas que não vende',
      'Some depois que recebe'
    ],
    ours: [
      'Só trabalho com anúncios, e o meu portfólio é do mercado animal',
      'Falo a língua do criador, do produtor e do tutor',
      'Cada vídeo é feito para trazer cliente, não só para ficar bonito',
      'Acompanho os resultados e melhoro os próximos anúncios com você'
    ],
    button: 'Solicitar orçamento'
  },

  process: {
    eyebrow: 'Processo',
    title: 'Simples assim',
    steps: [
      { title: 'Conversa', text: 'Você me conta o que vende, para quem vende e o que quer com o anúncio.' },
      { title: 'Roteiro', text: 'Se precisar, eu escrevo o que falar. É opcional.' },
      { title: 'Gravação e edição', text: 'Você grava e me manda. Eu edito e entrego o anúncio pronto.' },
      { title: 'Melhoria', text: 'Vemos juntos o que funcionou e fazemos os próximos ainda melhores.' }
    ]
  },

  about: {
    eyebrow: 'Fundador',
    title: 'Quem está por trás',
    photo: '',
    name: 'Alex Câmara Ferreira',
    role: 'Fundador da ACEFER · Editor de anúncios',
    origin: '',
    markets: ['Nutrição equina', 'Pecuária de corte', 'Suplementos pet', 'Investimentos'],
    text: 'Edito vídeos desde 2023. Comecei com conteúdo para redes sociais e, em 2024, virei editor de anúncios: vídeos feitos para vender, não só para ganhar curtida. Meu primeiro cliente de anúncios foi a HorseUp, de suplementação para cavalos. Depois editei para outros mercados, como o de investimentos, e foi no mercado animal que encontrei a minha especialidade.',
    companyTitle: 'Sobre a ACEFER',
    companyText: 'A ACEFER existe para um tipo de empresa: a que vende para quem cria e cuida de animais. Cada anúncio é pensado para o seu cliente, seja o criador, o produtor ou o tutor, e feito para trazer venda, não só visualização. Você fala direto comigo, da primeira conversa à entrega.'
  },

  cta: {
    eyebrow: 'Próximo passo',
    title: 'Sua empresa trabalha com animais? Então eu sei como anunciar para ela.',
    button: 'Solicitar orçamento'
  },

  custom: [],

  layout: [
    { key: 'audience', on: true },
    { key: 'clients', on: true },
    { key: 'testimonials', on: true },
    { key: 'plans', on: true },
    { key: 'services', on: false },
    { key: 'compare', on: true },
    { key: 'process', on: true },
    { key: 'about', on: true },
    { key: 'cta', on: true }
  ]
};

/* =====================================================================
   CONVERSOR: junta o que está salvo com o padrão e converte o formato
   antigo para o novo. Não precisa mexer aqui.
   ===================================================================== */
window.SITE_MIGRATE = function (saved) {
  const D = JSON.parse(JSON.stringify(window.SITE_DEFAULT));
  const isObj = v => v && typeof v === 'object' && !Array.isArray(v);
  const clean = o => { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = o[k]; return r; };
  let v = isObj(saved) ? saved : {};

  // Formato antigo (versão 1)
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

  const out = D;
  for (const k in v) {
    if (v[k] === undefined) continue;
    out[k] = isObj(D[k]) && isObj(v[k]) ? { ...D[k], ...clean(v[k]) } : v[k];
  }

  const CD = { id: '', kicker: '', title: 'Novo cliente', sub: '', meta: 'Meta Ads · Reels', concept: false,
    c: '#1a3f2d', light: '#467060', deep: '#0f2a1d', heroImg: '', heroImgZoom: 0, heroImgX: 50, heroImgY: 50,
    heroOverlay: 55, showTitle: true, bgImg: '', bgOpacity: 20, gradientOpacity: 60, groups: [] };
  out.clients = (Array.isArray(out.clients) ? out.clients : []).map(c => ({ ...CD, ...clean(c) }));
  out.clients.forEach(c => { c.groups = (c.groups || []).map(g => ({ name: g.name || '', clips: (g.clips || []).map(x => ({ label: '', dur: '', src: '', poster: '', ...x })) })); });

  out.custom = (Array.isArray(out.custom) ? out.custom : []).map(s => ({
    eyebrow: '', title: '', text: '', bg: 'auto', media: [], ...s,
    id: s.id || ('s' + Math.random().toString(36).slice(2, 8))
  }));

  ['plans', 'services', 'audience', 'testimonials'].forEach(k => { if (!Array.isArray(out[k].items)) out[k].items = []; });
  out.plans.items.forEach(p => { if (!Array.isArray(p.bullets)) p.bullets = []; });
  out.services.items.forEach(p => { if (!Array.isArray(p.bullets)) p.bullets = []; });
  if (!Array.isArray(out.process.steps)) out.process.steps = [];
  ['theirs', 'ours'].forEach(k => { if (!Array.isArray(out.compare[k])) out.compare[k] = []; });
  if (!Array.isArray(out.about.markets)) out.about.markets = [];

  // Ordem das seções
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
  out.version = 2;
  return out;
};