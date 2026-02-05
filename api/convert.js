// Load environment variables
require('dotenv').config();

// Import required libraries
const express = require('express');
const cors = require('cors');
const convertRoutes = require('../../backend/src/api/convert');

// Initialize Express app
const app = express();

// Define which origins (websites) are allowed to call our API
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://multi-asset-converter.vercel.app',
  process.env.FRONTEND_URL, 
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Define routes - mount at /convert since Vercel strips /api prefix
app.use('/convert', convertRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// Export as Vercel serverless function
module.exports = app;
