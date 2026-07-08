import { useFadeInUp, useFadeInRight } from '../hooks/useScrollAnimation';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';

export default function Contact() {
  const leftRef  = useFadeInUp(0);
  const rightRef = useFadeInRight(0.15);
  const formRef  = useFadeInUp(0);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim())    newErrors.name    = 'Name is required';
    if (!formData.email.trim())   newErrors.email   = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      const subjectLine = formData.subject.trim() || 'Contact Inquiry';
      const emailSubject = `${subjectLine} - from ${formData.name}`;
      const emailBody = `Genuine Digital Company Contact Form Submission:\n----------------------------------------\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nSubject: ${subjectLine}\n\nMessage:\n${formData.message}`;

      const whatsappText = `*NEW CONTACT MESSAGE*\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || 'N/A'}\n*Subject:* ${subjectLine}\n\n*Message:*\n${formData.message}`;

      // Open WhatsApp in new tab
      const whatsappUrl = `https://wa.me/96590942454?text=${encodeURIComponent(whatsappText)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Trigger mailto for email client
      const mailtoUrl = `mailto:info@genuinecartridges.net?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoUrl;
    }, 1200);
    setTimeout(() => setSubmitted(false), 5000);
  };

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
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(4,175,68,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} aria-hidden="true" />
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '24px', color: '#04AF44' }}>Contact Us</div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 80px)',
          fontWeight: 700, color: '#191919',
          lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '20px',
        }}>
          Let's work together
        </h1>
        <p style={{ fontSize: '18px', color: '#64748B', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>
          Our team is ready to assist your business. Reach out via any of the channels below.
        </p>
      </section>

      {/* ── Contact Info + Map ────────────────────────────── */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '60px 48px 100px' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
        }} className="contact-info-grid">

          {/* Left — Map + Details */}
          <div ref={leftRef}>
            <div className="section-label" style={{ marginBottom: '32px', color: '#04AF44' }}>Find Us</div>

            {/* Google Map */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #E2E8F0',
              marginBottom: '32px',
            }}>
              <iframe
                src="https://maps.google.com/maps?q=29.33844566345215%2C48.004669189453125&z=17&hl=en&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Genuine Digital Company Location in Hawally, Kuwait"
              />
            </div>

            {/* Contact Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Address */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '20px',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#04AF44', marginBottom: '8px' }}>Address</div>
                <address style={{ fontStyle: 'normal', fontSize: '14px', color: '#64748B', lineHeight: 1.7 }}>
                  Block 1, Bin Khaldoun Street,<br />
                  Building No 21856, 3rd floor, office No 6,<br />
                  Faiha Complex, <strong style={{ color: '#191919', fontWeight: 500 }}>Hawally, Kuwait</strong>
                </address>
              </div>

              {/* Phone */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '20px',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#04AF44', marginBottom: '8px' }}>Phone & Fax</div>
                <a href="tel:0096590942454" style={{ display: 'block', fontSize: '15px', color: '#191919', fontWeight: 500, marginBottom: '6px', transition: 'color 0.2s', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#0057A8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#191919'; }}>
                  +965 9094 2454
                </a>
                <span style={{ display: 'block', fontSize: '13px', color: '#64748B' }}>Fax 1: +965 2547 1616</span>
                <span style={{ display: 'block', fontSize: '13px', color: '#64748B', marginTop: '2px' }}>Fax 2: +965 2547 1818</span>
              </div>

              {/* Email */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '20px',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#04AF44', marginBottom: '8px' }}>Email</div>
                <a href="mailto:info@genuinecartridges.net" style={{ fontSize: '14px', color: '#0057A8', wordBreak: 'break-all', transition: 'opacity 0.2s', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}>
                  info@genuinecartridges.net
                </a>
              </div>

              {/* Hours */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '20px',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#04AF44', marginBottom: '8px' }}>Business Hours</div>
                <div style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.7 }}>
                  Sun – Thu: 8am – 5pm
                </div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>Fri – Sat: Closed</div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/96590942454?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20toner%20cartridges."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '24px',
                padding: '14px 28px',
                borderRadius: '100px',
                background: 'rgba(37,211,102,0.08)',
                border: '1px solid rgba(37,211,102,0.2)',
                color: '#25D366',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.25s ease',
                textDecoration: 'none',
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Message us on WhatsApp
            </a>
          </div>

          {/* Right — Visit card */}
          <div ref={rightRef}>
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '48px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <div className="section-label" style={{ marginBottom: '24px', color: '#04AF44' }}>Visit Our Office</div>
                <h2 style={{
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  fontWeight: 600, color: '#191919',
                  lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em',
                }}>
                  Genuine Digital Company
                </h2>
                <p style={{ fontSize: '17px', color: '#64748B', lineHeight: 1.75, marginBottom: '32px' }}>
                  We welcome you to visit our facility in Hawally, Kuwait. Meet our technical support team to discuss your printing fleet requirements.
                </p>

                {/* Address visual */}
                <div style={{
                  background: 'rgba(0, 87, 168, 0.05)',
                  border: '1px solid rgba(0, 87, 168, 0.15)',
                  borderRadius: '12px',
                  padding: '24px',
                  marginBottom: '32px',
                }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '24px', flexShrink: 0 }} aria-hidden="true">📍</span>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 500, color: '#191919', marginBottom: '4px' }}>Faiha Complex, Hawally</div>
                      <div style={{ fontSize: '14px', color: '#64748B' }}>Block 1, Bin Khaldoun Street, Building No 21856, 3rd floor</div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#04AF44', marginTop: '4px' }}>🇰🇼 Kuwait</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/order" className="btn-primary" style={{ flex: 1, justifyContent: 'center', minWidth: '140px' }}>
                  Order Now
                </Link>
                <a
                  href="tel:0096590942454"
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '15px 20px',
                    borderRadius: '100px',
                    border: '1px solid #E2E8F0',
                    color: '#191919',
                    fontSize: '13px',
                    fontWeight: 500,
                    transition: 'all 0.25s',
                    textDecoration: 'none',
                    minWidth: '140px',
                    backgroundColor: '#FFFFFF',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#64748B'; e.currentTarget.style.background = '#F8FAFC'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#FFFFFF'; }}
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1023px) { .contact-info-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── Contact Form ──────────────────────────────────── */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '100px 48px' }}>
        <div ref={formRef} style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-label" style={{ justifyContent: 'center', color: '#04AF44', marginBottom: '20px' }}>Send a Message</div>
            <h2 style={{
              fontSize: 'clamp(24px, 3vw, 44px)',
              fontWeight: 600, color: '#191919',
              lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              Have a question? Write to us.
            </h2>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #0057A8, #04AF44)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 12px 32px rgba(4,175,68,0.25)',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 600, color: '#191919', marginBottom: '12px' }}>Message Sent!</h3>
              <p style={{ color: '#64748B', fontSize: '16px', lineHeight: 1.7 }}>
                Thank you! We will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="contact-form-grid">
                <div>
                  <label htmlFor="contact-name" className="form-label">Full Name *</label>
                  <input id="contact-name" type="text" required placeholder="Your full name"
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input-light"
                    style={{ background: '#FFFFFF', borderColor: errors.name ? '#E53E3E' : '#E2E8F0', color: '#191919' }}
                  />
                  {errors.name && <span style={{ fontSize: '12px', color: '#E53E3E', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="form-label">Email Address *</label>
                  <input id="contact-email" type="email" required placeholder="you@company.com"
                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input-light"
                    style={{ background: '#FFFFFF', borderColor: errors.email ? '#E53E3E' : '#E2E8F0', color: '#191919' }}
                  />
                  {errors.email && <span style={{ fontSize: '12px', color: '#E53E3E', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="contact-form-grid">
                <div>
                  <label htmlFor="contact-phone" className="form-label">Phone Number</label>
                  <input id="contact-phone" type="tel" placeholder="+965 XXXX XXXX"
                    value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input-light"
                    style={{ background: '#FFFFFF', borderColor: '#E2E8F0', color: '#191919' }}
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="form-label">Subject</label>
                  <input id="contact-subject" type="text" placeholder="How can we help?"
                    value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input-light"
                    style={{ background: '#FFFFFF', borderColor: '#E2E8F0', color: '#191919' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="contact-message" className="form-label">Message *</label>
                <textarea id="contact-message" rows={5} required placeholder="Tell us about your needs..."
                  value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input-light"
                  style={{ background: '#FFFFFF', resize: 'vertical', fontFamily: 'inherit', color: '#191919', borderColor: errors.message ? '#E53E3E' : '#E2E8F0' }}
                />
                {errors.message && <span style={{ fontSize: '12px', color: '#E53E3E', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: '100%', justifyContent: 'center',
                  padding: '16px', fontSize: '14px',
                  opacity: loading ? 0.8 : 1,
                }}
              >
                {loading ? (
                  <>
                    <span className="animate-spin" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#FFFFFF', borderRadius: '50%', display: 'inline-block' }} />
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748B', marginTop: '16px' }}>
                We respond within 24 hours · Your details are always private
              </p>
            </form>
          )}
        </div>

        <style>{`
          @media (max-width: 767px) { .contact-form-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 767px) {
            section { padding-left: 24px !important; padding-right: 24px !important; }
          }
        `}</style>
      </section>
    </div>
  );
}
