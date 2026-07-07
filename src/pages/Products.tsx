import { useState } from 'react';
import { useFadeInUp, useFadeInLeft, useStaggerChildren } from '../hooks/useScrollAnimation';
import { Link } from 'react-router';

export default function Products() {
  const [activeTab, setActiveTab] = useState('all');
  const headerRef     = useFadeInUp(0);
  const cardsRef      = useStaggerChildren(0.12);
  const brandsTitleRef = useFadeInLeft(0);
  const micrRef       = useFadeInUp(0);
  const recyclingRef  = useFadeInUp(0);

  const tabs = [
    { id: 'all',   label: 'All Products' },
    { id: 'laser', label: 'Laser Toner' },
    { id: 'micr',  label: 'MICR Toner' },
    { id: 'eco',   label: 'Recycling' },
  ];

  const products = [
    {
      id: 'laser',
      num: '01',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A45C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <path d="M6 12h.01M18 12h.01"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      title: 'Laser Toner Cartridges',
      badge: 'Most Popular',
      body: "When remanufactured according to Genuine Toner Cartridges' high quality standards, recycled laser toner cartridges will equal or outperform new OEM cartridges. We support HP, Epson, Canon, Samsung and Xerox.",
      features: [
        'OEM-level output quality',
        'Extended drum life option',
        '100% performance guarantee',
        'Compatible with all major brands',
        'In-house manufactured in Kuwait',
      ],
    },
    {
      id: 'micr',
      num: '02',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A45C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="1" y="4" width="22" height="16" rx="2"/>
          <path d="M1 10h22"/>
          <path d="M7 15h3M14 15h3"/>
        </svg>
      ),
      title: 'MICR Toner Cartridges',
      badge: 'Financial Grade',
      body: 'Magnetized for speed and security. Industry-leading financial institutions depend on quality MICR toner. We remanufacture MICR cartridges for Source Tech, Lexmark, IBM and Troy printers.',
      features: [
        'Bank-grade magnetization',
        'Check processing ready',
        'Meets ANSI/ABA standards',
        'Source Tech, Lexmark, IBM, Troy',
        'Financial institution trusted',
      ],
    },
    {
      id: 'eco',
      num: '03',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A45C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 5.8 17 4.5 19 2c1 2 2 4.5 2 8a7 7 0 0 1-12 10z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
        </svg>
      ),
      title: 'Recycling Program',
      badge: 'Eco-Friendly',
      body: 'Return your used ink and toner cartridges for recycling credit. We prioritize quality and customer satisfaction over low-cost cutbacks, with warranty on all remanufactured cartridges.',
      features: [
        'Recycling credit program',
        'Eco-friendly disposal',
        'Waste elimination focus',
        'Sustainable business practice',
        'Reduce office carbon footprint',
      ],
    },
  ];

  const displayProducts = activeTab === 'all' ? products : products.filter(p => p.id === activeTab);
  const brands = ['HP', 'EPSON', 'CANON', 'SAMSUNG', 'XEROX'];

  return (
    <div style={{ position: 'relative', zIndex: 3 }}>

      {/* ── Page Header ──────────────────────────────────── */}
      <section style={{
        backgroundColor: '#0A0A0A',
        padding: '160px 48px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(200,164,92,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} aria-hidden="true" />
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '24px' }}>Our Products</div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 80px)',
          fontWeight: 700,
          color: '#F5F3EE',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          marginBottom: '24px',
        }}>
          Remanufactured<br />Toner Cartridges
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#8A8A8A',
          maxWidth: '480px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Premium quality at fair prices. Equal or exceed OEM performance — every single time.
        </p>
      </section>

      {/* ── Products Grid ─────────────────────────────────── */}
      <section style={{ backgroundColor: '#F5F3EE', padding: '100px 48px 120px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          {/* Tabs */}
          <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div role="tablist" aria-label="Product categories" style={{
              display: 'inline-flex',
              gap: '4px',
              background: '#FFFFFF',
              border: '1px solid #E0DDD6',
              borderRadius: '100px',
              padding: '4px',
            }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '100px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    transition: 'all 0.25s ease',
                    background: activeTab === tab.id ? '#C8A45C' : 'transparent',
                    color: activeTab === tab.id ? '#0A0A0A' : '#8A8A8A',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={cardsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(displayProducts.length, 3)}, 1fr)`,
              gap: '24px',
              transition: 'all 0.3s ease',
            }}
            className="products-page-grid"
          >
            {displayProducts.map((p) => (
              <article
                key={p.num}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E0DDD6',
                  borderRadius: '20px',
                  padding: '48px 36px',
                  transition: 'all 0.35s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 24px 64px rgba(0,0,0,0.10)';
                  e.currentTarget.style.borderColor = 'rgba(200,164,92,0.3)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#E0DDD6';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Gold left accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px',
                  background: 'linear-gradient(180deg, #C8A45C, #E8D5A3, #C8A45C)',
                  borderRadius: '3px 0 0 3px',
                }} aria-hidden="true" />

                {/* Badge */}
                <div style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  background: 'rgba(200,164,92,0.1)',
                  border: '1px solid rgba(200,164,92,0.2)',
                  color: '#C8A45C',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}>
                  {p.badge}
                </div>

                {/* Number */}
                <div style={{
                  fontSize: '52px',
                  fontWeight: 200,
                  color: 'rgba(200,164,92,0.12)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                }}>{p.num}</div>

                {/* Icon */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '12px',
                  background: 'rgba(200,164,92,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  {p.icon}
                </div>

                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  marginBottom: '14px',
                  letterSpacing: '-0.01em',
                }}>{p.title}</h2>

                <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.7, marginBottom: '24px' }}>{p.body}</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                  {p.features.map((f) => (
                    <li key={f} style={{
                      fontSize: '13px', color: '#555',
                      padding: '9px 0', borderTop: '1px solid #F0EDE6',
                      display: 'flex', alignItems: 'center', gap: '10px',
                    }}>
                      <span style={{
                        width: '6px', height: '6px',
                        borderRadius: '50%', background: '#C8A45C', flexShrink: 0,
                      }} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link to="/order" className="btn-primary" style={{ fontSize: '12px', padding: '11px 28px' }}>
                  Order Now
                </Link>
              </article>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1023px) { .products-page-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 640px)  { .products-page-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── Brands Section ────────────────────────────────── */}
      <section style={{ backgroundColor: '#0A0A0A', padding: '100px 48px', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div ref={brandsTitleRef} style={{ marginBottom: '72px' }}>
            <div className="section-label" style={{ marginBottom: '20px' }}>Supported Brands</div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 600,
              color: '#F5F3EE',
              lineHeight: 1.05,
              maxWidth: '700px',
              letterSpacing: '-0.02em',
            }}>
              We remanufacture for the world's leading printer manufacturers
            </h2>
          </div>

          {/* Marquee */}
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: '0 0 0 auto', width: '100px',
              background: 'linear-gradient(90deg, transparent, #0A0A0A)', zIndex: 2, pointerEvents: 'none',
            }} aria-hidden="true" />
            <div style={{
              position: 'absolute', inset: '0 auto 0 0', width: '100px',
              background: 'linear-gradient(90deg, #0A0A0A, transparent)', zIndex: 2, pointerEvents: 'none',
            }} aria-hidden="true" />
            <div style={{
              display: 'flex', gap: '80px', alignItems: 'center',
              animation: 'marquee 18s linear infinite', width: 'max-content',
            }}>
              {[...brands, ...brands].map((brand, i) => (
                <span key={`${brand}-${i}`} style={{
                  fontSize: 'clamp(32px, 5vw, 72px)',
                  fontWeight: 700, letterSpacing: '0.06em',
                  color: 'rgba(245,243,238,0.08)',
                  transition: 'color 0.4s ease', cursor: 'default', whiteSpace: 'nowrap',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C8A45C'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,243,238,0.08)'; }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MICR Deep Dive ────────────────────────────────── */}
      <section style={{ backgroundColor: '#F5F3EE', padding: '100px 48px' }}>
        <div ref={micrRef} style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="micr-grid">
            <div>
              <div className="section-label" style={{ color: '#C8A45C', marginBottom: '20px' }}>Specialized Products</div>
              <h2 style={{
                fontSize: 'clamp(24px, 3vw, 40px)',
                fontWeight: 600, color: '#0A0A0A',
                lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em',
              }}>
                MICR Toner for Financial Institutions
              </h2>
              <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.75, marginBottom: '20px' }}>
                Magnetized for speed and security. Industry-leading financial institutions depend on quality Magnetic Ink Character Recognition (MICR) toner for more than just their cyan, magenta and yellow.
              </p>
              <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.75, marginBottom: '32px' }}>
                MICR is a code system that enables money to travel around the globe and land in the correct bank account. Those highly stylized characters at the bottom of your checks are magnetized to allow machines to read routing information quickly and securely.
              </p>
              <Link to="/order" className="btn-primary">
                Request MICR Quote
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: '🏦', title: 'Source Tech Printers', desc: 'Specialized MICR remanufacturing for Source Tech systems' },
                { icon: '🖨️', title: 'Lexmark & IBM', desc: 'Trusted MICR cartridges for Lexmark and IBM printers' },
                { icon: '✅', title: 'Troy (HP-based)', desc: 'HP printers altered for MICR use — fully supported' },
                { icon: '📋', title: 'ANSI/ABA Compliant', desc: 'Meets all banking industry magnetization standards' },
              ].map((item) => (
                <div key={item.title} style={{
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                  background: '#FFFFFF', border: '1px solid #E0DDD6',
                  borderRadius: '12px', padding: '20px',
                  transition: 'all 0.25s ease',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(200,164,92,0.3)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E0DDD6';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{ fontSize: '24px', flexShrink: 0 }} aria-hidden="true">{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A0A0A', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: '#8A8A8A', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1023px) { .micr-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── Recycling Section ─────────────────────────────── */}
      <section style={{ backgroundColor: '#0A0A0A', padding: '100px 48px' }}>
        <div ref={recyclingRef} style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '20px' }}>Sustainability</div>
          <h2 style={{
            fontSize: 'clamp(24px, 3vw, 44px)',
            fontWeight: 600, color: '#F5F3EE',
            lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em',
          }}>
            Value-added products and services
          </h2>
          <p style={{
            fontSize: '16px', color: '#8A8A8A', lineHeight: 1.75,
            maxWidth: '640px', margin: '0 auto 56px',
          }}>
            Our value-added products and services help you make eco-friendly choices for your home or office with the confidence that you are making a smart and responsible decision.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px',
          }} className="recycling-grid">
            {[
              {
                icon: '💰',
                title: 'Cost Reduction',
                desc: 'Our goal is to sell the best products at fair prices, providing significant cost reduction opportunities.',
              },
              {
                icon: '♻️',
                title: 'Waste Elimination',
                desc: 'Return your used ink and toner cartridges for recycling credit and responsible eco-friendly disposal.',
              },
              {
                icon: '🔒',
                title: 'Reliability',
                desc: 'Cartridges built without violating patents. Full reliability, compliance, and quality guaranteed.',
              },
            ].map((item) => (
              <div key={item.title} style={{
                background: 'rgba(245,243,238,0.03)',
                border: '1px solid rgba(245,243,238,0.07)',
                borderRadius: '16px', padding: '36px 28px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(200,164,92,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(200,164,92,0.2)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(245,243,238,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(245,243,238,0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '16px' }} aria-hidden="true">{item.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F5F3EE', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#8A8A8A', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 767px) { .recycling-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 767px) {
            section { padding-left: 24px !important; padding-right: 24px !important; }
          }
        `}</style>
      </section>
    </div>
  );
}
