"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconWhatsApp, IconClose } from "./icons";
import { WHATSAPP_HREF } from "../site-config";

export default function WhatsAppFloat() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);
  const [tipDismissed, setTipDismissed] = useState(false);

  /* Aparece depois de um pequeno scroll — ou sozinho, se o visitante ficar parado. */
  useEffect(() => {
    const reveal = () => setVisible(true);
    const timer = setTimeout(reveal, 2200);
    const onScroll = () => {
      if (window.scrollY > 320) reveal();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* O balão abre sozinho uma vez para chamar atenção e se recolhe em seguida. */
  useEffect(() => {
    if (!visible || tipDismissed) return;
    const open = setTimeout(() => setTipOpen(true), 1400);
    const close = setTimeout(() => setTipOpen(false), 8000);
    return () => {
      clearTimeout(open);
      clearTimeout(close);
    };
  }, [visible, tipDismissed]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="fixed bottom-5 right-5 z-50 flex items-end gap-3 sm:bottom-7 sm:right-7"
        >
          {/* Balão de mensagem */}
          <AnimatePresence>
            {tipOpen && (
              <motion.div
                initial={{ opacity: 0, x: 16, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 16, scale: 0.9 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative mb-1.5 hidden max-w-[15rem] rounded-2xl rounded-br-sm bg-white py-3 pl-4 pr-9 text-sm leading-snug text-navy-800 shadow-soft ring-1 ring-slate-200 sm:block"
              >
                <strong className="font-display block font-semibold">
                  Fale com a gente
                </strong>
                <span className="text-[color:var(--slate-500)]">
                  Tire suas dúvidas pelo WhatsApp. Resposta rápida.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setTipOpen(false);
                    setTipDismissed(true);
                  }}
                  aria-label="Fechar mensagem"
                  className="absolute right-2 top-2 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-[color:var(--slate-400)] transition-colors hover:bg-slate-100 hover:text-navy-800"
                >
                  <IconClose className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão */}
          <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
            {/* Ondas de destaque */}
            {!reduce &&
              [0, 1.1].map((delay) => (
                <motion.span
                  key={delay}
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-accent-500"
                  /* Começa e termina em opacity 0 para o loop reiniciar
                     invisível, sem o "pulo" de volta ao tamanho original. */
                  animate={{ scale: [1, 1.4, 2.1], opacity: [0, 0.45, 0] }}
                  transition={{
                    duration: 2.6,
                    delay,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.25, 1],
                  }}
                />
              ))}

            <motion.a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar no WhatsApp"
              onMouseEnter={() => !tipDismissed && setTipOpen(true)}
              onFocus={() => !tipDismissed && setTipOpen(true)}
              style={{ boxShadow: "0 14px 34px -12px rgba(34, 197, 94, 0.65)" }}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 22px 48px -12px rgba(34, 197, 94, 0.9)",
              }}
              whileTap={{ scale: 0.96 }}
              /* Tween simétrico: ida e volta usam a mesma curva, sem o repique
                 do spring ao soltar o hover. */
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-500 text-white ring-1 ring-white/25 outline-none focus-visible:ring-4 focus-visible:ring-accent-400/50"
            >
              <motion.span
                animate={
                  reduce ? undefined : { rotate: [0, -14, 12, -8, 6, 0] }
                }
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 3.6,
                  ease: "easeInOut",
                }}
                className="flex"
              >
                <IconWhatsApp className="h-7 w-7 sm:h-8 sm:w-8" />
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
