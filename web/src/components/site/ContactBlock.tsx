import { OpeningHoursDisplay } from "./OpeningHoursDisplay";
import type { OpeningHours } from "@/lib/types";

type ContactBlockProps = {
  name: string;
  address?: string | null;
  city?: string | null;
  phone?: string | null;
  email?: string | null;
  openingHours: OpeningHours;
  mapsUrl?: string | null;
  note?: string;
  anfahrt?: string;
};

export function ContactBlock({
  name,
  address,
  city,
  phone,
  email,
  openingHours,
  mapsUrl,
  note,
  anfahrt,
}: ContactBlockProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="glass-card p-8">
        <h2 className="section-title mb-6">Kontakt</h2>
        <p className="font-medium">{name}</p>
        {address && <p className="mt-2 text-studio-text-muted">{address}</p>}
        {city && <p className="text-studio-text-muted">{city}</p>}
        {phone && (
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-4 block font-medium hover:underline">
            {phone}
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} className="mt-1 block text-studio-text-muted hover:underline">
            {email}
          </a>
        )}
        {note && <p className="mt-4 text-sm text-studio-text-muted">{note}</p>}
        {mapsUrl && (
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6 !text-sm">
            Auf Karte anzeigen
          </a>
        )}
      </div>
      <div className="space-y-6">
        <div className="glass-card p-8">
          <h3 className="font-display text-xl font-semibold">Öffnungszeiten</h3>
          <div className="mt-4">
            <OpeningHoursDisplay hours={openingHours} />
          </div>
        </div>
        {anfahrt && (
          <div className="glass-card p-8">
            <h3 className="font-display text-xl font-semibold">Anfahrt</h3>
            <p className="mt-3 text-sm leading-relaxed text-studio-text-muted">{anfahrt}</p>
          </div>
        )}
      </div>
    </div>
  );
}
