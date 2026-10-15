import Image from "next/image";

/**
 * Foto do hero: mãos digitando código num notebook, dissolvida no fundo.
 *
 * Imagem fornecida pelo cliente (WebP 1907×825). Panorâmica com o notebook à
 * direita: o `object-position` em `.hv-photo-img` mantém notebook e mãos à
 * vista, e o lado esquerdo escuro cai dentro da zona do degradê.
 *
 * A máscara em `.hv-photo` faz o degradê da esquerda para a direita a partir
 * do fim da coluna de texto (vertical no mobile); o zoom lento (Ken Burns) só
 * roda sem `prefers-reduced-motion`.
 */
export default function HeroVisual() {
  return (
    <div className="hv-photo">
      <Image
        src="/hero-code.webp"
        alt="Pessoa digitando código em um notebook, com monitores e uma caneca ao fundo, em tons de azul"
        fill
        sizes="(min-width: 1024px) 65vw, 100vw"
        loading="eager"
        fetchPriority="high"
        className="hv-photo-img"
      />
    </div>
  );
}
