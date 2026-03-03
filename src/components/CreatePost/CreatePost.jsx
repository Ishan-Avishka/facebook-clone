import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../context/PostContext';
import './CreatePost.css';

export default function CreatePost() {
  const { currentUser } = useAuth();
  const { createPost } = usePosts();
  const [text, setText] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!text.trim() && !image) return;
    createPost(currentUser.id, text.trim(), image);
    setText(''); setImage(null); setExpanded(false);
  };

  return (
    <div className="create-post">
      <div className="cp-top">
        <div className="cp-avatar">{currentUser?.name?.charAt(0).toUpperCase()}</div>
        <div
          className="cp-input"
          onClick={() => setExpanded(true)}
        >
          {!expanded
            ? <span className="cp-placeholder">What's on your mind, {currentUser?.name?.split(' ')[0]}?</span>
            : <textarea
                autoFocus
                className="cp-textarea"
                placeholder={`What's on your mind, ${currentUser?.name?.split(' ')[0]}?`}
                value={text}
                onChange={e => setText(e.target.value)}
                rows={4}
              />
          }
        </div>
      </div>

      {image && (
        <div className="cp-preview">
          <img src={image} alt="preview" />
          <button className="cp-remove-img" onClick={() => setImage(null)}>✕</button>
        </div>
      )}

      {expanded && (
        <>
          <div className="cp-divider" />
          <div className="cp-actions">
            <label className="cp-action-btn" title="Add Photo">
              <input type="file" accept="image/*" onChange={handleImage} hidden />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#45bd62"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-5.5-7.5l-2.5 3.18-1.83-2.2L8 16h8l-2.5-4.5z"/></svg>
              Photo/Video
            </label>
            <button
              className="cp-submit"
              onClick={handleSubmit}
              disabled={!text.trim() && !image}
            >
              Post
            </button>
          </div>
        </>
      )}
    </div>
  );
}