import React, { useEffect } from 'react';
import {
  Divider,
  IconButton, List, ListItemButton, ListItemText, SwipeableDrawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import profile from '../assets/profile.png';
import '../stylesheets/DrawerComp.css';
import { logout } from '../Api/Data';
import { UserContext } from '../utils/UserContext';
import handleGoogleSignIn from '../utils/HandleGoogleSignIn';

const DrawerComp = () => {
  const [profileIcon, setProfileIcon] = React.useState(profile);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useContext(UserContext);

  useEffect(() => {
    if (user) {
      localStorage.setItem('userDataLost', JSON.stringify(user));
      console.log(user);
      console.log('hereDra');
      setProfileIcon(user.picture);
    }
  }, [user]);

  const handleLogout = async () => {
    await logout(setUser);
    setProfileIcon(profile);
  };

  return (<>
    <SwipeableDrawer PaperProps={{ sx: { backgroundColor: '#FF936F' } }} open={open}
                     onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
      <List sx={{
        marginRight: '2vw',
        marginLeft: '1vw',
      }}>
        <img className={'profileDrawer'} src={profileIcon} referrerPolicy="no-referrer" alt={'Profile Icon'} />
        <Divider />
        {(user == null) ? <ListItemButton onClick={() => {
          setOpen(false);
          handleGoogleSignIn();
        }}>
          <ListItemText primaryTypographyProps={{ fontSize: '1.2em' }} primary="Login" />
        </ListItemButton> : <ListItemButton onClick={() => {
          setOpen(false);
          handleLogout();
        }}>
          <ListItemText primaryTypographyProps={{ fontSize: '1.2em' }} primary="Logout" />
        </ListItemButton>}
        <ListItemButton component={Link} onClick={() => setOpen(false)} to="/lost">
          <ListItemText primaryTypographyProps={{ fontSize: '1.2em' }} primary="Lost Items" />
        </ListItemButton><ListItemButton component={Link} onClick={() => setOpen(false)}
                                         to="/found">
        <ListItemText primaryTypographyProps={{ fontSize: '1.2em' }} primary="Found Items" />
      </ListItemButton><ListItemButton component={Link} onClick={() => setOpen(false)} to="/report/form">
        <ListItemText primaryTypographyProps={{ fontSize: '1.2em' }} primary="Report New Item" />
      </ListItemButton><ListItemButton component={Link} onClick={() => setOpen(false)}
                                       to="/">
        <ListItemText primaryTypographyProps={{ fontSize: '1.2em' }} primary="About" />
      </ListItemButton>
        <ListItemButton component={Link} onClick={() => setOpen(false)} to="/dashboard">
          <ListItemText primaryTypographyProps={{ fontSize: '1.2em' }} primary="Dashboard" />
        </ListItemButton>
      </List>
    </SwipeableDrawer>
    <IconButton sx={{ marginLeft: 'auto' }} onClick={() => setOpen(!open)}>
      <MenuIcon />
    </IconButton>
  </>);
};

export default DrawerComp;
