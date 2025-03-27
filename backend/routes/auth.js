/**
 * Routes for authentication.
 * This file defines the Express routes for user registration and login.
 * It connects each routes to its respective controller function.
 * These routes handle request made to /api/auth endpoints.
 */

// Imports
const express = require('express');
const router = express.Router();        
const { registerUser, loginUser } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login an existing user
router.post('/login', loginUser);

// Export the router
module.exports = router;

