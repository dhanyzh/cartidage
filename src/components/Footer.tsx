import { Link } from 'react-router';

const QUICK_LINKS = [
  { label: 'Home',     path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Order',    path: '/order' },
  { label: 'Contact',  path: '/contact' },
];

const PRODUCTS = [
  'Mono Cartridges',
  'Color Cartridges',
  'Extended Yield Cartridges',
  'MICR Toner Cartridges',
  'Wide Format Ink Cartridges',
  'Mailing & Addressing Solutions',
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: '#F8FAFC',
        borderTop:       '1px solid #E2E8F0',
        position:        'relative',
        overflow:        'hidden',
      }}
    >
      {/* Blue/Green accent line */}
      <div style={{
        position:   'absolute',
        top:        0,
        left:       0,
        right:      0,
        height:     '2px',
        background: 'linear-gradient(90deg, transparent, #0057A8 30%, #04AF44 50%, #0057A8 70%, transparent)',
        opacity:    0.8,
      }} />

      {/* Main Footer Content */}
      <div style={{
        maxWidth: '1400px',
        margin:   '0 auto',
        padding:  '80px 48px 48px',
      }}>
        <div style={{
          display:             'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap:                 '60px',
        }}
          className="footer-grid"
        >
          {/* Column 1 — Brand */}
          <div>
            {/* Logo */}
            <Link
              to="/"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', textDecoration: 'none' }}
              aria-label="Genuine Digital Company"
            >
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
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#191919', letterSpacing: '0.04em', lineHeight: 1.1 }}>
                  GENUINE
                </div>
                <div style={{ fontSize: '9px', fontWeight: 400, color: '#64748B', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Digital Company
                </div>
              </div>
            </Link>

            <p style={{
              fontSize:   '14px',
              color:      '#64748B',
              lineHeight: 1.7,
              maxWidth:   '280px',
              marginBottom: '28px',
            }}>
              Kuwait's trusted supplier of premium remanufactured toner cartridges since 2012. Quality guaranteed, locally made.
            </p>

            {/* Trust Badges */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {['Est. 2012', 'Kuwait Made', '100% Guaranteed'].map(badge => (
                <span key={badge} style={{
                  padding:       '5px 12px',
                  borderRadius:  '100px',
                  border:        '1px solid rgba(4,175,68,0.2)',
                  color:         '#04AF44',
                  fontSize:      '11px',
                  fontWeight:    500,
                  letterSpacing: '0.04em',
                }}>
                  {badge}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {/* WhatsApp */}
              <a
                href="https://wa.me/96590942454"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact us on WhatsApp"
                style={{
                  width:          '38px',
                  height:         '38px',
                  borderRadius:   '50%',
                  border:         '1px solid rgba(25,25,25,0.1)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          '#64748B',
                  transition:     'border-color 0.25s, color 0.25s, background 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#25D366';
                  e.currentTarget.style.color = '#25D366';
                  e.currentTarget.style.background = 'rgba(37,211,102,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(25,25,25,0.1)';
                  e.currentTarget.style.color = '#64748B';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                aria-label="Follow us on Facebook"
                style={{
                  width:          '38px',
                  height:         '38px',
                  borderRadius:   '50%',
                  border:         '1px solid rgba(25,25,25,0.1)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          '#64748B',
                  transition:     'border-color 0.25s, color 0.25s, background 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1877F2';
                  e.currentTarget.style.color = '#1877F2';
                  e.currentTarget.style.background = 'rgba(24,119,242,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(25,25,25,0.1)';
                  e.currentTarget.style.color = '#64748B';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                aria-label="Follow us on Instagram"
                style={{
                  width:          '38px',
                  height:         '38px',
                  borderRadius:   '50%',
                  border:         '1px solid rgba(25,25,25,0.1)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          '#64748B',
                  transition:     'border-color 0.25s, color 0.25s, background 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#E1306C';
                  e.currentTarget.style.color = '#E1306C';
                  e.currentTarget.style.background = 'rgba(225,48,108,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(25,25,25,0.1)';
                  e.currentTarget.style.color = '#64748B';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 style={{
              fontSize:      '12px',
              fontWeight:    600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color:         '#191919',
              marginBottom:  '24px',
            }}>
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {QUICK_LINKS.map(link => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      style={{
                        fontSize:   '14px',
                        color:      '#64748B',
                        transition: 'color 0.2s ease, padding-left 0.2s ease',
                        display:    'block',
                        paddingLeft: '0',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#0057A8';
                        e.currentTarget.style.paddingLeft = '6px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#64748B';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 — Products */}
          <div>
            <h3 style={{
              fontSize:      '12px',
              fontWeight:    600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color:         '#191919',
              marginBottom:  '24px',
            }}>
              Our Products
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {PRODUCTS.map((product) => (
                <li key={product}>
                  <Link
                    to="/products"
                    style={{
                      fontSize:   '14px',
                      color:      '#64748B',
                      transition: 'color 0.2s ease, padding-left 0.2s ease',
                      display:    'block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#0057A8';
                      e.currentTarget.style.paddingLeft = '6px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#64748B';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 style={{
              fontSize:      '12px',
              fontWeight:    600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color:         '#191919',
              marginBottom:  '24px',
            }}>
              Contact Us
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', marginBottom: '6px' }}>Address</div>
                <address style={{ fontStyle: 'normal', fontSize: '14px', color: '#64748B', lineHeight: 1.7 }}>
                  Block 1, Bin Khaldoun Street,<br />
                  Building No 21856, 3rd floor, office No 6,<br />
                  Faiha Complex, <strong style={{ color: '#191919', fontWeight: 500 }}>Hawally, Kuwait</strong>
                </address>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', marginBottom: '6px' }}>Phone</div>
                <a href="tel:0096590942454" style={{ fontSize: '15px', color: '#191919', fontWeight: 500, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#0057A8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#191919'; }}>
                  +965 9094 2454
                </a>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', marginBottom: '6px' }}>Email</div>
                <a href="mailto:info@genuinecartridges.net" style={{ fontSize: '14px', color: '#0057A8', transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}>
                  info@genuinecartridges.net
                </a>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', marginBottom: '6px' }}>Business Hours</div>
                <div style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.7 }}>
                  Sun – Thu: 8:00 AM – 5:00 PM<br />
                  Fri – Sat: Closed
                </div>
              </div>
              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/96590942454?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20toner%20cartridges."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '8px',
                  padding:        '10px 20px',
                  borderRadius:   '100px',
                  background:     'rgba(37,211,102,0.08)',
                  border:         '1px solid rgba(37,211,102,0.2)',
                  color:          '#25D366',
                  fontSize:       '13px',
                  fontWeight:     500,
                  transition:     'background 0.25s, border-color 0.25s',
                  width:          'fit-content',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(37,211,102,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(37,211,102,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(37,211,102,0.2)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          marginTop:  '60px',
          borderTop:  '1px solid #E2E8F0',
          paddingTop: '28px',
          display:    'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap:   'wrap',
          gap:        '16px',
        }}>
          <p style={{ fontSize: '13px', color: '#64748B' }}>
            © {year} Genuine Digital Company Est. All rights reserved.
          </p>
          <p style={{ fontSize: '13px', color: '#64748B' }}>
            Proudly made in{' '}
            <span style={{ color: '#04AF44', fontWeight: 500 }}>Kuwait 🇰🇼</span>
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="/contact" style={{ fontSize: '13px', color: '#64748B', transition: 'color 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#191919'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#64748B'; }}>
              Privacy Policy
            </a>
            <a href="/contact" style={{ fontSize: '13px', color: '#64748B', transition: 'color 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#191919'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#64748B'; }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          footer > div { padding: 60px 24px 40px !important; }
        }
      `}</style>
    </footer>
  );
}
