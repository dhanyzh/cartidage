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
        backgroundColor: '#0A0A0A',
        padding: '160px 48px 100px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative background */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(200,164,92,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} aria-hidden="true" />

        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '24px' }}>
          About Us
        </div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 80px)',
          fontWeight: 700,
          color: '#F5F3EE',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          maxWidth: '800px',
          margin: '0 auto 24px',
        }}>
          Leading the way in remanufactured cartridge supplies
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#8A8A8A',
          maxWidth: '520px',
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Proudly serving Kuwait's businesses with premium quality since 2012.
        </p>

        {/* Key stats row */}
        <div style={{
          display: 'inline-flex',
          gap: '0',
          border: '1px solid rgba(245,243,238,0.08)',
          borderRadius: '16px',
          overflow: 'hidden',
          marginTop: '8px',
        }}>
          {[
            { value: '12+', label: 'Years' },
            { value: '5',   label: 'Brands' },
            { value: '100%', label: 'Guaranteed' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '20px 36px',
              borderRight: i < 2 ? '1px solid rgba(245,243,238,0.08)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#C8A45C', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', marginTop: '6px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Main About Content ────────────────────────────── */}
      <section style={{ backgroundColor: '#F5F3EE', padding: '120px 48px' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '55% 45%',
          gap: '80px',
          alignItems: 'center',
        }} className="about-page-grid">

          <div ref={leftRef}>
            <div className="section-label" style={{ color: '#C8A45C', marginBottom: '20px' }}>Our Story</div>
            <h2 style={{
              fontSize: 'clamp(24px, 3vw, 44px)',
              fontWeight: 600,
              color: '#0A0A0A',
              lineHeight: 1.1,
              marginBottom: '28px',
              letterSpacing: '-0.02em',
            }}>
              Committed to quality since 2012
            </h2>
            <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.75, marginBottom: '20px' }}>
              We are the name in the field of remanufactured cartridge supplies distribution in the region. Leading remanufacturer of HP, Epson, Canon, Samsung and Xerox supplies since 2012 — committed to what we are entrusted with.
            </p>
            <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.75, marginBottom: '20px' }}>
              Our list of valuable clients whose satisfaction with our services speaks of what we have delivered. Emphasizing our commitment to distributing <strong style={{ color: '#0A0A0A' }}>ONLY QUALITY products</strong>, we are committed to what we say.
            </p>
            <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.75, marginBottom: '40px' }}>
              Genuine Toner Cartridge prioritizes quality and customer satisfaction over low-cost cutbacks. Excellence dictates every movement in our organization — from streamlined logistics to world-class customer service.
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
              border: '2px solid rgba(200,164,92,0.15)',
              borderRadius: '12px',
            }} aria-hidden="true" />
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '4/5',
              boxShadow: '0 24px 80px rgba(0,0,0,0.10)',
              position: 'relative',
              zIndex: 1,
            }}>
              <img
                src="./images/img-office-interior.jpg"
                alt="Genuine Toner Cartridges facility in Kuwait"
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
      <section style={{ backgroundColor: '#0A0A0A', padding: '120px 48px', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '48px',
          fontSize: 'clamp(100px, 16vw, 200px)',
          fontWeight: 700,
          color: 'rgba(200,164,92,0.04)',
          lineHeight: 1,
          fontFamily: 'Georgia, serif',
          userSelect: 'none',
          pointerEvents: 'none',
        }} aria-hidden="true">"</div>

        <div ref={missionRef} style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '32px' }}>Our Mission</div>

          <blockquote style={{
            fontSize: 'clamp(22px, 3.5vw, 42px)',
            fontWeight: 500,
            color: '#F5F3EE',
            lineHeight: 1.25,
            letterSpacing: '-0.015em',
            margin: '0 0 40px',
            fontStyle: 'normal',
          }}>
            We are determined to provide the highest quality sales and service to every Genuine Toner Cartridges customer.
          </blockquote>

          <div style={{
            width: '60px', height: '2px',
            background: 'linear-gradient(90deg, transparent, #C8A45C, transparent)',
            margin: '0 auto 40px',
          }} aria-hidden="true" />

          <p style={{
            fontSize: '17px',
            color: '#8A8A8A',
            lineHeight: 1.75,
            maxWidth: '640px',
            margin: '0 auto',
          }}>
            Every Genuine Toner cartridge is 100% unconditionally guaranteed to perform, meeting or exceeding its comparable OEM cartridge. Properly remanufactured toner cartridges will not damage your copy machine or printer.
          </p>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F5F3EE', padding: '120px 48px' }}>
        <div ref={storyRef} style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="section-label" style={{ color: '#C8A45C', marginBottom: '20px' }}>Kuwait Made</div>
          <h2 style={{
            fontSize: 'clamp(24px, 3vw, 44px)',
            fontWeight: 600,
            color: '#0A0A0A',
            lineHeight: 1.1,
            marginBottom: '32px',
            letterSpacing: '-0.02em',
          }}>
            Made in Kuwait, trusted region-wide
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="story-grid">
            <div>
              <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.75, marginBottom: '20px' }}>
                We delight in happy, satisfied, and loyal clients. We stand by our products — providing warranty on all our remanufactured ink and toner cartridges. Quality and quantity of copies using a remanufactured cartridge will match or exceed that of an OEM cartridge.
              </p>
              <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.75 }}>
                Frequently a remanufacturer will install a longer life drum. In this case, the remanufactured cartridge will provide <strong style={{ color: '#0A0A0A' }}>more copies than the OEM cartridge</strong>.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.75, marginBottom: '20px' }}>
                We are proud to say our remanufactured cartridges are <strong style={{ color: '#0A0A0A' }}>made in Kuwait</strong>. We have in-house technical experts to assist you in obtaining optimum output from your remanufactured ink and toner cartridge.
              </p>
              {/* Certifications */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #E0DDD6',
                borderRadius: '16px',
                padding: '24px',
              }}>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8A8A8A', marginBottom: '14px' }}>Our Commitments</div>
                {[
                  'No patent violations',
                  'In-house technical expertise',
                  'Full warranty on all products',
                  'Eco-friendly recycling program',
                ].map((item) => (
                  <div key={item} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 0',
                    borderBottom: '1px solid #F0EDE6',
                    fontSize: '14px',
                    color: '#555',
                  }}>
                    <span style={{ color: '#C8A45C', fontSize: '16px', fontWeight: 700 }}>✓</span>
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
      <section style={{ backgroundColor: '#0A0A0A', padding: '120px 48px' }}>
        <div ref={valuesRef} style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: '20px' }}>Core Values</div>
            <h2 style={{
              fontSize: 'clamp(24px, 3vw, 44px)',
              fontWeight: 600,
              color: '#F5F3EE',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              What drives us every day
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }} className="about-values-grid">
            {[
              { emoji: '🏆', title: 'Quality First', desc: 'Every cartridge meets or exceeds OEM standards — no exceptions.' },
              { emoji: '🌿', title: 'Eco-Friendly', desc: 'Recycling program to reduce waste and carbon footprint.' },
              { emoji: '💰', title: 'Fair Pricing', desc: 'Best products at fair prices without compromising quality.' },
              { emoji: '🔒', title: 'Full Compliance', desc: 'No patent violations. Full legal and technical compliance.' },
            ].map((val) => (
              <div key={val.title} style={{
                background: 'rgba(245,243,238,0.03)',
                border: '1px solid rgba(245,243,238,0.07)',
                borderRadius: '16px',
                padding: '32px 24px',
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
                <div style={{ fontSize: '36px', marginBottom: '16px' }} aria-hidden="true">{val.emoji}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#F5F3EE', marginBottom: '8px' }}>{val.title}</h3>
                <p style={{ fontSize: '13px', color: '#8A8A8A', lineHeight: 1.65 }}>{val.desc}</p>
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
