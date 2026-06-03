import React, { useState, useEffect, useRef } from "react";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";
import home4 from "../assets/home4.png";
import bmcvideo from "../assets/bmcvideo.mp4";

const slides = [
  {
    type: "video",
    src: bmcvideo,
    tag: "PRECISION MANUFACTURING",
    title: "Engineered\nfor Excellence",
    sub: "Supplying mission-critical components to Mitsubishi, Hino, Isuzu & more",
  },
  {
    type: "image",
    src: home1,
    tag: "AUTOMOTIVE OEM & REM",
    title: "Built for\nEvery Drive",
    sub: "High-precision parts for commercial & passenger vehicles",
  },
  {
    type: "image",
    src: home2,
    tag: "HEAVY EQUIPMENT",
    title: "Power the\nIndustry",
    sub: "Durable components trusted across heavy equipment & agribusiness",
  },
  {
    type: "image",
    src: home3,
    tag: "GLOBAL EXPORTS",
    title: "Made in\nIndonesia",
    sub: "Exporting to Japan, Malaysia, Philippines, Thailand, Italy and beyond",
  },
  {
    type: "image",
    src: home4,
    tag: "ISO CERTIFIED",
    title: "Quality You\nCan Trust",
    sub: "Rigorous quality control at every step of the manufacturing process",
  },
];

export default function HeroSlider() {
  const [cur, setCur]       = useState(0);
  const [fading, setFading] = useState(false);
  const [txtIn, setTxtIn]   = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef  = useRef(null);
  const timerRef  = useRef(null);
  const progRef   = useRef(null);
  const DURATION  = 6000;

  const goTo = (next) => {
    if (fading) return;
    setFading(true);
    setTxtIn(false);
    setProgress(0);
    clearInterval(timerRef.current);
    clearInterval(progRef.current);
    setTimeout(() => {
      setCur(next);
      setFading(false);
      setTimeout(() => setTxtIn(true), 60);
      startProgress();
      startTimer(next);
    }, 500);
  };

  const startProgress = () => {
    clearInterval(progRef.current);
    let p = 0;
    setProgress(0);
    progRef.current = setInterval(() => {
      p += 100 / (DURATION / 50);
      if (p >= 100) { clearInterval(progRef.current); p = 100; }
      setProgress(p);
    }, 50);
  };

  const startTimer = (current) => {
    clearInterval(timerRef.current);
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % slides.length);
    }, DURATION);
  };

  useEffect(() => {
    startProgress();
    startTimer(cur);
    return () => {
      clearInterval(timerRef.current);
      clearInterval(progRef.current);
    };
  }, []);

  useEffect(() => {
    if (slides[cur].type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [cur]);

  const slide = slides[cur];
  const prev  = () => goTo((cur - 1 + slides.length) % slides.length);
  const next  = () => goTo((cur + 1) % slides.length);

  return (
    <>
      <style>{css}</style>
      <div className="hs-root">

        {/* ── MEDIA BG ── */}
        <div className={`hs-bg ${fading ? "hs-bg--fade" : ""}`}>
          {slide.type === "video"
            ? <video ref={videoRef} src={slide.src} autoPlay muted loop playsInline className="hs-media" />
            : <img src={slide.src} alt="" className="hs-media" />}
        </div>

        {/* ── OVERLAYS ── */}
        <div className="hs-ov-left"  />
        <div className="hs-ov-bottom"/>
        {/* frosted glass panel behind text */}
        <div className="hs-glass" />

        {/* ── TEXT CONTENT ── */}
        <div className={`hs-content ${txtIn ? "hs-content--in" : ""}`}>
          <span className="hs-tag">{slide.tag}</span>
          <h2 className="hs-title">
            {slide.title.split("\n").map((l, i) => <span key={i}>{l}</span>)}
          </h2>
          <p className="hs-sub">{slide.sub}</p>
          <button className="hs-cta">
            Explore More
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── SIDE ARROWS ── */}
        <button className="hs-arrow hs-arrow--left"  onClick={prev}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="hs-arrow hs-arrow--right" onClick={next}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* ── BOTTOM BAR: thumbnails + progress ── */}
        <div className="hs-bar">
          <div className="hs-thumbs">
            {slides.map((s, i) => (
              <button
                key={i}
                className={`hs-thumb ${i === cur ? "hs-thumb--active" : ""}`}
                onClick={() => goTo(i)}
              >
                {s.type === "video"
                  ? <span className="hs-thumb-play">▶</span>
                  : <img src={s.src} alt="" className="hs-thumb-img" />}
                {/* individual progress fill */}
                {i === cur && (
                  <div className="hs-thumb-prog" style={{ width: `${progress}%` }} />
                )}
              </button>
            ))}
          </div>

          {/* slide counter */}
          <div className="hs-count">
            <span className="hs-count-cur">{String(cur + 1).padStart(2, "0")}</span>
            <span className="hs-count-sep"> / </span>
            <span className="hs-count-tot">{String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>

      </div>
    </>
  );
}

