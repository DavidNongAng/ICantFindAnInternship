/*
    This file contains the component for the navigation bar of the application. 
*/

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
    return(
        <nav className="navbar">
            {/* Logo/Brand */}
            <div className="navbar-logo">
                <Link to="/"><img src={logo} alt="CFAI Logo" className="logo-img" /> ICantFindAnInternship</Link>
            </div>

            {/* Navigation Links */}
            <ul className="navbar-links">
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/account">Account</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;