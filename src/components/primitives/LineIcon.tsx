import { ICON_PATHS, type IconName } from "@/lib/icons";

/** One of the site's line icons. Decorative: the label beside it carries the meaning. */
export function LineIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
