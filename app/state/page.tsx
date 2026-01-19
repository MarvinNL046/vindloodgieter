import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ChevronRight, Wrench, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getAllStates, getAllFacilities, State, Facility } from '@/lib/data';
import { getStatesComingSoonText } from '@/lib/stats-config';

export const metadata: Metadata = {
  title: 'Loodgieters per Provincie | VindLoodgieter.nl',
  description: 'Vind loodgieters in alle Nederlandse provincies. Zoek op provincie om lokale loodgieters te vinden voor lekkage, sanitair, CV-installatie en meer.',
  openGraph: {
    title: 'Loodgieters per Provincie | VindLoodgieter.nl',
    description: 'Vind loodgieters in alle Nederlandse provincies.',
    url: 'https://vindloodgieter.nl/state',
  }
};

// Revalidate every 24 hours
export const revalidate = 86400;

export default async function StatesPage() {
  const [statesData, facilitiesData] = await Promise.all([
    getAllStates(),
    getAllFacilities()
  ]);
  const facilities = facilitiesData;

  // Get facility count for each state
  const statesWithCounts = statesData.map((state) => {
    const stateFacilities = facilities.filter((c: Facility) =>
      c.state === state.abbr || c.state === state.name || c.state_abbr === state.abbr
    );
    const uniqueCounties = [...new Set(stateFacilities.map(c => c.county).filter(Boolean))];
    const uniqueCities = [...new Set(stateFacilities.map(c => c.city).filter(Boolean))];

    return {
      ...state,
      facilityCount: stateFacilities.length,
      countyCount: uniqueCounties.length,
      cityCount: uniqueCities.length,
    };
  });

  // Sort by facility count (states with data first) then alphabetically
  const sortedStates = statesWithCounts.sort((a, b) => {
    if (b.facilityCount !== a.facilityCount) {
      return b.facilityCount - a.facilityCount;
    }
    return a.name.localeCompare(b.name);
  });

  const activeStates = sortedStates.filter(s => s.facilityCount > 0);
  const pendingStates = sortedStates.filter(s => s.facilityCount === 0);
  const totalFacilities = activeStates.reduce((sum, s) => sum + s.facilityCount, 0);
  const totalCounties = activeStates.reduce((sum, s) => sum + s.countyCount, 0);

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
              <li className="text-white">Provincies</li>
            </ol>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Loodgieters per Provincie
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Vind loodgieters in alle 12 Nederlandse provincies. Selecteer een provincie om lokale
            loodgieters te vinden voor spoed lekkage, sanitair, CV-installatie en badkamer renovatie.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold text-orange-300">{statesData.length}</div>
              <div className="text-white/70 text-sm">Provincies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-300">{totalFacilities.toLocaleString('nl-NL')}</div>
              <div className="text-white/70 text-sm">Loodgieters</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-300">{totalCounties.toLocaleString('nl-NL')}</div>
              <div className="text-white/70 text-sm">Gemeenten</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Active States Grid */}
          {activeStates.length > 0 && (
            <>
              <h2 className="font-serif text-2xl font-semibold mb-6">
                Provincies met Loodgieters
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                {activeStates.map((state) => (
                  <Link
                    key={state.abbr}
                    href={`/state/${state.slug}`}
                    className="group"
                  >
                    <Card className="h-full p-6 border-2 border-transparent hover:border-blue-300 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <MapPin className="w-6 h-6 text-blue-700 group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">{state.abbr}</span>
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                          </div>
                        </div>
                      </div>

                      <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                        {state.name}
                      </h3>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Loodgieters</span>
                          <span className="font-semibold text-blue-600">{state.facilityCount.toLocaleString('nl-NL')}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Gemeenten</span>
                          <span className="font-medium">{state.countyCount}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Plaatsen</span>
                          <span className="font-medium">{state.cityCount}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Bekijk loodgieters
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* All States Grid */}
          <h2 className="font-serif text-2xl font-semibold mb-6">
            {activeStates.length > 0 ? 'Alle Provincies' : 'Zoek per Provincie'}
          </h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {sortedStates.map((state) => (
              <Link
                key={state.abbr}
                href={`/state/${state.slug}`}
                className={`group p-4 rounded-lg border transition-all ${
                  state.facilityCount > 0
                    ? 'hover:border-blue-300 hover:bg-blue-50'
                    : 'border-dashed opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium group-hover:text-blue-600 transition-colors">
                      {state.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {state.facilityCount > 0
                        ? `${state.facilityCount} loodgieters`
                        : 'Binnenkort'
                      }
                    </div>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{state.abbr}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon Section */}
          {pendingStates.length > 0 && activeStates.length > 0 && (
            <div className="mt-16">
              <Card className="p-8 bg-secondary/30 border-dashed">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Wrench className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-semibold mb-2">Meer Provincies Binnenkort</h2>
                    <p className="text-muted-foreground mb-3">
                      {getStatesComingSoonText()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We zijn data aan het toevoegen voor {pendingStates.length} provincies waaronder {pendingStates.slice(0, 3).map(s => s.name).join(', ')}.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">
              Niet zeker waar te zoeken?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Gebruik onze zoekfunctie om loodgieters te vinden op naam, plaats, postcode of type dienst.
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
    </div>
  );
}
