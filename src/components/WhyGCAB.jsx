import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG } from "../assets/media.js";

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  ["fa-shield-halved", "Cumplimiento normativo riguroso desde la primera formulación hasta el registro sanitario final."],
  ["fa-atom",          "Más de 500 insumos activos con trazabilidad completa y certificaciones vigentes en cada lote."],
  ["fa-industry",      "Tres plantas de fabricación certificadas con tecnología de vanguardia y procesos GMP."],
  ["fa-handshake",     "Asesoría integral en regulación sanitaria nacional e internacional para tu marca."],
];

const IMAGES = [
  { src: IMG.scientist,  label: "Laboratorio de I+D" },
  { src: IMG.factory,    label: "Planta de manufactura" },
  { src: IMG.pills,      label: "Control de calidad" },
  { src: IMG.lab2,       label: "Formulación científica" },
  { src: IMG.herbs,      label: "Insumos certificados" },
];

const INTERVAL = 3800; // ms por imagen

export default function WhyGCAB() {
  const [active, setActive]   = useState(0);
  const imgRefs   = useRef([]);
  const labelRef  = useRef(null);
  const textRef   = useRef(null);
  const timerRef  = useRef(null);

  /* ── reveal texto al entrar en pantalla ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: .8, ease: "power2.out",
          scrollTrigger: { trigger: textRef.current, start: "top 75%", toggleActions: "play none none reverse" } }
      );
    });
    return () => ctx.revert();
  }, []);

  /* ── ciclo automático ── */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, []);

  /* ── crossfade con GSAP cuando cambia active ── */
  useEffect(() => {
    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) {
        gsap.to(el, { opacity: 1, scale: 1,    duration: .85, ease: "power2.inOut" });
      } else {
        gsap.to(el, { opacity: 0, scale: 1.06, duration: .85, ease: "power2.inOut" });
      }
    });
    /* label fade */
    if (labelRef.current) {
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: .5, ease: "power2.out" }
      );
    }
  }, [active]);

  function goTo(i) {
    clearInterval(timerRef.current);
    setActive(i);
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % IMAGES.length);
    }, INTERVAL);
  }

  return (
    <section id="porque" style={{ padding: "120px 0", background: "#F7F8FC", overflow: "hidden" }}>
      <div className="ctr">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center" }}>

          {/* ══ LEFT — texto ══ */}
          <div ref={textRef}>
            <span className="eyebrow eyebrow-b" style={{ marginBottom: 28, display: "inline-flex" }}>¿Por qué GCAB?</span>

            <h2 className="h-font" style={{ fontWeight: 800, fontSize: "clamp(28px,3.5vw,46px)", color: "#0A0F1E", lineHeight: 1.15, marginBottom: 24, letterSpacing: "-.5px" }}>
              Donde la <span style={{ color: "#1549E8" }}>ciencia</span><br />y la precisión<br />crean resultados reales.
            </h2>

            <p style={{ color: "rgba(10,15,30,.55)", fontSize: 16, lineHeight: 1.85, marginBottom: 36 }}>
              En GCAB Company nos especializamos en el suministro de ingredientes premium y el desarrollo de soluciones personalizadas que impulsan el éxito de tu marca.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 40 }}>
              {POINTS.map(([icon, text], i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "18px 0", borderBottom: i < POINTS.length - 1 ? "1px solid #EAEDF5" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "#EEF3FD", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <i className={`fa-solid ${icon}`} style={{ color: "#1549E8", fontSize: 12 }} />
                  </div>
                  <span style={{ color: "rgba(10,15,30,.6)", fontSize: 14, lineHeight: 1.7 }}>{text}</span>
                </div>
              ))}
            </div>

            <button
              className="btn btn-p"
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            >
              Háblanos de tu proyecto <i className="fa-solid fa-arrow-right" style={{ fontSize: 11 }} />
            </button>
          </div>

          {/* ══ RIGHT — galería auto-slide ══ */}
          <div style={{ position: "relative" }}>

            {/* frame principal */}
            <div style={{ position: "relative", borderRadius: 28, overflow: "hidden", aspectRatio: "4/5", boxShadow: "0 40px 100px rgba(10,15,30,.16)" }}>

              {/* imágenes apiladas */}
              {IMAGES.map((img, i) => (
                <img
                  key={img.src}
                  ref={(el) => (imgRefs.current[i] = el)}
                  src={img.src}
                  alt={img.label}
                  style={{
                    position : "absolute",
                    inset    : 0,
                    width    : "100%",
                    height   : "100%",
                    objectFit: "cover",
                    opacity  : i === 0 ? 1 : 0,
                    transform: `scale(${i === 0 ? 1 : 1.06})`,
                    willChange: "opacity, transform",
                  }}
                />
              ))}

              {/* degradado inferior */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,15,30,.55) 0%, rgba(10,15,30,.1) 40%, transparent 65%)", pointerEvents: "none" }} />

              {/* label de imagen */}
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <span
                  ref={labelRef}
                  className="h-font"
                  style={{ color: "rgba(255,255,255,.85)", fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}
                >
                  {IMAGES[active].label}
                </span>

                {/* indicadores / dots */}
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      style={{
                        width        : i === active ? 20 : 6,
                        height       : 6,
                        borderRadius : 3,
                        background   : i === active ? "#fff" : "rgba(255,255,255,.4)",
                        border       : "none",
                        cursor       : "pointer",
                        padding      : 0,
                        transition   : "width .35s cubic-bezier(.16,1,.3,1), background .35s",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* badge flotante */}
            <div style={{ position: "absolute", bottom: -20, left: -20, background: "#fff", borderRadius: 20, padding: "18px 22px", boxShadow: "0 20px 60px rgba(10,15,30,.12)", animation: "floatY 5s ease-in-out infinite", display: "flex", alignItems: "center", gap: 16, zIndex: 2 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "#EEF3FD", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="fa-solid fa-award" style={{ color: "#1549E8", fontSize: 18 }} />
              </div>
              <div>
                <div className="h-font" style={{ fontWeight: 700, fontSize: 15, color: "#0A0F1E" }}>ISO 9001</div>
                <div style={{ color: "rgba(10,15,30,.45)", fontSize: 12 }}>Certificación vigente</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
