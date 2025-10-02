// components/BackToTopButton.tsx
"use client";

import React from "react";

const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
    >
      ↑ Back to Top
    </button>
  );
};

export default BackToTopButton;
