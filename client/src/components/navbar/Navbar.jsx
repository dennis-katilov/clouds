import React from "react"
// import './navbar.css'
import Logo from '../../assets/img/navbar-logo.svg'

const Navbar = () => {
    return (
        <div className="navbar">
            <img src={Logo} alt="" className="navbar__logo" />
            <div className="navbar__header">CLOUD</div>
            <div className="navbar__login">Sign In</div>
            <div className="navbar__registration">Sign Up</div>
        </div>
    )
}


export default Navbar