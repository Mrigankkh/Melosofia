import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Melosofia</Link>
            </div>
            <div className="navbar-search">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="navbar-links">
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;