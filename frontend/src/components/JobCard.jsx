/*
    This file contains the JobCard component that displays the jobs on the application.
*/

import React from 'react';
import '../styles/JobCard.css';

const JobCard = ({job}) => {
    
    // Object Destructuring to get the job details
    const {
        title,
        description,
        location,
        company, 
        contract_time,
    } = job;

    return(
            <div className="job-card">
                <p className="job-type">{contract_time ? contract_time.charAt(0).toUpperCase()+ contract_time.slice(1): 'Internship'}</p> {/* Checks if it exists, and removes the rest of the string after the first character */}
                <h3 className="job-title">{title}</h3>
                <p className="job-company">{company.display_name}</p>
                <p className="job-location">{location.display_name}</p>
                <p className="job-description">
                    {description.length > 200 ? description.substring(0, 200) + '...': description}
                </p>
                <button className="job-show-more">Learn More</button>
            </div>
    );
};

export default JobCard;