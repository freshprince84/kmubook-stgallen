import Link from "next/link";

type SiteFooterProps = {
  slug: string;
  name: string;
  phone?: string | null;
  email?: string | null;
};

export function SiteFooter({ slug, name, phone, email }: SiteFooterProps) {
  return (
    <footer className="mt-20 border-t border-black/5 bg-studio-muted/50">
      <div className="page-container grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold">{name}</p>
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-2 block text-sm text-studio-text-muted hover:underline">
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="mt-1 block text-sm text-studio-text-muted hover:underline">
              {email}
            </a>
          )}
        </div>
        <div className="text-sm text-studio-text-muted">
          <p className="mb-2 font-medium text-studio-text">Rechtliches</p>
          <Link href={`/${slug}/impressum`} className="block hover:underline">
            Impressum
          </Link>
          <Link href={`/${slug}/datenschutz`} className="mt-1 block hover:underline">
            Datenschutz
          </Link>
        </div>
        <div className="text-sm text-studio-text-muted">
          <p>Online-Buchung powered by kmubook</p>
          <Link href={`/${slug}/buchung`} className="btn-primary mt-4 !text-sm">
            Termin buchen
          </Link>
        </div>
      </div>
    </footer>
  );
}
