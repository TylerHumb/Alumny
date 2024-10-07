import React from 'react';
import './profile.css';
import Navbar from './Navbar'; // Import the Navbar component

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="profile-page-container">
        {/* Left Section: Profile Image and Basic Info */}
        <div className="profile-left">
          <img src="profile-picture.png" alt="Jill Anderson" className="profile-image" />
          <h2 className="profile-name">Jill Anderson</h2>
          <p className="profile-role">UI Designer</p>
          <div className="profile-details">
            <p><strong>Age:</strong> 26</p>
            <p><strong>Location:</strong> Brooklyn</p>
            <p><strong>Status:</strong> Employed</p>
          </div>
          <div className="tags">
            <span className="tag">Organized</span>
            <span className="tag">Practical</span>
            <span className="tag">Proactive</span>
          </div>
        </div>

        {/* Right Section: Bio, Motivations, Personality, etc. */}
        <div className="profile-right">
          {/* Bio */}
          <div className="card">
            <h3>Bio</h3>
            <p>
              Jill is a UI/UX Designer with 6 years of experience. She specializes in creating beautiful, user-friendly interfaces and experiences. She is always looking for ways to improve.
            </p>
          </div>

          {/* Motivations */}
          <div className="card">
            <h3>Motivations</h3>
            <div className="progress-bar"><span style={{ width: '80%' }}></span></div>
            <p>Career Growth</p>
          </div>

          {/* Personality */}
          <div className="card">
            <h3>Personality</h3>
            <div className="progress-bar"><span style={{ width: '60%' }}></span></div>
            <p>Creative</p>
          </div>

          {/* Frustrations */}
          <div className="card">
            <h3>Frustrations</h3>
            <p>Dislikes slow progress and prefers quick iterations. Can be frustrated by unclear goals or long delays.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
