import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Navbar() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault()
        navigate('/login')
    }

    const handleSignup = (e) => {
        e.preventDefault()
        navigate('/register')
    }
    return (
        <nav className="navbar">
            <div onClick={() => navigate('/')} className="navbar-logo">
                <Logo />
            </div>
            <div className="navbar-buttons">
                <button className="navbar-button" onClick={handleLogin}>Login</button>
                <button className="navbar-button" onClick={handleSignup}>Sign Up</button>
            </div>
        </nav>
    );
}

export default Navbar;
