import GoogleSignIn from './GoogleSignIn';

const handleGoogleSignIn = () => {
  const state = Math.random()
    .toString(36)
    .substring(2, 15) + Math.random()
    .toString(36)
    .substring(2, 15);
  // console.log("state", state);
  localStorage.setItem('state', state);
  // console.log(GoogleSignIn(state));
  window.location.assign(GoogleSignIn(state));
};

export default handleGoogleSignIn;
