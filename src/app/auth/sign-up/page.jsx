'use client';
// Sign up page with full registration form
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '@/utils/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const pw = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser({ firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password, phone: data.phone || '', createdAt: new Date().toISOString() });
      toast.success('Account created! Please sign in.');
      router.push('/auth/sign-in');
    } catch { toast.error('Registration failed. Try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="sn-auth-wrap">
      <div className="sn-auth-panel">
        <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem' }}>Shop<span style={{ color: '#0d9488' }}>Nest</span></div>
        <h2>Join FaizMart today!</h2>
        <p>Create an account to enjoy exclusive member deals, track orders, and save your favourites.</p>
      </div>
      <div className="sn-auth-form-wrap">
        <div className="sn-auth-form" style={{ maxWidth: 460 }}>
          <div className="sn-auth-logo">FaizMart</div>
          <h1 className="sn-auth-title">Create Account</h1>
          <p className="sn-auth-sub">Fill in the details to get started</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <label className="sn-label-text">First Name</label>
                <input className="sn-input" placeholder="John" {...register('firstName', { required: 'Required' })} />
                {errors.firstName && <div className="sn-field-error">{errors.firstName.message}</div>}
              </div>
              <div>
                <label className="sn-label-text">Last Name</label>
                <input className="sn-input" placeholder="Doe" {...register('lastName', { required: 'Required' })} />
                {errors.lastName && <div className="sn-field-error">{errors.lastName.message}</div>}
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label className="sn-label-text">Email</label>
              <input className="sn-input" type="email" placeholder="you@example.com"
                {...register('email', { required: 'Required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })} />
              {errors.email && <div className="sn-field-error">{errors.email.message}</div>}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label className="sn-label-text">Phone (optional)</label>
              <input className="sn-input" type="tel" placeholder="+91 98765 43210" {...register('phone')} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label className="sn-label-text">Password</label>
              <div style={{ position: 'relative' }}>
                <input className="sn-input" type={showPw ? 'text' : 'password'} placeholder="Min 8 characters" style={{ paddingRight: '2.5rem' }}
                  {...register('password', { required: 'Required', minLength: { value: 8, message: 'Min 8 characters' } })} />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <div className="sn-field-error">{errors.password.message}</div>}
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="sn-label-text">Confirm Password</label>
              <input className="sn-input" type="password" placeholder="Repeat password"
                {...register('confirmPassword', { required: 'Required', validate: v => v === pw || 'Passwords do not match' })} />
              {errors.confirmPassword && <div className="sn-field-error">{errors.confirmPassword.message}</div>}
            </div>
            <button type="submit" disabled={loading} className="sn-btn sn-btn--primary sn-btn--block sn-btn--lg" style={{ borderRadius: '8px', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--clr-muted)' }}>
            Already have an account? <Link href="/auth/sign-in" style={{ color: 'var(--clr-primary)', fontWeight: 700 }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
