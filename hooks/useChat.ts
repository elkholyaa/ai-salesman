/**
 * File: hooks/useChat.ts
 * Purpose: Custom hook to interact with the AI chatbot API.
 * Role: This hook abstracts the logic for sending messages to the chatbot endpoint and receiving AI-generated responses.
 *       It provides a simple interface (sendMessage) that can be used in place of simulated responses.
 * Integration: The hook can be integrated into the Chatbot component (or any other component) to replace the simulated response function.
 * Workflow: When sendMessage is called with a message string, it sends a POST request to the /api/chat endpoint,
 *           waits for the response, and returns the AI-generated message.
 * Educational Comments: Encapsulating the API call in a hook improves modularity and makes it easy to swap out or update
 *                       the underlying API integration without changing the UI components.
 */

import { useState } from 'react';

export const useChat = () => {
  // State to indicate whether the request is currently loading.
  const [loading, setLoading] = useState(false);

  /**
   * Sends a message to the chatbot API and returns the response.
   * @param message - The message to send to the AI chatbot.
   * @returns A Promise that resolves to the AI-generated response as a string.
   */
  const sendMessage = async (message: string): Promise<string> => {
    setLoading(true);
    try {
      // Make a POST request to the /api/chat endpoint.
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
      // Parse the JSON response.
      const data = await res.json();
      return data.response;
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      return "Error: Unable to get response.";
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
