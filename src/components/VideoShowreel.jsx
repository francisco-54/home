import { useState, useRef } from "react";
import useReveal from "../hooks/useReveal.js";
import { IMG, VID } from "../assets/media.js";

export default function VideoShowreel() {
  const [playing, setPlaying] = useState(false);
  const [errored, setErrored] = useState(false);
  const videoRef = useRef(null);
  const rv = useReveal();

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => {
      if (videoRef.current) videoRef.current.play().catch(() => setErrored(true));
    }, 80);
  };

  const showPoster = !playing || errored;

  return (
    <section style={{ background:"#0A0F1E", position:"relative", overflow:"hidden" }}>
      <div ref={rv} className="rv-sc" style={{ position:"relative", minHeight:"72vh", display:"flex", alignItems:"center", justifyContent:"center" }}>

        {showPoster ? (
          <img
            src={IMG.showreel} alt="GCAB Instalaciones"
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(.25) saturate(0)" }}
          />
        ) : (
          <video ref={videoRef} controls onError={() => { setErrored(true); setPlaying(false); }}
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}>
            <source src={VID.showreel} type="video/mp4"/>
          </video>
        )}

        {/* Subtle grid overlay on poster */}
        {showPoster && (
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.04 }}>
            <defs>
              <pattern id="g" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth=".5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g)"/>
          </svg>
        )}

        {showPoster && (
          <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", gap:32, textAlign:"center", padding:"80px 5%" }}>
            <span className="eyebrow eyebrow-w">Tour de instalaciones</span>

            <h2 className="h-font" style={{ fontWeight:800, fontSize:"clamp(30px,4.5vw,60px)", color:"#fff", lineHeight:1.08, letterSpacing:"-1.2px", maxWidth:580 }}>
              Así fabricamos tu<br/><span style={{ color:"#0EA5E9" }}>próximo producto</span>
            </h2>

            <p style={{ color:"rgba(255,255,255,.42)", fontSize:15, maxWidth:440, lineHeight:1.8 }}>
              Tres plantas certificadas, tecnología de vanguardia y procesos GMP que garantizan la calidad que tu marca merece.
            </p>

            <button className="play-btn" onClick={handlePlay} title="Reproducir">
              <i className="fa-solid fa-play" style={{ color:"#fff", fontSize:20, marginLeft:4 }}/>
            </button>

            <span className="h-font" style={{ color:"rgba(255,255,255,.28)", fontSize:10, letterSpacing:2.5, textTransform:"uppercase" }}>
              Reproducir showreel
            </span>
          </div>
        )}

        {/* Side vignettes */}
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:160, background:"linear-gradient(90deg,rgba(10,15,30,.7),transparent)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", right:0, top:0, bottom:0, width:160, background:"linear-gradient(-90deg,rgba(10,15,30,.7),transparent)", pointerEvents:"none" }}/>
      </div>
    </section>
  );
}
