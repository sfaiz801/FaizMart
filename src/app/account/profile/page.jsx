'use client';
// Profile edit page - update personal info and address via MockAPI
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsLoggedIn, updateUser } from '@/store/slices/authSlice';
import { updateUserApi } from '@/utils/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import AccountLayout from '@/components/account/AccountLayout';

export default function ProfilePage() {
  const dispatch   = useDispatch();
  const router     = useRouter();
  const user       = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [loading,  setLoading] = useState(false);

  useEffect(() => { if (!isLoggedIn) router.push('/auth/sign-in'); }, [isLoggedIn, router]);

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName:  user?.lastName  || '',
      email:     user?.email     || '',
      phone:     user?.phone     || '',
      address:   user?.address   || '',
      city:      user?.city      || '',
      state:     user?.state     || '',
      zip:       user?.zip       || '',
      country:   user?.country   || 'India',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updated = await updateUserApi(user.id, data);
      dispatch(updateUser(updated));
      toast.success('Profile updated!');
    } catch { toast.error('Update failed. Please try again.'); }
    finally { setLoading(false); }
  };

  if (!isLoggedIn) return null;

  const Field = ({ label, name, type = 'text', placeholder, rules, col = 6 }) => (
    <div className={`col-sm-${col}`}>
      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem', color: 'var(--clr-heading)' }}>{label}</label>
      <input className="sn-input" type={type} placeholder={placeholder} {...register(name, rules)} />
      {errors[name] && <div className="sn-field-error">{errors[name].message}</div>}
    </div>
  );

  return (
    <AccountLayout title="Edit Profile">
      <div style={{ background: 'var(--clr-white)', border: '1px solid var(--clr-border)', borderRadius: '14px', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, var(--clr-primary-light), #e0f2fe)', padding: '1.5rem 2rem', borderBottom: '1px solid var(--clr-border)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--clr-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 800, flexShrink: 0, boxShadow: '0 4px 14px rgba(13,148,136,0.3)' }}>
            {user?.firstName?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <h5 style={{ fontWeight: 800, margin: 0 }}>{user?.firstName} {user?.lastName}</h5>
            <p style={{ color: 'var(--clr-body)', margin: '0.2rem 0 0', fontSize: '0.85rem' }}>{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '2rem' }}>
          {/* Personal info */}
          <h6 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--clr-heading)', fontSize: '0.92rem' }}>Personal Information</h6>
          <div className="row g-3 mb-4">
            <Field label="First Name" name="firstName" placeholder="John" rules={{ required: 'Required' }} />
            <Field label="Last Name"  name="lastName"  placeholder="Doe"  rules={{ required: 'Required' }} />
            <Field label="Email" name="email" type="email" placeholder="you@example.com" rules={{ required: 'Required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } }} />
            <Field label="Phone" name="phone" placeholder="+91 98765 43210" />
          </div>

          {/* Address */}
          <h6 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--clr-heading)', fontSize: '0.92rem' }}>Address</h6>
          <div className="row g-3">
            <Field label="Street Address" name="address" placeholder="123 Street, Area" col={12} />
            <Field label="City"     name="city"    placeholder="Mumbai" />
            <Field label="State"    name="state"   placeholder="Maharashtra" />
            <Field label="PIN Code" name="zip"     placeholder="400001" />
            <div className="col-sm-6">
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>Country</label>
              <select className="sn-input sn-select" {...register('country')}>
                <option>India</option><option>USA</option><option>UK</option><option>UAE</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <button type="submit" disabled={loading || !isDirty} className="sn-btn sn-btn--primary sn-btn--lg"
              style={{ opacity: loading || !isDirty ? 0.6 : 1, cursor: loading || !isDirty ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
}
