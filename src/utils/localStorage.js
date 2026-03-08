export const getUsers = () => JSON.parse(localStorage.getItem('fb_users')) || [];
export const saveUsers = (users) => localStorage.setItem('fb_users', JSON.stringify(users));

export const getPosts = () => JSON.parse(localStorage.getItem('fb_posts')) || [];
export const savePosts = (posts) => localStorage.setItem('fb_posts', JSON.stringify(posts));

export const getCurrentUser = () => JSON.parse(localStorage.getItem('fb_current_user'));
export const saveCurrentUser = (user) => localStorage.setItem('fb_current_user', JSON.stringify(user));
export const removeCurrentUser = () => localStorage.removeItem('fb_current_user');