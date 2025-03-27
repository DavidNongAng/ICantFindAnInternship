const express = require('express');      // Express handles routing and server logic
const mongoose = require('mongoose');    // Mongoose communicates with MongoDB
const dotenv = require('dotenv');        // Loads environment variables from the .env file
const cors = require('cors');           // CORS allows frontend to call backend APIs (Cross-Origin Resource Sharing)
const connectDB = require('./config/db');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const internshipRoutes = require('./routes/internships');

// Load environment variables
dotenv.config();
const app = express();              // Initialize the Express app

// Middleware
app.use(cors());                    // Allows requests from different origins (localhost: 5173)
app.use(express.json());            // Parse incoming JSON requests

// Routes for testing 
app.use('/api/auth', authRoutes);
app.use('/api/internships', internshipRoutes);

// Test to see if the server is running
// app.get('/', (req, res) => {
//     res.send('API is running... ');
// });

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
connectDB(); // connect to MongoDB

// Routes
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

