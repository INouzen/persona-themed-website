import { useState, useEffect, useRef } from "react";
import { playSelectSound } from "./utils/audio.js";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import newsign from "./assets/newsign.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";

const CHARS = [char1, char2, char3];

const ROLES = [
  { text: "LEADER", color: "#d92323", bg: "rgba(217,35,35,0.12)", border: "rgba(217,35,35,0.5)" },
  { text: "PARTY",  color: "#d92323", bg: "rgba(217,35,35,0.12)", border: "rgba(217,35,35,0.5)" },
  { text: "PARTY",  color: "#d92323", bg: "rgba(217,35,35,0.12)", border: "rgba(217,35,35,0.5)" },
];

const ITEMS = [
  {
    id: "github", 
    label: "GITHUB", 
    handle: "@nouzen", 
    href: "https://github.com/INouzen", 
    icon: "💻", 
    barIcon: icon1, 
    bars: 3, 
    newBars: [0], 
    counts: ["CLONE", "SITE","PAGE"],
    links: [
      "https://github.com/INouzen/felipe-netflix-clone",
      "https://github.com/INouzen/nouzenproto", 
      "https://github.com/INouzen/appdev-space-tourism-group-2-crew", 
    ],
    stats: [
      { tag: "USR", value: "nouzen", color: "#7b7b7b" },
      { tag: "TOP", value: "PROJECTS",  color: "#7b7b7b" },
    ],
  },
  {
    id: "instagram", 
    label: "INSTAGRAM", 
    handle: "@ix_nouzen", 
    href: "https://instagram.com/ix_nouzen", 
    icon: "📷", 
    barIcon: icon2, 
    bars: 2, 
    newBars: [1], 
    counts: ["POSTS", "REELS"],
    links: ["instagram.com/ix_nouzen", "instagram.com"],
    stats: [
      { tag: "SOCIAL", value: "PICS", color: "#d92323" },
      { tag: "MIND", value: "LIFE",  color: "#732424" },
    ],
  },
  {
    id: "email", 
    label: "EMAIL", 
    handle: "shotoscpf@gmail.com", 
    href: "mailto:shotoscpf@gmail.com", 
    icon: "✉️", 
    barIcon: icon3, 
    bars: 3, 
    newBars: [2], 
    counts: ["INBOX", "OUTBOX", "SPAM"],
    links: ["mailto:shotoscpf@gmail.com", "gmail.com", "mail.google.com"],
    stats: [
      { tag: "CONTACT", value: "DIRECT", color: "#ffffff" },
      { tag: "TALK", value: "WORK",  color: "#d92323" },
    ],
  },
];

