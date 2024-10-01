import React, { useState } from 'react';
import './submitFile.css';
import Navbar from './Navbar.js';
import { getDocument } from 'pdfjs-dist';  // Import PDF.js

// Simulated skills from a database (you can replace this with an actual API call)
const skills = ['Communication', 'Time Management', 'Leadership', 'Problem Solving', 'Critical Thinking'];

function SubmitFile() {
  const [activeTab, setActiveTab] = useState('Student'); // Tab switcher
  const [selectedSkills, setSelectedSkills] = useState([]); // To manage selected skills
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const { name, type } = file;

    if (type === 'application/pdf') {
      // Convert PDF to text
      const text = await convertPdfToText(file);
      setFormData({ ...formData, [name]: text });
    } else if (type === 'text/plain' || type === 'application/csv') {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, [name]: reader.result });
      };
      reader.readAsText(file);
    } else {
      alert('Only .txt, .pdf, and .csv files are allowed.');
    }
  };

  // Convert PDF to text
  const convertPdfToText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await getDocument(arrayBuffer).promise;
    let text = '';
    const numPages = pdfDoc.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const pageText = await page.getTextContent();
      pageText.items.forEach((item) => {
        text += item.str + ' ';
      });
    }

    return text;
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

  // Submit the data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = new FormData(); // FormData for file handling
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        dataToSubmit.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('/api/submit-profile', {
        method: 'POST',
        body: dataToSubmit
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        alert('Form submitted successfully');
      } else {
        console.error('Error:', response.statusText);
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('An error occurred during form submission');
    }
  };

  return (
    <div className="submit-file-container">
        < Navbar />
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
              <label htmlFor="resume">Upload Resume (.txt or .pdf):</label>
              <input
                type="file"
                name="resume"
                accept=".txt,.pdf"
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
              <label htmlFor="employerResume">Upload Job Description Document (.txt or .pdf):</label>
              <input
                type="file"
                name="employerResume"
                accept=".txt,.pdf"
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
