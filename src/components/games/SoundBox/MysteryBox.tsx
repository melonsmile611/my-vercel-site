"use client";

const GROOVES = [54, 46, 38, 30];

interface Props {
  playing: boolean;
  answered: boolean;
  correct: boolean;
  revealIcon: string;
  onClick: () => void;
}

export default function MysteryBox({ playing, answered, correct, revealIcon, onClick }: Props) {
  const labelFill = answered && correct ? "#4db89c" : playing ? "#33a082" : "#b2e4d4";
  const armColor  = playing ? "#4db89c" : "#8aab9c";

  // tone arm tip: resting (off record) → playing (on record)
  const tipX = playing && !answered ? 100 : 124;
  const tipY = playing && !answered ? 70  : 44;

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
            ? "boxGlow 1.6s ease-in-out infinite"
            : answered && correct
            ? "boxGlow 2s ease-in-out infinite"
            : "none",
      }}>

        <svg width="160" height="170" viewBox="0 0 160 170">
          <defs>
            <radialGradient id="recGrad" cx="38%" cy="32%">
              <stop offset="0%"   stopColor="#4a4848"/>
              <stop offset="100%" stopColor="#1a1a1a"/>
            </radialGradient>
            <linearGradient id="cabGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#e0c89e"/>
              <stop offset="100%" stopColor="#c8a870"/>
            </linearGradient>
          </defs>

          {/* wooden cabinet */}
          <rect x="8" y="138" width="144" height="28" rx="8" fill="url(#cabGrad)" />
          <rect x="8" y="138" width="144" height="6"  rx="4" fill="rgba(255,255,255,0.18)" />

          {/* platter shadow */}
          <ellipse cx="80" cy="140" rx="60" ry="7" fill="rgba(0,0,0,0.13)" />

          {/* spinning vinyl record */}
          <g style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            animation: playing && !answered ? "spin 3.5s linear infinite" : "none",
          }}>
            <circle cx="80" cy="82" r="62" fill="url(#recGrad)" />
            {GROOVES.map((r, i) => (
              <circle key={i} cx="80" cy="82" r={r}
                fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
            ))}
            <circle cx="80" cy="82" r="62" fill="none"
              stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            {/* label */}
            <circle cx="80" cy="82" r="20" fill={labelFill}
              style={{ transition: "fill 0.5s" }} />
            <circle cx="80" cy="82" r="20" fill="none"
              stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
            <line x1="67" y1="82" x2="93" y2="82"
              stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
            <line x1="80" y1="69" x2="80" y2="95"
              stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
            {/* spindle */}
            <circle cx="80" cy="82" r="3.5" fill="#111" />
          </g>

          {/* tone arm */}
          <line
            x1="148" y1="15" x2={tipX} y2={tipY}
            stroke={armColor} strokeWidth="3.5" strokeLinecap="round"
            style={{
              transition: "all 0.9s cubic-bezier(0.4,0,0.2,1)",
              filter: playing ? "drop-shadow(0 0 5px #4db89c99)" : "none",
            }}
          />
          {/* arm needle */}
          <circle cx={tipX} cy={tipY} r="4" fill={armColor}
            style={{ transition: "all 0.9s cubic-bezier(0.4,0,0.2,1)" }} />
          {/* arm pivot */}
          <circle cx="148" cy="15" r="8"  fill={armColor}
            style={{ transition: "fill 0.3s" }} />
          <circle cx="148" cy="15" r="4"  fill="#f7ecd8" />
        </svg>

        {/* reveal icon on label */}
        {answered && (
          <div style={{
            position: "absolute",
            top: `${82 - 20}px`, left: `${80 - 20}px`,
            width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "floatUp 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards",
            fontSize: 30, pointerEvents: "none",
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
