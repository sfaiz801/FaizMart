'use client';
// Shopping cart with qty controls, coupon, and order summary
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartSubtotal, selectDiscount, selectCoupon, removeFromCart, updateQty, applyCoupon, clearCart } from '@/store/slices/cartSlice';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usd } from '@/utils/helpers';

export default function CartPage() {
  const dispatch  = useDispatch();
  const router    = useRouter();
  const items     = useSelector(selectCartItems);
  const subtotal  = useSelector(selectCartSubtotal);
  const discount  = useSelector(selectDiscount);
  const coupon    = useSelector(selectCoupon);
  const [code, setCode] = useState('');

  const discAmt  = (subtotal * discount) / 100;
  const after    = subtotal - discAmt;
  const shipping = after === 0 ? 0 : after >= 50 ? 0 : 4.99;
  const tax      = after * 0.08;
  const total    = after + shipping + tax;

  const handleCoupon = () => {
    if (!code.trim()) return;
    dispatch(applyCoupon(code));
    const valid = ['SAVE10','SAVE20','FLAT50'];
    if (valid.includes(code.trim().toUpperCase())) toast.success(`Coupon applied!`);
    else toast.error('Invalid coupon code');
    setCode('');
  };

  return (
    <>
      <div className="sn-page-banner">
        <div className="container">
          <h1>Shopping Cart</h1>
          <ol className="sn-breadcrumb"><li><Link href="/">Home</Link></li><li>Cart</li></ol>
        </div>
      </div>
      <div className="container" style={{ padding: '2rem 1rem 4rem' }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--clr-muted)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
            <h3 style={{ color: 'var(--clr-heading)', marginBottom: '0.5rem' }}>Your cart is empty</h3>
            <p style={{ marginBottom: '2rem' }}>Add some products to get started.</p>
            <Link href="/shop" className="sn-btn sn-btn--primary sn-btn--lg">Continue Shopping</Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 700 }}>{items.length} item{items.length > 1 ? 's' : ''}</span>
                <button onClick={() => { dispatch(clearCart()); toast.info('Cart cleared'); }} className="sn-btn sn-btn--ghost sn-btn--sm">🗑️ Clear all</button>
              </div>

              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', background: 'var(--clr-white)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1rem', marginBottom: '0.85rem' }}>
                  <Link href={`/product/${item.id}`} style={{ flexShrink: 0 }}>
                    <Image src={item.thumbnail} alt={item.title} width={88} height={88} style={{ borderRadius: '8px', objectFit: 'cover' }} />
                  </Link>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'capitalize', color: 'var(--clr-primary)', marginBottom: '0.2rem', letterSpacing: '0.5px' }}>{item.category}</div>
                    <Link href={`/product/${item.id}`}><h6 style={{ fontWeight: 700, color: 'var(--clr-heading)', fontSize: '0.92rem', marginBottom: '0.3rem' }}>{item.title}</h6></Link>
                    <div style={{ fontWeight: 700, color: 'var(--clr-primary)', marginBottom: '0.5rem' }}>{usd(item.price)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div className="sn-qty">
                        <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.quantity - 1 }))}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.quantity + 1 }))}>+</button>
                      </div>
                      <span style={{ fontSize: '0.82rem', color: 'var(--clr-muted)' }}>Subtotal: <strong style={{ color: 'var(--clr-heading)' }}>{usd(item.price * item.quantity)}</strong></span>
                    </div>
                  </div>
                  <button onClick={() => { dispatch(removeFromCart(item.id)); toast.info('Removed'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-muted)', fontSize: '1rem', flexShrink: 0, alignSelf: 'flex-start' }}>✕</button>
                </div>
              ))}

              {/* Coupon */}
              <div style={{ background: 'var(--clr-white)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1.25rem', marginTop: '1rem' }}>
                <h6 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>🏷️ Have a coupon?</h6>
                <p style={{ fontSize: '0.8rem', color: 'var(--clr-muted)', marginBottom: '0.75rem' }}>Try: <strong>SAVE10</strong>, <strong>SAVE20</strong>, <strong>FLAT50</strong></p>
                {coupon && <div style={{ background: '#dcfce7', color: '#15803d', padding: '0.5rem 0.85rem', borderRadius: '7px', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.75rem' }}>✓ &ldquo;{coupon}&rdquo; applied — {discount}% off!</div>}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input value={code} onChange={e => setCode(e.target.value)} placeholder="Enter code" className="sn-input" onKeyDown={e => e.key === 'Enter' && handleCoupon()} />
                  <button onClick={handleCoupon} className="sn-btn sn-btn--primary" style={{ whiteSpace: 'nowrap' }}>Apply</button>
                </div>
              </div>
              <div style={{ marginTop: '1rem' }}><Link href="/shop" style={{ color: 'var(--clr-primary)', fontSize: '0.88rem', fontWeight: 600 }}>← Continue Shopping</Link></div>
            </div>

            {/* Summary */}
            <div className="col-lg-4">
              <div className="sn-summary-box">
                <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>Order Summary</h5>
                <div className="sn-summary-row"><span>Subtotal</span><span>{usd(subtotal)}</span></div>
                {discount > 0 && <div className="sn-summary-row" style={{ color: 'var(--clr-success)' }}><span>Discount ({discount}%)</span><span>−{usd(discAmt)}</span></div>}
                <div className="sn-summary-row"><span>Shipping</span><span>{shipping === 0 ? <span style={{ color: 'var(--clr-success)' }}>Free</span> : usd(shipping)}</span></div>
                <div className="sn-summary-row"><span>Tax (8%)</span><span>{usd(tax)}</span></div>
                <div className="sn-summary-row sn-summary-row--total"><span>Total</span><span>{usd(total)}</span></div>
                <button onClick={() => router.push('/checkout')} className="sn-btn sn-btn--primary sn-btn--block sn-btn--lg" style={{ marginTop: '1rem', borderRadius: '8px' }}>
                  Proceed to Checkout →
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--clr-muted)', marginTop: '0.75rem' }}>🔒 Secure SSL checkout</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
