import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Manage dark mode state
  const navigate = useNavigate();

  // Check if the user prefers dark mode or if it's set in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set login status based on token presence
    
    // Check dark mode preference from localStorage
    const darkModePreference = localStorage.getItem("darkMode");
    if (darkModePreference === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Handle toggling of dark mode
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true"); // Save preference
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false"); // Save preference
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Optionally, navigate to the homepage
  };

  return (
    <nav className="bg-cyan-500 text-white px-4 py-3 shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-blue-600 dark:hover:text-gray-400">
          CodeConnect
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-blue-600 dark:hover:text-gray-400">Home</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-gray-400">Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-blue-600 dark:hover:text-gray-400">Profile</Link></li>
              <li><button onClick={handleLogout} className="hover:text-blue-600 dark:hover:text-gray-400">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-blue-600 dark:hover:text-gray-400">Login</Link></li>
              <li><Link to="/signup" className="hover:text-blue-600 dark:hover:text-gray-400">Sign Up</Link></li>
            </>
          )}
        </ul>

        {/* Dark Mode Toggle */}
        <button
          onClick={handleDarkModeToggle}
          className="ml-4 p-2 rounded bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-white focus:outline-none md:ml-0"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? '🌞' : '🌙'} {/* Sun for light mode, Moon for dark mode */}
        </button>

        {/* Mobile Menu Toggle Button */}
        <button
          className="text-white focus:outline-none md:hidden ml-4"
          aria-label="Toggle Menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
