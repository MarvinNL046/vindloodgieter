'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Wat kost een loodgieter per uur?",
    answer: "De kosten van een loodgieter varieren tussen 40 en 75 euro per uur, afhankelijk van de regio en het type werkzaamheden. Voor spoedklussen in avonden en weekenden gelden vaak hogere tarieven (tot 100+ euro per uur). Vraag altijd vooraf om een offerte en vraag naar voorrijkosten en BTW."
  },
  {
    question: "Hoe snel kan een spoed loodgieter er zijn?",
    answer: "Bij spoedgevallen zoals lekkages of verstoppingen kan een loodgieter vaak binnen 30-60 minuten ter plaatse zijn. Dit hangt af van uw locatie en beschikbaarheid. Veel loodgieters bieden 24/7 service aan voor noodgevallen. Bel bij ernstige lekkages direct om waterschade te beperken."
  },
  {
    question: "Wat moet ik doen bij een waterlekkage?",
    answer: "Sluit bij een lekkage direct de hoofdkraan af (vaak bij de watermeter). Zet de stroom uit als er water bij stopcontacten komt. Vang lekwater op met emmers en handdoeken. Maak foto's voor de verzekering. Bel daarna een spoed loodgieter. Let op: waterschade valt vaak onder uw inboedel- of opstalverzekering."
  },
  {
    question: "Hoe vaak moet mijn CV-ketel worden onderhouden?",
    answer: "Een CV-ketel moet jaarlijks worden gecontroleerd en onderhouden door een erkend installateur. Dit verlengt de levensduur, voorkomt storingen en houdt uw ketel veilig en efficient. Veel fabrikanten eisen dit ook voor behoud van garantie. Kosten liggen tussen 80 en 150 euro inclusief kleine onderdelen."
  },
  {
    question: "Wanneer heb ik een erkend installateur nodig?",
    answer: "Voor werkzaamheden aan gasinstallaties is een erkend installateur wettelijk verplicht. Dit geldt voor CV-ketels, gashaarden, geisers en gasleidingen. Bij sanitairwerk is dit niet verplicht, maar wel aan te raden voor garantie en kwaliteit. Erkende installateurs zijn te herkennen aan keurmerken zoals Techniek Nederland of STEK-certificering."
  },
  {
    question: "Hoe vind ik een betrouwbare loodgieter?",
    answer: "Let bij het kiezen van een loodgieter op: KvK-registratie, verzekering, reviews van eerdere klanten, duidelijke prijsopgave vooraf, en eventuele keurmerken. Vraag meerdere offertes aan en vergelijk niet alleen op prijs maar ook op garantievoorwaarden. Via VindLoodgieter.nl vindt u alleen geverifieerde bedrijven met beoordelingen."
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // JSON-LD structured data for FAQ
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

  return (
    <section className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Veelgestelde Vragen</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-4 pt-0">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
