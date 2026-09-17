"use client";

import { useState } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import type { Content } from "@/lib/content";

/**
 * Walks a real word problem through the five steps, one click at a time.
 *
 * The motion here is motivated: each step reveals the part of the problem that
 * step is about, which is the same thing that happens on paper in a session.
 * Everything is opacity and transform only, under 300ms, and the whole thing
 * works from the keyboard.
 */
export function MethodWalkthrough({
  steps,
  t,
}: {
  steps: Content["approach"]["steps"];
  t: Content["demo"];
}) {
  const [step, setStep] = useState(0);
  const last = steps.length - 1;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
      {/* Steps: each one is a control, so the reader drives the explanation. */}
      <ol className="flex flex-col gap-1">
        {steps.map((s, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={current ? "step" : undefined}
                className={`w-full rounded-card px-4 py-3 text-left ${
                  current
                    ? "bg-surface shadow-[0_10px_30px_-20px_rgba(20,24,26,0.45)]"
                    : "hover:bg-surface"
                }`}
              >
                <span className="flex items-baseline gap-3">
                  <span
                    className={`font-mono text-sm ${
                      done || current ? "text-accent" : "text-muted/60"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-medium ${
                      current ? "text-text" : "text-muted"
                    }`}
                  >
                    {s.title}
                  </span>
                </span>
                <span
                  className="col-start-2 block overflow-hidden text-sm leading-relaxed text-muted [transition:grid-template-rows_200ms_var(--ease-out)]"
                  hidden={!current}
                >
                  <span className="mt-1 block pl-9">{s.body}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* The worked problem, annotated as the reader advances. */}
      <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          {t.label}
        </p>

        <p className="mt-5 text-lg leading-relaxed text-text">
          {t.problem.before}
          <Mark on={step >= 0}>{t.problem.distance}</Mark>
          {t.problem.middle}
          <Mark on={step >= 0}>{t.problem.time}</Mark>.{" "}
          <span
            className={
              step >= 1
                ? "underline decoration-accent decoration-2 underline-offset-4"
                : undefined
            }
          >
            {t.problem.question}
          </span>
        </p>

        <Reveal on={step >= 2}>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-text">{t.known}</p>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {t.knownItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-text">{t.need}</p>
              <p className="mt-2 text-sm text-muted">{t.needItem}</p>
            </div>
          </div>
        </Reveal>

        <Reveal on={step >= 3}>
          <p className="mt-6 rounded-card bg-surface-2 px-4 py-3 font-mono text-sm text-text">
            {t.working}
          </p>
        </Reveal>

        <Reveal on={step >= 4}>
          <div className="mt-6">
            <p className="text-3xl font-semibold tracking-tight text-accent">
              {t.answer}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.check}</p>
          </div>
        </Reveal>

        <div className="mt-8 flex items-center justify-between">
          <p className="font-mono text-xs text-muted">
            {t.stepOf} {step + 1}/{steps.length}
          </p>
          {step === last ? (
            <button
              type="button"
              onClick={() => setStep(0)}
              className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong"
            >
              <ArrowCounterClockwise size={16} />
              {t.replay}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(s + 1, last))}
              className="rounded-card bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-strong active:scale-[0.97]"
            >
              {steps[step + 1]?.title}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Mark({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`rounded px-1 [transition:background-color_200ms_var(--ease-out)] ${
        on ? "bg-accent/15" : "bg-transparent"
      }`}
    >
      {children}
    </span>
  );
}

/**
 * Collapses to nothing when hidden, so the card does not hold empty space for
 * steps the reader has not reached. Uses the grid-rows 0fr to 1fr technique,
 * which animates open height without measuring anything in JavaScript.
 */
function Reveal({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <div
      aria-hidden={!on}
      className={`grid [transition:grid-template-rows_260ms_var(--ease-out),opacity_200ms_var(--ease-out)] ${
        on ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
