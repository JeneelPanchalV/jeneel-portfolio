import FadeIn from './FadeIn';

const SKILLS = [
  {
    num: '01',
    name: 'AI / ML Engineering',
    desc: 'Building RAG pipelines, fine-tuning workflows, and production ML systems with Python, PyTorch, and LangGraph.',
  },
  {
    num: '02',
    name: 'Full-Stack Development',
    desc: 'Shipping end-to-end applications with React, TypeScript, FastAPI, and .NET Core — from data layer to user interface.',
  },
  {
    num: '03',
    name: 'Computer Vision',
    desc: 'Implementing detection, recognition, and classification systems — from face recognition built from scratch to vision transformers.',
  },
  {
    num: '04',
    name: 'Cloud & DevOps',
    desc: 'Deploying and scaling on Azure and AWS, with hands-on experience in policy, networking, and infrastructure-as-code.',
  },
  {
    num: '05',
    name: 'Data & RAG Systems',
    desc: 'Designing retrieval pipelines with ChromaDB, hybrid search strategies, and evaluation frameworks like RAGAS.',
  },
];

const ServicesSection = () => {
  return (
    <section
      id="skills"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative"
      style={{ background: '#FFFFFF' }}
    >
      <FadeIn y={40}>
        <h2
          className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight"
          style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Skills
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SKILLS.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.1}>
            <div
              className="flex items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: '1px solid rgba(12, 12, 12, 0.15)',
                ...(i === SKILLS.length - 1
                  ? { borderBottom: '1px solid rgba(12, 12, 12, 0.15)' }
                  : {}),
              }}
            >
              <span
                className="font-black leading-none"
                style={{
                  color: '#0C0C0C',
                  fontSize: 'clamp(3rem, 10vw, 140px)',
                }}
              >
                {s.num}
              </span>
              <div className="flex flex-col gap-3 pt-2">
                <h3
                  className="font-medium uppercase leading-tight"
                  style={{
                    color: '#0C0C0C',
                    fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                  }}
                >
                  {s.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    color: '#0C0C0C',
                    opacity: 0.6,
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
