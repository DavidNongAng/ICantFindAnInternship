/**
 * JWT Authentication Middleware
 * This file is used for the middleware function that verifies the JWT token sent in the request header. 
 * If valid, it attachest the userID to the request object so downstream route handlers can access it. 
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
    //Extract token from header
    const authHeader = req.headers.authorization // .authorization is a Express property that holds the Authorization header string from the HTTP request.
    // If sent correctly, authHeader should be Bearer <actual_token_here>
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){ // Check if the header exists and starts with Bearer.
        return res.status(401).json({ message: 'Unauthorized: No Token provided. ' });
    }

    const token = authHeader.split(' ')[1]; //split 'Bearer <token>' and take the token part. 

    try{
        // Verify the token using the secret key.
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // .verify is a JWT method that checks if the token is valid
        req.user = decoded.userId; // Attach the userId from the token payload to req.user
        next(); // Pass control to the next middleware or route handler
    }catch(err){
        console.error('JWT verification error:', err.message);
        res.status(403).json({ message: 'Unauthorized: Invalid Token.' });
    }
};

// Exports
module.exports = authMiddleware;