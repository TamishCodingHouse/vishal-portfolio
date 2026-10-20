import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Code2, Smartphone, TrendingUp } from "lucide-react";
import { philosophyPoints } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const iconMap  = { Users, Code2, Smartphone, TrendingUp };
const cardConf = [
  { iconBg:"#2563EB", numColor:"rgba(37,99,235,0.08)", border:"#DBEAFE", bg:"linear-gradient(135deg,#EFF6FF,#fff)" },
  { iconBg:"#4F46E5", numColor:"rgba(79,70,229,0.08)",  border:"#E0E7FF", bg:"linear-gradient(135deg,#EEF2FF,#fff)" },
  { iconBg:"#0284C7", numColor:"rgba(2,132,199,0.08)",  border:"#BAE6FD", bg:"linear-gradient(135deg,#F0F9FF,#fff)" },
  { iconBg:"#7C3AED", numColor:"rgba(124,58,237,0.08)", border:"#DDD6FE", bg:"linear-gradient(135deg,#F5F3FF,#fff)" },
];

export default function Philosophy() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start:"top 86%" },
        opacity:0, y:36, duration:0.75, ease:"power3.out"
      });
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start:"top 88%" },
          opacity:0, y:36, duration:0.65, delay: i*0.1, ease:"power3.out"
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12  py-10" style={{ background:"#fff" }}>
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12">

        <div ref={headRef} style={{ marginBottom:56, textAlign:"center" }}>
          <span style={{ display:"inline-block", padding:"6px 16px", borderRadius:999,
            background:"#EFF6FF", color:"#2563EB", fontSize:12, fontWeight:700,
            textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:16 }}>My Approach</span>
          <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"clamp(28px,4vw,44px)",
            fontWeight:800, color:"#0F172A", lineHeight:1.15, marginBottom:12 }}>
            More Than Just <span className="gradient-text">Writing Code</span>
          </h2>
          <p style={{ fontSize:17, color:"#64748B", maxWidth:480, margin:"0 auto" }}>
            The principles that guide how I think, build, and deliver.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:24 }}>
          {philosophyPoints.map((point, i) => {
            const IconComp = iconMap[point.icon] || Code2;
            const conf = cardConf[i % cardConf.length];
            return (
              <div key={point.id} ref={el => (cardsRef.current[i] = el)} className="card-lift"
                style={{ position:"relative", padding:"28px 24px", borderRadius:28,
                  background:conf.bg, border:`1px solid ${conf.border}` }}>
                {/* Number watermark */}
                <span style={{ position:"absolute", top:16, right:20, fontSize:64, fontWeight:900,
                  color:conf.numColor, lineHeight:1, userSelect:"none", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  {String(i+1).padStart(2,"0")}
                </span>
                <div style={{ width:48, height:48, borderRadius:16, background:conf.iconBg,
                  display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20,
                  boxShadow:`0 6px 16px ${conf.iconBg}40` }}>
                  <IconComp size={22} color="#fff" />
                </div>
                <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:15, fontWeight:700,
                  color:"#0F172A", marginBottom:10, lineHeight:1.3 }}>{point.title}</h3>
                <p style={{ fontSize:13, color:"#64748B", lineHeight:1.7, margin:0 }}>{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