export default function Socials() {
  const [active, setActive]               = useState(0);
  const [mounted, setMounted]             = useState(false);
  const isFirstRenderAudio = useRef(true);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus]                 = useState("left"); 
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setActiveInfoBar(0);
  }, [active]);

  useEffect(() => {
    if (isFirstRenderAudio.current) {
      isFirstRenderAudio.current = false;
      return;
    }
    try {
        playSelectSound();
    } catch(e) { console.error("Audio failed", e); }
  }, [active, activeInfoBar, focus]);

  useEffect(() => {
    const onKey = (e) => {
      const getLink = (link) => {
          if (!link) return "#";
          return link.startsWith("http") || link.startsWith("mailto") ? link : "https://" + link;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        setFocus(prev => prev === "left" ? "right" : "left");
        setActiveInfoBar(0);
        return;
      }

      const isUp = e.key === "ArrowUp" || e.key.toLowerCase() === "w";
      const isDown = e.key === "ArrowDown" || e.key.toLowerCase() === "s";

      if (focus === "left") {
        if (isUp)    setActive(i => Math.max(0, i - 1));
        if (isDown)  setActive(i => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") { 
            setFocus("right"); 
            setActiveInfoBar(0); 
        }
        if (e.key === "Enter") window.open(ITEMS[active].href, "_blank");
      } else {
        const barCount = ITEMS[active].bars;
        if (isUp)   setActiveInfoBar(i => Math.max(0, i - 1));
        if (isDown) setActiveInfoBar(i => Math.min(barCount - 1, i + 1));
        if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") setFocus("left");
        if (e.key === "Enter") window.open(getLink(ITEMS[active].links[activeInfoBar]), "_blank");
      }
      
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, focus, activeInfoBar]);

  const currentItem = ITEMS[active] || ITEMS[0];

  return (
    <div id="menu-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&display=swap');

        .sc-root {
          position: absolute; inset: 0; z-index: 10; pointer-events: none;
          display: flex; flex-direction: column; align-items: flex-start;
          justify-content: center; gap: 6px; padding-left: 0;
        }

        .sc-bar {
          position: relative; width: 45vw; height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111; cursor: pointer; pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(13,13,13,0.65); z-index: 1;
        }

        .sc-bar-outer {
          position: relative; flex-shrink: 0;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; opacity: 1; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        .sc-bar-red {
          position: absolute; top: 0; left: 0; width: 45vw; height: 64px;
          background: #d92323; clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px); opacity: 0; transition: all 0.2s ease; z-index: 0; pointer-events: none;
        }

        .sc-bar-fill {
          position: absolute; inset: 0; width: 100%; background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1); z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        .sc-bar-shade {
          position: absolute; top: 0; bottom: 0; left: 73%; width: 6%;
          background: linear-gradient(90deg, rgba(13,13,13,0.15) 0%, rgba(13,13,13,0) 100%);
          z-index: 1; pointer-events: none; opacity: 0; transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        .sc-bar::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 6px;
          background: linear-gradient(180deg, rgba(13,13,13,0) 0%, rgba(13,13,13,0.55) 100%);
          z-index: 10; pointer-events: none;
        }

        .sc-bar-content {
          position: relative; z-index: 2; height: 100%; display: flex;
          align-items: center; justify-content: space-between; padding: 0 20px;
        }

        .sc-role {
          display: flex; align-items: center; flex-shrink: 0; font-family: 'Bebas Neue', sans-serif;
          font-size: 50px; letter-spacing: -2px; color: #ffffff; transform: rotate(-30deg);
          user-select: none; line-height: 1; padding: 0 16px 0 8px;
        }

        .sc-main { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; }
        .sc-main-top { display: flex; align-items: center; gap: 12px; }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif; font-size: 22px; width: 32px; text-align: center;
          flex-shrink: 0; color: rgba(255,255,255,0.15); transition: color 0.2s ease; user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 1px;
          line-height: 1; color: rgba(255,255,255,0.85); transition: color 0.2s ease; user-select: none;
        }
        .sc-bar-outer.active .sc-label { color: #0d0d0d; }

        .sc-stats { display: flex; align-items: center; gap: 10px; padding-right: 24px; flex-shrink: 0; }
        .sc-stat { display: flex; flex-direction: column; align-items: flex-start; }
        .sc-stat-top { display: flex; align-items: baseline; gap: 4px; }
        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif; font-size: 9px; letter-spacing: 1.5px;
          padding: 1px 4px; border-width: 1px; border-style: solid; line-height: 1.4; user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif; font-size: 26px; font-style: italic;
          line-height: 1; color: #ffffff; letter-spacing: 1px; user-select: none; transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #0d0d0d; }

        .sc-stat-bars { width: 100%; display: flex; flex-direction: column; gap: 1px; margin-top: 2px; }
        .sc-stat-bar-color { height: 3px; width: 100%; }
        .sc-stat-bar-black { height: 2px; width: 100%; background: #0d0d0d; }

        .sc-char {
          position: absolute; top: 0; left: 110px; height: 100%; width: auto; max-width: 160px;
          object-fit: cover; object-position: top; pointer-events: none; z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        .sc-right-nav {
          position: fixed; top: 40px; right: 40px; display: flex; align-items: center;
          gap: 6px; pointer-events: none; z-index: 100;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif; font-size: 100px; letter-spacing: 3px;
          line-height: 1; user-select: none; color: #ffffff; -webkit-text-stroke: 2px #0d0d0d;
          paint-order: stroke fill; background: none; border: none; padding: 0 6px;
        }
        .sc-right-nav .sc-nav-label {
          font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 3px;
          line-height: 1; user-select: none; color: #111; padding: 0 8px;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: #d92323; user-select: none;
        }

        .sc-info-bar-wrap {
          position: fixed; right: 0; left: 65%; height: 46px; background: transparent;
          pointer-events: all; cursor: pointer; z-index: 50; padding: 0; transition: background 0.2s;
        }
        .sc-info-bar-wrap.selected { background: #111; padding: 1.5px; border-radius: 8px; }
        .sc-info-bar {
          position: relative; width: 100%; height: 100%; background: transparent;
          display: flex; align-items: center; overflow: hidden;
        }
        .sc-info-bar-wrap.selected .sc-info-bar { background: #ffffff; border-radius: 7px; }
        .sc-info-bar-text {
          flex: 1; font-family: 'Bebas Neue', sans-serif; font-size: 22px;
          letter-spacing: 0.5px; color: #111; padding: 0 14px; user-select: none;
        }
        .sc-info-bar-box {
          position: relative; z-index: 2; height: 70%; background: #0d0d0d;
          display: flex; align-items: center; padding: 0 12px; font-family: 'Bebas Neue', sans-serif;
          font-size: 20px; color: #ffffff; flex-shrink: 0; border-radius: 6px; margin-right: 4px; user-select: none;
        }

        .sc-info-bar-icon-wrap {
          width: 56px; height: 26px; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0; margin-left: 14px;
        }
        .sc-info-bar-icon { max-width: 100%; max-height: 100%; object-fit: contain; pointer-events: none; }
        .sc-info-bar-count {
          font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: #111;
          margin-right: 80px; flex-shrink: 0; user-select: none;
        }

        .sc-footer {
          position: fixed; bottom: 20px; right: 28px; display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px; font-family: 'Bebas Neue', sans-serif;
          z-index: 50; opacity: 0; transition: opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row { display: flex; align-items: center; gap: 8px; font-size: 13px; letter-spacing: 2px; color: rgba(255,255,255,0.22); }
        .sc-footer-key { border: 1px solid rgba(255,255,255,0.15); border-radius: 3px; padding: 1px 6px; font-size: 11px; }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              if (active === i && focus === "left") window.open(item.href, "_blank");
              else { setActive(i); setFocus("left"); }
            }}
            onMouseEnter={() => { setActive(i); setFocus("left"); }}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i]?.text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-icon">{item.icon}</div>
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
                <div className="sc-stats">
                  {item.stats.map(s => (
                    <div className="sc-stat" key={s.tag}>
                      <div className="sc-stat-top">
                        <span className="sc-stat-tag" style={{ color: s.color, borderColor: s.color }}>{s.tag}</span>
                        <span className="sc-stat-num">{s.value}</span>
                      </div>
                      <div className="sc-stat-bars">
                        <div className="sc-stat-bar-color" style={{ background: s.color }} />
                        <div className="sc-stat-bar-black" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && (
        <div className="sc-right-nav">
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-label">{currentItem.label}</span>
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}

      {mounted && Array.from({ length: currentItem.bars }).map((_, i) => (
        <div
          className={`sc-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
          key={`bar-${active}-${i}`}
          style={{ top: `${155 + i * 52}px` }}
          onClick={() => {
            const link = currentItem.links[i];
            if(!link) return;
            window.open(link.startsWith("http") || link.startsWith("mailto") ? link : "https://" + link, "_blank");
            setActiveInfoBar(i);
            setFocus("right");
          }}
          onMouseEnter={() => { setActiveInfoBar(i); setFocus("right"); }}
        >
          {currentItem.newBars.includes(i) && (
            <img className="sc-info-bar-new" src={newsign} alt="" style={{ position: 'absolute', left: '-30px', zIndex: 10, height: '80%' }} />
          )}
          <div className="sc-info-bar">
            <div className={`sc-info-bar-icon-wrap${currentItem.id === "email" ? " email" : ""}`}>
              <img className="sc-info-bar-icon" src={currentItem.barIcon} alt="" />
            </div>
            <span className="sc-info-bar-text">
                {currentItem.links[i] ? (currentItem.links[i].includes("github.com") ? currentItem.links[i].split('/').pop() : currentItem.links[i].slice(0, 15) + "...") : "LINK"}
            </span>
            <span className="sc-info-bar-box">VIEWS</span>
            <span className="sc-info-bar-count">{currentItem.counts[i]}</span>
          </div>
        </div>
      ))}

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">TAB</span><span>SWITCH</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">W/S/A/D</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>OPEN</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}