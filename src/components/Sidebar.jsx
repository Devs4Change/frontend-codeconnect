import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaBook, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';

// Logout Button Component
const LogoutButton = ({ handleLogout, isCollapsed }) => {
  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 w-full"
    >
      <FaSignOutAlt className="inline-block mr-2" />
      {!isCollapsed && 'Logout'} {/* Show text only when sidebar is expanded */}
    </button>
  );
};

const Sidebar = ({ profile, handleLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Sidebar starts in collapsed state

  // Toggle collapse state
  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  // Ensure profile exists before rendering its properties
  const profilePicture = profile?.avatar || 'https://via.placeholder.com/150'; // Use placeholder if avatar is undefined

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} flex flex-col p-4 h-full`}>
      {/* Sidebar Toggle Button (Hamburger Menu) */}
      <button onClick={toggleSidebar} className="text-white mb-4">
        <FaBars size={24} />
      </button>

      <div className="flex items-center justify-between mb-8">
        {/* Profile Picture and Name */}
        <div className="flex items-center space-x-3">
          {/* Profile Picture */}
          <img
            src={profilePicture}
            alt="Profile"
            className={`w-12 h-12 rounded-full object-cover transition-all duration-300 ${isCollapsed ? 'block' : 'hidden'}`}
          />
          {/* Profile Name and Email only shown when not collapsed */}
          {!isCollapsed && (
            <div>
              <h3 className="text-xl font-medium">{profile?.name || 'Unknown User'}</h3>
              <p className="text-sm">{profile?.email || 'No Email Provided'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main navigation links */}
      <nav className={`flex flex-col space-y-4 ${isCollapsed ? 'items-center' : ''} flex-grow`}>
        <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded flex items-center space-x-2">
          <FaHome size={24} />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>
        <Link to="/profile" className="hover:bg-gray-700 p-2 rounded flex items-center space-x-2">
          <FaUser size={24} />
          {!isCollapsed && <span>Profile</span>}
        </Link>
        <Link to="/courses" className="hover:bg-gray-700 p-2 rounded flex items-center space-x-2">
          <FaBook size={24} />
          {!isCollapsed && <span>Courses</span>}
        </Link>
      </nav>

      {/* Push Settings and Logout to the bottom */}
      <div className="mt-60">
        <Link to="/settings" className="hover:bg-gray-700 p-2 rounded flex items-center space-x-2">
          <FaCog size={24} />
          {!isCollapsed && <span>Settings</span>}
        </Link>

        {/* Logout Button */}
        <LogoutButton handleLogout={handleLogout} isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
};

export default Sidebar;
