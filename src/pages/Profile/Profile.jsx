import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../context/PostContext';
import { getUsers } from '../../utils/localStorage';
import Navbar from '../../components/Navbar/Navbar';
import Post from '../../components/Post/Post';
import './Profile.css';

export default function Profile() {
  const { userId } = useParams();
  const { currentUser, updateProfile } = useAuth();
  const { posts } = usePosts();
  const isOwn = currentUser?.id === userId;

  const users = getUsers();
  const profileUser = users.find(u => u.id === userId);
  const userPosts = posts.filter(p => p.userId === userId);

  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [name, setName] = useState(currentUser?.name || '');

  const saveProfile = () => {
    updateProfile({ bio, name });
    setEditing(false);
  };

  if (!profileUser) return (
    <><Navbar /><div style={{paddingTop: 80, textAlign: 'center', color: 'var(--text-secondary)'}}>User not found.</div></>
  );

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-cover">
          <div className="profile-cover-gradient" />
        </div>
        <div className="profile-main">
          <div className="profile-info-bar">
            <div className="profile-big-avatar">{profileUser.name?.charAt(0).toUpperCase()}</div>
            <div className="profile-info-text">
              {editing ? (
                <input className="profile-edit-name" value={name} onChange={e => setName(e.target.value)} />
              ) : (
                <h1 className="profile-name">{profileUser.name}</h1>
              )}
              {editing ? (
                <textarea className="profile-edit-bio" placeholder="Write something about yourself…" value={bio} onChange={e => setBio(e.target.value)} rows={2} />
              ) : (
                <p className="profile-bio">{profileUser.bio || (isOwn ? 'Add a bio…' : '')}</p>
              )}
              <p className="profile-joined">Joined {new Date(profileUser.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
            {isOwn && !editing && (
              <button className="profile-edit-btn" onClick={() => setEditing(true)}>✏️ Edit Profile</button>
            )}
            {editing && (
              <div className="profile-edit-actions">
                <button className="profile-save-btn" onClick={saveProfile}>Save</button>
                <button className="profile-cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            )}
          </div>

          <div className="profile-content">
            <div className="profile-about-card">
              <h3>About</h3>
              <div className="profile-about-row">
                <span>📧</span><span>{profileUser.email}</span>
              </div>
              <div className="profile-about-row">
                <span>📝</span><span>{userPosts.length} post{userPosts.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <div className="profile-posts">
              <h3 className="profile-posts-title">Posts</h3>
              {userPosts.length === 0
                ? <div className="profile-no-posts">No posts yet.</div>
                : userPosts.map(p => <Post key={p.id} post={p} />)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}