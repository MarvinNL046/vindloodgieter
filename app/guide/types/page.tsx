import { Metadata } from 'next';
import Link from 'next/link';
import {
  Wrench,
  Droplets,
  Flame,
  Building2,
  ShowerHead,
  Thermometer,
  ChevronRight,
  MapPin,
  Users,
  ArrowRight,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SITE_STATS } from '@/lib/stats-config';

const publishDate = '2025-01-18';

// Service types data
const serviceTypesData = {
  types: [
    { slug: 'spoed-loodgieter', name: 'Spoed Loodgieter' },
    { slug: 'cv-installatie', name: 'CV Installatie' },
    { slug: 'sanitair', name: 'Sanitair Installatie' },
    { slug: 'riool-ontstopping', name: 'Riool Ontstopping' },
    { slug: 'lekkage-opsporing', name: 'Lekkage Opsporing' },
    { slug: 'badkamer-renovatie', name: 'Badkamer Renovatie' },
    { slug: 'vloerverwarming', name: 'Vloerverwarming' },
    { slug: 'waterleiding', name: 'Waterleiding Reparatie' },
    { slug: 'gasleiding', name: 'Gasleiding Installatie' },
    { slug: 'warmtepomp', name: 'Warmtepomp Installatie' },
    { slug: 'boiler-installatie', name: 'Boiler Installatie' },
    { slug: 'duurzame-installaties', name: 'Duurzame Installaties' },
  ]
};

export const metadata: Metadata = {
  title: 'Complete Gids Loodgietersdiensten | VindLoodgieter.nl',
  description: 'Uitgebreide gids over alle soorten loodgietersdiensten in Nederland. Leer over spoed loodgieters, CV-installatie, sanitair, riool ontstopping en meer.',
  keywords: ['loodgietersdiensten', 'spoed loodgieter', 'cv installatie', 'sanitair', 'riool ontstopping', 'lekkage reparatie', 'badkamer renovatie'],
  openGraph: {
    title: 'Complete Gids Loodgietersdiensten in Nederland',
    description: 'Ontdek de verschillende soorten loodgietersdiensten - van spoedservice tot CV-installatie en badkamerrenovatie.',
    type: 'article',
    publishedTime: publishDate,
    authors: ['VindLoodgieter.nl Redactie'],
  },
  alternates: {
    canonical: 'https://www.vindloodgieter.nl/gids/diensten',
  },
};

// Sub-pillar pages for the grid
const subPillarPages = [
  {
    title: 'Spoed Loodgieter',
    description: '24/7 beschikbaar voor noodgevallen en lekkages',
    href: '/gids/diensten/spoed-loodgieter',
    icon: Droplets,
    color: 'bg-red-100 text-red-700',
    count: SITE_STATS.inpatientCentersCount,
  },
  {
    title: 'CV Installatie',
    description: 'Installatie, onderhoud en reparatie van CV-ketels',
    href: '/gids/diensten/cv-installatie',
    icon: Flame,
    color: 'bg-orange-100 text-orange-700',
    count: SITE_STATS.outpatientCentersCount,
  },
  {
    title: 'Sanitair & Badkamer',
    description: 'Installatie en renovatie van badkamers en sanitair',
    href: '/gids/diensten/sanitair',
    icon: ShowerHead,
    color: 'bg-blue-100 text-blue-700',
    count: SITE_STATS.detoxCentersCount,
  },
  {
    title: 'Riool Ontstopping',
    description: 'Professionele ontstopping en rioolreiniging',
    href: '/gids/diensten/riool-ontstopping',
    icon: Wrench,
    color: 'bg-green-100 text-green-700',
    count: SITE_STATS.soberLivingCount,
  },
  {
    title: 'Lekkage Opsporing',
    description: 'Detectie en reparatie van verborgen lekkages',
    href: '/gids/diensten/lekkage-opsporing',
    icon: Building2,
    color: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Vloerverwarming',
    description: 'Installatie en onderhoud van vloerverwarmingssystemen',
    href: '/gids/diensten/vloerverwarming',
    icon: Thermometer,
    color: 'bg-rose-100 text-rose-700',
  },
];

