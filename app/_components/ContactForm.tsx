"use client";

import { useActionState, useEffect, useRef } from "react";
import type {
  ChangeEvent,
  ComponentType,
  InputHTMLAttributes,
  Ref,
  SVGProps,
  TextareaHTMLAttributes,
} from "react";
import { useFormStatus } from "react-dom";
import { AsYouType } from "libphonenumber-js";
import { Reveal } from "./Reveal";
import { submitContactForm, type ContactFormState } from "./contact-actions";
import { ASSUNTO_MAX_LENGTH } from "./contact-constants";
import {
  IconUser,
  IconMail,
  IconPhoneCall,
  IconTag,
  IconMapPin,
  IconCheckCircle,
  IconArrowRight,
  IconChatBubble,
} from "./icons";

const NAME_DISALLOWED_RE = /[^A-Za-zÀ-ÖØ-öø-ÿ'\s-]/g;

function sanitizeNomeInput(e: ChangeEvent<HTMLInputElement>) {
  e.target.value = e.target.value.replace(NAME_DISALLOWED_RE, "");
}

function maskTelefoneInput(e: ChangeEvent<HTMLInputElement> & { nativeEvent: InputEvent }) {
  // Deleting characters is left alone: reformatting on every keystroke would
  // re-insert the DDD parentheses/dash right after the user removes them.
  if (e.nativeEvent.inputType?.startsWith("delete")) return;
  const formatter = new AsYouType("BR");
  e.target.value = formatter.input(e.target.value);
}

const contacts = [
  { icon: IconPhoneCall, text: "(12) 99709-6351" },
  { icon: IconMail, text: "contato@vexsoftware.com.br" },
  { icon: IconMapPin, text: "Cachoeira Paulista - SP" },
];

const initialState: ContactFormState = { status: "idle", message: "" };

function Field({
  icon: Icon,
  label,
  error,
  ...props
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={props.id} className="mb-1.5 block text-sm font-medium text-blue-50">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-100/70" />
        <input
          {...props}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          className={`w-full rounded-xl border bg-white/10 py-3 pl-10 pr-4 text-white placeholder:text-blue-100/50 outline-none transition-colors focus:bg-white/15 ${
            error
              ? "border-red-300/70 focus:border-red-300"
              : "border-white/20 focus:border-white"
          }`}
        />
      </div>
      {error && (
        <p id={`${props.id}-error`} role="alert" className="mt-1.5 text-xs text-red-200">
          {error}
        </p>
      )}
    </div>
  );
}

function TextareaField({
  icon: Icon,
  label,
  error,
  counterRef,
  initialCounter,
  ...props
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  error?: string;
  counterRef?: Ref<HTMLSpanElement>;
  initialCounter?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={props.id} className="block text-sm font-medium text-blue-50">
          {label}
        </label>
        {counterRef && (
          <span ref={counterRef} className="text-xs text-blue-100/60">
            {initialCounter}
          </span>
        )}
      </div>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-4 h-4 w-4 text-blue-100/70" />
        <textarea
          {...props}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          className={`w-full resize-none rounded-xl border bg-white/10 py-3 pl-10 pr-4 text-white placeholder:text-blue-100/50 outline-none transition-colors focus:bg-white/15 ${
            error
              ? "border-red-300/70 focus:border-red-300"
              : "border-white/20 focus:border-white"
          }`}
        />
      </div>
      {error && (
        <p id={`${props.id}-error`} role="alert" className="mt-1.5 text-xs text-red-200">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-900/30 transition-all hover:-translate-y-0.5 hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
    >
      {pending ? "Enviando..." : "Solicitar orçamento"}
      {!pending && (
        <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const assuntoCounterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      if (assuntoCounterRef.current) {
        assuntoCounterRef.current.textContent = `0/${ASSUNTO_MAX_LENGTH}`;
      }
      return;
    }

    // React clears every uncontrolled field as soon as the form is submitted
    // through an action, whether it eventually succeeds or fails. On error we
    // restore what the user typed from the values the server echoed back.
    if (state.status === "error" && state.values && formRef.current) {
      const form = formRef.current;
      const nomeInput = form.elements.namedItem("nome") as HTMLInputElement | null;
      const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
      const telefoneInput = form.elements.namedItem("telefone") as HTMLInputElement | null;
      const assuntoInput = form.elements.namedItem("assunto") as HTMLTextAreaElement | null;

      if (nomeInput) nomeInput.value = state.values.nome;
      if (emailInput) emailInput.value = state.values.email;
      if (telefoneInput) telefoneInput.value = state.values.telefone;
      if (assuntoInput) assuntoInput.value = state.values.assunto;
      if (assuntoCounterRef.current) {
        assuntoCounterRef.current.textContent = `${state.values.assunto.length}/${ASSUNTO_MAX_LENGTH}`;
      }
    }
  }, [state]);

  const errors = state.status === "error" ? (state.errors ?? {}) : {};

  return (
    <section id="fale-conosco" className="relative bg-navy-900 py-24 text-white">
      <div className="container-narrow">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(120deg,#2563eb,#1e40af)] px-6 py-10 shadow-glow sm:px-10 sm:py-14 lg:p-14">
            {/* decorative shimmer */}
            <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(60%_120%_at_100%_0%,#93c5fd_0%,transparent_60%)]" />

            <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25">
                  <IconChatBubble className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Vamos tirar seu projeto <span className="text-accent-300">do papel</span>
                </h2>
                <p className="mt-4 max-w-md text-blue-100">
                  Preencha o formulário com os seus dados para{" "}
                  <span className="font-semibold text-white">solicitar um orçamento</span> e
                  conte um pouco sobre o que você precisa. Nossa equipe entra em contato em até 1
                  dia útil.
                </p>

                <ul className="mt-8 space-y-4 text-sm">
                  {contacts.map((c) => {
                    const Icon = c.icon;
                    return (
                      <li key={c.text} className="flex items-center gap-3 text-blue-50">
                        <Icon className="h-4 w-4 shrink-0 text-blue-200" />
                        {c.text}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <form
                ref={formRef}
                action={formAction}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm sm:p-8"
              >
                {/* Honeypot: invisível para pessoas, atrativo para bots. */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="nome"
                    name="nome"
                    label="Nome"
                    icon={IconUser}
                    placeholder="Seu nome completo"
                    autoComplete="name"
                    inputMode="text"
                    onChange={sanitizeNomeInput}
                    required
                    error={errors.nome}
                  />
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    label="E-mail"
                    icon={IconMail}
                    placeholder="voce@email.com"
                    autoComplete="email"
                    required
                    error={errors.email}
                  />
                  <div className="sm:col-span-2">
                    <Field
                      id="telefone"
                      name="telefone"
                      type="tel"
                      label="Telefone"
                      icon={IconPhoneCall}
                      placeholder="(00) 00000-0000"
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={16}
                      onChange={maskTelefoneInput}
                      required
                      error={errors.telefone}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <TextareaField
                      id="assunto"
                      name="assunto"
                      label="Assunto"
                      icon={IconTag}
                      rows={4}
                      placeholder="Conte um pouco sobre o seu projeto: o que você precisa, prazo e objetivo."
                      maxLength={ASSUNTO_MAX_LENGTH}
                      onChange={(e) => {
                        if (assuntoCounterRef.current) {
                          assuntoCounterRef.current.textContent = `${e.target.value.length}/${ASSUNTO_MAX_LENGTH}`;
                        }
                      }}
                      required
                      error={errors.assunto}
                      counterRef={assuntoCounterRef}
                      initialCounter={`0/${ASSUNTO_MAX_LENGTH}`}
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <SubmitButton />
                  {state.status !== "idle" && (
                    <p
                      aria-live="polite"
                      className={`flex items-center gap-2 text-sm ${
                        state.status === "success" ? "text-accent-300" : "text-red-200"
                      }`}
                    >
                      {state.status === "success" && (
                        <IconCheckCircle className="h-4 w-4 shrink-0" />
                      )}
                      {state.message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
