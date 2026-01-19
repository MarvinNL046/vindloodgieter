'use client';

import Link from 'next/link';
import { Wrench, Users, ChevronRight, TrendingUp, MapPin, Clock } from 'lucide-react';

// Loodgieter statistieken
const plumberFacts = [
  {
    stat: '2.500+',
    label: 'Loodgieters',
    description: 'Geregistreerd in heel Nederland'
  },
  {
    stat: '24/7',
    label: 'Spoed Service',
    description: 'Altijd beschikbaar voor noodgevallen'
  },
  {
    stat: '12',
    label: 'Provincies',
    description: 'Landelijke dekking'
  }
];

export default function PlumberStatsWidget() {
  return (
    <section className="bg-gradient-to-br from-blue-600/90 to-blue-700 backdrop-blur-sm rounded-xl p-6 text-white border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-orange-300" />
          <h3 className="font-serif text-lg font-bold">VindLoodgieter.nl</h3>
        </div>
        <TrendingUp className="w-5 h-5 text-blue-300" />
      </div>

      <div className="space-y-3">
        {plumberFacts.map((fact, index) => (
          <div
            key={index}
            className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-2xl text-white">{fact.stat}</p>
                <p className="text-sm text-white/90">{fact.label}</p>
              </div>
            </div>
            <p className="text-xs text-white/70 mt-1">{fact.description}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <Link
          href="/guide"
          className="flex-1 flex items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors"
        >
          Loodgieter Gids
          <ChevronRight className="w-4 h-4" />
        </Link>
        <Link
          href="/search"
          className="flex items-center justify-center gap-1 bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Zoeken
        </Link>
      </div>
    </section>
  );
}
