import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

const ICONS = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
];

const CENTER_INDEX = 6; // Python

const Bracket = ({ flip = false }: { flip?: boolean }) => (
  <svg
    width="20"
    height="28"
    viewBox="0 0 20 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={flip ? { transform: 'scaleX(-1)' } : undefined}
  >
    <path
      d="M14 2H8C5.79086 2 4 3.79086 4 6V22C4 24.2091 5.79086 26 8 26H14"
      stroke="#D7E2EA"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface IconProps {
  src: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
}

const Icon = ({ src, index, centerIndex, scrollYProgress }: IconProps) => {
  const distance = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distance * 90, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [distance * 50, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [-Math.abs(distance) * 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.img
      src={src}
      alt=""
      style={{ x, rotate, y, scale, transformOrigin: 'center' }}
      className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0"
      draggable={false}
    />
  );
};

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      className="h-[210vh]"
      style={{ background: '#0C0C0C' }}
    >
      {/* Sticky viewport — icons assemble here */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-8 px-5">
        {/* Label */}
        <div className="flex items-center gap-3">
          <Bracket />
          <span
            className="font-medium"
            style={{
              color: '#D7E2EA',
              fontSize: 'clamp(0.8rem, 1.4vw, 1.1rem)',
              letterSpacing: '0.05em',
            }}
          >
            integrate with my tech stack
          </span>
          <Bracket flip />
        </div>

        {/* Icon row */}
        <div className="flex items-center gap-6 md:gap-10">
          {ICONS.map((src, i) => (
            <Icon
              key={src}
              src={src}
              index={i}
              centerIndex={CENTER_INDEX}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
