import { sendGAEvent } from "@next/third-parties/google";

/**
 * ID de medição do GA4 (G-XXXXXXX). Sem ele, nada de analytics é carregado
 * e `trackEvent` vira no-op — útil em dev e em previews.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Dispara um evento no GA4. Nunca envie dados pessoais (nome, e-mail,
 * telefone, texto digitado) nos parâmetros: os termos do Google proíbem e a
 * LGPD agradece.
 */
export function trackEvent(name: string, params: EventParams = {}) {
  if (!GA_ID || typeof window === "undefined") return;
  sendGAEvent("event", name, params);
}
