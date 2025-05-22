import React from 'react'

function LandingPage({ setActivePage }) {
  return (
    <div className="main-content active" id="landing-page">
      <div className="landing-container">
        <div className="landing-hero">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Productivity"
            className="landing-image"
          />
          <h1 className="landing-title">Boost Your Productivity</h1>
          <p className="landing-subtitle">
            Organize your tasks, achieve your goals, and make the most of your
            time with our powerful yet simple todo application.
          </p>
          <button
            className="cta-button"
            onClick={() => setActivePage('todo')}
          >
            Get Started
          </button>
        </div>
        <div className="landing-features">
          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3 className="feature-title">Easy Task Management</h3>
            <p className="feature-description">
              Add, complete, and organize tasks with just a few clicks.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Progress Tracking</h3>
            <p className="feature-description">
              See your productivity at a glance with our statistics.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Secure & Private</h3>
            <p className="feature-description">
              Your data stays with you. We don't share your information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;