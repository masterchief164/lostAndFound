import React, { useEffect } from "react";
import { AppBar, IconButton, Tab, Tabs, Toolbar, useMediaQuery } from "@mui/material";
import CollegeIcon from "../../assets/iiitdmj.svg";
import "./Nav.css";
import { Link } from "react-router-dom";
import GoogleIcon from "../../assets/google.png";
import DrawerComp from "../DrawerComp/DrawerComp";
import GoogleSignIn from "../../utils/GoogleSignIn/GoogleSignIn";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";
import initializeApp from "../../utils/initializeApp";

const Nav = () => {
    const [value, setValue] = React.useState(0);
    const [user, setUser] = React.useContext(UserContext);
    const [lostItems, setLostItems] = React.useContext(UserContext);
    const [foundItems, setFoundItems] = React.useContext(UserContext);
    const isSmall = useMediaQuery("(max-width:900px)");

    useEffect(() => {
        initializeApp(setUser, setLostItems, setFoundItems)
            .then(() => (console.log("load Completed")));
    }, []);

    useEffect(() => {
        if (user) {
            // console.log(user);
            localStorage.setItem("userDataLost", JSON.stringify(user));
        }
    }, [user]);

    let windowHandle;
    let intervalId = null;
    let intervalLength = 100;

    const doAuthorization = () => {
        if (windowHandle != null && !windowHandle.closed) {
            windowHandle.focus();
            return;
        }

        const state = Math.random()
            .toString(36)
            .substring(2, 15) + Math.random()
            .toString(36)
            .substring(2, 15);
        // console.log("state", state);

        windowHandle = createOauthWindow(GoogleSignIn(state), "OAuth login");

        intervalId = window.setInterval(() => {
            let href;
            try {
                href = windowHandle.location.href;
            } catch (e) {
                // console.log(e);
            }
            if (href != null) {
                // console.log(href);
                const getQueryString = function(field, url) {
                    const windowLocationUrl = url ? url : href;
                    const reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
                    const reg2 = new RegExp("[?&]" + "state" + "=([^&#]*)", "i");
                    const string = reg.exec(windowLocationUrl);
                    const string2 = reg2.exec(windowLocationUrl);
                    // console.log("String2", string2);
                    // console.log(string);
                    return string && string2 ? {
                        stateResp: string2[1],
                        authorizationCode: string[1]
                    } : null;
                };
                if (href.match("code")) {
                    window.clearInterval(intervalId);
                    const resp = getQueryString("code", href);
                    // console.log(authorizationCode);
                    if (resp.stateResp !== state) {
                        console.log("State mismatch");
                        return;
                    }
                    axios.post("http://localhost:8000/auth/googleLogin", { tokenId: resp.authorizationCode }, { withCredentials: true })
                        .then(async (response) => {
                            const data = response.data;
                            // console.log(data);
                            setUser(data.userData);
                        })
                        .catch(error => console.error("Error:", error));
                    windowHandle.close();
                }
            }
        }, intervalLength);
    };

    const createOauthWindow = (url, name = "Authorization", width = 500, height = 600) => {
        if (url == null) {
            return null;
        }
        const options = `width=${width},height=${height}, left = (screen.width – popupWinWidth) / 2, top = (screen.height – popupWinHeight) / 4`;
        return window.open(url, name, options);
    };

    const handleLogout = async () => {

        await axios.get("http://localhost:8000/auth/logout", { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    console.log("logged out");
                    localStorage.removeItem("userDataLost");
                    setUser(null);
                }
            });
    };

    return (<>
        <AppBar position="static" sx={{
            background: "#fff",
            padding: "0.5em 2em"
        }}>
            <Toolbar>
                <IconButton sx={{ background: "#FE926E" }} component={Link} to={"/"}
                            onClick={() => setValue(0)}>
                    <img src={CollegeIcon} alt="IIITDMJ" />
                </IconButton>
                {!isSmall ? <>
                    <Tabs value={value} onChange={(e, value) => setValue(value)}
                          indicatorColor={"primary"}>
                        <Tab component={Link} to={"/"} label="Home" sx={{
                            fontSize: "1.1vw",
                            margin: " 0 2vw"
                        }} />
                        <Tab component={Link} to={"/lost"} label="Items Lost"
                             sx={{
                                 fontSize: "1.1vw",
                                 margin: " 0 2vw"
                             }} />
                        <Tab component={Link} to={"/found"} label="Items Found"
                             sx={{
                                 fontSize: "1.1vw",
                                 margin: " 0 2vw"
                             }} />
                        <Tab component={Link} to={"/report/form"} label="Report New Item"
                             sx={{
                                 fontSize: "1.1vw",
                                 margin: " 0 2vw"
                             }} />
                        <Tab component={Link} to={"/"} label="About" sx={{
                            fontSize: "1.1vw",
                            margin: " 0 2vw"
                        }} />

                    </Tabs>
                    {(user == null) ? <IconButton
                            sx={{
                                marginLeft: "auto",
                                height: "calc(max(3vw, 5vh))",
                                width: "calc(max(3vw, 5vh))"
                            }}
                            onClick={doAuthorization}>
                            <img src={GoogleIcon} alt={"Google Icon"} />
                        </IconButton> :
                        <button className={"logout_button"} onClick={handleLogout}>Logout</button>}
                </> : <DrawerComp />}

            </Toolbar>
        </AppBar>

    </>);
};

export default Nav;

