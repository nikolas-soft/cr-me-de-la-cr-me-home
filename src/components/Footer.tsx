import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <p className="font-display text-2xl tracking-[0.18em]">LA CRÈME</p>
          <p className="eyebrow mt-1 opacity-70">Bakery</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed opacity-70">
            Confeitaria artesanal desde 1998. Receitas clássicas, ingredientes selecionados e
            fornadas diárias.
          </p>
        </div>
        <div>
          <p className="eyebrow opacity-70">Navegação</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="opacity-80 transition-opacity hover:opacity-100">Home</Link></li>
            <li><Link to="/sobre" className="opacity-80 transition-opacity hover:opacity-100">Sobre Nós</Link></li>
            <li><Link to="/catalogo" className="opacity-80 transition-opacity hover:opacity-100">Catálogo</Link></li>
            <li><Link to="/clube" className="opacity-80 transition-opacity hover:opacity-100">Clube</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow opacity-70">Visite</p>
          <p className="mt-4 text-sm leading-relaxed opacity-80">
            Rua das Oliveiras, 128
            <br />
            Jardim Europa — São Paulo
            <br />
            Ter a Dom, 8h às 19h
          </p>
        </div>
        <div>
          <p className="eyebrow opacity-70">Contato</p>
          <div className="mt-4 flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="opacity-80 transition-opacity hover:opacity-100"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Facebook" className="opacity-80 transition-opacity hover:opacity-100"><Facebook className="h-5 w-5" /></a>
            <a href="#" aria-label="E-mail" className="opacity-80 transition-opacity hover:opacity-100"><Mail className="h-5 w-5" /></a>
          </div>
          <p className="mt-4 text-sm opacity-70">ola@lacremebakery.com</p>
        </div>
      </div>
      <div className="border-t border-background/15 px-5 py-5 text-center text-xs opacity-60 lg:px-10">
        © {new Date().getFullYear()} La Crème Bakery. Todos os direitos reservados.
      </div>
    </footer>
  );
}