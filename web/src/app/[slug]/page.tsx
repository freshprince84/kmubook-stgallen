import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { StudioHeader } from "@/components/StudioHeader";

type Props = { params: Promise<{ slug: string }> };

export default async function StudioPage({ params }: Props) {
  const { slug } = await params;
  const studio = await prisma.studio.findUnique({ where: { slug } });
  if (!studio) notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      <StudioHeader
        name={studio.name}
        slug={studio.slug}
        address={studio.address}
        city={studio.city}
        phone={studio.phone}
        primaryColor={studio.primaryColor}
      />
      <div className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-slate-600">
          Buchen Sie Ihren Termin online — rund um die Uhr, mit SMS-Bestätigung.
        </p>
      </div>
    </main>
  );
}
