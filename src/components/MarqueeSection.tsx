import { useRef, useEffect } from 'react';

const ICONS = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', alt: 'PyTorch' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', alt: 'TensorFlow' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', alt: 'FastAPI' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', alt: 'Docker' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', alt: 'PostgreSQL' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', alt: 'Redis' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', alt: 'Azure' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', alt: 'AWS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', alt: 'Git' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg', alt: 'Next.js' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind' },
  { src: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4', alt: 'LangChain' },
  { src: 'https://ollama.com/public/ollama.png', alt: 'Ollama' },
  { src: 'https://avatars.githubusercontent.com/u/107036745?s=200&v=4', alt: 'ChromaDB' },
  { src: 'https://streamlit.io/images/brand/streamlit-mark-color.png', alt: 'Streamlit' },
];


const Bracket = ({ flip = false }: { flip?: boolean }) => (
  <svg width="16" height="22" viewBox="0 0 20 28" fill="none" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
    <path d="M14 2H8C5.79086 2 4 3.79086 4 6V22C4 24.2091 5.79086 26 8 26H14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    const row = rowRef.current;
    if (!section || !row) return;

    const iconEls = [...row.querySelectorAll('.tech-icon, .tech-pill')] as HTMLElement[];
    const center = Math.floor(iconEls.length / 2);

    if (window.innerWidth < 640) {
      // Mobile: no horizontal scatter — stagger fade-in when section enters view
      iconEls.forEach(icon => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(12px) scale(0.9)';
        icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      });

      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          iconEls.forEach((icon, i) => {
            setTimeout(() => {
              icon.style.opacity = '1';
              icon.style.transform = '';
            }, i * 60);
          });
          io.disconnect();
        }
      }, { threshold: 0.2 });

      io.observe(section);
      return () => io.disconnect();
    }

    // Desktop: scatter scrub (unchanged)
    iconEls.forEach((icon, i) => {
      const dist = i - center;
      icon.style.transform = `translateX(${dist * 80}px) rotate(${dist * 45}deg) translateY(${-Math.abs(dist) * 18}px) scale(0.75)`;
      icon.style.opacity = '0';
    });

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (-rect.top) / (rect.height - window.innerHeight)));
      const t = Math.min(progress * 2, 1);
      iconEls.forEach((icon, i) => {
        const dist = i - center;
        icon.style.transform = `translateX(${dist * 80 * (1 - t)}px) rotate(${dist * 45 * (1 - t)}deg) translateY(${-Math.abs(dist) * 18 * (1 - t)}px) scale(${0.75 + 0.25 * t})`;
        icon.style.opacity = String(t);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Icon error → pill fallback
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const pill = document.createElement('span');
    pill.className = 'tech-pill';
    pill.textContent = img.alt;
    img.replaceWith(pill);
  };

  // Stack toggle
  useEffect(() => {
    const btn = toggleRef.current;
    const sect = sectionRef.current;
    if (!btn || !sect) return;

    // Start light
    sect.classList.add('light');
    btn.classList.add('is-light');

    const onClick = () => {
      sect.classList.toggle('light');
      btn.classList.toggle('is-light');
    };
    btn.addEventListener('click', onClick);
    return () => btn.removeEventListener('click', onClick);
  }, []);

  // Tooltip
  useEffect(() => {
    const tip = tooltipRef.current;
    if (!tip) return;
    const row = rowRef.current;
    if (!row) return;

    const icons = row.querySelectorAll('.tech-icon');
    const handlers: Array<{ el: Element; enter: () => void; leave: () => void; move: (e: MouseEvent) => void }> = [];

    icons.forEach(icon => {
      const enter = () => {
        tip.textContent = (icon as HTMLImageElement).alt;
        tip.classList.add('visible');
      };
      const leave = () => tip.classList.remove('visible');
      const move = (e: MouseEvent) => {
        tip.style.left = `${e.clientX - tip.offsetWidth / 2}px`;
        tip.style.top = `${e.clientY + 20}px`;
      };
      icon.addEventListener('mouseenter', enter);
      icon.addEventListener('mouseleave', leave);
      icon.addEventListener('mousemove', move as EventListener);
      handlers.push({ el: icon, enter, leave, move });
    });

    return () => {
      handlers.forEach(({ el, enter, leave, move }) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
        el.removeEventListener('mousemove', move as EventListener);
      });
    };
  }, []);

  return (
    <>
      <div ref={tooltipRef} className="icon-tooltip" />
      <section
        ref={sectionRef}
        className="marquee-section h-[115vh] relative"
        id="stack"
      >
        {/* Toggle */}
        <div className="stack-wrap">
          <button
            ref={toggleRef}
            className="stack-toggle"
            aria-label="Toggle light/dark"
          >
            <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g className="toggle-half-1">
                <path d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5" fill="white" />
                <path d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5" fill="black" />
              </g>
              <path className="toggle-half-2" d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 220.5C64.2 220.5 19.5 175.8 19.5 120C19.5 64.2 64.2 19.5 120 19.5C175.8 19.5 220.5 64.2 220.5 120C220.5 175.8 175.8 220.5 120 220.5Z" fill="white" />
            </svg>
          </button>
        </div>

        {/* Sticky content */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-4 px-5 pointer-events-none">
          {/* Label */}
          <div
            className="flex items-center gap-3 marquee-label"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', letterSpacing: '0.08em', color: 'rgba(215,226,234,0.5)' }}
          >
            <Bracket />
            <span className="marquee-label-text">my stack</span>
            <Bracket flip />
          </div>

          {/* Icon row */}
          <div
            ref={rowRef}
            className="icon-row flex items-center flex-wrap justify-center pointer-events-auto"
            style={{ gap: 32, maxWidth: 1100 }}
          >
            {ICONS.map(({ src, alt }) => (
              <img
                key={alt}
                src={src}
                alt={alt}
                loading="lazy"
                className="tech-icon"
                onError={handleImgError}
                style={alt === 'Next.js' ? { filter: 'brightness(0) invert(0.5)' } : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MarqueeSection;
