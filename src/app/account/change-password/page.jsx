'use client';
// Change password page with strength indicator
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectUser, selectIsLoggedIn } from '@/store/slices/authSlice';
import { updateUserApi } from '@/utils/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import AccountLayout from '@/components/account/AccountLayout';

function StrengthBar({ password }) {
  const checks = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)];
  const score  = checks.filter(Boolean).length;
  const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#22c55e'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  return (
    <div style={{ marginTop: '0.4rem' }}>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
        {[0,1,2,3].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: '2px', background: i < score ? colors[score - 1] : 'var(--clr-border)', transition: 'background 0.3s' }} />)}
      </div>
      {score > 0 && <div style={{ fontSize: '0.72rem', fontWeight: 700, color: colors[score - 1] }}>{labels[score - 1]}</div>}
    </div>
  );
}

export default function ChangePasswordPage() {
  const user       = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const router     = useRouter();
  const [loading,  setLoading] = useState(false);
  const [show,     setShow]    = useState({ old: false, new: false, confirm: false });

  useEffect(() => { if (!isLoggedIn) router.push('/auth/sign-in'); }, [isLoggedIn, router]);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const newPw = watch('newPassword', '');

  const onSubmit = async (data) => {
    if (data.oldPassword !== user?.password) { toast.error('Current password is incorrect.'); return; }
    setLoading(true);
    try {
      await updateUserApi(user.id, { password: data.newPassword });
      toast.success('Password updated successfully!');
      reset();
    } catch { toast.error('Failed to update. Try again.'); }
    finally { setLoading(false); }
  };

  if (!isLoggedIn) return null;

  const EyeBtn = ({ field }) => (
    <button type="button" onClick={() => setShow(s => ({ ...s, [field]: !s[field] }))}
      style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
      {show[field] ? '🙈' : '👁️'}
    </button>
  );

  return (
    <AccountLayout title="Change Password">
      <div style={{ background: 'var(--clr-white)', border: '1px solid var(--clr-border)', borderRadius: '14px', padding: '2rem', maxWidth: 520 }}>
        <h5 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>Update Password</h5>
        <p style={{ color: 'var(--clr-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Choose a strong password with letters, numbers, and symbols.</p>

        <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: '#92400e' }}>
          💡 Use at least 8 characters with uppercase, numbers &amp; symbols.
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Current password */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>Current Password</label>
            <div style={{ position: 'relative' }}>
              <input className="sn-input" type={show.old ? 'text' : 'password'} placeholder="Enter current password" style={{ paddingRight: '2.5rem' }}
                {...register('oldPassword', { required: 'Required' })} />
              <EyeBtn field="old" />
            </div>
            {errors.oldPassword && <div className="sn-field-error">{errors.oldPassword.message}</div>}
          </div>

          {/* New password */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>New Password</label>
            <div style={{ position: 'relative' }}>
              <input className="sn-input" type={show.new ? 'text' : 'password'} placeholder="Min 8 characters" style={{ paddingRight: '2.5rem' }}
                {...register('newPassword', {
                  required: 'Required',
                  minLength: { value: 8, message: 'Min 8 characters' },
                  validate: v => v !== watch('oldPassword') || 'Must differ from current password',
                })} />
              <EyeBtn field="new" />
            </div>
            {errors.newPassword && <div className="sn-field-error">{errors.newPassword.message}</div>}
            {newPw && <StrengthBar password={newPw} />}
          </div>

          {/* Confirm */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>Confirm New Password</label>
            <div style={{ position: 'relative' }}>
              <input className="sn-input" type={show.confirm ? 'text' : 'password'} placeholder="Repeat new password" style={{ paddingRight: '2.5rem' }}
                {...register('confirmPassword', {
                  required: 'Required',
                  validate: v => v === newPw || 'Passwords do not match',
                })} />
              <EyeBtn field="confirm" />
            </div>
            {errors.confirmPassword && <div className="sn-field-error">{errors.confirmPassword.message}</div>}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" disabled={loading} className="sn-btn sn-btn--primary sn-btn--lg" style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Updating…' : 'Update Password'}
            </button>
            <button type="button" onClick={() => reset()} className="sn-btn sn-btn--ghost sn-btn--lg">Reset</button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
}
