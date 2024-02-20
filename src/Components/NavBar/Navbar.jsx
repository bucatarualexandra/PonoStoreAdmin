    
import React from "react";
import "./Navbar.css"
import navlogo from "../../assets/logo.png"
import navProfile from "../../assets/nav_profile.png"



const Navbar = () =>{
  return(
    <div className="navbar">
    <div className="admin-logo">
    <img src={navlogo}  className="nav-logo" alt=""/>
    <h1>Pono</h1>
    </div>
    <h1>Panou Administrator</h1>
    <img src={navProfile}  className="nav-profile" alt=""/>
    </div>
  )
}
export default Navbar