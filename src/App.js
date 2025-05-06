import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PhotoCarousel from "./components/PhotoCarousel"; 
import ThankYou from "./components/ThankYou";
import bgVideo from "./assets/background.mp4";
import VideoTest from "./VideoTest";
import backgroundPhoto from './assets/backgroundPhoto.jpg';
import IntroSequence from "./components/IntroSequence";
import "./styles/IntroSequence.css";




function HomePage() {
  const videoRef = useRef(null);
  const [introDone, setIntroDone] = useState(false);
  const [showInviteCard, setShowInviteCard] = useState(false);

  // ⏱ When intro is done, wait 10 seconds before showing the invite
  useEffect(() => {
    if (introDone) {
      const timer = setTimeout(() => {
        setShowInviteCard(true);
      }, 10000); // 10 seconds of video time

      return () => clearTimeout(timer);
    }
  }, [introDone]);

  return (
    <>
      {/* ⬛ Intro Animation */}
      {!introDone && <IntroSequence onComplete={() => setIntroDone(true)} />}

      {/* 🎥 Background Video */}
      {introDone && (
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
      )}

      {/* 💌 Invite Card appears AFTER 10s */}
      {introDone && (
        <div className="invite-background">
          <div className="overlay" />
          <div className={`invite-card ${showInviteCard ? "show" : ""}`}>
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
          </div>
        </div>
      )}
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