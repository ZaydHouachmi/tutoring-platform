"use client";

import { useMemo, useState } from "react";
import { formatDay, upcomingDays, type Slot } from "@/lib/availability";
import type { Content, Lang } from "@/lib/content";

/**
 * The next two weeks of session times, picked before the form is filled in.
 *
 * Generated on the client from the weekly rule so the dates are always current
 * without a build. Times are shown in the visitor's own locale formatting.
 */
export function Availability({
  lang,
  t,
  selected,
  onSelect,
}: {
  lang: Lang;
  t: Content["availability"];
  selected: Slot | null;
  onSelect: (slot: Slot | null) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const days = useMemo(() => upcomingDays(14), []);
  const visible = showAll ? days : days.slice(0, 4);

  return (
    <div>
      <p className="text-sm font-medium text-text">{t.heading}</p>
      <p className="mt-1 text-sm text-muted">{t.sub}</p>

      <div className="mt-5 space-y-3">
        {visible.map((day) => (
          <div
            key={day.date.toISOString()}
            className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:items-center"
          >
            <p className="text-sm font-medium capitalize text-muted">
              {formatDay(day.date, lang)}
            </p>
            <div className="flex flex-wrap gap-2">
              {day.slots.map((slot) => {
                const isSelected = selected?.id === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onSelect(isSelected ? null : slot)}
                    className={`rounded-card border px-3.5 py-2 font-mono text-sm active:scale-[0.97] ${
                      isSelected
                        ? "border-accent bg-accent text-on-accent"
                        : "border-line bg-surface text-text hover:border-muted"
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {days.length > visible.length ? (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-4 text-sm font-medium text-accent hover:text-accent-strong"
        >
          {t.showAll}
        </button>
      ) : null}

      <p className="mt-5 text-xs leading-relaxed text-muted">{t.note}</p>
    </div>
  );
}
