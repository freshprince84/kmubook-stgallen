"use client";

import { useEffect, useState } from "react";

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  isActive: boolean;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(60);
  const [price, setPrice] = useState(95);

  function load() {
    fetch("/api/admin/services").then((r) => r.json()).then(setServices);
  }

  useEffect(() => {
    load();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, duration, price }),
    });
    setName("");
    load();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Services</h1>

      <form onSubmit={add} className="mt-6 flex flex-wrap gap-3 rounded-xl border bg-white p-4">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-lg border px-3 py-2"
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-24 rounded-lg border px-3 py-2"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-24 rounded-lg border px-3 py-2"
        />
        <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-white">
          Hinzufügen
        </button>
      </form>

      <ul className="mt-6 divide-y rounded-xl border bg-white">
        {services.filter((s) => s.isActive).map((s) => (
          <li key={s.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-slate-500">
                {s.duration} Min · CHF {s.price}
              </p>
            </div>
            <button onClick={() => remove(s.id)} className="text-sm text-red-600">
              Deaktivieren
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
