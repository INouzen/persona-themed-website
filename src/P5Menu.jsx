import { useState, useEffect, useRef } from "react";
import { playSelectSound } from "./utils/audio.js";

const ITEMS = [
  { id: "about",   label: "ABOUT ME",      page: "about",    fontSize: 56, mobSize: 32, offsetX: -60,  skew: -6,  skewY: 5   },
  { id: "resume",  label: "RESUME",        page: "resume",   fontSize: 44, mobSize: 28, offsetX: -20,  skew: -11, skewY: -5  },
  { id: "github",  label: "GITHUB LINK",   page: "github",   fontSize: 46, mobSize: 28, offsetX: 20,   skew: 0,   skewY: -4  },
  { id: "socials", label: "SOCIALS",       page: "socials",  fontSize: 50, mobSize: 30, offsetX: 60,   skew: -3,  skewY: 5   },
  { id: "sideproj",label: "SIDE PROJECTS", page: "sideproj", fontSize: 38, mobSize: 24, offsetX: 100,  skew: -4,  skewY: 7   },
];

const CLIP_SHAPE = "polygon(0% 44%, 12% 0%, 88% 8%, 100% 36%, 92% 100%, 8% 92%)";

export default function P5Menu({ onNavigate }) {
  const [active, setActive] = useState(() => {
    const saved = sessionStorage.getItem('p5-menu-active');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [mounted, setMounted] = useState(false);
  const isFirstRenderAudio = useRef(true);
  const [animKey, setAnimKey] = useState(0);

  const activate = (idx) => {
    if (active !== idx) {
      setActive(idx);
      setAnimKey(k => k + 1);
    }
  };

  useEffect(() => {
    if (isFirstRenderAudio.current) {
      isFirstRenderAudio.current = false;
      return;
    }
    sessionStorage.setItem('p5-menu-active', active);
    playSelectSound();
  }, [active]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   activate(Math.max(0, active - 1));
      if (e.key === "ArrowDown") activate(Math.min(ITEMS.length - 1, active + 1));
      if (e.key === "Enter")     onNavigate?.(ITEMS[active].page);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <style>{`
        .p5-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          overflow: hidden;
        }

        .p5-menu {
          position: relative;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px; 
          pointer-events: all;
          width: 100%;
        }

        .p5-row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          margin-left: var(--offset-x);
        }

        .p5-row.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .p5-row.active {
          transform: scale(1.12) translateX(12px); 
          z-index: 30;
        }

        /* MOBILE OVERRIDES */
        @media (max-width: 768px) {
          .p5-menu { gap: 8px; }
          .p5-row { 
            margin-left: 0 !important; 
            transform: translateX(0);
          }
          .p5-row.active { transform: scale(1.08); }
          .p5-name-tag { 
            font-size: 38px !important; 
            top: 20px !important; 
            left: 20px !important; 
          }
          .p5-label-base {
            -webkit-text-stroke: 6px #000 !important;
          }
          .p5-row.active .p5-label-base {
            -webkit-text-stroke: 6px #fff !important;
          }
        }

        .p5-skew-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 42px; 
        }

        @keyframes p5-shadow-pop {
          0%   { transform: translate(-50%, -50%) scaleX(0); }
          60%  { transform: translate(-51%, -51%) scaleX(1.08); }
          100% { transform: translate(-50%, -50%) scaleX(1); }
        }

        .p5-shadow-tri {
          position: absolute;
          top: 50%; left: 50%;
          background: rgba(255, 255, 255, 0.92);
          z-index: 1;
          pointer-events: none;
          transform: translate(-50%, -50%) scaleX(0);
          clip-path: ${CLIP_SHAPE};
        }

        .p5-shadow-tri.pop {
          animation: p5-shadow-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .p5-highlight {
          position: absolute;
          top: 50%; left: 50%;
          background: #00d4ff;
          z-index: 2;
          pointer-events: none;
          transform: translate(-50%, -50%) scaleX(0);
          clip-path: ${CLIP_SHAPE};
          transition: transform 0.18s ease;
        }

        .p5-row.active .p5-highlight {
          transform: translate(-50%, -50%) scaleX(1);
        }

        .p5-label-wrap {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .p5-label-base {
          font-family: 'Persona5Main';
          font-style: italic;
          line-height: 0.9;
          white-space: nowrap;
          color: #ffffff;
          -webkit-text-stroke: 8px #000; 
          paint-order: stroke fill;
          transition: color 0.2s ease;
        }

        .p5-row.active .p5-label-base {
          color: #000;
          -webkit-text-stroke: 8px #fff;
        }

        .p5-name-tag {
          position: absolute;
          top: 5vh; left: 4vw;
          font-family: 'Persona5Main';
          font-size: 58px; 
          line-height: 0.8;
          color: #fff;
          transform: rotate(-5deg);
          text-transform: uppercase;
        }

        .p5-hint {
          position: absolute;
          bottom: 25px; right: 35px;
          font-family: 'Persona5Main';
          color: rgba(255,255,255,0.4);
          text-align: right;
          font-size: 13px;
        }
      `}</style>

      <div className="p5-overlay">
        <div className="p5-name-tag">
          <div style={{fontSize: '0.6em'}}>Nouzen's</div>
          <div>Persona</div>
        </div>

        <nav className="p5-menu">
          {ITEMS.map((item, i) => {
            const isActive = active === i;
            const estW = item.label.length * (item.fontSize * 0.62) + 85;
            const estH = item.fontSize * 1.5;

            return (
              <a
                key={item.id}
                href="#"
                className={`p5-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                style={{
                  "--offset-x": `${item.offsetX}px`,
                  transitionDelay: mounted ? `${i * 55}ms` : "0ms",
                }}
                onClick={(e) => { e.preventDefault(); onNavigate?.(item.page); }}
                onMouseEnter={() => activate(i)}
              >
                <div 
                  className="p5-skew-wrap"
                  style={{ transform: `skewX(${item.skew}deg) skewY(${item.skewY}deg)` }}
                >
                  <div
                    key={isActive ? `pop-${animKey}` : 'idle'}
                    className={`p5-shadow-tri ${isActive ? 'pop' : ''}`}
                    style={{ width: estW, height: estH }}
                  />
                  <div
                    className="p5-highlight"
                    style={{ width: estW, height: estH }}
                  />
                  <div className="p5-label-wrap">
                    <span className="p5-label-base p5-responsive-font" 
                      style={{ 
                        fontSize: typeof window !== 'undefined' && window.innerWidth < 768 
                          ? item.mobSize 
                          : item.fontSize 
                      }}>
                      {item.label}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </nav>

        <div className={`p5-hint ${mounted ? "mounted" : ""}`}>
          <div>↑↓ NAVIGATE</div>
          <div>ENTER CONFIRM</div>
        </div>
      </div>
    </>
  );
}