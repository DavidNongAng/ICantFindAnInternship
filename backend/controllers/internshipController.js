/**
 * Controller functions for internships. 
 * 
 * This controller handles searching for internship listings using the Adzuna API. 
 * It fetches and returns listings based on query parameters like job title and locations. 
 */

// Imports 
const axios = require('axios'); 
const User = require('../models/User');

// @desc    Fetch internships from Adzuna API
// @route   GET /api/internships/search
// @access  Public
const searchInternships = async (req, res) => {
    const { 
        title = '',
        location = 'Canada',
        results_per_page = 30
     } = req.query; 
     
    const baseTerm = 'internship';  
    const searchTerm = title ? `${baseTerm} ${title}`.trim(): baseTerm;

    console.log(' SEARCHING ADZUNA FOR INTERNSHIPS AND PART-TIME JOBS: ', { searchTerm, location });

    try{
        const response = await axios.get('https://api.adzuna.com/v1/api/jobs/ca/search/1', {
            params: {
                app_id: process.env.ADZUNA_APP_ID,
                app_key: process.env.ADZUNA_APP_KEY,
                what: searchTerm, 
                where: location
            }
        });
        // console.log('Request URL:', response.config.url);
        // console.log('Request Params:', response.config.params);

        res.json(response.data); // Send the fetched data as a JSON response. 
    }catch(err){
        // console.log('🔑 Adzuna App ID:', process.env.ADZUNA_APP_ID);
        // console.log('🔑 Adzuna App Key:', process.env.ADZUNA_APP_KEY);
        // console.error('❌ Adzuna API response error:', err.response.data);
        console.error('Adzuna API Error: ', err.message);
        if(err.response){
            res.status(500).json({ message: 'Failed to fetch internships from Adzuna API' });
        }
    }
};

// @desc    Save internship to user's account.
// @route   POST /api/internships/save
// @access  Private
const saveInternship = async (req, res) => {
    try{
        const userId = req.user;
        const internshipData = req.body;
        
        // Check if user exists
        const user = await User.findById(userId);   //.findById is a Mongoose method that searches for a user by their ID.
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the internship is already saved.
        const duplicateSaved = user.savedInternships.some(
            (internship) => internship.jobId === internshipData.jobId
        );
        if(duplicateSaved){
            return res.status(400).json({ message: 'Internship already saved' });
        }

        console.log('📦 Internship data received from client:', internshipData);

        // Save the internship to the user's account. 
        user.savedInternships.push({    // .push() is a JS array method that adds a new item to the end of an array. 
            jobId: internshipData.jobId,
            title: internshipData.title,
            comapny: internshipData.comapny,
            location: internshipData.location,
            description: internshipData.description,
            url: internshipData.url,
            isExpired: internshipData.isExpired || false,
        });

        console.log('📥 Internship pushed into user.savedInternships');

        await user.save();  // .save() is a Mongoose method that saves the updated user data to the database.
        res.json({ message: 'Internship saved successfully' });
    }catch(err){
        console.error('Save internship error: ', err.message);
        res.status(500).json({ message: 'Failed to save internship' });
    }
};

// @desc    Fetch saved internships from user's account.
// @route   GET /api/internships/saved
// @access  Private
const getSavedinternships = async (req, res) => {
    try{
        const userId = req.user;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('🔐 User ID from token:', req.user);
        console.log('📤 Returning internships:', user.savedInternships);
        res.json(user.savedInternships);
    }catch(err){
        console.error('Get saved internship error: ', err.message);
        res.status(500).json({ message: 'Failed to fetch saved internships' });
    }
};

// @desc Delete saved internship from user's account.
// @route DELETE /api/internships/saved/:id
// @access Private
const deleteSavedInternship = async (req, res) => {
    try{
        const userId = req.user;
        const internshipId = req.params.id; // .params is an Express property that stores route parameters from the URL (values after the :, so /:id)

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        user.savedInternships = user.savedInternships.filter( // .filter() is a JS array method that creates a new array containing only items that matches the conditions.
            (item) => item.jobId !== internshipId // Keep all items that isn't the one we want to delete. 
        );

        await user.save(); // Save the updated user data to the database. 

        res.json({ message: 'Internship deleted', savedInternships: user.savedInternships });
    }catch(err){
        console.error('Delete saved internship error: ', err.message);
        res.status(500).json({ message: 'Failed to delete saved internship' });
    };
}

// Exports
module.exports = { 
    searchInternships,
    saveInternship,
    getSavedinternships,
    deleteSavedInternship
};