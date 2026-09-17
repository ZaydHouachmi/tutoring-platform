"use client";

import { useState } from "react";
import {
  EnvelopeSimple,
  InstagramLogo,
  MapPin,
  Phone,
  X,
} from "@phosphor-icons/react";
import { BookingForm } from "@/components/booking-form";
import { Availability } from "@/components/availability";
import { formatDay, type Slot } from "@/lib/availability";
import { CONTACT, type Content, type Lang } from "@/lib/content";

export function BookingSection({
  t,
  availability,
  lang,
}: {
  t: Content["booking"];
  availability: Content["availability"];
  lang: Lang;
}) {
  // The chosen slot lives here so the grid and the form stay in step.
  const [slot, setSlot] = useState<Slot | null>(null);

  const details = [
    { Icon: Phone, label: CONTACT.phone, href: `tel:${CONTACT.phone}` },
    { Icon: EnvelopeSimple, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    {
      Icon: InstagramLogo,
      label: `@${CONTACT.instagram}`,
      href: `https://instagram.com/${CONTACT.instagram}`,
    },
    { Icon: MapPin, label: CONTACT.city },
  ];

  return (
    <section id="book" className="border-t border-line bg-surface-2 py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {t.eyebrow}
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">{t.sub}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <Availability
              lang={lang}
              t={availability}
              selected={slot}
              onSelect={setSlot}
            />

            <ul className="mt-10 space-y-4 border-t border-line pt-8">
              {details.map(({ Icon, label, href }) => (
                <li key={label} className="flex items-center gap-3 text-muted">
                  <Icon size={20} weight="duotone" className="text-accent" />
                  {href ? (
                    <a href={href} className="hover:text-text">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
            {slot ? (
              <div className="mb-6 flex items-center justify-between gap-4 rounded-card bg-accent/10 px-4 py-3">
                <p className="text-sm text-text">
                  <span className="text-muted">{availability.chosen}: </span>
                  <span className="font-medium capitalize">
                    {formatDay(slot.date, lang)} {slot.time}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => setSlot(null)}
                  aria-label={availability.clear}
                  className="text-muted hover:text-text"
                >
                  <X size={18} />
                </button>
              </div>
            ) : null}

            <BookingForm t={t} lang={lang} slot={slot} />
          </div>
        </div>
      </div>
    </section>
  );
}
