import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "../components/PagePlaceholder";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre Nós — La Crème Bakery" },
      { name: "description", content: "A história da La Crème Bakery: receitas de família, fornadas diárias e confeitaria artesanal." },
      { property: "og:title", content: "Sobre Nós — La Crème Bakery" },
      { property: "og:description", content: "A história da La Crème Bakery: receitas de família e confeitaria artesanal." },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="Nossa história"
      title="Sobre Nós"
      text="Em breve contaremos aqui a história da La Crème Bakery, nossa cozinha e as mãos que fazem cada doce."
    />
  ),
});