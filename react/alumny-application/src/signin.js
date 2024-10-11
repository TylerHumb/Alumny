import React, { useState } from 'react';
import './signIn.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [activeTab, setActiveTab] = useState('Student');
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // Function to handle redirection to SubmitFile page with the correct tab (Student/Employer)
  const redirectToSubmitFile = (tab) => {
    navigate(`/submit-file?tab=${tab}`);  // Redirect to SubmitFile component with the active tab
  };

  return (
    <div className={`signincontainer ${isSignUp ? 'right-panel-active' : ''}`}>
      <div className={`form-container sign-up-container ${isSignUp ? 'active' : ''}`}>
        <form className="signinForm" action="#">
          <h1 className="signinH1">Create Account</h1>
          {/* <span className="signinSpan">or use your email for registration</span> */}

          {/* Tab Links */}
          <div className="tab-container">
            <button
              type="button"
              className={`tab-button ${activeTab === 'Student' ? 'active' : ''}`}
              onClick={() => redirectToSubmitFile('Student')}  // Redirect to Student tab in SubmitFile
            >
              Student
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'Employer' ? 'active' : ''}`}
              onClick={() => redirectToSubmitFile('Employer')}  // Redirect to Employer tab in SubmitFile
            >
              Employer
            </button>
          </div>
        </form>
      </div>

      <div className={`form-container sign-in-container ${isSignUp ? '' : 'active'}`}>
        <form className="signinForm" action="#" method="POST">
          <h1 className="signinH1">Sign in</h1>
          <input className="signinInput" type="email" placeholder="Email" required />
          <input className="signinInput" type="password" placeholder="Password" required />
          {/* <a href="#" className="signinA">Forgot your password?</a> */}
          <button className="signinButton">Sign In</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="signinH1">Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="signinButton ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="signinH1">Hello!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="signinButton ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
