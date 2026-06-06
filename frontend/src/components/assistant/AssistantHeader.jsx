import React from 'react';
import { useAssistant } from './AssistantProvider';

export default function AssistantHeader() {
  const { toggleAssistant, resetChat } = useAssistant();

  return (
    <div className="bg-[#1B2A5E] text-white p-4 rounded-t-2xl flex items-center justify-between shadow-md shrink-0 z-10 relative">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-white/20">
            <img src="/unnati-mascot.png" alt="Unnati" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=U&background=1DB887&color=fff"; }} />
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#1B2A5E] rounded-full"></span>
        </div>
        <div>
          <h3 className="font-bold text-sm">Unnati</h3>
          <p className="text-xs text-white/70">LocalBoost Growth Companion</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button 
          onClick={resetChat}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          title="Restart Conversation"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
        </button>
        <button 
          onClick={toggleAssistant}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
    </div>
  );
}
