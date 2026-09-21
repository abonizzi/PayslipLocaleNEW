"use client";

/**
 * Buste Paga PWA
 * (c) 2026 Andrea Bonizzi. Tutti i diritti riservati / All Rights Reserved.
 * Codice proprietario: copia, distribuzione, modifica o riutilizzo non
 * autorizzati, totali o parziali, sono vietati senza consenso scritto
 * dell'autore. Vedi il file LICENSE nella radice del progetto.
 */

import { useEffect, useState } from "react";
import Tutorial from "@/components/Tutorial";
import { isTutorialSeen } from "@/lib/tutorialStore";

export default function TutorialGate({ children }) {
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!isTutorialSeen());
    setChecked(true);
  }, []);

  if (!checked) return null;
  if (show) return <Tutorial onClose={() => setShow(false)} />;
  return children;
}
