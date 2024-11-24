import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import believeImage from '../assets/images/bee.jpg'; // Import image directly
import firdausImage from '../assets/images/fir.jpeg'; // Import image directly

const AboutPage = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white text-center">About CodeConnect</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300">
                CodeConnect is dedicated to empowering pre-tertiary students with essential coding skills. 
                We believe in making programming education accessible, engaging, and effective for the next 
                generation of tech innovators.
              </p>
            </div>

            {/* Vision Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We envision a future where every student has the opportunity to learn coding and develop 
                the technical skills needed for success in the digital age.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Believe Kwamitse */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 mx-auto mb-4 overflow-hidden">
                  <img
                    src={believeImage} // Use imported image
                    alt="Believe Kwamitse"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Believe Kwamitse</h3>
                <p className="text-cyan-600 dark:text-cyan-400 mb-3">Frontend Developer</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Specializing in creating intuitive and responsive user interfaces with React and Tailwind CSS.
                </p>
              </div>

              {/* Firdaus Suhuyini Fuseini */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 mx-auto mb-4 overflow-hidden">
                  <img
                    src={firdausImage} // Use imported image
                    alt="Firdaus Suhuyini Fuseini"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Firdaus Suhuyini Fuseini</h3>
                <p className="text-cyan-600 dark:text-cyan-400 mb-3">Backend Developer</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Expert in building robust server-side architecture and API development with Node.js.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Embracing new technologies and teaching methods to provide the best learning experience.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Accessibility</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Making quality coding education available to all pre-tertiary students.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Excellence</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Maintaining high standards in our curriculum and teaching methodology.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
