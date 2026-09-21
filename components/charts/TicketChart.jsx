"use client";

/**
 * Buste Paga PWA
 * (c) 2026 Andrea Bonizzi. Tutti i diritti riservati / All Rights Reserved.
 * Codice proprietario: copia, distribuzione, modifica o riutilizzo non
 * autorizzati, totali o parziali, sono vietati senza consenso scritto
 * dell'autore. Vedi il file LICENSE nella radice del progetto.
 */

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { periodoLabel, formatEuro } from "@/lib/format";

const TOOLTIP_STYLE = {
  backgroundColor: "#0f141b",
  border: "1px solid #2a3441",
  borderRadius: 8,
  fontSize: 12,
};

export default function TicketChart({ payslips }) {
  if (!payslips || payslips.length === 0) return null;

  const ordinati = [...payslips].sort((a, b) => (a.anno - b.anno) || (a.mese - b.mese));
  const data = ordinati.map((p) => ({
    periodo: periodoLabel(p),
    Valore: p.totale_ticket ?? 0,
  }));

  return (
    <div className="rounded-2xl border border-base-700 bg-base-900 p-3">
      <h3 className="text-sm font-medium text-slate-300 mb-2 px-1">
        Valore buoni pasto mese per mese
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ left: -20, right: 10 }}>
          <CartesianGrid stroke="#1c2430" vertical={false} />
          <XAxis dataKey="periodo" tick={{ fill: "#94a3b8", fontSize: 11 }} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
          <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(255,255,255,0.06)" }} formatter={(value) => formatEuro(value)} />
          <Bar dataKey="Valore" fill="#67e8f9" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
