import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  education,
  profile,
  projectCategories,
  skills,
} from "./data/portfolioData";
import "./App.css";

const LANGUAGE_OPTIONS = [
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ar", label: "AR", flag: "🇸🇦" },
];

const NAV_IDS = ["profile", "projects", "skills", "formation", "contact"];
const PHOTO_SEQUENCE = [encodeURI("/bilal 3.png")];
const AD_TECH_ICONS = [
  { name: "JavaScript", src: encodeURI("/icone de publicite/script-java.png") },
  { name: "Java", src: encodeURI("/icone de publicite/icons8-java-94.png") },
  {
    name: "C",
    src: encodeURI("/icone de publicite/icons8-programmation-en-c-48 (1).png"),
  },
  { name: "C++", src: encodeURI("/icone de publicite/icons8-c++-48 (1).png") },
  { name: "Python", src: encodeURI("/icone de publicite/icons8-python-48.png") },
  { name: "Pascal", src: encodeURI("/icone de publicite/icons8-pascal-48.png") },
  { name: "Node.js", src: encodeURI("/icone de publicite/icons8-nœud-js-48.png") },
  { name: "Express.js", src: encodeURI("/icone de publicite/icons8-express-js-48.png") },
  { name: "React", src: encodeURI("/icone de publicite/physics.png") },
  { name: "Next.js", src: encodeURI("/icone de publicite/next js.png") },
  { name: "HTML5", src: encodeURI("/icone de publicite/html-5.png") },
  { name: "CSS3", src: encodeURI("/icone de publicite/css-3.png") },
  { name: "MySQL", src: encodeURI("/icone de publicite/icons8-mysql-24.png") },
  { name: "PostgreSQL", src: encodeURI("/icone de publicite/icons8-postgres-48.png") },
  { name: "MongoDB", src: encodeURI("/icone de publicite/icons8-mongodb-24.png") },
  {
    name: "Hadoop",
    src: encodeURI("/icone de publicite/icons8-système-de-fichiers-distribué-hadoop-48.png"),
  },
  { name: "Hive", src: encodeURI("/icone de publicite/Apache_Hive_logo.svg") },
  { name: "Git", src: encodeURI("/icone de publicite/icons8-git-50.png") },
  { name: "GitHub", src: encodeURI("/icone de publicite/icons8-github-50.png") },
  { name: "Figma", src: encodeURI("/icone de publicite/figma.png") },
  {
    name: "Illustrator",
    src: encodeURI("/icone de publicite/icons8-adobe-illustrator-24.png"),
  },
  { name: "Word", src: encodeURI("/icone de publicite/icons8-ms-word-48.png") },
  { name: "Excel", src: encodeURI("/icone de publicite/icons8-ms-excel-48.png") },
  {
    name: "PowerPoint",
    src: encodeURI("/icone de publicite/icons8-microsoft-powerpoint-2025-48.png"),
  },
  { name: "LaTeX", src: encodeURI("/icone de publicite/icons8-latex-48.png") },
];

const NON_TECH_ITEMS = new Set([
  "Travail en équipe",
  "Conception UI/UX",
  "Agile DSDM",
]);

const TECHNOLOGIES_COUNT = new Set(
  skills
    .flatMap((group) => group.items)
    .filter((item) => !NON_TECH_ITEMS.has(item))
).size;

