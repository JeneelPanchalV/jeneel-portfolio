import { useEffect, useRef } from 'react';

const SKILLS = [
  {
    num: '01',
    name: 'LLM & RAG Systems',
    desc: 'Building retrieval pipelines, fine-tuning workflows, and production LLM applications with Python, PyTorch, and LangGraph.',
  },
  {
    num: '02',
    name: 'Full-Stack Engineering',
    desc: 'Shipping end-to-end applications with React, TypeScript, FastAPI, and .NET Core — from data layer to interface.',
  },
  {
    num: '03',
    name: 'Cloud & MLOps',
    desc: 'Deploying and monitoring ML systems on Azure and AWS, with drift detection, infrastructure-as-code, and hands-on networking.',
  },
  {
    num: '04',
    name: 'Computer Vision',
    desc: 'Detection, recognition, and classification systems — from face recognition built from scratch to vision transformers.',
  },
  {
    num: '05',
    name: 'Evaluation & Reliability',
    desc: 'Making AI dependable enough to ship — hybrid retrieval, RAGAS evaluation, and the guardrails that catch failures before users do.',
  },
];

const ServicesSection = () => {
  const listRef = useRef<HTMLDivElement>(null);

  // Slide-in rows on scroll
  useEffect(() => {
    const rows = listRef.current?.querySelectorAll('.skill-row');
    if (!rows) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    rows.forEach((row, i) => {
      (row as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
      io.observe(row);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="fade-section px-5 sm:px-8 md:px-10 py-20 sm:py-24 relative"
      style={{
        background: '#FFFFFF',
        borderRadius: '40px 40px 0 0',
        marginTop: -40,
        zIndex: 10,
      }}
    >
      <h2
        className="skills-h2 wave-text font-normal uppercase text-center leading-none tracking-tight mb-16"
        style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(3rem, 12vw, 160px)',
          color: '#0C0C0C',
        }}
      >
        Skills
      </h2>

      <div ref={listRef} className="max-w-[860px] mx-auto">
        {SKILLS.map((s, i) => (
          <div
            key={s.num}
            className="skill-row flex items-start gap-8 md:gap-12 py-10"
            style={{
              borderTop: '1px solid rgba(12,12,12,0.12)',
              ...(i === SKILLS.length - 1 ? { borderBottom: '1px solid rgba(12,12,12,0.12)' } : {}),
            }}
          >
            <span
              className="skill-num font-normal leading-none flex-shrink-0"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(3rem, 8vw, 120px)',
                color: '#0C0C0C',
              }}
            >
              {s.num}
            </span>
            <div className="flex flex-col gap-2.5 pt-2">
              <h3
                className="skill-name wave-text font-semibold uppercase leading-tight"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(1rem, 2vw, 1.8rem)',
                  color: '#0C0C0C',
                  letterSpacing: '0.02em',
                }}
              >
                {s.name}
              </h3>
              <p
                className="skill-desc font-light leading-relaxed"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
                  color: 'rgba(12,12,12,0.55)',
                  lineHeight: 1.65,
                  maxWidth: 520,
                }}
              >
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
