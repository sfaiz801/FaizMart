'use client';
// Full product detail: gallery, info, qty, reviews, related products
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { toast } from 'react-toastify';
import { usd, discountedPrice } from '@/utils/helpers';
import { getProductsByCategory } from '@/utils/api';
import ProductCard from '@/components/ui/ProductCard';

export default function ProductDetail({ product }) {
  const dispatch   = useDispatch();
  const [mainImg,  setMainImg]  = useState(product.images?.[0] || product.thumbnail);
  const [qty,      setQty]      = useState(1);
  const [tab,      setTab]      = useState('desc');
  const [related,  setRelated]  = useState([]);

  const finalPrice = discountedPrice(product.price, product.discountPercentage || 0);
  const savings    = (product.price - finalPrice).toFixed(2);

  useEffect(() => {
    getProductsByCategory(product.category, 5)
      .then(d => setRelated((d.products || []).filter(p => p.id !== product.id).slice(0, 4)));
  }, [product.id, product.category]);

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--clr-white)', borderBottom: '1px solid var(--clr-border)', padding: '0.6rem 0' }}>
        <div className="container">
          <ol className="sn-breadcrumb" style={{ color: 'var(--clr-muted)' }}>
            <li><Link href="/" style={{ color: 'var(--clr-body)' }}>Home</Link></li>
            <li><Link href="/shop" style={{ color: 'var(--clr-body)' }}>Shop</Link></li>
            <li><Link href={`/shop?category=${product.category}`} style={{ color: 'var(--clr-body)', textTransform: 'capitalize' }}>{product.category.replace(/-/g, ' ')}</Link></li>
            <li style={{ color: 'var(--clr-heading)' }}>{product.title}</li>
          </ol>
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 1rem 4rem' }}>
        <div className="row g-5">
          {/* Gallery */}
          <div className="col-lg-5">
            <div style={{ position: 'relative', aspectRatio: '1', borderRadius: '14px', overflow: 'hidden', background: '#f1f5f9', marginBottom: '0.75rem' }}>
              <Image src={mainImg} alt={product.title} fill style={{ objectFit: 'contain' }} sizes="500px" />
              {product.discountPercentage > 2 && (
                <span style={{ position: 'absolute', top: 14, left: 14, background: 'var(--clr-accent)', color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                  -{Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {product.images?.map((img, i) => (
                <div key={i} onClick={() => setMainImg(img)} style={{
                  width: 68, height: 68, borderRadius: '8px', overflow: 'hidden',
                  border: `2.5px solid ${mainImg === img ? 'var(--clr-primary)' : 'var(--clr-border)'}`,
                  cursor: 'pointer', position: 'relative', background: '#f1f5f9',
                  transition: 'border-color 0.2s',
                }}>
                  <Image src={img} alt="" fill style={{ objectFit: 'cover' }} sizes="68px" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="col-lg-7">
            <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--clr-primary)', marginBottom: '0.5rem' }}>
              {product.brand} · {product.category?.replace(/-/g, ' ')}
            </div>
            <h1 style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.75rem', color: 'var(--clr-heading)' }}>
              {product.title}
            </h1>

            {/* Rating row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ color: 'var(--clr-warning)', fontSize: '1rem' }}>
                {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
                <span style={{ color: 'var(--clr-muted)', fontSize: '0.82rem', marginLeft: '0.4rem' }}>({product.reviews?.length || 0} reviews)</span>
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: product.stock > 0 ? 'var(--clr-success)' : 'var(--clr-danger)' }}>
                {product.stock > 0 ? `✓ In Stock (${product.stock})` : '✗ Out of Stock'}
              </span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--clr-primary)' }}>{usd(finalPrice)}</span>
              {product.discountPercentage > 2 && (
                <>
                  <span style={{ textDecoration: 'line-through', color: 'var(--clr-muted)', marginLeft: '0.75rem', fontSize: '1.1rem' }}>{usd(product.price)}</span>
                  <span style={{ marginLeft: '0.75rem', background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '5px', fontSize: '0.8rem', fontWeight: 700 }}>
                    You save ${savings}
                  </span>
                </>
              )}
            </div>

            <p style={{ color: 'var(--clr-body)', lineHeight: 1.8, marginBottom: '1.75rem', fontSize: '0.92rem' }}>{product.description}</p>

            {/* Qty + Actions */}
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="sn-qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button onClick={() => { for (let i=0;i<qty;i++) dispatch(addToCart({ ...product, price: finalPrice })); toast.success(`${qty}× added to cart!`); }}
                disabled={product.stock === 0} className="sn-btn sn-btn--primary sn-btn--lg"
                style={{ boxShadow: '0 6px 20px rgba(13,148,136,0.28)' }}>
                🛒 Add to Cart
              </button>
              <button onClick={() => { dispatch(toggleWishlist(product)); toast.info('Wishlist updated!'); }} className="sn-btn sn-btn--ghost sn-btn--lg">
                ♡ Wishlist
              </button>
            </div>

            {/* Meta details */}
            <div style={{ borderTop: '1px solid var(--clr-border)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[['SKU', product.sku], ['Warranty', product.warrantyInformation], ['Shipping', product.shippingInformation], ['Return', product.returnPolicy]].map(([k, v]) => v && (
                <div key={k} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--clr-muted)', minWidth: 80 }}>{k}:</span>
                  <span style={{ fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description / Reviews */}
        <div style={{ marginTop: '3rem' }}>
          <div style={{ display: 'flex', borderBottom: '2px solid var(--clr-border)', gap: '2rem', marginBottom: '2rem' }}>
            {[['desc', 'Description'], ['reviews', `Reviews (${product.reviews?.length || 0})`]].map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.65rem 0', fontWeight: 700, fontSize: '0.9rem',
                borderBottom: `3px solid ${tab === key ? 'var(--clr-primary)' : 'transparent'}`,
                color: tab === key ? 'var(--clr-primary)' : 'var(--clr-muted)',
                marginBottom: -2, transition: 'all 0.2s', fontFamily: 'inherit',
              }}>{label}</button>
            ))}
          </div>

          {tab === 'desc' ? (
            <div style={{ maxWidth: 680 }}>
              <p style={{ color: 'var(--clr-body)', lineHeight: 1.9, fontSize: '0.92rem' }}>{product.description}</p>
              {product.tags?.length > 0 && (
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {product.tags.map(t => (
                    <span key={t} style={{ background: 'var(--clr-primary-light)', color: 'var(--clr-primary)', padding: '3px 12px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {product.reviews?.length > 0 ? product.reviews.map((r, i) => (
                <div key={i} style={{ border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1.1rem 1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{r.reviewerName}</div>
                      <div style={{ color: 'var(--clr-warning)', fontSize: '0.82rem' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                    </div>
                    <div style={{ color: 'var(--clr-muted)', fontSize: '0.78rem' }}>{new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  </div>
                  <p style={{ color: 'var(--clr-body)', fontSize: '0.88rem', margin: 0, lineHeight: 1.7 }}>{r.comment}</p>
                </div>
              )) : <p style={{ color: 'var(--clr-muted)' }}>No reviews yet.</p>}
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <span className="sn-label">More like this</span>
            <h2 className="sn-heading" style={{ marginBottom: '1.5rem' }}>Related Products</h2>
            <div className="row g-3">
              {related.map(p => <div key={p.id} className="col-6 col-md-4 col-lg-3"><ProductCard product={p} /></div>)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
