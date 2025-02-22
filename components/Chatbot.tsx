/**
 * File: components/Chatbot.tsx
 * Purpose: Main floating chatbot UI for the Chatbot Branch ("bot") with integrated API calls, auto scroll,
 *          and refined animations for new chat messages.
 * Role: This component renders a floating chatbot window that opens automatically when a technical specification
 *       is selected. It sends explanation requests via the API and supports follow-up options.
 * Integration: Uses ChatHistoryContext for conversation management, ChatbotContext for spec selection, and the
 *              useChat hook for API integration.
 * Workflow: When a user clicks an emoji in the TechnicalSpecsList, the selected spec is stored in ChatbotContext.
 *           The component opens, sends an explanation request, stores the current spec context, and resets the selection.
 *           New chat messages fade in, and the container automatically scrolls to show the latest messages.
 * Educational Comments: Adding automatic scroll and subtle animations improves the user experience by ensuring that
 *                       new messages are immediately visible and presented in a polished manner.
 */

import React, { useState, FormEvent, useEffect, useContext, useRef } from 'react';
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

  // Import sendMessage function from the useChat hook.
  const { sendMessage } = useChat();

  // Ref for the messages container to enable auto scroll.
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // Effect to automatically scroll the messages container to the bottom when messages change.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Effect to listen for changes in the selected specification.
  // When a spec is selected, automatically open the chatbot, send an explanation request,
  // and store the spec context for follow-up requests.
  useEffect(() => {
    if (selectedSpec) {
      if (!isOpen) {
        setIsOpen(true);
      }
      const request = `Explain ${selectedSpec.title}: ${selectedSpec.specDetails}`;
      setCurrentSpecContext(request);
      const userMsg: ChatMessage = {
        id: uuidv4(),
        content: request,
        sender: 'user',
        timestamp: new Date(),
      };
      addMessage(userMsg);

      sendMessage(request).then(response => {
        const botMsg: ChatMessage = {
          id: uuidv4(),
          content: response,
          sender: 'bot',
          timestamp: new Date(),
        };
        addMessage(botMsg);
      });
      setSelectedSpec(null);
    }
  }, [selectedSpec, isOpen, addMessage, setSelectedSpec, sendMessage]);

  // Callback to handle follow-up option selection.
  const handleExplanationOption = async (option: string) => {
    const baseRequest = currentSpecContext || "the current spec";
    const request = `Please provide a ${option} explanation for the following spec: ${baseRequest}`;
    const userMsg: ChatMessage = {
      id: uuidv4(),
      content: request,
      sender: 'user',
      timestamp: new Date(),
    };
    addMessage(userMsg);

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
      {/* Floating toggle button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        <span role="img" aria-label="Chatbot">🤖</span>
      </button>

      {/* Chatbot window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {/* Header */}
          <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
            <h2 className="text-lg">AI Sales Chat</h2>
            <button onClick={toggleChatbot} className="text-white focus:outline-none">
              ✖
            </button>
          </div>

          {/* Chat messages container with refined fade-in animation */}
          <div className="p-4 h-64 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <p className="text-gray-500">No conversation yet. Start chatting!</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-2 p-2 rounded transition-all duration-500 ease-out
                    ${msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-green-100 text-left opacity-0 animate-fadeIn'}`}
                >
                  <p>{msg.content}</p>
                  <small className="text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
              ))
            )}
            {/* Sentinel element for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
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

          {/* Follow-up options */}
          <ExplanationOptions onOptionSelect={handleExplanationOption} />

          {/* Clear history option */}
          <div className="px-4 py-2">
            <button onClick={clearConversation} className="text-red-500 hover:underline focus:outline-none">
              Clear History
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s forwards;
        }
      `}</style>
    </>
  );
};

export default Chatbot;
