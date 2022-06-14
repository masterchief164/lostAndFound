import React from "react";
import {AppBar, IconButton, Tab, Tabs, Toolbar, useMediaQuery} from "@mui/material";
import CollegeIcon from "../../assets/iiitdmj.png"
import './Nav.css';
import {Link} from "react-router-dom";
import GoogleIcon from "../../assets/google.png"
import DrawerComp from "../DrawerComp/DrawerComp";


const Nav = () => {
    const [value, setValue] = React.useState(0);
    const isSmall = useMediaQuery("(max-width:1150px)");

    return (<>
        <AppBar position="static" sx={{background: "#fff", padding: "0.5em 2em"}}>
            <Toolbar>
                <IconButton sx={{background: "#FE926E"}}>
                    <img src={CollegeIcon} alt="IIITDMJ"/>
                </IconButton>
                {!isSmall ? <>
                    <Tabs value={value} onChange={(e, value) => setValue(value)}
                          indicatorColor={'primary'}>
                        <Tab component={Link} to={"/"} label="Home" sx={{fontSize: "1.2rem", margin: " 0 2vw"}}/>
                        <Tab component={Link} to={"/"} label="Items Lost"
                             sx={{fontSize: "1.2rem", margin: " 0 2vw"}}/>
                        <Tab component={Link} to={"/"} label="Items Found"
                             sx={{fontSize: "1.2rem", margin: " 0 2vw"}}/>
                        <Tab component={Link} to={"/"} label="Report New Item"
                             sx={{fontSize: "1.2rem", margin: " 0 2vw"}}/>
                        <Tab component={Link} to={"/"} label="About" sx={{fontSize: "1.2rem", margin: " 0 2vw"}}/>

                    </Tabs>
                    <IconButton
                        sx={{marginLeft: "auto", height: 'calc(max(3vw, 5vh))', width: 'calc(max(3vw, 5vh))'}}>
                        <img src={GoogleIcon} alt={"Google Icon"}/>
                    </IconButton>
                </> : <DrawerComp/>}

            </Toolbar>
        </AppBar>

    </>);
}

export default Nav;

