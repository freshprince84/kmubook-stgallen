import type { Metadata } from "next";
import { HeroSection } from "@/components/site/HeroSection";
import { ContentSections } from "@/components/site/ContentSections";
import { TeamGrid } from "@/components/site/TeamGrid";
import { requireStudio } from "@/lib/studio";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const studio = await requireStudio(slug);
  return {
    title: `${studio.name} — ${studio.tagline ?? "Online Termin buchen"}`,
    description: studio.description ?? undefined,
  };
}

export default async function StudioHomePage({ params }: Props) {
  const { slug } = await params;
  const studio = await requireStudio(slug);

  return (
    <div className="page-container space-y-16 py-8 md:py-12">
      <HeroSection
        slug={studio.slug}
        tagline={studio.tagline}
        description={studio.description}
        sections={studio.content.about}
      />

      {studio.teamMembers.length > 0 && (
        <section>
          <h2 className="section-title mb-8">Unser Team</h2>
          <TeamGrid members={studio.teamMembers} />
        </section>
      )}

      <ContentSections sections={studio.content.about} />
    </div>
  );
}
