/**
 * Buste Paga PWA
 * (c) 2026 Andrea Bonizzi. Tutti i diritti riservati / All Rights Reserved.
 * Codice proprietario: copia, distribuzione, modifica o riutilizzo non
 * autorizzati, totali o parziali, sono vietati senza consenso scritto
 * dell'autore. Vedi il file LICENSE nella radice del progetto.
 */

const TUTORIAL_KEY = "buste-paga:tutorial-seen";

export function isTutorialSeen() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(TUTORIAL_KEY) === "true";
}

export function setTutorialSeen(seen) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TUTORIAL_KEY, seen ? "true" : "false");
}
