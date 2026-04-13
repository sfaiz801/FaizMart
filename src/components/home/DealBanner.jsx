'use client';
// Promotional deal/discount banner between product sections
import Link from 'next/link';

export default function DealBanner() {
  return (
    <section style={{ padding: '2rem 0', background: 'var(--clr-bg)' }}>
      <div className="container">
        <div style={{
          background: 'linear-gradient(120deg, #0f172a 0%, #134e4a 60%, #0f766e 100%)',
          borderRadius: '16px',
          padding: '3rem 2.5rem',
          position: 'relative',
          overflow: 'hidden',
          color: 'white',
        }}>
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'absolute', bottom: -40, left: 200, width: 160, height: 160, borderRadius: '50%', background: 'rgba(249,115,22,0.12)' }} />

          <div className="row align-items-center position-relative">
            <div className="col-lg-7">
              <span style={{
                background: 'rgba(249,115,22,0.2)', border: '1px solid rgba(249,115,22,0.4)',
                color: '#fb923c', fontSize: '0.75rem', fontWeight: 700,
                padding: '0.3rem 0.9rem', borderRadius: '50px', display: 'inline-block', marginBottom: '1rem',
              }}>
                ⚡ Limited Time Offer
              </span>
              <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>
                Up to <span style={{ color: '#fb923c' }}>50% Off</span> on<br />Top Electronics &amp; Fashion
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.75rem', lineHeight: 1.8 }}>
                Use code{' '}
                <code style={{ background: 'rgba(255,255,255,0.12)', padding: '2px 10px', borderRadius: '5px', fontWeight: 700 }}>SAVE20</code>
                {' '}at checkout for an extra 20% off.
              </p>
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <Link href="/shop" className="sn-btn sn-btn--accent sn-btn--lg">Shop the Sale</Link>
                <Link href="/shop?category=smartphones" style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '0.85rem 2rem', borderRadius: '6px', fontWeight: 600, fontSize: '1rem',
                  border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Browse Electronics
                </Link>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '5rem', marginBottom: '0.75rem' }}>🎁</div>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem 2rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>50%</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Max Discount</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
