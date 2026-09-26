/**
 * The survey-sheet rail (§2.5): a 1px rule 32px into the left margin on
 * screens of 1024px and wider, drawn by `.chapter::before`, plus this tick and
 * sentence-case marker at each chapter start. It scrolls with the content.
 */
export function LeftRail({ marker }: { marker?: string }) {
  if (!marker) return null;
  return (
    <span aria-hidden="true" className="rail-marker">
      {marker}
    </span>
  );
}
