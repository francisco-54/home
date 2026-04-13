import { VID } from "../assets/media.js";

/* Dot-grid SVG pattern */
const DotPattern = () => (
  <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.07 }}
    xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="#fff"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)"/>
  </svg>
);

export default function Hero() {
  return (
    <section id="hero" style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", overflow:"hidden", paddingTop:76 }}>
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
  <video
    autoPlay
    loop
    muted
    playsInline
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  >
    <source src={VID.hero} type="video/mp4" />
  </video>
  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(4,17,47,.45) 0%,rgba(4,17,47,.25) 55%,rgba(4,17,47,.1) 100%)" }} />
</div>

      {/* Thin accent line — animada */}
      <div style={{ position:"absolute", top:0, left:"48px", width:"1px", height:"100%", background:"linear-gradient(to bottom,transparent,rgba(21,73,232,.5) 30%,rgba(21,73,232,.5) 70%,transparent)", animation:"growY 1.8s cubic-bezier(.16,1,.3,1) both", animationDelay:".3s" }}/>

      {/* Rotating ring decoration */}
      {[200,320].map((r,i) => (
        <div key={i} style={{ position:"absolute", right:"12%", top:"50%", width:r, height:r, marginTop:-r/2, borderRadius:"50%", border:`1px solid rgba(255,255,255,${.04-i*.01})`, animation:`spinSlow ${30+i*15}s linear infinite` }}/>
      ))}


      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:40, left:"48px", display:"flex", alignItems:"center", gap:16, zIndex:1, animation:"fadeIn 1s .8s both" }}>
        <div style={{ width:1, height:56, background:"rgba(255,255,255,.2)", animation:"growY 1s cubic-bezier(.16,1,.3,1) .8s both", transformOrigin:"top" }}/>
        <span className="h-font" style={{ color:"rgba(255,255,255,.28)", fontSize:10, letterSpacing:3, textTransform:"uppercase", writingMode:"vertical-lr" }}>Scroll</span>
      </div>
    </section>
  );
}
