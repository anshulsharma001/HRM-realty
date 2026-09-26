import { Chapter } from "@/components/primitives/Chapter";
import { IconList } from "@/components/primitives/IconList";
import { Placeholder } from "@/components/primitives/Placeholder";
import { PlotMark } from "@/components/primitives/PlotMark";
import { image, type ImageId, type Project } from "@/content";

export function ProjectDetail({ project, tone = "paper", marker }: { project: Project; tone?: "paper" | "paper-hi"; marker: string }) {
  return (
    <Chapter id={project.slug} marker={marker} tone={tone}>
      <div className="grid-site gap-y-12">
        <div className="col-span-12 lg:col-start-2 lg:col-span-8">
          <h2 className="type-display-lg">{project.name}</h2>
          <p className="type-lead mt-5 text-steel-dk">{project.tagline}</p>
          <p className="type-body mt-6">{project.description}</p>
        </div>
        <div className="col-span-12 flex items-center gap-6 lg:col-start-2 lg:col-span-5">
          <PlotMark className="w-20 shrink-0 text-steel-dk lg:w-24" />
          <p className="type-display-lg tnum">{project.acresDisplay}</p>
        </div>
        <div className="col-span-12 lg:col-start-2 lg:col-span-5">
          <IconList items={project.highlights.map((label) => ({ label }))} size="lead" className="gap-y-4" />
        </div>
        <div className="col-span-12 lg:col-start-8 lg:col-span-5 lg:-mr-[var(--site-margin)]">
          <Placeholder image={image(project.image as ImageId)} sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
      </div>
    </Chapter>
  );
}
