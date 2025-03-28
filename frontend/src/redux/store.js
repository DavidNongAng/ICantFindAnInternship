/**
 * This file contains the Redux store setup.
 */

// Redux Store Setup
import { configureStore } from '@reduxjs/toolkit';          
import authReducer from './slices/authSlice';
import internshipReducer from './slices/internshipSlice';

// Create store (stores the state of the application) with the given reducers (functions that modify the state based on actions).
const store = configureStore({ 
    reducer: {
        auth: authReducer, 
        internships: internshipReducer
    }
})

// Export 
export default store;