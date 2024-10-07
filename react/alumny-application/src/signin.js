import React, { useState } from 'react';
import './signIn.css';

function SignIn() {
  // Manage active view between Sign In and Sign Up
  const [isSignUp, setIsSignUp] = useState(false);

  // Manage active tab (Student or Employer) in the Sign Up form
  const [activeTab, setActiveTab] = useState('Student');

  const handleSignUpClick = () => {
    setIsSignUp(true);  // Show Sign Up form
  };

  const handleSignInClick = () => {
    setIsSignUp(false);  // Show Sign In form
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);  // Change the active tab (Student or Employer)
  };

  return (
    <div className={`signincontainer ${isSignUp ? 'right-panel-active' : ''}`}>
      <div className={`form-container sign-up-container ${isSignUp ? 'active' : ''}`}>
        <form className="signinForm" action="#">
          <h1 className="signinH1">Create Account</h1>
          <div className="social-container">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-google-plus-g"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span className="signinSpan">or use your email for registration</span>

          {/* Tab Links */}
          <div className="tab-container">
            <button
              className={`tab-button ${activeTab === 'Student' ? 'active' : ''}`}
              onClick={() => handleTabChange('Student')}
            >
              Student
            </button>
            <button
              className={`tab-button ${activeTab === 'Employer' ? 'active' : ''}`}
              onClick={() => handleTabChange('Employer')}
            >
              Employer
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'Student' && (
            <div id="Student" className="tabcontent">
              {/* <input className="signinInput" type="text" placeholder="Name" required />
              <input className="signinInput" type="email" placeholder="Email" required />
              <input className="signinInput" type="password" placeholder="Password" required /> */}
            </div>
          )}

          {activeTab === 'Employer' && (
            <div id="Employer" className="tabcontent">
              {/* <input className="signinInput" type="text" placeholder="Company Name" required />
              <input className="signinInput" type="email" placeholder="Email" required />
              <input className="signinInput" type="password" placeholder="Password" required /> */}
            </div>
          )}

          {/* <button className="signinButton">Sign Up</button> */}
        </form>
      </div>

      <div className={`form-container sign-in-container ${isSignUp ? '' : 'active'}`}>
        <form className="signinForm" action="#" method="POST">
          <h1 className="signinH1">Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"></a>
            <a href="#" className="social"></a>
            <a href="#" className="social"></a>
          </div>
          <span className="signinSpan">or use your account</span>
          <input className="signinInput" type="email" placeholder="Email" required />
          <input className="signinInput" type="password" placeholder="Password" required />
          <a href="#" className="signinA">Forgot your password?</a>
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
