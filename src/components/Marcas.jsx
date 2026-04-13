const BRANDS = [
  "Naturisto","d2h Digital","Salud & Vida","NutriPro",
  "VitaMax","BioBalance","NaturLab","PharmaTech",
  "Naturisto","d2h Digital","Salud & Vida","NutriPro",
  "VitaMax","BioBalance","NaturLab","PharmaTech",
];

export default function Marcas() {
  return (
    <section style={{ padding:"64px 0", background:"#F7F8FC", borderTop:"1px solid #EAEDF5", overflow:"hidden" }}>
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <span className="eyebrow eyebrow-b" style={{ display:"inline-flex" }}>
          Marcas que confían en GCAB
        </span>
      </div>

      <div style={{ overflow:"hidden", maskImage:"linear-gradient(90deg,transparent,black 12%,black 88%,transparent)", WebkitMaskImage:"linear-gradient(90deg,transparent,black 12%,black 88%,transparent)" }}>
        <div style={{ display:"flex", gap:72, animation:"marquee 28s linear infinite", whiteSpace:"nowrap" }}>
          {BRANDS.map((b, i) => (
            <span
              key={i}
              className="h-font"
              style={{ fontWeight:800, fontSize:19, flexShrink:0, cursor:"default", color:"#DADEE8", transition:"color .25s", letterSpacing:"-.3px" }}
              onMouseEnter={e => e.target.style.color = "#0A0F1E"}
              onMouseLeave={e => e.target.style.color = "#DADEE8"}
            >{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
