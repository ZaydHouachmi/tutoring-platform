"use client";

import { useState } from "react";
import { RATES, type Content } from "@/lib/content";

/**
 * Pick hours, get the honest answer.
 *
 * Five priced options is four too many to hold in your head, so the reader
 * moves one slider and the page does the arithmetic. It deliberately says
 * "no package needed" at low hours rather than pushing the biggest plan:
 * the pricing section is already built on being straight with people.
 */
export function PricePicker({ t }: { t: Content["pricing"] }) {
  const [hours, setHours] = useState(6);
  const picker = t.picker;

  const payAsYouGo = hours * RATES.hourly;

  // Price every route the family could take, then recommend the cheapest.
  // Packs that do not cover the hours still count, topped up at the single
  // rate, which beats pay-as-you-go once the hours get high.
  const options = [
    { id: null as string | null, total: payAsYouGo, extra: 0 },
    ...RATES.packs.map((p) => ({
      id: p.id as string | null,
      total: p.price + Math.max(0, hours - p.sessions) * RATES.hourly,
      extra: Math.max(0, hours - p.sessions),
    })),
  ];
  const best = options.reduce((a, b) => (b.total < a.total ? b : a));

  const total = best.total;
  const perHour = (total / hours).toFixed(2).replace(/\.00$/, "");
  const saved = payAsYouGo - total;
  const useSingle = best.id === null;
  const planName = useSingle ? t.single.name : t.packs[best.id!].name;

  return (
    <div className="mt-12 rounded-card border border-line bg-surface p-6 sm:p-8">
      <label htmlFor="hours" className="block font-medium text-text">
        {picker.question}
      </label>

      <div className="mt-6 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <input
            id="hours"
            type="range"
            min={1}
            max={10}
            step={1}
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-2 accent-accent"
          />
          <p className="mt-3 font-mono text-sm text-muted">
            <span className="text-2xl font-semibold text-text">{hours}</span>{" "}
            {picker.hours}
          </p>
        </div>

        {/* aria-live so the result is announced as the slider moves. */}
        <div aria-live="polite" className="border-t border-line pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">
            {picker.recommend}
          </p>
          <p className="mt-1 text-xl font-semibold text-text">{planName}</p>

          <dl className="mt-4 space-y-1.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{picker.youPay}</dt>
              <dd className="font-medium text-text">${total}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{picker.effective}</dt>
              <dd className="font-medium text-text">
                ${perHour}
                {t.perHourShort}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{picker.saves}</dt>
              <dd className="font-medium text-accent">
                {saved > 0 ? `$${saved}` : "-"}
              </dd>
            </div>
          </dl>

          {useSingle ? (
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {picker.noSaving}
            </p>
          ) : null}
          {best.extra > 0 ? (
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {picker.plusExtra}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
