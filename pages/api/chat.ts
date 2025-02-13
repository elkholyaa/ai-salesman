/**
 * File: pages/api/chat.ts
 * Purpose: Provide a simulated API endpoint for chatbot responses.
 * Role: Generates tailored responses based on the input message. This can later be integrated with a live AI API.
 * Overview: Checks the message content and returns a simulated response accordingly.
 * Integration: Called by the SpecAccordion component to update the AI explanation dynamically.
 */

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;

  let simulatedResponse = '';

  // Tailor responses based on keywords in the message.
  if (message.toLowerCase().includes("more details")) {
    simulatedResponse = `More details: This specification is critical for performance and overall quality.`;
  } else if (message.toLowerCase().includes("simplified explanation")) {
    simulatedResponse = `Simplified explanation: This spec ensures a smooth and efficient user experience.`;
  } else if (message.toLowerCase().includes("comparison with other tech")) {
    simulatedResponse = `Comparison: Compared to similar devices, this specification stands out for its balance of performance and efficiency.`;
  } else {
    simulatedResponse = `Simulated response for: ${message}`;
  }

  res.status(200).json({ response: simulatedResponse });
}