const TEXTS = {
  fr: {
    nav: {
      profile: "Profil",
      projects: "Projets",
      skills: "Compétences",
      formation: "Formations",
      contact: "Contact",
    },
    controls: { language: "Langue", modeDark: "Nuit", modeLight: "Clair" },
    hero: {
      eyebrow: "Etudiant en informatique",
      github: "Me contacter",
      contact: "Consulter mon CV",
      cv: "Télécharger mon CV",
      panelTitle: "Aperçu rapide",
      metricProjects: "projets techniques",
      metricSkills: "blocs de compétences",
      metricMethodTitle: "Agile",
      metricMethodText: "pratique DSDM en équipe",
      availability:
        "Disponible pour des missions web full-stack, projets académiques avancés et opportunités d'alternance/stage.",
    },
    projects: {
      eyebrow: "",
      title: "Projets sélectionnés",
      subtitle: "Web fullstack",
      privateRepo: "Repo privé",
      publicRepo: "Repo public",
      githubPrivate: "GitHub privé",
      noDemo: "Pas de démo publique",
      prototype: "Prototype",
    },
    skills: {
      eyebrow: "Expertise",
      title: "Compétences techniques",
      adTitle: "Technologies & logiciels maîtrisés",
    },
    about: {
      profileEyebrow: "Profil",
      profileTitle: "Formation & trajectoire",
      infoEyebrow: "Informations",
      infoTitle: "Langues & Stage",
      languagesSectionTitle: "Langues",
      stageSectionTitle: "Stage",
      subjectLabel: "Sujet",
      toolsLabel: "Technologies",
      city: "Ville",
      birthDate: "Date de naissance",
      email: "Email",
      phone: "Téléphone",
    },
    contact: {
      eyebrow: "Passe à l'action",
      title: "Ecrivez moi un message",
      text: "Remplis tes informations et envoie ton message directement.",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès par email.",
      error: "Impossible d'envoyer le message. Réessaie dans un instant.",
      required: "Merci d'écrire un message avant l'envoi.",
      fields: {
        lastName: "Nom",
        firstName: "Prénom",
        message: "Message",
        lastNamePlaceholder: "Votre nom",
        firstNamePlaceholder: "Votre prénom",
        messagePlaceholder: "Ecris ton objectif, ton niveau et ce que tu veux changer.",
      },
      submit: "Envoyer mon message",
      networkTitle: "Réseaux et contact",
    },
  },
  en: {
    nav: {
      profile: "Profile",
      projects: "Projects",
      skills: "Skills",
      formation: "Education",
      contact: "Contact",
    },
    controls: { language: "Language", modeDark: "Dark", modeLight: "Light" },
    hero: {
      eyebrow: "Computer Science Student",
      github: "Contact me",
      contact: "View my CV",
      cv: "Download my CV",
      panelTitle: "Quick overview",
      metricProjects: "technical projects",
      metricSkills: "skill blocks",
      metricMethodTitle: "Agile",
      metricMethodText: "hands-on DSDM teamwork",
      availability:
        "Open to full-stack web missions, advanced academic projects, and internship/apprenticeship opportunities.",
    },
    projects: {
      eyebrow: "",
      title: "Selected projects",
      subtitle: "Full-Stack Web",
      privateRepo: "Private repo",
      publicRepo: "Public repo",
      githubPrivate: "Private GitHub",
      noDemo: "No public demo",
      prototype: "Prototype",
    },
    skills: {
      eyebrow: "Expertise",
      title: "Technical skills",
      adTitle: "Mastered technologies & software",
    },
    about: {
      profileEyebrow: "Profile",
      profileTitle: "Education & journey",
      infoEyebrow: "Information",
      infoTitle: "Languages & Internship",
      languagesSectionTitle: "Languages",
      stageSectionTitle: "Internship",
      subjectLabel: "Topic",
      toolsLabel: "Technologies",
      city: "City",
      birthDate: "Birth date",
      email: "Email",
      phone: "Phone",
    },
    contact: {
      eyebrow: "Take action",
      title: "Write me a message",
      text: "Fill in your details and send your message directly.",
      sending: "Sending...",
      success: "Message sent successfully by email.",
      error: "Unable to send the message. Please try again shortly.",
      required: "Please write a message before sending.",
      fields: {
        lastName: "Last name",
        firstName: "First name",
        message: "Message",
        lastNamePlaceholder: "Your last name",
        firstNamePlaceholder: "Your first name",
        messagePlaceholder: "Write your goal and what you want to improve.",
      },
      submit: "Send my message",
      networkTitle: "Networks & contact",
    },
  },
  ar: {
    nav: {
      profile: "الملف",
      projects: "المشاريع",
      skills: "المهارات",
      formation: "التكوين",
      contact: "تواصل",
    },
    controls: { language: "اللغة", modeDark: "ليلي", modeLight: "فاتح" },
    hero: {
      eyebrow: "طالب في الإعلام الآلي",
      github: "تواصل معي",
      contact: "معاينة السيرة الذاتية",
      cv: "تحميل السيرة الذاتية",
      panelTitle: "نظرة سريعة",
      metricProjects: "مشاريع تقنية",
      metricSkills: "محاور مهارات",
      metricMethodTitle: "Agile",
      metricMethodText: "تطبيق DSDM ضمن فريق",
      availability:
        "متاح لمهام تطوير ويب Full-Stack، ومشاريع أكاديمية متقدمة، وفرص تدريب أو تناوب مهني.",
    },
    projects: {
      eyebrow: "",
      title: "مشاريع مختارة",
      subtitle: "ويب Full-Stack",
      privateRepo: "مستودع خاص",
      publicRepo: "مستودع عام",
      githubPrivate: "GitHub خاص",
      noDemo: "لا توجد نسخة عامة",
      prototype: "نموذج أولي",
    },
    skills: {
      eyebrow: "الخبرة",
      title: "المهارات التقنية",
      adTitle: "التقنيات والبرامج التي أتقنها",
    },
    about: {
      profileEyebrow: "الملف",
      profileTitle: "التكوين والمسار",
      infoEyebrow: "معلومات",
      infoTitle: "اللغات والتربص",
      languagesSectionTitle: "اللغات",
      stageSectionTitle: "التربص",
      subjectLabel: "الموضوع",
      toolsLabel: "التقنيات",
      city: "المدينة",
      birthDate: "تاريخ الميلاد",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
    },
    contact: {
      eyebrow: "ابدأ الآن",
      title: "اكتب لي رسالة",
      text: "املأ معلوماتك وأرسل رسالتك مباشرة.",
      sending: "جاري الإرسال...",
      success: "تم إرسال الرسالة بنجاح عبر البريد الإلكتروني.",
      error: "تعذر إرسال الرسالة. حاول مرة أخرى بعد قليل.",
      required: "يرجى كتابة رسالة قبل الإرسال.",
      fields: {
        lastName: "اللقب",
        firstName: "الاسم",
        message: "الرسالة",
        lastNamePlaceholder: "لقبك",
        firstNamePlaceholder: "اسمك",
        messagePlaceholder: "اكتب هدفك وما الذي تريد تطويره.",
      },
      submit: "إرسال رسالتي",
      networkTitle: "الشبكات والتواصل",
    },
  },
};

const PROFILE_COPY = {
  fr: {
    headline: "Développeur Full-Stack | Designer UI/UX",
    intro:
      "J'imagine et je développe des produits web utiles, robustes et agréables à utiliser, de l'idée initiale jusqu'au déploiement. Je conçois des interfaces modernes, je structure la partie front-end et back-end, et j'accorde une attention particulière à la performance, à l'UX et à la qualité du code pour livrer des solutions fiables, maintenables et orientées résultats.",
  },
  en: {
    headline: "Full-Stack Developer | UI/UX Designer",
    intro:
      "I imagine and develop useful, robust, and pleasant-to-use web products, from the initial idea through deployment. I design modern interfaces, structure both front-end and back-end, and pay particular attention to performance, UX, and code quality to deliver reliable, maintainable, results-oriented solutions.",
  },
  ar: {
    headline: "مطور Full-Stack | مصمم UI/UX",
    intro:
      "أتخيل وأطوّر منتجات ويب مفيدة ومتينة ومريحة في الاستخدام، من الفكرة الأولية حتى النشر. أصمم واجهات حديثة، وأنظم جانبي الواجهة الأمامية والخلفية، وأولي عناية خاصة بالأداء وتجربة المستخدم وجودة الكود لتقديم حلول موثوقة، قابلة للصيانة، وموجّهة للنتائج.",
  },
};

const CATEGORY_TITLES = {
  "Web & Full-Stack": { fr: "Web & Full-Stack", en: "Web & Full-Stack", ar: "الويب وFull-Stack" },
  "Académiques": { fr: "Académiques", en: "Academic", ar: "أكاديمي" },
  "Personnel": { fr: "Personnel", en: "Personal", ar: "شخصي" },
  "Systèmes & Bas Niveau": { fr: "Systèmes & Bas Niveau", en: "Systems & Low-Level", ar: "الأنظمة والمستوى المنخفض" },
  "Compilation & Algorithmique": {
    fr: "Compilation & Algorithmique",
    en: "Compilers & Algorithms",
    ar: "المترجمات والخوارزميات",
  },
};

