"use client";

/**
 * Buste Paga PWA
 * (c) 2026 Andrea Bonizzi. Tutti i diritti riservati / All Rights Reserved.
 * Codice proprietario: copia, distribuzione, modifica o riutilizzo non
 * autorizzati, totali o parziali, sono vietati senza consenso scritto
 * dell'autore. Vedi il file LICENSE nella radice del progetto.
 */

import { useState, useMemo } from "react";
import { FileText, Image as ImageIcon, ExternalLink, Loader2, Search, X } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import EmptyYearState from "@/components/EmptyYearState";
import { usePayslips } from "@/context/PayslipsContext";
import { getFileRecord } from "@/lib/localDb";
import { periodoLabel, MESI, MESI_ESTESI } from "@/lib/format";

function isPdf(payslip) {
  if (payslip.file_type) return payslip.file_type === "application/pdf";
  return (payslip.file_name || "").toLowerCase().endsWith(".pdf");
}

// Testo su cui cercare: mese abbreviato, mese esteso e anno, così "luglio",
// "lug" o "2026" trovano tutti la stessa busta.
function testoRicercabile(p) {
  const meseIdx = p.mese ? Math.min(Math.max(p.mese - 1, 0), 11) : null;
  const parti = [
    meseIdx !== null ? MESI[meseIdx] : "",
    meseIdx !== null ? MESI_ESTESI[meseIdx] : "",
    p.anno ? String(p.anno) : "",
  ];
  return parti.join(" ").toLowerCase();
}

export default function DocumentiPage() {
  const { payslips, allPayslips, selectedYear, loading } = usePayslips();
  const [openingId, setOpeningId] = useState(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const ordinati = useMemo(
    () => [...payslips].sort((a, b) => (b.anno - a.anno) || (b.mese - a.mese)),
    [payslips]
  );

  const filtrati = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ordinati;
    return ordinati.filter((p) => testoRicercabile(p).includes(q));
  }, [ordinati, query]);

  async function handleOpen(payslip) {
    setError("");
    setOpeningId(payslip.id);
    try {
      const record = await getFileRecord(payslip.id);
      if (!record?.blob) {
        throw new Error("File non trovato in locale (potrebbe essere stato caricato prima di questa versione).");
      }
      // Crea un URL temporaneo verso il file salvato in IndexedDB e lo apre.
      const url = URL.createObjectURL(record.blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (err) {
      setError(`Impossibile aprire il file: ${err.message || "errore sconosciuto"}`);
    } finally {
      setOpeningId(null);
    }
  }

  return (
    <main className="max-w-md sm:max-w-2xl lg:max-w-6xl mx-auto px-4 pb-28 pt-6 flex flex-col gap-5">
      <AppHeader icon={FileText} title="Documenti" subtitle="I file originali caricati" />

      {error && (
        <div className="rounded-xl border border-bad/30 bg-bad/10 text-bad text-sm p-3">
          {error}
        </div>
      )}

      {ordinati.length > 0 && (
        <div className="relative">
          <Search className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca per mese o anno (es. luglio, 2026)"
            className="w-full rounded-xl bg-base-900 border border-base-700 pl-9 pr-9 py-2.5 text-sm focus:outline-none focus:border-accent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
              aria-label="Cancella ricerca"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {loading && payslips.length === 0 ? (
        <div className="text-center text-sm text-slate-500 py-8">Caricamento…</div>
      ) : ordinati.length === 0 ? (
        <EmptyYearState
          hasAnyData={allPayslips.length > 0}
          selectedYear={selectedYear}
          message="Nessun documento caricato. Carica una busta paga dalla Dashboard per vederla qui."
        />
      ) : filtrati.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-base-700 p-8 text-center text-sm text-slate-500">
          Nessun documento trovato per "{query}".
        </div>
      ) : (
        <div className="rounded-2xl border border-base-700 bg-base-900 overflow-hidden divide-y divide-base-700">
          {filtrati.map((p) => {
            const pdf = isPdf(p);
            const opening = openingId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleOpen(p)}
                disabled={opening}
                className="w-full flex items-center gap-3 p-4 text-left active:bg-base-850 disabled:opacity-50"
              >
                <div className="h-10 w-10 rounded-xl bg-base-800 flex items-center justify-center shrink-0">
                  {pdf ? (
                    <FileText className="h-5 w-5 text-accent" />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-accent" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{periodoLabel(p)}</p>
                  <p className="text-xs text-slate-500 truncate">
                    {p.file_name || "Nome file non disponibile"}
                  </p>
                </div>
                {opening ? (
                  <Loader2 className="h-4 w-4 animate-spin text-slate-500 shrink-0" />
                ) : (
                  <ExternalLink className="h-4 w-4 text-slate-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </main>
  );
}
