import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  return (
    <div className="border w-full h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-hide">
      {/* Header */}
      <div className="bg-green-Primary_1">
        <div className="px-6 pt-8 pb-4 flex justify-between items-center">
          <h1 className="text-white text-2xl">Profile</h1>
          <button
            onClick={() => navigate('/app/edit-profile')}
            className="text-white bg-[#39C094] p-2 rounded-full"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
            </svg>
          </button>
        </div>

        {/* Profile Card */}
        <div className="px-6">
          <div className=" pb-6 flex flex-col items-center">
            <div className="relative z-[10]">
              <div className="absolute bg-[#39C094] w-[180px] z-[1] top-[4px] left-[4px] shadow-sm h-[180px] rounded-[20px]"></div>
              <div className="relative z-[10] shadow-md w-[180px] bg-white h-[180px] rounded-[20px] overflow-hidden mb-4">
                <img
                  src="/avatar.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h2 className="text-xl text-[#F2F2F2] font-bold tracking-wide mb-1">
              SALAWU HABEEBLA
            </h2>
            <p className="text-[#F2F2F2] mb-4">@habeebla</p>
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
      <div className="px-6 mt-6 space-y-4 mb-5">
        {/* Points */}
        <div className="flex items-center gap-4  py-2 px-2 rounded-[10px] shadow-md border">
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
            <p className=" text-lg text-[#727479] font-medium">500</p>
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
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
          </div>
          <div>
            <p className="text-[#16956C] text-sm">On-screen time practice</p>
            <p className=" text-lg text-[#727479] font-medium">
              6hours, 52minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    fullName: 'Salawu Habeebla',
    phoneNumber: '08044551296',
    username: 'Habeebla',
    email: 'salawuhabeebla@gmail.com',
    gender: 'male',
    dateOfBirth: '02/12/2020',
    levelOfStudy: 'alevels',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="h-[99vh] bg-green-Primary_1 w-full p-4 overflow-y-auto overflow-x-hidden scrollbar-hide">
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
              src="/avatar.png"
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
        {/* Full name */}
        <div>
          <label className="text-white text-sm mb-1 block">Full name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full bg-transparent font-bold border-b border-white/30 pb-2 text-[#F9F9F9] focus:outline-none focus:border-white"
          />
        </div>

        {/* Phone number */}
        <div>
          <label className="text-white text-sm mb-1 block">Phone number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full bg-transparent  font-bold border-b border-white/30 pb-2 text-[#F9F9F9] focus:outline-none focus:border-white"
          />
        </div>

        {/* Username */}
        <div>
          <label className="text-white text-sm mb-1 block">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-transparent font-bold border-b border-white/30 pb-2 text-[#F9F9F9] focus:outline-none focus:border-white"
          />
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
          <label className="text-white text-sm mb-1 block">Gender</label>
          <div className="relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-transparent  font-bold border-b focus:p-2 border-white/30 pb-2 text-[#F9F9F9] focus:outline-none focus:border-white appearance-none"
            >
              <option value="male" className="text-black ">
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
        </div>

        {/* Date of birth */}
        <div>
          <label className="text-white text-sm mb-1 block">Date of birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full bg-transparent  border-b font-bold border-white/30 pb-2 text-[#F9F9F9] focus:outline-none focus:border-white"
          />
        </div>

        {/* Level of study */}
        <div>
          <label className="text-white text-sm mb-1 block">
            Level of study
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
        </div>

        {/* Save Button */}
        <div className="pt-4 relative">
          <div className="absolute bg-[#1AB381] w-full z-[1] bottom-[-3px] shadow-sm h-[50px] rounded-full"></div>
          <button
            type="submit"
            className="relative z-[10] w-full bg-white text-[#16956C] py-4 rounded-full font-medium"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
