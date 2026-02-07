const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchRates = async (baseCurrency) => {
  try {
    // If VITE_API_URL is empty or not set, use relative path
    const baseUrl = API_BASE_URL.trim() || '';
    const endpoint = baseUrl 
      ? (baseUrl.endsWith('/api') ? `${baseUrl}/convert` : `${baseUrl}/api/convert`)
      : '/api/convert';

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