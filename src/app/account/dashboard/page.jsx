'use client';
// Account dashboard with stats and quick links
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AccountLayout from '@/components/account/AccountLayout';

export default function DashboardPage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user       = useSelector(selectUser);
  const router     = useRouter();

  useEffect(() => { if (!isLoggedIn) router.push('/auth/sign-in'); }, [isLoggedIn, router]);
  if (!isLoggedIn) return null;

  const stats = [
    { label: 'Total Orders', value: '12', icon: '📦', bg: '#eff6ff', border: '#bfdbfe' },
    { label: 'Wishlist Items', value: '5',  icon: '♡',  bg: '#fff7ed', border: '#fed7aa' },
    { label: 'Reviews',       value: '8',  icon: '⭐',  bg: '#f0fdf4', border: '#bbf7d0' },
    { label: 'Points',        value: '1.2K', icon: '🎁', bg: '#fdf4ff', border: '#e9d5ff' },
  ];

  const shortcuts = [
    { href: '/account/orders',  icon: '📦', label: 'Order History',   desc: 'View and track orders' },
    { href: '/account/profile', icon: '👤', label: 'Edit Profile',    desc: 'Update your details' },
    { href: '/account/change-password', icon: '🔒', label: 'Password', desc: 'Change your password' },
    { href: '/wishlist',         icon: '♡',  label: 'Wishlist',       desc: 'Saved products' },
  ];

  return (
    <AccountLayout title="My Account">
      {/* Welcome */}
      <div style={{ background: 'linear-gradient(135deg, var(--clr-primary-light), #e0f2fe)', border: '1px solid rgba(13,148,136,0.2)', borderRadius: '14px', padding: '1.75rem 2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--clr-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, flexShrink: 0 }}>
          {user?.firstName?.[0]?.toUpperCase()}
        </div>
        <div>
          <h4 style={{ fontWeight: 800, marginBottom: '0.15rem' }}>Hey, {user?.firstName}! 👋</h4>
          <p style={{ color: 'var(--clr-body)', margin: 0, fontSize: '0.88rem' }}>{user?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {stats.map(s => (
          <div key={s.label} className="col-6 col-md-3">
            <div style={{ background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{s.icon}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--clr-muted)', fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Shortcuts */}
      <h6 style={{ fontWeight: 700, marginBottom: '1rem' }}>Quick Access</h6>
      <div className="row g-3">
        {shortcuts.map(s => (
          <div key={s.href} className="col-sm-6">
            <Link href={s.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--clr-white)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--clr-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--clr-border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <span style={{ fontSize: '1.75rem' }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--clr-heading)', fontSize: '0.92rem' }}>{s.label}</div>
                  <div style={{ color: 'var(--clr-muted)', fontSize: '0.78rem' }}>{s.desc}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </AccountLayout>
  );
}
