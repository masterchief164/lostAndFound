import React, { useEffect } from 'react';
import { sendAuthorizationCode } from '../Api/Data';
import { UserContext } from '../utils/UserContext';

const GoogleLogin = () => {
  const [, setUser] = React.useContext(UserContext);
  useEffect(() => {
    login()
      .then(() => {
        window.location.assign('/');
        console.log('logged in');
      });
  }, []);

  const login = async () => {
    const url = new URLSearchParams(new URL(window.location.href).search);
    const state = localStorage.getItem('state');
    if (state !== url.get('state')) {
      console.error('state mismatch');
    }
    await sendAuthorizationCode(url.get('code'), setUser);
  };

  return (<>
    <div>
      Google Login
    </div>
  </>);
};

export default GoogleLogin;
