import { ButtonLink } from "@/components/primitives/Button";
import { Chapter } from "@/components/primitives/Chapter";
import { SectionHead } from "@/components/primitives/SectionHead";
import { SONIPAT, TRANSFORMATION_CHAIN } from "@/content";

/**
 * Eight beats. Every shared phrase carries data-chain on both occurrences
 * (tail of one beat, head of the next) so the Flip animation has its pairs.
 */
export function TransformationChain() {
  const t = SONIPAT.transformation;
  return (
    <Chapter id="transformation" marker="The transformation">
      <SectionHead title={t.heading} />
      <ol className="mt-8 lg:mt-10">
        {TRANSFORMATION_CHAIN.map((beat, i) => (
          <li key={i} className="grid-site py-3 lg:py-4" data-beat={i + 1}>
            <p className="col-span-12 type-h2 lg:col-start-2 lg:col-span-10">
              {beat.map((seg, j) =>
                seg.chain ? (
                  <span key={j} data-chain={seg.chain} data-chain-role={seg.role} className="inline-block">
                    {seg.text}
                  </span>
                ) : (
                  <span key={j}>{seg.text}</span>
                ),
              )}
            </p>
          </li>
        ))}
      </ol>
      <div className="grid-site mt-10 lg:mt-12">
        <div className="col-span-12 lg:col-start-2 lg:col-span-8">
          <p className="type-lead">{t.closing}</p>
          <div className="mt-10">
            <ButtonLink href={t.cta.href}>{t.cta.label}</ButtonLink>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
