"use client";

/**
 * Buste Paga PWA
 * (c) 2026 Andrea Bonizzi. Tutti i diritti riservati / All Rights Reserved.
 * Codice proprietario: copia, distribuzione, modifica o riutilizzo non
 * autorizzati, totali o parziali, sono vietati senza consenso scritto
 * dell'autore. Vedi il file LICENSE nella radice del progetto.
 */

import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  X,
  UploadCloud,
  LayoutDashboard,
  Settings as SettingsIcon,
  ReceiptText,
} from "lucide-react";
import { setTutorialSeen } from "@/lib/tutorialStore";

const SLIDES = [
  {
    icon: ReceiptText,
    title: "Benvenuto in Buste Paga",
    text: "Carica una busta paga (PDF o foto) e l'AI ne estrae automaticamente tutti i dati, mostrandoli in una dashboard chiara con grafici.",
  },
  {
    icon: UploadCloud,
    title: "Carica le tue buste paga",
    text: "Dalla Dashboard puoi selezionare uno o più file PDF, oppure una o più foto insieme: l'app le elabora una alla volta.",
  },
  {
    icon: LayoutDashboard,
    title: "Esplora le sezioni",
    text: "In basso trovi Dashboard, Ferie/ROL, RAL, Ticket e Documenti — ogni sezione ha i suoi grafici e riepiloghi dedicati.",
  },
  {
    icon: SettingsIcon,
    title: "Personalizza tutto",
    text: "Dalle Impostazioni puoi collegare la sincronizzazione, scegliere le mensilità per la RAL, nascondere gli importi, attivare un PIN e molto altro.",
  },
];

export default function Tutorial({ onClose }) {
  const [index, setIndex] = useState(0);
  const [dontShow, setDontShow] = useState(true);

  const slide = SLIDES[index];
  const Icon = slide.icon;
  const isLast = index === SLIDES.length - 1;

  function handleClose() {
    if (dontShow) setTutorialSeen(true);
    onClose();
  }

  function handleNext() {
    if (isLast) {
      handleClose();
    } else {
      setIndex((i) => i + 1);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] bg-base-950 flex flex-col">
      <div className="flex justify-end p-4">
        <button
          onClick={handleClose}
          className="p-2 rounded-full text-slate-400 active:bg-base-800"
          aria-label="Chiudi tutorial"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center">
          <Icon className="h-8 w-8 text-accent" />
        </div>
        <h2 className="text-xl font-semibold">{slide.title}</h2>
        <p className="text-sm text-slate-400 max-w-xs">{slide.text}</p>
      </div>

      <div className="flex justify-center gap-1.5 pb-4">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-accent" : "w-1.5 bg-base-700"
            }`}
          />
        ))}
      </div>

      <div className="px-6 pb-6 flex flex-col gap-3 safe-bottom">
        <label className="flex items-center gap-2 text-xs text-slate-500 justify-center">
          <input
            type="checkbox"
            checked={dontShow}
            onChange={(e) => setDontShow(e.target.checked)}
            className="accent-accent"
          />
          Non mostrare più
        </label>
        <div className="flex gap-2">
          {index > 0 && (
            <button
              onClick={() => setIndex((i) => i - 1)}
              className="rounded-xl border border-base-700 px-4 py-2.5 text-sm text-slate-300"
              aria-label="Indietro"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-accent text-base-950 font-medium py-2.5"
          >
            {isLast ? "Inizia" : "Avanti"}
            {!isLast && <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
