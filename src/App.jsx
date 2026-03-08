import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

const Protected = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Protected><Home /></Protected>} />
      <Route path="/profile/:userId" element={<Protected><Profile /></Protected>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}