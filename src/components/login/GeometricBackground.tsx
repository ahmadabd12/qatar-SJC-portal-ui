import React from 'react';

const GeometricBackground: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gray-50 relative overflow-hidden">
      {/* Geometric Shapes Pattern */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Main 3D geometric shape */}
          <div className="relative w-80 h-80">
            {/* Base cylinder */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shadow-lg"></div>
            
            {/* Twisted ribbon/shape */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -rotate-12">
              <div className="w-48 h-40 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 rounded-3xl shadow-xl relative overflow-hidden">
                {/* Dotted pattern overlay */}
                <div className="absolute inset-0 opacity-60">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-gray-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Additional geometric elements */}
            <div className="absolute top-16 right-8 w-12 h-12 bg-gray-200 rounded-lg transform rotate-45 shadow-md"></div>
            <div className="absolute bottom-20 left-8 w-8 h-8 bg-gray-300 rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Floating dots pattern */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-300 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GeometricBackground;