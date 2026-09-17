import { notFound } from "next/navigation";
import { LANGS } from "@/lib/content";

/**
 * Sets the document language per locale.
 *
 * The root layout cannot do this: it wraps both locales and would have to
 * guess. Getting it wrong means a screen reader pronounces every French
 * sentence with English phonemes, which is WCAG 3.1.1 and affects every
 * assistive-tech user on half a bilingual site.
 */
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!(LANGS as readonly string[]).includes(lang)) notFound();

  return <div lang={lang}>{children}</div>;
}
