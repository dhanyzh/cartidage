import { useState, type FormEvent } from 'react';
import { useFadeInUp } from '../hooks/useScrollAnimation';

const PRINTER_BRANDS = ['HP', 'Epson', 'Canon', 'Samsung', 'Xerox', 'Lexmark', 'Brother', 'Ricoh', 'Kyocera', 'Other'];

const STEPS = [
  { num: 1, label: 'Product Info' },
  { num: 2, label: 'Contact Info' },
  { num: 3, label: 'Submit' },
];

export default function Order() {
  const headerRef = useFadeInUp(0);
  const formRef   = useFadeInUp(0);
  const infoRef   = useFadeInUp(0.15);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    manufacturer: '', model: '', quantity: '', productType: '',
    name: '', email: '', phone: '', company: '', address: '', comments: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!formData.manufacturer) e.manufacturer = 'Required';
    if (!formData.model.trim()) e.model = 'Required';
    if (!formData.quantity)     e.quantity = 'Required';
    return e;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim())  e.name = 'Required';
    if (!formData.email.trim()) e.email = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email';
    if (!formData.phone.trim()) e.phone = 'Required';
    return e;
  };

  const handleNext = () => {
    const e = validateStep1();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    background: 'rgba(245,243,238,0.05)',
    border: '1px solid rgba(245,243,238,0.1)',
    borderRadius: '8px',
    color: '#F5F3EE',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.25s ease, background 0.25s ease',
  };

  const errStyle = { borderColor: '#FC8181' };

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
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(200,164,92,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} aria-hidden="true" />

        <div ref={headerRef}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '24px' }}>Place an Order</div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 700, color: '#F5F3EE',
            lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '20px',
          }}>
            Order Form
          </h1>
          <p style={{ fontSize: '17px', color: '#8A8A8A', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Fill in your details and our representative will follow up within 24 hours.
          </p>

          {/* Step Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0' }}>
            {STEPS.map((s, i) => (
              <div key={s.num} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 600,
                    background: step >= s.num ? '#C8A45C' : 'rgba(245,243,238,0.07)',
                    color: step >= s.num ? '#0A0A0A' : '#555',
                    border: `2px solid ${step >= s.num ? '#C8A45C' : 'rgba(245,243,238,0.1)'}`,
                    transition: 'all 0.35s ease',
                    boxShadow: step === s.num ? '0 0 20px rgba(200,164,92,0.4)' : 'none',
                  }}>
                    {step > s.num ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : s.num}
                  </div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: step >= s.num ? '#C8A45C' : '#555' }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{
                    width: '80px', height: '1px', margin: '0 12px',
                    background: step > s.num ? '#C8A45C' : 'rgba(245,243,238,0.1)',
                    transition: 'background 0.35s ease',
                    marginBottom: '20px',
                  }} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form Section ─────────────────────────────────── */}
      <section style={{ backgroundColor: '#0A0A0A', padding: '60px 48px 120px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '48px',
          alignItems: 'start',
        }} className="order-grid">

          {/* Main Form */}
          <div ref={formRef}>
            <div style={{
              background: 'rgba(245,243,238,0.03)',
              border: '1px solid rgba(245,243,238,0.08)',
              borderRadius: '20px',
              padding: '48px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Gold top line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, #C8A45C, #E8D5A3, #C8A45C)',
              }} aria-hidden="true" />

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #C8A45C, #E8D5A3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 16px 48px rgba(200,164,92,0.3)',
                  }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#F5F3EE', marginBottom: '12px' }}>Order Submitted!</h3>
                  <p style={{ color: '#8A8A8A', fontSize: '16px', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto 32px' }}>
                    Our representative will review your request and contact you within 24 hours with a quote.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="tel:+96525471616" style={{
                      padding: '12px 28px', borderRadius: '100px',
                      background: '#C8A45C', color: '#0A0A0A',
                      fontSize: '13px', fontWeight: 600, textDecoration: 'none',
                    }}>
                      Call Us Now
                    </a>
                    <button onClick={() => { setSubmitted(false); setStep(1); setFormData({
                      manufacturer: '', model: '', quantity: '', productType: '',
                      name: '', email: '', phone: '', company: '', address: '', comments: '',
                    }); }}
                      style={{
                        padding: '12px 28px', borderRadius: '100px',
                        background: 'transparent', color: '#F5F3EE',
                        border: '1px solid rgba(245,243,238,0.2)',
                        fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                      }}>
                      New Order
                    </button>
                  </div>
                </div>
              ) : step === 1 ? (
                /* ── Step 1: Product Info ── */
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#F5F3EE', marginBottom: '8px' }}>Product Information</h2>
                  <p style={{ fontSize: '14px', color: '#8A8A8A', marginBottom: '32px' }}>Tell us what cartridge you need</p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="order-form-grid">
                    <div>
                      <label htmlFor="manufacturer" className="form-label">Printer Brand *</label>
                      <select
                        id="manufacturer"
                        value={formData.manufacturer}
                        onChange={(e) => update('manufacturer', e.target.value)}
                        style={{ ...inputStyle, ...(errors.manufacturer ? errStyle : {}), cursor: 'pointer' }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#C8A45C'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.manufacturer ? '#FC8181' : 'rgba(245,243,238,0.1)'; }}
                      >
                        <option value="" style={{ background: '#1A1A1A' }}>Select Brand</option>
                        {PRINTER_BRANDS.map(b => <option key={b} value={b} style={{ background: '#1A1A1A' }}>{b}</option>)}
                      </select>
                      {errors.manufacturer && <span style={{ fontSize: '12px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.manufacturer}</span>}
                    </div>

                    <div>
                      <label htmlFor="model" className="form-label">Printer Model / Cartridge Number *</label>
                      <input id="model" type="text" placeholder="e.g. LaserJet Pro M404n"
                        value={formData.model} onChange={(e) => update('model', e.target.value)}
                        style={{ ...inputStyle, ...(errors.model ? errStyle : {}) }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#C8A45C'; e.currentTarget.style.background = 'rgba(245,243,238,0.08)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.model ? '#FC8181' : 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(245,243,238,0.05)'; }}
                      />
                      {errors.model && <span style={{ fontSize: '12px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.model}</span>}
                    </div>

                    <div>
                      <label htmlFor="quantity" className="form-label">Quantity *</label>
                      <input id="quantity" type="number" min="1" placeholder="e.g. 10"
                        value={formData.quantity} onChange={(e) => update('quantity', e.target.value)}
                        style={{ ...inputStyle, ...(errors.quantity ? errStyle : {}) }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#C8A45C'; e.currentTarget.style.background = 'rgba(245,243,238,0.08)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.quantity ? '#FC8181' : 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(245,243,238,0.05)'; }}
                      />
                      {errors.quantity && <span style={{ fontSize: '12px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.quantity}</span>}
                    </div>

                    <div>
                      <label htmlFor="productType" className="form-label">Cartridge Type</label>
                      <select id="productType" value={formData.productType} onChange={(e) => update('productType', e.target.value)}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#C8A45C'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; }}
                      >
                        <option value="" style={{ background: '#1A1A1A' }}>Select Type</option>
                        {['Laser Toner', 'MICR Toner', 'Ink Cartridge'].map(t => <option key={t} value={t} style={{ background: '#1A1A1A' }}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <label htmlFor="comments-step1" className="form-label">Additional Notes</label>
                    <textarea id="comments-step1" rows={3} placeholder="Any specific requirements or notes..."
                      value={formData.comments} onChange={(e) => update('comments', e.target.value)}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#C8A45C'; e.currentTarget.style.background = 'rgba(245,243,238,0.08)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(245,243,238,0.05)'; }}
                    />
                  </div>

                  <button onClick={handleNext} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
                    Next: Contact Information
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ) : (
                /* ── Step 2: Contact Info ── */
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                    <button
                      type="button"
                      onClick={() => { setStep(1); setErrors({}); }}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer', color: '#8A8A8A',
                        display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F3EE'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#8A8A8A'; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                    <div style={{ flex: 1 }}>
                      <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#F5F3EE', marginBottom: '4px' }}>Contact Information</h2>
                      <p style={{ fontSize: '14px', color: '#8A8A8A' }}>How should we reach you?</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="order-form-grid">
                    <div>
                      <label htmlFor="order-name" className="form-label">Full Name *</label>
                      <input id="order-name" type="text" required placeholder="Your name"
                        value={formData.name} onChange={(e) => update('name', e.target.value)}
                        style={{ ...inputStyle, ...(errors.name ? errStyle : {}) }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#C8A45C'; e.currentTarget.style.background = 'rgba(245,243,238,0.08)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.name ? '#FC8181' : 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(245,243,238,0.05)'; }}
                      />
                      {errors.name && <span style={{ fontSize: '12px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                    </div>
                    <div>
                      <label htmlFor="order-email" className="form-label">Email *</label>
                      <input id="order-email" type="email" required placeholder="you@company.com"
                        value={formData.email} onChange={(e) => update('email', e.target.value)}
                        style={{ ...inputStyle, ...(errors.email ? errStyle : {}) }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#C8A45C'; e.currentTarget.style.background = 'rgba(245,243,238,0.08)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.email ? '#FC8181' : 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(245,243,238,0.05)'; }}
                      />
                      {errors.email && <span style={{ fontSize: '12px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                    </div>
                    <div>
                      <label htmlFor="order-phone" className="form-label">Phone *</label>
                      <input id="order-phone" type="tel" required placeholder="+965 XXXX XXXX"
                        value={formData.phone} onChange={(e) => update('phone', e.target.value)}
                        style={{ ...inputStyle, ...(errors.phone ? errStyle : {}) }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#C8A45C'; e.currentTarget.style.background = 'rgba(245,243,238,0.08)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.phone ? '#FC8181' : 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(245,243,238,0.05)'; }}
                      />
                      {errors.phone && <span style={{ fontSize: '12px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                    </div>
                    <div>
                      <label htmlFor="order-company" className="form-label">Company Name</label>
                      <input id="order-company" type="text" placeholder="Your company"
                        value={formData.company} onChange={(e) => update('company', e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#C8A45C'; e.currentTarget.style.background = 'rgba(245,243,238,0.08)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(245,243,238,0.05)'; }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '28px' }}>
                    <label htmlFor="order-address" className="form-label">Delivery Address</label>
                    <input id="order-address" type="text" placeholder="Street, area, building..."
                      value={formData.address} onChange={(e) => update('address', e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#C8A45C'; e.currentTarget.style.background = 'rgba(245,243,238,0.08)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(245,243,238,0.05)'; }}
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '16px', opacity: loading ? 0.8 : 1 }}>
                    {loading ? (
                      <>
                        <span className="animate-spin" style={{ width: '16px', height: '16px', border: '2px solid rgba(10,10,10,0.3)', borderTopColor: '#0A0A0A', borderRadius: '50%', display: 'inline-block' }} />
                        Submitting...
                      </>
                    ) : 'Submit Order'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div ref={infoRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* How to Order */}
            <div style={{
              background: 'rgba(245,243,238,0.03)',
              border: '1px solid rgba(245,243,238,0.08)',
              borderRadius: '16px',
              padding: '32px',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F5F3EE', marginBottom: '20px' }}>How it Works</h3>
              <ol style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Fill out the order form with your printer details',
                  'Provide your contact information',
                  'Submit — our team reviews your order',
                  'We contact you within 24 hours with a quote',
                ].map((step, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      background: 'rgba(200,164,92,0.1)',
                      border: '1px solid rgba(200,164,92,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 600, color: '#C8A45C', flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: '14px', color: '#8A8A8A', lineHeight: 1.6, paddingTop: '2px' }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Need Help */}
            <div style={{
              background: 'rgba(200,164,92,0.05)',
              border: '1px solid rgba(200,164,92,0.12)',
              borderRadius: '16px',
              padding: '32px',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F5F3EE', marginBottom: '12px' }}>Need Help?</h3>
              <p style={{ fontSize: '14px', color: '#8A8A8A', lineHeight: 1.6, marginBottom: '20px' }}>
                Not sure which cartridge you need? Our team is here to help you find the right product.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="tel:+96525471616" style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 16px', borderRadius: '10px',
                  background: 'rgba(245,243,238,0.05)',
                  border: '1px solid rgba(245,243,238,0.1)',
                  color: '#F5F3EE', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(200,164,92,0.3)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; }}
                >
                  <span style={{ fontSize: '18px' }} aria-hidden="true">📞</span>
                  +965 2547 1616
                </a>
                <a href="mailto:info@genuinecartridges.net" style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 16px', borderRadius: '10px',
                  background: 'rgba(245,243,238,0.05)',
                  border: '1px solid rgba(245,243,238,0.1)',
                  color: '#C8A45C', textDecoration: 'none', fontSize: '13px',
                  transition: 'all 0.25s', wordBreak: 'break-all',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(200,164,92,0.3)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; }}
                >
                  <span style={{ fontSize: '18px', flexShrink: 0 }} aria-hidden="true">✉️</span>
                  info@genuinecartridges.net
                </a>
                <a href="https://wa.me/96525471616" target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 16px', borderRadius: '10px',
                  background: 'rgba(37,211,102,0.06)',
                  border: '1px solid rgba(37,211,102,0.15)',
                  color: '#25D366', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(37,211,102,0.35)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(37,211,102,0.15)'; }}
                >
                  <span style={{ fontSize: '18px' }} aria-hidden="true">💬</span>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Warranty note */}
            <div style={{
              display: 'flex', gap: '12px', alignItems: 'flex-start',
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(245,243,238,0.02)',
              border: '1px solid rgba(245,243,238,0.06)',
            }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }} aria-hidden="true">🛡️</span>
              <p style={{ fontSize: '13px', color: '#8A8A8A', lineHeight: 1.65 }}>
                All orders come with our <strong style={{ color: '#F5F3EE' }}>100% satisfaction guarantee</strong>. If any cartridge doesn't perform, we'll replace it.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1023px) { .order-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 767px) { .order-form-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 767px) {
            section { padding-left: 24px !important; padding-right: 24px !important; }
            .order-grid > div:first-child > div { padding: 28px !important; }
          }
        `}</style>
      </section>
    </div>
  );
}
