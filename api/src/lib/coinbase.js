const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first'); // Fixes connection crashes on some networks (try 4 first )

const axios = require('axios');

const BASE_URL = 'https://api.coinbase.com/v2/exchange-rates';

const getExchangeRates = async (currencyCode) => {
  try {
    const response = await axios.get(`${BASE_URL}?currency=${currencyCode}`);
    return response.data.data.rates;
  } catch (error) {
    console.error("Coinbase Service Error:", error.message);
    throw new Error("Failed to fetch rates from Coinbase");
  }
};

module.exports = { getExchangeRates };