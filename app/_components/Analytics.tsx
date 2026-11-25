"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect } from "react";
import { GA_ID, trackEvent } from "./track";

/**
 * Carrega o GA4 e rastreia cliques por delegação: um único listener no
 * documento cobre também os links renderizados em Server Components, sem
 * precisar transformar cada um em componente de cliente.
 *
 * - Links de WhatsApp, `tel:` e `mailto:` são detectados pelo href, então
 *   qualquer link novo desse tipo já sai rastreado.
 * - Outros elementos entram com `data-track="nome_do_evento"`.
 * - `data-track-location` (no próprio elemento ou num ancestral) diz de onde
 *   veio o clique: "hero", "navbar", "footer"...
 */
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;

    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const el = target?.closest<HTMLElement>("a[href], [data-track]");
      if (!el) return;

      const event = eventFor(el);
      if (!event) return;

      const location =
        el.closest<HTMLElement>("[data-track-location]")?.dataset.trackLocation ??
        "unknown";

      trackEvent(event, {
        location,
        page_path: window.location.pathname,
        link_text: el.textContent?.trim().slice(0, 100) || el.getAttribute("aria-label") || undefined,
      });
    }

    // Captura: dispara antes de handlers que naveguem ou parem a propagação.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}

function eventFor(el: HTMLElement): string | null {
  if (el.dataset.track) return el.dataset.track;

  const href = el.getAttribute("href") ?? "";
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "whatsapp_click";
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  return null;
}
