import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const { courseId } = useParams(); // Get the courseId from the URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      try {
        const response = await axios.get(`https://code-connect-api.onrender.com/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(response.data); // Set the course data
      } catch (error) {
        setError('Error fetching course details');
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse(); // Call to fetch course
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold">{course.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-4">{course.description}</p>

      {/* Display the full course content */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Course Content</h3>
        <p className="mt-2">{course.content}</p>
      </div>
    </div>
  );
};

export default CourseDetail;
