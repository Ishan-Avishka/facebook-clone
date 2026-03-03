import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const links = [
  { icon: '👥', label: 'Friends' },
  { icon: '🕐', label: 'Memories' },
  { icon: '🔖', label: 'Saved' },
  { icon: '📋', label: 'Groups' },
  { icon: '▶️', label: 'Video' },
  { icon: '🛒', label: 'Marketplace' },
];

export default function Sidebar() {
  const { currentUser } = useAuth();
  return (
    <aside className="sidebar">
      <Link to={`/profile/${currentUser?.id}`} className="sidebar-profile-link">
        <div className="sidebar-avatar">{currentUser?.name?.charAt(0).toUpperCase()}</div>
        <span>{currentUser?.name}</span>
      </Link>
      <div className="sidebar-divider" />
      {links.map(l => (
        <div className="sidebar-link" key={l.label}>
          <span className="sidebar-link-icon">{l.icon}</span>
          <span>{l.label}</span>
        </div>
      ))}
    </aside>
  );
}