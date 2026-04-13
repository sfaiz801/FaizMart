'use client';
// Wishlist page - shows saved products with move-to-cart option
import { useSelector, useDispatch } from 'react-redux';
import { selectWishlistItems, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import { usd, discountedPrice } from '@/utils/helpers';

export default function WishlistPage() {
  const items    = useSelector(selectWishlistItems);
  const dispatch = useDispatch();

  const moveToCart = (item) => {
    dispatch(addToCart({ ...item, price: discountedPrice(item.price, item.discountPercentage || 0) }));
    dispatch(removeFromWishlist(item.id));
    toast.success('Moved to cart!');
  };

  return (
    <>
      <div className="sn-page-banner">
        <div className="container">
          <h1>My Wishlist</h1>
          <ol className="sn-breadcrumb"><li><Link href="/">Home</Link></li><li>Wishlist</li></ol>
        </div>
      </div>
      <div className="container" style={{ padding: '2rem 1rem 4rem' }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--clr-muted)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>♡</div>
            <h3 style={{ color: 'var(--clr-heading)', marginBottom: '0.5rem' }}>Your wishlist is empty</h3>
            <p style={{ marginBottom: '2rem' }}>Save products you love and come back later.</p>
            <Link href="/shop" className="sn-btn sn-btn--primary sn-btn--lg">Browse Products</Link>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--clr-muted)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>{items.length} saved item{items.length > 1 ? 's' : ''}</p>
            <div className="row g-3">
              {items.map(item => {
                const price = discountedPrice(item.price, item.discountPercentage || 0);
                return (
                  <div key={item.id} className="col-sm-6 col-md-4 col-lg-3">
                    <div className="sn-card">
                      <Link href={`/product/${item.id}`}>
                        <div className="sn-card__img">
                          <Image src={item.thumbnail} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="300px" />
                        </div>
                        <div className="sn-card__body">
                          <div className="sn-card__cat">{item.category}</div>
                          <div className="sn-card__name">{item.title}</div>
                          <div style={{ fontWeight: 700, color: 'var(--clr-primary)', marginBottom: '0.75rem' }}>{usd(price)}</div>
                        </div>
                      </Link>
                      <div style={{ padding: '0 1rem 1rem', display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => moveToCart(item)} className="sn-btn sn-btn--primary sn-btn--sm" style={{ flex: 1 }}>Move to Cart</button>
                        <button onClick={() => { dispatch(removeFromWishlist(item.id)); toast.info('Removed'); }} className="sn-btn sn-btn--ghost sn-btn--sm">🗑️</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
