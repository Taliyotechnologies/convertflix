import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Compress & Convert Any File
                <span className="gradient-text"> Instantly</span>
              </h1>
              <p className="hero-subtitle">
                Transform your files with lightning-fast compression and conversion. 
                Smart algorithms, unlimited access, and professional results.
              </p>
              <div className="hero-buttons">
                <Link to="/tools/image" className="btn btn-primary btn-large">
                  Start Compressing
                </Link>
                <Link to="/tools/video" className="btn btn-secondary btn-large">
                  Try Conversion
                </Link>
              </div>
            </div>
            <div className="hero-illustration">
              <div className="converter-illustration">
                <div className="file-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="arrow-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="compressed-file-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 13l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose ConvertFlix?</h2>
            <p className="section-subtitle">
              Experience the power of advanced file processing technology
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Smart Compression</h3>
              <p className="feature-description">
                Advanced algorithms that maintain quality while reducing file size by up to 80%.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="feature-title">Fast Conversion</h3>
              <p className="feature-description">
                Lightning-fast processing with cloud-powered servers for instant results.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="feature-title">Unlimited Access</h3>
              <p className="feature-description">
                No file size limits, no conversion restrictions, and no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Preview Section */}
      <section className="tools-preview">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Tools for Every Need</h2>
            <p className="section-subtitle">
              Professional-grade tools for all your file conversion needs
            </p>
          </div>

          <div className="tools-grid">
            <Link to="/tools/image" className="tool-card">
              <div className="tool-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="tool-title">Image Tools</h3>
              <p className="tool-description">
                Compress and convert images to any format with quality preservation.
              </p>
              <div className="tool-features">
                <span className="tool-feature">JPEG, PNG, WebP</span>
                <span className="tool-feature">Bulk Processing</span>
                <span className="tool-feature">Quality Control</span>
              </div>
            </Link>

            <Link to="/tools/video" className="tool-card">
              <div className="tool-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <polygon points="23,7 16,12 23,17 23,7" stroke="currentColor" strokeWidth="2"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="tool-title">Video Tools</h3>
              <p className="tool-description">
                Convert videos to any format with optimized compression.
              </p>
              <div className="tool-features">
                <span className="tool-feature">MP4, AVI, MOV</span>
                <span className="tool-feature">Resolution Control</span>
                <span className="tool-feature">Fast Processing</span>
              </div>
            </Link>

            <Link to="/tools/pdf" className="tool-card">
              <div className="tool-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="tool-title">PDF Tools</h3>
              <p className="tool-description">
                Compress PDFs and convert to various formats seamlessly.
              </p>
              <div className="tool-features">
                <span className="tool-feature">PDF Compression</span>
                <span className="tool-feature">Format Conversion</span>
                <span className="tool-feature">OCR Support</span>
              </div>
            </Link>

            <Link to="/tools/audio" className="tool-card">
              <div className="tool-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="tool-title">Audio Tools</h3>
              <p className="tool-description">
                Convert audio files with high-quality compression.
              </p>
              <div className="tool-features">
                <span className="tool-feature">MP3, WAV, FLAC</span>
                <span className="tool-feature">Bitrate Control</span>
                <span className="tool-feature">Batch Processing</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Files?</h2>
            <p className="cta-subtitle">
              Join thousands of users who trust ConvertFlix for their file conversion needs.
            </p>
            <div className="cta-buttons">
              <Link to="/tools/image" className="btn btn-primary btn-large">
                Get Started Free
              </Link>
              <Link to="/about" className="btn btn-ghost btn-large">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
