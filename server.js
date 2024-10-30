const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./db/connect.js');  // Your MongoDB connection function
const userRoutes = require('./routes/userRoutes');  // User routes
const shopRoutes = require('./routes/shopRoutes');  // Shop routes
const productRoutes = require('./routes/productRoutes');  // Product routes

const app = express();

// Middleware
app.use(bodyParser.json());  // Parse incoming JSON requests

// Routes
app.use('/api/users', userRoutes);  // User-related API routes
app.use('/api/shops', shopRoutes);  // Shop-related API routes
app.use('/api/products', productRoutes);  // Product-related API routes

const port = process.env.PORT || 8000;

// Start server
const start = async () => {
  try {
    // Connect to MongoDB
    await connectDB();  // Ensure the connection string is loaded correctly inside connectDB
    
    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

// Execute the start function to initialize the server and DB connection
start();
