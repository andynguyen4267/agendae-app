import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Homepage.css';
import FullPage from '../FullPage/FullPage';
function Homepage () {
    return (
        <div className="homepage-container">
            <Navbar />
            <FullPage />
        </div>
    );
};

export default Homepage;