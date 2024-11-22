import React from 'react';
import './About.css'; // Pastikan file CSS diimpor dengan benar

function About() {
  return (
    <div className="about-container">
      <h2>About Me</h2>
      <p>
      Hi forntends, I am a lover of websites that use AI as a reference for work.
      </p>
      <img
        src="https://via.placeholder.com/500x300.png?text=About+Me"
        alt="About Me"
        className="img-fluid rounded"
      />
    </div>
  );
}

export default About;

