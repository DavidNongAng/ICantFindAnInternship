/**
 * This file contains the Redux slice for internships.
 * Used to handle actions for storing internship search results and save internships. 
 */

import { createSlice } from '@reduxjs/toolkit';

// Redux slice for internships
const internshipSlice = createSlice({
    name: 'internships',
    initialState: {
        searchResults: [], 
        savedInternships: [],
    },
    reducers: {
        setSearchInternship: (state, action) => {   // Updates the state with a new array of internship search results.
            state.searchInternship = action.payload;
        },
        setSavedInternships: (state, action) => {   // Sets the full list of saved internships. 
            state.savedInternships = action.payload;
        },
        addSavedInternship: (state, action) => {    // Adds a new saved internship to the savedInternship array.
            state.savedInternships.push(action.payload);
        },
        removeSavedInternship: (state, action) => { // Removes a saved internship from the savedInternship array based on jobId
            state.savedInternships = state.savedInternships.filter((internship) => internship.jobId !== action.payload);
        },
    },
});

export const {
    setSearchInternship,
    setSavedInternships,
    addSavedInternship,
    removeSavedInternship,

} = internshipSlice.actions;

export default internshipSlice.reducer;