import React, { createContext, useContext, useState, useCallback } from 'react';
import { INITIAL_MESSAGE, QUICK_ACTIONS, FLOWS } from './assistantConfig';
import { useNavigate } from 'react-router-dom';

const AssistantContext = createContext(null);

export function AssistantProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [typing, setTyping] = useState(false);
  const [quickActions, setQuickActions] = useState(QUICK_ACTIONS);
  const navigate = useNavigate();

  const toggleAssistant = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const addMessage = useCallback((role, content) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      role,
      content,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const handleMessage = useCallback((content) => {
    // 1. Add user message
    addMessage('user', content);
    
    // 2. Hide quick actions once conversation starts
    setQuickActions([]);
    
    // 3. Simulate AI processing (Future API integration replaces this timeout)
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMessage('assistant', "AI features are coming soon. For now please use the guided options above or navigate the platform.");
    }, 1500);
  }, [addMessage]);

  const handleActionClick = useCallback((action) => {
    // Hide default actions
    setQuickActions([]);
    
    // Log user choice
    addMessage('user', action.label);
    
    setTyping(true);
    
    setTimeout(() => {
      setTyping(false);
      
      const flow = FLOWS[action.id];
      if (flow) {
        // Send assistant prompt
        addMessage('assistant', flow.assistantMessage);
        // Show new sub-actions
        setQuickActions(flow.options);
      } else if (action.route) {
        // It's a routing action
        setIsOpen(false);
        navigate(action.route);
        // Reset to default after navigation
        setTimeout(() => setQuickActions(QUICK_ACTIONS), 300);
      } else if (action.action) {
        // External link (mailto, tel)
        window.location.href = action.action;
        setQuickActions(QUICK_ACTIONS);
      }
    }, 800);
  }, [addMessage, navigate]);

  const value = {
    isOpen,
    setIsOpen,
    toggleAssistant,
    messages,
    typing,
    quickActions,
    handleMessage,
    handleActionClick,
    resetChat: () => {
      setMessages([INITIAL_MESSAGE]);
      setQuickActions(QUICK_ACTIONS);
    }
  };

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  );
}

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};
