import { createServerFn } from "@tanstack/react-start";
import { products as mockProducts, type Product } from "../data/products";

export type CatalogResult = {
  source: "api" | "mock";
  products: Product[];
};

/**
 * Ponto único de leitura do catálogo pelo frontend.
 * A chave da API vive apenas no servidor; se não existir (ou a API falhar),
 * devolvemos os dados mockados.
 */
export const getCatalog = createServerFn({ method: "GET" }).handler(async (): Promise<CatalogResult> => {
  const { fetchRemoteProducts } = await import("./catalog.server");
  const remote = await fetchRemoteProducts();
  if (remote && remote.length > 0) return { source: "api", products: remote };
  return { source: "mock", products: mockProducts };
});