// FAQ items for this page
const faqItems = [
  {
    question: 'Wat kost een loodgieter per uur?',
    answer: 'Een loodgieter rekent gemiddeld tussen de 45 en 65 euro per uur, exclusief BTW en materiaalkosten. Bij spoedwerk of avond- en weekendwerk kunnen de tarieven hoger liggen. Vraag altijd vooraf een offerte en informeer naar eventuele voorrijkosten.',
  },
  {
    question: 'Wanneer moet ik een spoed loodgieter bellen?',
    answer: 'Bel een spoed loodgieter bij ernstige waterlekkages, gesprongen leidingen, een verstopte riool die niet handmatig te verhelpen is, of gaslekkages. Bij gaslucht: verlaat direct het pand, bel niet en schakel de netbeheerder in voor gaslekkages.',
  },
  {
    question: 'Hoe vaak moet een CV-ketel onderhoud krijgen?',
    answer: 'Een CV-ketel moet jaarlijks onderhoud krijgen voor optimale werking en veiligheid. Tijdens onderhoud wordt de ketel schoongemaakt, de verbranding gecontroleerd en onderdelen gecontroleerd. Regelmatig onderhoud verlengt de levensduur en houdt het rendement hoog.',
  },
  {
    question: 'Wat is het verschil tussen een loodgieter en installateur?',
    answer: 'Een loodgieter richt zich traditioneel op water- en gasleidingen, sanitair en riolering. Een installateur (ook wel monteur) werkt breder en kan ook CV-installaties, vloerverwarming en duurzame systemen installeren. Veel moderne bedrijven combineren beide specialisaties.',
  },
  {
    question: 'Hoeveel kost een badkamerrenovatie?',
    answer: 'Een complete badkamerrenovatie kost gemiddeld tussen de 5.000 en 15.000 euro, afhankelijk van grootte, kwaliteit van materialen en complexiteit. Alleen het vervangen van sanitair is goedkoper. Vraag altijd meerdere offertes aan voor een eerlijke vergelijking.',
  },
  {
    question: 'Kan ik zelf een verstopt riool ontstoppen?',
    answer: 'Kleine verstoppingen kunt u vaak zelf verhelpen met een ontstopper of ontstoppingsmiddel. Bij hardnekkige verstoppingen, terugkerende problemen of wanneer de verstopping dieper in het riool zit, is professionele hulp nodig met specialistisch materiaal.',
  },
  {
    question: 'Hoe vind ik een betrouwbare loodgieter?',
    answer: 'Kies een loodgieter met goede reviews, vraag naar certificeringen (zoals erkend installateur), vergelijk meerdere offertes en informeer naar garantie op het werk. Betrouwbare loodgieters werken transparant met duidelijke prijsafspraken vooraf.',
  },
];

