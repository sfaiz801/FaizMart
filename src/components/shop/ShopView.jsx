'use client';
// Main shop page: search params, filters, sort, grid/list, pagination
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import ShopSidebar from '@/components/shop/ShopSidebar';
import ProductRow from '@/components/shop/ProductRow';
import { getProducts } from '@/utils/api';

const PER_PAGE = 12;
const SORTS = [
  { value: 'default',    label: 'Default' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'name-asc',   label: 'Name: A – Z' },
];

export default function ShopView({ categories }) {
  const searchParams = useSearchParams();
  const urlCategory  = searchParams.get('category') || '';
  const urlSearch    = searchParams.get('search')   || '';

  const [products, setProducts] = useState([]);
  const [total,    setTotal]    = useState(0);
  const [loading,  setLoading]  = useState(true);
  const [view,     setView]     = useState('grid');
  const [page,     setPage]     = useState(1);
  const [sort,     setSort]     = useState('default');
  const [filters,  setFilters]  = useState({ category: urlCategory, minPrice: 0, maxPrice: 2000, minRating: 0 });

  // Sync URL param changes into filters
  useEffect(() => {
    setFilters(f => ({ ...f, category: urlCategory }));
    setPage(1);
  }, [urlCategory, urlSearch]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const data = await getProducts({ limit: 200, search: urlSearch, category: filters.category });
    let items  = data.products || [];

    // Apply price + rating filters client-side
    items = items.filter(p => {
      const fp = p.price - (p.price * p.discountPercentage) / 100;
      return fp >= filters.minPrice && fp <= filters.maxPrice && p.rating >= filters.minRating;
    });

    // Sort
    if (sort === 'price-asc')  items.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') items.sort((a, b) => b.price - a.price);
    if (sort === 'rating')     items.sort((a, b) => b.rating - a.rating);
    if (sort === 'name-asc')   items.sort((a, b) => a.title.localeCompare(b.title));

    setTotal(items.length);
    setProducts(items.slice((page - 1) * PER_PAGE, page * PER_PAGE));
    setLoading(false);
  }, [filters, sort, page, urlSearch]);

  useEffect(() => { loadProducts(); }, [loadProducts]);
  useEffect(() => { setPage(1); }, [filters, sort]);

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      {/* Page Banner */}
      <div className="sn-page-banner">
        <div className="container">
          <h1>{urlSearch ? `Results for "${urlSearch}"` : filters.category ? filters.category.replace(/-/g, ' ') : 'All Products'}</h1>
          <ol className="sn-breadcrumb">
            <li><a href="/">Home</a></li>
            <li>Shop</li>
          </ol>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-3">
            <ShopSidebar categories={categories} filters={filters} onChange={setFilters} />
          </div>

          {/* Products */}
          <div className="col-lg-9">
            {/* Toolbar */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--clr-white)', border: '1px solid var(--clr-border)',
              borderRadius: '10px', padding: '0.65rem 1rem', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem',
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--clr-muted)' }}>
                {loading ? 'Loading…' : `${total} products found`}
              </span>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <select value={sort} onChange={e => setSort(e.target.value)} className="sn-input sn-select" style={{ width: 'auto', padding: '0.4rem 2rem 0.4rem 0.75rem', fontSize: '0.83rem' }}>
                  {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <div style={{ display: 'flex', border: '1px solid var(--clr-border)', borderRadius: '7px', overflow: 'hidden' }}>
                  {['grid', 'list'].map(v => (
                    <button key={v} onClick={() => setView(v)} style={{
                      width: 34, height: 34, border: 'none', cursor: 'pointer', fontSize: '0.9rem',
                      background: view === v ? 'var(--clr-primary)' : 'transparent',
                      color: view === v ? 'white' : 'var(--clr-muted)',
                      transition: 'all 0.2s',
                    }}>{v === 'grid' ? '⊞' : '☰'}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Grid or List */}
            {loading ? (
              <div className="row g-3">
                {[...Array(PER_PAGE)].map((_, i) => (
                  <div key={i} className={view === 'grid' ? 'col-6 col-md-4' : 'col-12'}>
                    <div className="sn-skeleton" style={{ height: view === 'grid' ? 280 : 110, borderRadius: 12 }} />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--clr-muted)' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                <h4 style={{ color: 'var(--clr-heading)' }}>No products found</h4>
                <p style={{ marginBottom: '1.5rem' }}>Try adjusting your filters or search term.</p>
                <button onClick={() => setFilters({ category: '', minPrice: 0, maxPrice: 2000, minRating: 0 })} className="sn-btn sn-btn--primary">
                  Clear Filters
                </button>
              </div>
            ) : view === 'grid' ? (
              <div className="row g-3">
                {products.map(p => <div key={p.id} className="col-6 col-md-4"><ProductCard product={p} /></div>)}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {products.map(p => <ProductRow key={p.id} product={p} />)}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                <PgBtn onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹ Prev</PgBtn>
                {[...Array(totalPages)].map((_, i) => (
                  <PgBtn key={i} active={page === i + 1} onClick={() => setPage(i + 1)}>{i + 1}</PgBtn>
                ))}
                <PgBtn onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next ›</PgBtn>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function PgBtn({ children, onClick, active, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '0.45rem 0.85rem', border: '1.5px solid',
      borderColor: active ? 'var(--clr-primary)' : 'var(--clr-border)',
      background: active ? 'var(--clr-primary)' : 'white',
      color: active ? 'white' : disabled ? 'var(--clr-muted)' : 'var(--clr-heading)',
      borderRadius: '7px', cursor: disabled ? 'not-allowed' : 'pointer',
      fontWeight: active ? 700 : 500, fontSize: '0.85rem',
      opacity: disabled ? 0.5 : 1, transition: 'all 0.2s',
      fontFamily: 'inherit',
    }}>{children}</button>
  );
}
