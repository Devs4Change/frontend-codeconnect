import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const [scrolled, setScrolled] = useState(false);
  const userAvatar = localStorage.getItem("userAvatar");

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    toast.success("Logged out successfully");
    navigate("/");
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
            <Link to="/" className="flex items-center space-x-2">
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
            </Link>
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
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                scrolled
                  ? "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  : "text-cyan-50 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                scrolled
                  ? "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  : "text-cyan-50 hover:text-white"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                scrolled
                  ? "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  : "text-cyan-50 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Side - Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    scrolled
                      ? "bg-cyan-500 text-white hover:bg-cyan-600"
                      : "bg-cyan-600 text-white hover:bg-cyan-700"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    scrolled
                      ? "bg-white text-cyan-600 hover:bg-gray-50 border border-cyan-500"
                      : "bg-white text-cyan-600 hover:bg-gray-50"
                  }`}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center space-x-2 focus:outline-none ${
                    scrolled ? "text-gray-800 dark:text-white" : "text-white"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                    {userAvatar ? (
                      <img
                        src={`https://savefiles.org/${userAvatar}?shareable_link=524`}
                        alt={userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-cyan-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {userName?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="hidden md:block">{getDisplayName()}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-cyan-600 p-4">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:bg-cyan-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:bg-cyan-700 px-3 py-2 rounded-md text-base font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white hover:bg-cyan-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
            {!isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="text-white bg-cyan-700 px-4 py-2 rounded-md text-base font-medium text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-cyan-600 bg-white px-4 py-2 rounded-md text-base font-medium text-center"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:bg-cyan-700 px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 bg-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
