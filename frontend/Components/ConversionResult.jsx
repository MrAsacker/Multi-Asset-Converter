
/**
 * ConversionResult Component
 * 
 * This component displays the converted amount and when it was last updated.
 * It shows "---" as a placeholder if user hasn't clicked Convert yet.
 */

const ConversionResult = ({ 
  value,           // The calculated converted amount (or 0 if not converted)
  assetCode,       // Currency code to display (e.g., "INR")
  formatResult,    // Function to format the number nicely
  lastUpdated,     // Date object of when rates were fetched
  hasConverted     // Boolean: did user click Convert button?
}) => (
    <div className="text-center">
        {/* Label above the result */}
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">
            Converted Amount
        </p>
        
        {/* Main result display: number + currency code */}
        <div className="flex items-baseline justify-center gap-3">
            <div className="text-5xl font-black text-white tracking-tighter">
                {/* 
                  IMPORTANT: Show "---" if user hasn't clicked Convert
                  This prevents showing outdated calculations while typing
                */}
                {hasConverted ? formatResult(value) : "---"}
            </div>
            <span className="text-2xl text-gray-500 font-bold">{assetCode}</span>
        </div>
        
        {/* 
          Show timestamp only if:
          1. User has clicked Convert (hasConverted is true)
          2. We have a lastUpdated date
        */}
        {hasConverted && lastUpdated && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                {/* Clock icon */}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                
                {/* Formatted time and date */}
                <span>
                    Last Updated  {lastUpdated.toLocaleTimeString('en-IN', {
                        timeZone: 'Asia/Kolkata',  // Indian timezone
                        hour: '2-digit',           // 02 (not 2)
                        minute: '2-digit',         // 30
                        second: '2-digit',         // 45
                        hour12: true               // PM/AM format
                    })} IST
                </span>
            </div>
        )}
    </div>
);

export default ConversionResult;