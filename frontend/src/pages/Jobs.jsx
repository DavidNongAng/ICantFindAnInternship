/*
    This file is the Jobs page of the application. 
*/

import React from 'react';
import '../styles/Jobs.css';

const Jobs = () => {
    return(
        <main className="jobs-main">
            {/* Header with Search Input */}
            <section className="jobs-header">
                <h1 className="jobs-title">Explore Available Internships</h1>
                <p className="hero-subtitle">Discover the best internship opportunities that fits your skillsets best!</p>
                
                {/* Search Bar
                <div className="search-bar">
                    <input 
                        type="text"
                        placeholder="Job Title, Keywords, or Company"
                        className="search-input"
                    />
                    <input
                        type="text"
                        placeholder="Location (City, State, Country)"
                        className="search-input"
                    />
                    <button className="search-button">
                        Search
                    </button>
                </div> */}
            </section>

            {/* Job Listings Title */}
            <section className="job-listings">
                <h2 className="job-listings-title">Matching Internships</h2>
                <p className="job-listings-description">This section will display results absed on the search.</p>
            </section>
        </main>
    );
};

export default Jobs;