/**
 * Routes for Internships
 * This file maps incoming HTTP requests related to internship searches to the internshipController, which handles the logic using the Adzuna API. 
 */

const express = require('express');
const router = express.Router();
const { searchInternships } = require('../controllers/internshipController');

// @route  GET /api/internships/search
// @desc   Fetch internship and part-time listings from Adzuna
// @access Public 
router.get('/search', searchInternships);

// Exports
module.exports = router;
