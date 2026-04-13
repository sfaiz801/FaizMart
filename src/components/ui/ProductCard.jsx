'use client';
// Reusable product card with hover actions, wishlist toggle, add to cart
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist, selectIsWishlisted } from '@/store/slices/wishlistSlice';
import { toast } from 'react-toastify';
import { usd, discountedPrice, truncate } from '@/utils/helpers';

export default function ProductCard({ product }) {
  const dispatch    = useDispatch();
  const isWishlisted = useSelector(selectIsWishlisted(product.id));
  const finalPrice  = discountedPrice(product.price, product.discountPercentage || 0);
  const hasDiscount = product.discountPercentage > 2;

  const handleCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, price: finalPrice }));
    toast.success(`Added to cart!`);
  };

  const handleWish = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
    toast.info(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  return (
    <div className="sn-card">
      <Link href={`/product/${product.id}`}>
        {/* Image */}
        <div className="sn-card__img">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
          {hasDiscount && (
            <span className="sn-card__badge">-{Math.round(product.discountPercentage)}%</span>
          )}
          {/* Hover actions */}
          <div className="sn-card__actions">
            <button onClick={handleCart}>🛒 Add to Cart</button>
            <button className="wish-btn" onClick={handleWish}>
              {isWishlisted ? '❤️' : '♡'} Wishlist
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="sn-card__body">
          <div className="sn-card__cat">{product.category?.replace(/-/g, ' ')}</div>
          <div className="sn-card__name">{truncate(product.title)}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem' }}>
            <div>
              <span className="sn-card__price">{usd(finalPrice)}</span>
              {hasDiscount && <span className="sn-card__price-old">{usd(product.price)}</span>}
            </div>
            <div className="sn-card__stars">
              {'★'.repeat(Math.round(product.rating || 0))}
              <span style={{ color: 'var(--clr-muted)', fontSize: '0.72rem', marginLeft: '2px' }}>({product.rating})</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
