// Load environment variables from .env file
require('dotenv').config();

// Import required libraries
const express = require('express');
const cors = require('cors');
const convertRoutes = require('./src/api/convert');

console.log('Server starting...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VERCEL_URL:', process.env.VERCEL_URL);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS - Allow all origins for now
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Define routes
// Note: /api prefix is already handled by Vercel rewrite
app.use('/convert', convertRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('✅ Backend is running and healthy!');
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'API is working', endpoints: ['/api/convert'] });
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