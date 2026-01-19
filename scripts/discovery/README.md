# Loodgieter Discovery Systeem

Automatisch ontdekken van loodgieters via Bright Data SERP API.

## Overzicht

Dit systeem zoekt automatisch naar loodgieters in alle Nederlandse provincies en steden via Google Maps, haalt CIDs/place_ids op, en verzamelt reviews, beoordelingen en openingstijden.

## Scripts

### 1. `discover-loodgieters.ts` - Zoek naar loodgieters

Zoekt via Bright Data SERP API naar loodgieters in elke locatie.

```bash
# Verwerk alle openstaande locaties
npx tsx scripts/discovery/discover-loodgieters.ts

# Alleen een provincie
npx tsx scripts/discovery/discover-loodgieters.ts --provincie "Limburg"

# Beperk aantal locaties
npx tsx scripts/discovery/discover-loodgieters.ts --batch 50

# Dry run (preview, geen API calls)
npx tsx scripts/discovery/discover-loodgieters.ts --dry-run

# Hervat na onderbreking
npx tsx scripts/discovery/discover-loodgieters.ts --resume

# Test met 3 steden
npx tsx scripts/discovery/discover-loodgieters.ts --test

# Zonder database writes (alleen JSON)
npx tsx scripts/discovery/discover-loodgieters.ts --no-db
```

## Data Bestanden

```
data/discovery/
├── locations.json                # Alle Nederlandse locaties met status
├── progress.json                 # Voortgang statistieken
├── discovered-loodgieters.json   # Gevonden loodgieters (raw)
└── rate-limits.json              # API rate limiting state
```

## Workflow

1. **Run discovery** (kan meerdere keren worden uitgevoerd, hervat automatisch)
   ```bash
   npx tsx scripts/discovery/discover-loodgieters.ts
   ```

2. **Check voortgang**
   ```bash
   cat data/discovery/progress.json
   ```

3. **Commit & deploy**
   ```bash
   git add data/
   git commit -m "Loodgieters gevonden"
   ```

## Rate Limiting

De discovery script heeft ingebouwde rate limiting:

| Limiet | Waarde |
|--------|--------|
| Per minuut | Onbeperkt (configureerbaar) |
| Retry pogingen | 3 (exponential backoff) |
| Vertraging tussen queries | 500ms |
| Vertraging tussen locaties | 2000ms |

De status wordt opgeslagen in `rate-limits.json` en blijft behouden tussen runs.

## Retry Logic

- **Automatische retries**: 3 pogingen met exponential backoff
- **Mislukte locaties**: Worden gemarkeerd en kunnen opnieuw worden geprobeerd
- **Hervat ondersteuning**: Hervat waar je was gebleven met `--resume`

## Wat wordt opgehaald?

Per loodgieter:
- Google CID (voor reviews ophalen)
- Google Place ID
- Naam en adres
- GPS coordinaten
- Telefoon en website
- Beoordeling en aantal reviews
- Openingstijden
- Top reviews (max 10)
- Type bedrijf
- Service types (lekkage, cv, etc.)
- Spoed service indicator

## Zoekquery's

De volgende zoekquery's worden gebruikt per locatie:
- loodgieter
- loodgietersbedrijf
- sanitair installateur
- cv installateur
- spoed loodgieter
- lekkage reparatie
- riool ontstopping
- rioolservice
- cv monteur
- cv ketel installatie
- badkamer installateur
- waterleiding reparatie
- gasinstallateur
- warmtepomp installateur
- vloerverwarming installateur

## Environment Variables

Zorg dat deze in `.env.local` staan:

```env
BRIGHTDATA_API_KEY=your_api_key_here
# of
BRIGHTDATA_SERP_API_KEY=your_api_key_here

DATABASE_URL=your_neon_database_url  # Optioneel voor real-time DB writes
```

## Tips

1. **Start klein**: Test eerst met een provincie (`--provincie "Zeeland"`)
2. **Monitor voortgang**: Check `progress.json` voor statistieken
3. **Batch runs**: Gebruik `--batch 20` voor gecontroleerde runs
4. **Dry run eerst**: Gebruik `--dry-run` om te zien wat er gebeurt

## Voorbeeld Output

```
🔧 Loodgieter Discovery Script - Nederland

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Database connection initialized
📊 Status:
   Totaal locaties: 85
   Te verwerken: 85
   Al gevonden: 0 loodgieters
   Unieke CIDs: 0

   Per provincie:
   - NH: 8 plaatsen
   - ZH: 12 plaatsen
   - NB: 15 plaatsen
   - LI: 10 plaatsen
   ...

🚀 Starting discovery voor 85 locaties...
💾 Real-time database writes ENABLED - data wordt direct opgeslagen

🔧 Amsterdam, NH
   🔎 Zoeken: "loodgieter Amsterdam"...
   ✓ 20 CIDs gevonden (20 nieuw)
   🔎 Zoeken: "spoed loodgieter Amsterdam"...
   ✓ 15 CIDs gevonden (8 nieuw)
   ...
   💾 Opgeslagen (1/85) - Totaal: 45 nieuwe loodgieters | DB: 45/45

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Discovery Voltooid!
   Locaties verwerkt: 85
   Nieuwe loodgieters gevonden: 1247
   Totaal loodgieters: 1247
   Unieke CIDs: 1247

   💾 Database Status:
      Succesvolle inserts: 1247
      Success rate: 100.0%
```

## Database Schema

De loodgieters worden opgeslagen met de volgende belangrijke velden:
- `service_types`: Array van diensten (lekkage-reparatie, cv-ketel, etc.)
- `spoed_service`: Boolean voor 24/7 beschikbaarheid
- `provincie` / `provincie_code`: Nederlandse provincie
- `gemeente`: Gemeente naam
- `postcode`: Nederlandse postcode (1234 AB)
