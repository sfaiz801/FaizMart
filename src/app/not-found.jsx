// 404 page shown when route is not found
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔍</div>
        <h1 style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--clr-primary)', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Page Not Found</h2>
        <p style={{ color: 'var(--clr-muted)', marginBottom: '2rem', maxWidth: 380, margin: '0 auto 2rem' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="sn-btn sn-btn--primary sn-btn--lg">Go Home</Link>
          <Link href="/shop" className="sn-btn sn-btn--ghost sn-btn--lg">Browse Shop</Link>
        </div>
      </div>
    </div>
  );
}
