"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CancelPage() {
  const { slug, token } = useParams<{ slug: string; token: string }>();
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/cancel/${token}`, { method: "POST" })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus("done");
          setMessage("Ihr Termin wurde erfolgreich abgesagt.");
        } else {
          setStatus("error");
          setMessage(data.error ?? "Termin konnte nicht abgesagt werden.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Netzwerkfehler");
      });
  }, [token]);

  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center">
      {status === "loading" && <p className="text-slate-600">Wird bearbeitet…</p>}
      {status === "done" && (
        <>
          <h1 className="text-2xl font-bold text-slate-900">Termin abgesagt</h1>
          <p className="mt-4 text-slate-600">{message}</p>
          <Link href={`/${slug}`} className="mt-8 inline-block text-slate-600 underline">
            Zurück zum Studio
          </Link>
        </>
      )}
      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold text-red-700">Fehler</h1>
          <p className="mt-4 text-slate-600">{message}</p>
        </>
      )}
    </main>
  );
}