const PROJECT_COPY = {
  en: {
    "mega-shop": {
      description:
        "Multi-role e-commerce platform (customer, seller, administrator) with store creation, product management, and a complete purchasing flow.",
      impact:
        "Academic team project focused on modern full-stack architecture, security, and seller/customer experience.",
    },
    Shifa: {
      description:
        "Medical appointment management web application for patients, secretaries, and doctors, with online booking and schedule management.",
      impact:
        "Improves consultation organization and reduces front-desk overload through a reliable workflow.",
    },
    "algo-game": {
      description:
        "Multiplayer algorithm game (up to 4 players) with Flash/Code challenges, countdown timer, and final ranking.",
      impact:
        "Real-time experience via WebSocket with server-side code validation (Python, Java, C, C++).",
    },
    "coach-sport-app": {
      description:
        "Sports coaching application: athlete tracking, personalized training plans, and physical progress follow-up.",
      impact:
        "Personal project in development for continuous support and sustainable performance results.",
    },
    "Protocole Client-Serveur": {
      description:
        "Design and implementation of a communication protocol between a server and multiple simultaneous clients.",
      impact:
        "Covers concurrent access handling, reliable exchange, and robust error handling.",
    },
    "Mini-Shell Unix": {
      description:
        "Simplified Unix shell in C with command execution, pipes, redirections, and environment variables.",
      impact:
        "Includes key built-ins (cd, pwd, exit) and clean process handling.",
    },
    "Analyseur Syntaxique Python": {
      description:
        "Implementation of LR/LL parsers: LR(0), SLR, CLR, LALR, LL(1), LR(k).",
      impact:
        "Conflict detection, grammar validation, and syntax test suite.",
    },
    "Béjaïa Tour Guide": {
      description:
        "Interactive tourism platform to discover the natural and historical sites of Béjaïa.",
      impact:
        "Includes maps, favorites, comments, and likes to promote local heritage.",
    },
  },
  ar: {
    "mega-shop": {
      description:
        "منصة تجارة إلكترونية متعددة الأدوار (عميل، بائع، مدير) مع إنشاء المتجر وإدارة المنتجات ومسار شراء كامل.",
      impact:
        "مشروع أكاديمي جماعي يركز على بنية Full-Stack حديثة، والأمان، وتجربة البائع والعميل.",
    },
    Shifa: {
      description:
        "تطبيق ويب لإدارة المواعيد الطبية للمرضى والسكرتارية والأطباء، مع الحجز عبر الإنترنت وإدارة المواعيد.",
      impact:
        "يحسن تنظيم الاستشارات ويخفف الضغط على الاستقبال عبر سير عمل موثوق.",
    },
    "algo-game": {
      description:
        "لعبة خوارزميات متعددة اللاعبين (حتى 4 لاعبين) بتحديات Flash/Code ومؤقت تنازلي وترتيب نهائي.",
      impact:
        "تجربة فورية عبر WebSocket مع التحقق من الكود على الخادم (Python وJava وC وC++).",
    },
    "coach-sport-app": {
      description:
        "تطبيق مخصص للتدريب الرياضي: متابعة الرياضيين، برامج تدريب مخصصة، ومتابعة التقدم البدني.",
      impact:
        "مشروع شخصي قيد التطوير لدعم مستمر وتحقيق نتائج مستدامة.",
    },
    "Protocole Client-Serveur": {
      description:
        "تصميم وتنفيذ بروتوكول تواصل بين خادم وعدة عملاء متزامنين.",
      impact:
        "يتضمن إدارة التوازي وموثوقية التبادل ومعالجة الأخطاء.",
    },
    "Mini-Shell Unix": {
      description:
        "Shell مبسط بلغة C يدعم تنفيذ الأوامر والأنابيب وإعادة التوجيه ومتغيرات البيئة.",
      impact:
        "يدعم أوامر مدمجة أساسية مثل cd وpwd وexit مع إدارة عمليات سليمة.",
    },
    "Analyseur Syntaxique Python": {
      description:
        "تنفيذ محللات LR/LL: LR(0), SLR, CLR, LALR, LL(1), LR(k).",
      impact:
        "كشف التعارضات والتحقق من القواعد واختبارات نحوية شاملة.",
    },
    "Béjaïa Tour Guide": {
      description:
        "منصة سياحية تفاعلية لاكتشاف المواقع الطبيعية والتاريخية في بجاية.",
      impact:
        "تتضمن خرائط ومفضلة وتعليقات وإعجابات لإبراز التراث المحلي.",
    },
  },
};

const PROJECT_SCREENSHOTS = {
  "mega-shop": encodeURI("/captures projets/megaShop.png"),
  Shifa: encodeURI("/captures projets/Shifa.png"),
  "algo-game": encodeURI("/captures projets/AlgoGame.png"),
  "coach-sport-app": encodeURI("/captures projets/coach-sport-app.png"),
  "Béjaïa Tour Guide": encodeURI("/captures projets/BejaiaTourGuide.png"),
};

const encodeGallery = (paths) => paths.map((path) => encodeURI(path));

const PROJECT_GALLERIES = {
  "mega-shop": encodeGallery([
    "/MegaShop/megaShop.png",
    "/MegaShop/M1.png",
    "/MegaShop/M2.png",
    "/MegaShop/M3.png",
    "/MegaShop/M4.png",
    "/MegaShop/M5.png",
    "/MegaShop/M6.png",
    "/MegaShop/M7.png",
    "/MegaShop/M8.png",
    "/MegaShop/M9.png",
    "/MegaShop/M10.png",
  ]),
  Shifa: encodeGallery([
    "/Shifa/Shifa.png",
    "/Shifa/S1.png",
    "/Shifa/S2.png",
    "/Shifa/S3.png",
    "/Shifa/S4.png",
    "/Shifa/S5.png",
    "/Shifa/S6.png",
    "/Shifa/S7.png",
    "/Shifa/S8.png",
    "/Shifa/S9.png",
    "/Shifa/S10.png",
    "/Shifa/S11.png",
    "/Shifa/S12.png",
    "/Shifa/S13.png",
  ]),
  "algo-game": encodeGallery([
    "/AlgoGame/AlgoGame.png",
    "/AlgoGame/A1.png",
    "/AlgoGame/A2.png",
    "/AlgoGame/A3.png",
    "/AlgoGame/A4.png",
    "/AlgoGame/A5.png",
    "/AlgoGame/A6.png",
    "/AlgoGame/A7.png",
  ]),
  "coach-sport-app": encodeGallery([
    "/CoachApp/coach-sport-app.png",
    "/CoachApp/C1.png",
    "/CoachApp/C2.png",
  ]),
  "Béjaïa Tour Guide": encodeGallery([
    "/BejaiaTouguide/BejaiaTourGuide.png",
    "/BejaiaTouguide/B1.png",
    "/BejaiaTouguide/B2.png",
    "/BejaiaTouguide/B3.png",
    "/BejaiaTouguide/B4.png",
    "/BejaiaTouguide/B5.png",
    "/BejaiaTouguide/B6.png",
    "/BejaiaTouguide/B7.png",
    "/BejaiaTouguide/B8.png",
    "/BejaiaTouguide/B9.png",
  ]),
};

