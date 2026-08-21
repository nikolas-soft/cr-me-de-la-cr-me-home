import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "../data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border-2 border-cherry/20 bg-background shadow-cherry-sm transition-all duration-500 hover:-translate-y-1 hover:border-cherry hover:shadow-cherry">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-cherry px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-background shadow-cherry-sm">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col border-t-4 border-cherry px-6 py-5">
        <h3 className="font-display text-xl text-cherry">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="rounded-full bg-cherry px-3 py-1 text-xs font-medium tracking-wide text-background">
            {formatPrice(product.price)}
          </span>
          <Link
            to="/produto/$slug"
            params={{ slug: product.slug }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-cherry px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-cherry transition-colors hover:bg-cherry hover:text-background"
          >
            Ver produto
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
