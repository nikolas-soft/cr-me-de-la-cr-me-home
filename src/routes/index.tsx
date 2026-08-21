import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../components/Reveal";
import hero from "../assets/hero.jpg";
import cardSobre from "../assets/card-sobre.jpg";
import cardCatalogo from "../assets/card-catalogo.jpg";
import cardClube from "../assets/card-clube.jpg";
import { products as allProducts } from "../data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La Crème Bakery — Confeitaria artesanal francesa" },
      {
        name: "description",
        content:
          "Bolos, tortas, macarons e doces artesanais feitos à mão todos os dias na La Crème Bakery.",
      },
      { property: "og:title", content: "La Crème Bakery — Confeitaria artesanal francesa" },
      {
        property: "og:description",
        content: "Doces clássicos feitos à mão, com receitas de família e ingredientes selecionados.",
      },
    ],
  }),
  component: Index,
});

const cards = [
  {
    title: "Sobre Nós",
    text: "Receitas de família e mãos que amassam desde 1998.",
    image: cardSobre,
    to: "/sobre" as const,
  },
  {
    title: "Catálogo",
    text: "Bolos, tortas e doces produzidos em pequenas fornadas.",
    image: cardCatalogo,
    to: "/catalogo" as const,
  },
  {
    title: "Clube",
    text: "Uma caixa selecionada de doces na sua casa todo mês.",
    image: cardClube,
    to: "/clube" as const,
  },
];

const products = [
  { name: "Cinnamon Roll", price: "R$ 18,00", image: prodCinnamon },
  { name: "Tiramisu", price: "R$ 26,00", image: prodTiramisu },
  { name: "Torta de Cereja", price: "R$ 32,00", image: prodCereja },
  { name: "Macarons (6 un.)", price: "R$ 45,00", image: prodMacarons },
  { name: "Croissant de Manteiga", price: "R$ 14,00", image: prodCroissant },
  { name: "Tartelette de Limão", price: "R$ 22,00", image: prodLimao },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate">
        <img
          src={hero}
          alt="Mesa de mármore com macarons, mil-folhas, tortas e bolos artesanais"
          width={1920}
          height={1088}
          className="h-[68vh] min-h-[420px] w-full object-cover md:h-[80vh]"
        />
        <div className="gradient-cherry-creme absolute inset-0" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5 lg:px-10">
            <div className="max-w-xl text-background">
              <span className="inline-block rounded-sm bg-background/90 px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-cherry shadow-cherry-sm">
                TRADIÇÃO FRANCESA · DESDE 1998
              </span>
              <h1 className="mt-6 font-display text-4xl leading-[1.05] drop-shadow-sm sm:text-5xl lg:text-6xl">
                Doces clássicos, feitos à mão todos os dias
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed opacity-95 md:text-base">
                Na La Crème Bakery cada torta, bolo e macaron nasce de receitas tradicionais
                francesas, manteiga de verdade e fornadas pequenas — sempre frescas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <Reveal className="text-center">
          <p className="eyebrow text-muted-foreground">La Crème Bakery</p>
          <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
            Uma casa de doces, três caminhos
          </h2>
          <div className="mx-auto mt-6 flex w-full max-w-md items-center gap-4">
            <div className="h-px flex-1 bg-cherry/15" />
            <div className="h-1.5 w-1.5 rounded-full bg-cherry/40" />
            <div className="h-px flex-1 bg-cherry/15" />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 120}>
              <Link
                to={card.to}
                className="group card-cherry-accent block overflow-hidden rounded-3xl border-2 border-cherry/25 bg-cherry text-background shadow-cherry-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-cherry hover:shadow-cherry"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    width={900}
                    height={1100}
                    className="h-64 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 md:h-72"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cherry/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="relative bg-cherry px-7 py-7">
                  <div className="absolute left-7 top-0 h-1 w-12 -translate-y-1/2 rounded-full bg-background/70 transition-all duration-500 group-hover:w-20 group-hover:bg-background" />
                  <h3 className="font-display text-2xl text-background">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-background/75">{card.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-background/90 transition-colors group-hover:text-background">
                    Descobrir
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Produtos */}
      <section className="border-y-2 border-cherry/30 bg-cherry text-background">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow text-background/70">Da nossa cozinha</p>
            <h2 className="mt-3 font-display text-3xl text-background md:text-4xl">Produtos</h2>
            <div className="mt-6 flex w-full max-w-md items-center gap-4">
              <div className="h-px flex-1 bg-background/25" />
              <div className="h-1.5 w-1.5 rounded-full bg-background/60" />
              <div className="h-px flex-1 bg-background/25" />
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 120}>
                <article className="group overflow-hidden rounded-3xl border-2 border-background/15 bg-background shadow-cherry transition-all duration-500 hover:-translate-y-1 hover:border-background/40">
                  <div className="relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={800}
                      height={800}
                      className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                    <span className="absolute right-3 top-3 rounded-full bg-cherry px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-background shadow-cherry-sm transition-opacity duration-300">
                      Artesanal
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-t-4 border-cherry px-6 py-5">
                    <h3 className="font-display text-xl text-cherry">{p.name}</h3>
                    <span className="rounded-full bg-cherry px-3 py-1 text-xs font-medium tracking-wide text-background">
                      {p.price}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 text-center">
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center rounded-full border-2 border-background bg-background px-8 py-3.5 text-xs tracking-[0.22em] uppercase text-cherry transition-all hover:bg-cherry hover:text-background"
            >
              Ver catálogo completo
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Faixa final */}
      <section className="mx-auto max-w-5xl px-5 py-20 lg:py-28">
        <Reveal>
          <div className="rounded-[2rem] border-2 border-cherry bg-cherry px-7 py-14 text-center text-background shadow-cherry md:px-16">
            <div className="mx-auto mb-8 flex w-full max-w-md items-center gap-4">
              <div className="h-px flex-1 bg-background/25" />
              <div className="h-1.5 w-1.5 rounded-full bg-background/60" />
              <div className="h-px flex-1 bg-background/25" />
            </div>
            <p className="eyebrow text-background/70">Feito à mão</p>
            <p className="mt-5 font-display text-2xl italic leading-relaxed md:text-3xl">
              “Nada aqui é apressado. A massa descansa, o creme esfria e o forno faz o resto.”
            </p>
            <p className="mt-6 text-sm text-background/70">Chef Hélène Duarte · La Crème Bakery</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
