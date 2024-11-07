import axios from 'axios';
import CourseCard from '../components/CourseCard';
import RootLayout from '../layouts/RootLayout';
import { useEffect, useState } from 'react';

function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch courses data from the backend
    axios.get('https://code-connect-api.onrender.com')
      .then(response => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load courses.");
        setLoading(false);
      });
  }, []);

  return (
    <RootLayout>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to CodeConnect</h1>

      {loading && (
        <div className="text-center text-gray-500">
          <p>Loading courses...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
    </RootLayout>
  );
}

export default HomePage;
