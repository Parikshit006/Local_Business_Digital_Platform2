import React, { useState } from 'react';
import { useAssistant } from './AssistantProvider';

export default function AssistantInput() {
  const [text, setText] = useState('');
  const { handleMessage, typing } = useAssistant();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || typing) return;
    
    handleMessage(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100 z-10">
      <div className="relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={typing}
          placeholder="Type your message..."
          className="w-full bg-slate-50 border border-slate-200 text-sm rounded-full pl-4 pr-12 py-3 outline-none focus:border-[#1DB887] focus:ring-1 focus:ring-[#1DB887] transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!text.trim() || typing}
          className="absolute right-2 w-8 h-8 flex items-center justify-center bg-[#1DB887] text-white rounded-full hover:bg-[#159a70] disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">send</span>
        </button>
      </div>
      <div className="text-center mt-2">
        <span className="text-[10px] text-slate-400">Powered by LocalBoost AI</span>
      </div>
    </form>
  );
}
