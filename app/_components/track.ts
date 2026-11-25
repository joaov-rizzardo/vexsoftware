import { sendGAEvent } from "@next/third-parties/google";

/**
 * ID de medição do GA4 (G-XXXXXXX). Sem ele, o GA não é carregado — útil em
 * dev e em previews.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * ID do projeto no Microsoft Clarity. Sem ele, o Clarity não é carregado.
 */
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Dispara um evento no GA4. Nunca envie dados pessoais (nome, e-mail,
 * telefone, texto digitado) nos parâmetros: os termos do Google proíbem e a
 * LGPD agradece.
 */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  if (GA_ID) sendGAEvent("event", name, params);
  // No Clarity o evento serve para filtrar gravações e mapas de calor
  // (ex.: só sessões com clique no WhatsApp).
  if (CLARITY_ID) window.clarity?.("event", name);
}
