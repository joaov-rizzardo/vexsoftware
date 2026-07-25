"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function DeviceMockup() {
  const stageRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(mockupRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    },
    { scope: stageRef }
  );

  return (
    <div ref={stageRef} className="relative w-full origin-center lg:scale-95 xl:scale-100">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/25 blur-[90px]" />

      <div className="relative animate-float-slow">
        {/* VEX dashboard on laptop + phone */}
        <div ref={mockupRef} className="relative z-10">
          <Image
            src="/dashboard-mockup.png"
            alt="Painel VEX exibindo dashboard, faturamento e indicadores em um notebook e celular"
            width={1461}
            height={979}
            sizes="(max-width: 1024px) 90vw, 55vw"
            className="h-auto w-full drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
