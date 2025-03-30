/*
    This file is the Jobs page of the application. 
*/

import React, { useState, useEffect } from 'react';
import '../styles/Jobs.css';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchInternship } from '../redux/slices/internshipSlice';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';

const Jobs = () => {

    const dispatch = useDispatch(); // useDispatch() is a react hook used to send actions to the store.

    // State Mangement for search inputs
    const [title, setTitle] = useState(''); //useState() is a React Hook that allows you to have state variables (variables that can change) in functional components.
    const [location, setLocation] = useState('');
    const [searched, setSearched] = useState(false);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const { searchResults, loading, error } = useSelector((state) => state.internships);

    // Function to handle search button clicks
    const handleSearch = () => {

        // Set the search state to true and fetch the internships 
        setSearched(true);

        // Save State of search inputs
        setSearchTitle(title);
        setSearchLocation(location);

        // Send the action to the store
        dispatch(fetchInternship({title, location}));
    };

    // Fetch Internships on page load
    useEffect(() => {
        dispatch(fetchInternship({ title: 'internship', location: 'Canada' }));
        setSearched(true);
      }, [dispatch]);


    return(
        <main className="jobs-main">
            {/* Header with Search Input */}
            <section className="jobs-header">
                <h1 className="jobs-title">Explore Available Internships</h1>
                
                {/* Reuseable Searchbar */}
                <SearchBar
                    onSearch={handleSearch}
                    title={title}
                    setTitle={setTitle}
                    location={location}
                    setLocation={setLocation}    
                />
            </section>

            {/* Job Listings Title */}
            <section className="job-listings">
                <h2 className="job-listings-title">Matching Internships</h2>
                {loading && <p>Loading internships...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && searchResults.length === 0 && searched && (
                    <p>No results found for "{searchTitle}" in "{searchLocation}".</p>
                )}
                {!loading && searchResults.length > 0 && (
                    <div className="job-grid">
                        {searchResults.map((job, index) => (
                            <JobCard key={index} job={job}/>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Jobs;