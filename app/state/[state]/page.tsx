import { Metadata } from 'next';
import Link from 'next/link';
import { getAllStates, getStateBySlug, getFacilitiesByState, createCountySlug, createCitySlug, Facility } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ChevronRight, Building2, ArrowRight, Heart, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import InlineAd from '@/components/ads/InlineAd';
import { AD_SLOTS } from '@/lib/ad-config';

interface PageProps {
  params: Promise<{
    state: string;
  }>;
}

export async function generateStaticParams() {
  const states = await getAllStates();
  return states.map(state => ({
    state: state.slug,
  }));
}

// Revalidate pages every 24 hours
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = await getStateBySlug(stateSlug);

  if (!state) {
    return { title: 'State Not Found' };
  }

  return {
    title: `Loodgieters in ${state.name} | VindLoodgieter.nl`,
    description: `Vind loodgieters en installatiebedrijven in ${state.name}. Bekijk locaties, diensten, reviews en contactgegevens van loodgieters bij u in de buurt.`,
    openGraph: {
      title: `Loodgieters in ${state.name}`,
      description: `Overzicht van alle loodgieters en installatiebedrijven in ${state.name}`,
      type: 'website',
    },
  };
}

export default async function StatePage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const state = await getStateBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  const facilities = await getFacilitiesByState(state.name);

  // Get unique counties with counts
  const countyCounts = facilities.reduce((acc: Record<string, number>, facility: Facility) => {
    if (facility.county) {
      acc[facility.county] = (acc[facility.county] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const counties = Object.entries(countyCounts)
    .map(([county, count]) => ({ county, count }))
    .sort((a, b) => a.county.localeCompare(b.county));

  // Get unique cities with counts
  const cityCounts = facilities.reduce((acc: Record<string, number>, facility: Facility) => {
    if (facility.city) {
      acc[facility.city] = (acc[facility.city] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const cities = Object.entries(cityCounts)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => a.city.localeCompare(b.city));

  const stateAbbr = facilities[0]?.state_abbr || '';

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
        name: state.name,
        item: `https://www.vindloodgieter.nl/provincie/${stateSlug}`
      }
    ]
  };

  // Group counties by first letter
  const countiesByLetter = counties.reduce((acc, { county, count }) => {
    const firstLetter = county[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push({ county, count });
    return acc;
  }, {} as Record<string, Array<{ county: string; count: number }>>);

  // Group cities by first letter (fallback when no county data)
  const citiesByLetter = cities.reduce((acc, { city, count }) => {
    const firstLetter = city[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push({ city, count });
    return acc;
  }, {} as Record<string, Array<{ city: string; count: number }>>);

  // Determine if we should show cities instead of counties
  const showCities = counties.length === 0 && cities.length > 0;

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
                <li><Link href="/state" className="hover:text-white transition-colors">States</Link></li>
                <li>/</li>
                <li className="text-white">{state.name}</li>
              </ol>
            </nav>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Loodgieters in {state.name}
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mb-8">
              Vind loodgieters en installatiebedrijven in {state.name}. Selecteer een gemeente om loodgieters in dat gebied te bekijken.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-3xl font-bold text-coral-300">{facilities.length}</div>
                <div className="text-primary-foreground/70 text-sm">Loodgieters</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-coral-300">{counties.length}</div>
                <div className="text-primary-foreground/70 text-sm">Gemeenten</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-coral-300">{cities.length}</div>
                <div className="text-primary-foreground/70 text-sm">Plaatsen</div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Ad after hero */}
        <div className="container mx-auto px-4 pt-8">
          <LeaderboardAd slot={AD_SLOTS.state.afterHero} />
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-bold mb-2">
                {showCities ? `Plaatsen in ${state.name}` : `Gemeenten in ${state.name}`}
              </h2>
              <p className="text-muted-foreground">
                {showCities
                  ? 'Klik op een plaats om alle loodgieters in dat gebied te bekijken.'
                  : 'Klik op een gemeente om alle loodgieters in dat gebied te bekijken.'}
              </p>
            </div>

            {counties.length > 0 ? (
              <div className="space-y-10">
                {Object.entries(countiesByLetter).map(([letter, countiesInLetter]) => (
                  <div key={letter}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-serif font-bold text-xl">
                        {letter}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {countiesInLetter.length} count{countiesInLetter.length !== 1 ? 'ies' : 'y'}
                      </span>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {countiesInLetter.map(({ county, count }) => (
                        <Link
                          key={county}
                          href={`/county/${createCountySlug(county)}`}
                          className="group"
                        >
                          <Card className="h-full p-4 flex items-center justify-between border-2 border-transparent hover:border-accent/30 transition-all duration-300">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center group-hover:bg-accent transition-colors">
                                <Building2 className="w-5 h-5 text-teal-700 group-hover:text-white transition-colors" />
                              </div>
                              <span className="font-medium group-hover:text-accent transition-colors">
                                {county}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-accent">
                                {count}
                              </span>
                              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : showCities ? (
              <div className="space-y-10">
                {Object.entries(citiesByLetter).map(([letter, citiesInLetter]) => (
                  <div key={letter}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-serif font-bold text-xl">
                        {letter}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {citiesInLetter.length} cit{citiesInLetter.length !== 1 ? 'ies' : 'y'}
                      </span>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {citiesInLetter.map(({ city, count }) => (
                        <Link
                          key={city}
                          href={`/city/${createCitySlug(city)}`}
                          className="group"
                        >
                          <Card className="h-full p-4 flex items-center justify-between border-2 border-transparent hover:border-accent/30 transition-all duration-300">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center group-hover:bg-accent transition-colors">
                                <MapPin className="w-5 h-5 text-teal-700 group-hover:text-white transition-colors" />
                              </div>
                              <span className="font-medium group-hover:text-accent transition-colors">
                                {city}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-accent">
                                {count}
                              </span>
                              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
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
                  Nog geen loodgieters gevonden in {state.name}. We voegen continu nieuwe locaties toe.
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

            {/* Inline Ad before About Section */}
            <div className="mt-12">
              <InlineAd slot={AD_SLOTS.state.inContent} />
            </div>

            {/* About Section */}
            <Card className="mt-16 p-8 bg-gradient-to-r from-teal-50 to-coral-50/30 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-100 dark:border-teal-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 text-teal-700 dark:text-teal-400" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold mb-3">Over loodgieters in {state.name}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    De provincie {state.name} heeft een breed aanbod aan loodgieters en installatiebedrijven.
                    Van spoed loodgieters voor lekkages tot CV-installateurs en sanitair specialisten - er is voor
                    elke klus een vakman beschikbaar. Veel bedrijven bieden 24-uurs service en gratis offertes aan. {state.capital && `De hoofdstad is ${state.capital}.`}
                  </p>
                </div>
              </div>
            </Card>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <h2 className="font-serif text-2xl font-semibold mb-4">
                Op zoek naar een specifieke loodgieter?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Gebruik onze zoekfunctie om loodgieters te vinden op naam, plaats of dienst.
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
    </>
  );
}
