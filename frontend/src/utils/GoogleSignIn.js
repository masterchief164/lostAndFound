const GoogleSignIn = (state) => {
  const loginUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const nonce = Math.floor(Math.random() * 100000);

  const options = {
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_REDIRECT_URL,
    access_type: 'offline',
    nonce,
    state,
    response_type: 'code',
    prompt: 'consent',
    scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  };
  const qs = new URLSearchParams(options);
  return (`${loginUrl}?${qs.toString()}`);
};

export default GoogleSignIn;
