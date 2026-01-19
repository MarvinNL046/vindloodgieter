import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import InlineAd from '@/components/ads/InlineAd';
import PremiumContentBanner from '@/components/PremiumContentBanner';
import { blogPosts, categories } from '@/lib/blog-data';
import { getCtaStatsText } from '@/lib/stats-config';

const ctaStatsText = getCtaStatsText();

// Placeholder images for blog posts (plumber/maintenance themed)
const blogImages = [
  '/images/blog/lekkage.jpg',
  '/images/blog/cv-ketel.jpg',
  '/images/blog/badkamer.jpg',
  '/images/blog/loodgieter-werk.jpg',
  '/images/blog/sanitair.jpg',
  '/images/blog/waterleiding.jpg',
  '/images/blog/riool.jpg',
  '/images/blog/verwarming.jpg',
];

// Helper function to get a placeholder image based on post index
function getPlaceholderImage(index: number): string {
  return blogImages[index % blogImages.length];
}

export const metadata: Metadata = {
  title: 'Blog | VindLoodgieter.nl - Tips & Advies over Loodgieterswerk',
  description: 'Handige artikelen over loodgieterswerk, CV-onderhoud, badkamerrenovatie, lekkages verhelpen en tips om kosten te besparen.',
  keywords: 'loodgieter tips, cv ketel onderhoud, lekkage oplossen, badkamer renovatie, sanitair advies, riool ontstoppen, waterleiding',
  authors: [{ name: 'VindLoodgieter.nl' }],
  openGraph: {
    title: 'Blog - VindLoodgieter.nl',
    description: 'Tips en advies over loodgieterswerk, onderhoud en renovatie',
    type: 'website',
    siteName: 'VindLoodgieter.nl',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - VindLoodgieter.nl',
    description: 'Tips en advies over loodgieterswerk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <LeaderboardAd />

      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-primary-foreground/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-white">Blog</li>
            </ol>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Tips & Advies
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Handige tips, adviezen en handleidingen voor al uw loodgietersvragen.
            Van lekkages oplossen tot badkamerrenovatie.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold text-orange-300">{blogPosts.length}</div>
              <div className="text-primary-foreground/70 text-sm">Artikelen</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-300">{categories.length}</div>
              <div className="text-primary-foreground/70 text-sm">Categorieen</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Card className="p-6 shadow-soft sticky top-4">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-orange-500" />
                  <h3 className="font-semibold">Categorieen</h3>
                </div>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button className="text-sm text-muted-foreground hover:text-blue-600 transition-colors flex justify-between w-full group">
                        <span className="group-hover:translate-x-1 transition-transform">{category.name}</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Blog posts */}
            <div className="lg:col-span-3 space-y-8 order-1 lg:order-2">
              {/* Featured post */}
              <Card className="overflow-hidden shadow-soft border-2 border-transparent hover:border-blue-500/30 transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative bg-muted aspect-video md:aspect-auto">
                    <img
                      src={blogPosts[0].image || getPlaceholderImage(0)}
                      alt={blogPosts[0].title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                        UITGELICHT
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <span className="text-xs text-blue-600 font-medium mb-2">{blogPosts[0].category}</span>
                    <h2 className="text-2xl font-bold mb-3">
                      <Link href={`/blog/${blogPosts[0].slug}`} className="hover:text-blue-600 transition-colors">
                        {blogPosts[0].title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground mb-4">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(blogPosts[0].date).toLocaleDateString('nl-NL')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blogPosts[0].readTime}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${blogPosts[0].slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
                    >
                      Lees artikel
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Card>

              <InlineAd />

              {/* Regular posts grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {blogPosts.slice(1).map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden shadow-soft border-2 border-transparent hover:border-blue-500/30 transition-all duration-300 group"
                  >
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={post.image || getPlaceholderImage(post.id)}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-blue-600 font-medium">{post.category}</span>
                      <h3 className="text-xl font-semibold mt-2 mb-3">
                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString('nl-NL')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-blue-600 hover:underline text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Lees meer
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <InlineAd />

              {/* Premium Content Banner */}
              <PremiumContentBanner />

              {/* Newsletter signup */}
              <Card className="p-8 shadow-soft bg-gradient-to-r from-blue-50 to-orange-50/30 dark:from-blue-900/20 dark:to-orange-900/10 border-blue-100 dark:border-blue-800 text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Blijf Op De Hoogte</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Ontvang maandelijks handige tips over onderhoud, bespaartips en
                  nieuws over loodgieterswerk.
                </p>
                <form className="max-w-md mx-auto flex gap-2">
                  <input
                    type="email"
                    placeholder="Uw e-mailadres"
                    className="flex-1 px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-blue-500 bg-background"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Inschrijven
                  </button>
                </form>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Loodgieter Nodig?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              {ctaStatsText}
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Vind Een Loodgieter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
