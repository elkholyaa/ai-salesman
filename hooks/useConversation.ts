/**
 * File: hooks/useConversation.ts
 * Purpose: Manage the chat conversation state.
 * Role: Provides a custom hook to add, display, and clear chat messages.
 * Workflow: This hook maintains an array of chat messages and exposes functions to update or reset the conversation state. It is used by the ChatInterface component to keep track of the conversation.
 */

import { useState } from 'react';
import { ChatMessage } from '../types/chat';

export const useConversation = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Function to add a new message to the conversation state.
  const addMessage = (message: ChatMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Function to clear the entire conversation.
  const clearConversation = () => {
    setMessages([]);
  };

  return { messages, addMessage, clearConversation };
};
