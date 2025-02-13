/**
 * File: pages/mobile-details.tsx
 * Purpose: Render the Mobile Phone Details Page displaying technical specifications.
 * Role: This page presents detailed technical information about a mobile phone.
 *       It always shows the technical spec details and uses the SpecAccordion component to toggle
 *       the display of the simulated AI chatbot explanation and suggested follow-up actions.
 * Overview: The page uses the SpecAccordion component to render each technical specification.
 *           The technical details are permanently visible, while the chatbot explanation can be toggled.
 * Integration: Accessible via the route /mobile-details, this page is a key component in the overall demo.
 */

import React from 'react';
import SpecAccordion from '../components/SpecAccordion';

// MobileDetailsPage component definition.
const MobileDetailsPage: React.FC = () => {
  // Example data representing the mobile phone specifications.
  const mobileSpecs = [
    {
      title: 'Display',
      specDetails: '6.5-inch OLED display with 1080x2400 resolution, providing vibrant colors and deep blacks.',
    },
    {
      title: 'Processor',
      specDetails: 'Octa-core Snapdragon 888 processor that ensures high performance and efficient power consumption.',
    },
    {
      title: 'Battery',
      specDetails: '4500mAh battery supporting fast charging technology to keep you powered throughout the day.',
    },
    {
      title: 'Camera',
      specDetails: 'Triple rear camera setup with a 64MP main sensor, ultra-wide lens, and macro camera for versatile photography.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6">Mobile Phone Details</h1>
      
      {/* Section for technical specifications */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Technical Specifications</h2>
        {/* Render each specification with its corresponding chatbot explanation toggle */}
        {mobileSpecs.map((spec, index) => (
          <SpecAccordion key={index} title={spec.title} specDetails={spec.specDetails} />
        ))}
      </div>
    </div>
  );
};

export default MobileDetailsPage;
