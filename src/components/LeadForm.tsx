'use client'
import { useState } from "react";

export default function LeadForm() {
  const [status, setStatus] = useState<null | "idle" | "ok" | "err">(null);
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");
    setMsg("Envoi en cours…");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const website = (form.elements.namedItem("website") as HTMLInputElement).value; // honeypot

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, website }),
    });

    if (res.ok) {
      setStatus("ok");
      setMsg("✅ Merci ! Vérifiez votre boîte mail.");
      form.reset();
    } else {
      const data = await res.json().catch(() => ({} as any));
      setStatus("err");
      setMsg(`❌ Erreur: ${data?.error || "Impossible d'envoyer l'email"}`);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 max-w-md">
      <label className="text-sm font-medium">Recevoir le guide gratuit</label>
      <input
        type="email"
        name="email"
        required
        placeholder="Votre email"
        className="border rounded px-3 py-2"
        autoComplete="email"
      />
      {/* Honeypot field (hide via CSS) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700"
      >
        Recevoir le guide
      </button>
      {status && <p className="text-sm">{msg}</p>}
    </form>
  );
}
