"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { IconPlus } from "./icons";
import { faqs } from "./faq-data";

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${index}`;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-white">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-brand-400"
        >
          <IconPlus className="h-5 w-5" />
        </motion.span>
      </button>
      {/* Sempre renderizado (e nunca com `hidden`): a resposta precisa estar no
          HTML servido para ser indexada e para casar com o JSON-LD do FAQPage. */}
      <motion.div
        id={id}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
        aria-hidden={!open}
      >
        <p className="px-5 pb-4 text-sm leading-relaxed text-slate-400">{a}</p>
      </motion.div>
    </div>
  );
}

export default function Faq() {
  const left = faqs.slice(0, 3);
  const right = faqs.slice(3);

  return (
    <section id="faq" className="relative overflow-hidden bg-navy-800 py-24 text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 bg-radial-fade" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-brand-600/20 blur-[120px]" />

      <div className="relative container-narrow">
        <Reveal as="h2" className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Perguntas <span className="text-accent-400">frequentes</span>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            {left.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <Item q={f.q} a={f.a} index={i} />
              </Reveal>
            ))}
          </div>
          <div className="space-y-4">
            {right.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <Item q={f.q} a={f.a} index={i + 3} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
