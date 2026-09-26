import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Aspect, ImageSpec } from "@/content/types";

interface Props {
  image: ImageSpec;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** On ink chapters the slot is drawn in paper at low opacity. */
  onInk?: boolean;
  /** Force the frame's aspect; the photograph is cropped to it. For grids of mixed sources. */
  frame?: Aspect;
}

/**
 * Typed image slot. Until a shoot lands it renders a silent survey-hatched
 * plot with demarcation corners; once `src` is set it renders next/image with
 * the chapter's grade. Dimensions are always explicit (§4.3 #2).
 */
export function Placeholder({ image, className, sizes = "100vw", priority = false, onInk = false, frame }: Props) {
  const style = { aspectRatio: frame ? frame.replace("/", " / ") : `${image.width} / ${image.height}` };

  if (image.src) {
    return (
      <figure className={cn("relative w-full overflow-hidden", image.grade === "warm" ? "grade-warm" : "grade-cold", className)} style={style}>
        <Image src={image.src} alt={image.alt ?? ""} fill sizes={sizes} priority={priority} className="object-cover" />
      </figure>
    );
  }

  const patternId = `hatch-${image.id}`;
  return (
    <div
      className={cn("relative w-full overflow-hidden", onInk ? "text-paper/25" : "tone-paper-hi text-ink/20", className)}
      style={style}
      aria-hidden="true"
      data-image-slot={image.id}
    >
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id={patternId} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="12" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <span className={cn("absolute left-0 top-0 h-4 w-4 border-l border-t", onInk ? "border-paper/50" : "border-ink/40")} />
      <span className={cn("absolute right-0 top-0 h-4 w-4 border-r border-t", onInk ? "border-paper/50" : "border-ink/40")} />
      <span className={cn("absolute bottom-0 left-0 h-4 w-4 border-b border-l", onInk ? "border-paper/50" : "border-ink/40")} />
      <span className={cn("absolute bottom-0 right-0 h-4 w-4 border-b border-r", onInk ? "border-paper/50" : "border-ink/40")} />
    </div>
  );
}
