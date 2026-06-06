import React from 'react';
import AssistantHeader from './AssistantHeader';
import AssistantMessages from './AssistantMessages';
import AssistantQuickActions from './AssistantQuickActions';
import AssistantInput from './AssistantInput';
import './assistantStyles.css';

export default function AssistantPanel({ embedded = false }) {
  // If embedded is true, we strip out absolute positioning so it can live naturally in a page.
  
  return (
    <div className={`flex flex-col bg-white overflow-hidden shadow-2xl AssistantPanel-container ${embedded ? 'w-full h-full rounded-2xl border border-slate-200' : 'fixed bottom-24 right-6 w-[380px] h-[600px] max-h-[80vh] rounded-2xl z-50 AssistantPanel-slide-in'}`}>
      <AssistantHeader />
      <AssistantMessages />
      <AssistantQuickActions />
      <AssistantInput />
    </div>
  );
}
