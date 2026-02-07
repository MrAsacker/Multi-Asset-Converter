const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchRates = async (baseCurrency) => {
  try {
    // If API_BASE_URL is already "/api", we don't want to add "/api" again.
    const endpoint = API_BASE_URL.endsWith('/api') 
      ? `${API_BASE_URL}/convert` 
      : `${API_BASE_URL}/api/convert`;

    const response = await fetch(`${endpoint}?base=${baseCurrency.toUpperCase()}&_=${Date.now()}`);
    
    if (!response.ok) {
      // Improved error logging to see the actual status code
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    return null;
  }
};