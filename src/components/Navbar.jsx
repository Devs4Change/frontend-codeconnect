import React, { useState, useEffect } from "react";

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const [scrolled, setScrolled] = useState(false);
  const userAvatar = localStorage.getItem("userAvatar");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    window.location.href = '/';
  };

  const getDisplayName = () => {
    if (userName && !userName.includes("@")) {
      return userName;
    }
    if (userEmail) {
      const name = userEmail.split("@")[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return "User";
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Custom Moon Icon component
  const MoonIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      <circle cx="12" cy="12" r="5" fill="currentColor" opacity="0.2" />
    </svg>
  );

  // Custom Sun Icon component
  const SunIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42">
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  );

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white dark:bg-gray-800 shadow-md"
          : "bg-gradient-to-r from-cyan-600 to-cyan-500"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  scrolled ? "bg-cyan-500" : "bg-white"
                }`}
              >
                <span
                  className={`font-bold text-xl ${
                    scrolled ? "text-white" : "text-cyan-500"
                  }`}
                >
                  C
                </span>
              </div>
              <span
                className={`font-bold text-xl ${
                  scrolled ? "text-gray-800 dark:text-white" : "text-white"
                }`}
              >
                CodeConnect
              </span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-cyan-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                scrolled
                  ? "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  : "text-cyan-50 hover:text-white"
              }`}
            >
              Home
            </a>
            <a
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                scrolled
                  ? "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  : "text-cyan-50 hover:text-white"
              }`}
            >
              About Us
            </a>
            <a
              href="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                scrolled
                  ? "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  : "text-cyan-50 hover:text-white"
              }`}
            >
              Contact
            </a>
          </div>

          {/* Right Side - Dark Mode Toggle and Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md hover:bg-opacity-20 hover:bg-gray-100 focus:outline-none transition-colors ${
                scrolled
                  ? "text-gray-700 dark:text-gray-300"
                  : "text-white"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            {!isAuthenticated ? (
              <>
                <a
                  href="/login"
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    scrolled
                      ? "bg-cyan-500 text-white hover:bg-cyan-600"
                      : "bg-cyan-600 text-white hover:bg-cyan-700"
                  }`}
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    scrolled
                      ? "bg-white text-cyan-600 hover:bg-gray-50 border border-cyan-500"
                      : "bg-white text-cyan-600 hover:bg-gray-50"
                  }`}
                >
                  Sign Up
                </a>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center space-x-2 text-sm font-medium ${
                    scrolled
                      ? "text-gray-700 dark:text-gray-300"
                      : "text-white"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    {userAvatar ? (
                      <img src={userAvatar} alt="User Avatar" />
                    ) : (
                      <span className="text-sm">
                        {getDisplayName().charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-sm">{getDisplayName()}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-2">
                      <a
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100"
                      >
                        Dashboard
                      </a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 p-4 space-y-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-md hover:bg-opacity-20 hover:bg-gray-100 focus:outline-none transition-colors ${
              scrolled ? "text-gray-700 dark:text-gray-300" : "text-white"
            }z-50`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href="/"
            className="block text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-medium"
          >
            Home
          </a>
          <a
            href="/about"
            className="block text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-medium"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="block text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-medium"
          >
            Contact
          </a>

          {/* Auth Buttons in Mobile View */}
          {!isAuthenticated ? (
            <>
              <a
                href="/login"
                className="block text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-medium"
              >
                Login
              </a>
              <a
                href="/signup"
                className="block text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-medium"
              >
                Sign Up
              </a>
            </>
          ) : (
            <>
              <a
                href="/dashboard"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
