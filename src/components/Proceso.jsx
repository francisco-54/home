import { useState } from "react";
import useReveal from "../hooks/useReveal.js";
import { STEPS }  from "../data/steps.js";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

function ProcStep({ s, i, active, setActive }) {
  const r = useReveal();
  const isActive = i === active;
  return (
    <div ref={r} className="rv" style={{ transitionDelay:`${i*90}ms` }}>
      <div
        onClick={() => setActive(i)}
        style={{ display:"flex", alignItems:"flex-start", gap:16, padding:"20px 0", borderBottom:"1px solid rgba(255,255,255,.07)", cursor:"pointer", transition:"all .25s", opacity: isActive ? 1 : 0.38 }}
        onMouseEnter={e => { if (!isActive) e.currentTarget.style.opacity=".65"; }}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.opacity=".38"; }}
      >
        {/* Step number */}
        <div style={{ width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background: isActive ? s.col : "rgba(255,255,255,.06)", border: isActive ? `2px solid ${s.col}` : "1.5px solid rgba(255,255,255,.1)", transition:"all .35s" }}>
          {i < active
            ? <i className="fa-solid fa-check" style={{ color:"#fff", fontSize:12 }}/>
            : <span className="h-font" style={{ fontWeight:800, color: isActive ? "#fff" : "rgba(255,255,255,.4)", fontSize:12 }}>{s.n}</span>
          }
        </div>
        <div style={{ paddingTop:8 }}>
          <div className="h-font" style={{ fontWeight:600, fontSize:14, color: isActive ? "#fff" : "rgba(255,255,255,.6)", marginBottom:4, transition:"color .25s" }}>{s.title}</div>
          {isActive && (
            <div style={{ color:"rgba(255,255,255,.4)", fontSize:12, lineHeight:1.6, animation:"fadeIn .3s ease" }}>
              {s.desc.slice(0, 80)}…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Proceso() {
  const [active, setActive] = useState(0);
  const rv = useReveal();

  return (
    <section id="proceso" style={{ padding:"120px 0", background:"#0A0F1E", position:"relative", overflow:"hidden" }}>
      {/* Subtle gradient blobs */}
      <div style={{ position:"absolute", top:"-20%", left:"-10%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(21,73,232,.12) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,.08) 0%,transparent 70%)", pointerEvents:"none" }}/>

      <div className="ctr" style={{ position:"relative", zIndex:1 }}>
        {/* Header */}
        <div ref={rv} className="rv" style={{ marginBottom:72 }}>
          <span className="eyebrow eyebrow-w" style={{ marginBottom:20, display:"inline-flex" }}>Full Service</span>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
            <h2 className="h-font" style={{ fontWeight:800, fontSize:"clamp(30px,4vw,52px)", color:"#fff", lineHeight:1.08, letterSpacing:"-1px" }}>
              Nuestro proceso<br/><span style={{ color:"#0EA5E9" }}>paso a paso</span>
            </h2>
            <p style={{ color:"rgba(255,255,255,.38)", fontSize:15, maxWidth:360, lineHeight:1.8 }}>
              Acompañamiento completo desde la idea hasta la distribución de tu producto terminado.
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="two-col" style={{ alignItems:"start" }}>
          {/* Left — image */}
          <div style={{ position:"sticky", top:"120px" }}>
            <div style={{ borderRadius:24, overflow:"hidden", height:480, position:"relative", boxShadow:"0 40px 80px rgba(0,0,0,.5)" }}>
              <img
                src={STEPS[active].img} alt={STEPS[active].title}
                style={{ width:"100%", height:"100%", objectFit:"cover", transition:"all .6s cubic-bezier(.16,1,.3,1)" }}
              />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,15,30,.7) 0%,transparent 50%)" }}/>
              {/* Step info overlay */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"28px 32px" }}>
                <div className="h-font" style={{ fontWeight:700, fontSize:11, color:STEPS[active].col, letterSpacing:2.5, textTransform:"uppercase", marginBottom:8 }}>
                  Paso {STEPS[active].n}
                </div>
                <h3 className="h-font" style={{ fontWeight:800, fontSize:"clamp(18px,2vw,26px)", color:"#fff", lineHeight:1.2, marginBottom:16 }}>
                  {STEPS[active].title}
                </h3>
                <div style={{ display:"flex", gap:12 }}>
                  <button className="btn btn-w" style={{ fontSize:12, padding:"10px 20px" }} onClick={() => scrollTo("contacto")}>
                    Iniciar proyecto
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right — steps list */}
          <div>
            <p style={{ color:"rgba(255,255,255,.38)", fontSize:14, lineHeight:1.75, marginBottom:40, paddingBottom:40, borderBottom:"1px solid rgba(255,255,255,.07)" }}>
              {STEPS[active].desc}
            </p>
            {STEPS.map((s, i) => (
              <ProcStep key={s.n} s={s} i={i} active={active} setActive={setActive}/>
            ))}
            <div style={{ paddingTop:40, display:"flex", gap:8 }}>
              {STEPS.map((_, i) => (
                <div key={i} onClick={() => setActive(i)} style={{ height:3, borderRadius:2, background: i===active ? STEPS[active].col : "rgba(255,255,255,.12)", width: i===active ? 28 : 8, transition:"all .35s cubic-bezier(.16,1,.3,1)", cursor:"pointer" }}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
