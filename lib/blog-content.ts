import { getProvincieLink, getServiceTypeLink } from './blog-data';

interface BlogContent {
  [key: string]: string;
}

export const blogContent: BlogContent = {
  'lekkage-opsporen-zelf-doen-of-loodgieter-bellen': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Waterlekkages kunnen grote schade aan je woning veroorzaken als ze niet op tijd worden ontdekt. In dit artikel leer je hoe je lekkages kunt opsporen en wanneer het verstandig is om een professionele loodgieter in te schakelen.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Tekenen van Waterlekkage</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Let op deze signalen die kunnen wijzen op een waterlekkage:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Vochtige plekken op muren, plafonds of vloeren</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Schimmelvorming of een muffe geur</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Onverklaarbaar hoge waterrekening</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Geluiden van stromend water terwijl alles dicht is</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Warme plekken op de vloer (bij vloerverwarming)</span>
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Zelf Checken</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Enkele eenvoudige checks die je zelf kunt doen:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">1.</span>
              <span>Controleer de watermeter met alle kranen dicht</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">2.</span>
              <span>Inspecteer zichtbare leidingen op druppels</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">3.</span>
              <span>Check aansluitingen onder wastafels en toilet</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">4.</span>
              <span>Kijk naar de CV-ketel op lekkage</span>
            </li>
          </ul>
        </div>

        <div class="bg-blue-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Wanneer Een Loodgieter Bellen?</h2>
          <p class="text-gray-700 mb-4">
            Schakel een <a href="/" class="text-blue-600 hover:text-blue-800 underline">professionele loodgieter</a> in bij:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li>• Lekkage achter muren of onder de vloer</li>
            <li>• Grote hoeveelheden water</li>
            <li>• Lekkage bij de gasleiding of CV-ketel</li>
            <li>• Als je de bron niet kunt vinden</li>
          </ul>
        </div>
      </section>
    </div>
  `,

  'cv-ketel-onderhoud-waarom-jaarlijks-belangrijk': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Een goed onderhouden CV-ketel gaat langer mee, werkt efficienter en is veiliger. Ontdek waarom jaarlijks onderhoud door een erkende monteur essentieel is.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Voordelen van Jaarlijks Onderhoud</h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">1. Lagere Energiekosten</h3>
              <p class="text-gray-700">
                Een schone, goed afgestelde ketel verbruikt tot 10% minder gas. Dat scheelt jaarlijks tientallen euros.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">2. Langere Levensduur</h3>
              <p class="text-gray-700">
                Regelmatig onderhoud voorkomt slijtage en verlengt de levensduur van je ketel met jaren.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">3. Veiligheid</h3>
              <p class="text-gray-700">
                Een monteur controleert op gevaarlijke situaties zoals koolmonoxide-lekkage.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">4. Garantie Behouden</h3>
              <p class="text-gray-700">
                Veel fabrikanten eisen jaarlijks onderhoud om de garantie geldig te houden.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Wat Kost CV-Onderhoud?</h2>
          <p class="text-gray-700 mb-4">
            Gemiddelde kosten voor CV-onderhoud:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li>• Standaard onderhoudsbeurt: EUR 80 - EUR 120</li>
            <li>• Inclusief kleine reparaties: EUR 100 - EUR 150</li>
            <li>• Onderhoudscontract per jaar: EUR 100 - EUR 200</li>
          </ul>
          <p class="text-gray-700 mt-4">
            <a href="${getServiceTypeLink('cv-installatie')}" class="text-blue-600 hover:text-blue-800 underline">Vind CV-specialisten bij jou in de buurt</a>
          </p>
        </div>
      </section>
    </div>
  `,

  'verstopte-afvoer-zelf-oplossen': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Een verstopte afvoer is een veelvoorkomend huishoudelijk probleem. In veel gevallen kun je het zelf oplossen met eenvoudige middelen. Hier lees je hoe.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Natuurlijke Methodes</h2>
          <div class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Kokend Water</h3>
              <p class="text-gray-700 text-sm">
                Giet langzaam een ketel kokend water in de afvoer. Herhaal indien nodig.
              </p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Baking Soda en Azijn</h3>
              <p class="text-gray-700 text-sm">
                Strooi een half kopje baking soda in de afvoer, gevolgd door azijn. Laat 30 minuten inwerken en spoel door.
              </p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Plopper/Ontstopper</h3>
              <p class="text-gray-700 text-sm">
                Een klassieke plopper kan wonderen doen bij verstoppingen dicht bij de afvoer.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Gereedschap Gebruiken</h2>
          <ul class="space-y-2 text-gray-700">
            <li>• <strong>Afvoerontstopper:</strong> Chemische middelen voor hardnekkige verstoppingen</li>
            <li>• <strong>Ontstoppingsveer:</strong> Voor verstoppingen dieper in de leiding</li>
            <li>• <strong>Sifon schoonmaken:</strong> Plaats een emmer eronder en draai de sifon los</li>
          </ul>
        </div>

        <div class="bg-red-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Wanneer Een Loodgieter Bellen?</h2>
          <p class="text-gray-700 mb-4">
            Bel een <a href="${getServiceTypeLink('riool-afvoer')}" class="text-blue-600 hover:text-blue-800 underline">rioolspecialist</a> wanneer:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li>• Meerdere afvoeren tegelijk verstopt zijn</li>
            <li>• De verstopping steeds terugkomt</li>
            <li>• Er vieze geuren uit de afvoer komen</li>
            <li>• Water omhoog komt in andere afvoeren</li>
          </ul>
        </div>
      </section>
    </div>
  `,

  'badkamer-renovatie-kosten-besparen': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Een badkamerrenovatie kan flink in de papieren lopen, maar met slimme keuzes kun je veel geld besparen zonder in te leveren op kwaliteit of comfort.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Slimme Bespaartips</h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">1. Behoud de Bestaande Indeling</h3>
              <p class="text-gray-700">
                Het verplaatsen van leidingen is duur. Door de huidige positie van toilet, douche en wastafel te behouden, bespaar je duizenden euros.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">2. Vergelijk Offertes</h3>
              <p class="text-gray-700">
                Vraag altijd meerdere offertes aan. Prijsverschillen kunnen oplopen tot 30-40%.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">3. Kies voor B-Keuze Tegels</h3>
              <p class="text-gray-700">
                B-keuze tegels hebben minimale afwijkingen maar zijn vaak 50% goedkoper.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">4. Doe Zelf Het Sloopwerk</h3>
              <p class="text-gray-700">
                Als je handig bent, kun je zelf oude tegels en sanitair verwijderen. Dit scheelt arbeidskosten.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-green-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Indicatie Kosten Badkamerrenovatie</h2>
          <div class="space-y-2 text-gray-700">
            <p><strong>Budget renovatie:</strong> EUR 3.000 - EUR 6.000</p>
            <p><strong>Midden segment:</strong> EUR 6.000 - EUR 12.000</p>
            <p><strong>Luxe badkamer:</strong> EUR 12.000 - EUR 25.000+</p>
          </div>
          <p class="text-gray-700 mt-4">
            Vind <a href="${getServiceTypeLink('badkamer')}" class="text-blue-600 hover:text-blue-800 underline">badkamer specialisten</a> voor een vrijblijvende offerte.
          </p>
        </div>
      </section>
    </div>
  `,

  'loodgieter-kiezen-waar-op-letten': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Een goede loodgieter vinden is niet altijd eenvoudig. Met deze checklist maak je een weloverwogen keuze en voorkom je verrassingen.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Checklist: De Juiste Loodgieter</h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">1. Controleer Certificeringen</h3>
              <p class="text-gray-700">
                Kijk of de loodgieter erkend is en beschikt over de juiste diploma's en certificaten.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">2. Vraag Om Referenties</h3>
              <p class="text-gray-700">
                Een goede loodgieter kan referenties of reviews van eerdere klanten laten zien.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">3. Transparante Prijsopgave</h3>
              <p class="text-gray-700">
                Vraag vooraf een duidelijke offerte met uurtarief, voorrijkosten en materiaalkosten.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">4. Check de Verzekering</h3>
              <p class="text-gray-700">
                Een professionele loodgieter heeft een aansprakelijkheidsverzekering.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">5. KvK-Inschrijving</h3>
              <p class="text-gray-700">
                Controleer of het bedrijf bij de Kamer van Koophandel staat ingeschreven.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Rode Vlaggen</h2>
          <ul class="space-y-2 text-gray-700">
            <li>• Geen schriftelijke offerte willen geven</li>
            <li>• Alleen contante betaling accepteren</li>
            <li>• Geen KvK-nummer kunnen tonen</li>
            <li>• Druk uitoefenen om direct te beslissen</li>
            <li>• Geen garantie op het werk geven</li>
          </ul>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Vind Betrouwbare Loodgieters</h2>
          <p class="text-gray-700">
            Op VindLoodgieter.nl vind je <a href="/" class="text-blue-600 hover:text-blue-800 underline">gecertificeerde loodgieters</a> bij jou in de buurt, inclusief reviews en beoordelingen van eerdere klanten.
          </p>
        </div>
      </section>
    </div>
  `,

  'spoed-loodgieter-wanneer-bellen': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Niet elk loodgietersprobleem is een noodgeval. Leer het verschil kennen en bespaar jezelf onnodige spoedtarieven.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-red-50 rounded-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Dit Is Een Noodgeval</h2>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-red-600 mr-2">!</span>
              <span><strong>Gesprongen waterleiding</strong> - Grote hoeveelheden water stromen je huis in</span>
            </li>
            <li class="flex items-start">
              <span class="text-red-600 mr-2">!</span>
              <span><strong>Gaslekkage</strong> - Ruik je gas? Bel direct de gasleverancier!</span>
            </li>
            <li class="flex items-start">
              <span class="text-red-600 mr-2">!</span>
              <span><strong>Volledig verstopt riool</strong> - Water komt omhoog in meerdere afvoeren</span>
            </li>
            <li class="flex items-start">
              <span class="text-red-600 mr-2">!</span>
              <span><strong>Bevroren leidingen</strong> - Kunnen barsten en waterschade veroorzaken</span>
            </li>
          </ul>
          <p class="text-gray-700 mt-4">
            <a href="${getServiceTypeLink('spoed-lekkage')}" class="text-blue-600 hover:text-blue-800 underline">Vind een spoed loodgieter</a> voor noodgevallen.
          </p>
        </div>

        <div class="bg-green-50 rounded-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Dit Kan Wachten</h2>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              <span>Druppelende kraan</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              <span>Langzaam aflopende wasbak</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              <span>Doorlopend toilet (als je de kraan kunt dichtdraaien)</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              <span>Kleine lekkage die je kunt opvangen</span>
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Kosten Spoed Loodgieter</h2>
          <p class="text-gray-700 mb-4">
            Spoedtarieven liggen vaak 50-100% hoger dan reguliere tarieven:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li>• Avond/weekend toeslag: EUR 25 - EUR 75</li>
            <li>• Nacht toeslag: EUR 50 - EUR 100</li>
            <li>• Feestdagen: Tot 200% van het normale tarief</li>
          </ul>
        </div>
      </section>
    </div>
  `,

  'loodgieter-tarieven-nederland': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Wat kost een loodgieter eigenlijk? Een overzicht van gemiddelde tarieven in Nederland, zodat je weet wat je kunt verwachten.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Gemiddelde Uurtarieven 2025</h2>
          <div class="space-y-3 text-gray-700">
            <p><strong>Uurtarief loodgieter:</strong> EUR 45 - EUR 65 per uur</p>
            <p><strong>Voorrijkosten:</strong> EUR 20 - EUR 45</p>
            <p><strong>ZZP loodgieter:</strong> EUR 40 - EUR 55 per uur</p>
            <p><strong>Installatiebedrijf:</strong> EUR 50 - EUR 75 per uur</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Veelvoorkomende Klussen</h2>
          <div class="space-y-2 text-gray-700">
            <p><strong>Kraan vervangen:</strong> EUR 75 - EUR 150 (incl. materiaal)</p>
            <p><strong>Toilet installeren:</strong> EUR 150 - EUR 300</p>
            <p><strong>Afvoer ontstoppen:</strong> EUR 75 - EUR 150</p>
            <p><strong>Lekkage repareren:</strong> EUR 100 - EUR 250</p>
            <p><strong>Thermostaatkraan plaatsen:</strong> EUR 150 - EUR 300</p>
            <p><strong>CV-ketel onderhoud:</strong> EUR 80 - EUR 120</p>
          </div>
        </div>

        <div class="bg-blue-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Tips om Kosten te Besparen</h2>
          <ul class="space-y-2 text-gray-700">
            <li>• Vraag altijd een offerte vooraf</li>
            <li>• Vergelijk meerdere loodgieters</li>
            <li>• Plan niet-urgente klussen doordeweeks</li>
            <li>• Combineer meerdere kleine klussen</li>
            <li>• Vraag naar een vaste prijs per klus</li>
          </ul>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Vind Loodgieters Met Duidelijke Prijzen</h2>
          <p class="text-gray-700">
            Op <a href="/" class="text-blue-600 hover:text-blue-800 underline">VindLoodgieter.nl</a> vind je loodgieters met transparante tarieven en klantbeoordelingen.
          </p>
        </div>
      </section>
    </div>
  `,
};

export function getBlogContent(slug: string): string | undefined {
  return blogContent[slug];
}
