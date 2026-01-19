# Loodgieter Data Filtering Documentatie

## Overzicht
Dit document beschrijft het filterproces dat is geimplementeerd om ervoor te zorgen dat alleen daadwerkelijke loodgieters en sanitair specialisten worden opgenomen in de dataset.

## Probleem
De originele dataset kan bedrijven bevatten die geen loodgieters zijn. Dit kunnen zijn:
- Algemene aannemers zonder loodgieter specialisatie
- Bouwmarkten of sanitairwinkels
- Verwarmingsbedrijven zonder loodgieter diensten
- Andere niet-relevante bedrijven

## Oplossing
We hebben een uitgebreid filtersysteem geimplementeerd dat:
1. Niet-loodgieter bedrijven identificeert en uitsluit op basis van keywords
2. Niet-relevante diensten identificeert en uitsluit
3. Daadwerkelijke loodgieters en sanitair specialisten behoudt
4. Positieve identificatie gebruikt voor loodgieter-gerelateerde keywords

## Filter Regels

### Uitgesloten Keywords (Niet-Loodgieter Bedrijven)
- **Geen sanitair diensten**: bouwmarkt, sanitairwinkel, groothandel
- **Algemene bouw**: aannemer, timmerman, metselaar (zonder loodgieter)
- **Andere installateurs**: elektricien, schilder, stukadoor

### Opgenomen Loodgieter Keywords
- loodgieter, installateur, sanitair
- Specifieke diensten: lekkage, ontstopping, CV-installatie
- Specialisaties: vloerverwarming, warmtepomp, gasleiding
- Algemeen: riool, waterleiding, badkamer

### Speciale Behandeling
- **Loodgieters**: Standaard opgenomen
- **Gemengde namen**: Als een bedrijfsnaam zowel uitgesloten als loodgieter keywords bevat, hebben loodgieter keywords voorrang

## Resultaten
- **Originele entries**: [aantal]
- **Gefilterde entries**: [aantal] (daadwerkelijke loodgieters)
- **Verwijderde entries**: [aantal] (niet-loodgieter bedrijven)

## Implementatie

### Standalone Filter Script
`scripts/filter-non-plumbers.ts` - Kan onafhankelijk worden uitgevoerd om data te filteren

### Geintegreerde Filtering
De filterlogica is geintegreerd in:
- `scripts/process-plumber-data.ts`
- `scripts/process-all-data.ts`

### Gebruik
```bash
# Run standalone filter
npx tsx scripts/filter-non-plumbers.ts

# Verwerk loodgieter data met filtering
npx tsx scripts/process-all-data.ts loodgieter data/loodgieters.csv

# Build productie data
npm run build-data
```

## Bestanden Aangemaakt
- `data/loodgieters-filtered.csv` - Gefilterde loodgieter data
- `data/removed-entries.json` - Lijst van verwijderde entries voor review
- `data/loodgieters-processed.json` - Verwerkte loodgieter data
- `public/data/loodgieters.json` - Productie-klare data

## Onderhoud
Om filter regels bij te werken:
1. Bewerk de keyword arrays in de filter functies
2. Test met voorbeelddata om te verzekeren dat geen geldige loodgieters worden uitgesloten
3. Review `removed-entries.json` om filternauwkeurigheid te verifieren
4. Update deze documentatie met eventuele wijzigingen
