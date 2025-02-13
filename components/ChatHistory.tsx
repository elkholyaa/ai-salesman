/**
 * File: components/ChatHistory.tsx
 * Purpose: Display the global history of chatbot interactions.
 * Role: Renders a list of chat messages (both user and bot) from the global chat history context.
 * Overview: This component allows users to review past chatbot interactions even when switching between different specs.
 */

import React from 'react';
import { useConversation } from '../hooks/useConversation';

const ChatHistory: React.FC = () => {
  const { messages, clearConversation } = useConversation();

  return (
    <div className="max-w-xl mx-auto p-4 my-4 border rounded bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Chat History</h2>
      {messages.length === 0 ? (
        <p>No chat history available.</p>
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded ${
                msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'
              }`}
            >
              <p>{msg.content}</p>
              <small className="text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</small>
            </div>
          ))}
        </div>
      )}
      {/* Button to clear the chat history */}
      {messages.length > 0 && (
        <button
          onClick={clearConversation}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default ChatHistory;
