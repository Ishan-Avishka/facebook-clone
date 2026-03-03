import { useAuth } from '../../context/AuthContext';
import { getUsers } from '../../utils/localStorage';
import { Link } from 'react-router-dom';
import './RightSidebar.css';

export default function RightSidebar() {
  const { currentUser } = useAuth();
  const contacts = getUsers().filter(u => u.id !== currentUser?.id).slice(0, 8);

  return (
    <aside className="right-sidebar">
      <h4 className="rs-title">Contacts</h4>
      {contacts.length === 0 && <p className="rs-empty">No other users yet.</p>}
      {contacts.map(u => (
        <Link to={`/profile/${u.id}`} key={u.id} className="rs-contact">
          <div className="rs-avatar">{u.name.charAt(0).toUpperCase()}</div>
          <span>{u.name}</span>
          <span className="rs-dot" />
        </Link>
      ))}
    </aside>
  );
}