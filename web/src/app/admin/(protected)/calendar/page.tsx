"use client";

import { useEffect, useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { de } from "date-fns/locale";

type Appointment = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  customerName: string;
  customerPhone: string;
  status: string;
  service: { name: string };
};

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const from = format(weekStart, "yyyy-MM-dd");
  const to = format(addDays(weekStart, 6), "yyyy-MM-dd");

  useEffect(() => {
    fetch(`/api/admin/appointments?from=${from}&to=${to}`)
      .then((r) => r.json())
      .then(setAppointments);
  }, [from, to]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Kalender</h1>
      <p className="text-slate-500">
        Woche {format(weekStart, "d. MMM", { locale: de })} –{" "}
        {format(addDays(weekStart, 6), "d. MMM yyyy", { locale: de })}
      </p>

      <ul className="mt-6 divide-y rounded-xl border border-slate-200 bg-white">
        {appointments.length === 0 && <li className="p-4 text-slate-500">Keine Termine</li>}
        {appointments.map((a) => (
          <li key={a.id} className="p-4">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-medium">{a.customerName}</p>
                <p className="text-sm text-slate-500">{a.service.name}</p>
              </div>
              <div className="text-right text-sm">
                <p>{format(new Date(a.date), "EEEE, d. MMM", { locale: de })}</p>
                <p className="text-slate-600">
                  {a.startTime}–{a.endTime}
                </p>
                <p className="text-slate-400">{a.status}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
