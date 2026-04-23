export function CostTable() {
  const rows = [
    {
      item: "Voorrijkosten (daguren)",
      price: "€40 – €70",
      note: "Gemiddelde bij loodgieters in NL. Buiten kantoortijd vaak €70-€100.",
    },
    {
      item: "Uurtarief (daguren)",
      price: "€55 – €80",
      note: "Enkele zzp'ers €45, grotere bedrijven tot €95.",
    },
    {
      item: "Spoed-uurtarief (avond/weekend)",
      price: "€90 – €130",
      note: "150%-200% van daguren. Vraag altijd vooraf bevestiging.",
    },
    {
      item: "Lekkage opsporen",
      price: "€95 – €180",
      note: "Zichtlocatie vaak goedkoper. Complex (achter wanden) met thermografie €250+.",
    },
    {
      item: "WC binnenwerk vervangen",
      price: "€65 – €130",
      note: "Exclusief onderdelen (~€25-€40).",
    },
    {
      item: "Kraan vervangen (keuken/bad)",
      price: "€70 – €140",
      note: "Plus kraan zelf. Thermostaatkraan duurder.",
    },
    {
      item: "Badkamer renovatie (loodgieter-deel)",
      price: "€1.200 – €3.500",
      note: "Alleen loodgieterwerk. Tegelen en bouw apart.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
        Loodgieter uurtarief en klus-kostenlijst 2026
      </h2>
      <p className="mt-3 text-slate-700 max-w-3xl">
        Realistische richtprijzen. Verschillen binnen een regio zijn meestal
        kleiner dan tussen regio's — met name de Randstad zit €10-€20 hoger
        dan het oosten en zuiden van Nederland.
      </p>
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl border border-slate-200 overflow-hidden">
          <thead className="bg-slate-100 text-left text-sm">
            <tr>
              <th className="px-4 py-3 font-semibold">Dienst</th>
              <th className="px-4 py-3 font-semibold">Prijsindicatie</th>
              <th className="px-4 py-3 font-semibold">Toelichting</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {rows.map((r) => (
              <tr key={r.item}>
                <td className="px-4 py-3 font-medium whitespace-nowrap">{r.item}</td>
                <td className="px-4 py-3 font-semibold accent-text">{r.price}</td>
                <td className="px-4 py-3 text-slate-700">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-slate-500">
        Prijzen zijn landelijk gemiddeld 2026 — schommelt 10-15% per regio.
        Vraag altijd een schriftelijke offerte voor je akkoord gaat.
      </p>
    </section>
  );
}
