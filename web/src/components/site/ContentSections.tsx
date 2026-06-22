import type { ContentSection } from "@/lib/content-types";

export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="space-y-12">
      {sections
        .filter((s) => s.type !== "hero")
        .map((section, i) => {
          if (section.type === "text") {
            return (
              <div key={i} className="glass-card p-8">
                {section.title && <h2 className="section-title mb-4">{section.title}</h2>}
                <p className="leading-relaxed text-studio-text-muted">{section.body}</p>
              </div>
            );
          }
          if (section.type === "features") {
            return (
              <div key={i} className="glass-card p-8">
                {section.title && <h2 className="section-title mb-6">{section.title}</h2>}
                <ul className="grid gap-3 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-studio-text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-studio-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          if (section.type === "pillars") {
            return (
              <div key={i}>
                {section.title && <h2 className="section-title mb-8">{section.title}</h2>}
                <div className="grid gap-6 md:grid-cols-3">
                  {section.items.map((pillar) => (
                    <div key={pillar.title} className="glass-card p-6">
                      <h3 className="font-display text-xl font-semibold">{pillar.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-studio-text-muted">{pillar.body}</p>
                      {pillar.items && (
                        <ul className="mt-4 space-y-1 text-sm text-studio-text-muted">
                          {pillar.items.map((item) => (
                            <li key={item}>· {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          if (section.type === "quote") {
            return (
              <blockquote key={i} className="glass-card border-l-4 p-8" style={{ borderColor: "var(--studio-primary)" }}>
                <p className="font-display text-2xl italic leading-snug">&ldquo;{section.text}&rdquo;</p>
                {section.source && <cite className="mt-4 block text-sm text-studio-text-muted">— {section.source}</cite>}
              </blockquote>
            );
          }
          return null;
        })}
    </div>
  );
}
