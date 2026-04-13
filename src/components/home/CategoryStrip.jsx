'use client';
// Horizontal scrollable category chips with icons
import Link from 'next/link';

const ICONS = {
  smartphones:'📱', laptops:'💻', fragrances:'🌸', skincare:'🧴',
  groceries:'🛒', 'home-decoration':'🏠', furniture:'🛋️', tops:'👕',
  'womens-dresses':'👗', 'womens-shoes':'👠', 'mens-shirts':'👔',
  'mens-shoes':'👟', 'mens-watches':'⌚', sunglasses:'🕶️',
  automotive:'🚗', lighting:'💡',
};

export default function CategoryStrip({ categories }) {
  return (
    <section style={{ background: 'var(--clr-white)', borderBottom: '1px solid var(--clr-border)', padding: '1.5rem 0' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem', scrollbarWidth: 'none' }}>
          {categories.map(cat => {
            const slug = typeof cat === 'string' ? cat : cat.slug;
            const name = typeof cat === 'string' ? cat : cat.name;
            const icon = ICONS[slug] || '📦';
            return (
              <Link
                key={slug}
                href={`/shop?category=${slug}`}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '0.35rem', padding: '0.65rem 1.1rem',
                  background: 'var(--clr-bg)',
                  border: '1.5px solid var(--clr-border)',
                  borderRadius: '10px', whiteSpace: 'nowrap',
                  textDecoration: 'none', transition: 'all 0.2s',
                  minWidth: 80,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--clr-primary)';
                  e.currentTarget.style.background = 'var(--clr-primary-light)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--clr-border)';
                  e.currentTarget.style.background = 'var(--clr-bg)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--clr-body)', textTransform: 'capitalize' }}>
                  {name.replace(/-/g, ' ')}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
