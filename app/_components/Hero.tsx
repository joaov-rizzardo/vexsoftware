"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import DeviceMockup from "./DeviceMockup";
import { IconArrowRight, IconCheckCircle } from "./icons";

const HeroBackground = dynamic(() => import("./HeroBackground"), { ssr: false });

gsap.registerPlugin(useGSAP);

const bullets = [
  "Soluções sob medida",
  "Suporte próximo e rápido",
  "Tecnologia que cresce com você",
  "Seu negócio mais eficiente",
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // clearProps guarantees no residual inline opacity/transform is ever
      // left behind (prevents "stuck invisible" elements on interrupt/remount).
      gsap
        .timeline({
          defaults: { ease: "power3.out", clearProps: "opacity,transform" },
          delay: 0.15,
        })
        .from(".hero-badge", { y: 16, opacity: 0, duration: 0.6 })
        .from(".hero-line", { y: 30, opacity: 0, duration: 0.75, stagger: 0.12 }, "-=0.2")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { y: 18, opacity: 0, duration: 0.55 }, "-=0.3")
        .from(".hero-bullet", { y: 12, opacity: 0, duration: 0.45, stagger: 0.08 }, "-=0.15");
    },
    { scope: root }
  );

  return (
    <header
      id="inicio"
      ref={root}
      className="relative flex min-h-screen flex-col overflow-hidden text-white"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,#12275a_0%,#0a1124_45%,#060b1a_100%)]" />
      {/* Grid + glows */}
      <div className="bg-grid pointer-events-none absolute inset-0 bg-radial-fade" />
      <HeroBackground />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-brand-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-navy-600/40 blur-[130px]" />

      {/* Main content — the whole block (copy + devices + bullets) is
          vertically centered together so nothing drifts to the bottom edge */}
      <div className="relative z-10 flex flex-1 flex-col justify-center pt-20 pb-8 lg:pt-16">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10 lg:px-10">
          {/* Copy */}
          <div>
            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-medium text-slate-200 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
              </span>
              Software sob medida para pequenas e médias empresas
            </span>

            <h1 className="mt-5 font-display text-[2rem] font-bold leading-[1.1] tracking-tight sm:text-[2.5rem] lg:text-[2.75rem]">
              <span className="hero-line block">Tecnologia que faz</span>
              <span className="hero-line block">
                sua empresa <span className="text-brand-400">vender mais</span>,
              </span>
              <span className="hero-line block">
                economizar tempo e <span className="text-accent-400">crescer</span>.
              </span>
            </h1>

            <p className="hero-sub mt-5 max-w-md text-base leading-relaxed text-slate-300">
              Criamos sites, sistemas e automações para pequenas e médias empresas que
              querem profissionalizar seu negócio sem complicação.
            </p>

            {/* Animated as one element so both buttons always appear together */}
            <div className="hero-cta mt-7 flex flex-wrap gap-3">
              <a
                href="#contato"
                className="group flex cursor-pointer items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-900/40 transition-all hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-blue-500/50"
              >
                Solicitar orçamento
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#projetos"
                className="cursor-pointer rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Ver nossos projetos
              </a>
            </div>
          </div>

          {/* Devices */}
          <div className="relative">
            <DeviceMockup />
          </div>
        </div>

        {/* Trust bullets — single inline row when there's space, wraps gracefully */}
        <div className="mx-auto mt-10 w-full max-w-6xl px-6 lg:mt-12 lg:px-10">
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/10 pt-5 text-[0.8rem] text-slate-300 lg:justify-start">
            {bullets.map((b) => (
              <span key={b} className="hero-bullet flex items-center gap-2 whitespace-nowrap">
                <IconCheckCircle className="h-5 w-5 shrink-0 text-accent-400" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
