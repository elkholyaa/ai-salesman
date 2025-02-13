/**
 * File: components/SpecAccordion.tsx
 * Purpose: Provide an interactive component that displays the technical specification details (always visible)
 *          and toggles the display of a simulated AI chatbot explanation along with suggested follow-up actions,
 *          and handles custom question submissions.
 * Role: This component is used on the Mobile Phone Details Page to enrich each technical specification with additional
 *       chatbot insights. The technical spec details remain permanently visible, and the accordion is used solely to show/hide
 *       the chatbot explanation and user input options.
 * Overview: The component accepts a title and the technical spec details as props. A button toggles the visibility of the
 *           explanation section, which simulates a chatbot response and displays suggested actions. It also allows the user
 *           to type a custom question and receive a simulated response.
 * Integration: Import and use this component in pages/mobile-details.tsx to render each technical spec with an expandable explanation.
 */

import React, { useState, KeyboardEvent } from 'react';

// Define the props interface for the SpecAccordion component.
interface SpecAccordionProps {
  title: string;       // The title of the specification (e.g., "Display", "Processor")
  specDetails: string; // The technical details of the specification, which are always visible.
}

const SpecAccordion: React.FC<SpecAccordionProps> = ({ title, specDetails }) => {
  // State to manage whether the chatbot explanation and suggested actions are visible.
  const [showExplanation, setShowExplanation] = useState(false);
  // State to store the custom question response.
  const [customResponse, setCustomResponse] = useState<string>('');

  // Simulated function to generate a chatbot explanation based on the spec title.
  const simulateChatbotExplanation = (specTitle: string): string => {
    // This is a placeholder for actual chatbot integration.
    return `Chatbot Explanation for ${specTitle}: This specification is crucial as it influences performance, user experience, and overall device quality.`;
  };

  // Simulated function to generate a response for a custom user question.
  const simulateCustomResponse = (question: string): string => {
    return `Simulated answer for your question: "${question}"`;
  };

  // Hardcoded suggested actions.
  const suggestedActions = [
    "More Details",
    "Simplified Explanation",
    "Comparison with other tech",
  ];

  // Toggle the explanation visibility.
  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  // Handle custom question submission on Enter key.
  const handleCustomQuestionKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget as HTMLInputElement;
      const question = input.value.trim();
      if (question) {
        // Simulate the custom response.
        const response = simulateCustomResponse(question);
        setCustomResponse(response);
        input.value = "";
      }
    }
  };

  return (
    <div className="border rounded-md my-2 p-4">
      {/* Always display the technical specification details */}
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-700">{specDetails}</p>
      </div>
      {/* Button to toggle the chatbot explanation */}
      <div className="mt-2">
        <button
          onClick={toggleExplanation}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          {showExplanation ? "Hide 🤖 AI Explanation" : "Show 🤖 AI Explanation"}
        </button>
      </div>
      {/* Conditionally render the chatbot explanation and suggested actions */}
      {showExplanation && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <p className="mb-2">{simulateChatbotExplanation(title)}</p>
          <div className="flex space-x-2">
            {suggestedActions.map((action, idx) => (
              <button
                key={idx}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                onClick={() => console.log(`Action selected: ${action}`)}
              >
                {action}
              </button>
            ))}
          </div>
          {/* Input field for custom user questions */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Type your custom question..."
              className="w-full border rounded px-3 py-2 focus:outline-none"
              onKeyDown={handleCustomQuestionKeyDown}
            />
          </div>
          {/* Display the custom question response if available */}
          {customResponse && (
            <div className="mt-4 p-2 border rounded bg-white">
              <p className="text-gray-800">{customResponse}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpecAccordion;
