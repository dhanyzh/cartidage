import { Link } from 'react-router';
import { useFadeInUp, useFadeInLeft, useStaggerChildren, useScaleIn } from '../hooks/useScrollAnimation';
import { useState, useEffect, useRef, type FormEvent } from 'react';

/* ─── Animated Counter ─────────────────────────────────── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ─── Hero Section ─────────────────────────────────────── */
function Hero() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="home"
      aria-label="Hero"
      style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '130px 48px 90px',
      }}
    >
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${4 + i * 2}px`,
          height: `${4 + i * 2}px`,
          borderRadius: '50%',
          background: `rgba(200,164,92,${0.15 + i * 0.05})`,
          top: `${15 + i * 12}%`,
          left: `${10 + i * 14}%`,
          animation: `float ${3 + i * 0.7}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
          pointerEvents: 'none',
        }} aria-hidden="true" />
      ))}

      <div style={{
        maxWidth: '1400px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
      }} className="hero-grid">

        {/* Left — Headline */}
        <div>
          <div className="section-label" style={{ marginBottom: '24px', animationDelay: '0s' }}>
            Remanufactured Toner Cartridges
          </div>

          <h1 style={{
            fontSize: 'clamp(48px, 6vw, 88px)',
            fontWeight: 700,
            color: '#F5F3EE',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            marginBottom: '28px',
          }}>
            <span style={{ display: 'block' }}>GENUINE</span>
            <span style={{ display: 'block', color: '#C8A45C' }}>TONER</span>
            <span style={{ display: 'block' }}>CARTRIDGES</span>
          </h1>

          <p style={{
            fontSize: '17px',
            color: '#8A8A8A',
            lineHeight: 1.7,
            maxWidth: '420px',
            marginBottom: '40px',
          }}>
            Kuwait's trusted source for quality remanufactured cartridges since 2012. Equal or exceed OEM performance — guaranteed.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '56px' }}>
            <Link to="/order" className="btn-primary" aria-label="Place an order">
              Order Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/products" className="btn-outline">
              View Products
            </Link>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { icon: '✓', text: '12+ Years Experience' },
              { icon: '✓', text: '100% Quality Guaranteed' },
              { icon: '✓', text: 'Kuwait-Made' },
            ].map((badge) => (
              <div key={badge.text} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                fontSize: '13px',
                color: '#8A8A8A',
              }}>
                <span style={{ color: '#C8A45C', fontWeight: 700 }}>{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Contact Form */}
        <div style={{
          backgroundColor: 'rgba(10, 10, 10, 0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(245, 243, 238, 0.08)',
          borderRadius: '20px',
          padding: '44px',
        }}>
          {/* Gold top accent */}
          <div style={{
            height: '2px',
            background: 'linear-gradient(90deg, #C8A45C, #E8D5A3, #C8A45C)',
            borderRadius: '2px',
            marginBottom: '32px',
          }} aria-hidden="true" />

          <h2 style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#F5F3EE',
            marginBottom: '8px',
            letterSpacing: '-0.01em',
          }}>
            Request a Quote
          </h2>
          <p style={{ fontSize: '14px', color: '#8A8A8A', marginBottom: '28px', lineHeight: 1.6 }}>
            Our team will respond within 24 hours.
          </p>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #C8A45C, #E8D5A3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#F5F3EE', marginBottom: '8px' }}>Request Sent!</h3>
              <p style={{ fontSize: '14px', color: '#8A8A8A' }}>We'll contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label htmlFor="hero-name" className="form-label">Name *</label>
                  <input id="hero-name" type="text" required placeholder="Your name" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input" />
                </div>
                <div>
                  <label htmlFor="hero-email" className="form-label">Email *</label>
                  <input id="hero-email" type="email" required placeholder="you@company.com" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input" />
                </div>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="hero-phone" className="form-label">Phone</label>
                <input id="hero-phone" type="tel" placeholder="+965 XXXX XXXX" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input" />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="hero-company" className="form-label">Company</label>
                <input id="hero-company" type="text" placeholder="Company name" value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="form-input" />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="hero-message" className="form-label">What do you need?</label>
                <textarea id="hero-message" rows={3} placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input" style={{ resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '13px' }}
              >
                {loading ? (
                  <span className="animate-spin" style={{ width: '16px', height: '16px', border: '2px solid rgba(10,10,10,0.3)', borderTopColor: '#0A0A0A', borderRadius: '50%', display: 'inline-block' }} />
                ) : 'Submit Request'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }} aria-hidden="true">
        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#555' }}>Scroll</span>
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(180deg, #C8A45C, transparent)',
          animation: 'scrollIndicator 1.5s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 767px) {
          section[aria-label="Hero"] { padding: 100px 24px 80px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── Stats Strip ──────────────────────────────────────── */
function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const years = useCountUp(12, 1600, started);
  const brands = useCountUp(5, 1200, started);

  return (
    <section ref={ref} style={{
      position: 'relative',
      zIndex: 3,
      background: 'linear-gradient(135deg, #C8A45C 0%, #D4B76A 50%, #C8A45C 100%)',
      padding: '0 48px',
    }} aria-label="Key statistics">
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderLeft: '1px solid rgba(10,10,10,0.12)',
      }} className="stats-strip-grid">
        {[
          { value: `${years}+`, suffix: '', label: 'Years in Business', icon: '🏆' },
          { value: `${brands}`, suffix: '', label: 'Major Brands Supported', icon: '🖨️' },
          { value: '100', suffix: '%', label: 'Quality Guarantee', icon: '✅' },
          { value: '24', suffix: 'hr', label: 'Response Time', icon: '⚡' },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: '36px 32px',
            borderRight: '1px solid rgba(10,10,10,0.12)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '6px' }} aria-hidden="true">{stat.icon}</div>
            <div style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, color: '#0A0A0A', lineHeight: 1, letterSpacing: '-0.02em' }}>
              {stat.value}<span style={{ fontSize: '60%' }}>{stat.suffix}</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(10,10,10,0.6)', marginTop: '8px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 767px) {
          .stats-strip-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── About Preview ────────────────────────────────────── */
function AboutPreview() {
  const leftRef = useFadeInUp(0);
  const rightRef = useFadeInUp(0.15);

  return (
    <section id="about" aria-label="About Us" style={{
      position: 'relative',
      zIndex: 3,
      backgroundColor: '#F5F3EE',
      padding: '140px 48px',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        gap: '80px',
        alignItems: 'center',
      }} className="about-grid">

        {/* Left */}
        <div ref={leftRef}>
          <div className="section-label" style={{ color: '#C8A45C', marginBottom: '24px' }}>
            About Us
          </div>
          <div className="gold-line" style={{ marginBottom: '28px' }} aria-hidden="true" />

          <h2 style={{
            fontSize: 'clamp(28px, 3vw, 48px)',
            fontWeight: 600,
            color: '#0A0A0A',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '28px',
          }}>
            Kuwait's leading remanufactured cartridge supplier since 2012
          </h2>

          <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.75, marginBottom: '20px' }}>
            We are the name in remanufactured cartridge supplies distribution across the region. Leading remanufacturer of HP, Epson, Canon, Samsung and Xerox supplies — committed to quality above all else.
          </p>
          <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.75, marginBottom: '40px' }}>
            Our valued clients speak for what we have delivered. Emphasizing our commitment to distributing <strong style={{ color: '#0A0A0A' }}>only quality products</strong>, we stand by every cartridge we produce.
          </p>

          <Link to="/about" className="btn-ghost-gold">
            Our Story
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Right — Image with accent */}
        <div ref={rightRef} style={{ position: 'relative' }}>
          {/* Decorative gold square */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '120px',
            height: '120px',
            border: '2px solid rgba(200,164,92,0.2)',
            borderRadius: '12px',
            zIndex: 0,
          }} aria-hidden="true" />

          <div style={{
            position: 'relative',
            zIndex: 1,
            borderRadius: '16px',
            overflow: 'hidden',
            aspectRatio: '4/5',
            boxShadow: '0 24px 80px rgba(0,0,0,0.12)',
          }}>
            <img
              src="./images/img-office-interior.jpg"
              alt="Genuine Toner Cartridges office and production facility in Kuwait"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Overlay badge */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              background: 'rgba(10,10,10,0.88)',
              backdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: '16px 20px',
              border: '1px solid rgba(200,164,92,0.2)',
            }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C8A45C', marginBottom: '4px' }}>Established</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#F5F3EE', lineHeight: 1 }}>2012</div>
              <div style={{ fontSize: '12px', color: '#8A8A8A', marginTop: '4px' }}>Made in Kuwait</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { .about-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 767px) { section[aria-label="About Us"] { padding: 80px 24px !important; } }
      `}</style>
    </section>
  );
}

/* ─── Mission Section ──────────────────────────────────── */
function Mission() {
  const ref = useFadeInUp(0);

  return (
    <section aria-label="Our Mission" style={{
      position: 'relative',
      zIndex: 3,
      backgroundColor: '#0A0A0A',
      padding: '140px 48px',
      overflow: 'hidden',
    }}>
      {/* Large decorative quote mark */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '48px',
        fontSize: 'clamp(120px, 18vw, 240px)',
        fontWeight: 700,
        color: 'rgba(200,164,92,0.04)',
        lineHeight: 1,
        fontFamily: 'Georgia, serif',
        userSelect: 'none',
        pointerEvents: 'none',
      }} aria-hidden="true">"</div>

      <div ref={ref} style={{
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '32px' }}>
          Our Mission
        </div>

        <blockquote style={{
          fontSize: 'clamp(22px, 3.5vw, 44px)',
          fontWeight: 500,
          color: '#F5F3EE',
          lineHeight: 1.25,
          letterSpacing: '-0.015em',
          margin: 0,
          fontStyle: 'normal',
        }}>
          We are determined to provide the highest quality sales and service to every Genuine Toner Cartridges customer.
        </blockquote>

        <div style={{
          width: '60px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #C8A45C, transparent)',
          margin: '40px auto',
        }} aria-hidden="true" />

        <p style={{
          fontSize: '17px',
          color: '#8A8A8A',
          lineHeight: 1.75,
          maxWidth: '640px',
          margin: '0 auto 40px',
        }}>
          Every Genuine Toner cartridge is 100% unconditionally guaranteed to perform, meeting or exceeding its comparable OEM cartridge. Properly remanufactured toner cartridges will not damage your copy machine or printer.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products" className="btn-primary">
            Explore Products
          </Link>
          <Link to="/contact" className="btn-outline">
            Contact Us
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) { section[aria-label="Our Mission"] { padding: 80px 24px !important; } }
      `}</style>
    </section>
  );
}

