/*
    This file contains the SearchBar component of the web application. 
*/

import React from 'react';
import '../styles/SearchBar.css';


// takes in a prop called onSearch, which is a function that will be called when the search button is clicked.
const SearchBar = ({ title, setTitle, location, setLocation, onSearch }) => {   // Pass in the props as arguments to enable the function to work.
    
    // Functional Enter key to search
    const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default action of the form
    onSearch();
    }
    
    return(
        <form className="search-bar" onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Job Title, Keywords, or Company"
                className="search-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
            /> 
            <input
                type="text"
                placeholder="Location (City, State, Country)"
                className="search-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit" className="search-button">
                Search
            </button>
        </form>
    );
};

export default SearchBar;