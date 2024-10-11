import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
import Navbar from './Navbar'; // Import the Navbar component

const ProfilePage = () => {
  const { userId } = useParams();  // Retrieve the user ID from the URL
  const [user, setUser] = useState(null);  // Store user data
  const [skills, setSkills] = useState([]);  // Store user's extracted skills
  const [error, setError] = useState(null);  // Handle errors

  // Fetch user data and skills when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details (name, resume, frustrations, etc.)
        const response = await fetch(`/loginemp/${userId}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const userData = await response.json();
        setUser(userData);  // Set the user data in the state
        
        // Fetch the extracted skills
        const skillsResponse = await fetch(`/skillsemp/${userId}`);
        if (!skillsResponse.ok) {
          throw new Error('Skills not found');
        }
        const skillsData = await skillsResponse.json();
        setSkills(skillsData);  // Set the extracted skills in the state
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="profile-page-container">
        {error ? (
          <p className="error">{error}</p>
        ) : user ? (
          <>
            {/* Left Section: Profile Image and Basic Info */}
            <div className="profile-left">
              <img src="profile-picture.png" alt={user.Name} className="profile-image" />
              <h2 className="profile-name">{user.Name}</h2>
              <p className="profile-role">Student/Employer</p> {/* You can adjust the role dynamically */}
              <div className="profile-details">
                <p><strong>User ID:</strong> {userId}</p>
                <p><strong>Resume:</strong> {user.resume || 'No resume available'}</p>
              </div>

              {/* Display tags (e.g., Personality/Frustrations) */}
              {user.frustrations && user.frustrations.length > 0 && (
                <div className="tags">
                  {user.frustrations.map((frustration, index) => (
                    <span key={index} className="tag">{frustration}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Right Section: Bio, Motivations, Skills, etc. */}
            <div className="profile-right">
              {/* Bio */}
              <div className="card">
                <h3>Bio</h3>
                <p>{user.bio || 'No bio provided'}</p>
              </div>

              {/* Motivations */}
              <div className="card">
                <h3>Motivations</h3>
                <div className="progress-bar"><span style={{ width: '80%' }}></span></div>
                <p>{user.motivations || 'No motivations provided'}</p>
              </div>

              {/* Extracted Skills */}
              <div className="card">
                <h3>Extracted Skills</h3>
                {skills.length > 0 ? (
                  <ul>
                    {skills.map(skill => (
                      <li key={skill.Skill_ID}>{skill.Skill_Name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No skills found</p>
                )}
              </div>

              {/* Frustrations */}
              <div className="card">
                <h3>Frustrations</h3>
                <p>{user.frustrations && user.frustrations.length > 0 ? user.frustrations.join(', ') : 'No frustrations provided'}</p>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
