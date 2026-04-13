import useReveal      from "../hooks/useReveal.js";
import { SOLUTIONS } from "../data/solutions.js";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

function SolucionCard({ s, index }) {
  const r = useReveal();
  return (
    <div ref={r} className="rv sol-card" style={{ transitionDelay:`${index*80}ms`, "--ac-color":s.col }}>
      <div style={{ "--ac-color":s.col }}>
        <style>{`.sol-card::before{ background:linear-gradient(90deg,${s.col},${s.col}55) }`}</style>
      </div>

      <div style={{ borderRadius:16, overflow:"hidden", marginBottom:28, height:200, position:"relative" }}>
        <img
          src={s.img} alt={s.title}
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .7s cubic-bezier(.16,1,.3,1)" }}
          onMouseEnter={e => e.target.style.transform="scale(1.05)"}
          onMouseLeave={e => e.target.style.transform=""}
        />
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top,${s.col}30,transparent)` }}/>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
        <div style={{ width:46, height:46, borderRadius:14, background:`${s.col}10`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <i className={`fa-solid ${s.icon}`} style={{ color:s.col, fontSize:17 }}/>
        </div>
        <h3 className="h-font" style={{ fontWeight:700, fontSize:18, color:"#0A0F1E", letterSpacing:"-.3px" }}>{s.title}</h3>
      </div>

      <p style={{ color:"rgba(10,15,30,.55)", fontSize:14, lineHeight:1.75, marginBottom:22 }}>{s.desc}</p>

      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
        {s.tags.map(t => (
          <span key={t} className="h-font" style={{ fontWeight:600, fontSize:10, padding:"4px 12px", borderRadius:100, background:`${s.col}0E`, color:s.col, letterSpacing:".5px", textTransform:"uppercase" }}>{t}</span>
        ))}
      </div>

      <div style={{ height:"1px", background:"#EAEDF5", marginBottom:20 }}/>

      <button
        onClick={() => scrollTo("contacto")}
        className="h-font"
        style={{ color:s.col, background:"none", border:"none", cursor:"pointer", padding:0, fontWeight:600, fontSize:12, display:"flex", alignItems:"center", gap:6, letterSpacing:".5px", transition:"gap .25s" }}
        onMouseEnter={e => e.currentTarget.style.gap="12px"}
        onMouseLeave={e => e.currentTarget.style.gap="6px"}
      >
        Conocer más <i className="fa-solid fa-arrow-right" style={{ fontSize:10 }}/>
      </button>
    </div>
  );
}

export default function Soluciones() {
  const rv = useReveal();
  return (
    <section id="soluciones" style={{ padding:"120px 0", background:"#F7F8FC" }}>
      <div className="ctr">
        <div ref={rv} className="rv" style={{ textAlign:"center", marginBottom:72 }}>
          <span className="eyebrow eyebrow-b" style={{ marginBottom:20, display:"inline-flex" }}>Servicios</span>
          <h2 className="h-font" style={{ fontWeight:800, fontSize:"clamp(28px,4vw,52px)", color:"#0A0F1E", letterSpacing:"-1px", lineHeight:1.08 }}>
            Soluciones que toda<br/><span style={{ color:"#1549E8" }}>marca necesita.</span>
          </h2>
        </div>
        <div className="grid-2">
          {SOLUTIONS.map((s, i) => <SolucionCard key={s.title} s={s} index={i}/>)}
        </div>
      </div>
    </section>
  );
}
