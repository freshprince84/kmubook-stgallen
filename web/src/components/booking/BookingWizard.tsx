"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, addDays } from "date-fns";
import { de } from "date-fns/locale";

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  bookableOnline: boolean;
  category?: { name: string } | null;
};

type StudioInfo = {
  name: string;
  active: boolean;
  depositEnabled: boolean;
  depositAmount: number | null;
};

type Props = { slug: string };

const STEPS = ["Service", "Termin", "Kontakt", "Zahlung"];

export function BookingWizard({ slug }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselect = searchParams.get("service");

  const [studio, setStudio] = useState<StudioInfo | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(preselect ?? "");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [slots, setSlots] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [payWithTwint, setPayWithTwint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch(`/api/studios/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setStudio(data);
      });
    fetch(`/api/studios/${slug}/services`)
      .then((r) => r.json())
      .then((data) => setServices(data.filter((s: Service) => s.bookableOnline)));
  }, [slug]);

  useEffect(() => {
    if (preselect) setServiceId(preselect);
  }, [preselect]);

  useEffect(() => {
    if (!serviceId || !date) return;
    fetch(`/api/studios/${slug}/availability?date=${date}&serviceId=${serviceId}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []));
  }, [slug, serviceId, date]);

  const selected = services.find((s) => s.id === serviceId);
  const needsPayment = studio?.depositEnabled && (studio.depositAmount ?? 0) > 0;
  const totalSteps = needsPayment ? 4 : 3;

  async function submit(skipPayment = false) {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/studios/${slug}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId,
        date,
        startTime,
        customerName,
        customerPhone,
        depositRequested: !skipPayment && payWithTwint && needsPayment,
      }),
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
      <div className="glass-card mx-auto max-w-lg p-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
          ✓
        </div>
        <h2 className="font-display text-2xl font-semibold">Termin bestätigt</h2>
        <p className="mt-4 text-studio-text-muted">Sie erhalten eine SMS mit allen Details.</p>
        {payWithTwint && needsPayment && (
          <p className="mt-2 text-sm text-studio-text-muted">
            Twint-Anzahlung (Demo): CHF {studio?.depositAmount?.toFixed(0)} — in Produktion via Payrexx/Mollie.
          </p>
        )}
        <button type="button" onClick={() => router.push(`/${slug}`)} className="btn-primary mt-8">
          Zurück zur Startseite
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-8 flex gap-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition ${i <= step ? "bg-studio-primary" : "bg-black/10"}`}
          />
        ))}
      </div>

      <div className="glass-card p-6 md:p-8">
        <p className="text-sm text-studio-text-muted">
          Schritt {step + 1} von {totalSteps} — {STEPS[step] ?? "Fertig"}
        </p>

        {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {studio && !studio.active && (
          <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
            Online-Buchung derzeit nicht verfügbar. Bitte telefonisch buchen.
          </p>
        )}

        {step === 0 && (
          <div className="mt-6 space-y-3">
            <h2 className="font-display text-xl font-semibold">Service wählen</h2>
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setServiceId(s.id)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  serviceId === s.id ? "border-studio-primary bg-studio-primary/5" : "border-black/10"
                }`}
              >
                <span className="font-medium">{s.name}</span>
                <span className="mt-1 block text-sm text-studio-text-muted">
                  {s.duration} Min · CHF {s.price.toFixed(0)}
                  {s.category ? ` · ${s.category.name}` : ""}
                </span>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="mt-6 space-y-4">
            <h2 className="font-display text-xl font-semibold">Termin wählen</h2>
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3"
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
            {slots.length > 0 ? (
              <div className="grid grid-cols-4 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setStartTime(slot)}
                    className={`rounded-lg border py-2 text-sm ${
                      startTime === slot ? "border-studio-primary bg-studio-primary text-white" : "border-black/10"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-studio-text-muted">Keine freien Termine an diesem Tag.</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-4">
            <h2 className="font-display text-xl font-semibold">Ihre Kontaktdaten</h2>
            <input
              required
              placeholder="Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-3"
            />
            <input
              required
              type="tel"
              placeholder="Telefon (+41 …)"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-3"
            />
            {selected && (
              <div className="rounded-xl bg-studio-muted p-4 text-sm">
                <strong>Zusammenfassung:</strong> {selected.name}, {format(new Date(date), "d. MMMM", { locale: de })}{" "}
                um {startTime}
              </div>
            )}
          </div>
        )}

        {step === 3 && needsPayment && (
          <div className="mt-6 space-y-4">
            <h2 className="font-display text-xl font-semibold">Anzahlung (optional)</h2>
            <p className="text-sm text-studio-text-muted">
              Sichern Sie Ihren Termin mit einer Twint-Anzahlung von CHF {studio?.depositAmount?.toFixed(0)}.
            </p>
            <button
              type="button"
              onClick={() => setPayWithTwint(true)}
              className={`flex w-full items-center gap-4 rounded-xl border p-4 transition ${
                payWithTwint ? "border-studio-primary bg-studio-primary/5" : "border-black/10"
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#000000] text-xs font-bold text-white">
                TWINT
              </span>
              <span>
                <span className="font-medium">Mit Twint bezahlen</span>
                <span className="block text-sm text-studio-text-muted">
                  CHF {studio?.depositAmount?.toFixed(0)} Anzahlung (Demo-Modus)
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPayWithTwint(false)}
              className={`w-full rounded-xl border p-4 text-left ${
                !payWithTwint ? "border-studio-primary bg-studio-primary/5" : "border-black/10"
              }`}
            >
              <span className="font-medium">Ohne Anzahlung buchen</span>
            </button>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)} className="btn-ghost flex-1">
              Zurück
            </button>
          )}
          {step < totalSteps - 1 ? (
            <button
              type="button"
              disabled={
                (step === 0 && !serviceId) ||
                (step === 1 && !startTime) ||
                (step === 2 && (!customerName || !customerPhone))
              }
              onClick={() => setStep(step + 1)}
              className="btn-primary flex-1"
            >
              Weiter
            </button>
          ) : (
            <button
              type="button"
              disabled={loading || Boolean(studio && !studio.active)}
              onClick={() => submit()}
              className="btn-primary flex-1"
            >
              {loading ? "Wird gebucht…" : payWithTwint && needsPayment ? "Buchen & Twint" : "Termin bestätigen"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
