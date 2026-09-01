/**
 * Brazilian Portuguese copy. This is the source language of the project: the
 * English dictionary is a translation of this file, never the other way round.
 */
export const ptBR = {
  locale: "pt-BR",
  htmlLang: "pt-BR",
  localeName: "Português",
  localeShort: "PT",
  otherLocaleName: "English",
  otherLocaleShort: "EN",

  meta: {
    siteName: "EDS RETRÔ GAMES",
    title: "EDSGAMES — Emuladores e jogos retrô, 100% gratuito",
    description:
      "Centenas de jogos e emuladores, consoles antigos e atuais, 100% gratuito para baixar. Transforme seu computador numa máquina multi jogos com o EDSBATOCERA e o EDSRETROBAT.",
    downloadTitle: "Download — EDSGAMES",
    downloadDescription:
      "Tudo o que você precisa saber antes de baixar o EDSBATOCERA e o EDSRETROBAT, com o passo a passo completo da instalação.",
    storeTitle: "Loja — EDSGAMES",
    storeDescription:
      "HDs e pendrives de 32 GB a 500 GB com sistema e jogos já instalados. Só plugar, usar e se divertir.",
    contributeTitle: "Contribua via PIX — EDSGAMES",
    contributeDescription:
      "O EDSGAMES é um projeto sem fins lucrativos mantido pela comunidade. Contribua com qualquer valor via PIX.",
  },

  nav: {
    home: "Início",
    about: "Sobre",
    features: "Recursos",
    store: "Loja",
    download: "Download",
    contribute: "Contribua",
    faq: "Dúvidas",
    contact: "Contato",
    menu: "Menu",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    skipToContent: "Pular para o conteúdo",
  },

  actions: {
    downloadFree: "Baixar gratuitamente",
    learnMore: "Saiba mais",
    seeStore: "Ver a loja",
    contribute: "Contribuir via PIX",
    backToHome: "Voltar ao início",
    playVideo: "Assistir ao vídeo de apresentação",
  },

  hero: {
    badge: "Download 100% gratuito",
    title: "Emulador de video games",
    subtitle:
      "Centenas de jogos e emuladores, consoles antigos e atuais, 100% gratuito pra baixar.",
    lead: "Reviva momentos mágicos com jogos nostálgicos que marcaram várias gerações!",
    screenshotAlt:
      "Interface do EDSGAMES mostrando a capa de um jogo de Neo Geo CD e os consoles disponíveis.",
    stats: [
      { value: "200+", label: "Sistemas emulados" },
      { value: "32 GB", label: "Já vem pronto" },
      { value: "R$ 0", label: "Custo para baixar" },
    ],
  },

  intro: {
    eyebrow: "Apresentação",
    title: "Transforme seu computador numa máquina multi jogos!",
    videoLabel: "Vídeo de apresentação do EDSGAMES",
  },

  about: {
    eyebrow: "Sobre",
    title: "RetroBAT e Batocera",
    paragraphs: [
      "O EDSGAMES é um conjunto de emuladores baseado no BATOCERA e no RETROBAT. Mesmo os dois tendo o mesmo propósito e ambientes gráficos muito parecidos, cada um é diferente: enquanto o RETROBAT é um programa executável que roda dentro do Windows, o BATOCERA é um sistema operacional bootável baseado em GNU/Linux.",
      "Como mencionado, os dois são um conjunto de emuladores, sendo a principal diferença que um é executável e o outro é instalado em um HD ou pendrive independente que pode ser transportado, caso queira instalar num HD externo.",
      "Ambos são GRATUITOS e possuem 32 GB de armazenamento, podendo ser expandidos conforme forem adicionados mais jogos.",
    ],
    systems: [
      {
        name: "EDSBATOCERA",
        kind: "Sistema bootável",
        description:
          "Baseado em GNU/Linux. É gravado em um pendrive, cartão SD ou HD e inicia sozinho, sem depender do Windows. Ideal para transformar um computador antigo num console dedicado.",
      },
      {
        name: "EDSRETROBAT",
        kind: "Programa para Windows",
        description:
          "Um executável que roda dentro do Windows que você já usa. É só extrair e abrir o RetroBat.exe — sem formatar nada, sem trocar de sistema.",
      },
    ],
    storageNote: {
      title: "O sistema conta com 32 GB após extraído",
      description:
        "Com diversos jogos instalados e vários emuladores pré-configurados.",
    },
  },

  requirements: {
    eyebrow: "Antes de começar",
    title: "O que você irá precisar",
    items: [
      "1 unidade de no mínimo 32 GB de espaço: pendrive, HD, SSD ou cartão SD.",
      "Computador ou notebook com acesso à internet.",
      "Programa de extração, como o WinRAR ou o 7-Zip.",
      "Programa de gravação da imagem do sistema, como o Rufus ou o Balena Etcher.",
      "Recomendável pelo menos um controle (joystick).",
    ],
  },

  features: {
    eyebrow: "O que os emuladores EDSGAMES podem lhe proporcionar",
    title: "Feito para quem cresceu jogando",
    items: [
      {
        title: "Nostalgia pura",
        description:
          "Reviva e relembre momentos nostálgicos dos arcades e dos consoles que marcaram gerações.",
      },
      {
        title: "100% gratuito",
        description:
          "O sistema é seu! Para usar, distribuir e personalizar como quiser.",
      },
      {
        title: "Centenas de jogos e emuladores",
        description:
          "O sistema conta com aplicativo nativo para você baixar quantos jogos quiser.",
      },
      {
        title: "Suporte e contribuição",
        description:
          "Participe das nossas redes sociais: você encontrará dicas, tutoriais e fará grandes amizades com a comunidade retrô games.",
      },
    ],
  },

  store: {
    eyebrow: "Loja",
    title: "Compre HDs ou pendrives com sistema e jogos",
    lead: "Temos HDs e pendrives de 32 a 500 GB disponíveis para venda, já prontos para uso. É só plugar e se divertir.",
    paragraphs: [
      "Caso você não queira baixar, ou mesmo não tenha um HD ou pendrive disponível, pode adquirir na nossa loja virtual — tanto pendrives quanto HDs já preparados e com tudo pronto.",
      "Só plugar, usar e se divertir com seus amigos e familiares.",
    ],
    products: [
      {
        name: "HD externo",
        capacity: "500 GB",
        highlight: "420 GB de jogos",
        description:
          "Acompanha case para usar como HD externo, se preferir. Pode ser alterado ou expandido da maneira que quiser.",
        systems: [
          "Windows",
          "PlayStation 1",
          "PlayStation 2",
          "PlayStation 3",
          "Xbox 360",
          "e muito mais",
        ],
      },
      {
        name: "Pendrive",
        capacity: "32 GB",
        highlight: "20 GB de jogos",
        description:
          "Compacto, leve e pronto para levar para a casa de qualquer amigo. Plugou, jogou.",
        systems: [
          "Super NES",
          "PlayStation 1",
          "GameCube",
          "PlayStation 2",
          "Dreamcast",
          "Mega Drive",
          "Nintendo 64",
        ],
      },
    ],
    shippingNote: "Compre e receba no conforto da sua casa!",
    paymentsLabel: "Formas de pagamento",
    contactCta: "Falar com as vendas",
  },

  testimonials: {
    eyebrow: "Feedbacks",
    title: "E o que dizem nossos colegas?",
    items: [
      {
        name: "Marcelo Rubens",
        role: "Usuário do Batocera",
        quote:
          "Simplesmente perfeito! Desde que instalei abandonei o meu PlayStation 4.",
        avatar: "/img/avatar-1.jpg",
      },
      {
        name: "Julia Maria",
        role: "Usuária do RetroBAT",
        quote:
          "Eu não tinha certeza se conseguiria baixar e instalar, preferi comprar pro meu marido — ele adorou.",
        avatar: "/img/avatar-2.jpg",
      },
      {
        name: "Fabiana Almeida",
        role: "Usuária do Batocera",
        quote:
          "Nossa... sem comentários, só elogios. Lembro que jogava com meus irmãos.",
        avatar: "/img/avatar-3.jpg",
      },
      {
        name: "Igor Dias Bonet",
        role: "Usuário do Batocera",
        quote:
          "Recomendo! Não tinha noção, achei que seria apenas um desses emuladores chineses com joguinhos bobos.",
        avatar: "/img/avatar-4.jpg",
      },
    ],
  },

  pix: {
    eyebrow: "Contribuição",
    title: "Contribua com nosso projeto!",
    lead: "Faça uma doação de qualquer valor via PIX. Escaneie o QR code ou copie a chave.",
    description:
      "Somos uma equipe de entusiastas apaixonados por games, jogos de arcade antigos e modernos, e trabalhamos para proporcionar a melhor diversão para todos. Somos uma comunidade sem fins lucrativos e contamos com a colaboração de todos: se puder ajudar com qualquer valor via PIX, ficaremos muito agradecidos.",
    qrAlt: "QR code PIX do EDSGAMES para contribuições",
    copyButton: "Copiar chave PIX",
    copied: "Chave PIX copiada!",
    copyFailed: "Não foi possível copiar automaticamente. Selecione e copie a chave abaixo.",
    keyLabel: "Chave PIX (copia e cola)",
    receiverLabel: "Recebedor",
    receiverCity: "Cotia, SP",
    howToTitle: "Como contribuir em 3 passos",
    howToSteps: [
      "Abra o aplicativo do seu banco e escolha a opção PIX.",
      "Toque em “Ler QR code” e aponte a câmera para o código ao lado — ou use “PIX copia e cola” com a chave copiada.",
      "Digite o valor que quiser doar e confirme. Qualquer valor ajuda.",
    ],
    useTitle: "Para onde vai a sua contribuição",
    useDescription:
      "As doações cobrem hospedagem, domínio, armazenamento dos arquivos e o tempo dedicado a manter os sistemas atualizados e os tutoriais no ar. O EDSGAMES não tem fins lucrativos e o download continuará sempre gratuito.",
  },

  faq: {
    eyebrow: "Perguntas",
    title: "Frequentes",
    items: [
      {
        question: "Funciona em celular?",
        answer:
          "Infelizmente ainda não há suporte para celulares e smartphones (pelo menos por enquanto).",
      },
      {
        question: "Quantos emuladores suporta?",
        answer:
          "Suporta e emula mais de 200 sistemas diferentes, incluindo consoles clássicos de 8 bits, máquinas de fliperama (arcade), computadores antigos e plataformas mais modernas como PlayStation 2, GameCube e Wii U, entre outros.",
      },
      {
        question: "Quais são os requisitos?",
        answer:
          "O computador precisa de pelo menos 1 GB de RAM (recomenda-se 2 GB ou mais), processador x86_64 de 64 bits (compatível com conjuntos de instruções modernos) e um pendrive, cartão SD ou HD/SSD com capacidade mínima de 32 GB para o sistema e os jogos.",
      },
      {
        question: "Tem garantia?",
        answer: "Não.",
      },
      {
        question: "Possui suporte?",
        answer:
          "Somos uma comunidade sem fins lucrativos, apenas compartilhamos conhecimento. Não podemos garantir que todos os jogos ou todos os emuladores funcionarão perfeitamente no seu equipamento. Porém, contamos com fóruns e vídeos tutoriais, por isso é muito recomendado participar das nossas redes sociais — e qualquer dúvida que tiver é só perguntar.",
      },
    ],
  },

  contact: {
    eyebrow: "Contato",
    title: "Atendimento somente para vendas!",
    description:
      "Atendimento somente para vendas de HDs ou pendrives com sistemas prontos.",
    hoursLabel: "Horário de atendimento",
    hours: "Segunda a sexta-feira, das 10:00 às 16:00",
    emailLabel: "E-mail",
    email: "edsgames.retro@gmail.com",
    cta: "Contate-nos",
  },

  downloadPage: {
    eyebrow: "Download",
    title: "Baixe o EDSGAMES",
    lead: "Coisas que você precisa saber antes de fazer o download.",
    beforeYouStart: [
      "A primeira coisa é possuir um computador ou notebook. O sistema ainda não funciona em celulares ou smart TVs.",
      "Os dois são um conjunto de emuladores. A principal diferença é que um é executável (EDSRETROBAT) e roda dentro do Windows, e o outro é instalado em um HD ou pendrive independente que pode ser transportado, caso queira instalar num HD externo (EDSBATOCERA).",
      "Ambos são GRATUITOS e possuem 32 GB de armazenamento, podendo ser expandidos conforme forem adicionados jogos. O processo de download é o mesmo para os dois.",
    ],
    requirementsTitle: "Requisitos",
    requirements:
      "O computador precisa de pelo menos 1 GB de RAM (recomenda-se 2 GB ou mais), processador x86_64 de 64 bits (compatível com conjuntos de instruções modernos) e um pendrive, cartão SD ou HD/SSD com capacidade mínima de 32 GB para o sistema e os jogos.",
    needTitle: "Você irá precisar",
    needItems: [
      "Pendrive ou HD de no mínimo 32 GB.",
      "WinRAR ou similar, para extrair o programa.",
      "Programa de gravação da imagem do sistema, como o Balena Etcher.",
      "Recomendamos um controle (joystick) para uma melhor experiência nos jogos, mas você pode usar o teclado do PC caso não tenha um.",
    ],
    warningTitle: "Atenção, importante!",
    warningBody:
      "Seu dispositivo será apagado e formatado — tenha ciência disso. Se possuir dados importantes, faça um backup antes.",
    toolsTitle: "Ferramentas necessárias",
    tools: [
      { name: "WinRAR", description: "Para extrair o arquivo baixado.", href: "https://www.win-rar.com/predownload.html?&L=9" },
      { name: "Balena Etcher", description: "Para gravar a imagem no pendrive ou HD.", href: "https://etcher.balena.io/" },
    ],
    downloadsTitle: "Links de download",
    downloadsNote:
      "Na janela que abrir, clique em “Inscrever-se no canal” e em “Link pra desbloquear” para liberar o download. Ignore as mensagens do Google Drive e clique em “Fazer download mesmo assim”.",
    downloads: [
      {
        name: "EDSBATOCERA-V32GB",
        description: "Sistema bootável baseado em GNU/Linux, gravado no pendrive ou HD.",
        href: "https://sub4unlock.io/T2Am7",
      },
      {
        name: "EDSRETROBAT-V32GB",
        description: "Executável que roda dentro do Windows.",
        href: "https://sub4unlock.io/lCE4g",
      },
    ],
    stepsTitle: "Instruções para o EDSBATOCERA",
    steps: [
      "Depois de feito o download, abra a pasta na qual salvou o arquivo.",
      "Com o botão direito do mouse, selecione “Extrair aqui”.",
      "Abra o Balena Etcher ou outro programa de sua preferência e copie o arquivo para a sua unidade.",
      "Feitas essas etapas, reinicie o computador ou notebook apertando a tecla DEL (ou Delete) do teclado e selecione a unidade na qual gravou o EDSBATOCERA.",
      "Agora é só se divertir!",
    ],
    retrobatTitle: "Instruções para o EDSRETROBAT",
    retrobatSteps: [
      "Para o EDSRETROBAT, o processo de download é o mesmo do EDSBATOCERA.",
      "Depois de fazer o download e extrair os arquivos, procure pelo executável RetroBat.exe.",
      "E bom divertimento!",
    ],
    expandNote:
      "O espaço do HD ou do pendrive irá aumentar conforme forem adicionados mais jogos. Por enquanto ele possui apenas 32 GB, mas coloque quantos jogos quiser — ou quantos o seu hardware suportar.",
    gamesListAlt: "Lista de jogos e sistemas incluídos no EDSGAMES",
  },

  storePage: {
    eyebrow: "Loja",
    title: "HDs e pendrives prontos para jogar",
    lead: "Se você prefere não baixar nem gravar nada, nós enviamos a unidade já pronta. É só plugar e jogar.",
    includedTitle: "O que vem em todas as unidades",
    included: [
      "Sistema EDSGAMES já instalado e configurado.",
      "Emuladores pré-configurados, prontos para uso.",
      "Jogos já organizados por console.",
      "Suporte da comunidade em nossas redes sociais.",
    ],
    howToOrderTitle: "Como comprar",
    howToOrder: [
      "Envie um e-mail para edsgames.retro@gmail.com dizendo qual unidade lhe interessa.",
      "O atendimento responde de segunda a sexta-feira, das 10:00 às 16:00.",
      "Combinamos o pagamento e o envio, e você recebe em casa.",
    ],
    disclaimerTitle: "Sem garantia",
    disclaimerBody:
      "Somos uma comunidade sem fins lucrativos e não podemos garantir que todos os jogos ou emuladores funcionarão perfeitamente em todo equipamento. Compre com essa ciência.",
  },

  footer: {
    tagline: "Os melhores emuladores e os melhores jogos, tudo em um só lugar!",
    aboutTitle: "Sobre o EDSGAMES",
    navTitle: "Navegação",
    contactTitle: "Contato",
    rights: "Todos os direitos reservados.",
    disclaimer:
      "O EDSGAMES é um projeto comunitário sem fins lucrativos. Não distribuímos, vendemos nem hospedamos jogos protegidos por direitos autorais.",
    languageLabel: "Idioma",
  },

  notFound: {
    title: "Game over",
    description: "A página que você procura não existe — ou foi para outro cartucho.",
  },
};

export type Dictionary = typeof ptBR;
