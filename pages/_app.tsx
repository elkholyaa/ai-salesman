/**
 * File: pages/_app.tsx
 * Purpose: Custom App component for the Pages Router.
 * Role: Imports global CSS, wraps every page with a common header, and provides a consistent layout.
 * Overview: This file serves as the root component for all pages. It imports global styles and wraps pages with the Header component for navigation.
 * Integration: The Header component is included here to provide navigation links across the application.
 */

import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
