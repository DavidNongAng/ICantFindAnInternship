/**
 * Routes for Internships
 * This file maps incoming HTTP requests related to internship searches to the internshipController, which handles the logic using the Adzuna API. 
 */

const express = require('express');
const router = express.Router();
const { searchInternships, saveInternship, getSavedinternships, deleteSavedInternship } = require('../controllers/internshipController');
const authMiddleware = require('../middleware/authMiddleware');

// @route  GET /api/internships/search
// @desc   Fetch internship and part-time listings from Adzuna
// @access Public 
router.get('/search', searchInternships);

// @route   POST /api/internships/save
// @desc    Save an internship to the user's account
// @access  Private
router.post('/save', authMiddleware, saveInternship);

// @route   GET /api/internships/saved
// @desc    Fetch saved internships from the user's account
// @access  Private
router.get('/saved', authMiddleware, getSavedinternships);

// @route   DELETE /api/internships/saved/:id
// @desc    Delete a saved internship from the user's account
// @access  Private
router.delete('/saved/:id', authMiddleware, deleteSavedInternship);

// Exports
module.exports = router;
