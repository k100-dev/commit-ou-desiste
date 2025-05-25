import React, { useState, ReactNode } from 'react';

interface Step {
  title: string;
  content: ReactNode;
}

interface InteractiveDemoProps {
  steps: Step[];
  title: string;
}

export const InteractiveDemo = ({ steps, title }: InteractiveDemoProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4 text-blue-600">{title}</h3>
      
      <div className="mb-6">
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
            <div 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
            ></div>
          </div>
          <div className="flex justify-between">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  index <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-100 text-blue-600'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="font-semibold text-lg mb-2">{steps[currentStep].title}</h4>
        <div className="min-h-[200px]">
          {steps[currentStep].content}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded ${
            currentStep === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          } transition-colors`}
        >
          Previous
        </button>
        
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          Reset
        </button>
        
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className={`px-4 py-2 rounded ${
            currentStep === steps.length - 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors`}
        >
          Next
        </button>
      </div>
    </div>
  );
};