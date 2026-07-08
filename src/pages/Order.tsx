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

  const handleSubmit = (method: 'whatsapp' | 'email') => (e: FormEvent) => {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      const emailSubject = `Order Request from ${formData.name} - Genuine Digital Company`;
      const emailBody = `Genuine Digital Company Order Details:\n----------------------------------------\nManufacturer: ${formData.manufacturer}\nModel/Series: ${formData.model}\nQuantity: ${formData.quantity}\nProduct Type: ${formData.productType || 'N/A'}\n\nCustomer Details:\n----------------------------------------\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company || 'N/A'}\nAddress: ${formData.address || 'N/A'}\nComments: ${formData.comments || 'N/A'}`;

      const whatsappText = `*NEW ORDER REQUEST* (Genuine Digital Company)\n*Manufacturer:* ${formData.manufacturer}\n*Model:* ${formData.model}\n*Quantity:* ${formData.quantity}\n*Product Type:* ${formData.productType || 'N/A'}\n\n*Customer Info:*\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Company:* ${formData.company || 'N/A'}\n*Address:* ${formData.address || 'N/A'}\n*Comments:* ${formData.comments || 'N/A'}`;

      if (method === 'whatsapp') {
        // Open WhatsApp in new tab
        const whatsappUrl = `https://wa.me/96590942454?text=${encodeURIComponent(whatsappText)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } else {
        // Trigger mailto for email client
        const mailtoUrl = `mailto:info@genuinecartridges.net?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoUrl;
      }
    }, 1500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    color: '#191919',
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
        backgroundColor: '#FFFFFF',
        padding: '160px 48px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid #E2E8F0',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(4,175,68,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} aria-hidden="true" />

        <div ref={headerRef}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '24px', color: '#04AF44' }}>Place an Order</div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 700, color: '#191919',
            lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '20px',
          }}>
            Order Form
          </h1>
          <p style={{ fontSize: '17px', color: '#64748B', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Submit your printer supplies details and our team will follow up with a proposal within 24 hours.
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
                    background: step >= s.num ? '#04AF44' : '#F1F5F9',
                    color: step >= s.num ? '#FFFFFF' : '#64748B',
                    border: `2px solid ${step >= s.num ? '#04AF44' : '#E2E8F0'}`,
                    transition: 'all 0.35s ease',
                    boxShadow: step === s.num ? '0 0 20px rgba(4,175,68,0.25)' : 'none',
                  }}>
                    {step > s.num ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : s.num}
                  </div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: step >= s.num ? '#04AF44' : '#64748B', fontWeight: step >= s.num ? 600 : 400 }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{
                    width: '80px', height: '2px', margin: '0 12px',
                    background: step > s.num ? '#04AF44' : '#E2E8F0',
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
      <section style={{ backgroundColor: '#FFFFFF', padding: '60px 48px 120px' }}>
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
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '48px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.02)',
            }}>
              {/* Blue/Green top line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg, #0057A8, #04AF44, #0057A8)',
              }} aria-hidden="true" />

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0057A8, #04AF44)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 16px 48px rgba(4,175,68,0.25)',
                  }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#191919', marginBottom: '12px' }}>Order Submitted!</h3>
                  <p style={{ color: '#64748B', fontSize: '16px', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto 32px' }}>
                    Our customer service representative will review your request and contact you within 24 hours with a formal proposal.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="tel:0096590942454" style={{
                      padding: '12px 28px', borderRadius: '100px',
                      background: '#04AF44', color: '#FFFFFF',
                      fontSize: '13px', fontWeight: 600, textDecoration: 'none',
                      transition: 'opacity 0.2s',
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                    >
                      Call Us Now
                    </a>
                    <button onClick={() => { setSubmitted(false); setStep(1); setFormData({
                      manufacturer: '', model: '', quantity: '', productType: '',
                      name: '', email: '', phone: '', company: '', address: '', comments: '',
                    }); }}
                      style={{
                        padding: '12px 28px', borderRadius: '100px',
                        background: 'transparent', color: '#64748B',
                        border: '1px solid #E2E8F0',
                        fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#191919'; e.currentTarget.style.borderColor = '#64748B'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#64748B'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                    >
                      New Order
                    </button>
                  </div>
                </div>
              ) : step === 1 ? (
                /* ── Step 1: Product Info ── */
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#191919', marginBottom: '8px' }}>Product Information</h2>
                  <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '32px' }}>Specify your printing fleet needs</p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="order-form-grid">
                    <div>
                      <label htmlFor="manufacturer" className="form-label">Printer Brand *</label>
                      <select
                        id="manufacturer"
                        value={formData.manufacturer}
                        onChange={(e) => update('manufacturer', e.target.value)}
                        style={{ ...inputStyle, ...(errors.manufacturer ? errStyle : {}), cursor: 'pointer' }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#0057A8'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.manufacturer ? '#FC8181' : '#E2E8F0'; }}
                      >
                        <option value="" style={{ background: '#FFFFFF' }}>Select Brand</option>
                        {PRINTER_BRANDS.map(b => <option key={b} value={b} style={{ background: '#FFFFFF' }}>{b}</option>)}
                      </select>
                      {errors.manufacturer && <span style={{ fontSize: '12px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.manufacturer}</span>}
                    </div>

                    <div>
                      <label htmlFor="model" className="form-label">Printer Model / Cartridge Number *</label>
                      <input id="model" type="text" placeholder="e.g. HP CF289A / Brother TN830"
                        value={formData.model} onChange={(e) => update('model', e.target.value)}
                        style={{ ...inputStyle, ...(errors.model ? errStyle : {}) }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#0057A8'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.model ? '#FC8181' : '#E2E8F0'; }}
                      />
                      {errors.model && <span style={{ fontSize: '12px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.model}</span>}
                    </div>

                    <div>
                      <label htmlFor="quantity" className="form-label">Quantity *</label>
                      <input id="quantity" type="number" min="1" placeholder="e.g. 10"
                        value={formData.quantity} onChange={(e) => update('quantity', e.target.value)}
                        style={{ ...inputStyle, ...(errors.quantity ? errStyle : {}) }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#0057A8'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.quantity ? '#FC8181' : '#E2E8F0'; }}
                      />
                      {errors.quantity && <span style={{ fontSize: '12px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.quantity}</span>}
                    </div>

                    <div>
                      <label htmlFor="productType" className="form-label">Cartridge Category</label>
                      <select id="productType" value={formData.productType} onChange={(e) => update('productType', e.target.value)}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#0057A8'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; }}
                      >
                        <option value="" style={{ background: '#FFFFFF' }}>Select Category</option>
                        {['Mono & Color Toner', 'Extended Yield Toner', 'MICR Toner', 'Wide Format Ink', 'Empty Return / Collection Request'].map(t => <option key={t} value={t} style={{ background: '#FFFFFF' }}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <label htmlFor="comments-step1" className="form-label">Special Specs / Notes</label>
                    <textarea id="comments-step1" rows={3} placeholder="Please list any other cartridges or specific details..."
                       value={formData.comments} onChange={(e) => update('comments', e.target.value)}
                       style={{ ...inputStyle, resize: 'vertical' }}
                       onFocus={(e) => { e.currentTarget.style.borderColor = '#0057A8'; }}
                       onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; }}
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
                <form onSubmit={(e) => e.preventDefault()} noValidate>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                    <button
                      type="button"
                      onClick={() => { setStep(1); setErrors({}); }}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer', color: '#64748B',
                        display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#191919'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#64748B'; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                    <div style={{ flex: 1 }}>
                      <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#191919', marginBottom: '4px' }}>Contact Information</h2>
                      <p style={{ fontSize: '14px', color: '#64748B' }}>How should we reach you?</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="order-form-grid">
                    <div>
                      <label htmlFor="order-name" className="form-label">Full Name *</label>
                      <input id="order-name" type="text" required placeholder="Your name"
                        value={formData.name} onChange={(e) => update('name', e.target.value)}
                        style={{ ...inputStyle, ...(errors.name ? errStyle : {}) }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#0057A8'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.name ? '#FC8181' : '#E2E8F0'; }}
                      />
                      {errors.name && <span style={{ fontSize: '12px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                    </div>
                    <div>
                      <label htmlFor="order-email" className="form-label">Email *</label>
                      <input id="order-email" type="email" required placeholder="you@company.com"
                        value={formData.email} onChange={(e) => update('email', e.target.value)}
                        style={{ ...inputStyle, ...(errors.email ? errStyle : {}) }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#0057A8'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.email ? '#FC8181' : '#E2E8F0'; }}
                      />
                      {errors.email && <span style={{ fontSize: '12px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                    </div>
                    <div>
                      <label htmlFor="order-phone" className="form-label">Phone *</label>
                      <input id="order-phone" type="tel" required placeholder="+965 XXXX XXXX"
                        value={formData.phone} onChange={(e) => update('phone', e.target.value)}
                        style={{ ...inputStyle, ...(errors.phone ? errStyle : {}) }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#0057A8'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.phone ? '#FC8181' : '#E2E8F0'; }}
                      />
                      {errors.phone && <span style={{ fontSize: '12px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                    </div>
                    <div>
                      <label htmlFor="order-company" className="form-label">Company Name</label>
                      <input id="order-company" type="text" placeholder="Your company"
                        value={formData.company} onChange={(e) => update('company', e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#0057A8'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '28px' }}>
                    <label htmlFor="order-address" className="form-label">Delivery Address</label>
                    <input id="order-address" type="text" placeholder="Street, area, building details..."
                      value={formData.address} onChange={(e) => update('address', e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#0057A8'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
                    <button
                      type="button"
                      onClick={(e) => handleSubmit('whatsapp')(e)}
                      disabled={loading}
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '16px',
                        borderRadius: '100px',
                        background: '#04AF44',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'opacity 0.2s',
                        opacity: loading ? 0.8 : 1,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                    >
                      {loading ? (
                        <span className="animate-spin" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#FFFFFF', borderRadius: '50%', display: 'inline-block' }} />
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Send via WhatsApp (Primary)
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleSubmit('email')(e)}
                      disabled={loading}
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '14px',
                        borderRadius: '100px',
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        color: '#64748B',
                        fontSize: '13px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.25s',
                        opacity: loading ? 0.8 : 1,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#0057A8'; e.currentTarget.style.borderColor = '#0057A8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#64748B'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                    >
                      {loading ? (
                        <span className="animate-spin" style={{ width: '16px', height: '16px', border: '2px solid rgba(0,87,168,0.3)', borderTopColor: '#0057A8', borderRadius: '50%', display: 'inline-block' }} />
                      ) : (
                        <>
                          <span style={{ fontSize: '16px' }}>✉️</span>
                          Send via Email (Secondary)
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div ref={infoRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* How to Order */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '32px',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#191919', marginBottom: '20px' }}>How it Works</h3>
              <ol style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Fill out the order form with printer cartridge specs',
                  'Provide your company contact info',
                  'Submit the details — our engineers review it',
                  'We contact you within 24 hours with custom pricing',
                ].map((step, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      background: 'rgba(0, 87, 168, 0.08)',
                      border: '1px solid rgba(0, 87, 168, 0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 600, color: '#0057A8', flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6, paddingTop: '2px' }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Need Help */}
            <div style={{
              background: '#E6F5EC',
              border: '1px solid rgba(4,175,68,0.2)',
              borderRadius: '16px',
              padding: '32px',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#191919', marginBottom: '12px' }}>Need Help?</h3>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6, marginBottom: '20px' }}>
                Not sure of the cartridge number or printer compatibility? Get in touch with our team.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="tel:+96590942454" style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 16px', borderRadius: '10px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#191919', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#04AF44'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; }}
                >
                  <span style={{ fontSize: '18px' }} aria-hidden="true">📞</span>
                  +965 9094 2454
                </a>
                <a href="mailto:info@genuinecartridges.net" style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 16px', borderRadius: '10px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#0057A8', textDecoration: 'none', fontSize: '13px',
                  transition: 'all 0.25s', wordBreak: 'break-all',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0057A8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; }}
                >
                  <span style={{ fontSize: '18px', flexShrink: 0 }} aria-hidden="true">✉️</span>
                  info@genuinecartridges.net
                </a>
                <a href="https://wa.me/96590942454" target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 16px', borderRadius: '10px',
                  background: '#25D366',
                  border: '1px solid rgba(37,211,102,0.15)',
                  color: '#FFFFFF', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
                  transition: 'opacity 0.2s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  <span style={{ fontSize: '18px' }} aria-hidden="true">💬</span>
                  WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Warranty note */}
            <div style={{
              display: 'flex', gap: '12px', alignItems: 'flex-start',
              padding: '16px',
              borderRadius: '12px',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }} aria-hidden="true">🛡️</span>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.65 }}>
                All orders are covered by our <strong style={{ color: '#191919' }}>100% satisfaction guarantee</strong>. Defective cartridges will be replaced promptly.
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
