import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
    return(
        <div className="not-found-container">
            <h1>404 - Page Not Found</h1>
            <p>Something went wrong! We couldn't find the page you're looking for.</p>
            <Link to="/" className="home-link">Go Back Home</Link> 
        </div>
    )
}

export default NotFound;