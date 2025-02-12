<!--
File: PROJECT_DOC.md
Purpose: This documentation file serves as a comprehensive reference for the AI Salesman PoC project.
Role: Provides an overview, folder structure, setup and running instructions, Git workflow, and future enhancement ideas.
Usage: Refer to this document to resume development and ensure consistency across the project.
-->

# AI Salesman PoC Documentation

## Project Overview

**Project Name:** AI Salesman PoC  
**Description:**  
This proof-of-concept project implements an AI-powered chatbot for a mobile e-shop. It is designed to provide interactive explanations of mobile phone specifications, using simulated chatbot responses. The project demonstrates a scalable architecture using Next.js (Pages Router), React, TypeScript, and Tailwind CSS.

**Objectives:**
- Develop a mobile e-shop demo with an interactive chat interface.
- Implement expandable specification sections with simulated chatbot responses.
- Follow best practices for modularity, scalability, and maintainability.
- Establish a foundation for integrating a real chatbot API (e.g., OpenAI) in the future.

**Technical Stack:**
- **Next.js (15.1.7):** Utilizing the Pages Router for routing.
- **React:** For building interactive UI components.
- **TypeScript:** To ensure type safety and maintainable code.
- **Tailwind CSS:** For rapid and responsive styling.
- **Additional Dependencies:** `uuid` for generating unique IDs.

## Folder Structure

```plaintext
.
|-- README.md
|-- ai-salesman.code-workspace
|-- components
|   `-- ChatInterface.tsx     // Chat interface component displaying the conversation.
|-- config
|   `-- demos.ts              // Demo configurations (e.g., mobileShop settings).
|-- hooks
|   `-- useConversation.ts    // Custom hook to manage chat conversation state.
|-- pages
|   |-- [demo]                // Dynamic routing for demo-specific pages.
|   |-- api                   // API routes (e.g., chat simulation endpoint).
|   |-- _app.tsx              // Custom App component for global CSS import.
|   `-- index.tsx             // Landing page for the application.
|-- public                    // Static assets (images, SVGs, etc.)
|-- styles
|   `-- globals.css           // Global CSS file containing Tailwind directives.
|-- tailwind.config.js        // Tailwind CSS configuration.
|-- tsconfig.json             // TypeScript configuration.
`-- types
    `-- chat.ts               // TypeScript definitions for chat messages.
