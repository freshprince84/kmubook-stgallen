import type { Metadata } from "next";
import { requireStudio } from "@/lib/studio";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const studio = await requireStudio(slug);
  return { title: `Impressum — ${studio.name}` };
}

export default async function ImpressumPage({ params }: Props) {
  const { slug } = await params;
  const studio = await requireStudio(slug);

  return (
    <div className="page-container prose prose-sm max-w-3xl py-8 md:py-12">
      <h1 className="section-title mb-8">Impressum</h1>
      <div dangerouslySetInnerHTML={{ __html: studio.impressumHtml ?? "" }} />
    </div>
  );
}
