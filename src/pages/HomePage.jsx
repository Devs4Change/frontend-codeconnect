import axios from 'axios';
import CourseCard from '../components/CourseCard';
import RootLayout from '../layouts/RootLayout';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the token from localStorage (if it exists)
    const token = localStorage.getItem('token');
    
    // Log token value for debugging
    console.log('Token:', token);

    // Fetch courses data from the backend
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://code-connect-api.onrender.com/courses', {
          headers: token ? { Authorization: `Bearer ${token}` } : {} // Only add Authorization header if token exists
        });
        
        // Log the response data for debugging
        console.log('API Response:', response.data);

        if (response.data && response.data.length > 0) {
          setCourses(response.data);
        } else {
          setError('No courses found.');
        }

        setLoading(false);
      } catch (err) {
        // Log the error message for debugging
        console.error('Error loading courses:', err);
        
        setError('Failed to load courses.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // The empty dependency array means this useEffect runs only once, after the component mounts

  return (
    <RootLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to CodeConnect</h1>

        {/* Loading state */}
        {loading && !error && (
          <div className="text-center text-gray-500">
            <p>Loading courses...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* Courses display */}
        {!loading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map(course => (
              <motion.div
                key={course._id} // Use course ID for the key
                className="transform transition duration-500 ease-in-out hover:shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <motion.div
                  className="relative bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl border-2 border-transparent hover:border-cyan-500 hover:ring-4 hover:ring-cyan-500"
                  style={{ perspective: '1500px' }}
                  whileHover={{ rotateY: 10, rotateX: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CourseCard course={course} /> {/* Pass each course data to the CourseCard component */}
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </RootLayout>
  );
}

export default HomePage;
