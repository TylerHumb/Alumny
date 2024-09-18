import React from "react";
//import './style.css';
import { Link } from "react-router-dom";

function Employee() {
  return (
    <div className="formContainer">
      <form method="POST" action="/submit" encType="multipart/form-data">
        <h1>Employee</h1>
        <p className="instruction">Input your work experience to start matching!</p>
        <p>
          Not looking for a job? Click <Link to="/company">here</Link> for company's upload.
        </p>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="dob">Date of birth</label>
          <input type="date" id="dob" name="dob" />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" />
        </div>
        <div>
          <label htmlFor="workExp">Previous experience</label>
          <textarea id="workExp" name="workExp" cols="30" rows='5'>jobDescription</textarea>
        </div>
        <div>
          <label htmlFor="resume">Resume</label>
          <input type="file" id="resume" name="resume" />
        </div>
        <span className="successMessage">Successfully submitted!</span>
        <input type="submit" className="formbutton" value="Submit" />
      </form>
    </div>
  );
}

export default Employee;