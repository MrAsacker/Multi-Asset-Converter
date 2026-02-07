const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const fetchRates = async (baseCurrency) => {
  try {
    // Always use relative path in production, fallback to localhost only in dev
    const endpoint = '/api/convert';

    console.log('Fetching from:', endpoint); // Debug log
    
    const response = await fetch(`${endpoint}?base=${baseCurrency.toUpperCase()}&_=${Date.now()}`);
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    return null;
  }
};