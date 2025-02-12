/**
 * File: types/chat.ts
 * Purpose: Define TypeScript types for chat messages.
 * Role: Provides consistent type definitions (ChatMessage) used across the app.
 * Workflow: This file exports types that are used both on the client-side (UI components, hooks) and on the server-side (API routes) to ensure type safety and consistency.
 */

export interface ChatMessage {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }
  