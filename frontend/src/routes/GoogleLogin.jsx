import React, { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { sendAuthorizationCode } from '../Api/Data';
import { UserContext } from '../utils/UserContext';

const GoogleLogin = () => {
  const [, setUser] = React.useContext(UserContext);
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
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
    <div style={{
      height: '76vh',
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <CircularProgress />
      <h1>Please Wait</h1>
    </div>
  </>);
};

export default GoogleLogin;
