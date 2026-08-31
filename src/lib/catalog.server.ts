import type { Category, Product } from "../data/products";
import { categories } from "../data/products";

/**
 * Camada isolada de integração com API externa de receitas/produtos.
 * Hoje suporta Spoonacular; trocar de provedor exige mudar apenas este arquivo.
 *
 * Sem chave configurada (ou com qualquer falha), retorna `null` e o app
 * continua usando os dados mockados — o site nunca quebra por falta de API.
 */

type SpoonacularRecipe = {
  id: number;
  title: string;
  image?: string;
  summary?: string;
  dishTypes?: string[];
  pricePerServing?: number;
  extendedIngredients?: { original?: string; name?: string }[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}

function toCategory(dishTypes: string[] | undefined): Exclude<Category, "Todos"> {
  const haystack = (dishTypes ?? []).join(" ").toLowerCase();
  const map: [string, Exclude<Category, "Todos">][] = [
    ["cake", "Bolos"],
    ["pie", "Tortas"],
    ["tart", "Tortas"],
    ["cookie", "Cookies"],
    ["macaron", "Macarons"],
    ["brownie", "Brownies"],
    ["croissant", "Croissants"],
    ["dessert", "Sobremesas"],
  ];
  for (const [needle, category] of map) {
    if (haystack.includes(needle)) return category;
  }
  const fallback = categories[3] as Exclude<Category, "Todos">;
  return fallback;
}

function mapRecipe(recipe: SpoonacularRecipe): Product | null {
  if (!recipe.title || !recipe.image) return null;
  const description = stripHtml(recipe.summary ?? "");
  const short = description.slice(0, 120) || "Doce artesanal da nossa seleção.";
  const price = recipe.pricePerServing ? Math.max(9, Math.round(recipe.pricePerServing / 10)) : 25;

  return {
    slug: `${slugify(recipe.title)}-${recipe.id}`,
    name: recipe.title,
    category: toCategory(recipe.dishTypes),
    shortDescription: short,
    description: description || short,
    price,
    image: recipe.image,
    ingredients: (recipe.extendedIngredients ?? [])
      .map((i) => i.name ?? i.original ?? "")
      .filter(Boolean)
      .slice(0, 6),
  };
}

export async function fetchRemoteProducts(): Promise<Product[] | null> {
  const apiKey = process.env["SPOONACULAR_API_KEY"];
  if (!apiKey) return null;

  try {
    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
    url.searchParams.set("type", "dessert");
    url.searchParams.set("number", "18");
    url.searchParams.set("addRecipeInformation", "true");
    url.searchParams.set("fillIngredients", "true");
    url.searchParams.set("apiKey", apiKey);

    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;

    const json = (await res.json()) as { results?: SpoonacularRecipe[] };
    const mapped = (json.results ?? []).map(mapRecipe).filter((p): p is Product => p !== null);
    return mapped.length > 0 ? mapped : null;
  } catch {
    return null;
  }
}
