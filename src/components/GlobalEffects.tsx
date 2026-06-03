import { useEffect } from 'react';

export const GlobalEffects = () => {

  // Wave text effect (cursor proximity)
  useEffect(() => {
    const RADIUS = 130;
    let mx = -9999, my = -9999;
    let rafId: number | null = null;

    function splitEl(el: Element) {
      if (el.querySelector('.wc')) return;

      const wrapText = (text: string) => {
        const words = text.trim().split(/\s+/).filter(Boolean);
        if (!words.length) return '';
        return words.map(word =>
          `<span style="white-space:nowrap">${
            word.split('').map(ch => `<span class="wc">${ch}</span>`).join('')
          }</span>`
        ).join('<span class="wc" style="display:inline-block;min-width:0.32em"> </span>');
      };

      const nodes = Array.from(el.childNodes);
      const hasBr = nodes.some(n => n.nodeName === 'BR');

      if (!hasBr) {
        const text = el.textContent!.trim();
        if (!text) return;
        el.innerHTML = wrapText(text);
      } else {
        // Preserve <br> elements; wrap each text segment independently
        const parts: string[] = [];
        nodes.forEach(node => {
          if (node.nodeName === 'BR') {
            parts.push('<br>');
          } else if (node.nodeType === Node.TEXT_NODE) {
            const wrapped = wrapText(node.textContent || '');
            if (wrapped) parts.push(wrapped);
          }
        });
        el.innerHTML = parts.join('');
      }
    }

    // Split all wave-text elements except card titles (handled per-card)
    document.querySelectorAll('.wave-text:not(.card-title)').forEach(splitEl);

    function updateWave() {
      document.querySelectorAll('.wave-text:not(.card-title)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          (el as Element).querySelectorAll<HTMLElement>('.wc').forEach(s => { s.style.transform = ''; });
          return;
        }
        const isLarge = el.tagName === 'H1' || el.tagName === 'H2';
        const maxScale = isLarge ? 0.18 : 0.10;
        const maxY = isLarge ? -10 : -6;

        el.querySelectorAll<HTMLElement>('.wc').forEach(span => {
          const r = span.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
          if (dist < RADIUS) {
            const t = 1 - dist / RADIUS;
            span.style.transform = `translateY(${maxY * t * t}px) scale(${1 + maxScale * t * t})`;
          } else {
            span.style.transform = '';
          }
        });
      });
      rafId = null;
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(updateWave);
    };
    const onLeave = () => {
      mx = -9999; my = -9999;
      document.querySelectorAll<HTMLElement>('.wave-text:not(.card-title) .wc').forEach(s => { s.style.transform = ''; });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll fade
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('.fade-section')];
    sections.forEach(el => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.8s ease';
    });

    function checkFade() {
      const vh = window.innerHeight;
      sections.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh + 150 && rect.bottom > 0) {
          el.style.opacity = '1';
        } else if (rect.top > vh) {
          el.style.opacity = '0';
        }
      });
    }

    window.addEventListener('scroll', checkFade, { passive: true });
    window.addEventListener('load', checkFade);
    setTimeout(checkFade, 100);

    return () => {
      window.removeEventListener('scroll', checkFade);
      window.removeEventListener('load', checkFade);
    };
  }, []);

  return null;
};

export default GlobalEffects;
