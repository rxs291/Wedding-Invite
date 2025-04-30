import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PhotoCarousel from "./components/PhotoCarousel"; 
import ThankYou from "./components/ThankYou";
import bgVideo from "./assets/background.mp4";
import VideoTest from "./VideoTest";
import backgroundPhoto from './assets/backgroundPhoto.jpg';



function HomePage() {
// useRef lets us grab the <video> tag so we can attach events like oncanplay and onerror
const videoRef = useRef(null);

// useState creates a flag that keeps track of whether the video is ready or not
// videoReady = true means the video loaded okay
// setVideoReady = how we update that flag
const [videoReady, setVideoReady] = useState(false);

// useEffect runs right after the component shows up on screen (like when the page loads)
useEffect(() => {
  // grab the actual <video> element from the DOM
  const video = videoRef.current;

  // if the video exists, set up listeners for when it works or fails
  if (video) {
    // when the video is loaded and can start playing, we say “yep, it’s good”
    video.oncanplay = () => setVideoReady(true);

    // if the video has any issue loading (bad path, unsupported type, etc.), use fallback
    video.onerror = () => {
      console.warn("Video failed to load — using fallback image.");
      setVideoReady(false);
    };
  }
// the empty array [] means this runs only ONCE when the component mounts
}, []);

  return (
    <>
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        id="bg-video"
      >
 
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Main Invite Content */}
      <div
        className="invite-background"
        style={{
          backgroundImage: videoReady
            ? "none"
            : `url(${backgroundPhoto})`,  
        }}
      >
        <div className="overlay" />
        <div className="invite-card">
          <h1 className="title">You're Invited</h1>
          <p className="subtitle">Please join us in celebrating the wedding of</p>
          <h2 className="names">Ki & Eliza</h2>
          <p className="details">October 4th, 2025 • [Location]</p>

          <form
            className="rsvp-form"
            action="https://formspree.io/f/mpwdwway"
            method="POST"
          >
            <input
              type="hidden"
              name="_redirect"
              value="http://localhost:3000/thankyou"
            />
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              required
            />

            <label htmlFor="guests">Number of Guests (including you)</label>
            <input type="number" id="guests" name="guests" min="1" required />

            <button type="submit">RSVP</button>
          </form>

          <p className="footer-msg">We can't wait to celebrate with you!</p>
          <PhotoCarousel />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/video" element={<VideoTest />} />
      </Routes>
    </Router>
  );
}


 

export default App;