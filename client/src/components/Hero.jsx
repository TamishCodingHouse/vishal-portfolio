import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  ArrowRight,
  Download,
  BriefcaseBusiness,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { personalInfo } from "../data/portfolioData";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";

const technologies = ["React", "Node.js", "MongoDB", "JavaScript"];

export default function Hero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .from(".hero-eyebrow", {
          opacity: 0,
          y: 16,
          duration: 0.6,
        })
        .from(
          ".hero-title-line",
          {
            opacity: 0,
            y: 35,
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.25",
        )
        .from(
          ".hero-description, .hero-actions, .hero-socials",
          {
            opacity: 0,
            y: 18,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.35",
        )
        .from(
          portraitRef.current,
          {
            opacity: 0,
            x: 35,
            scale: 0.97,
            duration: 0.9,
          },
          "-=0.8",
        )
        .from(
          ".hero-floating-card",
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
            stagger: 0.12,
          },
          "-=0.45",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[#F7FAFF] text-slate-800 px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-10"
    >
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-blue-400/15 blur-[100px] sm:h-96 sm:w-96" />
        <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-indigo-400/15 blur-[110px] sm:h-[32rem] sm:w-[32rem]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-300/10 blur-[100px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)] sm:bg-[size:48px_48px]" />

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/70 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16 2xl:gap-24">
          {/* LEFT CONTENT */}
          <div
            ref={contentRef}
            className="relative z-10 mx-auto w-full max-w-2xl lg:mx-0"
          >
            {/* Availability */}
            <div className="hero-eyebrow mb-7 inline-flex max-w-full flex-wrap items-center gap-2.5 rounded-full border border-blue-100/90 bg-white/80 px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-[0_4px_20px_rgba(37,99,235,0.06)] backdrop-blur-xl sm:mb-8 sm:px-4 sm:text-sm">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10" />
              </span>

              <span>{personalInfo.availability}</span>

              <span className="h-4 w-px bg-slate-200" />

              <Sparkles size={14} className="shrink-0 text-blue-600" />
            </div>

            {/* Heading */}
            <div className="hero-heading-wrap">
              <p className="hero-title-line mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-700 sm:text-xs sm:tracking-[0.28em]">
                HELLO, I'M {personalInfo.name.toUpperCase()}
              </p>

              <h1 className="max-w-3xl text-[clamp(2.65rem,7vw,5.6rem)] font-extrabold leading-[1.04] tracking-[-0.065em] text-slate-950 sm:leading-[1.02]">
                <span className="hero-title-line block">
                  I build digital
                </span>

                <span className="gradient-text pr-1">
                  experiences
                </span>

                <span className="hero-title-line mt-1 block text-slate-800">
                  that feel different.
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="hero-description mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:mt-7 sm:text-base sm:leading-8 lg:text-[17px]">
              I engineer <strong className="font-semibold text-slate-900">modern digital experiences</strong> by
              combining thoughtful UI design, robust frontend architecture, and
              scalable full-stack solutions — turning complex ideas into
              seamless, high-performance web applications.
            </p>

            {/* Call to action buttons */}
            <div className="hero-actions mt-8 flex w-full flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-9 sm:gap-4">
              <button
                type="button"
                className="btn-primary"
                onClick={() => scrollTo("projects")}
              >
                Explore My Work
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <a
                href={personalInfo.resume}
                download="Vishal-Deep-Resume.pdf"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white/80 px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/70 hover:text-blue-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 min-[420px]:w-auto sm:px-6"
              >
                <Download
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                Download Resume
              </a>
            </div>

            {/* Social links */}
            <div className="hero-socials mt-9 flex flex-wrap items-center gap-x-4 gap-y-3 sm:mt-10 sm:gap-x-5">
              <span className="hero-social-label text-[10px] font-bold tracking-[0.18em] text-slate-400 sm:text-[11px]">
                FIND ME ON
              </span>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
                aria-label="Visit GitHub profile"
              >
                <FaGithub size={17} />
                GitHub
                <ArrowUpRight
                  size={13}
                  className="hero-social-arrow transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <span className="hero-social-divider h-5 w-px bg-slate-200" />

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
                aria-label="Visit LinkedIn profile"
              >
                <IoLogoLinkedin size={17} />
                LinkedIn
                <ArrowUpRight
                  size={13}
                  className="hero-social-arrow transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* Technology list */}
            <div className="hero-tech-section mt-9 border-t border-slate-200/80 pt-6 sm:mt-10 sm:pt-7">
              <span className="hero-tech-label text-[10px] font-bold tracking-[0.2em] text-slate-400 sm:text-[11px]">
                WORKING WITH
              </span>

              <div className="hero-tech-list mt-4 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="hero-tech-item inline-flex items-center rounded-lg border border-slate-200/80 bg-white/75 px-3 py-2 text-xs font-semibold text-slate-600 shadow-[0_2px_8px_rgba(15,23,42,0.025)] transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PORTRAIT */}
          <div
            ref={portraitRef}
            className="hero-visual relative mx-auto w-full max-w-[560px] lg:max-w-none"
          >
            <div className="hero-portrait-stage relative mx-auto w-full max-w-[520px] px-3 pb-10 pt-5 sm:px-7 sm:pb-12 sm:pt-7 lg:px-3 xl:px-6">
              {/* Decorative orbits */}
              <div
                className="hero-portrait-orbit hero-orbit-one pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/60"
                aria-hidden="true"
              />

              <div
                className="hero-portrait-orbit hero-orbit-two pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-indigo-200/70"
                aria-hidden="true"
              />

              <div className="hero-portrait-card group relative z-10 aspect-[4/4.5] w-full overflow-hidden rounded-[2rem] border border-white/90 bg-gradient-to-br from-blue-100 via-indigo-50 to-violet-100 p-1.5 shadow-[0_30px_90px_rgba(30,64,175,0.14)] sm:rounded-[2.5rem] sm:p-2">
                <img
                  src="/profile-placeholder.png"
                  alt={`Portrait of ${personalInfo.name}`}
                  className="hero-portrait-image absolute inset-1.5 h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-[1.7rem] object-cover object-center transition-transform duration-700 group-hover:scale-[1.025] sm:inset-2 sm:h-[calc(100%-16px)] sm:w-[calc(100%-16px)] sm:rounded-[2rem]"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    const fallback = event.currentTarget.nextElementSibling;

                    if (fallback) {
                      fallback.style.display = "flex";
                    }
                  }}
                />

                {/* Fallback if no photo is available */}
                <div
                  className="hero-portrait-fallback absolute inset-1.5 hidden flex-col items-center justify-center gap-3 rounded-[1.7rem] bg-gradient-to-br from-blue-100 via-indigo-100 to-violet-200 text-center sm:inset-2 sm:rounded-[2rem]"
                >
                  <div className="hero-fallback-avatar flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 text-3xl font-extrabold text-white shadow-xl shadow-blue-900/20 sm:h-32 sm:w-32 sm:text-4xl">
                    VD
                  </div>
                  <span className="hero-fallback-name text-xl font-bold text-slate-900">
                    {personalInfo.name}
                  </span>
                  <span className="hero-fallback-role text-sm font-medium text-slate-600">
                    Software Engineer
                  </span>
                  <span className="hero-fallback-hint px-5 text-xs text-slate-500">
                    Add your photo to the public folder
                  </span>
                </div>

                {/* Image shading */}
                <div className="hero-portrait-shade pointer-events-none absolute inset-1.5 rounded-[1.7rem] bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent sm:inset-2 sm:rounded-[2rem]" />

                {/* Portrait caption */}
                {/* <div className="hero-portrait-caption absolute bottom-1.5 left-1.5 right-1.5 flex items-end justify-between gap-3 p-4 text-white sm:bottom-2 sm:left-2 sm:right-2 sm:p-6 md:p-7">
                  <div className="min-w-0">
                    <span className="hero-caption-label text-[8px] font-bold tracking-[0.16em] text-blue-200 sm:text-[10px] sm:tracking-[0.2em]">
                      DESIGN · DEVELOP · DELIVER
                    </span>
                    <h2 className="mt-2 truncate text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                      {personalInfo.name}
                    </h2>
                    <p className="mt-1 text-xs text-white/75 sm:text-sm">
                      Building ideas into digital products.
                    </p>
                  </div>

                  <div className="hero-caption-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white/20 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <ArrowUpRight size={20} />
                  </div>
                </div> */}
              </div>

              {/* Current position card */}
              <div className="hero-floating-card hero-role-card absolute -bottom-1 -left-1 z-20 flex max-w-[calc(100%-12px)] items-center gap-3 rounded-2xl border border-white/90 bg-white/95 p-3.5 shadow-[0_16px_45px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:-bottom-2 sm:-left-5 sm:gap-4 sm:rounded-3xl sm:p-4">
                <div className="hero-card-icon hero-role-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <BriefcaseBusiness size={18} />
                </div>

                <div className="min-w-0">
                  <span className="hero-card-label text-[9px] font-bold tracking-[0.15em] text-slate-400 sm:text-[10px]">
                    CURRENT ROLE
                  </span>
                  <p className="mt-1 text-xs font-bold text-slate-900 sm:text-sm">
                    Associate Software Engineer
                  </p>
                  <span className="hero-company mt-0.5 block text-[10px] font-medium text-slate-500 sm:text-xs">
                    SquadMinds Pvt. Ltd.
                  </span>
                </div>

                <span className="hero-role-indicator ml-1 h-2 w-2 shrink-0 self-start rounded-full bg-emerald-500 ring-4 ring-emerald-500/10" />
              </div>

              {/* Small decorative marker */}
              <div className="hero-visual-index absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 text-[9px] font-bold tracking-[0.22em] text-slate-400 sm:flex xl:-right-5">
                <span>01</span>
                <span className="hero-index-line h-12 w-px bg-gradient-to-b from-blue-500 to-transparent" />
                <span className="[writing-mode:vertical-rl]">
                  PORTFOLIO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        className="hero-scroll-indicator group absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-2 rounded-xl px-4 py-2 text-[9px] font-bold tracking-[0.2em] text-slate-400 transition-colors duration-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 sm:bottom-6 sm:text-[10px]"
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about section"
      >
        <span>SCROLL TO EXPLORE</span>
        <ChevronDown
          size={17}
          className="animate-bounce transition-transform duration-300 group-hover:translate-y-1"
        />
      </button>
    </section>
  );
}