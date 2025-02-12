/**
 * File: pages/index.tsx
 * Purpose: Landing page for the application.
 * Role: Provides an entry point and a link to the Mobile E-Shop Chat demo.
 * Workflow: This page displays a welcome message and a styled link that navigates the user to the demo.
 * 
 * Note: In Next.js 13+ (and Next.js 15 with the new Link behavior), wrapping a <Link> with an <a> tag is not allowed.
 *       The solution is to remove the extra <a> and pass the styling directly to the <Link> component.
 */

import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Application title */}
      <h1 className="text-3xl font-bold mb-4">Welcome to AI Salesman PoC</h1>
      {/* Brief instructions for the user */}
      <p className="mb-4">Click below to try the Mobile E-Shop Chat demo.</p>
      {/* Updated Link: Removed the nested <a> element and applied styling directly */}
      <Link 
        href="/mobileShop/chat" 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Mobile E-Shop Chat
      </Link>
    </div>
  );
};

export default HomePage;
