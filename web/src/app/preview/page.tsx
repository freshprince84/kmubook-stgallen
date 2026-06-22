"use client";

import { useEffect, useState } from "react";

const SLUGS = [
  "coiffeur-blum",
  "physio-9000",
  "coiffure-teresa",
  "hair-creativ-daniel",
  "gold-hairstyling",
] as const;

const PATHS = [
  { path: "", label: "Home" },
  { path: "/ueber-uns", label: "Über uns" },
  { path: "/leistungen", label: "Leistungen" },
  { path: "/kontakt", label: "Kontakt" },
  { path: "/buchung", label: "Buchung" },
  { path: "/impressum", label: "Impressum" },
  { path: "/datenschutz", label: "Datenschutz" },
] as const;

function buildUrls(origin: string) {
  const pages = SLUGS.flatMap((slug) =>
    PATHS.map((p) => ({
      title: `${slug}${p.path || ""}`,
      label: `${slug} — ${p.label}`,
      url: `${origin}/${slug}${p.path}`,
    }))
  );
  pages.push({ title: "admin", label: "Admin Login", url: `${origin}/admin/login` });
  return pages;
}

export default function PreviewPage() {
  const [origin, setOrigin] = useState("");
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const pages = origin ? buildUrls(origin) : [];

  function openAllTabs() {
    pages.forEach((p, i) => {
      setTimeout(() => window.open(p.url, "_blank", "noopener,noreferrer"), i * 200);
    });
    setOpened(true);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">Preview — alle Seiten</h1>
        <p className="mt-3 text-slate-400">
          {pages.length} Tabs für alle 5 Studios + Admin. Im Cursor-Browser: Button klicken (Popups erlauben).
        </p>

        <button
          type="button"
          onClick={openAllTabs}
          className="mt-8 rounded-full bg-sky-500 px-8 py-4 text-lg font-semibold text-white hover:bg-sky-400"
        >
          Alle {pages.length} Tabs öffnen
        </button>

        {opened && (
          <p className="mt-4 text-sm text-green-400">
            Tabs werden geöffnet — falls blockiert: Popups für diese Seite erlauben und erneut klicken.
          </p>
        )}

        <ul className="mt-10 space-y-2 text-sm">
          {pages.map((p) => (
            <li key={p.url}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
