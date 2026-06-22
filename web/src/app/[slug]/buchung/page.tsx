import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { requireStudio } from "@/lib/studio";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const studio = await requireStudio(slug);
  return { title: `Termin buchen — ${studio.name}` };
}

export default async function BuchungPage({ params }: Props) {
  const { slug } = await params;
  const studio = await requireStudio(slug);

  return (
    <div className="page-container py-8 md:py-12">
      <h1 className="section-title mb-2">Termin buchen</h1>
      <p className="mb-8 text-studio-text-muted">{studio.name} — in wenigen Schritten online reservieren.</p>
      <Suspense fallback={<p className="text-studio-text-muted">Laden…</p>}>
        <BookingWizard slug={slug} />
      </Suspense>
    </div>
  );
}
