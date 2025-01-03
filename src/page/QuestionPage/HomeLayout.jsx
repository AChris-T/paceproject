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
    <div className="flex flex-col bg-[#0000001A] justify-between h-[100vh]">
      <div>
        <Outlet />
      </div>
      <div className="flex bg-white h-[70px] justify-between shadow-2xl  items-center px-[6px]">
        <NavLink
          to="home"
          className={`text-[16px] flex gap-3 rounded-full items-center px-[24px] py-[7px] font-normal  ${
            pathname === '/app/home' ? 'text-[#30E0A8] bg-[#21A279]' : ''
          }`}
          style={({ isActive }) => {
            return {
              color: isActive ? '#fff' : '',
              fontWeight: isActive ? 'normal' : '',
            };
          }}
        >
          <VscHome className="text-[30px]" />
          {pathname === '/app/home' ? 'Home' : ''}
        </NavLink>
        <NavLink
          to="leader"
          className={`text-[16px] flex gap-2 rounded-full items-center px-[24px] py-[7px] font-normal  ${
            pathname === '/app/leader' ? 'text-[#30E0A8] bg-[#21A279]' : ''
          }`}
          style={({ isActive }) => {
            return {
              color: isActive ? '#fff' : '',
              fontWeight: isActive ? 'normal' : '',
            };
          }}
        >
          <HiOutlineTrophy className="text-[30px]" />
          {pathname === '/app/leader' ? 'Leader..' : ''}
        </NavLink>
        <NavLink
          to="notification"
          className={`text-[16px] flex gap-2 rounded-full items-center px-[24px] py-[7px] font-normal  ${
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
          <IoMdNotificationsOutline className="text-[30px]" />
          {pathname === '/app/notification' ? 'Notifica..' : ''}
        </NavLink>
        <NavLink
          to="profile"
          className={`text-[20px] flex gap-3 rounded-full items-center px-[24px] py-[7px] font-normal  ${
            pathname === '/app/profile' ? 'text-[#30E0A8] bg-[#21A279]' : ''
          }`}
          style={({ isActive }) => {
            return {
              color: isActive ? '#fff' : '',
              fontWeight: isActive ? 'normal' : '',
            };
          }}
        >
          <FaRegUser className="text-[30px]" />
          {pathname === '/app/profile' ? 'Profile' : ''}
        </NavLink>
      </div>
    </div>
  );
}
