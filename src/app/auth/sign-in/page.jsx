'use client';
// Sign in page: validates credentials against MockAPI users
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/slices/authSlice';
import { loginUserApi } from '@/utils/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const dispatch = useDispatch();
  const router   = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPw,  setShowPw]  = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await loginUserApi(data);
      dispatch(loginUser(user));
      toast.success('Welcome back! 👋');
      router.push('/account/dashboard');
    } catch (err) {
      toast.error(err.message || 'Login failed.');
    } finally { setLoading(false); }
  };

  return (
    <div className="sn-auth-wrap">
      <div className="sn-auth-panel">
        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '2rem' }}>Shop<span style={{ color: '#14b8a6' }}>Nest</span></div>
        <h2>Good to see you back!</h2>
        <p>Sign in to access your orders, wishlist, and personalised experience.</p>
        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {['50,000+ Products', 'Easy Returns', 'Secure Payments', 'Fast Delivery'].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
              <span style={{ color: '#14b8a6', fontWeight: 700 }}>✓</span>{f}
            </div>
          ))}
        </div>
      </div>
      <div className="sn-auth-form-wrap">
        <div className="sn-auth-form">
          <div className="sn-auth-logo">ShopNest</div>
          <h1 className="sn-auth-title">Sign In</h1>
          <p className="sn-auth-sub">No account? <Link href="/auth/sign-up" style={{ color: 'var(--clr-primary)', fontWeight: 600 }}>Create one free</Link></p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: '1rem' }}>
              <label className="sn-label-text">Email</label>
              <input type="email" className="sn-input" placeholder="you@email.com"
                {...register('email', { required: 'Required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })} />
              {errors.email && <div className="sn-field-error">{errors.email.message}</div>}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label className="sn-label-text">Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPw ? 'text' : 'password'} className="sn-input" placeholder="Password" style={{ paddingRight: '2.5rem' }}
                  {...register('password', { required: 'Required', minLength: { value: 6, message: 'Min 6 characters' } })} />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>{showPw ? '🙈' : '👁️'}</button>
              </div>
              {errors.password && <div className="sn-field-error">{errors.password.message}</div>}
            </div>
            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <Link href="/auth/forgot-password" style={{ fontSize: '0.82rem', color: 'var(--clr-primary)', fontWeight: 600 }}>Forgot password?</Link>
            </div>
            <button type="submit" className="sn-btn sn-btn--primary sn-btn--block" disabled={loading} style={{ padding: '0.8rem' }}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
