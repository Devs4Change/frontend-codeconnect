import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Define the state for menu toggle

  // Function to toggle dark mode
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  useEffect(() => {
    // Persist dark mode preference
    if (localStorage.getItem('theme') === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

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
          <li><Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-gray-400">Dashboard</Link></li>
          <li><Link to="/profile" className="hover:text-blue-600 dark:hover:text-gray-400">Profile</Link></li>
          <li><Link to="/signup" className="hover:text-blue-600 dark:hover:text-gray-400">Sign Up</Link></li>
          <li><Link to="/login" className="hover:text-blue-600 dark:hover:text-gray-400">Login</Link></li>
        </ul>

        {/* Dark Mode Toggle */}
        <button
          onClick={handleDarkModeToggle}
          className="ml-4 p-2 rounded bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-white focus:outline-none md:ml-0"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none md:hidden ml-4"
          aria-label="Toggle Menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Links (conditionally rendered based on isMenuOpen) */}
      {isMenuOpen && (
        <ul className="md:hidden bg-cyan-500 text-white p-4 space-y-4 w-full">
          <li><Link to="/" className="block py-2 hover:text-blue-600 dark:hover:text-gray-400">Home</Link></li>
          <li><Link to="/dashboard" className="block py-2 hover:text-blue-600 dark:hover:text-gray-400">Dashboard</Link></li>
          <li><Link to="/profile" className="block py-2 hover:text-blue-600 dark:hover:text-gray-400">Profile</Link></li>
          <li><Link to="/signup" className="block py-2 hover:text-blue-600 dark:hover:text-gray-400">Sign Up</Link></li>
          <li><Link to="/login" className="block py-2 hover:text-blue-600 dark:hover:text-gray-400">Login</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
