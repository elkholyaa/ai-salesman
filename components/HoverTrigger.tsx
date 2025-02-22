/**
 * File: components/HoverTrigger.tsx
 * Purpose: Provide an interactive hover/tap trigger component that displays an animated emoji.
 * Role: This component encapsulates the behavior of an animated emoji trigger including hover effects, tooltip display, and click handling.
 *        It is intended to be used in places like TechnicalSpecsList to trigger chatbot interactions in a modular, reusable way.
 * Integration: Can be imported and used in any component that needs an interactive emoji trigger.
 * Workflow: On hover (desktop) or tap (mobile), the emoji animates (scaling effect) and optionally displays a tooltip.
 *           Clicking the emoji triggers the provided onClick callback.
 * Educational Comments: Separating the hover trigger behavior into its own component promotes code reuse and simplifies parent components.
 */

import React, { useState } from 'react';

interface HoverTriggerProps {
  /** The icon to display. Defaults to the 🤖 emoji if not provided. */
  icon?: React.ReactNode;
  /** Callback triggered when the trigger is clicked/tapped. */
  onClick: () => void;
  /** Optional tooltip text to display on hover/tap. */
  tooltip?: string;
  /** Additional CSS classes to apply to the button element. */
  className?: string;
}

const HoverTrigger: React.FC<HoverTriggerProps> = ({ icon, onClick, tooltip, className }) => {
  // Local state to control the visibility of the tooltip.
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        className={`focus:outline-none transform transition duration-200 hover:scale-110 ${className}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={() => setShowTooltip(true)}
        onTouchEnd={() => setShowTooltip(false)}
      >
        {icon ? icon : <span role="img" aria-label="trigger">🤖</span>}
      </button>
      {tooltip && showTooltip && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default HoverTrigger;
