"use client";

interface Props {
  playing: boolean;
  answered: boolean;
  correct: boolean;
  revealIcon: string;
  onClick: () => void;
}

export default function MysteryBox({ playing, answered, correct, revealIcon, onClick }: Props) {
  const cushFill = playing && !answered ? "#7ecfb8"
                 : answered && correct  ? "#4db89c"
                 : "#d4ede5";

  return (
    <button
      onClick={onClick}
      aria-label="Play mystery sound"
      className="flex flex-col items-center"
      style={{ background: "none", border: "none", padding: 0,
               cursor: answered ? "default" : "pointer" }}
    >
      <div style={{
        position: "relative", width: 160,
        animation: playing && !answered
          ? "bobble 1.8s ease-in-out infinite"
          : answered && correct
          ? "bobble 3s ease-in-out infinite"
          : "none",
      }}>

        {/* floating music notes while playing */}
        {playing && !answered && <>
          <span style={{ position:"absolute", top:18, left:6,  fontSize:17, color:"#4db89c",
            animation:"floatNote 2.4s 0s ease-out infinite",    pointerEvents:"none" }}>♪</span>
          <span style={{ position:"absolute", top:30, right:8, fontSize:14, color:"#33a082",
            animation:"floatNote 2.4s 0.8s ease-out infinite",  pointerEvents:"none" }}>♫</span>
          <span style={{ position:"absolute", top:8,  left:"44%", fontSize:12, color:"#4db89c",
            animation:"floatNote 2.4s 1.6s ease-out infinite",  pointerEvents:"none" }}>♩</span>
        </>}

        <svg width="160" height="150" viewBox="0 0 160 150">
          <defs>
            {/* warm cream gradient for cup body — matches room illustration */}
            <radialGradient id="cupBody" cx="32%" cy="28%">
              <stop offset="0%"   stopColor="#fdf4e4"/>
              <stop offset="60%"  stopColor="#eddfc4"/>
              <stop offset="100%" stopColor="#d8c8a8"/>
            </radialGradient>
            {/* subtle inner shadow for depth */}
            <radialGradient id="cupShadow" cx="65%" cy="70%">
              <stop offset="0%"   stopColor="rgba(120,90,60,0)"/>
              <stop offset="100%" stopColor="rgba(120,90,60,0.18)"/>
            </radialGradient>
          </defs>

          {/* headband */}
          <path d="M 26 92 C 26 22 134 22 134 92"
            stroke="#a08868" strokeWidth="10" fill="none" strokeLinecap="round"/>
          {/* headband shine */}
          <path d="M 29 92 C 29 30 131 30 131 92"
            stroke="rgba(255,248,235,0.5)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>

          {/* ── LEFT cup ── */}
          <rect x="3"  y="78" width="42" height="62" rx="17" fill="url(#cupBody)"/>
          <rect x="3"  y="78" width="42" height="62" rx="17" fill="url(#cupShadow)"/>
          <rect x="3"  y="78" width="42" height="62" rx="17"
            fill="none" stroke="#a08868" strokeWidth="2.5"/>
          {/* left highlight */}
          <rect x="9"  y="85" width="13" height="18" rx="6.5"
            fill="rgba(255,255,255,0.52)"/>
          {/* left cushion */}
          <rect x="9"  y="87" width="30" height="44" rx="12"
            fill={cushFill} style={{ transition: "fill 0.5s" }}/>
          <rect x="9"  y="87" width="30" height="44" rx="12"
            fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>

          {/* ── RIGHT cup ── */}
          <rect x="115" y="78" width="42" height="62" rx="17" fill="url(#cupBody)"/>
          <rect x="115" y="78" width="42" height="62" rx="17" fill="url(#cupShadow)"/>
          <rect x="115" y="78" width="42" height="62" rx="17"
            fill="none" stroke="#a08868" strokeWidth="2.5"/>
          {/* right highlight */}
          <rect x="121" y="85" width="13" height="18" rx="6.5"
            fill="rgba(255,255,255,0.52)"/>
          {/* right cushion */}
          <rect x="121" y="87" width="30" height="44" rx="12"
            fill={cushFill} style={{ transition: "fill 0.5s" }}/>
          <rect x="121" y="87" width="30" height="44" rx="12"
            fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>

          {/* sparkle stars on correct */}
          {answered && correct && <>
            <text x="24"  y="118" fontSize="13" textAnchor="middle" fill="#4db89c">✦</text>
            <text x="136" y="118" fontSize="13" textAnchor="middle" fill="#4db89c">✦</text>
            <text x="80"  y="148" fontSize="10" textAnchor="middle" fill="#4db89c" opacity="0.6">✦</text>
          </>}
        </svg>

        {/* reveal icon floats up in the centre gap */}
        {answered && (
          <div style={{
            position: "absolute", top: "60px", left: "50%",
            transform: "translateX(-50%)",
            animation: "floatUp 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards",
            fontSize: 42, lineHeight: 1, pointerEvents: "none",
          }}>
            {revealIcon}
          </div>
        )}

        {/* soft glow halo when playing */}
        {playing && !answered && (
          <div style={{
            position: "absolute", inset: "-12px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(77,184,156,0.18) 0%, transparent 68%)",
            animation: "boxGlow 1.8s ease-in-out infinite",
            pointerEvents: "none",
          }} />
        )}

        <div style={{ width: 120, height: 9, margin: "4px auto 0",
          borderRadius: "50%", background: "rgba(120,90,60,0.12)", filter: "blur(6px)" }} />
      </div>

      <span className="mt-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
        style={{ color: playing && !answered ? "#33a082" : "#8a7060" }}>
        {answered ? "Revealed" : playing ? "Playing…" : "Tap to play ▶"}
      </span>
    </button>
  );
}
