
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Zap,
  Coffee,
  Music,
  Mountain,
  BookOpen,
} from "lucide-react";

import {
  FaGraduationCap,
  FaLaptopCode,
  FaRocket,
  FaBriefcase,
  FaStar,
} from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

// Journey milestones
const milestones = [
  {
    year: "2022",
    icon: FaGraduationCap,
    title: "Started BCA",
    desc: "Began my computer science journey at Himachal Pradesh University, discovering my passion for web development.",
  },
  {
    year: "2023",
    icon: FaLaptopCode,
    title: "First Web Projects",
    desc: "Built my first web projects using HTML, CSS, and JavaScript, and started exploring React.",
  },
  {
    year: "2024",
    icon: FaRocket,
    title: "MERN Stack",
    desc: "Explored full-stack development with React, Node.js, Express, and MongoDB while building web applications.",
  },
  {
    year: "2025",
    icon: FaBriefcase,
    title: "Professional Journey Begins",
    desc: "Joined SquadMinds Private Limited as a Software Developer Intern and completed my BCA.",
  },
  {
    year: "2026",
    icon: FaStar,
    title: "Associate Software Engineer",
    desc: "Continuing my journey at SquadMinds Private Limited, contributing to web application development.",
  },
];

// Personal interests
const interests = [
  { icon: Coffee, label: "Coffee & Code" },
  { icon: Mountain, label: "Exploring Nature" },
  { icon: Music, label: "Listening to Music" },
  { icon: BookOpen, label: "Reading Books" },
];

// Professional highlights
const stats = [
  { value: "1+", label: "Year Professional Experience" },
  { value: "5+", label: "Projects Delivered" },
  { value: "MERN", label: "Full Stack Development" },
];

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textBlockRef = useRef(null);
  const milestonesRef = useRef(null);
  const interestsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fade = (el, extra = {}) => {
        if (!el) return;

        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 36,
          duration: 0.75,
          ease: "power3.out",
          ...extra,
        });
      };

      // Heading animation
      fade(headingRef.current);

      // Story paragraphs and stat cards
      const paras =
        textBlockRef.current?.querySelectorAll("p, .stat-card");

      if (paras?.length) {
        fade(Array.from(paras), { stagger: 0.1 });
      }

      // Timeline animation
      const items =
        milestonesRef.current?.querySelectorAll(".ms-item");

      if (items?.length) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: milestonesRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          x: -28,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });
      }

      // Interests animation
      const intItems =
        interestsRef.current?.querySelectorAll(".int-item");

      if (intItems?.length) {
        gsap.from(intItems, {
          scrollTrigger: {
            trigger: interestsRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          scale: 0.8,
          duration: 0.45,
          stagger: 0.08,
          ease: "back.out(1.7)",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-10"
      style={{ background: "#fff" }}
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12"
      >
        {/* Heading */}
        <div
          ref={headingRef}
          style={{ marginBottom: 30 }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: 999,
              background: "#EFF6FF",
              color: "#2563EB",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 16,
            }}
          >
            About Me
          </span>

          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#0F172A",
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            My Developer{" "}
            <span className="gradient-text">Story</span>
          </h2>

          <p
            style={{
              fontSize: 17,
              color: "#64748B",
              maxWidth: 600,
            }}
          >
            From curious student to professional software
            engineer — here's how I got here.
          </p>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "grid",
            gap: 48,
          }}
          className="lg:grid-cols-2 lg:gap-24"
        >
          {/* LEFT — About and interests */}
          <div
            ref={textBlockRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              minWidth: 0,
            }}
          >
            <p
              style={{
                fontSize: 17,
                color: "#334155",
                lineHeight: 1.75,
              }}
            >
              I'm{" "}
              <strong style={{ color: "#0F172A" }}>
                Vishal Deep
              </strong>
              , a MERN Stack Engineer.
              I build digital
              products at the intersection of thoughtful design
              and solid engineering.
            </p>

            <p
              style={{
                color: "#475569",
                lineHeight: 1.75,
              }}
            >
              My journey started with curiosity about how
              websites work — and quickly turned into a genuine
              craft. I went from HTML basics through JavaScript
              and React to building full-stack applications.
            </p>

            <p
              style={{
                color: "#475569",
                lineHeight: 1.75,
              }}
            >
              I currently work at{" "}
              <span
                style={{
                  color: "#2563EB",
                  fontWeight: 600,
                }}
              >
                SquadMinds Private Limited
              </span>{" "}
              as an Associate Software Engineer, contributing
              to real-world projects and continuously improving
              my development skills.
            </p>

            <p
              style={{
                color: "#475569",
                lineHeight: 1.75,
              }}
            >
              I care deeply about{" "}
              <strong style={{ color: "#1E293B" }}>
                clean architecture
              </strong>
              ,{" "}
              <strong style={{ color: "#1E293B" }}>
                performance
              </strong>
              , and user experiences that feel effortless.
              Code is the craft I've chosen to master.
            </p>

            {/* Stat cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 12,
                marginTop: 8,
              }}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="stat-card"
                  style={{
                    textAlign: "center",
                    padding: "16px 10px",
                    borderRadius: 20,
                    background:
                      "linear-gradient(135deg, #EFF6FF, #fff)",
                    border: "1px solid #BFDBFE",
                    minWidth: 0,
                  }}
                >
                  <p
                    className="gradient-text"
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      margin: 0,
                    }}
                  >
                    {s.value}
                  </p>

                  <p
                    style={{
                      fontSize: 11,
                      color: "#64748B",
                      marginTop: 4,
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Interests */}
            <div
              ref={interestsRef}
              style={{ marginTop: 8 }}
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#94A3B8",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 12,
                }}
              >
                Beyond the Code
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {interests.map((item) => {
                  const InterestIcon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="int-item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "8px 14px",
                        borderRadius: 12,
                        background: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                        fontSize: 13,
                        color: "#475569",
                      }}
                    >
                      <InterestIcon
                        size={14}
                        color="#60A5FA"
                        aria-hidden="true"
                      />

                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — Journey timeline */}
          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#1E293B",
                marginBottom: 32,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: "#2563EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Zap size={15} color="#fff" />
              </div>

              Journey Milestones
            </h3>

            <div
              ref={milestonesRef}
              style={{ position: "relative" }}
            >
              {/* Timeline vertical line */}
              <div
                className="tl-line"
                style={{
                  position: "absolute",
                  left: 20,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  borderRadius: 2,
                  opacity: 0.18,
                  background: "#2563EB",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 32,
                }}
              >
                {milestones.map((m) => {
                  const MilestoneIcon = m.icon;

                  return (
                    <div
                      key={m.year}
                      className="ms-item"
                      style={{
                        display: "flex",
                        gap: 24,
                        alignItems: "flex-start",
                      }}
                    >
                      {/* Timeline icon */}
                      <div
                        style={{
                          position: "relative",
                          zIndex: 10,
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: "50%",
                            background: "#fff",
                            border: "2px solid #BFDBFE",
                            boxShadow:
                              "0 2px 8px rgba(37,99,235,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <MilestoneIcon
                            size={18}
                            color="#2563EB"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* Timeline content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: 10,
                            marginBottom: 4,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: "#2563EB",
                              background: "#EFF6FF",
                              padding: "2px 8px",
                              borderRadius: 6,
                            }}
                          >
                            {m.year}
                          </span>

                          <h4
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: "#0F172A",
                              margin: 0,
                            }}
                          >
                            {m.title}
                          </h4>
                        </div>

                        <p
                          style={{
                            fontSize: 13,
                            color: "#64748B",
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
