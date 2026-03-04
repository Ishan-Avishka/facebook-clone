import { createContext, useContext, useState, useEffect } from 'react';
import { getPosts, savePosts } from '../utils/localStorage';
import { v4 as uuidv4 } from 'uuid';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getPosts().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }, []);

  const sync = (updated) => {
    const sorted = [...updated].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    savePosts(sorted);
    setPosts(sorted);
  };

  const createPost = (userId, content, image = null) => {
    const post = { id: uuidv4(), userId, content, image, likes: [], comments: [], createdAt: new Date().toISOString() };
    sync([post, ...getPosts()]);
  };

  const deletePost = (postId) => sync(getPosts().filter(p => p.id !== postId));

  const toggleLike = (postId, userId) => {
    const updated = getPosts().map(p => {
      if (p.id !== postId) return p;
      const liked = p.likes.includes(userId);
      return { ...p, likes: liked ? p.likes.filter(id => id !== userId) : [...p.likes, userId] };
    });
    sync(updated);
  };

  const addComment = (postId, userId, userName, text) => {
    const updated = getPosts().map(p => {
      if (p.id !== postId) return p;
      return { ...p, comments: [...p.comments, { id: uuidv4(), userId, userName, text, createdAt: new Date().toISOString() }] };
    });
    sync(updated);
  };

  const deleteComment = (postId, commentId) => {
    const updated = getPosts().map(p => {
      if (p.id !== postId) return p;
      return { ...p, comments: p.comments.filter(c => c.id !== commentId) };
    });
    sync(updated);
  };

  return (
    <PostContext.Provider value={{ posts, createPost, deletePost, toggleLike, addComment, deleteComment }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
