"use client";

import { useEffect, useRef } from "react";

// Mesmo efeito do logo da Vex nos sites do Projeto Caramelo e do Vinicius
// Simões. Parado, o logo é texto de verdade (nítido como qualquer texto da
// página); só durante a animação ele é trocado por um canvas que redesenha
// as mesmas letras, nas mesmas posições, e as desfaz em pixels.
const BLOCO = 1.5; // tamanho do "pixel" da animação
const MARGEM = 10; // folga ao redor das letras para os pixels se espalharem
const SUPERAMOSTRA = 4; // resolução extra das letras para ficarem nítidas
const DURACAO = 1400; // ms para a onda atravessar a palavra
const LARGURA_ONDA = 0.35; // fração da palavra afetada ao mesmo tempo

type Pixel = { x: number; y: number; a: number; cor: string; dx: number; dy: number; giro: number };

type Props = {
  /** Classe de cor de "SOFTWARE" (o "VEX" é sempre branco) */
  corSoftware: string;
  /** Sem `href` o logo não é link (ex.: rodapé) */
  href?: string;
};

// Logo da Vex: ao passar o mouse, uma onda atravessa a palavra desfazendo as
// letras em pixels e refazendo-as logo atrás
export default function VexLogo({ corSoftware, href }: Props) {
  const raiz = useRef<HTMLElement>(null);
  const vex = useRef<HTMLSpanElement>(null);
  const software = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const letras = useRef<HTMLCanvasElement | null>(null);
  const pixels = useRef<Pixel[]>([]);
  const tamanho = useRef({ w: 0, h: 0, lw: 0, lh: 0 });
  const quadro = useRef(0);

  // Copia fonte, cor e posição de cada linha do texto real, para o canvas
  // ficar idêntico a ele na troca
  function preparar() {
    const r = raiz.current, c = canvas.current;
    if (!r || !c || !vex.current || !software.current) return false;
    const caixa = r.getBoundingClientRect();
    const lw = Math.ceil(caixa.width);
    const lh = Math.ceil(caixa.height);
    const s = (window.devicePixelRatio || 1) * SUPERAMOSTRA;

    const recorte = document.createElement("canvas");
    recorte.width = Math.ceil(lw * s);
    recorte.height = Math.ceil(lh * s);
    const ctx = recorte.getContext("2d")!;
    ctx.scale(s, s);
    ctx.textBaseline = "alphabetic";
    for (const el of [vex.current, software.current]) {
      const estilo = getComputedStyle(el);
      const linha = el.getBoundingClientRect();
      const espaco = parseFloat(estilo.letterSpacing) || 0;
      ctx.font = `${estilo.fontWeight} ${estilo.fontSize} ${estilo.fontFamily}`;
      ctx.fillStyle = estilo.color;
      // Linha de base centrada na caixa da linha, como o navegador faz
      const m = ctx.measureText(el.textContent ?? "");
      const alto = m.fontBoundingBoxAscent + m.fontBoundingBoxDescent;
      const y = linha.top - caixa.top + (linha.height - alto) / 2 + m.fontBoundingBoxAscent;
      let x = linha.left - caixa.left;
      for (const letra of el.textContent ?? "") {
        ctx.fillText(letra, x, y);
        x += ctx.measureText(letra).width + espaco;
      }
    }
    letras.current = recorte;

    // Agrupa em blocos: cada bloco com tinta vira um pixel da animação, com a
    // cor média do bloco (o "SOFTWARE" se desfaz em cinza, não em branco)
    const d = ctx.getImageData(0, 0, recorte.width, recorte.height).data;
    const lista: Pixel[] = [];
    for (let by = 0; by < lh; by += BLOCO) {
      for (let bx = 0; bx < lw; bx += BLOCO) {
        let soma = 0, vr = 0, vg = 0, vb = 0, n = 0;
        const x0 = Math.floor(bx * s), x1 = Math.min(recorte.width, Math.floor((bx + BLOCO) * s));
        const y0 = Math.floor(by * s), y1 = Math.min(recorte.height, Math.floor((by + BLOCO) * s));
        for (let y = y0; y < y1; y++) {
          for (let x = x0; x < x1; x++) {
            const i = (y * recorte.width + x) * 4;
            const a = d[i + 3];
            soma += a;
            vr += d[i] * a;
            vg += d[i + 1] * a;
            vb += d[i + 2] * a;
            n++;
          }
        }
        const a = n ? soma / n / 255 : 0;
        if (a < 0.08) continue;
        const cor = `rgb(${Math.round(vr / soma)},${Math.round(vg / soma)},${Math.round(vb / soma)})`;
        const ang = Math.random() * Math.PI * 2;
        const dist = 3 + Math.random() * 8;
        lista.push({ x: bx, y: by, a, cor, dx: Math.cos(ang) * dist, dy: Math.sin(ang) * dist, giro: Math.random() * Math.PI * 2 });
      }
    }
    pixels.current = lista;

    const w = lw + MARGEM * 2;
    const h = lh + MARGEM * 2;
    tamanho.current = { w, h, lw, lh };
    const dpr = window.devicePixelRatio || 1;
    c.width = Math.ceil(w * dpr);
    c.height = Math.ceil(h * dpr);
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    return true;
  }

  // t entre 0 e 1: posição da onda
  function desenhar(t: number) {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    const img = letras.current;
    if (!c || !ctx || !img) return;
    const { w, h, lw, lh } = tamanho.current;
    const dpr = c.width / w;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, MARGEM, MARGEM, lw, lh);

    // A frente da onda vai de antes da primeira letra até depois da última.
    // Fora da faixa da onda as letras ficam nítidas; dentro dela viram pixels
    const frente = -LARGURA_ONDA + t * (1 + LARGURA_ONDA * 2);
    const ini = Math.max(0, Math.floor(((frente - LARGURA_ONDA) * lw) / BLOCO) * BLOCO);
    const fim = Math.min(lw, Math.ceil(((frente + LARGURA_ONDA) * lw) / BLOCO) * BLOCO);
    if (fim > ini) ctx.clearRect(MARGEM + ini, MARGEM - 1, fim - ini, lh + 2);
    for (const p of pixels.current) {
      if (p.x < ini || p.x >= fim) continue;
      const fase = (p.x / lw - frente) / LARGURA_ONDA; // -1..1 dentro da onda
      const k = Math.abs(fase) < 1 ? Math.cos((fase * Math.PI) / 2) ** 2 : 0;
      const ondula = Math.sin(fase * Math.PI * 2 + p.giro) * 4;
      const tam = BLOCO * (1 - 0.35 * k);
      ctx.globalAlpha = p.a * (1 - 0.3 * k);
      ctx.fillStyle = p.cor;
      ctx.fillRect(
        MARGEM + p.x + k * p.dx + (BLOCO - tam) / 2,
        MARGEM + p.y + k * (p.dy + ondula) + (BLOCO - tam) / 2,
        tam,
        tam,
      );
    }
    ctx.globalAlpha = 1;
  }

  // Durante a animação o texto real fica invisível e o canvas aparece
  function trocar(animando: boolean) {
    if (animando) raiz.current?.setAttribute("data-animando", "");
    else raiz.current?.removeAttribute("data-animando");
  }

  async function animar() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(quadro.current);
    // Prepara na hora (com a fonte já carregada) para copiar o texto como está
    await document.fonts.ready;
    if (!preparar()) return;
    const inicio = performance.now();
    desenhar(0);
    trocar(true);
    const passo = (agora: number) => {
      const t = (agora - inicio) / DURACAO;
      if (t > 1) return trocar(false);
      desenhar(t);
      quadro.current = requestAnimationFrame(passo);
    };
    quadro.current = requestAnimationFrame(passo);
  }

  useEffect(() => () => cancelAnimationFrame(quadro.current), []);

  const conteudo = (
    <>
      <span className="flex flex-col leading-none group-data-animando:invisible" aria-hidden="true">
        <span ref={vex} className="font-display text-2xl font-bold tracking-[0.35em] text-white">
          VEX
        </span>
        <span ref={software} className={`text-[0.55rem] tracking-[0.5em] ${corSoftware}`}>
          SOFTWARE
        </span>
      </span>
      <canvas
        ref={canvas}
        className="pointer-events-none invisible absolute -top-2.5 -left-2.5 group-data-animando:visible"
        aria-hidden="true"
      />
    </>
  );

  const classe = "group relative block w-fit rounded";

  if (!href) {
    return (
      <span
        ref={raiz as React.RefObject<HTMLSpanElement>}
        role="img"
        aria-label="VEX Software"
        className={classe}
        onMouseEnter={animar}
      >
        {conteudo}
      </span>
    );
  }

  return (
    <a
      ref={raiz as React.RefObject<HTMLAnchorElement>}
      href={href}
      aria-label="VEX Software"
      className={`${classe} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400`}
      onMouseEnter={animar}
      onFocus={animar}
    >
      {conteudo}
    </a>
  );
}
