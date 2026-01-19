import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Wrench, Star, ClipboardList, Droplets, Users, ThermometerSun, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllGuideCards, GUIDE_AUTHOR } from '@/lib/guide-data';

export const metadata: Metadata = {
  title: 'Loodgieter Gidsen & Tips | VindLoodgieter.nl',
  description: 'Uitgebreide gidsen over loodgietersdiensten, prijzen, tips en wat te verwachten. Handige informatie voor het vinden van de juiste loodgieter.',
  keywords: 'loodgieter gids, loodgieter tips, loodgieter prijzen, lekkage reparatie, cv-ketel onderhoud, sanitair installatie',
  openGraph: {
    title: 'Loodgieter Gidsen & Tips | VindLoodgieter.nl',
    description: 'Uitgebreide gidsen over loodgietersdiensten, prijzen, tips en wat te verwachten.',
    type: 'website',
    url: 'https://www.vindloodgieter.nl/guide',
  },
  alternates: {
    canonical: 'https://www.vindloodgieter.nl/guide',
  },
};

// Guide cards for plumber directory
const guideCards = [
  {
    slug: 'what-to-expect',
    title: 'Wat te Verwachten bij een Loodgieter',
    description: 'Complete gids over het inhuren van een loodgieter. Van eerste contact tot oplevering, inclusief prijzen en tips.',
    icon: 'clipboard',
    color: 'blue',
  },
  {
    slug: 'services',
    title: 'Loodgietersdiensten Overzicht',
    description: 'Alle diensten die loodgieters aanbieden: lekkage, sanitair, CV-ketel, riool en meer.',
    icon: 'wrench',
    color: 'orange',
  },
  {
    slug: 'emergency',
    title: 'Spoed Loodgieter: Wanneer Bellen?',
    description: 'Wanneer heeft u een spoed loodgieter nodig? Tips voor noodgevallen en schadebeperking.',
    icon: 'droplet',
    color: 'red',
  },
  {
    slug: 'prices',
    title: 'Loodgieter Prijzen & Tarieven',
    description: 'Overzicht van loodgieter kosten: uurtarieven, voorrijkosten en prijzen per dienst.',
    icon: 'star',
    color: 'green',
  },
];

// Icon mapping for guide cards
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  wrench: Wrench,
  star: Star,
  clipboard: ClipboardList,
  droplet: Droplets,
  thermometer: ThermometerSun,
  shield: ShieldCheck,
};

// Color mapping for guide cards
const colorMap: Record<string, { bg: string; text: string; hover: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', hover: 'group-hover:bg-blue-200' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700', hover: 'group-hover:bg-orange-200' },
  red: { bg: 'bg-red-100', text: 'text-red-700', hover: 'group-hover:bg-red-200' },
  green: { bg: 'bg-green-100', text: 'text-green-700', hover: 'group-hover:bg-green-200' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-700', hover: 'group-hover:bg-slate-200' },
};

export default function GuidePage() {
  // JSON-LD structured data for breadcrumbs
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.vindloodgieter.nl',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Gidsen',
        item: 'https://www.vindloodgieter.nl/guide',
      },
    ],
  };

  // JSON-LD for the collection page
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Loodgieter Gidsen & Tips',
    description: 'Uitgebreide gidsen over loodgietersdiensten, prijzen, tips en wat te verwachten.',
    url: 'https://www.vindloodgieter.nl/guide',
    publisher: {
      '@type': 'Organization',
      name: 'VindLoodgieter.nl',
      url: 'https://www.vindloodgieter.nl',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-700 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Handige Gidsen
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Loodgieter Gidsen
              <span className="block text-orange-400">&amp; Tips</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Uitgebreide gidsen om u te helpen de juiste loodgieter te vinden, prijzen te begrijpen
              en te weten wat u kunt verwachten.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="relative mt-8">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" className="fill-secondary/20"/>
          </svg>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li className="text-muted-foreground/50">/</li>
          <li className="text-foreground font-medium" aria-current="page">
            Gidsen
          </li>
        </ol>
      </nav>

      {/* Guide Cards Grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {guideCards.map((guide) => {
              const IconComponent = iconMap[guide.icon] || BookOpen;
              const colors = colorMap[guide.color] || colorMap.blue;

              return (
                <Link key={guide.slug} href={`/guide/${guide.slug}`} className="group">
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
                    <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.hover} flex items-center justify-center mb-5 transition-colors`}>
                      <IconComponent className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h2 className="font-serif text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {guide.description}
                    </p>
                    <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lees Gids
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Author/E-E-A-T Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 bg-white">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-blue-700" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold mb-2">
                  VindLoodgieter.nl Redactie
                </h2>
                <p className="text-muted-foreground mb-4">
                  Onze gidsen worden samengesteld door experts met jarenlange ervaring in de installatiebranch.
                  We bieden onafhankelijke informatie om u te helpen de juiste keuzes te maken.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Loodgietersdiensten', 'Prijsinformatie', 'Consumentenadvies', 'Kwaliteitsnormen'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Klaar om een Loodgieter te Vinden?
          </h2>
          <p className="text-muted-foreground mb-8">
            Gebruik onze uitgebreide database om loodgieters te zoeken op locatie, dienst of naam.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/search">
              <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                Zoek Loodgieter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/provincie">
              <Button variant="outline" size="lg">
                Bekijk per Provincie
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
