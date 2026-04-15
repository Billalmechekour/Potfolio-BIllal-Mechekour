export const profile = {
  fullName: "Billal Mechekour",
  headline: "Développeur Web & Full-Stack",
  intro:
    "J'imagine et je développe des produits web utiles, robustes et agréables à utiliser, avec une attention particulière à la performance, l'UX et la qualité technique.",
  city: "Amiens / Béjaïa",
  birthDate: "05/04/2003",
  email: "billalmechekour@gmail.com",
  phone: "+33 7 49 71 86 52",
  github: "https://github.com/Billalmechekour",
  linkedin: "https://www.linkedin.com/in/billal-mechekour-685a65280/",
  cvPath: "/cv-billal-mechekour.pdf",
};

export const projectCategories = [
  {
    title: "Académiques",
    projects: [
      {
        name: "mega-shop",
        description:
          "Plateforme e-commerce multi-rôles (client, vendeur, administrateur) avec création de boutique, gestion des produits et parcours d'achat complet.",
        impact:
          "Projet académique en équipe orienté architecture full-stack moderne, sécurité et expérience vendeur/client.",
        stack: ["Next.js 15", "TypeScript", "Prisma + MySQL", "Redux Toolkit", "NextAuth"],
        githubUrl: "https://github.com/Billalmechekour/mega-shop",
        liveUrl: "https://project-megashop.vercel.app/",
      },
      {
        name: "Shifa",
        description:
          "Application web de gestion des rendez-vous médicaux pour patients, secrétaires et médecins, avec réservation en ligne et gestion des créneaux.",
        impact:
          "Optimise l'organisation des consultations et réduit la surcharge à l'accueil grâce à un workflow fiable.",
        stack: ["Node.js", "Express.js", "EJS", "MySQL/MariaDB", "Bootstrap"],
        githubUrl: "https://github.com/Billalmechekour/Shifa",
      },
      {
        name: "algo-game",
        description:
          "Jeu d'algorithmique multijoueur (jusqu'à 4 joueurs) avec défis Flash/Code, chronomètre décroissant et classement final.",
        impact:
          "Expérience temps réel via WebSocket avec validation de code serveur (Python, Java, C, C++).",
        stack: ["React 19", "Vite 7", "Node.js", "WebSocket (ws)", "Tailwind CSS"],
        githubUrl: "https://github.com/Billalmechekour/algo-game",
        liveUrl: "https://algo-game-five.vercel.app/",
      },
    ],
  },
  {
    title: "Personnel",
    projects: [
      {
        name: "coach-sport-app",
        description:
          "Application dédiée au coaching sportif: suivi des athlètes, programmes personnalisés et progression physique.",
        impact:
          "Projet personnel en cours de développement pour un accompagnement régulier et des résultats durables.",
        stack: ["React 18", "Vite 5", "Tailwind CSS"],
        isPrivate: true,
        liveUrl: "https://coach-sport-app.vercel.app/",
      },
      {
        name: "Béjaïa Tour Guide",
        description:
          "Plateforme touristique interactive pour découvrir les sites naturels et historiques de Béjaïa.",
        impact:
          "Intègre cartes, favoris, commentaires et likes pour valoriser le patrimoine local.",
        stack: ["Vue 3", "Firebase", "Leaflet", "Vue Router", "Vite"],
        githubUrl: "https://github.com/Billalmechekour/Bejaia-Tour-Guide-",
        liveUrl: "https://bejaiatourguide.netlify.app/",
        prototypeUrl:
          "https://www.figma.com/proto/cKjHi46MaNQgr2EX0cKBLO/Guide-Touristique?node-id=50-948&p=f&t=Fkd33SWFiJqqeIQP-1&scaling=min-zoom&content-scaling=fixed&page-id=0:1&starting-point-node-id=50:948&show-proto-sidebar=1",
      },
    ],
  },
];

export const skills = [
  {
    group: "Langages",
    items: ["JavaScript", "Python", "Java", "C", "C++", "Pascal"],
  },
  {
    group: "Web",
    items: ["React", "Vue.js", "Next.js", "Node.js", "Express.js", "EJS", "Tailwind CSS", "Bootstrap"],
  },
  {
    group: "Données",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
  },
  {
    group: "Big Data",
    items: ["Hadoop", "Hive"],
  },
  {
    group: "Outils & Design",
    items: [
      "Git/GitHub",
      "Figma",
      "Canva",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "LaTeX",
    ],
  },
  {
    group: "Méthodologies",
    items: ["Agile DSDM", "Travail en équipe", "Conception UI/UX"],
  },
];

export const education = [
  {
    period: "2025 - 2026",
    title: "Licence 3 - Informatique",
    school: "Université Picardie Jules Verne - Amiens, France",
  },
  {
    period: "2024 - 2025",
    title: "Master 1 - Génie logiciel",
    school: "Université Abderrahmane Mira - Béjaïa, Algérie",
  },
  {
    period: "2023 - 2024",
    title: "Licence 3 - Système d'information",
    school: "Université Abderrahmane Mira - Béjaïa, Algérie",
  },
  {
    period: "2021 - 2023",
    title: "Licence 1 / Licence 2 - Informatique",
    school: "Université Abderrahmane Mira - Béjaïa, Algérie",
  },
  {
    period: "2020 - 2021",
    title: "Baccalauréat Série Mathématiques",
    school: "Lycée Ait Doued Hocine - Béjaïa, Algérie",
  },
];

export const languages = [
  "Kabyle (langue maternelle)",
  "Arabe (courant)",
  "Français (intermédiaire avancé)",
  "Anglais (intermédiaire)",
];
