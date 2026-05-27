"use client";

const RIBBON = "#3da082";
const PAPER  = "linear-gradient(160deg, #faf0dc 0%, #ead8a8 55%, #d8c490 100%)";
const GRAIN  = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='rgba(0,0,0,0.03)'/%3E%3C/svg%3E")`;

interface Props {
  playing: boolean;
  answered: boolean;
  correct: boolean;
  revealIcon: string;
  onClick: () => void;
}

function BoxHalf({ height, children }: { height: number; children?: React.ReactNode }) {
  return (
    <div style={{
      width: 160, height,
      borderRadius: 8,
      background: PAPER,
      boxShadow: "0 4px 18px rgba(60,100,80,0.14), inset 0 1px 0 rgba(255,255,255,0.55)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position:"absolute",inset:0,backgroundImage:GRAIN }} />
      {/* horizontal ribbon */}
      <div style={{ position:"absolute",top:"50%",left:0,right:0,height:16,marginTop:-8,background:RIBBON,opacity:0.84 }} />
      {/* vertical ribbon */}
      <div style={{ position:"absolute",left:"50%",top:0,bottom:0,width:16,marginLeft:-8,background:RIBBON,opacity:0.84 }} />
      {/* cross shine */}
      <div style={{ position:"absolute",left:"50%",top:"50%",width:16,height:16,marginLeft:-8,marginTop:-8,background:"rgba(255,255,255,0.26)" }} />
      {/* edge shadows */}
      <div style={{ position:"absolute",left:0,top:0,bottom:0,width:12,background:"linear-gradient(to right,rgba(0,0,0,0.09),transparent)" }} />
      <div style={{ position:"absolute",left:0,right:0,bottom:0,height:12,background:"linear-gradient(to top,rgba(0,0,0,0.08),transparent)" }} />
      {children}
    </div>
  );
}

export default function MysteryBox({ playing, answered, correct, revealIcon, onClick }: Props) {
  const lidLift = playing && !answered ? -20 : answered ? -82 : 0;

  return (
    <button
      onClick={onClick}
      aria-label="Play mystery sound"
      className="flex flex-col items-center"
      style={{ background:"none", border:"none", padding:0,
               cursor: answered ? "default" : "pointer" }}
    >
      <div style={{
        position: "relative", width: 160,
        animation:
          playing && !answered
            ? "boxShake 0.5s ease-in-out infinite, boxGlow 1.6s ease-in-out infinite"
            : answered && correct
            ? "boxGlow 2s ease-in-out infinite"
            : "none",
      }}>

        {/* top half — lifts up */}
        <div style={{
          position: "relative", zIndex: 2,
          transform: `translateY(${lidLift}px)`,
          transition: "transform 0.55s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          <BoxHalf height={58} />
        </div>

        {/* 2 px gap between halves when closed */}
        <div style={{ height: 2 }} />

        {/* bottom half — stays still */}
        <BoxHalf height={122}>
          {answered && (
            <div style={{
              position:"absolute", inset:0,
              display:"flex", alignItems:"center", justifyContent:"center",
              animation:"floatUp 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards",
              fontSize: 46,
            }}>
              {revealIcon}
            </div>
          )}
        </BoxHalf>

        {/* ground shadow */}
        <div style={{ width:130,height:10,margin:"5px auto 0",borderRadius:"50%",
                      background:"rgba(60,100,80,0.15)",filter:"blur(5px)" }} />
      </div>

      <span className="mt-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
        style={{ color: playing && !answered ? "#33a082" : "#6d8c7e" }}>
        {answered ? "Revealed" : playing ? "Playing…" : "Tap to play ▶"}
      </span>
    </button>
  );
}
