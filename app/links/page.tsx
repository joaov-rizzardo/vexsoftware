import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Stars from "./Stars";
import s from "./links.module.css";
import {
  EMAIL,
  PHONE_DISPLAY,
  PHONE_E164,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_PHONE,
} from "../site-config";

const TITLE = `Links | ${SITE_NAME}`;
// Ao definir `openGraph` aqui, a imagem herdada de app/opengraph-image some
// (merge raso), então ela é declarada de novo.
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — tecnologia que faz sua empresa crescer`,
};

const DESCRIPTION =
  "Sites, sistemas e automações para pequenas e médias empresas. Fale com a VEX Software pelo WhatsApp, conheça o site ou peça seu orçamento.";

export const metadata: Metadata = {
  title: "Links",
  description: DESCRIPTION,
  alternates: { canonical: "/links" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/links`,
    siteName: SITE_NAME,
    type: "website",
    locale: "pt_BR",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#060b1a",
  viewportFit: "cover",
};

// Mensagem própria: quem chega aqui veio da bio do Instagram, não do site.
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  "Olá! Vim pelo Instagram da VEX Software e gostaria de solicitar um orçamento."
)}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/links#webpage`,
      url: `${SITE_URL}/links`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      breadcrumb: { "@id": `${SITE_URL}/links#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/links#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Links", item: `${SITE_URL}/links` },
      ],
    },
  ],
};

const badges = [
  "Softwares para impulsionar negócios",
  "Soluções para desafios reais",
  "Tecnologia que simplifica processos",
  "Sites, sistemas e automações",
];

function Arrow() {
  return (
    <svg className={s.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function LinksPage() {
  return (
    <div className={s.page}>
      <script
        type="application/ld+json"
        // `<` evita que qualquer `<` no conteúdo feche o <script> (XSS).
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Stars className={s.stars} />

      <main className={s.main}>
        <header className={s.profile}>
          <h1 className={`${s.wordmark} ${s.reveal}`} style={{ animationDelay: ".05s" }} aria-label={SITE_NAME}>
            <b>VEX</b>
            <small>SOFTWARE</small>
          </h1>

          <p className={`${s.headline} ${s.reveal}`} style={{ animationDelay: ".1s" }}>
            Tecnologia para sua empresa <span className={s.b}>vender mais</span> e{" "}
            <span className={s.g}>crescer</span>.
          </p>
          <ul className={`${s.badges} ${s.reveal}`} style={{ animationDelay: ".15s" }}>
            {badges.map((badge) => (
              <li key={badge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8.5 12.5l2.5 2.5 4.5-5" />
                </svg>
                {badge}
              </li>
            ))}
          </ul>
        </header>

        <nav className={s.links} aria-label="Links da VEX Software">
          <a
            className={`${s.link} ${s.primary} ${s.reveal}`}
            style={{ animationDelay: ".25s" }}
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener"
          >
            <span className={s.ico}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01a9.47 9.47 0 0 1-4.82-1.32l-.35-.2-3.59.94.96-3.5-.23-.36a9.46 9.46 0 0 1-1.45-5.04c0-5.23 4.26-9.49 9.5-9.49a9.43 9.43 0 0 1 6.71 2.78 9.43 9.43 0 0 1 2.78 6.72c0 5.23-4.26 9.48-9.5 9.48m8.08-17.56A11.36 11.36 0 0 0 12.04.6C5.74.6.62 5.72.62 12.01c0 2.01.52 3.97 1.52 5.7L.53 23.6l6.02-1.58a11.38 11.38 0 0 0 5.45 1.39h.01c6.29 0 11.41-5.12 11.42-11.41a11.33 11.33 0 0 0-3.33-8.07" />
              </svg>
            </span>
            <span className={s.txt}>
              <strong>Solicite seu orçamento</strong>
              <em>Converse com a VEX sem compromisso</em>
            </span>
            <Arrow />
          </a>

          <Link className={`${s.link} ${s.reveal}`} style={{ animationDelay: ".3s" }} href="/">
            <span className={s.ico}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
              </svg>
            </span>
            <span className={s.txt}>
              <strong>Conheça nosso site</strong>
              <em>Tudo sobre a VEX em um só lugar</em>
            </span>
            <Arrow />
          </Link>

          <Link className={`${s.link} ${s.green} ${s.reveal}`} style={{ animationDelay: ".35s" }} href="/#fale-conosco">
            <span className={s.ico}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 11l3 3 8-8" />
                <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" />
              </svg>
            </span>
            <span className={s.txt}>
              <strong>Tire seu projeto do papel</strong>
              <em>Preencha o formulário · retorno em até 1 dia útil</em>
            </span>
            <Arrow />
          </Link>
        </nav>

        <footer className={`${s.footer} ${s.reveal}`} style={{ animationDelay: ".4s" }}>
          <div>
            <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
            <span className={s.dot}>•</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <div className={s.copy}>© {new Date().getFullYear()} VEX Software</div>
        </footer>
      </main>
    </div>
  );
}
