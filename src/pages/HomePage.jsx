import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                Welcome to CodeConnect
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-cyan-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Start your coding journey with our interactive courses designed for pre-tertiary students.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 md:text-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/courses"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-cyan-600 bg-white hover:bg-gray-50 md:text-lg"
                >
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Why Choose CodeConnect?
              </h2>
            </div>
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-500 text-white">
                    {/* Icon */}
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">Interactive Learning</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400 text-center">
                    Learn by doing with hands-on exercises and real-world projects.
                  </p>
                </div>
                {/* Add more features */}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
