const express = require('express');
const router = express.Router();
const { getExchangeRates } = require('../lib/coinbase');

// GET /api/convert?base=USD
// This endpoint receives a currency code and returns exchange rates
router.get('/', async (req, res) => {
  const { base } = req.query;

  // Check if user provided a currency code
  if (!base) {
    return res.status(400).json({ error: "Missing 'base' currency parameter" });
  }

  try {
    // Fetch rates from Coinbase API for the given currency
    const rates = await getExchangeRates(base.toUpperCase());
    
    // Send back successful response with rates data
    res.json({
      success: true,
      base: base.toUpperCase(),
      rates: rates
    });
  } catch (error) {
    // If something goes wrong, send error response
    res.status(500).json({ error: "Failed to fetch exchange rates" });
  }
});

module.exports = router;