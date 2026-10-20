import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, CheckCircle } from "lucide-react";
import { experience } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const typeConf = {
  "Full-time":  { icon: Briefcase,      bg:"#2563EB", badge:"#EFF6FF:#1D4ED8" },
  "Internship": { icon: Briefcase,      bg:"#0284C7", badge:"#EFF6FF:#0369A1" },
  "Education":  { icon: GraduationCap,  bg:"#7C3AED", badge:"#F5F3FF:#6D28D9" },
};

export default function Experience() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const itemsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start:"top 86%" },
        opacity:0, y:36, duration:0.75, ease:"power3.out"
      });

      itemsRef.current.filter(Boolean).forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start:"top 82%" },
          opacity:0, x: i%2===0 ? -40 : 40, duration:0.65, ease:"power3.out"
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-10"
      style={{ background:"linear-gradient(180deg,#fff,#F7FAFF)" }}>
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12">

        {/* Heading */}
        <div ref={headRef} style={{ marginBottom:64, textAlign:"center" }}>
          <span style={{ display:"inline-block", padding:"6px 16px", borderRadius:999,
            background:"#EFF6FF", color:"#2563EB", fontSize:12, fontWeight:700,
            textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:16 }}>
            Experience & Education
          </span>
          <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"clamp(28px,4vw,44px)",
            fontWeight:800, color:"#0F172A", lineHeight:1.15, marginBottom:12 }}>
            My Professional <span className="gradient-text">Journey</span>
          </h2>
          <p style={{ fontSize:17, color:"#64748B", maxWidth:520, margin:"0 auto" }}>
            From education to professional software engineering — building real products and growing every day.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position:"relative" }}>
          {/* Center line (desktop) */}
          <div className="tl-line hidden lg:block" style={{
            position:"absolute", left:"50%", top:0, bottom:0,
            width:2, transform:"translateX(-50%)", opacity:0.18, borderRadius:2
          }} />

          <div style={{ display:"flex", flexDirection:"column", gap:48 }}>
            {experience.map((item, i) => {
              const conf    = typeConf[item.type] || typeConf["Full-time"];
              const Icon    = conf.icon;
              const [badgeBg, badgeCol] = conf.badge.split(":");
              const isLeft  = i%2 === 0;

              return (
                <div key={item.id} ref={el => (itemsRef.current[i] = el)}
                  style={{ position:"relative", display:"flex", alignItems:"center", gap:0 }}
                  className={`flex-col lg:flex-row${isLeft ? "" : " lg:flex-row-reverse"}`}>

                  {/* Card */}
                  <div style={{ padding:0 }} className="w-full lg:w-[calc(50%-36px)]">
                    <div style={{
                      padding:"28px 32px", borderRadius:28, background:"#fff",
                      border:"1px solid #EFF6FF",
                      boxShadow:"0 4px 24px rgba(37,99,235,0.07)",
                      transition:"box-shadow 0.3s"
                    }}>
                      {/* Header */}
                      <div style={{ display:"flex", alignItems:"flex-start", gap:16, marginBottom:16 }}>
                        <div style={{ width:48, height:48, borderRadius:16, background:conf.bg,
                          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                          boxShadow:"0 4px 12px rgba(0,0,0,0.15)" }}>
                          <Icon size={20} color="#fff" />
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8 }}>
                            <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:18, fontWeight:700,
                              color:"#0F172A", margin:0, lineHeight:1.2 }}>{item.role}</h3>
                            {item.current && (
                              <span style={{ display:"inline-flex", alignItems:"center", gap:5, flexShrink:0,
                                padding:"4px 10px", borderRadius:999, fontSize:11, fontWeight:700,
                                background:"#F0FDF4", border:"1px solid #BBF7D0", color:"#15803D" }}>
                                <span style={{ width:6, height:6, borderRadius:"50%", background:"#22C55E" }} />
                                Current
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize:14, fontWeight:600, color:"#2563EB", margin:"4px 0 6px" }}>{item.company}</p>
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <span style={{ fontSize:12, color:"#94A3B8" }}>{item.duration}</span>
                            <span style={{ fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:6,
                              background:badgeBg, color:badgeCol }}>{item.type}</span>
                          </div>
                        </div>
                      </div>

                      <p style={{ fontSize:14, color:"#64748B", lineHeight:1.7, marginBottom:16 }}>{item.description}</p>

                      <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:8 }}>
                        {item.highlights.map((h, hi) => (
                          <li key={hi} style={{ display:"flex", alignItems:"flex-start", gap:8, fontSize:13, color:"#475569" }}>
                            <CheckCircle size={14} color="#60A5FA" style={{ marginTop:2, flexShrink:0 }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="hidden lg:flex" style={{ width:72, flexShrink:0, justifyContent:"center", zIndex:10 }}>
                    <div style={{ width:20, height:20, borderRadius:"50%",
                      background:conf.bg, border:"4px solid #fff",
                      boxShadow:`0 0 0 3px ${conf.bg}44` }} />
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block" style={{ flex:1 }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
