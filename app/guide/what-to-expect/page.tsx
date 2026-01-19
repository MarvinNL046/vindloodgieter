import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ClipboardList, Wrench, Users, Clock, ArrowRight, CheckCircle, Phone, Home, AlertCircle, Euro, FileText, ShieldCheck, ThermometerSun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import InlineAd from '@/components/ads/InlineAd';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import { SITE_STATS } from '@/lib/stats-config';

export const metadata: Metadata = {
  title: 'Wat te Verwachten bij een Loodgieter: Complete Gids | VindLoodgieter.nl',
  description: 'Leer wat u kunt verwachten wanneer u een loodgieter inhuurt. Van eerste contact tot afronding, inclusief prijzen, garantie en tips.',
  keywords: 'loodgieter inhuren, wat te verwachten, loodgieter kosten, loodgieter offerte, sanitair reparatie, lekkage reparatie',
  openGraph: {
    title: 'Wat te Verwachten bij een Loodgieter: Complete Gids',
    description: 'Alles wat u moet weten over het inhuren van een loodgieter.',
    type: 'article',
    siteName: 'VindLoodgieter.nl',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wat te Verwachten bij een Loodgieter',
    description: 'Complete gids voor het inhuren van een loodgieter.',
  },
  alternates: {
    canonical: 'https://www.vindloodgieter.nl/guide/what-to-expect',
  },
};

const serviceSteps = [
  {
    phase: 1,
    title: 'Eerste Contact & Offerte',
    duration: 'Dezelfde dag',
    icon: <Phone className="w-6 h-6" />,
    description: 'Het proces begint met uw telefoontje of online aanvraag voor een offerte.',
    details: [
      'Beschrijf het probleem duidelijk',
      'Vraag naar beschikbaarheid en voorrijkosten',
      'Ontvang een prijsindicatie of gratis offerte',
      'Maak een afspraak op een geschikt moment',
      'Vraag naar KvK-nummer en verzekering',
      'Bespreek eventuele spoedtoeslag',
    ],
  },
  {
    phase: 2,
    title: 'Inspectie & Diagnose',
    duration: '15-60 minuten',
    icon: <ClipboardList className="w-6 h-6" />,
    description: 'De loodgieter komt langs om het probleem te inspecteren en een diagnose te stellen.',
    details: [
      'Visuele inspectie van het probleem',
      'Camera-inspectie bij rioolproblemen',
      'Lekdetectie bij verborgen lekkages',
      'Uitleg over oorzaak en oplossing',
      'Definitieve offerte met exacte kosten',
      'Akkoord voor start werkzaamheden',
    ],
  },
  {
    phase: 3,
    title: 'Uitvoering Werkzaamheden',
    duration: 'Afhankelijk van klus',
    icon: <Wrench className="w-6 h-6" />,
    description: 'De loodgieter voert de reparatie of installatie uit volgens afspraak.',
    details: [
      'Professioneel gereedschap en materialen',
      'Zorgvuldig werken met bescherming',
      'Tussentijdse updates bij grote klussen',
      'Mogelijkheid tot meerwerk na overleg',
      'Netjes achterlaten van werkplek',
      'Testen van uitgevoerde werkzaamheden',
    ],
  },
  {
    phase: 4,
    title: 'Oplevering & Garantie',
    duration: 'Direct na afronding',
    icon: <ShieldCheck className="w-6 h-6" />,
    description: 'Na afronding krijgt u uitleg en documentatie over het uitgevoerde werk.',
    details: [
      'Demonstratie van uitgevoerd werk',
      'Uitleg over onderhoud en preventie',
      'Schriftelijke garantie op werk',
      'Factuur met specificatie',
      'Contactgegevens voor nazorg',
      'Advies voor toekomstig onderhoud',
    ],
  },
];

