import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAssistant } from './AssistantProvider';
import AssistantPanel from './AssistantPanel';
import './assistantStyles.css';

export default function UnnatiWidget() {
  const { isOpen, toggleAssistant } = useAssistant();
  const location = useLocation();
  const [showTooltip, setShowTooltip] = useState(false);

  // Hide widget on admin / internal routes
  const isHiddenRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/commandcentre');

  // Tooltip logic
  useEffect(() => {
    if (isHiddenRoute || isOpen) {
      setShowTooltip(false);
      return;
    }

    const tooltips = [
      "Need help finding the right service?",
      "Looking to grow your business?",
      "Can I help you explore LocalBoost?"
    ];

    const interval = setInterval(() => {
      // Pick random tooltip
      const randomMsg = tooltips[Math.floor(Math.random() * tooltips.length)];
      // Set text via DOM or state if we wanted, but let's just use state for visibility and maybe static text.
      // For simplicity we just use one generic or update state.
      // We'll keep it simple: just show it.
      setShowTooltip(true);
      
      setTimeout(() => setShowTooltip(false), 5000);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [isHiddenRoute, isOpen]);

  if (isHiddenRoute) return null;

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end justify-end flex-col group">
        
        {/* Tooltip */}
        {!isOpen && showTooltip && (
          <div className="mb-4 bg-white text-slate-800 text-sm font-medium px-4 py-3 rounded-2xl shadow-lg border border-slate-100 relative Assistant-tooltip animate-bounce">
            Need help finding the right service?
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-slate-100 transform rotate-45"></div>
          </div>
        )}

        <button 
          onClick={toggleAssistant}
          className={`relative flex items-center justify-center bg-[#1B2A5E] text-white rounded-full shadow-2xl hover:shadow-[#1DB887]/30 transition-all duration-300 Assistant-widget-btn ${isOpen ? 'w-14 h-14 scale-90' : 'w-16 h-16 hover:scale-110'}`}
        >
          {isOpen ? (
            <span className="material-symbols-outlined text-[28px]">close</span>
          ) : (
            <img src="/unnati-mascot.png" alt="Unnati" className="w-full h-full object-cover rounded-full" onError={(e) => { e.target.style.display='none' }} />
          )}
          
          {/* Breathing glow effect */}
          {!isOpen && <div className="absolute inset-0 rounded-full border-2 border-[#1DB887] Assistant-glow-pulse pointer-events-none"></div>}
        </button>
      </div>

      {/* Render Panel */}
      {isOpen && <AssistantPanel />}
    </>
  );
}
