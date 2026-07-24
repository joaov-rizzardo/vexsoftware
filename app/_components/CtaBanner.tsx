"use client";

import { Reveal } from "./Reveal";
import { IconArrowRight, IconChatBubble } from "./icons";

export default function CtaBanner() {
  return (
    <section id="contato" className="relative bg-navy-800 pb-24">
      <div className="container-narrow">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(120deg,#2563eb,#1e40af)] px-8 py-10 shadow-glow sm:px-12">
            {/* decorative shimmer */}
            <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(60%_120%_at_100%_0%,#93c5fd_0%,transparent_60%)]" />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="flex items-start gap-5">
                <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 sm:inline-flex">
                  <IconChatBubble className="h-7 w-7" />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    Vamos conversar sobre o seu projeto?
                  </h2>
                  <p className="mt-2 max-w-lg text-blue-100">
                    Conte para a gente o que você precisa e vamos mostrar como podemos
                    ajudar o seu negócio a crescer com tecnologia.
                  </p>
                </div>
              </div>
              <a
                href="#"
                className="group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-900/30 transition-all hover:-translate-y-0.5 hover:bg-accent-400"
              >
                Quero um orçamento
                <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
