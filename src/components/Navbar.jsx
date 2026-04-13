import { useState, useEffect } from "react";

const LINKS = [
  ["Inicio","hero"],["Insumos","insumos"],
  ["Proceso","proceso"],["Soluciones","soluciones"],["Contacto","contacto"],
];

export default function Navbar() {
  const [sc,  setSc]  = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => {
    setMob(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
  };

  return (
    <>
      <nav className={`nav${sc ? " sc" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ display:"flex", alignItems:"center", gap:12, border:"none", background:"transparent" }}
          >
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#1549E8,#0EA5E9)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <i className="fa-solid fa-flask" style={{ color:"#fff", fontSize:14 }}/>
            </div>
            <span className="h-font" style={{ fontWeight:700, fontSize:16, color: sc ? "#0A0F1E" : "#fff", letterSpacing:"-.3px" }}>
              GCAB<span style={{ fontWeight:400, opacity:.55 }}> Company</span>
            </span>
          </button>

          {/* Desktop */}
          <div className="nav-links">
            {LINKS.map(([l, id]) => (
              <button key={l} className={`na ${sc ? "dk" : "lt"}`} onClick={() => go(id)}>{l}</button>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <button
              className={`btn ${sc ? "btn-p" : "btn-g"}`}
              style={{ fontSize:12, padding:"10px 22px" }}
              onClick={() => go("contacto")}
            >
              Cotizar Online
            </button>
            <button
              onClick={() => setMob(true)}
              style={{ border:"none", background:"transparent", color: sc ? "#0A0F1E" : "#fff", padding:4, display:"flex" }}
            >
              <i className="fa-solid fa-bars" style={{ fontSize:18 }}/>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mob && (
        <div style={{ position:"fixed", inset:0, background:"#fff", zIndex:600, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:40, animation:"fadeIn .18s ease" }}>
          <button onClick={() => setMob(false)} style={{ position:"absolute", top:24, right:28, border:"none", background:"transparent", color:"#0A0F1E" }}>
            <i className="fa-solid fa-xmark" style={{ fontSize:22 }}/>
          </button>
          {LINKS.map(([l, id]) => (
            <button
              key={l} onClick={() => go(id)}
              className="h-font"
              style={{ fontSize:38, fontWeight:700, color:"#0A0F1E", border:"none", background:"transparent", letterSpacing:"-1px", transition:"color .2s" }}
              onMouseEnter={e => e.target.style.color = "#1549E8"}
              onMouseLeave={e => e.target.style.color = "#0A0F1E"}
            >{l}</button>
          ))}
          <button className="btn btn-p" onClick={() => go("contacto")}>
            Cotizar Online
          </button>
        </div>
      )}
    </>
  );
}
