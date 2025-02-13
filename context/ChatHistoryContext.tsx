/**
 * File: context/ChatHistoryContext.tsx
 * Purpose: Provide a global context for storing and managing the chat history across the application.
 * Role: This context holds chat messages (both user and bot) so that interactions persist across spec selections
 *       and page navigations. It exposes functions to add new messages and clear the conversation.
 * Overview: The ChatHistoryProvider wraps the application and makes the chat history available to any component
 *           (e.g., ChatInterface and ChatHistory) that needs access.
 */

import React, { createContext, useState } from 'react';
import { ChatMessage } from '../types/chat';

// Define the shape of our chat history context.
interface ChatHistoryContextType {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearConversation: () => void;
}

// Create the context with default empty implementations.
export const ChatHistoryContext = createContext<ChatHistoryContextType>({
  messages: [],
  addMessage: () => {},
  clearConversation: () => {},
});

// Provider component that wraps the app and provides chat history.
export const ChatHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Adds a new chat message to the global state.
  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  // Clears the entire conversation.
  const clearConversation = () => {
    setMessages([]);
  };

  return (
    <ChatHistoryContext.Provider value={{ messages, addMessage, clearConversation }}>
      {children}
    </ChatHistoryContext.Provider>
  );
};
