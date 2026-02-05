const StepButton = ({ onClick, type }) => {
  const isPlus = type === 'plus';

  // Different styling for plus (+) and minus (-) buttons
  const variants = {
    plus: "hover:border-green-500/50 hover:bg-green-500/10 text-gray-400 hover:text-green-400",
    minus: "hover:border-red-500/50 hover:bg-red-500/10 text-gray-400 hover:text-red-400"
  };

  return (
    <button
      onClick={onClick}
      className={`w-12 h-10 flex items-center justify-center rounded-xl bg-[#181A20] border border-[#2A2D35] transition-all active:scale-90 shadow-sm ${variants[type]}`}
      aria-label={isPlus ? "Increase" : "Decrease"}
    >
      {/* Display + or - icon */}
      {isPlus ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
        </svg>
      )}
    </button>
  );
};

export default StepButton;