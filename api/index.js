// Load environment variables
require('dotenv').config();

// Simple health check endpoint
module.exports = (req, res) => {
  res.status(200).json({ status: '✅ Backend is running!' });
};
