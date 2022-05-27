import React from "react";
import logo from "../iiitdmj.png";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className={"nav"}>
            <div className={"nav-logo"}>
                <img className={"nav_logo"} src={logo} alt={"logo"}/>
                <p id={"logoText"}>PDPM IIITDM<br/> Jabalpur</p>
            </div>
            <Link to="/">Home</Link>
            <p>Items Lost</p>
            <p>Items Found</p>
            <p>Report new Item</p>
            <p>About Us</p>
            <button className={"avatar_logo"}/>
        </div>
    )
}

export default Nav;