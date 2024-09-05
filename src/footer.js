

import React from 'react';
import './Footer.css';

function footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Footer Content</h3>
        <p>This is a sample footer content. You can add any additional information here.</p>
      </div>
      <div className="footer-links">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default footer;

//typescript
/*

// JavaScript file (footer.js)
import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h3>Footer Content</h3>
        <p>This is a sample footer content. You can add any additional information here.</p>
      </div>
      <div className={styles.footerLinks}>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
*/