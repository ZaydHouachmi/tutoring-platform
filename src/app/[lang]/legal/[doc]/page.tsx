import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LANGS, content, type Lang } from "@/lib/content";
import { LAST_UPDATED, LEGAL_DOCS, legal, type LegalDoc } from "@/lib/legal";

export function generateStaticParams() {
  return LANGS.flatMap((lang) => LEGAL_DOCS.map((doc) => ({ lang, doc })));
}

function parse(lang: string, doc: string): { lang: Lang; doc: LegalDoc } | null {
  if (!(LANGS as readonly string[]).includes(lang)) return null;
  if (!(LEGAL_DOCS as readonly string[]).includes(doc)) return null;
  return { lang: lang as Lang, doc: doc as LegalDoc };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; doc: string }>;
}): Promise<Metadata> {
  const { lang, doc } = await params;
  const parsed = parse(lang, doc);
  if (!parsed) return {};

  const page = legal[parsed.lang][parsed.doc];
  return {
    title: `${page.title} | Tutoring Ottawa`,
    description: page.intro,
    // Policy pages should not compete with the landing page in search.
    robots: { index: true, follow: true },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string; doc: string }>;
}) {
  const { lang, doc } = await params;
  const parsed = parse(lang, doc);
  if (!parsed) notFound();

  const t = content[parsed.lang];
  const page = legal[parsed.lang][parsed.doc];
  const updatedLabel = parsed.lang === "fr" ? "Mise à jour" : "Last updated";
  const backLabel = parsed.lang === "fr" ? "Retour au site" : "Back to the site";

  return (
    <>
      <SiteHeader lang={parsed.lang} t={t.nav} />
      <main className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8">
        <Link
          href={`/${parsed.lang}`}
          className="text-sm font-medium text-accent hover:text-accent-strong"
        >
          {backLabel}
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-2 font-mono text-xs text-muted">
          {updatedLabel}: {LAST_UPDATED}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted">{page.intro}</p>

        <div className="mt-12 space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-text">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter t={t.footer} nav={t.nav} lang={parsed.lang} />
    </>
  );
}
