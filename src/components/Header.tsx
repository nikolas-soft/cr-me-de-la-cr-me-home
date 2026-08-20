import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag, Instagram, Facebook } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/sobre", label: "Sobre Nós" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/clube", label: "Clube" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-cherry/20 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:h-[72px] lg:px-10">
        <Link to="/" className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-xl tracking-[0.18em] text-cherry transition-colors group-hover:text-cherry-light md:text-2xl">
            LA CRÈME
          </span>
          <span className="eyebrow mt-0.5 text-cherry/70">Bakery</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground after:w-full" }}
              className="relative text-sm tracking-wide text-muted-foreground transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 border-r border-border pr-4 lg:flex">
            <a href="#" aria-label="Instagram" className="text-muted-foreground transition-colors hover:text-foreground">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="text-muted-foreground transition-colors hover:text-foreground">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
          <Link
            to="/carrinho"
            aria-label="Carrinho"
            className="flex items-center gap-2 text-sm text-foreground transition-opacity hover:opacity-70"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="hidden sm:inline">Carrinho</span>
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-cream-deep px-5 py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 py-3 font-display text-lg text-foreground last:border-0"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}