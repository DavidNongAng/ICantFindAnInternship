/**
 * This file defines the User model for the application.
 * A User represents the person that signs up to serach and save internship opportunities.
 * Each user has a name, email, password (encrypted) and they can save and apply to listings.
 * Using Mongoose, we define this schema which allows us to store and manage user data in our database. 
*/

// Import the mongoose module
const mongoose = require('mongoose');

//Define User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },

    password: {
        type: String,
        required: true,
    },

    savedInternships: [
        {
            jobId: String,
            title: String,
            company: String,
            location: String,
            description: String,
            url: String,
            isExpired: {
                type: Boolean,
            },
            savedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, {
    timestamps: true, // Add createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User; 