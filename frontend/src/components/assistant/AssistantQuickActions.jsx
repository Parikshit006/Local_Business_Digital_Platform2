import React from 'react';
import { useAssistant } from './AssistantProvider';

export default function AssistantQuickActions() {
  const { quickActions, handleActionClick, typing } = useAssistant();

  if (!quickActions || quickActions.length === 0 || typing) {
    return null;
  }

  return (
    <div className="p-4 pt-2 pb-0 flex flex-wrap gap-2 overflow-y-auto max-h-[30vh]">
      {quickActions.map((action) => (
        <button
          key={action.id}
          onClick={() => handleActionClick(action)}
          className="px-4 py-2 bg-white border border-[#1DB887]/30 text-[#1DB887] text-[13px] font-semibold rounded-full hover:bg-[#1DB887] hover:text-white transition-all shadow-sm active:scale-95 text-left"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
