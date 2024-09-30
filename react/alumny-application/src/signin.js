import React, { useState } from 'react';
import './signIn.css';

function SignIn() {
  // Tab management using React state (i think this would be easier to use instead of opencity)
  const [activeTab, setActiveTab] = useState('Employer');

  const openTab = (event, tabName) => {
    setActiveTab(tabName);  // Set the active tab
  };


//for the tab in SingUp section
function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

  return (
    <div className="signincontainer">
      <div className="form-container sign-up-container">
        <form className='signinForm' action="#">
          <h1 className='signinH1'>Create Account</h1>
          <div className="social-container">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-google-plus-g"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span className='signinSpan'>or use your email for registration</span>

          {/* Tab links */}openCity(event, 'Student')
            <div class="tab">
                <button type="button" class="tablinks" onClick={"openCity(event, 'Student')"}>Student</button>
                <button type="button" class="tablinks" onclick="openCity(event, 'Employer')">Employer</button>
            </div>

          {/* Tab content */}
          <div id="Student" className="tabcontent" style={{ display: activeTab === 'Student' ? 'block' : 'none' }}>
            <input className='signinInput' id="studentName" type="text" placeholder="Name" required />
            <input className='signinInput' id="studentEmail" type="email" placeholder="Email" required />
            <input className='signinInput' id="studentPassword" type="password" placeholder="Password" required />
          </div>
            {/* Only displays if 'activeTab' is set to employer. no visual differences yet but ids are different */} 
          <div id="Employer" className="tabcontent" style={{ display: activeTab === 'Employer' ? 'block' : 'none' }}>
            <input className='signinInput' id="employerName" type="text" placeholder="Name" required />
            <input className='signinInput' id="employerEmail" type="email" placeholder="Email" required />
            <input className='signinInput' id="employerPassword" type="password" placeholder="Password" required />
          </div>

          <button className="signinButton">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in-container">
        <form  className='signinForm' action="#" method="POST">
          <h1 className='signinH1'>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"></a>
            <a href="#" className="social"></a>
            <a href="#" className="social"></a>
          </div>
          <span className='signinSpan'>or use your account</span>
          <input className='signinInput' type="email" placeholder="Email" required />
          <input className='signinInput' type="password" placeholder="Password" required />
          <a href="#" className="signinA">Forgot your password?</a>
          <button className="signinButton">Sign In</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className='signinH1'>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="signinButton ghost" id="signIn">Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className='signinH1'>Hello!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="signinButton ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;