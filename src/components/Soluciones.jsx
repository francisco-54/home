import { useState, useEffect } from "react";
import useReveal from "../hooks/useReveal.js";
import { SOLUTIONS } from "../data/solutions.js";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
const INTERVAL = 4200;

export default function Soluciones() {
  const [active,  setActive]  = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [prog,    setProg]    = useState(0);
  const rv = useReveal();
  const n  = SOLUTIONS.length;

  useEffect(() => {
    if (paused) return;
    setProg(0);
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      setProg(Math.min(elapsed / INTERVAL, 1));
      if (elapsed < INTERVAL) { raf = requestAnimationFrame(tick); }
      else { setActive(a => (a + 1) % n); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused, n]);

  const go   = (i) => { setActive(i); setProg(0); };
  const prev = () => go((active - 1 + n) % n);
  const next = () => go((active + 1) % n);

  return (
    <section
      id="soluciones"
      style={{ padding: "100px 0 80px", background: "#F0F2FA", overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Heading */}
      <div className="ctr">
        <div ref={rv} className="rv" style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="eyebrow eyebrow-b" style={{ marginBottom: 20, display: "inline-flex" }}>Servicios</span>
          <h2 className="h-font" style={{ fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", color: "#0A0F1E", letterSpacing: "-1px", lineHeight: 1.08 }}>
            Soluciones que toda<br/><span style={{ color: "#1549E8" }}>marca necesita.</span>
          </h2>
        </div>
      </div>

      {/* Slide wrapper — clips the sliding track */}
      <div style={{ overflow: "hidden" }}>
        {/* Track */}
        <div style={{
          display: "flex",
          transform: `translateX(calc(-${active * 100}%))`,
          transition: "transform .7s cubic-bezier(.16,1,.3,1)",
          willChange: "transform",
        }}>
          {SOLUTIONS.map((card) => (
            <Slide key={card.title} s={card} onCTA={() => scrollTo("contacto")}/>
          ))}
        </div>
      </div>

      {/* Controls row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        marginTop: 32,
        padding: "0 24px",
      }}>
        {/* Prev */}
        <button onClick={prev} style={arrowBtn}>
          <i className="fa-solid fa-chevron-left" style={{ fontSize: 12 }}/>
        </button>

        {/* Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {SOLUTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                position: "relative",
                width: i === active ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? `${SOLUTIONS[active].col}28` : "rgba(10,15,30,.12)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                overflow: "hidden",
                transition: "width .35s ease, background .35s ease",
              }}
            >
              {i === active && (
                <span style={{
                  position: "absolute", inset: 0,
                  background: SOLUTIONS[active].col,
                  borderRadius: 4,
                  transformOrigin: "left",
                  transform: `scaleX(${prog})`,
                  transition: prog === 0 ? "none" : "transform .05s linear",
                }}/>
              )}
            </button>
          ))}
        </div>

        {/* Slide counter */}
        <span className="h-font" style={{ fontSize: 11, color: "rgba(10,15,30,.35)", letterSpacing: 1.5, minWidth: 36 }}>
          {String(active + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(n).padStart(2, "0")}
        </span>

        {/* Next */}
        <button onClick={next} style={arrowBtn}>
          <i className="fa-solid fa-chevron-right" style={{ fontSize: 12 }}/>
        </button>
      </div>
    </section>
  );
}

/* ── Individual slide ── */
function Slide({ s, onCTA }) {
  return (
    <div style={{
      minWidth: "100%",
      padding: "0 max(20px, calc((100% - 1240px) / 2))",
      boxSizing: "border-box",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 8px 48px rgba(10,15,30,.10), 0 1px 0 rgba(10,15,30,.06)",
        height: "clamp(440px, 52vh, 560px)",
        background: "#fff",
      }}>
        {/* ── Left: image ── */}
        <div style={{ position: "relative", overflow: "hidden", height: "100%" }}>
          <img
            src={s.img} alt={s.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Color tint overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg,${s.col}55,transparent 60%)`,
          }}/>
          {/* Slide number stamp */}
          <div style={{
            position: "absolute", top: 20, left: 20,
            background: "rgba(0,0,0,.38)", backdropFilter: "blur(8px)",
            borderRadius: 8, padding: "4px 10px",
          }}>
            <span className="h-font" style={{ color: "#fff", fontSize: 11, letterSpacing: 1.5 }}>
              {String(SOLUTIONS.findIndex(x => x.title === s.title) + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Right: content ── */}
        <div style={{
          padding: "40px 48px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          background: "#fff",
        }}>
          {/* Accent top line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg,${s.col},${s.col}44)`,
          }}/>

          {/* Icon + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: `${s.col}12`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <i className={`fa-solid ${s.icon}`} style={{ color: s.col, fontSize: 20 }}/>
            </div>
            <h3 className="h-font" style={{ fontWeight: 800, fontSize: "clamp(20px,1.8vw,26px)", color: "#0A0F1E", letterSpacing: "-.5px", lineHeight: 1.1 }}>
              {s.title}
            </h3>
          </div>

          {/* Description */}
          <p style={{ color: "rgba(10,15,30,.55)", fontSize: 15, lineHeight: 1.8, marginBottom: 28, maxWidth: 380 }}>
            {s.desc}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
            {s.tags.map(t => (
              <span key={t} className="h-font" style={{
                fontWeight: 600, fontSize: 10, padding: "5px 14px",
                borderRadius: 100, background: `${s.col}0E`, color: s.col,
                letterSpacing: ".6px", textTransform: "uppercase",
                border: `1px solid ${s.col}22`,
              }}>{t}</span>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#EAEDF5", marginBottom: 28 }}/>

          {/* CTA */}
          <button
            onClick={onCTA}
            className="h-font"
            style={{
              alignSelf: "flex-start",
              display: "flex", alignItems: "center", gap: 8,
              padding: "11px 22px",
              borderRadius: 10,
              background: `${s.col}0E`,
              border: `1px solid ${s.col}30`,
              color: s.col,
              fontWeight: 700, fontSize: 13,
              cursor: "pointer",
              letterSpacing: ".3px",
              transition: "background .2s, gap .25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${s.col}18`; e.currentTarget.style.gap = "14px"; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${s.col}0E`; e.currentTarget.style.gap = "8px"; }}
          >
            Conocer más <i className="fa-solid fa-arrow-right" style={{ fontSize: 11 }}/>
          </button>
        </div>
      </div>
    </div>
  );
}

const arrowBtn = {
  width: 38, height: 38, borderRadius: "50%",
  background: "#fff",
  border: "1px solid rgba(10,15,30,.09)",
  color: "#0A0F1E",
  cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  boxShadow: "0 2px 12px rgba(0,0,0,.07)",
  flexShrink: 0,
  transition: "box-shadow .2s",
};
