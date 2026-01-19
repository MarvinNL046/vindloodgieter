# CLAUDE.md - VindLoodgieter.nl Project Guide

Dit bestand biedt richtlijnen aan Claude Code voor het werken met het VindLoodgieter.nl project.

## Project Overzicht

VindLoodgieter.nl is een uitgebreide directory van loodgieters en sanitair specialisten in Nederland. De website helpt consumenten om snel een betrouwbare loodgieter te vinden voor spoedeisende lekkages, CV-installatie, badkamerrenovatie en andere loodgietersdiensten.

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase / Drizzle ORM
- **Deployment**: Vercel

## Key Features

### 1. Geografische Structuur
- `/provincie/[provincie]` - Provincie-niveau overzichten (bijv. Noord-Holland)
- `/gemeente/[gemeente]` - Gemeente-niveau overzichten
- `/plaats/[plaats]` - Plaatsniveau overzichten
- `/loodgieter/[slug]` - Individuele loodgieter profielpagina's

### 2. Dienst Types
- Spoed Lekkage (24/7 service)
- CV-installatie & Onderhoud
- Sanitair Installatie
- Riool Ontstopping
- Waterleiding Reparatie
- Badkamer Renovatie
- Vloerverwarming

### 3. Specialisaties
- Lekkage Opsporing
- Gasleiding Installatie
- Warmtepomp Installatie
- Duurzame Installaties
- Nieuwbouw Projecten
- Renovatie Projecten

### 4. Zoeken & Filteren
- Zoeken op locatie, bedrijfsnaam
- Filteren op dienst type
- Filteren op beschikbaarheid (24/7 spoed)
- Filteren op reviews/beoordelingen

## Data Structuur

### Loodgieter Data Format
```typescript
{
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  province: string;
  province_abbr: string;
  municipality: string;
  postcode: string;
  phone?: string;
  website?: string;
  lat?: number;
  lng?: number;
  rating?: number;
  review_count?: number;
  photo?: string;
  service_types: string[];  // spoed-lekkage, cv-installatie, sanitair, etc.
  specializations: string[];
  availability: string[];   // 24/7, weekends, avonden
  certifications: string[]; // erkend installateur, etc.
  description?: string;
}
```

## Belangrijke URLs en Routes

### Publieke Pagina's
- `/` - Homepage met zoekfunctie
- `/zoeken` - Zoekresultaten pagina
- `/provincie/[provincie]` - Provincie overzichten
- `/gemeente/[gemeente]` - Gemeente overzichten
- `/plaats/[plaats]` - Plaats overzichten
- `/loodgieter/[slug]` - Loodgieter profiel pagina
- `/vergelijk` - Vergelijk loodgieters
- `/gids` - Loodgieter gidsen en tips
- `/over-ons` - Over ons pagina
- `/contact` - Contact pagina

### API Routes
- `/api/search` - Zoek loodgieters
- `/api/loodgieter/[slug]` - Haal loodgieter data op
- `/api/loodgieters/nearby` - Vind loodgieters in de buurt

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Discover loodgieters (scraping)
npm run discover:test
npm run discover:province
npm run discover:full
```

## Environment Variables

Required in `.env.local`:
```
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GOOGLE_PLACES_API_KEY=
```

## Content Richtlijnen

### Doelgroep
- Huiseigenaren met lekkage of sanitair problemen
- Mensen die een badkamer willen renoveren
- Bedrijven die loodgieter diensten nodig hebben
- Mensen die CV-ketel onderhoud nodig hebben

### Toon
- Professioneel en betrouwbaar
- Direct en duidelijk
- Behulpzaam en informatief
- Urgentie bij spoedsituaties

### SEO Focus Keywords (NL)
- loodgieter in de buurt
- spoed loodgieter [plaats]
- lekkage reparatie
- cv ketel installatie
- riool ontstoppen
- badkamer renovatie [plaats]
- sanitair installateur

## Kleurschema

- **Primary (Blauw)**: #2563EB - Vertrouwen, water, professionaliteit
- **Accent (Oranje)**: #F97316 - Urgentie, actie, warmte
- **Background**: Lichtgrijs/wit
- **Text**: Donkergrijs

## Nederlandse Provincies

1. Drenthe
2. Flevoland
3. Friesland
4. Gelderland
5. Groningen
6. Limburg
7. Noord-Brabant
8. Noord-Holland
9. Overijssel
10. Utrecht
11. Zeeland
12. Zuid-Holland

## Notes

- Dit project volgt een directory website architectuur
- Loodgieter data wordt verzameld via Google Places API
- Focus op Nederlandse markt
- Let op: Nederlandse taal voor alle content
- Spoed diensten prominent weergeven (24/7)
