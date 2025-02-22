/**
 * File: pages/_app.tsx
 * Purpose: Custom App component that wraps every page with global providers and imports global styles.
 * Role: Provides a common layout including the global header and chat history provider, ensuring that all pages have access
 *       to the persistent chat state. This updated file also integrates the floating Chatbot UI (imported as Chatbot) so that
 *       the chatbot (with the 🤖 emoji trigger) is visible on every page.
 * Integration: The app is now wrapped with both ChatHistoryProvider and ChatbotProvider so that the ChatbotContext is available.
 * Educational Comments: Wrapping the app with ChatbotProvider ensures that when a specification is selected (via the emoji click),
 *                       the Chatbot component will receive the context update, open automatically, and submit an explanation request.
 */

import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import { ChatHistoryProvider } from '../context/ChatHistoryContext';
import { ChatbotProvider } from '../context/ChatbotContext';
import Chatbot from '../components/Chatbot';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ChatHistoryProvider>
      <ChatbotProvider>
        {/* Global header visible on every page */}
        <Header />
        {/* Main page content */}
        <Component {...pageProps} />
        {/* Floating Chatbot UI added globally so it appears on every page */}
        <Chatbot />
      </ChatbotProvider>
    </ChatHistoryProvider>
  );
}

export default MyApp;
