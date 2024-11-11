// client/src/pages/UserDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [courses, setCourses] = useState([]);  // Ensure courses is an array
  const [progressData, setProgressData] = useState({});  // Store course progress
  const [profile, setProfile] = useState({});  // Store user profile data
  const [isLoading, setIsLoading] = useState(true);  // Loading state for fetching data
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch user dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetching user data: enrolled courses, progress, and profile
        const [coursesRes, progressRes, profileRes] = await Promise.all([
          axios.get('/api/user/enrolledCourses', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('/api/user/progress', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('/api/user/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
        ]);

        setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);
        setProgressData(progressRes.data);  // Set user progress data
        setProfile(profileRes.data);  // Set user profile data
        setIsLoading(false);  // Data fetching complete
      } catch (error) {
        toast.error("Error loading dashboard data");
        console.error("Error loading dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);  // Empty dependency array to run once on mount

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove JWT token from localStorage
    navigate('/login');  // Redirect to login page
  };

  // Progress Bar Component
  const ProgressBar = ({ progress }) => {
    return (
      <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden mt-2">
        <div
          style={{ width: `${progress}%` }}
          className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300"
        ></div>
      </div>
    );
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading dashboard...</p>;  // Loading state

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Your Dashboard</h2>

          {/* Courses Section */}
          <div className="space-y-4">
            {courses.length === 0 ? (
              <p className="text-center text-gray-500">No enrolled courses found.</p>
            ) : (
              courses.map(course => (
                <div key={course.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow">
                  <h3 className="text-xl font-medium">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{course.description}</p>

                  {/* Display progress bar */}
                  <ProgressBar progress={progressData[course.id]?.completion || 0} />
                  
                  {/* Show completion message when the course is fully completed */}
                  {progressData[course.id]?.completion === 100 && (
                    <p className="text-green-500 font-semibold">Course Completed! 🎉</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
