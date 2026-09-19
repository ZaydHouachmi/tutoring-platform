"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { formatDay, upcomingDays, type Day, type Slot } from "@/lib/availability";
import type { Content, Lang } from "@/lib/content";

/**
 * The next two weeks of session times, picked before the form is filled in.
 *
 * Dates are generated AFTER mount, not during render. This component ships
 * inside a statically prerendered page, so computing them during render would
 * bake the build machine's date into the HTML: every visitor would see stale
 * dates for a moment and React would report a hydration mismatch, worsening
 * the longer it had been since the last deploy.
 */
/** The dates never change while the page is open, so nothing to subscribe to. */
const subscribeNever = () => () => {};

const NO_DAYS: Day[] = [];
const serverDays = () => NO_DAYS;

/**
 * Cached because getSnapshot must return a stable reference: a fresh array
 * every call would spin React in a loop.
 */
let cachedDays: Day[] | null = null;
const clientDays = () => (cachedDays ??= upcomingDays(14));

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
  const [taken, setTaken] = useState<string[]>([]);
  // useSyncExternalStore is the hook for a value that only exists on the
  // client: the server snapshot is empty, the client snapshot is today's
  // dates, and React knows not to treat the difference as a mismatch.
  const days = useSyncExternalStore(subscribeNever, clientDays, serverDays);

  // Which slots are gone. If this fails the grid still works: every slot shows
  // as open and a clash gets caught when the session is confirmed.
  useEffect(() => {
    let active = true;
    fetch("/api/slots")
      .then((res) => (res.ok ? res.json() : { taken: [] }))
      .then((data: { taken?: string[] }) => {
        if (active) setTaken(data.taken ?? []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  const visible = showAll ? days : days.slice(0, 4);

  return (
    <div>
      <p className="text-sm font-medium text-text">{t.heading}</p>
      <p className="mt-1 text-sm text-muted">{t.sub}</p>

      <div className="mt-5 space-y-3">
        {days.length === 0 ? (
          <div aria-hidden className="space-y-3">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="h-11 rounded-card bg-surface-2" />
            ))}
          </div>
        ) : null}
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
                const isTaken = taken.includes(slot.id);
                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={isTaken}
                    aria-pressed={isSelected}
                    aria-label={isTaken ? `${slot.time} ${t.taken}` : undefined}
                    onClick={() => onSelect(isSelected ? null : slot)}
                    className={`rounded-card border px-3.5 py-2 font-mono text-sm ${
                      isTaken
                        ? "cursor-not-allowed border-line/60 bg-surface-2 text-muted/50 line-through"
                        : isSelected
                          ? "border-accent bg-accent text-on-accent active:scale-[0.97]"
                          : "border-line bg-surface text-text hover:border-muted active:scale-[0.97]"
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
