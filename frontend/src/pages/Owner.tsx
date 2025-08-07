import React from 'react';
import './Owner.css';

const Owner: React.FC = () => {
  return (
    <div className="owner-page">
      <div className="container">
        <div className="owner-header">
          <h1 className="owner-title">Meet Our Founder</h1>
          <p className="owner-subtitle">
            The visionary behind ConvertFlix
          </p>
        </div>

        <div className="owner-content">
          <div className="owner-profile">
            <div className="owner-avatar">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="owner-info">
              <h2>Harsh Budhauliya</h2>
              <p className="owner-title-text">Founder & CEO, Taliyo Technologies</p>
              <p className="owner-bio">
                Harsh Budhauliya is the visionary founder of Taliyo Technologies, a leading software development 
                company specializing in innovative web applications and digital solutions. With over 8 years 
                of experience in the tech industry, Harsh has been instrumental in creating cutting-edge 
                applications that solve real-world problems.
              </p>
              <p className="owner-bio">
                Under Harsh's leadership, Taliyo Technologies has developed numerous successful projects 
                including ConvertFlix, a modern file conversion platform that serves thousands of users daily. 
                His expertise in React, TypeScript, and modern web technologies has made Taliyo Technologies 
                a trusted name in software development.
              </p>
            </div>
          </div>

          <div className="owner-stats">
            <h3>Harsh's Vision for Taliyo Technologies</h3>
            <div className="vision-grid">
              <div className="vision-item">
                <div className="vision-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="vision-content">
                  <h4>Innovation</h4>
                  <p>Creating cutting-edge web applications that push the boundaries of modern technology</p>
                </div>
              </div>
              <div className="vision-item">
                <div className="vision-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="vision-content">
                  <h4>Excellence</h4>
                  <p>Delivering high-quality software solutions that exceed client expectations</p>
                </div>
              </div>
              <div className="vision-item">
                <div className="vision-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="vision-content">
                  <h4>Growth</h4>
                  <p>Building a sustainable technology company that grows with its clients and community</p>
                </div>
              </div>
            </div>
          </div>

          <div className="owner-quote">
            <blockquote>
              "At Taliyo Technologies, we believe in creating software that makes a difference. 
              Our mission is to build innovative solutions that solve real problems and help businesses grow."
            </blockquote>
            <cite>- Harsh Budhauliya, Founder & CEO, Taliyo Technologies</cite>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Owner;
