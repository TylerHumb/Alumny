import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LinkPage from './linkPage';
import Company from './company';
import Employee from './employee';
import SignIn from './signin';
import MainPage from './mainpage';
import ProfilePage from './profilePage';
import HomepageEmployer from './HomepageEmployer';
import SubmitFile from './submitFile';
import StudentDashboard from './StudentDashboard';
import EmployerDashboard from './EmployerDashboard';
import { UserProvider } from './UserContext';  // Import UserProvider
import './App.css';  // New CSS file for consistent styling
import Test from './test'

function App() {
  const location = useLocation();

  // Function to check if the current path is the root
  const isRootPath = location.pathname === '/';

  return (
    <div className="app-container"> {/* Container for consistent layout */}
    <UserProvider>
      <Routes>
        <Route path="/" element={<LinkPage />} />
        <Route path="/homepageEmployer" element={<HomepageEmployer />} />
        <Route path="/company" element={<Company />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/submit-file" element={<SubmitFile />} />
        <Route path='/test'element={<Test/>}/>
      </Routes>
    </UserProvider>
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
