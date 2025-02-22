/**
 * File: components/Chatbot.tsx
 * Purpose: Main floating chatbot UI for the Chatbot Branch ("bot") with integrated API calls for AI explanations.
 * Role: This component renders a floating chatbot window that can be toggled open/closed.
 *       It listens to the global ChatbotContext for any selected technical specification and, if present,
 *       automatically opens the chatbot and sends an explanation request for that spec.
 *       It also integrates the ExplanationOptions component to allow interactive follow-up requests.
 * Integration: Uses the global ChatHistoryContext for conversation management and ChatbotContext for specification selection.
 *              The useChat hook is used to send messages to the AI chatbot API endpoint, replacing simulated responses.
 * Workflow: When a user clicks an emoji in the TechnicalSpecsList, the selected spec is stored in ChatbotContext.
 *           The component detects this change, opens the chatbot, sends an explanation request via the API,
 *           stores the spec context for later follow-ups, and resets the selected spec.
 *           When a follow-up option is clicked, the stored spec context is used to provide additional details.
 * Educational Comments: Introducing a dedicated state for the current spec context helps preserve detail for follow-up
 *                       requests, ensuring the chatbot has sufficient context to generate a comprehensive response.
 */

import React, { useState, FormEvent, useEffect, useContext } from 'react';
import { useConversation } from '../hooks/useConversation';
import { ChatMessage } from '../types/chat';
import { v4 as uuidv4 } from 'uuid';
import { ChatbotContext } from '../context/ChatbotContext';
import ExplanationOptions from '../components/ExplanationOptions';
import { useChat } from '../hooks/useChat';

const Chatbot: React.FC = () => {
  // Retrieve chat messages and update functions from the global conversation context.
  const { messages, addMessage, clearConversation } = useConversation();

  // Local state for user input and controlling the chatbot window visibility.
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Retrieve the selected specification and its setter from the Chatbot context.
  const { selectedSpec, setSelectedSpec } = useContext(ChatbotContext);

  // New state to store the context of the currently explained spec.
  const [currentSpecContext, setCurrentSpecContext] = useState('');

  // Import sendMessage function and loading state from the useChat hook.
  const { sendMessage } = useChat();

  // Toggle the chatbot window open/closed.
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Handle sending a new message from the input field.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Create a chat message for the user.
    const userMsg: ChatMessage = {
      id: uuidv4(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    addMessage(userMsg);

    // Send the user's message to the AI chatbot API.
    const response = await sendMessage(input);
    const botMsg: ChatMessage = {
      id: uuidv4(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
    };
    addMessage(botMsg);

    // Clear the input field.
    setInput('');
  };

  // Effect to listen for changes in the selected specification.
  // When a spec is selected, automatically open the chatbot, send an explanation request,
  // and store the spec context for follow-up requests.
  useEffect(() => {
    if (selectedSpec) {
      // Open the chatbot if not already open.
      if (!isOpen) {
        setIsOpen(true);
      }
      // Build the explanation request using the selected spec details.
      const request = `Explain ${selectedSpec.title}: ${selectedSpec.specDetails}`;
      // Store the request string in currentSpecContext for future follow-up requests.
      setCurrentSpecContext(request);
      const userMsg: ChatMessage = {
        id: uuidv4(),
        content: request,
        sender: 'user',
        timestamp: new Date(),
      };
      addMessage(userMsg);

      // Use the useChat hook to send the explanation request to the API.
      sendMessage(request).then(response => {
        const botMsg: ChatMessage = {
          id: uuidv4(),
          content: response,
          sender: 'bot',
          timestamp: new Date(),
        };
        addMessage(botMsg);
      });

      // Reset the selected spec so this effect only runs once per selection.
      setSelectedSpec(null);
    }
  }, [selectedSpec, isOpen, addMessage, setSelectedSpec, sendMessage]);

  // Callback to handle follow-up option selection.
  const handleExplanationOption = async (option: string) => {
    // If we have stored context, include it in the follow-up request.
    const baseRequest = currentSpecContext || "the current spec";
    const request = `Please provide a ${option} explanation for the following spec: ${baseRequest}`;
    const userMsg: ChatMessage = {
      id: uuidv4(),
      content: request,
      sender: 'user',
      timestamp: new Date(),
    };
    addMessage(userMsg);

    // Send the follow-up request to the AI chatbot API.
    const response = await sendMessage(request);
    const botMsg: ChatMessage = {
      id: uuidv4(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
    };
    addMessage(botMsg);
  };

  return (
    <>
      {/* Floating toggle button to open/close the chatbot window.
          This button is always visible in the bottom-right corner. */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        <span role="img" aria-label="Chatbot">🤖</span>
      </button>

      {/* Render the floating chatbot window only when isOpen is true. */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {/* Chatbot header with title and close button */}
          <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
            <h2 className="text-lg">AI Sales Chat</h2>
            <button onClick={toggleChatbot} className="text-white focus:outline-none">
              ✖
            </button>
          </div>

          {/* Chat messages container */}
          <div className="p-4 h-64 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <p className="text-gray-500">No conversation yet. Start chatting!</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-2 p-2 rounded ${msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'}`}
                >
                  <p>{msg.content}</p>
                  <small className="text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
              ))
            )}
          </div>

          {/* Message input form */}
          <form onSubmit={handleSubmit} className="px-4 py-2 border-t">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border rounded-l px-2 py-1 focus:outline-none"
              />
              <button type="submit" className="bg-blue-500 text-white rounded-r px-3 py-1 hover:bg-blue-600 focus:outline-none">
                Send
              </button>
            </div>
          </form>

          {/* Render ExplanationOptions for interactive follow-up requests */}
          <ExplanationOptions onOptionSelect={handleExplanationOption} />

          {/* Option to clear chat history */}
          <div className="px-4 py-2">
            <button onClick={clearConversation} className="text-red-500 hover:underline focus:outline-none">
              Clear History
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
