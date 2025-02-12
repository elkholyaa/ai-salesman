/**
 * File: config/demos.ts
 * Purpose: Store configuration settings for demos.
 * Role: Maps demo identifiers (e.g., mobileShop) to their configurations.
 * Workflow: This file exports a record object containing demo-specific configurations. These configurations are imported in dynamic pages (e.g., [demo]/chat.tsx) to set up the UI according to the selected demo.
 */

interface DemoConfig {
    title: string;
    themeColor: string;
    defaultContext: string;
  }
  
  export const demos: Record<string, DemoConfig> = {
    mobileShop: {
      title: 'Mobile E-Shop Chat',
      themeColor: '#3B82F6', // Tailwind CSS blue-500.
      defaultContext: 'Welcome to our mobile shop! Ask about any technical specs.',
    },
  };
  