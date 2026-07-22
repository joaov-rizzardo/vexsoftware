"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { IconTrendingUp } from "./icons";

gsap.registerPlugin(useGSAP);

const LAPTOP_IMG =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=760&q=80";
const PHONE_IMG =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=440&h=880&q=80";

export default function DeviceMockup() {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(laptopRef.current, { y: 60, opacity: 0, duration: 0.9 })
        .from(
          phoneRef.current,
          { x: 40, y: 30, scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.4)" },
          "-=0.55"
        )
        .from(
          badgeRef.current,
          { y: 16, scale: 0.85, opacity: 0, duration: 0.5, ease: "back.out(1.6)" },
          "-=0.3"
        );

      // Mouse-driven 3D tilt (desktop, motion-safe)
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const rotY = gsap.quickTo(tiltRef.current, "rotationY", {
            duration: 0.6,
            ease: "power2.out",
          });
          const rotX = gsap.quickTo(tiltRef.current, "rotationX", {
            duration: 0.6,
            ease: "power2.out",
          });
          const onMove = (e: MouseEvent) => {
            const r = stageRef.current!.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            rotY(px * 12);
            rotX(-py * 8);
          };
          window.addEventListener("mousemove", onMove);
          return () => window.removeEventListener("mousemove", onMove);
        }
      );
    },
    { scope: stageRef }
  );

  return (
    <div
      ref={stageRef}
      className="relative mx-auto w-full max-w-md lg:max-w-lg"
      style={{ perspective: "1200px" }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/25 blur-[90px]" />

      <div ref={tiltRef} style={{ transformStyle: "preserve-3d" }}>
        <div className="relative animate-float-slow">
          {/* LAPTOP */}
          <div ref={laptopRef} className="relative z-10">
            <div className="rounded-t-2xl border border-slate-700/60 bg-slate-900 p-2 shadow-2xl shadow-blue-950/50">
              {/* top bar */}
              <div className="mb-2 flex items-center gap-1.5 px-1">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div className="relative overflow-hidden rounded-lg ring-1 ring-white/10">
                <Image
                  src={LAPTOP_IMG}
                  alt="Painel de indicadores e faturamento em um notebook"
                  width={1200}
                  height={760}
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="h-auto w-full object-cover"
                  priority
                />
                {/* subtle dark blend so the photo sits in the dark hero */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy-900/40 via-transparent to-brand-500/10" />
              </div>
            </div>
            <div className="mx-auto h-2.5 w-[108%] -translate-x-[3.7%] rounded-b-xl bg-gradient-to-b from-slate-700 to-slate-800 shadow-lg" />
          </div>

          {/* PHONE */}
          <div className="absolute -bottom-8 -right-2 z-20 w-[30%] sm:-right-6" ref={phoneRef}>
            <div className="rounded-[1.6rem] border border-slate-700/60 bg-slate-900 p-1.5 shadow-2xl shadow-blue-950/50">
              <div className="relative overflow-hidden rounded-[1.25rem] ring-1 ring-white/10">
                {/* notch */}
                <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-black/60" />
                <Image
                  src={PHONE_IMG}
                  alt="Aplicativo de gestão em um celular"
                  width={440}
                  height={880}
                  sizes="180px"
                  className="h-auto w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
              </div>
            </div>
          </div>

          {/* Floating KPI badge */}
          <div
            ref={badgeRef}
            className="absolute -left-3 top-8 z-30 flex items-center gap-2.5 rounded-xl bg-white/95 px-3.5 py-2.5 shadow-glow ring-1 ring-black/5 backdrop-blur sm:-left-8"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-50 text-accent-500">
              <IconTrendingUp className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-navy-800">+38%</p>
              <p className="text-[0.6rem] text-slate-500">Faturamento/mês</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
