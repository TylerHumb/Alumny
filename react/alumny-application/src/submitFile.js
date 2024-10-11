import React, { useState, useEffect } from 'react';
import './submitFile.css';
import Navbar from './Navbar.js';
import { useNavigate, useLocation } from 'react-router-dom';  // Import useLocation to get query parameters

// const skills = ['Communication', 'Time Management', 'Leadership', 'Problem Solving', 'Critical Thinking'];

function SubmitFile() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'Student';  // Get 'tab' from query params, default to 'Student'

  const [activeTab, setActiveTab] = useState(initialTab);  // Initialize active tab from URL param
  // const [selectedSkills, setSelectedSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    resume: null,
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
        navigate(`/profile/${employeeId}`);
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
              <label htmlFor="name">Company Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your company name"
                required
              />
            </div>

            {/* Resume Upload */}
            <div className="form-group">
              <label htmlFor="resume">Upload Job Description (.txt):</label>
              <input
                type="file"
                name="resume"
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
