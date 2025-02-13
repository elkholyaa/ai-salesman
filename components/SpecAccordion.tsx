/**
 * File: components/SpecAccordion.tsx
 * Purpose: Provide an interactive component to display technical specification details and toggle an AI explanation.
 * Role: Used on the Mobile Phone Details Page to enrich each spec with a concise, well-formatted AI explanation.
 * Workflow: When toggled, this component calls the API with a refined prompt that instructs the AI to return exactly 
 *           four bullet points in Markdown format. Each bullet must be on its own line with one blank line between.
 */

import React, { useState, useEffect, KeyboardEvent, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';

interface SpecAccordionProps {
  title: string;
  specDetails: string;
}

const SpecAccordion: React.FC<SpecAccordionProps> = ({ title, specDetails }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [chatbotResponse, setChatbotResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [customResponse, setCustomResponse] = useState<string>('');

  /**
   * Fetch a technical explanation from the API.
   * If an action is provided, include it in the prompt for a tailored explanation.
   * Returns exactly 4 bullet points in Markdown format with a total response within 60 words.
   */
  const fetchChatbotExplanation = useCallback(async (action?: string) => {
    setLoading(true);
    try {
      const prompt = action
        ? `Provide a technical explanation for the ${title} spec using these details: "${specDetails}". Give a ${action.toLowerCase()} explanation. Return exactly 4 bullet points in Markdown format, each bullet on its own line with a blank line in between. Format: "- **Key Term**: Explanation". Limit the total response to 60 words.`
        : `Provide a technical explanation for the ${title} spec using these details: "${specDetails}". Return exactly 4 bullet points in Markdown format, each bullet on its own line with a blank line in between. Format: "- **Key Term**: Explanation". Limit the total response to 60 words.`;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt })
      });
      const data = await res.json();
      setChatbotResponse(data.response);
    } catch (error) {
      console.error("Error fetching chatbot explanation:", error);
      setChatbotResponse('Error fetching AI explanation.');
    } finally {
      setLoading(false);
    }
  }, [title, specDetails]);

  // Fetch explanation on expansion if not already fetched.
  useEffect(() => {
    if (showExplanation && !chatbotResponse) {
      fetchChatbotExplanation();
    }
  }, [showExplanation, chatbotResponse, fetchChatbotExplanation]);

  // Simulate a custom response for user-typed questions.
  const simulateCustomResponse = (question: string): string => {
    return `Simulated answer for your question: "${question}"`;
  };

  const suggestedActions = [
    "More Details",
    "Simplified Explanation",
    "Comparison with other tech",
  ];

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  // Handle custom question submission via Enter key.
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

  // Handle suggested action clicks by refetching explanation with the action parameter.
  const handleSuggestedAction = async (action: string) => {
    setCustomResponse('');
    await fetchChatbotExplanation(action);
  };

  return (
    <div className="border rounded-md my-2 p-4">
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-700">{specDetails}</p>
      </div>
      <div className="mt-2">
        <button
          onClick={toggleExplanation}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          {showExplanation ? "Hide 🤖 AI Explanation" : "Show 🤖 AI Explanation"}
        </button>
      </div>
      {showExplanation && (
        <div className="mt-4 p-4 border rounded bg-gray-50 transition-all duration-300">
          {loading ? (
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <p>Loading explanation...</p>
            </div>
          ) : (
            <ReactMarkdown className="mb-2">{chatbotResponse}</ReactMarkdown>
          )}
          <div className="flex space-x-2">
            {suggestedActions.map((action, idx) => (
              <button
                key={idx}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                onClick={() => handleSuggestedAction(action)}
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
