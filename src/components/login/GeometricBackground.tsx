import React from "react";
// import logoAr from "../../../public/logo-ar.svg";
const GeometricBackground: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gray-50 relative overflow-hidden">
      {/* Geometric Shapes Pattern */}
      {/* <img src={logoAr} className="p-8" /> */}
      <img src="/hummer.svg" className="p-8 mx-auto" style={{ width: "75%" }} />
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
