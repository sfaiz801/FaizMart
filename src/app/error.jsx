'use client';
// Global error boundary for unhandled runtime errors
export default function Error({ error, reset }) {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
        <h2 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Something went wrong</h2>
        <p style={{ color: 'var(--clr-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          {error?.message || 'An unexpected error occurred.'}
        </p>
        <button onClick={reset} className="sn-btn sn-btn--primary sn-btn--lg">Try Again</button>
      </div>
    </div>
  );
}
