/**
 * File: hooks/useChat.ts
 * Purpose: Custom hook to interact with the AI chatbot API.
 * Role: This hook abstracts the logic for sending messages to the AI chatbot backend.
 *       It uses the sendChatMessage function from the utils/api.ts module to perform API calls.
 * Integration: The Chatbot component (and any other component) can use this hook to send messages
 *              to the AI backend and receive responses.
 * Workflow: When sendMessage is called, it sets a loading state, calls sendChatMessage to send the message,
 *           and returns the AI-generated response.
 * Educational Comments: Centralizing API logic in utils/api.ts and using it within a hook enhances code reusability
 *                       and makes it easier to update API integration in the future.
 */

import { useState } from 'react';
import { sendChatMessage } from '../utils/api';

export const useChat = () => {
  // State to indicate if an API request is in progress.
  const [loading, setLoading] = useState(false);

  /**
   * Sends a message to the AI chatbot API using the centralized sendChatMessage function.
   * @param message - The message to be sent.
   * @returns A Promise that resolves to the AI-generated response as a string.
   */
  const sendMessage = async (message: string): Promise<string> => {
    setLoading(true);
    try {
      // Call the API utility function to send the message.
      const response = await sendChatMessage(message);
      return response;
    } catch (error) {
      console.error("Error in useChat sendMessage:", error);
      return "Error: Unable to get response.";
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
