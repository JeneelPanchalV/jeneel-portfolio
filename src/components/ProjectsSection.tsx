import { useState, useRef, useEffect, useCallback } from 'react';

const GH_PATH =
  'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z';

interface Card {
  num: string;
  tag: string;
  name: string;
  description: string;
  chips: string[];
  liveUrl: string;
  color: 'c1' | 'c2' | 'c3';
}

const CARDS: Card[] = [
  {
    num: '01',
    tag: 'LLM · RAG',
    name: 'DOCGUARD AI',
    description: 'Privacy-aware RAG assistant with a three-layer hallucination guard for trustworthy document Q&A.',
    chips: ['Python', 'LangChain', 'FastAPI', 'ChromaDB', 'Ollama'],
    liveUrl: 'https://github.com/JeneelPanchalV/CITECHECKAI',
    color: 'c1',
  },
  {
    num: '02',
    tag: 'LLM Safety',
    name: 'SECURELLM',
    description: 'Safety layer for LLM applications — input filtering, output moderation, and policy enforcement.',
    chips: ['Python', 'FastAPI', 'LangChain', 'Redis', 'Docker'],
    liveUrl: 'https://github.com/JeneelPanchalV/securellm',
    color: 'c2',
  },
  {
    num: '03',
    tag: 'MLOps',
    name: 'ML MODEL MONITOR',
    description: 'Real-time monitoring for deployed ML models — drift detection, performance metrics, and alerts.',
    chips: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
    liveUrl: 'https://github.com/JeneelPanchalV/ML-Model-Monitor-main',
    color: 'c3',
  },
];

const TOTAL = CARDS.length;

