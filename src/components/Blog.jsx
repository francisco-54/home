import useReveal  from "../hooks/useReveal.js";
import { POSTS } from "../data/posts.js";

function BlogCard({ p, i }) {
  const r = useReveal();
  return (
    <div ref={r} className="rv blog-card" style={{ transitionDelay:`${i*100}ms` }}>
      <div className="b-img">
        <img src={p.img} alt={p.title}/>
        <div style={{ position:"absolute", top:18, left:18 }}>
          <span className="h-font" style={{ fontWeight:600, color:"#fff", fontSize:10, padding:"5px 14px", borderRadius:100, background:"rgba(10,15,30,.5)", backdropFilter:"blur(8px)", letterSpacing:1.5, textTransform:"uppercase", display:"inline-flex", alignItems:"center", gap:6 }}>
            <i className={`fa-solid ${p.icon}`} style={{ fontSize:9 }}/>{p.tag}
          </span>
        </div>
      </div>

      <div style={{ padding:"28px 28px 32px" }}>
        <h3 className="h-font" style={{ fontWeight:700, fontSize:19, color:"#0A0F1E", lineHeight:1.25, marginBottom:12, letterSpacing:"-.3px" }}>{p.title}</h3>
        <p style={{ color:"rgba(10,15,30,.52)", fontSize:14, lineHeight:1.75, marginBottom:24 }}>{p.desc}</p>
        <div style={{ height:1, background:"#EAEDF5", marginBottom:22 }}/>
        <button
          className="h-font"
          style={{ color:"#1549E8", background:"none", border:"none", cursor:"pointer", padding:0, fontWeight:600, fontSize:12, display:"flex", alignItems:"center", gap:6, letterSpacing:".5px", transition:"gap .25s" }}
          onMouseEnter={e => e.currentTarget.style.gap="12px"}
          onMouseLeave={e => e.currentTarget.style.gap="6px"}
        >
          Leer artículo <i className="fa-solid fa-arrow-right" style={{ fontSize:10 }}/>
        </button>
      </div>
    </div>
  );
}

export default function Blog() {
  const rv = useReveal();
  return (
    <section id="blog" style={{ padding:"120px 0", background:"#F7F8FC" }}>
      <div className="ctr">
        <div ref={rv} className="rv" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:20, marginBottom:56, paddingBottom:48, borderBottom:"1px solid #EAEDF5" }}>
          <div>
            <span className="eyebrow eyebrow-b" style={{ marginBottom:20, display:"inline-flex" }}>Blog</span>
            <h2 className="h-font" style={{ fontWeight:800, fontSize:"clamp(26px,3.2vw,44px)", color:"#0A0F1E", letterSpacing:"-.8px", lineHeight:1.1 }}>
              Noticias &<br/><span style={{ color:"#1549E8" }}>tendencias</span>
            </h2>
          </div>
          <button className="btn btn-o" style={{ fontSize:12, padding:"11px 24px" }}>
            Ver todos los artículos <i className="fa-solid fa-arrow-right" style={{ fontSize:10 }}/>
          </button>
        </div>
        <div className="grid-2">
          {POSTS.map((p, i) => <BlogCard key={p.title} p={p} i={i}/>)}
        </div>
      </div>
    </section>
  );
}
