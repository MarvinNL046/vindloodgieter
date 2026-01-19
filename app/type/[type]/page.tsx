import { Metadata } from 'next';
import Link from 'next/link';
import { getAllFacilityTypes, getFacilitiesByFacilityType, getFacilityTypeBySlug, FacilityType, Facility } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Building, MapPin, ChevronRight, ArrowRight, Clock, Shield, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

const typeDescriptions: Record<string, string> = {
  'spoed-loodgieter': 'Spoed loodgieters zijn 24/7 beschikbaar voor noodgevallen zoals lekkages, verstoppingen en gesprongen leidingen. Ze kunnen meestal binnen 30-60 minuten ter plaatse zijn.',
  'cv-installatie': 'CV-installateurs zijn gespecialiseerd in de installatie, het onderhoud en de reparatie van centrale verwarmingssystemen en CV-ketels.',
  'sanitair': 'Sanitair installateurs verzorgen de installatie en reparatie van wastafels, toiletten, douches, badkuipen en alle bijbehorende leidingwerk.',
  'riool-ontstopping': 'Rioolspecialisten helpen bij verstopte riolen en afvoeren. Ze beschikken over professionele apparatuur zoals hogedrukspuiten en camera-inspectie.',
  'lekkage-opsporing': 'Lekkage-opsporingsdiensten gebruiken geavanceerde technologie om verborgen lekkages te detecteren zonder onnodige breekwerkzaamheden.',
  'badkamer-renovatie': 'Badkamerspecialisten verzorgen complete badkamerrenovaties, van ontwerp en installatie tot het eindresultaat.',
  'vloerverwarming': 'Vloerverwarmingsinstallateurs zijn gespecialiseerd in de aanleg en het onderhoud van vloerverwarmingssystemen.',
  'warmtepomp': 'Warmtepompinstallateurs adviseren over en installeren duurzame verwarmingsoplossingen zoals lucht-water en bodem-water warmtepompen.',
  'gasleiding': 'Gasleidinginstallateurs zijn gecertificeerd voor werkzaamheden aan gasleidingen en gastoestellen. Veiligheid staat hierbij voorop.',
  'waterleiding': 'Waterleidingspecialisten verzorgen de aanleg, reparatie en vervanging van waterleidingen in woningen en bedrijfspanden.',
  'boiler': 'Boilerspecialisten installeren en onderhouden warmwaterboilers en -systemen voor optimaal comfort.',
  'duurzaam': 'Duurzame installateurs adviseren over en installeren milieuvriendelijke oplossingen zoals zonneboilers, warmtepompen en energiezuinige systemen.',
};

export async function generateStaticParams() {
  const types = await getAllFacilityTypes();
  return types.map(type => ({
    type: type.slug,
  }));
}

// Revalidate pages every 24 hours
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type: typeSlug } = await params;
  const type = await getFacilityTypeBySlug(typeSlug);

  if (!type) {
    return { title: 'Dienst Type Niet Gevonden' };
  }

  return {
    title: `${type.name} in Nederland | VindLoodgieter.nl`,
    description: `Vind ${type.name.toLowerCase()} in heel Nederland. Bekijk locaties, diensten en contactgegevens.`,
    openGraph: {
      title: `${type.name} in Nederland`,
      description: `Alle ${type.name.toLowerCase()} in Nederland`,
      type: 'website',
    },
  };
}

export default async function TypePage({ params }: PageProps) {
  const { type: typeSlug } = await params;
  const type = await getFacilityTypeBySlug(typeSlug);

  if (!type) {
    notFound();
  }

  const facilities = await getFacilitiesByFacilityType(type.slug);
  const description = typeDescriptions[typeSlug] || type.description;

  // Group by province
  const facilitiesByProvince = facilities.reduce((acc, facility) => {
    const province = facility.state || 'Onbekend';
    if (!acc[province]) {
      acc[province] = [];
    }
    acc[province].push(facility);
    return acc;
  }, {} as Record<string, Facility[]>);

  const provinceCount = Object.keys(facilitiesByProvince).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-primary-foreground/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/diensten" className="hover:text-white transition-colors">Diensten</Link></li>
              <li>/</li>
              <li className="text-white">{type.name}</li>
            </ol>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            {type.name} in Nederland
          </h1>

          {description && (
            <p className="text-primary-foreground/80 text-lg max-w-3xl mb-8">
              {description}
            </p>
          )}

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            <div>
              <div className="text-3xl font-bold text-coral-300">{facilities.length}</div>
              <div className="text-primary-foreground/70 text-sm">Loodgieters</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-coral-300">{provinceCount}</div>
              <div className="text-primary-foreground/70 text-sm">Provincies</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {facilities.length > 0 ? (
            <div className="space-y-12">
              {Object.entries(facilitiesByProvince)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([province, provinceFacilities]) => (
                  <div key={province}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl font-bold">{province}</h2>
                        <p className="text-sm text-muted-foreground">
                          {provinceFacilities.length} {provinceFacilities.length !== 1 ? 'loodgieters' : 'loodgieter'}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {provinceFacilities.map((facility) => (
                        <Link
                          key={facility.slug}
                          href={`/loodgieter/${facility.slug}`}
                          className="group"
                        >
                          <Card className="h-full p-4 border-2 border-transparent hover:border-accent/30 transition-all duration-300">
                            <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">
                              {facility.name}
                            </h3>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p className="flex items-center gap-2">
                                <Building className="w-4 h-4 text-teal-600" />
                                <span>{facility.city}{facility.county ? `, gemeente ${facility.county}` : ''}</span>
                              </p>
                              {facility.phone && (
                                <p className="text-xs">{facility.phone}</p>
                              )}
                            </div>
                            <div className="mt-3 flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                              Bekijken
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                Nog geen {type.name.toLowerCase()} gevonden. We voegen continu nieuwe locaties toe.
              </p>
              <Link
                href="/zoeken"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Zoek Alle Loodgieters
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          )}

          {/* Info Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Card className="p-6 shadow-soft">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-teal-700" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">24/7 Service</h3>
              <p className="text-sm text-muted-foreground">
                Veel loodgieters bieden 24-uurs spoedservice.
                Bel direct voor hulp bij noodgevallen zoals lekkages.
              </p>
            </Card>
            <Card className="p-6 shadow-soft">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Info className="w-5 h-5 text-teal-700" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Gratis Offerte</h3>
              <p className="text-sm text-muted-foreground">
                De meeste loodgieters bieden gratis offertes aan.
                Vraag altijd vooraf naar kosten en voorrijkosten.
              </p>
            </Card>
            <Card className="p-6 shadow-soft">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-teal-700" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Erkende Vakmannen</h3>
              <p className="text-sm text-muted-foreground">
                Kies voor erkende installateurs met goede reviews
                en vraag naar certificeringen en garanties.
              </p>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">
              Op zoek naar een specifieke loodgieter?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Gebruik onze zoekfunctie om loodgieters te vinden op naam, locatie of dienst.
            </p>
            <Link
              href="/zoeken"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Zoek Loodgieters
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
