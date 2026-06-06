import React, { useEffect, useRef } from 'react';
import { useAssistant } from './AssistantProvider';

export default function AssistantMessages() {
  const { messages, typing } = useAssistant();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const renderContent = (content) => {
    // Basic text formatting for bolding and lists if needed, 
    // or just render split by newline for paragraphs.
    return content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i !== content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scroll-smooth flex flex-col">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex max-w-[85%] ${msg.role === 'user' ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}>
          {msg.role === 'assistant' && (
            <img src="/unnati-mascot.png" alt="Unnati" className="w-6 h-6 rounded-full mr-2 self-end mb-1 object-cover" onError={(e) => { e.target.style.display='none' }} />
          )}
          
          <div className={`p-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
            msg.role === 'user' 
              ? 'bg-[#1DB887] text-white rounded-br-none' 
              : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
          }`}>
            {renderContent(msg.content)}
          </div>
        </div>
      ))}
      
      {typing && (
        <div className="flex max-w-[85%] mr-auto justify-start">
          <img src="/unnati-mascot.png" alt="Unnati" className="w-6 h-6 rounded-full mr-2 self-end mb-1 object-cover" onError={(e) => { e.target.style.display='none' }} />
          <div className="p-4 rounded-2xl bg-white border border-slate-100 rounded-bl-none shadow-sm flex items-center gap-1.5 h-10">
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
      
      <div ref={bottomRef} />
    </div>
  );
}
