import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ userName, handleLogout, isMobileSidebarOpen, setIsMobileSidebarOpen }) => {
  const location = useLocation();

  const navItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      path: "/dashboard/profile",
      name: "My Profile",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0
          md:translate-x-0 
          w-[280px] md:w-64 
          bg-gradient-to-b from-cyan-600 to-cyan-700
          transition-all duration-300 ease-in-out
          transform ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
          flex flex-col
          min-h-screen md:min-h-0
          z-30
          overflow-y-auto
          shadow-xl
        `}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-cyan-500/30">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-cyan-600 font-bold text-xl">C</span>
            </div>
            <span className="text-xl font-semibold text-white">CodeConnect</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 px-4">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Home</span>
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileSidebarOpen(false)}
              className={`
                flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg
                transition-all duration-200
                hover:scale-[1.02]
                ${
                  location.pathname === item.path
                    ? "bg-white text-cyan-600 shadow-md"
                    : "text-white hover:bg-white/10"
                }
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Settings and Logout */}
        <div className="p-4 space-y-3 border-t border-cyan-500/30">
          <Link
            to="/dashboard/settings"
            onClick={() => setIsMobileSidebarOpen(false)}
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg
              transition-all duration-200
              hover:scale-[1.02]
              ${
                location.pathname === "/dashboard/settings"
                  ? "bg-white text-cyan-600 shadow-md"
                  : "text-white hover:bg-white/10"
              }
            `}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg
              text-white hover:bg-white/10 transition-all duration-200
              hover:scale-[1.02]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
