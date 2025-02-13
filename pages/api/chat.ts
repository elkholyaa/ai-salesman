/**
 * File: pages/api/chat.ts
 * Purpose: Integrate the chatbot API endpoint with OpenAI using the Chat Completions endpoint.
 * Role: When the client sends a message, this endpoint calls the OpenAI API with the "gpt-4o-mini" model
 *       and returns the generated response to the client. This replaces our previous usage of a deprecated model.
 * Overview: This file assumes you have installed the latest OpenAI package (npm install openai) and that your
 *           environment variable (OPENAI_API_KEY) is set correctly in your .env file.
 *
 * Note: We are now using the GPT-4o mini model for generating responses. Make sure your OpenAI API plan supports
 *       this model.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Initialize the OpenAI client using the API key from the .env file.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;

  try {
    // Call the OpenAI Chat Completions API with the GPT-4o mini model.
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Updated model: GPT-4o mini
      messages: [
        { role: "user", content: message },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    // Extract and trim the generated text from the response.
    const text = response.choices[0].message?.content?.trim();
    res.status(200).json({ response: text });
  } catch (error) {
    console.error("Error in OpenAI API:", error);
    res.status(500).json({ response: 'Error generating AI response.' });
  }
}
