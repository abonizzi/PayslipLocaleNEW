"use client";

/**
 * Buste Paga PWA
 * (c) 2026 Andrea Bonizzi. Tutti i diritti riservati / All Rights Reserved.
 * Codice proprietario: copia, distribuzione, modifica o riutilizzo non
 * autorizzati, totali o parziali, sono vietati senza consenso scritto
 * dell'autore. Vedi il file LICENSE nella radice del progetto.
 */

export function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h4 className="text-xs uppercase tracking-wide text-slate-500 mb-2">{title}</h4>
      <div className="rounded-xl border border-base-700 bg-base-850 divide-y divide-base-700">
        {children}
      </div>
    </div>
  );
}

export function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