/* ─── Products Preview ─────────────────────────────────── */
function ProductsPreview() {
  const headerRef = useFadeInUp(0);
  const cardsRef = useStaggerChildren(0.12);

  const products = [
    {
      num: '01',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A45C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <path d="M6 12h.01M18 12h.01"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      title: 'Laser Toner Cartridges',
      body: "Remanufactured to Genuine Toner Cartridges' exacting standards. Recycled laser toner cartridges equal or outperform new OEM cartridges. Supporting HP, Epson, Canon, Samsung and Xerox.",
      features: ['OEM-level output quality', 'Extended drum life', '100% performance guarantee'],
    },
    {
      num: '02',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A45C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="1" y="4" width="22" height="16" rx="2"/>
          <path d="M1 10h22"/>
          <path d="M7 15h3M14 15h3"/>
        </svg>
      ),
      title: 'MICR Toner',
      body: 'Magnetized for speed and security. Industry-leading financial institutions depend on quality MICR toner. Remanufactured for Source Tech, Lexmark, IBM and Troy printers.',
      features: ['Bank-grade magnetization', 'ANSI standard compliant', 'Financial institution trusted'],
    },
    {
      num: '03',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A45C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 5.8 17 4.5 19 2c1 2 2 4.5 2 8a7 7 0 0 1-12 10z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
        </svg>
      ),
      title: 'Recycling Program',
      body: 'Return your used ink and toner cartridges for recycling credit. We prioritize quality and customer satisfaction with full warranty on all remanufactured cartridges.',
      features: ['Eco-friendly disposal', 'Recycling credit system', 'Reduce office waste'],
    },
  ];

  return (
    <section id="products" aria-label="Our Products" style={{
      position: 'relative',
      zIndex: 3,
      backgroundColor: '#F5F3EE',
      padding: '140px 48px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="section-label" style={{ justifyContent: 'center', color: '#C8A45C', marginBottom: '20px' }}>
            What We Offer
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 600,
            color: '#0A0A0A',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Premium Remanufactured Toner Cartridges
          </h2>
        </div>

        <div ref={cardsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }} className="products-grid">
          {products.map((p) => (
            <article
              key={p.num}
              className="card-gold-hover"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0DDD6',
                borderRadius: '16px',
                padding: '48px 36px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Gold left accent bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '3px',
                background: 'linear-gradient(180deg, #C8A45C, #E8D5A3, #C8A45C)',
                borderRadius: '3px 0 0 3px',
              }} aria-hidden="true" />

              {/* Number */}
              <div style={{
                fontSize: '56px',
                fontWeight: 200,
                color: 'rgba(200,164,92,0.15)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                marginBottom: '20px',
                fontFamily: 'var(--font-sans)',
              }}>{p.num}</div>

              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: 'rgba(200,164,92,0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                {p.icon}
              </div>

              <h3 style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#0A0A0A',
                marginBottom: '14px',
                letterSpacing: '-0.01em',
              }}>{p.title}</h3>

              <p style={{
                fontSize: '14px',
                color: '#777',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}>{p.body}</p>

              {/* Feature list */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                {p.features.map((f) => (
                  <li key={f} style={{
                    fontSize: '13px',
                    color: '#555',
                    padding: '8px 0',
                    borderTop: '1px solid #F0EDE6',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span style={{
                      width: '6px', height: '6px',
                      borderRadius: '50%',
                      background: '#C8A45C',
                      flexShrink: 0,
                    }} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link to="/products" className="btn-ghost-gold">
                Learn more
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { .products-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px)  { .products-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 767px) { section[aria-label="Our Products"] { padding: 80px 24px !important; } }
      `}</style>
    </section>
  );
}

/* ─── Brands Section ───────────────────────────────────── */
function Brands() {
  const titleRef = useFadeInLeft(0);
  const brands = ['HP', 'EPSON', 'CANON', 'SAMSUNG', 'XEROX'];

  return (
    <section aria-label="Supported Brands" style={{
      position: 'relative',
      zIndex: 3,
      backgroundColor: '#0A0A0A',
      padding: '120px 48px',
      overflow: 'hidden',
    }}>
      {/* Background text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        fontSize: 'clamp(100px, 20vw, 280px)',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.02)',
        whiteSpace: 'nowrap',
        letterSpacing: '0.1em',
        userSelect: 'none',
        pointerEvents: 'none',
      }} aria-hidden="true">BRANDS</div>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div ref={titleRef} style={{ marginBottom: '80px' }}>
          <div className="section-label" style={{ marginBottom: '24px' }}>Trusted Brands</div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 600,
            color: '#F5F3EE',
            lineHeight: 1.05,
            maxWidth: '700px',
            letterSpacing: '-0.02em',
          }}>
            We remanufacture cartridges for the world's leading printer manufacturers
          </h2>
        </div>

        {/* Marquee brand display */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          {/* Fade edges */}
          <div style={{
            position: 'absolute', inset: '0 0 0 auto', width: '120px',
            background: 'linear-gradient(90deg, transparent, #0A0A0A)',
            zIndex: 2, pointerEvents: 'none',
          }} aria-hidden="true" />
          <div style={{
            position: 'absolute', inset: '0 auto 0 0', width: '120px',
            background: 'linear-gradient(90deg, #0A0A0A, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} aria-hidden="true" />

          <div style={{
            display: 'flex',
            gap: '80px',
            alignItems: 'center',
            animation: 'marquee 20s linear infinite',
            width: 'max-content',
          }}>
            {/* Double the brands for seamless loop */}
            {[...brands, ...brands].map((brand, i) => (
              <span
                key={`${brand}-${i}`}
                style={{
                  fontSize: 'clamp(32px, 5vw, 72px)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'rgba(245,243,238,0.08)',
                  transition: 'color 0.4s ease',
                  cursor: 'default',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#C8A45C'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,243,238,0.08)'; }}
                aria-label={brand}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Support note */}
        <p style={{
          marginTop: '60px',
          fontSize: '14px',
          color: '#555',
          textAlign: 'center',
        }}>
          All cartridges remanufactured in-house by certified technicians in Kuwait
        </p>
      </div>

      <style>{`
        @media (max-width: 767px) { section[aria-label="Supported Brands"] { padding: 80px 24px !important; } }
      `}</style>
    </section>
  );
}

/* ─── Industries Section ───────────────────────────────── */
function Industries() {
  const headerRef = useFadeInUp(0);
  const cardsRef = useStaggerChildren(0.08);

  const industries = [
    { icon: '🏦', title: 'Banking & Finance', desc: 'MICR toner for secure check processing' },
    { icon: '🏥', title: 'Healthcare', desc: 'Reliable printing for medical records' },
    { icon: '🏛️', title: 'Government', desc: 'Certified, compliant printing solutions' },
    { icon: '🎓', title: 'Education', desc: 'Cost-effective printing for campuses' },
    { icon: '🏢', title: 'Corporate', desc: 'High-volume office printing solutions' },
    { icon: '🛒', title: 'Retail & Commerce', desc: 'Receipt and label printing supplies' },
  ];

  return (
    <section aria-label="Industries We Serve" style={{
      position: 'relative',
      zIndex: 3,
      backgroundColor: '#F5F3EE',
      padding: '140px 48px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="section-label" style={{ justifyContent: 'center', color: '#C8A45C', marginBottom: '20px' }}>Industries</div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 600,
            color: '#0A0A0A',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: '600px',
            margin: '0 auto 16px',
          }}>
            Serving businesses across all sectors
          </h2>
          <p style={{ fontSize: '16px', color: '#777', maxWidth: '500px', margin: '0 auto' }}>
            From banking to education, we deliver reliable printing supplies to Kuwait's most demanding industries.
          </p>
        </div>

        <div ref={cardsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }} className="industries-grid">
          {industries.map((ind) => (
            <div key={ind.title} className="industry-card" style={{
              background: '#FFFFFF',
              border: '1px solid #E0DDD6',
              borderRadius: '16px',
              padding: '36px 28px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(200,164,92,0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E0DDD6';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '16px' }} aria-hidden="true">{ind.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0A0A0A', marginBottom: '8px' }}>{ind.title}</h3>
              <p style={{ fontSize: '13px', color: '#8A8A8A', lineHeight: 1.6 }}>{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { .industries-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px)  { .industries-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 767px) { section[aria-label="Industries We Serve"] { padding: 80px 24px !important; } }
      `}</style>
    </section>
  );
}

/* ─── Core Values ──────────────────────────────────────── */
function ValuesPreview() {
  const imgRef = useScaleIn(0);
  const textRef = useFadeInUp(0.15);

  const values = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A45C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: 'Quality First',
      desc: 'Every cartridge remanufactured in Kuwait by in-house technical experts to achieve optimum output.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A45C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 5.8 17 4.5 19 2c1 2 2 4.5 2 8a7 7 0 0 1-12 10z"/>
        </svg>
      ),
      title: 'Eco-Friendly',
      desc: 'Return used ink and toner cartridges for recycling credit. Smart, responsible choices for your office.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A45C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <circle cx="12" cy="12" r="2"/>
          <path d="M6 12h.01M18 12h.01"/>
        </svg>
      ),
      title: 'Cost Reduction',
      desc: 'Best products at fair prices. Significant cost reduction opportunities without compromising quality.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A45C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="8" r="6"/>
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
        </svg>
      ),
      title: 'Full Compliance',
      desc: 'Cartridges built without violating technical and trademark patents. Reliable and fully compliant.',
    },
  ];

  return (
    <section id="values" aria-label="Core Values" style={{
      position: 'relative',
      zIndex: 3,
      backgroundColor: '#0A0A0A',
      padding: '140px 48px',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        gap: '80px',
        alignItems: 'start',
      }} className="values-grid">

        {/* Left — Image */}
        <div ref={imgRef} style={{ position: 'relative' }}>
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            aspectRatio: '3/4',
            boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
          }}>
            <img
              src="./images/img-quality-check.jpg"
              alt="Quality inspection process at Genuine Toner Cartridges"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Floating warranty badge */}
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-20px',
            background: '#C8A45C',
            borderRadius: '16px',
            padding: '20px 24px',
            boxShadow: '0 16px 48px rgba(200,164,92,0.3)',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', opacity: 0.6, marginBottom: '4px' }}>Warranty</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0A0A0A', lineHeight: 1 }}>100%</div>
            <div style={{ fontSize: '12px', color: '#0A0A0A', opacity: 0.7, marginTop: '2px' }}>Guaranteed</div>
          </div>
        </div>

        {/* Right — Values list */}
        <div ref={textRef}>
          <div className="section-label" style={{ marginBottom: '24px' }}>Core Values</div>
          <div className="gold-line" style={{ marginBottom: '28px', background: '#C8A45C' }} aria-hidden="true" />

          <h2 style={{
            fontSize: 'clamp(24px, 2.5vw, 40px)',
            fontWeight: 600,
            color: '#F5F3EE',
            lineHeight: 1.1,
            marginBottom: '40px',
            letterSpacing: '-0.01em',
          }}>
            Relentless commitment to quality
          </h2>

          <div>
            {values.map((v, i) => (
              <div key={i} style={{
                borderTop: '1px solid rgba(245,243,238,0.07)',
                padding: '24px 0',
                display: 'flex',
                gap: '16px',
                transition: 'padding-left 0.3s ease',
                cursor: 'default',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = '8px'; }}
                onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = '0'; }}
              >
                <div style={{
                  flexShrink: 0,
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(200,164,92,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px',
                }}>
                  {v.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#F5F3EE', marginBottom: '6px' }}>{v.title}</h4>
                  <p style={{ fontSize: '14px', color: '#8A8A8A', lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { .values-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 767px) { section[aria-label="Core Values"] { padding: 80px 24px !important; } }
      `}</style>
    </section>
  );
}

/* ─── Testimonials ─────────────────────────────────────── */
function Testimonials() {
  const headerRef = useFadeInUp(0);
  const cardsRef = useStaggerChildren(0.12);

  const testimonials = [
    {
      quote: "Genuine Toner Cartridges has been our trusted supplier for over 5 years. The quality consistently matches our OEM cartridges at a fraction of the cost. Exceptional service.",
      name: "Ahmad Al-Rashidi",
      role: "IT Manager",
      company: "Kuwait Finance House",
      avatar: "A",
      stars: 5,
    },
    {
      quote: "The MICR toner quality is outstanding. Our check processing machines run flawlessly with their remanufactured cartridges. Highly recommended for banking operations.",
      name: "Sara Al-Mutairi",
      role: "Operations Director",
      company: "National Bank of Kuwait",
      avatar: "S",
      stars: 5,
    },
    {
      quote: "Switching to Genuine Toner reduced our printing costs by 40%. The recycling program is a bonus — great for our sustainability goals. Will never go back to OEM.",
      name: "Khalid Al-Sabah",
      role: "Procurement Manager",
      company: "Kuwait University",
      avatar: "K",
      stars: 5,
    },
  ];

  return (
    <section aria-label="Customer Testimonials" style={{
      position: 'relative',
      zIndex: 3,
      backgroundColor: '#F5F3EE',
      padding: '140px 48px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="section-label" style={{ justifyContent: 'center', color: '#C8A45C', marginBottom: '20px' }}>
            Testimonials
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 600,
            color: '#0A0A0A',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            Trusted by Kuwait's leading businesses
          </h2>
        </div>

        <div ref={cardsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }} className="testimonials-grid">
          {testimonials.map((t) => (
            <article key={t.name} style={{
              background: '#FFFFFF',
              border: '1px solid #E0DDD6',
              borderRadius: '20px',
              padding: '40px',
              transition: 'all 0.35s ease',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 24px 64px rgba(0,0,0,0.10)';
                e.currentTarget.style.borderColor = 'rgba(200,164,92,0.25)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#E0DDD6';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Large quote mark */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                fontSize: '72px',
                color: 'rgba(200,164,92,0.1)',
                lineHeight: 1,
                fontFamily: 'Georgia, serif',
                userSelect: 'none',
              }} aria-hidden="true">"</div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }} aria-label={`${t.stars} out of 5 stars`}>
                {[...Array(t.stars)].map((_, i) => (
                  <span key={i} style={{ color: '#C8A45C', fontSize: '16px' }} aria-hidden="true">★</span>
                ))}
              </div>

              <blockquote style={{
                fontSize: '15px',
                color: '#555',
                lineHeight: 1.75,
                margin: '0 0 28px',
                fontStyle: 'normal',
              }}>
                "{t.quote}"
              </blockquote>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C8A45C, #E8D5A3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  flexShrink: 0,
                }} aria-hidden="true">
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A0A0A' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#8A8A8A' }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { .testimonials-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 767px) { section[aria-label="Customer Testimonials"] { padding: 80px 24px !important; } }
      `}</style>
    </section>
  );
}

/* ─── FAQ Section ──────────────────────────────────────── */
function FAQ() {
  const headerRef = useFadeInUp(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Are remanufactured cartridges as good as OEM cartridges?",
      a: "Yes. When remanufactured to our high quality standards, recycled laser toner cartridges will equal or outperform new OEM cartridges. Every cartridge is 100% unconditionally guaranteed to perform, meeting or exceeding its comparable OEM equivalent.",
    },
    {
      q: "Will remanufactured cartridges damage my printer?",
      a: "No. Properly remanufactured toner cartridges will not damage your copy machine or printer. Our cartridges are built without violating technical and trademark patents from registered owners, ensuring full compatibility and reliability.",
    },
    {
      q: "What brands do you support?",
      a: "We remanufacture cartridges for HP, Epson, Canon, Samsung, and Xerox printers. For MICR applications, we support Source Tech, Lexmark, IBM, and Troy (HP-based) printers used by financial institutions.",
    },
    {
      q: "What is the recycling program?",
      a: "Our recycling program allows you to return your used ink and toner cartridges in exchange for recycling credit. This helps reduce office waste, supports environmental sustainability, and provides you with additional savings.",
    },
    {
      q: "How do I place an order?",
      a: "You can place an order through our Order page, by phone at +965 2547 1616, by email at info@genuinecartridges.net, or via WhatsApp. Our representative will follow up with you within 24 hours to confirm your order details.",
    },
    {
      q: "Do you offer a warranty on cartridges?",
      a: "Yes. We provide warranty on all our remanufactured ink and toner cartridges. We stand by our products — if any cartridge fails to perform, we will replace it. Customer satisfaction is our top priority.",
    },
  ];

  return (
    <section aria-label="Frequently Asked Questions" style={{
      position: 'relative',
      zIndex: 3,
      backgroundColor: '#0A0A0A',
      padding: '140px 48px',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '20px' }}>FAQ</div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 600,
            color: '#F5F3EE',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div role="list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              role="listitem"
              className="faq-item"
              style={{ borderBottom: '1px solid rgba(245,243,238,0.07)' }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '24px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: openIndex === i ? '#C8A45C' : '#F5F3EE',
                  lineHeight: 1.4,
                  transition: 'color 0.25s ease',
                }}>
                  {faq.q}
                </span>
                <span style={{
                  flexShrink: 0,
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: `1px solid ${openIndex === i ? '#C8A45C' : 'rgba(245,243,238,0.15)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s ease',
                  background: openIndex === i ? 'rgba(200,164,92,0.1)' : 'transparent',
                }} aria-hidden="true">
                  <svg
                    width="12" height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={openIndex === i ? '#C8A45C' : '#8A8A8A'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: 'transform 0.25s ease', transform: openIndex === i ? 'rotate(180deg)' : 'none' }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>

              <div style={{
                maxHeight: openIndex === i ? '300px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <p style={{
                  fontSize: '15px',
                  color: '#8A8A8A',
                  lineHeight: 1.75,
                  paddingBottom: '24px',
                  paddingRight: '52px',
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) { section[aria-label="Frequently Asked Questions"] { padding: 80px 24px !important; } }
      `}</style>
    </section>
  );
}

/* ─── Contact CTA ──────────────────────────────────────── */
function ContactCTA() {
  const ref = useFadeInUp(0);

  return (
    <section aria-label="Contact CTA" style={{
      position: 'relative',
      zIndex: 3,
      backgroundColor: '#F5F3EE',
      padding: '140px 48px',
      overflow: 'hidden',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(200,164,92,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(200,164,92,0.04) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      <div ref={ref} style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <div className="section-label" style={{ justifyContent: 'center', color: '#C8A45C', marginBottom: '24px' }}>
          Get In Touch
        </div>

        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: 700,
          color: '#0A0A0A',
          lineHeight: 1.0,
          marginBottom: '24px',
          letterSpacing: '-0.03em',
        }}>
          Ready to reduce your printing costs?
        </h2>

        <p style={{
          fontSize: '17px',
          color: '#777',
          lineHeight: 1.7,
          marginBottom: '48px',
          maxWidth: '560px',
          margin: '0 auto 48px',
        }}>
          Contact us today for a quote on remanufactured toner cartridges. Our team responds within 24 hours.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn-primary" style={{ fontSize: '14px', padding: '16px 48px' }}>
            Contact Us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <a
            href="tel:+96525471616"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 36px',
              borderRadius: '100px',
              border: '1px solid rgba(10,10,10,0.15)',
              color: '#0A0A0A',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(10,10,10,0.05)';
              e.currentTarget.style.borderColor = 'rgba(10,10,10,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(10,10,10,0.15)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.9 9.81 19.79 19.79 0 01.87 1.23 2 2 0 012.86 0H5.9a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            +965 2547 1616
          </a>
        </div>

        {/* WhatsApp link */}
        <a
          href="https://wa.me/96525471616?text=Hello%2C%20I%20would%20like%20to%20get%20a%20quote."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            marginTop: '24px',
            fontSize: '14px',
            color: '#25D366',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Or chat with us on WhatsApp
        </a>
      </div>

      <style>{`
        @media (max-width: 767px) { section[aria-label="Contact CTA"] { padding: 80px 24px !important; } }
      `}</style>
    </section>
  );
}

/* ─── Home Page ────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <AboutPreview />
      <Mission />
      <ProductsPreview />
      <Brands />
      <Industries />
      <ValuesPreview />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  );
}
