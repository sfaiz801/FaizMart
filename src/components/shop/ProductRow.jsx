'use client';
// Product list-view row for shop page list mode
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { toast } from 'react-toastify';
import { usd, discountedPrice, truncate } from '@/utils/helpers';

export default function ProductRow({ product }) {
  const dispatch = useDispatch();
  const finalPrice = discountedPrice(product.price, product.discountPercentage || 0);

  return (
    <div style={{
      display: 'flex', gap: '1rem', background: 'var(--clr-white)',
      border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1rem',
      transition: 'all 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'transparent'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--clr-border)'; }}
    >
      <Link href={`/product/${product.id}`} style={{ flexShrink: 0 }}>
        <div style={{ width: 120, height: 100, position: 'relative', borderRadius: '8px', overflow: 'hidden', background: '#f1f5f9' }}>
          <Image src={product.thumbnail} alt={product.title} fill style={{ objectFit: 'cover' }} sizes="120px" />
        </div>
      </Link>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'capitalize', color: 'var(--clr-primary)', marginBottom: '0.25rem', letterSpacing: '0.5px' }}>
          {product.category}
        </div>
        <Link href={`/product/${product.id}`}>
          <h6 style={{ fontWeight: 700, color: 'var(--clr-heading)', marginBottom: '0.35rem', fontSize: '0.95rem' }}>{product.title}</h6>
        </Link>
        <p style={{ fontSize: '0.82rem', color: 'var(--clr-body)', marginBottom: '0.6rem' }}>{truncate(product.description, 100)}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, color: 'var(--clr-primary)' }}>{usd(finalPrice)}</span>
          {product.discountPercentage > 2 && (
            <span style={{ textDecoration: 'line-through', color: 'var(--clr-muted)', fontSize: '0.82rem' }}>{usd(product.price)}</span>
          )}
          <span style={{ color: 'var(--clr-warning)', fontSize: '0.8rem' }}>{'★'.repeat(Math.round(product.rating))}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center', flexShrink: 0 }}>
        <button onClick={() => { dispatch(addToCart({ ...product, price: finalPrice })); toast.success('Added to cart!'); }} className="sn-btn sn-btn--primary sn-btn--sm">
          🛒 Cart
        </button>
        <button onClick={() => { dispatch(toggleWishlist(product)); toast.info('Wishlist updated!'); }} className="sn-btn sn-btn--ghost sn-btn--sm">
          ♡ Save
        </button>
      </div>
    </div>
  );
}
