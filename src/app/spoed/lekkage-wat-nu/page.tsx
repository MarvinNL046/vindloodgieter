import type { Metadata } from "next";
import { ClusterLayout, type ClusterData } from "@/components/cluster-layout";

const data: ClusterData = {
  slug: "/spoed/lekkage-wat-nu",
  breadcrumbParent: { title: "Spoed", href: "/spoed" },
  metaTitle: "Acute lekkage in huis: stappenplan voor de eerste 10 minuten",
  metaDescription:
    "Lekkage nu? Doe deze 5 dingen eerst, voorkom €1.000+ schade, en lees wanneer 112 of loodgieter bellen. Spoed-loodgieter binnen 60-90 min.",
  h1: "Acute lekkage: wat moet je nu doen (en in welke volgorde)?",
  introLead:
    "Draai als eerste de hoofdkraan dicht, haal de stroom van het getroffen gebied en bel dan pas een spoed-loodgieter — de meeste schade bij lekkage ontstaat in de eerste 30 minuten van doorlopen.",
  introBody: (
    <>
      <p>
        Water is zowel het probleem als de schade-bron. Elke seconde extra
        doorlopen vergroot het oppervlak en dringt water dieper in vloeren,
        wanden en plafondconstructies. Binnen tien minuten hoort de
        hoofdkraan dicht te zijn.
      </p>
      <p>
        Lees onderstaand stappenplan nu, vóór je een lekkage hebt. Print of
        bookmarkt het. In paniek herinner je je niks van een browser-tab —
        zichtbare handeling-volgorde op papier werkt.
      </p>
    </>
  ),
  sections: [
    {
      h2: "Stappenplan eerste 10 minuten bij lekkage",
      body: (
        <>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Hoofdkraan dichtdraaien</strong> — meestal in de
              meterkast of bij binnenkomst waterleiding. Dit stopt alle
              waterdruk. Weet je niet waar: loodgieter of installatie-
              documentatie checken.
            </li>
            <li>
              <strong>Stroom uit</strong> in het getroffen gebied — als water
              bij stopcontacten, schakelaars of plafondspots komt. Hele groep
              uit via meterkast, of hoofdschakelaar bij grote lekkage.
            </li>
            <li>
              <strong>Emmers en handdoeken</strong> onder druppels plaatsen.
              Ook ramen open om vocht sneller af te voeren.
            </li>
            <li>
              <strong>Spullen in veiligheid</strong> — elektronica, papieren,
              meubels in de directe lekgebied. Verplaats wat je kunt.
            </li>
            <li>
              <strong>Foto's maken</strong> voor verzekering. Zowel de lek als
              beschadigde spullen. Gebruik je telefoon — latere meldingen
              worden soepeler verwerkt met bewijs.
            </li>
            <li>
              <strong>Spoed-loodgieter bellen</strong>. Benoem bij telefoontje:
              waar is de lek, hoe hard loopt het, wat heb je al gedaan. Goede
              loodgieter is binnen 60-90 minuten ter plaatse.
            </li>
          </ol>
        </>
      ),
    },
    {
      h2: "Wanneer bel je 112 in plaats van loodgieter?",
      body: (
        <>
          <p>
            Bel <strong>112</strong> bij:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Water dat uit stopcontacten of plafondspots loopt</li>
            <li>Scheuren in leidingen door bevriezen met stromend water en je
            kunt de kraan niet bereiken</li>
            <li>Hoofdwaterleiding die is gesprongen en je straat overstroomt</li>
            <li>Elektrische apparaten die in water staan en je de stroom niet
            uit kunt zetten</li>
          </ul>
          <p>
            Alle andere gevallen: loodgieter volstaat. Verzekeraars verwachten
            dat je eerst probeert de lek zelf te stoppen (hoofdkraan dicht)
            voor je professionele hulp inschakelt.
          </p>
        </>
      ),
    },
    {
      h2: "Wat kost een spoed-loodgieter in 2026?",
      body: (
        <>
          <p>
            Indicatieve prijzen voor acute spoedoproep:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Voorrijkosten daguren</strong>: €45-€75</li>
            <li><strong>Voorrijkosten avond/weekend/nacht</strong>: €90-€150</li>
            <li><strong>Uurtarief daguren</strong>: €55-€80</li>
            <li><strong>Uurtarief avond/weekend</strong>: €95-€140</li>
            <li><strong>Noodreparatie lekkage</strong> (1-2 uur werk):
            €180-€400 daguren, €300-€700 buiten kantoortijd</li>
          </ul>
          <p>
            <strong>Tip</strong>: vraag vooraf aan de telefoon bevestiging van
            voorrijkosten. Sommige onbetrouwbare partijen rekenen €250+
            voorrijkosten en duiken bij aankomst met meerprijzen. Bij een
            eerlijke loodgieter krijg je binnen 2 minuten een richtprijs.
          </p>
          <p>
            Voor verzekering: vraag factuur met specificatie. "Noodreparatie
            lekkage + x uur arbeid" op één bedrag is moeilijker te verwerken.
          </p>
        </>
      ),
    },
    {
      h2: "Verzekering: wat wel en niet gedekt?",
      body: (
        <>
          <p>
            Standaard-inboedelverzekering dekt in 2026 typisch:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Waterschade aan inboedel en inrichting</li>
            <li>Herstel van vloer, behang, plafond</li>
            <li>Kosten voor tijdelijke verhuizing bij niet-bewoonbaar</li>
            <li>Droog-installatie</li>
          </ul>
          <p>
            Niet gedekt:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>De lekkage zelf (bijv. barst in leiding — opstalverzekering)</li>
            <li>Langzame lekkage door slecht onderhoud ("gradueel vocht")</li>
            <li>Water door open raam of dak tijdens storm</li>
            <li>Schade aan elektronica die niet van het gebruikelijke inboedel-type is</li>
          </ul>
          <p>
            Bel verzekeraar binnen 24 uur met schadenummer en foto's. Wacht
            NIET op herstel voor je meldt — meldingsplicht is gekoppeld aan
            moment van constateren.
          </p>
        </>
      ),
    },
    {
      h2: "Voorkomen: jaarlijkse checks en waarschuwingen",
      body: (
        <>
          <p>
            Een lekkage kondigt zich vaak aan, maar wordt gemist. Check deze
            signalen één keer per kwartaal:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Vochtplekken op plafonds of wanden (eerst grijs, later bruin)</li>
            <li>Geluid van lopend water wanneer alle kranen dicht zijn</li>
            <li>CV-druk die onverklaarbaar daalt (wekelijkse check)</li>
            <li>Waterrekening die plots omhoog gaat</li>
            <li>Muffe geur in kelder, zolder of onder gootsteen</li>
            <li>Vochtsporen op waterleidingen (witte afzetting, groene aanslag)</li>
          </ul>
          <p>
            Bij één of meer van deze signalen: laat een loodgieter een
            visuele inspectie doen. Kosten €95-€150, kan €5.000+ schade
            voorkomen als het een beginnende lek is.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: "Waar zit de hoofdkraan in huis?",
      a: "Meestal in de meterkast bij binnenkomst waterleiding, of in kelder/kruipruimte. Als je het niet weet: neem een foto tijdens een rustig moment en bewaar die. In paniek zoeken kost kostbare minuten.",
    },
    {
      q: "Wat kost een spoed-loodgieter?",
      a: "€180-€400 daguren voor typische lekkage-noodreparatie. €300-€700 buiten kantoortijd. Vraag altijd vooraf bevestiging van voorrijkosten aan de telefoon.",
    },
    {
      q: "Moet ik 112 bellen bij lekkage?",
      a: "Alleen bij water + stroom (stopcontacten, plafondspots), hoofdleidingbreuk, of als je een kraan niet kunt dichtdraaien. Normale lekkage: loodgieter volstaat.",
    },
    {
      q: "Vergoedt verzekering de reparatie van de lekkage?",
      a: "Meestal niet — dat valt onder opstalverzekering of is niet gedekt. Wel gedekt: waterschade aan inboedel, vloer en wanden. Check je polis voorwaarden.",
    },
    {
      q: "Hoe snel komt een spoed-loodgieter?",
      a: "Reguliere spoed: 60-120 minuten in de meeste regio's tijdens kantooruren. Avond/weekend: 90-180 minuten. Vraag bij telefoontje naar een concrete aankomsttijd, niet 'zo snel mogelijk'.",
    },
    {
      q: "Kan ik een lek zelf repareren?",
      a: "Tijdelijk met rubber + tape om druk te verminderen, maar echte reparatie is specialistenwerk. Zelf-reparatie dekt verzekering vaak niet. Spoed-loodgieter is binnen 1-2 uur goedkoper op lange termijn.",
    },
  ],
  related: [
    {
      href: "/spoed/wc-loopt-door",
      title: "WC loopt door",
      description: "Andere veelvoorkomende spoed-melding: zelf oplossen of loodgieter bellen?",
    },
    {
      href: "/kosten/loodgieter-uurtarief-2026",
      title: "Loodgieter uurtarief",
      description: "Wat kost een loodgieter in 2026? Daguren, spoed, voorrijkosten.",
    },
    {
      href: "/kiezen/loodgieter-of-rioolservice",
      title: "Loodgieter of rioolservice?",
      description: "Grensgeval: wanneer heb je een rioolspecialist nodig?",
    },
    {
      href: "https://vindrioolservice.nl/spoed/verstopping-afvoer-wat-doen",
      title: "Verstopping afvoer",
      description: "Bij rioolprobleem buiten huis: rioolservice beter dan loodgieter.",
    },
  ],
};

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: data.slug },
  openGraph: { title: data.metaTitle, description: data.metaDescription, type: "article", locale: "nl_NL" },
};

export default function Page() {
  return <ClusterLayout data={data} />;
}
