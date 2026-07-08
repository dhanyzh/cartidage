import { useFadeInUp, useScaleIn } from '../hooks/useScrollAnimation';
import { Link } from 'react-router';

export default function About() {
  const leftRef   = useFadeInUp(0);
  const rightRef  = useScaleIn(0.15);
  const missionRef = useFadeInUp(0);
  const storyRef  = useFadeInUp(0);
  const valuesRef = useFadeInUp(0);

  return (
    <div style={{ position: 'relative', zIndex: 3 }}>

      {/* ── Page Header ──────────────────────────────────── */}
      <section style={{
        backgroundColor: '#FFFFFF',
        padding: '160px 48px 100px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid #E2E8F0',
      }}>
        {/* Decorative background */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(4,175,68,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} aria-hidden="true" />

        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '24px', color: '#04AF44' }}>
          About Us
        </div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 80px)',
          fontWeight: 700,
          color: '#191919',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          maxWidth: '800px',
          margin: '0 auto 24px',
        }}>
          Leading the way in sustainable printing
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#64748B',
          maxWidth: '560px',
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Helping businesses in Kuwait reduce print costs and carbon footprints through circular economy manufacturing since 2012.
        </p>

        {/* Key stats row */}
        <div style={{
          display: 'inline-flex',
          gap: '0',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#F8FAFC',
          marginTop: '8px',
        }}>
          {[
            { value: '12+', label: 'Years Exp' },
            { value: '4.4x', label: 'Lower Carbon' },
            { value: '100%', label: 'Guaranteed' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '20px 36px',
              borderRight: i < 2 ? '1px solid #E2E8F0' : 'none',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#0057A8', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', marginTop: '6px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Main About Content ────────────────────────────── */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '120px 48px' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '55% 45%',
          gap: '80px',
          alignItems: 'center',
        }} className="about-page-grid">

          <div ref={leftRef}>
            <div className="section-label" style={{ color: '#04AF44', marginBottom: '20px' }}>Our Story</div>
            <h2 style={{
              fontSize: 'clamp(24px, 3vw, 44px)',
              fontWeight: 600,
              color: '#191919',
              lineHeight: 1.1,
              marginBottom: '28px',
              letterSpacing: '-0.02em',
            }}>
              Committed to engineering validation since 2012
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.75, marginBottom: '20px' }}>
              Genuine Digital Company is Kuwait's leader in premium remanufactured toner and ink supplies. We build compatible mono, color, extended yield, and secure bank-grade MICR solutions matching strict OEM density and page yield specifications.
            </p>
            <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.75, marginBottom: '20px' }}>
              We employ circular economy principles to rebuild empty toner cartridges using brand new OPC drums, wiper blades, and premium color-matched chemical toners. This guarantees corporate users a flawless output that speaks of our commitment to excellence.
            </p>
            <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.75, marginBottom: '40px' }}>
              Every cartridge is individually validated and print-tested in-house by our certified technical team before packaging, ensuring corporate buyers get high-quality cartridges without high-cost OEM markups.
            </p>
            <Link to="/contact" className="btn-primary">
              Get in Touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div ref={rightRef} style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-16px',
              right: '-16px',
              width: '100px',
              height: '100px',
              border: '2px solid rgba(0, 87, 168, 0.15)',
              borderRadius: '12px',
            }} aria-hidden="true" />
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '4/5',
              boxShadow: '0 24px 64px rgba(0,0,0,0.06)',
              position: 'relative',
              zIndex: 1,
            }}>
              <img
                src="./images/img-office-interior.jpg"
                alt="Genuine Digital Company facility in Kuwait"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1023px) { .about-page-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 767px) { .about-page-grid > div:first-child { padding: 0 !important; } }
        `}</style>
      </section>

      {/* ── Mission ───────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '120px 48px', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '48px',
          fontSize: 'clamp(100px, 16vw, 200px)',
          fontWeight: 700,
          color: 'rgba(0, 87, 168, 0.03)',
          lineHeight: 1,
          fontFamily: 'Georgia, serif',
          userSelect: 'none',
          pointerEvents: 'none',
        }} aria-hidden="true">"</div>

        <div ref={missionRef} style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '32px', color: '#04AF44' }}>Our Mission</div>

          <blockquote style={{
            fontSize: 'clamp(22px, 3.5vw, 42px)',
            fontWeight: 500,
            color: '#191919',
            lineHeight: 1.25,
            letterSpacing: '-0.015em',
            margin: '0 0 40px',
            fontStyle: 'normal',
          }}>
            To provide the highest quality sustainable printing products and recovery services to corporate clients across Kuwait.
          </blockquote>

          <div style={{
            width: '60px', height: '2px',
            background: 'linear-gradient(90deg, transparent, #04AF44, transparent)',
            margin: '0 auto 40px',
          }} aria-hidden="true" />

          <p style={{
            fontSize: '17px',
            color: '#64748B',
            lineHeight: 1.75,
            maxWidth: '640px',
            margin: '0 auto',
          }}>
            Every remanufactured cartridge is 100% unconditionally guaranteed to perform, meeting or exceeding OEM equivalents. We source high-grade parts and toners to eliminate defects and printer fleet issues.
          </p>
        </div>
      </section>

      {/* ── Our Story / Kuwait Advantage ─────────────────── */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '120px 48px' }}>
        <div ref={storyRef} style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="section-label" style={{ color: '#04AF44', marginBottom: '20px' }}>Kuwait Made</div>
          <h2 style={{
            fontSize: 'clamp(24px, 3vw, 44px)',
            fontWeight: 600,
            color: '#191919',
            lineHeight: 1.1,
            marginBottom: '32px',
            letterSpacing: '-0.02em',
          }}>
            Engineered locally for rapid delivery & quality control
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="story-grid">
            <div>
              <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.75, marginBottom: '20px' }}>
                We stand behind our products with a complete, stress-free warranty on all remanufactured toner and ink cartridges. The density, lines, and quantity of copies match OEM equivalents, giving you peace of mind.
              </p>
              <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.75 }}>
                Additionally, we often utilize extended-life drums and premium components in our formulas, meaning our remanufactured cartridges frequently provide <strong style={{ color: '#191919' }}>higher page yields than original OEM cartridges</strong>.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.75, marginBottom: '20px' }}>
                We are proud to do our remanufacturing locally in Kuwait. Our in-house technical support team is always available to help configure printing parameters or resolve mechanical questions for your fleet.
              </p>
              {/* Commitments panel */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '24px',
              }}>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', marginBottom: '14px', fontWeight: 600 }}>Our Commitments</div>
                {[
                  '100% patent-safe cartridge builds',
                  'In-house expert technical support',
                  'Full performance replacement warranty',
                  'Zero-waste-to-landfill collections',
                ].map((item) => (
                  <div key={item} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 0',
                    borderBottom: '1px solid #E2E8F0',
                    fontSize: '14px',
                    color: '#64748B',
                  }}>
                    <span style={{ color: '#04AF44', fontSize: '16px', fontWeight: 700 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 767px) { .story-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── Values Grid ──────────────────────────────────── */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '120px 48px' }}>
        <div ref={valuesRef} style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: '20px', color: '#04AF44' }}>Core Values</div>
            <h2 style={{
              fontSize: 'clamp(24px, 3vw, 44px)',
              fontWeight: 600,
              color: '#191919',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              Principles driving our circular design
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }} className="about-values-grid">
            {[
              { emoji: '🏆', title: 'Quality First', desc: 'Every cartridge meets or exceeds OEM standards — no exceptions.' },
              { emoji: '🌿', title: 'Eco-Friendly', desc: 'LCA confirmed 4.4x carbon savings and empty cartridge collections.' },
              { emoji: '💰', title: 'Fair Pricing', desc: 'Save up to 40% on printing overhead for corporate networks.' },
              { emoji: '🔒', title: 'Full Compliance', desc: 'Zero patent violations. Completely safe and compliant.' },
            ].map((val) => (
              <div key={val.title} style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '32px 24px',
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
                <div style={{ fontSize: '36px', marginBottom: '16px' }} aria-hidden="true">{val.emoji}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#191919', marginBottom: '8px' }}>{val.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.65 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1023px) { .about-values-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 640px)  { .about-values-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 767px) {
            section { padding-left: 24px !important; padding-right: 24px !important; }
          }
        `}</style>
      </section>
    </div>
  );
}
