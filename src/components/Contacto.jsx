import { useState } from "react";
import useReveal    from "../hooks/useReveal.js";
import { ETAPAS }  from "../data/certs.js";

const SOCIAL = [
  ["fa-linkedin-in","LinkedIn"],["fa-instagram","Instagram"],
  ["fa-facebook-f","Facebook"],["fa-tiktok","TikTok"],
];
const CONTACT_ITEMS = [
  { icon:"fa-phone",    label:"Oficina",  val:"+52 55 2469 7657" },
  { icon:"fa-whatsapp", label:"WhatsApp", val:"+52 55 3841 3234", fab:true },
  { icon:"fa-envelope", label:"Email",    val:"contacto@gcabcompany.com" },
];
const FIELDS = [
  { n:"nombre",   ph:"Nombre completo",     label:"Nombre *",             half:true },
  { n:"telefono", ph:"+52 55 0000 0000",    label:"Teléfono",             half:true },
  { n:"correo",   ph:"tu@empresa.com",      label:"Correo electrónico *", type:"email" },
  { n:"empresa",  ph:"Nombre de tu empresa",label:"Empresa / Marca" },
];

export default function Contacto() {
  const [form, setForm] = useState({ nombre:"", correo:"", telefono:"", empresa:"", etapa:"" });
  const [sent, setSent] = useState(false);
  const [load, setLoad] = useState(false);
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = () => {
    if (!form.nombre || !form.correo) return;
    setLoad(true);
    setTimeout(() => { setLoad(false); setSent(true); }, 1400);
  };
  const r1 = useReveal("rv-l");
  const r2 = useReveal("rv-r");

  return (
    <section id="contacto" style={{ padding:"120px 0", background:"#0A0F1E", position:"relative", overflow:"hidden" }}>
      {/* Background gradient blobs */}
      <div style={{ position:"absolute", top:0, right:"-10%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(21,73,232,.15) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-20%", left:"-5%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,.08) 0%,transparent 70%)", pointerEvents:"none" }}/>

      <div className="ctr" style={{ position:"relative", zIndex:1 }}>
        <div className="two-col">

          {/* Left */}
          <div ref={r1} className="rv-l">
            <span className="eyebrow eyebrow-w" style={{ marginBottom:28, display:"inline-flex" }}>Cotiza Online</span>
            <h2 className="h-font" style={{ fontWeight:800, color:"#fff", fontSize:"clamp(30px,3.8vw,52px)", lineHeight:1.08, marginBottom:24, letterSpacing:"-1px" }}>
              Háblanos de tu proyecto,<br/>
              <span style={{ color:"#0EA5E9" }}>queremos que se<br/>haga realidad.</span>
            </h2>
            <p style={{ color:"rgba(255,255,255,.42)", fontSize:15, lineHeight:1.85, marginBottom:48 }}>
              Nuestro equipo de especialistas analizará tu propuesta y te enviará una cotización personalizada en menos de 24 horas hábiles.
            </p>

            <div style={{ display:"flex", flexDirection:"column", gap:24, marginBottom:48 }}>
              {CONTACT_ITEMS.map(({ icon, label, val, fab }) => (
                <div key={val} style={{ display:"flex", alignItems:"center", gap:18 }}>
                  <div style={{ width:44, height:44, borderRadius:13, background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <i className={`${fab?"fa-brands":"fa-solid"} ${icon}`} style={{ color:"rgba(255,255,255,.5)", fontSize:14 }}/>
                  </div>
                  <div>
                    <div className="h-font" style={{ fontWeight:600, fontSize:10, color:"rgba(255,255,255,.28)", letterSpacing:2, textTransform:"uppercase", marginBottom:3 }}>{label}</div>
                    <div style={{ fontWeight:400, fontSize:14, color:"rgba(255,255,255,.8)" }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height:"1px", background:"rgba(255,255,255,.07)", marginBottom:32 }}/>

            <div style={{ display:"flex", gap:10 }}>
              {SOCIAL.map(([icon, label]) => (
                <button key={label} title={label}
                  style={{ width:40, height:40, borderRadius:12, background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)", cursor:"pointer", color:"rgba(255,255,255,.35)", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background="rgba(21,73,232,.4)"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="rgba(21,73,232,.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.05)"; e.currentTarget.style.color="rgba(255,255,255,.35)"; e.currentTarget.style.borderColor="rgba(255,255,255,.08)"; }}>
                  <i className={`fa-brands ${icon}`} style={{ fontSize:13 }}/>
                </button>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div ref={r2} className="rv-r">
            <div style={{ background:"#fff", borderRadius:28, padding:"44px 40px", boxShadow:"0 40px 100px rgba(0,0,0,.4)" }}>
              {sent ? (
                <div style={{ textAlign:"center", padding:"48px 0" }}>
                  <div style={{ width:68, height:68, borderRadius:"50%", background:"#EEF3FD", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
                    <i className="fa-solid fa-circle-check" style={{ color:"#1549E8", fontSize:28 }}/>
                  </div>
                  <h3 className="h-font" style={{ fontWeight:800, fontSize:22, color:"#0A0F1E", marginBottom:12, letterSpacing:"-.3px" }}>¡Gracias, {form.nombre}!</h3>
                  <p style={{ color:"rgba(10,15,30,.5)", fontSize:15, lineHeight:1.75 }}>Recibimos tu solicitud. Te contactaremos en menos de 24 horas hábiles.</p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom:32 }}>
                    <h3 className="h-font" style={{ fontWeight:700, fontSize:20, color:"#0A0F1E", marginBottom:6, letterSpacing:"-.3px" }}>Solicitar cotización</h3>
                    <p style={{ color:"rgba(10,15,30,.45)", fontSize:13 }}>Todos los campos con * son requeridos.</p>
                  </div>

                  <div style={{ height:1, background:"#EAEDF5", marginBottom:28 }}/>

                  <div className="g22" style={{ marginBottom:20 }}>
                    {FIELDS.filter(f => f.half).map(f => (
                      <div key={f.n}>
                        <label className="h-font" style={{ fontWeight:600, fontSize:11, color:"rgba(10,15,30,.45)", display:"block", marginBottom:8, letterSpacing:.5, textTransform:"uppercase" }}>{f.label}</label>
                        <input className="f-inp" name={f.n} type="text" placeholder={f.ph} value={form[f.n]} onChange={set}/>
                      </div>
                    ))}
                  </div>

                  {FIELDS.filter(f => !f.half).map(f => (
                    <div key={f.n} style={{ marginBottom:20 }}>
                      <label className="h-font" style={{ fontWeight:600, fontSize:11, color:"rgba(10,15,30,.45)", display:"block", marginBottom:8, letterSpacing:.5, textTransform:"uppercase" }}>{f.label}</label>
                      <input className="f-inp" name={f.n} type={f.type||"text"} placeholder={f.ph} value={form[f.n]} onChange={set}/>
                    </div>
                  ))}

                  <div style={{ marginBottom:32, position:"relative" }}>
                    <label className="h-font" style={{ fontWeight:600, fontSize:11, color:"rgba(10,15,30,.45)", display:"block", marginBottom:8, letterSpacing:.5, textTransform:"uppercase" }}>¿En qué etapa te encuentras?</label>
                    <select className="f-sel" name="etapa" value={form.etapa} onChange={set}>
                      <option value="">Selecciona una opción…</option>
                      {ETAPAS.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                    <i className="fa-solid fa-chevron-down" style={{ position:"absolute", right:16, top:46, color:"rgba(10,15,30,.3)", fontSize:11, pointerEvents:"none" }}/>
                  </div>

                  <button
                    className="btn btn-p"
                    style={{ width:"100%", justifyContent:"center", fontSize:14, padding:"16px 0", opacity:load?.75:1 }}
                    onClick={submit} disabled={load}
                  >
                    {load
                      ? <><i className="fa-solid fa-spinner fa-spin"/> Enviando…</>
                      : <>Enviar solicitud de cotización <i className="fa-solid fa-arrow-right" style={{ fontSize:11 }}/></>
                    }
                  </button>

                  <p style={{ textAlign:"center", fontSize:12, color:"rgba(10,15,30,.3)", marginTop:16 }}>
                    <i className="fa-solid fa-lock" style={{ marginRight:5 }}/> Información protegida. Respuesta en menos de 24 h.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
