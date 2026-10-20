import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Code2,
  ArrowRight,
  Star,
  ChevronDown,
  Layers3,
  Sparkles,
  FolderGit2,
} from "lucide-react";
import { projects } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const techStyles = [
  "bg-blue-50 text-blue-700 ring-blue-100",
  "bg-emerald-50 text-emerald-700 ring-emerald-100",
  "bg-orange-50 text-orange-700 ring-orange-100",
  "bg-violet-50 text-violet-700 ring-violet-100",
  "bg-cyan-50 text-cyan-700 ring-cyan-100",
];

const ProjectVisual = ({ project }) => {
  const initials = project.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative flex h-full min-h-[220px] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 sm:min-h-[250px]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:22px_22px] opacity-40" />
      <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-violet-200/30 blur-3xl" />

      {/* Browser mockup */}
      <div className="relative z-10 mx-auto w-full max-w-360 px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_24px_70px_-25px_rgba(15,23,42,0.30)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-1 sm:rounded-2xl">
        <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/95 px-3 py-2.5 sm:px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <div className="ml-3 h-5 flex-1 rounded-md border border-slate-200/70 bg-white px-2">
            <div className="mt-1.5 h-1 w-1/3 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold text-white shadow-lg"
              style={{ backgroundColor: project.color || "#2563eb" }}
            >
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 h-2.5 w-24 max-w-full rounded-full bg-slate-200" />
              <div className="h-2 w-16 rounded-full bg-slate-100" />
            </div>
            <div className="h-7 w-7 rounded-lg bg-blue-50" />
          </div>

          <div className="mb-4 space-y-2">
            <div className="h-2 w-full rounded-full bg-slate-100" />
            <div className="h-2 w-4/5 rounded-full bg-slate-100" />
            <div className="h-2 w-3/5 rounded-full bg-slate-100" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-slate-100 bg-slate-50 p-2"
              >
                <div
                  className="mb-2 h-5 w-5 rounded-md"
                  style={{
                    backgroundColor: `${project.color || "#2563eb"}20`,
                  }}
                />
                <div className="mb-1 h-1.5 w-full rounded-full bg-slate-200" />
                <div className="h-1.5 w-2/3 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/85 px-3 py-1.5 text-[10px] font-semibold text-slate-600 shadow-sm backdrop-blur-md sm:bottom-4 sm:left-4">
        <Sparkles size={12} className="text-blue-600" />
        {project.category} Project
      </div>
    </div>
  );
};

