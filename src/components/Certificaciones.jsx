import useReveal  from "../hooks/useReveal.js";
import { CERTS } from "../data/certs.js";
import { IMG }   from "../assets/media.js";

function CertItem({ c, i }) {
  const r = useReveal();
  return (
    <div ref={r} className="rv cert-b" style={{ transitionDelay:`${i*45}ms` }}>
      <div style={{ width:44, height:44, borderRadius:13, background:"#EEF3FD", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <i className={`fa-solid ${c.icon}`} style={{ color:"#1549E8", fontSize:16 }}/>
      </div>
      <div className="h-font" style={{ fontWeight:800, fontSize:16, color:"#0A0F1E", letterSpacing:"-.2px" }}>{c.name}</div>
      <div style={{ color:"rgba(10,15,30,.45)", fontSize:11.5, lineHeight:1.5, textAlign:"center" }}>{c.desc}</div>
    </div>
  );
}

export default function Certificaciones() {
  const rv = useReveal();
  return (
    <section style={{ padding:"120px 0", background:"#fff" }}>
      <div className="ctr">
        {/* Header */}
        <div ref={rv} className="rv" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:32, marginBottom:64, paddingBottom:48, borderBottom:"1px solid #EAEDF5" }}>
          <div>
            <span className="eyebrow eyebrow-b" style={{ marginBottom:20, display:"inline-flex" }}>Certificaciones</span>
            <h2 className="h-font" style={{ fontWeight:800, fontSize:"clamp(28px,3.8vw,48px)", color:"#0A0F1E", letterSpacing:"-.8px", lineHeight:1.1 }}>
              No solo cumplimos.<br/><span style={{ color:"#1549E8" }}>Elevamos los estándares.</span>
            </h2>
          </div>
          <p style={{ color:"rgba(10,15,30,.5)", fontSize:15, lineHeight:1.8, maxWidth:360 }}>
            Un marco integral de certificaciones garantiza rigor en cada etapa del proceso productivo.
          </p>
        </div>

        {/* Wide image banner */}
        <div style={{ borderRadius:24, overflow:"hidden", height:280, position:"relative", marginBottom:56 }}>
          <img src={IMG.team} alt="Planta GCAB" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"saturate(.8)" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(10,15,30,.9) 30%,rgba(10,15,30,.4) 100%)" }}/>
          {/* Thin accent line */}
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:"#1549E8" }}/>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", padding:"0 52px" }}>
            <div>
              <span className="eyebrow eyebrow-w" style={{ marginBottom:16, display:"inline-flex" }}>Excelencia certificada</span>
              <p style={{ color:"rgba(255,255,255,.9)", fontWeight:500, fontSize:20, maxWidth:440, lineHeight:1.6 }}>
                Respaldamos cada proceso con certificaciones internacionales reconocidas.
              </p>
            </div>
          </div>
        </div>

        <div className="grid-4">
          {CERTS.map((c, i) => <CertItem key={c.name} c={c} i={i}/>)}
        </div>
      </div>
    </section>
  );
}
