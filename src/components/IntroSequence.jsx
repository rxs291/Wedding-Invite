import React, { useEffect, useState } from "react";
import "../styles/IntroSequence.css";

export default function IntroSequence({ onComplete }) {
  const [currentLine, setCurrentLine] = useState(0);
  const lines = [
    "Welcome to Our Celebration",
    "You're Invited",
    "Let's Make Memories",
  ];

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      const endTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(endTimer);
    }
  }, [currentLine, lines.length, onComplete]);

  return (
    <div className="intro-overlay">
      <div className="intro-container">
        {lines.map((text, index) => (
          <h1
            key={index}
            className={`intro-line ${
              index === currentLine
                ? "show"
                : index < currentLine
                ? "hide"
                : ""
            }`}
          >
            {text}
          </h1>
        ))}
      </div>
    </div>
  );
}
