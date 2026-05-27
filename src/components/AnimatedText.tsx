import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharProps {
  char: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
}

const Char = ({ char, progress, range }: CharProps) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0 }}>{char}</span>
      <motion.span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          opacity,
        }}
      >
        {char}
      </motion.span>
    </span>
  );
};

const AnimatedText = ({ text, className, style }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charIndex = 0;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => {
        const wordChars = word.split('').map((c) => {
          const start = charIndex / totalChars;
          const end = (charIndex + 1) / totalChars;
          charIndex += 1;
          return (
            <Char
              key={`${wi}-${charIndex}`}
              char={c}
              progress={scrollYProgress}
              range={[start, end]}
            />
          );
        });
        // Trailing space between words (also counted as a char)
        const spaceStart = charIndex / totalChars;
        const spaceEnd = (charIndex + 1) / totalChars;
        const isLastWord = wi === words.length - 1;
        if (!isLastWord) charIndex += 1;

        return (
          <span key={wi} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
            {wordChars}
            {!isLastWord && (
              <Char
                char=" "
                progress={scrollYProgress}
                range={[spaceStart, spaceEnd]}
              />
            )}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
