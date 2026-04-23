import { siteConfig } from "@/config/site.config";

export function DualCtaHero() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-tight max-w-3xl">
          {siteConfig.h1}
        </h1>
        <p className="mt-5 text-lg text-slate-700 leading-relaxed max-w-3xl">
          {siteConfig.heroIntro}
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl p-6 border-2 border-red-200 bg-red-50">
            <div className="text-sm font-bold uppercase tracking-wide text-red-700">
              🚨 Spoed — nu hulp nodig
            </div>
            <div className="mt-3 font-semibold text-slate-900 text-lg">
              Lekkage · WC loopt door · geen water
            </div>
            <p className="mt-2 text-sm text-slate-700">
              Lokale loodgieter vaak binnen 60-90 min ter plaatse. Wij matchen je met
              een partij die 24/7 spoed doet.
            </p>
            <a
              href="#aanvragen"
              className="shiny-btn mt-4 inline-block bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-3 rounded-md"
            >
              Spoed-aanvraag doen
            </a>
          </div>

          <div className="rounded-2xl p-6 border-2 border-slate-200 bg-white">
            <div className="text-sm font-bold uppercase tracking-wide accent-text">
              📋 Planbaar — offerte vergelijken
            </div>
            <div className="mt-3 font-semibold text-slate-900 text-lg">
              Badkamer · sanitair · vloerverwarming · renovatie
            </div>
            <p className="mt-2 text-sm text-slate-700">
              Geen haast? Vergelijk 2-4 offertes en kies bewust. Reactie doorgaans
              binnen 24 uur.
            </p>
            <a
              href="#aanvragen"
              className="shiny-btn mt-4 inline-block accent-bg text-white font-medium px-5 py-3 rounded-md"
            >
              Offertes aanvragen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
