import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import LinkPage from './linkPage';
import Company from './company'; // Updated to the new component name

function App() {
  const location = useLocation();

  // Function to check if the current path is the root
  const isRootPath = location.pathname === '/';

  return (
    <div>
      {/* Conditionally render the navigation links */}
      {isRootPath && (
        <nav>
          <ul>
            <li><Link to="/">Link Page</Link></li>
            <li><Link to="/company">Company</Link></li>
          </ul>
        </nav>
      )}

      {/* Route Definitions */}
      <Routes>
        <Route path="/" element={<LinkPage />} />
        <Route path="/company" element={<Company />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}