import { isValidPhoneNumber } from "libphonenumber-js";
import { ASSUNTO_MAX_LENGTH } from "./contact-constants";

type ContactFormValues = Record<"nome" | "email" | "telefone" | "assunto", string>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<ContactFormValues>;
  values?: ContactFormValues;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ'\s-]+$/;

// O Web3Forms só aceita submissões vindas do browser (o plano free rejeita
// chamadas server-side com 403), por isso este módulo roda no cliente e a
// access key é pública — é assim que o serviço foi desenhado.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_TIMEOUT_MS = 15_000;
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const successMessage = (nome: string) => {
  const primeiroNome = nome.split(" ")[0];
  const saudacao = primeiroNome ? `Obrigado, ${primeiroNome}!` : "Obrigado!";
  return `${saudacao} Recebemos sua mensagem e vamos te responder em breve.`;
};

const sendFailed = (values: ContactFormValues): ContactFormState => ({
  status: "error",
  message:
    "Não conseguimos enviar sua mensagem agora. Tente novamente ou fale conosco pelo WhatsApp.",
  values,
});

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const telefone = String(formData.get("telefone") ?? "").trim();
  const assunto = String(formData.get("assunto") ?? "").trim();

  // Honeypot: o campo fica escondido, então só um bot o preenche. Respondemos
  // com sucesso para não dar pistas de que a submissão foi descartada.
  if (formData.get("botcheck")) {
    return { status: "success", message: successMessage(nome) };
  }

  const errors: NonNullable<ContactFormState["errors"]> = {};
  if (nome.length < 2) {
    errors.nome = "Informe seu nome completo.";
  } else if (!NAME_RE.test(nome)) {
    errors.nome = "O nome deve conter apenas letras.";
  }
  if (!EMAIL_RE.test(email)) errors.email = "Informe um e-mail válido.";
  if (!isValidPhoneNumber(telefone, "BR")) {
    errors.telefone = "Informe um telefone válido com DDD.";
  }
  if (assunto.length < 10) {
    errors.assunto = "Conte um pouco mais sobre o seu projeto (mínimo 10 caracteres).";
  } else if (assunto.length > ASSUNTO_MAX_LENGTH) {
    errors.assunto = `O assunto deve ter no máximo ${ASSUNTO_MAX_LENGTH} caracteres.`;
  }

  const values = { nome, email, telefone, assunto };

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Verifique os campos destacados.",
      errors,
      values,
    };
  }

  if (!ACCESS_KEY) {
    console.error("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY não configurada.");
    return sendFailed(values);
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        from_name: "Site Vex Software",
        subject: `Novo pedido de orçamento — ${nome}`,
        replyto: email,
        nome,
        email,
        telefone,
        assunto,
      }),
      signal: AbortSignal.timeout(WEB3FORMS_TIMEOUT_MS),
    });

    const result: { success?: boolean; message?: string } = await response
      .json()
      .catch(() => ({}));

    if (!response.ok || result.success === false) {
      console.error("Falha ao enviar para o Web3Forms:", response.status, result.message);
      return sendFailed(values);
    }
  } catch (error) {
    console.error("Erro de rede ao enviar para o Web3Forms:", error);
    return sendFailed(values);
  }

  return { status: "success", message: successMessage(nome) };
}
