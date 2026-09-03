import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { Reveal } from "../components/Reveal";
import atelie from "../assets/sobre-atelie.jpg";
import maos from "../assets/sobre-maos.jpg";
import fachada from "../assets/sobre-fachada.jpg";

const timeline = [
  {
    year: "1998",
    title: "A primeira fornada",
    text: "Dona Amélia começou a assar bolos de laranja na cozinha de casa, em Pinheiros. Vinte encomendas por semana, feitas à mão, uma a uma.",
    image: maos,
  },
  {
    year: "2006",
    title: "A casa na Rua das Oliveiras",
    text: "A confeitaria ganhou endereço próprio: um sobrado de esquina com toldo cereja, forno a lenha nos fundos e vitrine cheia todos os dias às sete da manhã.",
    image: fachada,
  },
  {
    year: "2014",
    title: "O ateliê de confeitaria",
    text: "Abrimos o ateliê aberto ao público, onde é possível ver cada camada de creme sendo montada. Ali nasceram o red velvet e os macarons que viraram assinatura da casa.",
    image: atelie,
  },
  {
    year: "Hoje",
    title: "Feito à mão, todos os dias",
    text: "Três fornadas diárias, ingredientes de produtores selecionados e a mesma receita de massa folhada de 1998. Nada congelado, nada apressado.",
    image: null,
  },
];

const valores = [
  { title: "Ingredientes reais", text: "Manteiga francesa, chocolate belga, frutas de estação. Sem gordura hidrogenada." },
  { title: "Fornadas diárias", text: "Tudo é assado no mesmo dia. O que não vende, é doado — nunca reaquecido." },
  { title: "Receitas de família", text: "Cadernos escritos à mão que atravessaram três gerações da mesma cozinha." },
];

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre Nós — La Crème Bakery" },
      {
        name: "description",
        content:
          "Desde 1998, a La Crème Bakery faz confeitaria artesanal em São Paulo: receitas de família, fornadas diárias e ingredientes selecionados.",
      },
      { property: "og:title", content: "Sobre Nós — La Crème Bakery" },
      {
        property: "og:description",
        content: "A história da La Crème Bakery: receitas de família, fornadas diárias e confeitaria artesanal desde 1998.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <main>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-cherry text-background">
        <img
          src={atelie}
          alt="Interior do ateliê da La Crème Bakery com vitrine de doces"
          width={1200}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center md:py-32 lg:px-10">
          <p className="eyebrow opacity-80">Desde 1998</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
            Uma confeitaria feita
            <br className="hidden sm:block" /> de tempo e mãos
          </h1>
          <div className="mx-auto my-8 h-px w-16 bg-background/40" />
          <p className="mx-auto max-w-2xl text-base leading-relaxed opacity-85 md:text-lg">
            A La Crème nasceu numa cozinha de casa e continua com a mesma teimosia: massa aberta à
            mão, creme cozido no fogão e nenhuma pressa entre o forno e a vitrine.
          </p>
        </div>
      </section>

      {/* Números */}
      <section className="border-b border-border bg-cream-deep">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 text-center md:grid-cols-4 lg:px-10">
          {[
            ["28", "anos de casa"],
            ["3", "fornadas por dia"],
            ["+60", "receitas autorais"],
            ["1", "endereço, sempre"],
          ].map(([n, label], i) => (
            <Reveal key={label} delay={i * 80}>
              <p className="font-display text-4xl text-cherry md:text-5xl">{n}</p>
              <p className="eyebrow mt-2 text-muted-foreground">{label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Linha do tempo */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28 lg:px-10">
        <Reveal className="text-center">
          <p className="eyebrow text-muted-foreground">Nossa história</p>
          <h2 className="mt-3 font-display text-3xl text-foreground md:text-5xl">Linha do tempo</h2>
        </Reveal>

        <ol className="mt-14 space-y-14 md:space-y-20">
          {timeline.map((item, i) => (
            <li key={item.year}>
              <Reveal>
                <article
                  className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                    i % 2 === 1 ? "md:[&>figure]:order-2" : ""
                  }`}
                >
                  <div>
                    <span className="inline-flex items-center rounded-full bg-cherry px-4 py-1.5 font-display text-lg tracking-wide text-background">
                      {item.year}
                    </span>
                    <h3 className="mt-5 font-display text-2xl text-foreground md:text-4xl">
                      {item.title}
                    </h3>
                    <div className="my-5 h-px w-12 bg-border" />
                    <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                  {item.image ? (
                    <figure className="card-cherry-accent overflow-hidden rounded-3xl shadow-cherry-sm">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        width={1200}
                        height={900}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </figure>
                  ) : (
                    <figure className="flex min-h-56 items-center justify-center rounded-3xl bg-cherry px-8 py-12 text-center text-background shadow-cherry">
                      <p className="font-display text-2xl leading-snug md:text-3xl">
                        “Doce bom é o que sai do forno e vai direto para a mesa.”
                        <span className="eyebrow mt-4 block opacity-70">Amélia Ferraz, fundadora</span>
                      </p>
                    </figure>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Valores */}
      <section className="bg-cherry text-background">
        <div className="mx-auto max-w-7xl px-5 py-20 md:py-24 lg:px-10">
          <Reveal className="text-center">
            <p className="eyebrow opacity-70">O que nos guia</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">Nossos princípios</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {valores.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-background/20 p-7 transition-colors duration-300 hover:border-background/50 hover:bg-background/5">
                  <h3 className="font-display text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-80">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visite */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <figure className="card-cherry-accent overflow-hidden rounded-3xl shadow-cherry-sm">
              <img
                src={fachada}
                alt="Fachada da La Crème Bakery com toldo cereja"
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </figure>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-muted-foreground">Visite a casa</p>
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-5xl">
              Rua das Oliveiras, 128
            </h2>
            <div className="my-6 h-px w-12 bg-border" />
            <dl className="space-y-6 text-base text-muted-foreground">
              <div className="flex gap-4">
                <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-cherry" />
                <div>
                  <dt className="eyebrow text-foreground">Endereço</dt>
                  <dd className="mt-1 leading-relaxed">
                    Rua das Oliveiras, 128 — Jardim Europa
                    <br />
                    São Paulo, SP · 01455-000
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-cherry" />
                <div>
                  <dt className="eyebrow text-foreground">Horário</dt>
                  <dd className="mt-1 leading-relaxed">
                    Terça a sexta · 8h às 19h
                    <br />
                    Sábado e domingo · 8h às 17h
                    <br />
                    Segunda · fechado
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-cherry" />
                <div>
                  <dt className="eyebrow text-foreground">Contato</dt>
                  <dd className="mt-1 leading-relaxed">
                    (11) 4002-8922 · ola@lacremebakery.com
                  </dd>
                </div>
              </div>
            </dl>
            <Link
              to="/catalogo"
              className="mt-9 inline-flex items-center justify-center rounded-full bg-cherry px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-background shadow-cherry-sm transition-all duration-300 hover:bg-cherry-light hover:shadow-cherry focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry"
            >
              Ver o catálogo
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
