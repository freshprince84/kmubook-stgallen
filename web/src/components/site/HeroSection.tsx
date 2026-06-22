import Link from "next/link";
import type { ContentSection } from "@/lib/content-types";

type HeroSectionProps = {
  slug: string;
  tagline?: string | null;
  description?: string | null;
  sections?: ContentSection[];
};

export function HeroSection({ slug, tagline, description, sections }: HeroSectionProps) {
  const hero = sections?.find((s) => s.type === "hero");
  const headline = hero?.type === "hero" ? hero.headline : tagline ?? "Willkommen";
  const subline = hero?.type === "hero" ? hero.subline : description;

  return (
    <section
      className="relative overflow-hidden rounded-3xl px-6 py-16 md:px-12 md:py-24"
      style={{ background: "var(--studio-hero-gradient)" }}
    >
      <div className="relative z-10 max-w-2xl">
        <h1 className="font-display text-4xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl">
          {headline}
        </h1>
        {subline && <p className="mt-6 text-lg leading-relaxed text-studio-text-muted md:text-xl">{subline}</p>}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href={`/${slug}/buchung`} className="btn-primary">
            Termin buchen
          </Link>
          <Link href={`/${slug}/leistungen`} className="btn-ghost">
            Leistungen & Preise
          </Link>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl" style={{ background: "var(--studio-primary)" }} />
    </section>
  );
}
