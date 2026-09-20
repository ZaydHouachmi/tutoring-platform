/*
 * Types for importing images as modules.
 *
 * Next generates the same reference into next-env.d.ts, but that file is
 * gitignored, so a fresh clone (CI, or another machine) has no idea what
 * `import portrait from "./zayd.jpg"` means. Committing the reference keeps
 * `tsc --noEmit` honest anywhere.
 */
/// <reference types="next/image-types/global" />
