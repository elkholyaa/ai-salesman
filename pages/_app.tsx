/**
 * File: pages/_app.tsx
 * Purpose: Custom App component for the Pages Router.
 * Role: Imports global CSS and wraps every page in the application.
 * Workflow: This file serves as the root component for all pages. It imports global styles
 *           and passes down the page component along with its props.
 * 
 * Note: Importing React here ensures that the JSX namespace is available, resolving the error
 *       "Cannot find namespace 'JSX'." We also use React.ReactElement as the return type.
 */

import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

// The MyApp component wraps every page in the application and imports global styles.
// It uses the AppProps type from Next.js to ensure correct typings for Component and pageProps.
function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return <Component {...pageProps} />;
}

export default MyApp;
