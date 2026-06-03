import { useEffect, useRef } from 'react';

const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&';

// Scrambles each .wave-letter child of wordEl individually — never touches parent innerHTML
function scrambleWord(wordEl: HTMLElement, final: string, speed: number, delay: number, onComplete?: () => void): () => void {
  let frame = 0;
  let rafId: number;
  let tid: ReturnType<typeof setTimeout>;

  const tick = () => {
    const letters = Array.from(wordEl.querySelectorAll<HTMLElement>('.wave-letter'));
    const resolved = Math.floor(frame * speed);
    letters.forEach((span, i) => {
      span.textContent = i < resolved ? final[i] : POOL[Math.floor(Math.random() * POOL.length)];
    });
    if (resolved < final.length) {
      frame++;
      tid = setTimeout(() => { rafId = requestAnimationFrame(tick); }, 50);
    } else {
      letters.forEach((span, i) => { span.textContent = final[i]; });
      onComplete?.();
    }
  };

  tid = setTimeout(() => { rafId = requestAnimationFrame(tick); }, delay);
  return () => { clearTimeout(tid); cancelAnimationFrame(rafId); };
}

const HeroSection = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const portRef = useRef<HTMLSpanElement>(null);
  const folioRef = useRef<HTMLSpanElement>(null);

  // JENEEL scramble on mount
  useEffect(() => {
    const el = h1Ref.current;
    if (!el) return;
    const final = 'JENEEL';
    let frame = 0;
    const speed = 0.4;
    let rafId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const resolved = Math.floor(frame * speed);
      el.textContent = final.split('').map((ch, i) => {
        if (i < resolved) return ch;
        return POOL[Math.floor(Math.random() * POOL.length)];
      }).join('');

      if (resolved < final.length) {
        frame++;
        timeoutId = setTimeout(() => { rafId = requestAnimationFrame(tick); }, 50);
      } else {
        el.innerHTML = final.split('').map(ch => `<span class="wc">${ch}</span>`).join('');
      }
    };

    timeoutId = setTimeout(() => { rafId = requestAnimationFrame(tick); }, 300);
    return () => { clearTimeout(timeoutId); cancelAnimationFrame(rafId); };
  }, []);

  // PORT/FOLIO: scramble in, then start the continuous wave only after both finish
  useEffect(() => {
    const portEl = portRef.current;
    const folioEl = folioRef.current;
    if (!portEl || !folioEl) return;

    // Called when FOLIO (last to finish) completes — adds .waving to every letter
    const startWave = () => {
      [portEl, folioEl].forEach(word => {
        word.querySelectorAll<HTMLElement>('.wave-letter').forEach(span => {
          span.classList.add('waving');
        });
      });
    };

    const cancelPort = scrambleWord(portEl, 'PORT', 0.6, 1400);
    const cancelFolio = scrambleWord(folioEl, 'FOLIO', 0.6, 1620, startWave);

    return () => {
      cancelPort();
      cancelFolio();
      [portEl, folioEl].forEach(word => {
        word.querySelectorAll<HTMLElement>('.wave-letter').forEach(span => {
          span.classList.remove('waving');
        });
      });
    };
  }, []);

  return (
    <section
      className="h-screen flex flex-col relative overflow-hidden"
      id="hero"
    >
      {/* Full-bg video */}
      <video
        className="absolute inset-0 w-full h-full object-cover object-center z-[1]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src={`${import.meta.env.BASE_URL}avatar.mp4`}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35 z-[2]" />

      {/* Navbar */}
      <nav className="flex items-center justify-center gap-8 md:gap-12 px-6 md:px-10 pt-6 md:pt-8 relative z-20">
        {[
          { label: 'About', href: '#about' },
          { label: 'Projects', href: '#projects' },
          { label: 'Contact', href: '#contact' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="font-medium uppercase tracking-wider text-sm md:text-base transition-opacity duration-200 opacity-60 hover:opacity-100"
            style={{ color: '#D7E2EA', letterSpacing: '0.1em' }}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Hero heading */}
      <div className="px-8 md:px-10 mt-4 relative z-20">
        <h1
          ref={h1Ref}
          className="hero-h1 hero-heading wave-text font-normal uppercase whitespace-nowrap"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(80px, 12vw, 200px)',
            letterSpacing: '-0.02em',
            lineHeight: 0.88,
          }}
        >
          {'JENEEL'}
        </h1>
        <div
          style={{
            marginTop: 14,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(22px, 2.2vw, 32px)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            textTransform: 'uppercase',
          }}
        >
          <span ref={portRef} className="wave-word" style={{ display: 'block', cursor: 'default' }}>
            {'PORT'.split('').map((ch, i) => <span key={i} className="wave-letter">{ch}</span>)}
          </span>
          <span ref={folioRef} className="wave-word" style={{ display: 'block', cursor: 'default' }}>
            {'FOLIO'.split('').map((ch, i) => <span key={i} className="wave-letter">{ch}</span>)}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span className="scroll-label">Scroll</span>
        <div className="scroll-line" />
      </div>

      {/* Bottom bar */}
      <div
        className="mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 relative z-20"
      >
        <p
          className="hero-tagline wave-text font-light uppercase leading-snug"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: '#D7E2EA',
            fontSize: 'clamp(0.75rem, 1.3vw, 1.2rem)',
            letterSpacing: '0.06em',
            maxWidth: 480,
          }}
        >
          AI engineer based in New York.<br />
          I work across Python, TypeScript, and cloud infrastructure<br />
          to build AI systems that ship.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
