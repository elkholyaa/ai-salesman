/**
 * File: components/TechnicalSpecsList.tsx
 * Purpose: Render a numbered list of mobile technical specifications with an interactive hover/tap trigger.
 * Role: This component displays each specification in a numbered list along with an animated emoji trigger provided by the HoverTrigger component.
 *       When a user clicks or taps the trigger, it calls the provided onSpecSelect callback with the index of the selected spec.
 * Integration: The component is intended for use in pages such as MobileDetailsPage to facilitate chatbot interactions based on technical specs.
 * Workflow: The HoverTrigger component handles hover animations and tooltip display, decoupling interactive behavior from list rendering.
 * Educational Comments: This update improves modularity and maintainability by reusing the HoverTrigger component instead of duplicating animation and tooltip logic inline.
 */

import React from 'react';
import HoverTrigger from './HoverTrigger';

export interface TechSpec {
  title: string;
  specDetails: string;
}

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
            {/* Use the HoverTrigger component for the interactive emoji */}
            <div className="ml-4">
              <HoverTrigger 
                onClick={() => onSpecSelect && onSpecSelect(index)}
                tooltip="Ask AI Sales for details"
              />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TechnicalSpecsList;
