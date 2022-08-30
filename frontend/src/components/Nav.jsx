import React, { useEffect } from 'react';
import {
  AppBar, Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tab, Tabs, Toolbar, useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CollegeIcon from '../assets/iiitdmj.svg';
import '../stylesheets/Nav.css';
import GoogleIcon from '../assets/google.png';
import DrawerComp from './DrawerComp.jsx';
import { UserContext } from '../utils/UserContext.jsx';
import initializeApp from '../utils/initializeApp';
import { logout } from '../Api/Data';
import handleGoogleSignIn from '../utils/HandleGoogleSignIn';
import {Logout} from '@mui/icons-material';

const Nav = () => {
  const [user, setUser, pageNumber, setPageNumber] = React.useContext(UserContext);
  const isSmall = useMediaQuery('(max-width:900px)');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    initializeApp(setUser)
      .then();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('userDataLost', JSON.stringify(user));
      // console.log(user);
      // console.log('hereNav');
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
                    onClick={() => setPageNumber(0)}>
          <img src={CollegeIcon} alt="IIITDMJ" />
        </IconButton>
        {!isSmall ? <>
          <Tabs value={pageNumber} onChange={(e, val) => setPageNumber(val)}
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
          {/*{(user == null) ? */}
          {/*  : <button className={'logout_button'} onClick={handleLogout}>Logout</button>}*/}
          {(user == null) ? <IconButton
                  sx={{
                    marginLeft: 'auto',
                    height: 'calc(max(3vw, 5vh))',
                    width: 'calc(max(3vw, 5vh))',
                  }}
                  onClick={handleGoogleSignIn}>
                <img src={GoogleIcon} alt={'Google Icon'} />
              </IconButton>
              :
          <>
          <IconButton
              sx={{
                marginLeft: 'auto',
                height: 'calc(max(3vw, 5vh))',
                width: 'calc(max(3vw, 5vh))',
              }}
              onClick={handleClick}>
            <img src={user.picture} referrerPolicy='no-referrer' alt={'Google Icon'} />
          </IconButton>

          <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>

            <MenuItem component={Link} to={'/dashboard'}>
              <Avatar /> Dashboard
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          </>}
        </> : <DrawerComp />}
      </Toolbar>
    </AppBar>

  </>);
};

export default Nav;
