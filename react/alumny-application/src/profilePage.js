import React from 'react';
import './profile.css';

const ProfilePage = () => {
  return (
    <div className="profile-container">
      {/* Profile Left Section */}
      <div className="profile-left">
        <img src="profile-picture.png" alt="Jill Anderson" />
        <h2>Jill Anderson</h2>
        <p>UI/UX Designer<br />Age: 27 | London, UK</p>
        <div className="buttons">
          <button>Contact</button>
          <button>Follow</button>
        </div>
      </div>

      {/* Profile Right Section */}
      <div className="profile-right">
        {/* Bio Card */}
        <div className="card">
          <h3>Bio</h3>
          <p>
            Jill Anderson is a talented UI/UX designer with over 6 years of experience in the field. She specializes in creating beautiful, user-friendly interfaces and experiences.
          </p>
        </div>

        {/* Motivation Card */}
        <div className="card">
          <h3>Motivations</h3>
          <div className="progress">
            <span style={{ width: '80%' }}></span>
          </div>
          <p>High motivation for career growth and challenges.</p>
        </div>

        {/* Personality Card */}
        <div className="card">
          <h3>Personality</h3>
          <div className="progress">
            <span style={{ width: '60%' }}></span>
          </div>
          <p>Creative and calm personality type.</p>
        </div>

        {/* Frustrations Card */}
        <div className="card">
          <h3>Frustrations</h3>
          <p>
            Dislikes slow progress, prefers quick iterations. Can be frustrated by unclear goals or long delays.
          </p>
        </div>

        {/* Goals Card */}
        <div className="card">
          <h3>Goals</h3>
          <p>Wants to become a lead UI/UX designer in the next two years.</p>
        </div>

        {/* Favourite Brands Card */}
        <div className="card">
          <h3>Favourite Brands</h3>
          <p>Adidas, Nike, Zara, Netflix</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;