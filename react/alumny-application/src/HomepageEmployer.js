import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomepageEmployer() {
    const navigate = useNavigate();  // Use React Router's useNavigate hook

    const handleStartMatchingClick = () => {
      navigate('/submit-file');  // Navigate to the SubmitFile page
    };

  return (
    <>
      <header>
        <img src="logo.png" alt="Logo" />
        <div className="menu-icon">
          <img src="search-icon.png" alt="Search" />
          <img src="menu-icon.png" alt="Menu" />
        </div>
      </header>
      
      <div className="container">
         <h1>Match with Suitable Candidates!</h1>
        <button className="start-matching" onClick={handleStartMatchingClick}>Start Matching</button>
        <h2>Student Recommendation</h2>
        <div className="card-list">
          <div className="card">
            <img src="./images/Placeholder.png" alt="Profile" />
            <p>Student Name</p>
          </div>
          <div className="card">
            <img src="./images/Placeholder.png" alt="Profile" />
            <p>Student Name</p>
          </div>
          <div className="card">
            <img src="./images/Placeholder.png" alt="Profile" />
            <p>Student Name</p>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default HomepageEmployer;
