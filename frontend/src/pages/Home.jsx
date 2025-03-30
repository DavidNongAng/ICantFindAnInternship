/*
    This file is the Home Page of the application. 
*/

import React, {useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import '../styles/Home.css';
import axios from 'axios';


const Home = () => {

    // State Management for Internships
    const [internships, setInternships] = useState([]);

    //
    useEffect(() => {
        //Fetch latest internships
        const fetchInternships = async () => {
            try{
                const response = await axios.get('http://localhost:5000/api/internships/search', {
                    params: {
                        title: 'internship',
                        location: 'Canada',
                    },
                });
                setInternships(response.data.results || []);
            }catch(err){
                console.error('Failed to fetch internships ', err);
            }
        }

        fetchInternships();
    }, []);

    return(
        <main className="home-main">
            
            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="hero-title">Can't Find an Internship?</h1>
                <p className="hero-subtitle">Discover the best internship opportunities that fits your skillsets best!</p>
            </section>

            {/* Recently Added Jobs Title */}
            <section className="recent-jobs">
                <h2 className="recent-jobs-title">Recently Added Internships</h2>
                <div className="recent-jobs-grid">
                    {internships.slice(0, 6).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Home;