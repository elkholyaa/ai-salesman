/**
 * File: components/ChatMessage.tsx
 * Purpose: Display an individual chat message within the chatbot UI.
 * Role: This component renders a single chat message, including the message content and its timestamp.
 *       It applies different styling based on the sender (user or bot) to differentiate between message types.
 * Integration: Used by the Chatbot component when mapping over the conversation history to display messages.
 * Workflow: The component accepts a ChatMessage object (from ../types/chat) via props and renders it accordingly.
 * Educational Comments: Isolating chat message rendering into its own component improves code reuse and maintainability,
 *                       allowing easy updates to the chat message styling or structure without modifying the parent components.
 */

import React from 'react';
import { ChatMessage as ChatMessageType } from '../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={`mb-2 p-2 rounded ${
        message.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'
      }`}
    >
      <p>{message.content}</p>
      <small className="text-gray-500">
        {new Date(message.timestamp).toLocaleTimeString()}
      </small>
    </div>
  );
};

export default ChatMessage;
