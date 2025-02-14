/**
 * File: components/SpecAccordion.tsx
 * Purpose: Provide an interactive component to display technical specification details and toggle an AI explanation.
 * Role: Used on the Mobile Phone Details Page to enrich each spec with a concise, conversational AI explanation.
 * Workflow: When toggled, this component calls the API with a prompt that instructs the AI (as a friendly mobile store salesperson)
 *           to explain the spec in simple, shopper-friendly language that highlights real-world benefits. The response must be
 *           returned strictly as numbered bullet points in Markdown (without any extra introductory or concluding text). 
 *           In the bullet points, the AI should use the key feature directly (e.g. "octa-core: ...") rather than restating the spec title.
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
   * Uses a persona prompt for a conversational, shopper-friendly explanation.
   * The explanation should focus on how the feature benefits the user without restating obvious context.
   * Return only numbered bullet points in Markdown format, with each bullet starting with the key feature (e.g. "octa-core: ...").
   * Ensure that each bullet is a complete sentence that fully conveys the benefit without being truncated.
   */
  const fetchChatbotExplanation = useCallback(async (action?: string) => {
    setLoading(true);
    try {
      const persona = "You are a friendly and knowledgeable mobile store salesperson with deep technical insights. A customer has asked you to explain a specific technical term related to a phone's specifications. Your explanation should focus on how the feature benefits the user in everyday life using relatable examples, and avoid trivial or obvious definitions.";
      const specInstruction = ` Explain the following spec: ${title} - "${specDetails}".`;
      const additionalInstruction = action 
        ? ` Also, provide a ${action.toLowerCase()} explanation.` 
        : "";
      const bulletInstruction = " Return only numbered bullet points in Markdown format, with each bullet on its own line and one blank line between bullets. Each bullet must be formatted exactly as: '1. **Key Feature**: Explanation.' Ensure that each bullet is a complete sentence that fully conveys the benefit without being truncated. Focus on using the key feature directly (e.g. 'octa-core: ...') without restating the spec title. Do not include any additional text.";
      const prompt = persona + specInstruction + additionalInstruction + bulletInstruction;
      
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

  // Fetch explanation when the accordion is expanded and no response is loaded yet.
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
          {showExplanation ? (
            <>
              Hide <span className="inline-block animate-pulse">💡</span> AI Insight
            </>
          ) : (
            <>
              Show <span className="inline-block animate-pulse">💡</span> AI Insight
            </>
          )}
        </button>
      </div>
      {showExplanation && (
        <div className="mt-4 p-4 border rounded bg-gray-50 transition-all duration-300">
          {loading ? (
            <div className="flex items-center space-x-2">
              <span className="text-3xl">
                <span className="inline-block">👤</span>
                <span className="inline-block ml-1 animate-rotate">⚙️</span>
              </span>
              <p>Our brilliant AI is processing your request...</p>
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
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate {
          animation: rotate 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SpecAccordion;
