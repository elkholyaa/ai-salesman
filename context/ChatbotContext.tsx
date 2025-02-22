/**
 * File: context/ChatbotContext.tsx
 * Purpose: Manage the state for the Chatbot, including the currently selected technical specification.
 * Role: Provides a global context to store and update the selected specification that the chatbot should explain.
 *       This allows components (like TechnicalSpecsList) to trigger the chatbot to open and display explanations.
 * Integration: The Chatbot component and pages like MobileDetailsPage use this context to set and respond to specification selection.
 * Workflow: When a user clicks the emoji in the TechnicalSpecsList, the selected spec is stored here.
 *           The Chatbot component listens for changes and, if a new spec is selected, opens the chat window and sends an explanation request.
 */

import React, { createContext, useState, ReactNode } from 'react';

// Define the type for a technical specification.
export interface Spec {
  title: string;
  specDetails: string;
}

// Define the shape of the Chatbot context.
interface ChatbotContextType {
  selectedSpec: Spec | null;
  setSelectedSpec: (spec: Spec | null) => void;
}

// Create the Chatbot context with default values.
export const ChatbotContext = createContext<ChatbotContextType>({
  selectedSpec: null,
  setSelectedSpec: () => {},
});

// Provider component that wraps the application and provides the Chatbot context.
export const ChatbotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSpec, setSelectedSpec] = useState<Spec | null>(null);

  return (
    <ChatbotContext.Provider value={{ selectedSpec, setSelectedSpec }}>
      {children}
    </ChatbotContext.Provider>
  );
};
