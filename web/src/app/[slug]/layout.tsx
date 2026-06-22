import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getStudioBySlug } from "@/lib/studio";
import { themeToCssVars } from "@/lib/studio-theme";

export const dynamic = "force-dynamic";

type Props = { children: React.ReactNode; params: Promise<{ slug: string }> };

export default async function StudioLayout({ children, params }: Props) {
  const { slug } = await params;
  const studio = await getStudioBySlug(slug);
  if (!studio) notFound();

  const cssVars = themeToCssVars(studio.theme);

  return (
    <div style={cssVars as React.CSSProperties} className="min-h-screen bg-studio-surface">
      <SiteNav name={studio.name} slug={studio.slug} />
      <main>{children}</main>
      <SiteFooter slug={studio.slug} name={studio.name} phone={studio.phone} email={studio.email} />
    </div>
  );
}
