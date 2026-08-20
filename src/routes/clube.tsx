import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "../components/PagePlaceholder";

export const Route = createFileRoute("/clube")({
  head: () => ({
    meta: [
      { title: "Clube — La Crème Bakery" },
      { name: "description", content: "O clube de assinatura da La Crème Bakery: uma seleção de doces artesanais todo mês." },
      { property: "og:title", content: "Clube — La Crème Bakery" },
      { property: "og:description", content: "Uma seleção de doces artesanais entregue todo mês." },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="Assinatura"
      title="Clube La Crème"
      text="Nosso clube de assinatura mensal está sendo preparado com carinho. Em breve, mais detalhes."
    />
  ),
});