import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY     = window.scrollY;
      const docHeight   = document.body.scrollHeight - window.innerHeight;
      const pct         = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle progress
  const RADIUS    = 20;
  const CIRCUM    = 2 * Math.PI * RADIUS;
  const dashoffset = CIRCUM - (progress / 100) * CIRCUM;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="back-to-top"
      style={{
        opacity:      visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
        transform:    visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
        transition:   'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s ease',
        position:     'fixed',
        bottom:       '32px',
        right:        '32px',
        zIndex:       500,
        width:        '52px',
        height:       '52px',
        borderRadius: '50%',
        background:   '#04AF44',
        border:       'none',
        cursor:       'pointer',
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        boxShadow:    '0 4px 20px rgba(4,175,68,0.35)',
        padding:      0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(4,175,68,0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(4,175,68,0.35)';
      }}
    >
      {/* Progress ring */}
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        <circle
          cx="26" cy="26" r={RADIUS}
          fill="none"
          stroke="rgba(0,87,168,0.1)"
          strokeWidth="2"
        />
        <circle
          cx="26" cy="26" r={RADIUS}
          fill="none"
          stroke="rgba(0,87,168,0.5)"
          strokeWidth="2"
          strokeDasharray={CIRCUM}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
      {/* Arrow icon */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
