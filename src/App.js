import React, { useEffect, useState } from 'react';
import './App.css';
import UtilLayout from '../src/utils/UtilLayout';
import Login from '../src/utils/LoginForm';
import Register from "../src/utils/RegisterForm"
import ForgetPassword from "../src/utils/ForgetPassword"

import { Routes,Route, Navigate } from 'react-router-dom';
import Home from './appPage/Home';
import Profile from './appPage/Profile/ProfileDetails.jsx';
import Department from './appPage/Profile/Department.jsx';
import Subject from './appPage/Profile/Subject.jsx';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsAuthenticated(true);
      setIsProfileComplete(user.isProfileComplete);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setIsProfileComplete(userData.isProfileComplete);
  };


  return (
    <div className="App">
        <ToastContainer/>
        <Routes>
            <Route path="/" element={<UtilLayout/>}>
            <Route path="/" element={<Navigate to={isAuthenticated ? (isProfileComplete ? "/app" : "/profile") : "/login"} />} />
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to={isProfileComplete ? "/app" : "/profile"}  />} />
          <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        </Route>
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/app" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            
          </Routes>            
    </div>
  );
}

export default App;
