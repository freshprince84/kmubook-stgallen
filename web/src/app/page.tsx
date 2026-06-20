import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">St. Gallen</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">KMU Buchungs-Tool</h1>
        <p className="mt-4 text-lg text-slate-600">
          Online-Termine für Coiffeure und Therapeuten — einfach, lokal, mit SMS-Bestätigung.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/coiffeur-blum/book"
            className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Demo: Coiffeur Blum
          </Link>
          <Link
            href="/admin/login"
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Admin Login
          </Link>
        </div>
        <p className="mt-12 text-sm text-slate-500">
          CHF 39/Monat · 30 Tage gratis · 50 SMS inkl.
        </p>
      </div>
    </main>
  );
}
