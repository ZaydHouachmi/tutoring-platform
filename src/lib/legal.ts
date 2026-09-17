import type { Lang } from "@/lib/content";

/**
 * Policy pages.
 *
 * These describe what the site actually does, verified rather than assumed:
 * no cookies, no analytics, no third-party embeds, no fonts loaded from
 * anyone else's server. If that ever changes, these pages change with it.
 *
 * TODO before launch: BUSINESS_NAME and the contact email in content.ts are
 * placeholders, and the retention period below is a sensible default that
 * Zayd should confirm.
 */

export const LEGAL_DOCS = ["privacy", "terms", "cookies", "refunds"] as const;
export type LegalDoc = (typeof LEGAL_DOCS)[number];

export const BUSINESS_NAME = "Tutoring Ottawa";
export const OPERATOR_NAME = "Mozayd Houachmi";
export const LAST_UPDATED = "2026-09-17";
/** How long a booking request is kept before deletion. */
export const RETENTION_MONTHS = 24;

export type Section = { heading: string; body: string[] };
export type Doc = { title: string; intro: string; sections: Section[] };

type DocSet = Record<LegalDoc, Doc>;

const en: DocSet = {
  privacy: {
    title: "Privacy policy",
    intro: `How ${BUSINESS_NAME} handles the information you send through this site. In plain language, because a policy nobody can read protects nobody.`,
    sections: [
      {
        heading: "Who is responsible",
        body: [
          `This site is run by ${OPERATOR_NAME}, operating as ${BUSINESS_NAME}, a one-person tutoring service based in Ottawa, Ontario. There is no company behind it and no staff: the person who reads your booking request is the person who tutors your child.`,
        ],
      },
      {
        heading: "What we collect",
        body: [
          "When you send a booking request we collect the name you give, your email address, your phone number if you choose to add one, the student's grade, the session language and format you prefer, the time slot you selected, and whatever you write in the message box.",
          "Our hosting provider records technical information for every visit, including your IP address, browser type and the pages requested. We also use your IP address to limit how many requests one visitor can send in a short period, which is how the form resists automated abuse.",
          "That is everything. We do not ask for the student's full name, address, school, date of birth or any payment details through this site.",
        ],
      },
      {
        heading: "Information about children",
        body: [
          "Bookings are made by parents and guardians, not by students. The only information about a child we ask for is their grade and what they are finding difficult. Please do not include anything more sensitive in the message box: a first name is plenty.",
          "If you believe a child has sent us information without a parent's involvement, email us and we will delete it.",
        ],
      },
      {
        heading: "Why we collect it",
        body: [
          "To answer your request, agree a time, and prepare a session that fits the student. That is the only purpose. We do not build profiles, we do not score or segment visitors, and we do not use this information to advertise to you.",
        ],
      },
      {
        heading: "Who else sees it",
        body: [
          "Three service providers process data on our behalf: Vercel hosts the site, Supabase stores booking requests in a database, and Resend delivers the notification email that tells us a request arrived. Each of them sees only what is necessary to do that job.",
          "We do not sell your information, we do not share it with advertisers, and we do not send it to anyone else. It may be stored on servers outside Canada, which is normal for these providers and means it can be subject to the laws of the country where it is held.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          `Booking requests are kept for up to ${RETENTION_MONTHS} months so we have a record of who we have worked with, then deleted. Hosting logs are kept for a much shorter period by our provider. If you ask us to delete your request sooner, we will.`,
        ],
      },
      {
        heading: "How it is protected",
        body: [
          "The site is served over HTTPS. The database rejects every request that does not carry our server's secret key: the key published in the browser can read nothing and write nothing. Notification emails go to one inbox controlled by the tutor.",
          "No system is perfect, and we are not going to claim otherwise. What we can say is that we collect little, so there is little to lose.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask what we hold about you, ask for it to be corrected, or ask for it to be deleted. Email us and we will do it, normally within a few days and at no cost.",
          "Canadian federal privacy law (PIPEDA) applies to us. If you are not satisfied with how we have handled your information, you can complain to the Office of the Privacy Commissioner of Canada.",
        ],
      },
      {
        heading: "Changes",
        body: [
          "If this policy changes, the date at the top changes with it. Significant changes will be explained on this page rather than quietly edited in.",
        ],
      },
    ],
  },

  terms: {
    title: "Terms and conditions",
    intro: `The agreement between you and ${BUSINESS_NAME} when you book tutoring through this site.`,
    sections: [
      {
        heading: "What we provide",
        body: [
          "One-on-one mathematics tutoring, delivered online by video or in person in Ottawa, in English, French or Arabic. Sessions are one hour unless we agree otherwise.",
        ],
      },
      {
        heading: "A request is not a booking",
        body: [
          "Choosing a time on this site sends a request. A session exists once we have replied and confirmed it. Until then the time is not held for you, and the same slot may be offered to someone else.",
        ],
      },
      {
        heading: "What we expect from each other",
        body: [
          "We will arrive on time, prepared, and tell you honestly how the student is progressing, including when tutoring is not what they need.",
          "You agree that the information you give us is accurate, that you are the parent or guardian of the student if they are under 18, and that the student will attend sessions ready to work.",
        ],
      },
      {
        heading: "Cancellations",
        body: [
          "Tell us at least 24 hours before a session and we will move it at no charge. Later than that, or if nobody attends, the session may be counted as used. Life happens, so talk to us.",
        ],
      },
      {
        heading: "Results",
        body: [
          "We do not guarantee a grade. Tutoring improves the odds; it does not replace the student's own work, and anyone promising a specific mark is selling something they cannot deliver.",
        ],
      },
      {
        heading: "Materials",
        body: [
          "Worksheets, notes and explanations we create remain ours. You may use them freely for the student's own study. Please do not republish or resell them.",
        ],
      },
      {
        heading: "Limits of responsibility",
        body: [
          "We are responsible for delivering the sessions you paid for, to a reasonable standard. We are not responsible for academic outcomes, decisions made by schools, or anything outside our control. Nothing here limits rights you have under Ontario consumer protection law.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there.",
        ],
      },
    ],
  },

  cookies: {
    title: "Cookie policy",
    intro: "Short version: this site does not use cookies at all.",
    sections: [
      {
        heading: "No cookies, and no banner",
        body: [
          "This site sets no cookies. It stores nothing in your browser's local storage. There is no analytics, no advertising pixel, no social media tracker and no embedded content from other companies.",
          "That is also why you are not being asked to accept anything. Consent banners exist because sites track visitors. This one does not, so a banner would be decoration implying something untrue.",
        ],
      },
      {
        heading: "What does happen when you visit",
        body: [
          "Our hosting provider records the request in its logs, including your IP address, in the same way every web server does. The site also asks its own server which session times are already taken, so the calendar is accurate. Neither of those follows you anywhere.",
          "Fonts and images are served from this domain, not from a third party, so visiting this page does not tell any other company that you were here.",
        ],
      },
      {
        heading: "If that changes",
        body: [
          "If we ever add analytics or another tool that needs cookies, this page will say so before it goes live, and you will be asked to consent first.",
        ],
      },
    ],
  },

  refunds: {
    title: "Refund policy",
    intro:
      "What happens to your money if something does not work out. Written to be usable, not to trap anyone.",
    sections: [
      {
        heading: "The trial session",
        body: [
          "The first session is a reduced-rate trial precisely so that nobody commits to something they have not tried. If it is not a fit, you owe nothing further and you do not have to explain why.",
        ],
      },
      {
        heading: "Single sessions",
        body: [
          "Cancel at least 24 hours ahead and the session is moved or refunded in full. Cancel later, or miss it entirely, and it may be charged, because the time was held and could have gone to another family.",
        ],
      },
      {
        heading: "Monthly packages",
        body: [
          "Unused sessions can be refunded at any time. The refund is the amount you paid minus the sessions already used, charged at the single-session rate rather than the discounted package rate, since the discount comes from booking several.",
          "Packages are meant to be used within about two months of purchase. If life gets in the way, ask, and we will usually extend rather than let it expire.",
        ],
      },
      {
        heading: "If we cancel",
        body: [
          "If we cancel a session and cannot offer you a reasonable alternative time, it is refunded in full, no questions.",
        ],
      },
      {
        heading: "How refunds are made",
        body: [
          "Refunds go back by the method you paid with, normally within five business days of us agreeing to one.",
        ],
      },
    ],
  },
};

