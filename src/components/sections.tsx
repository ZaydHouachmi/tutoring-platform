import Image from "next/image";
import {
  CalendarDots,
  ChatCircleDots,
  GraduationCap,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { RATES, type Content } from "@/lib/content";
import methodImage from "../../public/brand/word-problems-method.png";
import cardImage from "../../public/brand/word-problems-card.png";

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
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24">
      {/* Soft green wash behind the headline, tinted to the page, no neon glow. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />
      <div
        className={`${SHELL} relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]`}
      >
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {t.headline}{" "}
            <span className="text-accent">{t.headlineAccent}</span>
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
            {t.sub}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#book"
              className="rounded-card bg-accent px-6 py-3.5 font-semibold text-on-accent transition-transform hover:bg-accent-strong active:translate-y-px"
            >
              {t.ctaPrimary}
            </a>
            <a
              href="#pricing"
              className="rounded-card border border-line px-6 py-3.5 font-medium text-text transition-colors hover:border-muted"
            >
              {t.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="relative">
          <Image
            src={methodImage}
            alt={t.imageAlt}
            priority
            placeholder="blur"
            sizes="(max-width: 1024px) 100vw, 520px"
            className="w-full rounded-card border border-line"
          />
        </div>
      </div>
    </section>
  );
}

export function Credentials({ t }: { t: Content["credentials"] }) {
  return (
    <section className="border-y border-line bg-surface/40 py-8">
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
        <h2 className="max-w-[18ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.heading}
        </h2>
        <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-muted">
          {t.sub}
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {t.items.map((item) => (
            <article
              key={item.title}
              className="rounded-card border border-line bg-surface p-7"
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
    <section id="approach" className="border-y border-line bg-surface/40 py-24">
      <div className={`${SHELL} grid items-center gap-14 lg:grid-cols-2`}>
        <div className="order-2 lg:order-1">
          <Image
            src={cardImage}
            alt={t.imageAlt}
            placeholder="blur"
            sizes="(max-width: 1024px) 100vw, 520px"
            className="w-full rounded-card border border-line"
          />
        </div>

        <div className="order-1 lg:order-2">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">{t.sub}</p>

          <ol className="mt-9 space-y-5">
            {t.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/40 text-sm font-semibold text-accent">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-text">{step.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
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
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.heading}
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-muted">
          {t.sub}
        </p>

        <p className="mt-14 text-sm font-medium uppercase tracking-[0.14em] text-muted">
          {t.oneTime}
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <article className="rounded-card border border-accent/50 bg-surface p-7">
            <h3 className="text-lg font-semibold text-text">{t.trial.name}</h3>
            <p className="mt-1 text-sm text-muted">{t.trial.blurb}</p>
            <Price amount={String(RATES.trial)} />
            <Features items={t.trial.features} />
            <a
              href="#book"
              className="mt-7 block rounded-card bg-accent px-5 py-3 text-center font-semibold text-on-accent transition-colors hover:bg-accent-strong"
            >
              {t.cta}
            </a>
          </article>

          <article className="rounded-card border border-line bg-surface p-7">
            <h3 className="text-lg font-semibold text-text">{t.single.name}</h3>
            <p className="mt-1 text-sm text-muted">{t.single.blurb}</p>
            <Price amount={String(RATES.hourly)} suffix={t.perHourShort} />
            <Features items={t.single.features} />
            <a
              href="#book"
              className="mt-7 block rounded-card border border-line px-5 py-3 text-center font-medium text-text transition-colors hover:border-muted"
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
                className={`relative rounded-card border bg-surface p-7 ${
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
                  className={`mt-7 block rounded-card px-5 py-3 text-center font-semibold transition-colors ${
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
    <section className="border-y border-line bg-surface/40 py-20">
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
                className="grid gap-2 py-5 sm:grid-cols-[auto_10rem_1fr] sm:items-baseline sm:gap-6"
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
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium text-text">
                {item.q}
                <span
                  aria-hidden
                  className="text-xl leading-none text-accent transition-transform group-open:rotate-45"
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
