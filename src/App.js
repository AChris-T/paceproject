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
import Home from './page/QuestionPage/Home';
import HomeLayout from './page/QuestionPage/HomeLayout';
import LeaderBoard from './page/QuestionPage/LeaderBoard';
import Notification from './page/QuestionPage/Notification';
import UserProfile, { EditProfile } from './page/QuestionPage/Profile';
import Question from './page/QuestionPage/Question';
import ProfileSettings from './page/QuestionPage/Profile';
import ProfileDetails from './components/ProfileComponents/ProfileDetails';

function App() {
  const [allowProfileCreation, setAllowProfileCreation] = useState(false);

  return (
    <div className="max-w-[740px] h-full mx-auto border-[1px] shadow-card overflow-hidden ">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<UtilLayout />}>
          <Route
            path="/login"
            element={
              <Login setAllowProfileCreation={setAllowProfileCreation} />
            }
          />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route
          path="/profile-creation"
          element={
            <ProtectedRoute allowProfileCreation={allowProfileCreation}>
              <Profile />{' '}
            </ProtectedRoute>
          }
        />
        <Route
          path="/question"
          element={
            <ProtectedRoute>
              <Question />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <HomeLayout />{' '}
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="leader" element={<LeaderBoard />} />
          <Route path="notification" element={<Notification />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
