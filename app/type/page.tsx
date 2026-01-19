import { Metadata } from 'next';
import Link from 'next/link';
import { Wrench, Droplets, AlertTriangle, ThermometerSun, Home, Shield, ChevronRight, ArrowRight, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Loodgieter Diensten - Zoek op Type | VindLoodgieter.nl',
  description: 'Vind loodgieters per type dienst: spoed lekkage, sanitair, CV-installatie, riool ontstoppen, badkamer renovatie en meer in heel Nederland.',
  openGraph: {
    title: 'Loodgieter Diensten - Zoek op Type',
    description: 'Vind de juiste loodgieter voor uw specifieke klus.',
  }
};

const categoryIcons: Record<string, any> = {
  'spoed-lekkage': AlertTriangle,
  'sanitair': Droplets,
  'cv-installatie': ThermometerSun,
  'riool-afvoer': Wrench,
  'badkamer': Home,
  'waterleiding': Droplets,
  'gas-warmte': ThermometerSun,
  'ketel-onderhoud': ThermometerSun,
  'vloerverwarming': ThermometerSun,
};

const categories = [
  {
    title: 'Spoed & Noodgevallen',
    description: '24/7 beschikbaar voor urgente problemen',
    types: ['spoed-lekkage', 'lekkage-opsporing', 'wateroverlast', 'leidingbreuk']
  },
  {
    title: 'Sanitair & Installatie',
    description: 'Alles voor badkamer, keuken en toilet',
    types: ['sanitair', 'badkamer', 'toilet-installatie', 'kranen-reparatie']
  },
  {
    title: 'Verwarming & CV',
    description: 'CV-ketel, vloerverwarming en warmtepompen',
    types: ['cv-installatie', 'ketel-onderhoud', 'vloerverwarming', 'warmtepomp']
  },
  {
    title: 'Riool & Afvoer',
    description: 'Ontstoppen, reinigen en inspectie',
    types: ['riool-afvoer', 'afvoer-ontstoppen', 'rioolinspectie', 'vetafscheider']
  },
  {
    title: 'Gas & Installatie',
    description: 'Gasinstallatie door erkende installateurs',
    types: ['gas-warmte', 'gasleiding', 'gaskachel', 'gasmeter']
  },
  {
    title: 'Waterleiding',
    description: 'Aanleg, reparatie en vervanging',
    types: ['waterleiding', 'waterdruk', 'watermeter', 'leidingwerk']
  }
];

// Service type definitions
const serviceTypes: Record<string, { name: string; description: string }> = {
  'spoed-lekkage': {
    name: 'Spoed Lekkage',
    description: '24/7 beschikbaar voor waterlekkages, gesprongen leidingen en overstromingen. Snelle responstijd.'
  },
  'lekkage-opsporing': {
    name: 'Lekkage Opsporing',
    description: 'Professionele detectie van verborgen lekkages met moderne apparatuur.'
  },
  'wateroverlast': {
    name: 'Wateroverlast',
    description: 'Hulp bij wateroverlast door lekkage, overstroming of grondwater.'
  },
  'leidingbreuk': {
    name: 'Leidingbreuk',
    description: 'Spoedservice voor gesprongen of gebarsten waterleidingen.'
  },
  'sanitair': {
    name: 'Sanitair',
    description: 'Installatie en reparatie van alle sanitaire voorzieningen: toiletten, wastafels, kranen en douches.'
  },
  'badkamer': {
    name: 'Badkamer Renovatie',
    description: 'Complete badkamer renovatie inclusief sanitair, tegels en installatie.'
  },
  'toilet-installatie': {
    name: 'Toilet Installatie',
    description: 'Plaatsing en vervanging van toiletten, inbouwreservoirs en spoelmechanismen.'
  },
  'kranen-reparatie': {
    name: 'Kranen Reparatie',
    description: 'Reparatie en vervanging van lekkende of defecte kranen en mengkranen.'
  },
  'cv-installatie': {
    name: 'CV Installatie',
    description: 'CV-ketel installatie, vervanging en aanleg van centrale verwarming.'
  },
  'ketel-onderhoud': {
    name: 'Ketel Onderhoud',
    description: 'Jaarlijks onderhoud van CV-ketels voor optimale werking en veiligheid.'
  },
  'vloerverwarming': {
    name: 'Vloerverwarming',
    description: 'Aanleg en onderhoud van vloerverwarmingssystemen.'
  },
  'warmtepomp': {
    name: 'Warmtepomp',
    description: 'Installatie en onderhoud van warmtepompen voor duurzame verwarming.'
  },
  'riool-afvoer': {
    name: 'Riool & Afvoer',
    description: 'Riool ontstoppen, afvoer reinigen en rioolproblemen verhelpen.'
  },
  'afvoer-ontstoppen': {
    name: 'Afvoer Ontstoppen',
    description: 'Professioneel ontstoppen van verstopte afvoeren, gootstenen en toiletten.'
  },
  'rioolinspectie': {
    name: 'Rioolinspectie',
    description: 'Camera-inspectie van rioleringen om problemen op te sporen.'
  },
  'vetafscheider': {
    name: 'Vetafscheider',
    description: 'Installatie en onderhoud van vetafscheiders voor horeca en industrie.'
  },
  'gas-warmte': {
    name: 'Gas & Warmte',
    description: 'Gasinstallatie en aansluiting van gastoestellen door erkende installateurs.'
  },
  'gasleiding': {
    name: 'Gasleiding',
    description: 'Aanleg, controle en reparatie van gasleidingen.'
  },
  'gaskachel': {
    name: 'Gaskachel',
    description: 'Installatie en onderhoud van gaskachels en gashaarden.'
  },
  'gasmeter': {
    name: 'Gasmeter',
    description: 'Verplaatsing en aansluiting van gasmeters.'
  },
  'waterleiding': {
    name: 'Waterleiding',
    description: 'Aanleg, reparatie en vervanging van waterleidingen.'
  },
  'waterdruk': {
    name: 'Waterdruk Problemen',
    description: 'Diagnose en oplossing van waterdrukproblemen.'
  },
  'watermeter': {
    name: 'Watermeter',
    description: 'Verplaatsing en aansluiting van watermeters.'
  },
  'leidingwerk': {
    name: 'Leidingwerk',
    description: 'Aanleg en renovatie van leidingwerk voor nieuwbouw en verbouwing.'
  },
};

