import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminNav } from "@/components/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}
