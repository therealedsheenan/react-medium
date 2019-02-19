// Authentication related functionality
const auth = {
  isAuthenticated: () => {
    return localStorage.getItem('jwt');
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
  setToken: token => {
    return localStorage.setItem('jwt', token);
  },
  setUser: user => {
    return localStorage.setItem('user', JSON.stringify(user));
  },
  unsetToken: () => {
    return localStorage.removeItem('jwt');
  },
  unsetUser: () => {
    return localStorage.removeItem('user');
  },
  signIn: user => {
    auth.setToken(user.token);
    auth.setUser({
      id: user.id,
      email: user.email
    });
  },
  signOut: () => {
    auth.unsetToken();
    auth.unsetUser();
  }
};

export default auth;
