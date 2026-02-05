
import AssetSelector from './AssetSelector';
import AmountInput from './AmountInput';
import ConversionResult from './ConversionResult';

function ConverterForm({
  amount, fromAsset, toAsset, setFromAsset, setToAsset,
  handleContainerClick, inputRef, handleAmountChange, adjustAmount,
  formatResult, convertedValue, onConvert, lastUpdated, loading,
  selectedCurrency , hasConverted
}) {
  const handleSwap = () => {
    const temp = fromAsset;
    setFromAsset(toAsset);
    setToAsset(temp);
  };

  return (
    <div className="space-y-10">
      <AmountInput 
        amount={amount}
        inputRef={inputRef}
        handleAmountChange={handleAmountChange}
        adjustAmount={adjustAmount}
        handleContainerClick={handleContainerClick}
        selectedCurrency={fromAsset}
      />

      <div className="flex flex-col md:flex-row items-center gap-5 relative">
        <AssetSelector asset={fromAsset} setAsset={setFromAsset} label="From" />

        <button
          onClick={handleSwap}
          className="md:absolute left-1/2 md:-translate-x-1/2 bg-[#181A20] border-[6px] border-[#181A20] ring-1 ring-[#2A2D35] p-3 rounded-full text-blue-400 z-10 shadow-2xl hover:rotate-180 transition-all duration-500 group"
        >
          <svg className="w-6 h-6 rotate-90 md:rotate-0 group-active:scale-75 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </button>

        <AssetSelector asset={toAsset} setAsset={setToAsset} label="To" />
      </div>

      <button 
        onClick={onConvert}
        disabled={loading}
        className={`w-full py-5 rounded-4xl font-black tracking-wide transition-all active:scale-[0.98] cursor-pointer
          ${loading 
            ? 'bg-blue-900 text-blue-300' 
            : 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]'
          }`}
        style={{ cursor: loading ? 'default' : 'pointer' }} // Force cursor style
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3 text-lg">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Fetching Rates...
          </span>
        ) : (
          <span className="text-[1.35rem]">Convert Now</span>
        )}
      </button>

      <ConversionResult 
        value={convertedValue} 
        assetCode={toAsset.code} 
        formatResult={formatResult} 
        lastUpdated={lastUpdated}
        hasConverted={hasConverted}
      />
    </div>
  );
}

export default ConverterForm;