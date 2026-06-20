"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import { de } from "date-fns/locale";

type Service = { id: string; name: string; duration: number; price: number };
type Studio = { name: string; primaryColor: string; active: boolean };

export default function BookPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [studio, setStudio] = useState<Studio | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [slots, setSlots] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch(`/api/studios/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setStudio(data);
      });
    fetch(`/api/studios/${slug}/services`)
      .then((r) => r.json())
      .then(setServices);
  }, [slug]);

  useEffect(() => {
    if (!serviceId || !date) return;
    fetch(`/api/studios/${slug}/availability?date=${date}&serviceId=${serviceId}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []));
  }, [slug, serviceId, date]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch(`/api/studios/${slug}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId, date, startTime, customerName, customerPhone }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Fehler bei der Buchung");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-green-700">Termin bestätigt!</h1>
        <p className="mt-4 text-slate-600">Sie erhalten eine SMS mit allen Details.</p>
        <button
          onClick={() => router.push(`/${slug}`)}
          className="mt-8 rounded-xl bg-slate-900 px-6 py-3 text-white"
        >
          Zurück
        </button>
      </main>
    );
  }

  const color = studio?.primaryColor ?? "#1e3a5f";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b-4 bg-white px-4 py-6" style={{ borderColor: color }}>
        <h1 className="text-xl font-bold">{studio?.name ?? "Termin buchen"}</h1>
      </div>

      <form onSubmit={submit} className="mx-auto max-w-lg space-y-6 px-4 py-8">
        {studio && !studio.active && (
          <p className="rounded-lg bg-amber-50 p-4 text-amber-800">
            Online-Buchung derzeit nicht verfügbar. Bitte telefonisch buchen.
          </p>
        )}

        {error && <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-slate-700">Service</label>
          <select
            required
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="">Bitte wählen</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.duration} Min, CHF {s.price})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Datum</label>
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            {Array.from({ length: 14 }, (_, i) => {
              const d = addDays(new Date(), i);
              const val = format(d, "yyyy-MM-dd");
              return (
                <option key={val} value={val}>
                  {format(d, "EEEE, d. MMMM", { locale: de })}
                </option>
              );
            })}
          </select>
        </div>

        {slots.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-slate-700">Uhrzeit</label>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setStartTime(slot)}
                  className={`rounded-lg border px-2 py-2 text-sm ${
                    startTime === slot ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Telefon (für SMS)</label>
          <input
            required
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="+41 79 000 00 00"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !startTime || Boolean(studio && !studio.active)}
          className="w-full rounded-xl py-3 font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: color }}
        >
          {loading ? "Wird gebucht…" : "Termin bestätigen"}
        </button>
      </form>
    </main>
  );
}
