import React from "react"
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
function linkpage() {
    return (
    <div class="linkCenter">
      <li><Link to="/company">Company</Link></li>
      <li><Link to='/employee'>Employees Info submit</Link></li>
      <li><Link to="/signin">Signup</Link></li>
      <li><Link to='/mainpage'>Main Page </Link></li>
      <li><Link to='/profilepage'>Profile Page </Link></li>
      <li><Link to='/test'>test </Link></li>
    </div>);
  }
  
  export default linkpage;