const SKILL_GROUP_LABELS = {
  Langages: { fr: "Langages", en: "Languages", ar: "اللغات" },
  Web: { fr: "Web", en: "Web", ar: "الويب" },
  "Données": { fr: "Base de données", en: "Databases", ar: "قواعد البيانات" },
  "Big Data": { fr: "Big Data", en: "Big Data", ar: "البيانات الضخمة" },
  "Outils & Design": { fr: "Outils & Design", en: "Tools & Design", ar: "الأدوات والتصميم" },
  "Méthodologies": { fr: "Méthodologies", en: "Methodologies", ar: "المنهجيات" },
};

const SPOKEN_LANGUAGES = {
  fr: [
    {
      label: "Kabyle (langue maternelle)",
      flagSrc: encodeURI("/Drapeau/drapeau kabyle.svg"),
      flagAlt: "Drapeau kabyle",
    },
    {
      label: "Arabe (courant)",
      flagSrc: encodeURI("/Drapeau/drapeau arabite sauite.png"),
      flagAlt: "Drapeau Arabie Saoudite",
    },
    {
      label: "Français (intermédiaire avancé)",
      flagSrc: encodeURI("/Drapeau/drapeau france.png"),
      flagAlt: "Drapeau France",
    },
    {
      label: "Anglais (intermédiaire)",
      flagSrc: encodeURI("/Drapeau/drapeau uk.png"),
      flagAlt: "Drapeau Royaume-Uni",
    },
  ],
  en: [
    {
      label: "Kabyle (native language)",
      flagSrc: encodeURI("/Drapeau/drapeau kabyle.svg"),
      flagAlt: "Kabyle flag",
    },
    {
      label: "Arabic (fluent)",
      flagSrc: encodeURI("/Drapeau/drapeau arabite sauite.png"),
      flagAlt: "Saudi Arabia flag",
    },
    {
      label: "French (upper-intermediate)",
      flagSrc: encodeURI("/Drapeau/drapeau france.png"),
      flagAlt: "France flag",
    },
    {
      label: "English (intermediate)",
      flagSrc: encodeURI("/Drapeau/drapeau uk.png"),
      flagAlt: "UK flag",
    },
  ],
  ar: [
    {
      label: "القبائلية (اللغة الأم)",
      flagSrc: encodeURI("/Drapeau/drapeau kabyle.svg"),
      flagAlt: "علم القبائل",
    },
    {
      label: "العربية (متقدم)",
      flagSrc: encodeURI("/Drapeau/drapeau arabite sauite.png"),
      flagAlt: "علم السعودية",
    },
    {
      label: "الفرنسية (متوسط متقدم)",
      flagSrc: encodeURI("/Drapeau/drapeau france.png"),
      flagAlt: "علم فرنسا",
    },
    {
      label: "الإنجليزية (متوسط)",
      flagSrc: encodeURI("/Drapeau/drapeau uk.png"),
      flagAlt: "علم المملكة المتحدة",
    },
  ],
};

const EDUCATION_BY_LANG = {
  fr: education,
  en: [
    {
      period: "2025 - 2026",
      title: "Bachelor Year 3 - Computer Science",
      school: "Université Picardie Jules Verne - Amiens, France",
    },
    {
      period: "2024 - 2025",
      title: "Master 1 - Software Engineering",
      school: "Université Abderrahmane Mira - Béjaïa, Algeria",
    },
    {
      period: "2023 - 2024",
      title: "Bachelor Year 3 - Information Systems",
      school: "Université Abderrahmane Mira - Béjaïa, Algeria",
    },
    {
      period: "2021 - 2023",
      title: "Bachelor Year 1 / Year 2 - Computer Science",
      school: "Université Abderrahmane Mira - Béjaïa, Algeria",
    },
    {
      period: "2020 - 2021",
      title: "Mathematics Baccalaureate",
      school: "Ait Doued Hocine High School - Béjaïa, Algeria",
    },
  ],
  ar: [
    {
      period: "2025 - 2026",
      title: "ليسانس سنة ثالثة - إعلام آلي",
      school: "Université Picardie Jules Verne - Amiens, France",
    },
    {
      period: "2024 - 2025",
      title: "ماستر 1 - هندسة البرمجيات",
      school: "Université Abderrahmane Mira - Béjaïa, Algeria",
    },
    {
      period: "2023 - 2024",
      title: "ليسانس سنة ثالثة - نظم المعلومات",
      school: "Université Abderrahmane Mira - Béjaïa, Algeria",
    },
    {
      period: "2021 - 2023",
      title: "ليسانس سنة أولى / سنة ثانية - إعلام آلي",
      school: "Université Abderrahmane Mira - Béjaïa, Algeria",
    },
    {
      period: "2020 - 2021",
      title: "بكالوريا شعبة رياضيات",
      school: "ثانوية آيت دود حسين - بجاية، الجزائر",
    },
  ],
};

const INTERNSHIP_BY_LANG = {
  fr: {
    period: "Stage - 2025/2026",
    subject: "Algorithmes quantiques classiques",
    topics: [
      "Deutsch-Jozsa (1, 2, 3 variables)...",
      "Bernstein-Vazirani (3 variables)...",
      "Problème de Simon...",
    ],
    location: "Laboratoire EPROAD, Amiens, France",
  },
  en: {
    period: "Internship - 2025/2026",
    subject: "Classical quantum algorithms",
    topics: [
      "Deutsch-Jozsa (1, 2, 3 variables)...",
      "Bernstein-Vazirani (3 variables)...",
      "Simon's problem...",
    ],
    location: "EPROAD Laboratory, Amiens, France",
  },
  ar: {
    period: "تربص - 2025/2026",
    subject: "الخوارزميات الكمية الكلاسيكية",
    topics: [
      "Deutsch-Jozsa (1 و2 و3 متغيرات)...",
      "Bernstein-Vazirani (3 متغيرات)...",
      "مسألة Simon...",
    ],
    location: "مخبر EPROAD، أميان، فرنسا",
  },
};

