import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "../components/PagePlaceholder";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho — La Crème Bakery" },
      { name: "description", content: "Seu carrinho de compras na La Crème Bakery." },
      { property: "og:title", content: "Carrinho — La Crème Bakery" },
      { property: "og:description", content: "Seu carrinho de compras na La Crème Bakery." },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="Seu pedido"
      title="Carrinho"
      text="O carrinho ainda está vazio. As compras online chegam em breve."
    />
  ),
});