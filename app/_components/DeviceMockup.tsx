"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function DeviceMockup() {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(mockupRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

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
      className="relative w-full origin-center lg:scale-105 xl:scale-110 xl:-mr-8"
      style={{ perspective: "1200px" }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/25 blur-[90px]" />

      <div ref={tiltRef} style={{ transformStyle: "preserve-3d" }}>
        <div className="relative animate-float-slow">
          {/* VEX dashboard on laptop + phone */}
          <div ref={mockupRef} className="relative z-10">
            <Image
              src="/dashboard-mockup.png"
              alt="Painel VEX exibindo dashboard, faturamento e indicadores em um notebook e celular"
              width={1264}
              height={843}
              sizes="(max-width: 1024px) 90vw, 60vw"
              className="h-auto w-full drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
