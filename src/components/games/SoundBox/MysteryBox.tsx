"use client";

interface Props {
  playing: boolean;
  answered: boolean;
  correct: boolean;
  revealIcon: string;
  onClick: () => void;
}

export default function MysteryBox({ playing, answered, correct, revealIcon, onClick }: Props) {
  const cupColor    = playing && !answered ? "#4db89c" : answered && correct ? "#4db89c" : "#b2e4d4";
  const bandColor   = playing && !answered ? "#33a082" : answered ? "#4db89c" : "#c8e6d8";
  const fillOpacity = playing && !answered ? 0.22 : 0.12;

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
        animation:
          playing && !answered
            ? "boxShake 0.45s ease-in-out infinite, boxGlow 1.6s ease-in-out infinite"
            : answered && correct
            ? "boxGlow 2s ease-in-out infinite"
            : "none",
      }}>

        <svg width="160" height="148" viewBox="0 0 160 148">

          {/* headband arc */}
          <path
            d="M 24 92 C 24 22 136 22 136 92"
            stroke={bandColor} strokeWidth="7" fill="none" strokeLinecap="round"
            style={{ transition: "stroke 0.4s" }}
          />

          {/* left ear cup */}
          <rect x="5" y="80" width="38" height="58" rx="14"
            fill={cupColor} fillOpacity={fillOpacity}
            style={{ transition: "all 0.4s" }} />
          <rect x="5" y="80" width="38" height="58" rx="14"
            fill="none" stroke={cupColor} strokeWidth="2"
            style={{ transition: "stroke 0.4s" }} />
          {/* left cushion ring */}
          <rect x="11" y="87" width="26" height="44" rx="10"
            fill="none" stroke={cupColor} strokeWidth="1" strokeDasharray="2 2"
            style={{ transition: "stroke 0.4s" }} />

          {/* right ear cup */}
          <rect x="117" y="80" width="38" height="58" rx="14"
            fill={cupColor} fillOpacity={fillOpacity}
            style={{ transition: "all 0.4s" }} />
          <rect x="117" y="80" width="38" height="58" rx="14"
            fill="none" stroke={cupColor} strokeWidth="2"
            style={{ transition: "stroke 0.4s" }} />
          {/* right cushion ring */}
          <rect x="123" y="87" width="26" height="44" rx="10"
            fill="none" stroke={cupColor} strokeWidth="1" strokeDasharray="2 2"
            style={{ transition: "stroke 0.4s" }} />

        </svg>

        {/* reveal icon — floats up in centre gap between cups */}
        {answered && (
          <div style={{
            position: "absolute",
            top: "58px", left: "50%", transform: "translateX(-50%)",
            animation: "floatUp 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards",
            fontSize: 42, lineHeight: 1,
            pointerEvents: "none",
          }}>
            {revealIcon}
          </div>
        )}

        {/* ground shadow */}
        <div style={{ width: 130, height: 10, margin: "3px auto 0",
          borderRadius: "50%", background: "rgba(60,100,80,0.14)", filter: "blur(5px)" }} />
      </div>

      <span className="mt-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
        style={{ color: playing && !answered ? "#33a082" : "#6d8c7e" }}>
        {answered ? "Revealed" : playing ? "Playing…" : "Tap to play ▶"}
      </span>
    </button>
  );
}
