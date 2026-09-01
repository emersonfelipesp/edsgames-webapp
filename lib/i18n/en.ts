import type { Dictionary } from "./pt-BR";

/**
 * English translation of `pt-BR.ts`. It follows the Portuguese source closely:
 * the voice, the claims and the caveats are the same, only the language differs.
 */
export const en: Dictionary = {
  locale: "en",
  htmlLang: "en",
  localeName: "English",
  localeShort: "EN",
  otherLocaleName: "Português",
  otherLocaleShort: "PT",

  meta: {
    siteName: "EDS RETRO GAMES",
    title: "EDSGAMES — Retro emulators and games, 100% free",
    description:
      "Hundreds of games and emulators, old and current consoles, 100% free to download. Turn your computer into a multi-game machine with EDSBATOCERA and EDSRETROBAT.",
    downloadTitle: "Download — EDSGAMES",
    downloadDescription:
      "Everything you need to know before downloading EDSBATOCERA and EDSRETROBAT, with the full step-by-step install guide.",
    storeTitle: "Store — EDSGAMES",
    storeDescription:
      "Hard drives and USB sticks from 32 GB to 500 GB with the system and games already installed. Just plug in, play and have fun.",
    contributeTitle: "Contribute via PIX — EDSGAMES",
    contributeDescription:
      "EDSGAMES is a non-profit project kept alive by its community. Contribute any amount via PIX.",
  },

  theme: {
    label: "Theme",
    current: {
      system: "Theme: following the system",
      light: "Theme: light",
      dark: "Theme: dark",
    },
    switchTo: {
      system: "Switch to following the system",
      light: "Switch to the light theme",
      dark: "Switch to the dark theme",
    },
  },

  nav: {
    home: "Home",
    about: "About",
    features: "Features",
    store: "Store",
    download: "Download",
    contribute: "Contribute",
    faq: "FAQ",
    contact: "Contact",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
  },

  actions: {
    downloadFree: "Download for free",
    learnMore: "Learn more",
    seeStore: "Visit the store",
    contribute: "Contribute via PIX",
    backToHome: "Back to home",
    playVideo: "Play the introduction video",
  },

  hero: {
    badge: "100% free download",
    title: "Video game emulator",
    subtitle:
      "Hundreds of games and emulators, old and current consoles, 100% free to download.",
    lead: "Relive magical moments with the nostalgic games that marked entire generations!",
    screenshotAlt:
      "The EDSGAMES interface showing a Neo Geo CD game cover and the available consoles.",
    stats: [
      { value: "200+", label: "Emulated systems" },
      { value: "32 GB", label: "Ready out of the box" },
      { value: "$0", label: "Cost to download" },
    ],
  },

  intro: {
    eyebrow: "Introduction",
    title: "Turn your computer into a multi-game machine!",
    videoLabel: "EDSGAMES introduction video",
  },

  about: {
    eyebrow: "About",
    title: "RetroBAT and Batocera",
    paragraphs: [
      "EDSGAMES is a set of emulators based on BATOCERA and RETROBAT. Even though the two share the same purpose and look very similar on screen, each one is different: RETROBAT is an executable program that runs inside Windows, while BATOCERA is a bootable operating system based on GNU/Linux.",
      "As mentioned, both are a set of emulators. The main difference is that one is an executable and the other is installed on a separate hard drive or USB stick you can carry around, in case you would rather install it on an external drive.",
      "Both are FREE and ship with 32 GB of storage, which grows as you add more games.",
    ],
    systems: [
      {
        name: "EDSBATOCERA",
        kind: "Bootable system",
        description:
          "Based on GNU/Linux. You write it to a USB stick, SD card or hard drive and it boots on its own, without depending on Windows. Ideal for turning an old computer into a dedicated console.",
      },
      {
        name: "EDSRETROBAT",
        kind: "Windows program",
        description:
          "An executable that runs inside the Windows you already use. Just extract it and open RetroBat.exe — nothing to format, no system to change.",
      },
    ],
    storageNote: {
      title: "The system takes 32 GB once extracted",
      description: "With plenty of games installed and several emulators pre-configured.",
    },
  },

  requirements: {
    eyebrow: "Before you start",
    title: "What you will need",
    items: [
      "One drive with at least 32 GB of space: USB stick, hard drive, SSD or SD card.",
      "A desktop or laptop computer with internet access.",
      "An extraction program such as WinRAR or 7-Zip.",
      "An image-writing program such as Rufus or Balena Etcher.",
      "At least one controller (gamepad) is recommended.",
    ],
  },

  features: {
    eyebrow: "What EDSGAMES emulators can give you",
    title: "Built for everyone who grew up playing",
    items: [
      {
        title: "Pure nostalgia",
        description:
          "Relive and remember nostalgic moments from the arcades and the consoles that marked generations.",
      },
      {
        title: "100% free",
        description: "The system is yours — to use, share and customise however you like.",
      },
      {
        title: "Hundreds of games and emulators",
        description:
          "The system includes a built-in app so you can download as many games as you want.",
      },
      {
        title: "Support and contribution",
        description:
          "Join our social channels: you will find tips, tutorials and make great friends in the retro gaming community.",
      },
    ],
  },

  store: {
    eyebrow: "Store",
    title: "Buy a hard drive or USB stick with the system and games",
    lead: "We have hard drives and USB sticks from 32 to 500 GB for sale, ready to use. Just plug in and have fun.",
    paragraphs: [
      "If you would rather not download anything, or you do not have a spare hard drive or USB stick, you can buy one from our online store — both USB sticks and hard drives, prepared and ready to go.",
      "Just plug in, play and have fun with your friends and family.",
    ],
    products: [
      {
        name: "External hard drive",
        capacity: "500 GB",
        highlight: "420 GB of games",
        description:
          "Comes with an enclosure so you can use it as an external drive if you prefer. You can change or expand it however you like.",
        systems: [
          "Windows",
          "PlayStation 1",
          "PlayStation 2",
          "PlayStation 3",
          "Xbox 360",
          "and many more",
        ],
      },
      {
        name: "USB stick",
        capacity: "32 GB",
        highlight: "20 GB of games",
        description:
          "Compact, light and easy to take to any friend's house. Plug it in and play.",
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
    shippingNote: "Order it and receive it in the comfort of your home!",
    paymentsLabel: "Payment methods",
    cta: "See hard drives and USB sticks for sale",
    contactCta: "Talk to sales",
  },

  testimonials: {
    eyebrow: "Feedback",
    title: "And what do our friends say?",
    items: [
      {
        name: "Marcelo Rubens",
        role: "Batocera user",
        quote:
          "Simply perfect! Ever since I installed it I have left my PlayStation 4 alone.",
        avatar: "/img/avatar-1.jpg",
      },
      {
        name: "Julia Maria",
        role: "RetroBAT user",
        quote:
          "I was not sure I could download and install it, so I preferred to buy one for my husband — he loved it.",
        avatar: "/img/avatar-2.jpg",
      },
      {
        name: "Fabiana Almeida",
        role: "Batocera user",
        quote:
          "Wow... nothing to say, only praise. It reminds me of playing with my brothers.",
        avatar: "/img/avatar-3.jpg",
      },
      {
        name: "Igor Dias Bonet",
        role: "Batocera user",
        quote:
          "Recommended! I had no idea — I thought it would just be one of those cheap emulators with silly little games.",
        avatar: "/img/avatar-4.jpg",
      },
    ],
  },

  pix: {
    eyebrow: "Contribution",
    title: "Support our project!",
    lead: "Donate any amount via PIX. Scan the QR code or copy the key.",
    description:
      "We are a team of enthusiasts who love games — old and modern arcade games alike — and we work to bring the best possible fun to everyone. We are a non-profit community and we count on everyone's help: if you can contribute any amount via PIX, we will be very grateful.",
    qrAlt: "EDSGAMES PIX QR code for contributions",
    copyButton: "Copy PIX key",
    copied: "PIX key copied!",
    copyFailed: "Automatic copying is unavailable. Select and copy the key below.",
    keyLabel: "PIX key (copy and paste)",
    receiverLabel: "Recipient",
    receiverCity: "Cotia, São Paulo, Brazil",
    howToTitle: "How to contribute in 3 steps",
    howToSteps: [
      "Open your bank app and choose the PIX option.",
      "Tap “Scan QR code” and point the camera at the code — or use “PIX copy and paste” with the copied key.",
      "Enter the amount you would like to donate and confirm. Every amount helps.",
    ],
    useTitle: "Where your contribution goes",
    useDescription:
      "Donations cover hosting, the domain, file storage and the time spent keeping the systems updated and the tutorials online. EDSGAMES is non-profit and the download will always stay free.",
  },

  faq: {
    eyebrow: "Frequently asked",
    title: "Questions",
    items: [
      {
        question: "Does it work on a phone?",
        answer:
          "Unfortunately there is still no support for phones and smartphones (at least for now).",
      },
      {
        question: "How many emulators does it support?",
        answer:
          "It supports and emulates more than 200 different systems, including classic 8-bit consoles, arcade machines, older computers and more modern platforms such as PlayStation 2, GameCube and Wii U, among others.",
      },
      {
        question: "What are the requirements?",
        answer:
          "The computer needs at least 1 GB of RAM (2 GB or more is recommended), a 64-bit x86_64 processor compatible with modern instruction sets, and a USB stick, SD card or hard drive/SSD with at least 32 GB of capacity for the system and the games.",
      },
      {
        question: "Is there a warranty?",
        answer: "No.",
      },
      {
        question: "Is there support?",
        answer:
          "We are a non-profit community and we simply share knowledge. We cannot guarantee that every game or every emulator will work perfectly on your hardware. That said, we have forums and video tutorials, which is why joining our social channels is strongly recommended — and any question you have, just ask.",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Sales enquiries only!",
    description:
      "This channel handles sales of hard drives and USB sticks with the system pre-installed only.",
    hoursLabel: "Opening hours",
    hours: "Monday to Friday, 10:00 to 16:00 (Brazil time)",
    emailLabel: "Email",
    email: "edsgames.retro@gmail.com",
    cta: "Contact us",
  },

  downloadPage: {
    eyebrow: "Download",
    title: "Download EDSGAMES",
    lead: "Things you need to know before you download.",
    beforeYouStart: [
      "The first thing you need is a desktop or laptop computer. The system does not work on phones or smart TVs yet.",
      "Both are a set of emulators. The main difference is that one is an executable (EDSRETROBAT) that runs inside Windows, and the other is installed on a separate hard drive or USB stick you can carry around, in case you would rather install it on an external drive (EDSBATOCERA).",
      "Both are FREE and ship with 32 GB of storage, which grows as you add games. The download process is the same for both.",
    ],
    requirementsTitle: "Requirements",
    requirements:
      "The computer needs at least 1 GB of RAM (2 GB or more is recommended), a 64-bit x86_64 processor compatible with modern instruction sets, and a USB stick, SD card or hard drive/SSD with at least 32 GB of capacity for the system and the games.",
    needTitle: "You will need",
    needItems: [
      "A USB stick or hard drive of at least 32 GB.",
      "WinRAR or similar, to extract the program.",
      "An image-writing program such as Balena Etcher.",
      "We recommend a controller (gamepad) for a better experience, but you can use the computer keyboard if you do not have one.",
    ],
    warningTitle: "Important warning!",
    warningBody:
      "Your device will be erased and formatted — be aware of this. If it holds anything important, back it up first.",
    toolsTitle: "Tools you need",
    tools: [
      { name: "WinRAR", description: "To extract the downloaded file.", href: "https://www.win-rar.com/predownload.html?&L=9" },
      { name: "Balena Etcher", description: "To write the image to the USB stick or hard drive.", href: "https://etcher.balena.io/" },
    ],
    downloadsTitle: "Download links",
    downloadsNote:
      "In the window that opens, click “Subscribe to the channel” and then “Link to unlock” to release the download. Ignore the Google Drive warnings and click “Download anyway”.",
    downloads: [
      {
        name: "EDSBATOCERA-V32GB",
        description: "Bootable GNU/Linux system, written to a USB stick or hard drive.",
        href: "https://sub4unlock.io/T2Am7",
        checksum: null,
      },
      {
        name: "EDSRETROBAT-V32GB",
        description: "Executable that runs inside Windows.",
        href: "https://sub4unlock.io/lCE4g",
        checksum: null,
      },
    ],
    integrityTitle: "Check the file before you write it",
    integrityLead:
      "Writing a system image erases the whole device, and a file swapped in transit becomes a compromised system running on your computer. Check the downloaded file's SHA-256 checksum before you use it. If it does not match the one published here, delete the file and download it again.",
    integrityUnverified:
      "We have not published a checksum for this file yet. Until we do, download only through the official links on this page, and treat any copy obtained elsewhere as suspect.",
    checksumLabel: "SHA-256",
    verifyTitle: "How to check",
    verifySteps: [
      { os: "Windows", command: "certutil -hashfile FILE.zip SHA256" },
      { os: "Linux", command: "sha256sum FILE.zip" },
      { os: "macOS", command: "shasum -a 256 FILE.zip" },
    ],
    thirdPartyNote:
      "The download links pass through an external unlock site, which is not ours and may show adverts. Do not enter passwords or personal details there: all it needs to do is release the file.",
    stepsTitle: "EDSBATOCERA instructions",
    steps: [
      "Once the download finishes, open the folder where you saved the file.",
      "Right-click it and choose “Extract here”.",
      "Open Balena Etcher, or another program of your choice, and write the file to your drive.",
      "With that done, restart your computer, press the DEL (or Delete) key on your keyboard and select the drive you wrote EDSBATOCERA to.",
      "Now just have fun!",
    ],
    retrobatTitle: "EDSRETROBAT instructions",
    retrobatSteps: [
      "For EDSRETROBAT the download process is the same as for EDSBATOCERA.",
      "After downloading and extracting the files, look for the RetroBat.exe executable.",
      "And enjoy!",
    ],
    expandNote:
      "The space used on the hard drive or USB stick grows as you add more games. For now it only takes 32 GB, but add as many games as you want — or as many as your hardware can hold.",
    gamesListAlt: "List of games and systems included in EDSGAMES",
  },

  storePage: {
    eyebrow: "Store",
    title: "Hard drives and USB sticks, ready to play",
    lead: "If you would rather not download or write anything, we ship the drive ready to go. Just plug in and play.",
    includedTitle: "What every drive includes",
    included: [
      "The EDSGAMES system, already installed and configured.",
      "Pre-configured emulators, ready to use.",
      "Games already organised by console.",
      "Community support through our social channels.",
    ],
    howToOrderTitle: "How to order",
    howToOrder: [
      "Send an email to edsgames.retro@gmail.com telling us which drive you are interested in.",
      "Sales answer Monday to Friday, 10:00 to 16:00 (Brazil time).",
      "We agree the payment and the shipping, and it arrives at your door.",
    ],
    disclaimerTitle: "No warranty",
    disclaimerBody:
      "We are a non-profit community and we cannot guarantee that every game or emulator will work perfectly on every machine. Please buy with that in mind.",
  },

  footer: {
    tagline: "The best emulators and the best games, all in one place!",
    aboutTitle: "About EDSGAMES",
    navTitle: "Navigation",
    contactTitle: "Contact",
    rights: "All rights reserved.",
    disclaimer:
      "EDSGAMES is a non-profit community project. We do not distribute, sell or host copyrighted games.",
    languageLabel: "Language",
  },

  notFound: {
    title: "Game over",
    description: "The page you are looking for does not exist — or it went into another cartridge.",
  },
};
