"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Studio = {
  name: string;
  slug: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  primaryColor: string;
  subscriptionStatus: string;
  trialEndsAt: string;
  smsUsedThisMonth: number;
  smsQuotaMonthly: number;
};

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const [studio, setStudio] = useState<Studio | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#1e3a5f");
  const [saved, setSaved] = useState(false);
  const billing = searchParams.get("billing");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((s: Studio) => {
        setStudio(s);
        setName(s.name);
        setPhone(s.phone ?? "");
        setPrimaryColor(s.primaryColor);
      });
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, primaryColor }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function subscribe() {
    const res = await fetch("/api/admin/billing/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert(data.error ?? "Stripe nicht konfiguriert");
  }

  if (!studio) return <p>Laden…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Einstellungen</h1>

      {billing === "success" && (
        <p className="mt-4 rounded-lg bg-green-50 p-3 text-green-800">Abo erfolgreich aktiviert!</p>
      )}

      <form onSubmit={save} className="mt-6 max-w-md space-y-4 rounded-xl border bg-white p-6">
        <div>
          <label className="block text-sm font-medium">Studio-Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Telefon</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Markenfarbe</label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="mt-1 h-10 w-full"
          />
        </div>
        <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 text-white">
          Speichern
        </button>
        {saved && <p className="text-sm text-green-600">Gespeichert</p>}
      </form>

      <div className="mt-8 max-w-md rounded-xl border bg-white p-6">
        <h2 className="font-semibold">Abo</h2>
        <p className="mt-2 text-sm text-slate-600">
          Status: {studio.subscriptionStatus} · SMS {studio.smsUsedThisMonth}/{studio.smsQuotaMonthly}
        </p>
        <p className="text-sm text-slate-500">CHF 39/Monat · 50 SMS inkl.</p>
        {studio.subscriptionStatus !== "active" && (
          <button
            onClick={subscribe}
            className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm text-white"
          >
            Jetzt abonnieren
          </button>
        )}
      </div>

      <p className="mt-6 text-sm text-slate-500">
        Buchungslink:{" "}
        <a href={`/${studio.slug}/book`} className="underline" target="_blank">
          /{studio.slug}/book
        </a>
      </p>
    </div>
  );
}
