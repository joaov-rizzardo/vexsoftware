/**
 * Fonte única para os dados do negócio.
 *
 * Metadata, JSON-LD, sitemap e a UI leem daqui — assim o que os buscadores
 * enxergam nunca diverge do que aparece na tela.
 */

export const SITE_URL = "https://vexsoftware.com.br";

export const SITE_NAME = "VEX Software";

export const SITE_TITLE = "VEX Software — Tecnologia que faz sua empresa crescer";

export const SITE_DESCRIPTION =
  "Criamos sites, sistemas e automações para pequenas e médias empresas que querem profissionalizar seu negócio sem complicação.";

export const SITE_DESCRIPTION_SHORT =
  "Sites, sistemas e automações para pequenas e médias empresas venderem mais e economizarem tempo.";

export const EMAIL = "contato@vexsoftware.com.br";

export const PHONE_DISPLAY = "(12) 99709-6351";
export const PHONE_E164 = "+5512997096351";

export const CITY = "Cachoeira Paulista";
export const STATE = "SP";
export const COUNTRY = "BR";
export const LOCATION_DISPLAY = `${CITY} - ${STATE}`;

export const WHATSAPP_PHONE = "5512997096351";
export const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da VEX Software e gostaria de solicitar um orçamento.";
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
