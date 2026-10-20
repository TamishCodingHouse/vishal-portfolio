import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Code2,
  Globe,
  Download,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
} from "lucide-react";
import { personalInfo } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);
const initForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const [form, setForm] = useState(initForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: "top 86%" },
        opacity: 0,
        y: 36,
        duration: 0.75,
        ease: "power3.out",
      });
      gsap.from([infoRef.current, formRef.current], {
        scrollTrigger: { trigger: formRef.current, start: "top 82%" },
        opacity: 0,
        y: 36,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 20)
      e.message = "At least 20 characters";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus("submitting");
    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    setTimeout(() => {
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setForm(initForm);
    }, 600);
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    fontSize: 14,
    color: "#1E293B",
    background: errors[field] ? "#FFF5F5" : "#F8FAFC",
    border: `1.5px solid ${errors[field] ? "#FCA5A5" : "#E2E8F0"}`,
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
    fontFamily: "'Inter',sans-serif",
  });

  const linkRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    borderRadius: 14,
    textDecoration: "none",
    transition: "background 0.2s",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-10"
      style={{ background: "#F7FAFF" }}
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12">
        {/* Heading */}
        <div ref={headRef} style={{ marginBottom: 56, textAlign: "center" }}>
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
            Get In Touch
          </span>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 800,
              color: "#0F172A",
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            Have a Challenge{" "}
            <span className="gradient-text">Worth Building?</span>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "#64748B",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Whether you're a recruiter, an engineering team, or a potential
            collaborator — let's talk about what we can build together.
          </p>
        </div>

        <div style={{ display: "grid", gap: 32 }} className="lg:grid-cols-5">
          {/* LEFT — Info */}
          <div
            ref={infoRef}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
            className="lg:col-span-2"
          >
            <div
              style={{
                padding: 24,
                borderRadius: 24,
                background: "#fff",
                border: "1px solid #EFF6FF",
                boxShadow: "0 4px 24px rgba(37,99,235,0.06)",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#0F172A",
                  marginBottom: 20,
                }}
              >
                Connect with me
              </h3>
              {[
                {
                  href: `mailto:${personalInfo.email}`,
                  Icon: Mail,
                  label: "Email",
                  value: personalInfo.email,
                },
                {
                  href: personalInfo.linkedin,
                  Icon: Globe,
                  label: "LinkedIn",
                  value: "Vishal Deep",
                },
                {
                  href: personalInfo.github,
                  Icon: Code2,
                  label: "GitHub",
                  value: "@vishaldeep",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkRowStyle}
                  className="hover:bg-blue-50"
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: "#EFF6FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <item.Icon size={17} color="#2563EB" />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 11,
                        color: "#94A3B8",
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1E293B",
                        margin: 0,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
              <div style={{ ...linkRowStyle, cursor: "default" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "#F0FDF4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={17} color="#16A34A" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#94A3B8",
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    Location
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1E293B",
                      margin: 0,
                    }}
                  >
                    Himachal Pradesh, India
                  </p>
                </div>
              </div>
            </div>

            {/* Resume CTA */}
            <div
              style={{
                padding: 24,
                borderRadius: 24,
                background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
                color: "#fff",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 8,
                }}
              >
                Download Resume
              </h3>
              <p
                style={{
                  color: "#BFDBFE",
                  fontSize: 13,
                  lineHeight: 1.65,
                  marginBottom: 16,
                }}
              >
                Get a complete overview of my experience, skills, and projects.
              </p>

              <a
                href={personalInfo.resume}
                download="Vishal-Deep-Resume.pdf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 20px",
                  background: "#fff",
                  color: "#1D4ED8",
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: 13,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                }}
              >
                <Download size={15} />
                Download PDF Resume
              </a>
            </div>

            {/* Status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                borderRadius: 16,
                background: "#F0FDF4",
                border: "1px solid #BBF7D0",
              }}
            >
              <span className="avail-dot" />
              <div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#1E293B",
                    margin: 0,
                  }}
                >
                  Open to New Opportunities
                </p>
                <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>
                  Full-time roles and freelance projects
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            style={{
              padding: 32,
              borderRadius: 28,
              background: "#fff",
              border: "1px solid #EFF6FF",
              boxShadow: "0 4px 24px rgba(37,99,235,0.07)",
            }}
            className="lg:col-span-3"
          >
            <h3
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 17,
                fontWeight: 700,
                color: "#0F172A",
                marginBottom: 24,
              }}
            >
              Send a Message
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
              className="grid-cols-1 sm:grid-cols-2"
            >
              {[
                {
                  id: "name",
                  label: "Your Name",
                  type: "text",
                  placeholder: "John Doe",
                },
                {
                  id: "email",
                  label: "Email Address",
                  type: "email",
                  placeholder: "john@example.com",
                },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#334155",
                      marginBottom: 7,
                    }}
                  >
                    {field.label} <span style={{ color: "#F87171" }}>*</span>
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={form[field.id]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    style={inputStyle(field.id)}
                  />
                  {errors[field.id] && (
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 12,
                        color: "#EF4444",
                        marginTop: 5,
                      }}
                    >
                      <AlertCircle size={12} /> {errors[field.id]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="subject"
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#334155",
                  marginBottom: 7,
                }}
              >
                Subject <span style={{ color: "#F87171" }}>*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="Job opportunity / Project collaboration..."
                style={inputStyle("subject")}
              />
              {errors.subject && (
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 12,
                    color: "#EF4444",
                    marginTop: 5,
                  }}
                >
                  <AlertCircle size={12} /> {errors.subject}
                </p>
              )}
            </div>

            <div style={{ marginBottom: 24 }}>
              <label
                htmlFor="message"
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#334155",
                  marginBottom: 7,
                }}
              >
                Message <span style={{ color: "#F87171" }}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about the role or project..."
                style={{ ...inputStyle("message"), resize: "none" }}
              />
              {errors.message && (
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 12,
                    color: "#EF4444",
                    marginTop: 5,
                  }}
                >
                  <AlertCircle size={12} /> {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                opacity: status === "submitting" ? 0.6 : 1,
                cursor: status === "submitting" ? "not-allowed" : "pointer",
              }}
            >
              {status === "submitting" ? (
                <>
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      border: "2px solid #fff",
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />{" "}
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>

            {status === "success" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 14,
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                  color: "#15803D",
                  fontSize: 13,
                }}
              >
                <CheckCircle size={15} />
                <span style={{ fontWeight: 500 }}>
                  Your email client should open shortly.
                </span>
              </div>
            )}

            <p
              style={{
                fontSize: 12,
                color: "#94A3B8",
                marginTop: 14,
                textAlign: "center",
              }}
            >
              Uses mailto fallback · Connect a backend for direct submission
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
