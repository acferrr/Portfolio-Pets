/* =====================================================================
   CONFIGURAÇÃO DO SUPABASE
   Project Settings → API Keys. Use a "publishable" ou a "anon" (pública).
   NUNCA use a "secret" ou "service_role" aqui.
   ===================================================================== */
window.SITE_CONFIG = {
  supabaseUrl: 'https://crqcphafhnqvbennfpax.supabase.co',
  supabaseAnonKey: 'sb_publishable_9Kr2fbJZR-VZS7NTQWf2dw_seL1wbnX',
  bucket: 'portfolio'
};

/* =====================================================================
   CONTEÚDO RESERVA
   Usado no primeiro acesso ao painel e se o Supabase estiver fora do ar.
   ===================================================================== */
window.SITE_DEFAULT = {
  "brandTitle": "ACEFER",
  "tagline": "Anúncios em vídeo para o mercado animal",
  "heroBg": "#f6f5f2",
  "profileImg": "https://cdn.myportfolio.com/43dfedde-5847-4bca-b10d-b4857cc8e5b5/62f4da30-6af2-4993-a1dd-c8079eb9cda1_rw_1920.png?h=6c8354a38e28c6fff18fc671e87418bb",
  "headline": "Anúncios em vídeo para empresas do mundo animal.",
  "subheadline": "Cavalo, boi ou pet: eu transformo o que você grava em anúncio que faz o cliente parar de rolar a tela, assistir até o fim e chamar no WhatsApp. Você não precisa entender de edição nem de tráfego. Essa parte é comigo.",
  "whatsappUrl": "https://wa.me/5592988288211",
  "email": "Alexferreirajobs@gmail.com",
  "instagram": "@oalexeditor",

  "audience": {
    "title": "Feito para quem vive do mercado animal",
    "items": [
      { "title": "Cavalos", "text": "Suplementos, rações, haras, centros de treinamento e leilões. Sei mostrar o que o criador e o treinador querem ver: o animal em forma, com desempenho e resultado na pista." },
      { "title": "Gado de corte e de leite", "text": "Implantes, sal mineral, nutrição e manejo. Anúncio direto, na língua do produtor, sem enrolação e sem termo de agência que ninguém entende." },
      { "title": "Cães e gatos", "text": "Suplementos, rações, petshops e clínicas veterinárias. Vídeo que fala com o coração do tutor e mostra por que o seu produto cuida melhor do bicho dele." },
      { "title": "Comércio e serviços do setor", "text": "Agropecuárias, distribuidoras e laboratórios veterinários. Se a sua empresa vende para quem cuida de animal, o seu anúncio é a minha especialidade." }
    ]
  },

  "clients": [
    {
      "id": "equinutri", "kicker": "Nutrição Equina", "title": "Equinutri Complete",
      "sub": "Suplemento alimentar em pó para equinos, formulado com creatina, lisina, vitaminas, minerais e probióticos.",
      "meta": "Meta Ads · Reels", "concept": false,
      "c": "#ff6600", "light": "#ff922c", "deep": "#d33a00",
      "heroImg": "", "bgImg": "https://images.squarespace-cdn.com/content/v1/6411e067b9dca209f3ee7939/02b5cf12-e3da-491e-9d46-2f1987a2a4ed/Saxon+Warrior+Coolmore+Stud+June+2022-263.jpg",
      "bgOpacity": 20, "gradientOpacity": 100,
      "groups": [
        { "name": "Ads", "clips": [
          { "label": "Ad 01", "dur": "", "src": "https://youtu.be/3UYEPhYp3Qw", "poster": "", "desc": "" },
          { "label": "Ad 02", "dur": "0:25", "src": "", "poster": "", "desc": "" }
        ]},
        { "name": "Reels", "clips": [
          { "label": "Reel 01", "dur": "0:24", "src": "", "poster": "", "desc": "" },
          { "label": "Reel 02", "dur": "0:19", "src": "", "poster": "", "desc": "" }
        ]}
      ]
    },
    {
      "id": "horseup", "kicker": "Nutrição Equina", "title": "HorseUp (Litho Equus)",
      "sub": "Fortificante mineral à base de algas para cavalos atletas.",
      "meta": "Meta Ads · Reels", "concept": false,
      "c": "#0049db", "light": "#2c75ff", "deep": "#001daf",
      "heroImg": "", "bgImg": "https://media.newyorker.com/photos/62a0e6e025b995d6cbae6b55/16:9/w_1280,c_limit/220620_r40567.jpg",
      "bgOpacity": 20, "gradientOpacity": 100,
      "groups": [
        { "name": "", "clips": [
          { "label": "Ad 01", "dur": "", "src": "https://youtu.be/cCNrad7EnEU", "poster": "", "desc": "" },
          { "label": "Ad 02", "dur": "", "src": "https://youtu.be/xFgmyfydPEI", "poster": "", "desc": "" },
          { "label": "Ad 03", "dur": "", "src": "https://youtu.be/eURhnCSF9JM", "poster": "", "desc": "" },
          { "label": "Ad 04", "dur": "", "src": "https://youtu.be/vyebr7jnpiM", "poster": "", "desc": "" }
        ]}
      ]
    },
    {
      "id": "hausther", "kicker": "Pecuária de Corte", "title": "Hausther Implants",
      "sub": "Implante para bovinos de corte, usado na fase de engorda.",
      "meta": "Meta Ads · Reels", "concept": false,
      "c": "#ffc800", "light": "#fff42c", "deep": "#d39c00",
      "heroImg": "", "bgImg": "https://a-z-animals.com/media/2022/10/Nelore-Cattle.jpg",
      "bgOpacity": 20, "gradientOpacity": 100,
      "groups": [
        { "name": "", "clips": [
          { "label": "Ad 01", "dur": "", "src": "https://youtu.be/S4DEl5iVU4Q", "poster": "", "desc": "" },
          { "label": "Ad 02", "dur": "", "src": "https://youtu.be/yqwsfKn8Afc", "poster": "", "desc": "" },
          { "label": "Ad 03", "dur": "", "src": "https://youtu.be/i0HMqgC1tsw", "poster": "", "desc": "" }
        ]}
      ]
    },
    {
      "id": "petvi", "kicker": "Suplementos Pet", "title": "Petvi",
      "sub": "Marca brasileira de suplementos para cães e gatos, desenvolvida com veterinários e zootecnistas e vendida em todo o país.",
      "meta": "Meta Ads", "concept": false,
      "c": "#204951", "light": "#4c757d", "deep": "#001d25",
      "heroImg": "", "bgImg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWi7T8yh8clfsRXl-eH7Cbie7cNaSHC8PTGvwK6I1llCMHPoh2ZsX9x5dv&s=10",
      "bgOpacity": 20, "gradientOpacity": 96,
      "groups": [
        { "name": "", "clips": [
          { "label": "Ad 01", "dur": "", "src": "https://youtu.be/Z9y2_FLBmUY", "poster": "", "desc": "" },
          { "label": "Ad 02", "dur": "", "src": "https://youtu.be/nz3PiUGa6Fw", "poster": "", "desc": "" },
          { "label": "Ad 03", "dur": "0:20", "src": "", "poster": "", "desc": "" }
        ]}
      ]
    }
  ],

  "testimonials": {
    "title": "Quem já anunciou comigo",
    "items": []
  },

  "services": [
    {
      "badge": "Principal", "tag": "Instagram e Facebook",
      "title": "Edição de anúncios em vídeo",
      "text": "Você grava do seu jeito, até no celular, no haras, no curral ou na loja. Eu transformo isso em anúncio pronto para rodar no Instagram e no Facebook.",
      "bullets": [
        "Começo forte, para a pessoa parar de rolar a tela",
        "Legenda na tela, porque muita gente assiste sem som",
        "Várias versões do mesmo anúncio, para descobrir qual vende mais"
      ]
    },
    {
      "badge": "Opcional", "tag": "Para quem não sabe o que falar",
      "title": "Roteiro pronto para gravar",
      "text": "Não sabe o que dizer na frente da câmera? Eu escrevo o roteiro antes. Você só lê e grava.",
      "bullets": [
        "Texto simples, do jeito que o seu cliente fala",
        "Indicação do que filmar em cada parte",
        "Final que chama o cliente para o WhatsApp ou para a compra"
      ]
    }
  ],

  "compare": {
    "title": "Por que um especialista e não um editor qualquer",
    "theirsLabel": "Editor que faz de tudo",
    "oursLabel": "Especialista no mercado animal",
    "theirs": [
      "Edita casamento, igreja, academia e, no meio, o seu produto",
      "Não sabe a diferença entre potro e cavalo atleta, nem entre boi de engorda e vaca leiteira",
      "Entrega um vídeo bonito, mas que não vende",
      "Some depois que recebe"
    ],
    "ours": [
      "Só trabalho com anúncios, e o meu portfólio é do mercado animal",
      "Falo a língua do criador, do produtor e do tutor",
      "Cada vídeo é feito para trazer cliente, não só para ficar bonito",
      "Acompanho os resultados e melhoro os próximos anúncios com você"
    ]
  },

  "process": {
    "title": "Simples assim",
    "steps": [
      { "title": "Conversa", "text": "Você me conta o que vende, para quem vende e o que quer com o anúncio." },
      { "title": "Roteiro", "text": "Se precisar, eu escrevo o que falar. É opcional." },
      { "title": "Gravação e edição", "text": "Você grava e me manda. Eu edito e entrego o anúncio pronto." },
      { "title": "Melhoria", "text": "Vemos juntos o que funcionou e fazemos os próximos ainda melhores." }
    ]
  },

  "about": {
    "title": "Quem está por trás",
    "photo": "",
    "name": "Alex Câmara Ferreira",
    "role": "Fundador da ACEFER · Editor de anúncios",
    "origin": "",
    "markets": [
      "Nutrição equina",
      "Pecuária de corte",
      "Suplementos pet",
      "Investimentos"
    ],
    "text": "Edito vídeos desde 2023. Comecei com conteúdo para redes sociais e, em 2024, virei editor de anúncios: vídeos feitos para vender, não só para ganhar curtida. Meu primeiro cliente de anúncios foi a HorseUp, de suplementação para cavalos. Depois editei para outros mercados, como o de investimentos, e foi no mercado animal que encontrei a minha especialidade.",
    "companyTitle": "Sobre a ACEFER",
    "companyText": "A ACEFER existe para um tipo de empresa: a que vende para quem cria e cuida de animais. Cada anúncio é pensado para o seu cliente, seja o criador, o produtor ou o tutor, e feito para trazer venda, não só visualização. Você fala direto comigo, da primeira conversa à entrega."
  },

  "cta": {
    "title": "Sua empresa trabalha com animais? Então eu sei como anunciar para ela.",
    "button": "Chamar no WhatsApp"
  }
};