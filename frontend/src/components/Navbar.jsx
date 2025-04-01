/*
    This file contains the component for the navigation bar of the application. 
*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import '../styles/NavBar.css';
import logo from '../assets/logo.png';

const Navbar = () => {

    // State Management
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [ dropDownOpen, setDropDownOpen ] = useState(false);

    const handleToggle = () => {
        setDropDownOpen((prev) => !prev);
    }

    const handleLogout = () => {
        dispatch(logout());
        setDropDownOpen(false);
    };

    return(
        <nav className="navbar">
            {/* Logo/Brand */}
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="ICFAI Logo" className="logo-img"/>ICantFindAnInternship
                </Link>
            </div>

            {/* Navigation Links */}
            <ul className="navbar-links">
                <li><Link to="/jobs">Jobs</Link></li>
                <li className="dropdown-container">
                    <button className="dropdown-toggle" onClick={handleToggle}>Account</button>
                    {dropDownOpen && (
                        <ul className="dropdown-menu">
                            {!user ? (
                                <li><Link to="/auth" onClick={() => setDropDownOpen(false)}>Log In / Register</Link></li>
                            ) : (
                                <>
                                    <li className="dropdown-email">{user.email}</li>
                                    <li><Link to="/profile" onClick={() => setDropDownOpen(false)}>View Profile</Link></li>
                                    <li><Link to="/account" onClick={() => setDropdownOpen(false)}>Account</Link></li>
                                    <li><Link to="/saved" onClick={() => setDropdownOpen(false)}>Saved Jobs</Link></li>
                                    <li><button onClick={handleLogout}>Sign Out</button></li>
                                </>
                            )}
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;