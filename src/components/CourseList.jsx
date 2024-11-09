import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://code-connect-api.onrender.com/courses'); // Adjust URL based on backend
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses. Please try again later."); // Display error toast
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-list grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      <ToastContainer /> {/* Toast container to display notifications */}
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
