import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('convertflix-token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('convertflix-token');
    setIsLoggedIn(false);
    setIsProfileDropdownOpen(false);
  };

  const handleLogin = () => {
    localStorage.setItem('convertflix-token', 'dummy-token');
    setIsLoggedIn(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsToolsDropdownOpen(false);
    setIsCompanyDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <span className="logo-text">ConvertFlix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav desktop-nav">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            
            {/* Tools Dropdown */}
            <div className="dropdown">
              <button 
                className={`nav-link dropdown-toggle ${isToolsDropdownOpen ? 'active' : ''}`}
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
              >
                Tools
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </button>
              <div className={`dropdown-menu ${isToolsDropdownOpen ? 'show' : ''}`}>
                <Link to="/tools/image" className="dropdown-item" onClick={() => setIsToolsDropdownOpen(false)}>
                  Image
                </Link>
                <Link to="/tools/video" className="dropdown-item" onClick={() => setIsToolsDropdownOpen(false)}>
                  Video
                </Link>
                <Link to="/tools/pdf" className="dropdown-item" onClick={() => setIsToolsDropdownOpen(false)}>
                  PDF
                </Link>
                <Link to="/tools/audio" className="dropdown-item" onClick={() => setIsToolsDropdownOpen(false)}>
                  Audio
                </Link>
              </div>
            </div>

            {/* Company Dropdown */}
            <div className="dropdown">
              <button 
                className={`nav-link dropdown-toggle ${isCompanyDropdownOpen ? 'active' : ''}`}
                onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
              >
                Company
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </button>
              <div className={`dropdown-menu ${isCompanyDropdownOpen ? 'show' : ''}`}>
                <Link to="/about" className="dropdown-item" onClick={() => setIsCompanyDropdownOpen(false)}>
                  About Us
                </Link>
                <Link to="/contact" className="dropdown-item" onClick={() => setIsCompanyDropdownOpen(false)}>
                  Contact
                </Link>
                <Link to="/owner" className="dropdown-item" onClick={() => setIsCompanyDropdownOpen(false)}>
                  Owner
                </Link>
                <Link to="/terms" className="dropdown-item" onClick={() => setIsCompanyDropdownOpen(false)}>
                  Terms
                </Link>
                <Link to="/privacy" className="dropdown-item" onClick={() => setIsCompanyDropdownOpen(false)}>
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="navbar-right">
            {/* Theme Toggle */}
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
            </button>

            {/* Auth Buttons / Profile */}
            {!isLoggedIn ? (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-ghost">Login</Link>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              </div>
            ) : (
              <div className="profile-dropdown">
                <button 
                  className="profile-toggle"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <div className="profile-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                </button>
                <div className={`dropdown-menu ${isProfileDropdownOpen ? 'show' : ''}`}>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'show' : ''}`}>
          <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
            Home
          </Link>
          
          <div className="mobile-dropdown">
            <button 
              className="mobile-dropdown-toggle"
              onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
            >
              Tools
              <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
            <div className={`mobile-dropdown-menu ${isToolsDropdownOpen ? 'show' : ''}`}>
              <Link to="/tools/image" className="mobile-dropdown-item" onClick={closeMobileMenu}>
                Image
              </Link>
              <Link to="/tools/video" className="mobile-dropdown-item" onClick={closeMobileMenu}>
                Video
              </Link>
              <Link to="/tools/pdf" className="mobile-dropdown-item" onClick={closeMobileMenu}>
                PDF
              </Link>
              <Link to="/tools/audio" className="mobile-dropdown-item" onClick={closeMobileMenu}>
                Audio
              </Link>
            </div>
          </div>

          <div className="mobile-dropdown">
            <button 
              className="mobile-dropdown-toggle"
              onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
            >
              Company
              <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
            <div className={`mobile-dropdown-menu ${isCompanyDropdownOpen ? 'show' : ''}`}>
              <Link to="/about" className="mobile-dropdown-item" onClick={closeMobileMenu}>
                About Us
              </Link>
              <Link to="/contact" className="mobile-dropdown-item" onClick={closeMobileMenu}>
                Contact
              </Link>
              <Link to="/owner" className="mobile-dropdown-item" onClick={closeMobileMenu}>
                Owner
              </Link>
              <Link to="/terms" className="mobile-dropdown-item" onClick={closeMobileMenu}>
                Terms
              </Link>
              <Link to="/privacy" className="mobile-dropdown-item" onClick={closeMobileMenu}>
                Privacy Policy
              </Link>
            </div>
          </div>

          {!isLoggedIn ? (
            <div className="mobile-auth-buttons">
              <Link to="/login" className="btn btn-ghost" onClick={closeMobileMenu}>
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary" onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </div>
          ) : (
            <button className="mobile-logout-btn" onClick={() => { handleLogout(); closeMobileMenu(); }}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
