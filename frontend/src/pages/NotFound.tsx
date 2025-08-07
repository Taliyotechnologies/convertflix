import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist. 
          It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">Go Home</Link>
          <Link to="/tools" className="btn btn-secondary">Browse Tools</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