const serviceTypes = [
  {
    name: 'Spoed Lekkage Reparatie',
    description: '24/7 service voor urgente lekkages, wateroverlast en gesprongen leidingen.',
    details: ['Directe hulp binnen 30-60 min', 'Spoedtoeslag mogelijk', 'Schadebeperking'],
  },
  {
    name: 'Sanitair Installatie',
    description: 'Installatie van toiletten, kranen, douches, wastafels en badkuipen.',
    details: ['Nieuwe installatie', 'Vervanging oude sanitair', 'Aansluitingen'],
  },
  {
    name: 'CV-Ketel Onderhoud',
    description: 'Jaarlijks onderhoud, storingen verhelpen en ketel vervangen.',
    details: ['Verplicht onderhoud', 'Storingen oplossen', 'Ketel installatie'],
  },
  {
    name: 'Riool Ontstopping',
    description: 'Verstopte afvoeren, rioolproblemen en camera-inspecties.',
    details: ['Mechanisch ontstoppen', 'Hogedrukreiniging', 'Wortelverwijdering'],
  },
  {
    name: 'Waterleiding Werk',
    description: 'Aanleg, reparatie en vervanging van waterleidingen.',
    details: ['Leidingaanleg', 'Leidingvervanging', 'Lekdetectie'],
  },
  {
    name: 'Badkamer Renovatie',
    description: 'Complete badkamer renovatie inclusief sanitair en leidingwerk.',
    details: ['Ontwerp tot oplevering', 'Alle sanitair werk', 'Tegelwerk aansluitingen'],
  },
];

const priceIndications = [
  { service: 'Voorrijkosten', range: 'EUR 25 - EUR 50', note: 'Soms gratis bij opdracht' },
  { service: 'Uurtarief', range: 'EUR 45 - EUR 75', note: 'Excl. BTW en materialen' },
  { service: 'Kraan vervangen', range: 'EUR 75 - EUR 150', note: 'Incl. arbeid, excl. kraan' },
  { service: 'Toilet ontstoppen', range: 'EUR 75 - EUR 150', note: 'Eenvoudige verstopping' },
  { service: 'Lekkage reparatie', range: 'EUR 100 - EUR 300', note: 'Afhankelijk van locatie' },
  { service: 'CV-ketel onderhoud', range: 'EUR 100 - EUR 200', note: 'Jaarlijks onderhoud' },
  { service: 'Riool ontstoppen', range: 'EUR 150 - EUR 400', note: 'Mechanisch/hogedruk' },
  { service: 'Spoedtoeslag', range: 'EUR 50 - EUR 100', note: 'Avond/weekend/feestdag' },
];

const whatToCheck = [
  {
    category: 'Voor de Afspraak',
    items: [
      'Controleer KvK-inschrijving',
      'Vraag naar verzekering (aansprakelijkheid)',
      'Lees online reviews en beoordelingen',
      'Vergelijk meerdere offertes',
      'Vraag naar garantie op werk',
      'Check of prijzen incl. of excl. BTW zijn',
    ],
  },
  {
    category: 'Tijdens het Werk',
    items: [
      'Vraag om toelichting bij meerwerk',
      'Neem foto\'s van verborgen gebreken',
      'Houd communicatie schriftelijk bij',
      'Betaal niet vooruit (alleen bij grote projecten)',
      'Vraag om nota\'s van gebruikte materialen',
      'Controleer of werk volgens afspraak is',
    ],
  },
];

