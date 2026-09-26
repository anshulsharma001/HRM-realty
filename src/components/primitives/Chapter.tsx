import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Temperature } from "@/lib/motion";
import { LeftRail } from "@/components/chrome/LeftRail";

export type Tone = "paper" | "paper-hi" | "ink" | "warm";

interface ChapterProps {
  id?: string;
  /** Sentence-case label shown in the left rail on desktop. */
  marker?: string;
  temperature?: Temperature;
  tone?: Tone;
  pad?: "default" | "tight" | "loose" | "none";
  as?: ElementType;
  className?: string;
  /** Rendered before the container, for full-bleed backdrops. */
  backdrop?: ReactNode;
  children: ReactNode;
}

const toneClass: Record<Tone, string> = {
  paper: "tone-paper",
  "paper-hi": "tone-paper-hi",
  ink: "tone-ink",
  warm: "tone-warm",
};

const padClass = { default: "", tight: "pad-tight", loose: "pad-loose", none: "pad-none" } as const;

/** A chapter of the sheet: vertical rhythm, tone, the rail and its marker. */
export function Chapter({
  id,
  marker,
  temperature = "cold",
  tone = "paper",
  pad = "default",
  as: Tag = "section",
  className,
  backdrop,
  children,
}: ChapterProps) {
  return (
    <Tag id={id} data-temperature={temperature} className={cn("chapter", toneClass[tone], padClass[pad], className)}>
      {backdrop}
      <LeftRail marker={marker} />
      <div className="container-site">{children}</div>
    </Tag>
  );
}
