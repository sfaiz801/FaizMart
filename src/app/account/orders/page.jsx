'use client';
// Order history page - lists user orders from MockAPI
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, selectIsLoggedIn } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUserOrders } from '@/utils/api';
import { usd } from '@/utils/helpers';
import AccountLayout from '@/components/account/AccountLayout';

export default function OrdersPage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user       = useSelector(selectUser);
  const router     = useRouter();
  const [orders,   setOrders]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) { router.push('/auth/sign-in'); return; }
    getUserOrders(user?.id)
      .then(d => setOrders(d || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [isLoggedIn, user?.id, router]);

  if (!isLoggedIn) return null;

  const statusColor = (s) => ({
    pending: '#f59e0b', processing: '#3b82f6', shipped: '#8b5cf6',
    delivered: '#22c55e', cancelled: '#ef4444',
  }[s] || '#94a3b8');

  return (
    <AccountLayout title="Order History">
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--clr-muted)' }}>Loading orders…</div>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--clr-muted)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
          <h4 style={{ color: 'var(--clr-heading)', marginBottom: '0.5rem' }}>No orders yet</h4>
          <p style={{ marginBottom: '2rem' }}>Your order history will appear here.</p>
          <Link href="/shop" className="sn-btn sn-btn--primary sn-btn--lg">Start Shopping</Link>
        </div>
      ) : (
        <div className="row g-3">
          {/* Order list */}
          <div className={selected ? 'col-lg-6' : 'col-12'}>
            <p style={{ color: 'var(--clr-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>{orders.length} order{orders.length > 1 ? 's' : ''} found</p>
            {orders.map(order => (
              <div key={order.id} onClick={() => setSelected(selected?.id === order.id ? null : order)}
                style={{
                  background: 'var(--clr-white)',
                  border: `2px solid ${selected?.id === order.id ? 'var(--clr-primary)' : 'var(--clr-border)'}`,
                  borderRadius: '12px', padding: '1.1rem', marginBottom: '0.75rem',
                  cursor: 'pointer', transition: 'all 0.2s',
                  background: selected?.id === order.id ? 'var(--clr-primary-light)' : 'var(--clr-white)',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Order #{order.id}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--clr-muted)' }}>
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '50px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'capitalize', border: `1px solid ${statusColor(order.status)}`, color: statusColor(order.status), background: statusColor(order.status) + '18' }}>
                      {order.status || 'pending'}
                    </span>
                    <div style={{ fontWeight: 700, color: 'var(--clr-primary)', marginTop: '3px' }}>{usd(order.total || 0)}</div>
                  </div>
                </div>
                {/* Item thumbnails */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {(order.items || []).slice(0, 4).map((item, i) => (
                    <img key={i} src={item.thumbnail || ''} alt={item.title} style={{ width: 38, height: 38, borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--clr-border)' }} />
                  ))}
                  {(order.items?.length || 0) > 4 && (
                    <div style={{ width: 38, height: 38, borderRadius: '6px', background: 'var(--clr-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, color: 'var(--clr-muted)' }}>
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order detail panel */}
          {selected && (
            <div className="col-lg-6">
              <div style={{ background: 'var(--clr-white)', border: '1px solid var(--clr-border)', borderRadius: '14px', padding: '1.5rem', position: 'sticky', top: 90 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <h6 style={{ fontWeight: 700, margin: 0 }}>Order #{selected.id}</h6>
                  <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-muted)', fontSize: '1.1rem' }}>✕</button>
                </div>
                {(selected.items || []).map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid var(--clr-border)', alignItems: 'center' }}>
                    <img src={item.thumbnail || ''} alt={item.title} style={{ width: 46, height: 46, borderRadius: '7px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.title}</div>
                      <div style={{ color: 'var(--clr-muted)', fontSize: '0.75rem' }}>×{item.quantity}</div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--clr-primary)' }}>{usd((item.price || 0) * (item.quantity || 1))}</span>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {[['Subtotal', usd(selected.subtotal || 0)], ['Shipping', selected.shippingCost === 0 ? 'Free' : usd(selected.shippingCost || 0)], ['Tax', usd(selected.tax || 0)]].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid var(--clr-border)', color: 'var(--clr-body)' }}>
                      <span>{k}</span><span>{v}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', fontWeight: 800, color: 'var(--clr-primary)' }}>
                    <span>Total</span><span>{usd(selected.total || 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </AccountLayout>
  );
}
