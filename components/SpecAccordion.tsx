/**
 * File: components/SpecAccordion.tsx
 * Purpose: Provide an interactive component that displays the technical specification details (always visible)
 *          and toggles the display of a dynamic AI chatbot explanation (fetched via an API) along with suggested follow-up actions,
 *          as well as handling custom question submissions.
 * Role: This component is used on the Mobile Phone Details Page to enrich each technical specification with additional
 *       chatbot insights. The technical details remain permanently visible, while the AI explanation (and subsequent user interactions)
 *       are shown/hidden using an accordion-style toggle.
 * Overview: Upon toggling the explanation, an API call is made to fetch a simulated chatbot response. The component also allows
 *           the user to submit a custom question, for which a simulated answer is displayed.
 * Integration: Import and use this component in pages/mobile-details.tsx to render each technical spec with an expandable AI explanation.
 */

import React, { useState, useEffect, KeyboardEvent } from 'react';

// Define the props interface for the SpecAccordion component.
interface SpecAccordionProps {
  title: string;       // The title of the specification (e.g., "Display", "Processor")
  specDetails: string; // The technical details of the specification, which are always visible.
}

const SpecAccordion: React.FC<SpecAccordionProps> = ({ title, specDetails }) => {
  // State to manage whether the AI explanation and suggested actions are visible.
  const [showExplanation, setShowExplanation] = useState(false);
  // State to store the chatbot response fetched from the API.
  const [chatbotResponse, setChatbotResponse] = useState<string>('');
  // Loading state for API call.
  const [loading, setLoading] = useState<boolean>(false);
  // State to store the simulated response for custom user questions.
  const [customResponse, setCustomResponse] = useState<string>('');

  // Function to fetch the AI explanation from the API.
  const fetchChatbotExplanation = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: `Explain the ${title} specification.` })
      });
      const data = await res.json();
      setChatbotResponse(data.response);
    } catch (error) {
      setChatbotResponse('Error fetching AI explanation.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to trigger the API call when the explanation is toggled on and no response is yet stored.
  useEffect(() => {
    if (showExplanation && !chatbotResponse) {
      fetchChatbotExplanation();
    }
  }, [showExplanation]);

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

  // Toggle the visibility of the AI explanation section.
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
      {/* Button to toggle the AI explanation */}
      <div className="mt-2">
        <button
          onClick={toggleExplanation}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          {showExplanation ? "Hide 🤖 AI Explanation" : "Show 🤖 AI Explanation"}
        </button>
      </div>
      {/* Conditionally render the AI explanation, suggested actions, and custom question input */}
      {showExplanation && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          {loading ? (
            <p className="mb-2">Loading explanation...</p>
          ) : (
            <p className="mb-2">{chatbotResponse}</p>
          )}
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
          <div className="mt-4">
            <input
              type="text"
              placeholder="Type your custom question..."
              className="w-full border rounded px-3 py-2 focus:outline-none"
              onKeyDown={handleCustomQuestionKeyDown}
            />
          </div>
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
