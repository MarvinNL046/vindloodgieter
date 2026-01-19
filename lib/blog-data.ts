export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'lekkage-opsporen-zelf-doen-of-loodgieter-bellen',
    title: 'Lekkage Opsporen: Zelf Doen of Loodgieter Bellen?',
    excerpt: 'Leer hoe je waterlekkages kunt opsporen en wanneer het tijd is om een professional in te schakelen. Handige tips voor huiseigenaren.',
    author: 'VindLoodgieter.nl',
    date: '2025-01-15',
    readTime: '6 min',
    category: 'Tips',
    image: '/images/blog/lekkage-opsporen.jpg',
  },
  {
    id: 2,
    slug: 'cv-ketel-onderhoud-waarom-jaarlijks-belangrijk',
    title: 'CV-Ketel Onderhoud: Waarom Jaarlijks Onderhoud Belangrijk Is',
    excerpt: 'Een goed onderhouden CV-ketel bespaart geld en voorkomt problemen. Ontdek waarom jaarlijks onderhoud essentieel is.',
    author: 'VindLoodgieter.nl',
    date: '2025-01-10',
    readTime: '5 min',
    category: 'Onderhoud',
    image: '/images/blog/cv-ketel-onderhoud.jpg',
  },
  {
    id: 3,
    slug: 'verstopte-afvoer-zelf-oplossen',
    title: 'Verstopte Afvoer? Zo Los Je Het Zelf Op',
    excerpt: 'Handige tips om een verstopte afvoer zelf te verhelpen. Van natuurlijke middelen tot wanneer je een loodgieter moet bellen.',
    author: 'VindLoodgieter.nl',
    date: '2025-01-05',
    readTime: '7 min',
    category: 'Tips',
    image: '/images/blog/verstopte-afvoer.jpg',
  },
  {
    id: 4,
    slug: 'badkamer-renovatie-kosten-besparen',
    title: 'Badkamer Renovatie: Hoe Je Kosten Kunt Besparen',
    excerpt: 'Plan je een badkamerrenovatie? Ontdek hoe je kosten kunt besparen zonder in te leveren op kwaliteit.',
    author: 'VindLoodgieter.nl',
    date: '2024-12-28',
    readTime: '8 min',
    category: 'Renovatie',
    image: '/images/blog/badkamer-renovatie.jpg',
  },
  {
    id: 5,
    slug: 'loodgieter-kiezen-waar-op-letten',
    title: 'Loodgieter Kiezen: Waar Moet Je Op Letten?',
    excerpt: 'Een goede loodgieter vinden is niet altijd makkelijk. Deze checklist helpt je de juiste keuze te maken.',
    author: 'VindLoodgieter.nl',
    date: '2024-12-20',
    readTime: '6 min',
    category: 'Gids',
    image: '/images/blog/loodgieter-kiezen.jpg',
  },
  {
    id: 6,
    slug: 'waterdruk-verhogen-tips',
    title: 'Lage Waterdruk? Zo Verhoog Je De Waterdruk In Huis',
    excerpt: 'Last van lage waterdruk? Ontdek de oorzaken en oplossingen om de waterdruk in je huis te verbeteren.',
    author: 'VindLoodgieter.nl',
    date: '2024-12-15',
    readTime: '5 min',
    category: 'Tips',
    image: '/images/blog/waterdruk.jpg',
  },
  {
    id: 7,
    slug: 'spoed-loodgieter-wanneer-bellen',
    title: 'Spoed Loodgieter: Wanneer Is Het Echt Nodig?',
    excerpt: 'Niet elke loodgietersprobleem is een noodgeval. Leer wanneer je echt een spoedloodgieter moet bellen.',
    author: 'VindLoodgieter.nl',
    date: '2025-01-20',
    readTime: '4 min',
    category: 'Spoed',
    image: '/images/blog/spoed-loodgieter.jpg',
  },
  {
    id: 8,
    slug: 'vloerverwarming-voor-nadelen',
    title: 'Vloerverwarming: De Voor- en Nadelen Op Een Rij',
    excerpt: 'Overweeg je vloerverwarming? Wij zetten alle voor- en nadelen voor je op een rij zodat je een goede keuze kunt maken.',
    author: 'VindLoodgieter.nl',
    date: '2025-01-18',
    readTime: '7 min',
    category: 'Verwarming',
    image: '/images/blog/vloerverwarming.jpg',
  },
  {
    id: 9,
    slug: 'toilet-repareren-zelf-doen',
    title: 'Toilet Repareren: Wat Kun Je Zelf Doen?',
    excerpt: 'Een doorlopend of lekkend toilet? Veel kleine reparaties kun je zelf uitvoeren. Ontdek hoe.',
    author: 'VindLoodgieter.nl',
    date: '2025-01-16',
    readTime: '6 min',
    category: 'Tips',
    image: '/images/blog/toilet-repareren.jpg',
  },
  {
    id: 10,
    slug: 'warmtepomp-installeren-wat-kost-dat',
    title: 'Warmtepomp Installeren: Wat Kost Dat?',
    excerpt: 'Benieuwd naar de kosten van een warmtepomp? Wij geven je een compleet overzicht van de investering en besparingen.',
    author: 'VindLoodgieter.nl',
    date: '2025-01-14',
    readTime: '8 min',
    category: 'Verwarming',
    image: '/images/blog/warmtepomp.jpg',
  },
  {
    id: 11,
    slug: 'waterleiding-laten-aanleggen',
    title: 'Waterleiding Laten Aanleggen: Kosten en Tips',
    excerpt: 'Moet je een nieuwe waterleiding laten aanleggen? Dit is wat je moet weten over kosten, materialen en installatie.',
    author: 'VindLoodgieter.nl',
    date: '2025-01-12',
    readTime: '7 min',
    category: 'Installatie',
    image: '/images/blog/waterleiding.jpg',
  },
  {
    id: 12,
    slug: 'riool-ontstoppen-methodes',
    title: 'Riool Ontstoppen: Welke Methodes Zijn Er?',
    excerpt: 'Een verstopt riool is vervelend. Ontdek welke methodes er zijn om je riool te ontstoppen en wanneer je hulp nodig hebt.',
    author: 'VindLoodgieter.nl',
    date: '2025-01-08',
    readTime: '6 min',
    category: 'Tips',
    image: '/images/blog/riool-ontstoppen.jpg',
  },
  {
    id: 13,
    slug: 'kraan-vervangen-stap-voor-stap',
    title: 'Kraan Vervangen: Stap-Voor-Stap Uitleg',
    excerpt: 'Een nieuwe kraan installeren hoeft niet moeilijk te zijn. Met deze handleiding kun je het zelf doen.',
    author: 'VindLoodgieter.nl',
    date: '2025-01-06',
    readTime: '8 min',
    category: 'DIY',
    image: '/images/blog/kraan-vervangen.jpg',
  },
  {
    id: 14,
    slug: 'gas-lekkage-herkennen',
    title: 'Gaslekkage Herkennen: Hoe Weet Je Of Er Gas Lekt?',
    excerpt: 'Een gaslekkage is gevaarlijk. Leer hoe je een gaslek herkent en wat je moet doen in noodgevallen.',
    author: 'VindLoodgieter.nl',
    date: '2025-01-04',
    readTime: '5 min',
    category: 'Veiligheid',
    image: '/images/blog/gaslekkage.jpg',
  },
  {
    id: 15,
    slug: 'loodgieter-tarieven-nederland',
    title: 'Loodgieter Tarieven: Wat Kost Een Loodgieter in Nederland?',
    excerpt: 'Benieuwd naar de kosten van een loodgieter? Wij geven een overzicht van gemiddelde uurtarieven en voorrijkosten.',
    author: 'VindLoodgieter.nl',
    date: '2025-01-02',
    readTime: '6 min',
    category: 'Kosten',
    image: '/images/blog/tarieven.jpg',
  },
];

export const categories = [
  { name: 'Alle Artikelen', count: blogPosts.length },
  { name: 'Tips', count: blogPosts.filter(p => p.category === 'Tips').length },
  { name: 'Onderhoud', count: blogPosts.filter(p => p.category === 'Onderhoud').length },
  { name: 'Verwarming', count: blogPosts.filter(p => p.category === 'Verwarming').length },
  { name: 'Renovatie', count: blogPosts.filter(p => p.category === 'Renovatie').length },
  { name: 'Gids', count: blogPosts.filter(p => p.category === 'Gids').length },
  { name: 'Kosten', count: blogPosts.filter(p => p.category === 'Kosten').length },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}

export function getLatestPosts(limit: number = 6): BlogPost[] {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// Helper functions for internal linking
export function getLoodgieterLink(name: string): string {
  const slug = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/loodgieter/${slug}`;
}

export function getProvincieLink(provincie: string): string {
  const slug = provincie.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/state/${slug}`;
}

export function getCityLink(city: string): string {
  const slug = city
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/city/${slug}`;
}

export function getServiceTypeLink(type: string): string {
  const slug = type.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/type/${slug}`;
}
