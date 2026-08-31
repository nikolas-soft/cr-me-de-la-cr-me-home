import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../lib/cart";
import { getCatalog } from "../lib/catalog.functions";
import { formatPrice, getProductBySlug, products } from "../data/products";

export const Route = createFileRoute("/produto/$slug")({
  loader: async ({ params }) => {
    let catalog = products;
    try {
      const result = await getCatalog();
      if (result.products.length > 0) catalog = result.products;
    } catch {
      // API indisponível — seguimos com os dados mockados.
    }
    const product = catalog.find((p) => p.slug === params.slug) ?? getProductBySlug(params.slug);
    if (!product) throw notFound();
    const related = catalog
      .filter((p) => p.category === product.category && p.slug !== product.slug)
      .slice(0, 3);
    return { product, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Produto não encontrado — La Crème Bakery" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — La Crème Bakery`;
    return {
      meta: [
        { title },
        { name: "description", content: product.shortDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: product.shortDescription },
      ],
    };
  },
  component: ProdutoPage,
});

function ProdutoPage() {
  const { product, related } = Route.useLoaderData();
  const [added, setAdded] = useState(false);
  const { add } = useCart();


  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-16">
        <nav className="text-xs tracking-[0.16em] uppercase text-muted-foreground">
          <Link to="/catalogo" className="text-cherry transition-opacity hover:opacity-70">
            Catálogo
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span>{product.category}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border-2 border-cherry/25 shadow-cherry">
              <img
                src={product.image}
                alt={product.name}
                width={1000}
                height={1000}
                className="aspect-square w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl border-2 border-cherry bg-cherry px-7 py-9 text-background shadow-cherry md:px-10 md:py-11">
              <span className="inline-block rounded-full bg-background px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-cherry">
                {product.category}
              </span>
              <h1 className="mt-5 font-display text-3xl leading-tight md:text-4xl">{product.name}</h1>
              <p className="mt-4 text-sm leading-relaxed text-background/80">{product.description}</p>

              <div className="mt-7 flex w-full max-w-xs items-center gap-4">
                <div className="h-px flex-1 bg-background/25" />
                <div className="h-1.5 w-1.5 rounded-full bg-background/60" />
                <div className="h-px flex-1 bg-background/25" />
              </div>

              <p className="eyebrow mt-7 text-background/70">Ingredientes</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="rounded-full border border-background/35 px-3 py-1 text-xs text-background/85"
                  >
                    {ing}
                  </li>
                ))}
              </ul>

              <p className="mt-8 font-display text-4xl">{formatPrice(product.price)}</p>

              <button
                type="button"
                onClick={() => {
                  add(product.slug);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-background bg-background px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-cherry transition-all hover:bg-cherry hover:text-background sm:w-auto"
              >
                {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                {added ? "Adicionado" : "Adicionar ao carrinho"}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t-2 border-cherry/15 bg-cream-deep">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
            <Reveal className="text-center">
              <p className="eyebrow text-muted-foreground">Também de {product.category}</p>
              <h2 className="mt-3 font-display text-3xl text-cherry md:text-4xl">Você pode gostar</h2>
            </Reveal>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 100}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
