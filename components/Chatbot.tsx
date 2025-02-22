/**
 * File: components/Chatbot.tsx
 * Purpose: Main floating chatbot UI for the Chatbot Branch ("bot") with integrated spec explanation functionality.
 * Role: This component renders a floating chatbot window that can be toggled open/closed.
 *       It listens to the global ChatbotContext for any selected technical specification and, if present,
 *       automatically opens the chatbot and sends an explanation request for that spec.
 * Integration: Uses the global ChatHistoryContext for conversation management and ChatbotContext for specification selection.
 *              It is rendered globally (via pages/_app.tsx) so that it appears on every page.
 * Workflow: When a user clicks an emoji (from TechnicalSpecsList), the selected spec is stored in ChatbotContext.
 *           This component's useEffect detects the change, opens the chatbot, adds a user message for the request,
 *           simulates an AI response, and then resets the selected spec.
 * Educational Comments: Integrating context in this way decouples UI from interaction logic, making maintenance and testing easier.
 */

import React, { useState, FormEvent, useEffect, useContext } from 'react';
import { useConversation } from '../hooks/useConversation';
import { ChatMessage } from '../types/chat';
import { v4 as uuidv4 } from 'uuid';
import { ChatbotContext } from '../context/ChatbotContext';

const Chatbot: React.FC = () => {
  // Retrieve chat messages and update functions from the global conversation context.
  const { messages, addMessage, clearConversation } = useConversation();
  
  // Local state for user input and controlling the chatbot window visibility.
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Retrieve the selected specification and its setter from the Chatbot context.
  const { selectedSpec, setSelectedSpec } = useContext(ChatbotContext);

  // Function to simulate a bot response.
  const simulateBotResponse = (userMessage: string): string => {
    // For the POC, simply echo the user's message.
    return `Echo: ${userMessage}`;
  };

  // Toggle the chatbot window open/closed.
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Handle sending a new message from the input field.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Create a chat message for the user.
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    // Add the user's message to the conversation.
    addMessage(userMessage);

    // Create a simulated bot response message.
    const botMessage: ChatMessage = {
      id: uuidv4(),
      content: simulateBotResponse(input),
      sender: 'bot',
      timestamp: new Date(),
    };

    // Simulate a slight delay before the bot responds.
    setTimeout(() => {
      addMessage(botMessage);
    }, 500);

    // Clear the input field.
    setInput('');
  };

  // Effect to listen for changes in the selected specification.
  // When a spec is selected, automatically open the chatbot and submit an explanation request.
  useEffect(() => {
    if (selectedSpec) {
      // Open the chatbot if not already open.
      if (!isOpen) {
        setIsOpen(true);
      }
      // Create a message to ask for an explanation for the selected spec.
      const request = `Explain ${selectedSpec.title}: ${selectedSpec.specDetails}`;
      const userMsg: ChatMessage = {
        id: uuidv4(),
        content: request,
        sender: 'user',
        timestamp: new Date(),
      };
      addMessage(userMsg);

      // Simulate a bot response for the explanation request.
      const botMsg: ChatMessage = {
        id: uuidv4(),
        content: simulateBotResponse(request),
        sender: 'bot',
        timestamp: new Date(),
      };
      setTimeout(() => {
        addMessage(botMsg);
      }, 500);

      // Reset the selected spec so this effect only runs once per selection.
      setSelectedSpec(null);
    }
    // We include isOpen in the dependency array to ensure the window opens if needed.
  }, [selectedSpec, isOpen, addMessage, setSelectedSpec]);

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
