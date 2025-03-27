/**
 * Controller functions for internships. 
 * 
 * This controller handles searching for internship listings using the Adzuna API. 
 * It fetches and returns listings based on query parameters like job title and locations. 
 */

// Imports 
const axios = require('axios'); 

const searchInternships = async (req, res) => {
    const { 
        title = '',
        location = 'Canada',
        results_per_page = 30
     } = req.query; 

    let baseTerm = 'internship'
    const searchTerm = title ? `${baseTerm} ${title}`.trim(): baseTerm;

    console.log(' SEARCHING ADZUNA FOR INTERNSHIPS AND PART-TIME JOBS: ', { searchTerm, location });

    try{
        const response = await axios.get('https://api.adzuna.com/v1/api/jobs/ca/search/1', {
            params: {
                app_id: process.env.ADZUNA_APP_ID,
                app_key: process.env.ADZUNA_APP_KEY,
                what: searchTerm, 
                where: location,
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

// Exports
module.exports = { searchInternships };