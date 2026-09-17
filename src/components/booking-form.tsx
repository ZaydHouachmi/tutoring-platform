"use client";

import { useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import type { Slot } from "@/lib/availability";
import {
  CONTACT,
  GRADES,
  SESSION_LANGUAGES,
  type Content,
  type Lang,
} from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

const fieldStyles =
  "w-full rounded-card border border-line bg-surface px-4 py-3 text-text placeholder:text-muted/70 focus:border-accent focus:outline-none";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-text">{label}</span>
      {children}
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

export function BookingForm({
  t,
  lang,
  slot,
}: {
  t: Content["booking"];
  lang: Lang;
  slot?: Slot | null;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang, slot: slot?.id ?? "" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="confirm rounded-card border border-accent/50 bg-surface p-8 text-center">
        <CheckCircle size={40} weight="duotone" className="mx-auto text-accent" />
        <p className="mt-4 text-lg font-medium text-text">{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      {/* Honeypot. Hidden from people and assistive tech; bots fill it in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="sm:col-span-2">
        <Field label={t.name}>
          <input name="name" required autoComplete="name" className={fieldStyles} />
        </Field>
      </div>

      <Field label={t.email}>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldStyles}
        />
      </Field>

      <Field label={t.phone} hint={t.phoneHint}>
        <input name="phone" type="tel" autoComplete="tel" className={fieldStyles} />
      </Field>

      <Field label={t.grade}>
        <select name="grade" required defaultValue="" className={fieldStyles}>
          <option value="" disabled>
            {t.gradeHint}
          </option>
          {GRADES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t.language}>
        <select name="language" className={fieldStyles} defaultValue={SESSION_LANGUAGES[0]}>
          {SESSION_LANGUAGES.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </Field>

      <div className="sm:col-span-2">
        <Field label={t.format}>
          <select name="format" className={fieldStyles} defaultValue="either">
            <option value="online">{t.formats.online}</option>
            <option value="in-person">{t.formats.inPerson}</option>
            <option value="either">{t.formats.either}</option>
          </select>
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label={t.message} hint={t.messageHint}>
          <textarea
            name="message"
            required
            rows={4}
            className={`${fieldStyles} resize-y`}
          />
        </Field>
      </div>

      {status === "error" ? (
        <p className="flex items-center gap-2 text-sm text-red-700 sm:col-span-2">
          <WarningCircle size={18} weight="duotone" />
          {t.error} {CONTACT.email}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-card bg-accent px-6 py-3.5 font-semibold text-on-accent hover:bg-accent-strong disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? t.sending : t.submit}
        </button>
      </div>
    </form>
  );
}
