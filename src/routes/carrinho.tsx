import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, Tag, X } from "lucide-react";
import { formatPrice } from "../data/products";
import { useCart, FREE_SHIPPING_MIN } from "../lib/cart";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho — La Crème Bakery" },
      {
        name: "description",
        content: "Revise seu pedido, aplique cupons do Clube La Crème e finalize sua encomenda.",
      },
      { property: "og:title", content: "Carrinho — La Crème Bakery" },
      { property: "og:description", content: "Revise seu pedido e aplique cupons do Clube La Crème." },
    ],
  }),
  component: CarrinhoPage,
});

function CarrinhoPage() {
  const cart = useCart();
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const result = cart.applyCoupon(code);
    setFeedback(result);
    if (result.ok) setCode("");
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
      <p className="eyebrow text-muted-foreground">Seu pedido</p>
      <h1 className="mt-3 font-display text-4xl text-cherry md:text-5xl">Carrinho</h1>
      <div className="mt-6 h-px w-20 bg-cherry/30" />

      {cart.items.length === 0 ? (
        <div className="mt-14 rounded-3xl border-2 border-cherry/25 bg-cream-deep px-7 py-16 text-center">
          <ShoppingBag className="mx-auto h-8 w-8 text-cherry" />
          <p className="mt-5 font-display text-2xl text-cherry">Seu carrinho está vazio</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Escolha seus doces favoritos no catálogo e eles aparecem aqui.
          </p>
          <Link
            to="/catalogo"
            className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-cherry bg-cherry px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-background transition-colors hover:bg-transparent hover:text-cherry"
          >
            Ver catálogo
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <ul className="space-y-5">
            {cart.items.map(({ product, qty }) => (
              <li
                key={product.slug}
                className="flex gap-5 rounded-3xl border-2 border-cherry/20 bg-cream-deep p-4 transition-colors hover:border-cherry/50 sm:p-5"
              >
                <Link to="/produto/$slug" params={{ slug: product.slug }} className="shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-24 w-24 rounded-2xl border border-cherry/20 object-cover sm:h-28 sm:w-28"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="eyebrow text-muted-foreground">{product.category}</p>
                      <Link
                        to="/produto/$slug"
                        params={{ slug: product.slug }}
                        className="mt-1 block truncate font-display text-xl text-cherry hover:opacity-70"
                      >
                        {product.name}
                      </Link>
                    </div>
                    <button
                      type="button"
                      onClick={() => cart.remove(product.slug)}
                      aria-label={`Remover ${product.name}`}
                      className="rounded-full border border-cherry/30 p-2 text-cherry transition-colors hover:bg-cherry hover:text-background"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4">
                    <div className="flex items-center gap-3 rounded-full border-2 border-cherry/30 px-2 py-1">
                      <button
                        type="button"
                        onClick={() => cart.decrement(product.slug)}
                        aria-label="Diminuir quantidade"
                        className="rounded-full p-1.5 text-cherry transition-colors hover:bg-cherry hover:text-background"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-5 text-center text-sm text-foreground">{qty}</span>
                      <button
                        type="button"
                        onClick={() => cart.increment(product.slug)}
                        aria-label="Aumentar quantidade"
                        className="rounded-full p-1.5 text-cherry transition-colors hover:bg-cherry hover:text-background"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="font-display text-2xl text-cherry">
                      {formatPrice(product.price * qty)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border-2 border-cherry bg-cherry px-7 py-8 text-background shadow-cherry">
              <h2 className="font-display text-2xl">Resumo do pedido</h2>

              <form onSubmit={handleApply} className="mt-6">
                <label htmlFor="cupom" className="eyebrow text-background/70">
                  Cupom de desconto
                </label>
                <div className="mt-3 flex gap-2">
                  <input
                    id="cupom"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="LACREME10"
                    className="min-w-0 flex-1 rounded-full border border-background/40 bg-transparent px-4 py-2.5 text-sm uppercase tracking-[0.12em] text-background placeholder:text-background/40 focus:border-background focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full border-2 border-background bg-background px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-cherry transition-colors hover:bg-transparent hover:text-background"
                  >
                    Aplicar
                  </button>
                </div>
                {feedback && (
                  <p
                    className={`mt-3 text-xs leading-relaxed ${
                      feedback.ok ? "text-background" : "text-background/60"
                    }`}
                  >
                    {feedback.message}
                  </p>
                )}
                {cart.coupon && (
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-full border border-background/40 px-4 py-2 text-xs">
                    <span className="flex items-center gap-2 tracking-[0.14em] uppercase">
                      <Tag className="h-3.5 w-3.5" />
                      {cart.coupon.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        cart.removeCoupon();
                        setFeedback({ ok: true, message: "Cupom removido." });
                      }}
                      aria-label="Remover cupom"
                      className="text-background/70 transition-colors hover:text-background"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </form>

              <div className="my-7 h-px w-full bg-background/25" />

              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-background/75">Subtotal</dt>
                  <dd>{formatPrice(cart.subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-background/75">Desconto</dt>
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
                Frete grátis automático em pedidos acima de {formatPrice(FREE_SHIPPING_MIN)}.
              </p>

              <button
                type="button"
                className="mt-7 w-full rounded-full border-2 border-background bg-background px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-cherry transition-colors hover:bg-transparent hover:text-background"
              >
                Finalizar pedido
              </button>
              <button
                type="button"
                onClick={() => {
                  cart.clear();
                  setFeedback(null);
                }}
                className="mt-3 w-full rounded-full border border-background/40 px-8 py-3 text-xs uppercase tracking-[0.18em] text-background/80 transition-colors hover:border-background hover:text-background"
              >
                Esvaziar carrinho
              </button>
            </div>

            <Link
              to="/clube"
              className="mt-5 block rounded-3xl border-2 border-cherry/25 bg-cream-deep px-6 py-5 text-center text-sm text-cherry transition-colors hover:border-cherry"
            >
              Ainda não tem cupom? Conheça o Clube La Crème
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
