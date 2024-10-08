import React, { useState } from 'react';
import './submitFile.css';
import Navbar from './Navbar.js';
import { useNavigate } from 'react-router-dom';  // For navigation after submission

const skills = ['Communication', 'Time Management', 'Leadership', 'Problem Solving', 'Critical Thinking'];

function SubmitFile() {
  const [activeTab, setActiveTab] = useState('Student');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    address: '',
    bio: '',
    personality: '',
    motivations: '',
    goals: '',
    frustrations: [],
    favoriteBrands: '',
    resume: null,
    compName: '',
    compEmail: '',
    compSkill: '',
    jobTitle: '',
    employerResume: null
  });

  const navigate = useNavigate();  // For navigation after submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file selection for text files (resume)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, resume: reader.result });
      };
      reader.readAsText(file);
    } else {
      alert('Only .txt files are allowed.');
    }
  };

  // Handle skill selection as tags
  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setFormData({ ...formData, frustrations: [...selectedSkills, skill] });
    }
  };

  // Remove skill from selection
  const handleSkillRemove = (skill) => {
    const newSkills = selectedSkills.filter((selectedSkill) => selectedSkill !== skill);
    setSelectedSkills(newSkills);
    setFormData({ ...formData, frustrations: newSkills });
  };

  // Submit the employee name and create the employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeName = formData.name;  // 'name' is the employee name

    if (!employeeName) {
      alert("Please provide a name.");
      return;
    }

    try {
      // Send a POST request to the backend with employee name in the URL
      const response = await fetch(`/createemp/${encodeURIComponent(employeeName)}`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Error creating employee');
      }

      const result = await response.json();

      console.log('Success:', result);
      alert(`Employee created successfully with ID: ${result.userid}`);

      // After creating the employee, update the resume
      const resumeContent = formData.resume;
      if (resumeContent) {
        await updateResume(result.userid, resumeContent);  // Call the function to update resume

        // Once the resume is updated, extract skills from the resume
        await extractSkills(result.userid);  // Extract skills after updating resume
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('An error occurred during submission.');
    }
  };


  // Function to update the resume of the newly created employee
  const updateResume = async (employeeId, resumeContent) => {
    try {
      const response = await fetch(`/resume/${employeeId}/${encodeURIComponent(resumeContent)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Resume updated successfully:', result);
      } else {
        console.error('Error updating resume');
        alert('Failed to update resume.');
      }
    } catch (error) {
      console.error('Error submitting the resume:', error);
      alert('An error occurred during resume submission.');
    }
  };

  // Function to extract skills from the resume for the employee
  const extractSkills = async (employeeId) => {
    try {
      const response = await fetch(`/extractskillsemp/${employeeId}`, {
        method: 'GET'
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Skills extracted successfully:', result);

        // After successful skill extraction, navigate to the skills page
        navigate(`/skillsemp/${employeeId}`);
      } else {
        console.error('Error extracting skills');
        alert('Failed to extract skills.');
      }
    } catch (error) {
      console.error('Error extracting skills:', error);
      alert('An error occurred during skill extraction.');
    }
  };

  return (
    <div className="submit-file-container">
      <Navbar />
      <h1>Submit Your Information</h1>
      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'Student' ? 'active' : ''}`}
          onClick={() => setActiveTab('Student')}
        >
          Student
        </button>
        <button
          className={`tab-button ${activeTab === 'Employer' ? 'active' : ''}`}
          onClick={() => setActiveTab('Employer')}
        >
          Employer
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === 'Student' ? (
          <>
            {/* Student Form */}
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio:</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write your bio here"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="personality">Personality:</label>
              <textarea
                name="personality"
                value={formData.personality}
                onChange={handleChange}
                placeholder="Describe your personality"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="motivations">Motivations:</label>
              <textarea
                name="motivations"
                value={formData.motivations}
                onChange={handleChange}
                placeholder="What motivates you?"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="goals">Goals:</label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                placeholder="Your career goals"
                required
              />
            </div>

            {/* Skills (What Frustrates You) */}
            <div className="form-group">
              <label htmlFor="frustrations">What Frustrates You:</label>
              <div className="skills-container">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    className="skill-tag"
                    onClick={() => handleSkillSelect(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <div className="selected-skills">
                {selectedSkills.map((skill) => (
                  <span key={skill} className="selected-skill">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Resume Upload */}
            <div className="form-group">
              <label htmlFor="resume">Upload Resume (.txt):</label>
              <input
                type="file"
                name="resume"
                accept=".txt"
                onChange={handleFileChange}
                required
              />
            </div>
          </>
        ) : (
          <>
            {/* Employer Form */}
            <div className="form-group">
              <label htmlFor="jobTitle">Job Title:</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Enter the job title"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="compName">Company Name:</label>
              <input
                type="text"
                name="compName"
                value={formData.compName}
                onChange={handleChange}
                placeholder="Enter the company name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="compEmail">Company Email:</label>
              <input
                type="email"
                name="compEmail"
                value={formData.compEmail}
                onChange={handleChange}
                placeholder="Enter the company email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="compSkill">Skill you are looking for:</label>
              <input
                type="text"
                name="compSkill"
                value={formData.compSkill}
                onChange={handleChange}
                placeholder="Enter the skill you are looking for"
                required
              />
            </div>

            {/* Employer Resume Upload */}
            <div className="form-group">
              <label htmlFor="employerResume">Upload Job Description Document (.txt):</label>
              <input
                type="file"
                name="employerResume"
                accept=".txt"
                onChange={handleFileChange}
                required
              />
            </div>
          </>
        )}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default SubmitFile;
