import { MetadataRoute } from 'next'
import { getAllLoodgieters, getAllProvinces, getAllMunicipalities, getAllCities, createMunicipalitySlug, createCitySlug, Loodgieter } from '@/lib/data'
import { blogPosts } from '@/lib/blog-data'

// Maximum URLs per sitemap file (Google limit is 50k, we use 10k for better performance)
const MAX_URLS_PER_SITEMAP = 10000

const baseUrl = 'https://www.vindloodgieter.nl'

// Service types for type pages
const serviceTypes = [
  'spoed-lekkage',
  'cv-installatie',
  'sanitair-installatie',
  'riool-ontstopping',
  'waterleiding-reparatie',
  'badkamer-renovatie',
  'vloerverwarming',
  'warmtepomp-installatie',
  'gasleiding-installatie',
  'lekkage-opsporing',
]

// Static pages that don't change often
// Note: /zoeken, /vergelijk are excluded (noindex utility pages)
const staticPages = [
  { path: '', priority: 1, changeFreq: 'daily' as const },
  { path: '/provincie', priority: 0.9, changeFreq: 'weekly' as const },
  { path: '/diensten', priority: 0.8, changeFreq: 'weekly' as const },
  { path: '/blog', priority: 0.8, changeFreq: 'daily' as const },
  { path: '/over-ons', priority: 0.5, changeFreq: 'monthly' as const },
  { path: '/contact', priority: 0.5, changeFreq: 'monthly' as const },
  { path: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
  // Guide pages
  { path: '/gids', priority: 0.9, changeFreq: 'weekly' as const },
  { path: '/gids/diensten', priority: 0.9, changeFreq: 'weekly' as const },
  { path: '/gids/tips', priority: 0.9, changeFreq: 'weekly' as const },
]

// Guide service pages
const guideServices = [
  'spoed-lekkage',
  'cv-onderhoud',
  'sanitair-tips',
  'riool-problemen',
  'warmtepomp',
]

// Guide topic pages
const guideTopics = [
  'loodgieter-kiezen',
  'kosten-loodgieter',
  'diy-tips',
  'onderhoud-tips',
]

interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

// Generate all sitemap entries
async function getAllSitemapEntries(): Promise<SitemapEntry[]> {
  let loodgieters: Loodgieter[] = []
  let provinces: any[] = []
  let municipalities: any[] = []
  let cities: any[] = []

  try {
    loodgieters = await getAllLoodgieters()
    provinces = await getAllProvinces()
    municipalities = await getAllMunicipalities()
    cities = await getAllCities()
  } catch (error) {
    // Data functions may not exist yet
    console.log('Sitemap: Some data functions not available yet')
  }

  const now = new Date()

  const entries: SitemapEntry[] = []

  // Static pages
  staticPages.forEach(page => {
    entries.push({
      url: `${baseUrl}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFreq,
      priority: page.priority,
    })
  })

  // Service type pages
  serviceTypes.forEach(type => {
    entries.push({
      url: `${baseUrl}/dienst/${type}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  })

  // Guide service pages
  guideServices.forEach(service => {
    entries.push({
      url: `${baseUrl}/gids/diensten/${service}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Guide topic pages
  guideTopics.forEach(topic => {
    entries.push({
      url: `${baseUrl}/gids/tips/${topic}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Province pages
  provinces.forEach(province => {
    entries.push({
      url: `${baseUrl}/provincie/${province.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Municipality pages
  municipalities.forEach(municipality => {
    entries.push({
      url: `${baseUrl}/gemeente/${createMunicipalitySlug(municipality)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // City pages
  cities.forEach(city => {
    entries.push({
      url: `${baseUrl}/plaats/${createCitySlug(city)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  })

  // Loodgieter pages (largest portion)
  loodgieters.forEach(loodgieter => {
    entries.push({
      url: `${baseUrl}/loodgieter/${loodgieter.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Blog posts
  if (blogPosts && blogPosts.length > 0) {
    blogPosts.forEach(post => {
      entries.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  }

  return entries
}

// This function tells Next.js how many sitemaps to generate
// It runs at build time and creates sitemap/0.xml, sitemap/1.xml, etc.
export async function generateSitemaps() {
  const entries = await getAllSitemapEntries()
  const totalSitemaps = Math.ceil(entries.length / MAX_URLS_PER_SITEMAP) || 1

  // Return an array of sitemap IDs
  return Array.from({ length: totalSitemaps }, (_, i) => ({ id: i }))
}

// Generate each individual sitemap
export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const entries = await getAllSitemapEntries()

  // Get the chunk for this sitemap ID
  const start = id * MAX_URLS_PER_SITEMAP
  const end = start + MAX_URLS_PER_SITEMAP
  const chunk = entries.slice(start, end)

  return chunk
}
