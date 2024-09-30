import React from 'react';
import './mainPage.css'; 
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const MainPage = () => {
  return (
    <div className='mainpageContainer'>
      <header className="mainpageHeader">
        <img src="images\Placeholder.png" alt="Logo" className="logo" />
        <p>Welcome to Alumly</p>
      </header>

      <div className="main-container">
        <div className="match-banner">
          <h1>Match with suitable candidates!</h1>
          <button className="start-matching">Start matching</button>
        </div>

        <div className="student-recommendations">
          <h2>Student recommendation</h2>
          <div className="recommendation-list">
            <div className="recommendation-card">
              <img src="placeholder.png" alt="Student Image" className="recommendation-image" />
              <p>Text 1</p>
              <p>$0</p>
              <p>Body text</p>
            </div>
            <div className="recommendation-card">
              <img src="placeholder.png" alt="Student Image" className="recommendation-image" />
              <p>Text 2</p>
              <p>$0</p>
              <p>Body text</p>
            </div>
            <div className="recommendation-card">
              <img src="placeholder.png" alt="Student Image" className="recommendation-image" />
              <p>Text 3</p>
              <p>$0</p>
              <p>Body text</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-section">
          <div className="footer-element">
            <h3>Use Cases</h3>
            <a href="#">UI Design</a>
            <a href="#">UX Design</a>
            <a href="#">Wire framing</a>
            <a href="#">Brainstorming</a>
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-element">
            <h3>Explore</h3>
            <a href="#">Design</a>
            <a href="#">Prototyping</a>
            <a href="#">Collaboration</a>
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-element">
            <h3>Resources</h3>
            <a href="#">Blog</a>
            <a href="#">Best Practices</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;