'use client';
// Shared sidebar navigation for all account pages
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectUser } from '@/store/slices/authSlice';
import { toast } from 'react-toastify';

const NAV = [
  { href: '/account/dashboard',        icon: '🏠', label: 'Dashboard' },
  { href: '/account/orders',           icon: '📦', label: 'My Orders' },
  { href: '/account/profile',          icon: '👤', label: 'Edit Profile' },
  { href: '/account/change-password',  icon: '🔒', label: 'Change Password' },
  { href: '/wishlist',                  icon: '♡',  label: 'Wishlist' },
];

export default function AccountLayout({ children, title }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router   = useRouter();
  const user     = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.info('Signed out.');
    router.push('/');
  };

  return (
    <>
      <div className="sn-page-banner">
        <div className="container">
          <h1>{title}</h1>
          <ol className="sn-breadcrumb"><li><Link href="/">Home</Link></li><li>{title}</li></ol>
        </div>
      </div>
      <div className="container" style={{ padding: '2rem 1rem 4rem' }}>
        <div className="row g-4">
          <div className="col-lg-3">
            {/* User info card */}
            <div style={{ background: 'var(--clr-white)', border: '1px solid var(--clr-border)', borderRadius: '12px', padding: '1.25rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--clr-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', flexShrink: 0 }}>
                {user?.firstName?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user?.firstName} {user?.lastName}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--clr-muted)' }}>{user?.email}</div>
              </div>
            </div>
            {/* Nav */}
            <div className="sn-account-nav">
              {NAV.map(n => (
                <Link key={n.href} href={n.href} className={pathname === n.href ? 'active' : ''}>
                  <span>{n.icon}</span><span>{n.label}</span>
                </Link>
              ))}
              <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1.25rem', fontSize: '0.88rem', fontWeight: 500, color: 'var(--clr-danger)', background: 'none', border: 'none', width: '100%', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <span>🚪</span><span>Logout</span>
              </button>
            </div>
          </div>
          <div className="col-lg-9">{children}</div>
        </div>
      </div>
    </>
  );
}
