import React, { useState } from 'react';
import './submitFile.css';
import Navbar from './Navbar.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { ring2 } from 'ldrs';  // Import the ring2 component

ring2.register();  // Register the loader

function SubmitFile() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'Student';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [formData, setFormData] = useState({ name: '', resume: null });
  const [loading, setLoading] = useState(false);  // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeName = formData.name;

    if (!employeeName) {
      alert("Please provide a name.");
      return;
    }

    try {
      setLoading(true);  // Start loading
      const response = await fetch(`/createemp/${encodeURIComponent(employeeName)}`, { method: 'POST' });

      if (!response.ok) {
        throw new Error('Error creating employee');
      }

      const result = await response.json();
      alert(`Employee created successfully with ID: ${result.userid}`);

      const resumeContent = formData.resume;
      if (resumeContent) {
        await updateResume(result.userid, resumeContent);
        await extractSkills(result.userid);
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('An error occurred during submission.');
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  const updateResume = async (employeeId, resumeContent) => {
    try {
      const response = await fetch(`/resume/${employeeId}/${encodeURIComponent(resumeContent)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Error updating resume');
    } catch (error) {
      console.error('Error submitting the resume:', error);
      alert('An error occurred during resume submission.');
    }
  };

  const extractSkills = async (employeeId) => {
    try {
      const response = await fetch(`/extractskillsemp/${employeeId}`, { method: 'GET' });
      if (!response.ok) throw new Error('Failed to extract skills.');
      navigate(`/profile/${employeeId}`);
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

      {/* Conditionally show loading animation */}
      {loading ? (
        <div className="loading-container">
          <l-ring-2
            size="40"
            stroke="5"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8"
            color="black"
          ></l-ring-2>
          <p>Processing, please wait...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {activeTab === 'Student' ? (
            <>
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
      )}
    </div>
  );
}

export default SubmitFile;
