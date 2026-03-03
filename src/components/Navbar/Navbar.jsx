import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="#fff">
            <path d="M40 20C40 9 31 0 20 0S0 9 0 20c0 10 7.3 18.2 17 19.8V25.8h-5.1V20H17v-4.3c0-5 3-7.8 7.6-7.8 2.2 0 4.5.4 4.5.4v4.9h-2.5c-2.5 0-3.3 1.6-3.3 3.1V20h5.6l-.9 5.8h-4.7v14C32.7 38.2 40 30 40 20z"/>
          </svg>
          <span>facebook</span>
        </Link>
      </div>

      <div className="navbar-center">
        <Link to="/" className="nav-icon-btn" title="Home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </Link>
      </div>

      <div className="navbar-right">
        <Link to={`/profile/${currentUser?.id}`} className="navbar-user">
          <div className="navbar-avatar">{currentUser?.name?.charAt(0).toUpperCase()}</div>
          <span>{currentUser?.name?.split(' ')[0]}</span>
        </Link>
        <button className="navbar-logout" onClick={handleLogout} title="Logout">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
        </button>
      </div>
    </nav>
  );
}