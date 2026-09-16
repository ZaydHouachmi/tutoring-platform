"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import type { Content, Lang } from "@/lib/content";

type Props = { lang: Lang; t: Content["nav"] };

export function SiteHeader({ lang, t }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#sessions", label: t.services },
    { href: "#approach", label: t.approach },
    { href: "#pricing", label: t.pricing },
  ];

  const otherLang: Lang = lang === "en" ? "fr" : "en";

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-line bg-ink/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href={`/${lang}`}
          className="font-semibold tracking-tight text-text"
        >
          Tutoring<span className="text-accent">Ottawa</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-text"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={`/${otherLang}`}
            className="text-sm text-muted transition-colors hover:text-text"
            aria-label={otherLang === "fr" ? "Voir en français" : "View in English"}
          >
            {otherLang.toUpperCase()}
          </Link>
          <a
            href="#book"
            className="rounded-card bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-strong"
          >
            {t.book}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-text md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-ink md:hidden"
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4"
          onClick={() => setOpen(false)}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-card px-2 py-3 text-base text-muted hover:bg-surface hover:text-text"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={`/${otherLang}`}
            className="rounded-card px-2 py-3 text-base text-muted hover:bg-surface hover:text-text"
          >
            {otherLang === "fr" ? "Français" : "English"}
          </Link>
          <a
            href="#book"
            className="mt-2 rounded-card bg-accent px-4 py-3 text-center text-base font-semibold text-on-accent"
          >
            {t.book}
          </a>
        </nav>
      </div>
    </header>
  );
}
