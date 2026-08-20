import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "../components/PagePlaceholder";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo — La Crème Bakery" },
      { name: "description", content: "Conheça bolos, tortas, macarons e doces artesanais da La Crème Bakery." },
      { property: "og:title", content: "Catálogo — La Crème Bakery" },
      { property: "og:description", content: "Bolos, tortas, macarons e doces artesanais feitos à mão." },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="Nossas criações"
      title="Catálogo"
      text="O catálogo completo com todos os nossos doces estará disponível em breve."
    />
  ),
});