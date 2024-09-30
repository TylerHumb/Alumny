import React from "react";
import './style.css';
import { Link } from "react-router-dom";

function Company() {
  return (
    <div className="formContainer">
      <form method="POST" action="/submit" encType="multipart/form-data">
        <h1>Company</h1>
        <p className="instruction">
          Input your job description to start matching! <br /> 
          Not looking for an employee? Click <Link to="/employee">here</Link> to upload your CV.
        </p>
        <div>
          <label htmlFor="compName">Company name</label>
          <input type="text" id="compName" name="compName" />
        </div>
        <div>
          <label htmlFor="compEmail">Email</label>
          <input type="email" id="compEmail" name="compEmail" />
        </div>
        <div>
          <label htmlFor="compSkill">Skill you are looking for</label>
          <input type="text" id="compSkill" name="compSkill" />
        </div>
        <div>
          <label htmlFor="jobDescription">Job Description</label>
          <input type="file" id="jobDescription" name="jobDescription" accept=".csv" />
          <textarea id="jobDesc" name="jobDesc" cols="30" rows='5'></textarea>
        </div>
        <span className="successMessage">Successfully submitted!</span>
        <input type="submit" className="formbutton" value="Submit" />
      </form>
    </div>
  );
}

export default Company;