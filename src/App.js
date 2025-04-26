import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PhotoCarousel from "./components/PhotoCarousel"; 
import ThankYou from "./components/ThankYou";

function HomePage() {
  return (
    <div className="invite-background">
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
          <input type="hidden" name="_redirect" value="http://localhost:3000/thankyou" />
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" name="name" placeholder="Full Name" required />

          <label htmlFor="guests">Number of Guests (including you)</label>
          <input type="number" id="guests" name="guests" min="1" required />

          <button type="submit">RSVP</button>
        </form>

        <p className="footer-msg">We can't wait to celebrate with you!</p> 
        
        <PhotoCarousel />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;