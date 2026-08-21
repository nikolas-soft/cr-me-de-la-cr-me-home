import prodCinnamon from "../assets/prod-cinnamon.jpg";
import prodTiramisu from "../assets/prod-tiramisu.jpg";
import prodCereja from "../assets/prod-cereja.jpg";
import prodMacarons from "../assets/prod-macarons.jpg";
import prodCroissant from "../assets/prod-croissant.jpg";
import prodLimao from "../assets/prod-limao.jpg";

export const categories = [
  "Todos",
  "Bolos",
  "Tortas",
  "Doces",
  "Cookies",
  "Macarons",
  "Brownies",
  "Croissants",
  "Sobremesas",
] as const;

export type Category = (typeof categories)[number];

export type Product = {
  slug: string;
  name: string;
  category: Exclude<Category, "Todos">;
  shortDescription: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
};

/**
 * Dados mockados. Estrutura pensada para ser substituída depois por
 * uma chamada de API / banco de dados sem alterar os componentes.
 */
export const products: Product[] = [
  {
    slug: "bolo-de-cenoura-belga",
    name: "Bolo de Cenoura Belga",
    category: "Bolos",
    shortDescription: "Massa úmida de cenoura com ganache de chocolate belga.",
    description:
      "Nosso clássico da casa: massa aerada de cenoura fresca, assada em forma alta e coberta com uma ganache espessa de chocolate belga 55%. Servido em fatias generosas.",
    price: 68,
    image: prodCinnamon,
    ingredients: ["Cenoura fresca", "Ovos caipiras", "Farinha de trigo", "Chocolate belga 55%", "Manteiga francesa"],
  },
  {
    slug: "bolo-red-velvet",
    name: "Bolo Red Velvet",
    category: "Bolos",
    shortDescription: "Camadas aveludadas com creme de cream cheese.",
    description:
      "Três camadas de massa aveludada com cacau suave, intercaladas por creme de cream cheese batido na hora. Finalizado com farofa da própria massa.",
    price: 92,
    image: prodCereja,
    ingredients: ["Cacau", "Cream cheese", "Buttermilk", "Baunilha Bourbon", "Manteiga francesa"],
  },
  {
    slug: "bolo-de-limao-siciliano",
    name: "Bolo de Limão Siciliano",
    category: "Bolos",
    shortDescription: "Massa cítrica com calda de limão siciliano.",
    description:
      "Massa amanteigada com raspas de limão siciliano, regada ainda quente com calda cítrica e coberta por um glacê leve.",
    price: 74,
    image: prodLimao,
    ingredients: ["Limão siciliano", "Manteiga francesa", "Ovos caipiras", "Açúcar de confeiteiro"],
  },
  {
    slug: "torta-de-cereja",
    name: "Torta de Cereja",
    category: "Tortas",
    shortDescription: "Massa folhada com recheio de cerejas frescas.",
    description:
      "Cerejas cozidas lentamente em açúcar e baunilha, envolvidas por uma massa folhada feita com manteiga francesa e dobrada à mão por dois dias.",
    price: 32,
    image: prodCereja,
    ingredients: ["Cerejas frescas", "Manteiga francesa", "Farinha de trigo", "Baunilha Bourbon"],
  },
  {
    slug: "tartelette-de-limao",
    name: "Tartelette de Limão",
    category: "Tortas",
    shortDescription: "Creme de limão com merengue maçaricado.",
    description:
      "Base de massa sablée crocante, creme de limão siciliano cozido em banho-maria e merengue italiano maçaricado na hora do pedido.",
    price: 22,
    image: prodLimao,
    ingredients: ["Limão siciliano", "Ovos caipiras", "Massa sablée", "Merengue italiano"],
  },
  {
    slug: "torta-de-maca-rustica",
    name: "Torta de Maçã Rústica",
    category: "Tortas",
    shortDescription: "Maçãs caramelizadas em massa quebradiça.",
    description:
      "Maçãs fatiadas finas e caramelizadas com canela, assadas em massa quebradiça rústica com bordas dobradas à mão.",
    price: 38,
    image: prodCinnamon,
    ingredients: ["Maçã gala", "Canela do Ceilão", "Manteiga francesa", "Açúcar mascavo"],
  },
  {
    slug: "cinnamon-roll",
    name: "Cinnamon Roll",
    category: "Doces",
    shortDescription: "Rolinho de canela com glacê de cream cheese.",
    description:
      "Massa fermentada lentamente por 18 horas, enrolada com manteiga e canela do Ceilão, finalizada com glacê de cream cheese ainda morno.",
    price: 18,
    image: prodCinnamon,
    ingredients: ["Canela do Ceilão", "Cream cheese", "Manteiga francesa", "Fermento natural"],
  },
  {
    slug: "eclair-de-baunilha",
    name: "Éclair de Baunilha",
    category: "Doces",
    shortDescription: "Massa choux com creme de baunilha Bourbon.",
    description:
      "Massa choux assada até o ponto exato de crocância, preenchida com creme pâtissière de baunilha Bourbon e finalizada com fondant.",
    price: 19,
    image: prodTiramisu,
    ingredients: ["Baunilha Bourbon", "Leite integral", "Ovos caipiras", "Manteiga francesa"],
  },
  {
    slug: "cookie-de-chocolate-belga",
    name: "Cookie de Chocolate Belga",
    category: "Cookies",
    shortDescription: "Casquinha crocante e centro macio.",
    description:
      "Massa descansada por 48 horas, com generosos pedaços de chocolate belga e uma pitada de flor de sal por cima.",
    price: 14,
    image: prodCinnamon,
    ingredients: ["Chocolate belga 55%", "Flor de sal", "Manteiga francesa", "Açúcar mascavo"],
  },
  {
    slug: "cookie-de-avela",
    name: "Cookie de Avelã",
    category: "Cookies",
    shortDescription: "Avelãs tostadas e chocolate ao leite.",
    description:
      "Avelãs tostadas na casa, moídas grosseiramente e misturadas a chocolate ao leite em uma massa amanteigada.",
    price: 15,
    image: prodTiramisu,
    ingredients: ["Avelã", "Chocolate ao leite", "Manteiga francesa", "Ovos caipiras"],
  },
  {
    slug: "macarons-sortidos",
    name: "Macarons Sortidos (6 un.)",
    category: "Macarons",
    shortDescription: "Seis sabores clássicos da confeitaria francesa.",
    description:
      "Caixa com seis macarons de farinha de amêndoas: pistache, framboesa, baunilha, chocolate, limão e caramelo salgado.",
    price: 45,
    image: prodMacarons,
    ingredients: ["Farinha de amêndoas", "Clara de ovo", "Açúcar de confeiteiro", "Recheios sazonais"],
  },
  {
    slug: "macaron-de-pistache",
    name: "Macaron de Pistache",
    category: "Macarons",
    shortDescription: "Ganache de pistache siciliano.",
    description:
      "Conchas lisas de amêndoa com ganache montada de pistache siciliano — o mais pedido da vitrine.",
    price: 9,
    image: prodMacarons,
    ingredients: ["Pistache siciliano", "Farinha de amêndoas", "Chocolate branco", "Creme de leite fresco"],
  },
  {
    slug: "brownie-classico",
    name: "Brownie Clássico",
    category: "Brownies",
    shortDescription: "Denso, úmido e com casquinha brilhante.",
    description:
      "Chocolate belga derretido na manteiga, batido apenas o necessário para manter o miolo úmido e a casquinha espelhada.",
    price: 16,
    image: prodTiramisu,
    ingredients: ["Chocolate belga 70%", "Manteiga francesa", "Ovos caipiras", "Cacau"],
  },
  {
    slug: "brownie-de-nozes",
    name: "Brownie de Nozes",
    category: "Brownies",
    shortDescription: "Brownie clássico com nozes tostadas.",
    description:
      "Nosso brownie clássico com nozes tostadas incorporadas à massa e espalhadas por cima antes de assar.",
    price: 18,
    image: prodCinnamon,
    ingredients: ["Chocolate belga 70%", "Nozes", "Manteiga francesa", "Açúcar mascavo"],
  },
  {
    slug: "croissant-de-manteiga",
    name: "Croissant de Manteiga",
    category: "Croissants",
    shortDescription: "72 horas de fermentação e folhas crocantes.",
    description:
      "Massa laminada com manteiga francesa em dobras sucessivas ao longo de três dias. Assado em pequenas fornadas ao longo do dia.",
    price: 14,
    image: prodCroissant,
    ingredients: ["Manteiga francesa", "Farinha de trigo", "Fermento natural", "Sal marinho"],
  },
  {
    slug: "croissant-amendoas",
    name: "Croissant de Amêndoas",
    category: "Croissants",
    shortDescription: "Recheio de frangipane e amêndoas laminadas.",
    description:
      "Croissant do dia anterior recheado com frangipane, coberto por amêndoas laminadas e açúcar de confeiteiro.",
    price: 17,
    image: prodCroissant,
    ingredients: ["Amêndoas", "Manteiga francesa", "Ovos caipiras", "Açúcar de confeiteiro"],
  },
  {
    slug: "tiramisu",
    name: "Tiramisu",
    category: "Sobremesas",
    shortDescription: "Mascarpone, café expresso e cacau.",
    description:
      "Camadas de biscoito champagne embebido em café expresso, creme de mascarpone batido na hora e cacau peneirado por cima.",
    price: 26,
    image: prodTiramisu,
    ingredients: ["Mascarpone", "Café expresso", "Cacau", "Ovos caipiras"],
  },
  {
    slug: "mousse-de-chocolate",
    name: "Mousse de Chocolate 70%",
    category: "Sobremesas",
    shortDescription: "Mousse aerada de chocolate intenso.",
    description:
      "Chocolate belga 70% batido com creme de leite fresco e claras em neve, servido em pote de vidro com raspas de cacau.",
    price: 21,
    image: prodCereja,
    ingredients: ["Chocolate belga 70%", "Creme de leite fresco", "Ovos caipiras", "Baunilha Bourbon"],
  },
];

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
