import React, { useEffect } from 'react';
import {
  AppBar, IconButton, Tab, Tabs, Toolbar, useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CollegeIcon from '../assets/iiitdmj.svg';
import '../stylesheets/Nav.css';
import GoogleIcon from '../assets/google.png';
import DrawerComp from './DrawerComp';
import { UserContext } from '../utils/UserContext';
import initializeApp from '../utils/initializeApp';
import { logout } from '../Api/Data';
import handleGoogleSignIn from '../utils/HandleGoogleSignIn';

const Nav = () => {
  const [value, setValue] = React.useState(0);
  const [user, setUser] = React.useContext(UserContext);
  const [lostItems, setLostItems] = React.useContext(UserContext);
  const [foundItems, setFoundItems] = React.useContext(UserContext);
  const isSmall = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    initializeApp(setUser, setLostItems, setFoundItems)
      .then();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('userDataLost', JSON.stringify(user));
    }
  }, [user]);

  const handleLogout = async () => {
    await logout(setUser);
  };

  return (<>
    <AppBar position="static" sx={{
      background: '#fff',
      padding: '0.5em 2em',
    }}>
      <Toolbar>
        <IconButton sx={{ background: '#FE926E' }} component={Link} to={'/'}
                    onClick={() => setValue(0)}>
          <img src={CollegeIcon} alt="IIITDMJ" />
        </IconButton>
        {!isSmall ? <>
          <Tabs value={value} onChange={(e, val) => setValue(val)}
                indicatorColor={'primary'}>
            <Tab component={Link} to={'/'} label="Home" sx={{
              fontSize: '1.1vw',
              margin: ' 0 2vw',
            }} />
            <Tab component={Link} to={'/lost'} label="Items Lost"
                 sx={{
                   fontSize: '1.1vw',
                   margin: ' 0 2vw',
                 }} />
            <Tab component={Link} to={'/found'} label="Items Found"
                 sx={{
                   fontSize: '1.1vw',
                   margin: ' 0 2vw',
                 }} />
            <Tab component={Link} to={'/report/form'} label="Report New Item"
                 sx={{
                   fontSize: '1.1vw',
                   margin: ' 0 2vw',
                 }} />
            <Tab component={Link} to={'/'} label="About" sx={{
              fontSize: '1.1vw',
              margin: ' 0 2vw',
            }} />

          </Tabs>
          {(user == null) ? <IconButton
              sx={{
                marginLeft: 'auto',
                height: 'calc(max(3vw, 5vh))',
                width: 'calc(max(3vw, 5vh))',
              }}
              onClick={handleGoogleSignIn}>
              <img src={GoogleIcon} alt={'Google Icon'} />
            </IconButton>
            : <button className={'logout_button'} onClick={handleLogout}>Logout</button>}
        </> : <DrawerComp />}

      </Toolbar>
    </AppBar>

  </>);
};

export default Nav;