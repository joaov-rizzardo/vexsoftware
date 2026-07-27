"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";
import { IconTrendingUp, IconHelp } from "./icons";

const pains = [
  "Você ainda controla pedidos no WhatsApp?",
  "Perde clientes por demora no atendimento?",
  "Usa planilhas para tudo?",
  "Tem retrabalho todos os dias?",
];

export default function ProblemSection() {
  const reduce = useReducedMotion();

  return (
    <section id="sobre" className="relative bg-white py-24">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <Reveal as="h2" className="font-display text-3xl font-bold leading-tight tracking-tight text-navy-800 sm:text-4xl">
            Seu negócio cresceu.
            <br />
            Seus processos também
            <br />
            precisam <span className="text-accent-500">crescer</span>.
          </Reveal>

          <ul className="mt-8 space-y-4">
            {pains.map((pain, i) => (
              <Reveal as="li" key={pain} delay={0.08 * i} direction="left">
                <span className="flex items-start gap-3 text-lg text-slate-600">
                  <IconHelp className="mt-0.5 h-6 w-6 shrink-0 text-brand-500" />
                  {pain}
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-slate-500">
              Nós transformamos esses problemas em sistemas simples que economizam
              tempo e aumentam seu faturamento.
            </p>
          </Reveal>
        </div>

        {/* Image + floating card */}
        <Reveal direction="right" className="relative">
          <div className="relative overflow-hidden rounded-2xl shadow-soft ring-1 ring-slate-200">
            <Image
              src="/problem-section.jpg"
              alt="Empresário analisando processos do negócio no computador"
              width={1200}
              height={800}
              className="h-[420px] w-full object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/30 to-transparent" />
          </div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 right-4 max-w-[16rem] rounded-2xl bg-navy-800 p-5 text-white shadow-glow ring-1 ring-white/10 sm:right-6"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400">
                <IconTrendingUp className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-semibold leading-snug">Mais organização</p>
              <p className="text-sm font-semibold leading-snug text-slate-300">
                Menos trabalho manual
              </p>
              <p className="text-sm font-semibold leading-snug text-accent-400">
                Mais lucro para o seu negócio
              </p>
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
