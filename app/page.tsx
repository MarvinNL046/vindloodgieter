'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Wrench, Phone, Star, ArrowRight, Users, Award, Clock, Search, ChevronRight, Shield, Droplets, Home, ThermometerSun, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import FAQSection from '@/components/FAQSection';
import { SITE_STATS, getComprehensiveDataText } from '@/lib/stats-config';
import OptimizedAd from '@/components/ads/OptimizedAd';
import MultiplexAd from '@/components/ads/MultiplexAd';
import { AD_SLOTS } from '@/lib/ad-config';

// Unsplash images for plumbing theme
const heroImages = {
  // Professional plumber at work
  main: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1920&q=80',
  // Bathroom renovation
  bathroom: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
  // Kitchen sink
  kitchen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  // Tools
  tools: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80',
  // Water heater/boiler
  heater: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
  // Modern bathroom
  modern1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  modern2: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
  modern3: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80',
  modern4: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  // Work images
  work1: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  work2: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  work3: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
  work4: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80',
};

interface Stats {
  totalFacilities: number;
  totalStates: number;
  totalCities: number;
  totalCounties: number;
}

// Nederlandse provincies
const featuredProvinces = [
  {
    name: 'Noord-Holland',
    slug: 'noord-holland',
    abbr: 'NH',
    highlight: 'Amsterdam, Haarlem, Alkmaar'
  },
  {
    name: 'Zuid-Holland',
    slug: 'zuid-holland',
    abbr: 'ZH',
    highlight: 'Rotterdam, Den Haag, Leiden'
  },
  {
    name: 'Noord-Brabant',
    slug: 'noord-brabant',
    abbr: 'NB',
    highlight: 'Eindhoven, Tilburg, Breda'
  },
  {
    name: 'Gelderland',
    slug: 'gelderland',
    abbr: 'GE',
    highlight: 'Arnhem, Nijmegen, Apeldoorn'
  },
  {
    name: 'Utrecht',
    slug: 'utrecht',
    abbr: 'UT',
    highlight: 'Utrecht, Amersfoort, Zeist'
  },
  {
    name: 'Limburg',
    slug: 'limburg',
    abbr: 'LI',
    highlight: 'Maastricht, Venlo, Heerlen'
  }
];

const serviceCategories = [
  {
    title: 'Spoed Lekkage',
    description: '24/7 beschikbaar voor lekkages, burstpijpen en waterschade',
    icon: AlertTriangle,
    href: '/type/spoed-lekkage',
    color: 'bg-red-100 text-red-700'
  },
  {
    title: 'Sanitair',
    description: 'Installatie en reparatie van toiletten, kranen, douches en wastafels',
    icon: Droplets,
    href: '/type/sanitair',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'CV Installatie',
    description: 'CV-ketel installatie, onderhoud en reparatie door erkende monteurs',
    icon: ThermometerSun,
    href: '/type/cv-installatie',
    color: 'bg-orange-100 text-orange-600'
  }
];

const userTestimonials = [
  {
    name: 'Mark V.',
    location: 'Amsterdam, NH',
    quote: 'Binnen een uur stond er een loodgieter aan de deur voor onze lekkage. Professioneel en snel opgelost. Top service!',
    rating: 5
  },
  {
    name: 'Sandra K.',
    location: 'Rotterdam, ZH',
    quote: 'Via deze website een betrouwbare loodgieter gevonden voor onze badkamer renovatie. Goede prijzen en vakwerk.',
    rating: 5
  },
  {
    name: 'Peter de J.',
    location: 'Eindhoven, NB',
    quote: 'Eindelijk een site waar je makkelijk loodgieters kunt vergelijken. Scheelt veel tijd en geld!',
    rating: 5
  }
];