export default function ServiceTypesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-white">Diensten</li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Loodgieter Diensten
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Vind de juiste loodgieter voor uw specifieke klus. Van spoed lekkage tot badkamer renovatie,
            wij helpen u de perfecte vakman te vinden.
          </p>

          {/* Emergency Banner */}
          <div className="mt-8 inline-flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-300" />
              <span className="font-medium">Spoed lekkage?</span>
            </div>
            <Link
              href="/type/spoed-lekkage"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              Vind 24/7 Service
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Services */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
            Populaire Diensten
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {['spoed-lekkage', 'sanitair', 'cv-installatie', 'riool-afvoer', 'badkamer', 'waterleiding'].map((typeSlug) => {
              const type = serviceTypes[typeSlug];
              if (!type) return null;
              const Icon = categoryIcons[typeSlug] || Wrench;

              return (
                <Link key={typeSlug} href={`/type/${typeSlug}`} className="group">
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full border-2 border-transparent hover:border-blue-300">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        typeSlug === 'spoed-lekkage' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      } group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-semibold text-lg text-foreground mb-2 group-hover:text-blue-600 transition-colors">
                          {type.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {type.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Vind loodgieters
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Categories */}
        {categories.map((category) => (
          <section key={category.title} className="mb-12">
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {category.title}
              </h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.types.map((typeSlug) => {
                const type = serviceTypes[typeSlug];
                if (!type) return null;
                const Icon = categoryIcons[typeSlug] || Wrench;

                return (
                  <Link key={typeSlug} href={`/type/${typeSlug}`} className="group">
                    <Card className="p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full border-2 border-transparent hover:border-blue-200">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          typeSlug === 'spoed-lekkage' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground mb-1 group-hover:text-blue-600 transition-colors">
                            {type.name}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {type.description.substring(0, 80)}...
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* Full List */}
        <section className="mt-12 bg-blue-50 rounded-xl p-8">
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">
            Alle Diensten
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(serviceTypes).map(([slug, type]) => (
              <Link
                key={slug}
                href={`/type/${slug}`}
                className="px-4 py-2 bg-white rounded-full text-sm hover:bg-blue-600 hover:text-white transition-colors border border-blue-100 hover:border-blue-600"
              >
                {type.name}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="font-serif text-2xl font-semibold mb-4">
            Niet zeker welke dienst u nodig heeft?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Gebruik onze zoekfunctie om loodgieters te vinden op basis van uw locatie of specifieke probleem.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Zoek Loodgieters
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
