/**
 * File: components/ChatInterface.tsx
 * Purpose: Render the interactive chat interface.
 * Role: Displays conversation history, handles user input, and simulates bot responses.
 * Workflow: 
 *   - Uses the custom hook `useConversation` to manage chat state.
 *   - Renders a chat window showing the conversation.
 *   - Handles form submission to add a user message and simulate a bot reply.
 * Integration: Receives demo-specific configuration (title, themeColor, defaultContext) via props to style the interface and provide context.
 */

import React, { useState, FormEvent } from 'react';
import { useConversation } from '../hooks/useConversation';
import { ChatMessage } from '../types/chat';
import { v4 as uuidv4 } from 'uuid';

interface ChatInterfaceProps {
  title: string;
  themeColor: string;
  defaultContext: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ title, themeColor, defaultContext }) => {
  const { messages, addMessage } = useConversation();
  const [input, setInput] = useState('');

  // This function simulates a bot response by echoing the user's message.
  // In a full implementation, this could be replaced with an API call to OpenAI.
  const simulateBotResponse = (userMessage: string) => {
    return `Echo: ${userMessage}`;
  };

  // Handles form submission when the user sends a message.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty messages

    // Create a chat message object for the user's message.
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    // Add the user's message to the conversation.
    addMessage(userMessage);

    // Create a bot message object with a simulated response.
    const botMessage: ChatMessage = {
      id: uuidv4(),
      content: simulateBotResponse(input),
      sender: 'bot',
      timestamp: new Date(),
    };

    // Simulate a delay for the bot response to mimic real-world API behavior.
    setTimeout(() => {
      addMessage(botMessage);
    }, 500);

    // Clear the input field after sending the message.
    setInput('');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Display the chat title using the provided theme color */}
      <h1 style={{ color: themeColor }} className="text-2xl font-bold mb-4">
        {title}
      </h1>
      {/* Chat window displaying the conversation history */}
      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded ${
              msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'
            }`}
          >
            <p>{msg.content}</p>
            <small className="text-gray-500">{msg.timestamp.toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      {/* Form for user input */}
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border rounded-l p-2 focus:outline-none"
        />
        <button
          type="submit"
          style={{ backgroundColor: themeColor }}
          className="px-4 py-2 rounded-r text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
