import { Chapter, type Tone } from "./Chapter";
import { Prose } from "./Prose";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  paragraphs?: readonly string[];
  marker: string;
  tone?: Tone;
  titleClassName?: string;
  temperature?: "cold" | "warm";
  /** Paragraphs under the title in the same column, instead of offset to the right. */
  aligned?: boolean;
}

/** First chapter of an inner route: h1 at display-lg, subtitle as lead. */
export function PageHero({ title, subtitle, paragraphs = [], marker, tone = "paper", titleClassName, temperature = "cold", aligned = false }: PageHeroProps) {
  return (
    <Chapter marker={marker} tone={tone} temperature={temperature} pad="tight" className="pt-10 lg:pt-16">
      <div className="grid-site">
        <div className="col-span-12 lg:col-start-2 lg:col-span-9">
          <h1 className={cn("type-display-lg", titleClassName)}>{title}</h1>
          {subtitle ? <p className="type-lead mt-6 opacity-80">{subtitle}</p> : null}
        </div>
        {paragraphs.some(Boolean) ? (
          <div className={cn("col-span-12", aligned ? "mt-8 lg:col-start-2 lg:col-span-7" : "mt-10 lg:col-start-6 lg:col-span-6")}>
            <Prose paragraphs={paragraphs} />
          </div>
        ) : null}
      </div>
    </Chapter>
  );
}
