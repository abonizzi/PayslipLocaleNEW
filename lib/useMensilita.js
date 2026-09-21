"use client";

/**
 * Buste Paga PWA
 * (c) 2026 Andrea Bonizzi. Tutti i diritti riservati / All Rights Reserved.
 * Codice proprietario: copia, distribuzione, modifica o riutilizzo non
 * autorizzati, totali o parziali, sono vietati senza consenso scritto
 * dell'autore. Vedi il file LICENSE nella radice del progetto.
 */

import { useEffect, useState } from "react";
import { getStoredMensilita } from "./settingsStore";

export function useMensilita() {
  const [mensilita, setMensilita] = useState(13);

  useEffect(() => {
    setMensilita(getStoredMensilita());
  }, []);

  return mensilita;
}
