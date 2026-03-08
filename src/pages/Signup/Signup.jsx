import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Signup.css';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    const result = signup(form.name, form.email, form.password);
    if (result.error) setError(result.error);
    else navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1 className="auth-brand">facebook</h1>
        <p className="auth-tagline">It's free and always will be.</p>
      </div>
      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2 className="signup-title">Create a new account</h2>
          <p className="signup-sub">It's quick and easy.</p>
          <hr style={{border: 'none', borderTop: '1px solid var(--border)'}} />
          {error && <div className="auth-error">{error}</div>}
          <input className="auth-input" placeholder="Full Name" value={form.name} onChange={e => update('name', e.target.value)} required />
          <input className="auth-input" type="email" placeholder="Email address" value={form.email} onChange={e => update('email', e.target.value)} required />
          <input className="auth-input" type="password" placeholder="New password" value={form.password} onChange={e => update('password', e.target.value)} required />
          <input className="auth-input" type="password" placeholder="Confirm password" value={form.confirm} onChange={e => update('confirm', e.target.value)} required />
          <button className="auth-btn" style={{background: '#42b72a', fontSize: '17px', marginTop: '4px'}} type="submit">Sign Up</button>
          <Link to="/login" style={{textAlign: 'center', color: 'var(--primary)', fontWeight: 600, fontSize: 14}}>Already have an account?</Link>
        </form>
      </div>
    </div>
  );
}