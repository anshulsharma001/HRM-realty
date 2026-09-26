import type { Metadata } from "next";
import { ProjectsIntro } from "@/components/sections/ProjectsIntro";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { WhyHRM } from "@/components/sections/WhyHRM";
import { PROJECTS, PROJECTS_INTRO } from "@/content";

export const metadata: Metadata = {
  title: `${PROJECTS[0].name} and ${PROJECTS[1].name} | ${PROJECTS_INTRO.title}`,
  description: PROJECTS.map((p) => `${p.name}: ${p.tagline}, ${p.acresDisplay}.`).join(" "),
  alternates: { canonical: "/projects/industrial" },
};

export default function IndustrialPage() {
  return (
    <>
      <ProjectsIntro />
      {PROJECTS.map((p, i) => (
        <ProjectDetail key={p.slug} project={p} tone={i % 2 === 0 ? "paper" : "paper-hi"} marker={p.name.replace(/^HRM /, "")} />
      ))}
      <WhyHRM />
    </>
  );
}
