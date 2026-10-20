
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ArrowUpRight,
  ChevronRight,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onChatOpen }) {
  const navRef = useRef(null);
  const progressRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          delay: 0.1,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Scroll progress and active section
  useEffect(() => {
    let frameId = null;

    const updateScrollState = () => {
      if (frameId !== null) return;

      frameId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;

        const progress =
          scrollableHeight > 0
            ? Math.min((scrollTop / scrollableHeight) * 100, 100)
            : 0;

        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`;
        }

        setScrolled(scrollTop > 16);

        let currentSection = "home";

        for (const link of navLinks) {
          const section = document.getElementById(link.href.slice(1));

          if (section && section.getBoundingClientRect().top <= 140) {
            currentSection = link.href.slice(1);
          }
        }

        setActiveSection(currentSection);
        frameId = null;
      });
    };

    updateScrollState();

    window.addEventListener("scroll", updateScrollState, {
      passive: true,
    });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  // Lock background scrolling while the responsive menu is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Close the menu when resizing into the desktop navigation layout.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu with Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navigateTo = (event, href) => {
    event.preventDefault();
    setMenuOpen(false);

    const target = document.getElementById(href.slice(1));

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", href);
  };

  const openChat = () => {
    setMenuOpen(false);
    onChatOpen?.();
  };

  const linkClasses = (href) => {
    const active = activeSection === href.slice(1);

    return `relative inline-flex items-center justify-center rounded-xl px-2.5 py-2.5 text-[12px] font-semibold transition-all duration-300 2xl:px-3 2xl:text-[13px] ${
      active
        ? "bg-blue-50/90 text-blue-700 shadow-[inset_0_0_0_1px_rgba(219,234,254,0.85)]"
        : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
    }`;
  };

  return (
    <>
      {/* Scroll progress */}
      <div
        ref={progressRef}
        className="fixed left-0 top-0 z-[100] h-[3px] w-0 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-500 shadow-[0_0_16px_rgba(79,70,229,0.45)]"
        aria-hidden="true"
      />

      {/* Main navbar */}
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={`fixed inset-x-0 top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 ${
          scrolled
            ? "border-slate-200/70 bg-white/90 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl" 
            : "border-white/70 bg-white/75 shadow-[0_4px_24px_rgba(15,23,42,0.025)] backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12">
          {/* Primary row */}
          <div className="flex h-[68px] items-center justify-between gap-3 sm:h-[74px] md:gap-5 lg:h-[78px] lg:gap-6 xl:h-[82px]">
            {/* Logo */}
            <a
              href="#home"
              onClick={(event) => navigateTo(event, "#home")}
              aria-label="Vishal Deep - Home"
              className="group flex shrink-0 items-center gap-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-4"
            >
              <span className="gradient-text text-xl font-extrabold tracking-tight text-transparent transition-all duration-300 sm:text-2xl">
                Vishal
              </span>

              <span className="text-xl font-extrabold tracking-tight text-slate-900 transition-colors duration-300 sm:text-2xl">
                Deep
              </span>
            </a>

            {/* Desktop navigation */}
            <div className="hidden min-w-0 items-center gap-0.5 2xl:gap-1 xl:flex">
              {navLinks.map((link) => {
                const active = activeSection === link.href.slice(1);

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(event) => navigateTo(event, link.href)}
                    aria-current={active ? "location" : undefined}
                    className={linkClasses(link.href)}
                  >
                    {link.label}

                    <span
                      className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full transition-all duration-300 ${
                        active ? "w-5" : "w-0"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Desktop actions */}
            <div className="hidden shrink-0 items-center gap-1.5 2xl:gap-2 xl:flex">
              <button
                type="button"
                onClick={openChat}
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-slate-600 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 2xl:px-3.5 2xl:text-sm"
              >
                <MessageCircle
                  size={17}
                  className="transition-transform duration-300 group-hover:-rotate-12"
                />
                Ask AI
              </button>

              <a
                href="#contact"
                onClick={(event) => navigateTo(event, "#contact")}
                className="btn-primary"
              >
                Let's Talk

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* Mobile / tablet menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navbar"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/85 text-slate-800 shadow-[0_4px_14px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 xl:hidden"
            >
              {menuOpen ? (
                <X size={21} strokeWidth={2} />
              ) : (
                <Menu size={21} strokeWidth={2} />
              )}
            </button>
          </div>

          {/* Tablet navigation: large tablets and small laptops */}
          <div className="hidden items-center justify-center gap-1 border-t border-slate-100/80 py-2.5 lg:flex xl:hidden">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => navigateTo(event, link.href)}
                aria-current={
                  activeSection === link.href.slice(1) ? "location" : undefined
                }
                className={linkClasses(link.href)}
              >
                {link.label}
              </a>
            ))}

            <button
              type="button"
              onClick={openChat}
              className="ml-1 inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
            >
              <MessageCircle size={16} />
              Ask AI
            </button>
          </div>
        </div>

        {/* Mobile navigation panel */}
        <div
          id="mobile-navbar"
          aria-hidden={!menuOpen}
          className={`overflow-hidden border-t border-slate-100/80 bg-white/95 shadow-[0_24px_48px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-[max-height,opacity,visibility] duration-300 ease-out xl:hidden ${
            menuOpen
              ? "visible max-h-[calc(100dvh-68px)] opacity-100 lg:max-h-[calc(100dvh-112px)]"
              : "invisible max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto max-h-[calc(100dvh-68px)] w-full max-w-[1440px] overflow-y-auto overscroll-contain px-4 pb-6 pt-4 sm:px-6 md:px-8 lg:hidden">
            {/* Menu heading */}
            <div className="mb-3 flex items-center justify-between px-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Explore
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  Navigate my portfolio
                </p>
              </div>

              <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700">
                0{navLinks.length} Links
              </span>
            </div>

            {/* Links */}
            <div className="space-y-1.5">
              {navLinks.map((link, index) => {
                const active = activeSection === link.href.slice(1);

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={(event) => navigateTo(event, link.href)}
                    aria-current={active ? "location" : undefined}
                    className={`group flex items-center justify-between rounded-2xl border px-3 py-3.5 transition-all duration-200 sm:px-4 sm:py-4 ${
                      active
                        ? "border-blue-100 bg-blue-50/80 text-blue-700"
                        : "border-transparent text-slate-700 hover:border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-colors ${
                          active
                            ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/20"
                            : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-700"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm font-semibold">
                        {link.label}
                      </span>
                    </span>

                    <ChevronRight
                      size={17}
                      className={`transition-all duration-200 ${
                        active
                          ? "translate-x-0 text-blue-600"
                          : "text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Mobile actions */}
            <div className="mt-4 grid grid-cols-1 gap-2.5 border-t border-slate-100 pt-4 sm:grid-cols-2">
              <button
                type="button"
                tabIndex={menuOpen ? 0 : -1}
                onClick={openChat}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3.5 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
              >
                <MessageCircle size={18} />
                Ask Portfolio AI
              </button>

              <a
                href="#contact"
                tabIndex={menuOpen ? 0 : -1}
                onClick={(event) => navigateTo(event, "#contact")}
                className="btn-primary"
              >
                Let's Talk

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>

          {/* Tablet menu content */}
          <div className="hidden px-6 pb-5 pt-4 lg:block">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-50 to-white px-5 py-4 shadow-sm">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Let's build something great.
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Have an idea or a project in mind?
                </p>
              </div>

              <a
                href="#contact"
                tabIndex={menuOpen ? 0 : -1}
                onClick={(event) => navigateTo(event, "#contact")}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                Contact me
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
