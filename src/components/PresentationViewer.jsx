'use client';

import { useState } from 'react';

export default function PresentationViewer({ presentation }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  
  if (!presentation) {
    return (
      <div className="text-center py-10">
        <div className="text-night-navy/40 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5m14-2H5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-2-2zM7 12V3a1 1 0 011-1h8a1 1 0 011 1v9" />
          </svg>
        </div>
        <p className="text-graphite">Presentation not available</p>
      </div>
    );
  }
  
  // Handle different presentation types
  const renderPresentation = () => {
    switch (presentation.type) {
      case 'pdf':
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src={`${presentation.url}#page=${currentSlide}`}
              className="w-full h-[600px]"
              title="PDF Presentation"
            ></iframe>
          </div>
        );
      
      case 'pptx':
        // For PPTX, we would typically convert to PDF or use a specialized viewer
        // Here we'll use a simple image-based approach for demonstration
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full h-[600px]">
              <img
                src={`/presentations/slides/${presentation.url.split('/').pop().replace('.pptx', '')}-slide-${currentSlide}.jpg`}
                alt={`Slide ${currentSlide}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        );
      
      case 'google-slides':
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src={presentation.url}
              className="w-full h-[600px]"
              title="Google Slides Presentation"
              allowFullScreen
            ></iframe>
          </div>
        );
        
      default:
        return (
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <p className="text-graphite">Presentation format not supported</p>
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      {renderPresentation()}
      
      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
          disabled={currentSlide === 1}
          className="px-5 py-2 bg-night-navy text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          Previous Slide
        </button>
        
        <div className="text-graphite">
          Slide {currentSlide} of {presentation.slideCount || 1}
        </div>
        
        <button
          onClick={() => setCurrentSlide(Math.min(presentation.slideCount || 1, currentSlide + 1))}
          disabled={currentSlide === (presentation.slideCount || 1)}
          className="px-5 py-2 bg-night-navy text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          Next Slide
        </button>
      </div>
      
      {/* Alternative Download Option */}
      <div className="text-center">
        <a 
          href={presentation.url} 
          download
          className="inline-flex items-center text-sky-cyan hover:text-night-navy transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download Full Presentation
        </a>
      </div>
    </div>
  );
}