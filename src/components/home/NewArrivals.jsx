// New arrivals product grid section
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';

export default function NewArrivals({ products }) {
  return (
    <section className="sn-section sn-section--gray">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="sn-label">Just landed</span>
            <h2 className="sn-heading">New Arrivals</h2>
          </div>
          <Link href="/shop" className="sn-btn sn-btn--outline sn-btn--sm">See All</Link>
        </div>
        <div className="row g-3">
          {products.map(p => (
            <div key={p.id} className="col-6 col-md-4 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
