import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1 className="about-title">About ConvertFlix</h1>
          <p className="about-subtitle">
            Transforming the way you handle file compression and conversion
          </p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <div className="about-text">
              <h2>Our Mission</h2>
              <p>
                At ConvertFlix, we believe that file management should be simple, fast, and accessible to everyone. 
                Our mission is to provide professional-grade file compression and conversion tools that work seamlessly 
                across all devices and platforms.
              </p>
              <p>
                Founded in 2024 by Taliyo Technologies, we've built a platform that combines cutting-edge technology 
                with an intuitive user experience. Taliyo Technologies is a leading software development company 
                specializing in innovative web applications and digital solutions. Whether you're a professional 
                designer, content creator, or just someone who needs to optimize their files, ConvertFlix is here to help.
              </p>
            </div>
            <div className="about-image">
              <div className="mission-illustration">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </section>

          <section className="about-section reverse">
            <div className="about-text">
              <h2>What We Offer</h2>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="feature-content">
                    <h3>Smart Compression</h3>
                    <p>Advanced algorithms that maintain quality while reducing file size by up to 80%</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="feature-content">
                    <h3>Lightning Fast</h3>
                    <p>Cloud-powered processing ensures your files are converted in seconds, not minutes</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="feature-content">
                    <h3>Unlimited Access</h3>
                    <p>No file size limits, no conversion restrictions, and no hidden fees</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="features-illustration">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </section>

          <section className="about-section">
            <div className="about-text">
              <h2>Our Technology</h2>
              <p>
                ConvertFlix leverages state-of-the-art compression algorithms and cloud computing infrastructure 
                to deliver exceptional performance. Our platform supports a wide range of file formats including 
                images (JPEG, PNG, WebP), videos (MP4, AVI, MOV), documents (PDF), and audio files (MP3, WAV, FLAC).
              </p>
              <p>
                We prioritize security and privacy, ensuring that your files are processed securely and deleted 
                immediately after conversion. Our infrastructure is built on reliable cloud services, guaranteeing 
                99.9% uptime and fast processing speeds.
              </p>
            </div>
            <div className="about-image">
              <div className="tech-illustration">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12c-1 0-6.4-1.3-8-1.3s-7 1.3-8 1.3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 5c0 2.7 2.5 5 5.5 5s5.5-2.3 5.5-5V3c0-2.7-2.5-5-5.5-5S3 .3 3 3v2z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 10c0 2.7 2.5 5 5.5 5s5.5-2.3 5.5-5V8c0-2.7-2.5-5-5.5-5S9 5.3 9 8v2z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </section>

          <section className="stats-section">
            <h2>ConvertFlix by the Numbers</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">10M+</div>
                <div className="stat-label">Files Processed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Supported Formats</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <h2>Ready to Get Started?</h2>
            <p>
              Join thousands of users who trust ConvertFlix for their file conversion needs. 
              Start compressing and converting your files today.
            </p>
            <div className="cta-buttons">
              <a href="/tools/image" className="btn btn-primary btn-large">
                Try It Free
              </a>
              <a href="/contact" className="btn btn-secondary btn-large">
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
