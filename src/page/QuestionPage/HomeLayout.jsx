import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { VscHome } from 'react-icons/vsc';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function HomeLayout() {
  const location = useLocation();
  console.log(location.pathname);
  const pathname = location?.pathname;
  return (
    <div className="flex flex-col bg-white justify-between h-[100vh]">
      <div>
        <Outlet />
      </div>
      <div className="flex bg-white border-t-[2px]  h-[70px] justify-between shadow-2xl  items-center px-[6px]">
        <NavLink
          to="home"
          className={`text-[12px] flex gap-1 rounded-full items-center px-[24px] py-[7px] font-normal  ${
            pathname === '/app/home' ? 'text-[#30E0A8] bg-[#21A279]' : ''
          }`}
          style={({ isActive }) => {
            return {
              color: isActive ? '#fff' : '',
              fontWeight: isActive ? 'normal' : '',
            };
          }}
        >
          <VscHome className="text-[20px]" />
          {pathname === '/app/home' ? 'Home' : ''}
        </NavLink>
        <NavLink
          to="leader"
          className={`text-[12px] flex gap-1 rounded-full items-center px-[24px] py-[7px] font-normal  ${
            pathname === '/app/leader' ? 'text-[#30E0A8] bg-[#21A279]' : ''
          }`}
          style={({ isActive }) => {
            return {
              color: isActive ? '#fff' : '',
              fontWeight: isActive ? 'normal' : '',
            };
          }}
        >
          <HiOutlineTrophy className="text-[20px]" />
          {pathname === '/app/leader' ? 'Leaderboard' : ''}
        </NavLink>
        <NavLink
          to="notification"
          className={`text-[12px] flex gap-1 rounded-full items-center px-[24px] py-[7px] font-normal  ${
            pathname === '/app/notification'
              ? 'text-[#30E0A8] bg-[#21A279]'
              : ''
          }`}
          style={({ isActive }) => {
            return {
              color: isActive ? '#fff' : '',
              fontWeight: isActive ? 'normal' : '',
            };
          }}
        >
          <IoMdNotificationsOutline className="text-[20px]" />
          {pathname === '/app/notification' ? 'Notification' : ''}
        </NavLink>
        <NavLink
          to="profile"
          className={`text-[12px] flex gap-1 rounded-full items-center px-[24px] py-[7px] font-normal  ${
            pathname === '/app/profile' ? 'text-[#30E0A8] bg-[#21A279]' : ''
          }`}
          style={({ isActive }) => {
            return {
              color: isActive ? '#fff' : '',
              fontWeight: isActive ? 'normal' : '',
            };
          }}
        >
          <FaRegUser className="text-[20px]" />
          {pathname === '/app/profile' ? 'Profile' : ''}
        </NavLink>
      </div>
    </div>
  );
}
