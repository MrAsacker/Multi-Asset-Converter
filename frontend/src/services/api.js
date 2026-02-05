// Get the API URL from environment variables, or use localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Function to fetch exchange rates from our backend
export const fetchRates = async (baseCurrency) => {
  try {
    // Make a fetch request to our backend API
    // The _=${Date.now()} part prevents caching so we always get fresh rates
    const response = await fetch(`${API_BASE_URL}/api/convert?base=${baseCurrency}&_=${Date.now()}`);
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the JSON response
    const data = await response.json();
    
    // Return just the rates object (e.g., { EUR: "0.92", INR: "83.5" })
    return data.rates;
  } catch (error) {
    // Log any errors that happen during the fetch
    console.error("API Fetch Error:", error);
    return null;
  }
};