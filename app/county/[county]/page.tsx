import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCounties, getFacilitiesByCounty, createCountySlug, createCitySlug, createStateSlug, Facility } from '@/lib/data';
import { notFound } from 'next/navigation';
import { MapPin, Building2, Wrench, Users, Calendar, ChevronRight, ArrowRight, Lightbulb } from 'lucide-react';
import FacilityCard from '@/components/FacilityCard';
import SidebarAd from '@/components/ads/SidebarAd';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import InlineAd from '@/components/ads/InlineAd';
import { AD_SLOTS } from '@/lib/ad-config';
import { Card } from '@/components/ui/card';

interface PageProps {
  params: Promise<{
    county: string;
  }>;
}

// Limit static generation to top 200 counties to stay under Vercel's 75MB limit
export async function generateStaticParams() {
  const counties = await getAllCounties();
  return counties.slice(0, 200).map(county => ({
    county: createCountySlug(county),
  }));
}

// Allow dynamic params for counties not in static params
export const dynamicParams = true;

// Revalidate pages every 24 hours
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { county: countySlug } = await params;
  const counties = await getAllCounties();
  const matchedCounty = counties.find(
    c => createCountySlug(c) === countySlug
  );

  if (!matchedCounty) {
    return {
      title: 'Gemeente niet gevonden',
      description: 'De gevraagde gemeente kon niet worden gevonden.',
    };
  }

  return {
    title: `Loodgieters in gemeente ${matchedCounty} | VindLoodgieter.nl`,
    description: `Vind alle loodgieters en installatiebedrijven in gemeente ${matchedCounty}. Bekijk bedrijven, diensten, reviews en contactgegevens.`,
    openGraph: {
      title: `Loodgieters in gemeente ${matchedCounty}`,
      description: `Overzicht van alle loodgieters in gemeente ${matchedCounty}`,
      type: 'website',
    },
  };
}

