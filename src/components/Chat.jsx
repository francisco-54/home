import { useState, useRef, useEffect } from "react";

const INITIAL = { from:"bot", text:"¡Hola! Soy el asistente de GCAB. ¿En qué puedo ayudarte?" };
const REPLY   = "Gracias por contactarnos. Un asesor se comunicará contigo a la brevedad. También puedes llamarnos al +52 55 2469 7657.";

export default function Chat() {
  const [open,  setOpen]  = useState(false);
  const [input, setInput] = useState("");
  const [msgs,  setMsgs]  = useState([INITIAL]);
  const bottom = useRef(null);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const send = () => {
    if (!input.trim()) return;
    const txt = input.trim(); setInput("");
    setMsgs(m => [...m, { from:"user", text:txt }]);
    setTimeout(() => setMsgs(m => [...m, { from:"bot", text:REPLY }]), 900);
  };

  return (
    <div style={{ position:"fixed", bottom:28, right:28, zIndex:200 }}>
      {/* Panel */}
      {open && (
        <div style={{ position:"absolute", bottom:72, right:0, width:320, background:"#fff", borderRadius:24, overflow:"hidden", boxShadow:"0 24px 80px rgba(10,15,30,.2), 0 0 0 1px rgba(10,15,30,.06)", animation:"fadeUp .25s cubic-bezier(.16,1,.3,1)" }}>
          {/* Header */}
          <div style={{ background:"#0A0F1E", padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:34, height:34, borderRadius:10, background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.1)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className="fa-solid fa-robot" style={{ color:"rgba(255,255,255,.7)", fontSize:13 }}/>
              </div>
              <div>
                <div className="h-font" style={{ fontWeight:600, color:"#fff", fontSize:13 }}>Asistente GCAB</div>
                <div style={{ color:"rgba(255,255,255,.35)", fontSize:11, display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80" }}/>En línea
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ border:"none", background:"transparent", color:"rgba(255,255,255,.4)", cursor:"pointer", transition:"color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color="#fff"}
              onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,.4)"}>
              <i className="fa-solid fa-xmark" style={{ fontSize:16 }}/>
            </button>
          </div>

          {/* Messages */}
          <div style={{ height:240, overflowY:"auto", padding:16, background:"#F7F8FC", display:"flex", flexDirection:"column", gap:10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display:"flex", justifyContent: m.from==="user"?"flex-end":"flex-start" }}>
                <div style={{ maxWidth:"84%", padding:"10px 14px", borderRadius: m.from==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px", background: m.from==="user"?"#1549E8":"#fff", color: m.from==="user"?"#fff":"#0A0F1E", fontSize:13, lineHeight:1.6, boxShadow:"0 2px 8px rgba(10,15,30,.06)" }}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottom}/>
          </div>

          {/* Input */}
          <div style={{ display:"flex", gap:8, padding:"12px 14px", background:"#fff", borderTop:"1px solid #EAEDF5" }}>
            <input
              value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter"&&send()}
              placeholder="Escribe tu pregunta…"
              style={{ flex:1, fontSize:13, borderRadius:100, padding:"10px 16px", border:"1px solid #EAEDF5", outline:"none", background:"#F7F8FC", fontFamily:"'DM Sans',sans-serif", color:"#0A0F1E" }}
            />
            <button onClick={send} style={{ width:36, height:36, borderRadius:"50%", background:"#1549E8", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background .2s" }}
              onMouseEnter={e => e.currentTarget.style.background="#0f3dc7"}
              onMouseLeave={e => e.currentTarget.style.background="#1549E8"}>
              <i className="fa-solid fa-paper-plane" style={{ color:"#fff", fontSize:11 }}/>
            </button>
          </div>
        </div>
      )}

      {/* Toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width:52, height:52, borderRadius:"50%", background: open ? "#0A0F1E" : "#1549E8", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 32px rgba(21,73,232,.4)", animation: open ? "none" : "pulse 3s ease-in-out infinite", transition:"background .25s, transform .25s" }}
        onMouseEnter={e => e.currentTarget.style.transform="scale(1.06)"}
        onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
      >
        <i className={`fa-solid ${open?"fa-xmark":"fa-comment-dots"}`} style={{ color:"#fff", fontSize:18 }}/>
      </button>
    </div>
  );
}
