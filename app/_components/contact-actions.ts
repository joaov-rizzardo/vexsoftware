"use server";

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

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const telefone = String(formData.get("telefone") ?? "").trim();
  const assunto = String(formData.get("assunto") ?? "").trim();

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

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Verifique os campos destacados.",
      errors,
      values: { nome, email, telefone, assunto },
    };
  }

  console.log("Novo contato recebido:", { nome, email, telefone, assunto });

  return {
    status: "success",
    message: `Obrigado, ${nome.split(" ")[0]}! Recebemos sua mensagem e vamos te responder em breve.`,
  };
}