const CONTACT_LINKS = {
  fr: [
    {
      icon: "facebook",
      label: "Facebook",
      value: "Bilal Mechkour",
      href: "https://www.facebook.com/bilal.mechkour.9",
    },
    {
      icon: "instagram",
      label: "Instagram",
      value: "Bilal Mechkour",
      href: "https://www.instagram.com/bilal._mechkour/",
    },
    {
      icon: "email",
      label: "Email",
      value: "billalmechekour@gmail.com",
      href: "mailto:billalmechekour@gmail.com",
    },
    {
      icon: "whatsapp",
      label: "WhatsApp",
      value: "+33 7 49 71 86 52",
      href: "https://wa.me/33749718652",
    },
    {
      icon: "github",
      label: "GitHub",
      value: "Mechekour Billal",
      href: "https://github.com/Billalmechekour",
    },
    {
      icon: "linkedin",
      label: "LinkedIn",
      value: "Billal Mechekour",
      href: "https://www.linkedin.com/in/billal-mechekour-685a65280/",
    },
  ],
  en: [
    {
      icon: "facebook",
      label: "Facebook",
      value: "Bilal Mechkour",
      href: "https://www.facebook.com/bilal.mechkour.9",
    },
    {
      icon: "instagram",
      label: "Instagram",
      value: "Bilal Mechkour",
      href: "https://www.instagram.com/bilal._mechkour/",
    },
    {
      icon: "email",
      label: "Email",
      value: "billalmechekour@gmail.com",
      href: "mailto:billalmechekour@gmail.com",
    },
    {
      icon: "whatsapp",
      label: "WhatsApp",
      value: "+33 7 49 71 86 52",
      href: "https://wa.me/33749718652",
    },
    {
      icon: "github",
      label: "GitHub",
      value: "Mechekour Billal",
      href: "https://github.com/Billalmechekour",
    },
    {
      icon: "linkedin",
      label: "LinkedIn",
      value: "Billal Mechekour",
      href: "https://www.linkedin.com/in/billal-mechekour-685a65280/",
    },
  ],
  ar: [
    {
      icon: "facebook",
      label: "فيسبوك",
      value: "Bilal Mechkour",
      href: "https://www.facebook.com/bilal.mechkour.9",
    },
    {
      icon: "instagram",
      label: "إنستغرام",
      value: "Bilal Mechkour",
      href: "https://www.instagram.com/bilal._mechkour/",
    },
    {
      icon: "email",
      label: "البريد الإلكتروني",
      value: "billalmechekour@gmail.com",
      href: "mailto:billalmechekour@gmail.com",
    },
    {
      icon: "whatsapp",
      label: "واتساب",
      value: "+33 7 49 71 86 52",
      href: "https://wa.me/33749718652",
    },
    {
      icon: "github",
      label: "جيت هاب",
      value: "Mechekour Billal",
      href: "https://github.com/Billalmechekour",
    },
    {
      icon: "linkedin",
      label: "لينكدإن",
      value: "Billal Mechekour",
      href: "https://www.linkedin.com/in/billal-mechekour-685a65280/",
    },
  ],
};

const EXPERIENCE_METRICS = {
  fr: [
    { value: 4, suffix: "ans", label: "d'expérience en développement web" },
    { value: 3, suffix: "ans", label: "d'expérience en design UI/UX" },
    { value: 8, prefix: "+", label: "projets" },
    { value: TECHNOLOGIES_COUNT, label: "technologies" },
  ],
  en: [
    { value: 4, suffix: "years", label: "of web development experience" },
    { value: 3, suffix: "years", label: "of UI/UX design experience" },
    { value: 8, prefix: "+", label: "projects" },
    { value: TECHNOLOGIES_COUNT, label: "technologies" },
  ],
  ar: [
    { value: 4, suffix: "سنوات", label: "خبرة في تطوير الويب" },
    { value: 3, suffix: "سنوات", label: "خبرة في تصميم UI/UX" },
    { value: 8, prefix: "+", label: "مشاريع" },
    { value: TECHNOLOGIES_COUNT, label: "تقنية" },
  ],
};

function ContactNetworkIcon({ type }) {
  const iconProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "facebook") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" {...iconProps}>
        <path d="M11.5 4.5h-1.4c-1.5 0-2.4 1-2.4 2.5v2H6.2" />
        <path d="M6.2 9.5h4.4" />
        <path d="M10 9.5v6" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" {...iconProps}>
        <rect x="3.2" y="3.2" width="13.6" height="13.6" rx="4" ry="4" />
        <circle cx="10" cy="10" r="3.2" />
        <circle cx="14.25" cy="5.75" r="0.85" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "email") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" {...iconProps}>
        <rect x="2.5" y="4" width="15" height="12" rx="2.2" ry="2.2" />
        <path d="m3.6 6 6.4 5.1L16.4 6" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" {...iconProps}>
        <path d="m6 3.5 2.4-.2.9 3.4-1.8 1.5a10.6 10.6 0 0 0 4.3 4.3l1.5-1.8 3.4.9-.2 2.4a1.7 1.7 0 0 1-1.8 1.5c-5.8-.5-10.2-5-10.7-10.7A1.7 1.7 0 0 1 6 3.5Z" />
      </svg>
    );
  }

  if (type === "whatsapp") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" {...iconProps}>
        <path d="M10 3.2a6.8 6.8 0 0 0-5.9 10.2L3.2 16.8l3.6-1a6.8 6.8 0 1 0 3.2-12.6Z" />
        <path d="m7.3 7.2.9-.1.5 1.6-.8.7a4.7 4.7 0 0 0 2.1 2.1l.7-.8 1.6.5-.1.9a1 1 0 0 1-1 .9 5.8 5.8 0 0 1-5.2-5.2 1 1 0 0 1 .9-1Z" />
      </svg>
    );
  }

  if (type === "github") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" {...iconProps}>
        <path d="m7.3 7.1-3 2.9 3 2.9" />
        <path d="m12.7 7.1 3 2.9-3 2.9" />
        <path d="m11.1 5.6-2.2 8.8" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" {...iconProps}>
        <rect x="3.1" y="3.1" width="13.8" height="13.8" rx="2.4" ry="2.4" />
        <circle cx="6.4" cy="7" r="1" fill="currentColor" stroke="none" />
        <path d="M6.4 9v5.1" />
        <path d="M9.4 9v5.1" />
        <path d="M9.4 11.2c0-1.1.7-2 1.8-2s1.7.9 1.7 2V14" />
      </svg>
    );
  }

  return null;
}

