// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={require("./images/alumly.png")} alt="Alumly Logo" />
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/submit-file" className="navbar-link">Submit Profile</Link>
          </li>
          {/* <li className="navbar-item">
            <Link to="/matching-results" className="navbar-link">Matching Results</Link>
          </li> */}
          <li className="navbar-item">
            <Link to="/signin" className="navbar-link">Sign In</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