const fr: DocSet = {
  privacy: {
    title: "Politique de confidentialité",
    intro: `Comment ${BUSINESS_NAME} traite les renseignements que vous envoyez par ce site. En langage clair, parce qu'une politique illisible ne protège personne.`,
    sections: [
      {
        heading: "Qui est responsable",
        body: [
          `Ce site est tenu par ${OPERATOR_NAME}, sous le nom de ${BUSINESS_NAME}, un service de tutorat individuel établi à Ottawa, en Ontario. Il n'y a ni entreprise ni employés derrière : la personne qui lit votre demande est celle qui enseigne à votre enfant.`,
        ],
      },
      {
        heading: "Ce que nous recueillons",
        body: [
          "Lorsque vous envoyez une demande, nous recueillons le nom que vous indiquez, votre courriel, votre téléphone si vous choisissez de l'ajouter, l'année scolaire de l'élève, la langue et le format souhaités, le créneau choisi, et ce que vous écrivez dans le message.",
          "Notre hébergeur consigne des renseignements techniques à chaque visite, dont votre adresse IP, le type de navigateur et les pages demandées. Nous utilisons aussi votre adresse IP pour limiter le nombre de demandes envoyées en peu de temps, ce qui protège le formulaire contre les abus automatisés.",
          "C'est tout. Nous ne demandons ni le nom complet de l'élève, ni son adresse, ni son école, ni sa date de naissance, ni de renseignements de paiement par ce site.",
        ],
      },
      {
        heading: "Renseignements sur les enfants",
        body: [
          "Les demandes sont faites par les parents ou tuteurs, pas par les élèves. Les seuls renseignements demandés sur un enfant sont son année scolaire et ses difficultés. N'incluez rien de plus sensible dans le message : un prénom suffit amplement.",
          "Si vous croyez qu'un enfant nous a transmis des renseignements sans l'accord d'un parent, écrivez-nous et nous les supprimerons.",
        ],
      },
      {
        heading: "Pourquoi nous les recueillons",
        body: [
          "Pour répondre à votre demande, convenir d'un horaire et préparer une séance adaptée à l'élève. C'est l'unique finalité. Nous ne bâtissons aucun profil, nous ne segmentons pas les visiteurs et nous n'utilisons pas ces renseignements pour vous faire de la publicité.",
        ],
      },
      {
        heading: "Qui d'autre y a accès",
        body: [
          "Trois fournisseurs traitent des données pour nous : Vercel héberge le site, Supabase conserve les demandes dans une base de données, et Resend achemine le courriel qui nous avertit qu'une demande est arrivée. Chacun ne voit que le nécessaire.",
          "Nous ne vendons pas vos renseignements, nous ne les partageons avec aucun annonceur et nous ne les transmettons à personne d'autre. Ils peuvent être hébergés hors du Canada, ce qui est courant chez ces fournisseurs et signifie qu'ils peuvent être soumis aux lois du pays où ils se trouvent.",
        ],
      },
      {
        heading: "Combien de temps nous les gardons",
        body: [
          `Les demandes sont conservées au maximum ${RETENTION_MONTHS} mois, afin de garder une trace des familles avec qui nous avons travaillé, puis supprimées. Les journaux d'hébergement sont conservés bien moins longtemps par le fournisseur. Si vous demandez une suppression plus tôt, nous la ferons.`,
        ],
      },
      {
        heading: "Comment ils sont protégés",
        body: [
          "Le site est servi en HTTPS. La base de données refuse toute requête qui ne porte pas la clé secrète de notre serveur : la clé publiée dans le navigateur ne peut rien lire ni rien écrire. Les courriels d'avis arrivent dans une seule boîte, contrôlée par le tuteur.",
          "Aucun système n'est parfait et nous n'allons pas prétendre le contraire. Ce que nous pouvons dire, c'est que nous recueillons peu de choses, donc il y a peu à perdre.",
        ],
      },
      {
        heading: "Vos droits",
        body: [
          "Vous pouvez demander ce que nous détenons à votre sujet, en demander la correction ou la suppression. Écrivez-nous et ce sera fait, normalement en quelques jours et sans frais.",
          "La loi fédérale canadienne sur la protection des renseignements personnels (LPRPDE) s'applique à nous. Si notre réponse ne vous satisfait pas, vous pouvez porter plainte auprès du Commissariat à la protection de la vie privée du Canada.",
        ],
      },
      {
        heading: "Modifications",
        body: [
          "Si cette politique change, la date en haut change aussi. Les changements importants seront expliqués sur cette page plutôt que modifiés discrètement.",
        ],
      },
    ],
  },

  terms: {
    title: "Conditions d'utilisation",
    intro: `L'entente entre vous et ${BUSINESS_NAME} lorsque vous réservez du tutorat par ce site.`,
    sections: [
      {
        heading: "Ce que nous offrons",
        body: [
          "Du tutorat individuel en mathématiques, en ligne par vidéo ou en personne à Ottawa, en anglais, en français ou en arabe. Les séances durent une heure, sauf entente contraire.",
        ],
      },
      {
        heading: "Une demande n'est pas une réservation",
        body: [
          "Choisir un horaire sur ce site envoie une demande. La séance existe une fois que nous avons répondu et confirmé. D'ici là, le créneau n'est pas retenu et peut être offert à quelqu'un d'autre.",
        ],
      },
      {
        heading: "Ce que nous attendons de part et d'autre",
        body: [
          "Nous arriverons à l'heure, préparés, et nous vous dirons honnêtement où en est l'élève, y compris lorsque le tutorat n'est pas ce dont il a besoin.",
          "Vous confirmez que les renseignements fournis sont exacts, que vous êtes le parent ou le tuteur de l'élève s'il a moins de 18 ans, et que l'élève se présentera prêt à travailler.",
        ],
      },
      {
        heading: "Annulations",
        body: [
          "Prévenez-nous au moins 24 heures à l'avance et la séance est déplacée sans frais. Passé ce délai, ou en cas d'absence, la séance peut être comptée comme utilisée. La vie arrive : parlez-nous-en.",
        ],
      },
      {
        heading: "Résultats",
        body: [
          "Nous ne garantissons aucune note. Le tutorat améliore les chances ; il ne remplace pas le travail de l'élève, et quiconque promet une note précise vend ce qu'il ne peut pas livrer.",
        ],
      },
      {
        heading: "Matériel",
        body: [
          "Les feuilles d'exercices, notes et explications que nous créons demeurent les nôtres. Vous pouvez les utiliser librement pour l'étude de l'élève. Merci de ne pas les republier ni les revendre.",
        ],
      },
      {
        heading: "Limites de responsabilité",
        body: [
          "Nous sommes responsables d'offrir les séances payées, selon une norme raisonnable. Nous ne sommes pas responsables des résultats scolaires, des décisions des écoles, ni de ce qui échappe à notre contrôle. Rien ici ne limite vos droits en vertu de la loi ontarienne sur la protection du consommateur.",
        ],
      },
      {
        heading: "Droit applicable",
        body: [
          "Ces conditions sont régies par les lois de la province d'Ontario et les lois fédérales du Canada qui s'y appliquent.",
        ],
      },
    ],
  },

  cookies: {
    title: "Politique sur les témoins",
    intro: "En bref : ce site n'utilise aucun témoin (cookie).",
    sections: [
      {
        heading: "Aucun témoin, donc aucune bannière",
        body: [
          "Ce site ne dépose aucun témoin. Il n'enregistre rien dans le stockage local de votre navigateur. Il n'y a ni outil d'analyse, ni pixel publicitaire, ni traqueur de réseau social, ni contenu intégré d'une autre entreprise.",
          "C'est aussi pourquoi on ne vous demande rien d'accepter. Les bannières de consentement existent parce que des sites suivent leurs visiteurs. Celui-ci ne le fait pas : une bannière serait un décor laissant croire le contraire.",
        ],
      },
      {
        heading: "Ce qui se passe réellement lors d'une visite",
        body: [
          "Notre hébergeur consigne la requête dans ses journaux, dont votre adresse IP, comme le fait tout serveur web. Le site demande aussi à son propre serveur quels créneaux sont déjà pris, pour que le calendrier soit juste. Ni l'un ni l'autre ne vous suit ailleurs.",
          "Les polices et les images proviennent de ce domaine, pas d'un tiers : visiter cette page n'informe donc aucune autre entreprise de votre passage.",
        ],
      },
      {
        heading: "Si cela change",
        body: [
          "Si nous ajoutons un jour un outil d'analyse ou autre nécessitant des témoins, cette page le dira avant sa mise en ligne, et votre consentement sera demandé d'abord.",
        ],
      },
    ],
  },

  refunds: {
    title: "Politique de remboursement",
    intro:
      "Ce qui arrive à votre argent si les choses ne fonctionnent pas. Écrite pour être utilisable, pas pour piéger qui que ce soit.",
    sections: [
      {
        heading: "La séance d'essai",
        body: [
          "La première séance est à tarif réduit précisément pour que personne ne s'engage sans avoir essayé. Si ça ne convient pas, vous ne devez rien de plus et vous n'avez pas à vous justifier.",
        ],
      },
      {
        heading: "Séances à l'unité",
        body: [
          "Annulez au moins 24 heures à l'avance et la séance est déplacée ou remboursée intégralement. Plus tard, ou en cas d'absence, elle peut être facturée, car le créneau était retenu et aurait pu servir à une autre famille.",
        ],
      },
      {
        heading: "Forfaits mensuels",
        body: [
          "Les séances non utilisées sont remboursables en tout temps. Le remboursement correspond au montant payé moins les séances déjà utilisées, comptées au tarif unitaire plutôt qu'au tarif réduit du forfait, puisque le rabais vient de l'achat groupé.",
          "Les forfaits sont prévus pour être utilisés dans les deux mois environ. Si la vie s'en mêle, demandez : nous prolongeons généralement plutôt que de laisser expirer.",
        ],
      },
      {
        heading: "Si nous annulons",
        body: [
          "Si nous annulons une séance sans pouvoir proposer un autre horaire raisonnable, elle est remboursée intégralement, sans discussion.",
        ],
      },
      {
        heading: "Comment les remboursements sont faits",
        body: [
          "Les remboursements sont faits par le moyen de paiement utilisé, normalement dans les cinq jours ouvrables suivant notre accord.",
        ],
      },
    ],
  },
};

export const legal: Record<Lang, DocSet> = { en, fr };

/** Link labels for the footer and the consent line. */
export const legalLabels: Record<Lang, Record<LegalDoc, string>> = {
  en: {
    privacy: "Privacy",
    terms: "Terms",
    cookies: "Cookies",
    refunds: "Refunds",
  },
  fr: {
    privacy: "Confidentialité",
    terms: "Conditions",
    cookies: "Témoins",
    refunds: "Remboursements",
  },
};
