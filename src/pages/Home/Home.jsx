import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import CreatePost from '../../components/CreatePost/CreatePost';
import Post from '../../components/Post/Post';
import { usePosts } from '../../context/PostContext';
import './Home.css';

export default function Home() {
  const { posts } = usePosts();

  return (
    <>
      <Navbar />
      <div className="home-layout">
        <Sidebar />
        <main className="home-feed">
          <CreatePost />
          {posts.length === 0
            ? <div className="home-empty"><p>🌐</p><p>No posts yet. Be the first to post!</p></div>
            : posts.map(p => <Post key={p.id} post={p} />)
          }
        </main>
        <RightSidebar />
      </div>
    </>
  );
}