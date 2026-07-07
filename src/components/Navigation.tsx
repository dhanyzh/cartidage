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
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.94)' : 'transparent',
          backdropFilter:  scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom:    scrolled ? '1px solid rgba(245,243,238,0.07)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          aria-label="Genuine Toner Cartridges — Home"
          style={{
            display:        'flex',
            alignItems:     'center',
            gap:            '10px',
            textDecoration: 'none',
          }}
        >
          {/* Logo Mark */}
          <div style={{
            width:           '32px',
            height:          '32px',
            borderRadius:    '8px',
            background:      'linear-gradient(135deg, #C8A45C 0%, #E8D5A3 100%)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            flexShrink:      0,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="2" y="5" width="12" height="8" rx="1.5" fill="#0A0A0A" opacity="0.8"/>
              <rect x="5" y="2" width="6" height="5" rx="1" fill="#0A0A0A" opacity="0.6"/>
              <circle cx="8" cy="9" r="2" fill="#C8A45C"/>
            </svg>
          </div>
          <div>
            <span style={{
              fontSize:      '14px',
              fontWeight:    600,
              letterSpacing: '0.04em',
              color:         '#F5F3EE',
              display:       'block',
              lineHeight:    1.1,
            }}>
              GENUINE
            </span>
            <span style={{
              fontSize:      '9px',
              fontWeight:    400,
              letterSpacing: '0.14em',
              color:         '#8A8A8A',
              display:       'block',
              textTransform: 'uppercase',
            }}>
              Toner Cartridges
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
                  color:          isActive ? '#C8A45C' : '#F5F3EE',
                  textDecoration: 'none',
                  padding:        '8px 14px',
                  borderRadius:   '8px',
                  transition:     'color 0.25s ease, background 0.25s ease',
                  position:       'relative',
                  background:     isActive ? 'rgba(200,164,92,0.08)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#C8A45C';
                    e.currentTarget.style.background = 'rgba(200,164,92,0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#F5F3EE';
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
              backgroundColor: '#F5F3EE',
              transition:      'transform 0.3s ease, opacity 0.3s ease',
              transform:       mobileOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
            }} />
            <span style={{
              display:         'block',
              width:           '22px',
              height:          '1.5px',
              backgroundColor: '#F5F3EE',
              transition:      'opacity 0.3s ease',
              opacity:         mobileOpen ? 0 : 1,
            }} />
            <span style={{
              display:         'block',
              width:           '22px',
              height:          '1.5px',
              backgroundColor: '#F5F3EE',
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
          backgroundColor: 'rgba(10, 10, 10, 0.98)',
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
                color:          isActive ? '#C8A45C' : '#F5F3EE',
                textDecoration: 'none',
                padding:        '12px 48px',
                borderRadius:   '12px',
                transition:     'color 0.2s ease, background 0.2s ease',
                transitionDelay: mobileOpen ? `${i * 0.05}s` : '0s',
                opacity:        mobileOpen ? 1 : 0,
                transform:      mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = '#C8A45C';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = '#F5F3EE';
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
          <a href="tel:+96525471616" style={{ color: '#8A8A8A', fontSize: '14px' }}>+965 2547 1616</a>
          <span style={{ color: '#333' }}>|</span>
          <a href="mailto:info@genuinecartridges.net" style={{ color: '#C8A45C', fontSize: '14px' }}>info@genuinecartridges.net</a>
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
