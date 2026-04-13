import useReveal  from "../hooks/useReveal.js";
import useCounter from "../hooks/useCounter.js";

const DATA = [
  { target:34023, suffix:"",  label:"Productos fabricados",    icon:"fa-box-open",  detail:"Desde 2018" },
  { target:284,   suffix:"+", label:"Proyectos desarrollados", icon:"fa-flask",     detail:"Activos" },
  { target:500,   suffix:"+", label:"Insumos certificados",    icon:"fa-atom",      detail:"En catálogo" },
  { target:3,     suffix:"",  label:"Plantas de fabricación",  icon:"fa-industry",  detail:"GMP" },
];

function StatItem({ target, suffix, label, icon, detail }) {
  const [ref, n] = useCounter(target);
  const rv = useReveal();
  return (
    <div ref={rv} className="rv stat-card" style={{ textAlign:"center" }}>
      <div ref={ref}>
        <div style={{ width:44, height:44, borderRadius:14, background:"#EEF3FD", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
          <i className={`fa-solid ${icon}`} style={{ color:"#1549E8", fontSize:16 }}/>
        </div>
        <div className="h-font" style={{ fontSize:"clamp(40px,3.5vw,56px)", fontWeight:800, color:"#1549E8", lineHeight:1, marginBottom:10, letterSpacing:"-1px" }}>
          {n.toLocaleString()}{suffix}
        </div>
        <div style={{ color:"#0A0F1E", fontSize:15, fontWeight:500, marginBottom:6 }}>{label}</div>
        <div style={{ color:"rgba(10,15,30,.4)", fontSize:12 }}>{detail}</div>
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" style={{ background:"#fff", borderBottom:"1px solid #EAEDF5", padding:"80px 0" }}>
      <div className="ctr">
        <div className="grid-4">
          {DATA.map(d => <StatItem key={d.label} {...d}/>)}
        </div>
      </div>
    </section>
  );
}
