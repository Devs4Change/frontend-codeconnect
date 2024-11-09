import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // Mobile menu visibility
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    const darkModePreference = localStorage.getItem("darkMode");
    if (darkModePreference === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  return (
    <nav className="bg-cyan-500 text-white px-4 py-3 shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
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

        <button
          onClick={handleDarkModeToggle}
          className="ml-4 p-2 rounded bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-white focus:outline-none md:ml-0"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none md:hidden ml-4"
          aria-label="Toggle Menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <ul className="md:hidden flex flex-col items-center space-y-4 bg-cyan-500 dark:bg-gray-800 p-4">
          <li><Link to="/" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600 dark:hover:text-gray-400">Home</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/dashboard" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600 dark:hover:text-gray-400">Dashboard</Link></li>
              <li><Link to="/profile" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600 dark:hover:text-gray-400">Profile</Link></li>
              <li><button onClick={() => { handleLogout(); setShowMobileMenu(false); }} className="hover:text-blue-600 dark:hover:text-gray-400">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600 dark:hover:text-gray-400">Login</Link></li>
              <li><Link to="/signup" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-600 dark:hover:text-gray-400">Sign Up</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
