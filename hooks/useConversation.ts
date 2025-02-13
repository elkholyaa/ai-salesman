/**
 * File: hooks/useConversation.ts
 * Purpose: Provide a hook to access the global chat history context.
 * Role: This hook wraps the useContext hook to give components (e.g., ChatInterface) access to chat messages and update functions.
 * Overview: By using the global context, chat interactions persist across spec selections and page navigations.
 */

import { useContext } from 'react';
import { ChatHistoryContext } from '../context/ChatHistoryContext';

export const useConversation = () => {
  return useContext(ChatHistoryContext);
};
