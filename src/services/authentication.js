// Authentication related functionality
const auth = {
  isAuthenticated: () => {
    return localStorage.getItem('jwt');
  },
  setToken: token => {
    return localStorage.setItem('jwt', token);
  },
  unsetToken: () => {
    return localStorage.removeItem('jwt');
  },
  signOut: () => {
    auth.unsetToken();
  }
};

export default auth;
