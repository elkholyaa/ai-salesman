/**
 * File: pages/mobile-details.tsx
 * Purpose: Render a comprehensive product detail page for the Samsung Galaxy S24 Ultra – 256GB AI Smartphone.
 * Role: This page displays product details including an image, pricing, reviews, and technical specifications.
 *        The technical specifications are rendered using the TechnicalSpecsList component, which provides an interactive
 *        numbered list with an animated emoji trigger for AI explanations.
 * Integration: Replaces the previous SpecAccordion UI with TechnicalSpecsList to align with the new chatbot branch requirements.
 *              When a specification is selected via the emoji, the global ChatbotContext is updated to trigger the chatbot.
 * Workflow: The product details are shown in a two-column layout, with the technical specifications list displayed below.
 *           Clicking the emoji in the specs list sets the selected spec in ChatbotContext, causing the Chatbot component
 *           to open and send an explanation request.
 */

import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TechnicalSpecsList, { TechSpec } from '../components/TechnicalSpecsList';
import { ChatbotContext } from '../context/ChatbotContext';

const MobileDetailsPage: React.FC = () => {
  // Access the setSelectedSpec function from the global ChatbotContext.
  const { setSelectedSpec } = useContext(ChatbotContext);

  // Product information for Samsung Galaxy S24 Ultra.
  const product = {
    name: 'Samsung Galaxy S24 Ultra - 256GB AI Smartphone',
    currentPrice: 1299.99,
    originalPrice: 1499.99,
    discount: 13, // Discount percentage.
    rating: 4.8,
    reviews: 152, // Number of reviews.
    image: '/samsung-s24-ultra.jpg', // Image path in the public folder.
  };

  // Technical specifications array adhering to the TechSpec interface.
  const mobileSpecs: TechSpec[] = [
    {
      title: 'Display',
      specDetails:
        '6.8-inch Dynamic AMOLED 2X display with QHD+ resolution (3120 x 1440 pixels), 120Hz refresh rate, and 2600 nits peak brightness.',
    },
    {
      title: 'Processor & Memory',
      specDetails:
        'Powered by Qualcomm Snapdragon 8 Gen 3 with 12GB of RAM and 256GB internal storage (UFS 4.0).',
    },
    {
      title: 'Camera System',
      specDetails:
        'Quad rear cameras featuring a 200MP wide sensor, 50MP periscope telephoto (5x optical zoom), 10MP telephoto (3x optical zoom), and 12MP ultra-wide; 12MP front selfie camera with advanced video capabilities (8K, 4K, Full HD).',
    },
    {
      title: 'Battery & Charging',
      specDetails:
        'Non-removable 5000mAh Li-Ion battery with support for 45W wired fast charging and 15W wireless charging for extended usage.',
    },
    {
      title: 'Build & Design',
      specDetails:
        'Features a premium titanium frame with Corning Gorilla Armor glass on both front and back, and is rated IP68 for dust and water resistance (up to 1.5m for 30 minutes).',
    },
    {
      title: 'Software & AI Features',
      specDetails:
        'Runs Android 14 with One UI 6.1 and includes advanced Galaxy AI functionalities such as Circle to Search, Chat Assist, and real-time translation tools.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg">
      {/* Header Section: Two-column layout */}
      <div className="flex flex-col md:flex-row items-start border-b pb-6 mb-6">
        {/* Left Column: Product Image */}
        <div className="md:w-1/3 flex justify-center md:justify-start">
          <Image
            src={product.image}
            alt={product.name}
            width={350}
            height={350}
            className="object-contain"
          />
        </div>
        {/* Right Column: Product Details */}
        <div className="md:w-2/3 mt-6 md:mt-0 md:pl-8">
          {/* Product Name */}
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          {/* Reviews */}
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 mr-2">★ ★ ★ ★ ★</span>
            <span className="text-gray-600">
              {product.rating} out of 5 ({product.reviews} reviews)
            </span>
          </div>
          {/* Pricing Information */}
          <div className="mb-4">
            <span className="text-2xl font-semibold text-red-600 mr-2">
              ${product.currentPrice.toFixed(2)}
            </span>
            <span className="text-gray-500 line-through mr-2">
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="text-green-600 font-semibold">
              {product.discount}% OFF
            </span>
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-4 mb-6">
            <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
            <button className="px-6 py-3 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition-colors">
              Buy Now
            </button>
          </div>
          {/* Link to another page (if needed) */}
          <Link
            href="/"
            className="text-blue-600 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Technical Specifications Section */}
      <TechnicalSpecsList
        specs={mobileSpecs}
        onSpecSelect={(specIndex: number) => {
          // Update the global ChatbotContext with the selected spec.
          setSelectedSpec(mobileSpecs[specIndex]);
        }}
      />
    </div>
  );
};

export default MobileDetailsPage;
