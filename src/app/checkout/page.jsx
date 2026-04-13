'use client';
// Multi-step checkout: shipping, billing, method, payment, review
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectCartItems, selectCartSubtotal, selectDiscount, clearCart } from '@/store/slices/cartSlice';
import { selectUser } from '@/store/slices/authSlice';
import { createOrder } from '@/utils/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usd } from '@/utils/helpers';

const STEPS = ['Shipping', 'Billing', 'Method', 'Payment', 'Review'];

export default function CheckoutPage() {
  const dispatch  = useDispatch();
  const router    = useRouter();
  const items     = useSelector(selectCartItems);
  const subtotal  = useSelector(selectCartSubtotal);
  const discount  = useSelector(selectDiscount);
  const user      = useSelector(selectUser);

  const [step,    setStep]    = useState(0);
  const [method,  setMethod]  = useState('standard');
  const [payment, setPayment] = useState('card');
  const [placing, setPlacing] = useState(false);
  const [done,    setDone]    = useState(null);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    defaultValues: { firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '', phone: user?.phone || '', address: '', city: '', state: '', zip: '', country: 'India' }
  });

  const discAmt    = (subtotal * discount) / 100;
  const after      = subtotal - discAmt;
  const shipCost   = method === 'express' ? 14.99 : method === 'overnight' ? 29.99 : after >= 50 ? 0 : 4.99;
  const tax        = after * 0.08;
  const total      = after + shipCost + tax;

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const form = getValues();
      const result = await createOrder({ userId: user?.id || 'guest', items: items.map(i => ({ id: i.id, title: i.title, price: i.price, quantity: i.quantity, thumbnail: i.thumbnail })), shipping: form, shippingMethod: method, paymentMethod: payment, subtotal, discount: discAmt, shippingCost: shipCost, tax, total, status: 'pending', createdAt: new Date().toISOString() });
      dispatch(clearCart());
      setDone(result);
      toast.success('Order placed! 🎉');
    } catch { toast.error('Order failed. Please try again.'); }
    finally { setPlacing(false); }
  };

  if (items.length === 0 && !done) return (
    <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--clr-muted)' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
      <h3 style={{ color: 'var(--clr-heading)' }}>Cart is empty</h3>
      <Link href="/shop" className="sn-btn sn-btn--primary sn-btn--lg" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>Shop Now</Link>
    </div>
  );

  if (done) return (
    <div style={{ textAlign: 'center', padding: '6rem 0' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
      <h2 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Order Confirmed!</h2>
      <p style={{ color: 'var(--clr-muted)', marginBottom: '0.4rem' }}>Thank you for shopping with us.</p>
      <p style={{ marginBottom: '2rem' }}>Order ID: <strong style={{ color: 'var(--clr-primary)' }}>#{done.id}</strong></p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/account/orders" className="sn-btn sn-btn--primary sn-btn--lg">View Orders</Link>
        <Link href="/shop" className="sn-btn sn-btn--ghost sn-btn--lg">Continue Shopping</Link>
      </div>
    </div>
  );

  const InputField = ({ label, name, type = 'text', placeholder, rules, half }) => (
    <div style={{ gridColumn: half ? 'span 1' : 'span 2' }}>
      <label className="sn-label-text">{label}</label>
      <input className="sn-input" type={type} placeholder={placeholder} {...register(name, rules)} />
      {errors[name] && <div className="sn-field-error">{errors[name].message}</div>}
    </div>
  );

  return (
    <>
      <div className="sn-page-banner">
        <div className="container">
          <h1>Checkout</h1>
          <ol className="sn-breadcrumb"><li><Link href="/">Home</Link></li><li><Link href="/cart">Cart</Link></li><li>Checkout</li></ol>
        </div>
      </div>
      <div className="container" style={{ padding: '2rem 1rem 4rem' }}>
        {/* Stepper */}
        <div className="sn-stepper">
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
              <div className={`sn-step ${i === step ? 'sn-step--active' : i < step ? 'sn-step--done' : ''}`}>
                <div className="sn-step__num">{i < step ? '✓' : i + 1}</div>
                <span>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`sn-step__line ${i < step ? 'sn-step__line--done' : ''}`} style={{ flex: 1 }} />}
            </div>
          ))}
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <div style={{ background: 'var(--clr-white)', border: '1px solid var(--clr-border)', borderRadius: '14px', padding: '1.75rem' }}>
              {/* Step 0: Shipping */}
              {step === 0 && (
                <>
                  <h5 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>📦 Shipping Information</h5>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                    <InputField label="First Name *" name="firstName" placeholder="John" rules={{ required: 'Required' }} half />
                    <InputField label="Last Name *" name="lastName" placeholder="Doe" rules={{ required: 'Required' }} half />
                    <InputField label="Email *" name="email" type="email" placeholder="you@example.com" rules={{ required: 'Required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid' } }} half />
                    <InputField label="Phone *" name="phone" placeholder="+91 98765 43210" rules={{ required: 'Required' }} half />
                    <div style={{ gridColumn: 'span 2' }}>
                      <label className="sn-label-text">Address *</label>
                      <input className="sn-input" placeholder="Street address" {...register('address', { required: 'Required' })} />
                      {errors.address && <div className="sn-field-error">{errors.address.message}</div>}
                    </div>
                    <InputField label="City *" name="city" placeholder="Mumbai" rules={{ required: 'Required' }} half />
                    <InputField label="State *" name="state" placeholder="Maharashtra" rules={{ required: 'Required' }} half />
                    <InputField label="PIN Code *" name="zip" placeholder="400001" rules={{ required: 'Required' }} half />
                    <div>
                      <label className="sn-label-text">Country</label>
                      <select className="sn-input sn-select" {...register('country')}>
                        <option>India</option><option>USA</option><option>UK</option><option>UAE</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              {/* Step 1: Billing */}
              {step === 1 && (
                <>
                  <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>💳 Billing Information</h5>
                  <div style={{ background: 'var(--clr-bg)', borderRadius: '10px', padding: '1rem', color: 'var(--clr-body)', fontSize: '0.88rem' }}>
                    ✓ Same as shipping address — <strong>{getValues('address')}, {getValues('city')}</strong>
                  </div>
                </>
              )}
              {/* Step 2: Shipping Method */}
              {step === 2 && (
                <>
                  <h5 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>🚚 Shipping Method</h5>
                  {[{ val: 'standard', label: 'Standard Delivery', time: '5–7 days', price: after >= 50 ? 'Free' : '$4.99' },
                    { val: 'express', label: 'Express Delivery', time: '2–3 days', price: '$14.99' },
                    { val: 'overnight', label: 'Overnight', time: 'Next day', price: '$29.99' }].map(opt => (
                    <label key={opt.val} style={{ display: 'flex', alignItems: 'center', gap: '1rem', border: `2px solid ${method === opt.val ? 'var(--clr-primary)' : 'var(--clr-border)'}`, borderRadius: '10px', padding: '1rem', marginBottom: '0.65rem', cursor: 'pointer', background: method === opt.val ? 'var(--clr-primary-light)' : 'white', transition: 'all 0.2s' }}>
                      <input type="radio" name="method" value={opt.val} checked={method === opt.val} onChange={e => setMethod(e.target.value)} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{opt.label}</div>
                        <div style={{ color: 'var(--clr-muted)', fontSize: '0.8rem' }}>{opt.time}</div>
                      </div>
                      <strong style={{ color: opt.price === 'Free' ? 'var(--clr-success)' : 'var(--clr-heading)' }}>{opt.price}</strong>
                    </label>
                  ))}
                </>
              )}
              {/* Step 3: Payment */}
              {step === 3 && (
                <>
                  <h5 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>💰 Payment Method</h5>
                  {[{ val: 'card', label: 'Credit / Debit Card', icon: '💳' }, { val: 'upi', label: 'UPI', icon: '📱' }, { val: 'netbanking', label: 'Net Banking', icon: '🏦' }, { val: 'wallet', label: 'Digital Wallet', icon: '👜' }, { val: 'cod', label: 'Cash on Delivery', icon: '💵' }].map(opt => (
                    <label key={opt.val} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', border: `2px solid ${payment === opt.val ? 'var(--clr-primary)' : 'var(--clr-border)'}`, borderRadius: '10px', padding: '0.9rem 1rem', marginBottom: '0.6rem', cursor: 'pointer', background: payment === opt.val ? 'var(--clr-primary-light)' : 'white', transition: 'all 0.2s' }}>
                      <input type="radio" name="payment" value={opt.val} checked={payment === opt.val} onChange={e => setPayment(e.target.value)} />
                      <span style={{ fontSize: '1.3rem' }}>{opt.icon}</span>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{opt.label}</span>
                      {opt.val !== 'cod' && <span style={{ marginLeft: 'auto', fontSize: '0.7rem', background: 'var(--clr-bg)', padding: '2px 7px', borderRadius: '4px', color: 'var(--clr-muted)' }}>UI Demo</span>}
                    </label>
                  ))}
                </>
              )}
              {/* Step 4: Review */}
              {step === 4 && (
                <>
                  <h5 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>📋 Order Review</h5>
                  {items.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '0.85rem', padding: '0.7rem 0', borderBottom: '1px solid var(--clr-border)', alignItems: 'center' }}>
                      <img src={item.thumbnail} alt={item.title} style={{ width: 52, height: 52, borderRadius: '8px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{item.title}</div>
                        <div style={{ color: 'var(--clr-muted)', fontSize: '0.78rem' }}>×{item.quantity}</div>
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--clr-primary)' }}>{usd(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: '1rem', background: 'var(--clr-bg)', borderRadius: '8px', padding: '0.85rem 1rem', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--clr-muted)' }}>Method</span><strong style={{ textTransform: 'capitalize' }}>{method}</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--clr-muted)' }}>Payment</span><strong style={{ textTransform: 'capitalize' }}>{payment}</strong></div>
                  </div>
                </>
              )}

              {/* Nav buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.75rem', gap: '0.75rem' }}>
                {step > 0 && <button onClick={() => setStep(s => s - 1)} className="sn-btn sn-btn--ghost">← Back</button>}
                {step < STEPS.length - 1 ? (
                  <button onClick={step === 0 ? handleSubmit(() => setStep(s => s + 1)) : () => setStep(s => s + 1)} className="sn-btn sn-btn--primary" style={{ marginLeft: 'auto' }}>Continue →</button>
                ) : (
                  <button onClick={placeOrder} disabled={placing} className="sn-btn sn-btn--primary" style={{ marginLeft: 'auto', background: 'var(--clr-success)', borderColor: 'var(--clr-success)', opacity: placing ? 0.7 : 1 }}>
                    {placing ? 'Placing Order…' : '✓ Place Order'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="col-lg-5">
            <div className="sn-summary-box">
              <h6 style={{ fontWeight: 700, marginBottom: '1rem' }}>Summary ({items.length} items)</h6>
              <div style={{ maxHeight: 180, overflowY: 'auto', marginBottom: '0.75rem' }}>
                {items.map(i => (
                  <div key={i.id} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.6rem', alignItems: 'center' }}>
                    <img src={i.thumbnail} alt={i.title} style={{ width: 40, height: 40, borderRadius: '6px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, fontSize: '0.8rem' }}><div style={{ fontWeight: 600 }}>{i.title}</div><div style={{ color: 'var(--clr-muted)' }}>×{i.quantity}</div></div>
                    <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--clr-primary)' }}>{usd(i.price * i.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="sn-summary-row"><span>Subtotal</span><span>{usd(subtotal)}</span></div>
              {discount > 0 && <div className="sn-summary-row" style={{ color: 'var(--clr-success)' }}><span>Discount</span><span>−{usd(discAmt)}</span></div>}
              <div className="sn-summary-row"><span>Shipping</span><span>{shipCost === 0 ? 'Free' : usd(shipCost)}</span></div>
              <div className="sn-summary-row"><span>Tax (8%)</span><span>{usd(tax)}</span></div>
              <div className="sn-summary-row sn-summary-row--total"><span>Total</span><span>{usd(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
