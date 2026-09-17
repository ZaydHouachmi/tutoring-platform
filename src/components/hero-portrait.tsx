"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import type { Content } from "@/lib/content";
import portrait from "../../public/brand/zayd.jpg";

/**
 * The hero portrait, which flips to the quick facts.
 *
 * Click, not hover: a hover flip fires on the first tap on a phone and hides
 * the face before the reader has looked at it. The full bio is NOT behind the
 * card, only scannable facts, so nothing important depends on discovering the
 * flip.
 */
export function HeroPortrait({ t }: { t: Content["hero"] }) {
  const [flipped, setFlipped] = useState(false);
  const card = t.card;

  return (
    <div className="mx-auto w-full max-w-[380px] [perspective:1400px]">
      <div
        className={`relative aspect-square w-full [transform-style:preserve-3d] [transition:transform_560ms_var(--ease-in-out)] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <Image
            src={portrait}
            alt={t.imageAlt}
            priority
            placeholder="blur"
            sizes="(max-width: 768px) 80vw, 380px"
            className="h-full w-full rounded-card object-cover shadow-[0_22px_50px_-28px_rgba(20,24,26,0.45)]"
          />
        </div>

        {/* Back */}
        <div
          aria-hidden={!flipped}
          className="absolute inset-0 rounded-card border border-line bg-surface p-7 shadow-[0_22px_50px_-28px_rgba(20,24,26,0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <p className="text-lg font-semibold text-text">{card.name}</p>
          <p className="mt-1 text-sm text-muted">{card.role}</p>

          <dl className="mt-6 space-y-4">
            {card.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                  {fact.label}
                </dt>
                <dd className="mt-0.5 text-sm text-text">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        className="mx-auto mt-4 flex items-center gap-2 text-sm font-medium text-muted hover:text-text active:scale-[0.97]"
      >
        <ArrowsClockwise size={16} />
        {flipped ? card.back : card.flip}
      </button>
    </div>
  );
}
