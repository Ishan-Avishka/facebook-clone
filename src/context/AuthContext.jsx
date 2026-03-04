import { createContext, useContext, useState } from 'react';
import { getUsers, saveUsers, saveCurrentUser, removeCurrentUser, getCurrentUser } from '../utils/localStorage';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  const signup = (name, email, password) => {
    const users = getUsers();
    if (users.find(u => u.email === email)) return { error: 'Email already exists' };
    const newUser = { id: uuidv4(), name, email, password, bio: '', avatar: null, joinedAt: new Date().toISOString() };
    saveUsers([...users, newUser]);
    saveCurrentUser(newUser);
    setCurrentUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { error: 'Invalid email or password' };
    saveCurrentUser(user);
    setCurrentUser(user);
    return { success: true };
  };

  const logout = () => {
    removeCurrentUser();
    setCurrentUser(null);
  };

  const updateProfile = (updatedData) => {
    const users = getUsers();
    const updated = users.map(u => u.id === currentUser.id ? { ...u, ...updatedData } : u);
    saveUsers(updated);
    const newUser = { ...currentUser, ...updatedData };
    saveCurrentUser(newUser);
    setCurrentUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);