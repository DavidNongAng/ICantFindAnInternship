/**
 * Controller functions for authentication.
 * This file is used to handle the logic for user registration and login. 
 * It uses bcryptjs to hash and compare passwords, and jsonwebtoken to generate a secure token for authenticated users. 
 */

// Imports
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Functions

// @desc    Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body; // .body is an Express method that parses incoming request bodies and holds the data sent from the client in a POST request.

    try{
        //Check if user exists
        const userExists = await User.findOne({ email });   // .findOne is a Mongoose method that checks if a element exists in the database. 
        if (userExists) return res.status(400).json({ message: `${email} is already registered`});

        //Hash password
        const salt = await bcrypt.genSalt(10);      // .genSalt is a bcrypt method that generates a salt (random string).
        const hashedPassword = await bcrypt.hash(password, salt); // .hash is a bcrypt method that encrypts the password.

        //Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        //Save the user
        await newUser.save(); // .save is a Mongoose method that saves the new user to the database.

        res.status(201).json({ message: `${name} registered successfully`});

    }catch(err){
        console.error('Reguster Error', err.message);
        res.status(500).json({ message: 'Server Error'});
    }

};

// @desc    Login an existing user
const loginUser = async (req, res) => {
    const { email, password } = req.body; 

    try{
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Check password by comparing with stored hash password
        const isMatch = await bcrypt.compare(password, user.password); // .compare is a bcrypt method that checks if the plaintext password matches the hashed one. 
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JSON Web Token
        const token = jwt.sign(     // .sign is a JWT method that 
            { userId: user._id }, // Payload: the part of the token that stores data you want to embed.  (In this case, user._id)
            process.env.JWT_SECRET, // Secret: a string that is used to sign the token. (In this case, JWT_SECRET)
            { expiresIn: '7d' } // Token expires in 7 days.
        );

        // Send back the token and user data
        res.json({
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        });
    }catch(err){
        console.error('Login error: ', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Export functions
module.exports = { registerUser, loginUser };
