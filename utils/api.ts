/**
 * File: utils/api.ts
 * Purpose: Handle API calls to the AI chatbot backend.
 * Role: This module exports a function to send messages to the AI chatbot API endpoint.
 *       It abstracts the HTTP request logic, making it reusable and easier to maintain.
 * Integration: The useChat hook (and potentially other modules) will import and use this function to perform API calls.
 * Workflow: The sendChatMessage function accepts a message string, sends it to the /api/chat endpoint,
 *           waits for the response, and returns the AI-generated response as a string.
 * Educational Comments: Abstracting API calls into a separate module promotes code reusability, simplifies error handling,
 *                       and makes it easier to update the API logic in a single place.
 */

export async function sendChatMessage(message: string): Promise<string> {
    try {
      // Make a POST request to the /api/chat endpoint with the provided message.
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
  
      // Check if the response is successful.
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      // Parse the JSON response.
      const data = await res.json();
      return data.response;
    } catch (error) {
      console.error('Error in sendChatMessage:', error);
      return 'Error: Unable to get response from the AI service.';
    }
  }
  