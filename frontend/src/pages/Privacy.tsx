import React from 'react';
import './Privacy.css';

const Privacy: React.FC = () => {
  return (
    <div className="privacy-page">
      <div className="container">
        <div className="privacy-header">
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">
            Last updated: January 2024
          </p>
        </div>

        <div className="privacy-content">
          <section className="privacy-section">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              upload files, or contact us for support. This may include:
            </p>
            <ul>
              <li>Name and email address when you create an account</li>
              <li>Files you upload for conversion (temporarily stored)</li>
              <li>Usage data and analytics</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process your file conversions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. File Storage and Security</h2>
            <p>
              Your uploaded files are processed securely and are automatically deleted after conversion. 
              We do not store your files permanently. All file processing is done using industry-standard 
              encryption and security measures.
            </p>
          </section>

          <section className="privacy-section">
            <h2>4. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties. 
              We may share your information only in the following circumstances:
            </p>
            <ul>
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information only as long as necessary to provide our services. 
              Uploaded files are deleted immediately after processing. Account information is retained 
              until you delete your account or request deletion.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to improve your experience, analyze usage, 
              and provide personalized content. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="privacy-section">
            <h2>8. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13. We do not knowingly collect 
              personal information from children under 13. If you believe we have collected such information, 
              please contact us immediately.
            </p>
          </section>

          <section className="privacy-section">
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="privacy-section">
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at:
            </p>
            <p>
              Email: privacy@convertflix.com<br />
              Address: 123 Tech Street, San Francisco, CA 94105
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
