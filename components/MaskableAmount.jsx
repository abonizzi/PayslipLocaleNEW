"use client";

/**
 * Buste Paga PWA
 * (c) 2026 Andrea Bonizzi. Tutti i diritti riservati / All Rights Reserved.
 * Codice proprietario: copia, distribuzione, modifica o riutilizzo non
 * autorizzati, totali o parziali, sono vietati senza consenso scritto
 * dell'autore. Vedi il file LICENSE nella radice del progetto.
 */

import { useAmountsVisibility } from "@/context/AmountsVisibilityContext";
import { formatEuro } from "@/lib/format";

export default function MaskableAmount({ value }) {
  const { hidden } = useAmountsVisibility();
  if (hidden) {
    return <span aria-label="Importo nascosto">••••••</span>;
  }
  return <>{formatEuro(value)}</>;
}
