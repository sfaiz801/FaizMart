'use client';
// Site footer with quick links, newsletter signup, payment icons
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Subscribed successfully! 🎉');
    setEmail('');
  };

  const cols = [
    {
      title: 'Quick Links',
      links: [['/', 'Home'], ['/shop', 'Shop'], ['/#about', 'About Us'], ['/#contact', 'Contact']],
    },
    {
      title: 'Customer Care',
      links: [['#', 'Returns & Refunds'], ['#', 'Shipping Policy'], ['#', 'Privacy Policy'], ['#', 'FAQ']],
    },
  ];

  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', marginTop: '4rem' }}>
      <div className="container" style={{ padding: '3.5rem 1rem 1.5rem' }}>
        <div className="row g-4">
          {/* Brand + about */}
          <div className="col-lg-4">
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
              Faiz<span style={{ color: '#0d9488' }}>Mart</span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.8, maxWidth: 300 }}>
              Your trusted destination for quality products across electronics, fashion, home & more.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem' }}>
              {['f', 'in', 'tw', 'ig'].map(s => (
                <a key={s} href="#" style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: '#1e293b', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700,
                  color: '#94a3b8', transition: 'all 0.2s', textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#0d9488'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = '#94a3b8'; }}
                >{s.toUpperCase()}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title} className="col-sm-6 col-lg-2">
              <h6 style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem' }}>{col.title}</h6>
              {col.links.map(([href, label]) => (
                <div key={label} style={{ marginBottom: '0.5rem' }}>
                  <Link href={href} style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#0d9488'}
                    onMouseLeave={e => e.target.style.color = '#94a3b8'}
                  >{label}</Link>
                </div>
              ))}
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-lg-4">
            <h6 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Stay Updated</h6>
            <p style={{ fontSize: '0.83rem', marginBottom: '1rem' }}>Get exclusive deals straight to your inbox.</p>
            <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: 1, padding: '0.55rem 0.85rem',
                  border: '1px solid #1e293b',
                  background: '#1e293b', color: '#fff',
                  borderRadius: '6px', outline: 'none',
                  fontSize: '0.85rem', fontFamily: 'inherit',
                }}
              />
              <button type="submit" style={{
                background: '#0d9488', color: '#fff', border: 'none',
                padding: '0.55rem 1rem', borderRadius: '6px',
                fontWeight: 600, fontSize: '0.83rem', cursor: 'pointer',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.target.style.background = '#0f766e'}
                onMouseLeave={e => e.target.style.background = '#0d9488'}
              >Subscribe</button>
            </form>
            <div style={{ marginTop: '1.25rem', fontSize: '0.78rem' }}>
              <div style={{ marginBottom: '0.5rem', color: '#475569' }}>Accepted payments</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['VISA', 'MC', 'UPI', 'COD'].map(p => (
                  <span key={p} style={{ background: '#1e293b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8' }}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #1e293b', marginTop: '2.5rem', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem' }}>
          <span>© {new Date().getFullYear()} FaizMart. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy', 'Terms', 'Sitemap'].map(l => (
              <a key={l} href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
