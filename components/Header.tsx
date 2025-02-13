/**
 * File: components/Header.tsx
 * Purpose: Provide a common header navigation bar for the AI Salesman PoC application.
 * Role: Displays navigation links to various sections such as Home, Mobile Details, and Chat Demo.
 * Overview: This component ensures consistent navigation and adheres to the latest Next.js Link behavior.
 * Integration: Imported and used in the global layout (pages/_app.tsx) so that it appears on every page.
 */

import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">AI Salesman PoC</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/mobile-details" className="hover:text-gray-300">
              Mobile Details
            </Link>
          </li>
          <li>
            <Link href="/mobileShop/chat" className="hover:text-gray-300">
              Chat Demo
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
