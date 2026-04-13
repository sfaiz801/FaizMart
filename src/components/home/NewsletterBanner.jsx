'use client';
// Email newsletter subscription section
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success('Subscribed! Check your inbox for a welcome deal. 🎉');
    setEmail('');
    setLoading(false);
  };

  return (
    <section id="contact" className="sn-section sn-section--gray">
      <div className="container">
        <div style={{
          background: 'linear-gradient(135deg, var(--clr-primary-light) 0%, #e0f2fe 100%)',
          border: '1px solid rgba(13,148,136,0.2)',
          borderRadius: '16px',
          padding: '3rem 2rem',
          textAlign: 'center',
        }}>
          <span className="sn-label">Newsletter</span>
          <h2 className="sn-heading" style={{ marginBottom: '0.5rem' }}>Get the Best Deals First</h2>
          <p style={{ color: 'var(--clr-body)', marginBottom: '2rem', maxWidth: 480, margin: '0 auto 2rem' }}>
            Subscribe and get exclusive offers, early access to sales, and new arrival updates — no spam, ever.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.65rem', maxWidth: 460, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="sn-input"
              style={{ flex: 1, minWidth: 220, borderRadius: '50px' }}
            />
            <button type="submit" disabled={loading} className="sn-btn sn-btn--primary" style={{ borderRadius: '50px' }}>
              {loading ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
          <p style={{ fontSize: '0.75rem', color: 'var(--clr-muted)', marginTop: '0.85rem' }}>
            🔒 No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
