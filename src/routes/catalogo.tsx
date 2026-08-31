import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ProductCard } from "../components/ProductCard";
import { getCatalog } from "../lib/catalog.functions";
import { categories, products as mockProducts, type Category } from "../data/products";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Nosso Catálogo — La Crème Bakery" },
      {
        name: "description",
        content:
          "Bolos, tortas, cookies, macarons, brownies, croissants e sobremesas artesanais feitos à mão na La Crème Bakery.",
      },
      { property: "og:title", content: "Nosso Catálogo — La Crème Bakery" },
      {
        property: "og:description",
        content: "Conheça todos os doces artesanais da La Crème Bakery, produzidos em pequenas fornadas.",
      },
    ],
  }),
  component: Catalogo,
});

function Catalogo() {
  const [category, setCategory] = useState<Category>("Todos");
  const [query, setQuery] = useState("");

  // Se a API não estiver configurada (ou falhar), seguimos com os dados mockados.
  const { data } = useQuery({
    queryKey: ["catalog"],
    queryFn: () => getCatalog(),
    initialData: { source: "mock" as const, products: mockProducts },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const products = data.products.length > 0 ? data.products : mockProducts;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCategory = category === "Todos" || p.category === category;
      const matchQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [category, query, products]);

  return (
    <>
      <section className="border-b-2 border-cherry/30 bg-cherry text-background">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center lg:px-10 lg:py-20">
          <p className="eyebrow text-background/70">Nossas criações</p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Nosso Catálogo</h1>
          <div className="mx-auto mt-6 flex w-full max-w-md items-center gap-4">
            <div className="h-px flex-1 bg-background/25" />
            <div className="h-1.5 w-1.5 rounded-full bg-background/60" />
            <div className="h-px flex-1 bg-background/25" />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-background/75">
            Tudo é produzido em pequenas fornadas, todos os dias, com manteiga de verdade e receitas
            tradicionais francesas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-6">
          <div className="relative mx-auto w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cherry/60" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome ou categoria..."
              aria-label="Buscar produtos"
              className="w-full rounded-full border-2 border-cherry/25 bg-cream-deep py-3 pl-11 pr-5 text-sm text-foreground placeholder:text-muted-foreground focus:border-cherry focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={active}
                  className={`rounded-full border-2 px-4 py-2 text-[10px] uppercase tracking-[0.18em] transition-all ${
                    active
                      ? "border-cherry bg-cherry text-background shadow-cherry-sm"
                      : "border-cherry/25 bg-background text-cherry hover:border-cherry"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-center text-xs tracking-[0.18em] uppercase text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
        </p>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center font-display text-2xl text-cherry">
            Nenhum doce encontrado para essa busca.
          </p>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 100}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
