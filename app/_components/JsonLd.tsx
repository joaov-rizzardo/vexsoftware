import { faqs } from "./faq-data";
import { services } from "./services-data";
import {
  CITY,
  COUNTRY,
  EMAIL,
  PHONE_E164,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  STATE,
} from "../site-config";

const BUSINESS_ID = `${SITE_URL}/#business`;

/**
 * Dados estruturados da home.
 *
 * Sem `Review`/`AggregateRating`: os depoimentos exibidos no site são
 * ilustrativos, e marcar avaliações não verificáveis viola as políticas de spam
 * do Google. Quando houver depoimentos reais, o schema pode ser estendido.
 */
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": BUSINESS_ID,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      telephone: PHONE_E164,
      email: EMAIL,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: CITY,
        addressRegion: STATE,
        addressCountry: COUNTRY,
      },
      areaServed: {
        "@type": "Country",
        name: "Brasil",
      },
      knowsLanguage: "pt-BR",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Soluções VEX Software",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.desc,
            provider: { "@id": BUSINESS_ID },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "pt-BR",
      publisher: { "@id": BUSINESS_ID },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // `<` evita que qualquer `<` no conteúdo feche o <script> (XSS).
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
