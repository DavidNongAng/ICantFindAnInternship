/*
    This file is the Home Page of the application. 
*/

import React from 'react';
import '../styles/Home.css';


const Home = () => {
    return(
        <main className="home-main">
            
            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="hero-title">Can't Find an Internship?</h1>
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

            {/* Recently Added Jobs Title */}
            <section className="recent-jobs">
                <h2 className="recent-jobs-title">Recently Added Internships</h2>
                <p className="recent-jobs-description">This section will list the most recent internships added.</p>
            </section>
        </main>
    );
};

export default Home;