import { EnvelopeSimple, InstagramLogo, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { BookingForm } from "@/components/booking-form";
import { CONTACT, type Content, type Lang } from "@/lib/content";

export function BookingSection({
  t,
  lang,
}: {
  t: Content["booking"];
  lang: Lang;
}) {
  const details = [
    { Icon: Phone, label: CONTACT.phone, href: `tel:${CONTACT.phone}` },
    { Icon: EnvelopeSimple, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    {
      Icon: InstagramLogo,
      label: `@${CONTACT.instagram}`,
      href: `https://instagram.com/${CONTACT.instagram}`,
    },
    { Icon: MapPin, label: CONTACT.city },
  ];

  return (
    <section id="book" className="border-t border-line bg-surface-2 py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {t.eyebrow}
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">{t.sub}</p>

          <ul className="mt-10 space-y-4">
            {details.map(({ Icon, label, href }) => (
              <li key={label} className="flex items-center gap-3 text-muted">
                <Icon size={20} weight="duotone" className="text-accent" />
                {href ? (
                  <a href={href} className="hover:text-text">
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
          <BookingForm t={t} lang={lang} />
        </div>
      </div>
    </section>
  );
}
