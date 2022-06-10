import React from "react";
import logo from "../assets/iiitdmj.png";
import account from "../assets/google.png";
import "../stylesheets/Navbar.css";


const Navbar = () => {
    return (
    <section className="navigationBar">
      <div className="navLogo">
        <img  src={logo} alt="logo"></img>
      </div>
      <h4>Home</h4>
      <h4>Items Lost</h4>
      <h4>Items Found</h4>
      <h4>Report</h4>
      <img className="navAccount" src={account} alt="accountimg"></img>
    </section>

    )
}

export default Navbar;