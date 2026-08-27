import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Lock, ShoppingBag } from "lucide-react";
import { z } from "zod";
import { formatPrice } from "../data/products";
import { useCart, FREE_SHIPPING_MIN } from "../lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — La Crème Bakery" },
      {
        name: "description",
        content:
          "Finalize sua encomenda La Crème: dados de entrega, resumo do pedido e confirmação em poucos passos.",
      },
      { property: "og:title", content: "Checkout — La Crème Bakery" },
      {
        property: "og:description",
        content: "Preencha seus dados de entrega e conclua seu pedido de doces franceses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

const schema = z.object({
  nome: z.string().trim().min(3, "Informe seu nome completo.").max(100),
  email: z.string().trim().email("E-mail inválido.").max(255),
  telefone: z
    .string()
    .trim()
    .regex(/^[0-9()\-.\s+]{10,20}$/, "Telefone inválido.")
    .max(20),
  cep: z.string().trim().regex(/^\d{5}-?\d{3}$/, "CEP inválido (00000-000)."),
  endereco: z.string().trim().min(3, "Informe o endereço.").max(160),
  numero: z.string().trim().min(1, "Informe o número.").max(20),
  complemento: z.string().trim().max(80).optional(),
  cidade: z.string().trim().min(2, "Informe a cidade.").max(80),
  estado: z.string().trim().length(2, "Use a sigla do estado (ex: SP)."),
});

type Fields = z.infer<typeof schema>;
type FieldKey = keyof Fields;

const initial: Record<FieldKey, string> = {
  nome: "",
  email: "",
  telefone: "",
  cep: "",
  endereco: "",
  numero: "",
  complemento: "",
  cidade: "",
  estado: "",
};

const inputClass =
  "mt-2 w-full rounded-2xl border-2 border-cherry/25 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-cherry focus:outline-none";

function Field({
  id,
  label,
  value,
  error,
  onChange,
  ...rest
}: {
  id: FieldKey;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange">) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        {...rest}
      />
      {error && <p className="mt-1.5 text-xs text-cherry">{error}</p>}
    </div>
  );
}

function CheckoutPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<{ id: string; total: number; email: string } | null>(null);

  const set = (key: FieldKey) => (v: string) => {
    setForm((p) => ({ ...p, [key]: v }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Partial<Record<FieldKey, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldKey;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setSubmitting(true);
    // Nenhum gateway configurado: fluxo simulado.
    await new Promise((r) => setTimeout(r, 900));
    const id = `LC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrder({ id, total: cart.total, email: parsed.data.email });
    cart.clear();
    setSubmitting(false);
  };

  if (order) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-20 lg:px-10">
        <div className="rounded-3xl border-2 border-cherry bg-cherry px-7 py-14 text-center text-background shadow-cherry">
          <CheckCircle2 className="mx-auto h-10 w-10" />
          <h1 className="mt-6 font-display text-4xl">Pedido confirmado</h1>
          <p className="mt-4 text-sm text-background/80">
            Número do pedido <span className="tracking-[0.18em]">{order.id}</span>
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-background/70">
            Enviamos os detalhes para {order.email}. Total de {formatPrice(order.total)}. Pagamento
            simulado — nenhum gateway está configurado nesta versão.
          </p>
          <Link
            to="/catalogo"
            className="mt-9 inline-flex items-center justify-center rounded-full border-2 border-background bg-background px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-cherry transition-colors hover:bg-transparent hover:text-background"
          >
            Continuar comprando
          </Link>
        </div>
      </section>
    );
  }

  if (cart.items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-20 lg:px-10">
        <div className="rounded-3xl border-2 border-cherry/25 bg-cream-deep px-7 py-16 text-center">
          <ShoppingBag className="mx-auto h-8 w-8 text-cherry" />
          <h1 className="mt-5 font-display text-3xl text-cherry">Nada para finalizar</h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Adicione doces ao carrinho para seguir com o checkout.
          </p>
          <Link
            to="/catalogo"
            className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-cherry bg-cherry px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-background transition-colors hover:bg-transparent hover:text-cherry"
          >
            Ver catálogo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
      <p className="eyebrow text-muted-foreground">Etapa final</p>
      <h1 className="mt-3 font-display text-4xl text-cherry md:text-5xl">Checkout</h1>
      <div className="mt-6 h-px w-20 bg-cherry/30" />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <form onSubmit={handleSubmit} noValidate className="space-y-10">
          <fieldset className="rounded-3xl border-2 border-cherry/20 bg-cream-deep p-6 sm:p-8">
            <legend className="px-2 font-display text-2xl text-cherry">Seus dados</legend>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field id="nome" label="Nome completo" value={form.nome} error={errors.nome} onChange={set("nome")} autoComplete="name" maxLength={100} />
              </div>
              <Field id="email" label="E-mail" type="email" value={form.email} error={errors.email} onChange={set("email")} autoComplete="email" maxLength={255} />
              <Field id="telefone" label="Telefone" value={form.telefone} error={errors.telefone} onChange={set("telefone")} autoComplete="tel" placeholder="(11) 99999-0000" maxLength={20} />
            </div>
          </fieldset>

          <fieldset className="rounded-3xl border-2 border-cherry/20 bg-cream-deep p-6 sm:p-8">
            <legend className="px-2 font-display text-2xl text-cherry">Entrega</legend>
            <div className="mt-4 grid gap-5 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <Field id="cep" label="CEP" value={form.cep} error={errors.cep} onChange={set("cep")} autoComplete="postal-code" placeholder="00000-000" maxLength={9} />
              </div>
              <div className="sm:col-span-4">
                <Field id="endereco" label="Endereço" value={form.endereco} error={errors.endereco} onChange={set("endereco")} autoComplete="address-line1" maxLength={160} />
              </div>
              <div className="sm:col-span-2">
                <Field id="numero" label="Número" value={form.numero} error={errors.numero} onChange={set("numero")} maxLength={20} />
              </div>
              <div className="sm:col-span-4">
                <Field id="complemento" label="Complemento (opcional)" value={form.complemento} error={errors.complemento} onChange={set("complemento")} maxLength={80} />
              </div>
              <div className="sm:col-span-4">
                <Field id="cidade" label="Cidade" value={form.cidade} error={errors.cidade} onChange={set("cidade")} autoComplete="address-level2" maxLength={80} />
              </div>
              <div className="sm:col-span-2">
                <Field id="estado" label="Estado (UF)" value={form.estado} error={errors.estado} onChange={(v) => set("estado")(v.toUpperCase())} placeholder="SP" maxLength={2} />
              </div>
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full border-2 border-cherry bg-cherry px-9 py-3.5 text-xs uppercase tracking-[0.22em] text-background transition-colors hover:bg-transparent hover:text-cherry disabled:opacity-60"
            >
              <Lock className="h-3.5 w-3.5" />
              {submitting ? "Processando…" : "Confirmar pedido"}
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/carrinho" })}
              className="rounded-full border border-cherry/40 px-7 py-3 text-xs uppercase tracking-[0.18em] text-cherry transition-colors hover:border-cherry"
            >
              Voltar ao carrinho
            </button>
          </div>
        </form>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border-2 border-cherry bg-cherry px-7 py-8 text-background shadow-cherry">
            <h2 className="font-display text-2xl">Resumo do pedido</h2>

            <ul className="mt-6 space-y-4">
              {cart.items.map(({ product, qty }) => (
                <li key={product.slug} className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={96}
                    height={96}
                    className="h-14 w-14 rounded-xl border border-background/30 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{product.name}</p>
                    <p className="text-xs text-background/60">Qtd. {qty}</p>
                  </div>
                  <span className="text-sm">{formatPrice(product.price * qty)}</span>
                </li>
              ))}
            </ul>

            <div className="my-7 h-px w-full bg-background/25" />

            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-background/75">Subtotal</dt>
                <dd>{formatPrice(cart.subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-background/75">Desconto{cart.coupon ? ` (${cart.coupon.code})` : ""}</dt>
                <dd>{cart.discount > 0 ? `− ${formatPrice(cart.discount)}` : formatPrice(0)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-background/75">Frete</dt>
                <dd>{cart.shipping === 0 ? "Grátis" : formatPrice(cart.shipping)}</dd>
              </div>
            </dl>

            <div className="mt-6 flex items-end justify-between border-t border-background/25 pt-5">
              <span className="eyebrow text-background/70">Total</span>
              <span className="font-display text-3xl">{formatPrice(cart.total)}</span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-background/60">
              Frete grátis acima de {formatPrice(FREE_SHIPPING_MIN)}. Pagamento simulado — nenhum
              gateway configurado.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
