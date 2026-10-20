import { Globe, Code2, Mail, ArrowUp, Heart } from "lucide-react";
import { personalInfo } from "../data/portfolioData";

export default function Footer() {
  const year = new Date().getFullYear();
  const toTop = () => window.scrollTo({ top:0, behavior:"smooth" });

  return (
    <footer style={{ background:"#0F172A", color:"#fff" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"48px 32px" }}>
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center",
          justifyContent:"space-between", gap:24 }}>

          {/* Wordmark */}
          <div>
            <a href="#home" onClick={e => { e.preventDefault(); toTop(); }}
              style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800,
                fontSize:20, textDecoration:"none", letterSpacing:"-0.02em" }}>
              <span style={{ color:"#60A5FA" }}>Vishal</span>
              <span style={{ color:"#fff" }}> Deep</span>
            </a>
            <p style={{ color:"#64748B", fontSize:13, marginTop:4 }}>
              Frontend Developer & MERN Stack Engineer
            </p>
          </div>

          {/* Social icons */}
          <div style={{ display:"flex", gap:10 }}>
            {[
              { href:personalInfo.github,   Icon:Code2, label:"GitHub"   },
              { href:personalInfo.linkedin, Icon:Globe, label:"LinkedIn" },
              { href:`mailto:${personalInfo.email}`, Icon:Mail, label:"Email" },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                aria-label={item.label}
                style={{ width:36, height:36, borderRadius:10, background:"#1E293B",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#64748B", textDecoration:"none", transition:"all 0.2s" }}
                className="hover:bg-blue-600 hover:text-white">
                <item.Icon size={15} />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button onClick={toTop} aria-label="Back to top"
            style={{ display:"flex", alignItems:"center", gap:7, padding:"8px 16px",
              borderRadius:10, background:"#1E293B", border:"none", color:"#64748B",
              fontSize:13, fontWeight:500, cursor:"pointer", transition:"all 0.2s" }}
            className="hover:bg-blue-600 hover:text-white">
            <ArrowUp size={14} /> Back to top
          </button>
        </div>

        <div style={{ marginTop:32, paddingTop:24, borderTop:"1px solid #1E293B",
          display:"flex", flexWrap:"wrap", alignItems:"center",
          justifyContent:"space-between", gap:12 }}>
          <p style={{ color:"#475569", fontSize:13 }}>© {year} Vishal Deep. All rights reserved.</p>
          <p style={{ color:"#475569", fontSize:13, display:"flex", alignItems:"center", gap:5 }}>
            Built with <Heart size={12} color="#F87171" fill="#F87171" /> using React, Tailwind & GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
