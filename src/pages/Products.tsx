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
    { id: 'all',        label: 'All Portfolio' },
    { id: 'compatible', label: 'Compatible Toner' },
    { id: 'toner',      label: 'Mono & Color' },
    { id: 'yield',      label: 'Extended Yield' },
    { id: 'micr',       label: 'MICR Toner' },
    { id: 'service',    label: 'Sales & Service' },
    { id: 'eco',        label: 'Collections' },
  ];

  const products = [
    {
      id: 'compatible',
      num: '01',
      badge: 'Genuine Brand',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0057A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      ),
      title: 'Genuine Brand Compatible Toner Cartridges',
      body: 'Premium quality fresh-built laser toner cartridges sold under our registered Genuine Brand. Flawless density, high contrast, and perfect compliance for office printing networks.',
      image: '/images/toner_cartridge_box.png',
      features: [
        'Fresh chemical powder formulation',
        '100% brand new engineered casing',
        'Zero smudging or banding lines',
        'Built for high-volume office use',
        'Fully covered by performance guarantee',
      ],
    },
    {
      id: 'toner',
      num: '02',
      badge: 'Certified Quality',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0057A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <path d="M6 12h.01M18 12h.01"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      title: 'Mono & Color Cartridges',
      body: "Premium compatible toner and ink cartridges that equal or exceed OEM print yields. Rigorously tested for HP, Canon, Brother, Epson, Xerox, and Samsung printers.",
      image: '/images/compatible_toners.png',
      features: [
        'Matches OEM density & yields',
        'Certified new components',
        '100% performance warranty',
        'Vibrant color chemistry',
        'Tested in-house in Kuwait',
      ],
    },
    {
      id: 'yield',
      num: '03',
      badge: 'High Performance',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0057A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      title: 'Extended Yield Toner',
      body: 'Utilizes long-life drums and specialized toner loads to exceed standard OEM yields. Perfect for high-volume office environments seeking to minimize costs.',
      image: '/images/extended_yield_printer.png',
      features: [
        'Higher page counts than OEM',
        'Lower cost-per-page ratio',
        'Fewer cartridge changes',
        'Premium high-density toner',
        'Reliable wiper blades & seals',
      ],
    },
    {
      id: 'micr',
      num: '04',
      badge: 'Financial Grade',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0057A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="1" y="4" width="22" height="16" rx="2"/>
          <path d="M1 10h22"/>
          <path d="M7 15h3M14 15h3"/>
        </svg>
      ),
      title: 'MICR Toner Cartridges',
      body: 'Magnetized character toner engineered for automatic routing recognition. Trusted by banking institutions across Kuwait. Supported on Lexmark, Source Tech, IBM, and Troy.',
      image: '/images/micr_check_printing.png',
      features: [
        'Meets ANSI & ABA check rules',
        'Secure routing recognition',
        'Consistent magnetic signature',
        'Reduces check rejection rates',
        'Strictly batch-tested',
      ],
    },
    {
      id: 'service',
      num: '05',
      badge: 'Sales & Service',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0057A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      title: 'Photocopier & Printer Sales & Service',
      body: 'Hardware acquisition, lease contracts, and expert maintenance support for enterprise photocopiers and multi-function printers. Certified Kuwait technicians on call.',
      image: '/images/office_photocopier.png',
      features: [
        'New & refurbished photocopier sales',
        'Cost-effective equipment leasing',
        'Certified repair technicians in Kuwait',
        'Preventative maintenance agreements',
        'Fast 4-hour on-site diagnostic response',
      ],
    },
    {
      id: 'eco',
      num: '06',
      badge: 'Zero Landfill',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0057A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 5.8 17 4.5 19 2c1 2 2 4.5 2 8a7 7 0 0 1-12 10z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
        </svg>
      ),
      title: 'Collections & Recycling',
      body: 'Return your empty toner and ink cartridge cores. Our zero-waste-to-landfill process keeps plastics out of landfills and rewards your business with recycling credit.',
      image: '/images/cartridge_recycling.png',
      features: [
        'Free core pickup programs',
        'Earn office recycling credits',
        'LCA certified carbon offsets',
        'Zero waste goes to landfills',
        'Supports corporate green goals',
      ],
    },
  ];

  const displayProducts = activeTab === 'all' ? products : products.filter(p => p.id === activeTab);
  const brands = ['HP', 'EPSON', 'CANON', 'SAMSUNG', 'XEROX', 'BROTHER', 'LEXMARK'];

  return (
    <div style={{ position: 'relative', zIndex: 3 }}>

      {/* ── Page Header ──────────────────────────────────── */}
      <section style={{
        backgroundColor: '#FFFFFF',
        padding: '160px 48px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid #E2E8F0',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(4,175,68,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} aria-hidden="true" />
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '24px', color: '#04AF44' }}>Our Products</div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 80px)',
          fontWeight: 700,
          color: '#191919',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          marginBottom: '24px',
        }}>
          Compatible<br />Imaging Supplies
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#64748B',
          maxWidth: '485px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Premium quality at competitive prices. Tested to equal or exceed OEM performance specifications.
        </p>
      </section>

      {/* ── Products Grid ─────────────────────────────────── */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '100px 48px 120px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          {/* Tabs */}
          <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div role="tablist" aria-label="Product categories" style={{
              display: 'inline-flex',
              gap: '4px',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
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
                    background: activeTab === tab.id ? '#04AF44' : 'transparent',
                    color: activeTab === tab.id ? '#FFFFFF' : '#64748B',
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
                  border: '1px solid #E2E8F0',
                  borderRadius: '20px',
                  padding: '48px 36px',
                  transition: 'all 0.35s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 24px 64px rgba(0,0,0,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(0, 87, 168, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Blue/Green left accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px',
                  background: 'linear-gradient(180deg, #0057A8, #04AF44, #0057A8)',
                  borderRadius: '3px 0 0 3px',
                }} aria-hidden="true" />

                {p.image && (
                  <div style={{
                    width: 'calc(100% + 72px)',
                    height: '200px',
                    margin: '-48px -36px 28px -36px',
                    overflow: 'hidden',
                    borderBottom: '1px solid #E2E8F0',
                  }}>
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}

                {/* Badge */}
                <div style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  background: 'rgba(4,175,68,0.1)',
                  border: '1px solid rgba(4,175,68,0.2)',
                  color: '#04AF44',
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
                  color: 'rgba(4,175,68,0.12)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                }}>{p.num}</div>

                {/* Icon */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '12px',
                  background: 'rgba(0, 87, 168, 0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  {p.icon}
                </div>

                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#191919',
                  marginBottom: '14px',
                  letterSpacing: '-0.01em',
                }}>{p.title}</h2>

                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.7, marginBottom: '24px' }}>{p.body}</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                  {p.features.map((f) => (
                    <li key={f} style={{
                      fontSize: '13px', color: '#64748B',
                      padding: '9px 0', borderTop: '1px solid #E2E8F0',
                      display: 'flex', alignItems: 'center', gap: '10px',
                    }}>
                      <span style={{
                        width: '6px', height: '6px',
                        borderRadius: '50%', background: '#04AF44', flexShrink: 0,
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
      <section style={{ backgroundColor: '#F8FAFC', padding: '100px 48px', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div ref={brandsTitleRef} style={{ marginBottom: '72px' }}>
            <div className="section-label" style={{ marginBottom: '20px', color: '#04AF44' }}>Supported Brands</div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 600,
              color: '#191919',
              lineHeight: 1.05,
              maxWidth: '700px',
              letterSpacing: '-0.02em',
            }}>
              Compatible supplies supporting major printer networks
            </h2>
          </div>

          {/* Marquee */}
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            {/* Fade edges */}
            <div style={{
              position: 'absolute', inset: '0 0 0 auto', width: '100px',
              background: 'linear-gradient(90deg, transparent, #F8FAFC)', zIndex: 2, pointerEvents: 'none',
            }} aria-hidden="true" />
            <div style={{
              position: 'absolute', inset: '0 auto 0 0', width: '100px',
              background: 'linear-gradient(90deg, #F8FAFC, transparent)', zIndex: 2, pointerEvents: 'none',
            }} aria-hidden="true" />
            <div style={{
              display: 'flex', gap: '80px', alignItems: 'center',
              animation: 'marquee 18s linear infinite', width: 'max-content',
            }}>
              {[...brands, ...brands].map((brand, i) => (
                <span key={`${brand}-${i}`} style={{
                  fontSize: 'clamp(32px, 5vw, 72px)',
                  fontWeight: 700, letterSpacing: '0.06em',
                  color: 'rgba(0, 87, 168, 0.08)',
                  transition: 'color 0.4s ease', cursor: 'default', whiteSpace: 'nowrap',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#0057A8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(0, 87, 168, 0.08)'; }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MICR Deep Dive ────────────────────────────────── */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '100px 48px' }}>
        <div ref={micrRef} style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="micr-grid">
            <div>
              <div className="section-label" style={{ color: '#04AF44', marginBottom: '20px' }}>Specialized Products</div>
              <h2 style={{
                fontSize: 'clamp(24px, 3vw, 40px)',
                fontWeight: 600, color: '#191919',
                lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em',
              }}>
                MICR Toner for Financial Institutions
              </h2>
              <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.75, marginBottom: '20px' }}>
                Magnetized for automatic routing recognition. Banking entities and corporate accounting departments rely on premium Magnetic Ink Character Recognition (MICR) toner for secure check issuance.
              </p>
              <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.75, marginBottom: '32px' }}>
                MICR codes at the bottom of checks must meet absolute magnetization standards so check scanners can read the routing values without errors. Our compatible MICR cartridges are engineered for Lexmark, IBM, Source Tech, and Troy (HP-based) systems, ensuring complete security.
              </p>
              <Link to="/order" className="btn-primary">
                Request MICR Quote
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: '🏦', title: 'Source Tech Systems', desc: 'Compliant MICR cartridges built for Source Tech fleets.' },
                { icon: '🖨️', title: 'Lexmark & IBM', desc: 'Secure, high-speed check characters printing.' },
                { icon: '✅', title: 'Troy (HP-based) Printers', desc: 'Batch compatible cartridges matching Troy specifications.' },
                { icon: '📋', title: 'ANSI & ABA Compliant', desc: 'Tested to clear banking scanner sorting lines.' },
              ].map((item) => (
                <div key={item.title} style={{
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                  background: '#F8FAFC', border: '1px solid #E2E8F0',
                  borderRadius: '12px', padding: '20px',
                  transition: 'all 0.25s ease',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 87, 168, 0.25)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{ fontSize: '24px', flexShrink: 0 }} aria-hidden="true">{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#191919', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.6 }}>{item.desc}</div>
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
      <section style={{ backgroundColor: '#F8FAFC', padding: '100px 48px' }}>
        <div ref={recyclingRef} style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '20px', color: '#04AF44' }}>Sustainability</div>
          <h2 style={{
            fontSize: 'clamp(24px, 3vw, 44px)',
            fontWeight: 600, color: '#191919',
            lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em',
          }}>
            Eco-services designed for carbon savings
          </h2>
          <p style={{
            fontSize: '16px', color: '#64748B', lineHeight: 1.75,
            maxWidth: '640px', margin: '0 auto 56px',
          }}>
            We manage your fleet's cartridge life cycle. Recovering empty cartridges keeps raw plastics out of the environment and offsets carbon footprints.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px',
          }} className="recycling-grid">
            {[
              {
                icon: '💰',
                title: 'Fleet Savings',
                desc: 'Our compatible cartridges reduce annual office printing supplies budgets by up to 40%.',
              },
              {
                icon: '♻️',
                title: 'Empty Recoveries',
                desc: 'Earn recycling credits by returning empty cores, preventing landfill dump waste.',
              },
              {
                icon: '🔒',
                title: 'Patent Safe',
                desc: 'Engineered safely without trademark infringements, protecting corporate clients.',
              },
            ].map((item) => (
              <div key={item.title} style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px', padding: '36px 28px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 87, 168, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '16px' }} aria-hidden="true">{item.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#191919', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.65 }}>{item.desc}</p>
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
