import React from "react";

function Services() {
  return (
    <div className="services-page">
      <div className="services-content">
        <h2>Premium Educational Solutions</h2>
        <p className="services-intro">
          Our platform is designed to revolutionize the way assessments are conducted.
          Whether you're an educational institution looking to streamline your examination process
          or an individual seeking self-improvement through rigorous practice, we offer secure, fast, and reliable tools tailored specifically to your needs.
        </p>

        <div className="services-grid">
          <div className="service-card">
            <h3>Advanced Analytics</h3>
            <p>Track your real-time performance metrics and identify key areas of improvement through our detailed score breakdowns.</p>
          </div>
          <div className="service-card">
            <h3>Secure Exam Environment</h3>
            <p>Ensure academic integrity with state-of-the-art proctoring, time-locked testing windows, and randomized question banks.</p>
          </div>
          <div className="service-card">
            <h3>Instant Results</h3>
            <p>Say goodbye to long waiting periods. Our automated grading algorithms calculate scores and issue detailed feedback instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;