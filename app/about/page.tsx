import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Wrench, Target, Shield, Clock, ArrowRight, Sparkles, CheckCircle, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import InlineAd from '@/components/ads/InlineAd';

export const metadata: Metadata = {
  title: 'Over Ons | VindLoodgieter.nl',
  description: 'Leer meer over VindLoodgieter.nl, de meest complete gids voor het vinden van loodgieters in Nederland. Betrouwbaar, gratis en onafhankelijk.',
  openGraph: {
    title: 'Over VindLoodgieter.nl',
    description: 'Uw betrouwbare gids voor het vinden van loodgieters in heel Nederland',
  },
};

export default function AboutPage() {
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
              <li className="text-white">Over Ons</li>
            </ol>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Over VindLoodgieter.nl
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            De meest complete en betrouwbare gids voor het vinden van loodgieters in Nederland.
            Wij helpen u snel de juiste vakman te vinden voor elke klus.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="p-8 shadow-soft mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              VindLoodgieter.nl is opgericht om iedereen in Nederland te helpen bij het vinden van
              een betrouwbare loodgieter. Of u nu een spoedlekkage heeft, uw CV-ketel onderhouden moet
              worden of een badkamer wilt renoveren - wij helpen u de juiste vakman te vinden.
            </p>
          </Card>

          <InlineAd />

          {/* Mission Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl font-bold">Onze Missie</h2>
            </div>
            <Card className="p-6 shadow-soft bg-gradient-to-br from-blue-50 to-orange-50/50 border-blue-100">
              <p className="text-muted-foreground leading-relaxed">
                Wij streven ernaar de meest complete en gebruiksvriendelijke bron te zijn voor het
                vinden van loodgieters in Nederland. Of u nu hulp zoekt voor uzelf, uw bedrijf of
                uw huurwoning - wij maken het makkelijk om de juiste professional te vinden.
              </p>
            </Card>
          </section>

          {/* What We Offer Section */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Wat Wij Bieden</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-blue-300 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Uitgebreide Database</h3>
                    <p className="text-sm text-muted-foreground">
                      Duizenden loodgieters met actuele informatie over diensten, tarieven
                      en contactgegevens.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-blue-300 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Wrench className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Geverifieerde Vakmannen</h3>
                    <p className="text-sm text-muted-foreground">
                      Alleen erkende loodgieters met KvK-registratie en goede klantbeoordelingen.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-blue-300 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Altijd Actueel</h3>
                    <p className="text-sm text-muted-foreground">
                      We werken continu aan het bijhouden van contactgegevens, diensten
                      en beschikbaarheid.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-blue-300 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">100% Gratis</h3>
                    <p className="text-sm text-muted-foreground">
                      Zoeken, vergelijken en contact opnemen is volledig gratis en vrijblijvend.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Onze Waarden</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-6 shadow-soft text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Betrouwbaarheid</h3>
                <p className="text-sm text-muted-foreground">
                  Alleen geverifieerde loodgieters met bewezen kwaliteit.
                </p>
              </Card>

              <Card className="p-6 shadow-soft text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Toegankelijkheid</h3>
                <p className="text-sm text-muted-foreground">
                  Informatie moet makkelijk te vinden en begrijpen zijn voor iedereen.
                </p>
              </Card>

              <Card className="p-6 shadow-soft text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Onafhankelijkheid</h3>
                <p className="text-sm text-muted-foreground">
                  Objectieve informatie zonder verborgen belangen.
                </p>
              </Card>
            </div>
          </section>

          <InlineAd />

          {/* Quote Section */}
          <Card className="p-8 shadow-soft bg-gradient-to-r from-blue-50 to-orange-50/30 border-blue-100 mb-16">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-blue-600 shrink-0" />
              <div>
                <p className="text-lg font-medium text-foreground mb-4 italic">
                  &quot;De juiste loodgieter vinden moet eenvoudig zijn - daarom hebben we VindLoodgieter.nl gemaakt&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  - Team VindLoodgieter.nl
                </p>
              </div>
            </div>
          </Card>

          {/* Future Vision Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl font-bold">Toekomstplannen</h2>
            </div>
            <Card className="p-6 shadow-soft">
              <p className="text-muted-foreground mb-6">
                We werken continu aan het verbeteren van onze diensten. In de toekomst plannen we:
              </p>
              <ul className="space-y-3">
                {[
                  'Interactieve kaarten voor betere navigatie',
                  'Directe offerteaanvragen via het platform',
                  'Beoordelingen en reviews van klanten',
                  'Prijsvergelijkingen voor standaard werkzaamheden',
                  'Spoedlijn voor 24/7 noodgevallen',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 text-blue-700" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* Collaboration Section */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Samenwerking</h2>
            <Card className="p-6 shadow-soft">
              <p className="text-muted-foreground mb-4">
                Bent u loodgieter of heeft u een loodgietersbedrijf? We staan altijd open voor samenwerking
                om onze database te verbeteren en uit te breiden.
              </p>
              <p className="text-muted-foreground mb-6">
                Neem gerust contact op via{' '}
                <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                  ons contactformulier
                </Link>{' '}
                of stuur een e-mail naar{' '}
                <a href="mailto:info@vindloodgieter.nl" className="text-blue-600 hover:underline font-medium">
                  info@vindloodgieter.nl
                </a>.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Neem Contact Op
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          </section>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">
              Start Uw Zoekopdracht
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Vind de juiste loodgieter voor uw klus in heel Nederland.
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
