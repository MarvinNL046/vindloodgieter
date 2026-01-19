// Guide data types and loading functions for SEO pillar pages

// ===== INTERFACES =====

export interface FAQ {
  question: string;
  answer: string;
}

export interface GuideSection {
  id: string;
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

export interface PillarGuide {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  sections: GuideSection[];
  faqs: FAQ[];
  relatedGuides: string[];
  lastUpdated?: string;
  author?: string;
}

export interface GuideCard {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// ===== GUIDE CARDS DATA =====

export const pillarGuideCards: GuideCard[] = [
  {
    slug: 'loodgieter-kiezen',
    title: 'Loodgieter Kiezen',
    description: 'Een complete gids om de juiste loodgieter te vinden voor uw situatie.',
    icon: 'star',
    color: 'blue',
  },
  {
    slug: 'kosten',
    title: 'Kosten & Tarieven',
    description: 'Wat kost een loodgieter? Overzicht van uurtarieven, voorrijkosten en werkzaamheden.',
    icon: 'clipboard',
    color: 'green',
  },
  {
    slug: 'spoed',
    title: 'Spoedgevallen',
    description: 'Wat te doen bij lekkage of andere noodgevallen? Direct handelen kan schade voorkomen.',
    icon: 'alert',
    color: 'orange',
  },
  {
    slug: 'onderhoud',
    title: 'Preventief Onderhoud',
    description: 'Tips voor regelmatig onderhoud om dure reparaties te voorkomen.',
    icon: 'wrench',
    color: 'slate',
  },
  {
    slug: 'tips',
    title: 'Doe-het-zelf Tips',
    description: 'Kleine reparaties die u zelf kunt uitvoeren en wanneer u een professional nodig heeft.',
    icon: 'tools',
    color: 'navy',
  },
];

// ===== PILLAR GUIDE CONTENT =====

export const pillarGuides: Record<string, PillarGuide> = {
  'loodgieter-kiezen': {
    slug: 'loodgieter-kiezen',
    title: 'Hoe Kies Je de Juiste Loodgieter?',
    seoTitle: 'Loodgieter Kiezen: Complete Gids | VindLoodgieter.nl',
    seoDescription: 'Leer hoe je de beste loodgieter kiest. Tips over certificeringen, offertes vergelijken, en waar je op moet letten bij het inhuren van een loodgieter.',
    introduction: 'Een goede loodgieter vinden is niet altijd makkelijk. Met deze complete gids leer je waar je op moet letten, welke vragen je moet stellen, en hoe je betrouwbare loodgieters kunt herkennen.',
    sections: [],
    faqs: [
      {
        question: 'Hoe weet ik of een loodgieter betrouwbaar is?',
        answer: 'Controleer of de loodgieter ingeschreven staat bij de KvK, vraag om referenties of reviews, en check of ze verzekerd zijn. Een professionele loodgieter geeft altijd een schriftelijke offerte.',
      },
      {
        question: 'Moet een loodgieter gecertificeerd zijn?',
        answer: 'Voor bepaalde werkzaamheden zoals gaswerk is certificering verplicht. Vraag altijd naar relevante certificaten en diploma\'s, vooral voor gas- en CV-installaties.',
      },
      {
        question: 'Hoeveel offertes moet ik aanvragen?',
        answer: 'We adviseren minimaal 3 offertes aan te vragen voor grotere klussen. Zo krijg je een goed beeld van de marktprijs en kun je de aanpak vergelijken.',
      },
    ],
    relatedGuides: ['kosten', 'spoed', 'onderhoud'],
    lastUpdated: '2025-01-18',
    author: 'VindLoodgieter.nl Redactie',
  },
  'kosten': {
    slug: 'kosten',
    title: 'Wat Kost Een Loodgieter?',
    seoTitle: 'Loodgieter Kosten & Tarieven Overzicht | VindLoodgieter.nl',
    seoDescription: 'Complete gids over loodgieter kosten in Nederland. Uurtarieven, voorrijkosten, en prijzen voor veelvoorkomende klussen zoals lekkage reparatie en CV-onderhoud.',
    introduction: 'De kosten van een loodgieter varieren per regio, type klus en urgentie. Deze gids geeft je een duidelijk overzicht van wat je kunt verwachten.',
    sections: [],
    faqs: [
      {
        question: 'Wat is het gemiddelde uurtarief van een loodgieter?',
        answer: 'Het gemiddelde uurtarief ligt tussen EUR 45 en EUR 65 per uur. ZZP\'ers zijn vaak iets goedkoper dan installatiebedrijven. Spoedtarieven liggen 50-100% hoger.',
      },
      {
        question: 'Wat zijn voorrijkosten?',
        answer: 'Voorrijkosten zijn de kosten voor het komen naar je locatie. Deze liggen gemiddeld tussen EUR 20 en EUR 45, afhankelijk van de afstand.',
      },
      {
        question: 'Wat kost een lekkage reparatie?',
        answer: 'Een eenvoudige lekkage reparatie kost gemiddeld EUR 100 tot EUR 250, afhankelijk van de locatie en complexiteit van de lekkage.',
      },
    ],
    relatedGuides: ['loodgieter-kiezen', 'spoed'],
    lastUpdated: '2025-01-18',
    author: 'VindLoodgieter.nl Redactie',
  },
  'spoed': {
    slug: 'spoed',
    title: 'Spoed Loodgieter: Wat Te Doen Bij Noodgevallen',
    seoTitle: 'Spoed Loodgieter: Noodgevallen & Direct Hulp | VindLoodgieter.nl',
    seoDescription: 'Lekkage of ander loodgietersnoodgeval? Leer wat je zelf kunt doen en wanneer je een spoed loodgieter moet bellen. 24/7 hulp beschikbaar.',
    introduction: 'Bij een lekkage of ander loodgietersnoodgeval is snel handelen belangrijk om schade te beperken. Leer wanneer je zelf actie kunt ondernemen en wanneer professionele hulp nodig is.',
    sections: [],
    faqs: [
      {
        question: 'Wanneer is een spoed loodgieter nodig?',
        answer: 'Bij gesprongen waterleidingen, ernstige lekkages die je niet kunt stoppen, gaslekkages, of wanneer meerdere afvoeren tegelijk verstopt zijn. Bij gaslekkage: bel eerst de gasnetbeheerder!',
      },
      {
        question: 'Wat kan ik zelf doen bij een lekkage?',
        answer: 'Draai direct de hoofdkraan dicht om de watertoevoer te stoppen. Vang lekkend water op en schakel de stroom uit als water in de buurt van elektriciteit komt.',
      },
      {
        question: 'Hoeveel kost een spoed loodgieter?',
        answer: 'Spoedtarieven liggen 50-100% hoger dan normale tarieven. Reken op een toeslag van EUR 25-75 voor avond/weekend, en tot 200% op feestdagen.',
      },
    ],
    relatedGuides: ['kosten', 'loodgieter-kiezen'],
    lastUpdated: '2025-01-18',
    author: 'VindLoodgieter.nl Redactie',
  },
  'onderhoud': {
    slug: 'onderhoud',
    title: 'Preventief Onderhoud: Voorkom Dure Reparaties',
    seoTitle: 'Loodgieter Onderhoud Tips: Voorkom Problemen | VindLoodgieter.nl',
    seoDescription: 'Tips voor regelmatig onderhoud aan uw leidingen, CV-ketel en sanitair. Voorkom dure reparaties met deze preventieve maatregelen.',
    introduction: 'Regelmatig onderhoud aan uw waterleidingen, CV-installatie en sanitair voorkomt kostbare reparaties. Leer welke onderhoudstaken u zelf kunt doen en wanneer u een professional inschakelt.',
    sections: [],
    faqs: [
      {
        question: 'Hoe vaak moet de CV-ketel onderhouden worden?',
        answer: 'Jaarlijks onderhoud wordt aanbevolen. Dit houdt de ketel efficient, verlengt de levensduur en is vaak verplicht voor de garantie.',
      },
      {
        question: 'Hoe voorkom ik verstopte afvoeren?',
        answer: 'Gebruik een haarfilter in de douche, giet geen vet door de gootsteen, en spoel regelmatig door met kokend water of baking soda en azijn.',
      },
      {
        question: 'Moet ik de watermeter regelmatig controleren?',
        answer: 'Ja, controleer maandelijks de watermeter met alle kranen dicht. Als de meter nog loopt, heeft u mogelijk een verborgen lekkage.',
      },
    ],
    relatedGuides: ['tips', 'loodgieter-kiezen'],
    lastUpdated: '2025-01-18',
    author: 'VindLoodgieter.nl Redactie',
  },
  'tips': {
    slug: 'tips',
    title: 'Doe-het-zelf Tips voor Kleine Klussen',
    seoTitle: 'Loodgieter Tips: Zelf Kleine Klussen Uitvoeren | VindLoodgieter.nl',
    seoDescription: 'Handige doe-het-zelf tips voor kleine loodgietersklussen. Leer welke reparaties u zelf kunt doen en wanneer u beter een professional kunt inschakelen.',
    introduction: 'Sommige kleine loodgietersklussen kunt u eenvoudig zelf uitvoeren. Deze gids helpt u onderscheid te maken tussen DIY-projecten en werkzaamheden waarvoor u een professional nodig heeft.',
    sections: [],
    faqs: [
      {
        question: 'Kan ik zelf een kraan vervangen?',
        answer: 'Ja, met basis gereedschap is het vervangen van een kraan goed te doen. Zorg dat u de watertoevoer afsluit en houd rekening met de aansluitingen.',
      },
      {
        question: 'Hoe ontstop ik zelf een afvoer?',
        answer: 'Begin met een plopper of natuurlijke middelen zoals baking soda en azijn. Voor hardnekkige verstoppingen kunt u een ontstoppingsveer gebruiken.',
      },
      {
        question: 'Wanneer moet ik toch een loodgieter bellen?',
        answer: 'Bij gasleidingen, ernstige lekkages, werkzaamheden aan de hoofdwaterleiding, of wanneer u niet zeker bent van uw vaardigheden. Veiligheid gaat voor!',
      },
    ],
    relatedGuides: ['onderhoud', 'spoed'],
    lastUpdated: '2025-01-18',
    author: 'VindLoodgieter.nl Redactie',
  },
};

// ===== DATA LOADING FUNCTIONS =====

/**
 * Get all pillar guide cards for the index page
 */
export function getAllGuideCards(): GuideCard[] {
  return pillarGuideCards;
}

/**
 * Get a specific pillar guide by slug
 */
export function getGuideBySlug(slug: string): PillarGuide | null {
  return pillarGuides[slug] || null;
}

/**
 * Get all pillar guide slugs for static generation
 */
export function getAllGuideSlugs(): string[] {
  return Object.keys(pillarGuides);
}

/**
 * Get related guides for a specific guide
 */
export function getRelatedGuides(slug: string): GuideCard[] {
  const guide = pillarGuides[slug];
  if (!guide) return [];

  return guide.relatedGuides
    .map(relatedSlug => pillarGuideCards.find(card => card.slug === relatedSlug))
    .filter((card): card is GuideCard => card !== undefined);
}

/**
 * Get guide card by slug
 */
export function getGuideCardBySlug(slug: string): GuideCard | null {
  return pillarGuideCards.find(card => card.slug === slug) || null;
}

// ===== AUTHOR INFO =====

export const GUIDE_AUTHOR = {
  name: 'VindLoodgieter.nl Redactie',
  description: 'Onze redactie bestaat uit ervaren loodgieters en installateurs die u voorzien van betrouwbare informatie over loodgieterswerk in Nederland.',
  expertise: ['Loodgieterswerk', 'CV-Installatie', 'Sanitair', 'Onderhoud Tips'],
};
