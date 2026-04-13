'use client';
// Sidebar filter panel: category, price range, rating
export default function ShopSidebar({ categories, filters, onChange }) {
  const set = (key, val) => onChange(prev => ({ ...prev, [key]: val }));
  const reset = () => onChange({ category: '', minPrice: 0, maxPrice: 2000, minRating: 0 });

  return (
    <div className="sn-filters">
      <div className="sn-filters__head">
        <span>Filters</span>
        <button onClick={reset} style={{ background: 'none', border: 'none', color: 'var(--clr-primary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
          Reset all
        </button>
      </div>

      {/* Category */}
      <div className="sn-filters__section">
        <div className="sn-filters__title">Category</div>
        <div style={{ maxHeight: 220, overflowY: 'auto' }}>
          <label className="sn-radio-item">
            <input type="radio" name="cat" checked={filters.category === ''} onChange={() => set('category', '')} /> All
          </label>
          {categories.map(cat => {
            const slug = typeof cat === 'string' ? cat : cat.slug;
            const name = typeof cat === 'string' ? cat : cat.name;
            return (
              <label key={slug} className="sn-radio-item">
                <input type="radio" name="cat" checked={filters.category === slug} onChange={() => set('category', slug)} />
                <span style={{ textTransform: 'capitalize' }}>{name.replace(/-/g, ' ')}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div className="sn-filters__section">
        <div className="sn-filters__title">Price Range</div>
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.65rem' }}>
          <input type="number" value={filters.minPrice} onChange={e => set('minPrice', +e.target.value)} placeholder="Min" min={0} className="sn-input" style={{ padding: '0.4rem 0.6rem', fontSize: '0.82rem' }} />
          <input type="number" value={filters.maxPrice} onChange={e => set('maxPrice', +e.target.value)} placeholder="Max" className="sn-input" style={{ padding: '0.4rem 0.6rem', fontSize: '0.82rem' }} />
        </div>
        <input type="range" min={0} max={2000} step={10} value={filters.maxPrice}
          onChange={e => set('maxPrice', +e.target.value)}
          style={{ width: '100%', accentColor: 'var(--clr-primary)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--clr-muted)', marginTop: '0.25rem' }}>
          <span>$0</span><span style={{ color: 'var(--clr-primary)', fontWeight: 600 }}>${filters.maxPrice}</span><span>$2000</span>
        </div>
      </div>

      {/* Rating */}
      <div className="sn-filters__section">
        <div className="sn-filters__title">Min Rating</div>
        {[0, 3, 3.5, 4, 4.5].map(r => (
          <label key={r} className="sn-radio-item">
            <input type="radio" name="rating" checked={filters.minRating === r} onChange={() => set('minRating', r)} />
            {r === 0 ? 'All Ratings' : <span style={{ color: 'var(--clr-warning)' }}>{'★'.repeat(Math.floor(r))} <span style={{ color: 'var(--clr-muted)', fontSize: '0.78rem' }}>&amp; above</span></span>}
          </label>
        ))}
      </div>
    </div>
  );
}
