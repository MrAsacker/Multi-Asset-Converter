import { useState, useMemo, useEffect } from 'react';
import { currencies } from '../src/lib/currencies';

const AssetSelector = ({ asset, setAsset, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('fiat');

  // When modal opens, sync the active tab to the current asset type
  useEffect(() => {
    if (isOpen && asset?.type) {
      setActiveTab(asset.type);
    }
  }, [isOpen]);

  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Filter currencies based on selected tab and search query
  const filteredOptions = useMemo(() => {
    if (!currencies || !Array.isArray(currencies)) {
      console.error('Currencies is not an array:', currencies);
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    
    // Return only currencies that match both the type AND the search query
    return currencies.filter(c => {
      const typeMatch = c.type === activeTab;
      const searchMatch = !query || 
        c.code?.toLowerCase().includes(query) || 
        c.name?.toLowerCase().includes(query);
      
      return typeMatch && searchMatch;
    });
  }, [activeTab, searchQuery]);

  if (!asset) return null;

  return (
    <>
      {/* Asset selection card - shows current selection and opens modal on click */}
      <div 
        onClick={() => setIsOpen(true)}
        className="flex-1 bg-[#0F1115] p-6 rounded-[2.5rem] border border-[#2A2D35] flex flex-col gap-4 cursor-pointer hover:border-blue-500/30 transition-all group"
      >
        {/* Asset label and type badge */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{label}</span>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
            asset.type === 'crypto' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'
          }`}>
            {asset.type?.toUpperCase()}
          </span>
        </div>

        {/* Asset icon and details */}
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner p-2 ${
            asset.type === 'crypto' ? 'bg-orange-500/10' : 'bg-blue-500/10'
          }`}>
            {asset.icon ? (
              <img src={asset.icon} alt={asset.code} className="w-full h-full object-contain" />
            ) : (
              <span className="text-xl font-bold">{asset.code?.[0]}</span>
            )}
          </div>

          <div className="text-left flex-1">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-white">{asset.code}</span>
              <svg className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[10px] text-gray-500 font-bold uppercase truncate block max-w-30">
              {asset.name}
            </span>
          </div>
        </div>
      </div>

      {/* Modal for selecting currencies */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Dark background overlay - click to close */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="bg-[#181A20] w-full max-w-md rounded-3xl border border-[#2A2D35] shadow-2xl relative flex flex-col max-h-[85vh]">
            
            <div className="p-6 pb-4 shrink-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Select Asset</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-[#2A2D35] rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative mb-4">
                <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text"
                  placeholder="Search name or code..."
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0F1115] border border-[#2A2D35] text-white rounded-xl py-3 pl-12 pr-10 focus:ring-2 focus:ring-blue-600 outline-none placeholder-gray-600 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 p-1 text-gray-500 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Tabs */}
              <div className="flex bg-[#0F1115] p-1 rounded-xl">
                <button 
                  type="button"
                  onClick={() => {
                    setActiveTab('fiat');
                    setSearchQuery('');
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'fiat' 
                      ? 'bg-[#2A2D35] text-white shadow-lg' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Fiat ({currencies.filter(c => c.type === 'fiat').length})
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setActiveTab('crypto');
                    setSearchQuery('');
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'crypto' 
                      ? 'bg-[#2A2D35] text-white shadow-lg' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Crypto ({currencies.filter(c => c.type === 'crypto').length})
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-2 min-h-0">
              <div className="text-xs text-gray-600 px-3 mb-2">
                Showing: {activeTab} • Found: {filteredOptions.length}
              </div>
              
              {filteredOptions.length > 0 ? (
                <div className="space-y-1">
                  {filteredOptions.map((currency) => {
                    const isSelected = asset.code === currency.code && asset.type === currency.type;
                    return (
                      <button
                        key={`${currency.type}-${currency.code}`}
                        onClick={() => {
                          setAsset(currency);
                          setIsOpen(false);
                          setSearchQuery('');
                        }}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                          isSelected 
                            ? 'bg-blue-600/20 border border-blue-500/50' 
                            : 'hover:bg-[#2A2D35] border border-transparent'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#0F1115] p-1.5 flex items-center justify-center shrink-0 border border-[#2A2D35]">
                          <img 
                            src={currency.icon} 
                            alt={currency.code} 
                            className="w-full h-full object-contain rounded-full"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://placehold.co/40x40/2A2D35/FFF?text=${currency.code}`;
                            }}
                          />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-white font-bold">{currency.code}</span>
                            <span className="text-[10px] text-gray-500 uppercase">{currency.type}</span>
                          </div>
                          <span className="text-gray-500 text-xs truncate block">{currency.name}</span>
                        </div>
                        {isSelected && (
                          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No {activeTab} currencies found</p>
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-blue-500 text-sm mt-2 hover:underline"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssetSelector;