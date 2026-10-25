"use client";

import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; r: number; a: number; vy: number; t: number };

/** Partículas discretas subindo ao fundo, como no hero do site. */
export default function Stars({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    let frame = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c!.width = innerWidth * dpr;
      h = c!.height = innerHeight * dpr;
      c!.style.width = innerWidth + "px";
      c!.style.height = innerHeight + "px";
      const n = Math.round((innerWidth * innerHeight) / 9000);
      dots = [];
      for (let i = 0; i < n; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (Math.random() * 1.2 + 0.3) * dpr,
          a: Math.random() * 0.5 + 0.15,
          vy: (Math.random() * 0.12 + 0.03) * dpr,
          t: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (const d of dots) {
        if (!reduce) {
          d.y -= d.vy;
          d.t += 0.02;
          if (d.y < 0) {
            d.y = h;
            d.x = Math.random() * w;
          }
        }
        ctx!.globalAlpha = d.a * (0.7 + 0.3 * Math.sin(d.t));
        ctx!.fillStyle = "#93c5fd";
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      if (!reduce) frame = requestAnimationFrame(draw);
    }

    function onResize() {
      resize();
      if (reduce) draw();
    }

    resize();
    draw();
    addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
