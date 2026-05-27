import FadeIn from './FadeIn';

const Footer = () => {
  return (
    <footer
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 flex flex-col items-center gap-10 sm:gap-14 md:gap-16"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Let&apos;s talk
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <a
          href="mailto:jeneelpanchal74@gmail.com"
          className="font-medium tracking-tight hover:opacity-70 transition-opacity"
          style={{
            color: '#D7E2EA',
            fontSize: 'clamp(1.25rem, 3vw, 2.5rem)',
          }}
        >
          jeneelpanchal74@gmail.com
        </a>
      </FadeIn>

      <FadeIn delay={0.2} y={20}>
        <div className="flex items-center gap-6 sm:gap-10 md:gap-14">
          <a
            href="https://github.com/JeneelPanchalV"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium uppercase tracking-widest hover:opacity-70 transition-opacity"
            style={{ color: '#D7E2EA', fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
          >
            GitHub
          </a>
          <span style={{ color: '#D7E2EA', opacity: 0.3 }}>—</span>
          <a
            href="https://www.linkedin.com/in/jeneel-panchal-lu767ffy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium uppercase tracking-widest hover:opacity-70 transition-opacity"
            style={{ color: '#D7E2EA', fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
          >
            LinkedIn
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={0.3} y={20}>
        <p
          className="text-center font-light uppercase tracking-wider"
          style={{
            color: '#D7E2EA',
            opacity: 0.4,
            fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
          }}
        >
          © 2026 Jeneel Panchal
        </p>
      </FadeIn>
    </footer>
  );
};

export default Footer;
