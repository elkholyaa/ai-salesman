/**
 * File: components/ChatInterface.tsx
 * Purpose: Render the interactive chat interface.
 * Role: Displays conversation history, handles user input, and simulates bot responses.
 * Integration: Uses the useConversation hook and demo configuration props.
 * 
 * Note: The "defaultContext" prop is now used to display an initial bot message.
 */

import React, { useState, FormEvent, useEffect } from 'react';
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

  // Simulate bot response by echoing the user's message.
  const simulateBotResponse = (userMessage: string) => {
    return `Echo: ${userMessage}`;
  };

  // On initial mount, add the default context as a bot message if no messages exist.
  useEffect(() => {
    if (messages.length === 0 && defaultContext) {
      const initialMessage: ChatMessage = {
        id: uuidv4(),
        content: defaultContext,
        sender: 'bot',
        timestamp: new Date(),
      };
      addMessage(initialMessage);
    }
    // We intentionally run this effect only once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle sending a message.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    addMessage(userMessage);

    const botMessage: ChatMessage = {
      id: uuidv4(),
      content: simulateBotResponse(input),
      sender: 'bot',
      timestamp: new Date(),
    };

    // Simulate delay for bot response.
    setTimeout(() => addMessage(botMessage), 500);
    setInput('');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 style={{ color: themeColor }} className="text-2xl font-bold mb-4">
        {title}
      </h1>
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
