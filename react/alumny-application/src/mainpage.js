import React, { useEffect } from 'react';
import './mainPage.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';  // Import the context
import Navbar from './Navbar';

function MainPage() {
  const { userType } = useUser();  // Get the userType from the context
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on user type
    if (userType === 'student') {
      navigate('/student-dashboard'); // Route to Student page
    } else if (userType === 'employer') {
      navigate('/employer-dashboard'); // Route to Employer page
    }
  }, [userType, navigate]);

  const handleStartMatchingClick = () => {
    navigate('/submit-file');  // Navigate to the SubmitFile page
  };

  return (
    <>
    <Navbar />
    <div className='mainpageContainer'>

      <div className="main-container">
        <div className="match-banner">
          <h1>Match with suitable candidates!</h1>
          <button className="start-matching" onClick={handleStartMatchingClick}>Start Matching</button>
        </div>

        <div className="student-recommendations">
          <h2>Student recommendation</h2>
          <div className="recommendation-list">
            <div className="recommendation-card">
              <img src="placeholder.png" alt="Student Image" className="recommendation-image" />
              <p>Text 1</p>
              <p>Body text</p>
            </div>
            <div className="recommendation-card">
              <img src="placeholder.png" alt="Student Image" className="recommendation-image" />
              <p>Text 2</p>
              <p>Body text</p>
            </div>
            <div className="recommendation-card">
              <img src="placeholder.png" alt="Student Image" className="recommendation-image" />
              <p>Text 3</p>
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
    </>
  );
}

export default MainPage;
