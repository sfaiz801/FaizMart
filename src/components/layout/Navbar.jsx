'use client';
// Top navigation bar with search, cart count, wishlist, user dropdown
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount } from '@/store/slices/cartSlice';
import { selectWishlistCount } from '@/store/slices/wishlistSlice';
import { selectIsLoggedIn, selectUser, logoutUser } from '@/store/slices/authSlice';
import { getProducts } from '@/utils/api';
import styles from './Navbar.module.css';

export default function Navbar() {
  const dispatch  = useDispatch();
  const router    = useRouter();
  const cartCount = useSelector(selectCartCount);
  const wishCount = useSelector(selectWishlistCount);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user       = useSelector(selectUser);

  const [scrolled,  setScrolled]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query,     setQuery]      = useState('');
  const [hints,     setHints]      = useState([]);
  const [showHints, setShowHints]  = useState(false);
  const [userOpen,  setUserOpen]   = useState(false);
  const searchRef = useRef(null);

  // Shrink navbar on scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Live search suggestions
  useEffect(() => {
    if (query.length < 2) { setHints([]); setShowHints(false); return; }
    const t = setTimeout(async () => {
      const d = await getProducts({ search: query, limit: 5 });
      setHints(d.products || []);
      setShowHints(true);
    }, 320);
    return () => clearTimeout(t);
  }, [query]);

  const doSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    setShowHints(false); setQuery('');
  };

  const pickHint = (id) => {
    router.push(`/product/${id}`);
    setShowHints(false); setQuery('');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/');
    setUserOpen(false);
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <nav className={styles.inner}>
          {/* Brand */}
          <Link href="/" className={styles.brand}>
            Faiz<span>Mart</span>
          </Link>

          {/* Nav links - desktop */}
          <ul className={styles.links}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/shop?category=smartphones">Electronics</Link></li>
            <li><Link href="/shop?category=womens-dresses">Fashion</Link></li>
            <li><Link href="/#about">About</Link></li>
          </ul>

          {/* Search */}
          <div className={styles.search} ref={searchRef}>
            <form onSubmit={doSearch} className={styles.searchForm}>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products…"
                onFocus={() => hints.length && setShowHints(true)}
                onBlur={() => setTimeout(() => setShowHints(false), 180)}
              />
              <button type="submit">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </form>
            {showHints && hints.length > 0 && (
              <ul className={styles.hints}>
                {hints.map(p => (
                  <li key={p.id} onMouseDown={() => pickHint(p.id)}>
                    <img src={p.thumbnail} alt={p.title} />
                    <span>{p.title}</span>
                    <strong>${p.price}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Action icons */}
          <div className={styles.actions}>
            <Link href="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishCount > 0 && <span className={styles.badge}>{wishCount}</span>}
            </Link>

            <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </Link>

            {isLoggedIn ? (
              <div className={styles.userWrap}>
                <button className={styles.userBtn} onClick={() => setUserOpen(o => !o)}>
                  <span className={styles.avatar}>{user?.firstName?.[0]?.toUpperCase() || 'U'}</span>
                  <span className={styles.userName}>{user?.firstName || 'Account'}</span>
                </button>
                {userOpen && (
                  <div className={styles.dropdown}>
                    <Link href="/account/dashboard" onClick={() => setUserOpen(false)}>Dashboard</Link>
                    <Link href="/account/orders" onClick={() => setUserOpen(false)}>My Orders</Link>
                    <Link href="/account/profile" onClick={() => setUserOpen(false)}>Profile</Link>
                    <hr />
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/sign-in" className={styles.loginBtn}>Login</Link>
            )}

            {/* Hamburger */}
            <button className={styles.hamburger} onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className={styles.mobileMenu}>
            <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link href="/wishlist" onClick={() => setMobileOpen(false)}>Wishlist ({wishCount})</Link>
            <Link href="/cart" onClick={() => setMobileOpen(false)}>Cart ({cartCount})</Link>
            {isLoggedIn
              ? <><Link href="/account/dashboard" onClick={() => setMobileOpen(false)}>My Account</Link>
                  <button onClick={handleLogout}>Logout</button></>
              : <Link href="/auth/sign-in" onClick={() => setMobileOpen(false)}>Login / Register</Link>
            }
          </div>
        )}
      </div>
    </header>
  );
}
