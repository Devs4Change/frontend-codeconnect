import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://code-connect-api.onrender.com/courses/${courseId}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching course details. Please try again.");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="course-details p-6">
      <ToastContainer /> {/* Toast container for notifications */}
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="mt-4">{course.description}</p>
      {/* <div className="mt-6">
        <h2 className="text-2xl font-semibold">Curriculum</h2>
        <ul>
          {course.curriculum && course.curriculum.map((topic, index) => (
            <li key={index} className="mt-2">{topic}</li>
          ))}
        </ul>
      </div> */}
      <button className="mt-6 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
        Enroll Now
      </button>
    </div>
  );
};

export default CourseDetails;
