// Global loading spinner shown during page transitions
export default function Loading() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        border: '4px solid var(--clr-border)',
        borderTopColor: 'var(--clr-primary)',
        animation: 'spin 0.75s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: 'var(--clr-muted)', fontWeight: 500, fontSize: '0.88rem' }}>Loading…</p>
    </div>
  );
}
