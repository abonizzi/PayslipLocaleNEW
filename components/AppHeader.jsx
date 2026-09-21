"use client";

/**
 * Buste Paga PWA
 * (c) 2026 Andrea Bonizzi. Tutti i diritti riservati / All Rights Reserved.
 * Codice proprietario: copia, distribuzione, modifica o riutilizzo non
 * autorizzati, totali o parziali, sono vietati senza consenso scritto
 * dell'autore. Vedi il file LICENSE nella radice del progetto.
 */

import Link from "next/link";
import { RefreshCw, Settings as SettingsIcon } from "lucide-react";
import YearMenu from "@/components/YearMenu";
import { usePayslips } from "@/context/PayslipsContext";
import { useAmountsVisibility } from "@/context/AmountsVisibilityContext";

export default function AppHeader({ icon: Icon, title, subtitle }) {
  const { reload, loading } = usePayslips();
  const { hidden, toggle } = useAmountsVisibility();

  return (
    <header className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg font-semibold leading-tight truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs text-slate-500 leading-tight truncate">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <YearMenu />
        <button
          onClick={toggle}
          className="p-2 rounded-full border border-base-700 active:bg-base-800 text-base leading-none"
          aria-label={hidden ? "Mostra importi" : "Nascondi importi"}
          title={hidden ? "Mostra importi" : "Nascondi importi"}
        >
          {hidden ? "🙈" : "👁️"}
        </button>
        <button
          onClick={reload}
          className="p-2 rounded-full border border-base-700 active:bg-base-800"
          aria-label="Aggiorna"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
        <Link
          href="/settings"
          className="p-2 rounded-full border border-base-700 active:bg-base-800"
          aria-label="Impostazioni"
        >
          <SettingsIcon className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
