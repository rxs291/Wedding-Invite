import React, { useRef, useEffect } from "react";
import "./App.css"; // you can style things here if needed

function DomRefPlayground() {
  const inputRef = useRef(null);
  const sectionRef = useRef(null);
  const boxRef = useRef(null);
  const audioRef = useRef(null);

  // Focus the input when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const logBoxSize = () => {
    const rect = boxRef.current.getBoundingClientRect();
    alert(`Box width: ${rect.width}px, Top position: ${rect.top}px`);
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const shakeBox = () => {
    const box = boxRef.current;
    box.classList.add("shake");
    setTimeout(() => box.classList.remove("shake"), 1000);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>DOM Ref Playground</h1>

      {/* Focus Example */}
      <div>
        <label htmlFor="focusInput">Auto-Focused Input:</label>
        <input
          id="focusInput"
          ref={inputRef}
          type="text"
          placeholder="Type here..."
        />
      </div>

      {/* Scroll Example */}
      <div style={{ marginTop: "2rem" }}>
        <button onClick={scrollToSection}>Scroll to Section</button>
      </div>

      <div style={{ height: "400px" }} /> {/* Just space */}

      <div
        ref={sectionRef}
        style={{ border: "1px solid gray", padding: "1rem", background: "#f0f0f0" }}
      >
        <h2>This is the section</h2>
        <p>We scroll to this when the button is clicked.</p>
      </div>

      {/* Size & Animation */}
      <div style={{ marginTop: "2rem" }}>
        <div
          ref={boxRef}
          className="ref-box"
          style={{ width: "200px", height: "100px", background: "#d8a", marginBottom: "1rem" }}
        >
          Ref Box
        </div>
        <button onClick={logBoxSize}>Log Box Size</button>
        <button onClick={shakeBox}>Shake the Box</button>
      </div>

      {/* Audio Example */}
      <div style={{ marginTop: "2rem" }}>
        <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
        <button onClick={toggleAudio}>Toggle Music</button>
      </div>
    </div>
  );
}

export default DomRefPlayground;
