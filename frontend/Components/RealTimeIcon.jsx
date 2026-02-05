

import { useState, useEffect } from 'react';

function RealTimeIcon() {
  // Keep track of current time to update every second
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second when component loads
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when component unmounts
    return () => clearInterval(timer);
  }, []);

  // Format time in IST timezone
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Format date in IST timezone
  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col items-center gap-1 mb-2">
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800 rounded-full">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Live {formatTime(currentTime)} · {formatDate(currentTime)}
      </span>

    </div>
  );
}

export default RealTimeIcon;
