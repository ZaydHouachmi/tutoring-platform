export const LANGS = ["en", "fr"] as const;
export type Lang = (typeof LANGS)[number];

/** Session rates. Single source of truth: used by pricing cards and booking. */
export const RATES = {
  trial: 25,
  hourly: 30,
  packs: [
    { id: "starter", price: 120, sessions: 4, perHour: "30", featured: false },
    { id: "progress", price: 168, sessions: 6, perHour: "28", featured: true },
    { id: "growth", price: 220, sessions: 8, perHour: "27.50", featured: false },
  ],
} as const;

export const CONTACT = {
  // TODO: replace with the real phone and email before launch.
  phone: "613-555-0100",
  email: "contact@example.com",
  instagram: "tutoringottawa",
  city: "Ottawa, Ontario",
} as const;

type Plan = { name: string; blurb: string; features: string[] };

export type Content = {
  nav: { services: string; approach: string; pricing: string; book: string };
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageAlt: string;
  };
  credentials: { label: string; items: { title: string; detail: string }[] };
  services: {
    heading: string;
    sub: string;
    items: { title: string; body: string }[];
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    imageAlt: string;
  };
  approach: {
    eyebrow: string;
    heading: string;
    sub: string;
    steps: { title: string; body: string }[];
    imageAlt: string;
  };
  pricing: {
    heading: string;
    sub: string;
    oneTime: string;
    monthly: string;
    trial: Plan;
    single: Plan;
    packs: Record<string, Plan>;
    perMonth: string;
    perHourShort: string;
    save: string;
    popular: string;
    cta: string;
  };
  logistics: {
    heading: string;
    cards: { title: string; body: string }[];
  };
  faq: { heading: string; items: { q: string; a: string }[] };
  booking: {
    eyebrow: string;
    heading: string;
    sub: string;
    name: string;
    email: string;
    phone: string;
    phoneHint: string;
    grade: string;
    gradeHint: string;
    language: string;
    format: string;
    formats: { online: string; inPerson: string; either: string };
    message: string;
    messageHint: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: { tagline: string; nav: string; contact: string };
};

