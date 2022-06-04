import React from "react";
import logo from "../iiitdmj.png";
import "../stylesheets/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
    <nav className="navbar">
        <div className="container">
             <div className="navbar-header">
            <button className="navbar-toggler" data-toggle="open-navbar1">
            <span></span>
            <span></span>
            <span></span>
        </button>
            <a href="#" className="logo_header">
                <img className={"nav_logo"} src={logo} alt={"logo"}/>
                <h4> PDPM <span> IIITDM Jabalpur </span></h4>
            </a>
         </div>

    <div className="navbar-menu" id="open-navbar1">
      <ul className="navbar-nav">
        <li className="active"><a href="#">Home</a></li>
        <li><a href="#">Lost Item</a></li>
        <li><a href="#">Found Item</a></li>
        <li><a href="#">Signin</a></li>
      </ul>
    </div>
  </div>
</nav>
        
    )
}

export default Navbar;