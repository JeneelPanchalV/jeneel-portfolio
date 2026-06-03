const Footer = () => {
  return (
    <footer
      id="contact"
      className="fade-section flex flex-col items-center relative overflow-hidden px-5 pt-16 pb-10 sm:px-8 sm:pt-20 md:px-10 md:pt-[120px] md:pb-[60px]"
      style={{ background: '#080808' }}
    >
      {/* Radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 300,
          background: 'radial-gradient(ellipse, oklch(0.62 0.17 285 / 0.12) 0%, transparent 70%)',
        }}
      />

      <p className="footer-eyebrow">get in touch</p>

      <h2 className="footer-h2 wave-text">LET'S TALK</h2>

      <a
        href="mailto:jeneelpanchal74@gmail.com"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 400,
          fontSize: 'clamp(1rem, 2.2vw, 1.8rem)',
          color: 'rgba(215,226,234,0.5)',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
          transition: 'color 0.25s',
          marginBottom: 52,
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#D7E2EA')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(215,226,234,0.5)')}
      >
        jeneelpanchal74@gmail.com
      </a>

      <div
        className="flex items-center flex-wrap justify-center mb-12 md:mb-[80px]"
        style={{ gap: 40 }}
      >
        {[
          { label: 'GitHub', href: 'https://github.com/JeneelPanchalV', external: true },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jeneel-panchal-lu767ffy', external: true },
          { label: 'Resume', href: `${import.meta.env.BASE_URL}jeneel-panchal-resume.pdf`, external: true },
          { label: 'Contact Me', href: 'mailto:jeneelpanchal74@gmail.com', external: false },
        ].reduce<React.ReactNode[]>((acc, link, i, arr) => {
          acc.push(
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 500,
                fontSize: '0.9rem',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.14em',
                color: 'rgba(215,226,234,0.4)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#D7E2EA')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(215,226,234,0.4)')}
            >
              {link.label}
            </a>
          );
          if (i < arr.length - 1) {
            acc.push(
              <span key={`sep-${i}`} style={{ color: 'rgba(215,226,234,0.15)' }}>·</span>
            );
          }
          return acc;
        }, [])}
      </div>

      <div className="footer-divider" />

      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.15em',
          color: 'rgba(215,226,234,0.18)',
        }}
      >
        © 2026 Jeneel Panchal · AI Engineer
      </p>
    </footer>
  );
};

export default Footer;