const ProjectsSection = () => {
  const [current, setCurrent] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  const d = useRef({
    active: false,
    card: null as HTMLDivElement | null,
    originX: 0,
    originY: 0,
    lastDX: 0,
    current: 0,
  });

  useEffect(() => { d.current.current = current; }, [current]);

  const go = useCallback((to: number) => {
    const next = ((to % TOTAL) + TOTAL) % TOTAL;
    d.current.current = next;
    setCurrent(next);
  }, []);

  // Card wave effect — RAF-driven, front card only
  useEffect(() => {
    let cmx = -9999, cmy = -9999;
    let cRaf: number | null = null;
    let navLock = false;

    const RADIUS = 110, MAX_SCALE = 0.08, MAX_Y = -4;

    function splitAll() {
      document.querySelectorAll('.deck-card .card-title').forEach(el => {
        if (el.querySelector('.ctc')) return;
        el.innerHTML = el.textContent!.split('').map(ch =>
          ch === ' ' ? ' ' : `<span class="ctc">${ch}</span>`
        ).join('');
      });
    }

    function resetAll() {
      document.querySelectorAll<HTMLElement>('.ctc').forEach(s => { s.style.transform = ''; });
    }

    function updateWave() {
      if (!navLock) {
        document.querySelectorAll<HTMLElement>('.deck-card[data-pos="0"] .card-title .ctc').forEach(span => {
          const r = span.getBoundingClientRect();
          const cx = r.left + r.width * 0.5;
          const cy = r.top + r.height * 0.5;
          const dist = Math.sqrt((cmx - cx) ** 2 + (cmy - cy) ** 2);
          if (dist < RADIUS) {
            const t = 1 - dist / RADIUS;
            span.style.transform = `translate3d(0,${MAX_Y * t * t}px,0) scale(${1 + MAX_SCALE * t * t})`;
          } else {
            span.style.transform = '';
          }
        });
      }
      cRaf = null;
    }

    const navBtns = document.querySelectorAll('.nav-btn, .dot');
    const onNavClick = () => {
      navLock = true;
      resetAll();
      setTimeout(() => { navLock = false; }, 550);
    };
    navBtns.forEach(btn => btn.addEventListener('click', onNavClick));

    splitAll();
    if (document.readyState === 'complete') splitAll();
    window.addEventListener('load', splitAll);

    const onMove = (e: MouseEvent) => {
      cmx = e.clientX; cmy = e.clientY;
      if (!cRaf) cRaf = requestAnimationFrame(updateWave);
    };
    const onLeave = () => { cmx = -9999; cmy = -9999; resetAll(); };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('load', splitAll);
      navBtns.forEach(btn => btn.removeEventListener('click', onNavClick));
      if (cRaf) cancelAnimationFrame(cRaf);
    };
  }, []);

  // Drag handlers
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!d.current.active || !d.current.card) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - d.current.originX;
      const rawDy = clientY - d.current.originY;

      if ('touches' in e) {
        if (Math.abs(rawDy) > Math.abs(dx) + 5) return; // vertical — let browser scroll
        e.preventDefault();
      }

      d.current.card.style.transform = `translate(${dx}px,${rawDy * 0.25}px) rotate(${Math.max(-25, Math.min(25, dx * 0.06))}deg) scale(1)`;
      d.current.lastDX = dx;
    };

    const onUp = () => {
      if (!d.current.active || !d.current.card) return;
      d.current.active = false;
      const card = d.current.card;
      d.current.card = null;
      const dx = d.current.lastDX;

      if (Math.abs(dx) > 90) {
        const flyX = dx > 0 ? 700 : -700;
        card.classList.add('fly-off');
        card.classList.remove('is-dragging');
        card.style.transform = `translate(${flyX}px,-60px) rotate(${dx > 0 ? 35 : -35}deg) scale(0.85)`;
        card.style.opacity = '0';
        setTimeout(() => {
          card.classList.remove('fly-off');
          card.style.transform = '';
          card.style.opacity = '';
          card.style.zIndex = '';
          go(d.current.current + (dx > 0 ? 1 : -1));
        }, 390);
      } else {
        card.classList.add('snap-back');
        card.classList.remove('is-dragging');
        card.style.transform = 'rotate(0deg) scale(1)';
        setTimeout(() => {
          card.classList.remove('snap-back');
          card.style.transform = '';
          card.style.zIndex = '';
        }, 460);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      const target = (e.target as Element).closest('.deck-card') as HTMLDivElement | null;
      if (!target || target.dataset.pos !== '0') return;
      e.preventDefault();
      const touch = e.touches[0];
      Object.assign(d.current, { active: true, card: target, originX: touch.clientX, originY: touch.clientY, lastDX: 0 });
      target.classList.add('is-dragging');
      target.style.transition = 'none';
      target.style.zIndex = '20';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove as EventListener, { passive: false });
    window.addEventListener('touchend', onUp);
    deck.addEventListener('touchstart', onTouchStart, { passive: false });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove as EventListener);
      window.removeEventListener('touchend', onUp);
      deck.removeEventListener('touchstart', onTouchStart);
    };
  }, [go]);

  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const target = (e.target as Element).closest('.deck-card') as HTMLDivElement | null;
    if (!target || target.dataset.pos !== '0') return;
    if ('button' in e && e.button !== 0) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    Object.assign(d.current, { active: true, card: target, originX: clientX, originY: clientY, lastDX: 0 });
    target.classList.add('is-dragging');
    target.style.transition = 'none';
    target.style.zIndex = '20';
  };

  return (
    <section
      id="projects"
      className="fade-section rounded-t-[50px] -mt-10 relative pt-20 md:pt-24 pb-32 overflow-hidden"
      style={{ background: '#080808', isolation: 'isolate', zIndex: 11 }}
    >
      <div className="projects-dotgrid" />

      {/* Header — centered */}
      <div className="projects-header">
        <div>
          <p className="projects-eyebrow">selected work</p>
          <h2 className="projects-heading proj-heading wave-text">PROJECTS</h2>
        </div>
      </div>

      {/* Fan stage */}
      <div className="fan-stage">
        <div
          ref={deckRef}
          className="deck"
          style={{ touchAction: 'pan-y' }}
          onMouseDown={onPointerDown}
        >
          {CARDS.map((card, i) => {
            const pos = ((i - current) + TOTAL) % TOTAL;

            return (
              <div key={card.num} className="deck-card" data-pos={pos}>
                <div className={`card-inner ${card.color}`}>
                  <div className="card-meta">
                    <span className="card-num">{card.num}</span>
                    <span className="card-tag">{card.tag}</span>
                  </div>
                  <h3 className="card-title">{card.name}</h3>
                  <p className="card-desc">{card.description}</p>
                  <div className="chips-row">
                    {card.chips.map(chip => (
                      <span key={chip} className="chip">{chip}</span>
                    ))}
                  </div>
                  <div className="card-footer">
                    <a
                      href={card.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gh-link"
                      onClick={e => e.stopPropagation()}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                        <path d={GH_PATH} />
                      </svg>
                      View on GitHub <span className="gh-arrow">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nav controls */}
        <div className="projects-controls">
          <button className="nav-btn" onClick={() => go(current - 1)} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="projects-dots">
            {CARDS.map((_, i) => (
              <div key={i} className={`dot${current === i ? ' active' : ''}`} onClick={() => go(i)} />
            ))}
          </div>
          <button className="nav-btn" onClick={() => go(current + 1)} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
