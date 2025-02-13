/**
 * File: pages/_app.tsx
 * Purpose: Custom App component that wraps every page with global providers and imports global styles.
 * Role: Imports Tailwind CSS, includes a common header for navigation, and now wraps the app with ChatHistoryProvider
 *       so that the chat history persists across pages.
 * Overview: By wrapping the app with ChatHistoryProvider, components can access the persistent chat history context.
 */

import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import { ChatHistoryProvider } from '../context/ChatHistoryContext';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ChatHistoryProvider>
      <Header />
      <Component {...pageProps} />
    </ChatHistoryProvider>
  );
}

export default MyApp;
