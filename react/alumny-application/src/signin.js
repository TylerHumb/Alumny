import React, { useState } from 'react';
import './signIn.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [activeTab, setActiveTab] = useState('Student');
  const [userId, setUserId] = useState('');  // State to hold user ID
  const [error, setError] = useState(null);  // State to hold any login errors
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // Function to handle user login with ID
  const handleSignIn = async (e) => {
    e.preventDefault();  // Prevent form submission default behavior
    setError(null);  // Reset error state

    try {
      // Make API call to the backend to validate user ID
      const response = await fetch(`/loginemp/${userId}`);
      if (!response.ok) {
        throw new Error('User not found');
      }

      const userdata = await response.json();  // Parse user data
      // Navigate to the user's profile page after successful login
      navigate(`/profile/${userId}`);
    } catch (err) {
      setError('Invalid user ID. Please try again.');
    }
  };

  return (
    <div className={`signincontainer ${isSignUp ? 'right-panel-active' : ''}`}>
      <div className={`form-container sign-up-container ${isSignUp ? 'active' : ''}`}>
        <form className="signinForm" action="#">
          <h1 className="signinH1">Create Account</h1>

          {/* Tab Links */}
          <div className="tab-container">
            <button
              type="button"
              className={`tab-button ${activeTab === 'Student' ? 'active' : ''}`}
              onClick={() => navigate(`/submit-file?tab=Student`)}  // Redirect to Student tab in SubmitFile
            >
              Student
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'Employer' ? 'active' : ''}`}
              onClick={() => navigate(`/submit-file?tab=Employer`)}  // Redirect to Employer tab in SubmitFile
            >
              Employer
            </button>
          </div>
        </form>
      </div>

      <div className={`form-container sign-in-container ${isSignUp ? '' : 'active'}`}>
        <form className="signinForm" onSubmit={handleSignIn}>
          <h1 className="signinH1">Sign in with User ID</h1>

          {/* Input for User ID */}
          <input
            className="signinInput"
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}  // Update user ID state
            required
          />

          {/* Error message */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button className="signinButton" type="submit">Sign In</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="signinH1">Welcome Back!</h1>
            <p>To keep connected with us please login with your User ID</p>
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
