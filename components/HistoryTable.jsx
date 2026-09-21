"use client";

/**
 * Buste Paga PWA
 * (c) 2026 Andrea Bonizzi. Tutti i diritti riservati / All Rights Reserved.
 * Codice proprietario: copia, distribuzione, modifica o riutilizzo non
 * autorizzati, totali o parziali, sono vietati senza consenso scritto
 * dell'autore. Vedi il file LICENSE nella radice del progetto.
 */

import { ChevronRight, Gift } from "lucide-react";
import { periodoLabel, formatEuro, estraiPremiProduzione } from "@/lib/format";
import MaskableAmount from "@/components/MaskableAmount";

export default function HistoryTable({ payslips, onSelect }) {
  if (!payslips || payslips.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-base-700 p-6 text-center text-slate-500 text-sm">
        Nessuna busta paga caricata. Carica la prima per iniziare.
      </div>
    );
  }

  const ordinati = [...payslips].sort(
    (a, b) => (b.anno - a.anno) || (b.mese - a.mese)
  );

  return (
    <div className="rounded-2xl border border-base-700 bg-base-900 overflow-hidden divide-y divide-base-700">
      {ordinati.map((p) => {
        const premi = estraiPremiProduzione(p.voci_variabili);
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className="w-full flex items-center justify-between gap-3 p-4 text-left active:bg-base-850"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium">{periodoLabel(p)}</span>
                {premi.length > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent-soft px-1.5 py-0.5 rounded-full">
                    <Gift className="h-3 w-3" /> Premio
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Lordo <MaskableAmount value={p.lordo_totale} /> · Ticket {formatEuro(p.totale_ticket)}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-semibold text-good">
                <MaskableAmount value={p.netto_in_busta} />
              </span>
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
