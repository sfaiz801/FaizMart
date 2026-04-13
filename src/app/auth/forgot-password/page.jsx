'use client';
// Forgot password - UI only (shows email input then success message)
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setDone(true); setLoading(false);
    toast.success('Reset link sent!');
  };

  return (
    <div className="sn-auth-wrap">
      <div className="sn-auth-panel">
        <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem' }}>Shop<span style={{ color: '#0d9488' }}>Nest</span></div>
        <h2>Password Reset</h2>
        <p>Enter your email and we will send a secure link to reset your password.</p>
      </div>
      <div className="sn-auth-form-wrap">
        <div className="sn-auth-form">
          <div className="sn-auth-logo">ShopNest</div>
          {done ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
              <h2 className="sn-auth-title">Check Your Email</h2>
              <p className="sn-auth-sub">A reset link has been sent to your email address.</p>
              <Link href="/auth/sign-in" className="sn-btn sn-btn--primary sn-btn--lg" style={{ borderRadius: '8px', marginTop: '1rem', display: 'inline-flex' }}>
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h1 className="sn-auth-title">Forgot Password?</h1>
              <p className="sn-auth-sub">Enter your email to receive a reset link</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="sn-label-text">Email Address</label>
                  <input className="sn-input" type="email" placeholder="you@example.com"
                    {...register('email', { required: 'Required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })} />
                  {errors.email && <div className="sn-field-error">{errors.email.message}</div>}
                </div>
                <button type="submit" disabled={loading} className="sn-btn sn-btn--primary sn-btn--block sn-btn--lg" style={{ borderRadius: '8px', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>
              <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem' }}>
                <Link href="/auth/sign-in" style={{ color: 'var(--clr-primary)', fontWeight: 700 }}>← Back to Sign In</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
