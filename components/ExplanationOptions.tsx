/**
 * File: components/ExplanationOptions.tsx
 * Purpose: Render interactive follow-up options for AI explanations.
 * Role: This component displays follow-up buttons— "More Details", "Simplified Explanation", and "Compare with Other Tech".
 *       When a button is clicked, it triggers a callback to request a modified explanation.
 * Integration: Intended for use within the Chatbot UI after an initial explanation has been provided.
 * Workflow: The parent component passes an optional onOptionSelect callback; when an option is clicked, the callback is invoked with the selected option.
 * Educational Comments: Separating follow-up option UI from the chatbot logic promotes modularity, making it easier to test and update the behavior of follow-up interactions.
 */

import React from 'react';

interface ExplanationOptionsProps {
  /**
   * Callback function triggered when a follow-up option is selected.
   * The option parameter will be one of: "More Details", "Simplified Explanation", or "Compare with Other Tech".
   */
  onOptionSelect?: (option: string) => void;
}

const ExplanationOptions: React.FC<ExplanationOptionsProps> = ({ onOptionSelect }) => {
  // List of available follow-up options.
  const options = ["More Details", "Simplified Explanation", "Compare with Other Tech"];

  // Handle click event for an option button.
  const handleOptionClick = (option: string) => {
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  };

  return (
    <div className="flex space-x-2 mt-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionClick(option)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ExplanationOptions;
