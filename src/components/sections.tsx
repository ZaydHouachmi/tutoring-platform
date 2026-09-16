import Image from "next/image";
import {
  CalendarDots,
  ChatCircleDots,
  GraduationCap,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { RATES, type Content } from "@/lib/content";
import notebookImage from "../../public/brand/notebook-problem.png";

const SHELL = "mx-auto w-full max-w-6xl px-5 sm:px-8";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      {children}
    </p>
  );
}

export function Hero({ t }: { t: Content["hero"] }) {
  return (
    <section className="relative overflow-hidden pt-14 pb-24 sm:pt-20">
      {/* Ruled paper texture plus one soft green wash. No neon, no mesh gradient. */}
      <div
        aria-hidden
        className="paper-grid pointer-events-none absolute inset-0 opacity-90"
      />
      <div
        className={`${SHELL} relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]`}
      >
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
            {t.headline}{" "}
            <span className="text-accent">{t.headlineAccent}</span>
          </h1>
          <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-muted">
            {t.sub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#book"
              className="rounded-card bg-accent px-7 py-4 font-semibold text-on-accent hover:bg-accent-strong active:translate-y-px"
            >
              {t.ctaPrimary}
            </a>
            <a
              href="#pricing"
              className="rounded-card border border-line px-7 py-4 font-medium text-text hover:border-muted"
            >
              {t.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Tilted slightly so it reads as a page on a desk rather than a screenshot. */}
        <div className="relative mx-auto w-full max-w-[380px] lg:max-w-[440px]">
          <Image
            src={notebookImage}
            alt={t.imageAlt}
            priority
            placeholder="blur"
            sizes="(max-width: 1024px) 90vw, 440px"
            className="w-full rotate-[1.5deg] rounded-card shadow-[0_22px_50px_-28px_rgba(20,24,26,0.35)]"
          />
        </div>
      </div>
    </section>
  );
}

export function Credentials({ t }: { t: Content["credentials"] }) {
  return (
    <section className="border-y border-line bg-surface-2 py-8">
      <div className={SHELL}>
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          {t.label}
        </p>
        <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item) => (
            <div key={item.title}>
              <dt className="font-medium text-text">{item.title}</dt>
              <dd className="mt-1 text-sm text-muted">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Services({ t }: { t: Content["services"] }) {
  return (
    <section id="sessions" className="py-24">
      <div className={SHELL}>
        <h2 className="max-w-[16ch] text-3xl font-semibold tracking-[-0.02em] sm:text-5xl">
          {t.heading}
        </h2>
        <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-muted">
          {t.sub}
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {t.items.map((item) => (
            <article
              key={item.title}
              className="settle rounded-card border border-line bg-surface p-7"
            >
              <h3 className="text-xl font-semibold text-text">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Approach({ t }: { t: Content["approach"] }) {
  return (
    <section
      id="approach"
      className="relative overflow-hidden border-y border-line bg-surface-2 py-24"
    >
      <div
        aria-hidden
        className="paper-grid pointer-events-none absolute inset-0 opacity-50"
      />
      <div className={`${SHELL} relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr]`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] sm:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">{t.sub}</p>
        </div>

        {/* The steps are the visual here: numbers set large, one rule between each. */}
        <ol className="divide-y divide-line border-y border-line">
          {t.steps.map((step, i) => (
            <li
              key={step.title}
              className="settle grid grid-cols-[3rem_1fr] items-baseline gap-x-5 py-6"
            >
              <span className="font-mono text-3xl font-medium text-accent/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-lg font-medium text-text">{step.title}</p>
                <p className="mt-1 leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Price({ amount, suffix }: { amount: string; suffix?: string }) {
  return (
    <p className="mt-4 flex items-baseline gap-1.5">
      <span className="text-4xl font-semibold tracking-tight text-text">
        ${amount}
      </span>
      {suffix ? <span className="text-sm text-muted">{suffix}</span> : null}
    </p>
  );
}

function Features({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-2.5 text-sm text-muted">
      {items.map((f) => (
        <li key={f} className="flex gap-2.5">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
          {f}
        </li>
      ))}
    </ul>
  );
}

export function Pricing({ t }: { t: Content["pricing"] }) {
  return (
    <section id="pricing" className="py-24">
      <div className={SHELL}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t.sub}</p>
        </div>

        <p className="mt-14 text-sm font-medium uppercase tracking-[0.14em] text-muted">
          {t.oneTime}
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <article className="settle rounded-card border border-accent/50 bg-surface p-7">
            <h3 className="text-lg font-semibold text-text">{t.trial.name}</h3>
            <p className="mt-1 text-sm text-muted">{t.trial.blurb}</p>
            <Price amount={String(RATES.trial)} />
            <Features items={t.trial.features} />
            <a
              href="#book"
              className="mt-7 block rounded-card bg-accent px-5 py-3 text-center font-semibold text-on-accent hover:bg-accent-strong"
            >
              {t.cta}
            </a>
          </article>

          <article className="settle rounded-card border border-line bg-surface p-7">
            <h3 className="text-lg font-semibold text-text">{t.single.name}</h3>
            <p className="mt-1 text-sm text-muted">{t.single.blurb}</p>
            <Price amount={String(RATES.hourly)} suffix={t.perHourShort} />
            <Features items={t.single.features} />
            <a
              href="#book"
              className="mt-7 block rounded-card border border-line px-5 py-3 text-center font-medium text-text hover:border-muted"
            >
              {t.cta}
            </a>
          </article>
        </div>

        <p className="mt-14 text-sm font-medium uppercase tracking-[0.14em] text-muted">
          {t.monthly}
        </p>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {RATES.packs.map((pack) => {
            const copy = t.packs[pack.id];
            const saved = RATES.hourly * pack.sessions - pack.price;
            return (
              <article
                key={pack.id}
                className={`settle relative rounded-card border bg-surface p-7 ${
                  pack.featured ? "border-accent/50" : "border-line"
                }`}
              >
                {pack.featured ? (
                  <span className="absolute right-6 top-7 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                    {t.popular}
                  </span>
                ) : null}
                <h3 className="text-lg font-semibold text-text">{copy.name}</h3>
                <p className="mt-1 text-sm text-muted">{copy.blurb}</p>
                <Price amount={String(pack.price)} suffix={t.perMonth} />
                <p className="mt-2 text-sm text-muted">
                  ${pack.perHour}
                  {t.perHourShort}
                  {saved > 0 ? ` · ${t.save} $${saved}` : ""}
                </p>
                <Features items={copy.features} />
                <a
                  href="#book"
                  className={`mt-7 block rounded-card px-5 py-3 text-center font-semibold ${
                    pack.featured
                      ? "bg-accent text-on-accent hover:bg-accent-strong"
                      : "border border-line font-medium text-text hover:border-muted"
                  }`}
                >
                  {t.cta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const LOGISTICS_ICONS = [CalendarDots, MapPin, GraduationCap, ChatCircleDots];

export function Logistics({ t }: { t: Content["logistics"] }) {
  return (
    <section className="border-y border-line bg-surface-2 py-20">
      <div className={SHELL}>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.heading}
        </h2>
        <dl className="mt-10 divide-y divide-line border-t border-line">
          {t.cards.map((card, i) => {
            const Icon = LOGISTICS_ICONS[i] ?? CalendarDots;
            return (
              <div
                key={card.title}
                className="settle grid gap-2 py-5 sm:grid-cols-[auto_10rem_1fr] sm:items-baseline sm:gap-6"
              >
                <Icon
                  size={20}
                  weight="duotone"
                  className="hidden text-accent sm:block"
                />
                <dt className="font-medium text-text">{card.title}</dt>
                <dd className="leading-relaxed text-muted">{card.body}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

export function Faq({ t }: { t: Content["faq"] }) {
  return (
    <section className="py-24">
      <div className={`${SHELL} max-w-3xl`}>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.heading}
        </h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {t.items.map((item) => (
            <details key={item.q} className="settle group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium text-text">
                {item.q}
                <span
                  aria-hidden
                  className="text-xl leading-none text-accent [transition:transform_200ms_var(--ease-out)] group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[62ch] leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
