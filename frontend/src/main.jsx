// React entry point - this is where the React app starts
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Find the root HTML element and render the App component inside it
createRoot(document.getElementById('root')).render(
    <App />
)
