import Link from "next/link";

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  description?: string | null;
  bookableOnline: boolean;
  category?: { name: string } | null;
};

type ServiceGridProps = {
  slug: string;
  services: Service[];
  showBook?: boolean;
};

export function ServiceGrid({ slug, services, showBook = true }: ServiceGridProps) {
  const grouped = services.reduce<Record<string, Service[]>>((acc, s) => {
    const key = s.category?.name ?? "Weitere";
    (acc[key] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h2 className="section-title mb-6">{category}</h2>
          <div className="grid gap-4">
            {items.map((s) => (
              <div key={s.id} className="glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-medium">{s.name}</h3>
                  {s.description && <p className="mt-1 text-sm text-studio-text-muted">{s.description}</p>}
                  <p className="mt-2 text-sm text-studio-text-muted">{s.duration} Min</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-display text-xl font-semibold">
                    {s.price > 0 ? `CHF ${s.price.toFixed(0)}` : "Auf Anfrage"}
                  </span>
                  {showBook && s.bookableOnline && (
                    <Link href={`/${slug}/buchung?service=${s.id}`} className="btn-primary !px-4 !py-2 !text-xs">
                      Buchen
                    </Link>
                  )}
                  {!s.bookableOnline && (
                    <span className="text-xs text-studio-text-muted">Telefonisch</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