export default function HomePage() {
  const [stats, setStats] = useState<Stats>({
    totalFacilities: 0,
    totalStates: 0,
    totalCities: 0,
    totalCounties: 0
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load stats from API
    async function loadStats() {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
    loadStats();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[700px] lg:min-h-[800px] overflow-hidden">
        {/* Background Gradient - Blue theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:32px_32px]" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Trust Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm border border-white/20">
                <Shield className="w-4 h-4 text-orange-400" />
                <span>Vertrouwd door 10.000+ huishoudens in Nederland</span>
              </div>
            </div>

            <div className="text-center text-white">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                Vind een Loodgieter
                <span className="block mt-2 bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                  Bij U in de Buurt
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                Direct een betrouwbare loodgieter vinden voor lekkage, sanitair, CV-installatie of badkamer renovatie.
                Vergelijk offertes en reviews van erkende loodgieters in heel Nederland.
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Voer uw postcode of plaatsnaam in..."
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                    />
                  </div>
                  <Button size="lg" type="submit" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40">
                    <Search className="w-5 h-5 mr-2" />
                    Zoek Loodgieter
                  </Button>
                </div>
              </form>

              {/* Quick Links */}
              <div className="flex flex-wrap justify-center gap-3 text-sm mb-12">
                <Link href="/state" className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all text-white border border-white/20 hover:border-white/40">
                  Alle Provincies
                </Link>
                <Link href="/type/spoed-lekkage" className="px-5 py-2.5 bg-red-500/20 backdrop-blur-sm rounded-full hover:bg-red-500/30 transition-all text-red-200 border border-red-400/30 hover:border-red-400/50">
                  Spoed Lekkage
                </Link>
                <Link href="/type/cv-installatie" className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all text-white border border-white/20 hover:border-white/40">
                  CV Installatie
                </Link>
                <Link href="/guide" className="px-5 py-2.5 bg-orange-500/20 backdrop-blur-sm rounded-full hover:bg-orange-500/30 transition-all text-orange-200 border border-orange-400/30 hover:border-orange-400/50">
                  Tips & Advies
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-10">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stats.totalFacilities > 0 ? stats.totalFacilities.toLocaleString('nl-NL') : '2.500+'}
                  </div>
                  <div className="text-sm text-white/70">Loodgieters</div>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">12</div>
                  <div className="text-sm text-white/70">Provincies</div>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-white/70">Spoed Service</div>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-white/70">Gratis Zoeken</div>
                </div>
              </div>

              {/* Emergency Contact Banner */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 font-medium">Spoed Lekkage?</p>
                    <p className="text-xs text-gray-500">Direct een loodgieter nodig</p>
                  </div>
                </div>
                <a
                  href="tel:0900-1234567"
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  0900 - 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
                  <CheckCircle2 className="w-4 h-4" />
                  Betrouwbare Service
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Snel een Goede Loodgieter Vinden
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Of u nu een spoedlekkage heeft, uw CV-ketel onderhouden moet worden of een nieuwe badkamer wilt.
                  Wij helpen u de juiste loodgieter te vinden - snel, betrouwbaar en tegen eerlijke prijzen.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Alleen geverifieerde en erkende loodgieters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Vergelijk reviews, prijzen en beschikbaarheid</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Gratis en vrijblijvend - geen verplichtingen</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/search">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Start Uw Zoekopdracht
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/guide">
                    <Button variant="outline" size="lg" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                      Bekijk Onze Gids
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right - Image Grid */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={heroImages.bathroom}
                        alt="Badkamer renovatie"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={heroImages.kitchen}
                        alt="Keuken sanitair"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={heroImages.tools}
                        alt="Loodgieter gereedschap"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={heroImages.heater}
                        alt="CV ketel installatie"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200/50 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-200/50 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad after intro section */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <OptimizedAd
            slot={AD_SLOTS.home.heroBelow}
            format="horizontal"
            priority={true}
            minHeight={90}
            className="max-w-[728px] mx-auto"
          />
        </div>
      </div>

      {/* Featured Category - Spoed Lekkage */}
      <section className="py-16 bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
                <AlertTriangle className="w-4 h-4" />
                24/7 Beschikbaar
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Spoed Lekkage Service
              </h2>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                Waterlekkage, gesprongen leidingen of overstroming? Onze spoed loodgieters zijn 24/7 beschikbaar
                voor noodgevallen. Snel ter plaatse om schade te beperken.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  Binnen 30-60 minuten ter plaatse
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  Alle soorten lekkages en leidingbreuk
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  Ook in weekenden en feestdagen
                </li>
              </ul>
              <Link href="/type/spoed-lekkage">
                <Button size="lg" className="group bg-white text-red-600 hover:bg-gray-100 shadow-lg">
                  Vind Spoed Loodgieter
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Right - Image Grid */}
            <div className="order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={heroImages.work1}
                      alt="Lekkage reparatie"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={heroImages.work2}
                      alt="Loodgieter aan het werk"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={heroImages.work3}
                      alt="Waterleiding reparatie"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={heroImages.work4}
                      alt="Professionele loodgieter"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-red-500/30 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Provinces */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Loodgieters per Provincie
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vind een loodgieter bij u in de buurt. Selecteer uw provincie of zoek direct op plaatsnaam.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {featuredProvinces.map((province) => (
              <Link key={province.slug} href={`/state/${province.slug}`} className="group">
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <MapPin className="w-6 h-6 text-blue-700 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-mono text-muted-foreground">{province.abbr}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {province.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {province.highlight}
                  </p>
                  <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Bekijk loodgieters
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/state">
              <Button variant="outline" size="lg" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                Alle 12 Provincies
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Category - CV & Sanitair */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.modern1}
                      alt="Moderne badkamer"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.modern2}
                      alt="Sanitair installatie"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.modern3}
                      alt="CV ketel"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.modern4}
                      alt="Badkamer renovatie"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-100 rounded-full blur-2xl" />
            </div>

            {/* Right - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-medium mb-6">
                <ThermometerSun className="w-4 h-4" />
                Erkende Installateurs
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                CV & Sanitair Installatie
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Van CV-ketel onderhoud tot complete badkamer renovatie. Vind erkende installateurs
                voor al uw sanitair en verwarmingswerk. Inclusief warmtepompen en vloerverwarming.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-blue-700" />
                  </div>
                  CV-ketel installatie en onderhoud
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-blue-700" />
                  </div>
                  Badkamer en toilet renovatie
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-blue-700" />
                  </div>
                  Duurzame oplossingen en subsidie advies
                </li>
              </ul>
              <Link href="/type/cv-installatie">
                <Button size="lg" className="group bg-blue-600 hover:bg-blue-700">
                  Vind CV Installateurs
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Onze Diensten
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vind de juiste loodgieter voor uw specifieke klus. Van noodgevallen tot renovaties.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {serviceCategories.map((category) => (
              <Link key={category.href} href={category.href} className="group">
                <Card className="p-8 h-full text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-100">
                  <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/type">
              <Button variant="outline" size="lg" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                Alle Diensten Bekijken
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ad before testimonials */}
      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <OptimizedAd
            slot={AD_SLOTS.home.afterStats}
            format="horizontal"
            lazy={true}
            minHeight={90}
            className="max-w-[728px] mx-auto"
          />
        </div>
      </div>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ervaringen van Klanten
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lees wat anderen zeggen over de loodgieters die zij via ons vonden.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {userTestimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Waarom VindLoodgieter.nl?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-blue-700" />
              </div>
              <h3 className="font-semibold mb-2">Groot Netwerk</h3>
              <p className="text-sm text-muted-foreground">
                Duizenden geverifieerde loodgieters in heel Nederland.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Betrouwbaar</h3>
              <p className="text-sm text-muted-foreground">
                Alleen erkende bedrijven met goede reviews en KvK-registratie.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">100% Gratis</h3>
              <p className="text-sm text-muted-foreground">
                Zoeken, vergelijken en contact opnemen zonder kosten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Multiplex Ad */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <MultiplexAd
            slot={AD_SLOTS.home.beforeFooter}
            title="Gerelateerde Informatie"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Direct een Loodgieter Nodig?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Zoek nu een betrouwbare loodgieter bij u in de buurt. Vergelijk prijzen, lees reviews en neem direct contact op.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/search">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30">
                Vind Loodgieter Nu
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/guide">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Bekijk Onze Tips
              </Button>
            </Link>
          </div>

          {/* Emergency Line */}
          <div className="mt-10 pt-8 border-t border-white/20">
            <p className="text-white/60 mb-2">Spoed lekkage of storing?</p>
            <a href="tel:0900-1234567" className="text-xl font-bold text-orange-300 hover:text-orange-200">
              Bel direct: 0900 - 123 4567
            </a>
            <p className="text-white/60 text-sm mt-1">24/7 bereikbaar voor noodgevallen</p>
          </div>
        </div>
      </section>
    </main>
  );
}
