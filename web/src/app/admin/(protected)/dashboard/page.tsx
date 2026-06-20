"use client";

import { useEffect, useState } from "react";

type Dashboard = {
  studio: {
    name: string;
    slug: string;
    subscriptionStatus: string;
    trialDaysLeft: number;
    smsUsed: number;
    smsQuota: number;
  };
  today: Array<{ id: string; customerName: string; startTime: string; serviceName: string }>;
  upcomingCount: number;
  monthAppointments: number;
  monthRevenue: number;
};

export default function DashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return <p className="text-slate-500">Laden…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{data.studio.name}</h1>
      <p className="text-slate-500">
        {data.studio.subscriptionStatus === "trial"
          ? `Testphase: noch ${data.studio.trialDaysLeft} Tage`
          : `Abo: ${data.studio.subscriptionStatus}`}
        {" · "}
        SMS: {data.studio.smsUsed}/{data.studio.smsQuota}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Heute" value={String(data.today.length)} />
        <Stat label="Kommend" value={String(data.upcomingCount)} />
        <Stat label="Umsatz (Monat)" value={`CHF ${data.monthRevenue.toFixed(0)}`} />
      </div>

      <h2 className="mt-10 text-lg font-semibold">Heutige Termine</h2>
      <ul className="mt-4 divide-y rounded-xl border border-slate-200 bg-white">
        {data.today.length === 0 && (
          <li className="p-4 text-slate-500">Keine Termine heute</li>
        )}
        {data.today.map((a) => (
          <li key={a.id} className="flex justify-between p-4">
            <span className="font-medium">{a.customerName}</span>
            <span className="text-slate-600">
              {a.startTime} · {a.serviceName}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={`/${data.studio.slug}/book`}
        target="_blank"
        className="mt-6 inline-block text-sm text-slate-600 underline"
      >
        Buchungslink öffnen →
      </a>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
