import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiClient } from "../services/config";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();

  // Check enrollment status
  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await apiClient.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const enrolledCourses = response.data.enrolledCourses || [];
        setIsEnrolled(enrolledCourses.includes(courseId));
      } catch (error) {
        console.error("Error checking enrollment status:", error);
      }
    };

    checkEnrollmentStatus();
  }, [courseId]);

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/courses/${courseId}`);
        console.log("Course data received:", response.data);
        setCourse(response.data);

        // Check enrollment status if user is logged in
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const enrollmentResponse = await apiClient.get(`/courses/${courseId}/enrollment-status`);
            setIsEnrolled(enrollmentResponse.data.isEnrolled);
          } catch (enrollError) {
            console.error("Error checking enrollment:", enrollError);
          }
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError("Error fetching course details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleEnroll = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please sign up to enroll.");
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    const email = localStorage.getItem("userEmail");

    if (!email) {
      toast.error("No email found for the logged-in user.");
      return;
    }

    setIsEnrolling(true);

    try {
      const response = await apiClient.post(
        `/enroll/${courseId}`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { message } = response.data;

      if (response.status === 200 || response.status === 201) {
        if (message === "User is already enrolled in the course") {
          toast.info("You are already enrolled in this course!");
        } else if (message === "Successfully enrolled") {
          toast.success("Successfully enrolled in the course!");
        }
        setIsEnrolled(true);

        setTimeout(() => {
          navigate(`/modules/${courseId}`);
        }, 1000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during enrollment.";
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  const getVideoUrl = (content) => {
    if (!content) return null;
    console.log("Video content path:", content);
    return `https://savefiles.org/${content}?shareable_link=524`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 p-6">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Course Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                {course.title}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                  {course.category?.toUpperCase() || "CODING"}
                </span>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-8">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Course Description
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {course.description}
                </p>

                {/* Course Content Section */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Course Content
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    {/* Video Section */}
                    {course?.content && (
                      <div className="mb-6">
                        <div className="relative w-full max-w-2xl mx-auto h-[300px] rounded-lg overflow-hidden">
                          <video
                            controls
                            className="absolute top-0 left-0 w-full h-full object-contain bg-black"
                            controlsList="nodownload"
                            preload="auto"
                          >
                            <source
                              src={getVideoUrl(course.content)}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    )}

                    {/* Text Content */}
                    <p className="text-gray-600 dark:text-gray-300">
                      {course.content}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 flex justify-center">
                  {isEnrolled ? (
                    <Link
                      to={`/modules/${courseId}`}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-all duration-200"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Continue Learning
                    </Link>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      disabled={isEnrolling}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isEnrolling ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Enrolling...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          Enroll Now
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CourseDetails;
