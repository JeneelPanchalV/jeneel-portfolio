import { useEffect, useRef } from 'react';

const ABOUT_TEXT = "I'm Jeneel — an AI engineer who builds things that reach people, not just papers. I hold an M.S. in Artificial Intelligence and work with Python, PyTorch, TypeScript, and React, backed by tools like FastAPI, ChromaDB, and AWS. I care about the part most skip — making AI reliable enough to actually ship. Anyone can call a model. Knowing what to build around it is the skill.";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Typewriter fires once when section scrolls into view (observes section, not empty <p>)
  useEffect(() => {
    const el = textRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    el.style.opacity = '0';
    let typed = false;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !typed) {
        typed = true;
        io.unobserve(section);
        el.style.opacity = '1';
        let i = 0;

        const typeChar = () => {
          if (i < ABOUT_TEXT.length) {
            el.textContent = ABOUT_TEXT.slice(0, ++i);
            setTimeout(typeChar, 18);
          } else {
            const words = el.textContent!.trim().split(' ');
            el.innerHTML = words
              .map(word =>
                `<span style="white-space:nowrap">${word.split('').map(ch => `<span class="wc">${ch}</span>`).join('')}</span>`
              )
              .join('<span class="wc" style="display:inline-block;min-width:0.32em"> </span>');
          }
        };
        typeChar();
      }
    }, { threshold: 0.3 });

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="fade-section min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 relative gap-0"
      style={{
        background: '#0C0C0C',
        borderRadius: '40px 40px 0 0',
        marginTop: -40,
        zIndex: 5,
      }}
    >
      {/* Heading */}
      <h2
        className="about-h2 wave-text hero-heading font-normal uppercase leading-none tracking-tight text-center mb-12"
        style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(3rem, 12vw, 160px)',
        }}
      >
        Who am I
      </h2>

      {/* Status pill */}
      <div className="flex gap-4 mb-11 flex-wrap justify-center">
        <span className="status-pill">🎓 UB · Master's AI · May 2026</span>
      </div>

      {/* About text with typewriter + wave */}
      <p
        ref={textRef}
        className="about-text wave-text text-center"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 400,
          fontSize: 13.5,
          lineHeight: 1.7,
          color: '#D7E2EA',
          maxWidth: 540,
          opacity: 0.85,
          marginBottom: 48,
        }}
      />
    </section>
  );
};

export default AboutSection;
