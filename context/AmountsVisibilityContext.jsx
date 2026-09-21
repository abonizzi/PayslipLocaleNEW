"use client";

/**
 * Buste Paga PWA
 * (c) 2026 Andrea Bonizzi. Tutti i diritti riservati / All Rights Reserved.
 * Codice proprietario: copia, distribuzione, modifica o riutilizzo non
 * autorizzati, totali o parziali, sono vietati senza consenso scritto
 * dell'autore. Vedi il file LICENSE nella radice del progetto.
 */

import { createContext, useContext, useState } from "react";

const AmountsVisibilityContext = createContext(null);

// Stato volutamente NON salvato in localStorage: si azzera (torna visibile)
// ogni volta che l'app viene riaperta da zero, come richiesto.
export function AmountsVisibilityProvider({ children }) {
  const [hidden, setHidden] = useState(false);

  function toggle() {
    setHidden((h) => !h);
  }

  return (
    <AmountsVisibilityContext.Provider value={{ hidden, toggle }}>
      {children}
    </AmountsVisibilityContext.Provider>
  );
}

export function useAmountsVisibility() {
  const ctx = useContext(AmountsVisibilityContext);
  if (!ctx) {
    throw new Error("useAmountsVisibility deve essere usato dentro <AmountsVisibilityProvider>");
  }
  return ctx;
}
