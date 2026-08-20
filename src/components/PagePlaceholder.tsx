import { Link } from "@tanstack/react-router";

export function PagePlaceholder({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center">
      <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">{title}</h1>
      <div className="my-7 h-px w-16 bg-border" />
      <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{text}</p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center justify-center rounded-full border border-foreground px-7 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        Voltar à home
      </Link>
    </section>
  );
}