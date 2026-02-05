// Load environment variables from .env file
require('dotenv').config();

// Import required libraries
const express = require('express');
const cors = require('cors');
const convertRoutes = require('./src/api/convert');

// Initialize Express app and set port (use 5000 if PORT env var not set)
const app = express();
const PORT = process.env.PORT || 5000;

// Define which origins (websites) are allowed to call our API
// Without this, browsers block requests from other domains for security
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
];

// CORS configuration: only allow requests from trusted origins
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

// Apply middleware - these run for every request
// cors(): Allow cross-origin requests from frontend
// express.json(): Parse incoming JSON data from requests
app.use(cors(corsOptions));
app.use(express.json());

// Define routes - /api/convert requests go to convertRoutes handler
app.use('/api/convert', convertRoutes);

// Health check endpoint - useful to verify server is running
app.get('/', (req, res) => {
  res.send('✅ Backend is running and healthy!');
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`✅ Backend Server is running on http://localhost:${PORT}`);
});