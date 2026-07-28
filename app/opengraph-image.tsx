import { ImageResponse } from "next/og";
import { SITE_NAME } from "./site-config";

// Imagem de compartilhamento (WhatsApp, LinkedIn, X...). Gerada em build.
export const alt = `${SITE_NAME} — tecnologia que faz sua empresa crescer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          // Mesmo gradiente do hero (Hero.tsx)
          backgroundColor: "#060b1a",
          backgroundImage:
            "radial-gradient(120% 120% at 20% 0%, #12275a 0%, #0a1124 45%, #060b1a 100%)",
          color: "#ffffff",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: 18,
              lineHeight: 1,
            }}
          >
            VEX
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 12,
              color: "#94a3b8",
              marginTop: 6,
            }}
          >
            SOFTWARE
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -1.5,
            }}
          >
            <div style={{ display: "flex" }}>Tecnologia que faz</div>
            <div style={{ display: "flex" }}>
              <span>sua empresa&nbsp;</span>
              {/* A pontuação fica dentro do span colorido: no satori, spans
                  irmãos ganham um espaço visível entre si. */}
              <span style={{ color: "#60a5fa" }}>vender mais,</span>
            </div>
            <div style={{ display: "flex" }}>
              <span>economizar tempo e&nbsp;</span>
              <span style={{ color: "#4ade80" }}>crescer.</span>
            </div>
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              color: "#cbd5e1",
              display: "flex",
            }}
          >
            Sites, sistemas e automações para pequenas e médias empresas.
          </div>
        </div>
      </div>
    ),
    size
  );
}
