/**
 * File: components/TechnicalSpecsList.tsx
 * Purpose: Render a numbered list of mobile technical specifications with an animated emoji trigger.
 * Role: This component displays each specification in a numbered list along with an animated emoji.
 *       When a user clicks or taps the emoji next to a specification, it triggers a callback (if provided)
 *       so that the chatbot can be activated to provide an AI-generated explanation.
 * Integration: The component is intended to be used on pages like Mobile Details. It receives the list of specs
 *              and a callback (onSpecSelect) that informs the parent component which spec was selected.
 * Educational Comments: Using a callback for spec selection decouples the UI display from the logic that handles
 *                       chatbot interaction, supporting easier maintenance and testing.
 */

import React from 'react';

// Define the shape for a technical specification.
export interface TechSpec {
  title: string;
  specDetails: string;
}

// Define props for the TechnicalSpecsList component.
interface TechnicalSpecsListProps {
  specs: TechSpec[];
  /**
   * Callback function triggered when a spec's emoji is clicked.
   * The specIndex parameter indicates which specification was selected (zero-based index).
   */
  onSpecSelect?: (specIndex: number) => void;
}

const TechnicalSpecsList: React.FC<TechnicalSpecsListProps> = ({ specs, onSpecSelect }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
      <ol className="list-decimal ml-6 space-y-3">
        {specs.map((spec, index) => (
          <li key={index} className="flex items-center">
            {/* Display the specification text */}
            <div className="flex-1">
              <strong>{spec.title}:</strong> {spec.specDetails}
            </div>
            {/* Animated emoji trigger for chatbot explanation.
                The 'animate-pulse' class provides a simple animation effect.
                The onClick event calls the onSpecSelect callback with the index of the spec. */}
            <button
              onClick={() => onSpecSelect && onSpecSelect(index)}
              className="ml-4 text-2xl focus:outline-none hover:scale-110 transform transition duration-200 animate-pulse"
              title="Ask AI Sales for details"
            >
              🤖
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TechnicalSpecsList;
