import React from "react";
import {AppBar, IconButton, Tab, Tabs, Toolbar, useMediaQuery} from "@mui/material";
import CollegeIcon from "../../assets/iiitdmj.png"
import './Nav.css';
import {Link} from "react-router-dom";
import GoogleIcon from "../../assets/google.png"
import DrawerComp from "../DrawerComp/DrawerComp";
import GoogleSignIn from "../../utils/GoogleSignIn/GoogleSignIn";


const Nav = () => {
    const [value, setValue] = React.useState(0);
    const isSmall = useMediaQuery("(max-width:900px)");

    let authorizationCode;

    let windowHandle;
    let intervalId = null;
    let intervalLength = 100;

    const doAuthorization = () => {
        if(windowHandle != null && !windowHandle.closed) {
            windowHandle.focus();
            return;
        }

        windowHandle = createOauthWindow(GoogleSignIn(), 'OAuth login');

        intervalId = window.setInterval(() => {
                let href;
                try {
                    href = windowHandle.location.href;
                } catch (e) {
                    // console.log(e);
                }
                if (href != null) {
                    const getQueryString = function (field, url) {
                        const windowLocationUrl = url ? url : href;
                        const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
                        const string = reg.exec(windowLocationUrl);
                        return string ? string[1] : null;
                    };
                    if (href.match('code')) {
                        window.clearInterval(intervalId);
                        authorizationCode = getQueryString('code', href);
                        // console.log(authorizationCode);
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ tokenId: authorizationCode })
                        };
                        fetch('http://localhost:8000/googleLogin', requestOptions)
                            .then(response => response.json())
                            .catch(error => console.error('Error:', error))
                        windowHandle.close();
                    }
                }
        }, intervalLength);
    }


    const createOauthWindow = (url, name = 'Authorization', width = 500, height = 600) => {
        if (url == null) {
            return null;
        }
        const options = `width=${width},height=${height}, left = (screen.width – popupWinWidth) / 2, top = (screen.height – popupWinHeight) / 4`;
        return window.open(url, name, options);
    }


    return (<>
        <AppBar position="static" sx={{background: "#fff", padding: "0.5em 2em"}}>
            <Toolbar>
                <IconButton sx={{background: "#FE926E"}}>
                    <img src={CollegeIcon} alt="IIITDMJ"/>
                </IconButton>
                {!isSmall ? <>
                    <Tabs value={value} onChange={(e, value) => setValue(value)}
                          indicatorColor={'primary'}>
                        <Tab component={Link} to={"/"} label="Home" sx={{fontSize: "1.1vw", margin: " 0 2vw"}}/>
                        <Tab component={Link} to={"/lost"} label="Items Lost"
                             sx={{fontSize: "1.1vw", margin: " 0 2vw"}}/>
                        <Tab component={Link} to={"/found"} label="Items Found"
                             sx={{fontSize: "1.1vw", margin: " 0 2vw"}}/>
                        <Tab component={Link} to={"/"} label="Report New Item"
                             sx={{fontSize: "1.1vw", margin: " 0 2vw"}}/>
                        <Tab component={Link} to={"/"} label="About" sx={{fontSize: "1.1vw", margin: " 0 2vw"}}/>

                    </Tabs>
                    <IconButton
                        sx={{marginLeft: "auto", height: 'calc(max(3vw, 5vh))', width: 'calc(max(3vw, 5vh))'}}
                        onClick={doAuthorization}>
                        <img src={GoogleIcon} alt={"Google Icon"}/>
                    </IconButton>
                </> : <DrawerComp/>}

            </Toolbar>
        </AppBar>

    </>);
}

export default Nav;

