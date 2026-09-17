/**
 * A hand-drawn underline that draws itself, the way it would be marked on
 * paper in a session. Purely decorative, so it is hidden from assistive tech.
 *
 * The stroke is a single path with a deliberate wobble: a perfectly straight
 * line reads as a border, not as a pen. It draws with stroke-dashoffset, which
 * animates on the compositor, and it arrives already drawn under
 * prefers-reduced-motion.
 */
export function PenUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      fill="none"
      className={`pen-underline pointer-events-none absolute -bottom-[0.06em] left-0 h-[0.3em] w-full ${className}`}
    >
      <path
        d="M3 9.2C46 5.1 92 4.2 138 5.6c46 1.4 92 3.2 159 1.1"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
