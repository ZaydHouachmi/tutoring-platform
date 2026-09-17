import { RATES, type Content } from "@/lib/content";
import { MethodWalkthrough } from "@/components/method-walkthrough";
import { HeroPortrait } from "@/components/hero-portrait";
import { PenUnderline } from "@/components/pen-underline";
import { PricePicker } from "@/components/price-picker";

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
            <span className="relative inline-block text-accent">
              {t.headlineAccent}
              <PenUnderline />
            </span>
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

        <HeroPortrait t={t} />
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

export function About({ t }: { t: Content["about"] }) {
  return (
    <section id="about" className="py-24">
      <div className={`${SHELL} max-w-3xl`}>
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
            {t.heading}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {t.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Approach({
  t,
  demo,
}: {
  t: Content["approach"];
  demo: Content["demo"];
}) {
  return (
    <section
      id="approach"
      className="relative overflow-hidden border-y border-line bg-surface-2 py-24"
    >
      <div
        aria-hidden
        className="paper-grid pointer-events-none absolute inset-0 opacity-50"
      />
      <div className={`${SHELL} relative`}>
        <div className="max-w-2xl">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] sm:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">{t.sub}</p>
        </div>

        <div className="mt-12">
          <MethodWalkthrough steps={t.steps} t={demo} />
        </div>
      </div>
    </section>
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

        <PricePicker t={t} />

        {/* The trial is the only offer worth its own block: it is what gets a
            first session booked. */}
        <div className="settle mt-6 flex flex-col items-start justify-between gap-5 rounded-card border border-accent/40 bg-surface p-6 sm:flex-row sm:items-center sm:p-7">
          <div>
            <p className="text-lg font-semibold text-text">
              {t.trial.name}
              <span className="ml-3 font-mono text-accent">${RATES.trial}</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              {t.trial.features.join(" · ")}
            </p>
          </div>
          <a
            href="#book"
            className="shrink-0 rounded-card bg-accent px-6 py-3 font-semibold text-on-accent hover:bg-accent-strong active:scale-[0.97]"
          >
            {t.cta}
          </a>
        </div>
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
