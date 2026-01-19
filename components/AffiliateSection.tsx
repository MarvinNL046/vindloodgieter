import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Phone, Shield, Wrench } from 'lucide-react';

interface AffiliatePartner {
  name: string;
  description: string;
  icon: React.ReactNode;
  ctaText: string;
  href: string;
  tag?: string;
}

const partners: AffiliatePartner[] = [
  {
    name: 'Gratis Offertes',
    description: 'Ontvang vrijblijvend offertes van meerdere loodgieters bij u in de buurt',
    icon: <Shield className="w-6 h-6" />,
    ctaText: 'Offerte aanvragen',
    href: '/offerte',
    tag: 'Gratis'
  },
  {
    name: 'Spoed Service',
    description: 'Direct hulp nodig? Bel onze 24/7 spoedlijn voor snelle hulp bij lekkages',
    icon: <Phone className="w-6 h-6" />,
    ctaText: 'Bel nu',
    href: 'tel:0800-1234',
    tag: '24/7'
  },
  {
    name: 'Loodgieter Tips',
    description: 'Handige gidsen en tips voor het kiezen van de juiste loodgieter',
    icon: <Wrench className="w-6 h-6" />,
    ctaText: 'Lees meer',
    href: '/guide',
  }
];

export default function AffiliateSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">Hulp Nodig?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Wij helpen u graag bij het vinden van de juiste loodgieter.
            Gebruik deze handige tools om snel geholpen te worden.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  {partner.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{partner.name}</h3>
                  {partner.tag && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {partner.tag}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {partner.description}
              </p>

              <Button
                variant="outline"
                className="w-full group"
                asChild
              >
                <Link href={partner.href} target={partner.href.startsWith('tel:') ? undefined : '_blank'} rel="noopener noreferrer">
                  {partner.ctaText}
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Alle loodgieters op VindLoodgieter.nl zijn geverifieerd. Bij spoed, bel direct een loodgieter.
          </p>
        </div>
      </div>
    </section>
  );
}
