"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SiteNavProps = {
  name: string;
  slug: string;
};

const LINKS = [
  { href: "", label: "Home" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteNav({ name, slug }: SiteNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const base = `/${slug}`;

  return (
    <header className="sticky top-0 z-50 px-4 py-4 sm:px-6">
      <nav className="glass-nav page-container flex items-center justify-between rounded-2xl px-4 py-3 md:px-6">
        <Link href={base} className="font-display text-lg font-semibold tracking-tight md:text-xl">
          {name}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => {
            const href = `${base}${l.href}`;
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition ${active ? "text-studio-primary" : "text-studio-text-muted hover:text-studio-text"}`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link href={`${base}/buchung`} className="btn-primary !py-2.5 !text-sm">
            Termin buchen
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          <span className="block h-0.5 w-6 bg-studio-text" />
          <span className="mt-1.5 block h-0.5 w-6 bg-studio-text" />
        </button>
      </nav>

      {open && (
        <div className="glass-card page-container mt-2 rounded-2xl p-4 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={`${base}${l.href}`}
              className="block py-3 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link href={`${base}/buchung`} className="btn-primary mt-2 w-full" onClick={() => setOpen(false)}>
            Termin buchen
          </Link>
        </div>
      )}
    </header>
  );
}