export default function ServiceTypesGuidePage() {
  // JSON-LD structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Complete Gids Loodgietersdiensten in Nederland',
    description: 'Uitgebreide gids over alle soorten loodgietersdiensten in Nederland, inclusief spoed loodgieters, CV-installatie, sanitair en meer.',
    image: 'https://www.vindloodgieter.nl/images/guide-services.jpg',
    author: {
      '@type': 'Organization',
      name: 'VindLoodgieter.nl Redactie',
      url: 'https://www.vindloodgieter.nl',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VindLoodgieter.nl',
      url: 'https://www.vindloodgieter.nl',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.vindloodgieter.nl/logo.png',
      },
    },
    datePublished: publishDate,
    dateModified: publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.vindloodgieter.nl/gids/diensten',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

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
        name: 'Gids',
        item: 'https://www.vindloodgieter.nl/gids',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Diensten',
        item: 'https://www.vindloodgieter.nl/gids/diensten',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-900 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/gids" className="hover:text-white transition-colors">Gids</Link></li>
              <li>/</li>
              <li className="text-white">Diensten</li>
            </ol>
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Complete Gids Loodgietersdiensten
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mb-8">
            Begrijp de verschillende soorten loodgietersdiensten om de juiste hulp te vinden voor uw situatie.
            Deze uitgebreide gids behandelt alle diensten van Nederlandse loodgieters en installateurs.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" />
              <span>{SITE_STATS.totalFacilitiesDisplay}+ Loodgieters Geregistreerd</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Wrench className="w-4 h-4" />
              <span>{serviceTypesData.types.length} Dienst Categorieen</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Users className="w-4 h-4" />
              <span>Alle 12 Provincies</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">

          {/* Introduction */}
          <section className="mb-12">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Of u nu een lekkage heeft, uw CV-ketel moet laten onderhouden, of een complete badkamerrenovatie plant -
              het is belangrijk om te begrijpen welke loodgietersdiensten er zijn en welke specialist u nodig heeft.
              Nederland telt duizenden loodgieters en installateurs met verschillende specialisaties.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Deze gids helpt u de juiste keuze te maken door alle gangbare loodgietersdiensten te behandelen,
              van spoedservice tot duurzame installaties. U leert wat elke dienst inhoudt, wanneer u welke
              specialist nodig heeft, en waar u op moet letten bij het kiezen van een loodgieter.
            </p>
          </section>

          {/* Spoed vs Regulier */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-teal-700" />
              </div>
              Spoed vs Reguliere Service
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Het belangrijkste onderscheid in loodgietersdiensten is tussen spoedservice en regulier werk.
              Dit bepaalt niet alleen de beschikbaarheid maar ook de kosten en aanpak.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Spoed Loodgieter (24/7)</h3>
            <p className="text-muted-foreground leading-relaxed">
              Een spoed loodgieter is 24 uur per dag, 7 dagen per week beschikbaar voor noodgevallen.
              Denk aan waterleidingbreuken, ernstige lekkages, verstopte riolen met terugstroom, of
              problemen met de gasleiding. De reactietijd is meestal binnen 30-60 minuten.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Spoedtarieven liggen hoger dan reguliere tarieven, vooral in avonden, nachten en weekenden.
              Reken op een toeslag van 50-100% bovenop het standaardtarief. Desondanks is het bij echte
              noodgevallen essentieel om snel professionele hulp in te schakelen om waterschade te beperken.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Reguliere Service</h3>
            <p className="text-muted-foreground leading-relaxed">
              Voor niet-urgente werkzaamheden zoals onderhoud, renovaties of geplande installaties kunt u
              een reguliere afspraak maken. Dit geeft u de tijd om offertes te vergelijken en de beste
              prijs-kwaliteitverhouding te vinden. Plan dit soort werk bij voorkeur doordeweeks overdag
              voor de laagste tarieven.
            </p>
          </section>

          {/* CV en Verwarming */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-700" />
              </div>
              CV-installatie en Verwarming
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              CV-installatie is een specialisatie binnen het loodgietersvak. Een CV-monteur of installateur
              is gespecialiseerd in centrale verwarmingssystemen, van klassieke CV-ketels tot moderne
              warmtepompen en vloerverwarming.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">CV-ketel Installatie en Onderhoud</h3>
            <p className="text-muted-foreground leading-relaxed">
              Een CV-ketel gaat gemiddeld 15-20 jaar mee bij goed onderhoud. Jaarlijks onderhoud is essentieel
              voor veiligheid, rendement en levensduur. Bij onderhoud controleert de monteur de verbranding,
              reinigt de brander en warmtewisselaar, en test de veiligheidsfuncties.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Vloerverwarming en Warmtepompen</h3>
            <p className="text-muted-foreground leading-relaxed">
              Steeds meer woningen schakelen over op vloerverwarming en warmtepompen als duurzaam alternatief.
              Deze systemen vereisen specifieke expertise. Niet elke loodgieter is hiervoor gekwalificeerd -
              zoek een installateur met ervaring in duurzame verwarmingssystemen en relevante certificeringen.
            </p>
          </section>

          {/* Sanitair en Badkamer */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <ShowerHead className="w-5 h-5 text-blue-700" />
              </div>
              Sanitair en Badkamerrenovatie
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Sanitairwerk omvat alle werkzaamheden aan wastafels, toiletten, douches, badkuipen en kranen.
              Dit kan varieren van het vervangen van een kraan tot een complete badkamerrenovatie.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Sanitair Reparatie en Vervanging</h3>
            <p className="text-muted-foreground leading-relaxed">
              Lekkende kranen, een doorlopend toilet of een verstopte wastafel zijn veelvoorkomende problemen
              die een loodgieter snel kan verhelpen. Bij het vervangen van sanitair adviseert een goede
              loodgieter over waterbesparende opties en de beste kwaliteit binnen uw budget.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Complete Badkamerrenovatie</h3>
            <p className="text-muted-foreground leading-relaxed">
              Een badkamerrenovatie is een groter project waarbij vaak meerdere vakmensen betrokken zijn.
              De loodgieter verzorgt de wateraansluitingen, afvoeren en installatie van sanitair. Vaak
              werkt deze samen met een tegelzetter en elektricien voor een compleet resultaat.
            </p>
          </section>

          {/* Riool en Afvoer */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-green-700" />
              </div>
              Riool en Afvoer
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Problemen met riool en afvoer vereisen vaak specialistisch materiaal en kennis. Rioolontstopping
              is een aparte specialisatie binnen het loodgietersvak.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Rioolontstopping</h3>
            <p className="text-muted-foreground leading-relaxed">
              Bij een verstopt riool gebruiken professionals speciale apparatuur zoals een rioolspuit of
              veerspiraal. Met een camera-inspectie kan de oorzaak van terugkerende verstoppingen worden
              achterhaald, zoals boomwortels, verzakkingen of afzettingen in de leidingen.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Rioolrenovatie en Relining</h3>
            <p className="text-muted-foreground leading-relaxed">
              Oude riolen kunnen worden gerenoveerd zonder opbreken van de tuin of bestrating via relining.
              Hierbij wordt een nieuwe buis in de oude leiding aangebracht. Dit is vaak goedkoper en sneller
              dan traditionele vervanging.
            </p>
          </section>

        </div>
      </article>

      {/* Sub-Pillar Grid */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ontdek Loodgietersdiensten
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lees meer over specifieke diensten en vind de juiste specialist.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto">
            {subPillarPages.map((page) => (
              <Link key={page.href} href={page.href} className="group">
                <Card className="h-full hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-xl ${page.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <page.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="font-serif text-lg group-hover:text-accent transition-colors">
                      {page.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {page.description}
                    </p>
                    <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                      Meer informatie
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Service Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">
              Alle {serviceTypesData.types.length} Dienstcategorieen
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bekijk ons complete overzicht van loodgietersdiensten.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-secondary/50 rounded-xl p-6">
            <div className="flex flex-wrap gap-2">
              {serviceTypesData.types.map((type) => (
                <Link
                  key={type.slug}
                  href={`/gids/diensten/${type.slug}`}
                  className="px-3 py-2 bg-white rounded-lg text-sm hover:bg-accent hover:text-white transition-colors shadow-sm"
                >
                  {type.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">
              Veelgestelde Vragen over Loodgietersdiensten
            </h2>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-4 hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-foreground pr-4">{item.question}</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-6 pb-4">
                      <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  </details>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Vind een Loodgieter bij u in de Buurt
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Zoek in onze database met {SITE_STATS.totalFacilitiesDisplay}+ loodgieters in alle 12 provincies van Nederland.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/zoeken">
              <Button variant="accent" size="lg" className="group">
                Zoek Loodgieters
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/gids/diensten">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Bekijk per Dienst
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Author/Trust Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Over deze Gids</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  Deze uitgebreide gids is samengesteld door de VindLoodgieter.nl redactie.
                  Ons team bestaat uit experts met jarenlange ervaring in de installatiebranche.
                  We zijn toegewijd aan het bieden van betrouwbare informatie om u te helpen
                  de juiste loodgieter te vinden.
                </p>
                <p className="text-xs text-muted-foreground">
                  Laatst bijgewerkt: {new Date(publishDate).toLocaleDateString('nl-NL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
