// Load environment variables
require('dotenv').config();

// Import the Express app
const app = require('../server.js');

// Export as Vercel handler
module.exports = (req, res) => {
  return app(req, res);
};
