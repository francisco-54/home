import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INSUMOS } from "../data/insumos.js";

gsap.registerPlugin(ScrollTrigger);

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Insumos() {
  const colRef    = useRef(null);   // left column
  const svgRef    = useRef(null);
  const bgPathRef = useRef(null);   // grey track
  const fgPathRef = useRef(null);   // animated blue line
  const dotRefs   = useRef([]);
  const itemRefs  = useRef([]);
  const imgRefs   = useRef([]);

  /* ── build SVG path after layout ── */
  useEffect(() => {
    function build() {
      const col = colRef.current;
      const svg = svgRef.current;
      if (!col || !svg) return;

      const colRect  = col.getBoundingClientRect();
      const colH     = col.scrollHeight;
      const svgW     = colRect.width;

      svg.setAttribute("viewBox", `0 0 ${svgW} ${colH}`);
      svg.setAttribute("width",   svgW);
      svg.setAttribute("height",  colH);

      /* collect circle centers relative to col */
      const pts = dotRefs.current.map((el) => {
        if (!el) return null;
        const r  = el.getBoundingClientRect();
        const cr = col.getBoundingClientRect();
        return {
          x: r.left - cr.left + r.width  / 2,
          y: r.top  - cr.top  + r.height / 2 + col.scrollTop,
        };
      }).filter(Boolean);

      if (pts.length < 2) return;

      /* cubic-bezier S-curve through all points */
      let d = `M ${pts[0].x} ${pts[0].y}`;
      pts.forEach((p, i) => {
        if (i === 0) return;
        const prev  = pts[i - 1];
        const midY  = (prev.y + p.y) / 2;
        const flip  = i % 2 === 0 ? -28 : 28;
        d += ` C ${prev.x + flip} ${midY}, ${p.x + flip} ${midY}, ${p.x} ${p.y}`;
      });

      bgPathRef.current.setAttribute("d", d);
      fgPathRef.current.setAttribute("d", d);

      /* ── animate fg path draw ── */
      const len = fgPathRef.current.getTotalLength();
      gsap.set(fgPathRef.current, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(fgPathRef.current, {
        strokeDashoffset : 0,
        ease             : "none",
        scrollTrigger    : {
          trigger : col,
          start   : "top 65%",
          end     : "bottom 70%",
          scrub   : 0.8,
        },
      });

      /* ── dot pop-in ── */
      dotRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: .45, ease: "back.out(2)",
            scrollTrigger: {
              trigger      : el,
              start        : "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /* ── item slide-in ── */
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, x: -28 },
          {
            opacity: 1, x: 0, duration: .6, ease: "power2.out",
            delay  : .1,
            scrollTrigger: {
              trigger      : el,
              start        : "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );

        /* image crossfade */
        ScrollTrigger.create({
          trigger    : el,
          start      : "top center",
          end        : "bottom center",
          onEnter    : () => swapImg(i),
          onEnterBack: () => swapImg(i),
        });
      });
    }

    /* run after first paint */
    const raf = requestAnimationFrame(build);
    window.addEventListener("resize", build);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", build); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  function swapImg(active) {
    imgRefs.current.forEach((img, i) => {
      if (!img) return;
      gsap.to(img, { opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06, duration: .55, ease: "power2.inOut" });
    });
  }

  return (
    <section id="insumos" style={{ background: "#fff", paddingBottom: 140 }}>

      {/* ── Header ── */}
      <div className="ctr" style={{ paddingTop: 120, paddingBottom: 72 }}>
        <span className="eyebrow eyebrow-b" style={{ marginBottom: 20, display: "inline-flex" }}>
          Nuestro Proceso
        </span>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, paddingBottom: 48, borderBottom: "1px solid #EAEDF5" }}>
          <h2 className="h-font" style={{ fontWeight: 800, fontSize: "clamp(28px,3.8vw,48px)", color: "#0A0F1E", lineHeight: 1.1, letterSpacing: "-.8px", maxWidth: 560 }}>
            ¿Cómo es nuestro<br /><span style={{ color: "#1549E8" }}>proceso full service?</span>
          </h2>
          <p style={{ color: "rgba(10,15,30,.5)", fontSize: 15, lineHeight: 1.8, maxWidth: 360 }}>
            Acompañamos cada etapa de tu proyecto con experiencia técnica, cumplimiento normativo y manufactura de excelencia.
          </p>
        </div>
      </div>

      {/* ── Body: stepper + sticky image ── */}
      <div className="ctr">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 80 }}>

          {/* ══ LEFT — stepper ══ */}
          <div ref={colRef} style={{ flex: "1 1 55%", minWidth: 0, position: "relative", paddingTop: 16 }}>

            {/* SVG track */}
            <svg
              ref={svgRef}
              style={{ position: "absolute", top: 0, left: 0, overflow: "visible", pointerEvents: "none" }}
            >
              {/* grey background track */}
              <path
                ref={bgPathRef}
                fill="none"
                stroke="#EAEDF5"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* animated blue line */}
              <path
                ref={fgPathRef}
                fill="none"
                stroke="#1549E8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* Steps */}
            {INSUMOS.map((ins, i) => (
              <div
                key={ins.name}
                style={{ display: "flex", gap: 28, paddingBottom: i < INSUMOS.length - 1 ? 88 : 0, alignItems: "flex-start" }}
              >
                {/* circle dot */}
                <div
                  ref={(el) => (dotRefs.current[i] = el)}
                  style={{
                    flexShrink     : 0,
                    width          : 48,
                    height         : 48,
                    borderRadius   : "50%",
                    background     : `${ins.col}14`,
                    border         : `2px solid ${ins.col}40`,
                    display        : "flex",
                    alignItems     : "center",
                    justifyContent : "center",
                    position       : "relative",
                    zIndex         : 1,
                  }}
                >
                  <i className={`fa-solid ${ins.icon}`} style={{ color: ins.col, fontSize: 16 }} />
                </div>

                {/* content */}
                <div ref={(el) => (itemRefs.current[i] = el)} style={{ paddingTop: 8 }}>

                  {/* step label */}
                  <span
                    className="h-font"
                    style={{ display: "inline-flex", fontSize: 10, fontWeight: 700, color: ins.col, letterSpacing: 2, textTransform: "uppercase", padding: "4px 12px", borderRadius: 100, background: `${ins.col}12`, marginBottom: 14 }}
                  >
                    {String(i + 1).padStart(2, "0")} · {ins.sub}
                  </span>

                  <h3
                    className="h-font"
                    style={{ fontWeight: 800, fontSize: "clamp(18px,1.8vw,24px)", color: "#0A0F1E", letterSpacing: "-.3px", lineHeight: 1.2, marginBottom: 14 }}
                  >
                    {ins.name}
                  </h3>

                  <p style={{ color: "rgba(10,15,30,.55)", fontSize: 14.5, lineHeight: 1.85, maxWidth: 400, marginBottom: 24 }}>
                    {ins.desc}
                  </p>

                  <button
                    onClick={() => scrollTo("contacto")}
                    className="h-font"
                    style={{ color: ins.col, background: "none", border: `1.5px solid ${ins.col}35`, borderRadius: 100, cursor: "pointer", padding: "9px 20px", fontWeight: 600, fontSize: 12, display: "inline-flex", alignItems: "center", gap: 8, letterSpacing: ".5px", transition: "background .2s, gap .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${ins.col}10`; e.currentTarget.style.gap = "14px"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.gap = "8px"; }}
                  >
                    Solicitar muestra <i className="fa-solid fa-arrow-right" style={{ fontSize: 10 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ══ RIGHT — sticky image ══ */}
          <div style={{ flex: "1 1 45%", position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", borderRadius: 24, overflow: "hidden", boxShadow: "0 32px 80px rgba(10,15,30,.13)" }}>
              {INSUMOS.map((ins, i) => (
                <img
                  key={ins.name}
                  ref={(el) => (imgRefs.current[i] = el)}
                  src={ins.img}
                  alt={ins.name}
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
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,15,30,.32) 0%, transparent 50%)", pointerEvents: "none" }} />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
