import type { Metadata } from "next";
import { ContentSections } from "@/components/site/ContentSections";
import { TeamGrid } from "@/components/site/TeamGrid";
import { requireStudio } from "@/lib/studio";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const studio = await requireStudio(slug);
  return { title: `Über uns — ${studio.name}` };
}

export default async function UeberUnsPage({ params }: Props) {
  const { slug } = await params;
  const studio = await requireStudio(slug);

  return (
    <div className="page-container space-y-12 py-8 md:py-12">
      <h1 className="section-title">Über uns</h1>
      <ContentSections sections={studio.content.about} />
      {studio.teamMembers.length > 0 && (
        <section>
          <h2 className="section-title mb-8">Team</h2>
          <TeamGrid members={studio.teamMembers} />
        </section>
      )}
    </div>
  );
}
