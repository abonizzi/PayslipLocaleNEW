"use client";

/**
 * Buste Paga PWA
 * (c) 2026 Andrea Bonizzi. Tutti i diritti riservati / All Rights Reserved.
 * Codice proprietario: copia, distribuzione, modifica o riutilizzo non
 * autorizzati, totali o parziali, sono vietati senza consenso scritto
 * dell'autore. Vedi il file LICENSE nella radice del progetto.
 */

import { Wallet, TrendingUp, Coins, ReceiptText } from "lucide-react";
import UploadCard from "@/components/UploadCard";
import StatCard from "@/components/StatCard";
import MaskableAmount from "@/components/MaskableAmount";
import NettoLordoChart from "@/components/charts/NettoLordoChart";
import HistoryTable from "@/components/HistoryTable";
import DetailModal from "@/components/DetailModal";
import AppHeader from "@/components/AppHeader";
import EmptyYearState from "@/components/EmptyYearState";
import { useState } from "react";
import { usePayslips } from "@/context/PayslipsContext";
import { calcLordoMedioMensile, getLatestPayslip } from "@/lib/ral";

export default function Page() {
  const { payslips, allPayslips, selectedYear, loading } = usePayslips();
  const [selected, setSelected] = useState(null);

  const ultima = getLatestPayslip(payslips);
  const nettoMedio =
    payslips.length > 0
      ? payslips.reduce((sum, p) => sum + (p.netto_in_busta || 0), 0) / payslips.length
      : null;
  const lordoMedio = calcLordoMedioMensile(payslips);

  return (
    <main className="max-w-md sm:max-w-2xl lg:max-w-6xl mx-auto px-4 pb-28 pt-6 flex flex-col gap-5">
      <AppHeader icon={ReceiptText} title="Buste Paga" subtitle="Dashboard personale" />

      <UploadCard />

      {loading && payslips.length === 0 ? (
        <div className="text-center text-sm text-slate-500 py-8">Caricamento storico…</div>
      ) : payslips.length === 0 ? (
        <EmptyYearState hasAnyData={allPayslips.length > 0} selectedYear={selectedYear} />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard
              icon={Wallet}
              label="Ultimo netto"
              value={<MaskableAmount value={ultima.netto_in_busta} />}
              sub={ultima.mese && ultima.anno ? `${ultima.mese}/${ultima.anno}` : null}
            />
            <StatCard
              icon={TrendingUp}
              label="Netto medio"
              value={<MaskableAmount value={nettoMedio} />}
              sub={`su ${payslips.length} bust${payslips.length === 1 ? "a" : "e"}`}
              accent="text-good"
            />
            <StatCard
              icon={Coins}
              label="Lordo medio mensile"
              value={<MaskableAmount value={lordoMedio} />}
              sub="bonus inclusi"
              accent="text-accent-soft"
            />
          </div>

          <NettoLordoChart payslips={payslips} />

          <section>
            <h2 className="text-sm font-medium text-slate-300 mb-2 px-1">Storico buste paga</h2>
            <HistoryTable payslips={payslips} onSelect={setSelected} />
          </section>
        </>
      )}

      <DetailModal payslip={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
