export type ContentSection =
  | { type: "hero"; headline: string; subline?: string }
  | { type: "text"; title?: string; body: string }
  | { type: "features"; title?: string; items: string[] }
  | { type: "pillars"; title?: string; items: { title: string; body: string; items?: string[] }[] }
  | { type: "quote"; text: string; source?: string }
  | { type: "links"; title?: string; items: { label: string; href: string }[] };

export type StudioContent = {
  about: ContentSection[];
  contactNote?: string;
  anfahrt?: string;
};