/* ═══════════════ CSS ═══════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@400;500&display=swap');

.hs-root {
  position: relative;
  width: 100%;
  height: 72vh;
  min-height: 460px;
  max-height: 720px;
  overflow: hidden;
  background: #0D1F5C;
  font-family: 'Rajdhani', sans-serif;
}

/* ── media ── */
.hs-bg {
  position: absolute;
  inset: 0;
  transition: opacity 0.5s ease;
}
.hs-bg--fade { opacity: 0; }
.hs-media {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
}

/* ── overlays ── */
.hs-ov-left {
  position: absolute; inset: 0;
  background: linear-gradient(100deg, rgba(13,31,92,0.82) 30%, rgba(13,31,92,0.4) 60%, transparent 100%);
  z-index: 2;
}
.hs-ov-bottom {
  position: absolute; bottom: 0; left: 0; right: 0; height: 45%;
  background: linear-gradient(to top, rgba(13,31,92,0.7), transparent);
  z-index: 2;
}

/* frosted glass behind text */
.hs-glass {
  position: absolute;
  left: 4rem; top: 50%;
  transform: translateY(-50%);
  width: 420px; height: 300px;
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 2px;
  z-index: 3;
}

/* ── content ── */
.hs-content {
  position: absolute;
  left: 4rem; top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  max-width: 400px;
  opacity: 0;
  transition: opacity 0.45s ease;
  padding: 1.5rem 2rem;
}
.hs-content--in { opacity: 1; }

.hs-tag {
  display: inline-block;
  font-size: 0.6rem;
  letter-spacing: 0.35em;
  color: #D4A843;
  font-weight: 700;
  margin-bottom: 0.7rem;
  text-transform: uppercase;
}

.hs-title {
  display: flex;
  flex-direction: column;
  font-size: clamp(1.9rem, 3.5vw, 3rem);
  font-weight: 700;
  line-height: 1.05;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  margin: 0 0 0.9rem;
}

.hs-sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: rgba(200,214,240,0.85);
  line-height: 1.65;
  margin: 0 0 1.4rem;
  font-weight: 400;
}

.hs-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #D4A843;
  color: #0D1F5C;
  border: none;
  padding: 0.65rem 1.4rem;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 2px;
  transition: background 0.2s, transform 0.15s;
}
.hs-cta:hover { background: #fff; transform: translateY(-1px); }

/* ── arrows ── */
.hs-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: 2.6rem; height: 2.6rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, border-color 0.2s;
  backdrop-filter: blur(4px);
}
.hs-arrow:hover { background: #D4A843; border-color: #D4A843; color: #0D1F5C; }
.hs-arrow--left  { left: 1rem; }
.hs-arrow--right { right: 1rem; }

/* ── bottom bar ── */
.hs-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 20;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 1.5rem 1.2rem;
}

/* thumbnails */
.hs-thumbs {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
}
.hs-thumb {
  position: relative;
  width: 64px; height: 42px;
  overflow: hidden;
  border: 1.5px solid rgba(255,255,255,0.15);
  background: #162B7A;
  cursor: pointer;
  padding: 0;
  border-radius: 3px;
  transition: border-color 0.2s, transform 0.2s;
  flex-shrink: 0;
}
.hs-thumb:hover { transform: translateY(-2px); }
.hs-thumb--active {
  border-color: #D4A843;
  transform: translateY(-3px);
}
.hs-thumb-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  opacity: 0.75;
}
.hs-thumb--active .hs-thumb-img { opacity: 1; }
.hs-thumb-play {
  display: flex; align-items: center; justify-content: center;
  width: 100%; height: 100%;
  color: #D4A843; font-size: 0.9rem;
}
/* progress fill on active thumb */
.hs-thumb-prog {
  position: absolute;
  bottom: 0; left: 0; height: 3px;
  background: #D4A843;
  transition: width 0.05s linear;
  border-radius: 0 2px 2px 0;
}

/* counter */
.hs-count {
  font-size: 0.8rem;
  color: rgba(200,214,240,0.7);
  font-weight: 600;
  letter-spacing: 0.05em;
}
.hs-count-cur { font-size: 1.4rem; color: #D4A843; font-weight: 700; line-height: 1; }
`;