const faqs = [
  {
    question: 'Hoeveel kost een loodgieter per uur?',
    answer: 'Het uurtarief van een loodgieter ligt gemiddeld tussen EUR 45 en EUR 75 exclusief BTW. Daarnaast betaalt u vaak voorrijkosten (EUR 25-50) en materiaalkosten. In het weekend, \'s avonds of op feestdagen geldt meestal een spoedtoeslag van EUR 50-100. Vraag altijd een offerte vooraf.',
  },
  {
    question: 'Hoe snel kan een loodgieter komen bij spoed?',
    answer: 'Bij spoedgevallen zoals ernstige lekkages of wateroverlast kan een spoed loodgieter vaak binnen 30-60 minuten ter plaatse zijn. De meeste loodgieters bieden 24/7 spoedservice aan. Houd er rekening mee dat spoedwerk duurder is dan reguliere afspraken.',
  },
  {
    question: 'Moet ik vooraf betalen?',
    answer: 'Bij kleine reparaties betaalt u meestal achteraf na oplevering. Bij grotere projecten zoals een badkamerrenovatie is een aanbetaling van 30-50% gebruikelijk. Betaal nooit het volledige bedrag vooruit. Een betrouwbare loodgieter vraagt dit ook niet.',
  },
  {
    question: 'Wat als de reparatie niet goed is uitgevoerd?',
    answer: 'Een erkende loodgieter geeft garantie op het uitgevoerde werk, meestal 1-2 jaar. Bij klachten neemt u eerst contact op met de loodgieter. Komt u er niet uit, dan kunt u terecht bij de Geschillencommissie Installerende Bedrijven of uw rechtsbijstandsverzekering.',
  },
  {
    question: 'Heb ik toestemming nodig van de verhuurder?',
    answer: 'Bij huurwoningen is de verhuurder verantwoordelijk voor groot onderhoud aan leidingen en CV. Kleine reparaties zoals een verstopte afvoer zijn vaak voor rekening van de huurder. Neem bij twijfel contact op met uw verhuurder voordat u een loodgieter inhuurt.',
  },
  {
    question: 'Waar moet ik op letten bij het kiezen van een loodgieter?',
    answer: 'Let op: KvK-inschrijving, aansprakelijkheidsverzekering, reviews en beoordelingen, duidelijke prijsafspraken, garantie op werk, en professionele communicatie. Vergelijk altijd meerdere offertes en kies niet automatisch de goedkoopste.',
  },
  {
    question: 'Is CV-ketel onderhoud verplicht?',
    answer: 'Jaarlijks CV-ketel onderhoud is niet wettelijk verplicht, maar wel sterk aanbevolen en vaak een voorwaarde voor garantie van de fabrikant. Regelmatig onderhoud voorkomt storingen, verlengt de levensduur en zorgt voor een veilige en efficiente werking.',
  },
  {
    question: 'Kan ik kleine loodgieterswerkzaamheden zelf doen?',
    answer: 'Eenvoudige klussen zoals een verstopte afvoer ontstoppen of een kraanpakking vervangen kunt u vaak zelf doen. Voor werkzaamheden aan gasleidingen, CV-ketels of complexe leidingwerk is een erkend installateur verplicht vanwege veiligheidsrisico\'s.',
  },
];

