/**
 * When sessions happen.
 *
 * One rule, in one place: Friday evenings, and daytime on Saturday and Sunday.
 * The grid is generated from it rather than typed out, so changing your week
 * means editing this object and nothing else.
 *
 * Phase 2 note: these are OFFERED times. Which ones are already taken lives in
 * the database, so the grid cannot show real availability until bookings are
 * stored. Until then every generated slot is shown as open.
 */
export const WEEKLY_SLOTS: Record<number, string[]> = {
  // 0 = Sunday
  0: ["10:00", "11:30", "13:00"],
  5: ["17:00", "18:30", "20:00"],
  6: ["10:00", "11:30", "13:00", "14:30"],
};

export type Slot = {
  /** Stable machine value, e.g. 2026-09-19T17:00 */
  id: string;
  date: Date;
  time: string;
};

export type Day = { date: Date; slots: Slot[] };

function iso(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/**
 * The next `days` days that have slots, starting tomorrow. Today is excluded:
 * a slot a few hours away is not really bookable.
 */
export function upcomingDays(days = 14, from = new Date()): Day[] {
  const result: Day[] = [];

  for (let offset = 1; offset <= days; offset += 1) {
    const date = new Date(from);
    date.setDate(from.getDate() + offset);
    date.setHours(0, 0, 0, 0);

    const times = WEEKLY_SLOTS[date.getDay()];
    if (!times) continue;

    result.push({
      date,
      slots: times.map((time) => ({ id: `${iso(date)}T${time}`, date, time })),
    });
  }

  return result;
}

export function formatDay(date: Date, lang: string): string {
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-CA", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}