function App() {
  const languageMenuRef = useRef(null);
  const topbarRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    return window.localStorage.getItem("portfolio-theme") || "dark";
  });

  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") {
      return "fr";
    }
    return window.localStorage.getItem("portfolio-language") || "fr";
  });
  const [activeNav, setActiveNav] = useState("profile");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [nextPhotoIndex, setNextPhotoIndex] = useState(
    PHOTO_SEQUENCE.length > 1 ? 1 : 0
  );
  const [isPhotoTransitioning, setIsPhotoTransitioning] = useState(false);
  const [isBrandExpanded, setIsBrandExpanded] = useState(false);
  const [selectedProjectImages, setSelectedProjectImages] = useState({});

  useEffect(() => {
    const revealNodes = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("portfolio-theme", theme);
    document.body.classList.remove("theme-flash");
    window.requestAnimationFrame(() => {
      document.body.classList.add("theme-flash");
    });
    const clearFlash = window.setTimeout(() => {
      document.body.classList.remove("theme-flash");
    }, 650);
    return () => window.clearTimeout(clearFlash);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    const updateTopbarOffset = () => {
      const topbar = topbarRef.current;
      if (!topbar) {
        return;
      }
      const rect = topbar.getBoundingClientRect();
      const safeOffset = Math.max(88, Math.ceil(rect.bottom + 10));
      document.documentElement.style.setProperty(
        "--topbar-offset",
        `${safeOffset}px`
      );
    };

    updateTopbarOffset();
    const rafId = window.requestAnimationFrame(updateTopbarOffset);

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined" && topbarRef.current) {
      resizeObserver = new ResizeObserver(() => updateTopbarOffset());
      resizeObserver.observe(topbarRef.current);
    }

    window.addEventListener("resize", updateTopbarOffset);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateTopbarOffset);
      resizeObserver?.disconnect();
    };
  }, [language, theme, isBrandExpanded]);

  const clearUrlHash = useCallback(() => {
    const cleanUrl = `${window.location.pathname}${window.location.search}`;
    if (window.location.hash) {
      window.history.replaceState(null, "", cleanUrl);
    }
  }, []);

  const scrollToSection = useCallback((sectionId, behavior = "smooth") => {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    const topbar = document.querySelector(".topbar");
    const topbarHeight = topbar instanceof HTMLElement ? topbar.offsetHeight : 0;
    const targetTop =
      section.getBoundingClientRect().top + window.scrollY - topbarHeight - 16;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior,
    });
  }, []);

  const handleNavLinkClick = useCallback(
    (event, sectionId) => {
      event.preventDefault();
      setActiveNav(sectionId);
      scrollToSection(sectionId);
      clearUrlHash();
    },
    [clearUrlHash, scrollToSection]
  );

  useEffect(() => {
    const blockHashNavigation = () => {
      if (!window.location.hash) {
        return;
      }
      clearUrlHash();
      setActiveNav("profile");
      scrollToSection("profile", "auto");
    };

    blockHashNavigation();
    window.addEventListener("hashchange", blockHashNavigation);

    return () => {
      window.removeEventListener("hashchange", blockHashNavigation);
    };
  }, [clearUrlHash, scrollToSection]);

  const handleBrandClick = (event) => {
    event.preventDefault();
    setIsBrandExpanded((prev) => !prev);
    setActiveNav("profile");
    scrollToSection("profile");
    clearUrlHash();
  };

  useEffect(() => {
    const sections = NAV_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    );
    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveNav(visibleSections[0].target.id);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5],
        rootMargin: "-30% 0px -55% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isLanguageMenuOpen) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isLanguageMenuOpen]);

  useEffect(() => {
    if (PHOTO_SEQUENCE.length < 2) {
      return undefined;
    }

    const displayDuration = 3000;
    const transitionDuration = 1850;
    let startTimer;
    let endTimer;

    startTimer = setTimeout(() => {
      setNextPhotoIndex((currentPhotoIndex + 1) % PHOTO_SEQUENCE.length);
      setIsPhotoTransitioning(true);

      endTimer = setTimeout(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % PHOTO_SEQUENCE.length);
        setIsPhotoTransitioning(false);
      }, transitionDuration);
    }, displayDuration);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [currentPhotoIndex]);

  const text = useMemo(() => TEXTS[language], [language]);
  const profileCopy = useMemo(() => PROFILE_COPY[language], [language]);
  const educationList = useMemo(() => EDUCATION_BY_LANG[language], [language]);
  const spokenLanguages = useMemo(() => SPOKEN_LANGUAGES[language], [language]);
  const internship = useMemo(() => INTERNSHIP_BY_LANG[language], [language]);
  const contactLinks = useMemo(() => CONTACT_LINKS[language], [language]);
  const experienceMetrics = useMemo(() => EXPERIENCE_METRICS[language], [language]);
  const activeLanguage = useMemo(
    () => LANGUAGE_OPTIONS.find((item) => item.code === language),
    [language]
  );
  const [animatedCounts, setAnimatedCounts] = useState(() =>
    experienceMetrics.map(() => 0)
  );
  const [contactForm, setContactForm] = useState({
    lastName: "",
    firstName: "",
    message: "",
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const selectLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    setIsLanguageMenuOpen(false);
  };

  const handleContactFieldChange = (field, value) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const fullName = `${contactForm.firstName} ${contactForm.lastName}`.trim();
    const subject = encodeURIComponent(
      fullName ? `Message portfolio - ${fullName}` : "Message portfolio"
    );
    const body = encodeURIComponent(
      `Nom: ${contactForm.lastName || "-"}\nPrénom: ${contactForm.firstName || "-"}\n\nMessage:\n${contactForm.message || "-"}`
    );
    window.location.href = `mailto:billalmechekour@gmail.com?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    const targets = experienceMetrics.map((item) => item.value);
    const duration = 1300;
    const delays = targets.map((_, index) => index * 140);
    let frameId;
    let start = null;

    setAnimatedCounts(targets.map(() => 0));

    const animate = (timestamp) => {
      if (start === null) {
        start = timestamp;
      }

      const elapsed = timestamp - start;
      const nextValues = targets.map((target, index) => {
        const currentElapsed = Math.max(0, elapsed - delays[index]);
        const progress = Math.min(1, currentElapsed / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        return Math.round(target * eased);
      });

      setAnimatedCounts(nextValues);

      const isDone = nextValues.every((value, index) => value >= targets[index]);
      if (!isDone) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [language, experienceMetrics]);

  return (
    <div className="page-shell">
      <div className="background-orb orb-left" />
      <div className="background-orb orb-right" />

      <header className="topbar" ref={topbarRef}>
        <a
          className={`brand ${isBrandExpanded ? "expanded" : ""}`}
          href="#profile"
          onClick={handleBrandClick}
        >
          <span className="brand-text">
            <span className="brand-short">BM</span>
            <span className="brand-full">billal Mechekour</span>
          </span>
        </a>
        <nav className="topnav">
          <a
            href="#profile"
            className={activeNav === "profile" ? "active" : ""}
            onClick={(event) => handleNavLinkClick(event, "profile")}
          >
            {text.nav.profile}
          </a>
          <a
            href="#projects"
            className={activeNav === "projects" ? "active" : ""}
            onClick={(event) => handleNavLinkClick(event, "projects")}
          >
            {text.nav.projects}
          </a>
          <a
            href="#skills"
            className={activeNav === "skills" ? "active" : ""}
            onClick={(event) => handleNavLinkClick(event, "skills")}
          >
            {text.nav.skills}
          </a>
          <a
            href="#formation"
            className={activeNav === "formation" ? "active" : ""}
            onClick={(event) => handleNavLinkClick(event, "formation")}
          >
            {text.nav.formation}
          </a>
          <a
            href="#contact"
            className={activeNav === "contact" ? "active" : ""}
            onClick={(event) => handleNavLinkClick(event, "contact")}
          >
            {text.nav.contact}
          </a>
        </nav>
        <div className="topbar-controls">
          <div className="lang-picker" ref={languageMenuRef}>
            <button
              className="lang-trigger"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isLanguageMenuOpen}
              onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
            >
              <span className="lang-flag" aria-hidden="true">
                {activeLanguage?.flag}
              </span>
              <span className="lang-current">{activeLanguage?.label}</span>
              <span className="lang-caret" aria-hidden="true">
                ▾
              </span>
            </button>

            {isLanguageMenuOpen && (
              <ul className="lang-menu" role="listbox" aria-label={text.controls.language}>
                {LANGUAGE_OPTIONS.map((option) => (
                  <li key={option.code}>
                    <button
                      type="button"
                      className={`lang-option ${language === option.code ? "active" : ""}`}
                      onClick={() => selectLanguage(option.code)}
                    >
                      <span className="lang-flag" aria-hidden="true">
                        {option.flag}
                      </span>
                      <span>{option.label}</span>
                      {language === option.code && (
                        <span className="lang-check" aria-hidden="true">
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="theme-switch" type="button" onClick={toggleTheme}>
            <span className="theme-icon" aria-hidden="true">
              {theme === "dark" ? "🌙" : "☀️"}
            </span>
            <span>{theme === "dark" ? text.controls.modeDark : text.controls.modeLight}</span>
          </button>
        </div>
      </header>

      <main>
        <section id="profile" className="hero-screen reveal">
          <div className="hero">
            <div className="hero-copy">
              <p className="eyebrow">{text.hero.eyebrow}</p>
              <h1>{profile.fullName}</h1>
              <p className="headline">{profileCopy.headline}</p>
              <p className="intro">{profileCopy.intro}</p>

              <div className="hero-actions">
                <a
                  className="btn btn-primary"
                  href="#contact"
                  onClick={(event) => handleNavLinkClick(event, "contact")}
                >
                  {text.hero.github}
                </a>
                <a className="btn btn-ghost" href={profile.cvPath} target="_blank" rel="noreferrer">
                  {text.hero.contact}
                </a>
                <a className="btn btn-soft" href={profile.cvPath} download="CV-Billal-Mechekour.pdf">
                  {text.hero.cv}
                </a>
              </div>
            </div>

            <aside className={`hero-photo-card ${isPhotoTransitioning ? "transitioning" : ""}`}>
              <div className="hero-photo-stage">
                <span className="space-glow" aria-hidden="true" />
                <span className="planet-halo" aria-hidden="true" />
                <span className="orbit-ring ring-1" aria-hidden="true" />
                <span className="orbit-ring ring-2" aria-hidden="true" />
                <span className="orbit-spark spark-1" aria-hidden="true" />
                <span className="orbit-spark spark-2" aria-hidden="true" />
                <span className="orbit-spark spark-3" aria-hidden="true" />
                <span className="star-dust" aria-hidden="true" />
                <span className="lens-flare" aria-hidden="true" />
                <img
                  src={PHOTO_SEQUENCE[currentPhotoIndex]}
                  alt="Photo de Billal Mechekour"
                  className={`hero-photo hero-photo-current ${isPhotoTransitioning ? "orbit-out" : ""}`}
                />
                {isPhotoTransitioning && (
                  <>
                    <img
                      src={PHOTO_SEQUENCE[nextPhotoIndex]}
                      alt={`Photo de Billal Mechekour ${nextPhotoIndex + 1}`}
                      className="hero-photo hero-photo-next orbit-in"
                    />
                    <span className="orbital-trail" aria-hidden="true" />
                    <span className="eclipse-shadow" aria-hidden="true" />
                  </>
                )}
              </div>
            </aside>
          </div>

          <ul className="hero-metrics">
            {experienceMetrics.map((item, index) => (
              <li key={`${item.label}-${item.value}`} className="exp-pill">
                <span className="exp-number">
                  {item.prefix || ""}
                  {animatedCounts[index] ?? 0}
                </span>
                <span className="exp-suffix">{item.suffix ? ` ${item.suffix}` : ""}</span>
                <span className="exp-label"> {item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" className="section reveal">
          <div className="section-heading">
            {text.projects.eyebrow ? <p className="eyebrow">{text.projects.eyebrow}</p> : null}
            <h2>{text.projects.title}</h2>
            {text.projects.subtitle ? (
              <p className="project-subtitle">{text.projects.subtitle}</p>
            ) : null}
          </div>

          {projectCategories.map((category, categoryIndex) => (
            <div key={category.title} className="project-group reveal" style={{ "--delay": `${categoryIndex * 80}ms` }}>
              <h3>{CATEGORY_TITLES[category.title]?.[language] || category.title}</h3>
              <div className="project-grid">
                {category.projects.map((project, index) => {
                  const globalIndex =
                    projectCategories
                      .slice(0, categoryIndex)
                      .reduce((sum, item) => sum + item.projects.length, 0) + index;
                  const isReverse = globalIndex % 2 === 1;
                  const screenshot = PROJECT_SCREENSHOTS[project.name];
                  const gallery = PROJECT_GALLERIES[project.name] || (screenshot ? [screenshot] : []);
                  const selectedImage = selectedProjectImages[project.name];
                  const mainScreenshot = gallery.includes(selectedImage) ? selectedImage : gallery[0];

                  return (
                    <article
                      className={`project-card project-showcase reveal ${
                        isReverse ? "reverse project-enter-left" : "project-enter-right"
                      }`}
                      key={project.name}
                      style={{ "--delay": `${globalIndex * 90}ms` }}
                    >
                      <div className="project-content">
                        <header>
                          <h4>{project.name}</h4>
                          {project.isPrivate ? (
                            <span className="badge-private">{text.projects.privateRepo}</span>
                          ) : (
                            <span className="badge-public">{text.projects.publicRepo}</span>
                          )}
                        </header>
                        <p>{PROJECT_COPY[language]?.[project.name]?.description || project.description}</p>
                        <p className="impact">{PROJECT_COPY[language]?.[project.name]?.impact || project.impact}</p>
                        <ul className="stack-list">
                          {project.stack.map((tech) => (
                            <li key={`${project.name}-${tech}`}>{tech}</li>
                          ))}
                        </ul>
                        <div className="card-actions">
                          {project.githubUrl ? (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer">
                              GitHub
                            </a>
                          ) : (
                            <span className="link-disabled">{text.projects.githubPrivate}</span>
                          )}
                          {project.liveUrl ? (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer">
                              Live
                            </a>
                          ) : (
                            <span className="link-disabled">{text.projects.noDemo}</span>
                          )}
                          {project.prototypeUrl && (
                            <a href={project.prototypeUrl} target="_blank" rel="noreferrer">
                              {text.projects.prototype}
                            </a>
                          )}
                        </div>
                      </div>

                      <figure className="project-media">
                        <div className="project-media-main">
                          {mainScreenshot ? (
                            <img
                              src={mainScreenshot}
                              alt={`Capture d'écran du projet ${project.name}`}
                              loading="lazy"
                            />
                          ) : (
                            <div className="project-media-empty">Capture bientôt disponible</div>
                          )}
                        </div>

                        {gallery.length > 1 ? (
                          <div
                            className={`project-thumbs ${
                              project.name === "coach-sport-app" ? "centered" : ""
                            }`}
                            aria-label={`Galerie ${project.name}`}
                          >
                            {gallery.map((imageSrc, thumbIndex) => (
                              <button
                                key={`${project.name}-thumb-${thumbIndex}`}
                                type="button"
                                className={`project-thumb ${imageSrc === mainScreenshot ? "active" : ""}`}
                                onClick={() =>
                                  setSelectedProjectImages((prev) => ({
                                    ...prev,
                                    [project.name]: imageSrc,
                                  }))
                                }
                                aria-label={`Voir capture ${thumbIndex + 1} du projet ${project.name}`}
                                aria-pressed={imageSrc === mainScreenshot}
                              >
                                <img
                                  src={imageSrc}
                                  alt={`Miniature ${thumbIndex + 1} du projet ${project.name}`}
                                  loading="lazy"
                                />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="project-thumbs-placeholder" aria-hidden="true" />
                        )}
                      </figure>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <section id="skills" className="section reveal">
          <div className="section-heading">
            <p className="eyebrow">{text.skills.eyebrow}</p>
            <h2>{text.skills.title}</h2>
          </div>
          <div className="skill-grid">
            {skills.map((group, index) => (
              <article className="skill-card reveal" key={group.group} style={{ "--delay": `${index * 100}ms` }}>
                <h3>{SKILL_GROUP_LABELS[group.group]?.[language] || group.group}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={`${group.group}-${item}`}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <article className="skills-marquee-card reveal" style={{ "--delay": "140ms" }}>
            <h3>{text.skills.adTitle}</h3>
            <div className="tech-marquee" dir="ltr">
              <div className="tech-marquee-track">
                {[...AD_TECH_ICONS, ...AD_TECH_ICONS].map((icon, index) => (
                  <div className="tech-ad-item" key={`${icon.name}-${index}`}>
                    <img src={icon.src} alt={icon.name} loading="lazy" />
                    <span>{icon.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section id="formation" className="section two-columns reveal">
          <article className="about-panel education-panel reveal">
            <h2>{text.about.profileTitle}</h2>
            <div className="timeline">
              {educationList.map((item) => (
                <div key={item.period} className="timeline-item">
                  <span>{item.period}</span>
                  <strong>{item.title}</strong>
                  <p>{item.school}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="about-side reveal" style={{ "--delay": "120ms" }}>
            <article className="about-panel compact-info-card">
              <h2>{internship.period}</h2>
              <p className="stage-subject-mini">{internship.subject}</p>
              <ul className="stage-preview-list">
                {internship.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              <p className="stage-location-mini">{internship.location}</p>
            </article>

            <article className="about-panel compact-info-card">
              <h2>{text.about.languagesSectionTitle}</h2>
              <ul className="language-list">
                {spokenLanguages.map((item) => (
                  <li key={item.label}>
                    <span className="language-text">{item.label}</span>
                    {item.flagSrc ? (
                      <img
                        className="language-flag-icon"
                        src={item.flagSrc}
                        alt={item.flagAlt}
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className="language-flag-emoji"
                        role="img"
                        aria-label={item.flagAlt}
                      >
                        {item.flagEmoji}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="contact" className="section contact reveal">
          <div className="contact-shell">
            <p className="eyebrow">{text.contact.eyebrow}</p>
            <h2>{text.contact.title}</h2>
            <p className="contact-shell-text">{text.contact.text}</p>

            <div className="contact-layout">
              <form className="contact-form-card" onSubmit={handleContactSubmit}>
                <div className="contact-field-row">
                  <label className="contact-field">
                    <span>{text.contact.fields.lastName}</span>
                    <input
                      type="text"
                      value={contactForm.lastName}
                      onChange={(event) =>
                        handleContactFieldChange("lastName", event.target.value)
                      }
                      placeholder={text.contact.fields.lastNamePlaceholder}
                    />
                  </label>
                  <label className="contact-field">
                    <span>{text.contact.fields.firstName}</span>
                    <input
                      type="text"
                      value={contactForm.firstName}
                      onChange={(event) =>
                        handleContactFieldChange("firstName", event.target.value)
                      }
                      placeholder={text.contact.fields.firstNamePlaceholder}
                    />
                  </label>
                </div>

                <label className="contact-field contact-field-full">
                  <span>{text.contact.fields.message}</span>
                  <textarea
                    rows={6}
                    value={contactForm.message}
                    onChange={(event) =>
                      handleContactFieldChange("message", event.target.value)
                    }
                    placeholder={text.contact.fields.messagePlaceholder}
                  />
                </label>

                <button type="submit" className="contact-submit">
                  <span>{text.contact.submit}</span>
                  <span className="contact-submit-icon" aria-hidden="true">
                    <img src="/envoyer.png" alt="" loading="lazy" />
                  </span>
                </button>
              </form>

              <aside className="contact-network-card">
                <h3>{text.contact.networkTitle}</h3>
                <ul className="network-list">
                  {contactLinks.map((item) => (
                    <li key={`${item.label}-${item.value}`}>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        <span className="network-icon" aria-hidden="true">
                          <ContactNetworkIcon type={item.icon} />
                        </span>
                        <span className="network-content">
                          <span className="network-label">{item.label}</span>
                          <span className="network-value">{item.value}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          {new Date().getFullYear()} • {profile.fullName}
        </p>
      </footer>
    </div>
  );
}

export default App;
