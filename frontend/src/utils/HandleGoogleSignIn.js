import GoogleSignIn from './GoogleSignIn';

const handleGoogleSignIn = () => {
  const state = Math.random()
    .toString(36)
    .substring(2, 15) + Math.random()
    .toString(36)
    .substring(2, 15);
  localStorage.setItem('state', state);
  window.location.assign(GoogleSignIn(state));
};

export default handleGoogleSignIn;
