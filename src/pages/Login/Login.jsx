import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const result = login(email, password);
    setLoading(false);
    if (result.error) setError(result.error);
    else navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1 className="auth-brand">facebook</h1>
        <p className="auth-tagline">Connect with friends and the world around you on Facebook.</p>
      </div>
      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          <input className="auth-input" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="auth-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="auth-btn" type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Log In'}</button>
          <div className="auth-divider"><span>or</span></div>
          <Link to="/signup" className="auth-btn auth-btn-secondary">Create new account</Link>
        </form>
      </div>
    </div>
  );
}
