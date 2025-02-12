/**
 * File: pages/[demo]/chat.tsx
 * Purpose: Dynamically load demo configurations and render the ChatInterface.
 * Role: Reads the URL parameter to determine which demo configuration to use and passes that configuration to the ChatInterface component.
 * Workflow:
 *   - Uses Next.js dynamic routing to extract the demo identifier from the URL.
 *   - Looks up the corresponding configuration from the demos file.
 *   - Renders the ChatInterface with the demo-specific settings.
 */

import { useRouter } from 'next/router';
import ChatInterface from '../../components/ChatInterface';
import { demos } from '../../config/demos';

const DemoChatPage = () => {
  const router = useRouter();
  const { demo } = router.query;

  // Retrieve the demo configuration based on the URL parameter.
  const demoConfig = demo && demos[demo as string];

  // If the demo configuration is not found, show an error message.
  if (!demoConfig) {
    return <div className="text-center mt-10">Invalid demo selected.</div>;
  }

  // Render the ChatInterface using the retrieved demo configuration.
  return (
    <ChatInterface
      title={demoConfig.title}
      themeColor={demoConfig.themeColor}
      defaultContext={demoConfig.defaultContext}
    />
  );
};

export default DemoChatPage;
