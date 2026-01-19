'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Loodgieter-related guide keywords
const guideKeywords = [
  'lekkage',
  'riool',
  'cv',
  'verwarming',
  'sanitair',
  'badkamer',
  'loodgieter',
  'installateur',
  'waterleiding',
  'afvoer',
  'kraan',
  'toilet',
  'douche',
  'boiler',
  'warmtepomp',
  'vloerverwarming',
  'ontstopping',
  'gasleiding'
];

interface Guide {
  slug: string;
  title: string;
  excerpt?: string;
  description?: string;
}

interface RelatedGuidesProps {
  currentSlug?: string;
  category?: string;
  limit?: number;
  className?: string;
}

// Static guide data for loodgieter-related content
const staticGuides: Guide[] = [
  {
    slug: 'de-juiste-loodgieter-kiezen',
    title: 'De Juiste Loodgieter Kiezen: Een Complete Gids',
    excerpt: 'Tips en advies voor het selecteren van een betrouwbare loodgieter voor uw project.',
  },
  {
    slug: 'cv-ketel-onderhoud',
    title: 'CV-ketel Onderhoud: Wat U Moet Weten',
    excerpt: 'Alles over het onderhoud van uw CV-ketel, van jaarlijkse controles tot storingen.',
  },
  {
    slug: 'lekkage-voorkomen',
    title: 'Lekkages Voorkomen: Preventietips',
    excerpt: 'Hoe u waterlekkages kunt voorkomen en wat te doen bij een lekkage.',
  },
  {
    slug: 'badkamer-renovatie-planning',
    title: 'Badkamerrenovatie Plannen: Stap voor Stap',
    excerpt: 'Een praktische gids voor het plannen van uw badkamerrenovatie.',
  },
  {
    slug: 'kosten-loodgieter',
    title: 'Loodgieter Kosten: Tarieven en Prijzen',
    excerpt: 'Wat kost een loodgieter? Overzicht van tarieven voor verschillende werkzaamheden.',
  },
  {
    slug: 'spoed-loodgieter-bellen',
    title: 'Wanneer Een Spoed Loodgieter Bellen?',
    excerpt: 'In welke situaties heeft u direct een loodgieter nodig en wat kost spoedservice?',
  },
  {
    slug: 'riool-verstopt',
    title: 'Verstopt Riool: Oorzaken en Oplossingen',
    excerpt: 'Wat te doen bij een verstopt riool en wanneer professionele hulp nodig is.',
  },
  {
    slug: 'duurzame-verwarming',
    title: 'Duurzame Verwarmingsopties voor Uw Woning',
    excerpt: 'Overzicht van warmtepompen, vloerverwarming en andere duurzame verwarmingssystemen.',
  },
];

export default function RelatedGuides({
  currentSlug,
  category,
  limit = 4,
  className = ''
}: RelatedGuidesProps) {
  // Filter out current guide and limit results
  const guides = staticGuides
    .filter(guide => guide.slug !== currentSlug)
    .slice(0, limit);

  if (guides.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent" />
          Gerelateerde Gidsen
        </h3>
        <Link
          href="/gids"
          className="text-sm text-accent hover:text-accent/80 flex items-center gap-1"
        >
          Bekijk alle gidsen
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/gids/${guide.slug}`}
            className="group"
          >
            <Card className="h-full hover:shadow-hover transition-all duration-300 border-2 border-transparent hover:border-accent/30">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-base group-hover:text-accent transition-colors line-clamp-2">
                  {guide.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {guide.excerpt || guide.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
