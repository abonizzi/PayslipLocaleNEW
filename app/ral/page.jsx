"use client";

/**
 * Buste Paga PWA
 * (c) 2026 Andrea Bonizzi. Tutti i diritti riservati / All Rights Reserved.
 * Codice proprietario: copia, distribuzione, modifica o riutilizzo non
 * autorizzati, totali o parziali, sono vietati senza consenso scritto
 * dell'autore. Vedi il file LICENSE nella radice del progetto.
 */

import Link from "next/link";
import { TrendingUp, Wallet, Clock, Settings as SettingsIcon } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/components/StatCard";
import EmptyYearState from "@/components/EmptyYearState";
import { Section, Row } from "@/components/InfoSection";
import MaskableAmount from "@/components/MaskableAmount";
import { usePayslips } from "@/context/PayslipsContext";
import { calcRalReale, calcRalIpotetica, getLatestPayslip } from "@/lib/ral";
import { useMensilita } from "@/lib/useMensilita";

export default function RalPage() {
  const { payslips, allPayslips, selectedYear, loading } = usePayslips();
  const latest = getLatestPayslip(payslips);
  const mensilita = useMensilita();
  const ralReale = calcRalReale(payslips);
  const ralIpotetica = calcRalIpotetica(payslips, mensilita);

  return (
    <main className="max-w-md sm:max-w-2xl lg:max-w-6xl mx-auto px-4 pb-28 pt-6 flex flex-col gap-5">
      <AppHeader icon={TrendingUp} title="RAL" subtitle="Retribuzione annua e paga oraria" />

      {loading && payslips.length === 0 ? (
        <div className="text-center text-sm text-slate-500 py-8">Caricamento…</div>
      ) : !latest ? (
        <EmptyYearState
          hasAnyData={allPayslips.length > 0}
          selectedYear={selectedYear}
          message="Nessuna busta paga caricata. Carica la prima dalla Dashboard per vedere qui la RAL."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard
              icon={Wallet}
              label="RAL reale"
              value={<MaskableAmount value={ralReale?.totale} />}
              sub={`Percepito nel ${ralReale?.anno} (${ralReale?.numBuste} bust${ralReale?.numBuste === 1 ? "a" : "e"})`}
              accent="text-good"
            />
            <StatCard
              icon={TrendingUp}
              label="RAL ipotetica"
              value={<MaskableAmount value={ralIpotetica?.totale} />}
              sub={`Proiezione ${ralIpotetica?.anno} · ${mensilita} mensilità`}
              accent="text-accent-soft"
            />
            <StatCard
              icon={Clock}
              label="Paga oraria"
              value={<MaskableAmount value={latest.paga_oraria} />}
              sub={`Livello ${latest.livello || "—"}`}
            />
          </div>

          <Section title="Come calcoliamo la RAL reale">
            <Row label="Anno di riferimento" value={ralReale?.anno ?? "—"} />
            <Row label="Buste sommate" value={ralReale?.numBuste ?? "—"} />
            <Row label="Ultimo mese incluso" value={ralReale?.ultimoMese ?? "—"} />
            <Row label="Totale lordo percepito" value={<MaskableAmount value={ralReale?.totale} />} />
          </Section>
          <p className="text-xs text-slate-500 -mt-3 px-1">
            Somma del lordo di tutte le buste caricate nell'anno {ralReale?.anno}: cresce man
            mano che carichi nuove buste, non è una proiezione.
          </p>

          <Section title="Come calcoliamo la RAL ipotetica">
            <Row label="Minimo tabellare + scatti + indennità mansione" value={<MaskableAmount value={ralIpotetica?.baseMensile} />} />
            <Row label={`× ${ralIpotetica?.mensilita} mensilità`} value={<MaskableAmount value={ralIpotetica?.baseAnnua} />} />
            <Row label="+ Bonus produzione (tranche caricate)" value={<MaskableAmount value={ralIpotetica?.bonusProduzione} />} />
            <Row label="Totale proiettato" value={<MaskableAmount value={ralIpotetica?.totale} />} />
          </Section>
          <p className="text-xs text-slate-500 -mt-3 px-1">
            Proiezione basata sulla retribuzione fissa dell'ultima busta caricata (esclusa
            l'indennità mensa/ticket, che non fa parte della RAL contrattuale) e sulle{" "}
            <b>{ralIpotetica?.mensilita} mensilità</b> scelte in{" "}
            <Link href="/settings" className="underline inline-flex items-center gap-0.5">
              Impostazioni <SettingsIcon className="h-3 w-3" />
            </Link>
            . La quattordicesima, se selezionata, è calcolata come uguale alla mensilità base. Il
            bonus produzione riflette solo le tranche già documentate nelle buste caricate: se
            manca ancora una tranche, il totale sarà provvisorio.
          </p>
        </>
      )}
    </main>
  );
}