export const content: Record<Lang, Content> = {
  en: {
    nav: {
      services: "Sessions",
      approach: "Approach",
      pricing: "Pricing",
      book: "Book a session",
    },
    hero: {
      eyebrow: "Math tutoring in Ottawa",
      headline: "Math stops being",
      headlineAccent: "the hard part.",
      sub: "One on one sessions with an engineering student who uses this math daily. Online or in person.",
      ctaPrimary: "Book a session",
      ctaSecondary: "See pricing",
      imageAlt:
        "Worked example showing the five step method for solving a word problem",
    },
    credentials: {
      label: "Who you are working with",
      items: [
        { title: "Mechanical Engineering", detail: "Student at uOttawa" },
        { title: "Better Learning", detail: "Active math tutor" },
        { title: "Founded a program", detail: "Tutoring at my high school" },
        { title: "Three languages", detail: "English, French, Arabic" },
      ],
    },
    services: {
      heading: "What a session covers",
      sub: "Every hour is planned around what your child is actually stuck on, not a fixed curriculum.",
      items: [
        {
          title: "Homework that makes sense",
          body: "We work through the assignment together until your child can explain the steps back to me. Copying answers teaches nothing.",
        },
        {
          title: "Exam preparation",
          body: "Past tests, the topics most likely to appear, and the habits that stop careless mistakes under time pressure.",
        },
        {
          title: "Filling the real gap",
          body: "Grade 10 trouble is often a Grade 8 gap. I find where understanding broke and rebuild from there.",
        },
        {
          title: "Progress you can see",
          body: "After every session you get a short note on what we covered and what is improving.",
        },
      ],
    },
    about: {
      eyebrow: "Meet your tutor",
      heading: "Hi, I'm Zayd.",
      paragraphs: [
        "I am a Mechanical Engineering student at uOttawa, so the algebra and trigonometry your child is fighting with is math I still use most weeks. I can show them where it leads, not just how to pass Friday's test.",
        "I was born in Morocco and grew up in Ottawa. I tutor in English, French or Arabic, whichever language your child thinks in, because translating a question is not the same as understanding it.",
        "I started out by founding a tutoring program at my high school, and I tutor with Better Learning. Outside sessions, I run road races around the city.",
      ],
      imageAlt: "Zayd Houachmi, math tutor in Ottawa",
    },
    approach: {
      eyebrow: "The method",
      heading: "A plan beats guessing",
      sub: "Students panic on word problems because nobody taught them a procedure. Here is the one I teach, on day one.",
      steps: [
        {
          title: "Read it twice",
          body: "Nothing gets written before the question is clear.",
        },
        {
          title: "Underline what is asked",
          body: "Most lost marks come from answering the wrong question.",
        },
        {
          title: "Know against need",
          body: "List what the problem gives you, then what it wants.",
        },
        {
          title: "Draw it",
          body: "A rough sketch catches the step that was skipped.",
        },
        {
          title: "Check the answer",
          body: "Does the number make sense in the real world?",
        },
      ],
      imageAlt: "Study card listing the five steps for solving word problems",
    },
    pricing: {
      heading: "Straightforward pricing",
      sub: "Start with a trial session. Continue only if it helps.",
      oneTime: "Pay as you go",
      monthly: "Monthly packages",
      trial: {
        name: "Trial session",
        blurb: "First session only",
        features: [
          "A full hour, not a sales call",
          "I assess where the gaps are",
          "No commitment after it",
        ],
      },
      single: {
        name: "Single session",
        blurb: "Book whenever you need one",
        features: [
          "One hour, planned in advance",
          "Homework or exam focus",
          "Session notes afterwards",
        ],
      },
      packs: {
        starter: {
          name: "Starter",
          blurb: "Keeping up with class",
          features: [
            "4 hours per month",
            "Homework and concept work",
            "Session notes afterwards",
          ],
        },
        progress: {
          name: "Progress",
          blurb: "Steady improvement",
          features: [
            "6 hours per month",
            "Homework and exam preparation",
            "Priority on schedule requests",
          ],
        },
        growth: {
          name: "Growth",
          blurb: "Turning a grade around",
          features: [
            "8 hours per month",
            "Full curriculum coverage",
            "Priority on schedule requests",
          ],
        },
      },
      perMonth: "per month",
      perHourShort: "/hr",
      save: "Save",
      popular: "Most booked",
      cta: "Book this",
    },
    logistics: {
      heading: "How it works in practice",
      cards: [
        {
          title: "When",
          body: "Friday evenings, Saturdays and Sundays. Pick the slot that suits your week.",
        },
        {
          title: "Where",
          body: "Online over video, or in person in Ottawa. Many families mix both.",
        },
        {
          title: "Which grades",
          body: "Any grade. Most students are in Grade 7 through Grade 12.",
        },
        {
          title: "Which language",
          body: "English, French or Arabic. Pick whichever your child thinks in.",
        },
      ],
    },
    faq: {
      heading: "Questions parents ask",
      items: [
        {
          q: "What happens in the first session?",
          a: "I find out where the real gap is. That usually means working through recent homework or a returned test and watching how your child approaches it. You get my honest read afterwards, including whether tutoring is what they actually need.",
        },
        {
          q: "How many sessions before we see a difference?",
          a: "Confidence usually moves first, often within two or three sessions. Grades follow the next assessment cycle. If nothing is improving after a month, something in the plan is wrong and I will say so.",
        },
        {
          q: "Do you help with tests and exams specifically?",
          a: "Yes. Send me the unit or the date and we build the sessions around it, using past tests where you have them.",
        },
        {
          q: "What if we need to cancel?",
          a: "Let me know at least 24 hours ahead and we move the session at no cost.",
        },
        {
          q: "Is online as good as in person?",
          a: "For most students yes, using a shared whiteboard. Younger students who are easily distracted often do better in person.",
        },
      ],
    },
    booking: {
      eyebrow: "Book a session",
      heading: "Tell me what is going on",
      sub: "A few details and I will come back to you with times that fit.",
      name: "Your name",
      email: "Email",
      phone: "Phone",
      phoneHint: "Optional, if you prefer a text",
      grade: "Student's grade",
      gradeHint: "Select a grade",
      language: "Session language",
      format: "Online or in person",
      formats: { online: "Online", inPerson: "In person", either: "Either works" },
      message: "What are they finding hard?",
      messageHint: "For example: struggling with algebra, test next Thursday",
      submit: "Send request",
      sending: "Sending",
      success: "Thanks. I will get back to you shortly with a few times.",
      error: "That did not send. Please email me instead.",
    },
    footer: {
      tagline:
        "One on one math tutoring in Ottawa, in English, French or Arabic.",
      nav: "Pages",
      contact: "Get in touch",
    },
  },
  fr: {
    nav: {
      services: "Séances",
      approach: "Approche",
      pricing: "Tarifs",
      book: "Réserver",
    },
    hero: {
      eyebrow: "Tutorat de mathématiques à Ottawa",
      headline: "Les maths cessent",
      headlineAccent: "d'être un obstacle.",
      sub: "Séances individuelles avec un étudiant en génie qui utilise ces maths tous les jours. En ligne ou en personne.",
      ctaPrimary: "Réserver une séance",
      ctaSecondary: "Voir les tarifs",
      imageAlt:
        "Exemple résolu montrant la méthode en cinq étapes pour un problème écrit",
    },
    credentials: {
      label: "Avec qui vous travaillez",
      items: [
        { title: "Génie mécanique", detail: "Étudiant à uOttawa" },
        { title: "Better Learning", detail: "Tuteur de maths actif" },
        { title: "Programme fondé", detail: "Tutorat à mon école secondaire" },
        { title: "Trois langues", detail: "Anglais, français, arabe" },
      ],
    },
    services: {
      heading: "Ce que couvre une séance",
      sub: "Chaque heure est bâtie autour du vrai blocage de votre enfant, pas d'un programme figé.",
      items: [
        {
          title: "Des devoirs compris",
          body: "On refait le travail ensemble jusqu'à ce que votre enfant puisse m'expliquer les étapes. Copier une réponse n'apprend rien.",
        },
        {
          title: "Préparation aux examens",
          body: "Anciens tests, sujets les plus probables, et les réflexes qui évitent les erreurs d'inattention.",
        },
        {
          title: "Combler le vrai retard",
          body: "Un blocage en 10e année vient souvent d'une notion de 8e. Je remonte jusqu'à la source.",
        },
        {
          title: "Des progrès visibles",
          body: "Après chaque séance, vous recevez une note courte sur ce qu'on a vu et ce qui s'améliore.",
        },
      ],
    },
    about: {
      eyebrow: "Votre tuteur",
      heading: "Bonjour, je suis Zayd.",
      paragraphs: [
        "Je suis étudiant en génie mécanique à uOttawa. L'algèbre et la trigonométrie qui bloquent votre enfant, je m'en sers encore presque chaque semaine. Je peux lui montrer à quoi ça mène, pas seulement comment passer le test de vendredi.",
        "Je suis né au Maroc et j'ai grandi à Ottawa. J'enseigne en anglais, en français ou en arabe, dans la langue où votre enfant pense, parce que traduire une question n'est pas la comprendre.",
        "J'ai commencé en fondant un programme de tutorat à mon école secondaire, et je tutore avec Better Learning. En dehors des séances, je fais des courses sur route dans la ville.",
      ],
      imageAlt: "Zayd Houachmi, tuteur de mathématiques à Ottawa",
    },
    approach: {
      eyebrow: "La méthode",
      heading: "Un plan vaut mieux qu'un essai",
      sub: "Les problèmes écrits font paniquer parce que personne n'a enseigné de procédure. Voici celle que j'enseigne dès la première séance.",
      steps: [
        {
          title: "Lire deux fois",
          body: "On n'écrit rien tant que la question n'est pas claire.",
        },
        {
          title: "Souligner la question",
          body: "La plupart des points perdus viennent d'une mauvaise question.",
        },
        {
          title: "Connu contre cherché",
          body: "Noter ce que le problème donne, puis ce qu'il demande.",
        },
        {
          title: "Faire un schéma",
          body: "Un croquis rapide révèle l'étape oubliée.",
        },
        {
          title: "Vérifier la réponse",
          body: "Le nombre a-t-il du sens dans la réalité?",
        },
      ],
      imageAlt:
        "Fiche présentant les cinq étapes pour résoudre un problème écrit",
    },
    pricing: {
      heading: "Des tarifs clairs",
      sub: "Commencez par une séance d'essai. Continuez seulement si ça aide.",
      oneTime: "À la séance",
      monthly: "Forfaits mensuels",
      trial: {
        name: "Séance d'essai",
        blurb: "Première séance seulement",
        features: [
          "Une heure complète, pas un appel de vente",
          "J'évalue où sont les lacunes",
          "Aucun engagement ensuite",
        ],
      },
      single: {
        name: "Séance unique",
        blurb: "Réservez quand vous en avez besoin",
        features: [
          "Une heure, planifiée à l'avance",
          "Devoirs ou examen au choix",
          "Compte rendu après la séance",
        ],
      },
      packs: {
        starter: {
          name: "Départ",
          blurb: "Suivre le rythme de la classe",
          features: [
            "4 heures par mois",
            "Devoirs et notions",
            "Compte rendu après chaque séance",
          ],
        },
        progress: {
          name: "Progrès",
          blurb: "Amélioration régulière",
          features: [
            "6 heures par mois",
            "Devoirs et préparation aux examens",
            "Priorité sur les horaires",
          ],
        },
        growth: {
          name: "Redressement",
          blurb: "Remonter une note",
          features: [
            "8 heures par mois",
            "Couverture complète du programme",
            "Priorité sur les horaires",
          ],
        },
      },
      perMonth: "par mois",
      perHourShort: "/h",
      save: "Économie de",
      popular: "Le plus réservé",
      cta: "Choisir",
    },
    logistics: {
      heading: "Comment ça se passe",
      cards: [
        {
          title: "Quand",
          body: "Vendredis en soirée, samedis et dimanches. Choisissez le créneau qui convient.",
        },
        {
          title: "Où",
          body: "En ligne par vidéo, ou en personne à Ottawa. Plusieurs familles alternent.",
        },
        {
          title: "Quels niveaux",
          body: "Tous les niveaux. La plupart des élèves sont de la 7e à la 12e année.",
        },
        {
          title: "Quelle langue",
          body: "Anglais, français ou arabe. Celle dans laquelle votre enfant pense.",
        },
      ],
    },
    faq: {
      heading: "Questions fréquentes des parents",
      items: [
        {
          q: "Que se passe-t-il à la première séance?",
          a: "Je cherche où est la vraie lacune, souvent en reprenant un devoir récent ou un test corrigé pour observer la démarche de votre enfant. Vous recevez ensuite mon avis honnête, y compris si le tutorat n'est pas ce qu'il lui faut.",
        },
        {
          q: "Combien de séances avant de voir une différence?",
          a: "La confiance bouge en premier, souvent en deux ou trois séances. Les notes suivent à l'évaluation suivante. Si rien ne progresse après un mois, le plan est mauvais et je vous le dirai.",
        },
        {
          q: "Préparez-vous aux tests et examens?",
          a: "Oui. Envoyez-moi l'unité ou la date et les séances sont bâties autour, avec les anciens tests si vous les avez.",
        },
        {
          q: "Et si nous devons annuler?",
          a: "Prévenez-moi au moins 24 heures à l'avance et la séance est déplacée sans frais.",
        },
        {
          q: "Le tutorat en ligne vaut-il le présentiel?",
          a: "Pour la plupart des élèves oui, avec un tableau blanc partagé. Les plus jeunes, vite distraits, profitent souvent mieux du présentiel.",
        },
      ],
    },
    booking: {
      eyebrow: "Réserver",
      heading: "Dites-moi ce qui bloque",
      sub: "Quelques détails et je vous propose des horaires qui conviennent.",
      name: "Votre nom",
      email: "Courriel",
      phone: "Téléphone",
      phoneHint: "Optionnel, si vous préférez un texto",
      grade: "Année de l'élève",
      gradeHint: "Choisir une année",
      language: "Langue de la séance",
      format: "En ligne ou en personne",
      formats: {
        online: "En ligne",
        inPerson: "En personne",
        either: "Peu importe",
      },
      message: "Qu'est-ce qui est difficile?",
      messageHint: "Par exemple: blocage en algèbre, test jeudi prochain",
      submit: "Envoyer la demande",
      sending: "Envoi",
      success: "Merci. Je reviens vers vous rapidement avec des horaires.",
      error: "L'envoi a échoué. Écrivez-moi par courriel.",
    },
    footer: {
      tagline:
        "Tutorat de mathématiques individuel à Ottawa, en anglais, français ou arabe.",
      nav: "Pages",
      contact: "Me joindre",
    },
  },
};

export const GRADES = ["7", "8", "9", "10", "11", "12"] as const;
export const SESSION_LANGUAGES = ["English", "Français", "العربية"] as const;
