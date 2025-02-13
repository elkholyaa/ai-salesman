/**
 * File: pages/[demo]/chat.tsx
 * Purpose: Dynamically load demo configurations and render the ChatInterface along with the global ChatHistory.
 * Role: This page reads the URL parameter to determine which demo configuration to use, passes that configuration to ChatInterface,
 *       and displays the persistent Chat History below. This ensures that users can review past interactions even when switching specs.
 * Overview: The page uses Next.js dynamic routing to extract the demo identifier, retrieves the corresponding configuration,
 *           and renders both the interactive chat interface and the chat history.
 */

import { useRouter } from 'next/router';
import ChatInterface from '../../components/ChatInterface';
import ChatHistory from '../../components/ChatHistory';
import { demos } from '../../config/demos';

const DemoChatPage = () => {
  const router = useRouter();
  const { demo } = router.query;

  // Retrieve the demo configuration based on the URL parameter.
  const demoConfig = demo && demos[demo as string];

  // If the demo configuration is not found, display an error message.
  if (!demoConfig) {
    return <div className="text-center mt-10">Invalid demo selected.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Render the interactive chat interface with the demo-specific configuration */}
      <ChatInterface 
        title={demoConfig.title} 
        themeColor={demoConfig.themeColor} 
        defaultContext={demoConfig.defaultContext} 
      />
      
      {/* Render the persistent chat history component */}
      <ChatHistory />
    </div>
  );
};

export default DemoChatPage;
