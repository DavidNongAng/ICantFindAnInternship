/**
 * This file contains the database connection using mongoose.
 */

const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);   // .connect(URI) is a mongoose method that connects to the MongoDB database with the URI provided. 
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`); 
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // stop the app if DB fails
  }
};

module.exports = connectDB;