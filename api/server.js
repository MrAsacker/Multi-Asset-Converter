// Load environment variables from .env file
require('dotenv').config();

// Import required libraries
const express = require('express');
const cors = require('cors');
const convertRoutes = require('./src/api/convert');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Define which origins (websites) are allowed to call our API
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  // Allow Vercel preview/production URLs
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean);

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow all Vercel URLs (preview and production)
    if (origin && origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin); // Helpful for debugging
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Define routes
app.use('/api/convert', convertRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('✅ Backend is running and healthy!');
});

// 👇 THE IMPORTANT CHANGE FOR VERCEL 👇

// Only listen on a specific port if we are running LOCALLY.
// On Vercel, the environment is 'production', so this part is skipped.
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`✅ Backend Server is running on http://localhost:${PORT}`);
    });
}

// Export the app so Vercel can run it as a Serverless Function
module.exports = app;