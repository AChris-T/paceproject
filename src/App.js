import React, { useEffect, useState } from 'react';
import './App.css';
import UtilLayout from '../src/utils/UtilLayout';
import Login from '../src/utils/LoginForm';
import Register from '../src/utils/RegisterForm';
import ForgetPassword from '../src/utils/ForgetPassword';

import { Routes, Route, Navigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import Profile from './page/Profile';
import ProtectedRoute from './constants/ProtectedRoute';
import ResetPassword from './utils/ResetPassword';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<UtilLayout />}>
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route
          path="/profile-creation"
          element={
            <ProtectedRoute>
              <Profile />{' '}
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
