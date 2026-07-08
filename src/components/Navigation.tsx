import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

const NAV_LINKS = [
  { label: 'Home',     path: '/' },
  { label: 'About',    path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Order',    path: '/order' },
  { label: 'Contact',  path: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress]     = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY    = window.scrollY;
      const docHeight  = document.body.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 60);
      setProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          right:           0,
          zIndex:          100,
          padding:         '0 48px',
          height:          '68px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          transition:      'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter:  scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom:    scrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          aria-label="Genuine Digital Company — Home"
          style={{
            display:        'flex',
            alignItems:     'center',
            gap:            '10px',
            textDecoration: 'none',
          }}
        >
          {/* Logo Mark */}
          <img
            src="/logo.svg"
            alt="Genuine Digital Company Logo"
            style={{
              width:      '36px',
              height:     '36px',
              objectFit:  'contain',
              flexShrink: 0,
            }}
          />
          <div>
            <span style={{
              fontSize:      '14px',
              fontWeight:    600,
              letterSpacing: '0.04em',
              color:         '#191919',
              display:       'block',
              lineHeight:    1.1,
            }}>
              GENUINE
            </span>
            <span style={{
              fontSize:      '9px',
              fontWeight:    400,
              letterSpacing: '0.14em',
              color:         '#64748B',
              display:       'block',
              textTransform: 'uppercase',
            }}>
              Digital Company
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div
          className="hidden md:flex"
          style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  fontSize:       '13px',
                  fontWeight:     isActive ? 500 : 400,
                  letterSpacing:  '0.04em',
                  color:          isActive ? '#0057A8' : '#191919',
                  textDecoration: 'none',
                  padding:        '8px 14px',
                  borderRadius:   '8px',
                  transition:     'color 0.25s ease, background 0.25s ease',
                  position:       'relative',
                  background:     isActive ? 'rgba(0, 87, 168, 0.06)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#0057A8';
                    e.currentTarget.style.background = 'rgba(0, 87, 168, 0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#191919';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Button + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Get Quote CTA */}
          <Link
            to="/order"
            className="hidden md:inline-flex btn-primary"
            style={{
              padding:   '10px 24px',
              fontSize:  '12px',
              boxShadow: 'none',
            }}
            aria-label="Get a quote for toner cartridges"
          >
            Get a Quote
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              padding:    '8px',
              display:    'flex',
              flexDirection: 'column',
              gap:        '5px',
              zIndex:     200,
            }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span style={{
              display:         'block',
              width:           '22px',
              height:          '1.5px',
              backgroundColor: '#191919',
              transition:      'transform 0.3s ease, opacity 0.3s ease',
              transform:       mobileOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
            }} />
            <span style={{
              display:         'block',
              width:           '22px',
              height:          '1.5px',
              backgroundColor: '#191919',
              transition:      'opacity 0.3s ease',
              opacity:         mobileOpen ? 0 : 1,
            }} />
            <span style={{
              display:         'block',
              width:           '22px',
              height:          '1.5px',
              backgroundColor: '#191919',
              transition:      'transform 0.3s ease, opacity 0.3s ease',
              transform:       mobileOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        style={{
          position:        'fixed',
          inset:           0,
          zIndex:          99,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter:  'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display:         'flex',
          flexDirection:   'column',
          alignItems:      'center',
          justifyContent:  'center',
          gap:             '8px',
          opacity:         mobileOpen ? 1 : 0,
          pointerEvents:   mobileOpen ? 'all' : 'none',
          transition:      'opacity 0.3s ease',
        }}
      >
        {NAV_LINKS.map((link, i) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              aria-current={isActive ? 'page' : undefined}
              style={{
                fontSize:       '28px',
                fontWeight:     300,
                letterSpacing:  '-0.01em',
                color:          isActive ? '#0057A8' : '#191919',
                textDecoration: 'none',
                padding:        '12px 48px',
                borderRadius:   '12px',
                transition:     'color 0.2s ease, background 0.2s ease',
                transitionDelay: mobileOpen ? `${i * 0.05}s` : '0s',
                opacity:        mobileOpen ? 1 : 0,
                transform:      mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = '#0057A8';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = '#191919';
              }}
            >
              {link.label}
            </Link>
          );
        })}
        <Link
          to="/order"
          className="btn-primary"
          style={{ marginTop: '24px', fontSize: '14px', padding: '14px 48px' }}
        >
          Get a Quote
        </Link>
        <div style={{ marginTop: '48px', display: 'flex', gap: '24px' }}>
          <a href="tel:+96590942454" style={{ color: '#64748B', fontSize: '14px' }}>+965 9094 2454</a>
          <span style={{ color: '#E2E8F0' }}>|</span>
          <a href="mailto:info@genuinecartridges.net" style={{ color: '#0057A8', fontSize: '14px' }}>info@genuinecartridges.net</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          nav { padding: 0 24px !important; }
        }
        @media (min-width: 769px) {
          .md\\:hidden { display: none !important; }
          .md\\:flex    { display: flex !important; }
          .md\\:inline-flex { display: inline-flex !important; }
        }
        @media (max-width: 768px) {
          .md\\:flex    { display: none !important; }
          .md\\:inline-flex { display: none !important; }
        }
      `}</style>
    </>
  );
}
