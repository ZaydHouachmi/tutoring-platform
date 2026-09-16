import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingSection } from "@/components/booking-section";
import {
  About,
  Approach,
  Credentials,
  Faq,
  Hero,
  Logistics,
  Pricing,
  Services,
} from "@/components/sections";
import { LANGS, content, type Lang } from "@/lib/content";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const isFr = lang === "fr";
  return {
    title: isFr
      ? "Tutorat de mathématiques à Ottawa | Mozayd Houachmi"
      : "Math Tutoring in Ottawa | Mozayd Houachmi",
    description: content[lang].hero.sub,
    alternates: {
      languages: { en: "/en", fr: "/fr" },
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = content[lang];

  return (
    <>
      <SiteHeader lang={lang} t={t.nav} />
      <main>
        <Hero t={t.hero} />
        <Credentials t={t.credentials} />
        <Services t={t.services} />
        <About t={t.about} />
        <Approach t={t.approach} />
        <Pricing t={t.pricing} />
        <Logistics t={t.logistics} />
        <Faq t={t.faq} />
        <BookingSection t={t.booking} lang={lang} />
      </main>
      <SiteFooter t={t.footer} nav={t.nav} lang={lang} />
    </>
  );
}
