import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Login.css';
import { FaExclamationCircle } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/login`, { email, password })
            .then(result => {
                console.log("test:", result);
                if (result.data.status === "Success") {
                    localStorage.setItem('userId', result.data.userId);
                    navigate('/todos');
                } else if (result.data.status === "Please verify your email before logging in.") {
                    setErrorMessage("Please verify your email before logging in.")
                } else {
                    setErrorMessage("Invalid email or password.")
                }
            })
            .catch(err => console.log("test", err));
    };

    return (
        <div className='login-container d-flex justify-content-center align-items-center custom-bg vh-100'>
            <div onClick={() => navigate('/')} className='logo-container position-absolute top-0 start-0 p-3'>
                <Logo />
            </div>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter Email'
                            autoComplete='off'
                            name='email'
                            className='form-control rounded-0'
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorMessage('');
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            autoComplete='off'
                            name='password'
                            className='form-control rounded-0'
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorMessage('');
                            }}
                        />
                    </div>
                    {errorMessage && (
                        <div className="alert">
                            <FaExclamationCircle className="alert-icon" />
                            <span className="alert-text">{errorMessage}</span>
                        </div>
                    )}
                    <button type="submit" className='btn btn-success w-100 rounded-0'>
                        Login
                    </button>
                    <p>Don't have an account?</p>
                    <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                        Register
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
