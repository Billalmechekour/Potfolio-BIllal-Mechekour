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

const toOptimizedProjectPath = (path, variantDir = "project-media") => {
  const decodedPath = decodeURI(path);
  const normalizedPath = decodedPath.startsWith("/") ? decodedPath.slice(1) : decodedPath;
  const optimizedPath = normalizedPath.replace(/\.(png|jpe?g|webp)$/i, ".jpg");
  return encodeURI(`/${variantDir}/${optimizedPath}`);
};

const toProjectMediaPath = (path) => toOptimizedProjectPath(path, "project-media");

const toProjectThumbFromMediaPath = (mediaPath) => {
  const decodedPath = decodeURI(mediaPath);
  return encodeURI(decodedPath.replace(/^\/project-media\//, "/project-thumbs/"));
};

const toProjectWebpFromMediaPath = (mediaPath) => {
  const decodedPath = decodeURI(mediaPath);
  return encodeURI(
    decodedPath
      .replace(/^\/project-media\//, "/project-media-webp/")
      .replace(/\.(png|jpe?g|webp)$/i, ".webp")
  );
};

const toProjectThumbWebpFromMediaPath = (mediaPath) => {
  const decodedPath = decodeURI(mediaPath);
  return encodeURI(
    decodedPath
      .replace(/^\/project-media\//, "/project-thumbs-webp/")
      .replace(/\.(png|jpe?g|webp)$/i, ".webp")
  );
};

const PROJECT_SCREENSHOTS = {
  "mega-shop": toProjectMediaPath("/captures projets/megaShop.png"),
  Shifa: toProjectMediaPath("/captures projets/Shifa.png"),
  "algo-game": toProjectMediaPath("/captures projets/AlgoGame.png"),
  "coach-sport-app": toProjectMediaPath("/captures projets/coach-sport-app.png"),
  "Béjaïa Tour Guide": toProjectMediaPath("/captures projets/BejaiaTourGuide.png"),
};

const encodeGallery = (paths) => paths.map((path) => toProjectMediaPath(path));

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

const CHATBOT_PERSONAL_INFO = {
  fr: {
    identity:
      "Billal Mechekour est un homme algérien et étudiant en informatique à l'UPJV (2025-2026). Il a obtenu sa licence en Système d'information en Algérie et validé également sa première année de Master en Génie logiciel.",
    firstName: "Billal",
    lastName: "Mechekour",
    country: "Algérie",
    residence: "Amiens, France",
    birthPlace: "Akbou, Béjaïa, Algérie",
    birthDate: "05/04/2003",
    age: "23 ans",
    internshipLocation: "Laboratoire EPROAD, Amiens, France",
    license3:
      "En cours: Licence 3 Informatique à l'UPJV (Amiens, France). Licence obtenue aussi à l'Université de Béjaïa, Algérie.",
    master: "Master 1 en Génie logiciel à l'Université de Béjaïa, Algérie.",
    license2: "Licence 2 à l'Université de Béjaïa, Algérie.",
    license1: "Licence 1 à l'Université de Béjaïa, Algérie.",
    baccalaureateSchool: "Lycée Ait Doued Hocine, Béjaïa, Algérie.",
    baccalaureateMention: "Bien",
    baccalaureateAverage: "15/20",
    motherTongue: "Kabyle",
    webExperience: "4 ans",
    designExperience: "3 ans",
    projectsCount: "+8",
    technologiesCount: "Plus de 20",
  },
  en: {
    identity:
      "Billal Mechekour is an Algerian man and a computer science student at UPJV (2025-2026). He earned his Information Systems bachelor's degree in Algeria and also validated his first year of a Software Engineering master's.",
    firstName: "Billal",
    lastName: "Mechekour",
    country: "Algeria",
    residence: "Amiens, France",
    birthPlace: "Akbou, Béjaïa, Algeria",
    birthDate: "05/04/2003",
    age: "23 years old",
    internshipLocation: "EPROAD Laboratory, Amiens, France",
    license3:
      "Current: Bachelor Year 3 in Computer Science at UPJV (Amiens, France). He also obtained a bachelor's degree at the University of Béjaïa, Algeria.",
    master: "Master 1 in Software Engineering at the University of Béjaïa, Algeria.",
    license2: "Bachelor Year 2 at the University of Béjaïa, Algeria.",
    license1: "Bachelor Year 1 at the University of Béjaïa, Algeria.",
    baccalaureateSchool: "Ait Doued Hocine High School, Béjaïa, Algeria.",
    baccalaureateMention: "Good",
    baccalaureateAverage: "15/20",
    motherTongue: "Kabyle",
    webExperience: "4 years",
    designExperience: "3 years",
    projectsCount: "+8",
    technologiesCount: "More than 20",
  },
  ar: {
    identity:
      "بلال مشكور شاب جزائري وطالب إعلام آلي في جامعة UPJV (2025-2026). تحصل على ليسانس في نظم المعلومات بالجزائر ونجح كذلك في السنة الأولى ماستر هندسة البرمجيات.",
    firstName: "Billal",
    lastName: "Mechekour",
    country: "الجزائر",
    residence: "أميان، فرنسا",
    birthPlace: "أقبو، بجاية، الجزائر",
    birthDate: "05/04/2003",
    age: "23 سنة",
    internshipLocation: "مخبر EPROAD، أميان، فرنسا",
    license3:
      "حالياً: ليسانس 3 إعلام آلي في UPJV (أميان، فرنسا). وتحصل أيضاً على ليسانس في جامعة بجاية، الجزائر.",
    master: "ماستر 1 هندسة البرمجيات في جامعة بجاية، الجزائر.",
    license2: "ليسانس 2 في جامعة بجاية، الجزائر.",
    license1: "ليسانس 1 في جامعة بجاية، الجزائر.",
    baccalaureateSchool: "ثانوية آيت دود حسين، بجاية، الجزائر.",
    baccalaureateMention: "جيد",
    baccalaureateAverage: "15/20",
    motherTongue: "القبائلية",
    webExperience: "4 سنوات",
    designExperience: "3 سنوات",
    projectsCount: "+8",
    technologiesCount: "أكثر من 20",
  },
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

const CHATBOT_UI = {
  fr: {
    open: "Ouvrir l'assistant",
    close: "Fermer",
    title: "Assistant Billal",
    subtitle: "Réponses sur mon profil et mes projets",
    botName: "BM Chatbot",
    botRole: "Votre Assistant",
    placeholder: "Ex: Quels sont tes projets ?",
    send: "Envoyer",
    typing: "BillalBot écrit...",
    empty: "Écris une question.",
    clarify: "Est-ce que tu veux dire : \"{question}\" ?",
    confirmYesNo: "Réponds par oui ou non.",
    notUnderstood:
      "Je n'ai pas compris votre question, essaye de la formuler bien.",
    greetingHelp: "Comment puis-je t'aider 😊",
    welcome:
      "Salut ✨ Je suis l'assistant de Billal. Je peux répondre sur son profil, ses projets, ses compétences, sa formation, son stage et ses contacts.",
    suggestions: [
      "Présente-toi",
      "Quels sont tes projets ?",
      "Quelles technologies maîtrises-tu ?",
      "Comment te contacter ?",
    ],
    fallback:
      "Je peux répondre sur: profil, projets, compétences, formation, stage, langues, expérience, CV, contact, pays, résidence, âge, naissance, bac et parcours universitaire.",
    labels: {
      profile: "👤 Profil",
      identity: "🧑 Qui est Billal",
      firstName: "🪪 Prénom",
      lastName: "🪪 Nom",
      projects: "🚀 Projets",
      skills: "🛠️ Compétences techniques",
      skillsInGroup: "🧩 Compétences en",
      education: "🎓 Formation",
      internship: "💼 Stage",
      internshipLocation: "📍 Lieu du stage",
      license3: "📘 Licence 3",
      license2: "📗 Licence 2",
      license1: "📕 Licence 1",
      master: "🎯 Master",
      baccalaureate: "🏫 Baccalauréat",
      baccalaureateMention: "⭐ Mention du bac",
      baccalaureateAverage: "📊 Moyenne du bac",
      motherTongue: "🗣️ Langue maternelle",
      webExperience: "💻 Expérience web",
      designExperience: "🎨 Expérience design",
      projectsCount: "📦 Nombre de projets",
      technologiesCount: "🧠 Nombre de technologies",
      contacts: "📞 Contacts",
      cv: "📄 CV",
      cvPreview: "📄 Aperçu du CV",
      cvDownload: "⬇️ Télécharger le CV",
      location: "📍 Localisation",
      country: "🌍 Pays",
      residence: "🏠 Résidence",
      birthplace: "🧭 Lieu de naissance",
      birthDate: "🎂 Date de naissance",
      age: "⏳ Âge",
      experience: "📈 Expérience",
      availability: "✅ Disponibilité",
      stack: "🧩 Stack",
      repo: "🐙 GitHub",
      live: "🟢 Live",
    },
  },
  en: {
    open: "Open assistant",
    close: "Close",
    title: "Billal Assistant",
    subtitle: "Answers about my profile and projects",
    botName: "BM Chatbot",
    botRole: "Your Assistant",
    placeholder: "Ex: What projects did you build?",
    send: "Send",
    typing: "BillalBot is typing...",
    empty: "Type a question.",
    clarify: "Do you mean: \"{question}\"?",
    confirmYesNo: "Please answer with yes or no.",
    notUnderstood: "I didn't understand your question, please rephrase it clearly.",
    greetingHelp: "How can I help you? 😊",
    welcome:
      "Hi ✨ I'm Billal's assistant. I can answer questions about his profile, projects, skills, education, internship, and contact links.",
    suggestions: [
      "Introduce yourself",
      "What are your projects?",
      "What technologies do you master?",
      "How can I contact you?",
    ],
    fallback:
      "I can answer about: profile, projects, skills, education, internship, languages, experience, CV, contact, country, residence, age, birthplace, baccalaureate, and academic path.",
    labels: {
      profile: "👤 Profile",
      identity: "🧑 Who is Billal",
      firstName: "🪪 First name",
      lastName: "🪪 Last name",
      projects: "🚀 Projects",
      skills: "🛠️ Technical skills",
      skillsInGroup: "🧩 Skills in",
      education: "🎓 Education",
      internship: "💼 Internship",
      internshipLocation: "📍 Internship location",
      license3: "📘 Bachelor Year 3",
      license2: "📗 Bachelor Year 2",
      license1: "📕 Bachelor Year 1",
      master: "🎯 Master",
      baccalaureate: "🏫 Baccalaureate",
      baccalaureateMention: "⭐ Baccalaureate mention",
      baccalaureateAverage: "📊 Baccalaureate average",
      motherTongue: "🗣️ Mother tongue",
      webExperience: "💻 Web experience",
      designExperience: "🎨 Design experience",
      projectsCount: "📦 Projects count",
      technologiesCount: "🧠 Technologies count",
      contacts: "📞 Contact",
      cv: "📄 CV",
      cvPreview: "📄 CV preview",
      cvDownload: "⬇️ Download CV",
      location: "📍 Location",
      country: "🌍 Country",
      residence: "🏠 Residence",
      birthplace: "🧭 Birthplace",
      birthDate: "🎂 Birth date",
      age: "⏳ Age",
      experience: "📈 Experience",
      availability: "✅ Availability",
      stack: "🧩 Stack",
      repo: "🐙 GitHub",
      live: "🟢 Live",
    },
  },
  ar: {
    open: "فتح المساعد",
    close: "إغلاق",
    title: "مساعد بلال",
    subtitle: "إجابات حول الملف والمشاريع",
    botName: "BM Chatbot",
    botRole: "مساعدك",
    placeholder: "مثال: ما هي مشاريعك؟",
    send: "إرسال",
    typing: "BillalBot يكتب...",
    empty: "اكتب سؤالك.",
    clarify: "هل تقصد: \"{question}\"؟",
    confirmYesNo: "يرجى الرد بنعم أو لا.",
    notUnderstood: "لم أفهم سؤالك، حاول إعادة صياغته بشكل أوضح.",
    greetingHelp: "كيف يمكنني مساعدتك؟ 😊",
    welcome:
      "مرحباً ✨ أنا مساعد بلال. أستطيع الإجابة عن ملفه، مشاريعه، مهاراته، تكوينه، تربصه ووسائل التواصل.",
    suggestions: [
      "عرفني بنفسك",
      "ما هي مشاريعك؟",
      "ما هي التقنيات التي تتقنها؟",
      "كيف أتواصل معك؟",
    ],
    fallback:
      "أستطيع الإجابة عن: الملف، المشاريع، المهارات، التكوين، التربص، اللغات، الخبرة، السيرة الذاتية، التواصل، البلد، الإقامة، العمر، الميلاد، البكالوريا، والمسار الجامعي.",
    labels: {
      profile: "👤 الملف",
      identity: "🧑 من هو بلال",
      firstName: "🪪 الاسم",
      lastName: "🪪 اللقب",
      projects: "🚀 المشاريع",
      skills: "🛠️ المهارات التقنية",
      skillsInGroup: "🧩 مهارات",
      education: "🎓 التكوين",
      internship: "💼 التربص",
      internshipLocation: "📍 مكان التربص",
      license3: "📘 ليسانس 3",
      license2: "📗 ليسانس 2",
      license1: "📕 ليسانس 1",
      master: "🎯 الماستر",
      baccalaureate: "🏫 البكالوريا",
      baccalaureateMention: "⭐ تقدير البكالوريا",
      baccalaureateAverage: "📊 معدل البكالوريا",
      motherTongue: "🗣️ اللغة الأم",
      webExperience: "💻 خبرة الويب",
      designExperience: "🎨 خبرة التصميم",
      projectsCount: "📦 عدد المشاريع",
      technologiesCount: "🧠 عدد التقنيات",
      contacts: "📞 التواصل",
      cv: "📄 السيرة الذاتية",
      cvPreview: "📄 معاينة السيرة الذاتية",
      cvDownload: "⬇️ تحميل السيرة الذاتية",
      location: "📍 الموقع",
      country: "🌍 البلد",
      residence: "🏠 الإقامة",
      birthplace: "🧭 مكان الميلاد",
      birthDate: "🎂 تاريخ الميلاد",
      age: "⏳ العمر",
      experience: "📈 الخبرة",
      availability: "✅ التوفر",
      stack: "🧩 التقنيات",
      repo: "🐙 GitHub",
      live: "🟢 Live",
    },
  },
};

const PROJECT_ALIASES = {
  "mega-shop": ["mega shop", "megashop", "mega-shop", "mega", "shop"],
  Shifa: ["shifa", "chifa", "shifaa"],
  "algo-game": ["algo game", "algo-game", "algogame", "algo", "game"],
  "coach-sport-app": ["coach sport", "coach app", "coach-sport-app", "coachsport"],
  "Béjaïa Tour Guide": [
    "bejaia",
    "bejai",
    "bejaia tour guide",
    "bejaia guide",
    "bejaia touguide",
    "bejai tour guide",
    "béjaïa",
    "tour guide",
    "guide touristique",
  ],
};

const PROJECT_CHATBOT_DETAILS = {
  "algo-game": {
    title: "Algo Game",
    description:
      "Jeu en réseau multijoueur qui permet à jusqu'à 4 joueurs de s'affronter dans des défis d'algorithmique. Les participants répondent à des questions Flash et Code sous la pression d'un chronomètre décroissant, ce qui renforce la motivation et l'enthousiasme. À la fin, un classement est affiché et le gagnant est désigné.",
    technologies: {
      Frontend: ["React 19", "Vite 7"],
      "UI/CSS": ["Tailwind CSS", "PostCSS", "Autoprefixer"],
      Backend: ["Node.js (modules ES)"],
      "Temps reel": ["WebSocket (librairie ws)"],
      Utilitaires: ["nanoid (IDs/codes)"],
      "Qualite code": ["ESLint"],
      "Gestion paquets": ["npm (client + serveur)"],
      "Validation code": ["Python, Java, C, C++ (compilation/validation cote serveur)"],
    },
  },
  Shifa: {
    title: "Shifa",
    description:
      "Application web de gestion des rendez-vous medicaux qui permet aux patients de reserver facilement une consultation pour eux-memes ou leurs enfants. Elle aide a organiser les dates et horaires, reduit la surcharge a l'accueil, et propose des espaces dedies pour secretaires et medecins afin d'assurer un meilleur suivi.",
    technologies: {
      Backend: ["Node.js", "Express.js"],
      Templates: ["EJS"],
      "Base de donnees": ["MySQL / MariaDB via mysql2"],
      Sessions: ["express-session"],
      Securite: ["bcrypt"],
      Validation: ["express-validator"],
      Email: ["nodemailer (SMTP Gmail)"],
      Config: ["dotenv"],
      Frontend: ["HTML", "CSS", "Bootstrap", "Font Awesome (CDN)"],
      Dev: ["nodemon"],
      Architecture: ["Server-side rendering (pas React/Vue/Angular)"],
    },
  },
  "mega-shop": {
    title: "Mega Shop",
    description:
      "Application web d'achat et de vente en ligne avec trois roles principaux: client, vendeur et administrateur. Le client peut acheter, puis devenir vendeur en creant sa boutique. Chaque vendeur gere ses produits et ses ventes, tandis que l'administrateur peut aussi proposer des produits et superviser l'activite globale.",
    technologies: {
      Frontend: ["Next.js 15", "React 19", "TypeScript"],
      "UI/CSS": [
        "Tailwind CSS v4",
        "tailwindcss-animate",
        "@tailwindcss/typography",
        "shadcn/ui",
        "Radix UI",
        "Lucide",
      ],
      "Etat global": ["Redux Toolkit", "react-redux", "redux-persist"],
      Auth: ["NextAuth v5 (credentials)", "bcryptjs"],
      "Base de donnees": ["Prisma ORM", "MySQL"],
      Formulaires: ["React Hook Form", "Zod"],
      "Animation/UX": ["Framer Motion", "Sonner"],
      Data: ["Recharts", "xlsx"],
      "Autres": ["PWA via manifest"],
    },
  },
  "coach-sport-app": {
    title: "Coach Sport App",
    description:
      "Application dediee au coaching sportif pour suivre les athletes en ligne, proposer des programmes personnalises et assurer un suivi regulier de la progression physique.",
    technologies: {
      Frontend: ["React 18", "JavaScript", "JSX"],
      Build: ["Vite 5", "@vitejs/plugin-react"],
      "UI/CSS": ["Tailwind CSS 3", "PostCSS", "Autoprefixer"],
      Architecture: ["Front-end uniquement (pas de backend/API detecte)"],
    },
  },
  "Béjaïa Tour Guide": {
    title: "Béjaïa Tour Guide",
    description:
      "Application web dediee a la decouverte et a la valorisation du patrimoine naturel et historique de la wilaya de Bejaia. Les utilisateurs explorent les sites, accedent a des contenus culturels, interagissent via likes/commentaires et sauvegardent des favoris.",
    technologies: {
      Frontend: ["Vue 3", "Vue Router"],
      Langages: ["JavaScript", "CSS"],
      Build: ["Vite", "@vitejs/plugin-vue"],
      Services: ["Firebase (Firestore + Auth Google)"],
      Cartographie: ["Leaflet", "OpenStreetMap"],
      "UI libs": ["vue3-toastify", "@kalimahapps/vue-icons"],
    },
  },
};

const PROJECT_QUERY_KEYWORDS = {
  description: ["description", "presentation", "présentation", "c est quoi", "details", "détails"],
  technologies: ["technologie", "technologies", "stack", "utilise", "utilisé", "utulise", "framework"],
  frontend: ["front", "frontend", "client", "ui"],
  backend: ["back", "backend", "serveur", "server"],
  database: ["base de donnees", "base de donnes", "database", "db", "mysql", "postgres", "mongodb", "oracle"],
  links: ["lien", "link", "url", "repo", "github", "live", "demo", "démo", "prototype"],
  github: ["github", "git hub", "repo"],
  live: ["live", "demo", "démo"],
  prototype: ["prototype", "figma", "proto"],
};

const CHATBOT_KEYWORDS = {
  greeting: [
    "bonjour",
    "bonsoir",
    "salut",
    "hello",
    "hi",
    "salam",
    "مرحبا",
    "السلام",
  ],
  identity: [
    "qui est bilal",
    "c est qui bilal",
    "quel est bilal",
    "parle moi de bilal",
    "presentes moi bilal",
    "who is bilal",
    "tell me about bilal",
    "about bilal",
    "من هو بلال",
    "عرفني بلال",
    "عرفني ببلال",
    "بلال من",
  ],
  profile: [
    "profil",
    "profile",
    "present",
    "présente",
    "introduce",
    "about you",
    "qui es tu",
    "who are you",
    "من انت",
    "عرفني",
  ],
  country: [
    "pays",
    "nationalite",
    "nationalité",
    "originaire",
    "country",
    "nationality",
    "from which country",
    "which country",
    "من اي بلد",
    "من أي بلد",
    "البلد",
    "دولة",
  ],
  residence: [
    "residence",
    "résidence",
    "habite",
    "ou habite",
    "where do you live",
    "where he lives",
    "live",
    "reside",
    "resides",
    "يسكن",
    "أين يعيش",
    "اين يعيش",
    "الاقامة",
    "الإقامة",
  ],
  age: [
    "age",
    "âge",
    "how old",
    "old is",
    "quel age",
    "quel âge",
    "العمر",
    "كم عمر",
    "سنه",
    "سنة",
  ],
  birthdate: [
    "date de naissance",
    "nee quand",
    "né quand",
    "naissance quand",
    "birth date",
    "date of birth",
    "when born",
    "تاريخ الميلاد",
    "متى ولد",
  ],
  stageLocation: [
    "ou effectue stage",
    "où effectue stage",
    "ou fait stage",
    "où fait stage",
    "lieu stage",
    "stage ou",
    "where internship",
    "internship where",
    "مكان التربص",
    "وين تربص",
  ],
  birthplace: [
    "ne ou",
    "né ou",
    "né à",
    "naissance",
    "lieu de naissance",
    "born",
    "birthplace",
    "birth place",
    "where was born",
    "akbou",
    "مكان الميلاد",
    "مولود",
    "من مواليد",
  ],
  license3: ["licence 3", "license 3", "l3", "upjv", "licene 3"],
  master: ["master", "master 1", "m1", "genie logiciel", "génie logiciel"],
  license2: ["licence 2", "license 2", "l2"],
  license1: ["licence 1", "license 1", "l1"],
  baccalaureate: ["bac", "baccalaureat", "baccalauréat", "lycee", "lycée"],
  bacMention: ["mention bac", "mention du bac", "mention", "tres bien", "très bien", "bien"],
  bacAverage: ["moyenne bac", "moyenne du bac", "moyen bac", "15", "15 20"],
  motherTongue: ["langue maternelle", "maternel", "mother tongue", "native language", "kabyle"],
  webExperience: ["experience web", "developpement web", "développement web", "web experience"],
  designExperience: ["experience design", "design ui", "ui ux", "ux ui", "design experience"],
  projectsCount: ["nombre projets", "combien projets", "how many projects", "عدد المشاريع"],
  technologiesCount: [
    "nombre technologies",
    "combien technologies",
    "how many technologies",
    "plus de 20",
    "عدد التقنيات",
  ],
  projects: ["projet", "projects", "project", "portfolio", "realisation", "المشاريع", "مشروع"],
  skills: [
    "competence",
    "compétence",
    "skills",
    "skill",
    "technologie",
    "technology",
    "stack",
    "المهارات",
    "تقنيات",
  ],
  education: [
    "formation",
    "education",
    "etude",
    "étude",
    "universite",
    "université",
    "diplome",
    "diplôme",
    "التكوين",
    "الدراسة",
    "جامعة",
  ],
  internship: ["stage", "internship", "eproad", "quantique", "quantum", "التربص", "تدريب"],
  languages: ["langue", "langues", "language", "languages", "اللغات", "لغة", "kabyle", "arab"],
  cv: ["cv", "resume", "résumé", "curriculum", "السيرة", "سيرة"],
  cvDisplay: [
    "affiche cv",
    "afficher cv",
    "consulter cv",
    "voir cv",
    "montre cv",
    "show cv",
    "view cv",
    "open cv",
    "عرض السيرة",
    "اظهر السيرة",
  ],
  location: ["ville", "city", "location", "where", "amiens", "bejaia", "béjaïa", "المدينة", "اين", "أين"],
  experience: ["experience", "expérience", "years", "ans", "خبرة", "سنوات"],
  availability: ["disponible", "available", "mission", "alternance", "متاح", "فرص"],
};

const CHATBOT_CONFIRMATION = {
  fr: {
    yes: ["oui", "ouii", "ouais", "bien sur", "d accord", "ok", "yes", "yep"],
    no: ["non", "nan", "pas", "no", "nope"],
  },
  en: {
    yes: ["yes", "yeah", "yep", "sure", "ok", "okay"],
    no: ["no", "nope", "not"],
  },
  ar: {
    yes: ["نعم", "اي", "أيوه", "ايوه", "yes", "oui"],
    no: ["لا", "مو", "ليس", "no", "non"],
  },
};

const SKILL_GROUP_ALIASES = {
  Langages: ["langage", "langages", "languages", "programming", "code", "javascript", "python"],
  Web: ["web", "frontend", "backend", "full stack", "fullstack", "react", "vue", "node"],
  "Données": [
    "donnees",
    "données",
    "donnes",
    "database",
    "base de donnees",
    "base de donnes",
    "base donnes",
    "sql",
    "postgres",
    "postgresql",
    "mongodb",
    "oracle",
  ],
  "Big Data": ["big data", "hadoop", "hive"],
  "Outils & Design": ["outils", "design", "tools", "figma", "photoshop", "illustrator", "canva", "git"],
  "Méthodologies": ["methodologie", "méthodologie", "methodologies", "agile", "dsdm", "ui ux", "ux ui"],
};

const CHATBOT_INTENT_PHRASES = {
  fr: [
    { intent: "identity", phrases: ["qui est bilal", "c qui bilal", "parle moi de bilal"] },
    {
      intent: "birthdate",
      phrases: ["bilal est ne quand", "date de naissance de bilal", "bilal nee quand"],
    },
    { intent: "country", phrases: ["bilal de quel pays", "quel pays", "nationalite de bilal"] },
    { intent: "residence", phrases: ["bilal habite ou", "ou habite bilal", "residence de bilal"] },
    { intent: "age", phrases: ["quel age a bilal", "age de bilal"] },
    { intent: "birthplace", phrases: ["bilal est ne ou", "lieu de naissance de bilal"] },
  ],
  en: [
    { intent: "identity", phrases: ["who is bilal", "tell me about bilal"] },
    { intent: "birthdate", phrases: ["when was bilal born", "billal birth date"] },
    { intent: "country", phrases: ["which country is bilal from", "bilal nationality"] },
    { intent: "residence", phrases: ["where does bilal live", "bilal residence"] },
    { intent: "age", phrases: ["how old is bilal", "bilal age"] },
    { intent: "birthplace", phrases: ["where was bilal born", "bilal birthplace"] },
  ],
  ar: [
    { intent: "identity", phrases: ["من هو بلال", "عرفني بلال"] },
    { intent: "birthdate", phrases: ["متى ولد بلال", "تاريخ ميلاد بلال"] },
    { intent: "country", phrases: ["بلال من اي بلد", "جنسية بلال"] },
    { intent: "residence", phrases: ["اين يعيش بلال", "اقامة بلال"] },
    { intent: "age", phrases: ["كم عمر بلال", "عمر بلال"] },
    { intent: "birthplace", phrases: ["اين ولد بلال", "مكان ميلاد بلال"] },
  ],
};

const CHATBOT_CLARIFICATION_QUESTIONS = {
  fr: {
    identity: "Qui est Bilal ?",
    birthdate: "Bilal est né quand ?",
    country: "Bilal est de quel pays ?",
    residence: "Bilal habite où ?",
    age: "Quel âge a Bilal ?",
    birthplace: "Bilal est né où ?",
  },
  en: {
    identity: "Who is Billal?",
    birthdate: "When was Billal born?",
    country: "Which country is Billal from?",
    residence: "Where does Billal live?",
    age: "How old is Billal?",
    birthplace: "Where was Billal born?",
  },
  ar: {
    identity: "من هو بلال؟",
    birthdate: "متى ولد بلال؟",
    country: "بلال من أي بلد؟",
    residence: "أين يعيش بلال؟",
    age: "كم عمر بلال؟",
    birthplace: "بلال مولود فين؟",
  },
};

const CONTACT_TYPE_KEYWORDS = {
  facebook: ["facebook", "فيسبوك"],
  instagram: ["instagram", "insta", "انستغرام", "إنستغرام"],
  email: ["email", "mail", "gmail", "البريد"],
  whatsapp: ["whatsapp", "واتساب", "phone", "telephone", "téléphone", "رقم"],
  github: ["github", "git hub", "جيت هاب"],
  linkedin: ["linkedin", "لينكد", "لينكدإن"],
};

const createMessageId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0600-\u06ff\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value) =>
  normalizeText(value)
    .replace(/[-_]/g, " ")
    .split(" ")
    .filter(Boolean);

const hasKeyword = (normalizedMessage, keywords) => {
  const tokens = tokenize(normalizedMessage);

  return keywords.some((keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) {
      return false;
    }

    if (normalizedKeyword.includes(" ")) {
      return normalizedMessage.includes(normalizedKeyword);
    }

    return tokens.some((token) => {
      if (token === normalizedKeyword) {
        return true;
      }

      if (normalizedKeyword.length >= 4 && token.startsWith(normalizedKeyword)) {
        return true;
      }

      return false;
    });
  });
};

const levenshteinDistance = (source, target) => {
  const a = source || "";
  const b = target || "";

  if (!a.length) {
    return b.length;
  }
  if (!b.length) {
    return a.length;
  }

  const matrix = Array.from({ length: b.length + 1 }, () => Array(a.length + 1).fill(0));

  for (let i = 0; i <= b.length; i += 1) {
    matrix[i][0] = i;
  }
  for (let j = 0; j <= a.length; j += 1) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i += 1) {
    for (let j = 1; j <= a.length; j += 1) {
      const cost = b[i - 1] === a[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
};

const similarityScore = (source, target) => {
  if (!source || !target) {
    return 0;
  }

  const distance = levenshteinDistance(source, target);
  const maxLength = Math.max(source.length, target.length);
  if (!maxLength) {
    return 1;
  }

  return 1 - distance / maxLength;
};

const hasApproxToken = (tokens, dictionary, maxDistance = 2) =>
  tokens.some((token) =>
    dictionary.some((word) => {
      const normalizedWord = normalizeText(word);
      if (token === normalizedWord) {
        return true;
      }
      if (token.length <= 2 || normalizedWord.length <= 2) {
        return false;
      }
      return levenshteinDistance(token, normalizedWord) <= maxDistance;
    })
  );

const detectConfirmation = (message, language) => {
  const normalized = normalizeText(message);
  const phrases = CHATBOT_CONFIRMATION[language];

  if (hasKeyword(normalized, phrases.yes)) {
    return "yes";
  }

  if (hasKeyword(normalized, phrases.no)) {
    return "no";
  }

  return null;
};

const hasTokenNumber = (tokens, numberValue) =>
  tokens.includes(String(numberValue)) || tokens.includes(`l${numberValue}`);

const detectPersonalIntent = (normalizedMessage) => {
  const tokens = tokenize(normalizedMessage);
  const asksFirstName =
    hasKeyword(normalizedMessage, ["prenom", "prénom", "first name", "given name"]) ||
    (tokens.includes("prenom") || tokens.includes("prénom"));
  const asksLastName =
    hasKeyword(normalizedMessage, ["nom", "last name", "family name", "surname", "nom famille"]) ||
    tokens.includes("nom");

  const asksWhere =
    hasKeyword(normalizedMessage, ["ou", "où", "where", "lieu", "وين", "اين", "أين", "مكان"]) ||
    hasApproxToken(tokens, ["where", "lieu", "مكان"], 1);
  const mentionsStage =
    hasKeyword(normalizedMessage, ["stage", "internship", "تربص", "تدريب"]) ||
    hasApproxToken(tokens, ["stage", "internship", "تربص", "تدريب"], 1);
  const mentionsLicense = hasApproxToken(tokens, ["licence", "license", "licene", "ليسانس"], 2);
  const mentionsMaster = hasApproxToken(tokens, ["master", "m1", "ماستر"], 2);
  const mentionsBac =
    hasKeyword(normalizedMessage, ["bac", "baccalaureat", "baccalauréat", "بكالوريا"]) ||
    normalizedMessage.includes("baccalaureat");
  const mentionsMention = hasApproxToken(tokens, ["mention", "tقدير", "تقدير"], 2);
  const mentionsAverage = hasApproxToken(tokens, ["moyenne", "average", "moyen", "معدل"], 2);
  const mentionsExperience = hasApproxToken(tokens, ["experience", "expérience", "خبرة"], 2);
  const mentionsWeb = hasApproxToken(tokens, ["web", "developpement", "développement", "development"], 2);
  const mentionsDesign = hasApproxToken(tokens, ["design", "ui", "ux"], 2);
  const mentionsCount = hasApproxToken(tokens, ["nombre", "combien", "how", "many", "عدد"], 2);
  const mentionsProjects = hasApproxToken(tokens, ["projet", "projects", "project", "مشاريع", "مشروع"], 2);
  const mentionsTechnologies = hasApproxToken(
    tokens,
    ["technologie", "technologies", "techno", "tech", "تقنيات", "تقنية"],
    2
  );

  if (asksFirstName) {
    return "firstName";
  }

  if (asksLastName) {
    return "lastName";
  }

  if (
    mentionsStage &&
    (asksWhere ||
      hasKeyword(normalizedMessage, ["ou effectue stage", "où effectue stage", "ou fait stage", "où fait stage"]) ||
      hasApproxToken(tokens, ["effectue", "effectuer", "fait"], 1))
  ) {
    return "stageLocation";
  }

  if (mentionsLicense && (hasTokenNumber(tokens, 3) || hasApproxToken(tokens, ["l3", "upjv"], 1))) {
    return "license3";
  }

  if (mentionsMaster) {
    return "master";
  }

  if (mentionsLicense && hasTokenNumber(tokens, 2)) {
    return "license2";
  }

  if (mentionsLicense && hasTokenNumber(tokens, 1)) {
    return "license1";
  }

  if (mentionsBac && mentionsMention) {
    return "bacMention";
  }

  if (mentionsBac && mentionsAverage) {
    return "bacAverage";
  }

  if (mentionsBac || hasApproxToken(tokens, ["lycee", "lycée", "ثانوية"], 2)) {
    return "baccalaureate";
  }

  if (
    normalizedMessage.includes("kabyle") ||
    (hasApproxToken(tokens, ["langue", "language", "لغة"], 2) &&
      hasApproxToken(tokens, ["maternelle", "maternel", "native", "أم", "الام", "الأم"], 2))
  ) {
    return "motherTongue";
  }

  if (mentionsExperience && mentionsWeb) {
    return "webExperience";
  }

  if (mentionsExperience && mentionsDesign) {
    return "designExperience";
  }

  if (mentionsCount && mentionsProjects) {
    return "projectsCount";
  }

  if (mentionsCount && mentionsTechnologies) {
    return "technologiesCount";
  }

  return null;
};

const isSkillsIntent = (normalizedMessage) => {
  const tokens = tokenize(normalizedMessage);
  const hasCompetenceHint = tokens.some(
    (token) => token.includes("compet") || token.includes("skill") || token.includes("maitri")
  );

  return (
    hasKeyword(normalizedMessage, CHATBOT_KEYWORDS.skills) ||
    hasCompetenceHint ||
    hasApproxToken(tokens, ["competence", "compétence", "skills", "skill", "technologie", "maitrise", "connais"], 2)
  );
};

const detectSkillGroupFromMessage = (normalizedMessage) => {
  const tokens = tokenize(normalizedMessage);

  for (const [group, aliases] of Object.entries(SKILL_GROUP_ALIASES)) {
    const found = aliases.some((alias) => {
      const normalizedAlias = normalizeText(alias);
      if (!normalizedAlias) {
        return false;
      }

      if (normalizedAlias.includes(" ")) {
        return normalizedMessage.includes(normalizedAlias);
      }

      return (
        tokens.includes(normalizedAlias) ||
        hasApproxToken(tokens, [normalizedAlias], 2)
      );
    });

    if (found) {
      return group;
    }
  }

  return null;
};

const detectProjectQueryNeeds = (normalizedMessage) => {
  const tokens = tokenize(normalizedMessage);
  const hasToken = (list) => hasKeyword(normalizedMessage, list) || hasApproxToken(tokens, list, 2);

  const wantsDescription = hasToken(PROJECT_QUERY_KEYWORDS.description);
  const wantsTechnologies = hasToken(PROJECT_QUERY_KEYWORDS.technologies);
  const wantsFrontend = hasToken(PROJECT_QUERY_KEYWORDS.frontend);
  const wantsBackend = hasToken(PROJECT_QUERY_KEYWORDS.backend);
  const wantsDatabase = hasToken(PROJECT_QUERY_KEYWORDS.database);
  const wantsLinks = hasToken(PROJECT_QUERY_KEYWORDS.links);
  const wantsGithub = hasToken(PROJECT_QUERY_KEYWORDS.github);
  const wantsLive = hasToken(PROJECT_QUERY_KEYWORDS.live);
  const wantsPrototype = hasToken(PROJECT_QUERY_KEYWORDS.prototype);

  return {
    wantsDescription,
    wantsTechnologies,
    wantsFrontend,
    wantsBackend,
    wantsDatabase,
    wantsLinks,
    wantsGithub,
    wantsLive,
    wantsPrototype,
  };
};

const getProjectByMessage = (normalizedMessage) => {
  const entries = Object.entries(PROJECT_ALIASES);
  for (const [projectName, aliases] of entries) {
    if (aliases.some((alias) => normalizedMessage.includes(normalizeText(alias)))) {
      return projectCategories
        .flatMap((category) => category.projects)
        .find((project) => project.name === projectName);
    }
  }
  return null;
};

const formatMetric = (metric) =>
  `${metric.prefix || ""}${metric.value}${metric.suffix ? ` ${metric.suffix}` : ""} ${metric.label}`;

const buildProjectLinksAnswer = (project, language, needs) => {
  const ui = CHATBOT_UI[language];
  const text = TEXTS[language];

  const repoText = project.githubUrl
    ? `${ui.labels.repo}: ${project.githubUrl}`
    : `${ui.labels.repo}: ${text.projects.githubPrivate}`;

  const liveText = project.liveUrl
    ? `${ui.labels.live}: ${project.liveUrl}`
    : `${ui.labels.live}: ${text.projects.noDemo}`;

  const prototypeText = project.prototypeUrl
    ? `Prototype: ${project.prototypeUrl}`
    : null;

  if (needs.wantsGithub && !needs.wantsLive && !needs.wantsPrototype) {
    return repoText;
  }

  if (needs.wantsLive && !needs.wantsGithub && !needs.wantsPrototype) {
    return liveText;
  }

  if (needs.wantsPrototype && !needs.wantsGithub && !needs.wantsLive) {
    return prototypeText || "Prototype: indisponible";
  }

  const lines = [repoText, liveText];
  if (prototypeText) {
    lines.push(prototypeText);
  }
  return lines.join("\n");
};

const buildProjectTechByScope = (details, needs) => {
  const selectedKeys = [];
  if (needs.wantsFrontend) {
    selectedKeys.push("Frontend");
    selectedKeys.push("UI/CSS");
  }
  if (needs.wantsBackend) {
    selectedKeys.push("Backend");
    selectedKeys.push("Templates");
    selectedKeys.push("Auth");
    selectedKeys.push("Sessions");
    selectedKeys.push("Validation");
    selectedKeys.push("Services");
  }
  if (needs.wantsDatabase) {
    selectedKeys.push("Base de donnees");
  }

  const uniqueKeys = [...new Set(selectedKeys)].filter((key) => details.technologies[key]);
  if (!uniqueKeys.length) {
    return null;
  }

  return uniqueKeys
    .map((key) => `${key}:\n${details.technologies[key].map((item) => `- ${item}`).join("\n")}`)
    .join("\n");
};

const buildProjectAllTech = (details) =>
  Object.entries(details.technologies)
    .map(([section, items]) => `${section}:\n${items.map((item) => `- ${item}`).join("\n")}`)
    .join("\n");

const buildProjectAnswer = (project, language, normalizedMessage) => {
  const details = PROJECT_CHATBOT_DETAILS[project.name];
  const needs = detectProjectQueryNeeds(normalizedMessage);
  const asksLinksOnly =
    needs.wantsLinks &&
    !needs.wantsDescription &&
    !needs.wantsTechnologies &&
    !needs.wantsFrontend &&
    !needs.wantsBackend &&
    !needs.wantsDatabase;

  if (asksLinksOnly || needs.wantsGithub || needs.wantsLive || needs.wantsPrototype) {
    return `${project.name}\n${buildProjectLinksAnswer(project, language, needs)}`;
  }

  if (!details) {
    const projectDescription =
      PROJECT_COPY[language]?.[project.name]?.description || project.description;
    const projectImpact =
      PROJECT_COPY[language]?.[project.name]?.impact || project.impact;
    return `${project.name}
${projectDescription}
${projectImpact}
${CHATBOT_UI[language].labels.stack}: ${project.stack.join(", ")}
${buildProjectLinksAnswer(project, language, needs)}`;
  }

  const sections = [`${details.title}`];
  const wantsAnyTechScope = needs.wantsFrontend || needs.wantsBackend || needs.wantsDatabase;
  const wantsTech = needs.wantsTechnologies || wantsAnyTechScope;
  const wantsDescription = needs.wantsDescription || !wantsTech;

  if (wantsDescription) {
    sections.push(`Presentation:\n${details.description}`);
  }

  if (wantsTech) {
    const scoped = buildProjectTechByScope(details, needs);
    sections.push(`Technologies:\n${scoped || buildProjectAllTech(details)}`);
  }

  sections.push(buildProjectLinksAnswer(project, language, needs));
  return sections.join("\n");
};

const buildProjectsOverview = (language) => {
  const ui = CHATBOT_UI[language];
  const projectLines = projectCategories
    .map((category) => {
      const categoryLabel =
        CATEGORY_TITLES[category.title]?.[language] || category.title;
      const names = category.projects.map((project) => project.name).join(", ");
      return `- ${categoryLabel}: ${names}`;
    })
    .join("\n");

  return `${ui.labels.projects}:
${projectLines}`;
};

const buildSkillsOverview = (language) => {
  const ui = CHATBOT_UI[language];
  const lines = skills
    .map((group) => {
      const groupLabel = SKILL_GROUP_LABELS[group.group]?.[language] || group.group;
      return `- ${groupLabel}: ${group.items.join(", ")}`;
    })
    .join("\n");
  return `${ui.labels.skills}:
${lines}`;
};

const buildEducationOverview = (language) => {
  const ui = CHATBOT_UI[language];
  const list = EDUCATION_BY_LANG[language]
    .map((item) => `- ${item.period}: ${item.title} — ${item.school}`)
    .join("\n");
  return `${ui.labels.education}:
${list}`;
};

const buildInternshipOverview = (language) => {
  const internship = INTERNSHIP_BY_LANG[language];
  const topics = internship.topics.join("\n");
  if (language === "fr") {
    return `${internship.period}
${internship.subject}

${topics}
${internship.location}`;
  }
  return `${internship.period}
${internship.subject}
${topics}
${internship.location}`;
};

const buildSkillGroupOverview = (language, groupName) => {
  const ui = CHATBOT_UI[language];
  const group = skills.find((item) => item.group === groupName);
  if (!group) {
    return buildSkillsOverview(language);
  }

  const groupLabel = SKILL_GROUP_LABELS[group.group]?.[language] || group.group;
  return `${ui.labels.skillsInGroup} ${groupLabel}:
${group.items.join("\n")}`;
};

const buildPersonalDetailOverview = (language, intent) => {
  const ui = CHATBOT_UI[language];
  const personal = CHATBOT_PERSONAL_INFO[language];

  if (intent === "stageLocation") {
    const location = INTERNSHIP_BY_LANG[language]?.location || personal.internshipLocation;
    if (language === "fr") {
      return location;
    }
    return `${ui.labels.internshipLocation}: ${location}`;
  }

  if (intent === "firstName") {
    return `${ui.labels.firstName}: ${personal.firstName}`;
  }

  if (intent === "lastName") {
    return `${ui.labels.lastName}: ${personal.lastName}`;
  }

  if (intent === "license3") {
    return `${ui.labels.license3}: ${personal.license3}`;
  }

  if (intent === "master") {
    return `${ui.labels.master}: ${personal.master}`;
  }

  if (intent === "license2") {
    return `${ui.labels.license2}: ${personal.license2}`;
  }

  if (intent === "license1") {
    return `${ui.labels.license1}: ${personal.license1}`;
  }

  if (intent === "baccalaureate") {
    return `${ui.labels.baccalaureate}: ${personal.baccalaureateSchool}`;
  }

  if (intent === "bacMention") {
    return `${ui.labels.baccalaureateMention}: ${personal.baccalaureateMention}`;
  }

  if (intent === "bacAverage") {
    return `${ui.labels.baccalaureateAverage}: ${personal.baccalaureateAverage}`;
  }

  if (intent === "motherTongue") {
    return `${ui.labels.motherTongue}: ${personal.motherTongue}`;
  }

  if (intent === "webExperience") {
    return `${ui.labels.webExperience}: ${personal.webExperience}`;
  }

  if (intent === "designExperience") {
    return `${ui.labels.designExperience}: ${personal.designExperience}`;
  }

  if (intent === "projectsCount") {
    return `${ui.labels.projectsCount}: ${personal.projectsCount}`;
  }

  if (intent === "technologiesCount") {
    return `${ui.labels.technologiesCount}: ${personal.technologiesCount}`;
  }

  return null;
};

const buildContactOverview = (language, preferredType = null) => {
  const ui = CHATBOT_UI[language];
  const links = CONTACT_LINKS[language];

  if (preferredType) {
    const match = links.find((item) => item.icon === preferredType);
    if (match) {
      return `${match.label}: ${match.value}
${match.href}`;
    }
  }

  const lines = links
    .map((item) => `- ${item.label}: ${item.value} (${item.href})`)
    .join("\n");

  return `${ui.labels.contacts}:
${lines}`;
};

const buildProfileOverview = (language) => {
  const ui = CHATBOT_UI[language];
  const profileCopy = PROFILE_COPY[language];
  const personal = CHATBOT_PERSONAL_INFO[language];
  return `${ui.labels.profile}:
${profile.fullName}
${profileCopy.headline}
${ui.labels.country}: ${personal.country}
${ui.labels.residence}: ${personal.residence}
${profile.email}`;
};

const buildIdentityOverview = (language) => {
  const ui = CHATBOT_UI[language];
  const personal = CHATBOT_PERSONAL_INFO[language];
  return `${ui.labels.identity}:
${personal.identity}
${ui.labels.country}: ${personal.country}
${ui.labels.residence}: ${personal.residence}
${ui.labels.birthplace}: ${personal.birthPlace}
${ui.labels.birthDate}: ${personal.birthDate}
${ui.labels.age}: ${personal.age}`;
};

const buildCountryOverview = (language) => {
  const ui = CHATBOT_UI[language];
  return `${ui.labels.country}: ${CHATBOT_PERSONAL_INFO[language].country}`;
};

const buildResidenceOverview = (language) => {
  const ui = CHATBOT_UI[language];
  return `${ui.labels.residence}: ${CHATBOT_PERSONAL_INFO[language].residence}`;
};

const buildAgeOverview = (language) => {
  const ageValue = CHATBOT_PERSONAL_INFO[language].age;
  if (language === "fr") {
    return ageValue;
  }
  if (language === "en") {
    return `Age: ${ageValue}`;
  }
  return `العمر: ${ageValue}`;
};

const buildBirthDateOverview = (language) => {
  const ui = CHATBOT_UI[language];
  return `${ui.labels.birthDate}: ${CHATBOT_PERSONAL_INFO[language].birthDate}`;
};

const buildBirthplaceOverview = (language) => {
  const ui = CHATBOT_UI[language];
  return `${ui.labels.birthplace}: ${CHATBOT_PERSONAL_INFO[language].birthPlace}`;
};

const buildCvOverview = (language) => {
  const ui = CHATBOT_UI[language];
  return `${ui.labels.cv}: ${profile.cvPath}`;
};

const buildCvCard = (language) => {
  const ui = CHATBOT_UI[language];
  return {
    type: "cv",
    text: `${ui.labels.cvPreview}`,
    cvPath: profile.cvPath,
    downloadLabel: ui.labels.cvDownload,
  };
};

const buildLanguagesOverview = (language) => {
  const labels = SPOKEN_LANGUAGES[language].map((item) => `- ${item.label}`).join("\n");
  return `${TEXTS[language].about.languagesSectionTitle}:
${labels}`;
};

const buildExperienceOverview = (language) => {
  const ui = CHATBOT_UI[language];
  const lines = EXPERIENCE_METRICS[language].map((item) => `- ${formatMetric(item)}`).join("\n");
  return `${ui.labels.experience}:
${lines}`;
};

const buildLocationOverview = (language) => {
  const ui = CHATBOT_UI[language];
  const personal = CHATBOT_PERSONAL_INFO[language];
  return `${ui.labels.location}: ${personal.residence}
${ui.labels.birthplace}: ${personal.birthPlace}
${ui.labels.birthDate}: ${personal.birthDate}
${ui.labels.country}: ${personal.country}`;
};

const buildAvailabilityOverview = (language) => {
  const ui = CHATBOT_UI[language];
  return `${ui.labels.availability}: ${TEXTS[language].hero.availability}`;
};

const buildGreetingResponse = (normalizedMessage, language) => {
  const ui = CHATBOT_UI[language];

  if (language === "fr") {
    if (normalizedMessage.includes("bonsoir")) {
      return `Bonsoir. ${ui.greetingHelp}`;
    }
    if (normalizedMessage.includes("bonjour") || normalizedMessage.includes("salut")) {
      return `Bonjour. ${ui.greetingHelp}`;
    }
    return `Bonjour. ${ui.greetingHelp}`;
  }

  if (language === "ar") {
    if (normalizedMessage.includes("مساء")) {
      return `مساء الخير. ${ui.greetingHelp}`;
    }
    return `مرحبا. ${ui.greetingHelp}`;
  }

  return `Hello. ${ui.greetingHelp}`;
};

const getIntentAnswer = (intent, language) => {
  switch (intent) {
    case "identity":
      return buildIdentityOverview(language);
    case "birthdate":
      return buildBirthDateOverview(language);
    case "country":
      return buildCountryOverview(language);
    case "residence":
      return buildResidenceOverview(language);
    case "age":
      return buildAgeOverview(language);
    case "birthplace":
      return buildBirthplaceOverview(language);
    default:
      return null;
  }
};

const inferIntentFromTypos = (normalizedMessage, language) => {
  const tokens = tokenize(normalizedMessage);
  if (!tokens.length) {
    return null;
  }

  const hasBilal = hasApproxToken(tokens, ["bilal", "billal", "billa"], 2);
  const hasWho = hasApproxToken(tokens, ["qui", "who"], 1) || normalizedMessage.includes("من");
  const hasBorn = hasApproxToken(tokens, ["ne", "nee", "né", "born", "naissance", "مولود", "ولد"], 2);
  const hasWhen = hasApproxToken(tokens, ["quand", "when", "متى"], 2);
  const hasWhere = hasApproxToken(tokens, ["ou", "where", "فين", "اين", "أين"], 2);
  const hasCountry = hasApproxToken(
    tokens,
    ["pays", "country", "nationalite", "nationalité", "بلد", "جنسية"],
    2
  );
  const hasResidence = hasApproxToken(tokens, ["habite", "residence", "résidence", "live", "يسكن"], 2);
  const hasAge =
    hasKeyword(normalizedMessage, ["age", "âge", "العمر"]) ||
    normalizedMessage.includes("how old") ||
    normalizedMessage.includes("quel age") ||
    normalizedMessage.includes("كم عمر");

  if (hasBilal && hasWho) {
    return { intent: "identity", confidence: 0.9 };
  }

  if (hasBilal && hasBorn && hasWhen) {
    return { intent: "birthdate", confidence: 0.66 };
  }

  if (hasCountry) {
    return { intent: "country", confidence: 0.86 };
  }

  if (hasResidence || (hasBilal && hasWhere && !hasBorn)) {
    return { intent: "residence", confidence: 0.82 };
  }

  if (hasAge) {
    return { intent: "age", confidence: 0.86 };
  }

  if (hasBorn && hasWhere) {
    return { intent: "birthplace", confidence: 0.82 };
  }

  let bestIntent = null;
  let bestScore = 0;

  const candidates = CHATBOT_INTENT_PHRASES[language] || [];
  for (const candidate of candidates) {
    for (const phrase of candidate.phrases) {
      const score = similarityScore(normalizedMessage, normalizeText(phrase));
      if (score > bestScore) {
        bestScore = score;
        bestIntent = candidate.intent;
      }
    }
  }

  if (bestScore >= 0.57) {
    return { intent: bestIntent, confidence: bestScore };
  }

  return null;
};

const buildClarification = (intent, language) => {
  const ui = CHATBOT_UI[language];
  const suggestedQuestion = CHATBOT_CLARIFICATION_QUESTIONS[language]?.[intent];
  const answer = getIntentAnswer(intent, language);

  if (!suggestedQuestion || !answer) {
    return null;
  }

  return {
    type: "clarify",
    text: `${ui.clarify.replace("{question}", suggestedQuestion)} ${ui.confirmYesNo}`,
    answer,
  };
};

const buildChatbotResponse = (message, language) => {
  const ui = CHATBOT_UI[language];
  const normalized = normalizeText(message);

  if (!normalized) {
    return { type: "answer", text: ui.empty };
  }

  for (const [contactType, keywords] of Object.entries(CONTACT_TYPE_KEYWORDS)) {
    if (hasKeyword(normalized, keywords)) {
      return { type: "answer", text: buildContactOverview(language, contactType) };
    }
  }

  const project = getProjectByMessage(normalized);
  if (project) {
    return { type: "answer", text: buildProjectAnswer(project, language, normalized) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.greeting)) {
    return { type: "answer", text: buildGreetingResponse(normalized, language) };
  }

  if (isSkillsIntent(normalized)) {
    const skillGroup = detectSkillGroupFromMessage(normalized);
    if (skillGroup) {
      return { type: "answer", text: buildSkillGroupOverview(language, skillGroup) };
    }
  }

  const specificPersonalIntent = detectPersonalIntent(normalized);
  if (specificPersonalIntent) {
    const detailAnswer = buildPersonalDetailOverview(language, specificPersonalIntent);
    if (detailAnswer) {
      return { type: "answer", text: detailAnswer };
    }
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.identity)) {
    return { type: "answer", text: buildIdentityOverview(language) };
  }

  if (normalized === "bilal" || normalized.includes("billal") || normalized.includes("bilal mechekour")) {
    return { type: "answer", text: buildIdentityOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.country)) {
    return { type: "answer", text: buildCountryOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.residence)) {
    return { type: "answer", text: buildResidenceOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.age)) {
    return { type: "answer", text: buildAgeOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.birthdate)) {
    return { type: "answer", text: buildBirthDateOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.birthplace)) {
    return { type: "answer", text: buildBirthplaceOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.profile)) {
    return { type: "answer", text: buildProfileOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.projects)) {
    return { type: "answer", text: buildProjectsOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.skills)) {
    return { type: "answer", text: buildSkillsOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.education)) {
    return { type: "answer", text: buildEducationOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.internship)) {
    return { type: "answer", text: buildInternshipOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.languages)) {
    return { type: "answer", text: buildLanguagesOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.cvDisplay)) {
    return buildCvCard(language);
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.cv)) {
    return buildCvCard(language);
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.experience)) {
    return { type: "answer", text: buildExperienceOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.location)) {
    return { type: "answer", text: buildLocationOverview(language) };
  }

  if (hasKeyword(normalized, CHATBOT_KEYWORDS.availability)) {
    return { type: "answer", text: buildAvailabilityOverview(language) };
  }

  if (hasKeyword(normalized, ["contact", "تواصل"])) {
    return { type: "answer", text: buildContactOverview(language) };
  }

  const inferredIntent = inferIntentFromTypos(normalized, language);
  if (inferredIntent?.intent) {
    if (inferredIntent.confidence >= 0.8) {
      const directAnswer = getIntentAnswer(inferredIntent.intent, language);
      if (directAnswer) {
        return { type: "answer", text: directAnswer };
      }
    }
  }

  const clarification = inferredIntent?.intent
    ? buildClarification(inferredIntent.intent, language)
    : null;
  if (clarification) {
    return clarification;
  }

  return { type: "answer", text: ui.fallback };
};

function ChatbotWidget({ language }) {
  const ui = CHATBOT_UI[language];
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pendingClarification, setPendingClarification] = useState(null);
  const [messages, setMessages] = useState(() => [
    { id: createMessageId(), role: "bot", text: CHATBOT_UI[language].welcome },
  ]);
  const messagesRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    setMessages([{ id: createMessageId(), role: "bot", text: ui.welcome }]);
    setQuestion("");
    setIsTyping(false);
    setPendingClarification(null);
  }, [language, ui.welcome]);

  useEffect(
    () => () => {
      if (typingTimeoutRef.current) {
        window.clearTimeout(typingTimeoutRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (!messagesRef.current) {
      return;
    }
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, isTyping, isOpen]);

  const submitQuestion = useCallback(
    (rawQuestion, options = {}) => {
      const value = rawQuestion.trim();
      if (!value) {
        return;
      }

      setMessages((prev) => [...prev, { id: createMessageId(), role: "user", text: value }]);
      setIsTyping(true);

      if (typingTimeoutRef.current) {
        window.clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = window.setTimeout(() => {
        let botText = ui.fallback;
        let botPayload = { role: "bot", text: ui.fallback };
        const shouldIgnorePending = Boolean(options.forceFreshQuestion);
        const activePendingClarification = shouldIgnorePending ? null : pendingClarification;

        if (activePendingClarification) {
          const confirmation = detectConfirmation(value, language);
          if (confirmation === "yes") {
            botText = activePendingClarification.answer;
            botPayload = { role: "bot", text: botText };
            setPendingClarification(null);
          } else if (confirmation === "no") {
            botText = ui.notUnderstood;
            botPayload = { role: "bot", text: botText };
            setPendingClarification(null);
          } else {
            botText = ui.confirmYesNo;
            botPayload = { role: "bot", text: botText };
          }
        } else {
          const response = buildChatbotResponse(value, language);
          if (response.type === "clarify") {
            botText = response.text;
            botPayload = { role: "bot", text: botText };
            setPendingClarification({ answer: response.answer });
          } else if (response.type === "cv") {
            botText = response.text;
            botPayload = {
              role: "bot",
              text: botText,
              kind: "cv",
              cvPath: response.cvPath,
              downloadLabel: response.downloadLabel,
            };
            setPendingClarification(null);
          } else {
            botText = response.text;
            botPayload = { role: "bot", text: botText };
            setPendingClarification(null);
          }
        }

        setMessages((prev) => [...prev, { id: createMessageId(), ...botPayload }]);
        setIsTyping(false);
      }, 320);
    },
    [language, pendingClarification, ui.confirmYesNo, ui.fallback, ui.notUnderstood]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    submitQuestion(question);
    setQuestion("");
  };

  const handleSuggestion = (suggestion) => {
    setIsOpen(true);
    setPendingClarification(null);
    submitQuestion(suggestion, { forceFreshQuestion: true });
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="assistant-mobile-backdrop"
          aria-label="Close chatbot overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`assistant-widget ${isOpen ? "open" : ""}`} dir={language === "ar" ? "rtl" : "ltr"}>
      {isOpen && (
        <section className="assistant-panel" aria-label={ui.title}>
          <header className="assistant-header">
            <div className="assistant-header-main">
              <span className="assistant-header-avatar" aria-hidden="true">
                <img src="/ChatBotBilal.png" alt="" loading="lazy" />
              </span>
              <div className="assistant-header-copy">
                <h3>{ui.botName}</h3>
                <p>{ui.botRole}</p>
              </div>
            </div>
            <button
              type="button"
              className="assistant-close"
              onClick={() => setIsOpen(false)}
              aria-label={ui.close}
            >
              ✕
            </button>
          </header>

          <div className="assistant-messages" ref={messagesRef}>
            {messages.map((item) => (
              <article
                key={item.id}
                className={`assistant-message ${item.role === "user" ? "user" : "bot"}`}
              >
                {item.kind === "cv" ? (
                  <div className="assistant-bubble assistant-cv-bubble">
                    <p className="assistant-cv-title">{item.text}</p>
                    <iframe
                      className="assistant-cv-frame"
                      src={item.cvPath}
                      title={item.text}
                      loading="lazy"
                    />
                    <a className="assistant-cv-download" href={item.cvPath} download>
                      <span className="assistant-cv-download-icon" aria-hidden="true">
                        ⭳
                      </span>
                      <span>{item.downloadLabel || "Télécharger le CV"}</span>
                    </a>
                  </div>
                ) : (
                  <p className="assistant-bubble">{item.text}</p>
                )}
              </article>
            ))}
            {isTyping && (
              <article className="assistant-message bot">
                <p className="assistant-bubble assistant-typing">{ui.typing}</p>
              </article>
            )}
          </div>

          <div className="assistant-suggestions">
            {ui.suggestions.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => handleSuggestion(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>

          <form className="assistant-form" onSubmit={handleSubmit}>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleSubmit(event);
                }
              }}
              rows={2}
              placeholder={ui.placeholder}
            />
            <button type="submit" disabled={!question.trim()}>
              {ui.send}
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="assistant-fab"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? ui.close : ui.open}
      >
        <span className="assistant-fab-icon" aria-hidden="true">
          <img src="/ChatBotBilal.png" alt="" loading="lazy" />
        </span>
      </button>
      </div>
    </>
  );
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
      const safeOffset = Math.max(72, Math.ceil(rect.bottom));
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
                            <picture>
                              <source
                                srcSet={toProjectWebpFromMediaPath(mainScreenshot)}
                                type="image/webp"
                              />
                              <img
                                src={mainScreenshot}
                                alt={`Capture d'écran du projet ${project.name}`}
                                loading="lazy"
                                decoding="async"
                                fetchPriority="low"
                              />
                            </picture>
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
                                <picture>
                                  <source
                                    srcSet={toProjectThumbWebpFromMediaPath(imageSrc)}
                                    type="image/webp"
                                  />
                                  <img
                                    src={toProjectThumbFromMediaPath(imageSrc)}
                                    alt={`Miniature ${thumbIndex + 1} du projet ${project.name}`}
                                    loading="lazy"
                                    decoding="async"
                                    fetchPriority="low"
                                  />
                                </picture>
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

      <ChatbotWidget language={language} />

      <footer className="footer">
        <p>
          {new Date().getFullYear()} • {profile.fullName}
        </p>
      </footer>
    </div>
  );
}

export default App;
