import type { Metadata } from "next";
import { ServiceGrid } from "@/components/site/ServiceGrid";
import { requireStudio } from "@/lib/studio";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const studio = await requireStudio(slug);
  return { title: `Leistungen & Preise — ${studio.name}` };
}

export default async function LeistungenPage({ params }: Props) {
  const { slug } = await params;
  const studio = await requireStudio(slug);

  return (
    <div className="page-container py-8 md:py-12">
      <h1 className="section-title mb-4">Leistungen & Preise</h1>
      <p className="mb-10 max-w-2xl text-studio-text-muted">
        Transparente Preise — online buchbar oder telefonisch nach Vereinbarung.
      </p>
      <ServiceGrid slug={studio.slug} services={studio.services} />
    </div>
  );
}
