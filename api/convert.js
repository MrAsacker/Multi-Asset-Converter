// Load environment variables
require('dotenv').config();

// Import required libraries
const express = require('express');
const cors = require('cors');
const convertRoutes = require('../backend/src/api/convert');

// Initialize Express app
const app = express();

// Define CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://multi-asset-converter.vercel.app',
  process.env.FRONTEND_URL,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Mount the convert routes
app.use('/', convertRoutes);

// Export for Vercel
module.exports = app;
