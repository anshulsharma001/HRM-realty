import { Chapter } from "@/components/primitives/Chapter";
import { IconList } from "@/components/primitives/IconList";
import { Placeholder } from "@/components/primitives/Placeholder";
import { RESIDENTIAL, image } from "@/content";

/** The eight qualities with a line icon each, two columns; the home photograph and closing line beside. */
export function HomeQualities() {
  const q = RESIDENTIAL.qualities;
  return (
    <Chapter id="qualities" marker="What a home needs" tone="warm" temperature="warm">
      <div className="grid-site gap-y-12">
        <div className="col-span-12 lg:col-start-2 lg:col-span-6">
          <h2 className="type-h2 mb-8">{q.heading}</h2>
          <IconList items={q.items.map((label) => ({ label }))} size="h3" columns={2} />
        </div>
        <div className="col-span-12 lg:col-start-8 lg:col-span-5 lg:self-end">
          <Placeholder image={image("residential-home")} sizes="(min-width: 1024px) 40vw, 100vw" className="mb-8" />
          <p className="type-lead">{q.closing}</p>
        </div>
      </div>
    </Chapter>
  );
}