export default function WhatToExpectPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Wat te Verwachten bij een Loodgieter: Complete Gids',
    description: 'Uitgebreide gids over wat u kunt verwachten wanneer u een loodgieter inhuurt.',
    author: {
      '@type': 'Organization',
      name: 'VindLoodgieter.nl',
      url: 'https://www.vindloodgieter.nl',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VindLoodgieter.nl',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.vindloodgieter.nl/logo.png',
      },
    },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.vindloodgieter.nl/guide/what-to-expect',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vindloodgieter.nl' },
      { '@type': 'ListItem', position: 2, name: 'Gids', item: 'https://www.vindloodgieter.nl/guide' },
      { '@type': 'ListItem', position: 3, name: 'Wat te Verwachten', item: 'https://www.vindloodgieter.nl/guide/what-to-expect' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-white/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href="/guide" className="hover:text-white transition-colors">Gids</Link></li>
                <li>/</li>
                <li className="text-white">Wat te Verwachten</li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-orange-400" />
              <span className="text-orange-400 font-medium">Loodgieter Gids</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 max-w-4xl">
              Wat te Verwachten bij een Loodgieter
            </h1>
            <p className="text-white/80 text-lg max-w-3xl mb-6">
              Een complete gids over het inhuren van een loodgieter, van eerste contact tot afronding.
              Inclusief prijsindicaties, tips en veelgestelde vragen.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4" />
                Stap-voor-stap proces
              </span>
              <span className="flex items-center gap-2">
                <Euro className="w-4 h-4" />
                Prijsindicaties
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Tips & Checklists
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Een loodgieter inhuren hoeft geen stressvolle ervaring te zijn. Of u nu te maken heeft met een
                lekkage, een verstopte afvoer of een CV-ketel storing - met de juiste voorbereiding weet u precies
                wat u kunt verwachten en voorkomt u verrassingen.
              </p>
            </div>

            <Card className="p-6 mb-12 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-blue-600 shrink-0" />
                <div>
                  <h3 className="font-serif font-semibold text-lg mb-2">Spoed Lekkage?</h3>
                  <p className="text-muted-foreground">
                    Bij ernstige lekkages of wateroverlast, sluit eerst de hoofdkraan af en bel direct een
                    spoed loodgieter. Wacht niet - waterschade kan snel oplopen.
                  </p>
                </div>
              </div>
            </Card>

            <LeaderboardAd />

            {/* Service Steps */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Het Proces: Van Contact tot Oplevering</h2>
              <div className="space-y-6">
                {serviceSteps.map((phase) => (
                  <Card key={phase.phase} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                        {phase.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-blue-600">Stap {phase.phase}</span>
                          <h3 className="font-serif font-semibold text-xl">{phase.title}</h3>
                          <span className="text-sm text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                            {phase.duration}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-4">{phase.description}</p>
                        <div className="grid gap-2 md:grid-cols-2">
                          {phase.details.map((detail) => (
                            <p key={detail} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <InlineAd />

            {/* Service Types */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Soorten Loodgieterswerk</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {serviceTypes.map((service) => (
                  <Card key={service.name} className="p-5 border-l-4 border-l-blue-600">
                    <h3 className="font-serif font-semibold mb-2">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.details.map((detail) => (
                        <span key={detail} className="text-xs bg-secondary px-2 py-1 rounded">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Price Indications */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Prijsindicaties</h2>
              <p className="text-muted-foreground mb-8">
                Onderstaande prijzen zijn indicatief en kunnen varieren per loodgieter en regio.
                Vraag altijd een offerte voor exacte prijzen.
              </p>
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-orange-50/50 border-blue-100">
                <div className="space-y-3">
                  {priceIndications.map((item) => (
                    <div key={item.service} className="flex items-center gap-4 py-2 border-b border-border/50 last:border-0">
                      <div className="w-40 text-sm font-medium">{item.service}</div>
                      <div className="w-32 text-sm text-blue-600 font-semibold">{item.range}</div>
                      <div className="flex-1 text-sm text-muted-foreground">{item.note}</div>
                    </div>
                  ))}
                </div>
              </Card>
              <p className="text-sm text-muted-foreground mt-4 italic">
                Prijzen zijn exclusief BTW tenzij anders vermeld. Materiaalkosten komen er vaak nog bij.
              </p>
            </section>

            <InlineAd />

            {/* What to Check */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Checklist: Waar op Letten</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {whatToCheck.map((category) => (
                  <Card key={category.category} className="p-6 bg-green-50 border-green-200">
                    <h3 className="font-serif font-semibold text-lg mb-4 flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      {category.category}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-green-500">&#10003;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Veelgestelde Vragen</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-left font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* CTA Section */}
            <section className="text-center">
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-orange-50/50 border-blue-100">
                <h2 className="font-serif text-2xl font-bold mb-4">
                  Vind een Betrouwbare Loodgieter
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Zoek in onze database van loodgieters. Vergelijk reviews, prijzen en beschikbaarheid.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Wrench className="w-5 h-5" />
                    Zoek Loodgieter
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/guide"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                    Meer Tips & Gidsen
                  </Link>
                </div>
              </Card>
            </section>

            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>Over deze gids:</strong> Deze gids wordt onderhouden door VindLoodgieter.nl om u te
                helpen bij het vinden van een betrouwbare loodgieter. Prijzen en informatie zijn indicatief
                en kunnen varieren. Laatste update: {new Date().toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
