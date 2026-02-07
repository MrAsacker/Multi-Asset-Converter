

import { useState, useRef, useEffect } from 'react';
import ConverterForm from '../Components/ConverterForm';
import RealTimeIcon from '../Components/RealTimeIcon';
import { fetchRates } from './services/api';
import { currencies } from './lib/currencies';
import './App.css';

// Set default defaults (USD -> INR)
const defaultFrom = currencies.find(c => c.code === 'USD' && c.type === 'fiat');
const defaultTo = currencies.find(c => c.code === 'INR' && c.type === 'fiat');

function App() {
  const [amount, setAmount] = useState('10');
  const [fromAsset, setFromAsset] = useState(defaultFrom);
  const [toAsset, setToAsset] = useState(defaultTo);
  
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Tracks if the user has clicked "Convert" to avoid showing stale data while typing
  const [hasConverted, setHasConverted] = useState(false);

  const inputRef = useRef(null);

  const updateRate = async () => {
    if (!fromAsset?.code || !toAsset?.code) return;
    
    setLoading(true);
    try {
      const rates = await fetchRates(fromAsset.code);
      
      if (rates && rates[toAsset.code]) {
        setRate(parseFloat(rates[toAsset.code]));
        setLastUpdated(new Date());
        setHasConverted(true);
      } else {
        console.warn(`Rate not found for ${fromAsset.code} to ${toAsset.code}`);
      }
    } catch (error) {
      console.error("Failed to update rate:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on load
  useEffect(() => {
    updateRate();
  }, []);

  // Reset conversion result when assets change
  useEffect(() => {
    setHasConverted(false);
  }, [fromAsset, toAsset]);

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setHasConverted(false); // Reset result visibility when typing
    }
  };

  const adjustAmount = (val) => {
    setAmount((prev) => {
      const current = Number(prev) || 0;
      return Math.max(0, current + val).toString();
    });
    setHasConverted(false);
  };

  const blockInvalidChar = (e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
  const handleContainerClick = () => inputRef.current?.focus();

  const formatResult = (num) => {
    if (!num || num === 0) return "0.00";
    if (num >= 1_000_000_000) return num.toExponential(2);
    
    // 2 decimals for fiat, 6 for crypto
    const decimals = toAsset?.type === 'crypto' ? 6 : 2;
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  // Only calculate if the user has explicitly requested a conversion
  const convertedValue = hasConverted ? Number(amount) * rate : 0;

  return (
    <div className="min-h-screen bg-[#0F1115] flex items-center justify-center p-3 font-sans text-gray-200">
      <div className="w-full max-w-2xl bg-[#181A20] rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-[#2A2D35]">
        
        <div className="mb-10 text-center">
          <RealTimeIcon />
          <h1 className="text-3xl font-bold text-white tracking-tight">Multi-Asset Converter</h1>
          <p className="text-gray-500 text-sm mt-2 font-medium tracking-wide uppercase">Fiat & Crypto</p>
        </div>

        <ConverterForm
          amount={amount}
          fromAsset={fromAsset}
          toAsset={toAsset}
          setFromAsset={setFromAsset}
          setToAsset={setToAsset}
          inputRef={inputRef}
          handleAmountChange={handleAmountChange}
          adjustAmount={adjustAmount}
          blockInvalidChar={blockInvalidChar}
          handleContainerClick={handleContainerClick}
          formatResult={formatResult}
          convertedValue={convertedValue}
          onConvert={updateRate}
          lastUpdated={lastUpdated}
          loading={loading}
          selectedCurrency={fromAsset}
          hasConverted={hasConverted}
        />
      </div>
    </div>
  );
}

export default App;