import React from "react";
import "../CSS/SkeletonLoader.css"; // Import your CSS file for styling

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      <h1 style={{"height":"20px","margin":"2%"}}></h1>
      <div className="skeleton-grid">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="skeleton-item" key={index}></div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
