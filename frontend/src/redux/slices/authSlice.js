/**
 * This file contains the Redux slice for authentication. 
 * Used to handle user login, logout, and authentication status.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios'; // Axios is used for making HTTP requests.

// Initial state for the authentication slice.
const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,   // Get the JWT token from the browser's localStorage.
    loading: false, // Loading state for async actions.
    error: null,
};

// Async redux action for logging in a user. 
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => { // createAsyncThunk is a redux function that let's you write async logic that works with redux actions and reducers.
    try{
        const response = await axios.post('/api/auth/login', credentials); // sends a POST request to backend login with credentials (email and password).
        localStorage.setItem('token', response.data.token); // Save the JWT token in the browser's localStorage for persistence.
        
        return response.data;
    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data); 
    }
});

// Redux slice for authentication
const authSlice = createSlice({
    name: 'auth',
    initialState, // Initial state of the slice.
    reducers: {     // Modify the state of the slice. 
        // Logout action clears user and token from the redux state and localStorage.
        logout(state){
            state.user = null; 
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        // builder is a callback that adds reducers to the slice. 
        builder
            // .addCase is a redux method used to define how the slice should respond to specific actions. 
            .addCase(loginUser.pending, (state) => {  // while login is in progress.
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => { // when login is successful. 
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => { //when login fails.
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export logout action to be used in components.
export const { logout } = authSlice.actions;

// Export reducer to be used in the store. 
export default authSlice.reducer;



