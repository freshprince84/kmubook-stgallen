import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function BookRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/${slug}/buchung`);
}
