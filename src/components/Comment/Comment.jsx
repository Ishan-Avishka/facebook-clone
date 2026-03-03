import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import './Comment.css';

export default function Comment({ comment, postId, onDelete }) {
  const { currentUser } = useAuth();
  return (
    <div className="comment">
      <div className="comment-avatar">{comment.userName?.charAt(0).toUpperCase()}</div>
      <div className="comment-body">
        <div className="comment-bubble">
          <span className="comment-name">{comment.userName}</span>
          <p className="comment-text">{comment.text}</p>
        </div>
        <div className="comment-meta">
          <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
          {currentUser?.id === comment.userId && (
            <button className="comment-delete" onClick={() => onDelete(postId, comment.id)}>Delete</button>
          )}
        </div>
      </div>
    </div>
  );
}