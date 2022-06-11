import React from "react";
import {IconButton, List, ListItemButton, ListItemText, SwipeableDrawer} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Link} from "react-router-dom";

const DrawerComp = () => {
    const [open, setOpen] = React.useState(false);
    return (<>
        <SwipeableDrawer  open={open} onClose={() => setOpen(false)}>
            <List>
                <ListItemButton component={Link} onClick={() => setOpen(false)} to="/">
                    <ListItemText primaryTypographyProps={{fontSize: '1.2em'}} primary="Login"/>
                </ListItemButton>
                <ListItemButton component={Link} onClick={() => setOpen(false)} to="/">
                    <ListItemText primaryTypographyProps={{fontSize: '1.2em'}} primary="Lost Items"/>
                </ListItemButton><ListItemButton component={Link} onClick={() => setOpen(false)} to="/">
                <ListItemText primaryTypographyProps={{fontSize: '1.2em'}} primary="Found Items"/>
            </ListItemButton><ListItemButton component={Link} onClick={() => setOpen(false)} to="/">
                <ListItemText primaryTypographyProps={{fontSize: '1.2em'}} primary="Report New Item"/>
            </ListItemButton><ListItemButton component={Link} onClick={() => setOpen(false)} to="/">
                <ListItemText primaryTypographyProps={{fontSize: '1.2em'}} primary="About"/>
            </ListItemButton>
            </List>
        </SwipeableDrawer>
        <IconButton sx={{marginLeft: "auto"}} onClick={() => setOpen(!open)}>
            <MenuIcon/>
        </IconButton>
    </>);
}

export default DrawerComp;
