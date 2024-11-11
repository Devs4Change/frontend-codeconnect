import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiClient } from "../services/config";

const CourseDetails = () => {
  const { courseId } = useParams(); // Get course ID from URL params
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://code-connect-api.onrender.com/courses/${courseId}`
        );
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

  // Handle enrollment action
  const handleEnroll = async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      // If user is not logged in, show a toast and redirect to login
      toast.error("Please sign up to enroll.");
      navigate("/login", { state: { from: window.location.pathname } }); // Store the current page for redirect after login
      return;
    }

    try {
      // Attempt to enroll in the course
      const response = await apiClient.post(`/enroll/${courseId}`);

      // Show success toast if enrollment is successful
      toast.success("Successfully enrolled in the course!");
      navigate("/courses"); // Redirect to the courses page after successful enrollment
    } catch (error) {
      // Show error toast if there was an issue with enrollment
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred during enrollment.");
    }
  };

  return (
    <div className="course-details p-6">
      <ToastContainer /> {/* Toast container for notifications */}

      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="mt-4">{course.description}</p>
      <p className="mt-4">{course.content}</p> {/* Display the full course content */}

      {/* Enroll button */}
      <button
        onClick={handleEnroll}
        className="mt-6 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
      >
        Enroll Now
      </button>
    </div>
  );
};

export default CourseDetails;
