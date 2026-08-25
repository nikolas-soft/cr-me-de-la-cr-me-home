import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgePercent, Ticket, Truck, Sparkles, Copy, Check } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { coupons } from "../lib/cart";

export const Route = createFileRoute("/clube")({
  head: () => ({
    meta: [
      { title: "Clube La Crème — Assinatura com benefícios exclusivos" },
      {
        name: "description",
        content:
          "Assine o Clube La Crème e tenha descontos, cupons exclusivos, benefícios no frete e ofertas especiais na nossa confeitaria artesanal.",
      },
      { property: "og:title", content: "Clube La Crème — Assinatura com benefícios exclusivos" },
      {
        property: "og:description",
        content: "Descontos, cupons exclusivos, frete facilitado e ofertas especiais todo mês.",
      },
    ],
  }),
  component: ClubePage,
});

const benefits = [
  {
    icon: BadgePercent,
    title: "Descontos permanentes",
    text: "Assinantes têm desconto fixo em toda a linha de bolos, tortas e doces da casa.",
  },
  {
    icon: Ticket,
    title: "Cupons exclusivos",
    text: "Códigos promocionais liberados só para o clube, renovados a cada fornada de novidades.",
  },
  {
    icon: Truck,
    title: "Benefícios no frete",
    text: "Frete grátis a partir de um valor menor e prioridade nas entregas do fim de semana.",
  },
  {
    icon: Sparkles,
    title: "Ofertas especiais",
    text: "Pré-venda de coleções sazonais, degustações e presentes surpresa em datas comemorativas.",
  },
];

function ClubePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* ignore */
    }
    setCopied(code);
    setTimeout(() => setCopied((c) => (c === code ? null : c)), 2000);
  };

  return (
    <>
      <section className="border-b-2 border-cherry/20 bg-cherry text-background">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center lg:px-10 lg:py-24">
          <Reveal>
            <p className="eyebrow text-background/70">Assinatura</p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">Clube La Crème</h1>
            <div className="mx-auto my-7 flex w-full max-w-xs items-center gap-4">
              <div className="h-px flex-1 bg-background/25" />
              <div className="h-1.5 w-1.5 rounded-full bg-background/60" />
              <div className="h-px flex-1 bg-background/25" />
            </div>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-background/80 md:text-base">
              O Clube La Crème é a nossa assinatura mensal: você recebe benefícios exclusivos,
              condições especiais em toda a confeitaria e acesso antecipado às criações da chef —
              sem fidelidade e com pausa quando quiser.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        <Reveal className="text-center">
          <p className="eyebrow text-muted-foreground">O que você recebe</p>
          <h2 className="mt-3 font-display text-3xl text-cherry md:text-4xl">Benefícios do clube</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 90}>
              <article className="h-full rounded-3xl border-2 border-cherry/25 bg-cream-deep p-7 transition-all hover:-translate-y-1 hover:border-cherry hover:shadow-cherry">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cherry text-background">
                  <b.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl text-cherry">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-cherry/15 bg-cream-deep">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <Reveal className="text-center">
            <p className="eyebrow text-muted-foreground">Use no carrinho</p>
            <h2 className="mt-3 font-display text-3xl text-cherry md:text-4xl">Códigos promocionais</h2>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl gap-7 md:grid-cols-2">
            {coupons.map((c, i) => (
              <Reveal key={c.code} delay={i * 110}>
                <article className="flex h-full flex-col rounded-3xl border-2 border-cherry bg-cherry px-7 py-8 text-background shadow-cherry">
                  <p className="eyebrow text-background/60">Cupom</p>
                  <p className="mt-3 font-display text-3xl tracking-[0.12em] md:text-4xl">{c.code}</p>
                  <p className="mt-4 text-sm font-medium text-background">{c.label}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-background/75">{c.description}</p>
                  <button
                    type="button"
                    onClick={() => copy(c.code)}
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border-2 border-background bg-background px-7 py-3 text-xs uppercase tracking-[0.22em] text-cherry transition-all hover:bg-cherry hover:text-background"
                  >
                    {copied === c.code ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied === c.code ? "Código copiado" : "Copiar código"}
                  </button>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center rounded-full border-2 border-cherry px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-cherry transition-colors hover:bg-cherry hover:text-background"
            >
              Ver catálogo
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
