import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a context to share profile data between components
export const ProfileContext = React.createContext();

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        setError('Authentication token not found');
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `https://pace-app-backend-v1.onrender.com/api/v1/student/get-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfileData(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(
        err.response?.data?.data?.message || 'Failed to fetch profile data'
      );
      setLoading(false);

      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };
  console.log('This is the profile data', profileData);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-center mb-4">{error}</p>
        <button
          onClick={() => fetchProfileData()}
          className="text-emerald-500 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      <div className="border h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-hide">
        {/* Header */}
        <div className="bg-emerald-500">
          <div className="px-6 pt-8 pb-4 flex justify-between items-center">
            <h1 className="text-white text-2xl">Profile</h1>
            <button
              onClick={() => navigate('/app/edit-profile')}
              className="text-white bg-emerald-400/20 p-2 rounded-full"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
              </svg>
            </button>
          </div>

          {/* Profile Card */}
          <div className="px-6">
            <div className="pb-6 flex flex-col items-center">
              <div className="relative z-[10]">
                <div className="absolute bg-[#39C094] w-[180px] z-[1] top-[4px] left-[4px] shadow-sm h-[180px] rounded-[20px]"></div>
                <div className="relative z-[10] shadow-md w-[180px] bg-white h-[180px] rounded-[20px] overflow-hidden mb-4">
                  <img
                    src={profileData?.image || '/avatar.png'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-xl text-[#F2F2F2] font-bold tracking-wide mb-1">
                {`${profileData?.firstName} ${profileData?.lastName} ` || ''}
              </h2>
              <p className="text-[#F2F2F2] mb-4">
                @{profileData?.username || ''}
              </p>
              <button
                onClick={() => navigate('/app/edit-profile')}
                className="bg-[#39C094] text-white px-6 py-2 rounded-[12px] text-sm"
              >
                Edit profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-6 mt-6 space-y-4 mb-10">
          {/* Points */}
          <div className="flex items-center gap-4  py-2 px-2 rounded-[10px] shadow-sm border">
            <div className="bg-[#F9F9F9] p-3 h-10 w-10 border rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#16956C]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
              </svg>
            </div>
            <div>
              <p className="text-[#16956C] text-sm">Points</p>
              <p className="text-lg text-[#727479] font-medium">
                {profileData?.questionsAnsweredCorrectly || 0}
              </p>
            </div>
          </div>

          {/* Screen Time */}
          <div className="flex items-center gap-4   py-2 px-2 rounded-[10px] shadow-md border">
            <div className="bg-[#F9F9F9] p-3 h-10 w-10 border rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#16956C]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.59-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
            </div>
            <div>
              <p className="text-[#16956C] text-sm">On-screen time practice</p>
              <p className="text-lg text-[#727479] font-medium">
                {profileData?.screenTime || '0 hours, 0 minutes'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProfileContext.Provider>
  );
}

export function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    username: '',
    department: '',
    email: '',
    gender: 'male',
    dateOfBirth: '',
    levelOfStudy: 'alevels',
    image: '/avatar.png',
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        setError('Authentication token not found');
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `https://pace-app-backend-v1.onrender.com/api/v1/student/get-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profileData = response.data.data;
      setFormData({
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        phoneNumber: profileData.phoneNumber || '',
        username: profileData.username || '',
        email: profileData.email || '',
        department: profileData.department || '',
        gender: profileData.gender || 'male',
        dateOfBirth: profileData.dateOfBirth || '',
        levelOfStudy: profileData.levelOfStudy || 'alevels',
        image: profileData.image || 'avatar.png',
      });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(
        err.response?.data?.data?.message || 'Failed to fetch profile data'
      );
      setLoading(false);

      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    }
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!formData.gender) {
      errors.gender = 'Gender is required';
    }
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    }
    if (!formData.levelOfStudy) {
      errors.levelOfStudy = 'Level of study is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        setError('Authentication token not found');
        toast.error('Authentication token not found');
        return;
      }

      await axios.post(
        `https://pace-app-backend-v1.onrender.com/api/v1/student/complete-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Profile updated successfully!');
      setTimeout(() => {
        navigate('/app/profile');
      }, 1500);
    } catch (err) {
      console.error('Error updating profile:', err);
      const errorMessage =
        err.response?.data?.message || 'Failed to update profile';
      setError(errorMessage);
      toast.error(errorMessage);

      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-screen">
  //       <p className="text-red-500 text-center mb-4">{error}</p>
  //       <button
  //         onClick={() => navigate('/app/edit-profile')}
  //         className="text-emerald-500 underline"
  //       >
  //         Try Again
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="h-[99vh] bg-green-Primary_1 w-full p-4 overflow-y-auto overflow-x-hidden scrollbar-hide">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Header */}
      <div
        className="flex -ml-1 cursor-pointer borer-b borer-white/30 pb-2 items-center mb-6"
        onClick={() => navigate('/app/profile')}
      >
        <button className="text-white">
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-2xl text-white font-medium">Edit Profile</h1>
      </div>

      {/* Profile Picture */}
      <div className="relative z-[10] flex justify-start mb-6">
        <div className="relative">
          <div className="absolute bg-[#1AB381] w-28 z-[1] top-[3px] left-[3px] shadow-sm h-28 rounded-[20px]"></div>
          <div className="relative z-[10] shadow-md w-28 bg-white h-28 rounded-[20px] overflow-hidden group cursor-pointer">
            <img
              src={formData.image || '/avatar.png'}
              alt="Profile"
              className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
            />
            {/* Camera Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm9-7h-3.38c-.38 0-.73-.21-.89-.55L15.72 3H8.28l-1.01 2.45c-.16.34-.51.55-.89.55H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 14H3V8h3.38c.38 0 .73.21.89.55L8.28 11h7.44l1.01-2.45c.16-.34.51-.55.89-.55H21v12z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-5 pb-6" onSubmit={handleSubmit}>
        {/* First Name */}
        <div>
          <label className="text-white text-sm mb-1 block">First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full bg-transparent font-bold border-b border-white/30 pb-2 text-[#F9F9F9] focus:outline-none focus:border-white"
          />
          {validationErrors.firstName && (
            <p className="text-red-300 text-xs mt-1">
              {validationErrors.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="text-white text-sm mb-1 block">Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full bg-transparent font-bold border-b border-white/30 pb-2 text-[#F9F9F9] focus:outline-none focus:border-white"
          />
          {validationErrors.lastName && (
            <p className="text-red-300 text-xs mt-1">
              {validationErrors.lastName}
            </p>
          )}
        </div>

        {/* Phone number */}
        <div>
          <label className="text-white text-sm mb-1 block">Phone number*</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full bg-transparent font-bold border-b border-white/30 pb-2 text-[#F9F9F9] focus:outline-none focus:border-white"
          />
          {validationErrors.phoneNumber && (
            <p className="text-red-300 text-xs mt-1">
              {validationErrors.phoneNumber}
            </p>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="text-white text-sm mb-1 block">Username*</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-transparent font-bold border-b border-white/30 pb-2 text-[#F9F9F9] focus:outline-none focus:border-white"
          />
          {validationErrors.username && (
            <p className="text-red-300 text-xs mt-1">
              {validationErrors.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-white text-sm mb-1 block">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent font-bold border-b border-white/30 pb-2 text-[#F9F9F9] focus:outline-none focus:border-white"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="text-white text-sm mb-1 block">Gender*</label>
          <div className="relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-transparent font-bold border-b focus:p-2 border-white/30 pb-2 text-[#F9F9F9] focus:outline-none focus:border-white appearance-none"
            >
              <option value="male" className="text-black">
                Male
              </option>
              <option value="female" className="text-black">
                Female
              </option>
            </select>
            <div className="absolute right-2 top-2">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {validationErrors.gender && (
            <p className="text-red-300 text-xs mt-1">
              {validationErrors.gender}
            </p>
          )}
        </div>

        {/* Date of birth */}
        <div>
          <label className="text-white text-sm mb-1 block">
            Date of birth*
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full bg-transparent border-b font-bold border-white/30 pb-2 text-[#F9F9F9] focus:outline-none focus:border-white"
          />
          {validationErrors.dateOfBirth && (
            <p className="text-red-300 text-xs mt-1">
              {validationErrors.dateOfBirth}
            </p>
          )}
        </div>

        {/* Level of study */}
        <div>
          <label className="text-white text-sm mb-1 block">
            Level of study*
          </label>
          <div className="relative">
            <select
              name="levelOfStudy"
              value={formData.levelOfStudy}
              onChange={handleChange}
              className="w-full font-bold bg-transparent focus:p-2 border-b border-white/30 pb-2 text-[#F9F9F9] focus:outline-none focus:border-white appearance-none"
            >
              <option value="alevels" className="text-black p-2">
                A Levels
              </option>
              <option value="other" className="text-black p-2">
                Other
              </option>
            </select>
            <div className="absolute right-2 top-2">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {validationErrors.levelOfStudy && (
            <p className="text-red-300 text-xs mt-1">
              {validationErrors.levelOfStudy}
            </p>
          )}
        </div>

        {/* Save Button */}
        <div className="pt-4 relative">
          <div className="absolute bg-[#1AB381] w-full z-[1] bottom-[-3px] shadow-sm h-[50px] rounded-full"></div>
          <button
            type="submit"
            disabled={submitting}
            className={`relative z-[10] w-full bg-white text-[#16956C] py-4 rounded-full font-medium flex items-center justify-center ${
              submitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#16956C] mr-2"></div>
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
