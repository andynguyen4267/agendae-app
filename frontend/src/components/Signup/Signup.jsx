import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo'; 
import './Signup.css'
import { FaExclamationCircle } from 'react-icons/fa';

function Signup () {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name) {
            setErrorMessage('Please enter your name');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        if (!password) {
            setErrorMessage('Please enter a password');
            return;
        }
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        axios.post(`${API_URL}/register`, { name, email, password })
        .then(result => {
            console.log(API_URL);
            console.log("API response:", result.data.status); // Log the entire response
            if (result.data && result.data.status === "Success") {
                setSuccessMessage('Registration successful! Please check your email to verify your account.');
            } else {
                setErrorMessage(result.data.status || 'Registration failed.');
            }
        })
        .catch(err => {
            console.error("Axios error:", err); // Log detailed error information
            setErrorMessage('An error occurred during registration.');
        });
    
    }

    return (
        <div className='signup-container d-flex justify-content-center align-items-center custom-bg vh-100'>
            <div onClick={() => navigate('/')} className='logo-container position-absolute top-0 start-0 p-3'>
                <Logo />
            </div>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'>
                        <strong>Name</strong>
                    </label>
                    <input
                        type='text'
                        placeholder='Enter Name'
                        autoComplete='off'
                        name='email'
                        className='form-control rounded-0'
                        onChange={(e) => {
                            setName(e.target.value);
                            setErrorMessage('');
                        }}
                    />
                    </div>
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
                        type='text'
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
                {successMessage && (
                        <div className="alert-success">
                            <FaExclamationCircle className="alert-icon" />
                            <span className="alert-text">{successMessage}</span>
                        </div>
                    )}
                <button type="submit" className='btn btn-success w-100 rounded-0'>
                    Register
                </button>
                <p>Already have an account?</p>
                <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                    Login
                </Link>
                </form>
            </div>
        </div>
    );
};

export default Signup;