export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const filters = ["All", "Full Stack", "Frontend"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  const featuredProjects = filteredProjects.filter(
    (project) => project.featured
  );

  const otherProjects = filteredProjects.filter(
    (project) => !project.featured
  );

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const context = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");

      if (!cards.length) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.09,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, [filter]);

  const toggleFeatures = (projectId) => {
    setExpanded((current) => (current === projectId ? null : projectId));
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#F7FAFF] px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28 xl:px-14"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-40 top-40 -z-10 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 -z-10 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />

      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12">
        {/* Section heading */}
        <div ref={headingRef} className="mb-10 sm:mb-14 lg:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 shadow-sm sm:text-sm">
            <Sparkles size={15} />
            My Work
          </div>

          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                Selected{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
                Real-world applications built with thoughtful design, clean
                architecture, and a focus on meaningful user experiences.
              </p>
            </div>

            {/* Project filters */}
            <div
              className="flex w-full flex-wrap items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 p-2 shadow-sm backdrop-blur-xl sm:w-fit"
              aria-label="Filter projects"
            >
              {filters.map((item) => {
                const active = filter === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setFilter(item);
                      setExpanded(null);
                    }}
                    aria-pressed={active}
                    className={`rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:px-5 sm:text-sm ${
                      active
                        ? "bg-slate-950 text-white shadow-lg shadow-slate-900/15"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3 text-xs font-medium text-slate-500 sm:text-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600 shadow-sm">
              <Layers3 size={16} />
            </span>
            Showing{" "}
            <span className="font-bold text-slate-900">
              {filteredProjects.length}
            </span>{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </div>
        </div>

        {/* Featured projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-7 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7 xl:gap-8">
            {featuredProjects.map((project) => {
              const isExpanded = expanded === project.id;

              return (
                <article
                  key={project.id}
                  className="project-card group flex min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_8px_35px_-18px_rgba(15,23,42,0.20)] transition-all duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_25px_60px_-25px_rgba(37,99,235,0.25)] sm:rounded-[2rem]"
                >
                  {/* Project image */}
                  <div className="relative h-56 overflow-hidden bg-slate-50 sm:h-64 lg:h-[270px]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} project preview`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <ProjectVisual project={project} />
                    )}

                    <div className="absolute left-4 top-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[11px] font-bold text-slate-800 shadow-sm backdrop-blur-lg sm:text-xs">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: project.color || "#2563eb",
                          }}
                        />
                        {project.category}
                      </span>
                    </div>

                    {project.featured && (
                      <div className="absolute right-4 top-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-white/95 px-3 py-1.5 text-[11px] font-bold text-amber-700 shadow-sm backdrop-blur-lg sm:text-xs">
                          <Star size={12} fill="currentColor" />
                          Featured
                        </span>
                      </div>
                    )}

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/10 to-transparent" />
                  </div>

                  {/* Project content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-7">
                    <div className="mb-5">
                      {project.subtitle && (
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600 sm:text-xs">
                          {project.subtitle}
                        </p>
                      )}

                      <h3 className="text-xl font-bold tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-blue-700 sm:text-2xl">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-[15px]">
                        {project.description}
                      </p>
                    </div>

                    {/* Expandable features */}
                    {Array.isArray(project.features) &&
                      project.features.length > 0 && (
                        <div
                          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                            isExpanded
                              ? "mb-5 grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <div className="rounded-2xl border border-blue-100/80 bg-blue-50/50 p-4 sm:p-5">
                              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-800">
                                Key features
                              </p>

                              <ul className="space-y-2.5">
                                {project.features.map((feature, index) => (
                                  <li
                                    key={`${project.id}-feature-${index}`}
                                    className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
                                  >
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                    {/* Technology badges */}
                    {Array.isArray(project.tech) &&
                      project.tech.length > 0 && (
                        <div className="mb-6 flex flex-wrap gap-2">
                          {project.tech.map((technology, index) => (
                            <span
                              key={technology}
                              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ring-1 ring-inset sm:text-xs ${
                                techStyles[index % techStyles.length]
                              }`}
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      )}

                    {/* Card footer */}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
                      {Array.isArray(project.features) &&
                      project.features.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => toggleFeatures(project.id)}
                          aria-expanded={isExpanded}
                          className="inline-flex items-center gap-1.5 rounded-lg text-xs font-semibold text-slate-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 sm:text-sm"
                        >
                          {isExpanded ? "Hide features" : "Explore features"}
                          <ChevronDown
                            size={15}
                            className={`transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-slate-400">
                          Project overview
                        </span>
                      )}

                      <div className="flex items-center gap-4 sm:gap-5">
                        {project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} source code`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-sm"
                          >
                            <Code2 size={16} />
                            Code
                          </a>
                        ) : (
                          <span className="inline-flex cursor-not-allowed items-center gap-1.5 text-xs font-medium text-slate-300 sm:text-sm">
                            <Code2 size={16} />
                            Private
                          </span>
                        )}

                        {project.live ? (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.title} live website`}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:px-4 sm:text-sm"
                          >
                            Live Demo
                            <ExternalLink size={14} />
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2.5 text-xs font-semibold text-slate-400 sm:px-4 sm:text-sm">
                            Coming soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Other projects */}
        {otherProjects.length > 0 && (
          <div className="mt-7">
            {featuredProjects.length > 0 && (
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
                  <FolderGit2 size={17} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                    More projects
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    More things I’ve been building
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {otherProjects.map((project) => {
                const initials = project.title
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <article
                    key={project.id}
                    className="project-card group flex min-w-0 gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_4px_20px_-12px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_16px_35px_-18px_rgba(37,99,235,0.25)] sm:rounded-3xl sm:p-5"
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold text-white shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14"
                      style={{
                        backgroundColor: project.color || "#2563eb",
                      }}
                    >
                      {initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                        <h3 className="min-w-0 break-words text-sm font-bold leading-5 text-slate-900 transition-colors group-hover:text-blue-700 sm:text-base">
                          {project.title}
                        </h3>

                        <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
                          {project.category}
                        </span>
                      </div>

                      <p className="mb-3 line-clamp-2 text-xs leading-6 text-slate-500 sm:text-sm">
                        {project.description}
                      </p>

                      {Array.isArray(project.tech) &&
                        project.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.slice(0, 3).map((technology, index) => (
                              <span
                                key={technology}
                                className={`rounded-md px-2 py-1 text-[10px] font-semibold ring-1 ring-inset sm:text-[11px] ${
                                  techStyles[index % techStyles.length]
                                }`}
                              >
                                {technology}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500 sm:text-[11px]">
                                +{project.tech.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                      {(project.github || project.live) && (
                        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-3">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition-colors hover:text-slate-950"
                            >
                              <Code2 size={14} />
                              Source
                            </a>
                          )}

                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800"
                            >
                              Live preview
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-5 py-16 text-center sm:py-20">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <FolderGit2 size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No projects found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try selecting another category to explore more work.
            </p>
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              View all projects
            </button>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="mt-14 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 text-center shadow-[0_15px_45px_-30px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:mt-20 sm:rounded-[2rem] sm:p-10 lg:p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
            <Code2 size={22} />
          </div>

          <h3 className="mt-5 text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
            Want to see more of my work?
          </h3>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
            Explore more repositories, experiments, and projects on my GitHub
            profile.
          </p>

          <a
            href="https://github.com/TamishCodingHouse"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-700/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto sm:px-6"
          >
            <Code2 size={17} />
            Explore GitHub
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
