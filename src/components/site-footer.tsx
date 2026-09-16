import Link from "next/link";
import { CONTACT, type Content, type Lang } from "@/lib/content";

export function SiteFooter({
  t,
  nav,
  lang,
}: {
  t: Content["footer"];
  nav: Content["nav"];
  lang: Lang;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href={`/${lang}`} className="font-semibold tracking-tight">
            Tutoring<span className="text-accent">Ottawa</span>
          </Link>
          <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-muted">
            {t.tagline}
          </p>
        </div>

        <nav>
          <p className="text-sm font-medium text-text">{t.nav}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href="#sessions" className="hover:text-text">
                {nav.services}
              </a>
            </li>
            <li>
              <a href="#approach" className="hover:text-text">
                {nav.approach}
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-text">
                {nav.pricing}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-medium text-text">{t.contact}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href={`tel:${CONTACT.phone}`} className="hover:text-text">
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-text">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${CONTACT.instagram}`}
                className="hover:text-text"
              >
                @{CONTACT.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-12 w-full max-w-6xl px-5 text-xs text-muted sm:px-8">
        {year} Mozayd Houachmi. {CONTACT.city}.
      </p>
    </footer>
  );
}
