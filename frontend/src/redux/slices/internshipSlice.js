/**
 * This file contains the Redux slice for internships.
 * Used to handle actions for storing internship search results and save internships. 
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch internship (async action)
export const fetchInternship = createAsyncThunk('internship/fetchInternship', async({title, location}, thunkAPI) => {
    try{
        const response = await axios.get('http://localhost:5000/api/internships/search', {
            params: {
                title,
                location,
            }
        });
        return response.data.results; // Returns the internship listings
    }catch(err){
        return thunkAPI.rejectWithValue('Failed to fetch internships');
    }
});



// Redux slice for internships
const internshipSlice = createSlice({
    name: 'internships',
    initialState: {
        searchResults: [], 
        savedInternships: [],
        loading: false,
        error: null,
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchInternship.pending, (state) => {  // Handles the pending state of fetching internships.
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInternship.fulfilled, (state, action) => {    // Handles the fulfilled state of fetching internships.
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(fetchInternship.rejected, (state, action) => {   // Handles the rejected state of fetching internships.
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setSearchInternship,
    setSavedInternships,
    addSavedInternship,
    removeSavedInternship,

} = internshipSlice.actions;

export default internshipSlice.reducer;