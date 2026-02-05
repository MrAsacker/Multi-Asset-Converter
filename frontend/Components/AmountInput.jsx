import StepButton from './StepButton';

const AmountInput = ({ 
  amount, 
  inputRef, 
  handleAmountChange, 
  adjustAmount, 
  handleContainerClick,
  selectedCurrency 
}) => (
  <div 
    onClick={handleContainerClick} 
    className="group bg-[#0F1115] p-5 rounded-[2.5rem] border border-[#2A2D35] focus-within:border-blue-500/50 transition-all cursor-text"
  >
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 group-focus-within:text-green-400">
      Enter Amount
    </label>
    <div className="flex items-center gap-6">
      <div className="flex items-center flex-1 gap-4 min-w-0">
        {/* Display currency icon */}
        <div className="w-12 h-12 rounded-full bg-[#1A1D24] flex items-center justify-center overflow-hidden shrink-0">
          <img 
            src={selectedCurrency?.icon} 
            alt={selectedCurrency?.code} 
            className="w-8 h-8 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback to first letter if icon fails to load */}
          <span className="hidden text-lg font-bold text-white">{selectedCurrency?.code?.[0]}</span>
        </div>
        
        {/* Amount input field */}
        <input
          ref={inputRef}
          type="text"
          value={Number(amount).toLocaleString()}
          onChange={handleAmountChange}
          className="text-5xl font-bold text-white bg-transparent outline-none w-full"
          placeholder="0"
        />
      </div>
      
      {/* Plus and minus buttons to adjust amount */}
      <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
        <StepButton type="plus" onClick={() => adjustAmount(1)} />
        <StepButton type="minus" onClick={() => adjustAmount(-1)} />
      </div>
    </div>
  </div>
);

export default AmountInput;