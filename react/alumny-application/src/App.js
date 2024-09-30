import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import LinkPage from './linkPage';
import Company from './company';
import Employee from './employee';
import SignIn from './signin';
import MainPage from './mainpage';
import ProfilePage from './profilePage';

function App() {
  const location = useLocation();

  // Function to check if the current path is the root
  const isRootPath = location.pathname === '/';

  return (
    <div>
      {/* Route Definitions, for every page we want to navigate to we need to declare a route definition, basically the path to the file, as well as import it at the top of this doc */}
      <Routes>
        <Route path="/" element={<LinkPage />} />
        <Route path="/company" element={<Company />} />
        <Route path='/employee'element={<Employee/>}/>
        <Route path='/signin'element={<SignIn/>}/>
        <Route path='/mainPage'element={<MainPage/>}/>
        <Route path='/profilepage'element={<ProfilePage/>}/>
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