export default async function CountyPage({ params }: PageProps) {
  const { county: countySlug } = await params;
  const counties = await getAllCounties();
  const matchedCounty = counties.find(
    c => createCountySlug(c) === countySlug
  );

  if (!matchedCounty) {
    notFound();
  }

  const facilities = await getFacilitiesByCounty(matchedCounty);

  if (facilities.length === 0) {
    notFound();
  }

  const state = facilities[0]?.state || '';
  const stateAbbr = facilities[0]?.state_abbr || '';

  // Get unique cities
  const cities = [...new Set(facilities.map((f: Facility) => f.city).filter(Boolean))].sort();

  // Calculate statistics
  const stats = {
    total: facilities.length,
    spoedService: facilities.filter((f: Facility) => f.facility_types?.some((type: string) => type.toLowerCase().includes('spoed'))).length,
    cvInstallatie: facilities.filter((f: Facility) => f.facility_types?.some((type: string) => type.toLowerCase().includes('cv') || type.toLowerCase().includes('verwarming'))).length,
    sanitair: facilities.filter((f: Facility) => f.facility_types?.some((type: string) => type.toLowerCase().includes('sanitair') || type.toLowerCase().includes('badkamer'))).length,
    riool: facilities.filter((f: Facility) => f.treatment_types?.some((type: string) => type.toLowerCase().includes('riool') || type.toLowerCase().includes('ontstopping'))).length,
  };

  // Breadcrumb structured data
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.vindloodgieter.nl'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: state,
        item: `https://www.vindloodgieter.nl/provincie/${createStateSlug(state)}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Gemeente ${matchedCounty}`,
        item: `https://www.vindloodgieter.nl/gemeente/${countySlug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-primary-foreground/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li>/</li>
                <li>
                  <Link
                    href={`/provincie/${createStateSlug(state)}`}
                    className="hover:text-white transition-colors"
                  >
                    {state}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white">Gemeente {matchedCounty}</li>
              </ol>
            </nav>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Loodgieters in gemeente {matchedCounty}
            </h1>

            {/* Author byline */}
            <div className="flex items-center gap-4 text-sm text-primary-foreground/70 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-semibold">VL</span>
                </div>
                <span>Door VindLoodgieter.nl</span>
              </div>
              <span>-</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-3xl font-bold text-coral-300">{stats.total}</div>
                <div className="text-primary-foreground/70 text-sm">Loodgieters</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-coral-300">{cities.length}</div>
                <div className="text-primary-foreground/70 text-sm">Plaatsen</div>
              </div>
              {stats.spoedService > 0 && (
                <div>
                  <div className="text-3xl font-bold text-coral-300">{stats.spoedService}</div>
                  <div className="text-primary-foreground/70 text-sm">Spoed Service</div>
                </div>
              )}
              {stats.cvInstallatie > 0 && (
                <div>
                  <div className="text-3xl font-bold text-coral-300">{stats.cvInstallatie}</div>
                  <div className="text-primary-foreground/70 text-sm">CV Installateurs</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leaderboard Ad after hero */}
        <div className="container mx-auto px-4 pt-8">
          <LeaderboardAd slot={AD_SLOTS.county.afterHero} />
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tips Section */}
              <Card className="p-6 bg-gradient-to-r from-teal-50 to-coral-50/30 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-100 dark:border-teal-800">
                <h2 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  Tips voor het kiezen van een loodgieter
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Vergelijk meerdere loodgieters om de beste prijs-kwaliteitverhouding te vinden</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Vraag altijd vooraf een offerte en check of er voorrijkosten zijn</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Kies bij voorkeur een erkend installateur met goede reviews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Bij spoed: let op 24-uurs service en reactietijd</span>
                  </li>
                </ul>
              </Card>

              {/* Service Type Cards */}
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-6">Soorten loodgietersdiensten</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-5 hover:shadow-hover transition-all duration-300 border-2 border-transparent hover:border-accent/30">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                      <Building2 className="w-5 h-5 text-teal-700" />
                    </div>
                    <h3 className="font-semibold mb-2">Spoed Loodgieter</h3>
                    <p className="text-sm text-muted-foreground">
                      24/7 beschikbaar voor noodgevallen zoals lekkages, verstoppingen en gesprongen leidingen.
                    </p>
                  </Card>
                  <Card className="p-5 hover:shadow-hover transition-all duration-300 border-2 border-transparent hover:border-accent/30">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                      <Wrench className="w-5 h-5 text-teal-700" />
                    </div>
                    <h3 className="font-semibold mb-2">CV Installatie</h3>
                    <p className="text-sm text-muted-foreground">
                      Installatie, onderhoud en reparatie van CV-ketels en verwarmingssystemen.
                    </p>
                  </Card>
                  <Card className="p-5 hover:shadow-hover transition-all duration-300 border-2 border-transparent hover:border-accent/30">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                      <Users className="w-5 h-5 text-teal-700" />
                    </div>
                    <h3 className="font-semibold mb-2">Sanitair & Badkamer</h3>
                    <p className="text-sm text-muted-foreground">
                      Installatie en renovatie van badkamers, toiletten, kranen en sanitair.
                    </p>
                  </Card>
                </div>
              </div>

              {/* All Facilities */}
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-6">
                  Alle {facilities.length} {facilities.length !== 1 ? 'loodgieters' : 'loodgieter'}
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {facilities.map((facility: Facility) => (
                    <FacilityCard key={facility.slug} facility={facility} />
                  ))}
                </div>
              </div>

              {/* Inline Ad */}
              <div className="my-8">
                <InlineAd slot={AD_SLOTS.county.inContent} />
              </div>

              {/* Cities Grid */}
              {cities.length > 1 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-6">Loodgieters per plaats</h2>
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                    {cities.map((city) => {
                      const cityFacilities = facilities.filter((f: Facility) => f.city === city);
                      return (
                        <Link
                          key={city}
                          href={`/plaats/${createCitySlug(city)}`}
                          className="group"
                        >
                          <Card className="h-full p-4 border-2 border-transparent hover:border-accent/30 transition-all duration-300">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors">
                                <MapPin className="w-5 h-5 text-teal-700 group-hover:text-white transition-colors" />
                              </div>
                              <div>
                                <h3 className="font-semibold group-hover:text-accent transition-colors">
                                  {city}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {cityFacilities.length} {cityFacilities.length !== 1 ? 'loodgieters' : 'loodgieter'}
                                </p>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Informational Content */}
              <Card className="p-6">
                <h2 className="font-serif text-2xl font-semibold mb-4">Loodgieter vinden in gemeente {matchedCounty}</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    In gemeente {matchedCounty}, {state} vindt u {stats.total} {stats.total !== 1 ? 'loodgieters' : 'loodgieter'},
                    waaronder {stats.spoedService > 0 ? `${stats.spoedService} met spoed service` : ''}
                    {stats.cvInstallatie > 0 ? `, ${stats.cvInstallatie} CV ${stats.cvInstallatie !== 1 ? 'installateurs' : 'installateur'}` : ''}
                    {stats.sanitair > 0 ? `, en ${stats.sanitair} gespecialiseerd in sanitair` : ''}.
                    Elk bedrijf biedt verschillende diensten en specialisaties.
                  </p>

                  <h3 className="font-serif text-xl font-semibold text-foreground mt-6 mb-3">De juiste loodgieter kiezen</h3>
                  <p>
                    Bij het selecteren van een loodgieter zijn verschillende factoren belangrijk:
                    de beschikbaarheid (vooral bij spoed), prijstransparantie en offertes vooraf,
                    vakmanschap en certificeringen, en reviews van eerdere klanten.
                    Veel loodgieters in gemeente {matchedCounty} bieden gratis offertes en zijn gespecialiseerd in specifieke diensten.
                  </p>

                  <h3 className="font-serif text-xl font-semibold text-foreground mt-6 mb-3">Direct hulp nodig?</h3>
                  <p>
                    Bij een lekkage of ander loodgietersprobleem is snel handelen belangrijk.
                    Neem direct contact op met een van de loodgieters op deze pagina voor hulp en advies.
                    Veel bedrijven bieden 24-uurs spoedservice voor noodgevallen.
                  </p>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Links */}
              <Card className="p-6 shadow-soft">
                <h3 className="font-serif text-lg font-semibold mb-4">Gerelateerde paginas</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={`/provincie/${createStateSlug(state)}`}
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Alle loodgieters in {state}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dienst/spoed-loodgieter"
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Spoed Loodgieters
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dienst/cv-installatie"
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      CV Installateurs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/zoeken"
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Zoek loodgieters
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/gids"
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Loodgieter gids
                    </Link>
                  </li>
                </ul>
              </Card>

              {/* Contact Info */}
              <Card className="p-6 shadow-soft bg-gradient-to-br from-teal-50 to-coral-50/50 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-200 dark:border-teal-800">
                <h3 className="font-serif text-lg font-semibold mb-3">Hulp nodig?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Wij helpen u de juiste loodgieter te vinden in gemeente {matchedCounty}.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
                >
                  Neem contact op
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>

              {/* Sidebar Ad */}
              <SidebarAd />

              {/* Province Stats */}
              <Card className="p-6 shadow-soft">
                <h3 className="font-serif text-lg font-semibold mb-4">Over {state}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Gemeente {matchedCounty} ligt in {state}. Bekijk alle loodgieters
                  in deze provincie voor meer opties.
                </p>
                <Link
                  href={`/provincie/${createStateSlug(state)}`}
                  className="text-accent hover:text-accent/80 text-sm font-medium flex items-center gap-1"
                >
                  Bekijk {state}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
