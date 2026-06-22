import type { Metadata } from "next";
import { ContactBlock } from "@/components/site/ContactBlock";
import { requireStudio } from "@/lib/studio";
import type { OpeningHours } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const studio = await requireStudio(slug);
  return { title: `Kontakt — ${studio.name}` };
}

export default async function KontaktPage({ params }: Props) {
  const { slug } = await params;
  const studio = await requireStudio(slug);

  return (
    <div className="page-container py-8 md:py-12">
      <h1 className="section-title mb-10">Kontakt</h1>
      <ContactBlock
        name={studio.name}
        address={studio.address}
        city={studio.city}
        phone={studio.phone}
        email={studio.email}
        openingHours={studio.openingHours as OpeningHours}
        mapsUrl={studio.socialMaps}
        note={studio.content.contactNote}
        anfahrt={studio.content.anfahrt}
      />
    </div>
  );
}
