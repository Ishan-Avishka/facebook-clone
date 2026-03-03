import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../context/PostContext';
import { getUsers } from '../../utils/localStorage';
import Comment from '../Comment/Comment';
import './Post.css';

export default function Post({ post }) {
  const { currentUser } = useAuth();
  const { toggleLike, deletePost, addComment, deleteComment } = usePosts();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const users = getUsers();
  const author = users.find(u => u.id === post.userId);
  const liked = post.likes.includes(currentUser?.id);

  const handleComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, currentUser.id, currentUser.name, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="post">
      <div className="post-header">
        <Link to={`/profile/${post.userId}`} className="post-author">
          <div className="post-avatar">{author?.name?.charAt(0).toUpperCase()}</div>
          <div>
            <div className="post-name">{author?.name || 'Unknown'}</div>
            <div className="post-time">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</div>
          </div>
        </Link>
        {currentUser?.id === post.userId && (
          <div className="post-menu-wrap">
            <button className="post-menu-btn" onClick={() => setShowMenu(!showMenu)}>•••</button>
            {showMenu && (
              <div className="post-menu">
                <button onClick={() => { deletePost(post.id); setShowMenu(false); }}>🗑 Delete Post</button>
              </div>
            )}
          </div>
        )}
      </div>

      {post.content && <p className="post-content">{post.content}</p>}
      {post.image && <img className="post-image" src={post.image} alt="post" />}

      <div className="post-stats">
        {post.likes.length > 0 && (
          <span>👍 {post.likes.length}</span>
        )}
        {post.comments.length > 0 && (
          <button className="post-stats-comments" onClick={() => setShowComments(!showComments)}>
            {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
          </button>
        )}
      </div>

      <div className="post-actions">
        <button className={`post-action-btn ${liked ? 'liked' : ''}`} onClick={() => toggleLike(post.id, currentUser.id)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
          </svg>
          {liked ? 'Liked' : 'Like'}
        </button>
        <button className="post-action-btn" onClick={() => setShowComments(!showComments)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          Comment
        </button>
        <button className="post-action-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Share
        </button>
      </div>

      {showComments && (
        <div className="post-comments">
          {post.comments.map(c => (
            <Comment key={c.id} comment={c} postId={post.id} onDelete={deleteComment} />
          ))}
          <form className="comment-form" onSubmit={handleComment}>
            <div className="cf-avatar">{currentUser?.name?.charAt(0).toUpperCase()}</div>
            <input
              className="cf-input"
              placeholder="Write a comment…"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
            />
          </form>
        </div>
      )}
    </div>
  );
}