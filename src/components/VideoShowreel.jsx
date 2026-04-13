import { useState, useRef, useEffect, useCallback } from "react";
import useReveal from "../hooks/useReveal.js";
import { IMG, VID } from "../assets/media.js";

/* ── helpers ── */
const fmt = (s) => {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = String(Math.floor(s % 60)).padStart(2, "0");
  return `${m}:${sec}`;
};

export default function VideoShowreel() {
  const [playing, setPlaying]     = useState(false);
  const [paused,  setPaused]      = useState(false);
  const [errored, setErrored]     = useState(false);
  const [progress, setProgress]   = useState(0);
  const [duration, setDuration]   = useState(0);
  const [muted,   setMuted]       = useState(false);
  const [volume,  setVolume]      = useState(1);
  const [ctrlVis, setCtrlVis]     = useState(true);
  const videoRef  = useRef(null);
  const timerRef  = useRef(null);
  const rv        = useReveal();

  const showPoster = !playing || errored;

  /* hide controls after 2.5 s of inactivity while playing */
  const resetHide = useCallback(() => {
    setCtrlVis(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCtrlVis(false), 2500);
  }, []);

  useEffect(() => { if (playing && !paused) resetHide(); }, [playing, paused, resetHide]);
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handlePlay = () => {
    setPlaying(true);
    setPaused(false);
    setTimeout(() => {
      if (videoRef.current) videoRef.current.play().catch(() => setErrored(true));
    }, 80);
  };

  const togglePause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPaused(false); resetHide(); }
    else          { v.pause(); setPaused(true); setCtrlVis(true); clearTimeout(timerRef.current); }
  };

  const seek = (e) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * duration;
    setProgress(ratio);
    resetHide();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    if (muted) v.volume = volume || 1; // restore volume on unmute
    setMuted(m => !m);
    resetHide();
  };

  const changeVolume = (e) => {
    const val = parseFloat(e.target.value);
    const v = videoRef.current;
    if (!v) return;
    // Keep volume > 0 stored so mute-button can restore it
    if (val > 0) setVolume(val);
    v.volume = val;
    v.muted  = val === 0;
    setMuted(val === 0);
    resetHide();
  };

  const goFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress(v.currentTime / v.duration);
  };

  return (
    <section style={{ background: "#0A0F1E", position: "relative", overflow: "hidden" }}>
      <div
        ref={rv}
        className="rv-sc"
        style={{ position: "relative", minHeight: "72vh", display: "flex", alignItems: "center", justifyContent: "center" }}
        onMouseMove={playing && !paused ? resetHide : undefined}
      >
        {/* ── Background poster (always) ── */}
        <img
          src={IMG.showreel} alt=""
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover",
            filter: playing ? "brightness(.12) saturate(0) blur(2px)" : "brightness(.25) saturate(0)",
            transition: "filter .6s ease",
          }}
        />

        {/* ── Grid overlay (poster only) ── */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: showPoster ? .04 : 0, transition: "opacity .6s" }}>
          <defs>
            <pattern id="g" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth=".5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)"/>
        </svg>

        {/* ── Poster content ── */}
        {showPoster && (
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 32, textAlign: "center", padding: "80px 5%" }}>
            <span className="eyebrow eyebrow-w">Tour de instalaciones</span>

            <h2 className="h-font" style={{ fontWeight: 800, fontSize: "clamp(30px,4.5vw,60px)", color: "#fff", lineHeight: 1.08, letterSpacing: "-1.2px", maxWidth: 580 }}>
              Así fabricamos tu<br/><span style={{ color: "#0EA5E9" }}>próximo producto</span>
            </h2>

            <p style={{ color: "rgba(255,255,255,.42)", fontSize: 15, maxWidth: 440, lineHeight: 1.8 }}>
              Tres plantas certificadas, tecnología de vanguardia y procesos GMP que garantizan la calidad que tu marca merece.
            </p>

            <button className="play-btn" onClick={handlePlay} title="Reproducir">
              <i className="fa-solid fa-play" style={{ color: "#fff", fontSize: 20, marginLeft: 4 }}/>
            </button>

            <span className="h-font" style={{ color: "rgba(255,255,255,.28)", fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase" }}>
              Reproducir showreel
            </span>
          </div>
        )}

        {/* ── Styled video player ── */}
        {playing && !errored && (
          <div
            onClick={togglePause}
            style={{
              position: "relative",
              zIndex: 3,
              width: "min(1100px, 92vw)",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(14,165,233,.35), 0 0 60px rgba(14,165,233,.18), 0 32px 80px rgba(0,0,0,.7)",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {/* Corner accents */}
            {[
              { top: 0,    left: 0,    borderTop: "2px solid #0EA5E9", borderLeft: "2px solid #0EA5E9" },
              { top: 0,    right: 0,   borderTop: "2px solid #0EA5E9", borderRight: "2px solid #0EA5E9" },
              { bottom: 0, left: 0,    borderBottom: "2px solid #0EA5E9", borderLeft: "2px solid #0EA5E9" },
              { bottom: 0, right: 0,   borderBottom: "2px solid #0EA5E9", borderRight: "2px solid #0EA5E9" },
            ].map((s, i) => (
              <div key={i} style={{ position: "absolute", zIndex: 2, width: 20, height: 20, borderRadius: 2, ...s, pointerEvents: "none" }}/>
            ))}

            {/* Video element */}
            <video
              ref={videoRef}
              style={{ display: "block", width: "100%", aspectRatio: "16/9", background: "#000" }}
              onError={() => { setErrored(true); setPlaying(false); }}
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
              onEnded={() => { setPlaying(false); setProgress(0); }}
              muted={muted}
              playsInline
            >
              <source src={VID.showreel} type="video/mp4"/>
            </video>

            {/* ── Custom controls bar ── */}
            <div
              onClick={e => e.stopPropagation()}
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "28px 18px 14px",
                background: "linear-gradient(transparent, rgba(5,10,25,.92))",
                display: "flex", flexDirection: "column", gap: 8,
                transition: "opacity .3s ease, transform .3s ease",
                opacity: ctrlVis ? 1 : 0,
                transform: ctrlVis ? "translateY(0)" : "translateY(6px)",
                pointerEvents: ctrlVis ? "auto" : "none",
              }}
            >
              {/* Progress bar */}
              <div
                onClick={seek}
                style={{
                  height: 4, borderRadius: 2, background: "rgba(255,255,255,.15)",
                  cursor: "pointer", position: "relative", overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0,
                  width: `${progress * 100}%`,
                  background: "linear-gradient(90deg,#0284C7,#0EA5E9)",
                  borderRadius: 2, transition: "width .15s linear",
                }}/>
              </div>

              {/* Buttons row */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Play/Pause */}
                <button onClick={togglePause} style={btnStyle}>
                  <i className={`fa-solid fa-${paused ? "play" : "pause"}`} style={{ fontSize: 13, marginLeft: paused ? 2 : 0 }}/>
                </button>

                {/* Mute */}
                <button onClick={toggleMute} style={btnStyle}>
                  <i className={`fa-solid fa-volume-${muted || volume === 0 ? "xmark" : volume < 0.5 ? "low" : "high"}`} style={{ fontSize: 13 }}/>
                </button>

                {/* Volume slider */}
                <input
                  type="range"
                  className="vol-slider"
                  min="0" max="1" step="0.02"
                  value={muted ? 0 : volume}
                  onChange={changeVolume}
                  onClick={e => e.stopPropagation()}
                />

                {/* Time */}
                <span style={{ color: "rgba(255,255,255,.55)", fontSize: 11, fontFamily: "monospace", letterSpacing: .5, marginLeft: 4 }}>
                  {fmt(duration * progress)} / {fmt(duration)}
                </span>

                {/* Spacer */}
                <div style={{ flex: 1 }}/>

                {/* Fullscreen */}
                <button onClick={goFullscreen} style={btnStyle}>
                  <i className="fa-solid fa-expand" style={{ fontSize: 13 }}/>
                </button>

                {/* Close */}
                <button
                  onClick={() => { setPlaying(false); setProgress(0); if (videoRef.current) videoRef.current.pause(); }}
                  style={{ ...btnStyle, opacity: .5 }}
                  title="Cerrar"
                >
                  <i className="fa-solid fa-xmark" style={{ fontSize: 14 }}/>
                </button>
              </div>
            </div>

            {/* Center play/pause indicator flash */}
            {paused && (
              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                display: "flex", alignItems: "center", justifyContent: "center",
                pointerEvents: "none",
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "rgba(10,15,30,.65)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(14,165,233,.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <i className="fa-solid fa-play" style={{ color: "#fff", fontSize: 22, marginLeft: 4 }}/>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Side vignettes */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 160, background: "linear-gradient(90deg,rgba(10,15,30,.7),transparent)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 160, background: "linear-gradient(-90deg,rgba(10,15,30,.7),transparent)", pointerEvents: "none" }}/>
      </div>
    </section>
  );
}

const btnStyle = {
  width: 32, height: 32, borderRadius: 6,
  background: "rgba(255,255,255,.08)",
  border: "1px solid rgba(255,255,255,.12)",
  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", flexShrink: 0,
  transition: "background .2s, border-color .2s",
};
