import Link from "next/link";

type StudioHeaderProps = {
  name: string;
  slug: string;
  address?: string | null;
  city?: string | null;
  phone?: string | null;
  primaryColor: string;
};

export function StudioHeader({ name, slug, address, city, phone, primaryColor }: StudioHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white" style={{ borderTopColor: primaryColor, borderTopWidth: 4 }}>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">{name}</h1>
        {(address || city) && (
          <p className="mt-1 text-slate-600">
            {[address, city].filter(Boolean).join(", ")}
          </p>
        )}
        {phone && (
          <p className="mt-1 text-slate-600">
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:underline">
              {phone}
            </a>
          </p>
        )}
        <Link
          href={`/${slug}/book`}
          className="mt-6 inline-block rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm"
          style={{ backgroundColor: primaryColor }}
        >
          Termin buchen
        </Link>
      </div>
    </header>
  );
}
