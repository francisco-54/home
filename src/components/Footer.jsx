const COLS = {
  Servicios: ["Formulación I&D","Maquila de Suplementos","Acondicionado","Packaging & Branding"],
  Empresa:   ["¿Por qué GCAB?","Blog","Aviso de Privacidad","Crea tu marca"],
  Contacto:  ["+52 55 2469 7657","+52 55 3841 3234","contacto@gcabcompany.com"],
};
const SOCIAL = [
  ["fa-linkedin-in","LinkedIn"],["fa-instagram","Instagram"],
  ["fa-facebook-f","Facebook"],["fa-tiktok","TikTok"],
];

export default function Footer() {
  return (
    <footer style={{ background:"#0A0F1E", paddingTop:80, paddingBottom:36 }}>
      <div className="ctr">
        {/* Top rule */}
        <div style={{ height:1, background:"rgba(255,255,255,.06)", marginBottom:64 }}/>

        <div style={{ display:"grid", gridTemplateColumns:"1.8fr 1fr 1fr 1fr", gap:48, marginBottom:64 }}>
          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:20 }}>
              <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#1549E8,#0EA5E9)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className="fa-solid fa-flask" style={{ color:"#fff", fontSize:13 }}/>
              </div>
              <span className="h-font" style={{ fontWeight:700, fontSize:15, color:"#fff" }}>
                GCAB<span style={{ fontWeight:400, opacity:.45 }}> Company</span>
              </span>
            </div>
            <p style={{ color:"rgba(255,255,255,.28)", fontSize:13, lineHeight:1.85, maxWidth:230, marginBottom:28 }}>
              Más que una maquila, es un compromiso con tu visión.
            </p>
            <div style={{ display:"flex", gap:10 }}>
              {SOCIAL.map(([icon, label]) => (
                <button key={label} title={label}
                  style={{ width:36, height:36, borderRadius:11, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", cursor:"pointer", color:"rgba(255,255,255,.3)", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background="rgba(21,73,232,.35)"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="rgba(21,73,232,.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.04)"; e.currentTarget.style.color="rgba(255,255,255,.3)"; e.currentTarget.style.borderColor="rgba(255,255,255,.08)"; }}>
                  <i className={`fa-brands ${icon}`} style={{ fontSize:12 }}/>
                </button>
              ))}
            </div>
          </div>

          {/* Cols */}
          {Object.entries(COLS).map(([cat, items]) => (
            <div key={cat}>
              <div className="h-font" style={{ fontWeight:600, fontSize:12, color:"rgba(255,255,255,.4)", marginBottom:20, letterSpacing:1.5, textTransform:"uppercase" }}>{cat}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {items.map(it => (
                  <span key={it}
                    style={{ color:"rgba(255,255,255,.28)", fontSize:13, cursor:"pointer", transition:"color .2s" }}
                    onMouseEnter={e => e.target.style.color="#fff"}
                    onMouseLeave={e => e.target.style.color="rgba(255,255,255,.28)"}
                  >{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ height:1, background:"rgba(255,255,255,.05)", marginBottom:28 }}/>
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:16 }}>
          <span style={{ color:"rgba(255,255,255,.18)", fontSize:12 }}>
            <i className="fa-regular fa-copyright" style={{ marginRight:5 }}/> 2026 GCAB Company. Todos los derechos reservados.
          </span>
          <div style={{ display:"flex", gap:24 }}>
            {["Aviso de Privacidad","Cotiza Online"].map(l => (
              <span key={l} style={{ color:"rgba(255,255,255,.18)", fontSize:12, cursor:"pointer", transition:"color .2s" }}
                onMouseEnter={e => e.target.style.color="rgba(255,255,255,.5)"}
                onMouseLeave={e => e.target.style.color="rgba(255,255,255,.18)"}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
