"use client";

import { useActionState, useEffect, useRef } from "react";
import type {
  ComponentType,
  InputHTMLAttributes,
  SVGProps,
  TextareaHTMLAttributes,
} from "react";
import { useFormStatus } from "react-dom";
import { Reveal } from "./Reveal";
import { submitContactForm, type ContactFormState } from "./contact-actions";
import {
  IconUser,
  IconMail,
  IconPhoneCall,
  IconTag,
  IconMapPin,
  IconCheckCircle,
  IconArrowRight,
} from "./icons";

const contacts = [
  { icon: IconPhoneCall, text: "(12) 98234-5678" },
  { icon: IconMail, text: "contato@vexsoftware.com.br" },
  { icon: IconMapPin, text: "Taubaté - SP" },
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
      <label htmlFor={props.id} className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          {...props}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          className={`w-full rounded-xl border bg-white/[0.04] py-3 pl-10 pr-4 text-white placeholder:text-slate-500 outline-none transition-colors focus:bg-white/[0.06] ${
            error
              ? "border-red-400/60 focus:border-red-400"
              : "border-white/10 focus:border-brand-400"
          }`}
        />
      </div>
      {error && (
        <p id={`${props.id}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
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
  ...props
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={props.id} className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-4 h-4 w-4 text-slate-500" />
        <textarea
          {...props}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          className={`w-full resize-none rounded-xl border bg-white/[0.04] py-3 pl-10 pr-4 text-white placeholder:text-slate-500 outline-none transition-colors focus:bg-white/[0.06] ${
            error
              ? "border-red-400/60 focus:border-red-400"
              : "border-white/10 focus:border-brand-400"
          }`}
        />
      </div>
      {error && (
        <p id={`${props.id}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
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
      className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-900/30 transition-all hover:-translate-y-0.5 hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
    >
      {pending ? "Enviando..." : "Enviar mensagem"}
      {!pending && (
        <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  const errors = state.status === "error" ? (state.errors ?? {}) : {};

  return (
    <section id="fale-conosco" className="relative overflow-hidden bg-navy-900 py-24 text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 bg-radial-fade" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-brand-600/20 blur-[120px]" />

      <div className="relative container-narrow">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal direction="right">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-400">
              Fale conosco
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Vamos tirar seu projeto <span className="text-accent-400">do papel</span>
            </h2>
            <p className="mt-4 max-w-md text-slate-400">
              Preencha o formulário com os seus dados e conte um pouco sobre o que você
              precisa. Nossa equipe entra em contato em até 1 dia útil.
            </p>

            <ul className="mt-8 space-y-4 text-sm">
              {contacts.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.text} className="flex items-center gap-3 text-slate-300">
                    <Icon className="h-4 w-4 shrink-0 text-brand-400" />
                    {c.text}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <form
              ref={formRef}
              action={formAction}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="nome"
                  name="nome"
                  label="Nome"
                  icon={IconUser}
                  placeholder="Seu nome completo"
                  autoComplete="name"
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
                    required
                    error={errors.assunto}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <SubmitButton />
                {state.status !== "idle" && (
                  <p
                    aria-live="polite"
                    className={`flex items-center gap-2 text-sm ${
                      state.status === "success" ? "text-accent-400" : "text-red-400"
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
