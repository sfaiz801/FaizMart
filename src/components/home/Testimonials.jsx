'use client';
// Customer review cards section
const REVIEWS = [
  { name: 'Aarav Sharma', role: 'Verified Buyer', stars: 5, text: 'Excellent quality and super fast delivery. Ordered a smartphone — arrived in 2 days. Will definitely order again!', avatar: 'AS' },
  { name: 'Priya Mehta', role: 'Regular Customer', stars: 5, text: 'Best skincare collection I have found online. Prices are unbeatable and support is always responsive.', avatar: 'PM' },
  { name: 'Rohan Verma', role: 'Verified Buyer', stars: 4, text: 'Product matched the description perfectly. Packaging was secure and delivery was on time. Highly recommend.', avatar: 'RV' },
  { name: 'Anjali Singh', role: 'Loyal Shopper', stars: 5, text: 'Shopping here for 2+ years. Never had a bad experience. Easy returns and great customer support.', avatar: 'AN' },
];

function ReviewCard({ r }) {
  return (
    <div style={{
      background: 'var(--clr-white)',
      border: '1px solid var(--clr-border)',
      borderRadius: '14px',
      padding: '1.5rem',
      height: '100%',
      transition: 'all 0.25s',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'transparent'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--clr-border)'; }}
    >
      <div style={{ color: 'var(--clr-warning)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
        {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
      </div>
      <p style={{ color: 'var(--clr-body)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
        &ldquo;{r.text}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--clr-primary)', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
        }}>{r.avatar}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--clr-heading)' }}>{r.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--clr-muted)' }}>{r.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="sn-section sn-section--white">
      <div className="container">
        <div className="text-center mb-5">
          <span className="sn-label">Social Proof</span>
          <h2 className="sn-heading">What Our Shoppers Say</h2>
          <p className="sn-subheading">Trusted by over 1 million happy customers worldwide</p>
        </div>
        <div className="row g-3">
          {REVIEWS.map((r, i) => (
            <div key={i} className="col-sm-6 col-lg-3">
              <ReviewCard r={r} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
