import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, FolderGit2, Layers, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { icon: Briefcase,  value:"1+",   label:"Year Professional Experience", sub:"SquadMinds Private Limited",    iconBg:"#2563EB", valColor:"#2563EB" },
  { icon: FolderGit2, value:"5+",   label:"Projects Built & Delivered",    sub:"Across MERN & Frontend stacks", iconBg:"#4F46E5", valColor:"#4F46E5" },
  { icon: Layers,     value:"MERN", label:"Full Stack Expertise",           sub:"MongoDB, Express, React, Node",  iconBg:"#0284C7", valColor:"#0284C7" },
  { icon: BookOpen,   value:"BCA",  label:"Computer Applications Degree",   sub:"Himachal Pradesh University",   iconBg:"#7C3AED", valColor:"#7C3AED" },
];

export default function Highlights() {
  const sectionRef = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start:"top 88%" },
          opacity:0, y:28, duration:0.55, delay: i * 0.08, ease:"power3.out"
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding:"72px 0", background:"linear-gradient(135deg,#EFF6FF,#fff,#F7FAFF)" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} ref={el => (cardsRef.current[i] = el)} className="card-lift"
                style={{
                  display:"flex", alignItems:"flex-start", gap:16,
                  padding:"24px", borderRadius:20,
                  background:"#fff", border:"1px solid #EFF6FF",
                  boxShadow:"0 2px 16px rgba(37,99,235,0.06)"
                }}>
                <div style={{ width:44, height:44, borderRadius:14, background:item.iconBg,
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon size={20} color="#fff" />
                </div>
                <div>
                  <p style={{ fontSize:24, fontWeight:800, color:item.valColor, margin:0, lineHeight:1 }}>{item.value}</p>
                  <p style={{ fontSize:13, fontWeight:600, color:"#1E293B", marginTop:4, lineHeight:1.35 }}>{item.label}</p>
                  <p style={{ fontSize:11, color:"#94A3B8", marginTop:3 }}>{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
